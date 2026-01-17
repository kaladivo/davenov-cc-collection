#!/usr/bin/env node

const path = require('path');
const { spawn } = require('child_process');

// Pass through arguments to install.js
const args = process.argv.slice(2);

// Default to --auto-override for install (unless --uninstall)
const isUninstall = args.includes('--uninstall');
const scriptArgs = isUninstall ? args : ['--auto-override', ...args];

const installScript = path.join(__dirname, '..', 'install.js');

const child = spawn(process.execPath, [installScript, ...scriptArgs], {
  stdio: 'inherit',
  cwd: path.join(__dirname, '..')
});

child.on('close', (code) => {
  process.exit(code);
});
