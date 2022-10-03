import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FC } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

import { media } from 'utils/styles/mediaQueries';
import { color } from 'utils/styles/theme';

const Item = styled(NavLink)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px;
  position: relative;
  text-decoration: none;
  color: unset;
  font-weight: 600;
  gap: 10px;
  border-radius: 10px;

  &.active {
    color: ${color('primary')};
    background-color: ${color('primaryHighlight')};
  }

  ${media.down('medium')} {
    &.active {
      background-color: transparent;

      &::after {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        width: 80%;
        height: 4px;
        left: 0;
        right: 0;
        margin: auto;
        border-radius: 15px 15px 0 0;
        background-color: currentColor;
      }
    }
  }
`;

const Text = styled.span`
  display: none;

  ${media.up('small')} {
    display: block;
  }
`;

const ItemIcon = styled.svg`
  width: 25px;
  fill: currentColor;
`;

interface Props {
  title: string;
  to: NavLinkProps['to'];
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export const NavigationMenuItem: FC<Props> = ({ title, to, icon }) => (
  <Item to={to}>
    {icon && <ItemIcon as={icon} />}
    <Text>{title}</Text>
  </Item>
);
