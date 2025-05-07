"""
Script to remove the data/ and domains/ folders to reset the crawl state.
"""
import os
import shutil

DATA_DIR = 'data'
DOMAINS_DIR = 'domains'

def main():
    """Remove the data and domains directories if they exist."""
    print("Attempting to reset crawl data...")

    if os.path.exists(DATA_DIR):
        try:
            shutil.rmtree(DATA_DIR)
            print(f"Successfully removed directory: {DATA_DIR}")
        except OSError as e:
            print(f"Error removing directory {DATA_DIR}: {e.strerror}")
    else:
        print(f"Directory not found, skipping removal: {DATA_DIR}")

    if os.path.exists(DOMAINS_DIR):
        try:
            shutil.rmtree(DOMAINS_DIR)
            print(f"Successfully removed directory: {DOMAINS_DIR}")
        except OSError as e:
            print(f"Error removing directory {DOMAINS_DIR}: {e.strerror}")
    else:
        print(f"Directory not found, skipping removal: {DOMAINS_DIR}")

    print("Reset script finished.")

if __name__ == '__main__':
    main()
