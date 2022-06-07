import styled from '@emotion/styled';
import { FC } from 'react';

import { color } from 'utils/styles/theme';

interface ModalBodyProps {
  children?: React.ReactNode;
}

const Container = styled.div`
  padding: 20px;
  line-height: 1.5;
  color: ${color('textalt')};
`;

export const ModalBody: FC<ModalBodyProps> = ({ children }) => (
  <Container>
    {children}
  </Container>
);
