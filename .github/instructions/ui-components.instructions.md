---
name: UI Components Guidelines
description: Guidelines for developing and maintaining UI components in the project.
applyTo: 'packages/ui/**'
---

# UI package agent notes (`packages/ui`)

## Scope

- This folder is a standalone UI package published as `@repo/ui` (see `packages/ui/package.json`).
- Prefer changes that keep **public exports stable** (exports are defined in `package.json`, not a `src/index.ts`).

## Key building blocks

- **Styling:** vanilla-extract
    - Theme tokens live in `src/theme.css.ts` (`theme` contract + `defaultLightThemeClass` / `defaultDarkThemeClass`).
    - Typography classes are a recipe in `src/typography.css.ts` (used inside component `style.css.ts`).
    - Atomic layout utilities (“sprinkles”) are in `src/sprinkles.css.ts` and power the `Box` primitive (`src/components/utils/Box.tsx`).
- **Primitives:** `@base-ui/react` is the underlying headless component layer (e.g. `@base-ui/react/button`, `@base-ui/react/tooltip`, `@base-ui/react/progress`).

## Conventions that matter here

- Component folder layout:
    - `src/components/<name>/<Component>.tsx` (logic)
    - `src/components/<name>/style.css.ts` (vanilla-extract `recipe` + variants)
    - `src/components/<name>/index.ts` (re-export; required by `package.json` exports)
- Variants typing pattern (example in `src/components/button/style.css.ts`):
    - `export type ButtonVariants = RecipeVariants<typeof buttonStyle>`
- Internal import aliases (from `packages/ui/package.json#imports`):
    - `#theme`, `#typography`, `#utils`, `#hooks/*` (example: `import { RippleContainer, useRipple } from '#hooks/ripple'`).

## Ripple pattern (used by Button/IconButton)

- The ripple system is DOM-based (`src/hooks/ripple/useRipple.ts`) and expects:
    - the clickable root to be `position: relative` and `overflow: clip` (see `buttonStyle` / `containerStyle`).
    - `<RippleContainer containerRef={ripple.containerRef} />` rendered inside the clickable element.
    - pointer + keyboard handlers wired via `ripple.pressPointer/releasePointer` and `ripple.pressKeyboard/releaseKeyboard`.
- Props/events are typically combined with `merge-props` (see `src/components/button/Button.tsx`).

## Theme generation workflow

- `src/theme.json` is the generated color palette input consumed by `src/theme.css.ts`.
- Regenerate it via `bun run generate-theme` (script: `scripts/generateDefaultTheme.ts`, generator: `src/generator.ts`).

## Local workflows (in this folder)

- `bun run lint` (oxlint, config extends `../oxlint-config/base.json` via `.oxlintrc.json`)
- `bun run check-types`
- `bun run generate-theme`

## Storybook stories for new components

- Stories live in `apps/storybook/stories/` and should import components from the package exports, e.g. `@repo/ui/components/<name>`.
- Create at least one `Default` story export for every component.
- If the component has variants (recipe variants or meaningful prop combinations), add a few focused stories that show them (common patterns: `Variant`, `Size`, `Shape`, `Disabled`).

## Useful reference files

- Theme/tokens: `src/theme.css.ts`, `src/theme.json`, `src/generator.ts`
- Sprinkles/Box: `src/sprinkles.css.ts`, `src/components/utils/Box.tsx`
- Component exemplars:
    - Button: `src/components/button/Button.tsx`
    - Tooltip: `src/components/tooltip/Tooltip.tsx`
    - Progress: `src/components/progress-indicator/*`
- Global TS augmentation for CSS vars: `src/globals.d.ts`
