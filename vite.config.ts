/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import GithubActionsReporter from 'vitest-github-actions-reporter';
import size from 'rollup-plugin-size';

import manifest from './src/manifest';

const reactPlugin = react({
  jsxImportSource: '@emotion/react',
  babel: {
    plugins: ['@emotion/babel-plugin'],
  },
});

const svgrPlugin = svgr({
  svgrOptions: {

  },
});

const tsconfigPathsPlugin = tsconfigPaths({

});

const checkerPlugin = checker({
  typescript: true,
  eslint: {
    lintCommand: 'eslint --cache --cache-location "node_modules/.cache/.eslintcache" "./src/**/*.{ts,tsx}"',
  },
  overlay: {
    initialIsOpen: false,
  },
});

const pwaPlugin = VitePWA({
  includeAssets: ['favicon.ico', 'robots.txt'],
  manifest,
  workbox: {
    runtimeCaching: [{
      urlPattern: /^https?:\/\/.*?\.(?:jpg|png|gif|webp)/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'recipesImages',
        expiration: {
          maxEntries: 100,
        },
      },
    }],
  },
});

const bundleVisualizerPlugin = visualizer({
  sourcemap: true,
  open: true,
});

const reportSizePlugin = size({
  stripHash(fileName: string) {
    const regexp = /^(?<fileName>[\w\/]+)(?:\W+\w*\W*?)?(?<extension>\.\w+)$/;
    const matches = fileName.match(regexp);
    return matches?.groups ? `${matches.groups.fileName}${matches.groups.extension}` : fileName;
  },
})

export default defineConfig(({ mode }) => {
  const visualizeBundle = false;

  return {
    define: {
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
    plugins: [
      reactPlugin,
      svgrPlugin,
      tsconfigPathsPlugin,
      pwaPlugin,
      mode !== 'test' && checkerPlugin,
      mode === 'production' && visualizeBundle && bundleVisualizerPlugin,
      reportSizePlugin,
    ],
    build: {
      outDir: 'build',
      sourcemap: visualizeBundle,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/cypress/**',
        '**/e2e/**',
        '**/.{idea,git,cache,output,temp}/**'
      ],
      reporters: process.env.GITHUB_ACTIONS ? new GithubActionsReporter() : 'default'
    },
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
  }
});
