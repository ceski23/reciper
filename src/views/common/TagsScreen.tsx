import styled from '@emotion/styled';
import { VFC } from 'react';
import { useParams } from 'react-router-dom';

import { FluidContainer } from 'components/common/Container';
import { ScreenHeader } from 'components/common/ScreenHeader';
import { RecipeTile } from 'components/recipes/RecipeTile';

import { useAppSelector } from 'hooks/store';

import { Recipe } from 'services/recipes';

import { selectRecipes } from 'store/recipes';

import { media } from 'utils/styles/mediaQueries';

const RecipesList = styled.div`
  display: grid;
  column-gap: 40px;
  row-gap: 50px;
  padding-bottom: 20px;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));

  ${media.down('small')} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const filterByTag = (tag?: string) => (recipe: Recipe) => (
  tag ? recipe.tags.includes(tag) : true
);

export const TagsScreen: VFC = () => {
  const recipes = useAppSelector(selectRecipes);
  const { tag } = useParams();

  return (
    <FluidContainer>
      <ScreenHeader title={tag ?? 'Tagi'} />

      <RecipesList>
        {Object
          .values(recipes)
          .filter(filterByTag(tag))
          .map((recipe) => (
            <RecipeTile recipe={recipe} key={recipe.id} />
          ))}
      </RecipesList>
    </FluidContainer>
  );
};
