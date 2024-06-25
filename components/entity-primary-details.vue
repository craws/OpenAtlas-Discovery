<script setup lang="ts">
import CustomPrimaryDetailsActor from '@/components/custom-primary-details-actor.vue';
import CustomPrimaryDetailsPlace from '@/components/custom-primary-details-place.vue';
import CustomPrimaryDetailsFeature from '@/components/custom-primary-details-feature.vue';
import { MapPinIcon } from 'lucide-vue-next';

const getRelationTitle = (relation: RelationType) => {
	return useRelationTitle(relation, props.entity.systemClass)
}

const getRelationGroupTitle = (relation: RelationType) => {
	return useRelationGroupTitle(relation, props.entity.systemClass)
}

const {getUnprefixedId} = useIdPrefix();

const props = defineProps<{
	entity: EntityFeature,
}>();

interface Image {
	IIIFManifest: string | undefined;
	license: string | undefined;
	mimetype?: string | undefined;
	title?: string | undefined;
	url?: string | undefined;
}

const images = computed(() => {
	return props.entity.depictions
		?.reduce((acc: Array<Image>, depiction) => {
			if (depiction.url && depiction.license) {
				acc.push({
					url: depiction.url,
					license: depiction.license,
					IIIFManifest: depiction.IIIFManifest,
					mimetype: depiction.mimetype,
					title: depiction.title
				});
			}
			return acc;
		}, []);
});

const customPrimaryDetails = computed(() => {
	return entityPrimaryDetailsDict[props.entity.systemClass];
});

const entityPrimaryDetailsDict: Record<string, Component> = {
	"person": CustomPrimaryDetailsActor,
	"group": CustomPrimaryDetailsActor,
	"stratigraphic_unit": CustomPrimaryDetailsPlace,
	"feature": CustomPrimaryDetailsFeature
}

const handledRelations: Set<RelationType> = new Set([
	{
		crmCode: "P1" // "is identified by" are the aliases
	},
	{
		crmCode: "P2" // "has type" are the types
	},
])

const emit = defineEmits({
	handledRelations(payload: Array<RelationType>) {
		return payload;
	}}
);

let alreadyEmitted = false;

onMounted(() => {
	if (!alreadyEmitted) emitHandledRelations([]);
});

function emitHandledRelations(relations: Array<RelationType>) {
	alreadyEmitted = true;
	for (const relation of relations) handledRelations.add(relation);
	emit("handledRelations", [...handledRelations]);
}

interface Place {
	label: string,
	id: string,
	relationType: RelationType | null
}

// TODO: For instances where there is no location set (at least for actors), make use of first and last event if no places are available
const places = computed(() => {
	return props.entity.relations?.reduce((acc: Array<Place>, relation) => {
		if(relation.relationSystemClass !== "object_location") return acc;
		if(!relation.label || !relation.relationTo || !relation.relationType) return acc;
		const id = getUnprefixedId(relation.relationTo);
		const relationType = extractRelationTypeFromRelationString(relation.relationType);
		const label = relation.label;
		if(!id) return acc;
		return [
			...acc,
			{
				label,
				id,
				relationType
			}]
	}, []);
});

watchEffect( () => {
	if(!places.value || places.value.length === 0) return;
	const relTypes = places.value.map(place => place.relationType);
	for(const type of relTypes) {
		if(type) handledRelations.add(type);
	}
	emitHandledRelations([]);
});


</script>

<template>
	<CardHeader>
		<EntitySystemClass :system-class="entity.systemClass" />
		<PageTitle>{{ entity.properties.title }}</PageTitle>
		<EntityAliases v-if="entity.names" :aliases="entity.names" />
		<EntityTimespans :timespans="entity.when?.timespans" />
	</CardHeader>
	<CardContent>
		<div class="grid gap-4">
			<EntityDescriptions :descriptions="entity?.descriptions ?? []" />

			<div class="flex w-full flex-row flex-wrap gap-4">
				<template
					v-for="(place) in places"
					:key="place.label || `place-${index}`"
				>
					<InfoCard
						v-if="place.relationType"
						class="max-w-48 p-4"
						:icon="MapPinIcon"
						:title="getRelationTitle(place.relationType)"
						>
						<template #content>
							<EntityPreviewLink v-if="place.id" :id="useToNumber(place.id).value">
								{{ place.label }}
							</EntityPreviewLink>
							{{ place.id ? '' : place.label }}
						</template>
					</InfoCard>
				</template>
			</div>

			<!-- Types -->
			<div class=" flex flex-row flex-wrap gap-1">
				<TypesPopover
					v-for="type in entity.types"
					:key="(type.identifier ?? type.label) ?? 'missing'"
					:type="type" />
			</div>

			<component
				:is="customPrimaryDetails"
				v-if="customPrimaryDetails"
				:entity="entity"
				@handled-relations="emitHandledRelations"
			/>

			<EntityImages v-if="images" :images="images" class="overflow-hidden"/>
		</div>
	</CardContent>
</template>
