<script setup lang="ts">
import { useDisplay } from "vuetify";

import type { LinkedPlacesModelRelations, LinkedPlacesModelTypes } from "~~/composables/api";
import type { DetailItem, relationGroup } from "~~/types/entityDetailTypes";

interface DetailList {
	title: string;
	detailItems: Array<DetailItem>;
}

const props = defineProps<{
	relations?: Array<relationGroup>;
	types?: Array<LinkedPlacesModelTypes>;
}>();

const detailsLists = computed(() => {
	const detailLists: Array<DetailList> = [];

	if (props.types) {
		const detailItems: Array<DetailItem> = [];
		props.types.forEach((type) => {
			detailItems.push({
				id:
					type.identifier?.substring(
						type.identifier.lastIndexOf("/") + 1,
						type.identifier.length,
					) ?? "id",
				label: type.label ?? "label",
				subheader: type.hierarchy?.split(" > ", 2)[0],
			});
		});

		detailLists.push({
			title: "Types",
			detailItems,
		});
	}
	if (props.relations) {
		props.relations.forEach((relationType) => {
			// We skip the Types Relation as we use the Type Property to get that info if present
			if (!(relationType.relationType.includes("crm:P2") && props.types)) {
				detailLists.push({
					title: relationType.relationType.substring(
						relationType.relationType.indexOf(" "),
						relationType.relationType.length,
					),
					detailItems: GetItemsFromRelation(relationType.relations),
				});
			}
		});
	}
	return detailLists;
});

function GetItemsFromRelation(relations: Array<LinkedPlacesModelRelations>): Array<DetailItem> {
	return relations.map((relation) => {
		return {
			id: relation.relationTo?.split("/").at(-1) ?? "id",
			label: relation.label ?? "label",
		};
	});
}

const { name } = useDisplay();

const columnCount = computed(() => {
	// name is reactive and
	// must use .value
	switch (name.value) {
		case "xs":
			return 1;
		case "sm":
			return 2;
	}

	return 3;
});
</script>

<template>
	<div class="mx-0 pt-4 mb-1">
		<h3 class="pl-4">
			{{ $t("components.entity.details_header") }}
		</h3>
		<div class="details py-2 px-4">
			<EntityDetailCard
				v-for="detail in detailsLists"
				:key="detail.title"
				:title="detail.title"
				:details="detail.detailItems"
				class="mb-3"
			/>
		</div>
	</div>
</template>

<style scoped>
.details {
	column-count: v-bind(columncount);
}
</style>
