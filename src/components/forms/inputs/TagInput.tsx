import styled from '@emotion/styled';
import {
  ChangeEventHandler, KeyboardEventHandler, useState, VFC,
} from 'react';

import { ReactComponent as DeleteIcon } from 'assets/common/delete.svg';

import { color } from 'utils/styles/theme';

interface Props {
  onChange: (value: string[]) => void;
  onBlur: () => void;
  value: string[];
  name: string;
  id?: string;
}

const StyledField = styled.input`
  flex: 1;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  border: none;
  padding: 5px 10px;
  min-width: 0;
  background-color: ${color('backgroundInput')};

  &::placeholder {
    color: ${color('textalt')};
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
`;

const Tag = styled.span`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${color('backgroundAltHover')};
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
`;

const TagDeleteButton = styled.button`
  border-radius: 50%;
  border: none;
  display: flex;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  padding: 5px;
  background-color: ${color('backgroundAlt')};
  color: ${color('text')};
`;

const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px solid ${color('textalt')};
  background-color: ${color('backgroundInput')};
`;

export const TagInput: VFC<Props> = ({
  onBlur, onChange, name, value, id, ...props
}) => {
  const [internalValue, setInternalValue] = useState<string>('');

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    const data = internalValue.trim();

    if (data.length > 0 && [',', 'Enter'].includes(event.key) && !value.includes(data)) {
      event.preventDefault();
      onChange([...value, data]);
      setInternalValue('');
    }

    if (data.length === 0 && event.key === 'Backspace') {
      event.preventDefault();
      onChange(value.slice(0, -1));
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInternalValue(event.currentTarget.value);
  };

  const deleteTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <TagsContainer>
      {value.map((tag) => (
        <Tag key={tag}>
          {tag}
          <TagDeleteButton aria-label={tag} type="button" onClick={() => deleteTag(tag)}>
            <DeleteIcon />
          </TagDeleteButton>
        </Tag>
      ))}

      <StyledField
        {...props}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={internalValue}
        name={name}
        onBlur={onBlur}
        placeholder="Podaj tag..."
        enterKeyHint="next"
        id={id}
      />
    </TagsContainer>
  );
};
