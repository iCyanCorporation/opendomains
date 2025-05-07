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

# Load environment variables if .env exists
load_dotenv()
THREADS = int(os.getenv('THREADS', 5))
TIMEOUT = int(os.getenv('TIMEOUT', 10))
RETRY_LIMIT = int(os.getenv('RETRY_LIMIT', 3))

CONFIG_URLS = os.path.join('config', 'init-url.txt')
DATA_DIR = 'data'
DOMAINS_DIR = 'domains'

os.makedirs(DATA_DIR, exist_ok=True)
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
    # Use file lock for concurrency
    with FileLock(lock_path):
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

def crawl_worker(q, visited, robots_cache, user_agent='OpenDomainsBot'):
    while True:
        try:
            url = q.get(timeout=2)
        except:
            return
        if url in visited:
            q.task_done()
            continue
        # Check robots.txt
        rp = get_robots_parser(url, robots_cache)
        if rp and not rp.can_fetch(user_agent, url):
            update_csv(url, 'blocked_by_robots', 0, 0)
            q.task_done()
            continue
        visited.add(url)
        tld, domain = get_tld_domain(url)
        folder = get_domain_folder(url)
        os.makedirs(folder, exist_ok=True)
        md_path = get_md_path(url)
        update_csv(url, 'editing', 0, 0)
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
            raw_href = a.get('href')
            if not raw_href or raw_href.startswith('#') or raw_href.lower().startswith('mailto:') or raw_href.lower().startswith('javascript:'):
                continue

            link = urljoin(url, raw_href)
            parsed_link = urlparse(link)

            # Ensure it's an HTTP/HTTPS link and has a network location (domain)
            if parsed_link.scheme not in ['http', 'https'] or not parsed_link.netloc:
                continue

            if link not in visited:
                q.put(link)
                subpages_added_to_queue.add(link)
        
        progress = 100  # For demo, mark as done after one pass
        update_csv(url, 'finished', len(subpages_added_to_queue), progress)
        q.task_done()

def main():
    # Load seed URLs
    with open(CONFIG_URLS, 'r') as f:
        seeds = [line.strip() for line in f if line.strip() and not line.startswith('#')]
    q = Queue()
    visited = set()
    robots_cache = dict()
    for url in seeds:
        q.put(url)
    threads = []
    for _ in range(THREADS):
        t = threading.Thread(target=crawl_worker, args=(q, visited, robots_cache))
        t.daemon = True
        t.start()
        threads.append(t)
    q.join()
    for t in threads:
        t.join(timeout=1)
    print('Crawling complete.')

if __name__ == '__main__':
    main()
