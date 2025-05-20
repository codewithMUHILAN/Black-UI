#!/usr/bin/env node

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
const libDir = path.join(blackuiDir, 'lib');

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

// Create styles.css file with theme variables and base styles
const createStylesFile = () => {
  const stylesContent = `
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 0%;

    --card: 0 0% 100%;
    --card-foreground: 0 0% 0%;

    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 0%;

    --primary: 0 0% 0%;
    --primary-foreground: 0 0% 100%;

    --secondary: 0 0% 96%;
    --secondary-foreground: 0 0% 0%;

    --muted: 0 0% 96%;
    --muted-foreground: 0 0% 45%;

    --accent: 0 0% 96%;
    --accent-foreground: 0 0% 0%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --border: 0 0% 90%;
    --input: 0 0% 90%;
    --ring: 0 0% 0%;

    --radius: 0.5rem;
    
    --scrollbar-thumb: 0 0% 75%;
    --scrollbar-track: 0 0% 95%;
    --scrollbar-hover: 0 0% 65%;
  }

  .dark {
    --background: 0 0% 0%;
    --foreground: 0 0% 100%;

    --card: 0 0% 5%;
    --card-foreground: 0 0% 100%;

    --popover: 0 0% 5%;
    --popover-foreground: 0 0% 100%;

    --primary: 0 0% 100%;
    --primary-foreground: 0 0% 0%;

    --secondary: 0 0% 15%;
    --secondary-foreground: 0 0% 100%;

    --muted: 0 0% 15%;
    --muted-foreground: 0 0% 65%;

    --accent: 0 0% 15%;
    --accent-foreground: 0 0% 100%;

    --destructive: 0 62% 30%;
    --destructive-foreground: 0 0% 100%;

    --border: 0 0% 20%;
    --input: 0 0% 20%;
    --ring: 0 0% 100%;
    
    --scrollbar-thumb: 0 0% 25%;
    --scrollbar-track: 0 0% 10%;
    --scrollbar-hover: 0 0% 35%;
  }
}

/* Global scrollbar styling */
* {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--scrollbar-thumb)) hsl(var(--scrollbar-track));
}

/* WebKit browsers (Chrome, Safari, etc.) */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background-color: hsl(var(--scrollbar-track));
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: hsl(var(--scrollbar-thumb));
  border-radius: 10px;
  border: 2px solid hsl(var(--scrollbar-track));
}

::-webkit-scrollbar-thumb:hover {
  background-color: hsl(var(--scrollbar-hover));
}

::-webkit-scrollbar-corner {
  background-color: transparent;
}

/* Hide scrollbar but keep scroll functionality */
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-sans;
  }
}

@layer components {
  .card-hover {
    @apply transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg;
  }

  .toggle-switch {
    @apply relative w-10 h-5 rounded-full bg-secondary transition-colors duration-200;
  }

  .toggle-switch.active {
    @apply bg-primary;
  }

  .toggle-switch .toggle-knob {
    @apply absolute top-[2px] left-[2px] w-4 h-4 rounded-full bg-foreground transition-transform duration-200;
  }

  .toggle-switch.active .toggle-knob {
    @apply transform translate-x-5 bg-background;
  }

  /* Dropdown menu enhancements */
  .dropdown-hover-item {
    @apply flex items-center px-2 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors;
  }

  .dropdown-category {
    @apply text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1 px-2;
  }

  .dropdown-category-item {
    @apply flex items-center gap-2 w-full text-sm;
  }

  /* Tabs animation */
  .tabs-bg-indicator {
    @apply absolute rounded-sm bg-primary  transition-all duration-200 ease-out shadow-sm;
    transform-origin: center center;
  }

  /* Sidebar menu animation */
  .sidebar-menu-indicator {
    @apply absolute rounded-sm bg-primary/10 transition-all duration-200 ease-out shadow-sm;
  }

  /* Toast animations and styles */
  @keyframes toast-enter {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }

    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes toast-exit {
    0% {
      transform: translateX(0);
      opacity: 1;
    }

    100% {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  @keyframes toast-enter-mobile {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes toast-exit-mobile {
    0% {
      transform: translateY(0);
      opacity: 1;
    }

    100% {
      transform: translateY(-100%);
      opacity: 0;
    }
  }

  /* Dropdown and popover content max height and scrolling */
  .dropdown-content, 
  .select-content, 
  .popover-content, 
  .command-dialog {
    max-height: calc(90vh - 2rem);
    overflow-y: auto;
  }
}

@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  /* Enhanced custom scrollbar styles */
  .custom-scrollbar::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(120, 120, 120, 0.3);
    border-radius: 10px;
    transition: all 0.2s ease;
  }

  .custom-scrollbar:hover::-webkit-scrollbar-thumb {
    background-color: rgba(120, 120, 120, 0.5);
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(120, 120, 120, 0.7);
  }

  .custom-scrollbar::-webkit-scrollbar-corner {
    background: transparent;
  }

  .flex-wrap-tabs {
    @apply flex flex-wrap gap-1;
  }

  /* Custom Shimmer Animation for Skeletons */
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .animate-shimmer {
    animation: shimmer 2s infinite;
  }
}

/* Custom animation keyframes */
@keyframes aurora-1 {
  0% {
    top: 0;
    right: 0;
  }
  50% {
    top: 100%;
    right: 75%;
  }
  75% {
    top: 100%;
    right: 25%;
  }
  100% {
    top: 0;
    right: 0;
  }
}

@keyframes aurora-2 {
  0% {
    top: -50%;
    left: 0%;
  }
  60% {
    top: 100%;
    left: 75%;
  }
  85% {
    top: 100%;
    left: 25%;
  }
  100% {
    top: -50%;
    left: 0%;
  }
}

@keyframes aurora-3 {
  0% {
    bottom: 0;
    left: 0;
  }
  40% {
    bottom: 100%;
    left: 75%;
  }
  65% {
    bottom: 40%;
    left: 50%;
  }
  100% {
    bottom: 0;
    left: 0;
  }
}

@keyframes aurora-4 {
  0% {
    bottom: -50%;
    right: 0;
  }
  50% {
    bottom: 0%;
    right: 40%;
  }
  90% {
    bottom: 50%;
    right: 25%;
  }
  100% {
    bottom: -50%;
    right: 0;
  }
}

@keyframes aurora-border {
  0% {
    border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%;
  }
  25% {
    border-radius: 47% 29% 39% 49% / 61% 19% 66% 26%;
  }
  50% {
    border-radius: 57% 23% 47% 72% / 63% 17% 66% 33%;
  }
  75% {
    border-radius: 28% 49% 29% 100% / 93% 20% 64% 25%;
  }
  100% {
    border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }

  /* Add styles for command dialog backdrop blur */
  body.command-dialog-open,
  body.popover-open {
    @apply overflow-hidden;
  }

  /* Create a smooth backdrop blur transition */
  body.command-dialog-open::after,
  body.popover-open::after {
    content: "";
    position: fixed;
    inset: 0;
    z-index: 39;
    backdrop-filter: blur(4px);
    pointer-events: none;
    transition: backdrop-filter 0.2s ease;
  }
}

.syntax-coding{
  text-shadow: 0 5px 25px ;
}
`;

  fs.writeFileSync(path.join(blackuiDir, 'styles.css'), stylesContent);
  console.log('✅ Created styles.css with theme variables and base styles');
};

// Create tailwind config example file
const createTailwindConfig = () => {
  const content = `
// BlackUI Tailwind Configuration Example
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    // Include BlackUI components
    "./src/blackui/components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        scrollbar: {
          thumb: 'hsl(var(--scrollbar-thumb))',
          track: 'hsl(var(--scrollbar-track))',
          hover: 'hsl(var(--scrollbar-hover))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      // Add your custom keyframes and animations here
    }
  },
  plugins: [
    require("tailwindcss-animate")
  ],
}
`;

  fs.writeFileSync(path.join(targetDir, 'blackui-tailwind-example.js'), content);
  console.log('✅ Created tailwind config example file');
};

// Create index.ts file to export all components
const createIndexFile = () => {
  // Get all JS files from components/ui directory
  const componentFiles = fs.readdirSync(componentsDir)
    .filter(file => file.endsWith('.js') && !file.endsWith('.d.js'))
    .map(file => path.basename(file, '.js'));

  const imports = componentFiles.map(component => 
    `export * from './components/ui/${component}';`
  ).join('\n');

  const content = `// Re-export all components from BlackUI
import './styles.css';  // Import CSS file with theme variables

// UI Components
${imports}

// Utilities
export * from './lib/utils';

/* 
  How to use:
  1. Import styles in your main CSS file:
     @import '~/src/blackui/styles.css';

  2. Import and use components:
     import { Button, Toast, Toaster } from '~/src/blackui';
*/
`;

  fs.writeFileSync(path.join(blackuiDir, 'index.ts'), content);
  console.log(`✅ Created index.ts to export all components`);
};

// Create instructions file
const createReadme = () => {
  const content = `# BlackUI

## Getting Started

BlackUI components have been added to your project in the \`src/blackui\` directory.

### Usage

1. **Import the CSS in your main CSS file:**

   \`\`\`css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   /* Import BlackUI styles */
   @import '~/src/blackui/styles.css';
   \`\`\`

2. **Update your Tailwind config:**
   
   A sample tailwind configuration file has been created at \`blackui-tailwind-example.js\`.
   Use it as a reference to update your own tailwind.config.js file.

3. **Import and use components:**

   \`\`\`jsx
   import { Button, Toast, Toaster } from '~/src/blackui';

   function App() {
     return (
       <div>
         <Button>Click Me</Button>
         <Toaster />
       </div>
     );
   }
   \`\`\`

## Customization

You can customize the theme by modifying the CSS variables in \`src/blackui/styles.css\`.
`;

  fs.writeFileSync(path.join(blackuiDir, 'README.md'), content);
  console.log('✅ Created README.md with usage instructions');
};

// Create styles file
createStylesFile();

// Create tailwind config example
createTailwindConfig();

// Create index.ts to export all components
createIndexFile();

// Create README file
createReadme();

console.log('\n🎉 BlackUI components are now available in your project!');
console.log('\nTo use BlackUI components:');
console.log('1. Import the styles in your main CSS file:');
console.log('   @import \'~/src/blackui/styles.css\';');
console.log('2. Update your tailwind.config.js using the blackui-tailwind-example.js as reference');
console.log('3. Import components:');
console.log('   import { Button, Toast, ... } from \'~/src/blackui\';');
console.log('\nSee src/blackui/README.md for more details.');
