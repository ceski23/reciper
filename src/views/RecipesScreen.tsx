import styled from '@emotion/styled/macro';
import { VFC } from 'react';
import { selectRecipes } from 'features/recipes';
import { useAppSelector } from 'hooks/store';
import { ScreenHeader } from 'components/Screen/ScreenHeader';
import { RecipeTile } from 'components/RecipeTile';
import { motion } from 'framer-motion';
import { slideUp, staggeredGrid } from 'animations';
import { media } from 'utils/mediaQueries';
import { FluidContainer } from 'components/Container';

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

const AnimatedRecipeTile = motion(RecipeTile);

export const RecipesScreen: VFC = () => {
  const recipes = useAppSelector(selectRecipes);

  return (
    <FluidContainer>
      <ScreenHeader title="Przepisy" />

      <RecipesList variants={staggeredGrid} initial="hidden" animate="show">
        {Object.values(recipes).map((recipe) => (
          <AnimatedRecipeTile recipe={recipe} key={recipe.url} variants={slideUp} />
        ))}
      </RecipesList>
    </FluidContainer>
  );
};
