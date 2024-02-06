<script lang="ts" setup>

defineProps<{
	descriptions: Array<{ value?: string }>;
}>();

</script>

<template>
	<div v-for="(description, index) in descriptions" :key="description.value ?? 'descr' + index">
		<template v-if="description.value">
			<VDivider v-if="index > 0" />
			<p class="text-md">
				{{ description.value }}
			</p>
		</template>
	</div>
</template>
