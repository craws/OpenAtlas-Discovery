<script lang="ts" setup>
import { isNonEmptyString, noop } from "@acdh-oeaw/lib";
import { useQuery } from "@tanstack/vue-query";
import { User2Icon as UserIcon } from "lucide-vue-next";

import type { TeamMember } from "@/types/content";

const locale = useLocale();
const t = useTranslations();

const {
	data: team,
	error,
	suspense,
} = useQuery({
	queryKey: ["team", locale] as const,
	queryFn({ queryKey: [, locale] }) {
		return queryContent<TeamMember>("team", locale).find();
	},
});
useErrorMessage(error, {
	notFound: t("TeamPage.error.not-found"),
	unknown: t("TeamPage.error.unknown"),
});
onServerPrefetch(async () => {
	/**
	 * Delegate errors to the client, to avoid displaying error page with status code 500.
	 *
	 * @see https://github.com/TanStack/query/issues/6606
	 * @see https://github.com/TanStack/query/issues/5976
	 */
	await suspense().catch(noop);
});

const sorted = computed(() => {
	if (team.value == null) return team.value;
	return team.value.toSorted((a, z) => {
		return a.lastName.localeCompare(z.lastName);
	});
});
</script>

<template>
	<template v-if="sorted">
		<ul class="grid grid-cols-2 gap-8 py-4" role="list">
			<li v-for="member of sorted" :key="member._id">
				<article class="prose prose-sm">
					<div
						class="not-prose relative grid size-20 place-items-center overflow-hidden rounded-full border-2 border-foreground"
					>
						<img
							v-if="member.image != null"
							alt=""
							class="absolute inset-0 size-full object-cover"
							:src="member.image"
						/>
						<UserIcon v-else class="size-10" />
					</div>
					<h3 class="mt-5">
						{{
							[member.academicTitle, member.firstName, member.lastName]
								.filter(isNonEmptyString)
								.join(" ")
						}}
					</h3>
					<ContentRenderer :value="member">
						<template #empty></template>
					</ContentRenderer>
				</article>
			</li>
		</ul>
	</template>
</template>
