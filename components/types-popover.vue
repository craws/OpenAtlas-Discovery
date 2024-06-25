<script setup lang="ts">
import type { LinkedPlaceFeature } from "@/types/api";

type LpType = NonNullable<LinkedPlaceFeature["types"]> extends Array<(infer U)> ? U : never;

const t = useTranslations();

const { getUnprefixedId } = useIdPrefix();

const props = defineProps<{type: LpType}>();

const hierarchy = computed(() => {
	return props.type.typeHierarchy ?? [];
})

const hiddenHierarchy = computed(() => {
	return hierarchy.value.slice(1);
})
</script>

<template>
	<Popover >
		<PopoverTrigger>
			<Button variant="outline" class="max-w-48">
				<span class="overflow-hidden text-ellipsis" >
					{{ type.label }}
					<span class="sr-only">{{ t("Global.ShowMore")  }}</span>
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
							:href="{ path: `/entities/${getUnprefixedId(hierarchy[0]?.identifier)}` }"
						>
							{{ hierarchy[0].label }}
						</NavLink>
						<span v-else>
							{{ hierarchy[0].label }}
						</span>
					</BreadcrumbItem>
					<BreadcrumbSeparator v-if="hiddenHierarchy.length > 0" />
					<BreadcrumbItem v-if="hiddenHierarchy.length > 1" >
						<DropdownMenu>
							<DropdownMenuTrigger class="flex items-center gap-1">
								<BreadcrumbEllipsis class="size-4" />
								<span class="sr-only">Toggle menu</span>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start">
								<DropdownMenuItem v-for="(hierarchyItem, index) in hiddenHierarchy" :key="hierarchyItem.label ?? index" >
									<NavLink
										v-if="hierarchyItem.identifier"
										class="underline decoration-dotted hover:no-underline"
										:href="{ path: `/entities/${getUnprefixedId(hierarchyItem.identifier)}` }"
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
							:href="{ path: `/entities/${getUnprefixedId(hiddenHierarchy[0].identifier)}` }"
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
							:href="{ path: `/entities/${getUnprefixedId(type.identifier)}` }"
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

			<p v-if="type.value && type.unit" class="mt-2" >
				{{ type.value }} <span class="text-muted-foreground" > {{ type.unit }}</span>
			</p>

		</PopoverContent>
	</Popover>
</template>
