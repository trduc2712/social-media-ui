# CLAUDE.md

## Commands

- Use `pnpm`, never `npm` or `yarn`.
- Check `package.json` for available scripts before running commands.
- Run relevant lint, test, and build checks after making changes.

## Conventions

- Don't write comments unless explicitly asked.
- File and folder names are kebab case; exported React components stay PascalCase.
- Import across folders with the @/ alias, not long relative paths.
- Use named exports, no default exports.
- Never use `any`. Define explicit types or reuse existing types.
- Use the project's existing components and design system. Build new components from scratch when necessary. Do not introduce a new UI library.
- The application uses TanStack Query for server state. Do not introduce another data-fetching library.
- Do not hardcode user-facing strings.
- Reuse existing i18n keys when possible.
- If a required i18n key does not exist, add it to the appropriate language files.
