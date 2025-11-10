# Project Resume

Data-driven curriculum vitae built with [Eleventy (11ty)](https://www.11ty.dev/) that automatically captures a shareable PDF during `npm run build/dev`. Resume content lives in YAML, is rendered with Nunjucks templates, and styled for both screen and print layouts.

https://resume.nicholas.clooney.io/

**Web**

<img width="500" alt="Web Version" src="https://github.com/user-attachments/assets/7ccbbfde-5c2d-4dc3-9176-70434e9aaf08" />

**PDF**

<img width="500" alt="PDF Version" src="https://github.com/user-attachments/assets/a37ce781-f262-4e30-9fc8-5f11d68916d9" />


## Quick Start
1. Copy `_data/cv.template.yaml` to `_data/cv.yaml`, then update the new file with your details (or run `npm run link -- "<file-path>"` to symlink `_data/cv.yaml` to another YAML source).
2. Install dependencies: `npm install`
3. Launch the development server: `npm run dev`, then open `http://localhost:8080`
4. Build the static output: `npm run build` (artifacts land in `_site/`, including `_site/resume.pdf`)

## Responsive Preview
- Launch the dev server and open `http://localhost:8080/` for the mobile-friendly layout.
- Use the top bar links to jump to the print-focused view at `/print_preview/`, print directly, or grab the generated PDF.
- The page styles live in `css/resume-responsive.css`; tweak spacing or breakpoints here when iterating.

## Project Structure
- `_data/cv.yaml` — primary data source; copy it from the template and update the content with your experience, skills, and links.
- `_data/cv.template.yaml` — reference template that mirrors the expected schema for `_data/cv.yaml`.
- `_includes/layout.njk` — base HTML frame, including print-friendly styles and the PDF trigger.
- `_includes/layout-responsive.njk` — mobile-first chrome used by the responsive on-screen review.
- `src/index.njk` — responsive resume view rendered at `/` for mobile and desktop previews.
- `src/print_preview.njk` — print-optimized resume view rendered at `/print_preview/`.
- `css/base.css` — shared typography and page scaffolding for screen and print.
- `css/display.css` — screen-focused layout enhancements and interactive chrome.
- `css/sections.css` — styling for the individual resume sections and typography.
- `css/print.css` — print-only overrides plus `@page` sizing.
- `css/resume-responsive.css` — responsive-only styling for the alternate preview page.
- `scripts/generate-pdf.js` — Puppeteer helper that captures `_site/resume.pdf` after each build.
- `.eleventy.js` — Eleventy configuration enabling YAML data loading and stylesheet passthrough.

## Customization
- Edit `_data/cv.yaml` (after copying from `_data/cv.template.yaml`) to adjust content. Keep entries chronological (newest first) to match the rendered order.
- Modify or add sections in `src/index.njk` to reflect additional resume components (e.g., awards, speaking).
- Tweak typography, spacing, and print rules across `css/base.css`, `css/display.css`, `css/sections.css`, and `css/print.css`. The layout relies on A4 dimensions (`210mm` width, `@page` size).

### Linking to an external CV source
- Run `npm run link -- "<file-path>"` to replace `_data/cv.yaml` with a symlink that points to another YAML file (e.g., `npm run link -- "/Users/.../goodnotes-principal.cv.yaml"`).
- The command removes any existing `_data/cv.yaml` before linking, so make sure you’ve already saved local edits you care about.

## PDF Export
- Running `npm run build` triggers `scripts/generate-pdf.js`, which temporarily serves `_site/` on an ephemeral localhost port and captures `_site/resume.pdf` with Puppeteer.
- The “Download PDF” button links directly to `/resume.pdf`; make sure the build completed so the file exists.
- When printing manually, disable browser-supplied headers/footers if you want a clean PDF (Chrome: *More Settings → Headers and footers*).
- Ensure print margins remain at the defaults defined in CSS (`12mm` via `@page`).

## Verification Checklist
- Run `npm run build` before sharing updates to confirm the project compiles without errors.
- After each content or styling change, review the page in desktop and print preview to confirm layout, link targets, and page count.
