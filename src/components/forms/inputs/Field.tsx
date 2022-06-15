import styled from '@emotion/styled';
import React, { forwardRef } from 'react';

import { color } from 'utils/styles/theme';

const DeleteButton = styled.button`
  border-radius: 0 10px 10px 0;
  border: 1px solid ${color('textalt')};
  padding: 8px 10px;
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

const StyledField = styled.input`
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px solid ${color('textalt')};
  background-color: ${color('backgroundInput')};
  color: ${color('textalt')};
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

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const LabelText = styled.label`
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 16px;
`;

const Error = styled.p`
  font-size: 13px;
  color: red;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const Required = styled.i`
  color: #ff0000;
`;

export type InputProps =
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type FieldProps = Pick<InputProps, 'id' | 'aria-invalid' | 'aria-required' | 'aria-describedby'>;

interface Props {
  label?: string;
  error?: string;
  deleteIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  onDeleteClick?: () => void;
  required?: boolean;
  id: string;
  render?: (fieldProps: FieldProps) => React.ReactNode;
}

export const Field = forwardRef<HTMLInputElement, InputProps & Props>(({
  error,
  label,
  children,
  deleteIcon: Icon,
  onDeleteClick,
  required = false,
  id,
  render,
  ...props
}, ref) => (
  <FieldContainer>
    {label && (
      <LabelText htmlFor={id}>
        {label}
        {required && <Required aria-hidden>*</Required>}
      </LabelText>
    )}

    {render ? render({
      id,
      'aria-invalid': !!error,
      'aria-required': required,
      'aria-describedby': error ? `${id}-error` : undefined,
    }) : (
      <InputContainer>
        {Icon && onDeleteClick && (
          <DeleteButton type="button" onClick={onDeleteClick}>
            <Icon />
          </DeleteButton>
        )}

        <StyledField
          id={id}
          aria-invalid={!!error}
          aria-required={required}
          aria-describedby={error ? `${id}-error` : undefined}
          ref={ref}
          {...props}
        />
      </InputContainer>
    )}

    {error && <Error role="alert" id={`${id}-error`}>{error}</Error>}
  </FieldContainer>
));
