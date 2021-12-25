import styled from '@emotion/styled';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import React, { VFC } from 'react';
import { Styleable } from 'types';
import { FullBleed } from './Container';

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

const Container = styled(FullBleed)`
  overflow: hidden;
`;

const CoverDecoration = styled.div`
  width: 100%;
  height: 20px;
  margin-top: -20px;
  background-color: ${(props) => props.theme.colors.background};
  z-index: 1;
  position: absolute;
  border-radius: 20px 20px 0 0;
`;

export const RecipeCover: VFC<Props & Styleable> = ({ src, ...props }) => {
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, (val) => val / 2);

  return (
    <Container>
      <Image src={src} style={{ y }} {...props} />
      <CoverDecoration />
    </Container>
  );
};
