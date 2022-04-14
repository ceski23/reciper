import styled from '@emotion/styled/macro';
import { FormEvent, useEffect, VFC } from 'react';

import { SelectableTag } from 'components/common/SelectableTag';

import { useRecipesFilters } from 'hooks/recipes/useRecipesFilters';
import { useDebouncedState } from 'hooks/useDebouncedState';

import KNOWN_INGREDIENTS, { IngredientType } from 'services/ingredients/database';

const DurationFilter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DurationText = styled.span`
  margin-right: 20px;
  width: 150px;
`;

const DurationSlider = styled.input`
  flex: 1;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const IngredientIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

interface Props {
  onChangingDuration: (changing: boolean) => void;
}

export const RecipesFilters: VFC<Props> = ({ onChangingDuration }) => {
  const { duration, ingredients, updateFilters } = useRecipesFilters();
  const [durationValue, debouncedDuration, setDurationValue] = useDebouncedState(duration, 500);

  const handleDurationChange = (event: FormEvent<HTMLInputElement>) => {
    const newDuration = Number.parseInt(event.currentTarget.value, 10);
    setDurationValue(newDuration);
  };

  const handleIngredientClick = (ingredient: IngredientType) => {
    let newIngredients;

    if (ingredients.includes(ingredient)) {
      newIngredients = ingredients.filter((i) => i !== ingredient);
    } else {
      newIngredients = [...ingredients, ingredient];
    }

    updateFilters({ ingredients: newIngredients });
  };

  // Update filters on duration change
  useEffect(() => {
    updateFilters({ duration: debouncedDuration });
  }, [debouncedDuration, updateFilters]);

  return (
    <>
      <FilterWrapper>
        <h3>Zawiera składniki</h3>

        <TagsContainer>
          {Object.values(KNOWN_INGREDIENTS).map((ingredient) => (
            <SelectableTag
              key={ingredient.name}
              onClick={() => handleIngredientClick(ingredient)}
              selected={ingredients.includes(ingredient)}
            >
              <IngredientIcon src={ingredient.image} alt={ingredient.name} />
              {ingredient.name}
            </SelectableTag>
          ))}
        </TagsContainer>
      </FilterWrapper>

      <FilterWrapper>
        <h3>Czas przygotowania</h3>

        <DurationFilter>
          <DurationText>
            {durationValue > 0 ? `Do ${durationValue} minut` : 'Bez limitu czasu'}
          </DurationText>

          <DurationSlider
            type="range"
            step={5}
            min={0}
            max={120}
            value={durationValue}
            onChange={handleDurationChange}
            onPointerDown={() => onChangingDuration(true)}
            onPointerUp={() => onChangingDuration(false)}
          />
        </DurationFilter>
      </FilterWrapper>
    </>
  );
};
