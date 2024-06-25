<script lang="ts" setup>
import { MapIcon, WaypointsIcon } from "lucide-vue-next";
import { z } from "zod";
const env = useRuntimeConfig();

const t = useTranslations();

const route = useRoute();

definePageMeta({
	validate(route) {
		const env = useRuntimeConfig();
		if (env.public.NUXT_PUBLIC_DATABASE === "disabled") return false;

		const paramsSchema = z.object({
			id: z.coerce.number().int().positive(),
		});
		return paramsSchema.safeParse(route.params).success;
	},
});

usePageMetadata({
	title: t("EntityPage.meta.title"),
});

const id = computed(() => {
	return Number(route.params.id as string);
});

const currentView = useGetCurrentView();


</script>
<template>
	<NuxtLayout name="default">
		<MainContent class="container relative grid h-full py-8">
			<div class="absolute right-4 top-1/2 z-20 bg-white/90 dark:bg-neutral-900 rounded-md p-6 shadow-md">
				<NavLink
					class="flex items-center gap-1 underline decoration-dotted hover:no-underline"
					:href="{ path: `/entities/${id}/${currentView === 'network' ? 'map' : 'network'}` }"
				>
					<MapIcon v-if="currentView === 'network'" class="size-6" />
					<WaypointsIcon v-else class="size-6" />
					<span class="sr-only">{{ currentView === 'network' ? t('MapPage.title') : t('NetworkPage.title') }}</span>
				</NavLink>
			</div>
			<template v-if="env.public.NUXT_PUBLIC_DATABASE !== 'disabled'">
				<ErrorBoundary>
					<DataMapView v-if="currentView === 'map'" />
					<DataNetworkView v-else />
				</ErrorBoundary>
			</template>
			<template v-else>
				<div>{{ t("DataPage.work-in-progress") }}</div>
			</template>
			<slot />
		</MainContent>
	</NuxtLayout>
</template>
