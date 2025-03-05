import { useQuery } from "@tanstack/vue-query";

import type { operations } from "@/lib/api-client/api";

export interface GetLinkedEntitiesRecursiveParams {
	entityId: number | null;
}

export interface GetLinkedEntitiesRecursiveResponse
	extends NonNullable<operations["GetLinkedEntitiesByPropertyRecursive"]["responses"]["200"]> {}

export function useGetLinkedEntitiesRecursive(params: MaybeRef<GetLinkedEntitiesRecursiveParams>) {
	const api = useApiClient();

	return useQuery({
		queryKey: ["linked-entities-recursive", params] as const,
		async queryFn({ queryKey, signal }) {
			const [, params] = queryKey;

			if (params.entityId == null) {
				return null;
			}

			const response = await api.GET("/linked_entities_by_properties_recursive/{entityId}", {
				params: {
					path: {
						entityId: params.entityId,
					},
					query: {
						properties: ["P9", "P134"],
						centroid: true,
						show: ["geometry", "relations"],
						relation_type: ["P9", "P7", "P25", "P26", "P27"],
					},
				},
				signal,
			});
			return { ...response.results };
		},
		enabled: computed(() => {
			return unref(params).entityId != null;
		}),
	});
}
