import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { VFC } from 'react';
import { Link, LinkProps, useNavigate } from 'react-router-dom';

import { ReactComponent as BackIcon } from 'assets/common/left-arrow.svg';

const Header = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const backlinkStyles = ({ theme }: { theme: Theme }) => css`
  width: 30px;
  height: 30px;
  color: ${theme.colors.textalt};
  margin-right: 20px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const BackLink = styled(Link)(backlinkStyles);
const BackButton = styled.button(backlinkStyles);

interface Props {
  backLink?: LinkProps['to'] | false;
  title: string;
}

export const ScreenHeader: VFC<Props> = ({ title, backLink }) => {
  const navigate = useNavigate();

  return (
    <Header
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.2 }}
    >
      {backLink !== false && backLink ? (
        <BackLink to={backLink}><BackIcon /></BackLink>
      ) : (
        <BackButton onClick={() => navigate(-1)}><BackIcon /></BackButton>
      )}

      <h1>{title}</h1>
    </Header>
  );
};
