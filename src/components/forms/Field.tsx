import styled from '@emotion/styled/macro';
import { forwardRef } from 'react';

export type InputProps =
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface Props {
  label: string;
  error?: string;
}

const StyledField = styled.input`
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.textalt};
  background-color: ${(props) => props.theme.colors.backgroundInput};

  &::placeholder {
    color: ${(props) => props.theme.colors.textalt};
    opacity: 1;
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

export const Field = forwardRef<HTMLInputElement, InputProps & Props>(({
  error, label, children, ...props
}, ref) => (
  <Label onClick={(e) => e.preventDefault()}>
    <LabelText>{label}</LabelText>
    {children ?? <StyledField ref={ref} {...props} />}
    {error && <Error>{error}</Error>}
  </Label>
));
