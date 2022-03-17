import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { useSearchParams } from 'hooks/useSearchParams';

import KNOWN_INGREDIENTS, { IngredientType } from 'services/ingredients/database';

export type SearchState = {
  query?: string,
  ingredient?: string[]
};

const findIngredient = (text: string) => (
  Object.values(KNOWN_INGREDIENTS).find((i) => i.name === text)
);

export const useRecipesFilters = (initialValues: SearchState) => {
  const location = useLocation();
  const { searchParams, setSearchParams } = useSearchParams<SearchState>();
  const [searchQuery, setSearchQuery] = useState(initialValues?.query ?? '');
  const [ingredients, setIngredients] = useState<IngredientType[]>([]);

  useEffect(() => {
    setSearchQuery(searchParams.query as string ?? '');

    let ingrNames = searchParams.ingredient ?? [];
    ingrNames = Array.isArray(ingrNames) ? ingrNames : [ingrNames];
    setIngredients(ingrNames.map(findIngredient).filter(Boolean) as IngredientType[]);
  }, [searchParams]);

  const updateQuery = (newQuery: string) => {
    const state = new URLSearchParams(location.search);
    state.set('query', newQuery);

    setSearchParams(state);
  };

  const updateIngredients = (newIngredients: (old: IngredientType[]) => IngredientType[]) => {
    const state = new URLSearchParams(location.search);

    state.delete('ingredient');
    newIngredients(ingredients).forEach((ingredient) => {
      state.append('ingredient', ingredient.name);
    });

    setSearchParams(state);
  };

  return {
    query: searchQuery,
    updateQuery,
    ingredients,
    updateIngredients,
  };
};
