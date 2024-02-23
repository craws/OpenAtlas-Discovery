<script lang="ts" setup>
import { cn } from "@/utils/styles";

const props = defineProps<{ class?: string }>();
</script>

<template>
	<tfoot :class="cn('bg-primary font-medium text-primary-foreground', props.class)">
		<slot />
	</tfoot>
</template>
