import styled from '@emotion/styled/macro';
import React, { VFC } from 'react';
import { ReactComponent as UserPlaceholder } from 'assets/user.svg';

const Image = styled('img')`
  width: 40px;
  height: 40px;
  border-radius: 10px;
`;

const FallbackImage = styled(UserPlaceholder)`
  background-color: ${(props) => props.theme.colors.backgroundhover};
  width: 40px;
  height: 40px;
  border-radius: 10px;
  padding: 10px;
  fill: ${(props) => props.theme.colors.textalt};
`;

type ImageProps = React.DetailedHTMLProps<
React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement
>;

export const UserAvatar: VFC<ImageProps> = ({ src, ...props }) => (
  src ? <Image src={src} {...props} /> : <FallbackImage />
);
