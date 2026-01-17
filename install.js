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
const UNINSTALL = args.includes("--uninstall");

// Directories to install/uninstall
const CUSTOMIZATION_DIRS = ["commands", "skills"];

// Files/folders installed by this package (for uninstall)
const INSTALLED_ITEMS = {
  commands: ["davenov:cc:interview.md", "davenov:cc:rule.md", "davenov:cc:update.md"],
  skills: [
    "davenov:cc:expert-convex-nextjs",
    "davenov:cc:expert-evolu-nextjs",
    "davenov:cc:expert-nextjs-16",
    "davenov:cc:expert-build-nostr"
  ]
};

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

function removeRecursive(target) {
  if (!fs.existsSync(target)) return false;

  const stats = fs.statSync(target);
  if (stats.isDirectory()) {
    fs.rmSync(target, { recursive: true, force: true });
  } else {
    fs.unlinkSync(target);
  }
  return true;
}

async function uninstall(rl) {
  console.log("\n🗑️  Claude Code Customizations Uninstaller\n");
  console.log(`Target: ${CLAUDE_DIR}\n`);

  // Check what's installed
  const installed = [];
  for (const [dir, items] of Object.entries(INSTALLED_ITEMS)) {
    for (const item of items) {
      const fullPath = path.join(CLAUDE_DIR, dir, item);
      if (fs.existsSync(fullPath)) {
        installed.push({ dir, item, fullPath });
      }
    }
  }

  if (installed.length === 0) {
    console.log("No davenov-cc customizations found to uninstall.");
    return;
  }

  console.log("Found installed customizations:");
  for (const { dir, item } of installed) {
    console.log(`  - ${dir}/${item}`);
  }
  console.log();

  if (!AUTO_OVERRIDE) {
    const answer = await prompt(
      rl,
      "Do you want to remove these customizations? (y/N): "
    );

    if (answer.toLowerCase() !== "y") {
      console.log("\nUninstall cancelled.");
      return;
    }
  } else {
    console.log("Auto-override enabled, proceeding...");
  }

  console.log("\nRemoving...\n");

  let removed = 0;
  for (const { dir, item, fullPath } of installed) {
    if (removeRecursive(fullPath)) {
      console.log(`  ✓ ${dir}/${item}`);
      removed++;
    }
  }

  console.log(`\n✅ Uninstall complete! Removed ${removed} item(s).\n`);
}

async function main() {
  const rl = createReadlineInterface();

  if (UNINSTALL) {
    await uninstall(rl);
    rl.close();
    return;
  }

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
