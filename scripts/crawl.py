import os
import sys
import csv
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

# Load environment variables if .env exists
if os.path.exists('.env'):
    load_dotenv('.env')

# Configuration
THREADS = int(os.getenv('THREADS', 5))
MAX_URLS_TO_PROCESS = int(os.getenv('MAX_URLS_TO_PROCESS', 100))
INIT_URL_FILE = 'config/init-url.txt'
TLD_FILE = 'config/tlds-alpha-by-domain.txt'
QUEUE_FILE = 'added_urls_queue.txt'
NEW_LOG = 'added_urls_new.log'
HISTORY_LOG = 'added_urls_history.txt'
DATA_DIR = 'data'
DOMAINS_DIR = 'domains'

# State
url_queue = queue.Queue()
processed_count = 0
processed_count_lock = threading.Lock()
visited_urls = set()
visited_urls_lock = threading.Lock()

# Track new urls seen in this run
new_urls_seen = set()
# Track urls already logged to history in this run
history_urls_seen = set()

def reset_new_log():
    with open(NEW_LOG, 'w') as f:
        pass

def load_seed_urls():
    if os.path.exists(INIT_URL_FILE):
        with open(INIT_URL_FILE) as f:
            for line in f:
                url = line.strip()
                if url:
                    url_queue.put(url)

def load_queued_urls():
    if os.path.exists(QUEUE_FILE):
        with open(QUEUE_FILE) as f:
            urls = [line.strip() for line in f if line.strip()]
        while urls:
            idx = random.randrange(len(urls))
            url = urls.pop(idx)
            url_queue.put(url)
        # After loading, clear the queue file (since all URLs are now in memory)
        with open(QUEUE_FILE, 'w') as f:
            pass

def save_to_queue_file(url):
    with open(QUEUE_FILE, 'a') as f:
        f.write(url + '\n')

def log_new_url(url):
    if url not in new_urls_seen:
        with open(NEW_LOG, 'a') as f:
            f.write(url + '\n')
        new_urls_seen.add(url)

def log_history_url(url):
    if url not in history_urls_seen:
        with open(HISTORY_LOG, 'a') as f:
            f.write(url + '\n')
        history_urls_seen.add(url)

def get_domain_csv(domain):
    return os.path.join(DATA_DIR, f'{domain}.csv')

def get_domain_folder(tld, domain):
    return os.path.join(DOMAINS_DIR, tld, domain)

def url_to_markdown_filename(url):
    parsed = urlparse(url)
    path = parsed.path.lstrip('/') or 'index'
    path = path.replace('/', '^')
    if parsed.query:
        path += '_' + parsed.query.replace('/', '^').replace('=', '-')
    return f'{path}.md'

def read_csv_state(domain):
    csv_path = get_domain_csv(domain)
    state = {}
    if os.path.exists(csv_path):
        with open(csv_path) as f:
            reader = csv.DictReader(f)
            if reader.fieldnames is None or 'url' not in reader.fieldnames:
                # Re-create CSV with correct header if missing/corrupted/empty
                f.close()
                with open(csv_path, 'w', newline='') as fw:
                    fieldnames = ['url', 'status', 'createdAt', 'updatedAt', 'tags']
                    writer = csv.DictWriter(fw, fieldnames=fieldnames)
                    writer.writeheader()
                return state
            for row in reader:
                if 'url' in row:
                    state[row['url']] = row
    return state

def write_csv_state(domain, state):
    csv_path = get_domain_csv(domain)
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(csv_path, 'w', newline='') as f:
        fieldnames = ['url', 'status', 'createdAt', 'updatedAt', 'tags']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for url, row in state.items():
            # Ensure all columns exist
            row.setdefault('createdAt', row.get('updatedAt', ''))
            row.setdefault('updatedAt', row.get('createdAt', ''))
            row.setdefault('tags', '')
            writer.writerow({
                'url': row.get('url', url),
                'status': row.get('status', ''),
                'createdAt': row.get('createdAt', ''),
                'updatedAt': row.get('updatedAt', ''),
                'tags': row.get('tags', ''),
            })

def update_csv_status(domain, url, status):
    state = read_csv_state(domain)
    now = time.strftime('%Y-%m-%d %H:%M:%S')
    if url in state:
        if not state[url].get('createdAt'):
            state[url]['createdAt'] = now
        state[url]['status'] = status
        state[url]['updatedAt'] = now
        state[url].setdefault('tags', '')
    else:
        state[url] = {
            'url': url,
            'status': status,
            'createdAt': now,
            'updatedAt': now,
            'tags': '',
        }
    write_csv_state(domain, state)

def get_csv_status(domain, url):
    state = read_csv_state(domain)
    return state.get(url, {}).get('status')

def robots_txt_allows(url):
    parsed = urlparse(url)
    robots_url = f'{parsed.scheme}://{parsed.netloc}/robots.txt'
    try:
        resp = requests.get(robots_url, timeout=5)
        if resp.status_code != 200:
            return True
        lines = resp.text.splitlines()
        user_agent = None
        allowed = True
        for line in lines:
            line = line.strip()
            if line.lower().startswith('user-agent:'):
                user_agent = line.split(':', 1)[1].strip()
            if user_agent == '*' and line.lower().startswith('disallow:'):
                path = line.split(':', 1)[1].strip()
                if parsed.path.startswith(path):
                    allowed = False
        return allowed
    except Exception:
        return True

def fetch_and_save(url, tld, domain):
    try:
        resp = requests.get(url, timeout=10)
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

def process_url(url):
    global processed_count
    ext = tldextract.extract(url)
    tld = ext.suffix
    domain = ext.top_domain_under_public_suffix
    if not tld or not domain:
        return
    with visited_urls_lock:
        if url in visited_urls:
            return
        visited_urls.add(url)
    status = get_csv_status(domain, url)
    if status in {'finished', 'blocked_by_robots', 'error'}:
        return
    if not status:
        update_csv_status(domain, url, 'pending_robots_check')
    # robots.txt check
    if not robots_txt_allows(url):
        update_csv_status(domain, url, 'blocked_by_robots')
        return
    update_csv_status(domain, url, 'editing')
    soup = fetch_and_save(url, tld, domain)
    if not soup:
        update_csv_status(domain, url, 'error')
        return
    update_csv_status(domain, url, 'finished')
    log_history_url(url)
    log_new_url(url)
    links = extract_links(soup, url)
    for link in links:
        ext2 = tldextract.extract(link)
        domain2 = ext2.top_domain_under_public_suffix
        if domain2 == domain:
            with visited_urls_lock:
                if link not in visited_urls:
                    url_queue.put(link)
        else:
            save_to_queue_file(link)
            if not os.path.exists(get_domain_csv(domain2)):
                update_csv_status(domain2, link, 'pending_robots_check')
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

def main():
    global new_urls_seen, history_urls_seen
    new_urls_seen = set()
    history_urls_seen = set()
    reset_new_log()
    load_seed_urls()
    load_queued_urls()
    threads = []
    for _ in range(THREADS):
        t = threading.Thread(target=worker)
        t.start()
        threads.append(t)
    for t in threads:
        t.join()
    print(f'Crawling finished. Processed {processed_count} URLs.')

if __name__ == '__main__':
    main()
