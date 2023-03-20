import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: process.env.PUBLIC_URL || 'http://localhost:3000'
  }
});
