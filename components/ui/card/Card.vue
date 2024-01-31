<script lang="ts" setup>
import { cn } from "@/utils/styles";

const props = defineProps({
	class: {
		type: String,
		default: "",
	},
});
</script>

<template>
	<div :class="cn('rounded-lg border bg-card text-card-foreground shadow', props.class)">
		<slot />
	</div>
</template>
