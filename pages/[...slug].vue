<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
	<VSheet height="calc(100vh - 65px)" class="d-flex justify-center pt-5">
		<VContainer class="text-center">
			<ContentDoc>
				<template #not-found>
					<h1>Document not found</h1>
					<NuxtLink :to="localePath('/')">{{ $t("global.basics.backHome") }}.</NuxtLink>
				</template>
				<template #empty>
					<h1>Document is empty</h1>
					<NuxtLink :to="localePath('/')">{{ $t("global.basics.backHome") }}.</NuxtLink>
				</template>
			</ContentDoc>
		</VContainer>
	</VSheet>
</template>
