"""
Script to generate the folder structure for each TLD under domains/ using tlds-alpha-by-domain.txt.
"""
import os

TLD_FILE = os.path.join('config', 'tlds-alpha-by-domain.txt')
DOMAINS_DIR = 'domains'

def main():
    """Create a folder for each TLD listed in the config file under domains/."""
    if not os.path.exists(DOMAINS_DIR):
        os.makedirs(DOMAINS_DIR)
    with open(TLD_FILE, 'r') as f:
        for line in f:
            tld = line.strip().lower()
            if not tld or tld.startswith('#'):
                continue
            tld_dir = os.path.join(DOMAINS_DIR, tld)
            if not os.path.exists(tld_dir):
                os.makedirs(tld_dir)
    print(f"Initialized TLD folders in '{DOMAINS_DIR}/'")

if __name__ == '__main__':
    main()
