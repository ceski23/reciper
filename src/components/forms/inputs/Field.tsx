import styled from '@emotion/styled/macro';
import React, { forwardRef } from 'react';

import { color } from 'utils/styles/theme';

export type InputProps =
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface Props {
  label: string;
  error?: string;
  deleteIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  onDeleteClick?: () => void;
}

const DeleteButton = styled.button`
  border-radius: 0 10px 10px 0;
  border: 1px solid ${color('textalt')};
  padding: 8px 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 15px;
    height: 15px;
  }
`;

const StyledField = styled.input`
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px solid ${color('textalt')};
  background-color: ${color('backgroundInput')};
  flex: 1;

  &::placeholder {
    color: ${color('textalt')};
    opacity: 1;
  }

  ${DeleteButton} + & {
    border-radius: 10px 0 0 10px;
    border-right: none;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const LabelText = styled.span`
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 16px;
`;

const Error = styled.p`
  font-size: 13px;
  color: red;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

export const Field = forwardRef<HTMLInputElement, InputProps & Props>(({
  error, label, children, deleteIcon: Icon, onDeleteClick, ...props
}, ref) => (
  <Label onClick={(e) => e.preventDefault()}>
    <LabelText>{label}</LabelText>
    {children ?? (
      Icon && onDeleteClick
        ? (
          <FieldContainer>
            <DeleteButton type="button" onClick={onDeleteClick}>
              <Icon />
            </DeleteButton>
            <StyledField ref={ref} {...props} />
          </FieldContainer>
        )
        : <StyledField ref={ref} {...props} />
    )}
    {error && <Error>{error}</Error>}
  </Label>
));
