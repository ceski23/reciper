import styled from '@emotion/styled/macro';
import React, { FC } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

import { isUrlExternal } from 'utils/url';

export type LinkProps = RouterLinkProps & React.RefAttributes<HTMLAnchorElement>;

const StyledLink = styled.a`
  text-decoration: none;
`;

export const StyledRouterLink = styled(RouterLink)`
  text-decoration: none;
`;

export const Link: FC<LinkProps> = ({ to, children, ...props }) => (
  isUrlExternal(to.toString()) ? (
    <StyledLink href={to.toString()} {...props}>{children}</StyledLink>
  ) : (
    <StyledRouterLink to={to} {...props}>{children}</StyledRouterLink>
  )
);
