/** @jsxImportSource @emotion/react */
import React, { VFC } from 'react';
import styled from '@emotion/styled';
import { Theme, css } from '@emotion/react';

interface Props {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  text: string;
}

const Text = styled('p')`
  margin: 0;
  margin-top: 10px;
  font-weight: 600;
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
