import { Api } from "@/composables/api";

let client: Api<unknown> | null = null;

export function useApiClient() {
	const env = useRuntimeConfig();
	const baseUrl = env.public.APIBase;

	if (!client) {
		client = new Api({ baseUrl });
	}
	return client;
}
