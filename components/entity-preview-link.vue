<script setup lang="ts">
import type { UseQueryReturnType } from '@tanstack/vue-query';


const props = defineProps<{entity?: EntityFeature, id?:number}>();

const {getUnprefixedId} = useIdPrefix();

const previewEntity = computed(() => {
	if(props.entity) return props.entity;
	if(!props.id) return null;
	if(!loadedEntity.value) return null;

	return loadedEntity.value.data.value?.features[0];

});

const loadedEntity = computed(() =>{
	if(props.entity) return null;
	if(!props.id) return null;

	const id = props.id;

	const { data, error, isPending, isPlaceholderData } = useGetEntity(
		computed(() => {
			return { entityId: id };
		}),
	);
	return { data, error, isPending, isPlaceholderData };
});


const isLoading = computed(() => {
	return loadedEntity.value?.isPending.value ?? loadedEntity.value?.isPlaceholderData.value;
});


</script>

<template v-if="entity || id">
	<HoverCard>
		<HoverCardTrigger>

		</HoverCardTrigger>
		<HoverCardContent>
			<template v-if="previewEntity">
			</template>
			<template v-else-if="isLoading">
				<Centered class="pointer-events-none opacity-50">
					<LoadingIndicator />
				</Centered>
			</template>
		</HoverCardContent>
	</HoverCard>
</template>
