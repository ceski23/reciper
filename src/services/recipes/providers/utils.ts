import Vibrant from 'node-vibrant';

export const colorExtractor = async (imageUrl: string) => {
  const palette = await Vibrant.from((process.env.REACT_APP_CORS_PROXY ?? '') + encodeURIComponent(imageUrl)).getPalette();
  return palette;
};
