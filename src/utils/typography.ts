export const fluidTypography = (
  minViewport: number,
  maxViewport: number,
  minFontSize: number,
  maxFontSize: number,
) => {
  const factor = (1 / (maxViewport - minViewport)) * (maxFontSize - minFontSize);

  return `
    font-size: ${minFontSize}px;
    font-size: clamp(${minFontSize}px, ${minFontSize - minViewport * factor}px + ${100 * factor}vw, ${maxFontSize}px);
  `;
};
