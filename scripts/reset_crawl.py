"""
Script to remove the data/, domains/, and status/ folders to reset the crawl state.
"""
import os
import shutil

# DATA_DIR = 'data'
# DOMAINS_DIR = 'domains'
# STATUS_DIR = 'status'
DIR_LIST = ["data", "domains", "status"]
LOG_FILE = ["added_urls_new.log", "added_urls_history.txt", "added_urls_queue.txt"]

def main():
    """Remove the data, domains, and status directories if they exist."""
    print("Attempting to reset crawl state...")

    for directory in DIR_LIST:
        if os.path.exists(directory):
            try:
                shutil.rmtree(directory)
                print(f"Successfully removed directory: {directory}")
            except OSError as e:
                print(f"Error removing directory {directory}: {e.strerror}")
        else:
            print(f"Directory not found, skipping removal: {directory}")
    
    # empty the log file if it exists
    for log in LOG_FILE:
        if os.path.exists(log):
            try:
                with open(log, 'w') as f:
                    f.write("")
                print(f"Successfully emptied log file: {log}")
            except OSError as e:
                print(f"Error emptying log file {log}: {e.strerror}")
        else:
            print(f"Log file not found, skipping emptying: {log}")

    print("Reset script finished.")

if __name__ == '__main__':
    main()
