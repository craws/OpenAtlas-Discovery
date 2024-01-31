<script lang="ts" setup>
import { noop } from "@acdh-oeaw/lib";
import { useQuery } from "@tanstack/vue-query";

import type { ContentPage } from "@/types/content";

defineRouteRules({
	prerender: true,
});

definePageMeta({
	title: "ContentPage.meta.title",
	validate(route) {
		// FIXME: check actual content pages
		return true;
	},
});

const locale = useLocale();
const t = useTranslations();

const route = useRoute();
const id = computed(() => {
	return route.params.id as Array<string>;
});

const {
	data: content,
	error,
	suspense,
} = useQuery({
	queryKey: ["content", locale, ...id.value] as const,
	queryFn({ queryKey: [, locale, ...id] }) {
		return queryContent<ContentPage>("/", ...id)
			.locale(locale)
			.findOne();
	},
});
useErrorMessage(error, {
	notFound: t("ContentPage.error.not-found"),
	unknown: t("ContentPage.error.unknown"),
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

// @ts-expect-error Incorrect upstream types.
useContentHead(content);
</script>

<template>
	<MainContent class="container py-8">
		<div>
			<PageTitle>{{ content?.title }}</PageTitle>
		</div>

		<ContentRenderer
			v-if="content != null"
			class="prose max-w-3xl dark:prose-invert"
			:value="content"
		/>
	</MainContent>
</template>
