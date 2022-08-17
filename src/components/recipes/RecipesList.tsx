/* eslint-disable @typescript-eslint/no-use-before-define */
import styled from '@emotion/styled';
import { animated, useSpring } from '@react-spring/web';
import { FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { RecipeTile } from 'components/recipes/RecipeTile';

import type { Recipe } from 'services/recipes';

import { media } from 'utils/styles/mediaQueries';

interface RecipesListProps {
  recipes: Recipe[];
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

export const RecipesList: FC<RecipesListProps> = ({ recipes }) => (
  <List role="list">
    {recipes.map((recipe) => (
      <AnimatedRecipeTile recipe={recipe} key={recipe.id} />
    ))}
  </List>
);

const List = styled(animated.div)`
  display: grid;
  column-gap: 40px;
  padding-bottom: 20px;
  row-gap: 50px;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));

  ${media.down('small')} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const AnimatedTile = animated(RecipeTile);
