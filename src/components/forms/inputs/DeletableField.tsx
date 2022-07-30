import styled from '@emotion/styled';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { ReactComponent as DeleteIcon } from 'assets/common/delete.svg';

import { Input } from 'components/common/Input';

import { color } from 'utils/styles/theme';

interface NumberFieldProps {
  onDeleteClick: () => void;
}

const StyledInput = styled(Input)`
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const DeleteButton = styled.button`
  border-radius: 0 10px 10px 0;
  border: 1px solid ${color('textalt')};
  padding: 8px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${color('backgroundAltHover')};
  color: ${color('textalt')};
  cursor: pointer;

  &:hover {
    background-color: ${color('backgroundAlt')};
  }

  svg {
    width: 15px;
    height: 15px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

export const DeletableField = forwardRef<HTMLInputElement, NumberFieldProps & ComponentPropsWithoutRef<'input'>>(({
  onDeleteClick, ...props
}, ref) => (
  <InputContainer>
    <DeleteButton type="button" onClick={onDeleteClick}>
      <DeleteIcon />
    </DeleteButton>

    <StyledInput ref={ref} {...props} />
  </InputContainer>
));
