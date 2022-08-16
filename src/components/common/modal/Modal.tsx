import styled from '@emotion/styled';
import {
  animated, config, useSpring, useTransition,
} from '@react-spring/web';
import React, { createContext, FC, useMemo } from 'react';

import { ModalBody } from 'components/common/modal/ModalBody';
import { ModalFooter } from 'components/common/modal/ModalFooter';
import { ModalHeader } from 'components/common/modal/ModalHeader';
import { ReactPortal } from 'components/common/modal/ReactPortal';

import { useKeydown } from 'hooks/useKeydown';

import { color } from 'utils/styles/theme';

export interface ModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
  showBackdrop?: boolean;
  closeOnEscape?: boolean;
  loading?: boolean;
}

interface Subcomponents {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
}

const Container = styled(animated.div)`
  background-color: ${color('background')};
  color: ${color('text')};
  width: min(500px, 90%);
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%,-50%);
  border-radius: 10px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  z-index: 99;
`;

const Backdrop = styled(animated.div)`
  background-color: #00000075;
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 99;
`;

interface ModalContextData {
  onClose: ModalProps['onClose'];
  onAccept: ModalProps['onAccept'];
  loading?: boolean;
}

export const ModalContext = createContext<ModalContextData | undefined>(undefined);

const Modal: FC<ModalProps> & Subcomponents = ({
  children, isOpen, onClose, onAccept, showBackdrop, closeOnEscape, loading,
}) => {
  useKeydown('Escape', () => {
    if (closeOnEscape) onClose();
  });

  const backdropStyles = useSpring({ opacity: isOpen ? 1 : 0 });

  const transition = useTransition(isOpen, {
    from: { opacity: 0, x: '50%', y: '0%' },
    enter: { opacity: 1, x: '50%', y: '-50%' },
    leave: { opacity: 0, x: '50%', y: '0%' },
    config: config.stiff,
  });

  const data = useMemo(() => ({
    onAccept, onClose, loading,
  }), [loading, onAccept, onClose]);

  return (
    <ModalContext.Provider value={data}>
      {transition((animation, show) => show && (
        <ReactPortal wrapperId="modal">
          {showBackdrop && (
            <Backdrop
              onClick={onClose}
              data-testid="backdrop"
              style={backdropStyles}
            />
          )}

          <Container
            role="dialog"
            aria-modal="true"
            style={animation}
          >
            {children}
          </Container>
        </ReactPortal>
      ))}
    </ModalContext.Provider>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export {
  Modal,
};
