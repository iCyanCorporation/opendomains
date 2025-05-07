import os
import threading
import queue
import time
import requests
import tldextract
from bs4 import BeautifulSoup
from markdownify import markdownify as md
from urllib.parse import urlparse, urljoin
from dotenv import load_dotenv
import random
import sqlite3
from collections import OrderedDict
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# Global DB lock for thread-safe SQLite access
db_lock = threading.Lock()

# Load environment variables if .env exists
if os.path.exists('.env'):
    load_dotenv('.env')

# Configuration
THREADS = int(os.getenv('THREADS', 5))
MAX_URLS_TO_PROCESS = int(os.getenv('MAX_URLS_TO_PROCESS', 3))
INIT_URL_FILE = 'config/init-url.txt'
TLD_FILE = 'config/tlds-alpha-by-domain.txt'
DB_FILE = os.path.join("db", "opendomains.db")
DOMAINS_DIR = 'domains'

# Create and configure requests session with retries
def get_requests_session():
    session = requests.Session()
    retries = Retry(total=3, backoff_factor=0.5, status_forcelist=[500, 502, 503, 504])
    session.mount('http://', HTTPAdapter(max_retries=retries))
    session.mount('https://', HTTPAdapter(max_retries=retries))
    return session

# Initialize requests session
requests_session = get_requests_session()

# State
url_queue = queue.Queue()
processed_count = 0
processed_count_lock = threading.Lock()

# Ensure database exists, create if it doesn't
def ensure_db_exists():
    if not os.path.exists(DB_FILE):
        print(f"Database file {DB_FILE} not found. Creating new database...")
        from init_crawl import init_database
        init_database()

# Database connection helper with context manager
class DBConnection:
    def __init__(self):
        self.conn = None
        
    def __enter__(self):
        db_lock.acquire()
        self.conn = sqlite3.connect(DB_FILE)
        return self.conn.cursor()
        
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.conn:
            self.conn.commit()
            self.conn.close()
        db_lock.release()

def reset_editing_status():
    """Reset all 'editing' statuses to 'pending_robots_check' before starting crawl"""
    with DBConnection() as cursor:
        cursor.execute("UPDATE url_index SET status = 'pending_robots_check' WHERE status = 'editing'")

def reset_new_log():
    """Clear the url_new table for a fresh run"""
    with DBConnection() as cursor:
        cursor.execute('DELETE FROM url_new')

def load_seed_urls():
    """Load seed URLs directly from init-url.txt if it exists and add to url_index if not present."""
    if os.path.exists(INIT_URL_FILE):
        with open(INIT_URL_FILE) as f:
            now = time.strftime('%Y-%m-%d %H:%M:%S')
            for line in f:
                url = line.strip()
                if url:
                    with DBConnection() as cursor:
                        cursor.execute('SELECT 1 FROM url_index WHERE url = ?', (url,))
                        if not cursor.fetchone():
                            cursor.execute('INSERT INTO url_index (url, status, createdAt, updatedAt) VALUES (?, ?, ?, ?)', (url, 'pending_robots_check', now, now))

def load_status_queue():
    """Load URLs from url_index table where status is 'pending_robots_check'."""
    with DBConnection() as cursor:
        cursor.execute("SELECT url FROM url_index WHERE status = 'pending_robots_check' ORDER BY RANDOM()")
        urls = [row[0] for row in cursor.fetchall()]
        for url in urls:
            url_queue.put(url)
        print(f"Loaded {len(urls)} URLs from url_index queue (randomized).")

def log_new_url(url):
    """Log a newly discovered URL to the url_new table"""
    with DBConnection() as cursor:
        # Extract domain for better organization
        ext = tldextract.extract(url)
        domain = ext.domain + '.' + ext.suffix if ext.suffix else ext.domain
        
        cursor.execute('INSERT OR IGNORE INTO url_new (url, domain) VALUES (?, ?)', 
                      (url, domain))

def add_to_url_index(url, tld, domain, markdown_path):
    """Add an entry to the url_index table."""
    with DBConnection() as cursor:
        cursor.execute("INSERT OR IGNORE INTO url_index (url, domain, tld, markdown_path) VALUES (?, ?, ?, ?)",
                       (url, domain, tld, markdown_path))

def update_url_status(domain, url, status, markdown_path=None):
    now = time.strftime('%Y-%m-%d %H:%M:%S')
    with DBConnection() as cursor:
        if status == 'finished' and markdown_path is not None:
            cursor.execute(
                "UPDATE url_index SET status = ?, updatedAt = ?, markdown_path = ? WHERE url = ?",
                (status, now, markdown_path, url)
            )
            if cursor.rowcount == 0:
                cursor.execute(
                    "INSERT INTO url_index (url, domain, status, createdAt, updatedAt, markdown_path) VALUES (?, ?, ?, ?, ?, ?)",
                    (url, domain, status, now, now, markdown_path)
                )
        else:
            cursor.execute("UPDATE url_index SET status = ?, updatedAt = ? WHERE url = ?", (status, now, url))
            if cursor.rowcount == 0:
                cursor.execute(
                    "INSERT INTO url_index (url, domain, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)",
                    (url, domain, status, now, now)
                )

def get_url_status(domain, url):
    with DBConnection() as cursor:
        cursor.execute("SELECT status FROM url_index WHERE url = ? AND domain = ?", (url, domain))
        result = cursor.fetchone()
        return result[0] if result else None

def get_domain_folder(tld, domain):
    return os.path.join(DOMAINS_DIR, tld, domain)

def url_to_markdown_filename(url):
    parsed = urlparse(url)
    path = parsed.path.lstrip('/') or 'index'
    path = path.replace('/', '^')
    if parsed.query:
        path += '_' + parsed.query.replace('/', '^').replace('=', '-')
    return f'{path}.md'

# Cache robots.txt responses
robots_cache = {}
robots_cache_lock = threading.Lock()

def robots_txt_allows(url):
    parsed = urlparse(url)
    domain = parsed.netloc
    
    with robots_cache_lock:
        if domain in robots_cache:
            rules = robots_cache[domain]
        else:
            robots_url = f'{parsed.scheme}://{parsed.netloc}/robots.txt'
            try:
                resp = requests_session.get(robots_url, timeout=5)
                if resp.status_code != 200:
                    robots_cache[domain] = {'allowed': True, 'paths': []}
                    return True
                
                lines = resp.text.splitlines()
                rules = {'allowed': True, 'paths': []}
                current_agent = None
                
                for line in lines:
                    line = line.strip().lower()
                    if line.startswith('user-agent:'):
                        current_agent = line.split(':', 1)[1].strip()
                    elif current_agent == '*' and line.startswith('disallow:'):
                        path = line.split(':', 1)[1].strip()
                        if path:
                            rules['paths'].append(path)
                
                robots_cache[domain] = rules
            except Exception:
                robots_cache[domain] = {'allowed': True, 'paths': []}
                return True
    
    # Check if URL path is allowed
    for disallowed_path in rules['paths']:
        if parsed.path.startswith(disallowed_path):
            return False
    
    return True

def fetch_and_save(url, tld, domain):
    try:
        resp = requests_session.get(url, timeout=10)
        if resp.status_code != 200:
            return False
        soup = BeautifulSoup(resp.text, 'html.parser')
        markdown = md(str(soup))
        folder = get_domain_folder(tld, domain)
        os.makedirs(folder, exist_ok=True)
        filename = url_to_markdown_filename(url)
        filepath = os.path.join(folder, filename)
        with open(filepath, 'w') as f:
            f.write(markdown)
        return soup
    except Exception:
        return None

def extract_links(soup, base_url):
    links = set()
    for a in soup.find_all('a', href=True):
        href = a['href']
        if href.startswith('mailto:') or href.startswith('javascript:'):
            continue
        full_url = urljoin(base_url, href)
        links.add(full_url)
    return links

def is_url_indexed(url):
    """Check if URL has been indexed by looking in the url_index table."""
    with DBConnection() as cursor:
        cursor.execute('SELECT 1 FROM url_index WHERE url = ? LIMIT 1', (url,))
        return cursor.fetchone() is not None

def process_url(url):
    global processed_count
    
    # Skip if already indexed
    # Only skip if status indicates finished, blocked, or error (handled below)
    
    ext = tldextract.extract(url)
    tld = ext.suffix
    domain = ext.top_domain_under_public_suffix
    if not tld or not domain:
        print(f"[DEBUG] Skipping {url}: missing tld or domain (tld={tld}, domain={domain})")
        return
    
    status = get_url_status(domain, url)
    if status in {'finished', 'blocked_by_robots', 'error'}:
        print(f"[DEBUG] Skipping {url}: status is {status}")
        return
    if not status:
        update_url_status(domain, url, 'pending_robots_check')
    
    # robots.txt check
    if not robots_txt_allows(url):
        print(f"[DEBUG] Skipping {url}: blocked by robots.txt")
        update_url_status(domain, url, 'blocked_by_robots')
        return
    
    update_url_status(domain, url, 'editing')
    soup = fetch_and_save(url, tld, domain)
    if not soup:
        print(f"[DEBUG] Skipping {url}: fetch or parse failed")
        update_url_status(domain, url, 'error')
        return
    
    markdown_path = os.path.join(get_domain_folder(tld, domain), url_to_markdown_filename(url))
    update_url_status(domain, url, 'finished', markdown_path=markdown_path)
    log_new_url(url)
    add_to_url_index(url, tld, domain, markdown_path)
    
    links = extract_links(soup, url)
    for link in links:
        ext2 = tldextract.extract(link)
        domain2 = ext2.top_domain_under_public_suffix
        if domain2 == domain:
            if not is_url_indexed(link):
                url_queue.put(link)
                update_url_status(domain2, link, 'pending_robots_check')
        else:
            update_url_status(domain2, link, 'pending_robots_check')
    
    with processed_count_lock:
        processed_count += 1

def worker():
    while True:
        with processed_count_lock:
            if processed_count >= MAX_URLS_TO_PROCESS:
                break
        try:
            url = url_queue.get(timeout=2)
        except queue.Empty:
            break
        process_url(url)
        url_queue.task_done()

def get_processed_count_from_new_table():
    """Get current number of processed URLs in this run from the url_new table"""
    with DBConnection() as cursor:
        cursor.execute('SELECT COUNT(*) FROM url_new')
        return cursor.fetchone()[0]

def main():
    global processed_count
    
    # Make sure database exists
    ensure_db_exists()

    # Reset all 'editing' statuses to 'pending_robots_check'
    reset_editing_status()
    
    # Reset new URLs log for this run
    reset_new_log()
    
    # Load seed URLs (ensure all seeds are in url_index)
    load_seed_urls()
    
    # Load queued URLs from url_index table
    load_status_queue()
    
    # Set starting processed count from current new URLs count
    processed_count = get_processed_count_from_new_table()
    
    threads = []
    for _ in range(THREADS):
        t = threading.Thread(target=worker)
        t.daemon = True
        t.start()
        threads.append(t)
    
    for t in threads:
        t.join()
    
    print(f'Crawling finished. Processed {processed_count} URLs.')
    write_added_domains_log()

def write_added_domains_log():
    """Write all URLs from url_new table to added_domains_new.log"""
    with DBConnection() as cursor:
        cursor.execute('SELECT url FROM url_new')
        urls = [row[0] for row in cursor.fetchall()]
    with open('added_domains_new.log', 'w') as f:
        for url in urls:
            f.write(url + '\n')

if __name__ == '__main__':
    main()
