import styled from '@emotion/styled';
import { animated, useSpring } from '@react-spring/web';
import { VFC } from 'react';
import { useNavigate } from 'react-router';

import { FluidContainer } from 'components/common/Container';
import { Link } from 'components/common/Link';
import { LinkButton } from 'components/common/LinkButton';
import { Searchbar } from 'components/common/Searchbar';
import { UserAvatar } from 'components/common/UserAvatar';
import { RecipesCarousel } from 'components/recipes/RecipesCarousel';
import { RecipesList } from 'components/recipes/RecipesList';
import { Tag } from 'components/recipes/Tag';

import { useAppSelector } from 'hooks/store';

import { urls } from 'routing/urls';

import {
  selectHighestRatedRecipes, selectLatestRecipes, selectMostFrequentTags,
} from 'store/recipes';
import { selectUserInfo } from 'store/user';

const Header = styled(animated.div)`
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

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20px;
  margin-right: -10px;

  & > * {
    text-align: center;
    flex: 1 0 auto;
    margin-bottom: 10px;
    margin-right: 10px;
  }
`;

const Container = styled(FluidContainer)`
  padding-bottom: 50px;
`;

export const HomeScreen: VFC = () => {
  const user = useAppSelector(selectUserInfo);
  const latestRecipes = useAppSelector(selectLatestRecipes);
  const mostFrequentTags = useAppSelector(selectMostFrequentTags);
  const highestRatedRecipes = useAppSelector(selectHighestRatedRecipes);
  const navigate = useNavigate();

  const headerAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <Container>
      <Header style={headerAnimation}>
        <WelcomeText>
          Witaj, {user ? user.firstName : 'nieznajomy'}!
        </WelcomeText>
        <Link to={urls.settings.account()}>
          <UserAvatar src={user?.image} />
        </Link>
      </Header>

      <StyledSearchBar value="" onClick={() => navigate(urls.search())} />

      <h2 style={{ marginTop: 50 }} id="recently-added">Ostatnio dodane</h2>
      <RecipesCarousel recipes={latestRecipes} />

      <LinkButton to={urls.recipes()} style={{ marginTop: 30 }}>
        Zobacz wszystkie
      </LinkButton>

      {mostFrequentTags.length > 0 && (
        <>
          <h2 style={{ marginTop: 50 }}>Najczęstsze tagi</h2>
          <Tags>
            {mostFrequentTags.map((tag) => <Tag key={tag} tag={tag} />)}
          </Tags>
        </>
      )}

      <h2 id="highest-rated">Najwyżej oceniane</h2>
      <RecipesList recipes={highestRatedRecipes} view="list" />

      <LinkButton to={urls.recipes()} style={{ marginTop: 30 }}>
        Wszystkie przepisy
      </LinkButton>
    </Container>
  );
};
