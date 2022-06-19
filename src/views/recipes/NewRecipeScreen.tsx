import styled from '@emotion/styled';
import { VFC } from 'react';

import { ReactComponent as ImportIcon } from 'assets/common/import.svg';
import { ReactComponent as PencilIcon } from 'assets/common/pencil.svg';

import { FluidContainer } from 'components/common/Container';
import { Link } from 'components/common/Link';
import { ScreenHeader } from 'components/common/ScreenHeader';
import { SettingsListItem } from 'components/settings/SettingsListItem';

import { useModal } from 'hooks/useModal';

import { urls } from 'routing/urls';

import { ImportRecipesModal } from 'views/recipes/ImportRecipesModal';

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  a {
    text-decoration: none;
    color: unset;
  }
`;

const Option = styled(SettingsListItem)`
  cursor: pointer;
`;

export const NewRecipeScreen: VFC = () => {
  const importModal = useModal(false);

  return (
    <FluidContainer>
      <ScreenHeader title="Nowy przepis" />

      <OptionsList>
        <Option
          text="Importuj przepisy"
          icon={ImportIcon}
          onClick={importModal.open}
        />

        <Link to={urls.recipes.new.manual()}>
          <Option text="Dodaj przepis ręcznie" icon={PencilIcon} />
        </Link>
      </OptionsList>

      <ImportRecipesModal
        isOpen={importModal.isOpen}
        onClose={importModal.close}
        closeOnEscape
        showBackdrop
      />
    </FluidContainer>
  );
};
