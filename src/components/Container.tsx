import styled from '@emotion/styled/macro';
import { media } from 'utils/mediaQueries';
import { css } from '@emotion/react/macro';

export const fluidContainerStyles = css`
  display: grid;
  grid-template-columns: 50px 1fr 50px;
  align-content: flex-start;

  & > * {
    grid-column: 2;
    width: 100%;
  }

  ${media.down('medium')} {
    grid-template-columns: 1fr 90% 1fr;
    padding-bottom: 70px;
  }
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
