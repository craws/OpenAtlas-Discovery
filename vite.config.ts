/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  test: {
    deps: {
      inline: [/@nuxt\/test-utils/]
    },
    globals: true,
    environment: 'jsdom',
    coverage: {
      exclude: [
        'node_modules/'
      ]
    }
  }
});
