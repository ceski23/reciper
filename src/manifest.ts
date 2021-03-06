export default {
  short_name: 'Reciper',
  name: 'Reciper - your recipes',
  icons: [
    {
      src: 'favicon.ico',
      sizes: '64x64 32x32 24x24 16x16',
      type: 'image/x-icon',
    },
    {
      src: 'logo192.png',
      type: 'image/png',
      sizes: '192x192',
    },
    {
      src: 'logo512.png',
      type: 'image/png',
      sizes: '512x512',
    },
  ],
  start_url: '.',
  display: 'standalone',
  theme_color: '#000000',
  background_color: '#ffffff',
  share_target: {
    action: '/sharedRecipe',
    method: 'GET',
    enctype: 'application/x-www-form-urlencoded',
    params: {
      text: 'url',
      url: 'url',
    },
  },
  screenshots: [
    {
      src: 'screenshots/1.jpg',
      sizes: '1080x2155',
      type: 'image/jpeg',
      label: 'Ekran główny',
    },
    {
      src: 'screenshots/2.jpg',
      sizes: '1080x2155',
      type: 'image/jpeg',
      label: 'Ekran przepisu - opis',
    },
    {
      src: 'screenshots/3.jpg',
      sizes: '1080x2155',
      type: 'image/jpeg',
      label: 'Ekran przepisu - składniki',
    },
    {
      src: 'screenshots/4.jpg',
      sizes: '1080x2155',
      type: 'image/jpeg',
      label: 'Ekran przepisu - przygotowanie',
    },
    {
      src: 'screenshots/5.jpg',
      sizes: '1080x2155',
      type: 'image/jpeg',
      label: 'Ekran ustawień',
    },
  ],
};
