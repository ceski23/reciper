import styled from '@emotion/styled/macro';
import { VFC } from 'react';
import { reverse } from 'named-urls';
import { urls } from 'urls';
import { Styleable } from 'types';
import { fluidTypography } from 'utils/typography';
import { Link } from '../Link';

const Container = styled(Link)`
  background-color: ${(props) => props.theme.colors.backgroundhover};
  border-radius: 10px;
  padding: 10px;
  color: ${(props) => props.theme.colors.primary};
  ${({ theme }) => fluidTypography(
    theme.breakpoints.small,
    theme.breakpoints.xlarge,
    14,
    16,
  )}
`;

interface Props {
  tag: string;
}

export const Tag: VFC<Props & Styleable> = ({ tag, className }) => (
  <Container
    className={className}
    to={reverse(urls.tags.tag, { tag: encodeURIComponent(tag) })}
  >
    {tag}
  </Container>
);
