export const isUrlExternal = (url: string) => {
  try {
    const { hostname } = new URL(url);
    return hostname !== window.location.hostname;
  } catch (error) {
    return false;
  }
};
