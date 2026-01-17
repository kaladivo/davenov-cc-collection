---
name: rule
description: Create or modify Claude Code rules with best practices guidance
argument-hint: <description of the rule>
allowed-tools:
  - Read
  - Write
  - Glob
  - Bash
  - AskUserQuestion
---

<objective>
Create or modify Claude Code rule files (.md) that follow best practices for the `.claude/rules/` system.

Rules provide focused, well-organized instructions that Claude automatically loads as project memory.
</objective>

<context>
Before proceeding, gather context about existing rules:

```bash
# Check for existing user-level rules
ls -la ~/.claude/rules/ 2>/dev/null || echo "No user-level rules directory"

# Check for existing project-level rules (if in a project)
ls -la .claude/rules/ 2>/dev/null || echo "No project-level rules directory"
```

Read any relevant existing rules to understand current patterns.
</context>

<process>

<step name="validate_input">
**Check if description was provided:**

- **With arguments ($ARGUMENTS):** Use as the rule description/intent
- **Without arguments:** Use AskUserQuestion to get the rule description:
  - header: "Rule Intent"
  - question: "What behavior or guideline should this rule enforce? Describe what you want Claude to do or avoid."
  - options:
    - "Code style" — formatting, naming conventions, patterns
    - "Workflow" — processes, git conventions, testing requirements
    - "Architecture" — file structure, dependencies, design patterns
</step>

<step name="determine_scope">
Use AskUserQuestion to determine rule scope:

- header: "Rule Scope"
- question: "Where should this rule be saved?"
- options:
  - "User-level (~/.claude/rules/)" — applies to all your projects
  - "Project-level (.claude/rules/)" — applies only to current project
</step>

<step name="determine_path_specificity">
Use AskUserQuestion to determine if rule should be path-specific:

- header: "Path Scope"
- question: "Should this rule apply to all files or only specific file types/paths?"
- options:
  - "All files (Recommended)" — rule loads unconditionally
  - "Specific paths" — rule only loads when working with matching files
</step>

<step name="gather_path_patterns" condition="if path-specific selected">
Use AskUserQuestion to gather path patterns:

- header: "File Patterns"
- question: "What file patterns should this rule apply to? (e.g., 'src/**/*.ts', '**/*.test.js')"
- options:
  - "TypeScript/JavaScript" — src/**/*.{ts,tsx,js,jsx}
  - "Tests" — **/*.{test,spec}.{ts,tsx,js,jsx}
  - "API routes" — src/api/**/*.ts
  - multiSelect: true

If user selects "Other", validate their custom glob pattern.
</step>

<step name="analyze_and_clarify">
Analyze the rule description for:

1. **Clarity**: Is the intent unambiguous?
2. **Actionability**: Can Claude act on this?
3. **Specificity**: Is it precise enough to follow consistently?
4. **Conflict potential**: Could it contradict common patterns?

If any issues found, use AskUserQuestion to clarify:

- header: "Clarification"
- question: "[Specific question about ambiguity]"
- options: [Context-appropriate options]

Common clarifications needed:
- "Always" vs "prefer" vs "when appropriate"
- Specific file types or directories
- Exception cases
- Priority relative to other guidelines
</step>

<step name="determine_organization">
Use AskUserQuestion to determine file organization:

- header: "Organization"
- question: "How should this rule be organized?"
- options:
  - "New file (Recommended)" — create dedicated rule file
  - "Add to existing" — append to an existing rule file
  - "Subdirectory" — organize under a category folder
</step>

<step name="generate_filename">
Generate a descriptive filename:

- Use lowercase with hyphens
- Be descriptive but concise (e.g., `code-style.md`, `testing-conventions.md`)
- Match the rule's topic

If subdirectory selected, determine category:
- `frontend/` — React, CSS, UI patterns
- `backend/` — API, database, server patterns
- `tooling/` — build, CI/CD, scripts
- `general/` — cross-cutting concerns
</step>

<step name="compose_rule">
Compose the rule following best practices:

**Structure:**
```markdown
---
paths:
  - "pattern/**/*.ext"  # Only if path-specific
---

# [Rule Title]

[Brief context - 1-2 sentences explaining why this rule exists]

## Guidelines

- [Specific, actionable guideline]
- [Another guideline]

## Examples

### Do
[Good example with explanation]

### Don't
[Bad example with explanation]
```

**Best Practices to Follow:**
1. **Be specific**: "Use camelCase for variables" not "follow naming conventions"
2. **Be actionable**: Each point should be something Claude can do
3. **Provide examples**: Show what good and bad look like
4. **Explain rationale**: Help Claude understand *why*
5. **Keep focused**: One topic per file
6. **Use imperative mood**: "Use X" not "You should use X"
7. **Avoid redundancy**: Don't repeat what's in other rules
</step>

<step name="validate_rule">
Before writing, validate the rule:

1. **Check for conflicts** with existing rules:
   ```bash
   grep -r "[key terms]" ~/.claude/rules/ .claude/rules/ 2>/dev/null
   ```

2. **Verify clarity**: Each guideline should pass the "can Claude act on this?" test

3. **Check length**: Rules should be scannable, not walls of text

If validation finds issues, refine the rule content.
</step>

<step name="create_directories">
Ensure the target directory exists:

```bash
# For user-level rules
mkdir -p ~/.claude/rules/

# For project-level rules
mkdir -p .claude/rules/
```

If using subdirectory organization:
```bash
mkdir -p [target-path]/[subdirectory]/
```
</step>

<step name="write_rule">
Write the rule file to the determined path:

```bash
# Construct full path based on scope and organization decisions
```

Write the composed rule content to the file.
</step>

<step name="confirm">
Display confirmation:

```
Rule created: [full path]

[Rule title]
Scope: [user-level | project-level]
Applies to: [all files | specific paths]

Preview:
---
[First few lines of the rule]
---

The rule will be automatically loaded in future Claude sessions.
```
</step>

</process>

<best_practices>
## Rule Writing Best Practices

**DO:**
- Keep rules focused on one topic
- Use descriptive filenames
- Provide concrete examples
- Explain the "why" behind guidelines
- Use path-specific rules only when truly needed
- Test that guidelines are actionable

**DON'T:**
- Create overly broad "catch-all" rules
- Duplicate guidelines across multiple files
- Use vague language ("be careful", "consider")
- Add path frontmatter unless genuinely path-specific
- Create rules for one-off preferences
- Include time-sensitive information
</best_practices>

<validation_questions>
When reviewing a rule, verify:

1. **Necessity**: Does this rule add value not covered elsewhere?
2. **Clarity**: Could another developer understand and follow this?
3. **Consistency**: Does it align with existing rules?
4. **Scope**: Is the path specificity appropriate?
5. **Actionability**: Can Claude act on every guideline?
6. **Examples**: Are good/bad examples clear?
</validation_questions>

<output>
- Rule file at determined path
- Confirmation with preview
</output>

<success_criteria>
- [ ] Rule description obtained and understood
- [ ] Scope (user vs project) determined
- [ ] Path specificity determined (if applicable)
- [ ] Ambiguities clarified through questions
- [ ] Rule follows best practices structure
- [ ] No conflicts with existing rules
- [ ] Directory structure created
- [ ] Rule file written successfully
- [ ] Confirmation displayed
</success_criteria>
