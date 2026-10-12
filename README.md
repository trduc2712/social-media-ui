# social-media-ui

The frontend UI for a social media web app.

## Design system

The UI is built on a small in-house design system: layered design tokens in `src/styles/tokens/` with light and dark themes, and shared components in `src/components/`. It targets WCAG 2.1 AA, with color contrast enforced by `src/styles/tokens/contrast.test.ts`.

Run `pnpm dev` and open `/design-system` to browse the tokens and every component. The page is not included in production builds.
