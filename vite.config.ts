import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from "rollup-plugin-visualizer";

import manifest from './src/manifest';

const reactPlugin = react({
  jsxImportSource: '@emotion/react',
  babel: {
    plugins: ["@emotion/babel-plugin"],
  },
});

const svgrPlugin = svgr({
  svgrOptions: {
    
  }
});

const tsconfigPathsPlugin = tsconfigPaths({

});

const checkerPlugin = checker({
  typescript: true,
  eslint: {
    lintCommand: 'eslint --cache --cache-location "node_modules/.cache/.eslintcache" "./src/**/*.{ts,tsx}"'
  },
  overlay: {
    initialIsOpen: false
  }
});

const pwaPlugin = VitePWA({
  includeAssets: ['favicon.ico', 'robots.txt'],
  manifest: manifest,
  workbox: {
    runtimeCaching: [{
      urlPattern: /^https?:\/\/.*?\.(?:jpg|png|gif|webp)/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'recipesImages',
        expiration: {
          maxEntries: 100
        }
      }
    }]
  }
});

const bundleVisualizerPlugin = visualizer({
  sourcemap: true,
  open: true
});

export default defineConfig({
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  plugins: [
    reactPlugin,
    svgrPlugin,
    tsconfigPathsPlugin,
    checkerPlugin,
    pwaPlugin,
    // bundleVisualizerPlugin,
  ],
  build: {
    outDir: 'build',
    // sourcemap: true,
  }
});