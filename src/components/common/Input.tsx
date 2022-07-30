import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const inputStyles = ({ theme }: { theme: Theme }) => css`
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px solid ${theme.colors.textalt};
  background-color: ${theme.colors.backgroundInput};
  color: ${theme.colors.textalt};
  flex: 1;

  &::placeholder {
    color: ${theme.colors.textalt};
    opacity: 1;
  }
`;

export const Input = styled.input(inputStyles);
