import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { animated, useSpring } from '@react-spring/web';
import { VFC } from 'react';
import { Link, LinkProps, useNavigate } from 'react-router-dom';

import { ReactComponent as BackIcon } from 'assets/common/left-arrow.svg';

const Header = styled(animated.div)`
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
  id?: string;
}

export const ScreenHeader: VFC<Props> = ({ title, backLink, id }) => {
  const navigate = useNavigate();

  const animation = useSpring({
    from: { opacity: 0, x: 50 },
    to: { opacity: 1, x: 0 },
  });

  return (
    <Header style={animation}>
      {backLink !== false && backLink ? (
        <BackLink to={backLink}><BackIcon /></BackLink>
      ) : (
        <BackButton onClick={() => navigate(-1)}><BackIcon /></BackButton>
      )}

      <h1 id={id}>{title}</h1>
    </Header>
  );
};
