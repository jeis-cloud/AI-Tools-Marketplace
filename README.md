# AI Tools Marketplace — Just Ask AVA

A curated, searchable directory of AI tools built for the Just Ask AVA team. Updated weekly with tools that are actually useful for day-to-day work.

## Features

- 24 curated AI tools across 8 categories
- Search by name, description, tags, or use case
- Filter by category and pricing model
- Tool detail modal with integrations and use cases
- Fully responsive — works on mobile and desktop
- Data managed via Google Sheets — no code changes needed to add or update tools

## Tech Stack

- Pure HTML, CSS, JavaScript — no frameworks, no dependencies
- Google Sheets as the data source (published as public CSV)
- Hosted on GitHub

## Project Structure

```
AI-Tools-Marketplace/
├── index.html          # Main page
├── css/
│   └── styles.css      # All styling
└── js/
    └── app.js          # Logic and data fetching
```

## How to Update Tools

1. Open the [Google Sheet](https://docs.google.com/spreadsheets/d/1pCkGDRomi8bRE_xgiu9gyi2v_2neDF2GlapTKYC14xA)
2. Add, edit, or remove rows as needed
3. The page will reflect changes automatically on next load — no code changes required

### Column Reference

| Column | Description |
|---|---|
| Name | Tool name |
| Description | Short description |
| Category | assistant, writing, image, video, automation, coding, audio, productivity |
| Price | Free, Freemium, or Paid |
| Price Detail | e.g. "Free / $20 per month" |
| Rating | Number from 0–5 |
| Reviews | Total review count |
| URL | Tool website |
| Logo | Direct image URL (Google favicon recommended) |
| Tags | Pipe-separated: `Tag1\|Tag2\|Tag3` |
| Integrations | Pipe-separated: `Zapier\|Slack\|API` |
| Uses | Pipe-separated: `Use case 1\|Use case 2` |

## Ratings Source

Ratings are sourced manually from [G2](https://g2.com) and [Capterra](https://capterra.com) and updated monthly.

## Status

Work in progress — next steps include production deployment and expanded tool coverage.

---

Built by [Just Ask AVA](https://justaskava.com)
