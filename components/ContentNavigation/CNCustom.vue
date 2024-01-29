<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";

const Locale = useI18n().locale;

const updateNaviagation = ref(false);

const navLocaleQuery = computed((): QueryBuilderParams => {
	return {
		where: [
			{
				// Create a regex pattern to match the locale in the path
				_path: { $contains: `/${Locale.value}/` },
			},
		],
	};
});

const { data: fetchedNavigation } = await useAsyncData(
	"navigation",
	() => {
		const contentNav = fetchContentNavigation(navLocaleQuery.value);
		return contentNav;
	},
	{
		watch: [navLocaleQuery, updateNaviagation],
	},
);

onBeforeMount(() => {
	if (!fetchedNavigation.value || !fetchedNavigation.value[0]?._path.includes(Locale.value)) {
		updateNaviagation.value = true;
	}
});

const navigation = computed(() => {
	return fetchedNavigation.value?.[0]?.children ?? null;
});
</script>

<template>
	<template v-if="navigation !== null">
		<template v-for="el of navigation" :key="el._id">
			<ContentNavigationCNElement :nav-item="el" />
		</template>
	</template>
</template>
