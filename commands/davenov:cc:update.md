---
description: Update Davenov CC (skills & slash commands collection) to the latest version
allowed-tools:
  - Bash
---

# Update Davenov CC Collection

This command updates the **davenov-cc** npm package — a collection of Claude Code skills and slash commands — to the latest version and syncs them to your `~/.claude/` folder.

## Instructions

Run the npx command with the `--update` flag to fetch and install the latest version:

```bash
npx davenov-cc@latest --update
```

- The `@latest` tag ensures npm fetches the newest version, bypassing any cached versions
- The `--update` flag skips confirmation prompts since we're updating existing files

Report the results to the user.
