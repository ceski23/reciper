import styled from '@emotion/styled/macro';
import { FC } from 'react';

import { ReactComponent as CloseIcon } from 'assets/common/delete.svg';

import { Button } from 'components/common/Button';

import { useModalContext } from 'hooks/useModalContext';

interface ModalHeaderProps {
  showCloseButton?: boolean;
  title?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px 0;
`;

const Title = styled.p`
  margin: 0;
  font-weight: 700;
  font-size: 22px;
`;

const CloseButton = styled(Button)`
  background-color: transparent;
  box-shadow: none;

  svg {
    margin-right: 0;
  }
`;

export const ModalHeader: FC<ModalHeaderProps> = ({
  showCloseButton = false,
  title,
}) => {
  const { onClose } = useModalContext();

  return (
    <Container>
      {title && <Title>{title}</Title>}
      {showCloseButton && <CloseButton variant="normal" size="small" onClick={onClose}><CloseIcon /></CloseButton>}
    </Container>
  );
};
