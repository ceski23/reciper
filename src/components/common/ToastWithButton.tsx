import styled from '@emotion/styled';
import { FC } from 'react';

import { Button } from 'components/common/Button';

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

const ToastButton = styled(Button)`
  margin-left: 20px;
  background-color: ${color('backgroundHover')};
  min-width: auto;
  padding: 7px 15px;
  border-radius: 10px;
  color: ${color('textalt')};
  text-decoration: none;
  font-weight: 600;
  text-align: center;
`;

interface Props {
  buttonText: string;
  onButtonClick: () => void;
}

export const ToastWithButton: FC<Props> = ({ buttonText, onButtonClick, children }) => (
  <ToastContainer>
    {children}

    <ToastButton onClick={onButtonClick} size="small">
      {buttonText}
    </ToastButton>
  </ToastContainer>
);
