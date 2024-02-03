<script lang="ts" setup>
import { groupByToMap } from "@acdh-oeaw/lib";
import { z } from "zod";

// defineRouteRules({
// 	prerender: true,
// });

definePageMeta({
	title: "EntityPage.meta.title",
	validate(route) {
		const env = useRuntimeConfig();
		if (env.public.NUXT_PUBLIC_DATABASE === "disabled") return false;

		const paramsSchema = z.object({
			id: z.coerce.number().int().positive(),
		});
		return paramsSchema.safeParse(route.params).success;
	},
});

const locale = useLocale();
const t = useTranslations();

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
	if (entity.value?.geometry != null) {
		tabs.push({ id: "geo-map", label: t("EntityPage.map") });
	}
	if (entity.value?.depictions != null) {
		tabs.push({
			id: "images",
			label: t("EntityPage.images", { count: entity.value.depictions.length }),
		});
	}
	return tabs;
});

const relationsByType = computed(() => {
	return groupByToMap(entity.value?.relations ?? [], (relation) => {
		return relation.relationType;
	});
});
</script>

<template>
	<MainContent class="container relative grid grid-rows-[auto_1fr] gap-4 py-8">
		<template v-if="entity != null">
			<div>
				<PageTitle>{{ entity.properties.title }}</PageTitle>

				<!-- TODO: <dl> -->
				<div>{{ entity.types }}</div>
				<div>{{ entity.when?.timespans }}</div>
				<div>{{ entity.descriptions }}</div>
			</div>

			<Tabs v-if="tabs.length > 0" :default-value="tabs[0]?.id">
				<TabsList>
					<TabsTrigger v-for="tab of tabs" :key="tab.id" :value="tab.id">
						{{ tab.label }}
					</TabsTrigger>
				</TabsList>
				<TabsContent v-for="tab of tabs" :key="tab.id" :value="tab.id">
					<template v-if="tab.id === 'geo-map'">
						<Card class="h-96 overflow-hidden">
							<VisualisationContainer v-slot="{ height, width }">
								<GeoMap
									v-if="height && width"
									:entities="entities"
									:height="height"
									:width="width"
								/>
							</VisualisationContainer>
						</Card>
					</template>
					<template v-else-if="tab.id === 'images'">
						<Carousel class="mx-14">
							<CarouselPrevious />
							<CarouselContent>
								<CarouselItem
									v-for="(image, index) of entity?.depictions"
									:key="index"
									class="h-full"
								>
									<Card class="pb-3">
										<figure class="grid h-96 grid-rows-[1fr_auto] gap-y-1.5 overflow-hidden">
											<div class="relative">
												<img alt="" class="absolute size-full object-contain" :src="image" />
											</div>
											<figcaption class="justify-self-center">{{ image }}</figcaption>
										</figure>
									</Card>
								</CarouselItem>
							</CarouselContent>
							<CarouselNext />
						</Carousel>
					</template>
				</TabsContent>
			</Tabs>

			<pre>{{ relationsByType }}</pre>
		</template>

		<template v-else-if="isLoading">
			<Centered>
				<LoadingIndicator />
			</Centered>
		</template>
	</MainContent>
</template>
