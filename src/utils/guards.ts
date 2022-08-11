export const nonNullable = <T>(value: T): value is NonNullable<T> => (
  value !== null && value !== undefined
);

export const nonEmpty = (value: string): value is string => (
  value.length > 0
);

export const isElementNode = (node: Node | Element): node is Element => (
  node.nodeType === Node.ELEMENT_NODE
);

export const isTextNode = (node: Node | Element): node is Text => (
  node.nodeType === Node.TEXT_NODE
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const exhaustiveCheck = (_: never, message: string) => {
  throw new Error(message);
};
