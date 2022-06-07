import styled from '@emotion/styled';
import { useDebouncedFn } from 'beautiful-react-hooks';
import React from 'react';

import { ReactComponent as LoupeIcon } from 'assets/common/loupe.svg';

import { color } from 'utils/styles/theme';

const Input = styled('input')`
  border-radius: 15px;
  padding: 15px;
  padding-left: 50px;
  border: none;
  box-shadow: 0px 2px 3px ${color('shadow')};
  font-family: inherit;
  width: 100%;
  font-size: 1rem;
  background-color: ${color('backgroundInput')};
  color: ${color('textalt')};
  font-weight: 600;

  &::placeholder {
    color: ${color('textalt')};
    font-weight: 600;
  }

  &:focus {
    outline: 2px solid ${color('primary')};
  }
`;

const Wrapper = styled('div')`
  position: relative;
`;

const SearchIcon = styled(LoupeIcon)`
  position: absolute;
  left: 15px;
  bottom: 15px;
  width: 20px;
  height: 20px;
  fill: ${color('textalt')};
`;

interface Props {
  className?: string;
  onDebouncedChange?: (query: string) => void;
  onChange?: (query: string) => void;
  onClick?: React.MouseEventHandler<HTMLElement>;
  value: string;
}

export const Searchbar = React.forwardRef<HTMLInputElement, Props>(
  ({
    className, onChange, onClick, value, onDebouncedChange,
  }, ref) => {
    const debouncedOnChange = useDebouncedFn(onDebouncedChange ?? (() => {}), 500, undefined, []);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      debouncedOnChange(event.currentTarget.value);
      onChange?.(event.currentTarget.value);
    };

    return (
      <Wrapper className={className} onClick={onClick}>
        <Input
          placeholder="Search for recipes"
          onChange={handleChange}
          value={value}
          ref={ref}
        />
        <SearchIcon />
      </Wrapper>
    );
  },
);
