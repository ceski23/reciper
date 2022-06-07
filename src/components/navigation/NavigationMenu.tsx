import styled from '@emotion/styled';
import { FC } from 'react';

import { media } from 'utils/styles/mediaQueries';
import { color } from 'utils/styles/theme';

const NavigationContainer = styled.nav`
  display: flex;
  flex-direction: row;
  background-color: ${color('background')};
  width: 100%;
  z-index: 10;

  ${media.down('medium')} {
    box-shadow: 0px 0px 20px ${color('shadow')};
    height: 70px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  gap: 10px;
  padding: 10px;

  ${media.down('medium')} {
    flex-direction: row;
    padding: 0;
  }
`;

export const NavigationMenu: FC = ({ children }) => (
  <NavigationContainer>
    <MenuItems>
      {children}
    </MenuItems>
  </NavigationContainer>
);
