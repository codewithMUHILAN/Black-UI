

const fs = require('fs');
const path = require('path');

console.log('📦 Creating BlackUI components in your project...');

// Source package directory (where this script is located)
const packageDir = path.resolve(__dirname, '..');
const sourceDistDir = path.join(packageDir, 'dist');

// The target directory is the current working directory
const targetDir = process.cwd();
const blackuiDir = path.join(targetDir, 'src', 'blackui');
const componentsDir = path.join(blackuiDir, 'components', 'ui');
const libDir = path.join(blackuiDir,'components', 'lib');

// Create directories if they don't exist
const createDirIfNotExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
};

createDirIfNotExists(blackuiDir);
createDirIfNotExists(componentsDir);
createDirIfNotExists(libDir);

// Copy files recursively
const copyFiles = (sourceDir, targetDir) => {
  if (!fs.existsSync(sourceDir)) {
    console.error(`Source directory doesn't exist: ${sourceDir}`);
    return;
  }

  const files = fs.readdirSync(sourceDir);
  
  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    
    const stats = fs.statSync(sourcePath);
    
    if (stats.isDirectory()) {
      createDirIfNotExists(targetPath);
      copyFiles(sourcePath, targetPath);
    } else {
      // Only copy .js, .d.ts, or .css files (skip source maps and other files)
      if (['.js', '.d.ts', '.css'].some(ext => file.endsWith(ext))) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied: ${file} to ${targetPath}`);
      }
    }
  });
};

// Copy the components from dist/components/ui to the target
if (fs.existsSync(path.join(sourceDistDir, 'components', 'ui'))) {
  copyFiles(path.join(sourceDistDir, 'components', 'ui'), componentsDir);
  console.log('✅ Copied UI components');
} else {
  console.error('⚠️ Components directory not found in package');
}

// Copy the lib utils
if (fs.existsSync(path.join(sourceDistDir, 'lib'))) {
  copyFiles(path.join(sourceDistDir, 'lib'), libDir);
  console.log('✅ Copied utility functions');
} else if (fs.existsSync(path.join(sourceDistDir, 'components', 'lib'))) {
  // Fallback to components/lib if the top-level lib directory doesn't exist
  copyFiles(path.join(sourceDistDir, 'components', 'lib'), libDir);
  console.log('✅ Copied utility functions from components/lib');
} else {
  console.error('⚠️ Lib directory not found in package');
}

// Create index.ts file to export all components
const createIndexFile = () => {
  const content = `// Re-export all components from BlackUI
import './styles.css';  // Import CSS if it exists

// UI Components
${fs.readdirSync(componentsDir)
  .filter(file => file.endsWith('.js') && !file.endsWith('.d.js'))
  .map(file => `export * from './components/ui/${path.basename(file, '.js')}';`)
  .join('\n')}

// Utilities
export * from './lib/utils';
`;

  fs.writeFileSync(path.join(blackuiDir, 'index.ts'), content);
  console.log(`✅ Created index.ts to export all components`);
};

// Check if there's a CSS file to copy
if (fs.existsSync(path.join(sourceDistDir, 'styles.css'))) {
  createDirIfNotExists(path.join(blackuiDir));
  fs.copyFileSync(
    path.join(sourceDistDir, 'styles.css'), 
    path.join(blackuiDir, 'styles.css')
  );
  console.log('✅ Copied styles.css');
}

// Create index.ts to export all components
createIndexFile();

console.log('🎉 BlackUI components are now available in your project!');
console.log('Import them in your code: import { Button, Toast, ... } from "src/blackui";');
