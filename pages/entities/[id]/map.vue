<script lang="ts" setup>
definePageMeta({
	layout: "visualization"
});

const t = useTranslations();

const { entity } = useGetEntityFromRoute();

useHead({
	title: computed(() => {
		return entity.value?.properties.title ?? t("EntityPage.meta.title");
	}),
});
</script>

<template>
	<template v-if="entity != null">
		<EntitySidebar :entity="entity" />
	</template>
</template>
