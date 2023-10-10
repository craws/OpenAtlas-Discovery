<script setup lang="ts">
const config = useRuntimeConfig();

const frontenVersion = `${config.public.gitTag ?? "version"} - ${
	config.public.branchName ?? "branch"
}`;
</script>
<template>
	<div>
		<v-footer border class="py-2">
			<div
				style="font-size: 0.75em"
				class="w-50 mx-auto d-flex justify-center justify-space-between align-center">
				<div>
					<NuxtLink style="text-decoration: none; color: inherit" to="/">Home</NuxtLink>
				</div>

				<div class="text-center" >
					<p><b>Version:</b> {{ frontenVersion }}</p>
				</div>

				<div class="relative">
					With
					<v-icon size="16" style="position: relative; top: -2px">mdi-heart</v-icon>
					from
					<NuxtLink style="text-decoration: none; color: inherit" to="https://openatlas.eu/">
						<v-nuxt-image
							style="position: absolute; top: 6px"
							src="/oad-favicon.svg"
							alt="OpenAtlas Logo"
							height="20px"
						/>
					</NuxtLink>
				</div>
			</div>
		</v-footer>
	</div>
</template>
