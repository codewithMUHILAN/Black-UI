#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');

const srcPath = path.join(__dirname, 'dist', 'components', 'ui');
const destPath = path.join(process.cwd(), 'src', 'speedui');

fs.ensureDirSync(destPath);
fs.copySync(srcPath, destPath);

console.log('✅ SpeedUI components copied to src/speedui/');

// #!/usr/bin/env node
// import fs from 'fs-extra';
// import path from 'path';

// const targetDir = path.resolve(process.cwd(), 'src/speedui');
// const sourceDir = path.resolve(__dirname, 'dist/components/ui');

// fs.ensureDirSync(targetDir);
// fs.copySync(sourceDir, targetDir);

// console.log('✅ SpeedUI components Created to src/speedui/');
