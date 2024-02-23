<script lang="ts" setup>
import { ref } from "vue";

const elementRef = ref<HTMLElement | null>(null);

const { width, height } = useElementSize(elementRef);
</script>

<template>
	<div
		ref="elementRef"
		class="relative isolate grid size-full overflow-hidden"
		data-visualisation-container
	>
		<slot v-if="width && height" :width="width" :height="height" />
	</div>
</template>
