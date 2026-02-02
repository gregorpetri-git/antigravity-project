# CLAUDE.md - AI Assistant Guide for Antigravity Project

This file provides guidance for AI assistants (like Claude) working on this codebase.

## Project Overview

**Antigravity Project** demonstrates the MOST Web Framework (Codename ZeroGravity) query module - a powerful SQL query builder for Node.js.

**Repository**: gregorpetri-git/antigravity-project

## Project Structure

```
antigravity-project/
├── README.md          # Project documentation
├── CLAUDE.md          # This file - AI assistant guidelines
├── package.json       # npm configuration and dependencies
├── package-lock.json  # Dependency lock file (auto-generated)
├── demo.js            # ZeroGravity query module demo
├── .gitignore         # Git ignore rules
└── node_modules/      # Dependencies (git-ignored)
```

## Key Files

### demo.js
The main demonstration file showcasing the `@themost/query` module capabilities:
- **Lines 1-8**: Imports and setup (`QueryExpression`, `QueryField`, `SqlFormatter`)
- **Lines 22-27**: Simple SELECT query
- **Lines 33-39**: SELECT with WHERE and AND conditions
- **Lines 46-54**: SELECT with JOIN operations
- **Lines 61-71**: Aggregation with COUNT, SUM, GROUP BY, ORDER BY
- **Lines 78-85**: Complex queries with OR conditions
- **Lines 92-101**: INSERT operations
- **Lines 108-113**: UPDATE operations
- **Lines 120-124**: DELETE operations

### .gitignore
Excludes: `node_modules/`, `.env`, `*.log`, `.DS_Store`

## Development Workflow

### Git Conventions

- **Main Branch**: Used for stable, production-ready code
- **Feature Branches**: Use descriptive names like `feature/description` or `fix/description`
- **Commit Messages**: Write clear, descriptive commit messages that explain the "why" not just the "what"
  - Use imperative mood: "Add feature" not "Added feature"
  - Keep first line under 72 characters
  - Add detailed description in body if needed

### Branch Naming Convention

```
feature/short-description    # New features
fix/issue-description        # Bug fixes
docs/what-changed           # Documentation updates
refactor/what-changed       # Code refactoring
```

## Code Style Guidelines

As the project grows, maintain these principles:

1. **Consistency**: Follow existing patterns in the codebase
2. **Simplicity**: Prefer straightforward solutions over clever ones
3. **Documentation**: Add comments for non-obvious logic
4. **Testing**: Write tests for new functionality when a test framework is added

## Commands Reference

### Git Operations

```bash
# Check current status
git status

# View recent commits
git log --oneline -10

# Create and switch to a new branch
git checkout -b feature/your-feature

# Stage and commit changes
git add <files>
git commit -m "Description of changes"

# Push to remote
git push -u origin <branch-name>
```

## AI Assistant Guidelines

When working on this project:

### Before Making Changes

1. **Read relevant files first** - Understand existing code before modifying
2. **Check git status** - Know what branch you're on and what's changed
3. **Understand the request** - Ask clarifying questions if needed

### While Making Changes

1. **Make minimal, focused changes** - Don't over-engineer
2. **Preserve existing style** - Match the patterns already in use
3. **Don't add unnecessary features** - Only implement what's requested
4. **Avoid introducing security vulnerabilities** - Be mindful of OWASP top 10

### After Making Changes

1. **Test your changes** - Run relevant tests if available
2. **Review your diff** - Check `git diff` before committing
3. **Write clear commit messages** - Explain what and why

## File Organization

As the project grows, follow these conventions:

- Keep related files together in directories
- Use clear, descriptive file names
- Separate concerns (e.g., source code, tests, configuration)

## Configuration Files

- `package.json` - npm configuration, scripts, and dependencies

## Dependencies

Production dependencies:
- `@themost/query` (^2.14.17) - SQL query builder (ZeroGravity module)
- `@themost/express` (^5.1.1) - Express.js middleware for MOST framework
- `express` (^5.2.1) - Web framework for Node.js

## @themost/query API Reference

Key classes and patterns used in this project:

### QueryExpression
The main query builder class. Supports fluent/chainable API.

```javascript
const { QueryExpression } = require('@themost/query');

// SELECT
new QueryExpression()
    .select('field1', 'field2')
    .from('TableName')
    .where('field').equal('value')
    .and('field2').greaterOrEqual(10);

// INSERT
new QueryExpression()
    .insert({ field1: 'value1', field2: 'value2' })
    .into('TableName');

// UPDATE
new QueryExpression()
    .update('TableName')
    .set({ field1: 'newValue' })
    .where('id').equal(1);

// DELETE
new QueryExpression()
    .delete('TableName')
    .where('field').lowerThan(someValue);
```

### QueryField
Used for field references and aggregations.

```javascript
const { QueryField } = require('@themost/query');

// Field reference (for JOINs)
new QueryField('TableName.fieldName')

// Aggregations
QueryField.count('id').as('totalCount')
QueryField.sum('price').as('totalPrice')
```

### SqlFormatter
Converts QueryExpression objects to SQL strings.

```javascript
const { SqlFormatter } = require('@themost/query');
const formatter = new SqlFormatter();
console.log(formatter.format(queryExpression));
```

### Common Query Methods
- `.select()` - Specify columns
- `.from()` - Specify table
- `.where()` / `.and()` / `.or()` - Conditions
- `.equal()` / `.greaterOrEqual()` / `.lowerThan()` - Comparisons
- `.join()` / `.with()` - Table joins
- `.groupBy()` - Grouping
- `.orderBy()` / `.orderByDescending()` - Sorting

## Common Commands

```bash
# Install dependencies
npm install

# Run the demo
npm run demo
```

## Testing

- No test framework configured yet
- Consider adding Jest or Mocha for unit tests
- The demo can be run to verify query module functionality: `npm run demo`

## Build & Deploy

- No build process configured yet (pure Node.js, no transpilation needed)
- Entry point defined as `index.js` in package.json (not yet created)

## External Resources

- [MOST Web Framework GitHub](https://github.com/themost-framework)
- [@themost/query npm package](https://www.npmjs.com/package/@themost/query)
- [@themost/express npm package](https://www.npmjs.com/package/@themost/express)

---

*Last updated: 2026-02-02*
*This document should be updated as the project evolves.*
