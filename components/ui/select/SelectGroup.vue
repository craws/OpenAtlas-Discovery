<script lang="ts" setup>
import { SelectGroup, type SelectGroupProps } from "radix-vue";

import { cn } from "@/utils/styles";

const props = defineProps<SelectGroupProps & { class?: string }>();
</script>

<template>
	<SelectGroup :class="cn('p-1 w-full', props.class)" v-bind="props">
		<slot />
	</SelectGroup>
</template>
