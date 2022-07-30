/* eslint-disable @typescript-eslint/no-shadow */
import styled from '@emotion/styled';
import React, { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';

import { Input } from 'components/common/Input';

// "Improve" forwardRef types to make it generic
declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/ban-types
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

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

const Required = styled.i`
  color: #ff0000;
`;

export interface Props<T extends React.ElementType> {
  label?: string;
  error?: string;
  required?: boolean;
  id: string;
  render?: (fieldProps: RenderFieldProps<T>) => React.ReactNode;
}

type FieldProps<T extends React.ElementType> =
  Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>;

type RenderFieldProps<T extends React.ElementType> =
  Omit<FieldProps<T>, keyof Props<T>>;

export const Field = forwardRef(<T extends React.ElementType = 'input'>({
  error,
  label,
  required = false,
  id,
  render,
  ...props
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: FieldProps<T>, ref: ForwardedRef<any>) => {
  const inputProps = {
    id,
    'aria-invalid': !!error,
    'aria-required': required,
    'aria-describedby': error ? `${id}-error` : undefined,
    ref,
    ...props,
  };

  return (
    <FieldContainer>
      {label && (
        <LabelText htmlFor={id}>
          {label}
          {required && <Required aria-hidden>*</Required>}
        </LabelText>
      )}

      {render ? render(inputProps) : <Input {...inputProps} />}

      {error && <Error role="alert" id={`${id}-error`}>{error}</Error>}
    </FieldContainer>
  );
});
