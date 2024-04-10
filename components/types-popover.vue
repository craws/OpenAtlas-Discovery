<script setup lang="ts">
import PopoverTrigger from "@/components/ui/popover/PopoverTrigger.vue";
import type { LinkedPlaceFeature } from "@/types/api";

type LpType = NonNullable<LinkedPlaceFeature["types"]> extends Array<(infer U)> ? U : never;


const { getUnprefixedId } = useIdPrefix();

defineProps<{type: LpType}>();
</script>

<template>
	<Popover >
		<PopoverTrigger>
			<Button variant="outline" class="max-w-48">
				<span class="overflow-hidden text-ellipsis" >
					{{ type.label }}
				</span>
			</Button>
		</PopoverTrigger>
		<PopoverContent>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<!-- TODO: Clickable, properly split Elements -->
						{{ type.hierarchy }}
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
