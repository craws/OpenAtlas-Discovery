<script lang="ts" setup>
const t = useTranslations();

const route = useRoute();

usePageMetadata({
	title: t("EntityPage.meta.title"),
});

const id = computed(() => {
	if (route.query.selection != null) {
		return Number(route.query.selection);
	} else return null;
});

const currentMode = computed(() => {
	return route.query.mode as string;
});
</script>

<template>
	<NuxtLayout name="default">
		<MainContent class="relative h-full">
			<template v-if="id != null">
				<EntitySidebar :id="id" />
			</template>
			<div class="absolute right-4 z-20" style="top: calc(50% - 40px)">
				<ModeSwitch :id="id" :current-mode="currentMode" />
			</div>
			<div class="relative grid h-full">
				<slot />
			</div>
		</MainContent>
	</NuxtLayout>
</template>
