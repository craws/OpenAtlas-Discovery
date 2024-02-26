<script lang="ts" setup>
/**
 * `error.vue` sits outside the routing structure, so we cannot define page metadata.
 *
 * @see https://github.com/nuxt/nuxt/issues/19344#issuecomment-1449685103
 */
// definePageMeta({
// 	title: "ErrorPage.meta.title",
// });

const props = defineProps<{
	error:
		| Error
		| {
				url: string;
				statusCode: number;
				statusMessage: string;
				message: string;
				description: string;
		  };
}>();

// const locale = useLocale();
const t = useTranslations();
const localePath = useLocalePath();

const isNotFoundPage = computed(() => {
	return "statusCode" in props.error && props.error.statusCode === 404;
});

/** `error.vue` is *not* wrapped in default layout out of the box. */
useHead({
	titleTemplate: computed(() => {
		return ["%s", t("Metadata.name")].join(" | ");
	}),
	title: computed(() => {
		return isNotFoundPage.value ? t("NotFoundPage.meta.title") : t("ErrorPage.meta.title");
	}),
});

useSeoMeta({
	robots: {
		noindex: true,
	},
});

function onReset() {
	void clearError({ redirect: localePath("/") });
}
</script>

<template>
	<MainContent class="grid min-h-full place-content-center place-items-center">
		<template v-if="isNotFoundPage">
			<h1>{{ t("NotFoundPage.title") }}</h1>
		</template>

		<template v-else>
			<h1>{{ t("ErrorPage.title") }}</h1>
			<div class="flex items-center gap-4">
				<span>{{ "statusCode" in props.error ? props.error.statusCode : 500 }}</span>
				<span>{{ props.error.message }}</span>
			</div>
			<div>
				<button @click="onReset">{{ t("ErrorPage.try-again") }}</button>
			</div>
		</template>
	</MainContent>
</template>
