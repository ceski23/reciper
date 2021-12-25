import styled from '@emotion/styled';
import React, { VFC } from 'react';
import { css, Theme } from '@emotion/react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px;
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 20px;
`;

const color = ({ theme }: { theme: Theme }) => css`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 0 0 1px ${theme.colors.shadow};
`;

const Primary = styled.div`
  ${color}

  background-color: ${(props) => props.theme.colors.primary};
`;

const Text1 = styled.div`
  ${color}

  background-color: ${(props) => props.theme.colors.text};
`;

const Text2 = styled.div`
  ${color}

  background-color: ${(props) => props.theme.colors.textalt};
`;

const Surface1 = styled.div`
  ${color}

  background-color: ${(props) => props.theme.colors.backgroundalt};
`;

const Surface2 = styled.div`
  ${color}

  background-color: ${(props) => props.theme.colors.background};
`;

const Surface3 = styled.div`
  ${color}

  background-color: ${(props) => props.theme.colors.backgroundhover};
`;

const Surface4 = styled.div`
  ${color}

  background-color: ${(props) => props.theme.colors.background2};
`;

const Shadow = styled.div`
  ${color}

  background-color: ${(props) => props.theme.colors.shadow};
`;

export const ColorsDebug: VFC = () => (
  <Container>
    <Primary />

    <List>
      <Text1 />
      <Text2 />
    </List>

    <List>
      <Surface1 />
      <Surface2 />
      <Surface3 />
      <Surface4 />
    </List>

    <Shadow />
  </Container>
);
