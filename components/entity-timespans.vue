<script lang="ts" setup>
import { isNonEmptyString } from "@acdh-oeaw/lib";

import type { EntityFeature } from "@/composables/use-create-entity";

const props = defineProps<{
	timespans: NonNullable<EntityFeature["when"]>["timespans"];
}>();

const t = useTranslations();

const datespans = computed(() => {
	const datespans: Array<{ start: string | null; end: string | null }> = [];

	props.timespans?.forEach((timespan) => {
		const _start = timespan.start ? createDateSpan(timespan.start) : null;
		const _end = timespan.end ? createDateSpan(timespan.end) : null;
		const start = isNonEmptyString(_start) ? _start : null;
		const end = isNonEmptyString(_end) ? _end : null;
		if (start == null && end == null) return;
		datespans.push({ start, end });
	});

	return datespans;
});
</script>

<template>
	<div>
		<template v-if="datespans.length > 0">
			<template v-for="(timespan, index) of datespans" :key="index">
				<dl class="flex gap-12">
					<div v-if="timespan.start != null">
						<dt class="text-xs font-medium uppercase tracking-wider text-muted-foreground">
							{{ t("TimespansDisplay.start") }}
						</dt>
						<dd>{{ timespan.start }}</dd>
					</div>
					<div v-if="timespan.end != null">
						<dt class="text-xs font-medium uppercase tracking-wider text-muted-foreground">
							{{ t("TimespansDisplay.end") }}
						</dt>
						<dd>{{ timespan.end }}</dd>
					</div>
				</dl>
			</template>
		</template>
		<template v-else>
			<!-- <div class="italic">{{ t("TimespansDisplay.no-dates") }}</div> -->
		</template>
	</div>
</template>
