<script lang="ts" setup>
import { DownloadIcon, InfoIcon } from "lucide-vue-next";

import { project } from "@/config/project.config";
import type { File, PresentationViewModel } from "@/types/api";

const t = useTranslations();
const route = useRoute();

const props = defineProps<{
	entity: PresentationViewModel;
	relations: NonNullable<PresentationViewModel["relations"]>;
	handledRelations: Array<RelationType>;
}>();

const systemClasses = computed(() => {
	let customConfig = project.detailView.find((entry) => {
		return entry.affectedSystemClasses?.includes(props.entity.systemClass);
	});
	if (!customConfig)
		customConfig = project.detailView.find((entry) => {
			return !entry.affectedSystemClasses?.length;
		});
	return customConfig?.furtherSystemClasses;
});

const relationsByType = computed(() => {
	return Object.entries(props.relations).filter(([key, _]) => {
		return systemClasses.value?.includes(key);
	}) as Array<[string, Array<AdditionalInfoType>]>;
});

interface AdditionalInfoType {
	title: string;
	id: number;
	identifier?: string;
	creator?: string;
	licenseHolder?: string;
	license?: string;
}

const additionalInfo = computed(() => {
	return Object.entries(props.entity).filter(([key, val]) => {
		return (
			Array.isArray(val) &&
			val.length > 0 &&
			(systemClasses.value?.includes(key) ?? systemClasses.value?.includes(`${key}s`))
		);
	}) as Array<[string, Array<AdditionalInfoType>]>;
});

const combinedSystemClasses: ComputedRef<Array<[string, Array<AdditionalInfoType>]>> = computed(
	() => {
		const res = [...additionalInfo.value, ...relationsByType.value];
		console.log("all system classes for entity details: ", res);
		return res;
	},
);

function getPath() {
	if (route.path.includes("visualization")) {
		return "visualization";
	}
	return "";
}

const currentMode = computed(() => {
	return route.query.mode;
});

//see https://stackoverflow.com/a/49500465
function forceDownload(blob: string, filename: string) {
	var a = document.createElement("a");
	a.download = filename;
	a.href = blob;
	// For Firefox https://stackoverflow.com/a/32226068
	document.body.appendChild(a);
	a.click();
	a.remove();
}
// Current blob size limit is around 500MB for browsers
function download(file: AdditionalInfoType) {
	const filename = file.title;
	fetch((file as unknown as AdditionalInfoType & { url: string }).url, {
		headers: new Headers({
			Origin: location.origin,
		}),
		mode: "cors",
	})
		.then((response) => {
			return response.blob();
		})
		.then((blob) => {
			let blobUrl = window.URL.createObjectURL(blob);
			forceDownload(blobUrl, filename);
		})
		.catch((e: unknown) => {
			console.error(e);
		});
}

function isFile(file: unknown): file is File {
	return typeof (file as File).url === "string" && typeof (file as File).mimetype === "string";
}

function getFilename(file: unknown) {
	if (isFile(file)) {
		const filetype = file.mimetype.split("/").pop() ?? "";
		return `${file.title}.${filetype}`;
	} else return (file as AdditionalInfoType).title;
}
</script>

<template>
	<div v-if="Object.keys(combinedSystemClasses).length > 0" class="mt-4">
		<h1 class="pb-4 font-semibold leading-none tracking-tight">{{ t("EntityPage.details") }}</h1>
		<dl
			class="grid gap-x-8 gap-y-4 sm:grid-cols-[repeat(auto-fill,minmax(min(20rem,100%),1fr))] sm:justify-start"
		>
			<div v-for="[relationType, relations] of combinedSystemClasses" :key="relationType">
				<dt class="text-xs font-medium uppercase tracking-wider text-muted-foreground">
					{{ t(`SystemClassNames.${relationType}`) }}
				</dt>
				<dd>
					<ul role="list">
						<li
							v-for="(relation, index) of relations"
							:key="index"
							class="grid grid-cols-[1fr_auto] items-center py-1"
						>
							<NavLink
								v-if="['files', 'references'].includes(relationType) && relation?.id"
								class="underline decoration-dotted hover:no-underline"
								:href="{
									path: `/${getPath()}`,
									query: {
										mode: currentMode,
										selection: relation.id,
									},
								}"
							>
								{{ getFilename(relation) }}
							</NavLink>
							<NavLink
								v-else-if="relation?.identifier"
								class="underline decoration-dotted hover:no-underline"
								:href="relation.identifier"
								external
								target="_blank"
								>{{ relation.identifier }}</NavLink
							>
							<span v-else>
								{{ relationType === "files" ? getFilename(relation) : relation.identifier }}
							</span>
							<div class="inline-flex items-center gap-2 align-middle">
								<Popover>
									<PopoverTrigger as-child>
										<Button
											v-if="relationType === 'files'"
											variant="transparent"
											class="h-auto p-0 opacity-70 hover:opacity-100"
											><InfoIcon :size="16" /><span class="sr-only">Info</span></Button
										>
									</PopoverTrigger>
									<PopoverContent side="top">
										<div class="text-sm">
											<div>
												<span class="mr-1 text-sm text-muted-foreground"
													>{{ t("EntityPage.creator") }}:</span
												>{{ relation.creator ? relation.creator : t("EntityPage.license") }}
											</div>
											<div>
												<span class="mr-1 text-sm text-muted-foreground"
													>{{ t("EntityPage.licenseHolder") }}:</span
												>{{
													relation.licenseHolder ? relation.licenseHolder : t("EntityPage.license")
												}}
											</div>
											<div>
												<span class="mr-1 text-sm text-muted-foreground"
													>{{ t("EntityPage.license") }}:</span
												>
												<NavLink
													v-if="relation.license?.startsWith('CC')"
													:href="'https://creativecommons.org/'"
													class="underline decoration-dotted hover:no-underline"
													external
													target="_blank"
												>
													{{ relation.license }}
												</NavLink>
												<span v-else>
													{{ relation.license ? relation.license : t("EntityPage.license") }}
												</span>
											</div>
										</div>
									</PopoverContent>
								</Popover>
								<Button
									v-if="relationType === 'files'"
									variant="transparent"
									class="h-auto p-0 opacity-70 hover:opacity-100"
									@click="download(relation)"
									><DownloadIcon :size="16" /><span class="sr-only">Download</span></Button
								>
							</div>
						</li>
					</ul>
				</dd>
			</div>
		</dl>
	</div>
</template>
