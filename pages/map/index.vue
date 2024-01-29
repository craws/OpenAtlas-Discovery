<script setup lang="ts">
import type { GeoJsonObject } from "geojson";
import { useI18n } from "vue-i18n";
import { client } from '@/utils/api-client'

import { discoveryConfig } from "@/config/discoveryConfig";
import type { LinkedPlacesModelDescriptions, LinkedPlacesModelWhen } from "@/composables/api";
import type { Format, Query, ViewClasses } from "@/types/query";

const localePath = useLocalePath();
const { t } = useI18n();

definePageMeta({
	middleware: ["api"],
});
useHead({
	title: t("global.basics.map") ?? "Map",
});

const query = ref({
	view_classes: ["actor", "event", "place", "reference", "source"] as ViewClasses,
	limit: 0,
	format: "geojson" as Format,
	search: undefined as Array<string> | undefined,
	type_id: discoveryConfig.defaultFilters,
});
const { data, pending, refresh } = await useAsyncData(() => client.query.getQuery(query.value));
onMounted(() => {
	refresh();
});

interface FeatureContent {
	locationTitle: string;
	objectTitle: string;
	locationDescription: string;
	objectDescription: string;
	systemClass?: string;
	when?: LinkedPlacesModelWhen;
	descriptions?: Array<LinkedPlacesModelDescriptions>;
	id?: number;
}
const featureContent = reactive<FeatureContent>({
	locationTitle: "",
	objectTitle: "",
	locationDescription: "",
	objectDescription: "",
});

const items = computed(() => data.value?.results?.[0].features || []);
function handlePopup(e: L.LeafletMouseEvent) {
	featureContent.objectTitle = e.target?.feature?.properties?.name ?? "";
	featureContent.objectDescription = e.target?.feature?.properties?.description ?? "";
	featureContent.locationTitle = e.target?.feature?.geometry?.title ?? "";
	featureContent.locationDescription = e.target?.feature?.geometry?.description ?? "";
	featureContent.id = e.target?.feature?.properties?.["@id"];

	featureContent.descriptions = e.target?.feature?.descriptions;
	featureContent.systemClass = e.target?.feature?.properties.systemClass;

	const when: LinkedPlacesModelWhen = {
		timespans: [
			{
				start: {
					earliest: e.target?.feature?.properties.begin_earliest,
					latest: e.target?.feature?.properties.begin_latest,
				},
				end: {
					earliest: e.target?.feature?.properties.end_earliest,
					latest: e.target?.feature?.properties.end_latest,
				},
			},
		],
	};

	featureContent.when = when;
}

function updateQuery(newQuery: Query) {
	query.value.search = newQuery.search?.map((x) => JSON.stringify(x));
	refresh();
}
</script>

<template>
	<div>
		<div style="position: relative; overflow: hidden">
			<SearchField class="search" :loading="pending" @search="updateQuery" />
			<VCard
				min-width="300px"
				max-width="350px"
				class="popup"
				:class="{ move: !featureContent.id }"
				position="absolute"
			>
				<VBtn
					class="close-btn"
					icon="mdi-close"
					variant="text"
					size="small"
					color="grey"
					@click="featureContent.id = undefined"
				/>
				<EntityBasicsView
					class="mx-4 mb-4 pt-3 overflow-y-auto overflow-x-hidden"
					:title="featureContent.objectTitle"
					:descriptions="[featureContent.objectDescription]"
					:system-class="featureContent.systemClass"
					:when="featureContent.when"
					style="max-height: 400px"
				/>
				<VCardActions>
					<VBtn :to="localePath(`/entity/${featureContent.id}`)" variant="text">
						{{ $t("global.basics.more details") }}
					</VBtn>
				</VCardActions>
			</VCard>
			<DataMap
				:items="items as GeoJsonObject[]"
				:zoom-level="7"
				style="height: calc(100vh - 64px)"
				@item-clicked="handlePopup"
			/>
		</div>
	</div>
</template>

<style scoped>
.popup {
	top: 100px;
	right: 20px;
	z-index: 500;
	transition: all 100ms ease-in-out;
}

.popup.move {
	translate: 500px 0;
}

.scroll {
	overflow-y: auto;
}

.search {
	position: absolute;
	top: 20px;
	right: 0;
	left: 0;
	z-index: 500;
	width: 60%;
	margin: auto;
}

.close-btn {
	position: relative;
	top: 1%;
	right: -88%;
	z-index: 5;
}
</style>
