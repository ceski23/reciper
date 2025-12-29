# Components migration checklist

This is an ordered, dependency-aware task list for recreating `src/lib/components` in a new repo.

> Tip: Keep this file in the new repo and tick items off as you port them.

## Foundations (no component dependencies)

- [x] `Typography`
- [x] `ProgressIndicator`
- [x] `Skeleton`
- [ ] `AnimatedTitle`

## Interaction / feedback primitives

- [x] `Ripple`
- [x] `Ripples`
    - Depends on: `@hooks/useRipples`
- [x] `Tooltip`
    - Depends on: `Typography`
- [x] `Button`
    - Depends on: `Icon`, `@hooks/useRipples`
- [x] `IconButton`
    - Depends on: `Icon`, `Tooltip`, `@hooks/useRipples`

## Form controls (build upward from text base)

- [ ] `TextArea`
    - Depends on: `Typography`, Maskito
- [ ] `TextInput`
    - Depends on: `Icon`, `IconButton`, `Typography`, Maskito
- [ ] `NumberInput`
    - Depends on: `TextInput`, `@utils/numbers`, Maskito
- [ ] `Switch`
- [ ] `RadioGroup`
    - Depends on: `Typography`, `@hooks/useRipples`

## Small composites / building blocks

- [ ] `Link`
    - Depends on: router (`@tanstack/react-router`)
- [ ] `Chip`
    - Depends on: `Icon`, `Typography`, router
- [ ] `SegmentedButton`
    - Depends on: `Icon`, `Typography`, `@hooks/useRipples`, `@styles/theme`
- [ ] `FloatingActionButton`
    - Depends on: `Icon`, `Typography`, `@hooks/useRipples`
- [ ] `Banner`
    - Depends on: `Button`, `Icon`, `Typography` (via `typography`), `@styles/theme`

## Layout / portals / overlays

- [ ] `HeaderPortal`
    - Depends on: `@stores/ui`
- [ ] `ContentOverlayPortal`
    - Depends on: `@stores/ui`
- [ ] `BottomSheet`
    - Depends on: `Typography`, `@hooks/useResizeObserver`, `@use-gesture/react`, `@styles/utils`

## Navigation cluster

- [ ] `NavigationSegment`
    - Depends on: `Icon`, `Typography`, router
- [ ] `NavigationBar`
    - Depends on: `NavigationSegment`
- [ ] `NavigationRail`
    - Depends on: `FloatingActionButton`, `Icon`, `IconButton`, `Typography`, router, `@styles/index`

## Menu cluster

- [ ] `MenuRoot`
- [ ] `MenuItem`
    - Depends on: `Icon`, `Typography`
- [ ] `menu/index.ts`

## List cluster

- [ ] `ListItemContainer`
- [ ] `ListItemContent`
    - Depends on: `Icon`, `Typography`
- [ ] `List`
    - Depends on: router (scroll restoration)
- [ ] `SimpleItem`
    - Depends on: `ListItemContainer`, `ListItemContent`, `Ripples`
- [ ] `SwitchItem`
    - Depends on: `ListItemContainer`, `ListItemContent`, `Switch`, `@hooks/useRipples`
- [ ] `list/index.ts`

## Dialog cluster

- [ ] `dialog/constants.ts`
- [ ] `withDialogAnimation`
    - Depends on: `dialog/constants`
- [ ] `AnimateDialog`
    - Depends on: `dialog/constants`
- [ ] `Dialog`
    - Depends on: `Button`, `Icon`, `Typography`

## Higher-level composites

- [ ] `TopAppBar`
    - Depends on: `AnimatedTitle`, `HeaderPortal`, `IconButton`, `ProgressIndicator`, `Skeleton`, `Typography`
    - Also uses: `@hooks/useIsContainerScrolled`, `@stores/ui`, `@styles/utils`, `react-i18next`
- [ ] `Slider`
    - Depends on: `Typography`, `@hooks/useResizeObserver`, `@utils/math`
- [ ] `Snackbar`
    - Depends on: `ProgressIndicator`, `Icon`, `Typography`
    - Also uses: `@use-gesture/react`, `react-i18next`, `@styles/utils`
- [ ] `RecipeListItem`
    - Depends on: `Icon`, `Link`, `List` (from `./list`)
    - Also uses: `@styles/theme`, `@unlazy/react`
