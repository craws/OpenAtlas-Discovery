import { useQuery } from "@tanstack/vue-query";

import type { operations } from "@/lib/api-client/api";

export interface GetNetworkDataParams
	extends NonNullable<operations["GetNetworkVisualisation"]["parameters"]["query"]> {}

export interface GetNetworkDataResponse
	extends NonNullable<operations["GetNetworkVisualisation"]["responses"]["200"]> {}

export function useGetNetworkData(params: MaybeRef<GetNetworkDataParams>) {
	const api = useApiClient();

	return useQuery({
		queryKey: ["network-data", params] as const,
		async queryFn({ queryKey, signal }) {
			const [, params] = queryKey;

			const response = await api.GET("/network_visualisation/", {
				params: {
					query: {
						...params,
					},
				},
				signal,
			});

			return { ...response };
		},
	});
}
