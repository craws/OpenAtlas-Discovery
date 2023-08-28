import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents (on, _config) {
      on('task', {
        log (message) {
          console.log(message);

          return null;
        }
      });
    }
  }
});
