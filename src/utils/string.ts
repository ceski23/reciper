export const capitalize = (text: string) => (
  `${text[0].toLocaleUpperCase()}${text.substring(1)}`
);

export const stringToNumber = (text: string) => {
  const num = Number.parseFloat(text);
  return Number.isNaN(num) ? 0 : num;
};
