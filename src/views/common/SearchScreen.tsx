import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import {
  useEffect, useRef, useState, VFC,
} from 'react';
import Sheet from 'react-modal-sheet';

import { ReactComponent as FilterIcon } from 'assets/common/filter.svg';

import { FluidContainer } from 'components/common/Container';
import { RecipesFilters } from 'components/common/RecipesFilters';
import { ScreenHeader } from 'components/common/ScreenHeader';
import { Searchbar } from 'components/common/Searchbar';
import { RecipeTile } from 'components/recipes/RecipeTile';

import { useRecipesFilters } from 'hooks/recipes/useRecipesFilters';
import { useAppSelector } from 'hooks/store';
import { useToggle } from 'hooks/useToggle';

import { searchRecipes } from 'store/recipes';

import { staggeredGrid, slideUp } from 'utils/styles/animations';
import { media } from 'utils/styles/mediaQueries';
import { color } from 'utils/styles/theme';

const RecipesList = styled(motion.div)`
  display: grid;
  column-gap: 40px;
  padding-bottom: 20px;
  row-gap: 50px;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));

  ${media.down('small')} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

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

const StyledSheet = styled(Sheet)`
  .react-modal-sheet-container {
    background-color: ${color('background')} !important;
  }

  .react-modal-sheet-backdrop {
    border: none;
  }

  .react-modal-sheet-content {
    margin: 0 20px;
    display: flex;
    flex-direction: column; 
  }
`;

const AnimatedRecipeTile = motion(RecipeTile);

export const SearchScreen: VFC = () => {
  const [filtersExpanded, expandFilters, closeFilters] = useToggle(false);
  const [draggingDisabled, setDraggingDisabled] = useState(false);

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

      <RecipesList variants={staggeredGrid} initial="hidden" animate="show">
        {results.map((recipe) => (
          <AnimatedRecipeTile recipe={recipe} key={recipe.id} variants={slideUp} />
        ))}
      </RecipesList>

      <StyledSheet
        isOpen={filtersExpanded}
        onClose={closeFilters}
        snapPoints={[-100, 0.3, 0]}
        initialSnap={1}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content disableDrag={draggingDisabled}>
            <h2>Filtry</h2>
            <RecipesFilters onChangingDuration={setDraggingDisabled} />
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop onTap={closeFilters} />
      </StyledSheet>
    </FluidContainer>
  );
};
