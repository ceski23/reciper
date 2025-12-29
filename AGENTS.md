# Reciper AI Agent Instructions

## Architecture Overview

This is a **Turborepo monorepo** using **Bun** as package manager with three main workspaces:

- **`apps/web`** - TanStack Start application (React 19 + SSR + Vite)
- **`apps/storybook`** - Component documentation and development
- **`packages/ui`** - Material Design 3 design system with vanilla-extract
- **`packages/database`** - Drizzle ORM with PostgreSQL

### Tech Stack

- **TanStack Router** - File-based routing with SSR (routes in `apps/web/src/routes/`)
- **TanStack Query** - Server state management, integrated with router SSR
- **React 19** - With React Compiler enabled (`babel-plugin-react-compiler`)
- **vanilla-extract** - Zero-runtime CSS-in-JS (recipes + sprinkles pattern)
- **Material Design 3** - Dynamic color schemes via `@materialx/material-color-utilities`
- **Drizzle ORM** - Database with migrations in `packages/database/migrations/`

## Essential Workflows

### Development

```bash
bun install
bun --bun run start          # Start all apps (web on :3000, storybook on :6006)
bun run dev                  # Turbo dev mode
```

### Database Operations (run from `packages/database/`)

```bash
bun db:generate              # Generate migration from schema changes
bun db:migrate               # Apply migrations
bun db:studio                # Open Drizzle Studio
```

### Code Quality

```bash
bun run lint                 # oxlint with type-aware mode
bun run check-types          # TypeScript type checking
bun run format               # oxfmt (120 char width, tabs, single quotes)
```

## Component Development Patterns

### UI Components (`packages/ui/src/components/`)

1. **Base primitives** from `@base-ui/react` (e.g., `Button as ButtonBase`)
2. **Styling** with vanilla-extract recipes in `style.css.ts`
3. **Variants** exported as `type ComponentVariants` from recipe
4. **Ripple effect** via `#hooks/ripple` hook (pointer + keyboard support)
5. **Merge props** using `merge-props` utility

### Styling (Vanilla Extract)

- Styles are defined in `*.css.ts` files.
- Use `globalStyle` for global resets (rarely needed).
- Use `style` or `recipe` for component styles.
- Use `sprinkles` for utility classes (e.g., `import { sprinkles } from '@repo/ui/sprinkles'`).
- **Example:**

    ```ts
    // component.css.ts
    import { style } from '@vanilla-extract/css';
    import { theme } from '#theme';

    export const container = style({
      padding: theme.spacing[4],
      backgroundColor: theme.colors.surface,
      borderRadius: '8px',
      display: 'flex',
      gap: theme.spacing[2]
    });
    ```

### Layout Primitives (`packages/ui/src/components/utils/`)

- `Box` - Atomic CSS wrapper via `@dessert-box/react` with sprinkles
- `Stack` - Flexbox container with gap
- `Inline` - Inline-flex container
- `Center` - Center content (flex)
- `Spacer` - Spacing utility

## Routing & Data Fetching

### Route Structure

- **File-based** in `apps/web/src/routes/`
- **Root layout**: `__root.tsx` defines `RouterContext` with `queryClient`
- **Route generation**: Auto-generated in `routeTree.gen.ts` (don't edit)

### Environment Variables

- **Type-safe** via `@t3-oss/env-core` in `apps/web/src/env.ts`
- **Client vars**: Prefix with `VITE_` (e.g., `VITE_APP_TITLE`)
- **Server vars**: No prefix (e.g., `DATABASE_URL`)
- **Loading**: Uses `@dotenvx/dotenvx` in `with-env` scripts

## Database Schema

**Location**: `packages/database/src/schema.ts`

- Define tables using `drizzle-orm/pg-core`
- Export schema for import: `import { todos } from '@repo/database/schema'`
- Run `bun db:generate` after schema changes to create migrations
- Use `db.query` API for relational queries when possible.
- **Example:**

    ```ts
    import { db } from '@repo/database';
    import { users } from '@repo/database/schema';
    import { eq } from 'drizzle-orm';

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
      with: {
        posts: true,
      },
    });
    ```

## Package Imports

Each package has custom import aliases defined in `package.json`:

**`apps/web`**:

- `#features/*` → `./src/features/*`
- `#*` → `./src/*.ts`

**`packages/ui`**:

- `#utils` → `./src/utils/index.ts`
- `#theme` → `./src/theme.css.ts`
- `#typography` → `./src/typography.css.ts`
- `#hooks/*` → `./src/hooks/*/index.ts`

**Cross-package imports**:

- `@repo/ui/components/*` - UI components
- `@repo/ui/theme` - Theme tokens
- `@repo/ui/sprinkles` - Atomic CSS utilities
- `@repo/database` - Database client
- `@repo/database/schema` - Schema definitions

## Key Conventions

- **Component files**: `ComponentName.tsx` + `index.ts` + `style.css.ts`
- **Story files**: `ComponentName.stories.tsx` in `apps/storybook/stories/`
- **Type exports**: Export types alongside components for reuse
- **No runtime CSS**: vanilla-extract compiles to static CSS at build time
- **React Compiler**: No manual `useMemo`/`useCallback` needed (compiler optimizes)

## Development Notes

- **PostgreSQL**: Run via Docker Compose (`docker-compose.yaml`)
- **Ignore generated files**: `routeTree.gen.ts`, `.output/`, `migrations/`
- **Storybook**: Run independently on port 6006 for component development
- **SSR**: TanStack Router + Query integration handles server/client hydration
- **Material 3**: Theme colors auto-generated from seed color in `generator.ts`
