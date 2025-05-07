"""
Crawl websites from config/init-url.txt and store progress/results in per-domain CSV files under data/.
"""
import os
import csv
import threading
import time
from urllib.parse import urlparse, urljoin
from queue import Queue
from dotenv import load_dotenv
import requests
from bs4 import BeautifulSoup
import tldextract
from markdownify import markdownify as md
from datetime import datetime
from filelock import FileLock
import urllib.robotparser
from collections import defaultdict

import queue # For queue.Empty

# Load environment variables if .env exists
load_dotenv()
THREADS = int(os.getenv('THREADS', 5))
TIMEOUT = int(os.getenv('TIMEOUT', 5)) # Timeout for individual requests
RETRY_LIMIT = int(os.getenv('RETRY_LIMIT', 3))
# Duration for the entire crawl script to run, 0 means indefinite (until queue empty)
# For a 5-minute self-imposed limit, set this to 300 via env var.
CRAWL_DURATION_SECONDS = int(os.getenv('CRAWL_DURATION_SECONDS', 0)) 

CONFIG_URLS = os.path.join('config', 'init-url.txt')
DATA_DIR = 'data'
DOMAINS_DIR = 'domains'
NEWLY_ADDED_DOMAINS_LOG = 'newly_added_domains.log' # Log file for new domains

os.makedirs(DATA_DIR, exist_ok=True)
# Global lock for thread-safe operations like file appends and shared resource access
# The FileLock in update_csv is for inter-process safety on CSVs, 
# this threading.Lock is for intra-process safety for things like the new domain log.
lock = threading.Lock() 

CSV_HEADER = ['url', 'status', 'subpages', 'progress', 'last_updated', 'created_date']

# Helper to get TLD/domain

def get_tld_domain(url):
    ext = tldextract.extract(url)
    tld = ext.suffix.lower()
    domain = ext.domain + ('.' + ext.suffix if ext.suffix else '')
    return tld, domain

def get_csv_path(url):
    tld, domain = get_tld_domain(url)
    tld_dir = os.path.join(DATA_DIR, tld)
    os.makedirs(tld_dir, exist_ok=True)
    return os.path.join(tld_dir, f"{domain}.csv")

def get_domain_folder(url):
    tld, domain = get_tld_domain(url)
    return os.path.join(DOMAINS_DIR, tld, domain)

def get_md_path(url):
    parsed = urlparse(url)
    folder = get_domain_folder(url)
    path = parsed.path.strip('/') or 'index'
    if path.endswith('/'):
        path = path[:-1]
    if not path:
        path = 'index'
    filename = path.replace('/', '_') + '.md'
    return os.path.join(folder, filename)

def get_robots_parser(url, robots_cache):
    parsed = urlparse(url)
    base_url = f"{parsed.scheme}://{parsed.netloc}"
    if base_url in robots_cache:
        return robots_cache[base_url]
    robots_url = urljoin(base_url, '/robots.txt')
    rp = urllib.robotparser.RobotFileParser()
    try:
        rp.set_url(robots_url)
        rp.read()
    except Exception:
        rp = None
    robots_cache[base_url] = rp
    return rp

def update_csv(url, status, subpages, progress):
    csv_path = get_csv_path(url)
    lock_path = csv_path + '.lock'
    now = datetime.utcnow().isoformat() + 'Z'
    created_date = now
    # Use file lock for concurrency, ensure it's acquired before reading/writing
    file_lock_instance = FileLock(lock_path)
    with file_lock_instance:
        rows = []
        found = False
        if os.path.exists(csv_path):
            with open(csv_path, newline='') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    if row['url'] == url:
                        found = True
                        row['status'] = status
                        row['subpages'] = str(subpages)
                        row['progress'] = str(progress)
                        row['last_updated'] = now
                    rows.append(row)
        if not found:
            rows.append({
                'url': url,
                'status': status,
                'subpages': str(subpages),
                'progress': str(progress),
                'last_updated': now,
                'created_date': created_date
            })
        with open(csv_path, 'w', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=CSV_HEADER)
            writer.writeheader()
            writer.writerows(rows)

# Function to get the status of a specific URL from its domain's CSV
def get_url_status_from_csv(url_to_check):
    csv_path = get_csv_path(url_to_check)
    lock_path = csv_path + '.lock'
    
    if not os.path.exists(csv_path):
        return None # No CSV, so no status

    file_lock_instance = FileLock(lock_path)
    with file_lock_instance:
        try:
            with open(csv_path, newline='') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    if row['url'] == url_to_check:
                        return row.get('status')
        except Exception as e:
            # print(f"Error reading CSV {csv_path} for status check: {e}")
            return None # Error during read, treat as no status
    return None # URL not found in CSV

TERMINAL_STATUSES = {'finished', 'blocked_by_robots', 'error'}

def crawl_worker(q, visited, robots_cache, shutdown_event, user_agent='OpenDomainsBot'):
    thread_name = threading.current_thread().name
    # print(f"{thread_name}: Worker started.")
    while not shutdown_event.is_set():
        try:
            url = q.get(timeout=1)  # Timeout allows periodic check of shutdown_event
        except queue.Empty:
            # Queue is empty, loop back to check shutdown_event or wait for new items
            continue 
        except Exception as e:
            # print(f"{thread_name}: Error getting from queue: {e}")
            if shutdown_event.is_set():
                 return 
            return # Exit thread on other q.get errors

        if url is None: # Sentinel value to signal worker to exit
            q.task_done()
            # print(f"{thread_name}: Received sentinel, exiting.")
            return

        if url in visited and url is not None: # Check url is not None again, though covered by sentinel
            # print(f"{thread_name}: URL {url} already visited (in-memory set), skipping.")
            q.task_done()
            continue
        
        # Check persistent status from CSV before any processing
        # This check is done *after* taking from queue to ensure it's processed by one worker
        # and to correctly call q.task_done() if skipped.
        persistent_status = get_url_status_from_csv(url)
        if persistent_status in TERMINAL_STATUSES:
            # print(f"{thread_name}: URL {url} has terminal status '{persistent_status}' in CSV, skipping.")
            visited.add(url) # Add to current run's visited set
            q.task_done()
            continue

        # --- START: Early file/directory creation and status update ---
        tld, domain_name_from_url = get_tld_domain(url) # Get domain for logging
        domain_folder_path = get_domain_folder(url)

        is_new_domain_folder = not os.path.exists(domain_folder_path)
        
        os.makedirs(domain_folder_path, exist_ok=True) # Creates domains/<tld>/<domain>

        if is_new_domain_folder:
            with lock: # Thread-safe append to the log file
                with open(NEWLY_ADDED_DOMAINS_LOG, 'a') as f_log:
                    f_log.write(f"{domain_name_from_url}\n")
        
        # Initial CSV update. This ensures data/<tld>/ and data/<tld>/<domain>.csv exist.
        update_csv(url, 'pending_robots_check', 0, 0)
        # --- END: Early file/directory creation and status update ---

        # Check robots.txt
        rp = get_robots_parser(url, robots_cache) # This can be slow

        if rp and not rp.can_fetch(user_agent, url):
            update_csv(url, 'blocked_by_robots', 0, 0) # Update status
            visited.add(url) # Mark as visited to prevent re-queuing / re-processing
            q.task_done()
            continue

        # If allowed by robots.txt (or no robots.txt), proceed with full crawl
        visited.add(url) # Add to visited set *after* robots check and *before* actual crawl
        
        update_csv(url, 'editing', 0, 0) # Update status to 'editing' before making network request for page
        
        md_path = get_md_path(url) # Path for the markdown file
        # Crawl page
        for attempt in range(RETRY_LIMIT):
            try:
                resp = requests.get(url, timeout=TIMEOUT, headers={'User-Agent': user_agent})
                break
            except Exception:
                time.sleep(1)
        else:
            update_csv(url, 'error', 0, 0)
            q.task_done()
            continue
        soup = BeautifulSoup(resp.text, 'html.parser')
        # Save as markdown
        with open(md_path, 'w') as f:
            f.write(f'# {url}\n\n')
            f.write(md(str(soup)))
        # Find subpages (same domain and external domains)
        subpages_added_to_queue = set()
        for a in soup.find_all('a', href=True):
            if shutdown_event.is_set(): # Check during potentially long loop
                # print(f"{thread_name}: Shutdown detected while finding subpages for {url}")
                break 
            raw_href = a.get('href')
            if not raw_href or raw_href.startswith('#') or raw_href.lower().startswith('mailto:') or raw_href.lower().startswith('javascript:'):
                continue

            link = urljoin(url, raw_href)
            parsed_link = urlparse(link)

            # Ensure it's an HTTP/HTTPS link and has a network location (domain)
            if parsed_link.scheme not in ['http', 'https'] or not parsed_link.netloc:
                continue

            if link not in visited: # Check in-memory visited set for current run
                # Also check persistent status before adding to queue
                link_status = get_url_status_from_csv(link)
                if link_status not in TERMINAL_STATUSES:
                    q.put(link)
                    subpages_added_to_queue.add(link)
                else:
                    # print(f"{thread_name}: Subpage {link} has terminal status '{link_status}', not queuing.")
                    visited.add(link) # Add to current run's visited to avoid re-checking CSV
        
        progress = 100  # For demo, mark as done after one pass
        update_csv(url, 'finished', len(subpages_added_to_queue), progress)
        q.task_done() # Mark the actual URL task as done
    
    # print(f"{thread_name}: Worker stopping.")


def main():
    start_time = time.time()
    shutdown_event = threading.Event()

    # Clear/Create the newly added domains log file
    with open(NEWLY_ADDED_DOMAINS_LOG, 'w') as f_log:
        f_log.write("") 

    # Load seed URLs
    with open(CONFIG_URLS, 'r') as f:
        seeds = [line.strip() for line in f if line.strip() and not line.startswith('#')]
    
    q = Queue()
    visited = set() # Shared set for visited URLs
    robots_cache = {} # Shared cache for robots.txt parsers

    # Initial population of the queue, checking CSV status for seed URLs
    initial_queue_count = 0
    for url_seed in seeds:
        if shutdown_event.is_set(): break # Stop if shutdown signaled early

        if url_seed in visited: # Should be empty at this stage, but good practice
            continue

        seed_status = get_url_status_from_csv(url_seed)
        if seed_status in TERMINAL_STATUSES:
            # print(f"Seed URL {url_seed} has terminal status '{seed_status}', skipping and marking visited.")
            visited.add(url_seed) # Add to current run's visited set
            continue
        
        q.put(url_seed)
        initial_queue_count += 1
    
    print(f"Initialized queue with {initial_queue_count} seed URLs (after filtering by CSV status).")

    threads = []
    for i in range(THREADS):
        # Pass shutdown_event to workers
        t = threading.Thread(target=crawl_worker, args=(q, visited, robots_cache, shutdown_event), name=f"Worker-{i+1}")
        # t.daemon = True # Daemon threads exit abruptly if main thread exits. Explicit join is preferred.
        t.start()
        threads.append(t)

    # Timer thread for duration-based shutdown
    timer_thread = None
    if CRAWL_DURATION_SECONDS > 0:
        print(f"Crawler will run for a maximum of {CRAWL_DURATION_SECONDS} seconds.")
        def time_keeper():
            time.sleep(CRAWL_DURATION_SECONDS)
            if not shutdown_event.is_set():
                print(f"Crawl duration of {CRAWL_DURATION_SECONDS} seconds reached. Signaling workers to stop...")
                shutdown_event.set()
                # Wake up workers that might be blocked on q.get() by putting sentinel values
                for _ in range(len(threads)):
                    try:
                        q.put(None, block=False, timeout=0.1) 
                    except queue.Full: pass # If queue is full, workers are busy
                    except Exception: pass # Ignore other minor errors during put

        timer_thread = threading.Thread(target=time_keeper, name="CrawlTimer")
        timer_thread.daemon = True 
        timer_thread.start()

    try:
        q.join() # Wait for all items (including sentinels if added by timer) to be processed
        # print("q.join() returned. All tasks initially in queue or sentinels processed.")
        # If q.join returned, it means all tasks initially put are done, 
        # or workers exited after processing sentinels.
        # Ensure shutdown_event is set if not already (e.g. queue emptied before duration)
        if not shutdown_event.is_set():
            # print("Queue processed before duration. Signaling any idle workers to stop.")
            shutdown_event.set()
            for _ in range(len(threads)): # Ensure all workers get a sentinel if they are still up
                try:
                    q.put(None, block=False, timeout=0.1)
                except queue.Full: pass
                except Exception: pass
        
    except KeyboardInterrupt:
        print("Keyboard interrupt received. Signaling workers to stop...")
        shutdown_event.set()
        for _ in range(len(threads)): # Wake up workers
            try:
                q.put(None, block=False, timeout=0.1)
            except queue.Full: pass
            except Exception: pass
    
    finally:
        # print("Main thread: In finally block. Waiting for worker threads to terminate...")
        for t in threads:
            t.join(timeout=10.0) # Wait for worker threads to finish
            if t.is_alive():
                print(f"Warning: Thread {t.name} did not terminate in time.")
        
        # The timer_thread is a daemon, so it will exit if the main thread exits.
        # No need to explicitly join it unless debugging its completion.

        current_q_size = q.qsize()
        if current_q_size > 0:
             # It's hard to know if these are real items or unconsumed sentinels without iterating
             print(f"Note: Final queue size is {current_q_size}. This may include sentinel values or unprocessed items if shutdown was very abrupt.")
        
        elapsed_time = time.time() - start_time
        print(f"Crawling process ended. Total time: {elapsed_time:.2f} seconds.")

if __name__ == '__main__':
    print("Starting crawl script...")
    try:
        main()
    except Exception as e:
        print(f"An unexpected error occurred in main: {e}")
        import traceback
        traceback.print_exc()
    finally:
        print("Crawl script finished execution.")
