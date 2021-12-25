import styled from '@emotion/styled';
import React, { VFC } from 'react';
import { selectRecipes } from 'features/recipes';
import { useAppSelector } from 'hooks/store';
import { RecipeListItem } from 'components/RecipeListItem';
import { useParams } from 'react-router-dom';
import { ScreenContainer } from './ScreenContainer';

const RecipesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TagsScreen: VFC = () => {
  const recipes = useAppSelector(selectRecipes);
  const { tag } = useParams();

  return (
    <ScreenContainer>
      <h2 style={{ marginTop: 50 }}>Ostatnio dodane</h2>
      <RecipesList>
        {Object
          .values(recipes)
          .filter((recipe) => recipe.tags.includes(tag as string))
          .map((recipe) => (
            <RecipeListItem recipe={recipe} key={recipe.url} />
          ))}
      </RecipesList>
    </ScreenContainer>
  );
};
