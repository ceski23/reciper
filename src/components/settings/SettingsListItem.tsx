/** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react/macro';
import styled from '@emotion/styled/macro';
import React, { FC } from 'react';
import { Styleable } from 'types';

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundhover};
  border-radius: 10px;
  padding: 26px 20px;
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
  margin: 0;
`;

export const iconStyles = ({ theme }: { theme: Theme }) => css`
  margin-right: 20px;
  width: 25px;
  fill: ${theme.colors.textalt};
`;

interface Props {
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | string;
  text?: string;
  onClick?: () => void;
}

export const SettingsListItem: FC<Props & Styleable> = ({
  icon: Icon, text, children, onClick, className,
}) => (
  <Container onClick={onClick} className={className}>
    {Icon && (typeof Icon === 'string' ? (
      <img src={Icon} alt="" css={(theme) => iconStyles({ theme })} />
    ) : (
      <Icon css={(theme) => iconStyles({ theme })} />
    ))}
    {text ? <Text>{text}</Text> : children}
  </Container>
);
