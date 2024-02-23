<script lang="ts" setup>
import { cn } from "@/utils/styles";

const props = defineProps<{ class?: string }>();
</script>

<template>
	<tr
		:class="
			cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', props.class)
		"
	>
		<slot />
	</tr>
</template>
