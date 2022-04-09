import styled from '@emotion/styled/macro';
import { motion } from 'framer-motion';
import { FC } from 'react';

import { ReactComponent as HomeIcon } from 'assets/common/home.svg';
import { ReactComponent as SearchIcon } from 'assets/common/loupe.svg';
import { ReactComponent as ReciperIcon } from 'assets/common/reciper.svg';
import { ReactComponent as RecipesIcon } from 'assets/common/recipes.svg';
import { ReactComponent as SettingsIcon } from 'assets/settings/cogwheel.svg';

import { NavigationMenu } from 'components/navigation/NavigationMenu';
import { NavigationMenuItem } from 'components/navigation/NavigationMenuItem';

import { urls } from 'routing/urls';

import { media } from 'utils/styles/mediaQueries';
import { color } from 'utils/styles/theme';

const PageBody = styled(motion.div)`
  overflow: auto;
  grid-column: 2;
  /* display: grid;
  align-content: flex-start;
  grid-template-columns: 50px 1fr 50px;

  ${media.down('medium')} {
    grid-template-columns: 1fr 90% 1fr;
    padding-bottom: 70px;
  }

  & > * {
    grid-column: 2;
    width: 100%;
  } */
`;

const PageContainer = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: auto 1fr;

  ${media.down('medium')} {
    grid-template-columns: 0 1fr;
  }
`;

const PageSidebar = styled.aside`
  grid-column: 1;
  width: 300px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1500px) {
    width: 250px;
  }
`;

const Logo = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  gap: 10px;

  ${media.down('medium')} {
    display: none;
  }
`;

const AppIcon = styled(ReciperIcon)`
  height: 100%;
  width: auto;
`;

const AppName = styled.p`
  color: ${color('primary')};
  font-size: 30px;
  font-weight: 700;
`;

export const Page: FC = ({ children }) => (
  <PageContainer>
    <PageSidebar>
      <Logo>
        <AppIcon />
        <AppName>Reciper</AppName>
      </Logo>

      <NavigationMenu>
        <NavigationMenuItem title="Główna" icon={HomeIcon} to={urls.home} />
        <NavigationMenuItem title="Szukaj" icon={SearchIcon} to={String(urls.search)} />
        <NavigationMenuItem title="Przepisy" icon={RecipesIcon} to={String(urls.recipes)} />
        <NavigationMenuItem title="Ustawienia" icon={SettingsIcon} to={String(urls.settings)} />
      </NavigationMenu>
    </PageSidebar>

    <PageBody
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </PageBody>
  </PageContainer>
);
