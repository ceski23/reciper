import styled from '@emotion/styled';
import { VFC } from 'react';

import { Styleable } from 'types';

import { Link } from 'components/common/Link';

import { urls } from 'routing/urls';

import { color } from 'utils/styles/theme';
import { fluidTypography } from 'utils/styles/typography';

const Container = styled(Link)`
  background-color: ${color('backgroundHover')};
  border-radius: 10px;
  padding: 10px;
  color: ${color('primary')};
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
    to={urls.tags.tag({ tag: encodeURIComponent(tag) })}
  >
    {tag}
  </Container>
);
