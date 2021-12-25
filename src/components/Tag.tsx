import styled from '@emotion/styled';
import { VFC } from 'react';
import { reverse } from 'named-urls';
import { Link } from './Link';
import { urls } from 'urls';

const Container = styled(Link)`
  background-color: ${(props) => props.theme.colors.backgroundhover};
  border-radius: 10px;
  padding: 10px;
  color: ${(props) => props.theme.colors.primary};
  font-size: 14px;
`;

interface Props {
  tag: string;
}

export const Tag: VFC<Props> = ({ tag }) => (
  <Container to={reverse(urls.tags, { tag: encodeURIComponent(tag) })}>
    {tag}
  </Container>
);
