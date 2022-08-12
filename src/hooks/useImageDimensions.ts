import { useLayoutEffect, useState } from 'react';

interface Dimensions {
  width: number;
  height: number;
}

export const useImageDimensions = (imageUrl: string): Dimensions | undefined => {
  const [dimensions, setDimensions] = useState<Dimensions>();

  useLayoutEffect(() => {
    let image: HTMLImageElement | null;
    image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      if (image) {
        setDimensions({
          width: image.naturalWidth,
          height: image.naturalHeight,
        });
        image = null;
      }
    };
  }, [imageUrl]);

  return dimensions;
};
