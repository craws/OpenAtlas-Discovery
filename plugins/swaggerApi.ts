import { Api } from "../composables/api";

export default defineNuxtPlugin(() => {
  const api = new Api({
    baseUrl: useRuntimeConfig().public.apiBase + "/api/",
  });
  return { provide: { api } };
});
