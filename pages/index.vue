<script lang="ts" setup>
import { noop } from "@acdh-oeaw/lib";
import { useQuery } from "@tanstack/vue-query";

import type { ContentPage } from "@/types/content";

defineRouteRules({
	prerender: true,
});

definePageMeta({
	title: "IndexPage.meta.title",
});

const locale = useLocale();
const t = useTranslations();

const {
	data: content,
	error,
	suspense,
} = useQuery({
	queryKey: ["content", locale, "index"] as const,
	queryFn({ queryKey: [, locale] }) {
		return queryContent<ContentPage>("system-pages", locale).findOne();
	},
});
useErrorMessage(error, {
	notFound: t("IndexPage.error.not-found"),
	unknown: t("IndexPage.error.unknown"),
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
	<MainContent class="container py-8">
		<div class="flex h-full flex-col items-center gap-8">
			<div class="basis-1/12"></div>
			<div v-if="content != null">
				<h1 class="sr-only">{{ content.title }}</h1>
				<NuxtImg
					v-if="content.image?.light != null"
					alt=""
					class="block h-80 max-w-3xl object-contain dark:hidden"
					preload
					:src="content.image?.light"
				/>
				<NuxtImg
					v-if="content.image?.dark != null"
					alt=""
					class="hidden h-80 max-w-3xl object-contain dark:block"
					preload
					:src="content.image?.dark"
				/>
			</div>

			<ContentRenderer
				v-if="content != null"
				class="prose prose-lg max-w-3xl text-balance text-center dark:prose-invert"
				:value="content"
			/>

			<div class="flex items-center gap-6">
				<Button v-for="(link, key) of content?.links" :key="key" as-child variant="default">
					<NavLink :href="link.href">
						{{ link.label }}
					</NavLink>
				</Button>
			</div>
		</div>
	</MainContent>
</template>
