import styled from '@emotion/styled/macro';
import { ReactComponent as SettingsIcon } from 'assets/cogwheel.svg';
import { ReactComponent as HomeIcon } from 'assets/home.svg';
import { ReactComponent as SearchIcon } from 'assets/loupe.svg';
import { ReactComponent as RecipesIcon } from 'assets/recipes.svg';
import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';

import { FluidContainer } from 'components/common/Container';
import { NavigationMenu } from 'components/navigation/NavigationMenu';
import { NavigationMenuItem } from 'components/navigation/NavigationMenuItem';

import { urls } from 'routing/urls';

const BodyContainer = styled(motion(FluidContainer))`
  min-height: 100vh;
  align-content: flex-start;
  padding-bottom: 70px;
`;

interface Props {
  header?: ReactNode;
  footer?: ReactNode;
}

export const ScreenContainer: FC<Props> = ({ children, footer, header }) => (
  <>
    <NavigationMenu>
      <NavigationMenuItem title="Główna" icon={HomeIcon} to={urls.home} />
      <NavigationMenuItem title="Szukaj" icon={SearchIcon} to={String(urls.recipes)} />
      <NavigationMenuItem title="Przepisy" icon={RecipesIcon} to={String(urls.recipes)} />
      <NavigationMenuItem title="Ustawienia" icon={SettingsIcon} to={String(urls.settings)} />
    </NavigationMenu>

    {header}

    <BodyContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </BodyContainer>

    {footer}
  </>
);
