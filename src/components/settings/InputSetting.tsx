/* eslint-disable react/require-default-props */
import styled from '@emotion/styled';
import { ChangeEvent } from 'react';

import { Field } from 'components/forms/inputs/Field';

import { color } from 'utils/styles/theme';

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

const Input = styled(Field)`
  width: 70px;
  height: 40px;
  align-self: center;
`;

const Hint = styled.p`
  font-size: 12px;
  line-height: 1.4;
  margin-top: -10px;
  color: ${color('textalt')};
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
  id: string;
}

export const InputSetting = ({
  onChange, value, title, hint, type, id,
}: Props) => (
  <Container>
    <InfoContainer>
      {title && <Label>{title}</Label>}
      {hint && <Hint>{hint}</Hint>}
    </InfoContainer>
    <div>
      <Input
        id={id}
        type={type}
        min={0}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.currentTarget.value)}
      />
    </div>
  </Container>
);
