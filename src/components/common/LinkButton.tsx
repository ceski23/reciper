import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import {
  buttonStyles, ButtonVariant, ButtonSize,
} from 'components/common/Button';

const RawLinkButton = styled(Link)`
  text-decoration: none;
  justify-content: center;
`;

const StyledLinkButton = styled(RawLinkButton)<{
  variant: ButtonVariant,
  size: ButtonSize
}>(buttonStyles);

interface Props {
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | string;
  variant?: ButtonVariant
  size?: ButtonSize
}

export const LinkButton: FC<LinkProps & Props> = ({
  children, icon: Icon, variant = 'normal', size = 'normal', ...props
}) => (
  <StyledLinkButton variant={variant} size={size} {...props}>
    {Icon && (typeof Icon === 'string' ? <img src={Icon} className="filler" alt="" /> : <Icon role="img" />)}
    {children}
    {Icon && <span className="filler" />}
  </StyledLinkButton>
);
