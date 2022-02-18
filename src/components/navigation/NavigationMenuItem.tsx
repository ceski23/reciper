/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';
import styled from '@emotion/styled/macro';
import { transparentize } from 'polished';
import { FC } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

import { media } from 'utils/styles/mediaQueries';

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
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => transparentize(0.9, props.theme.colors.primary)};
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

const iconStyles = css`
  width: 25px;
  fill: currentColor;
`;

interface Props {
  title: string;
  to: NavLinkProps['to'];
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export const NavigationMenuItem: FC<Props> = ({ title, to, icon: Icon }) => (
  <Item to={to}>
    {Icon && <Icon css={iconStyles} />}
    <Text>{title}</Text>
  </Item>
);
