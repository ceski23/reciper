import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { useSearchParams } from 'hooks/useSearchParams';

import KNOWN_INGREDIENTS from 'services/ingredients/database';
import { KnownIngredient } from 'services/ingredients/models';

interface RecipeSearchParams {
  query: string,
  ingredient: string[],
  duration: number;
}

interface FiltersObject {
  query: string;
  ingredients: KnownIngredient[];
  duration: number;
}

const findIngredient = (text: string) => (
  Object.values(KNOWN_INGREDIENTS).find((i) => i.name === text)
);

export const useRecipesFilters = () => {
  const location = useLocation();
  const { searchParams, setSearchParams } = useSearchParams<RecipeSearchParams>();

  const [searchQuery, setSearchQuery] = useState(searchParams.query ?? '');
  const [ingredients, setIngredients] = useState<KnownIngredient[]>([]);
  const [duration, setDuration] = useState(searchParams.duration ?? 0);

  // Update filters on URL change
  useEffect(() => {
    setSearchQuery(searchParams.query ?? '');
    setDuration(searchParams.duration ?? 0);

    let ingrNames = searchParams.ingredient ?? [];
    ingrNames = Array.isArray(ingrNames) ? ingrNames : [ingrNames];
    setIngredients(ingrNames.map(findIngredient).filter(Boolean) as KnownIngredient[]);
  }, [searchParams]);

  // Manually update filters
  const updateFilters = useCallback((filters: Partial<FiltersObject>) => {
    const state = new URLSearchParams(location.search);

    if (filters.query !== undefined) {
      state.set('query', filters.query);
    }

    if (filters.duration !== undefined && filters.duration > 0) {
      state.set('duration', filters.duration.toString(10));
    }

    if (filters.ingredients !== undefined) {
      state.delete('ingredient');

      filters.ingredients.forEach((ingredient) => {
        state.append('ingredient', ingredient.name);
      });
    }

    setSearchParams(state);
  }, [location.search, setSearchParams]);

  return {
    query: searchQuery,
    ingredients,
    duration,
    updateFilters,
  };
};
