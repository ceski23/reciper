/* eslint-disable jsx-a11y/alt-text */
import {
  ComponentProps, FC, ReactElement, ReactEventHandler, useState,
} from 'react';

interface ImageProps extends ComponentProps<'img'> {
  fallback?: ReactElement;
}

export const Image: FC<ImageProps> = ({ src, fallback, ...props }) => {
  const [error, setError] = useState(false);

  const handleImageError: ReactEventHandler<HTMLImageElement> = (event) => {
    setError(true);
    props.onError?.(event);
  };

  return (error || !src) ? (fallback ?? null) : (
    <img onError={handleImageError} src={src} {...props} />
  );
};
