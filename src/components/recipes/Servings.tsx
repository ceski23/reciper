import styled from '@emotion/styled';
import IntlMessageFormat from 'intl-messageformat';
import { transparentize } from 'polished';
import { VFC } from 'react';

import { Button } from 'components/common/Button';

import { color } from 'utils/styles/theme';

interface Props {
  servings: number;
  onServingsChange: (servings: number) => void;
}

const StyledButton = styled(Button)`
  box-shadow: none;
  border-radius: 10px;
  min-width: auto;
  font-size: 25px;
  font-weight: 700;
  padding: 5px 15px;
  background-color: ${color('primaryHighlight')};
`;

const Container = styled.div`
  background-color: ${(props) => transparentize(0.9, props.theme.colors.primary)};
  padding: 10px 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
`;

const Text = styled.p`
  font-weight: 700;
  flex: 1;
  text-align: center;
`;

export const servingsText = new IntlMessageFormat(`
  {quantity, plural,
    one {# porcja}
    few {# porcje}
    many {# porcji}
    other {# porcji}
  }
`, 'pl-PL');

export const Servings: VFC<Props> = ({ servings, onServingsChange }) => {
  const decreaseServings = () => {
    onServingsChange(Math.max(1, servings - 1));
  };

  const increaseServings = () => {
    onServingsChange(servings + 1);
  };

  return (
    <Container>
      <StyledButton onClick={decreaseServings}>-</StyledButton>

      <Text>
        {servingsText.format({ quantity: servings })}
      </Text>

      <StyledButton onClick={increaseServings}>+</StyledButton>
    </Container>
  );
};
