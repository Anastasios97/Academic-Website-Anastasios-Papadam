# Academic Portfolio – Anastasios Papadam

Personal research website of **Anastasios Papadam** (genetic epidemiology · mosaicism · AMD · biological ageing), live at [www.papadamlab.com](https://www.papadamlab.com/).

## Features

- **Quick navigation** – press <kbd>⌘K</kbd> / <kbd>Ctrl K</kbd> (or <kbd>/</kbd>) to search sections, dialogs, publications and actions.
- **Publications with one-click citations** – copy APA or BibTeX for every paper; conference talks shown alongside.
- **Deep links** – any dialog can be shared, e.g. `/#view-publications`, `/#view-research`.
- **Monthly research insights** – `data/insights.json` is refreshed automatically by a GitHub Action (`npm run insights:update`).
- Responsive mobile menu, scroll-spy navigation, reading-progress bar, reveal-on-scroll, dark/light theme.
- Accessible dialogs (focus trap, Escape to close, focus restore), skip link, reduced-motion support.
- Prerendered HTML for search engines, plus JSON-LD structured data.

## Editing content

| What | Where |
| --- | --- |
| Publications, conferences, education, toolkit, contact links | `data/profile.ts` |
| Long-form dialogs (research, experience, lab, funder…) | `sections` in `App.tsx` |
| Software packages & tutorials (currently *coming soon*) | `#packages` and `#tutorials` sections in `App.tsx` |

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # client build + SSR prerender into dist/
```
