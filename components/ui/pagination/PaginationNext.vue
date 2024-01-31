<script lang="ts" setup>
import { ChevronRightIcon } from "lucide-vue-next";
import { PaginationNext, type PaginationNextProps, useForwardProps } from "radix-vue";

import { Button } from "@/components/ui/button";

const props = withDefaults(defineProps<PaginationNextProps>(), {
	asChild: true,
});
const forwarded = useForwardProps(props);
</script>

<template>
	<PaginationNext v-bind="forwarded">
		<Button class="size-9 p-0" variant="outline">
			<slot>
				<ChevronRightIcon />
			</slot>
		</Button>
	</PaginationNext>
</template>
