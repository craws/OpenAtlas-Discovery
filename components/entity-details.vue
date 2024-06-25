<script lang="ts" setup>
import { groupByToMap, keyByToMap } from "@acdh-oeaw/lib";

import { useIdPrefix } from "@/composables/use-id-prefix";

const { getUnprefixedId } = useIdPrefix();

const t = useTranslations();

const props = defineProps<{
	relations: EntityFeature["relations"],
	handledRelations: Array<RelationType>
}	>();

const filteredRelations = computed(() => {
	return props.relations?.filter((relation) => {
		if(props.handledRelations.length === 0) return true;
		return !props.handledRelations.some((handledRelation) => {
			const relationType = extractRelationTypeFromRelationString(relation.relationType);
			if (!relationType) return false;
			return handledRelation.crmCode === relationType.crmCode;
		});
	});
})

const relationsByType = computed(() => {
	return groupByToMap(filteredRelations.value ?? [], (relation: NonNullable<EntityFeature["relations"]>[0]) => {
		// FIXME: This used to use `relationType` (without the prefix)
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return relation.relationSystemClass!;
	});
});

</script>

<template>
	<Card v-if="filteredRelations && filteredRelations?.length > 0">
		<CardHeader>
			<CardTitle>{{ t("EntityPage.details") }}</CardTitle>
		</CardHeader>
		<CardContent>
			<dl
				class="grid gap-x-8 gap-y-4 sm:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] sm:justify-start"
			>
				<div v-for="[relationType, relations] of relationsByType" :key="relationType">
					<dt class="text-xs font-medium uppercase tracking-wider text-muted-foreground">
						{{ t(`SystemClassNames.${relationType}`) }}
					</dt>
					<dd>
						<ul role="list">
							<li v-for="(relation, index) of relations.slice(0, 10)" :key="index">
								<NavLink
									v-if="relation.relationTo"
									class="underline decoration-dotted hover:no-underline"
									:href="{ path: `/entities/${getUnprefixedId(relation.relationTo)}` }"
								>
									{{ relation.label }}
								</NavLink>
								<span v-else> {{ relation.label }} </span>
							</li>
						</ul>
						<details v-if="relations.length > 10">
							<summary class="cursor-pointer py-1 text-sm text-muted-foreground">
								Show more
							</summary>
							<ul role="list">
								<li v-for="(relation, index) of relations.slice(10)" :key="index">
									<NavLink
										v-if="relation.relationTo"
										class="underline decoration-dotted hover:no-underline"
										:href="{ path: `/entities/${getUnprefixedId(relation.relationTo)}` }"
									>
										{{ relation.label }}
									</NavLink>
									<span v-else> {{ relation.label }} </span>
								</li>
							</ul>
						</details>
					</dd>
				</div>
			</dl>
		</CardContent>
	</Card>
</template>
