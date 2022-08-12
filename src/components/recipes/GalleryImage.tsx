/* eslint-disable @typescript-eslint/no-use-before-define */
import styled from '@emotion/styled';
import { FC } from 'react';
import { Item } from 'react-photoswipe-gallery';

import { useImageDimensions } from 'hooks/useImageDimensions';

interface GalleryImageProps {
  url: string;
}

export const GalleryImage: FC<GalleryImageProps> = ({ url }) => {
  const dimensions = useImageDimensions(url);

  return (
    <Item
      original={url}
      thumbnail={url}
      key={url}
      width={dimensions?.width}
      height={dimensions?.height}
      cropped
    >
      {({ ref, open }) => (
        <ImageThumbnail
          ref={ref as React.MutableRefObject<HTMLImageElement>}
          onClick={open}
          src={url}
        />
      )}
    </Item>
  );
};

const ImageThumbnail = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
`;
