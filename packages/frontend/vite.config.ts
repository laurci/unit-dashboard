import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  cacheDir: '.vite',
  build: {
    outDir: '.dist',
    chunkSizeWarningLimit: 768,
  },
  resolve: {
    alias: [
      { find: /^(.*)\.gql$/, replacement: '$1.gql.ts' },
      {
        find: /^@components\//,
        replacement: '/components/',
      },
      {
        find: /^@hooks\//,
        replacement: '/hooks/',
      },
      {
        find: /^@lib\//,
        replacement: '/lib/',
      },
      {
        find: /^@pages\//,
        replacement: '/pages/',
      },
      {
        find: /^@providers\//,
        replacement: '/providers/',
      },
      {
        find: /^@schemas\//,
        replacement: '/schemas/',
      },
      {
        find: /^@utils\//,
        replacement: '/utils/',
      },
    ],
  },
});
