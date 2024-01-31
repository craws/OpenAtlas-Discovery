import createApiClient from "@stefanprobst/openapi-client";

import type { paths } from "@/lib/api-client/api";

export function useApiClient() {
	const env = useRuntimeConfig();
	const baseUrl = env.public.NUXT_PUBLIC_API_BASE_URL;
	const client = createApiClient<paths>({ baseUrl });

	return client;
}
