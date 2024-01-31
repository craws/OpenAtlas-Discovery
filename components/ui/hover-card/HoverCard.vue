<script lang="ts" setup>
import { HoverCardRoot, type HoverCardRootProps, useForwardProps } from "radix-vue";

const props = defineProps<HoverCardRootProps>();
const forwarded = useForwardProps(props);
</script>

<template>
	<HoverCardRoot v-bind="forwarded">
		<slot />
	</HoverCardRoot>
</template>
