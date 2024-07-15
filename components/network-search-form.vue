<script lang="ts" setup>
import { SearchIcon } from "lucide-vue-next";

import { project } from "../config/project.config";

export interface SearchFormData {
	search: string;
}

const props = defineProps<SearchFormData>();

const emit = defineEmits<{
	(event: "submit", values: SearchFormData): void;
}>();

const t = useTranslations();

function onSubmit(event: Event) {
	const element = event.currentTarget as HTMLFormElement;
	const formData = new FormData(element);

	emit("submit", {
		search: formData.get("q") as string,
	});
}

// FIXME: useId() from radix-vue does not seem to be SSR-safe
// @see https://github.com/radix-vue/radix-vue/discussions/558
// vue 3.5 should get a built-in useId
const searchLabelId = "search-field";
</script>

<template>
	<form
		class="grid w-full grid-cols-[15fr_1fr] items-end gap-x-4 py-4"
		role="search"
		@submit.prevent="onSubmit"
	>
		<div class="grid gap-y-1">
			<Label v-if="!project.fullscreen" :for="searchLabelId">{{ t("SearchForm.search") }}</Label>
			<Input
				:id="searchLabelId"
				:default-value="props.search"
				name="q"
				:placeholder="t('SearchForm.search')"
				type="search"
			/>
		</div>

		<Button type="submit">
			<SearchIcon aria-hidden="true" class="size-4 shrink-0" />
			{{ t("SearchForm.search") }}
		</Button>
	</form>
</template>
