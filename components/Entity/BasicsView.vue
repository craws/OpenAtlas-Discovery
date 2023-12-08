<script lang="ts" setup>
import { useI18n } from "vue-i18n";

import type { LinkedPlacesModelWhen } from "~~/composables/api";

import classes from "../../assets/classes.json";

const { t } = useI18n();

interface Props {
	loading?: boolean;
	title?: string;
	descriptions?: Array<string>;
	systemClass?: string;
	when?: LinkedPlacesModelWhen;
}

const props = defineProps<Props>();

const classIcon = computed(() => {
	if (systemClassName.value === t("components.entity.class_missing")) {
		return "mdi-help";
	}
	if (props.systemClass) {
		return classes.find((x) => x.systemClass === props.systemClass)?.icon ?? "mdi-help";
	}
});

const systemClassName = computed(() => {
	if (props.systemClass) {
		return classes.find((x) => x.systemClass === props.systemClass)?.en;
	}
	return t("components.entity.class_missing");
});
</script>

<template>
	<div>
		<VRow>
			<VCol>
				<div class="py-4">
					<VAvatar
						color="primary"
						size="56"
						style="position: absolute; top: 40px; left: 40px; z-index: -1; opacity: 20%; scale: 5"
					>
						<VIcon>{{ classIcon }}</VIcon>
					</VAvatar>
					<div>
						<h1 class="text-h4 text-md-h3">
							{{ title || $t("global.basics.title") }}
						</h1>
						<p class="text-overline">
							{{ systemClassName }}
						</p>
					</div>
					<WhenDisplay
						v-if="props?.when"
						:loading="props.loading ?? undefined"
						:when="props.when"
					/>
				</div>
				<div>
					<div v-for="(description, index) in descriptions" :key="description ?? 'descr' + index">
						<VDivider v-if="index > 0" />
						<p class="text-body-1">
							{{ description }}
						</p>
					</div>
				</div>
			</VCol>
		</VRow>
	</div>
</template>
