import { Api } from '../composables/api';

export default defineNuxtPlugin(() => {
  const api = new Api({
    baseUrl: useRuntimeConfig().public.openAtlasApiUrl
  });
  return { provide: { api } };
});
