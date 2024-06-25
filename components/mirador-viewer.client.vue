<script lang="ts" setup>
import Mirador from "mirador";

const props = defineProps<{
	config: object;
	images: Array<string>;
}>();

const id = "mirador";

onMounted(async () => {
	await nextTick();

	const windows = props.images.map((url) => {
		return { manifestId: url };
	});

	Mirador.viewer({
		...props.config,
		id,
		windows,
	});
});
</script>

<template>
	<div :id="id" class="relative" />
</template>
