<script lang="ts" setup>
import { noop } from "@acdh-oeaw/lib";
import { useQuery } from "@tanstack/vue-query";

import { createImprintUrl } from "@/config/imprint.config";

const env = useRuntimeConfig();

const locale = useLocale();
const t = useTranslations();

const redmineId = env.public.NUXT_PUBLIC_REDMINE_ID;

const {
	data: imprint,
	error,
	suspense,
} = useQuery({
	queryKey: ["imprint", locale] as const,
	queryFn({ queryKey: [, locale] }) {
		const url = createImprintUrl(locale, redmineId);
		return $fetch(String(url), { responseType: "text" });
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
	<!-- eslint-disable vue/no-v-html -->
	<div v-if="imprint" class="prose" v-html="imprint" />
	<!-- eslint-enable vue/no-v-html -->
</template>
