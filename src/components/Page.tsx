import styled from '@emotion/styled/macro';
import { NavigationMenuItem } from 'components/navigation/NavigationMenuItem';
import { NavigationMenu } from 'components/NavigationMenu';
import { FC } from 'react';
import { urls } from 'urls';
import { ReactComponent as SettingsIcon } from 'assets/cogwheel.svg';
import { ReactComponent as RecipesIcon } from 'assets/recipes.svg';
import { ReactComponent as ReciperIcon } from 'assets/reciper.svg';
import { ReactComponent as HomeIcon } from 'assets/home.svg';
import { ReactComponent as SearchIcon } from 'assets/loupe.svg';
import { motion } from 'framer-motion';
import { media } from 'utils/mediaQueries';

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
  color: ${(props) => props.theme.colors.primary};
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
