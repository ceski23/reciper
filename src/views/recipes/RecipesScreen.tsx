import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { VFC } from 'react';

import { ReactComponent as AddIcon } from 'assets/common/add-circle.svg';

import { FluidContainer } from 'components/common/Container';
import { LinkButton } from 'components/common/LinkButton';
import { ScreenHeader } from 'components/common/ScreenHeader';
import { RecipeTile } from 'components/recipes/RecipeTile';

import { useAppSelector } from 'hooks/store';

import { urls } from 'routing/urls';

import { selectRecipes } from 'store/recipes';

import { staggeredGrid, slideUp } from 'utils/styles/animations';
import { media } from 'utils/styles/mediaQueries';

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

const AddRecipeButton = styled(LinkButton)`
  margin-bottom: 50px;
`;

const AnimatedRecipeTile = motion(RecipeTile);

export const RecipesScreen: VFC = () => {
  const recipes = useAppSelector(selectRecipes);

  return (
    <FluidContainer>
      <ScreenHeader title="Przepisy" />

      <AddRecipeButton icon={AddIcon} to={String(urls.recipes.new)}>Nowy przepis</AddRecipeButton>

      <RecipesList variants={staggeredGrid} initial="hidden" animate="show">
        {Object.values(recipes).map((recipe) => (
          <AnimatedRecipeTile recipe={recipe} key={recipe.id} variants={slideUp} />
        ))}
      </RecipesList>
    </FluidContainer>
  );
};
