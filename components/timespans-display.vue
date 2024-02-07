<script lang="ts" setup>
import type { LinkedPlaceFeature } from "@/types/api";

interface DateSpan {
	comments?: string | null;
	earliest?: string | null;
	latest?: string | null;
}

const t = useTranslations();

const props = defineProps<{
	timespans: NonNullable<LinkedPlaceFeature["when"]>["timespans"];
}>();

function timespanToDateSpans(
	timespan?: { start?: DateSpan; end?: DateSpan } | null,
): { start: string | null; end: string | null } | null {
	if (!timespan) return null;
	const start = timespan.start ? createDateSpan(timespan.start) : null;
	const end = timespan.end ? createDateSpan(timespan.end) : null;

	if (!start && !end) return null;

	return {
		start,
		end,
	};
}

const timespans = computed(() => {
	if (!props.timespans) return null;
	return props.timespans.map(timespanToDateSpans).filter((timespan) => {
		return timespan !== null;
	});
});
</script>

<template>
	<div>
		<template v-if="timespans && timespans.length > 0">
			<template v-for="(timespan, index) in timespans" :key="index">
				<div class="flex justify-between">
					<div>
						<p>{{ t("when-display.start") }}: {{ timespan?.start }}</p>
					</div>
					<div>
						<p>{{ t("when-display.end") }}: {{ timespan?.end }}</p>
					</div>
				</div>
			</template>
		</template>
		<template v-else>
			<div>
				{{ t("when-display.no-dates") }}
			</div>
		</template>
	</div>
</template>
