---
name: Storybook Guidelines
description: Conventions for authoring Storybook stories and docs in this repo.
applyTo: 'apps/storybook/**'
---

# Storybook conventions (`apps/storybook`)

- Stories are authored under `apps/storybook/stories/**` (globs are configured in `apps/storybook/.storybook/main.ts`).
- Prefer importing UI components via package exports (examples):
    - `@repo/ui/components/<name>`
    - `@repo/ui/components/utils`
    - `@repo/ui/typography`
- Use the repo’s Storybook helper:
    - `import preview from '#.storybook/preview'`
    - `const meta = preview.meta({ title?: string, component, args?, argTypes?, decorators? })`
    - `export const Default = meta.story({ args, render? })`
- Every component gets a **`Default`** story.
- If a component has variants (recipe variants or meaningful prop combos), add a few focused stories (common names: `Variant`, `Size`, `Shape`, `Disabled`, `Style`, `Width`).
- Use `decorators` to give multi-variant stories spacing/alignment by wrapping in `Inline` or `Stack` (from `@repo/ui/components/utils`).
    - Examples: `apps/storybook/stories/components/Button.stories.tsx`, `apps/storybook/stories/components/progress/LinearProgressIndicator.stories.tsx`.
- Global theming + providers are centralized in `apps/storybook/.storybook/preview.tsx` (dark-mode classes, `@repo/ui/fonts`, `Tooltip.Provider`). Avoid re-wrapping unless a story needs special context.

## Local workflows (`apps/storybook`)

- `bun run dev` (Storybook on :6006)
- `bun run build`
- `bun run lint` / `bun run check-types`
