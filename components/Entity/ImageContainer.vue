<template>
	<v-card
		:style="{
			'min-width': bounds?.minWidth ?? '400px',
			'max-width': bounds?.maxWidth ?? '1000px',
			'max-height': bounds?.maxHeight ?? '500px',
		}"
	>
		<v-carousel v-if="depictions && depictions.length > 1" height="100%" hide-delimiter-background>
			<v-carousel-item v-for="(depiction, i) in depictions" :key="i">
				<entity-image-depiction :depiction="depiction" />
			</v-carousel-item>
		</v-carousel>

		<entity-image-depiction
			v-else-if="depictions && depictions.length == 1"
			:depiction="depictions[0]"
		/>
	</v-card>
</template>
<script lang="ts" setup>
import { LinkedPlacesDepiction } from "~~/composables/api";
import { SizeBounds } from "~~/types/layouts";

export interface EntityImageContainerProps {
	depictions: LinkedPlacesDepiction[];
	bounds?: SizeBounds;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<EntityImageContainerProps>();
</script>
