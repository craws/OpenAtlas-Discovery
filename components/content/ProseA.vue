<script setup lang="ts">
import { isUrl } from "@acdh-oeaw/lib";

const localePath = useLocalePath();

const props = defineProps<{
	href: string;
	target?: "_blank";
}>();

const isExternalUrl = computed(() => {
	return isUrl(props.href);
});

const href = computed(() => {
	if (isExternalUrl.value) return props.href;
	return localePath(props.href);
});

const target = computed(() => {
	if (props.target != null) return props.target;
	if (isExternalUrl.value) return "_blank";
	return undefined;
});
</script>

<template>
	<NuxtLink :href="href" :target="target">
		<slot />
	</NuxtLink>
</template>
