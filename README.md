# Claude Code Customizations Collection

[![npm version](https://img.shields.io/npm/v/davenov-cc.svg)](https://www.npmjs.com/package/davenov-cc)
[![npm downloads](https://img.shields.io/npm/dm/davenov-cc.svg)](https://www.npmjs.com/package/davenov-cc)

A personal collection of Claude Code customizations including skills and slash commands.

## Contents

### Commands

Slash commands that can be invoked with `/<command-name>`:

- **brainstorm** - Brainstorm a topic through thoughtful, probing questions that reveal hidden assumptions and unexplored angles
- **davenov:cc:changelog** - Initialize or manage a CHANGELOG.md following Keep a Changelog format
- **davenov:cc:interview** - Interview mode for expanding specifications
- **davenov:cc:rule** - Create or modify Claude Code rules

### Skills

Skills provide Claude with domain-specific knowledge and workflows:

- **davenov:cc:expert-convex-nextjs** - Building full-stack apps with Convex backend and Next.js frontend
- **davenov:cc:expert-evolu-nextjs** - Local-first apps with Evolu and Next.js (offline-first, e2e encryption)
- **davenov:cc:expert-nextjs-16** - Next.js 16 patterns including Cache Components, Server Actions, and more
- **davenov:cc:expert-build-nostr** - Building Nostr applications for decentralized data exchange

## Installation

Requires Node.js (no additional dependencies).

```bash
npx davenov-cc
```

That's it! The installer will copy all commands and skills to `~/.claude/`.

## Getting Help

Run the help command to see all available commands and skills:

```
/davenov:cc:help
```

This will show you what's installed, how to use each command, and quick start tips.

## Updating

### `/davenov:cc:update`

The easiest way — just run this slash command from any Claude Code session:

```
/davenov:cc:update
```

### Manual update

Or run the npx command directly:

```bash
npx davenov-cc@latest
```

The `@latest` tag ensures you get the newest version.

## Uninstalling

To remove all davenov-cc customizations from `~/.claude/`:

```bash
npx davenov-cc --uninstall
```

This only removes files installed by this package - your other customizations remain untouched.

## Behavior with existing files

- **Merges directories** - Existing directories are preserved, not deleted
- **Overwrites matching files** - Files with the same path get overwritten
- **Preserves unrelated files** - Your other customizations in `~/.claude/` remain untouched

> **Note:** If you delete a file from this repo, it won't be removed from `~/.claude/` on reinstall. Manually delete unwanted files or remove the entire `~/.claude/commands/` or `~/.claude/skills/` directory before reinstalling for a clean slate.

## Acknowledgments

Most resources in this collection were created with the help of [taches-cc-resources](https://github.com/glittercowboy/taches-cc-resources), an excellent toolkit for building Claude Code customizations.
