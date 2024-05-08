<script lang="ts" setup>
import { z } from "zod";

import { hasCoordinates } from "@/utils/has-geojson-coordinates";

// defineRouteRules({
// 	prerender: true,
// });

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

const t = useTranslations();

usePageMetadata({
	title: t("EntityPage.meta.title"),
});

const route = useRoute();
const id = computed(() => {
	return Number(route.params.id as string);
});

const { data, error, isPending, isPlaceholderData, suspense } = useGetEntity(
	computed(() => {
		return { entityId: id.value };
	}),
);

const isLoading = computed(() => {
	return isPending.value || isPlaceholderData.value;
});

const entity = computed(() => {
	return data.value?.features[0];
});

const entities = computed(() => {
	return data.value?.features ?? [];
});

useHead({
	title: computed(() => {
		return entity.value?.properties.title ?? t("EntityPage.meta.title");
	}),
	// TODO: description, other metadata
});

const tabs = computed(() => {
	const tabs = [];
	if (entity.value?.geometry != null && hasCoordinates(entity.value.geometry)) {
		tabs.push({
			id: "geo-map",
			label: t("EntityPage.map"),
		});
	}
	if (entity.value?.depictions != null) {
		tabs.push({
			id: "images",
			label: t("EntityPage.images", { count: entity.value.depictions.length }),
		});
	}
	return tabs;
});

</script>

<template>
	<MainContent class="relative h-full">
		<template v-if="entity != null">
			<EntitySidebar :entity="entity" />


			<EntityGeoMap :entities="entities" />

<!--
			<Card>
				<CardHeader>
					<EntitySystemClass :system-class="entity.systemClass" />
					<PageTitle>{{ entity.properties.title }}</PageTitle>
				</CardHeader>
				<CardContent>
					<div class="grid gap-4">
						<EntityTimespans :timespans="entity.when?.timespans" />
						<EntityDescriptions :descriptions="entity?.descriptions ?? []" />
					</div>
				</CardContent>
			</Card> -->

			<!-- <Tabs v-if="tabs.length > 0" :default-value="tabs[0]?.id">
				<TabsList>
					<TabsTrigger v-for="tab of tabs" :key="tab.id" :value="tab.id">
						{{ tab.label }}
					</TabsTrigger>
				</TabsList> -->
				<!-- TODO: keep map alive -->
				<!-- <TabsContent v-for="tab of tabs" :key="tab.id" :value="tab.id">
					<EntityGeoMap v-if="tab.id === 'geo-map'" :entities="entities" />
					<EntityImages v-else-if="tab.id === 'images'" :images="entity.depictions" />
				</TabsContent>
			</Tabs> -->

		</template>

		<template v-else-if="isLoading">
			<Centered class="pointer-events-none opacity-50">
				<LoadingIndicator />
			</Centered>
		</template>
	</MainContent>
</template>
