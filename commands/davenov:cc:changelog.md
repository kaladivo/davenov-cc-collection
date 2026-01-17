---
description: Initialize or manage a CHANGELOG.md following Keep a Changelog format
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
---

# Changelog Management Command

Initialize and manage a CHANGELOG.md file following the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) specification.

## Workflow

### Step 1: Detect Current State

Check if CHANGELOG.md already exists:

```bash
ls -la CHANGELOG.md 2>/dev/null || echo "NO_CHANGELOG"
```

Also check for existing CLAUDE.md:

```bash
ls -la CLAUDE.md 2>/dev/null || echo "NO_CLAUDE_MD"
```

### Step 2: Handle Existing Changelog

**If CHANGELOG.md exists:**

Use AskUserQuestion:
- header: "Action"
- question: "A CHANGELOG.md already exists. What would you like to do?"
- options:
  - "View current state" — Show the changelog and [Unreleased] section
  - "Prepare for release" — Move [Unreleased] entries to a new version
  - "Add entry" — Add a new entry to [Unreleased]
  - "Replace entirely" — Create fresh CHANGELOG.md (destructive)

**If CHANGELOG.md does not exist:** Proceed to Step 3.

### Step 3: Gather Project Info

If creating a new changelog, gather:

1. **Repository URL** — Try to detect from git:
   ```bash
   git remote get-url origin 2>/dev/null | sed 's/\.git$//' | sed 's/git@github.com:/https:\/\/github.com\//'
   ```

2. **Current version** — Try to detect from package.json or ask:
   ```bash
   node -p "require('./package.json').version" 2>/dev/null || echo "0.1.0"
   ```

If auto-detection fails, use AskUserQuestion to gather missing info.

### Step 4: Create CHANGELOG.md

Create the changelog following Keep a Changelog format:

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

<!--
Add changes here as you work. Use these categories:
### Added - New features
### Changed - Changes to existing functionality
### Deprecated - Features marked for removal
### Removed - Deleted features
### Fixed - Bug fixes
### Security - Vulnerability fixes
-->

## [VERSION] - YYYY-MM-DD

### Added

- Initial release

[Unreleased]: REPO_URL/compare/vVERSION...HEAD
[VERSION]: REPO_URL/releases/tag/vVERSION
```

Replace `VERSION`, `YYYY-MM-DD`, and `REPO_URL` with actual values.

### Step 5: Update CLAUDE.md

Check if CLAUDE.md contains changelog instructions:

```bash
grep -l "Changelog Management" CLAUDE.md 2>/dev/null || echo "NO_CHANGELOG_SECTION"
```

**If no changelog section exists**, ask user if they want to add changelog workflow to CLAUDE.md:

Use AskUserQuestion:
- header: "CLAUDE.md"
- question: "Should I add changelog management instructions to CLAUDE.md?"
- options:
  - "Yes (Recommended)" — Add instructions for maintaining the changelog
  - "No" — Skip, I'll manage it manually

**If user agrees**, add this section to CLAUDE.md:

```markdown
## Changelog Management

**Keep the CHANGELOG.md updated** following [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.

### During Development

When making changes, add entries to the `[Unreleased]` section using the appropriate category:

- **Added** — New features
- **Changed** — Changes to existing functionality
- **Deprecated** — Features marked for removal
- **Removed** — Deleted features
- **Fixed** — Bug fixes
- **Security** — Vulnerability fixes

### Before Releasing a New Version

1. Review commits since last version:
   ```bash
   git log $(git describe --tags --abbrev=0)..HEAD --oneline
   ```

2. Ensure all notable changes are captured in `[Unreleased]`

3. Move `[Unreleased]` entries to a new version section:
   - Create new heading: `## [X.Y.Z] - YYYY-MM-DD`
   - Use today's date in ISO 8601 format
   - Move all category sections under the new version

4. Update comparison links at the bottom of CHANGELOG.md:
   - Add new version link
   - Update `[Unreleased]` link to compare from new version

5. Commit the changelog update with version bump
```

### Step 6: "Add Entry" Flow

If user selected "Add entry":

1. Use AskUserQuestion:
   - header: "Category"
   - question: "What type of change is this?"
   - options:
     - "Added" — New feature
     - "Changed" — Modified existing functionality
     - "Fixed" — Bug fix
     - "Removed" — Deleted feature

2. Use AskUserQuestion:
   - header: "Description"
   - question: "Describe the change in one line (imperative mood, e.g., 'Add user authentication')"
   - Allow free text via "Other" option

3. Add the entry to the appropriate section under `[Unreleased]`, creating the category heading if needed.

### Step 7: "Prepare for Release" Flow

If user selected "Prepare for release":

1. Show current `[Unreleased]` contents

2. If empty, warn: "No unreleased changes found. Add entries first."

3. Use AskUserQuestion:
   - header: "Version"
   - question: "What version number should this release be?"
   - options:
     - "Patch (x.y.Z)" — Bug fixes, minor changes
     - "Minor (x.Y.0)" — New features, backwards compatible
     - "Major (X.0.0)" — Breaking changes

4. Calculate new version number based on selection and current version

5. Move `[Unreleased]` content to new version section with today's date

6. Update comparison links at bottom of file

7. Clear `[Unreleased]` section (keep heading and comment)

## Output

Report what was created/modified:

```
Changelog: [created | updated]
- Path: ./CHANGELOG.md
- Current version: X.Y.Z
- Unreleased changes: [count] entries

CLAUDE.md: [updated | unchanged]
- Changelog instructions: [added | already present | skipped]
```

## Key Principles (Keep a Changelog)

1. **For humans, not machines** — Write clear, readable entries
2. **One entry per version** — Group changes by release
3. **Newest first** — Latest version at top
4. **ISO 8601 dates** — Use YYYY-MM-DD format
5. **Linkable** — Version headers link to diffs
6. **Track unreleased** — Always maintain [Unreleased] section
7. **Use standard categories** — Added, Changed, Deprecated, Removed, Fixed, Security
