import os
import sqlite3
import threading
import requests
from bs4 import BeautifulSoup
from markdownify import markdownify as md
from urllib.parse import urlparse

DB_FILE = os.path.join("db", "opendomains.db")

db_lock = threading.Lock()

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

def fetch_and_save_markdown(url, md_path):
    try:
        resp = requests.get(url, timeout=10)
        if resp.status_code != 200:
            print(f"[ERROR] Failed to fetch {url}: status {resp.status_code}")
            return False
        soup = BeautifulSoup(resp.text, 'html.parser')
        markdown = md(str(soup))
        os.makedirs(os.path.dirname(md_path), exist_ok=True)
        with open(md_path, 'w') as f:
            f.write(markdown)
        print(f"[INFO] Saved markdown for {url} to {md_path}")
        return True
    except Exception as e:
        print(f"[ERROR] Exception fetching {url}: {e}")
        return False

def print_finished_markdown():
    with DBConnection() as cursor:
        cursor.execute("SELECT url, markdown_path FROM url_index WHERE status = 'finished' AND markdown_path IS NOT NULL")
        rows = cursor.fetchall()
        for url, md_path in rows:
            if md_path and os.path.exists(md_path):
                print(f"# URL: {url}\n# Markdown Path: {md_path}\n")
                with open(md_path, 'r') as f:
                    print(f.read())
                print("\n" + "-"*60 + "\n")
            elif md_path:
                print(f"# URL: {url}\n# Markdown Path: {md_path} (not found)\n")
                if fetch_and_save_markdown(url, md_path):
                    with open(md_path, 'r') as f:
                        print(f.read())
                    print("\n" + "-"*60 + "\n")
            else:
                print(f"# URL: {url}\n# Markdown Path: (not set)\n")

def main():
    print_finished_markdown()

if __name__ == '__main__':
    main()
