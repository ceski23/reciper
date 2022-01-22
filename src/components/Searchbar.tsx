import styled from '@emotion/styled/macro';
import { transparentize } from 'polished';
import React from 'react';
import { ReactComponent as LoupeIcon } from 'assets/loupe.svg';
import { useDebouncedFn } from 'beautiful-react-hooks';

const Input = styled('input')`
  border-radius: 15px;
  padding: 15px;
  padding-left: 50px;
  border: none;
  box-shadow: 0 0 15px ${(props) => transparentize(0.9, props.theme.colors.shadow)};
  font-family: Raleway, sans-serif;
  width: 100%;
  font-size: 1rem;

  &::placeholder {
    color: ${(props) => props.theme.colors.textalt};
  }

  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.primary};
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
  fill: ${(props) => props.theme.colors.textalt};
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
