# 11ty Resume

Data-driven curriculum vitae built with [Eleventy (11ty)](https://www.11ty.dev/). Resume content lives in YAML, is rendered with Nunjucks templates, and styled for both screen and print layouts.

## Quick Start
1. Install dependencies: `npm install`
2. Launch the development server: `npm run dev`, then open `http://localhost:8080`
3. Build the static output: `npm run build` (artifacts land in `_site/`)

## Project Structure
- `_data/cv.yaml` — primary data source; update this file with your experience, skills, and links.
- `_includes/layout.njk` — base HTML frame, including print-friendly styles and the PDF trigger.
- `index.njk` — page template that renders sections using the YAML data.
- `css/style.css` — shared styling for desktop preview and A4 print layout.
- `.eleventy.js` — Eleventy configuration enabling YAML data loading and stylesheet passthrough.

## Customization
- Edit `_data/cv.yaml` to adjust content. Keep entries chronological (newest first) to match the rendered order.
- Modify or add sections in `index.njk` to reflect additional resume components (e.g., awards, speaking).
- Tweak typography, spacing, and print rules in `css/style.css`. The layout relies on A4 dimensions (`210mm` width, `@page` size).

## PDF Export
- In the browser preview, use the “Download PDF” button (or `⌘/Ctrl + P`) to open the print dialog.
- Disable browser-supplied headers/footers if you want a clean PDF (Chrome: *More Settings → Headers and footers*).
- Ensure print margins remain at the defaults defined in CSS (`12mm` via `@page`).

## Verification Checklist
- Run `npm run build` before sharing updates to confirm the project compiles without errors.
- After each content or styling change, review the page in desktop and print preview to confirm layout, link targets, and page count.
