import styled from '@emotion/styled';
import {
  animated, AnimationResult, Controller, SpringValue, useTransition,
} from '@react-spring/web';
import { FC, ReactNode } from 'react';
import { useLocation } from 'react-router';

import { ReactComponent as HomeIcon } from 'assets/common/home.svg';
import { ReactComponent as SearchIcon } from 'assets/common/loupe.svg';
import { ReactComponent as ReciperIcon } from 'assets/common/reciper.svg';
import { ReactComponent as RecipesIcon } from 'assets/common/recipes.svg';
import { ReactComponent as SettingsIcon } from 'assets/settings/cogwheel.svg';

import { NavigationMenu } from 'components/navigation/NavigationMenu';
import { NavigationMenuItem } from 'components/navigation/NavigationMenuItem';

import { useScrollRestoration } from 'hooks/useScrollRestoration';

import { urls } from 'routing/urls';

import { media } from 'utils/styles/mediaQueries';
import { color } from 'utils/styles/theme';

const PageBody = styled(animated.div)`
  overflow: auto;
  grid-column: 2;

  ${media.down('medium')} {
    padding-bottom: 70px;
  }
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

export const Page: FC = ({ children }) => {
  const location = useLocation();
  const { ref, restoreScroll } = useScrollRestoration<HTMLDivElement>(false);

  const transitions = useTransition(children, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    exitBeforeEnter: true,
    config: { duration: 100 },
    key: location.pathname,
    onStart(_result: AnimationResult, _spring: Controller | SpringValue, item?: ReactNode) {
      // Manualy restore scroll position when starting enter animation
      if (item === children) restoreScroll(location.key);
    },
  });

  return (
    <PageContainer>
      <PageSidebar>
        <Logo>
          <AppIcon />
          <AppName>Reciper</AppName>
        </Logo>

        <NavigationMenu>
          <NavigationMenuItem title="Główna" icon={HomeIcon} to={urls.home()} />
          <NavigationMenuItem title="Szukaj" icon={SearchIcon} to={urls.search()} />
          <NavigationMenuItem title="Przepisy" icon={RecipesIcon} to={urls.recipes()} />
          <NavigationMenuItem title="Ustawienia" icon={SettingsIcon} to={urls.settings()} />
        </NavigationMenu>
      </PageSidebar>

      {transitions((styles, content) => (
        <PageBody ref={ref} style={styles}>
          {content}
        </PageBody>
      ))}
    </PageContainer>
  );
};
