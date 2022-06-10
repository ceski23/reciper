import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import IntlMessageFormat from 'intl-messageformat';
import { forwardRef, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as DishIcon } from 'assets/recipes/dish.svg';

import { urls } from 'routing/urls';

import { Recipe } from 'services/recipes';

import { color } from 'utils/styles/theme';

interface Props {
  recipe: Recipe;
}

export const ingredientsText = new IntlMessageFormat(`
  {quantity, plural,
    one {# składnik}
    few {# składniki}
    many {# składników}
    other {# składnika}
  }
`, 'pl-PL');

const Tile = styled(motion(Link))`
  width: 100%;
  height: min-content;
  overflow: hidden;
  text-decoration: none;
  position: relative;
  color: unset;
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 15px;
  margin-bottom: 15px;
  aspect-ratio: 1;
  background-color: ${color('backgroundAlt')};
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
  width: 100%;
  height: 100%;
  background-color: ${color('backgroundAlt')};
  color: ${color('textalt')};
  border-radius: 15px;
  margin-bottom: 15px;
  display: flex;
  padding: 50px;
`;

export const RecipeTile = forwardRef<HTMLElement, Props>(({ recipe }, ref) => {
  const ingredients = useMemo(() => ingredientsText.format({
    quantity: recipe.ingredients.length,
  }), [recipe.ingredients.length]);

  const duration = useMemo(() => (
    recipe.prepTime ? dayjs.duration(recipe.prepTime).locale('pl').humanize() : undefined
  ), [recipe.prepTime]);

  return (
    <Tile
      ref={ref}
      to={urls.recipes.byId({ recipeId: recipe.id })}
      // variants={recipeItemAnimation}
    >
      {recipe.image
        ? <Image src={recipe.image} alt={recipe.name} />
        : <Placeholder><DishIcon /></Placeholder>}

      <Name>{recipe.name}</Name>
      <Info>{ingredients}{duration && ` • ${duration}`}</Info>
    </Tile>
  );
});
