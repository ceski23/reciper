/* eslint-disable @typescript-eslint/no-use-before-define */
import styled from '@emotion/styled';
import { animated, config, useTrail } from '@react-spring/web';
import { FC } from 'react';

import { RecipeTile } from 'components/recipes/RecipeTile';

import type { Recipe } from 'services/recipes';

import { media } from 'utils/styles/mediaQueries';

interface RecipesListProps {
  recipes: Recipe[];
}

export const RecipesList: FC<RecipesListProps> = ({ recipes }) => {
  const trail = useTrail(recipes.length, {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0 },
    config: { ...config.stiff, clamp: true },
  });

  return (
    <List role="list">
      {recipes.map((recipe, idx) => (
        <AnimatedRecipeTile recipe={recipe} key={recipe.id} style={trail[idx]} />
      ))}
    </List>
  );
};

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

const AnimatedRecipeTile = animated(RecipeTile);
