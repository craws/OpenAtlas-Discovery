<script lang="ts" setup>
import { MapIcon, WaypointsIcon } from "lucide-vue-next";
import { z } from "zod";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const t = useTranslations();

const route = useRoute();

function getPath() {
	if (route.path.includes("visualization")) {
		return "visualization";
	}
	return "";
}

usePageMetadata({
	title: t("EntityPage.meta.title"),
});

const id = computed(() => {
	if (route.query.selection != null) {
		return Number(route.query.selection);
	} else return null;
});

const currentMode = computed(() => {
	return route.query.mode;
});
</script>

<template>
	<NuxtLayout name="default">
		<MainContent class="relative h-full">
			<template v-if="id != null">
				<EntitySidebar :id="id" />
			</template>
			<div class="absolute right-4 z-20" style="top: calc(50% - 40px)">
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
											...(id && { selection: id }),
										},
									}"
								>
									<MapIcon v-if="currentMode === 'network'" class="size-6" />
									<WaypointsIcon v-else class="size-6" />
									<span class="sr-only">{{
										currentMode === "network" ? t("MapPage.title") : t("NetworkPage.title")
									}}</span>
								</NavLink>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p v-if="currentMode === 'map'">{{ t("EntityPage.network") }}</p>
							<p v-if="currentMode === 'network'">{{ t("EntityPage.map") }}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
			<div class="relative grid h-full">
				<slot />
			</div>
		</MainContent>
	</NuxtLayout>
</template>
