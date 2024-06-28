<script lang="ts" setup>
import { MapIcon, WaypointsIcon } from "lucide-vue-next";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { z } from "zod";

const env = useRuntimeConfig();

const isVisible = false;

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
	return Number(route.params.id as string);
});

const currentView = useGetCurrentView();
</script>

<template>
	<NuxtLayout name="default">
		<MainContent class="relative grid h-full">
			<div
				class="absolute right-4 z-20 rounded-md bg-white/90 p-6 shadow-md dark:bg-neutral-900"
				style="top: calc(50% - 48px)"
			>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<NavLink
								class="flex items-center gap-1 underline decoration-dotted hover:no-underline"
								:href="{
									path: `/entities/${id}/${currentView === 'network' ? 'map' : 'network'}`,
								}"
							>
								<MapIcon v-if="currentView === 'network'" class="size-6" />
								<WaypointsIcon v-else class="size-6" />
								<span class="sr-only">{{
									currentView === "network" ? t("MapPage.title") : t("NetworkPage.title")
								}}</span>
							</NavLink></TooltipTrigger
						>
						<TooltipContent>
							<p v-if="currentView === 'map'">{{ t("EntityPage.network") }}</p>
							<p v-if="currentView === 'network'">{{ t("EntityPage.map") }}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
			<template v-if="env.public.NUXT_PUBLIC_DATABASE !== 'disabled'">
				<ErrorBoundary>
					<DataMapView v-if="currentView === 'map'" />
					<DataNetworkView v-if="currentView === 'network'" />
				</ErrorBoundary>
			</template>
			<template v-else>
				<div>{{ t("DataPage.work-in-progress") }}</div>
			</template>
			<slot />
		</MainContent>
	</NuxtLayout>
</template>
