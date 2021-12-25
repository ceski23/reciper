/** @jsxImportSource @emotion/react */
import React, { VFC } from 'react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';
import { css } from '@emotion/react';

interface Props {
  stepNumber: number;
  instruction: string;
  done?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const StepNumber = styled('p')`
  color: ${(props) => props.theme.colors.primary};
  margin: 0;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 14px;
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
  font-size: 14px;
  font-weight: 500;
`;

const doneStyles = css`
  opacity: 0.35;
  text-decoration: line-through;
`;

export const RecipeStep: VFC<Props> = ({
  stepNumber, instruction, done, onClick,
}) => (
  <Container css={done && doneStyles} onClick={onClick}>
    <StepNumber>Krok {stepNumber}</StepNumber>
    <Instruction>{instruction}</Instruction>
  </Container>
);
