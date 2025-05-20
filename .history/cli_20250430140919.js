#!/usr/bin/env node
import fs from 'fs-extra';
import path from 'path';

const targetDir = path.resolve(process.cwd(), 'src/speedui');
const sourceDir = path.resolve(__dirname, 'dist/components/ui');

fs.ensureDirSync(targetDir);
fs.copySync(sourceDir, targetDir);

console.log('✅ SpeedUI components Created to src/speedui/');
