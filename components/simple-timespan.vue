<script lang="ts" setup>
import { isNonEmptyString } from "@acdh-oeaw/lib";

import type { EntityFeature } from "@/composables/use-create-entity";

const t = useTranslations();

const props = defineProps<{
	timespans: NonNullable<EntityFeature["when"]>["timespans"];
}>();

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
				<!-- {{timespan.end ? '' : t("TimespansDisplay.start") + ' '}}{{ timespan.start }} {{timespan.start && timespan.end ? '-' : ''}} {{timespan.start ? '' : t("TimespansDisplay.end") + ' '}}{{ timespan.end }} -->

				<dl class="flex grow-0 flex-col items-end">
					<div v-if="timespan.start != null" class="text-right">
						<dt
							class="mr-2 inline text-xs font-medium uppercase tracking-wider text-muted-foreground"
						>
							{{ t("TimespansDisplay.start") }}
						</dt>
						<dd class="inline">{{ timespan.start }}</dd>
					</div>
					<div v-if="timespan.end != null" class="text-right">
						<dt
							class="mr-2 inline text-xs font-medium uppercase tracking-wider text-muted-foreground"
						>
							{{ t("TimespansDisplay.end") }}
						</dt>
						<dd class="inline">{{ timespan.end }}</dd>
					</div>
				</dl>
			</template>
		</template>
		<template v-else>
			<!-- <div class="italic">{{ t("TimespansDisplay.no-dates") }}</div> -->
		</template>
	</div>
</template>
