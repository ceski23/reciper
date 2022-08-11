import { getTextFromNode } from 'utils/dom';

const makeNodeFromString = (html: string) => {
  const parser = new DOMParser();
  const document = parser.parseFromString(html, 'text/html');
  return document.body.childNodes[0];
};

describe('getTextFromNode', () => {
  it('should correctly extract text', () => {
    expect(getTextFromNode(makeNodeFromString(/* html */`
      <div>
        <p>a</p>
          <p>b</p>
      </div>
    `))).toEqual('a b');

    expect(getTextFromNode(makeNodeFromString(/* html */`
      <div>
        a
          <p>b</p>
        c
      </div>
    `))).toEqual('a b c');

    expect(getTextFromNode(makeNodeFromString(/* html */`
      <li>
        a <strong>b</strong>. c
      </li>
    `))).toEqual('a b. c');
  });
});
