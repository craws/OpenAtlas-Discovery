<script lang="ts" setup>
import type { EntityFeature } from "@/composables/use-create-entity";

const props = defineProps<{
	timespans: NonNullable<EntityFeature["when"]>["timespans"];
}>();

const t = useTranslations();

const datespans = computed(() => {
	const datespans: Array<{ start: string | null; end: string | null }> = [];

	props.timespans?.forEach((timespan) => {
		const start = timespan.start ? createDateSpan(timespan.start) : null;
		const end = timespan.end ? createDateSpan(timespan.end) : null;
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
				<dl class="flex justify-between">
					<div v-if="timespan.start != null">
						<dt>{{ t("TimespansDisplay.start") }}</dt>
						<dd>{{ timespan.start }}</dd>
					</div>
					<div v-if="timespan.end != null">
						<dt>{{ t("TimespansDisplay.end") }}</dt>
						<dd>{{ timespan?.end }}</dd>
					</div>
				</dl>
			</template>
		</template>
		<template v-else>
			<div>{{ t("TimespansDisplay.no-dates") }}</div>
		</template>
	</div>
</template>
