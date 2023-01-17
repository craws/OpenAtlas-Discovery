import { Api } from '../composables/api';

export default defineNuxtPlugin(() => {
  const api = new Api();
  return { provide: { api } };
});
