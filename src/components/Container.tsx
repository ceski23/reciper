import styled from '@emotion/styled';
import { media } from 'utils/mediaQueries';
import { Breakpoint } from 'theme';
import { css, Theme } from '@emotion/react';

export const fluidContainerStyles = ({ theme }: { theme: Theme }) => css`
  display: grid;
  grid-template-columns: 1fr 90% 1fr;

  & > * {
    grid-column: 2;
    width: 100%;
  }

  ${(Object.entries(theme.containerWidths).map(([name, width]) => (
    `${media.up(name as Breakpoint)} {
        grid-template-columns: 1fr ${width}px 1fr
    }`
  )))}
`;

export const fullBleedStyles = css`
  width: 100%;
  grid-column: 1 / -1;
`;

export const FluidContainer = styled.div`
  ${fluidContainerStyles}
`;

export const FullBleed = styled.div`
  ${fullBleedStyles}
`;
