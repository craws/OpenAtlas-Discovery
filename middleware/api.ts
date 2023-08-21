
const { $discoveryConfig } = useNuxtApp();

export default defineNuxtRouteMiddleware(() => {
  if ($discoveryConfig.APIbase === undefined) {
    return abortNavigation();
  }
});
