/* eslint-disable @typescript-eslint/no-use-before-define */
import styled from '@emotion/styled';
import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import {
  FC, useCallback, useEffect, useState,
} from 'react';

import { ReactPortal } from 'components/common/modal/ReactPortal';

import { exhaustiveCheck } from 'utils/guards';
import { color } from 'utils/styles/theme';

export type SheetState = 'open' | 'close' | 'peek';

interface BottomSheetProps {
  state: SheetState;
  onStateChange: (state: SheetState) => void;
  disableDrag?: boolean;
  gap?: number;
}

export const BottomSheet: FC<BottomSheetProps> = ({
  state, onStateChange, children, disableDrag, gap = 40,
}) => {
  const [sheetHeight, setSheetHeight] = useState(0);
  const [showBackdrop, setShowBackdrop] = useState(false);

  const measuredRef = useCallback((node: HTMLElement | null) => {
    if (node) setSheetHeight(node.getBoundingClientRect().height);
  }, []);

  const backdropStyles = useSpring({ opacity: state !== 'close' ? 1 : 0 });
  const [{ y }, api] = useSpring({
    y: 0,
    onStart(result) {
      if (result.value.y !== 0) setShowBackdrop(true);
    },
    onRest(result) {
      if (result.value.y === 0) setShowBackdrop(false);
    },
  }, []);

  const openSheet = useCallback(() => {
    api.start({ y: -sheetHeight + gap, immediate: false });
    onStateChange('open');
  }, [api, gap, onStateChange, sheetHeight]);

  const closeSheet = useCallback(() => {
    api.start({ y: 0, immediate: false });
    onStateChange('close');
  }, [api, onStateChange]);

  const peekSheet = useCallback(() => {
    api.start({ y: -sheetHeight * 0.4, immediate: false });
    onStateChange('peek');
  }, [api, onStateChange, sheetHeight]);

  useEffect(() => {
    switch (state) {
      case 'open': openSheet(); break;
      case 'close': closeSheet(); break;
      case 'peek': peekSheet(); break;

      default:
        exhaustiveCheck(state, 'Not all states checked');
        break;
    }
  }, [closeSheet, openSheet, peekSheet, state]);

  const bind = useDrag(({
    velocity: [,vy], offset: [,my], direction: [,dy], last,
  }) => {
    if (disableDrag) return;

    // If finished dragging
    if (last) {
      // If dragged upwards then open sheet
      if (dy < 0) openSheet();
      // If dragged quickly downwards or opened less than 40% of size then close sheet
      else if ((dy > 0 && vy > 0.5) || my > -sheetHeight * 0.4) closeSheet();
      // Open sheet
      else openSheet();
    } else {
      api.start({ y: my, immediate: true });
    }
  }, {
    delay: true,
    from: () => [0, y.get()],
    filterTaps: true,
    bounds: {
      top: -sheetHeight,
    },
  });

  return (
    <ReactPortal wrapperId="filtersModal">
      {showBackdrop && (
        <Backdrop style={backdropStyles} onClick={() => onStateChange('close')} />
      )}

      <Container ref={measuredRef} {...bind()} style={{ y }}>
        <Handle />
        <Content>{children}</Content>
      </Container>
    </ReactPortal>

  );
};

const Container = styled(animated.div)`
  background-color: ${color('background')};
  position: fixed;
  bottom: -100vh;
  left: 0;
  right: 0;
  z-index: 99;
  height: 100vh;
  touch-action: none;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 20px ${color('shadow')};
`;

const Handle = styled.div`
  background-color: ${color('backgroundAltHover')};
  width: 40px;
  height: 4px;
  border-radius: 10px;
  margin: 20px;
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  padding: 0 20px 20px;
`;
