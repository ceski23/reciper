import styled from '@emotion/styled';
import { VFC } from 'react';
import { Searchbar } from 'components/Searchbar';
import { UserAvatar } from 'components/UserAvatar';
import {
  selectAllTags, selectRecipes,
} from 'features/recipes';
import { useAppSelector } from 'hooks/store';
import { RecipeListItem } from 'components/RecipeListItem';
import { selectUserInfo } from 'features/user';
import { Link } from 'components/Link';
import { urls } from 'urls';
import { Tag } from 'components/Tag';
import { ScreenContainer } from './ScreenContainer';

const Header = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
`;

const WelcomeText = styled('h1')`
  font-weight: 700;
  font-size: 1.7rem;
  margin: 0;
`;

const StyledSearchBar = styled(Searchbar)`
  margin-top: 20px;
`;

const RecipesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: -10px;
  margin-right: -10px;
  margin-top: 30px;

  & > * {
    text-align: center;
    flex: 1 0 auto;
    margin-bottom: 10px;
    margin-right: 10px;
  }
`;

// https://www.kwestiasmaku.com/przepis/filety-drobiowe-w-sosie-z-gorgonzoli
// https://beszamel.se.pl/przepisy/dania-glowne-miesne/prosty-kurczak-w-sosie-slodko-kwasnym-gotowy-w-30-minut-re-iB8s-pmcM-Rz5i.html

export const HomeScreen: VFC = () => {
  const recipes = useAppSelector(selectRecipes);
  const user = useAppSelector(selectUserInfo);
  const tags = useAppSelector(selectAllTags);

  return (
    <ScreenContainer>
      <Header>
        <WelcomeText>Witaj, {user ? user.firstName : 'nieznajomy'}!</WelcomeText>
        <Link to={urls.settings.toString()}>
          <UserAvatar src={user?.image} />
        </Link>
      </Header>

      <StyledSearchBar />

      {tags.length > 0 && (
        <Tags>
          {tags.map((tag) => <Tag key={tag} tag={tag} />)}
        </Tags>
      )}

      <h2 style={{ marginTop: 50 }}>Twoje przepisy</h2>
      <RecipesList>
        {Object.values(recipes).reverse().map((recipe) => (
          <RecipeListItem recipe={recipe} key={recipe.url} />
        ))}
      </RecipesList>
    </ScreenContainer>
  );
};
