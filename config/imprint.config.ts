import { createUrl, createUrlSearchParams } from "@acdh-oeaw/lib";

import type { Locale } from "@/config/i18n.config";

export function createImprintUrl(locale: Locale, redmineId: string): URL {
	return createUrl({
		baseUrl: "https://imprint.acdh.oeaw.ac.at",
		pathname: `/${redmineId}`,
		searchParams: createUrlSearchParams({ locale }),
	});
}
