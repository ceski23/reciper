import styled from '@emotion/styled';
import { VFC } from 'react';

import { Link } from 'components/common/Link';

import { urls } from 'routing/urls';

import { color } from 'utils/styles/theme';

export const CustomToastIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const ToastContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ToastLink = styled(Link)`
  margin-left: 20px;
  background-color: ${color('backgroundHover')};
  padding: 5px 10px;
  border-radius: 10px;
  color: ${color('textalt')};
  text-decoration: none;
  font-weight: 600;
`;

export const AuthToast: VFC = () => (
  <ToastContainer>
    <span>Wymagane ponowne uwierzytelnienie</span>
    <ToastLink to={urls.settings.account()}>OK</ToastLink>
  </ToastContainer>
);
