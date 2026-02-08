# Project Resume

Data-driven curriculum vitae built with [Eleventy (11ty)](https://www.11ty.dev/) that can automatically capture a shareable PDF during Eleventy runs (`npm run build`, `npm run dev`, `npm run prod`) unless disabled. Resume content lives in YAML, is rendered with Nunjucks templates, and styled for both screen and print layouts.

https://resume.nicholas.clooney.io/

**Web**

<img width="500" alt="Web Version" src="https://github.com/user-attachments/assets/7ccbbfde-5c2d-4dc3-9176-70434e9aaf08" />

**PDF**

<img width="500" alt="PDF Version" src="https://github.com/user-attachments/assets/a37ce781-f262-4e30-9fc8-5f11d68916d9" />


## Quick Start
1. Copy `_data/cv.template.yaml` to `_data/cv.yaml`, then update the new file with your details.
2. Copy `_data/contact.example.yaml` to `_data/contact.yaml`, then update the email and phone values used in the print preview.
3. Install dependencies: `npm install`
4. Launch the development server: `npm run dev`, then open `http://localhost:8080`
5. Build the static output: `npm run build` (artifacts land in `_site/`, including `_site/resume.pdf`)

## Responsive Preview
- Launch the dev server and open `http://localhost:8080/` for the mobile-friendly layout.
- Use the top bar links to jump to the print-focused view at `/print_preview/`, print directly, or grab the generated PDF.
- The page styles live in `css/resume-responsive.css`; tweak spacing or breakpoints here when iterating.

## Docker (No PDF)
- Use `docker-compose-no-pdf.yml` to run Eleventy in Docker without PDF generation.
- Start the dev or prod service:
  - `docker compose -f docker-compose-no-pdf.yml up resume-dev-no-pdf`
  - `docker compose -f docker-compose-no-pdf.yml up resume-prod-no-pdf`
- Or run both at once: `docker compose -f docker-compose-no-pdf.yml up`
- Open `http://localhost:8090` for dev or `http://localhost:8091` for prod.
- PDF generation is disabled via the `:disable_pdf` commands with `DISABLE_PDF=1` in the `package.json` file.

## Docker (With PDF)
- Use `compose.yml` to run with the local `Dockerfile` image, which installs Chromium for Puppeteer-based PDF export.
- The PDF-capable image is still on the larger side (about `1.75GB`) due to Chromium and Puppeteer dependencies.
- Default mode (public ports):
  - `docker compose up -d`
  - Dev: `http://127.0.0.1:8080`
  - Prod: `http://127.0.0.1:8090`
- Shared-edge mode (no host ports; for reverse proxy via Caddy on the `edge` network):
  - One-time network create: `docker network create edge 2>/dev/null || true`
  - Run: `docker compose -f compose.yml -f compose.edge.yml up -d`
  - Caddy (in the ingress stack) should `reverse_proxy` to the `dev` or `prod` container names on the `edge` network.

## Docker Debugging
- Show merged config: `docker compose -f compose.yml -f compose.edge.yml config`
- Find container DNS names on the edge network: `docker network inspect edge --format '{{range $id,$c := .Containers}}{{$c.Name}} aliases={{printf "%v" $c.Aliases}}{{"\n"}}{{end}}'`

## Project Structure
- `_data/cv.yaml` — primary data source; copy it from the template and update the content with your experience, skills, and links.
- `_data/cv.template.yaml` — reference template that mirrors the expected schema for `_data/cv.yaml`.
- `_data/contact.yaml` — email and phone values surfaced in the print preview header.
- `_data/contact.example.yaml` — starter template for `_data/contact.yaml`.
- `_includes/layout.njk` — base HTML frame, including print-friendly styles and the PDF trigger.
- `_includes/layout-responsive.njk` — mobile-first chrome used by the responsive on-screen review.
- `src/index.njk` — responsive resume view rendered at `/` for mobile and desktop previews.
- `src/print_preview.njk` — print-optimized resume view rendered at `/print_preview/`.
- `css/base.css` — shared typography and page scaffolding for screen and print.
- `css/display.css` — screen-focused layout enhancements and interactive chrome.
- `css/sections.css` — styling for the individual resume sections and typography.
- `css/print.css` — print-only overrides plus `@page` sizing.
- `css/resume-responsive.css` — responsive-only styling for the alternate preview page.
- `scripts/generate-pdf.js` — Puppeteer helper that captures `_site/resume.pdf` after Eleventy runs (unless disabled).
- `.eleventy.js` — Eleventy configuration enabling YAML data loading and stylesheet passthrough.

## Customization
- Edit `_data/cv.yaml` (after copying from `_data/cv.template.yaml`) to adjust content. Keep entries chronological (newest first) to match the rendered order.
- Modify or add sections in `src/index.njk` to reflect additional resume components (e.g., awards, speaking).
- Tweak typography, spacing, and print rules across `css/base.css`, `css/display.css`, `css/sections.css`, and `css/print.css`. The layout relies on A4 dimensions (`210mm` width, `@page` size).

## PDF Export
- Running `npm run build` triggers `scripts/generate-pdf.js`, which temporarily serves `_site/` on an ephemeral localhost port and captures `_site/resume.pdf` with Puppeteer.
- `npm run dev` and `npm run prod` also run the same PDF step after Eleventy writes output; use `npm run dev:disable_pdf` or `npm run prod:disable_pdf` to skip it.
- The “Download PDF” button links directly to `/resume.pdf`; make sure the build completed so the file exists.
- When printing manually, disable browser-supplied headers/footers if you want a clean PDF (Chrome: *More Settings → Headers and footers*).
- Ensure print margins remain at the defaults defined in CSS (`12mm` via `@page`).

## Verification Checklist
- Run `npm run build` before sharing updates to confirm the project compiles without errors.
- After each content or styling change, review the page in desktop and print preview to confirm layout, link targets, and page count.
