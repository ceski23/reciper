import { css, Theme } from '@emotion/react/macro';

// eslint-disable-next-line import/no-anonymous-default-export
export default (theme: Theme) => css`
  body {
    margin: 0;
    font-family: Raleway, sans-serif;
    font-weight: 500;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow: hidden;
  }

  * {
    box-sizing: border-box;
  }
`;
