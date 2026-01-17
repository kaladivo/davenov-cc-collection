# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This repository manages personal Claude Code customizations (slash commands and skills) that get synced to `~/.claude/` on the local machine.

## Post-Change Workflow

1. **Update README**: If adding/removing/modifying skills or commands, update README.md to reflect the changes. Don't ask user about this. Just do it, if something relevant changed.

**After making any changes to files in this repository**, use AskUserQuestion to ask the user:

1. **Commit & Push**: "Should I commit and push these changes to the remote repository?"
2. **Sync to local**: "Should I sync the changes to your local `~/.claude/` folder?"
3. **Publish to NPM**: "Should I publish the update to NPM?"

Execute the requested actions based on user responses.

### NPM Publishing

When the user confirms NPM publishing, automatically:
1. Bump the patch version: `npm version patch`
2. Push the version commit and tag: `git push && git push --tags`

That's it! GitHub Actions will automatically publish to npm when the version tag is pushed. See `.github/workflows/publish.yml`.

## Commands

### Sync to local ~/.claude folder
```bash
node bin/cli.js
```
This copies `commands/` and `skills/` directories to `~/.claude/`. Note: Deleting files from this repo won't remove them from `~/.claude/` on reinstall.

### Uninstall
```bash
node bin/cli.js --uninstall
```

## Architecture

### Directory Structure
- `commands/` - Slash commands (`.md` files) invoked with `/<command-name>`
- `skills/` - Domain-specific knowledge organized as `<skill-name>/SKILL.md` with optional `references/`, `workflows/`, and `templates/` subdirectories
- `bin/cli.js` - CLI script for install/uninstall (used by `npx davenov-cc`)

### Skill Structure
Each skill follows this pattern:
```
skills/<skill-name>/
├── SKILL.md           # Main skill definition with YAML frontmatter
├── references/        # Reference documentation files
├── workflows/         # Step-by-step workflow guides
└── templates/         # Code templates (optional)
```

**SKILL.md frontmatter:**
```yaml
---
name: skill-name
description: Detailed description of when to use this skill
---
```

### Command Structure
Commands are single `.md` files with YAML frontmatter:
```yaml
---
argument-hint: [hint text]
description: Brief description
allowed-tools:         # Optional: restrict available tools
  - Read
  - Write
---
```

Commands can use `$ARGUMENTS` to reference user-provided arguments and `@file-path` to include file contents.

## Current Contents

**Commands:** `davenov:cc:interview`, `davenov:cc:rule`, `davenov:cc:update`

**Skills:** `davenov:cc:expert-convex-nextjs`, `davenov:cc:expert-evolu-nextjs`, `davenov:cc:expert-nextjs-16`, `davenov:cc:expert-build-nostr`
