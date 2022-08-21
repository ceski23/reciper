/* eslint-disable @typescript-eslint/no-use-before-define */
import styled from '@emotion/styled';
import type { History } from 'history';
import { EventCallback } from 'photoswipe';
import { FC, useCallback, useContext } from 'react';
import { Gallery } from 'react-photoswipe-gallery';
import PhotoSwipeLightboxStub from 'react-photoswipe-gallery/dist/lightbox-stub';
import { UNSAFE_NavigationContext } from 'react-router';

import { GalleryImage } from 'components/recipes/GalleryImage';

interface ImagesGalleryProps {
  images: string[]
}

export const ImagesGallery: FC<ImagesGalleryProps> = ({ images }) => {
  const navigator = useContext(UNSAFE_NavigationContext).navigator as History;

  const photoswipeRef = useCallback((photoswipe: PhotoSwipeLightboxStub) => {
    const unblock = navigator.block(() => {
      photoswipe.pswp.close();
      unblock();
    });

    const handleGalleryClose: EventCallback<'closingAnimationStart'> = () => {
      photoswipe.off('closingAnimationStart', handleGalleryClose);
      unblock();
    };

    photoswipe.on('closingAnimationStart', handleGalleryClose);
  }, [navigator]);

  return (
    <div>
      <h2>Galeria</h2>
      <Gallery plugins={photoswipeRef}>
        <ImagesContainer>
          {images.map((image) => (
            <GalleryImage key={image} url={image} />
          ))}
        </ImagesContainer>
      </Gallery>
    </div>
  );
};

export default ImagesGallery;

const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 20px;
`;
