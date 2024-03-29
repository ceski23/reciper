import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';
import React, { FC } from 'react';
import { match } from 'ts-pattern';

export type ButtonVariant = 'normal' | 'primary';
export type ButtonSize = 'normal' | 'small';

export const buttonStyles = (
  { theme, variant, size }: { theme: Theme, variant: ButtonVariant, size: ButtonSize },
) => css`
  font-weight: bold;
  border: none;
  transition: background-color 0.3s, color 0.3s;
  outline: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: auto;
  cursor: pointer;
  box-shadow: 0px 3px 2px ${theme.colors.shadow};
  position: relative;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  ${match(variant)
    .with('normal', () => css`
      background-color: ${theme.colors.backgroundAlt};
      color: ${theme.colors.textalt};

      &:disabled {
        background-color: ${theme.colors.backgroundHover};
      }

      &:not(:disabled) {
        &:hover,
        &:focus-visible {
          background-color: ${theme.colors.backgroundAltHover};
        }
      }
    `)
    .with('primary', () => css`
      background-color: ${theme.colors.primary};
      color: ${transparentize(0, theme.colors.textLight)};

      &:disabled {
        background-color: ${theme.colors.primaryDisabled};
        color: ${theme.colors.text};
      }

      &:not(:disabled) {
        &:hover,
        &:focus-visible {
          background-color: ${theme.colors.primaryHover};
        }
      }
    `)
    .exhaustive()}
  
  ${match(size)
    .with('normal', () => css`
      font-size: 18px;
      border-radius: 10px;
      padding: 15px 15px;
      line-height: 1;

      & > svg, & > img {
        margin-right: 15px;
        width: 20px;
        height: 20px;
      }

      & > .filler {
        margin-left: 15px;
        width: 20px;
        height: 20px;
      }
    `)
    .with('small', () => css`
      font-size: 14px;
      border-radius: 8px;
      padding: 12px 12px;
      line-height: 1;

      & > svg, & > img {
        margin-right: 15px;
        width: 15px;
        height: 15px;
      }

      & > .filler {
        margin-left: 15px;
        width: 15px;
        height: 15px;
      }
    `)
    .exhaustive()}
`;

export const StyledButton = styled.button<{
  variant: ButtonVariant,
  size: ButtonSize
}>(buttonStyles);

interface Props {
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button: FC<React.ComponentPropsWithoutRef<'button'> & Props> = ({
  children, icon: Icon, variant = 'normal', size = 'normal', ...props
}) => (
  <StyledButton size={size} variant={variant} {...props}>
    {Icon && (typeof Icon === 'string' ? <img src={Icon} className="filler" alt="" /> : <Icon role="img" />)}
    {children}
    {Icon && <span className="filler" />}
  </StyledButton>
);
