const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

module.exports = () => {
  const dataDir = __dirname;
  const candidates = [
    path.join(dataDir, "cv.yaml"),
    path.join(dataDir, "cv.template.yaml"),
  ];
  const resolvedPath = candidates.find((candidate) => fs.existsSync(candidate));

  if (!resolvedPath) {
    throw new Error(
      "Missing CV data. Expected _data/cv.yaml or _data/cv.template.yaml."
    );
  }

  const relativePath = path.relative(process.cwd(), resolvedPath);
  console.log(`\x1b[90m[resume]\x1b[39m Reading: \x1b[90m${relativePath}\x1b[39m`);
  const contents = fs.readFileSync(resolvedPath, "utf8");
  return yaml.load(contents);
};
