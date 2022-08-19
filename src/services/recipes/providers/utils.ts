import type { RGBColor } from 'colorthief';
import ColorThief from 'colorthief';
import { parseToHsl } from 'polished';

const rgbToHex = (color: RGBColor) => `#${color.map((x) => {
  const hex = x.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}).join('')}`;

export const getColorPaletteFromImage = async (imageUrl: string) => {
  const proxiedImageUrl = (import.meta.env.VITE_CORS_PROXY as string ?? '') + encodeURIComponent(imageUrl);
  const colorThief = new ColorThief();

  const loadedImage = await new Promise<HTMLImageElement | undefined>((resolve) => {
    const image = new Image();
    image.src = proxiedImageUrl;
    image.crossOrigin = 'anonymous';
    image.onerror = () => { resolve(undefined); };
    image.onload = () => { resolve(image); };
  });

  if (!loadedImage) return [];

  const colors = colorThief.getPalette(loadedImage, 5, 10).map(rgbToHex);
  return colors;
};

export const getBestColor = (palette: string[]) => (
  palette.find((color) => {
    const hsl = parseToHsl(color);
    return hsl.saturation >= 0.20 && hsl.lightness >= 0.20 && hsl.lightness <= 0.70;
  }) ?? palette[0]
);

export const getColorFromImage = async (imageUrl: string) => {
  const colors = await getColorPaletteFromImage(imageUrl);
  const color = getBestColor(colors);
  return color;
};
