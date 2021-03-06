/* eslint-disable react/require-default-props */
import styled from '@emotion/styled';

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

const CheckboxInput = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: 4px solid ${color('background')};
  background-color: ${color('background')};
  align-self: center;
  box-shadow: 0 0 1px ${color('shadow')};

  &:checked {
    background-color: ${color('textalt')};
  }
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
  name: string;
  onChange: (value: boolean) => void;
  checked: boolean;
}

export const CheckboxSetting = ({
  name, onChange, checked, title, hint,
}: Props) => (
  <Container>
    <InfoContainer>
      {title && <Label>{title}</Label>}
      {hint && <Hint>{hint}</Hint>}
    </InfoContainer>
    <CheckboxInput type="checkbox" name={name} checked={checked} onChange={(event) => onChange(event.currentTarget.checked)} />
  </Container>
);
