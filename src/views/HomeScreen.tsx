import styled from '@emotion/styled/macro';
import { VFC } from 'react';
import { Searchbar } from 'components/Searchbar';
import { UserAvatar } from 'components/UserAvatar';
import { selectAllTags, selectRecipes } from 'features/recipes';
import { useAppSelector } from 'hooks/store';
import { selectUserInfo } from 'features/user';
import { Link } from 'components/Link';
import { urls } from 'urls';
import { Tag } from 'components/recipe/Tag';
import { LinkButton } from 'components/LinkButton';
import { RecipeTile } from 'components/RecipeTile';
import { motion } from 'framer-motion';
import { slideUp, staggeredGrid } from 'animations';
import { media } from 'utils/mediaQueries';
import { FluidContainer } from 'components/Container';
import { useNavigate } from 'react-router';

const Header = styled(motion.div)`
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

const RecipesList = styled(motion.div)`
  display: grid;
  column-gap: 40px;
  row-gap: 50px;
  padding-bottom: 20px;
  grid-template-columns: repeat(auto-fit, 190px);

  ${media.down('small')} {
    grid-template-columns: repeat(2, 1fr);
  }
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

const AnimatedRecipeTile = motion(RecipeTile);

// https://www.kwestiasmaku.com/przepis/filety-drobiowe-w-sosie-z-gorgonzoli
// https://beszamel.se.pl/przepisy/dania-glowne-miesne/prosty-kurczak-w-sosie-slodko-kwasnym-gotowy-w-30-minut-re-iB8s-pmcM-Rz5i.html

export const HomeScreen: VFC = () => {
  const recipes = useAppSelector(selectRecipes);
  const user = useAppSelector(selectUserInfo);
  const tags = useAppSelector(selectAllTags);
  const navigate = useNavigate();

  const handleSearchbarClick: React.MouseEventHandler<HTMLElement> = () => {
    navigate(urls.search);
  };

  return (
    <FluidContainer>
      <Header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <WelcomeText>
          Witaj, {user ? user.firstName : 'nieznajomy'}!
        </WelcomeText>
        <Link to={urls.settings.toString()}>
          <UserAvatar src={user?.image} />
        </Link>
      </Header>

      <StyledSearchBar value="" onClick={handleSearchbarClick} />

      <h2 style={{ marginTop: 50 }}>Ostatnio dodane</h2>
      <RecipesList variants={staggeredGrid} initial="hidden" animate="show">
        {Object.values(recipes).slice(0, 6).reverse().map((recipe) => (
          <AnimatedRecipeTile recipe={recipe} key={recipe.url} variants={slideUp} />
        ))}
      </RecipesList>

      <LinkButton to={String(urls.recipes)} style={{ marginTop: 30 }}>
        Wszystkie przepisy
      </LinkButton>

      {tags.length > 0 && (
        <>
          <h2 style={{ marginTop: 50 }}>Tagi</h2>
          <Tags>
            {tags.map((tag) => <Tag key={tag} tag={tag} />)}
          </Tags>
        </>
      )}
    </FluidContainer>
  );
};
