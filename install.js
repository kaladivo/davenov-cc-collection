#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");
const readline = require("readline");

const CLAUDE_DIR = path.join(os.homedir(), ".claude");
const SOURCE_DIR = __dirname;

// Parse command line arguments
const args = process.argv.slice(2);
const AUTO_OVERRIDE = args.includes("--auto-override");

// Directories to install
const CUSTOMIZATION_DIRS = ["commands", "skills"];

function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

async function prompt(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function copyRecursive(src, dest) {
  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

function countFiles(dir) {
  let count = 0;
  if (!fs.existsSync(dir)) return 0;

  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      count += countFiles(fullPath);
    } else {
      count++;
    }
  }
  return count;
}

async function main() {
  console.log("\n📦 Claude Code Customizations Installer\n");
  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Target: ${CLAUDE_DIR}\n`);

  // Check what we have to install
  const available = CUSTOMIZATION_DIRS.filter((dir) =>
    fs.existsSync(path.join(SOURCE_DIR, dir))
  );

  if (available.length === 0) {
    console.log("No customizations found to install.");
    process.exit(0);
  }

  console.log("Available customizations:");
  for (const dir of available) {
    const srcPath = path.join(SOURCE_DIR, dir);
    const fileCount = countFiles(srcPath);
    console.log(`  - ${dir}/ (${fileCount} files)`);
  }
  console.log();

  // Check for existing files
  const existing = available.filter((dir) =>
    fs.existsSync(path.join(CLAUDE_DIR, dir))
  );

  const rl = createReadlineInterface();

  if (existing.length > 0) {
    console.log("⚠️  The following directories already exist:");
    for (const dir of existing) {
      console.log(`  - ${path.join(CLAUDE_DIR, dir)}`);
    }
    console.log();

    if (AUTO_OVERRIDE) {
      console.log("Auto-override enabled, proceeding...");
    } else {
      const answer = await prompt(
        rl,
        "Do you want to overwrite existing files? (y/N): "
      );

      if (answer.toLowerCase() !== "y") {
        console.log("\nInstallation cancelled.");
        rl.close();
        process.exit(0);
      }
    }
  }

  // Ensure .claude directory exists
  if (!fs.existsSync(CLAUDE_DIR)) {
    fs.mkdirSync(CLAUDE_DIR, { recursive: true });
    console.log(`Created ${CLAUDE_DIR}`);
  }

  // Install each directory
  console.log("\nInstalling...\n");

  for (const dir of available) {
    const srcPath = path.join(SOURCE_DIR, dir);
    const destPath = path.join(CLAUDE_DIR, dir);

    console.log(`  ${dir}/`);
    copyRecursive(srcPath, destPath);
  }

  console.log("\n✅ Installation complete!\n");
  console.log("Your customizations are now available in Claude Code.");

  rl.close();
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
