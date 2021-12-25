/** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import React, { VFC } from 'react';

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundhover};
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.background2};
  }
`;

const Text = styled.p`
  color: currentColor;
`;

export const iconStyles = ({ theme }: { theme: Theme }) => css`
  margin-right: 20px;
  width: 25px;
  fill: ${theme.colors.textalt};
`;

interface Props {
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | string;
  text: string;
}

export const SettingsListItem: VFC<Props> = ({ icon: Icon, text }) => (
  <Container>
    {Icon && (typeof Icon === 'string' ? (
      <img src={Icon} alt="" css={(theme) => iconStyles({ theme })} />
    ) : (
      <Icon css={(theme) => iconStyles({ theme })} />
    ))}
    <Text>{text}</Text>
  </Container>
);
