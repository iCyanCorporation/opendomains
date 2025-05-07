# opendomains

**A scalable, automated system to archive web structures across all valid TLDs.**

---

## 🧭 Project Overview

**opendomains** is a fully automated, GitHub Actions-friendly crawler that catalogs websites and their subpages into structured markdown documents. Designed for archival and research purposes, it navigates the modern web by:

- Generating a folder structure from ICANN’s official `tlds-alpha-by-domain.txt`.
- Launching URL crawls defined in `config/init-url.txt`.
- **Respecting each website's `robots.txt` rules and skipping URLs that are disallowed for crawling.**
- Recursively discovering and saving reachable subpages into `domains/` as `.md` files.
- Maintaining a central CSV file in the `data/` directory for status tracking and concurrency control.

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
TIMEOUT=10
RETRY_LIMIT=3
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

3. Generate initial folder structure:

   ```bash
   python scripts/init_folders.py
   ```

4. Start the crawler (locally):

   ```bash
   python scripts/crawl.py
   ```

---

## 🚀 Usage Guidelines

### 🧭 Running Locally

```bash
python scripts/crawl.py
```

This will:

- Read `init-url.txt`.
- Check and respect the CSV file lock in the `data/` directory.
- **Check and respect each site's `robots.txt` before crawling any URL.**
- Begin crawling each seed and saving subpages under their respective TLD folders.

### 🛎 GitHub Actions Routine

The project includes `.github/workflows/crawl.yml` which:

- Runs scheduled jobs using GitHub Actions.
- Limits concurrent execution to prevent timeout (staggered by repo or subfolder).
- Updates CSV files in the `data/` directory with crawl status and metadata.

### 🔁 Workflow States

Each target domain in the CSV file will reflect:

- `waiting`: Not yet processed
- `editing`: Actively being crawled
- `finished`: Crawl completed
- `error`: Failed or skipped after retry

---

## 🗃️ Code & Folder Structure

```
opendomains/
│
├── config/
│   ├── init-url.txt          # Seed URLs to start crawling
│   └── tlds-alpha-by-domain.txt # Source of TLDs from ICANN
│
├── domains/
│   └── com/
│       └── example.com/
│           ├── index.md
│           ├── about.md
│           └── contact.md
│
├── scripts/
│   └── init_folders.py       # Bootstrap script for folder creation
├── .github/workflows/
│   └── crawl.yml             # Scheduled GitHub Actions workflow
└── README.md

# Removed index.json and updated documentation to reflect CSV/data/ approach.
```

### 🧹 Naming & Formatting

- Folder names follow TLD and domain hierarchy.
- Markdown file names mirror page paths (`about`, `contact`, etc.).
- Code uses [PEP8](https://peps.python.org/pep-0008/) formatting.

---

## 🤝 Contribution & Collaboration

### 🔀 Branching Strategy

- `main`: Production branch (GitHub Actions runs here).
- `dev`: Development and new feature integration.
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
