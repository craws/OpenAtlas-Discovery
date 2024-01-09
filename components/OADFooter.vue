<script setup lang="ts">
import { discoveryConfig } from '~/config/discoveryConfig';

const localePath = useLocalePath();
const config = useRuntimeConfig();

const frontenVersion = `${config.public.gitTag ?? "version"} - ${
	config.public.branchName ?? "branch"
}`;
</script>

<template>
	<div>
		<VFooter border class="py-2">
			<div
				style="font-size: 0.75em"
				class="w-50 mx-auto d-flex justify-center justify-space-between align-center"
			>
				<div v-if="discoveryConfig.acdhImprint">
					<NuxtLink style="color: inherit; text-decoration: none" :to="localePath('/imprint')">
						{{ $t("global.imprint") }}
					</NuxtLink>
				</div>

				<div class="text-center">
					<p>
						<b>Version:</b>
						{{ frontenVersion }}
					</p>
				</div>

				<div class="relative">
					With
					<VIcon size="16" style="position: relative; top: -2px">mdi-heart</VIcon>
					from
					<NuxtLink style="color: inherit; text-decoration: none" to="https://openatlas.eu/">
						<VNuxtImage
							style="position: absolute; top: 6px"
							src="/oad-favicon.svg"
							alt="OpenAtlas Logo"
							height="20px"
						/>
					</NuxtLink>
				</div>
			</div>
		</VFooter>
	</div>
</template>
