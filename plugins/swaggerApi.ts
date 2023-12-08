import { Api } from "~/composables/api";

export default defineNuxtPlugin(() => {
	const baseUrl: string = useRuntimeConfig().public.APIBase ?? "https://demo-dev.openatlas.eu";
	const api = new Api({
		baseUrl,
	});
	return { provide: { api } };
});
