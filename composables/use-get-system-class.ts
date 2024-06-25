import { useQuery } from "@tanstack/vue-query";

import { useCreateEntity } from "@/composables/use-create-entity";
import type { operations } from "@/lib/api-client/api";
import type { LinkedPlace } from "@/types/api";

export interface GetSystemClassParams
	extends NonNullable<operations["GetBySystemClass"]["parameters"]["path"]> {}

export type GetSystemClassQueryParams = operations["GetBySystemClass"]["parameters"]["query"];

export type GetBySystemClassResponse = {
	pagination: {
		entities: number;
		entitiesPerPage: number;
		index: Array<{
			page: number;
			startId: number;
		}>;
		totalPages: number;
	};
	results: Array<LinkedPlace>;
};

export function useGetBySystemClass(
	pathParams: MaybeRef<GetSystemClassParams>,
	queryParams: MaybeRef<GetSystemClassQueryParams>,
) {
	const api = useApiClient();
	const createEntity = useCreateEntity();

	return useQuery({
		queryKey: ["system_class", { path: pathParams, query: queryParams }] as const,

		async queryFn({ queryKey, signal }) {
			const [, params] = queryKey;

			const response = (await api.GET("/system_class/{system_class}", {
				params: {
					path: {
						...params.path,
					},
					query: {
						...params.query,
						format: "lpx",
					},
				},
				signal,
			})) as GetBySystemClassResponse;

			const enities = [];
			for (const feature of response.results) {
				enities.push(createEntity(feature));
			}

			return { enities, pagination: response.pagination };
		},
	});
}
