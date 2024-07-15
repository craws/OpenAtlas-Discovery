import { createUrl } from "@acdh-oeaw/lib";

export function useIdPrefix() {
	const env = useRuntimeConfig();

	const prefix = String(createUrl({ baseUrl: env.public.apiBaseUrl, pathname: "/api/entity/" }));

	function getUnprefixedId(id: string) {
		/**
		 * FIXME:
		 * Currently, some identifiers in the api response are prefixed with "/entity", but others
		 * with "/api/entity", so this must be fixed backend-side first.
		 */
		// return id.slice(prefix.length);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return id.split("/").at(-1)!;
	}

	return { prefix, getUnprefixedId };
}
