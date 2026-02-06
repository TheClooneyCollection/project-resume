const { exec } = require("child_process");
const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
  const environment = process.env.ELEVENTY_ENV || "development";
  const disablePdf =
    process.env.DISABLE_PDF === "1" || process.env.DISABLE_PDF === "true";
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));
  eleventyConfig.addDataExtension("yml", (contents) => yaml.load(contents));
  eleventyConfig.ignores.add("_data/cv.yaml");
  eleventyConfig.ignores.add("_data/cv.template.yaml");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addFilter("toSet", (items = []) => {
    if (!Array.isArray(items)) {
      return new Set();
    }
    return new Set(items);
  });
  eleventyConfig.addGlobalData("environment", environment);

  eleventyConfig.on("eleventy.before", ({ runMode } = {}) => {
    if (runMode && runMode !== "build") {
      return;
    }
    console.log(`\x1b[90m[resume] Environment: ${environment}\x1b[0m`);
  });

  eleventyConfig.on("eleventy.after", () => {
    return new Promise((resolve, reject) => {
      const command = disablePdf
        ? "node scripts/generate-pdf.js --disable-pdf"
        : "node scripts/generate-pdf.js";
      exec(command, (error, stdout, stderr) => {
        if (stdout) {
          console.log(stdout);
        }
        if (stderr) {
          console.error(stderr);
        }
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["njk", "md", "html"],
  };
};
