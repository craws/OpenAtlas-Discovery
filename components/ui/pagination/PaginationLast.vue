<script lang="ts" setup>
import { ChevronsRightIcon } from "lucide-vue-next";
import { PaginationLast, type PaginationLastProps, useForwardProps } from "radix-vue";

import { Button } from "@/components/ui/button";

const props = withDefaults(defineProps<PaginationLastProps>(), {
	asChild: true,
});
const forwarded = useForwardProps(props);
</script>

<template>
	<PaginationLast v-bind="forwarded">
		<Button class="size-9 p-0" variant="outline">
			<slot>
				<ChevronsRightIcon />
			</slot>
		</Button>
	</PaginationLast>
</template>
