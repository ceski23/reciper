import styled from '@emotion/styled/macro';
import { FC } from 'react';
import { Provider } from 'services/recipes/providers';
import { fluidTypography } from 'utils/typography';

interface Props {
  recipeUrl: string;
  provider: Provider;
}

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const Name = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 600;
  ${({ theme }) => fluidTypography(
    theme.breakpoints.small,
    theme.breakpoints.xlarge,
    16,
    20,
  )}
`;

const Container = styled.a`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const RecipeProvider: FC<Props> = ({ recipeUrl, provider }) => (
  <Container href={recipeUrl} target="_blank">
    {provider.icon && <Icon src={provider.icon} />}
    <Name>{provider.name || 'Strona przepisu'}</Name>
  </Container>
);
