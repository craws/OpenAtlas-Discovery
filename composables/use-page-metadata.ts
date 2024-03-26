interface UsePageMetadataParams {
	title: MaybeRef<string>;
	description?: MaybeRef<string>;
}

export function usePageMetadata(params: UsePageMetadataParams): void {
	useHead({
		title: params.title,
		meta: [
			{ property: "og:title", content: params.title },
			...(params.description != null
				? [
						{ name: "description", content: params.description },
						{ property: "og:description", content: params.description },
					]
				: []),
		],
	});
}
