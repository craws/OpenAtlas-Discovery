export default defineNuxtRouteMiddleware(() => {
	const { $discoveryConfig } = useNuxtApp();
	if ($discoveryConfig.APIbase === undefined) {
		return navigateTo("/", { redirectCode: 308 });
	}
});
