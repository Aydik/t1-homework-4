import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: '/t1-homework-4/',
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      app: path.resolve(__dirname, './src/app'),
      pages: path.resolve(__dirname, './src/pages'),
      widgets: path.resolve(__dirname, './src/widgets'),
      features: path.resolve(__dirname, './src/features'),
      entities: path.resolve(__dirname, './src/entities'),
      shared: path.resolve(__dirname, './src/shared'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        changeOrigin: true,
        secure: false,
        target: 'http://localhost:4000',
      },
    },
    strictPort: true,
  },
});
