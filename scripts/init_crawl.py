"""
Script to generate the folder structure for each TLD under domains/ using tlds-alpha-by-domain.txt,
and initialize the SQLite databases for URL queue and history tracking.
"""
import os
import sqlite3
import csv
import datetime

TLD_FILE = os.path.join('config', 'tlds-alpha-by-domain.txt')
DIR_LIST = ["domains", "db"]  # Added db directory
DOMAINS_DIR = "domains"
DB_FILE = os.path.join("db", "opendomains.db")

# Initial seeds configuration file
INIT_URLS = os.path.join('config', 'init-url.txt')

# SQLite datetime adapter functions
def adapt_datetime(val):
    """Convert datetime to ISO format string for SQLite storage"""
    return val.isoformat()

def convert_datetime(val):
    """Convert ISO format string back to datetime from SQLite"""
    try:
        return datetime.datetime.fromisoformat(val.decode())
    except:
        return None

def init_database():
    """Initialize SQLite database for URL history, new logs, and status tracking."""
    conn = sqlite3.connect(DB_FILE)
    
    # Register datetime adapters to avoid deprecation warning
    sqlite3.register_adapter(datetime.datetime, adapt_datetime)
    sqlite3.register_converter("TIMESTAMP", convert_datetime)
    
    cursor = conn.cursor()
    
    # Create URL new log table (for recently discovered URLs)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS url_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL UNIQUE,
        domain TEXT,
        discovered_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    # Create URL index table (now includes status fields)
    cursor.execute('DROP TABLE IF EXISTS url_index')
    cursor.execute('''
    CREATE TABLE url_index (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL UNIQUE,
        domain TEXT,
        tld TEXT,
        markdown_path TEXT,
        status TEXT,
        createdAt TIMESTAMP,
        updatedAt TIMESTAMP,
        tags TEXT
    )
    ''')
    
    # Create indexes for performance
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_new_domain ON url_new(domain)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_url_index_url ON url_index(url)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_url_index_domain ON url_index(domain)')
    
    # Import any existing seed URLs from init-url.txt if available
    if os.path.exists(INIT_URLS):
        try:
            with open(INIT_URLS, 'r') as f:
                seed_urls = [line.strip() for line in f if line.strip()]
            if seed_urls:
                now = datetime.datetime.now().replace(microsecond=0)
                iso_now = now.isoformat(' ')
                for url in seed_urls:
                    cursor.execute('INSERT OR IGNORE INTO url_index (url, status, createdAt, updatedAt) VALUES (?, ?, ?, ?)', (url, 'pending_robots_check', iso_now, iso_now))
                print(f"Imported {len(seed_urls)} seed URLs into url_index queue.")
        except Exception as e:
            print(f"Error importing seed URLs: {str(e)}")
    
    # Commit changes
    conn.commit()
    print(f"Initialized database '{DB_FILE}' for URL tracking.")
    conn.close() # Close connection after all operations are done


def migrate_existing_urls():
    """Migrate URLs from existing text files to the SQLite database."""
    files_to_migrate = {
        'added_urls_queue.txt': 'url_index',  # Migrate to url_index now
        'added_urls_new.log': 'url_new'
    }
    
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    for file_name, table_name in files_to_migrate.items():
        file_path = os.path.join('data', file_name)
        if os.path.exists(file_path):
            try:
                with open(file_path, 'r') as f:
                    urls = [line.strip() for line in f if line.strip()]
                
                if urls:
                    if table_name == 'url_index':
                        now = datetime.datetime.now().replace(microsecond=0)
                        iso_now = now.isoformat(' ')
                        for url in urls:
                            cursor.execute('INSERT OR IGNORE INTO url_index (url, status, createdAt, updatedAt) VALUES (?, ?, ?, ?)', (url, 'pending_robots_check', iso_now, iso_now))
                    else:
                        data = [(url,) for url in urls]
                        cursor.executemany(f'INSERT OR IGNORE INTO {table_name} (url) VALUES (?)', data)
                    print(f"Migrated {len(urls)} URLs from '{file_name}' to '{table_name}' table.")
            except Exception as e:
                print(f"Error migrating URLs from '{file_name}': {str(e)}")
    
    conn.commit()
    conn.close()


def main():
    """Create directories for domains/, data/, db/, initialize TLD folders and SQLite database."""
    # Ensure base directories exist, including 'db'
    for directory in DIR_LIST:
        os.makedirs(directory, exist_ok=True)
        print(f"Ensured directory '{directory}' exists.")

    # Create TLD subfolders under domains/
    if os.path.exists(TLD_FILE):
        with open(TLD_FILE, 'r') as f:
            for line in f:
                tld = line.strip().lower()
                if not tld or tld.startswith('#'):
                    continue
                tld_dir = os.path.join(DOMAINS_DIR, tld)
                os.makedirs(tld_dir, exist_ok=True)
        print(f"Initialized TLD folders in '{DOMAINS_DIR}/'.")
    else:
        print(f"Warning: TLD file '{TLD_FILE}' not found; no TLD folders created.")
    
    # Initialize the SQLite database
    init_database()

if __name__ == '__main__':
    main()
