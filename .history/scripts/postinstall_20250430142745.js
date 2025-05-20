const { exec } = require('child_process');
const path = require('path');

console.log('🚀 SpeedUI: Preparing to initialize UI components...');

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
