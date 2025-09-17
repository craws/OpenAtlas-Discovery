import { useQuery } from "@tanstack/vue-query";

import type { operations } from "@/lib/api-client/api";
import type { PresentationViewModel } from "@/types/api";

export interface GetEntityParams
	extends NonNullable<operations["GetEntity"]["parameters"]["path"]> {}

export interface GetLinkedEntitiesParams
	extends NonNullable<operations["GetEntitiesLinkedToEntity"]["parameters"]["path"]> {}

export type GetEntityResponse = PresentationViewModel;

export function useGetEntity(params: MaybeRef<GetEntityParams>) {
	const api = useApiClient();

	return useQuery({
		queryKey: ["entity", params] as const,
		async queryFn({ queryKey, signal }) {
			const [, params] = queryKey;
			const typedParams: GetEntityParams = params as GetEntityParams;
			const _typedParams: GetLinkedEntitiesParams = params as GetLinkedEntitiesParams;

			const entity = api.GET("/entity_presentation_view/{entityId}", {
				params: {
					path: {
						...typedParams,
					},
				},
				signal,
			});
			return entity;
		},
	});
}
