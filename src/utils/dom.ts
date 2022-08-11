/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
export const getTextFromNode = (startNode: Node) => {
  const _getTextFromNode = (node: Node, text: string) => {
    if (node instanceof HTMLElement) {
      if (node.tagName === 'BR') text += '\n';
    } else {
      const newFragment = node.textContent?.trim();

      if (![' ', '\t', '\n'].includes(text[text.length - 1])) text += ' ';
      if (newFragment?.startsWith('.')) text = text.trimEnd();

      text += newFragment;
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const childNode of node.childNodes) {
      // eslint-disable-next-line no-param-reassign
      text = _getTextFromNode(childNode, text);
    }

    return text;
  };

  return _getTextFromNode(startNode, '').trim();
};
