<script setup lang="ts">
import PopoverTrigger from "@/components/ui/popover/PopoverTrigger.vue";
import type { LinkedPlaceFeature } from "@/types/api";

type LpType = NonNullable<LinkedPlaceFeature["types"]> extends Array<(infer U)> ? U : never;


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
						{{ type.label }}
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<p>{{ type.descriptions }}</p>

			<span v-if="type.value && type.unit">
				<p>{{ type.value }}</p>
				<p>{{ type.unit }}</p>
			</span>

		</PopoverContent>
	</Popover>
</template>
