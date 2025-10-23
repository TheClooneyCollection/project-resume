# Repository Guidelines

## Project Structure & Module Organization
- Root contains `.eleventy.js` (Eleventy config) and `package.json` for scripts and dependencies.
- `_data/cv.yaml` holds resume content; treat it as the single source of truth for personal data.
- `_includes/layout.njk` defines the global page shell; `index.njk` renders the CV body.
- `css/style.css` manages both screen and print styles. Keep additional assets (fonts, icons) under `css/` or create an `assets/` directory if needed.
- `.eleventyignore` excludes planning artefacts; `.gitignore` keeps build and dependency folders out of version control.

## Build, Test, and Development Commands
- `npm run dev` — Starts Eleventy’s local server with live reload. Visit `http://localhost:8080` for previews.
- `npm run build` — Generates the static site into `_site/`. Always run before publishing or exporting PDFs.
- Manual check: after `npm run build`, open `_site/index.html` in a browser to confirm layout integrity.

## Coding Style & Naming Conventions
- Indent YAML, Nunjucks, and CSS with two spaces; avoid tabs for consistency.
- Follow semantic naming: e.g., `skills-grid`, `openSourceProjects` to mirror data keys.
- Keep YAML lists ordered chronologically (most recent first) to match the rendered CV.
- Use descriptive class names and prefer utility comments only when the intent is not obvious.

## Testing Guidelines
- No automated test suite yet; rely on `npm run build` as the smoke test.
- Before submitting changes: review the rendered CV in desktop and print preview, confirm links and typography, and ensure page count remains acceptable.
- If you add tooling (e.g., visual regression tests), document the workflow here and add commands to `package.json`.

## Commit & Pull Request Guidelines
- Use concise, imperative commit messages (e.g., “Add skills section layout tweak”).
- Group related changes (data updates, styling adjustments) into single commits to keep history clear.
- Pull requests should include: summary of changes, screenshots or PDF snippet if layout changes, and any manual verification steps run.
- Reference related issues with `Fixes #ID` or `Refs #ID` where applicable to maintain traceability.
