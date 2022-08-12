import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { VFC } from 'react';
import toast from 'react-hot-toast';

import { ReactComponent as AddIcon } from 'assets/common/add-circle.svg';
import { ReactComponent as TrashIcon } from 'assets/common/trash.svg';

import { Button } from 'components/common/Button';
import { FluidContainer } from 'components/common/Container';
import { LinkButton } from 'components/common/LinkButton';
import { Modal } from 'components/common/modal/Modal';
import { ScreenHeader } from 'components/common/ScreenHeader';
import { RecipeTile } from 'components/recipes/RecipeTile';

import { useAppDispatch, useAppSelector } from 'hooks/store';
import { useModal } from 'hooks/useModal';

import { urls } from 'routing/urls';

import {
  kurczak, pancakes, pierniczki, ramen,
} from 'services/recipes/samples';

import { addMultipleRecipes, removeAllRecipes, selectRecipes } from 'store/recipes';

import { staggeredGrid, slideUp } from 'utils/styles/animations';
import { media } from 'utils/styles/mediaQueries';

const RecipesList = styled(motion.div)`
  display: grid;
  column-gap: 40px;
  padding-bottom: 20px;
  row-gap: 50px;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));

  ${media.down('small')} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

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

const AnimatedRecipeTile = motion(RecipeTile);

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

      <RecipesList variants={staggeredGrid} initial="hidden" animate="show">
        {Object.values(recipes).map((recipe) => (
          <AnimatedRecipeTile recipe={recipe} key={recipe.id} variants={slideUp} />
        ))}
      </RecipesList>

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
