#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 BlackUI: Preparing to initialize UI components...');

// Run directly instead of using exec to avoid line ending issues
const runCreateBlackUI = () => {
  try {
    console.log('📦 Running create-blackui directly...');
    
    // Require and execute the create-blackui script directly
    const createBlackUIPath = path.join(__dirname, 'create-blackui.js');
    require(createBlackUIPath);
    
    console.log('✅ BlackUI components created successfully!');
  } catch (error) {
    console.error('❌ Error creating BlackUI components:', error);
    console.log('🔄 Trying alternative method...');
    
    // As a fallback, try to execute the script using child_process
    setTimeout(() => {
      exec('node "' + path.join(__dirname, 'create-blackui.js') + '"', (err, stdout, stderr) => {
        if (err) {
          console.error('❌ BlackUI setup failed:', stderr);
          console.log('\nPlease run the following command manually:');
          console.log('npx create-blackui');
        } else {
          console.log(stdout);
        }
      });
    }, 1000);
  }
};

// Run the setup
runCreateBlackUI();