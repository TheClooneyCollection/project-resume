# Project Resume

Data-driven curriculum vitae built with [Eleventy (11ty)](https://www.11ty.dev/) that automatically captures a shareable PDF during `npm run build/dev`. Resume content lives in YAML, is rendered with Nunjucks templates, and styled for both screen and print layouts.

https://project-resume-f5j.pages.dev/

<img width="500" alt="image" src="https://github.com/user-attachments/assets/fe81255d-edb5-4722-a914-201da1a18f40" />


## Quick Start
1. Install dependencies: `npm install`
2. Launch the development server: `npm run dev`, then open `http://localhost:8080`
3. Build the static output: `npm run build` (artifacts land in `_site/`, including `_site/resume.pdf`)

## Project Structure
- `_data/cv.yaml` — primary data source; update this file with your experience, skills, and links.
- `_includes/layout.njk` — base HTML frame, including print-friendly styles and the PDF trigger.
- `index.njk` — page template that renders sections using the YAML data.
- `css/base.css` — shared typography and page scaffolding for screen and print.
- `css/display.css` — screen-focused layout enhancements and interactive chrome.
- `css/sections.css` — styling for the individual resume sections and typography.
- `css/print.css` — print-only overrides plus `@page` sizing.
- `.eleventy.js` — Eleventy configuration enabling YAML data loading and stylesheet passthrough.

## Customization
- Edit `_data/cv.yaml` to adjust content. Keep entries chronological (newest first) to match the rendered order.
- Modify or add sections in `index.njk` to reflect additional resume components (e.g., awards, speaking).
- Tweak typography, spacing, and print rules across `css/base.css`, `css/display.css`, `css/sections.css`, and `css/print.css`. The layout relies on A4 dimensions (`210mm` width, `@page` size).

## PDF Export
- Running `npm run build` triggers `generate-pdf.js`, which temporarily serves `_site/` on an ephemeral localhost port and captures `_site/resume.pdf` with Puppeteer.
- The “Download PDF” button links directly to `/resume.pdf`; make sure the build completed so the file exists.
- When printing manually, disable browser-supplied headers/footers if you want a clean PDF (Chrome: *More Settings → Headers and footers*).
- Ensure print margins remain at the defaults defined in CSS (`12mm` via `@page`).

## Verification Checklist
- Run `npm run build` before sharing updates to confirm the project compiles without errors.
- After each content or styling change, review the page in desktop and print preview to confirm layout, link targets, and page count.
