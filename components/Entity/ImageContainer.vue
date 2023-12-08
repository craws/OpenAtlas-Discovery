<script lang="ts" setup>
import type { LinkedPlacesDepiction } from "~~/composables/api";
import type { SizeBounds } from "~~/types/layouts";

export interface EntityImageContainerProps {
	depictions: Array<LinkedPlacesDepiction>;
	bounds?: SizeBounds;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<EntityImageContainerProps>();
</script>

<template>
	<VCard
		:style="{
			'min-width': bounds?.minWidth ?? '400px',
			'max-width': bounds?.maxWidth ?? '1000px',
			'max-height': bounds?.maxHeight ?? '500px',
		}"
	>
		<VCarousel v-if="depictions && depictions.length > 1" height="100%" hide-delimiter-background>
			<VCarouselItem v-for="(depiction, i) in depictions" :key="i">
				<EntityImageDepiction :depiction="depiction" />
			</VCarouselItem>
		</VCarousel>

		<EntityImageDepiction
			v-else-if="depictions && depictions.length == 1"
			:depiction="depictions[0]"
		/>
	</VCard>
</template>
