<script lang="ts" setup>
import {
	CircleOffIcon,
	MapPinIcon,
	MapPinOffIcon,
	RadiusIcon,
	TablePropertiesIcon,
} from "lucide-vue-next";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { project } from "@/config/project.config";

const props = defineProps<{
	currentMode: string;
	id: number | null;
}>();

const t = useTranslations();

const route = useRoute();

function getPath() {
	if (route.path.includes("visualization")) {
		return "visualization";
	}
	return "";
}

let hasPlace = ref(true);
let inNetwork = ref(true);

const { data } = useGetEntity(
	computed(() => {
		return { entityId: Number(props.id) };
	}),
);

watch(
	() => {
		return data;
	},
	() => {
		const entity = data.value?.features[0];
		if (entity) {
			entityHasCoordinates(entity);
			entityInNetwork(entity);
		}
	},
	{ immediate: true, deep: true },
);

function entityHasCoordinates(entity: EntityFeature) {
	if (!project.map.mapDisplayedSystemClasses.includes(entity.systemClass)) {
		hasPlace.value = false;
	}
	if (project.map.mapDisplayedSystemClasses.includes(entity.systemClass)) {
		if (
			entity.geometry == null ||
			(entity.geometry.type === "GeometryCollection" && entity.geometry.geometries.length === 0)
		) {
			hasPlace.value = false;
		} else if (
			entity.geometry.type !== "GeometryCollection" &&
			entity.geometry.coordinates.length === 0
		) {
			hasPlace.value = false;
		} else hasPlace.value = true;
	}
}

function entityInNetwork(entity: EntityFeature) {
	if (project.network.excludeSystemClasses.includes(entity.systemClass)) {
		inNetwork.value = false;
	} else inNetwork.value = true;
}
</script>

<template>
	<div class="grid gap-2 rounded-md bg-white/90 p-4 shadow-md dark:bg-black/90">
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<div
						:class="
							props.currentMode === 'map'
								? 'rounded-md bg-brand p-4 shadow-md'
								: !hasPlace
									? 'rounded-md bg-neutral-300 p-4 shadow-md'
									: 'rounded-md bg-primary/90 p-4 shadow-md dark:bg-white'
						"
					>
						<NavLink
							v-if="hasPlace"
							class="flex items-center gap-1 underline decoration-dotted hover:no-underline"
							:href="{
								path: `/${getPath()}`,
								query: {
									mode: 'map',
									...(props.id && { selection: props.id }),
								},
							}"
						>
							<MapPinIcon class="size-6 text-white dark:text-black" />
						</NavLink>
						<MapPinOffIcon v-if="!hasPlace" class="size-6 text-white dark:text-black" />
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<p v-if="hasPlace">{{ t("EntityPage.map") }}</p>
					<p v-if="!hasPlace && props.id">{{ t("EntityPage.no-map") }}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<div
						:class="
							props.currentMode === 'network'
								? 'rounded-md bg-brand p-4 shadow-md'
								: !inNetwork
									? 'rounded-md bg-neutral-300 p-4 shadow-md'
									: 'rounded-md bg-primary/90 p-4 shadow-md dark:bg-white'
						"
					>
						<NavLink
							v-if="inNetwork"
							class="flex items-center gap-1 underline decoration-dotted hover:no-underline"
							:href="{
								path: `/${getPath()}`,
								query: {
									mode: 'network',
									...(props.id && { selection: props.id }),
								},
							}"
						>
							<RadiusIcon class="size-6 text-white dark:text-black" />
						</NavLink>
						<CircleOffIcon v-if="!inNetwork" class="size-6 text-white dark:text-black" />
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<p v-if="inNetwork">{{ t("EntityPage.network") }}</p>
					<p v-if="!inNetwork">{{ t("EntityPage.no-network") }}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<div
						:class="
							props.currentMode === 'table'
								? 'rounded-md bg-brand p-4 shadow-md'
								: 'rounded-md bg-primary/90 p-4 shadow-md dark:bg-white'
						"
					>
						<NavLink
							class="flex items-center gap-1 underline decoration-dotted hover:no-underline"
							:href="{
								path: `/${getPath()}`,
								query: {
									mode: 'table',
									...(props.id && { selection: props.id }),
								},
							}"
						>
							<TablePropertiesIcon class="size-6 text-white dark:text-black" />
						</NavLink>
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<p>{{ t("DataPage.title") }}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	</div>
</template>
