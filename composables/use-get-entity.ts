import { useQuery } from "@tanstack/vue-query";

import { useCreateEntity } from "@/composables/use-create-entity";
import type { operations } from "@/lib/api-client/api";
import type { LinkedPlace } from "@/types/api";

export interface GetEntityParams
	extends NonNullable<operations["GetEntity"]["parameters"]["path"]> {}

export type GetEntityResponse = LinkedPlace;

export function useGetEntity(params: MaybeRef<GetEntityParams>) {
	const api = useApiClient();
	const createtEntity = useCreateEntity();

	return useQuery({
		queryKey: ["entity", params] as const,
		async queryFn({ queryKey: [, params], signal }) {
			const response = (await api.GET("/entity/{entityId}", {
				params: {
					path: {
						...params,
					},
				},
				signal,
			})) as GetEntityResponse;

			const entity = createtEntity(response);

			return entity;
		},
	});
}
