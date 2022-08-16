import styled from '@emotion/styled';
import { VFC } from 'react';
import toast from 'react-hot-toast';

import { ReactComponent as AddIcon } from 'assets/common/add-circle.svg';
import { ReactComponent as TrashIcon } from 'assets/common/trash.svg';

import { Button } from 'components/common/Button';
import { FluidContainer } from 'components/common/Container';
import { LinkButton } from 'components/common/LinkButton';
import { Modal } from 'components/common/modal/Modal';
import { ScreenHeader } from 'components/common/ScreenHeader';
import { RecipesList } from 'components/recipes/RecipesList';

import { useAppDispatch, useAppSelector } from 'hooks/store';
import { useModal } from 'hooks/useModal';

import { urls } from 'routing/urls';

import {
  kurczak, pancakes, pierniczki, ramen,
} from 'services/recipes/samples';

import { addMultipleRecipes, removeAllRecipes, selectRecipes } from 'store/recipes';

const AddRecipeButton = styled(LinkButton)`
  margin-bottom: 50px;
`;

const EmptyText = styled.p`
  text-align: center;
`;

const SampleRecipesLink = styled.a`
  color: unset;
  font-weight: 700;
  cursor: pointer;
`;

export const RecipesScreen: VFC = () => {
  const recipes = useAppSelector(selectRecipes);
  const deleteModal = useModal(false);
  const dispatch = useAppDispatch();

  const handleRemoveRecipe = () => {
    dispatch(removeAllRecipes());
    toast.success('Usunięto wszystkie przepisy');
    deleteModal.close();
  };

  const handleAddSampleRecipes = () => {
    dispatch(addMultipleRecipes([
      pancakes,
      ramen,
      kurczak,
      pierniczki,
    ]));
  };

  return (
    <FluidContainer>
      <ScreenHeader title="Przepisy" />

      <AddRecipeButton icon={AddIcon} to={urls.recipes.new()}>Nowy przepis</AddRecipeButton>

      <RecipesList recipes={Object.values(recipes)} />

      {Object.keys(recipes).length === 0 ? (
        <EmptyText>
          Nie masz jeszcze żadnych przepisów.
          Kliknij <SampleRecipesLink onClick={handleAddSampleRecipes}>
            tutaj </SampleRecipesLink> aby dodać kilka przykładowych.
        </EmptyText>
      ) : null}

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onAccept={handleRemoveRecipe}
        showBackdrop
        closeOnEscape
      >
        <Modal.Header title="Usuwanie przepisów" />
        <Modal.Body>
          Czy na pewno chcesz usunąć <strong>wszystkie</strong> przepisy?
        </Modal.Body>
        <Modal.Footer cancelText="Anuluj" acceptText="Usuń" />
      </Modal>

      {Object.keys(recipes).length > 0 && (
        <Button
          style={{ margin: '50px 0' }}
          icon={TrashIcon}
          size="small"
          onClick={deleteModal.open}
        >
          Usuń wszystkie przepisy
        </Button>
      )}
    </FluidContainer>
  );
};
