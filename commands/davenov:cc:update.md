---
description: Update davenov-cc-collection to latest version and sync to ~/.claude/
allowed-tools:
  - Bash
---

# Update davenov-cc-collection

Pull the latest changes from the repository and reinstall to ~/.claude/.

## Instructions

1. Navigate to the repository at `~/.claude/davenov-cc-collection/`
2. Run `git pull` to fetch latest changes
3. Run `node install.js --auto-override` to sync updates

Execute these steps and report the results to the user.

```bash
cd ~/.claude/davenov-cc-collection && git pull && node install.js --auto-override
```
