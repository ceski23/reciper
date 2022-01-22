import styled from '@emotion/styled/macro';
import { VFC } from 'react';
import { SettingsListItem } from 'components/settings/SettingsListItem';
import { ReactComponent as UserIcon } from 'assets/user.svg';
import { ReactComponent as BrushIcon } from 'assets/brush.svg';
import { ReactComponent as WeightIcon } from 'assets/kilogram.svg';
// import { ReactComponent as SettingsIcon } from 'assets/cogwheel.svg';
import { Link } from 'components/Link';
import { urls } from 'urls';
import { ScreenHeader } from 'components/Screen/ScreenHeader';
import { FluidContainer } from 'components/Container';

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
    </SettingsList>
  </FluidContainer>
);
