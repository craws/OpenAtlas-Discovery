<script setup lang="ts">
const props = defineProps<{ aliases: Array<{ alias: string }> }>();

const aliasList = computed(() => {
	return props.aliases.reduce((acc: string, a: { alias: string }) => {
		if (acc.length === 0) {
			return a.alias;
		} else {
			return `${acc}, ` + a.alias;
		}
	}, "");
});
</script>

<template>
	<CardDescription>
		{{ aliasList }}
	</CardDescription>
</template>
