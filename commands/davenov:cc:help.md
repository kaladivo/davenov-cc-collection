---
description: Show available Davenov CC commands and skills with usage examples
allowed-tools:
  - Bash
  - Read
  - Glob
---

# Davenov CC Help

Display help information about the installed Davenov CC collection.

## Instructions

1. **Check what's installed** by looking at the `~/.claude/` directory for davenov:cc commands and skills:

```bash
# List installed commands
ls ~/.claude/commands/davenov:cc:*.md 2>/dev/null || echo "No commands found"

# List installed skills
ls -d ~/.claude/skills/davenov:cc:*/ 2>/dev/null || echo "No skills found"
```

2. **Read the description** from each installed command's YAML frontmatter and each skill's SKILL.md file.

3. **Present a friendly help guide** to the user in this format:

```
Davenov CC Collection

A collection of Claude Code skills and slash commands for enhanced AI-assisted development.

COMMANDS
────────
/davenov:cc:help
  Show this help message

/davenov:cc:interview <spec-file>
  [description from frontmatter]

/davenov:cc:rule <description>
  [description from frontmatter]

/davenov:cc:update
  [description from frontmatter]

SKILLS (auto-loaded when relevant)
──────────────────────────────────
davenov:cc:expert-convex-nextjs
  [description from SKILL.md]

[...other skills...]

QUICK START
───────────
• Run /davenov:cc:update to get the latest version
• Skills activate automatically based on your project context
• Use /davenov:cc:interview to flesh out project specs
• Use /davenov:cc:rule to create Claude Code rules

RESOURCES
─────────
• GitHub: https://github.com/kaladivo/davenov-cc-collection
• npm: https://www.npmjs.com/package/davenov-cc
```

4. If no davenov:cc items are found, suggest running `npx davenov-cc` to install.
