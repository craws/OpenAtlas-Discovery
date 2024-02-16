<script lang="ts" setup>
import { groupByToMap, keyByToMap } from "@acdh-oeaw/lib";
import { z } from "zod";

import { useIdPrefix } from "@/composables/use-id-prefix";

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
const { getUnprefixedId } = useIdPrefix();

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
					<EntityImages v-else-if="tab.id === 'images'" :images="entity.depictions" />
				</TabsContent>
			</Tabs>

			<Card>
				<CardHeader>
					<CardTitle>{{ t("EntityPage.details") }}</CardTitle>
				</CardHeader>
				<CardContent>
					<dl class="grid gap-x-8 gap-y-4 sm:grid-cols-[auto_auto] sm:justify-start">
						<div v-for="[relationType, relations] of relationsByType" :key="relationType">
							<dt class="text-xs font-medium uppercase tracking-wider text-muted-foreground">
								{{ t(`SystemClassNames.${relationType}`) }}
							</dt>
							<dd>
								<ul role="list">
									<li v-for="(relation, index) of relations" :key="index">
										<NavLink
											class="underline decoration-dotted hover:no-underline"
											:href="{ path: `/entities/${getUnprefixedId(relation.relationTo)}` }"
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
