import { useQuery } from "@tanstack/vue-query";
import { z } from "zod";

import type { components, operations } from "@/lib/api-client/api";
import type { LinkedPlace } from "@/types/api";

export const categories = [
	"beginFrom",
	"beginTo",
	"endFrom",
	"endTo",
	"entityAliases",
	"entityCidocClass",
	"entityDescription",
	"entityID",
	"entityName",
	"entitySystemClass",
	"relationToID",
	"typeID",
	"typeIDWithSubs",
	"typeName",
	"valueTypeID",
] as const;

export type Category = (typeof categories)[number];

export const operators = [
	"equal",
	"greaterThan",
	"greaterThanEqual",
	"lesserThan",
	"lesserThanEqual",
	"like",
	"notEqual",
] as const;

export type Operator = (typeof operators)[number];

export const logicalOperators = ["and", "or"] as const;

export type LogicalOperator = (typeof logicalOperators)[number];

export const searchFilter = z
	.record(
		z.enum(categories),
		z.object({
			operator: z.enum(operators),
			values: z.array(z.union([z.string(), z.number()])),
			logicalOperator: z.enum(logicalOperators).default("and"),
		}),
	)
	.refine(
		(value) => {
			return Object.keys(value).length > 0;
		},
		{ message: "At least one search filter category required" },
	);

export const searchFilterString = z
	.string()
	.transform((value, context) => {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return JSON.parse(value);
		} catch {
			context.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Invalid JSON passed as search filter",
			});
			return z.NEVER;
		}
	})
	.pipe(searchFilter);

export type SearchFilter = z.infer<typeof searchFilter>;

export interface GetSearchResultsParams
	extends Omit<NonNullable<operations["GetQuery"]["parameters"]["query"]>, "format" | "search"> {
	/**
	 * We only support the default "Linked Places" format. The various geojson formats supported by
	 * the backend only exist for legacy usecases. Also, consistently using one format should
	 * provide some caching benefits.
	 *
	 * Note that the "Linked Places" format is valid GeoJSON.
	 *
	 * @see https://github.com/LinkedPasts/linked-places-format
	 */
	format?: "lp";
	search?: Array<SearchFilter>;
}

export interface GetSearchResultsResponse {
	pagination: components["schemas"]["PaginationModel"];
	results: Array<LinkedPlace>;
}

export function useGetSearchResults(params: MaybeRef<GetSearchResultsParams>) {
	const api = useApiClient();

	return useQuery({
		queryKey: ["search-results", params] as const,
		queryFn({ queryKey: [, params], signal }) {
			const search = params.search?.map((value) => {
				return JSON.stringify(value);
			});

			return api.GET("/query/", {
				params: {
					query: {
						...params,
						// @ts-expect-error `Array<string>` is actually correct.
						search,
					},
				},
				signal,
			}) as Promise<GetSearchResultsResponse>;
		},
	});
}
