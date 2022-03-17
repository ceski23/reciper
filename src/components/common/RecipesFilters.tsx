import styled from '@emotion/styled/macro';
import { VFC } from 'react';

import { SelectableTag } from 'components/common/SelectableTag';

import KNOWN_INGREDIENTS, { IngredientType } from 'services/ingredients/database';

const TagsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

interface Props {
  ingredients: IngredientType[];
  setIngredients: (fun: (oldIngredients: IngredientType[]) => IngredientType[]) => void;
}

export const RecipesFilters: VFC<Props> = ({ ingredients, setIngredients }) => {
  const handleIngredientClick = (ingredient: IngredientType) => {
    if (ingredients.includes(ingredient)) {
      setIngredients((oldIngredients) => oldIngredients.filter((x) => x !== ingredient));
    } else {
      setIngredients((oldIngredients) => [...oldIngredients, ingredient]);
    }
  };

  return (
    <>
      <h3>Zawiera składniki</h3>

      <TagsContainer>
        {Object.values(KNOWN_INGREDIENTS).map((ingredient) => (
          <SelectableTag
            key={ingredient.name}
            onClick={() => handleIngredientClick(ingredient)}
            selected={ingredients.includes(ingredient)}
          >
            {ingredient.name}
          </SelectableTag>
        ))}
      </TagsContainer>
    </>
  );
};
