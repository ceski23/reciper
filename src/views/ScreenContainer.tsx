import styled from '@emotion/styled';
import { FluidContainer } from 'components/Container';
import React, { FC } from 'react';

const Container = styled(FluidContainer)`
  min-height: 100vh;
  align-content: flex-start;
`;

export const ScreenContainer: FC = ({ children }) => (
  <>
    {/* Header */}
    {/* <FluidContainer /> */}

    {/* Body */}
    <Container>
      {children}
    </Container>

    {/* Footer */}
    {/* <FluidContainer /> */}
  </>
);
