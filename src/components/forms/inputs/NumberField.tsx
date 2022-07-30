import styled from '@emotion/styled';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { Input } from 'components/common/Input';

import { color } from 'utils/styles/theme';

interface NumberFieldProps {
  step?: number;
  onChange: (value: number) => void;
  value?: number;
}

const StepperContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const StyledInput = styled(Input)`
  flex: 1;
  border-left: none;
  border-right: none;
  border-radius: 0;
  text-align: center;
`;

const InputButton = styled.button`
  border: 1px solid ${color('textalt')};
  padding: 8px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${color('backgroundAltHover')};
  color: ${color('textalt')};
  cursor: pointer;
  font-weight: 700;
  font-size: 20px;

  &:hover {
    background-color: ${color('backgroundAlt')};
  }

  svg {
    width: 15px;
    height: 15px;
  }
`;

type InputProps = Omit<ComponentPropsWithoutRef<'input'>, keyof NumberFieldProps>;

const normalizeNumber = (value: string, fallback?: number): number => {
  const newNumber = Number(value);
  const newValue = Number.isNaN(newNumber) ? (fallback ?? 0) : newNumber;

  return newValue;
};

export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps & InputProps>(({
  onChange, value = 0, step = 1, ...props
}, ref) => {
  const handleChange = (rawValue: string) => {
    const newNumber = normalizeNumber(rawValue, Number(value));
    onChange(newNumber);
  };

  return (
    <StepperContainer>
      <InputButton
        type="button"
        onClick={() => handleChange(String(value - step))}
        style={{ borderRadius: '10px 0 0 10px' }}
      >-
      </InputButton>

      <StyledInput
        ref={ref}
        value={value}
        onChange={(e) => handleChange(e.currentTarget.value)}
        type="text"
        inputMode="numeric"
        {...props}
      />

      <InputButton
        type="button"
        onClick={() => handleChange(String(value + step))}
        style={{ borderRadius: '0 10px 10px 0' }}
      >+
      </InputButton>
    </StepperContainer>
  );
});
