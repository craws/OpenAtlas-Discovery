<script lang="ts" setup>
import type { GeoJsonObject } from "geojson";

import type { GeometryCollection, LineString, Point, Polygon } from "@/composables/api";
import type { SizeBounds } from "@/types/layouts";

export interface EntityMapContainerProps {
	geoData: GeometryCollection | LineString | Point | Polygon;
	bounds?: SizeBounds;
}

const localePath = useLocalePath();
const props = defineProps<EntityMapContainerProps>();
</script>

<template>
	<VCard style="min-width: 400px; max-width: 1000px; min-height: 400px; max-height: 750">
		<DataMap
			:items="props.geoData as GeoJsonObject"
			:style="{
				'min-width': bounds?.minWidth ?? '400px,',
				'min-height': bounds?.maxHeight ?? '400px',
				'max-width': bounds?.maxWidth ?? '1000px',
				'max-height': bounds?.maxHeight ?? '500px',
			}"
		/>
		<VCardActions justify="center">
			<VSpacer />
			<VBtn :to="localePath('/map')" prepend-icon="mdi-map-marker">
				{{ $t("global.basics.map") }}
			</VBtn>
			<VSpacer />
		</VCardActions>
	</VCard>
</template>
