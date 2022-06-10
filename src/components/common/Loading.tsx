import styled from '@emotion/styled';

import { color } from 'utils/styles/theme';

export const Loading = styled.div`
  background-color: ${color('background')};
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;
