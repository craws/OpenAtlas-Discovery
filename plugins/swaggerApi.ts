import { Api } from '../composables/api';

export default defineNuxtPlugin(() => {
  const { $discoveryConfig } = useNuxtApp();

  const baseUrl: string = ($discoveryConfig.APIbase ?? 'https://demo-dev.openatlas.eu') + '/api/';
  const api = new Api({
    baseUrl: baseUrl
  });
  return { provide: { api } };
});
