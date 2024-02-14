<script lang="ts" setup>
import { noop } from "@acdh-oeaw/lib";
import { useQuery } from "@tanstack/vue-query";

import type { SystemPage } from "@/types/content";

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
	queryKey: ["system-pages", locale, "index"] as const,
	queryFn({ queryKey: [, locale] }) {
		return queryContent<SystemPage>("system-pages", locale).findOne();
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
		<template v-if="content != null && content.leadIn != null">
			<div class="grid place-items-center gap-8 p-8 sm:py-16">
				<div>
					<h1 class="sr-only">{{ content.title }}</h1>
					<NuxtImg
						v-if="content.image?.light != null"
						alt=""
						class="block h-80 w-full max-w-3xl object-contain dark:hidden"
						preload
						:src="content.image?.light"
						:width="768"
						:height="320"
					/>
					<NuxtImg
						v-if="content.image?.dark != null"
						alt=""
						class="hidden h-80 w-full max-w-3xl object-contain dark:block"
						preload
						:src="content.image?.dark"
						:width="768"
						:height="320"
					/>
				</div>

				<ContentRenderer
					v-if="content.leadIn != null"
					class="prose prose-lg max-w-3xl text-balance text-center"
					:value="content.leadIn"
				>
					<template #empty></template>
				</ContentRenderer>

				<div class="flex items-center gap-6">
					<Button v-for="(link, key) of content.links" :key="key" as-child variant="default">
						<NavLink :href="link.href">
							{{ link.label }}
						</NavLink>
					</Button>
				</div>
			</div>
		</template>

		<template v-else-if="content != null">
			<div class="mx-auto w-full max-w-3xl px-8">
				<PageTitle>{{ content?.title }}</PageTitle>
			</div>
		</template>

		<div>
			<ContentRenderer
				v-if="content != null"
				class="prose mx-auto w-full max-w-3xl"
				:value="content"
			>
				<template #empty></template>
			</ContentRenderer>
		</div>
	</MainContent>
</template>
