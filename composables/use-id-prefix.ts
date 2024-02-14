import { createUrl } from "@acdh-oeaw/lib";

export function useIdPrefix() {
	const env = useRuntimeConfig();

	const prefix = String(
		createUrl({ baseUrl: env.public.NUXT_PUBLIC_API_BASE_URL, pathname: "/api/entity/" }),
	);

	return prefix;
}
