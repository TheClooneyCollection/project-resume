const fs = require("fs");
const path = require("path");
const http = require("http");
const handler = require("serve-handler");
const puppeteer = require("puppeteer");

const projectRoot = path.resolve(__dirname, "..");
const siteRoot = path.join(projectRoot, "_site");
const outputPdf = path.join(siteRoot, "resume.pdf");
const resumeHtmlPath = path.join(siteRoot, "index.html");
const relativeSiteRoot = path.relative(projectRoot, siteRoot) || ".";
const relativeOutputPdf = path.relative(projectRoot, outputPdf) || "resume.pdf";
const relativeResumeHtml = path.relative(projectRoot, resumeHtmlPath) || "index.html";
const gray = (text) => `\x1b[90m${text}\x1b[39m`;
const logPdf = (message) => console.log(`${gray("[pdf]")} ${message}`);

function ensureBuildExists() {
  if (!fs.existsSync(siteRoot)) {
    throw new Error(`Build output directory missing at ${relativeSiteRoot}. Run "npm run build" first.`);
  }

  if (!fs.existsSync(resumeHtmlPath)) {
    throw new Error(`Unable to find built resume at ${relativeResumeHtml}. Run "npm run build" first.`);
  }
}

function startServer() {
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
  ensureBuildExists();
  let server;
  let port;
  let browser;
  let page;

  try {
    const started = await startServer();
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
    await page.goto(`http://localhost:${port}/`, { waitUntil: "networkidle0" });
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
