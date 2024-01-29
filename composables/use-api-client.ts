import { Api } from "@/composables/api";

export function useApiClient() {
	const env = useRuntimeConfig();
	const baseUrl = env.public.APIBase;

	const client = new Api({ baseUrl });

	return client;
}
