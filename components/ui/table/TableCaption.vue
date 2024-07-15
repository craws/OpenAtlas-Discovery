<script lang="ts" setup>
import { cn } from "@/utils/styles";

const props = defineProps<{ class?: string }>();
</script>

<template>
	<caption :class="cn('mt-4 text-sm text-muted-foreground', props.class)">
		<slot />
	</caption>
</template>
