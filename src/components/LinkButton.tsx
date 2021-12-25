/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React, { FC } from 'react';
import { buttonIconStyles, buttonStyles } from './Button';
import { Link, LinkProps } from './Link';

export const StyledLinkButton = styled(Link)`
  ${buttonStyles}

  text-decoration: none;
  justify-content: center;
`;

interface Props {
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | string;
}

export const LinkButton: FC<LinkProps & Props> = ({
  children, icon: Icon, ...props
}) => (
  <StyledLinkButton {...props}>
    {Icon && (typeof Icon === 'string' ? <img src={Icon} alt="" css={buttonIconStyles} /> : <Icon css={buttonIconStyles} />)}
    {children}
    {Icon && <span style={{ width: 25 }} />}
  </StyledLinkButton>
);
