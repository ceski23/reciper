import styled from '@emotion/styled/macro';
import { reverse } from 'named-urls';
import { useRef, useState, VFC } from 'react';
import { useNavigate } from 'react-router';

import { ReactComponent as LinkIcon } from 'assets/common/link.svg';
import { ReactComponent as PencilIcon } from 'assets/common/pencil.svg';

import { FluidContainer } from 'components/common/Container';
import { Link } from 'components/common/Link';
import { ScreenHeader } from 'components/common/ScreenHeader';
import { SettingsListItem } from 'components/settings/SettingsListItem';

import { urls } from 'routing/urls';

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  a {
    text-decoration: none;
    color: unset;
  }
`;

const UrlInput = styled.input`
  flex: 1;
  margin-right: 10px;
  padding: 5px 10px;
  border-radius: 7px;
  border: 1px solid ${(props) => props.theme.colors.backgroundalt};
`;

const Option = styled(SettingsListItem)`
  cursor: pointer;
`;

const FindButton = styled.button`
  border: 0px;
  background-color: ${(props) => props.theme.colors.background2};
  padding: 5px 10px;
  border-radius: 7px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.backgroundhover};
  }
`;

export const NewRecipeScreen: VFC = () => {
  const [showUrlInput, setShowUrlInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleUrlOptionClick = () => {
    setShowUrlInput(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleFindClick = () => {
    navigate(reverse(urls.recipes.recipeByUrl, {
      recipeUrl: encodeURIComponent(url),
    }));
  };

  return (
    <FluidContainer>
      <ScreenHeader title="Nowy przepis" />

      <OptionsList>
        <Option
          text={!showUrlInput ? 'Podaj adres URL przepisu' : undefined}
          icon={LinkIcon}
          onClick={handleUrlOptionClick}
        >
          <form style={{ width: '100%', display: 'flex' }}>
            <UrlInput
              type="url"
              ref={inputRef}
              placeholder="Podaj adres URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <FindButton type="submit" onClick={handleFindClick}>SZUKAJ</FindButton>
          </form>
        </Option>

        <Link to={urls.recipes.new.manual}>
          <Option text="Dodaj przepis ręcznie" icon={PencilIcon} />
        </Link>
      </OptionsList>
    </FluidContainer>
  );
};
