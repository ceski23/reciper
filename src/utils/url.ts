export const isUrlExternal = (url: string) => {
  try {
    const { hostname } = new URL(url);
    return hostname !== window.location.hostname;
  } catch (error) {
    return false;
  }
};

export const normalizeUrl = (url: string) => {
  const urlObj = new URL(url);
  urlObj.search = '';
  urlObj.hash = '';

  return urlObj.toString();
};

export const baseUrl = (url: string) => {
  const urlObj = new URL(normalizeUrl(url));
  urlObj.pathname = '';

  return urlObj.toString();
};
