import styled from '@emotion/styled/macro';
import { fullBleedStyles } from 'components/Container';
import { motion } from 'framer-motion';
import { VFC } from 'react';
import { Styleable } from 'types';
import { media } from 'utils/mediaQueries';

interface Props {
  src?: string;
}

const Image = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 300px;
  background-color: ${(props) => props.theme.colors.primary};
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
      margin-bottom: -50px;
    }
  }
`;

const CoverDecoration = styled.div`
  width: 100%;
  height: 20px;
  margin-top: -22px;
  background-color: ${(props) => props.theme.colors.background};
  z-index: 1;
  position: absolute;
  border-radius: 20px 20px 0 0;
  display: none;

  ${media.down('medium')} {
    display: block;
  }
`;

// eslint-disable-next-line arrow-body-style
export const RecipeCover: VFC<Props & Styleable> = ({ src, ...props }) => {
  // const { scrollY } = useViewportScroll();
  // const y = useTransform(scrollY, (val) => val / 2);

  return (
    <Container>
      <Image src={src} style={{/* y */}} {...props} />
      <CoverDecoration />
    </Container>
  );
};
