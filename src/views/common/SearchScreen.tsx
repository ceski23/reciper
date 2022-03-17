import styled from '@emotion/styled/macro';
import { motion } from 'framer-motion';
import {
  useEffect, useRef, useState, VFC,
} from 'react';
import Sheet from 'react-modal-sheet';
import { useLocation } from 'react-router';

import { ReactComponent as FilterIcon } from 'assets/common/filter.svg';

import { FluidContainer } from 'components/common/Container';
import { RecipesFilters } from 'components/common/RecipesFilters';
import { ScreenHeader } from 'components/common/ScreenHeader';
import { Searchbar } from 'components/common/Searchbar';
import { RecipeTile } from 'components/recipes/RecipeTile';

import { SearchState, useRecipesFilters } from 'hooks/recipes/useRecipesFilters';
import { useAppSelector } from 'hooks/store';
import { useToggle } from 'hooks/useToggle';

import { searchRecipes } from 'store/recipes';

import { staggeredGrid, slideUp } from 'utils/styles/animations';
import { media } from 'utils/styles/mediaQueries';

const RecipesList = styled(motion.div)`
  display: grid;
  column-gap: 40px;
  padding-bottom: 20px;
  row-gap: 50px;
  grid-template-columns: repeat(auto-fit, 190px);

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
  color: ${(props) => props.theme.colors.primary};
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
  fill: ${(props) => props.theme.colors.textalt};
`;

const AnimatedRecipeTile = motion(RecipeTile);

export const SearchScreen: VFC = () => {
  const [filtersExpanded, expandFilters, closeFilters] = useToggle(false);

  const location = useLocation();
  const {
    query, updateQuery, ingredients, updateIngredients,
  } = useRecipesFilters(location.state as SearchState);

  const [searchBarValue, setSearchBarValue] = useState(query);
  const searchBar = useRef<HTMLInputElement>(null);

  const results = useAppSelector((state) => searchRecipes(state, query, ingredients));

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
          onDebouncedChange={updateQuery}
          ref={searchBar}
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

      <Sheet
        isOpen={filtersExpanded}
        onClose={closeFilters}
        snapPoints={[-100, 0.3, 0]}
        initialSnap={1}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content style={{ margin: '0 20px', display: 'flex', flexDirection: 'column' }}>
            <h2>Filtry</h2>
            <RecipesFilters
              ingredients={ingredients}
              setIngredients={updateIngredients}
            />
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop onTap={closeFilters} />
      </Sheet>
    </FluidContainer>
  );
};
