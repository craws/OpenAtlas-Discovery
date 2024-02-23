<script lang="ts" setup>
import { MoreHorizontalIcon } from "lucide-vue-next";
import { PaginationEllipsis, type PaginationEllipsisProps, useForwardProps } from "radix-vue";

import { cn } from "@/utils/styles";

defineOptions({
	inheritAttrs: false,
});

const props = defineProps<PaginationEllipsisProps>();
const forwarded = useForwardProps(props);
const { class: className, ...rest } = useAttrs();
</script>

<template>
	<PaginationEllipsis
		:class="cn('w-9 h-9 flex items-center justify-center', className ?? '')"
		v-bind="{ ...forwarded, ...rest }"
	>
		<slot>
			<MoreHorizontalIcon />
		</slot>
	</PaginationEllipsis>
</template>
