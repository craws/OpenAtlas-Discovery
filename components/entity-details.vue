<script lang="ts" setup>
import { groupByToMap, keyByToMap } from "@acdh-oeaw/lib";

import { useIdPrefix } from "@/composables/use-id-prefix";

const { getUnprefixedId } = useIdPrefix();

const t = useTranslations();

const props = defineProps<{
	relations: EntityFeature["relations"],
	types: EntityFeature["types"] }>();


const relationsByType = computed(() => {
	return groupByToMap(props.relations ?? [], (relation: NonNullable<EntityFeature["relations"]>[0]) => {
		// FIXME: This used to use `relationType` (without the prefix)
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return relation.relationSystemClass!;
	});
});

const typesById = computed(() => {
	return keyByToMap(props.types ?? [], (type: NonNullable<EntityFeature["types"]>[0]) => {
		return type.identifier;
	});
});

</script>

<template>
	<Card>
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
								<span
									v-if="
										relation.relationSystemClass === 'type' &&
										typesById.has(relation.relationTo)
									"
								>
									({{ typesById.get(relation.relationTo)?.hierarchy }})
								</span>
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
									<span
										v-if="
											relation.relationSystemClass === 'type' &&
											typesById.has(relation.relationTo)
										"
									>
										({{ typesById.get(relation.relationTo)?.hierarchy }})
									</span>
								</li>
							</ul>
						</details>
					</dd>
				</div>
			</dl>
		</CardContent>
	</Card>
</template>
