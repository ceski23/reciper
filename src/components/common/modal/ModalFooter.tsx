import styled from '@emotion/styled/macro';
import { FC } from 'react';

import { Button } from 'components/common/Button';

import { useModalContext } from 'hooks/useModalContext';

interface ModalFooterProps {
  cancelText?: string;
  acceptText?: string;
}

const Container = styled.div`
  padding: 15px 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 10px;
`;

export const ModalFooter: FC<ModalFooterProps> = ({
  cancelText,
  acceptText,
}) => {
  const { onAccept, onClose } = useModalContext();

  return (
    <Container>
      {cancelText && <Button size="small" variant="normal" onClick={onClose}>{cancelText}</Button>}
      {onAccept && acceptText && <Button variant="primary" size="small" onClick={onAccept}>{acceptText}</Button>}
    </Container>
  );
};
