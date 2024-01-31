import { createUrl } from "@acdh-oeaw/lib";

/** Identifiers in the LinkedPlaces api response are full urls. */
export function useGetEntityId() {
	const env = useRuntimeConfig();

	const prefix = String(
		createUrl({ baseUrl: env.public.NUXT_PUBLIC_API_BASE_URL, pathname: "/entity/" }),
	);

	return function getEntityId(id: string) {
		return id.slice(prefix.length);
	};
}
