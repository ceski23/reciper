import styled from '@emotion/styled';
import { VFC } from 'react';
import { ReactComponent as BackIcon } from 'assets/left-arrow.svg';
import { SettingsListItem } from 'components/SettingsListItem';
import { ReactComponent as UserIcon } from 'assets/user.svg';
import { ReactComponent as BrushIcon } from 'assets/brush.svg';
import { ReactComponent as WeightIcon } from 'assets/kilogram.svg';
import { ReactComponent as SettingsIcon } from 'assets/cogwheel.svg';
import { Link } from 'components/Link';
import { ScreenContainer } from '../ScreenContainer';
import { urls } from 'urls';

const ScreenHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const SettingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  a {
    text-decoration: none;
    color: unset;
  }
`;

const BackLink = styled(Link)`
  width: 30px;
  height: 30px;
  color: ${(props) => props.theme.colors.textalt};
  margin-right: 20px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const SettingsScreen: VFC = () => (
  <ScreenContainer>
    <ScreenHeader>
      <BackLink to={urls.home}>
        <BackIcon />
      </BackLink>
      <h1>Ustawienia</h1>
    </ScreenHeader>

    <SettingsList>
      <SettingsListItem text="Ogólne" icon={SettingsIcon} />

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
  </ScreenContainer>
);
