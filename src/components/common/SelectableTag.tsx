import styled from '@emotion/styled/macro';
import { FC } from 'react';

interface Props {
  selected?: boolean;
  onClick?: () => void;
}

const Tag = styled.div<Pick<Props, 'selected'>>`
  color: ${(props) => props.theme.colors.primary};
  background-color: ${(props) => (props.selected ? props.theme.colors.backgroundhover : props.theme.colors.backgroundalt)};
  border: 1px solid ${(props) => (props.selected ? props.theme.colors.primary : props.theme.colors.background2)};
  padding: 5px 10px;
  border-radius: 10px;
`;

export const SelectableTag: FC<Props> = ({ onClick, selected, children }) => (
  <Tag onClick={onClick} selected={selected}>{children}</Tag>
);
