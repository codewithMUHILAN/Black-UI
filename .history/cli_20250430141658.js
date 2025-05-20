#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');

const srcPath = path.join(__dirname, 'dist', 'components', 'ui');
const destPath = path.join(process.cwd(), 'src', 'speedui');

fs.ensureDirSync(destPath);
fs.copySync(srcPath, destPath);

console.log('✅ SpeedUI components copied to src/speedui/');
