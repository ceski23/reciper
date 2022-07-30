import { renderHookWithProviders } from 'test/utils';

import { useRecipesFilters } from 'hooks/recipes/useRecipesFilters';

import KNOWN_INGREDIENTS from 'services/ingredients/database';

describe('useRecipesFilters', () => {
  it('should return current filters', () => {
    const initialParams = new URLSearchParams({
      duration: '123',
      query: 'test',
      ingredient: KNOWN_INGREDIENTS.bacon.name,
    });

    const { result } = renderHookWithProviders(() => useRecipesFilters(), {
      initialRoute: `/?${initialParams.toString()}`,
    });

    expect(result.current.duration).toBe(123);
    expect(result.current.query).toBe('test');
    expect(result.current.ingredients).toStrictEqual([KNOWN_INGREDIENTS.bacon]);
  });

  it('should update filters', async () => {
    const {
      result, waitForNextUpdate, history,
    } = renderHookWithProviders(() => useRecipesFilters());

    result.current.updateFilters({
      duration: 1,
      query: 'test',
      ingredients: [KNOWN_INGREDIENTS.flour, KNOWN_INGREDIENTS.eggs],
    });

    await waitForNextUpdate();

    // Check params returned by hook
    expect(result.current.duration).toBe(1);
    expect(result.current.query).toBe('test');
    expect(result.current.ingredients).toStrictEqual([
      KNOWN_INGREDIENTS.flour,
      KNOWN_INGREDIENTS.eggs,
    ]);

    // Check params in URL
    const newParams = new URLSearchParams(history.location.search);
    expect(newParams.get('duration')).toBe('1');
    expect(newParams.get('query')).toBe('test');
    expect(newParams.getAll('ingredient')).toStrictEqual([
      KNOWN_INGREDIENTS.flour.name,
      KNOWN_INGREDIENTS.eggs.name,
    ]);
  });

  it('should update filters from url', async () => {
    const params = new URLSearchParams({
      duration: '123',
      query: 'test',
      ingredient: KNOWN_INGREDIENTS.bacon.name,
    });

    const {
      result, waitForNextUpdate, history,
    } = renderHookWithProviders(() => useRecipesFilters());

    history.push(`/?${params.toString()}`);

    await waitForNextUpdate();

    expect(result.current.duration).toBe(123);
    expect(result.current.query).toBe('test');
    expect(result.current.ingredients).toStrictEqual([KNOWN_INGREDIENTS.bacon]);
  });
});
