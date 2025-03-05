<script lang="ts" setup>
import { SearchIcon } from "lucide-vue-next";

import { categories, type Category } from "@/composables/use-get-search-results";

export interface SearchFormData {
	search: string;
	category: Category;
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
		category: formData.get("category") as Category,
	});
}

// FIXME: useId() from radix-vue does not seem to be SSR-safe
// @see https://github.com/radix-vue/radix-vue/discussions/558
// vue 3.5 should get a built-in useId
const searchLabelId = "search-field";
</script>

<template>
	<form
		class="grid w-full grid-cols-[auto_1fr_auto] items-end gap-x-4 py-4"
		role="search"
		@submit.prevent="onSubmit"
	>
		<div class="grid gap-y-1">
			<!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
			<Select name="category" :default-value="props.category">
				<SelectTrigger :aria-label="t('SearchForm.filter')" class="min-w-48">
					<SelectValue :placeholder="t('SearchForm.select-filter')" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem
						v-for="category of categories.toSorted((a, b) =>
							t(`SearchForm.filters.${a}`).localeCompare(t(`SearchForm.filters.${b}`)),
						)"
						:key="category"
						:value="category"
					>
						{{ t(`SearchForm.filters.${category}`) }}
					</SelectItem>
				</SelectContent>
			</Select>
		</div>

		<div class="grid gap-y-1">
			<Label :class="{ 'sr-only': project.fullscreen }" :for="searchLabelId">
				{{ t("SearchForm.search") }}
			</Label>
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
