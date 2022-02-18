/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled/macro';
import React, { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { buttonStyles, buttonIconStyles } from 'components/common/Button';

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
