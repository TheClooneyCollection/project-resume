const fs = require("fs");
const path = require("path");
const http = require("http");
const disablePdf = process.argv.includes("--disable-pdf");

const projectRoot = path.resolve(__dirname, "..");
const siteRoot = path.join(projectRoot, "_site");
const outputPdf = path.join(siteRoot, "resume.pdf");
const printPreviewHtmlPath = path.join(siteRoot, "print_preview", "index.html");
const relativeSiteRoot = path.relative(projectRoot, siteRoot) || ".";
const relativeOutputPdf = path.relative(projectRoot, outputPdf) || "resume.pdf";
const relativePrintPreviewHtml =
  path.relative(projectRoot, printPreviewHtmlPath) || path.join("print_preview", "index.html");
const gray = (text) => `\x1b[90m${text}\x1b[39m`;
const logPdf = (message) => console.log(`${gray("[pdf]")} ${message}`);

function ensureBuildExists() {
  if (!fs.existsSync(siteRoot)) {
    throw new Error(`Build output directory missing at ${relativeSiteRoot}. Run "npm run build" first.`);
  }

  if (!fs.existsSync(printPreviewHtmlPath)) {
    throw new Error(
      `Unable to find print preview at ${relativePrintPreviewHtml}. Run "npm run build" first.`,
    );
  }
}

function startServer(handler) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) =>
      handler(req, res, { public: siteRoot })
    );

    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address !== "object") {
        reject(new Error("Failed to determine static server port"));
        return;
      }
      resolve({ server, port: address.port });
    });
  });
}

async function generatePdf() {
  if (disablePdf) {
    logPdf("PDF generation disabled via DISABLE_PDF");
    return;
  }

  // Lazy-load optional PDF dependencies so Docker dev can skip Puppeteer.
  const handler = require("serve-handler");
  const puppeteer = require("puppeteer");

  ensureBuildExists();
  let server;
  let port;
  let browser;
  let page;

  try {
    const started = await startServer(handler);
    server = started.server;
    port = started.port;
    logPdf(
      [
        "Serving static build",
        gray("from"),
        gray(relativeSiteRoot),
        gray("at"),
        gray(`http://localhost:${port}/`),
      ].join(" ")
    );
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto(`http://localhost:${port}/print_preview/`, { waitUntil: "networkidle0" });
    await page.pdf({
      path: outputPdf,
      printBackground: true,
      preferCSSPageSize: true,
    });
    logPdf(`Captured resume PDF ${gray("at")} ${gray(relativeOutputPdf)}`);
  } finally {
    if (page) {
      await page.close();
    }
    if (browser) {
      await browser.close();
    }
    if (server) {
      await new Promise((resolve) => server.close(resolve));
      logPdf(`Closed static server on port ${gray(port || "unknown")}`);
    }
  }
}

generatePdf()
  .then(() => {
    logPdf(`PDF generated successfully ${gray("at")} ${gray(relativeOutputPdf)}`);
  })
  .catch((error) => {
    console.error(`${gray("[pdf]")} Failed to generate PDF:`, error);
    process.exitCode = 1;
  });
