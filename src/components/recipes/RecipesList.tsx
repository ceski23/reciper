/* eslint-disable @typescript-eslint/no-use-before-define */
import styled from '@emotion/styled';
import { animated, useSpring } from '@react-spring/web';
import { FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { RecipeListItem } from 'components/recipes/RecipeListItem';
import { RecipeTile } from 'components/recipes/RecipeTile';

import type { Recipe } from 'services/recipes';

import { media } from 'utils/styles/mediaQueries';

interface RecipesListProps {
  recipes: Recipe[];
  view?: 'grid' | 'list';
}

const AnimatedRecipeTile: FC<{ recipe: Recipe }> = ({ recipe }) => {
  const { ref, inView } = useInView();

  const styles = useSpring({
    to: {
      opacity: inView ? 1 : 0,
      y: inView ? 0 : 50,
    },
  });

  return (
    <AnimatedTile ref={ref} style={styles} recipe={recipe} />
  );
};

const AnimatedRecipeItem: FC<{ recipe: Recipe }> = ({ recipe }) => {
  const { ref, inView } = useInView();

  const styles = useSpring({
    to: {
      opacity: inView ? 1 : 0,
      y: inView ? 0 : 50,
    },
  });

  return (
    <AnimatedListItem ref={ref} style={styles} recipe={recipe} />
  );
};

export const RecipesList: FC<RecipesListProps> = ({ recipes, view = 'grid' }) => {
  if (view === 'list') {
    return (
      <List role="list">
        {recipes.map((recipe) => (
          <AnimatedRecipeItem recipe={recipe} key={recipe.id} />
        ))}
      </List>
    );
  }

  return (
    <Grid role="list">
      {recipes.map((recipe) => (
        <AnimatedRecipeTile recipe={recipe} key={recipe.id} />
      ))}
    </Grid>
  );
};

const Grid = styled(animated.div)`
  display: grid;
  column-gap: 40px;
  padding-bottom: 20px;
  row-gap: 50px;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));

  ${media.down('small')} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const List = styled(animated.div)`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  padding-bottom: 20px;
`;

const AnimatedTile = animated(RecipeTile);
const AnimatedListItem = animated(RecipeListItem);
