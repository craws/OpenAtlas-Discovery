<script setup lang="ts">

const localePath = useLocalePath();

const logo = getHeaderLogo();
const APIBase = useRuntimeConfig().public.APIBase;
</script>

<template>
	<VAppBar flat class="px-5">
		<NuxtLink :to="localePath('/')">
			<VNuxtImage class="pt-2" :src="logo" alt="header logo" height="60px" />
		</NuxtLink>
		<VSpacer />

		<ContentNavigationCNCustom />

		<ClientOnly v-if="APIBase">
			<VTooltip content-class="text-capitalize" :text="$t('global.basics.map')" location="bottom">
				<template #activator="{ props }">
					<NuxtLink
						v-bind="props"
						class="text-body-1 nav-item h-100 d-flex align-center justify-center px-2 text-grey"
						:to="localePath('/map')"
					>
						<span class="d-sr-only">{{ $t("global.basics.map") }}</span>
						<VIcon>mdi-map-marker</VIcon>
					</NuxtLink>
				</template>
			</VTooltip>
			<VTooltip content-class="text-capitalize" :text="$t('global.basics.data')" location="bottom">
				<template #activator="{ props }">
					<NuxtLink
						v-bind="props"
						class="text-body-1 nav-item h-100 d-flex align-center justify-center px-2 text-grey"
						:to="localePath('/data')"
					>
						<span class="d-sr-only">{{ $t("global.basics.data") }}</span>
						<VIcon>mdi-database</VIcon>
					</NuxtLink>
				</template>
			</VTooltip>
		</ClientOnly>

		<VDivider vertical />

		<LocaleDropDown />
	</VAppBar>
</template>
