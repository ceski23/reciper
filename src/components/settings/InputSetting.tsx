/* eslint-disable react/require-default-props */
import styled from '@emotion/styled';
import React from 'react';

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Container = styled.label`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

const Input = styled.input`
  appearance: none;
  width: 70px;
  height: 40px;
  border-radius: 5px;
  border: 4px solid ${(props) => props.theme.colors.background};
  background-color: ${(props) => props.theme.colors.background};
  align-self: center;
  box-shadow: 0 0 1px ${(props) => props.theme.colors.shadow};
`;

const Hint = styled.p`
  font-size: 12px;
  line-height: 1.4;
  margin-top: -10px;
  color: ${(props) => props.theme.colors.textalt};
  margin-bottom: 0;
`;

const Label = styled.h3`
  margin-top: 0;
`;

interface Props {
  title?: string;
  hint?: string;
  onChange: (value: string) => void;
  value: string;
  type: string;
}

export const InputSetting = ({
  onChange, value, title, hint, type,
}: Props) => (
  <Container>
    <InfoContainer>
      {title && <Label>{title}</Label>}
      {hint && <Hint>{hint}</Hint>}
    </InfoContainer>
    <Input
      type={type}
      min={0}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  </Container>
);
