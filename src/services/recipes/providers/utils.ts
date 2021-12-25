import Vibrant from 'node-vibrant';

export const colorExtractor = async (imageUrl: string) => {
  const palette = await Vibrant.from(process.env.REACT_APP_CORS_PROXY + imageUrl).getPalette();
  return palette;
};
