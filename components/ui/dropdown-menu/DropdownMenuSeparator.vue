<script lang="ts" setup>
import { DropdownMenuSeparator, type DropdownMenuSeparatorProps } from "radix-vue";

const props = defineProps<DropdownMenuSeparatorProps>();
</script>

<template>
	<DropdownMenuSeparator v-bind="props" class="-mx-1 my-1 h-px bg-muted" />
</template>
