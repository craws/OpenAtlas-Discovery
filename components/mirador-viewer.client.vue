<script lang="ts" setup>
import Mirador from "mirador";
import { defineProps, onMounted } from "vue";

// Props
const props = defineProps({
	config: {
		type: Object,
		required: true,
	},
	images: Array<string>,
});

// Refs

// TODO: At the moment I assume there is a race condition where the div element isn't available yet,
// at time of mounting.

// Methods
const initMirador = () => {
	Mirador.viewer({
		id: mirador,
		...props.config,
		windows: props.images?.map((url) => {
			return { manifestId: url };
		}),
	});
};

const delayedInitMirador = () => {
	setTimeout(initMirador, 100);
};

const mirador = "mirador";

// Lifecycle
onMounted(() => {
	// TODO: We shouldn't rely on timeouts here, and find a more reliable solution
	delayedInitMirador();
});
</script>

<template>
	<div :id="mirador" class="relative"></div>
</template>
