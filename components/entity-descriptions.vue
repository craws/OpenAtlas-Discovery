<script lang="ts" setup>
const props = defineProps<{
	descriptions: Array<string>;
}>();

interface Metadata {
	annotationId: string;
	entityId: string;
	comment: string;
}

const t = useTranslations();
const route = useRoute();
const router = useRouter();

const processedNodes = ref<Array<string | { text: string; meta: Metadata }>>([]);

onMounted(async () => {
	await nextTick();
	extractMetadata();
});

function extractMetadata() {
	const html = props.descriptions[0];
	const div = document.createElement("div");
	div.innerHTML = html ?? "";

	const result: typeof processedNodes.value = [];

	div.childNodes.forEach((node) => {
		if (node.nodeType === Node.TEXT_NODE) {
			result.push(node.textContent ?? "");
		} else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === "MARK") {
			const mark = node as HTMLElement;
			const metaStr = mark.getAttribute("meta");
			try {
				const meta: Metadata = JSON.parse(metaStr ?? "");
				result.push({
					text: mark.textContent ?? "",
					meta,
				});
			} catch (e) {
				result.push(mark.textContent ?? "");
			}
		} else {
			result.push(node.textContent ?? "");
		}
	});

	processedNodes.value = result;
}

// const descriptions = computed(() => {
// 	const descriptions: Array<string> = [];

// 	props.descriptions.forEach((description) => {
// 		if (isNonEmptyString(description.value)) {
// 			descriptions.push(description.value);
// 		}
// 	});

// 	return descriptions;
// });

watch(
	() => {
		return props.descriptions;
	},
	() => {
		if (props.descriptions[0] != null) {
			extractMetadata();
		}
	},
);
</script>

<template>
	<template v-if="descriptions.length > 0">
		<template v-if="descriptions.length === 1">
			<p class="whitespace-pre-line text-md">
				<template v-for="(part, index) in processedNodes" :key="index">
					<template v-if="typeof part === 'string'">
						<br v-if="part === ''" />
						<span> {{ part }}</span>
					</template>
					<template v-else>
						<span v-if="part.meta.entityId != null">
							<TooltipProvider v-if="part.meta.comment != null">
								<Tooltip>
									<TooltipTrigger>
										<NavLink
											:href="{
												path: router.currentRoute.value.path,
												query: { ...route.query, selection: part.meta?.entityId },
											}"
											target="_blank"
											class="rounded-sm bg-brand px-1 hover:bg-brand/90"
										>
											{{ part.text }}
										</NavLink>
									</TooltipTrigger>
									<TooltipContent> {{ part.meta.comment }} </TooltipContent>
								</Tooltip>
							</TooltipProvider>

							<NavLink
								v-else
								:href="{
									path: router.currentRoute.value.path,
									query: { ...route.query, selection: part.meta?.entityId },
								}"
								target="_blank"
								class="rounded-sm bg-brand px-1 hover:bg-brand/90"
							>
								{{ part.text }}
							</NavLink>
						</span>
						<span v-else>
							<TooltipProvider v-if="part.meta.comment != null">
								<Tooltip>
									<TooltipTrigger :style="{ cursor: 'auto' }">
										<span class="m-0 rounded-sm border-2 border-brand px-1 hover:border-brand/80">{{
											part.text
										}}</span>
									</TooltipTrigger>
									<TooltipContent> {{ part.meta.comment }} </TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</span>
					</template>
				</template>
			</p>
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
