<script lang="ts" setup>
import { noop } from "@acdh-oeaw/lib";
import { useQuery } from "@tanstack/vue-query";

import type { ContentPage } from "@/types/content";

const locale = useLocale();
const t = useTranslations();

const {
	data: content,
	error,
	suspense,
} = useQuery({
	queryKey: ["imprint", locale] as const,
	queryFn({ queryKey: [, locale] }) {
		return queryContent<ContentPage>("pages", locale, "imprint").findOne();
	},
});
useErrorMessage(error, {
	notFound: t("ImprintPage.error.not-found"),
	unknown: t("ImprintPage.error.unknown"),
});
onServerPrefetch(async () => {
	/**
	 * Delegate errors to the client, to avoid displaying error page with status code 500.
	 *
	 * @see https://github.com/TanStack/query/issues/6606
	 * @see https://github.com/TanStack/query/issues/5976
	 */
	await suspense().catch(noop);
});
</script>

<template>
	<ContentRenderer v-if="content != null" class="prose" :value="content">
		<template #empty></template>
	</ContentRenderer>
</template>
