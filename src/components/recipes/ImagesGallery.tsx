/* eslint-disable @typescript-eslint/no-use-before-define */
import styled from '@emotion/styled';
import { FC } from 'react';
import { Gallery } from 'react-photoswipe-gallery';

import { GalleryImage } from 'components/recipes/GalleryImage';

interface ImagesGalleryProps {
  images: string[]
}

export const ImagesGallery: FC<ImagesGalleryProps> = ({ images }) => (
  <div>
    <h2>Galeria</h2>
    <Gallery>
      <ImagesContainer>
        {images.map((image) => (
          <GalleryImage key={image} url={image} />
        ))}
      </ImagesContainer>
    </Gallery>
  </div>
);

export default ImagesGallery;

const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 20px;
`;
