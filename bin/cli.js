#!/usr/bin/env node

const path = require('path');
const { spawn } = require('child_process');

// Run install.js from the package root with --auto-override
const installScript = path.join(__dirname, '..', 'install.js');

const child = spawn(process.execPath, [installScript, '--auto-override'], {
  stdio: 'inherit',
  cwd: path.join(__dirname, '..')
});

child.on('close', (code) => {
  process.exit(code);
});
