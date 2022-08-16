import styled from '@emotion/styled';
import {
  useCallback,
  useEffect, useRef, useState, VFC,
} from 'react';

import { ReactComponent as FilterIcon } from 'assets/common/filter.svg';

import { BottomSheet, SheetState } from 'components/common/BottomSheet';
import { FluidContainer } from 'components/common/Container';
import { RecipesFilters } from 'components/common/RecipesFilters';
import { ScreenHeader } from 'components/common/ScreenHeader';
import { Searchbar } from 'components/common/Searchbar';
import { RecipesList } from 'components/recipes/RecipesList';

import { useRecipesFilters } from 'hooks/recipes/useRecipesFilters';
import { useAppSelector } from 'hooks/store';

import { searchRecipes } from 'store/recipes';

import { color } from 'utils/styles/theme';

const StyledSearchBar = styled(Searchbar)`
  flex: 1;
`;

const MoreFiltersButton = styled.button`
  background: none;
  border: none;
  font-weight: 600;
  font-size: 16px;
  text-align: left;
  color: ${color('primary')};
  cursor: pointer;
`;

const SearchContainer = styled.div`
  margin-bottom: 50px;
  display: flex;
  gap: 20px;
`;

const StyledFilterIcon = styled(FilterIcon)`
  width: 30px;
  height: 100%;
  fill: ${color('textalt')};
`;

export const SearchScreen: VFC = () => {
  const [draggingDisabled, setDraggingDisabled] = useState(false);
  const [filtersState, setFiltersState] = useState<SheetState>('close');
  const expandFilters = useCallback(() => setFiltersState('peek'), []);

  const {
    duration, ingredients, query, updateFilters,
  } = useRecipesFilters();

  const [searchBarValue, setSearchBarValue] = useState(query);
  const searchBar = useRef<HTMLInputElement>(null);

  const results = useAppSelector((state) => searchRecipes(state, query, ingredients, duration));

  // Focus searchbar on mount
  useEffect(() => {
    searchBar.current?.focus();
  }, []);

  // Update searchbar value from URL params
  useEffect(() => {
    setSearchBarValue(query);
  }, [query]);

  return (
    <FluidContainer>
      <ScreenHeader title="Szukaj przepisów" />

      <SearchContainer>
        <StyledSearchBar
          value={searchBarValue}
          onChange={setSearchBarValue}
          onDebouncedChange={(q) => updateFilters({ query: q })}
          ref={searchBar}
          debounce={500}
        />
        <MoreFiltersButton type="button" onClick={expandFilters}>
          <StyledFilterIcon />
        </MoreFiltersButton>
      </SearchContainer>

      <RecipesList recipes={results} />

      <BottomSheet
        state={filtersState}
        onStateChange={setFiltersState}
        disableDrag={draggingDisabled}
      >
        <h2>Filtry</h2>
        <RecipesFilters onChangingDuration={setDraggingDisabled} />
      </BottomSheet>
    </FluidContainer>
  );
};
