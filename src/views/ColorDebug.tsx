import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled/macro';
import { VFC } from 'react';

import { color, darkTheme, lightTheme } from 'utils/styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 20px;
  background-color: ${color('background')};
  color: ${color('text')};
`;

const Color = styled.div<{ color: string }>`
  width: 100%;
  height: 100px;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border-radius: 10px;
`;

export const ColorDebug: VFC = () => (
  <Container>
    <ColorsGrid>
      {Object.entries(lightTheme.colors).map(([name, colorValue]) => (
        <Color color={colorValue}>{name}</Color>
      ))}
    </ColorsGrid>

    <ThemeProvider theme={darkTheme}>
      <ColorsGrid>
        {Object.entries(darkTheme.colors).map(([name, colorValue]) => (
          <Color color={colorValue}>{name}</Color>
        ))}
      </ColorsGrid>
    </ThemeProvider>
  </Container>
);
