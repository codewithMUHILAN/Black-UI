const { exec } = require('child_process');
const path = require('path');

console.log('🚀 SpeedUI: Preparing to initialize UI components...');

// Create a function to copy CSS templates
const createCssFile = (targetDir) => {
  const cssContent = `
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");

/* BlackUI base styles */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import BlackUI styles */
@import 'black-ui/dist/styles.css';

/* Override variables if needed */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 0%;

    --card: 0 0% 100%;
    --card-foreground: 0 0% 0%;

    /* Add your custom variables here if needed */
  }

  .dark {
    --background: 0 0% 0%;
    --foreground: 0 0% 100%;
    
    /* Add your custom dark mode variables here */
  }
}
`;

  const targetPath = path.join(targetDir, 'blackui-styles.css');
  fs.writeFileSync(targetPath, cssContent);
  console.log(`✅ Created BlackUI styles template at ${targetPath}`);
};

setTimeout(() => {
  exec('npx create-speedui', (err, stdout, stderr) => {
    if (err) {
      console.error('❌ SpeedUI setup failed:', stderr);
    } else {
      console.log('✅ SpeedUI components created successfully!');
      console.log(stdout);
    }
  });
}, 1000); // Delay to ensure npm unlocks the package folder
