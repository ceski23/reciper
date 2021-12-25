import styled from '@emotion/styled';
import { reverse } from 'named-urls';
import React, { VFC } from 'react';
import { Link } from 'react-router-dom';
import { urls } from 'urls';
import { Recipe } from 'services/recipes/providers';

interface Props {
  recipe: Recipe;
}

const Container = styled(Link)`
  width: 100%;
  height: min-content;
  text-decoration: none;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${(props) => props.theme.colors.text};
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  display: block;
  margin-right: 20px;
  overflow: hidden;
  border-radius: 10px;
  flex-shrink: 0;
`;

const Name = styled.p`
  margin: 0;
  font-weight: 600;
`;

export const RecipeListItem: VFC<Props> = ({ recipe }) => (
  <Container to={reverse(urls.recipe, { recipeUrl: encodeURIComponent(recipe.url) })}>
    {recipe.image && <Image src={recipe.image} alt={recipe.name} />}
    <Name>{recipe.name}</Name>
  </Container>
);
