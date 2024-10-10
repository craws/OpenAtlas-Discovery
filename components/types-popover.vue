<script setup lang="ts">
import type { LinkedPlaceFeature } from "@/types/api";

type LpType = NonNullable<LinkedPlaceFeature["types"]> extends Array<infer U> ? U : never;

const t = useTranslations();

const { getUnprefixedId } = useIdPrefix();
const route = useRoute();

const props = defineProps<{ type: LpType }>();

const hierarchy = computed(() => {
	return props.type.typeHierarchy ?? [];
});

const hiddenHierarchy = computed(() => {
	return hierarchy.value.slice(1);
});

function getPath() {
	if (route.path.includes("visualization")) {
		return "visualization";
	}
	return "";
}

const currentMode = computed(() => {
	return route.query.mode;
});
</script>

<template>
	<Popover>
		<PopoverTrigger>
			<Button variant="outline" class="max-w-48">
				<span>
					{{ type.label }}
					<span v-if="type.value && type.unit" class="ml-1 text-muted-foreground">
						{{ type.value }} <span> {{ type.unit }}</span>
					</span>
					<span class="sr-only">{{ t("Global.ShowMore") }}</span>
				</span>
			</Button>
		</PopoverTrigger>
		<PopoverContent>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem v-if="hierarchy[0]">
						<NavLink
							v-if="hierarchy[0]?.identifier"
							class="underline decoration-dotted hover:no-underline"
							:href="{
								path: `/${getPath()}`,
								query: {
									mode: currentMode,
									selection: getUnprefixedId(hierarchy[0]?.identifier),
								},
							}"
						>
							{{ hierarchy[0].label }}
						</NavLink>
						<span v-else>
							{{ hierarchy[0].label }}
						</span>
					</BreadcrumbItem>
					<BreadcrumbSeparator v-if="hiddenHierarchy.length > 0" />
					<BreadcrumbItem v-if="hiddenHierarchy.length > 1">
						<DropdownMenu>
							<DropdownMenuTrigger class="flex items-center gap-1">
								<BreadcrumbEllipsis class="size-4" />
								<span class="sr-only">Toggle menu</span>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start">
								<DropdownMenuItem
									v-for="(hierarchyItem, index) in hiddenHierarchy"
									:key="hierarchyItem.label ?? index"
								>
									<NavLink
										v-if="hierarchyItem.identifier"
										class="underline decoration-dotted hover:no-underline"
										:href="{
											path: `/${getPath()}`,
											query: {
												mode: currentMode,
												selection: getUnprefixedId(hierarchyItem.identifier),
											},
										}"
									>
										{{ hierarchyItem.label }}
									</NavLink>
									<span v-else>
										{{ hierarchyItem.label }}
									</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</BreadcrumbItem>
					<BreadcrumbItem v-else-if="hiddenHierarchy.length === 1 && hiddenHierarchy[0]">
						<NavLink
							v-if="hiddenHierarchy[0].identifier"
							class="underline decoration-dotted hover:no-underline"
							:href="{
								path: `/${getPath()}`,
								query: {
									mode: currentMode,
									selection: getUnprefixedId(hiddenHierarchy[0].identifier),
								},
							}"
						>
							{{ hiddenHierarchy[0].label }}
						</NavLink>
						<span v-else>
							{{ hiddenHierarchy[0].label }}
						</span>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<NavLink
							v-if="type.identifier"
							class="underline decoration-dotted hover:no-underline"
							:href="{
								path: `/${getPath()}`,
								query: {
									mode: currentMode,
									selection: getUnprefixedId(type.identifier),
								},
							}"
						>
							{{ type.label }}
						</NavLink>
						<span v-else>
							{{ type.label }}
						</span>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<p>{{ type.descriptions }}</p>
		</PopoverContent>
	</Popover>
</template>
