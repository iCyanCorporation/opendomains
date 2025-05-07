# opendomains

**A scalable, automated system to archive web structures across all valid TLDs.**

---

## 🧭 Project Overview

**opendomains** is a fully automated, GitHub Actions-friendly crawler that catalogs websites and their subpages into structured markdown documents. Designed for archival and research purposes, it navigates the modern web by:

- Generating a folder structure from ICANN’s official `tlds-alpha-by-domain.txt`.
- Launching URL crawls defined in `config/init-url.txt`.
- **Respecting each website's `robots.txt` rules and skipping URLs that are disallowed for crawling.**
- Recursively discovering and saving reachable subpages from the same domain (any path) and external domains into `domains/` as `.md` files.
- Maintaining per-domain CSV files in the `data/` directory for tracking and concurrency control.

### 🔍 Problem Statement

The web changes rapidly. Link rot, content drift, and lack of long-term availability make research and archival difficult. This project attempts to mitigate that by capturing live website structures in a human-readable, version-controllable format.

### 🎯 Target Audience

- Researchers, digital preservationists, and web historians.
- Developers or AI agents needing large-scale web structure data.
- Open-source archivists aiming to replicate or extend Common Crawl-like behavior in minimal form.

---

## 🏗️ Architecture & Design Principles

### 🔧 Technology Stack

- **Language:** Python 3.10+
- **Execution Platform:** GitHub Actions
- **Data Storage:** Flat files (`.md`, `.json`) under the `domains/` directory and CSV files in the `data/` directory
- **Concurrency:** Python `threading` for multi-threaded crawling
- **Scheduler:** GitHub Actions cron jobs
- **Parsing:** `requests`, `beautifulsoup4`, `tldextract`

### ⚙️ Key Design Decisions

- **Concurrency & Locking:** Multi-threaded crawling is supported. Files are locked by checking editing status in the CSV file before write access.
- **Scalability:** Modular and parallelizable per TLD folder.
- **Fail-Safe Indexing:** CSV files in the `data/` directory track progress percentage, last update timestamps, and scraping state (`waiting`, `editing`, `finished`).
- **Non-intrusive GitHub Actions:** Crawls are divided and throttled to avoid timeouts and GitHub rate limits.

---

## 🛠️ Installation & Setup

### 📦 Dependencies

Ensure the following Python packages are installed:

```bash
pip install -r requirements.txt
```

> If `requirements.txt` is missing, the main dependencies are:
>
> - `requests`
> - `beautifulsoup4`
> - `tldextract`
> - `markdownify`
> - `python-dotenv` (if using environment variables)

### 🧪 Environment Variables (Optional)

You can configure settings in a `.env` file:

```env
THREADS=5
MAX_URLS_TO_PROCESS=100
```

### 🗂️ Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/opendomains.git
   cd opendomains
   ```

2. Populate the initial crawl configuration:

   - Download `tlds-alpha-by-domain.txt` into `config/`.
   - Add seed URLs to `config/init-url.txt`.

3. Generate initial folder structure (creates `domains/` with TLD subfolders and `data/`):

   ```bash
   python scripts/init_crawl.py
   ```

   This script initializes the `domains/` directory with subfolders for each TLD and also creates the `data/` directory.

4. Start the crawler (locally):

   ```bash
   python scripts/crawl.py
   ```

5. Resetting the crawl (optional):
   To remove all crawled data (`data/` and `domains/` folders) and start fresh:
   ```bash
   python scripts/reset_crawl.py
   ```

---

## 🚀 Usage Guidelines

### 🧭 Running Locally

```bash
python scripts/crawl.py
```

**Expected Workflow in `crawl.py`:**

0. **Before Running**

   - reset added_domains_new.log into empty

1. **Load Queue:**

   - Read seed URLs from `config/init-url.txt`.(first run only)
   - Load any queued URLs from `added_domains_queue.txt` (if used).

2. **For Each URL in the Queue:**

   - **Check how many row in added_domains_new.log:**

     - if row count is over MAX_URLS_TO_PROCESS then stop
     - if not, keep going

   - **Pop out a URL from the queue**

   - **Check CSV State:**

     - Look up the URL in the corresponding domain's CSV file in `data/`.
     - If the URL is marked as `finished`, `blocked_by_robots`, or `error`, skip it.
     - If not present, add it with state `pending_robots_check`.

   - **Check robots.txt:**

     - If allowed, update state to `editing`.
     - If disallowed, update state to `blocked_by_robots` and skip further processing.

   - **Crawl and Save:**

     - Fetch the page content.
     - Convert to markdown and save under the correct `domains/<tld>/<domain>/` folder.
       - convert character / into ^
     - Update the CSV state to `finished` for the URL.
     - Log the domain to `added_domains_new.log` if it is new row by row.
     - Log the domain to `added_domains_history.txt` row by row.

   - **Extract and Queue New URLs:**
     - Parse links from the page.
     - For each new URL:
       - If it belongs to the same domain, add to the queue if not already processed.
       - If it is an external domain, add to `added_domains_queue.txt` and initialize its CSV if not present.

3. **Repeat** until the queue is empty or `MAX_URLS_TO_PROCESS` is reached.

4. **Concurrency:**

   - Multiple threads may process URLs in parallel, with file locks or CSV state checks to avoid conflicts.

5. **Stateful Resumption:**
   - On restart, the script resumes from the last state using the CSV files and queue files.

### 🛎 GitHub Actions Routine

The project includes `.github/workflows/crawl.yml` which is configured to:

- Run scheduled jobs frequently (e.g., every 10 minutes as per the current `cron: "*/10 * * * *"` setting in the workflow).
- The `scripts/crawl.py` is configured (via the `MAX_URLS_TO_PROCESS=10000` environment variable set in the workflow) to attempt a graceful shutdown after successfully processing 10,000 URLs.
- Within the GitHub Actions environment, the crawler script is also run with `THREADS=10`, overriding any `.env` or script defaults for these specific values.
- **Stateful Resumption:** The script checks the status of URLs in the `data/` CSV files before processing. If a URL is already marked as `finished`, `blocked_by_robots`, or `error`, it will be skipped in the current run. This allows the crawl to effectively resume by not re-processing completed or failed items.
- The script logs any newly encountered domains (i.e., domains for which a folder is created in `domains/` for the first time during that run) to `added_domains_new.log`.
- The "Commit and push changes" step uses `if: always()`, meaning it will attempt to run and commit any generated data (including `added_domains_new.log`) even if previous steps (like the crawl itself) are cancelled or encounter errors. This helps ensure data is saved in various termination scenarios.
- After committing, a "Create Release for New Domains" step runs (also with `if: always()`). If `added_domains_new.log` contains entries, this step creates a new GitHub Release. The release is tagged with the current timestamp (e.g., `crawl-YYYYMMDD-HHMMSS`), includes a summary of the new domains in its notes, and attaches the `added_domains_new.log` file as an asset.
- This setup allows for more frequent updates to the repository and provides a summary of newly added domains via GitHub Releases.
- Updates CSV files in the `data/` directory with crawl status and metadata.

### 🔁 Workflow States

Each target domain in the CSV file will reflect:

- `pending_robots_check`: URL taken from queue, domain folder created, CSV entry made; awaiting `robots.txt` processing.
- `editing`: `robots.txt` allows crawling (or no `robots.txt`), page content is being fetched and processed.
- `blocked_by_robots`: `robots.txt` disallows crawling for this URL.
- `finished`: Crawl completed for this specific URL, content saved, subpages (if any) queued.
- `error`: Failed to fetch or process the URL after retry attempts.
- `waiting`: (Implicitly) URLs in `config/init-url.txt` not yet picked up or URLs queued by other pages but not yet processed.

---

## 🗃️ Code & Folder Structure

```
opendomains/
│
├── config/
│   ├── init-url.txt          # Seed URLs to start crawling
│   └── tlds-alpha-by-domain.txt # Source of TLDs from ICANN
│
├── data/                     # Stores CSV files for crawl progress and metadata
│   └── example.com.csv
│
├── domains/                  # Stores crawled content as markdown
│   └── com/
│       ├── example.com/
│       │   ├── index.md
│       │   ├── about.md
│       │   └── contact.md
│       └── product.example.com/
│           ├── index.md
│           └── about.md
│
├── scripts/
│   ├── crawl.py              # Main crawling script
│   ├── init_crawl.py         # Bootstrap script for folder creation (domains/ and data/)
│   └── reset_crawl.py        # Script to remove data/ and domains/ folders
│
├── .github/workflows/
│   └── crawl.yml             # Scheduled GitHub Actions workflow
│
├── added_domains_new.log     # Log of domains added in the last crawl run (cleared on each run and update when a crwal get new urls in real-time)
│
├── added_domains_history.txt # Add urls after convert it into markdown
│
├── added_domains_queue.txt   # Add urls when get urls from a page
│
└── README.md

# Documentation reflects CSV-based progress tracking in data/, markdown content in domains/, and release process.
```

### 🧹 Naming & Formatting

- Folder names follow TLD and domain hierarchy.
- Markdown file names mirror page paths (`about`, `contact`, etc.).
- Code uses [PEP8](https://peps.python.org/pep-0008/) formatting.

---

## 🤝 Contribution & Collaboration

### 🔀 Branching Strategy

- `main`: Production branch (GitHub Actions runs here).
- Feature branches: `feature/<name>`

### 🧪 Pull Requests

- Include clear descriptions.
- Reference related issues.
- Ensure tests or dry runs are included.

### 🔍 Code Review Process

- All PRs require at least one review before merging.
- Review checklist includes structure, naming, and CSV file safety checks.

### 🐞 Reporting Issues & Suggestions

- Use GitHub Issues to report bugs or request features.
- Label clearly (`bug`, `feature`, `question`, etc.).

---

## 🪪 Licensing & Contact Information

### 📄 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for full details.
