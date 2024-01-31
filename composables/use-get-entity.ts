import { useQuery } from "@tanstack/vue-query";

import type { operations } from "@/lib/api-client/api";
import type { LinkedPlace } from "@/types/api";

export interface GetEntityParams
	extends NonNullable<operations["GetEntity"]["parameters"]["path"]> {}

export type GetEntityResponse = LinkedPlace;

export function useGetEntity(params: MaybeRef<GetEntityParams>) {
	const api = useApiClient();

	return useQuery({
		queryKey: ["entity", params] as const,
		queryFn({ queryKey: [, params], signal }) {
			return api.GET("/entity/{entityId}", {
				params: {
					path: {
						...params,
					},
				},
				signal,
			}) as Promise<GetEntityResponse>;
		},
	});
}
