import styled from '@emotion/styled/macro';
import { FC } from 'react';

import { color } from 'utils/styles/theme';

interface Props {
  selected?: boolean;
  onClick?: () => void;
}

const Tag = styled.div<Pick<Props, 'selected'>>`
  color: ${color('primary')};
  background-color: ${(props) => (props.selected ? props.theme.colors.backgroundHover : props.theme.colors.backgroundAlt)};
  border: 1px solid ${(props) => (props.selected ? props.theme.colors.primary : props.theme.colors.backgroundAlt)};
  padding: 5px 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SelectableTag: FC<Props> = ({ onClick, selected, children }) => (
  <Tag onClick={onClick} selected={selected}>{children}</Tag>
);
