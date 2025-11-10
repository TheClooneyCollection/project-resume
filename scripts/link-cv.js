#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const sourceArg = process.argv[2];

if (!sourceArg) {
  console.error('Usage: npm run link -- <file-path>');
  process.exit(1);
}

const sourcePath = path.resolve(sourceArg);
const destinationPath = path.join(process.cwd(), '_data', 'cv.yaml');

if (!fs.existsSync(sourcePath)) {
  console.error(`Source file does not exist: ${sourcePath}`);
  process.exit(1);
}

try {
  fs.rmSync(destinationPath, { force: true });
} catch (error) {
  console.error(`Failed to remove existing _data/cv.yaml: ${error.message}`);
  process.exit(1);
}

try {
  fs.symlinkSync(sourcePath, destinationPath);
  console.log(`Linked _data/cv.yaml -> ${sourcePath}`);
} catch (error) {
  console.error(`Failed to create symlink: ${error.message}`);
  process.exit(1);
}
