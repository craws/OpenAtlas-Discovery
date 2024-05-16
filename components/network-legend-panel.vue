<script setup lang="ts">
import { colors } from "@/project.config.json";

const t = useTranslations();

export interface SearchFormData {
	category: string; // TODO: stricter typings
}

const props = defineProps<{
	systemClasses: Array<string>;
}>();

const emit = defineEmits<{
	(event: "submit", values: SearchFormData): void;
}>();

// TODO: Fix me! Implement filtering by system classes
function onSubmit(element: string) {
	emit("submit", {
		category: element, //Array, checkbox-group html + how do i get teh values in the submit event handler
	});
}

const labels = {
	place: t("SystemClassNames.place"),
	source: t("SystemClassNames.source"),
	person: t("SystemClassNames.person"),
	group: t("SystemClassNames.group"),
	move: t("SystemClassNames.move"),
	event: t("SystemClassNames.event"),
	activity: t("SystemClassNames.activity"),
	acquisition: t("SystemClassNames.acquisition"),
	feature: t("SystemClassNames.feature"),
	human_remains: t("SystemClassNames.human_remains"),
	stratigraphic_unit: t("SystemClassNames.stratigraphic_unit"),
	artifact: t("SystemClassNames.artifact"),
	file: t("SystemClassNames.file"),
	type: t("SystemClassNames.type"),
	object_location: t("SystemClassNames.object_location"),
	bibliography: t("SystemClassNames.bibliography"),
	edition: t("SystemClassNames.edition"),
	administrative_unit: t("SystemClassNames.administrative_unit"),
	reference_system: t("SystemClassNames.reference_system"),
	source_translation: t("SystemClassNames.source_translation"),
};

const systemClassColors = colors.entityColors;
</script>

<template>
	<aside
		class="flex max-h-72 gap-2 overflow-y-auto overflow-x-hidden rounded-md border-2 border-transparent bg-white px-4 py-2 text-sm shadow-md"
	>
		<div
			v-for="el in props.systemClasses"
			:key="el"
			class="grid grid-cols-[auto_1fr] gap-3"
			:style="`color: ${systemClassColors[el] ? systemClassColors[el] : '#666'}`"
		>
			<div class="grid grid-cols-[auto_1fr] gap-2">
				<!-- <input
					:id="el"
					type="checkbox"
					name="systemClassCheckbox"
					:style="`accent-color: ${systemClassColors[el] ? systemClassColors[el] : '#666'}`"
					checked
					@change="onSubmit(el)"
				/> -->
				<span
					class="m-1.5 size-2 rounded-full"
					:style="`background-color: ${systemClassColors[el] ? systemClassColors[el] : '#666'}`"
				></span>
				<span v-if="labels[el]">{{ labels[el] }}</span>
				<span v-else> {{ el }}</span>
			</div>
		</div>
	</aside>
</template>
