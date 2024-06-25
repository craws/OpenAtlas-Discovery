import { useQuery } from "@tanstack/vue-query";

import { useCreateEntity } from "@/composables/use-create-entity";
import type { operations } from "@/lib/api-client/api";
import type { LinkedPlace } from "@/types/api";

export interface GetEntityParams
	extends NonNullable<operations["GetEntity"]["parameters"]["path"]> {}

export type GetEntityResponse = LinkedPlace;

export function useGetEntity(params: MaybeRef<GetEntityParams>) {
	const api = useApiClient();
	const createEntity = useCreateEntity();

	return useQuery({
		queryKey: ["entity", params] as const,
		async queryFn({ queryKey, signal }) {
			const [, params] = queryKey;
			const response = (await api.GET("/entity/{entityId}", {
				params: {
					path: {
						...params,
					},
					query: {
						format: "lpx",
						centroid: true,
					},
				},
				signal,
			})) as GetEntityResponse;

			const entity = createEntity(response);

			return entity;
		},
	});
}
