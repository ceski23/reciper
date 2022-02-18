/** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react/macro';
import styled from '@emotion/styled/macro';
import { transparentize } from 'polished';
import React, { FC } from 'react';

export const buttonStyles = ({ theme }: { theme: Theme }) => css`
  padding: 15px 20px;
  border-radius: 20px;
  min-width: 110px;
  font-size: 18px;
  font-weight: bold;
  font-family: Raleway, sans-serif;
  border: none;
  transition: box-shadow 0.3s, background-color 0.3s, color 0.3s, transform 0.3s;
  outline: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.colors.background2};
  color: ${transparentize(0, theme.colors.text)};
  will-change: transform;
  box-shadow: 0 3px 3px ${transparentize(0.9, theme.colors.shadow)};
  width: auto;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background-color: ${theme.colors.background2};
  }

  &:not(:disabled) {
    cursor: pointer;

    &:hover,
    &:focus-visible {
      background-color: ${theme.colors.primary};
      color: ${theme.colors.background};
      transform: scale(1.05);
    }

    &:active {
      transform: scale(1.02);
    }
  }
`;

export const buttonIconStyles = css`
  margin-right: 15px;
  width: 25px;
`;

export const StyledButton = styled.button(buttonStyles);

export type ButtonProps = React.DetailedHTMLProps<
React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement
>;

interface Props {
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | string;
}

export const Button: FC<ButtonProps & Props> = ({
  children, icon: Icon, ...props
}) => (
  <StyledButton {...props}>
    {Icon && (typeof Icon === 'string' ? <img src={Icon} alt="" css={buttonIconStyles} /> : <Icon css={buttonIconStyles} />)}
    {children}
    {Icon && <span style={{ width: 25 }} />}
  </StyledButton>
);
