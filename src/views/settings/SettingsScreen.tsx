import styled from '@emotion/styled/macro';
import { VFC } from 'react';

import { ReactComponent as UserIcon } from 'assets/common/user.svg';
import { ReactComponent as BrushIcon } from 'assets/settings/brush.svg';
import { ReactComponent as AboutIcon } from 'assets/settings/info.svg';
import { ReactComponent as WeightIcon } from 'assets/settings/kilogram.svg';

import { FluidContainer } from 'components/common/Container';
import { Link } from 'components/common/Link';
import { ScreenHeader } from 'components/common/ScreenHeader';
import { SettingsListItem } from 'components/settings/SettingsListItem';

import { urls } from 'routing/urls';

const SettingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  a {
    text-decoration: none;
    color: unset;
  }
`;

export const SettingsScreen: VFC = () => (
  <FluidContainer>
    <ScreenHeader title="Ustawienia" />

    <SettingsList>
      {/* <SettingsListItem text="Ogólne" icon={SettingsIcon} /> */}

      <Link to={urls.settings.appearance}>
        <SettingsListItem text="Wygląd" icon={BrushIcon} />
      </Link>

      <Link to={urls.settings.account}>
        <SettingsListItem text="Konto i synchronizacja" icon={UserIcon} />
      </Link>

      <Link to={urls.settings.units}>
        <SettingsListItem text="Jednostki" icon={WeightIcon} />
      </Link>

      <Link to={urls.settings.about}>
        <SettingsListItem text="O aplikacji" icon={AboutIcon} />
      </Link>
    </SettingsList>
  </FluidContainer>
);
