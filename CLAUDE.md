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
├── demo.js            # ZeroGravity query module demo
└── node_modules/      # Dependencies (git-ignored)
```

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
- `@themost/query` - SQL query builder (ZeroGravity module)
- `@themost/express` - Express.js middleware for MOST framework
- `express` - Web framework for Node.js

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

## Build & Deploy

- No build process configured yet (pure Node.js, no transpilation needed)

---

*Last updated: 2026-02-02*
*This document should be updated as the project evolves.*
