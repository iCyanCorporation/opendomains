"""
Script to remove the data/, domains/, and status/ folders to reset the crawl state.
Then re-initialize the database with init_crawl.py and regenerate Prisma client.
"""
import os
import shutil
import sqlite3
import subprocess
import sys
from pathlib import Path

DIR_LIST = ["data", "domains", "status"]
DB_FILE = os.path.join("db", "opendomains.db")
TMP_DB_FILE = os.path.join("db", "opendomains.db-journal")

def run_command(command, explanation):
    """Run a shell command and print its output"""
    print(f"\n{explanation}...")
    try:
        result = subprocess.run(command, shell=True, check=True, text=True, 
                               stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Command failed with error: {e}")
        print(f"Error output: {e.stderr}")
        return False

def main():
    """Remove directories and database, then re-initialize."""
    print("Attempting to reset crawl state...")

    # Remove directories
    for directory in DIR_LIST:
        if os.path.exists(directory):
            try:
                shutil.rmtree(directory)
                print(f"Successfully removed directory: {directory}")
            except OSError as e:
                print(f"Error removing directory {directory}: {e.strerror}")
        else:
            print(f"Directory not found, skipping removal: {directory}")
    
    # Remove the SQLite database file if it exists
    if os.path.exists(DB_FILE):
        try:
            os.remove(DB_FILE)
            print(f"Successfully removed database file: {DB_FILE}")
        except OSError as e:
            print(f"Error removing database file {DB_FILE}: {e.strerror}")
    else:
        print(f"Database file not found, skipping removal: {DB_FILE}")

    # Remove the SQLite journal file if it exists
    if os.path.exists(TMP_DB_FILE):
        try:
            os.remove(TMP_DB_FILE)
            print(f"Successfully removed database journal file: {TMP_DB_FILE}")
        except OSError as e:
            print(f"Error removing database journal file {TMP_DB_FILE}: {e.strerror}")

    # Make sure db directory exists
    os.makedirs("db", exist_ok=True)
    
    # # Re-initialize with init_crawl.py
    # print("\nRe-initializing the database with init_crawl.py...")
    # if not run_command("python scripts/init_crawl.py", "Running init_crawl.py"):
    #     print("Warning: Failed to run init_crawl.py. Database may not be properly initialized.")
    
    # # Check if we need to run Prisma migrations
    # prisma_schema = Path("prisma/schema.prisma")
    # if prisma_schema.exists():
    #     print("\nPrisma schema detected. Running Prisma migrations...")
    #     run_command("npx prisma migrate reset --force", "Resetting Prisma migrations")
    #     run_command("npx prisma generate", "Regenerating Prisma client")

    # empty the added_domains_new.log file
    added_domains_new_log = os.path.join("", "added_domains_new.log")
    if os.path.exists(added_domains_new_log):
        try:
            with open(added_domains_new_log, 'w') as f:
                f.write("")
            print(f"Successfully emptied file: {added_domains_new_log}")
        except OSError as e:
            print(f"Error emptying file {added_domains_new_log}: {e.strerror}")
    else:
        print(f"File not found, skipping emptying: {added_domains_new_log}")

    
    print("\nReset script finished.")

if __name__ == '__main__':
    main()
