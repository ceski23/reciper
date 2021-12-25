import styled from '@emotion/styled';
import { reverse } from 'named-urls';
import React, { VFC } from 'react';
import { Link } from 'react-router-dom';
import { urls } from 'urls';
import { Recipe } from 'services/recipes/providers';

interface Props {
  recipe: Recipe;
}

const Tile = styled(Link)`
  width: 100%;
  height: min-content;
  overflow: hidden;
  text-decoration: none;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const Name = styled.p`
  margin: 0;
  margin-top: 10px;
  background-color: #000000ab;
  padding: 10px 15px;
  color: #fff;
  font-weight: 600;
  backdrop-filter: blur(5px);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const RecipeTile: VFC<Props> = ({ recipe }) => (
  <Tile to={reverse(urls.recipe, { recipeUrl: encodeURIComponent(recipe.url) })}>
    {recipe.image && <Image src={recipe.image} alt={recipe.name} />}
    <Name>{recipe.name}</Name>
  </Tile>
);
