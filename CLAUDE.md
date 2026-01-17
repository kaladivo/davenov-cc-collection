# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This repository manages personal Claude Code customizations (slash commands and skills) that get synced to `~/.claude/` on the local machine.

## Post-Change Workflow

**After making any changes to files in this repository**, use AskUserQuestion to ask the user:

1. **Commit & Push**: "Should I commit and push these changes to the remote repository?"
2. **Sync to local**: "Should I sync the changes to your local `~/.claude/` folder using `node install.js`?"

Execute the requested actions based on user responses.

## Commands

### Sync to local ~/.claude folder
```bash
node install.js
```
This copies `commands/` and `skills/` directories to `~/.claude/`. It will prompt for confirmation if files already exist.

## Architecture

### Directory Structure
- `commands/` - Slash commands (`.md` files) invoked with `/<command-name>`
- `skills/` - Domain-specific knowledge organized as `<skill-name>/SKILL.md` with optional `references/`, `workflows/`, and `templates/` subdirectories
- `install.js` - Node.js script that copies customizations to `~/.claude/`

### Skill Structure
Each skill follows this pattern:
```
skills/<skill-name>/
├── SKILL.md           # Main skill definition with YAML frontmatter
├── references/        # Reference documentation files
├── workflows/         # Step-by-step workflow guides
└── templates/         # Code templates (optional)
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

## Current Contents

**Commands:** `interview`, `rule`

**Skills:** `expert-convex-nextjs`, `expert-evolu-nextjs`, `expert-nextjs-16`, `expert-build-nostr`
