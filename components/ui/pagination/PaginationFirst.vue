<script lang="ts" setup>
import { ChevronsLeftIcon } from "lucide-vue-next";
import { PaginationFirst, type PaginationFirstProps, useForwardProps } from "radix-vue";

import { Button } from "@/components/ui/button";

const props = withDefaults(defineProps<PaginationFirstProps>(), {
	asChild: true,
});
const forwarded = useForwardProps(props);
</script>

<template>
	<PaginationFirst v-bind="forwarded">
		<Button class="size-9 p-0" variant="outline">
			<slot>
				<ChevronsLeftIcon />
			</slot>
		</Button>
	</PaginationFirst>
</template>
