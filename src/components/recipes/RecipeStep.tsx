import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';
import React, { VFC } from 'react';

import { color } from 'utils/styles/theme';
import { fluidTypography } from 'utils/styles/typography';

interface Props {
  stepNumber: number;
  instruction: string;
  done?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const StepNumber = styled('p')`
  color: ${color('primary')};
  margin: 0;
  margin-bottom: 10px;
  font-weight: 700;
  ${({ theme }) => fluidTypography(
    theme.breakpoints.small,
    theme.breakpoints.xlarge,
    14,
    18,
  )}
`;

const Container = styled.div`
  background-color: ${(props) => transparentize(0.9, props.theme.colors.primary)};
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
`;

const Instruction = styled('p')`
  text-align: justify;
  margin: 0;
  line-height: 1.4;
  white-space: pre-wrap;
  font-weight: 500;
  ${({ theme }) => fluidTypography(
    theme.breakpoints.small,
    theme.breakpoints.xlarge,
    14,
    18,
  )}
`;

const doneStyles = css`
  opacity: 0.35;
  text-decoration: line-through;
`;

export const RecipeStep: VFC<Props> = ({
  stepNumber, instruction, done, onClick,
}) => (
  <Container css={done && doneStyles} onClick={onClick} role="button">
    <StepNumber>Krok {stepNumber}</StepNumber>
    <Instruction>{instruction}</Instruction>
  </Container>
);
