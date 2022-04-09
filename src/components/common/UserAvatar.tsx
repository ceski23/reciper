import styled from '@emotion/styled/macro';
import React, { VFC } from 'react';

import { ReactComponent as UserPlaceholder } from 'assets/common/user.svg';

import { color } from 'utils/styles/theme';

const Image = styled('img')`
  width: 40px;
  height: 40px;
  border-radius: 10px;
`;

const FallbackImage = styled(UserPlaceholder)`
  background-color: ${color('backgroundhover')};
  width: 40px;
  height: 40px;
  border-radius: 10px;
  padding: 10px;
  fill: ${color('textalt')};
`;

type ImageProps = React.DetailedHTMLProps<
React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement
>;

export const UserAvatar: VFC<ImageProps> = ({ src, ...props }) => (
  src ? <Image src={src} {...props} /> : <FallbackImage />
);
