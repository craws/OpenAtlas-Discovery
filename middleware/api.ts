export default defineNuxtRouteMiddleware(() => {
	if (useRuntimeConfig().public.APIBase === undefined) {
		return navigateTo("/", { redirectCode: 308 });
	}
});
