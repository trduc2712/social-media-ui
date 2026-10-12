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

## Design system

- Tokens live in `src/styles/tokens/`: `_primitives.scss` (raw palette), `_semantic.scss` (themed colors), `_typography.scss`, `_layout.scss`.
- Styles reference semantic tokens only. Never use primitives (`--purple-*`, `--neutral-*`) or raw values in component or page styles: colors, sizes, border widths, durations, opacity and offsets all come from a token. Add a token if none fits. Only layout mechanics stay literal: `0`, `100%`, `50%`, `auto`, `1fr`, `100dvh`, `line-height: 1`, `flex-shrink: 0`.
- Semantic colors use `light-dark()` so one declaration covers both themes. Use `--color-*-text` for text and icons, and the plain fill tokens (`--color-primary`, `--color-danger`) only as backgrounds paired with their `--color-text-on-*` token.
- Everything must meet WCAG 2.1 AA. When adding a `--color-*` token, add its foreground/background pairs to `src/styles/tokens/contrast.test.ts`.
- Shared components live in `src/components/<name>/` as `<name>.tsx`, `<name>.module.scss`, and `<name>.test.tsx`. Each test calls `expectNoA11yViolations` from `@/test/a11y`.
- Import shared components from the barrel: `import { Button, Stack } from '@/components'`. Export every new component and its public types from `src/components/index.tsx`. Inside `src/components/`, import sibling components by their file path to avoid cycles.
- There is no separate icon button: use `<Button icon="…" aria-label="…" />` for icon-only buttons and `iconStart` / `iconEnd` for buttons with text.
- Icons are hand-drawn paths in `src/components/icon/icon-paths.ts`. Add new icons there; do not add an icon library.
- Interactive components use native elements and the `focus-ring` mixin from `src/styles/_mixins.scss`.
- Show every new component and variant in the design system page: add an entry in `src/pages/design-system-page/entries/` and register it in `showcase-entries.ts`. The page is served at `/design-system` in dev builds only, and its copy lives in `src/i18n/locales/en/design-system.json`. Give each entry a `<name>-usage.tsx` in `usage/`; the page renders it and shows its source as the "How to use" example, so keep its content neutral placeholder copy.
