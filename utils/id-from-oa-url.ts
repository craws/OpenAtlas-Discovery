export function idFromOpenAtlasUrl(url: string): string | null {
	return url.split("/").pop() ?? null;
}
