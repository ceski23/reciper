import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import React, { createContext, FC, useMemo } from 'react';

import { ModalBody } from 'components/common/modal/ModalBody';
import { ModalFooter } from 'components/common/modal/ModalFooter';
import { ModalHeader } from 'components/common/modal/ModalHeader';
import { ReactPortal } from 'components/common/modal/ReactPortal';

import { useKeydown } from 'hooks/useKeydown';

import { color } from 'utils/styles/theme';

interface ModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
  showBackdrop?: boolean;
  closeOnEscape?: boolean;
}

interface Subcomponents {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
}

const Container = styled(motion.div)`
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

const Backdrop = styled(motion.div)`
  background-color: #00000075;
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 99;
`;

const dropIn = {
  hidden: {
    y: '0',
    x: '50%',
    opacity: 0,
  },
  visible: {
    y: '-50%',
    x: '50%',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    x: '50%',
    opacity: 0,
  },
};

interface ModalContextData {
  onClose: ModalProps['onClose'];
  onAccept: ModalProps['onAccept'];
}

export const ModalContext = createContext<ModalContextData | undefined>(undefined);

const Modal: FC<ModalProps> & Subcomponents = ({
  children, isOpen, onClose, onAccept, showBackdrop, closeOnEscape,
}) => {
  useKeydown('Escape', () => {
    if (closeOnEscape) onClose();
  });

  const data = useMemo(() => ({
    onAccept, onClose,
  }), [onAccept, onClose]);

  return (
    <ModalContext.Provider value={data}>
      <AnimatePresence initial={false} exitBeforeEnter>
        {isOpen && (
          <ReactPortal wrapperId="modal">
            {showBackdrop && (
              <Backdrop
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
              />
            )}

            <Container
              variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {children}
            </Container>
          </ReactPortal>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export {
  Modal,
};
