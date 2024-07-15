<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";

import type { ContentPage } from "@/types/content";

const locale = useLocale();

const { data: content } = useQuery({
	queryKey: ["docs", locale, "documentation"] as const,
	queryFn({ queryKey: [, locale, ...id] }) {
		return queryContent<ContentPage>("docs", locale, ...id).findOne();
	},
});

useHead({
	meta: [{ name: "robots", content: "noindex" }],
});
</script>

<template>
	<MainContent class="container max-w-3xl py-8">
		<div>
			<PageTitle>{{ content?.title }}</PageTitle>
		</div>
		<ContentRenderer v-if="content != null" class="prose max-w-3xl" :value="content">
			<template #empty></template>
		</ContentRenderer>
	</MainContent>
</template>
