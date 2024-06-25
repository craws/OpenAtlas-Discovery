<script lang="ts" setup>
import { ChevronRightIcon } from "lucide-vue-next";
import type { HTMLAttributes } from "vue";

import { cn } from "@/utils/styles";

const props = defineProps<{
	class?: HTMLAttributes["class"];
}>();
</script>

<template>
	<li role="presentation" aria-hidden="true" :class="cn('[&>svg]:size-3.5', props.class)">
		<slot>
			<ChevronRightIcon />
		</slot>
	</li>
</template>
