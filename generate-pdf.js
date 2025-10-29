const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

async function generatePdf() {
  const outputDir = path.resolve(__dirname, "_site");
  const outputPdf = path.resolve(outputDir, "resume.pdf");
  const resumeHtmlPath = path.resolve(outputDir, "index.html");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  if (!fs.existsSync(resumeHtmlPath)) {
    throw new Error(`Unable to find built resume at ${resumeHtmlPath}`);
  }

  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto(`file://${resumeHtmlPath}`, { waitUntil: "networkidle0" });
    await page.pdf({
      path: outputPdf,
      format: "A4",
      printBackground: true,
    });
  } finally {
    await browser.close();
  }
}

generatePdf()
  .then(() => {
    console.log("PDF generated successfully at _site/resume.pdf");
  })
  .catch((error) => {
    console.error("Failed to generate PDF:", error);
    process.exitCode = 1;
  });
