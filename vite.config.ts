import { defineConfig } from 'vite';

export default defineConfig({
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
