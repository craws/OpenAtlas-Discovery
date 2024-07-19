<script lang="ts" setup>
import { MapIcon, WaypointsIcon } from "lucide-vue-next";
import { z } from "zod";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const t = useTranslations();

const route = useRoute();

definePageMeta({
	validate(route) {
		const env = useRuntimeConfig();
		if (env.public.NUXT_PUBLIC_DATABASE === "disabled") return false;

		const paramsSchema = z.object({
			id: z.coerce.number().int().positive(),
		});
		return paramsSchema.safeParse(route.params).success;
	},
});

usePageMetadata({
	title: t("EntityPage.meta.title"),
});

const id = computed(() => {
	if (route.query.selection != null) {
		return Number(route.query.selection);
	} else return null;
});

const currentView = useGetCurrentView();
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
										path: `/${currentView === 'network' ? 'map' : 'network'}`,
										query: id ? { selection: id } : {},
									}"
								>
									<MapIcon v-if="currentView === 'network'" class="size-6" />
									<WaypointsIcon v-else class="size-6" />
									<span class="sr-only">{{
										currentView === "network" ? t("MapPage.title") : t("NetworkPage.title")
									}}</span>
								</NavLink>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p v-if="currentView === 'map'">{{ t("EntityPage.network") }}</p>
							<p v-if="currentView === 'network'">{{ t("EntityPage.map") }}</p>
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
