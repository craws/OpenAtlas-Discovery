<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";

import type { ContentPage } from "@/types/content";

const locale = useLocale();

const { data: content } = useQuery({
	queryKey: ["cms-intro", locale, "intro"] as const,
	queryFn({ queryKey: [, locale, ...id] }) {
		return queryContent<ContentPage>("cms-intro", locale, ...id).findOne();
	},
});

useHead({
	meta: [{ name: "robots", content: "noindex" }],
});
</script>

<template>
	<MainContent class="container py-8">
		<template v-if="content != null">
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

				<div>
					<ContentRenderer
						v-if="content != null"
						class="prose mx-auto w-full max-w-3xl text-center"
						:value="content"
					>
						<template #empty></template>
					</ContentRenderer>
				</div>
				<div class="flex items-center gap-6">
					<Button v-for="(link, key) of content.links" :key="key" as-child variant="default">
						<NavLink :href="link.href" :external="link.external">
							{{ link.label }}
						</NavLink>
					</Button>
				</div>
			</div>
		</template>
	</MainContent>
</template>
