/* eslint-disable @typescript-eslint/no-use-before-define */
import styled from '@emotion/styled';
import React, { FC } from 'react';

import { FluidContainer } from 'components/common/Container';

interface ErrorInfoProps {
  error: string;
  actions?: React.ReactNode;
}

export const ErrorInfo: FC<ErrorInfoProps> = ({ error, actions }) => (
  <Container>
    <InnerContainer>
      <h2>Błąd!</h2>
      <ErrorText>{error}</ErrorText>
      <ActionsContainer>{actions}</ActionsContainer>
    </InnerContainer>
  </Container>
);

const ErrorText = styled.p`
  margin: 0;
  line-height: 1.6;
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 40px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const InnerContainer = styled(FluidContainer)`
  width: 100%;
  max-width: 500px;
`;
