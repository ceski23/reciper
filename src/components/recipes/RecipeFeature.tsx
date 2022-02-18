/** @jsxImportSource @emotion/react */
import { Theme, css } from '@emotion/react/macro';
import styled from '@emotion/styled/macro';
import React, { VFC } from 'react';

import { fluidTypography } from 'utils/styles/typography';

interface Props {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  text: string;
}

const Text = styled('p')`
  margin: 0;
  margin-top: 10px;
  font-weight: 600;
  ${({ theme }) => fluidTypography(
    theme.breakpoints.small,
    theme.breakpoints.xlarge,
    16,
    20,
  )}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const iconStyles = ({ theme }: { theme: Theme }) => css`
  width: 25px;
  color: ${theme.colors.primary};
  fill: ${theme.colors.primary};
`;

export const RecipeFeature: VFC<Props> = ({ text, icon: Icon }) => (
  <Container>
    <Icon css={(theme) => iconStyles({ theme })} />
    <Text>{text}</Text>
  </Container>
);
