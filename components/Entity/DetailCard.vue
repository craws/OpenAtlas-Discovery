<script setup lang="ts">
import type { DetailItem } from "@/types/entityDetailTypes";

const localePath = useLocalePath();

const props = defineProps({
	title: {
		type: String,
		default: "Detail",
	},
	details: {
		type: Array<DetailItem>,
		default: null,
	},
});

const showDetails = ref(false);

const showExpandable = computed(() => {
	if (props.details && Array.isArray(props.details) && props.details.length > 3) {
		return true;
	} else {
		return false;
	}
});
</script>

<template>
	<VCard class="mx-auto">
		<VCardTitle class="detail-title">
			{{ props.title }}
		</VCardTitle>

		<VDivider />
		<VCardText class="mb-0 pb-0">
			<VList>
				<template v-for="(item, index) in details">
					<span v-if="item && index < 3" :key="item.id">
						<VDivider v-if="index > 0" />
						<p>
							<b v-if="item?.subheader">{{ item?.subheader }}:</b>
							<NuxtLink :to="localePath(`/entity/${item?.id}`)">{{ item.label }}</NuxtLink>
						</p>
					</span>
				</template>

				<div v-show="!showDetails && showExpandable">
					<VDivider />
					<p>... {{ details.length - 3 }} {{ $t("components.entity.detail.more") }}</p>
				</div>

				<VExpandTransition>
					<div v-show="showDetails">
						<template v-for="(item, index) in details">
							<span v-if="item && index >= 3" :key="item.id">
								<VDivider />
								<p>
									<b v-if="item?.subheader">{{ item?.subheader }}:</b>
									<NuxtLink :to="localePath(`/entity/${item?.id}`)">
										{{ item.label }}
									</NuxtLink>
								</p>
							</span>
						</template>
					</div>
				</VExpandTransition>
			</VList>
		</VCardText>

		<VDivider
			v-if="showExpandable"
			v-show="!showDetails"
			class="closed-divider"
			transition="fade-transition"
		/>
		<VCardActions>
			<VSpacer />
			<VBtn
				v-if="showExpandable"
				variant="flat"
				:icon="showDetails ? 'mdi-chevron-up' : 'mdi-chevron-down'"
				@click="showDetails = !showDetails"
			/>
			<VSpacer />
		</VCardActions>
	</VCard>
</template>

<style scoped>
.closed-divider {
	transform: translate(0, 30px);
}

.detail-title::first-letter {
	text-transform: capitalize;
}
</style>
