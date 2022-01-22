import styled from '@emotion/styled/macro';
import { VFC } from 'react';
import { urls } from 'urls';
import { Link } from './Link';

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
  background-color: ${(props) => props.theme.colors.backgroundhover};
  padding: 5px 10px;
  border-radius: 10px;
  color: ${(props) => props.theme.colors.textalt};
  text-decoration: none;
  font-weight: 600;
`;

export const AuthToast: VFC = () => (
  <ToastContainer>
    <span>Wymagane ponowne uwierzytelnienie</span>
    <ToastLink to={urls.settings.account}>OK</ToastLink>
  </ToastContainer>
);
