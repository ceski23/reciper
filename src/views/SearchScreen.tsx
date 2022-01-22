import styled from '@emotion/styled/macro';
import {
  useEffect, useRef, useState, VFC,
} from 'react';
import { searchRecipes } from 'features/recipes';
import { useAppSelector } from 'hooks/store';
import { ScreenHeader } from 'components/Screen/ScreenHeader';
import { RecipeTile } from 'components/RecipeTile';
import { motion } from 'framer-motion';
import { slideUp, staggeredGrid } from 'animations';
import { media } from 'utils/mediaQueries';
import { FluidContainer } from 'components/Container';
import { Searchbar } from 'components/Searchbar';
import { useLocation, useNavigate } from 'react-router';

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
  margin-bottom: 50px;
`;

const AnimatedRecipeTile = motion(RecipeTile);

type SearchState = { query: string } | null;

export const SearchScreen: VFC = () => {
  const location = useLocation();
  const [searchBarValue, setSearchBarValue] = useState((location.state as SearchState)?.query ?? '');
  const [searchQuery, setSearchQuery] = useState(searchBarValue);
  const results = useAppSelector((state) => searchRecipes(state, searchQuery));
  const searchBar = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    searchBar.current?.focus();
  }, []);

  const handleQueryChange = (query: string) => {
    navigate(location, { state: { query } });
  };

  useEffect(() => {
    const newQuery = (location.state as SearchState)?.query ?? '';
    setSearchQuery(newQuery);
    setSearchBarValue(newQuery);
  }, [location.state]);

  return (
    <FluidContainer>
      <ScreenHeader title="Szukaj przepisów" />

      <StyledSearchBar
        value={searchBarValue}
        onChange={setSearchBarValue}
        onDebouncedChange={handleQueryChange}
        ref={searchBar}
      />

      <RecipesList variants={staggeredGrid} initial="hidden" animate="show">
        {results.map(({ item }) => (
          <AnimatedRecipeTile recipe={item} key={item.url} variants={slideUp} />
        ))}
      </RecipesList>
    </FluidContainer>
  );
};
