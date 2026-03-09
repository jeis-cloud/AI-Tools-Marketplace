# 🤖 AVA AI Tools Marketplace

A curated, searchable directory of AI tools for business and professional use — built and maintained by [Just Ask AVA](https://justaskava.com).

![Tools Listed](https://img.shields.io/badge/Tools-24-2b3a8f?style=flat-square)
![Categories](https://img.shields.io/badge/Categories-8-5b6fd6?style=flat-square)
![Updates](https://img.shields.io/badge/Updates-Weekly-green?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square)

---

## 🔍 What It Does

A live, filterable marketplace that helps teams evaluate and choose AI tools with confidence. Every tool is researched for security, compliance, and vendor reliability — not just features.

**Live data** is pulled directly from Google Sheets. No backend required. Update the spreadsheet and the page updates automatically.

---

## ✨ Features

- **Search** by name, description, tags, or use case
- **Filter** by category (Writing, Image, Video, Automation, Coding, Audio, Productivity, Assistant) and pricing model
- **Sort** by Top Rated, Name, or Price
- **Security badges** on every card — 🟢 Enterprise-grade / 🟡 Business-grade / 🔴 Standard
- **Full security modal** — creator validation, compliance certifications, open source status, update risk, and security notes
- **Live counts** — hero stats and sidebar counts update automatically from the Sheet
- **Responsive** — desktop, tablet, and mobile layouts
- **No backend** — data served via Google Sheets published CSV

---

## 🛡️ Security Criteria

Each tool is evaluated against four criteria defined by our internal security review process:

| Criterion | What We Check |
|-----------|--------------|
| **Creator Validation** | Legal company name, country of incorporation, year founded |
| **Data Handling** | Certifications: SOC 2, GDPR, HIPAA, ISO 27001 |
| **Update Impact** | Risk of breaking changes affecting current workflows |
| **Open Source Risk** | Code transparency, self-hosting options, dependency risk |

Compliance levels:
- 🟢 **Enterprise-grade** — SOC 2 Type II + GDPR minimum; suitable for sensitive business data
- 🟡 **Business-grade** — Partial certifications; suitable for non-sensitive workflows
- 🔴 **Standard** — Limited or no certifications; evaluate carefully before use

---

## 📁 Project Structure

```
AI-Tools-Marketplace/
├── index.html          # Main page
├── css/
│   └── styles.css      # All styles + responsive breakpoints
├── js/
│   └── app.js          # Data fetching, rendering, filtering, modal logic
├── ai-tools.csv        # Original 24 tools (reference)
├── ai-tools-updated.csv# Updated CSV with security columns
└── README.md
```

---

## 📊 Google Sheets Data Source

Live data is fetched from a published Google Sheet:

**Sheet URL:** `https://docs.google.com/spreadsheets/d/1pCkGDRomi8bRE_xgiu9gyi2v_2neDF2GlapTKYC14xA`

### Column Reference

| Column | Description | Notes |
|--------|-------------|-------|
| Name | Tool name | |
| Description | Short description | |
| Category | One of 8 categories | Lowercase |
| Price | Free / Freemium / Paid | |
| Price Detail | Display price string | e.g. "Free / $20 per month" |
| Rating | 0–5 numeric | Source: G2 / Capterra |
| Reviews | Integer count | |
| URL | Tool website | Full URL with https:// |
| Logo | Favicon URL | e.g. `https://www.google.com/s2/favicons?domain=openai.com&sz=64` |
| Tags | Comma-separated labels | Use pipe `\|` separator |
| Integrations | Tools it connects with | Use pipe `\|` separator |
| Uses | Common use cases | Use pipe `\|` separator |
| Creator | Legal company name + country | e.g. "OpenAI, Inc. (USA)" |
| Creator Verified | Yes / No | |
| Founded | Year | e.g. 2015 |
| Data Policy | Certifications held | e.g. "SOC 2 Type II, GDPR" |
| Compliance | Enterprise-grade / Business-grade / Standard | |
| Open Source | Yes / No | |
| Stability | Stable / Beta / Experimental | |
| Security Notes | Risk notes for reviewers | |
| Update Risk | Low / Medium / High + explanation | |

### How to Add or Update a Tool

1. Open the Google Sheet
2. Add a new row or edit an existing one
3. Use pipe `|` to separate multiple values in Tags, Integrations, and Uses
4. The marketplace updates automatically on next page load — no code changes needed

---

## 🚀 Deployment

### Local Development
```bash
# Any static file server works
npx live-server
# or
python3 -m http.server 5500
```

> ⚠️ **Note on CORS:** The Google Sheets CSV fetch may be blocked when running on `localhost` in some browsers. The site works correctly when deployed to a public domain (Netlify, GitHub Pages, etc.).

---

## 🗓️ Maintenance

| Task | Frequency | How |
|------|-----------|-----|
| Add/update tools | As needed | Edit Google Sheet directly |
| Update ratings | Monthly | Check G2 / Capterra for latest scores |
| Security review | Quarterly | Re-verify compliance certs and vendor status |
| New categories | As needed | Add to Sheet + update sidebar in `index.html` |

---

## 🏢 About

Built by **Jeismy Garcia**, Operations Architect at [Just Ask AVA](https://justaskava.com).  
Contact: jeis@justaskava.com

---

*Just Ask AVA — AI guidance you can trust.*
