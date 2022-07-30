import styled from '@emotion/styled';
import { FC } from 'react';

import { color } from 'utils/styles/theme';

interface Props {
  selected?: boolean;
  onClick?: () => void;
  label: string;
  icon: string;
}

const Tag = styled.label<Pick<Props, 'selected'>>`
  color: ${color('primary')};
  background-color: ${(props) => (props.selected ? props.theme.colors.backgroundHover : props.theme.colors.backgroundAlt)};
  border: 1px solid ${(props) => (props.selected ? props.theme.colors.primary : props.theme.colors.backgroundAlt)};
  padding: 5px 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  position: relative;
`;

const TagIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  margin-right: 10px;
`;

const HiddenInput = styled.input`
  width: 0;
  height: 0;

  &::after {
    display: block;
    content: '';
    inset: 0;
    position: absolute;
  }

  &:focus-visible::after {
    border-radius: 10px;
    outline: 2px solid ${color('primary')};
  }
`;

export const SelectableTag: FC<Props> = ({
  onClick, selected, label, icon,
}) => (
  <Tag
    selected={selected}
  >
    <HiddenInput
      type="checkbox"
      onChange={onClick}
      checked={selected}
    />

    <TagIcon src={icon} />
    {label}
  </Tag>

);
