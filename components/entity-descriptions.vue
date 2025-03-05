<script lang="ts" setup>
import { isNonEmptyString } from "@acdh-oeaw/lib";

const props = defineProps<{
	descriptions: Array<{ value?: string }>;
}>();

const t = useTranslations();

const descriptions = computed(() => {
	const descriptions: Array<string> = [];

	props.descriptions.forEach((description) => {
		if (isNonEmptyString(description.value)) {
			descriptions.push(description.value);
		}
	});

	return descriptions;
});
</script>

<template>
	<template v-if="descriptions.length > 0">
		<template v-if="descriptions.length === 1">
			<p class="whitespace-pre-line text-md">{{ descriptions[0] }}</p>
		</template>
		<template v-else>
			<Tabs default-value="0">
				<TabsList>
					<span class="mx-2 font-bold">{{
						t("EntityDescriptionsDisplay.description", descriptions.length) + ": "
					}}</span>
					<TabsTrigger
						v-for="(description, index) in descriptions"
						:key="`desc-tab-trigger-${index}`"
						:value="index.toString()"
					>
						<p class="max-w-20 overflow-hidden text-ellipsis text-nowrap">{{ description }}</p>
					</TabsTrigger>
				</TabsList>
				<TabsContent
					v-for="(description, index) in descriptions"
					:key="`desc-tab-${index}`"
					:value="index.toString()"
				>
					<Card class="p-4">
						<p class="text-md">{{ description }}</p>
					</Card>
				</TabsContent>
			</Tabs>
		</template>
	</template>
</template>
