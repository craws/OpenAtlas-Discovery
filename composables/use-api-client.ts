import createApiClient from "@stefanprobst/openapi-client";

import type { paths } from "@/lib/api-client/api";

export function useApiClient() {
	const env = useRuntimeConfig();
	const baseUrl = env.public.apiBaseUrl;
	const client = createApiClient<paths>({ baseUrl });

	return client;
}
