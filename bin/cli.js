#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");
const readline = require("readline");

const CLAUDE_DIR = path.join(os.homedir(), ".claude");
const SOURCE_DIR = path.join(__dirname, "..");

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

function getItemsToOverwrite() {
  const toOverwrite = [];
  for (const [dir, items] of Object.entries(INSTALLED_ITEMS)) {
    for (const item of items) {
      const fullPath = path.join(CLAUDE_DIR, dir, item);
      if (fs.existsSync(fullPath)) {
        toOverwrite.push({ dir, item, fullPath });
      }
    }
  }
  return toOverwrite;
}

async function uninstall(rl) {
  console.log("\n🗑️  Davenov CC Collection — Uninstaller\n");

  // Check what's installed
  const installed = getItemsToOverwrite();

  if (installed.length === 0) {
    console.log("Nothing from Davenov CC found. Already clean! 🧹\n");
    return;
  }

  console.log("Found these installed:");
  for (const { dir, item } of installed) {
    console.log(`   ${dir}/${item}`);
  }
  console.log();

  if (!AUTO_OVERRIDE) {
    const answer = await prompt(
      rl,
      "Remove all of these? (y/N): "
    );

    if (answer.toLowerCase() !== "y") {
      console.log("\nAll good, keeping everything in place. 👍\n");
      return;
    }
  } else {
    console.log("Auto-override enabled, cleaning up...");
  }

  console.log("\nRemoving...\n");

  let removed = 0;
  for (const { dir, item, fullPath } of installed) {
    if (removeRecursive(fullPath)) {
      console.log(`   ✓ ${dir}/${item}`);
      removed++;
    }
  }

  console.log(`\n✅ Done! Removed ${removed} item(s).`);
  console.log("   Come back anytime! 👋\n");
}

async function install(rl) {
  console.log("\n✨ Davenov CC Collection\n");

  // Check what we have to install
  const available = CUSTOMIZATION_DIRS.filter((dir) =>
    fs.existsSync(path.join(SOURCE_DIR, dir))
  );

  if (available.length === 0) {
    console.log("Hmm, nothing to install here. That's weird.");
    process.exit(0);
  }

  console.log("📦 What's in the box:");
  for (const dir of available) {
    const srcPath = path.join(SOURCE_DIR, dir);
    const fileCount = countFiles(srcPath);
    console.log(`   ${dir}/ → ${fileCount} files`);
  }
  console.log();

  // Check for actual file conflicts (not just directory existence)
  const itemsToOverwrite = getItemsToOverwrite();

  if (itemsToOverwrite.length > 0) {
    console.log("⚠️  Heads up! These will be overwritten:");
    for (const { dir, item } of itemsToOverwrite) {
      console.log(`   ${dir}/${item}`);
    }
    console.log();

    if (AUTO_OVERRIDE) {
      console.log("Auto-override enabled, let's go...");
    } else {
      const answer = await prompt(
        rl,
        "Cool with that? (y/N): "
      );

      if (answer.toLowerCase() !== "y") {
        console.log("\nNo worries, nothing changed. Catch you later! 👋");
        rl.close();
        process.exit(0);
      }
    }
  }

  // Ensure .claude directory exists
  if (!fs.existsSync(CLAUDE_DIR)) {
    fs.mkdirSync(CLAUDE_DIR, { recursive: true });
  }

  // Install each directory
  console.log("Installing the good stuff...\n");

  for (const dir of available) {
    const srcPath = path.join(SOURCE_DIR, dir);
    const destPath = path.join(CLAUDE_DIR, dir);

    console.log(`   ✓ ${dir}/`);
    copyRecursive(srcPath, destPath);
  }

  console.log("\n🚀 You're all set! Go build something!\n");
}

async function main() {
  const rl = createReadlineInterface();

  try {
    if (UNINSTALL) {
      await uninstall(rl);
    } else {
      // Default to auto-override when run via npx (no TTY interaction expected)
      if (!process.stdin.isTTY && !AUTO_OVERRIDE) {
        args.push("--auto-override");
      }
      await install(rl);
    }
  } finally {
    rl.close();
  }
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
