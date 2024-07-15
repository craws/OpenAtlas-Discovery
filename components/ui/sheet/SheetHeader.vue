<script lang="ts" setup>
import { cn } from "@/utils/styles";

const props = defineProps<{ class?: string }>();
</script>

<template>
	<div :class="cn('flex flex-col space-y-2 text-center sm:text-left', props.class)">
		<slot />
	</div>
</template>
