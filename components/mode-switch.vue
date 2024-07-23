<script lang="ts" setup>
import { MapPinIcon, MapPinOffIcon, WaypointsIcon } from "lucide-vue-next";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
		}
	},
	{ immediate: true, deep: true },
);

function entityHasCoordinates(entity: EntityFeature) {
	if (entity.systemClass !== "place") {
		hasPlace.value = false;
	}
	if (entity.systemClass === "place") {
		hasPlace.value = true;
	}
}
</script>

<template>
	<div v-if="hasPlace">
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<div class="rounded-md bg-white/90 p-4 shadow-md dark:bg-neutral-900">
						<NavLink
							class="flex items-center gap-1 underline decoration-dotted hover:no-underline"
							:href="{
								path: `/${getPath()}`,
								query: {
									mode: currentMode === 'network' ? 'map' : 'network',
									...(props.id && { selection: props.id }),
								},
							}"
						>
							<MapPinIcon v-if="currentMode === 'network'" class="size-6" />
							<WaypointsIcon v-else class="size-6" />
							<span class="sr-only">{{
								currentMode === "network" ? t("MapPage.title") : t("NetworkPage.title")
							}}</span>
						</NavLink>
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<p v-if="props.currentMode === 'map'">{{ t("EntityPage.network") }}</p>
					<p v-if="props.currentMode === 'network'">{{ t("EntityPage.map") }}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	</div>
	<div v-if="!hasPlace && props.id">
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<div class="rounded-md bg-white/90 p-4 shadow-md dark:bg-neutral-900">
						<MapPinOffIcon v-if="currentMode === 'network'" class="size-6 text-neutral-400" />
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<p>{{ t("EntityPage.no-map") }}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	</div>
</template>
