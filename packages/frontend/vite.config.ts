/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/fix-it/',
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: './src/setupTests.ts',
  },
  plugins: [react()],
});
