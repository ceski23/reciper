import imageCompression from 'browser-image-compression';
import { useCallback, useState } from 'react';

interface UseImageCompressionParams {
  /** Max image size in MB */
  maxSize: number
}

export const useImageCompression = ({
  maxSize = Number.POSITIVE_INFINITY,
}: UseImageCompressionParams) => {
  const [progress, setProgress] = useState(0);

  const handleProgress = (value: number) => {
    setProgress(value);
  };

  const compressImage = useCallback(async (imageFile: File) => {
    const compressedFile = await imageCompression(imageFile, {
      useWebWorker: true,
      maxSizeMB: maxSize,
      fileType: 'image/jpeg',
      onProgress: handleProgress,
    });

    return compressedFile;
  }, [maxSize]);

  return {
    compressImage, progress,
  };
};
