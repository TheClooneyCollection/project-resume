const { exec } = require("child_process");
const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
  const environment = process.env.ELEVENTY_ENV || "development";
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));
  eleventyConfig.addDataExtension("yml", (contents) => yaml.load(contents));
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
    console.log(`[Eleventy] Environment: ${environment}`);
  });

  eleventyConfig.on("eleventy.after", () => {
    return new Promise((resolve, reject) => {
      exec("node scripts/generate-pdf.js", (error, stdout, stderr) => {
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
