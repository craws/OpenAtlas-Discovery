<script setup lang="ts">
const route = useRoute();
const props = defineProps<{ id: number; entity?: EntityFeature; label?: string }>();

const previewEntity = computed(() => {
	if (props.entity) return props.entity;
	if (!props.id) return null;

	if (data?.value) return data.value.features[0];

	return null;
});

const { data, isPending, isPlaceholderData } = props.entity
	? { data: null, isPending: false, isPlaceholderData: false }
	: useGetEntity(
			computed(() => {
				return { entityId: props.id };
			}),
		);

const isLoading = computed(() => {
	return isPending || isPlaceholderData;
});

function getPath() {
	if (route.path.includes("visualization")) {
		return "visualization";
	}
	return "";
}

const currentMode = computed(() => {
	return route.query.mode;
});
</script>

<template v-if="entity || id">
	<HoverCard :close-delay="150" :open-delay="150">
		<HoverCardTrigger as-child>
			<NavLink
				class="underline decoration-dotted transition hover:no-underline focus-visible:no-underline"
				:href="{
					path: `/${getPath()}`,
					query: { mode: currentMode, selection: id },
				}"
			>
				<template v-if="label">
					{{ label }}
				</template>
				<slot v-else />
			</NavLink>
		</HoverCardTrigger>
		<HoverCardContent class="max-h-[50vh] w-[30vw] overflow-scroll">
			<template v-if="previewEntity">
				<EntityPrimaryDetails :entity="previewEntity" />
			</template>
			<template v-else-if="isLoading">
				<Centered class="pointer-events-none opacity-50">
					<LoadingIndicator />
				</Centered>
			</template>
		</HoverCardContent>
	</HoverCard>
</template>
