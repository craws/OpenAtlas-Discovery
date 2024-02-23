<script lang="ts" setup>
import { MoonIcon, SunIcon } from "lucide-vue-next";

const t = useTranslations();

const colorMode = useColorMode();

const colorSchemes = ["system", "light", "dark"] as const;
</script>

<template>
	<ClientOnly>
		<DropdownMenu>
			<DropdownMenuTrigger as-child>
				<Button class="gap-2" size="icon" variant="ghost">
					<Component
						:is="colorMode.value === 'light' ? SunIcon : MoonIcon"
						aria-hidden="true"
						class="size-5 shrink-0"
					/>
					<span class="sr-only">{{ t("ColorSchemeSwitcher.change-color-scheme") }}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem
					v-for="colorScheme of colorSchemes"
					:key="colorScheme"
					@click="
						() => {
							colorMode.preference = colorScheme;
						}
					"
				>
					{{ t(`ColorSchemeSwitcher.color-schemes.${colorScheme}`) }}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</ClientOnly>
</template>
