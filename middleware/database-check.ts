export default defineNuxtRouteMiddleware((to) => {
	const env = useRuntimeConfig();
	const localePath = useLocalePath();

	if (env.public.database === "disabled") {
		if (to.path !== localePath("/database-in-progress")) {
			return navigateTo(localePath("/database-in-progress"));
		}
	}
	return true;
});
