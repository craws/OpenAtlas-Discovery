<script lang="ts" setup>
import { ChevronLeftIcon } from "lucide-vue-next";
import { PaginationPrev, type PaginationPrevProps, useForwardProps } from "radix-vue";

import { Button } from "@/components/ui/button";

const props = withDefaults(defineProps<PaginationPrevProps>(), {
	asChild: true,
});
const forwarded = useForwardProps(props);
</script>

<template>
	<PaginationPrev v-bind="forwarded">
		<Button class="size-9 p-0" variant="outline">
			<slot>
				<ChevronLeftIcon />
			</slot>
		</Button>
	</PaginationPrev>
</template>
