<script lang="ts" setup>
import { groupByToMap, keyByToMap } from "@acdh-oeaw/lib";
import { z } from "zod";

import { useIdPrefix } from "@/composables/use-id-prefix";
import { hasCoordinates } from "@/utils/has-geojson-coordinates";

// defineRouteRules({
// 	prerender: true,
// });

definePageMeta({
	title: "EntityPage.meta.title",
	middleware: "database-check",
	validate(route) {
		const paramsSchema = z.object({
			id: z.coerce.number().int().positive(),
		});
		return paramsSchema.safeParse(route.params).success;
	},
});

const t = useTranslations();
const { getUnprefixedId } = useIdPrefix();

const route = useRoute();
const id = computed(() => {
	return Number(route.params.id as string);
});

const { data, isPending, isPlaceholderData } = useGetEntity(
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

const relationsByType = computed(() => {
	return groupByToMap(entity.value?.relations ?? [], (relation) => {
		// FIXME: This used to use `relationType` (without the prefix)
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return relation.relationSystemClass!;
	});
});

const typesById = computed(() => {
	return keyByToMap(entity.value?.types ?? [], (type) => {
		return type.identifier;
	});
});
</script>

<template>
	<MainContent class="container relative grid grid-rows-[auto_1fr] gap-4 py-8">
		<template v-if="entity != null">
			<Card>
				<CardHeader>
					<EntitySystemClass :system-class="entity.systemClass" />
					<PageTitle>{{ entity.properties.title }}</PageTitle>
				</CardHeader>
				<CardContent>
					<div class="grid gap-4">
						<EntityTimespans :timespans="entity.when?.timespans" />
						<EntityDescriptions :descriptions="entity?.descriptions ?? []" />
						<!-- Types -->
						<div class="flex flex-row flex-wrap gap-1">
							<TypesPopover
								v-for="type in entity.types"
								:key="type.identifier ?? type.label ?? 'missing'"
								:type="type"
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			<Tabs v-if="tabs.length > 0" :default-value="tabs[0]?.id">
				<TabsList>
					<TabsTrigger v-for="tab of tabs" :key="tab.id" :value="tab.id">
						{{ tab.label }}
					</TabsTrigger>
				</TabsList>
				<!-- TODO: keep map alive -->
				<TabsContent v-for="tab of tabs" :key="tab.id" :value="tab.id">
					<EntityGeoMap v-if="tab.id === 'geo-map'" :entities="entities" />
					<EntityImages
						v-else-if="tab.id === 'images' && entity.depictions"
						:images="entity.depictions"
					/>
				</TabsContent>
			</Tabs>

			<Card>
				<CardHeader>
					<CardTitle>{{ t("EntityPage.details") }}</CardTitle>
				</CardHeader>
				<CardContent>
					<dl
						class="grid gap-x-8 gap-y-4 sm:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] sm:justify-start"
					>
						<div v-for="[relationType, relations] of relationsByType" :key="relationType">
							<dt class="text-xs font-medium uppercase tracking-wider text-muted-foreground">
								{{ t(`SystemClassNames.${relationType}`) }}
							</dt>
							<dd>
								<ul role="list">
									<li v-for="(relation, index) of relations.slice(0, 10)" :key="index">
										<NavLink
											v-if="relation.relationTo"
											class="underline decoration-dotted hover:no-underline"
											:href="{
												path: `/visualization/`,
												query: {
													mode: 'table',
													selection: getUnprefixedId(relation.relationTo),
												},
											}"
										>
											{{ relation.label }}
										</NavLink>
										<span
											v-if="
												relation.relationSystemClass === 'type' &&
												typesById.has(relation.relationTo)
											"
										>
											({{ typesById.get(relation.relationTo)?.hierarchy }})
										</span>
									</li>
								</ul>
								<details v-if="relations.length > 10">
									<summary class="cursor-pointer py-1 text-sm text-muted-foreground">
										{{ t("Global.ShowMore") }}
									</summary>
									<ul role="list">
										<li v-for="(relation, index) of relations.slice(10)" :key="index">
											<NavLink
												v-if="relation.relationTo"
												class="underline decoration-dotted hover:no-underline"
												:href="{
													path: `/visualization/`,
													query: {
														mode: 'table',
														selection: getUnprefixedId(relation.relationTo),
													},
												}"
											>
												{{ relation.label }}
											</NavLink>
											<span
												v-if="
													relation.relationSystemClass === 'type' &&
													typesById.has(relation.relationTo)
												"
											>
												({{ typesById.get(relation.relationTo)?.hierarchy }})
											</span>
										</li>
									</ul>
								</details>
							</dd>
						</div>
					</dl>
				</CardContent>
			</Card>
		</template>

		<template v-else-if="isLoading">
			<Centered class="pointer-events-none opacity-50">
				<LoadingIndicator />
			</Centered>
		</template>
	</MainContent>
</template>
