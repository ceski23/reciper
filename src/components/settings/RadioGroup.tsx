/* eslint-disable react/require-default-props */
import styled from '@emotion/styled';
import React from 'react';

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  background-color: ${(props) => props.theme.colors.backgroundhover};
  border-radius: 20px;
  padding: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const RadioInput = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 4px solid ${(props) => props.theme.colors.background};
  background-color: ${(props) => props.theme.colors.background};
  margin-right: 10px;
  box-shadow: 0 0 1px ${(props) => props.theme.colors.shadow};

  &:checked {
    background-color: ${(props) => props.theme.colors.textalt};
  }
`;

const RadioLabel = styled.label`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const Hint = styled.p`
  font-size: 12px;
  line-height: 1.4;
  margin-top: -5px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.textalt};
`;

interface Props<T extends string | number> {
  title?: string;
  hint?: string;
  name: string;
  onSelected: (value: T) => void;
  options: Array<{
    text: string,
    value: T
  }>;
  value: T | undefined;
}

// eslint-disable-next-line @typescript-eslint/comma-dangle
export const RadioGroup = <T extends string | number>({
  name, onSelected, options, value, title, hint,
}: Props<T>) => (
  <Container>
    {title && <h3>{title}</h3>}

    {hint && <Hint>{hint}</Hint>}

    <RadioContainer>
      {options.map((option) => (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <RadioLabel key={option.value}>
          <RadioInput
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onSelected(option.value)}
          />
          {option.text}
        </RadioLabel>
      ))}
    </RadioContainer>
  </Container>
  );
