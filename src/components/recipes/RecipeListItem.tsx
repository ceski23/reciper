/* eslint-disable @typescript-eslint/no-use-before-define */
import styled from '@emotion/styled';
import { animated } from '@react-spring/web';
import dayjs from 'dayjs';
import { forwardRef, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as DishIcon } from 'assets/recipes/dish.svg';

import { Image } from 'components/common/Image';
import { ingredientsText } from 'components/recipes/RecipeTile';

import { urls } from 'routing/urls';

import { Recipe } from 'services/recipes';

import { color } from 'utils/styles/theme';

interface RecipeListItemProps {
  recipe: Recipe
}

export const RecipeListItem = forwardRef<HTMLAnchorElement, RecipeListItemProps>(({
  recipe,
}, ref) => {
  const ingredients = useMemo(() => ingredientsText.format({
    quantity: recipe.ingredients.length,
  }), [recipe.ingredients.length]);

  const duration = useMemo(() => (
    recipe.prepTime ? dayjs.duration({ minutes: recipe.prepTime }).locale('pl').humanize() : undefined
  ), [recipe.prepTime]);

  return (
    <ListItem ref={ref} to={urls.recipes.byId({ recipeId: recipe.id })}>
      <RecipeImage
        src={recipe.image}
        alt={recipe.name}
        fallback={(
          <Placeholder>
            <DishIcon />
          </Placeholder>
        )}
      />

      <InfoContainer>
        <Name>{recipe.name}</Name>
        <Info>{ingredients}{duration && ` • ${duration}`}</Info>
      </InfoContainer>
    </ListItem>
  );
});

const ListItem = styled(animated(Link))`
  display: flex;
  flex-direction: row;
  text-decoration: none;
  position: relative;
  color: unset;
  gap: 20px;
  align-items: center;
  overflow: hidden;
  width: 100%;
`;

const RecipeImage = styled(Image)`
  width: 80px;
  height: 80px;
  object-fit: cover;
  display: block;
  border-radius: 15px;
  aspect-ratio: 1;
  background-color: ${color('backgroundAlt')};
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 0;
`;

const Name = styled.p`
  margin: 0;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Info = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${color('textalt')};
`;

const Placeholder = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${color('backgroundAlt')};
  color: ${color('textalt')};
  border-radius: 15px;
  display: flex;
  padding: 20px;
`;
