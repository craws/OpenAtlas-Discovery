<script lang="ts" setup>
const props = defineProps<{
	targetId: string;
}>();

/**
 * @see https://bugzilla.mozilla.org/show_bug.cgi?id=308064
 */
function onClick() {
	const element = document.getElementById(props.targetId);
	element?.focus();
}

const route = useRoute();
</script>

<template>
	<NuxtLink
		class="rounded fixed -translate-y-full bg-background px-4 py-3 text-foreground transition focus:translate-y-0"
		:href="{ query: route.query, hash: `#${props.targetId}` }"
		@click="onClick"
	>
		<slot />
	</NuxtLink>
</template>
