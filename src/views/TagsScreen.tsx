import styled from '@emotion/styled/macro';
import { VFC } from 'react';
import { selectRecipes } from 'features/recipes';
import { useAppSelector } from 'hooks/store';
import { useParams } from 'react-router-dom';
import { ScreenHeader } from 'components/Screen/ScreenHeader';
import { RecipeTile } from 'components/RecipeTile';
import { Recipe } from 'services/recipes';
import { media } from 'utils/mediaQueries';
import { FluidContainer } from 'components/Container';

const RecipesList = styled.div`
  display: grid;
  column-gap: 40px;
  row-gap: 50px;
  padding-bottom: 20px;
  grid-template-columns: repeat(auto-fit, 190px);

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
