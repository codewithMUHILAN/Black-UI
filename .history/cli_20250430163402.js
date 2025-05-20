#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');

// Define the source and destination folder pairs
const foldersToCopy = [
  {
    from: path.join(__dirname, 'dist', 'components', 'ui'),
    to: path.join(process.cwd(), 'src', 'components', 'speedui'),
  },
  {
    from: path.join(__dirname, 'dist', 'lib'),
    to: path.join(process.cwd(), 'src', 'lib'),
  }
];

// Copy each folder
foldersToCopy.forEach(({ from, to }) => {
  fs.ensureDirSync(to);
  fs.copySync(from, to);
  console.log(`✅ Copied from ${from} to ${to}`);
});

// #!/usr/bin/env node
// import fs from 'fs-extra';
// import path from 'path';

// const targetDir = path.resolve(process.cwd(), 'src/speedui');
// const sourceDir = path.resolve(__dirname, 'dist/components/ui');

// fs.ensureDirSync(targetDir);
// fs.copySync(sourceDir, targetDir);

// console.log('✅ SpeedUI components Created to src/speedui/');
