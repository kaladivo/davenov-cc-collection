# Claude Code Customizations Collection

A personal collection of Claude Code customizations including skills and slash commands.

## Contents

### Commands (`commands/`)

Slash commands that can be invoked with `/<command-name>`:

- **davenov:cc:interview** - Interview mode for expanding specifications
- **davenov:cc:rule** - Create or modify Claude Code rules
- **davenov:cc:update** - Update to latest version and sync to ~/.claude/

### Skills (`skills/`)

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

## Updating

Update from any directory using the slash command:

```
/davenov:cc:update
```

Or run the npx command directly:

```bash
npx davenov-cc@latest
```

The `@latest` tag ensures you get the newest version.

### Behavior with existing files

- **Merges directories** - Existing directories are preserved, not deleted
- **Overwrites matching files** - Files with the same path get overwritten
- **Preserves unrelated files** - Your other customizations in `~/.claude/` remain untouched

> **Note:** If you delete a file from this repo, it won't be removed from `~/.claude/` on reinstall. Manually delete unwanted files or remove the entire `~/.claude/commands/` or `~/.claude/skills/` directory before reinstalling for a clean slate.

## Structure

```
.
├── bin/
│   └── cli.js          # npx entry point
├── commands/           # Slash commands (*.md files)
│   ├── davenov:cc:interview.md
│   ├── davenov:cc:rule.md
│   └── davenov:cc:update.md
├── skills/             # Skills with references and workflows
│   └── <skill-name>/
│       ├── SKILL.md        # Main skill definition
│       ├── references/     # Reference documentation
│       ├── workflows/      # Step-by-step workflows
│       └── templates/      # Code templates (optional)
├── package.json        # npm package configuration
├── install.js          # Installation script
└── README.md
```

## Adding new customizations

### Adding a command

Create a new `.md` file in `commands/`:

```bash
commands/my-command.md
```

### Adding a skill

Create a new directory in `skills/` with at least a `SKILL.md`:

```bash
skills/my-skill/
├── SKILL.md
├── references/
│   └── ...
└── workflows/
    └── ...
```

After adding new customizations, run `node install.js` again to install them.

## Acknowledgments

Most resources in this collection were created with the help of [taches-cc-resources](https://github.com/glittercowboy/taches-cc-resources), an excellent toolkit for building Claude Code customizations.
