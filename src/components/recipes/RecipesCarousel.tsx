/* eslint-disable @typescript-eslint/no-use-before-define */
import styled from '@emotion/styled';
import { animated, useSpring } from '@react-spring/web';
import { FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { RecipeTile } from 'components/recipes/RecipeTile';

import type { Recipe } from 'services/recipes';

interface RecipesCarouselProps {
  recipes: Recipe[];
}

const AnimatedRecipeItem: FC<{ recipe: Recipe }> = ({ recipe }) => {
  const { ref, inView } = useInView();

  const styles = useSpring({
    to: {
      opacity: inView ? 1 : 0,
    },
  });

  return (
    <AnimatedItem ref={ref} style={styles} recipe={recipe} />
  );
};

export const RecipesCarousel: FC<RecipesCarouselProps> = ({ recipes }) => (
  <List role="list">
    {recipes.map((recipe) => (
      <AnimatedRecipeItem recipe={recipe} key={recipe.id} />
    ))}
  </List>
);

const List = styled.div`
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  gap: 40px;
`;

const CarouselItem = styled(RecipeTile)`
  scroll-snap-align: center;
  width: 150px;
  overflow: visible;
  flex: 0 0 auto;
`;

const AnimatedItem = animated(CarouselItem);
