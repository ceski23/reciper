import Vibrant from 'node-vibrant';

export const colorExtractor = async (imageUrl: string) => {
  const proxiedImageUrl = (import.meta.env.VITE_CORS_PROXY as string ?? '') + encodeURIComponent(imageUrl);

  const vibrant = new Vibrant(proxiedImageUrl, {
    filters: [],
  });

  return vibrant.getPalette();
};
