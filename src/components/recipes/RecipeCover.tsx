import styled from '@emotion/styled';
import { VFC } from 'react';

import { Styleable } from 'types';

import { ReactComponent as DishIcon } from 'assets/recipes/dish.svg';

import { fullBleedStyles } from 'components/common/Container';
import { Image } from 'components/common/Image';

import { media } from 'utils/styles/mediaQueries';
import { color } from 'utils/styles/theme';

interface Props {
  src?: string;
}

const RecipeImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 300px;
  background-color: ${color('backgroundAlt')};
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${color('backgroundAlt')};
  color: ${color('textalt')};
  display: flex;
  align-items: center;
  justify-content: center;

  & > * {
    width: 200px;
    max-width: 80%;
  }
`;

const Container = styled.div`
  overflow: hidden;
  height: 400px;
  border-radius: 30px;
  position: relative;

  ${media.down('medium')} {
    && {
      ${fullBleedStyles}
      border-radius: 0;
      /* margin-bottom: -50px; */
    }
  }
`;

const CoverDecoration = styled.div`
  width: 100%;
  height: 20px;
  margin-top: -20px;
  background-color: ${color('background')};
  z-index: 1;
  position: absolute;
  border-radius: 20px 20px 0 0;
  display: none;

  ${media.down('medium')} {
    display: block;
  }
`;

export const RecipeCover: VFC<Props & Styleable> = ({ src, ...props }) => (
  <Container>
    <RecipeImage
      src={src}
      fallback={(
        <Placeholder>
          <DishIcon />
        </Placeholder>
      )}
      {...props}
    />
    <CoverDecoration />
  </Container>
);
