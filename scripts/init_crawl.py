"""
Script to generate the folder structure for each TLD under domains/ using tlds-alpha-by-domain.txt,
and initialize the status/next-seeds.txt file for crawl state.
"""
import os

TLD_FILE = os.path.join('config', 'tlds-alpha-by-domain.txt')
DIR_LIST = ["data", "domains"]
DOMAINS_DIR = "domains"
DATA_DIR = "data"

# Initial seeds configuration file
INIT_URLS = os.path.join('config', 'init-url.txt')

def main():
    """Create directories for domains/, data/, initialize TLD folders and status file."""
    # Ensure base directories exist
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

    print(f"Ensured base data directory '{DATA_DIR}/' exists.")

if __name__ == '__main__':
    main()
