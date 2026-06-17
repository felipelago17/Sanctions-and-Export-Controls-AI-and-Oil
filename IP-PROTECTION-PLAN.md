# GitHub IP Protection & Repository Architecture Plan

**Prepared for:** Felipe Villasuso Lago  
**Date:** 2026-06-17  
**Scope:** Three GitHub repositories — AI-regulatory-monitor, Responsible-AI-evaluation, Joint-ventures-and-Energy-Trilemma- (and this repository: Sanctions-and-Export-Controls-AI-and-Oil)

---

## 1. Decision Framework & Recommendations

### Evaluation Criteria

| Criterion | Weight |
|---|---|
| Contains custom logic / data pipelines | High IP sensitivity → Private |
| Contains primarily curated public sources | Lower IP sensitivity → Hybrid or Public |
| Has GitHub Pages site actively used | Hybrid preferred (keep site live) |
| Critical to PhD / academic citation | Keep citable public URL alive |
| Collaborative development expected | Private with controlled collaborators |

---

### Repository-by-Repository Recommendations

#### AI-regulatory-monitor → **Fully Private (with optional public landing page)**

**Reasoning:**  
This is your highest-IP-sensitivity asset. It contains:
- Active data pipelines that automate compliance monitoring
- `updates.json` — a structured data product with clear commercial value
- Custom `app.js` logic driving the web interface
- A competitive moat: the combination of pipeline + monitoring logic + curated data

**Recommendation:** Make the source repository fully private immediately. If you want a public-facing URL, create a minimal `AI-regulatory-monitor-site` public repo with a static landing page only (no source code). The dynamic app can remain accessible if you deploy it to a separate hosting service (GitHub Pages only serves static content, but you can deploy to Netlify/Vercel with the repo kept private).

**GitHub Pages impact:** GitHub Pages on private repositories requires a GitHub Pro/Team/Enterprise plan. If you are on the free tier, the Pages site will go offline when you make the repo private. Plan accordingly — either upgrade, or migrate to the hybrid architecture described in Section 3.

---

#### Responsible-AI-evaluation → **Hybrid (Private source + Public documentation site)**

**Reasoning:**  
This started as an open-source-style project. There are two competing interests:
- Your evaluation benchmarks and governance mapping code have real IP value
- The academic/professional community benefits from seeing the framework exists

**Recommendation:** Create a public `Responsible-AI-evaluation-site` or `Responsible-AI-evaluation-docs` repository that hosts only the rendered documentation. Keep all benchmark code, evaluation scripts, and governance mapping logic in the private source repo. The public site shows the framework's existence and cites it; the methodology remains protected.

---

#### Joint-ventures-and-Energy-Trilemma- → **Hybrid (Private source + Public documentation site)**

**Reasoning:**  
This is your PhD research repository. Academic visibility matters:
- `CITATION.cff` gives it a citable identity
- GitHub Pages is your public research presence
- Literature and regulations are public sources — the *analysis* and *synthesis* are your IP

**Recommendation:** Keep the public documentation site live at its current URL. Move source files (raw analysis, draft chapters, unpublished work) to a private repo. The MkDocs-built site continues to be served publicly, pushed from the private repo via GitHub Actions. `CITATION.cff` stays in the public docs repo so it remains citable.

---

#### Sanctions-and-Export-Controls-AI-and-Oil (this repo) → **Hybrid (Private source + Public documentation site)**

**Reasoning:**  
Same profile as the Energy Trilemma repo: MkDocs Material, primary public sources, active daily digest via GitHub Actions. The curation logic, news digest workflow, and designation registers represent original work worth protecting.

**Recommendation:** Apply the identical hybrid architecture described in Section 3.

---

### Summary Table

| Repository | Recommendation | Public URL Preserved | IP Protected |
|---|---|---|---|
| AI-regulatory-monitor | Fully Private | Optional landing page only | Yes |
| Responsible-AI-evaluation | Hybrid | Yes | Yes |
| Joint-ventures-and-Energy-Trilemma- | Hybrid | Yes (same URL) | Yes |
| Sanctions-and-Export-Controls-AI-and-Oil | Hybrid | Yes (same URL) | Yes |

---

## 2. Repository Visibility Change Instructions

### How to Make a Repository Private (GitHub UI)

1. Navigate to the repository on GitHub (e.g., `github.com/felipelago17/AI-regulatory-monitor`)
2. Click **Settings** (top navigation bar, gear icon)
3. Scroll to the bottom of the General settings page to the **Danger Zone** section
4. Click **Change repository visibility**
5. Click **Make private**
6. Type the repository name in the confirmation box (e.g., `AI-regulatory-monitor`)
7. Click **I understand, make this repository private**

**What happens to GitHub Pages after making a repo private:**

- **Free GitHub plan:** GitHub Pages will be **disabled**. The URL (`https://felipelago17.github.io/AI-regulatory-monitor/`) will return a 404. You must either upgrade to GitHub Pro or migrate to the hybrid architecture (Section 3) before making the repo private.
- **GitHub Pro/Team/Enterprise:** Pages can continue to be served from a private repository. However, the source code remains private. Check your plan at `github.com/settings/billing`.
- **Hybrid architecture (recommended):** The private source repo triggers a workflow that pushes built output to a *separate* public repo. Pages are served from that public repo — visibility of the source is irrelevant.

**Recommendation:** Implement the hybrid architecture first, verify the public site still loads correctly, *then* make the source repo private. Never go private first without a fallback plan.

---

## 3. Hybrid Architecture — Complete Implementation Guide

### Overview

```
[Private source repo]           [Public docs repo]
felipelago17/repo-private  →   felipelago17/repo-site
  ├── docs/                       ├── index.html  (built)
  ├── mkdocs.yml           →      ├── assets/     (built)
  ├── .github/workflows/          └── (GitHub Pages serves this)
  │   └── deploy-docs.yml
  └── src/ (protected)
```

### Step 1: Create the Public Documentation Repository

For each hybrid repo, create a new **public** repository with the naming convention `<original-name>-site`:

| Private source repo | Public docs repo |
|---|---|
| `Sanctions-and-Export-Controls-AI-and-Oil` | `Sanctions-and-Export-Controls-AI-and-Oil-site` |
| `Responsible-AI-evaluation` | `Responsible-AI-evaluation-site` |
| `Joint-ventures-and-Energy-Trilemma-` | `Joint-ventures-and-Energy-Trilemma-site` |

**GitHub UI instructions to create the public docs repo:**
1. Go to `github.com/new`
2. Repository name: `Sanctions-and-Export-Controls-AI-and-Oil-site` (adjust per repo)
3. Set to **Public**
4. Check **Add a README file** (initialises the repo so it has a default branch)
5. Leave license blank (the public docs repo will have its own notice — see Section 4)
6. Click **Create repository**

### Step 2: Configure GitHub Pages on the Public Docs Repo

After creating the public docs repo:
1. Go to the new repo → **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Branch: `gh-pages` (or `main` if you prefer — consistent with the workflow below)
4. Folder: `/ (root)`
5. Click **Save**

> Note: The `gh-pages` branch does not need to exist yet — the workflow will create it on first push.

### Step 3: Create a Deploy Secret

The private source repo needs permission to push to the public docs repo. Use a **Personal Access Token (classic)** or a **Fine-grained PAT**.

**Creating a Fine-grained PAT (recommended):**
1. Go to `github.com/settings/tokens` → **Fine-grained tokens** → **Generate new token**
2. Token name: `DOCS_DEPLOY_TOKEN`
3. Expiration: 1 year (set a reminder to rotate)
4. Resource owner: `felipelago17`
5. Repository access: **Only select repositories** → select the public docs repo (e.g., `Sanctions-and-Export-Controls-AI-and-Oil-site`)
6. Permissions:
   - **Contents**: Read and write
   - **Pages**: Read and write (optional, helps trigger Pages rebuild)
7. Click **Generate token** — copy it immediately, it won't be shown again

**Adding the secret to the private source repo:**
1. Go to the private source repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `DOCS_DEPLOY_TOKEN`
4. Value: paste the PAT you just generated
5. Click **Add secret**

### Step 4: The GitHub Actions Workflow

#### For MkDocs Material repos (Joint-ventures, Sanctions-and-Export-Controls, Responsible-AI-evaluation if using MkDocs)

Save this file as `.github/workflows/deploy-docs.yml` in the **private source repo**:

```yaml
name: Build and Deploy Documentation

on:
  push:
    branches:
      - main
  workflow_dispatch:       # allows manual trigger from Actions tab
  schedule:
    - cron: '0 6 * * *'   # optional: daily rebuild at 06:00 UTC

permissions:
  contents: read           # minimum needed to checkout this (private) repo

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout source (private repo)
        uses: actions/checkout@v4
        with:
          fetch-depth: 0   # full history, needed for git-revision-date plugin

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'
          cache: pip

      - name: Install MkDocs and plugins
        run: |
          pip install \
            mkdocs-material \
            mkdocs-minify-plugin \
            mkdocs-git-revision-date-localized-plugin \
            pymdown-extensions

      - name: Build MkDocs site
        run: mkdocs build --strict --site-dir _site

      - name: Checkout public docs repo
        uses: actions/checkout@v4
        with:
          repository: felipelago17/Sanctions-and-Export-Controls-AI-and-Oil-site
          token: ${{ secrets.DOCS_DEPLOY_TOKEN }}
          path: _docs_repo

      - name: Copy built site to docs repo
        run: |
          # Preserve the .git directory; wipe everything else
          find _docs_repo -mindepth 1 -maxdepth 1 -not -name '.git' -exec rm -rf {} +
          cp -r _site/. _docs_repo/

      - name: Commit and push to public docs repo
        run: |
          cd _docs_repo
          git config user.name  "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add -A
          # Only commit if there are changes
          if git diff --staged --quiet; then
            echo "No changes to deploy."
          else
            git commit -m "docs: deploy $(date -u +'%Y-%m-%dT%H:%M:%SZ') [skip ci]"
            git push origin main
          fi
```

> **Adjust line 25** (`repository: felipelago17/...`) to the correct public docs repo name for each source repo.

#### For AI-regulatory-monitor (custom HTML/JS — no MkDocs)

If you later want a public landing page for the monitoring tool, use this variant:

```yaml
name: Deploy Public Landing Page

on:
  push:
    branches:
      - main
    paths:
      - 'public/**'        # only trigger when the public/ folder changes
  workflow_dispatch:

permissions:
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout source
        uses: actions/checkout@v4

      - name: Checkout public landing page repo
        uses: actions/checkout@v4
        with:
          repository: felipelago17/AI-regulatory-monitor-site
          token: ${{ secrets.DOCS_DEPLOY_TOKEN }}
          path: _site_repo

      - name: Sync public/ folder to landing page repo
        run: |
          find _site_repo -mindepth 1 -maxdepth 1 -not -name '.git' -exec rm -rf {} +
          cp -r public/. _site_repo/

      - name: Commit and push
        run: |
          cd _site_repo
          git config user.name  "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add -A
          if git diff --staged --quiet; then
            echo "No changes."
          else
            git commit -m "deploy: landing page update $(date -u +'%Y-%m-%dT%H:%M:%SZ') [skip ci]"
            git push origin main
          fi
```

### Step 5: Preserving the Daily Digest Workflow

Your current daily digest workflow runs in this repo. After migration:
- The workflow file stays in the **private source repo**
- It writes to `news/digest.md` and commits to the private repo
- The `deploy-docs.yml` workflow (above) then publishes the result to the public docs repo

**Sequencing:** Add a `workflow_run` trigger to `deploy-docs.yml` so it fires after the digest workflow completes:

```yaml
on:
  push:
    branches: [main]
  workflow_dispatch:
  workflow_run:
    workflows: ["Daily News Digest"]   # must match the 'name:' field in your digest workflow
    types: [completed]
    branches: [main]
```

---

## 4. File Templates

### 4.1 Proprietary LICENSE File

Use this for your **private source repositories**. It replaces any existing open-source license and asserts full copyright.

```text
PROPRIETARY AND CONFIDENTIAL

Copyright (c) 2024–2026 Felipe Villasuso Lago. All rights reserved.

This software, source code, data pipelines, and associated documentation
files (the "Work") are the exclusive intellectual property of Felipe
Villasuso Lago ("Owner").

RESTRICTIONS
------------
No part of the Work may be copied, reproduced, distributed, transmitted,
sublicensed, modified, adapted, reverse-engineered, or used to create
derivative works, in whole or in part, in any form or by any means —
electronic, mechanical, photocopying, recording, or otherwise — without
the prior written permission of the Owner.

ACCESS TO THIS REPOSITORY
--------------------------
Access to this repository has been granted solely for the purpose
explicitly agreed upon between the Owner and the authorised viewer.
Any access beyond that purpose is strictly prohibited.

ACADEMIC USE
------------
Where the Work forms part of academic research submitted for a higher
degree, the rights of the degree-awarding institution are governed by
its applicable intellectual property policy. Nothing in this licence
waives those institutional rights, nor does it grant any third party
any rights in the Work.

NO WARRANTY
-----------
THE WORK IS PROVIDED WITHOUT WARRANTY OF ANY KIND. THE OWNER SHALL
NOT BE LIABLE FOR ANY DAMAGES ARISING FROM USE OF OR INABILITY TO USE
THE WORK, TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW.

GOVERNING LAW
-------------
This licence shall be governed by and construed in accordance with the
laws of England and Wales.

For permissions or licensing enquiries, contact: fe_lago@yahoo.com.br
```

### 4.2 Public Documentation Repository LICENSE

For the **public docs repos** (which contain only built/rendered output, no source code):

```text
Creative Commons Attribution 4.0 International (CC BY 4.0)

Copyright (c) 2024–2026 Felipe Villasuso Lago.

This documentation site is licensed under the Creative Commons
Attribution 4.0 International License. You may share and adapt the
material for any purpose, provided you give appropriate credit.

Full licence text: https://creativecommons.org/licenses/by/4.0/

NOTE: This licence applies to the documentation content only.
The underlying source code, data pipelines, and tooling used to
generate this site are proprietary and are NOT covered by this licence.
They remain the exclusive intellectual property of the copyright holder.
```

### 4.3 README.md — Private Source Repository Template

```markdown
# [Repository Name]

> **Access Notice:** This is a private repository. Access has been granted
> to specific collaborators only. The contents are proprietary and
> confidential. See [LICENSE](./LICENSE) for terms.

## Overview

[Brief description of what this repository does.]

## Public Documentation

The rendered documentation for this project is available at:  
**[https://felipelago17.github.io/[repo-name]-site/](https://felipelago17.github.io/[repo-name]-site/)**

The public site is automatically built from this private source repository
and contains only the rendered output — no source code or proprietary logic
is exposed.

## Intellectual Property

All source code, data pipelines, analysis, and custom logic in this
repository are the proprietary intellectual property of Felipe Villasuso
Lago. Unauthorised use, reproduction, or distribution is strictly prohibited.
See [LICENSE](./LICENSE).

## Repository Access

This repository is private. To request access, contact:
**fe_lago@yahoo.com.br**

## Citation

If you wish to cite the publicly available documentation or research outputs
produced by this project, please use the citation information available at
the public documentation site above.

---

*For academic work derived from this research, please refer to the
[CITATION.cff](./CITATION.cff) file if present.*
```

### 4.4 README.md — Public Documentation Repository Template

```markdown
# [Project Name] — Documentation

This repository hosts the **public documentation site** for [Project Name].

- **Live site:** [https://felipelago17.github.io/[repo-name]-site/](https://felipelago17.github.io/[repo-name]-site/)
- **Author:** Felipe Villasuso Lago (AIQ / London South Bank University)

## About

[1–2 sentence description of the project and its purpose.]

## Source Code

The source code, data pipelines, and tooling used to generate this site
are maintained in a **private repository** and are not publicly available.

To request access to the source repository for research collaboration
or licensing, contact: **fe_lago@yahoo.com.br**

## Intellectual Property Notice

The documentation content is licensed under [CC BY 4.0](./LICENSE).  
The underlying source code is proprietary — see the full notice in [LICENSE](./LICENSE).

## Citation

If you use material from this site in academic or professional work,
please cite it using the information in [CITATION.cff](./CITATION.cff).
```

### 4.5 Updated CITATION.cff

Update `repository-code` to point to the **public docs repo** after migration (since the source repo is private and non-citable):

```yaml
cff-version: 1.2.0
message: "If you use this resource, please cite it as below."
type: dataset
title: "Sanctions and Export Controls — AI, Advanced Computing & Oil/Energy"
abstract: >
  A curated repository of primary regulatory sources, law-firm analysis,
  and enforcement guidance covering US export controls (EAR/BIS) and OFAC
  sanctions as applied to artificial intelligence, advanced computing, and
  the oil and energy sector.
authors:
  - family-names: Villasuso Lago
    given-names: Felipe
    affiliation: "AIQ / London South Bank University (LSBU)"
    email: fe_lago@yahoo.com.br
    orcid: ""
# Point to the public docs repo (the private source repo is not public)
repository-code: "https://github.com/felipelago17/Sanctions-and-Export-Controls-AI-and-Oil-site"
url: "https://felipelago17.github.io/Sanctions-and-Export-Controls-AI-and-Oil/"
license: CC-BY-4.0
version: "1.0.0"
date-released: "2026-06-09"
keywords:
  - export-controls
  - sanctions
  - EAR
  - OFAC
  - BIS
  - AI governance
  - energy sector
  - compliance
```

> **Note on the URL field:** Keep `url` pointing to `felipelago17.github.io/Sanctions-and-Export-Controls-AI-and-Oil/` only if you configure the public docs repo to serve at that path. If the new public repo is named `-site`, the Pages URL will be `.../Sanctions-and-Export-Controls-AI-and-Oil-site/` unless you use a custom domain. See Section 5 for how to preserve the original URL.

---

## 5. Per-Repository Specific Action Plan

### 5.1 Sanctions-and-Export-Controls-AI-and-Oil (this repo)

**Goal:** Keep the public site at its current URL. Protect source, digest workflow, and analysis.

**Action sequence:**

1. **Create the public docs repo** (`-site` naming): `Sanctions-and-Export-Controls-AI-and-Oil-site` — public, initialised with README.
2. **Configure GitHub Pages** on the new public repo: Source → Deploy from branch → `main` → `/ (root)`.
3. **Add the `DOCS_DEPLOY_TOKEN` secret** to the private source repo (create a Fine-grained PAT as described in Section 3).
4. **Add `.github/workflows/deploy-docs.yml`** to this repo using the MkDocs workflow from Section 3.
5. **Update `mkdocs.yml`**: Change `repo_url` to point to the public docs repo URL:
   ```yaml
   repo_url: https://github.com/felipelago17/Sanctions-and-Export-Controls-AI-and-Oil-site
   edit_uri: ""   # disable "edit this page" links since source is private
   ```
6. **Run the workflow manually** (Actions → Build and Deploy Documentation → Run workflow). Verify the public site loads at the new URL.
7. **Replace `LICENSE`** in the source repo with the proprietary license from Section 4.1.
8. **Update `CITATION.cff`** to point to the public docs repo (Section 4.5).
9. **Test everything**: Visit the Pages URL, check navigation, verify the daily digest still publishes correctly.
10. **Make the source repo private**: Settings → Danger Zone → Change visibility → Make private.

**Preserving the original URL option:** If you want the site to remain at `https://felipelago17.github.io/Sanctions-and-Export-Controls-AI-and-Oil/` (without the `-site` suffix), you have two options:
- **Option A:** Name the public docs repo exactly `Sanctions-and-Export-Controls-AI-and-Oil` (same name). This requires deleting or renaming the existing source repo first — risky. Not recommended.
- **Option B:** Use a **custom domain** via GitHub Pages (requires owning a domain).
- **Option C (recommended):** Accept the URL change to `.../Sanctions-and-Export-Controls-AI-and-Oil-site/` and update `CITATION.cff` and any shared links.

---

### 5.2 AI-regulatory-monitor

**Goal:** Full privacy immediately. Optional minimal public landing page.

**Action sequence:**

1. **Back up locally** before any visibility change: `git clone https://github.com/felipelago17/AI-regulatory-monitor.git`
2. **Review for secrets**: Run `git log --all --full-history -- '*.env' '*.json'` to check for committed API keys or credentials in history.
3. **Replace `LICENSE`** with the proprietary license (Section 4.1).
4. **Update `README.md`** with the private repo template (Section 4.3).
5. **Decide on public landing page**: If you want a public URL for the tool:
   - Create `AI-regulatory-monitor-site` public repo
   - Create a `public/index.html` in the source repo (a static landing page — no app logic)
   - Add the HTML/JS deploy workflow from Section 3
6. **Make the source repo private**: Settings → Danger Zone → Change visibility → Make private.
7. **Verify Pages status**: If on free GitHub plan, confirm Pages is disabled (expected). If you want Pages preserved, upgrade to GitHub Pro first.

---

### 5.3 Responsible-AI-evaluation

**Goal:** Protect evaluation code and benchmarks. Keep a public-facing documentation presence.

**Action sequence:**

1. **Audit what is currently public**: Review which files contain proprietary evaluation logic vs. documentation.
2. **Create `Responsible-AI-evaluation-site`** public repo (public, README initialised).
3. **Configure Pages** on the public docs repo.
4. **Choose documentation tool**: If the repo uses MkDocs, add `deploy-docs.yml` (Section 3, MkDocs variant). If it uses custom HTML, adapt the HTML/JS variant.
5. **Add `DOCS_DEPLOY_TOKEN` secret** to the source repo (create a second PAT scoped to the new docs repo, or reuse the same PAT if it covers multiple repos).
6. **Add proprietary `LICENSE`** to source repo.
7. **Add `README.md`** with private repo template.
8. **Run workflow** manually and verify the public docs site loads.
9. **Make source repo private**.

---

### 5.4 Joint-ventures-and-Energy-Trilemma-

**Goal:** PhD academic visibility. Keep `CITATION.cff` citable. Protect analysis and drafts.

**Action sequence:**

1. **Create `Joint-ventures-and-Energy-Trilemma-site`** public repo (note the trailing hyphen in the original name — the docs repo can drop it: `Joint-ventures-and-Energy-Trilemma-site`).
2. **Configure Pages** on the public docs repo.
3. **Add MkDocs deploy workflow** (Section 3) to the source repo.
4. **Move `CITATION.cff`** — keep a copy in the **public docs repo** (so it remains citable at the public URL) and in the private source repo.
5. **Update `CITATION.cff`**: Change `repository-code` to the public docs repo URL.
6. **Add proprietary LICENSE** to source repo; add CC-BY-4.0 LICENSE to public docs repo.
7. **Update `mkdocs.yml`**: Disable `edit_uri` (points to private source, would return 404 for visitors).
8. **Run workflow** and verify site loads.
9. **Make source repo private**.
10. **Notify supervisor**: See Section 7 for the suggested message.

---

## 6. Security & Best Practices

### 6.1 Recommended `.gitignore` Additions

Add these to `.gitignore` in **all private source repos**:

```gitignore
# Secrets and credentials
.env
.env.*
*.env
config/secrets.yml
config/credentials.yml
secrets/
credentials/
*.pem
*.key
*.p12

# API keys and tokens (common filenames)
api_keys.json
tokens.json
service-account*.json
*_token.txt

# Local overrides
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build output (do not commit to source repo — deployed to docs repo)
_site/
site/
dist/
build/

# Python
__pycache__/
*.pyc
*.pyo
.venv/
venv/
*.egg-info/

# Node
node_modules/
.npm/

# macOS
.DS_Store
.AppleDouble

# VS Code
.vscode/
*.code-workspace

# Jupyter
.ipynb_checkpoints/
*.ipynb

# Logs
*.log
logs/
```

### 6.2 Handling Secrets and Sensitive Data

**Before making any repo private, audit for exposed secrets:**

```bash
# Check for common secret patterns in git history
git log --all -p | grep -iE '(password|secret|token|api_key|apikey|bearer|private_key)' | head -40

# Check for .env files ever committed
git log --all --full-history -- '.env' '**/.env'

# Use truffleHog for a thorough scan (install: pip install trufflehog)
trufflehog git file://. --only-verified
```

**If secrets are found in history**, do NOT simply delete the file — the secret is still in git history. You must:
1. Revoke the secret immediately (rotate the API key, invalidate the token).
2. Use `git filter-repo` to scrub history:
   ```bash
   pip install git-filter-repo
   git filter-repo --path .env --invert-paths
   ```
3. Force-push the cleaned history (only safe on a private repo you control).

**Going forward:**
- Never commit `.env` files
- Use GitHub Actions secrets for all tokens (referenced as `${{ secrets.SECRET_NAME }}`)
- Use environment variables at runtime, not hardcoded values

### 6.3 Adding Collaborators to a Private Repository

**GitHub UI steps:**
1. Go to the private repo → **Settings** → **Collaborators** (under "Access")
2. Click **Add people**
3. Search by GitHub username, full name, or email
4. Choose a role:
   - **Read**: Can view code — suitable for a supervisor who only needs to review
   - **Triage**: Read + issue management
   - **Write**: Can push commits — suitable for active research collaborators
   - **Maintain**: Write + settings (not recommended for most collaborators)
5. Click **Add [name] to this repository**
6. The collaborator receives an email invitation — they must accept it before gaining access

**Recommendation:** Add your PhD supervisor as **Read** initially. Upgrade to Write only if they will actively contribute commits.

### 6.4 Forks, Search Engine Indexing, and Existing Clones

**Forks:**
- When you make a repo private, any existing public forks are **not automatically made private**. GitHub will notify fork owners.
- Check existing forks before privatising: go to the repo → **Insights** → **Forks**.
- If a fork contains sensitive material, contact GitHub support — you cannot force-delete someone else's fork.

**Search engine indexing:**
- Search engines (Google, Bing) may have cached your public repo pages.
- After making a repo private, the cached pages will eventually expire (typically within weeks).
- You cannot forcibly remove cached results, but they will return 404 within 1–4 weeks.
- For immediate removal, use Google Search Console if you have verified domain ownership.

**Existing clones:**
- Anyone who cloned the repo before it went private retains their local copy.
- You cannot revoke access to local clones.
- This is why auditing for secrets *before* any sensitive material is committed is critical — once pushed public, assume it has been cloned.

---

## 7. Migration & Communication Notes

### 7.1 Updating Links on Existing GitHub Pages Sites

After migrating to hybrid architecture, the main URLs to update are:

| Old link | New link |
|---|---|
| `https://github.com/felipelago17/[repo]` | `https://github.com/felipelago17/[repo]-site` |
| `https://felipelago17.github.io/[repo]/` | `https://felipelago17.github.io/[repo]-site/` (unless using custom domain) |

**Where to update links:**
- `mkdocs.yml`: `repo_url`, `site_url`
- `CITATION.cff`: `repository-code`, `url`
- Any cross-repository links in `docs/` markdown files
- Your personal website / LinkedIn / academic profiles
- Any papers or preprints that cite the GitHub URLs

**Automated search-and-replace across docs:**
```bash
# Preview changes (dry run)
grep -r "felipelago17.github.io/Sanctions-and-Export-Controls-AI-and-Oil" docs/

# Replace (use sed with backup)
find docs/ -name "*.md" -exec sed -i.bak \
  's|felipelago17.github.io/Sanctions-and-Export-Controls-AI-and-Oil/|felipelago17.github.io/Sanctions-and-Export-Controls-AI-and-Oil-site/|g' {} \;
```

### 7.2 Suggested Messages for PhD Supervisor

**Option A — Adding as Read collaborator, brief:**

> Dear [Supervisor name],
>
> I've restructured my research repository [Joint-ventures-and-Energy-Trilemma-] to separate the source files from the public documentation site, as part of managing the intellectual property developed during my PhD.
>
> I've added your GitHub account ([their username]) as a collaborator with read access to the private source repository. You should receive a GitHub invitation email. The public documentation site remains accessible at its usual URL: [URL].
>
> Please let me know if you have any questions or would prefer a different level of access.
>
> Best regards,  
> Felipe

**Option B — More formal, if required by supervision agreement:**

> Dear [Supervisor name],
>
> As part of my ongoing research, I have moved the working files for my project "[Project Name]" to a private GitHub repository to better manage the intellectual property and unpublished analysis.
>
> The publicly visible documentation site remains accessible at [URL] and continues to be updated automatically. The citation information (CITATION.cff) remains publicly available.
>
> I am granting you read access to the private repository in accordance with our supervision arrangement. You will receive a GitHub invitation from the address fe_lago@yahoo.com.br. This grants you access to all source files, commit history, and working documents.
>
> I have reviewed the university's IP policy and believe this arrangement is consistent with its requirements. Please advise if any adjustment is needed.
>
> Kind regards,  
> Felipe Villasuso Lago

### 7.3 Academic and University IP Policy Considerations

This section applies specifically to the PhD research repositories (Joint-ventures-and-Energy-Trilemma- and any other LSBU-related work).

**Key considerations:**

1. **University IP claim:** Most UK universities (including LSBU) assert some IP rights over work created with university resources or as part of a degree programme. Review LSBU's IP policy before asserting "all rights reserved" on PhD research outputs. The proprietary LICENSE in Section 4.1 includes a carve-out clause for this.

2. **Funding obligations:** If your PhD is funded (AHRC, ESRC, UKRI, etc.), there may be open-access or data-sharing obligations. Compliance monitoring tools may need to remain accessible to funders even if not fully public.

3. **Thesis submission:** Submitted thesis chapters typically become public via institutional repositories (LSBU Research Online). This does not affect your GitHub repositories, but ensures the *analysis* will eventually be public through official channels.

4. **Recommendation:** Add the supervisor to the private repo *before* changing visibility, and notify them of the structure change. This demonstrates transparency and avoids any perception that you are concealing work from your supervision team.

5. **ORCID:** If you have an ORCID, link your public documentation repos and CITATION.cff to your ORCID profile. This maintains academic attribution even as source repos go private.

---

## Appendix: Quick-Reference Checklist

### Pre-Migration Checklist (do for each repo)
- [ ] Local backup created (`git clone --mirror`)
- [ ] Secrets audit completed (`git log --all -p | grep -i token`)
- [ ] Public docs repo created and Pages configured
- [ ] `DOCS_DEPLOY_TOKEN` secret added to source repo
- [ ] `deploy-docs.yml` workflow added and tested
- [ ] `mkdocs.yml` updated (`repo_url`, `edit_uri`)
- [ ] `CITATION.cff` updated
- [ ] `LICENSE` replaced with proprietary version
- [ ] `README.md` updated
- [ ] Public site verified (loads correctly at new URL)
- [ ] Supervisor/collaborators notified

### Post-Migration Checklist
- [ ] Source repo made private
- [ ] Pages still loading on public docs repo
- [ ] Daily digest workflow still running (check Actions tab)
- [ ] Links updated in docs, profiles, and papers
- [ ] Collaborators added to private repo
- [ ] CITATION.cff links updated everywhere it's referenced

---

*Plan prepared 2026-06-17. Review annually or when repository structure changes.*
