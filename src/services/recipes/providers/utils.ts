import Vibrant from 'node-vibrant';

export const colorExtractor = async (imageUrl: string) => {
  const palette = await Vibrant.from((import.meta.env.VITE_CORS_PROXY as string ?? '') + encodeURIComponent(imageUrl)).getPalette();
  return palette;
};
