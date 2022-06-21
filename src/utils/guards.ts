export const nonNullable = <T>(value: T): value is NonNullable<T> => (
  value !== null && value !== undefined
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const exhaustiveCheck = (_: never, message: string) => {
  throw new Error(message);
};
