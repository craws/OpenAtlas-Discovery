<script lang="ts" setup>
const props = defineProps<{
	alt?: string;
	src: string;
	width?: number | string;
	height?: number | string;
}>();
</script>

<template>
	<NuxtImg
		:alt="props.alt ?? ''"
		class="max-h-96 w-full object-contain"
		:height="height"
		loading="lazy"
		:src="src"
		:width="width"
	/>
</template>
