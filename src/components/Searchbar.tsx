import styled from '@emotion/styled';
import { transparentize } from 'polished';
import React, { VFC } from 'react';
import { ReactComponent as LoupeIcon } from 'assets/loupe.svg';
import { useNavigate } from 'react-router';
import { reverse } from 'named-urls';
import { urls } from 'urls';

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
}

export const Searchbar: VFC<Props> = ({ className }) => {
  const navigate = useNavigate();

  const handleChange: React.FocusEventHandler<HTMLInputElement> = (event) => {
    const url = reverse(urls.recipe, {
      recipeUrl: encodeURIComponent(event.currentTarget.value),
    });

    if (event.currentTarget.value) navigate(url);
  };

  return (
    <Wrapper>
      <Input placeholder="Search for recipes" className={className} onBlur={handleChange} />
      <SearchIcon />
    </Wrapper>
  );
};
