import type { MarkdownParsedContent } from "@nuxt/content/dist/runtime/types";

export interface ContentPage extends MarkdownParsedContent {
	title: string;
	navigation: {
		title: string;
	};
	image?: {
		light: string;
		dark: string;
	};
	links?: Array<{
		label: string;
		href: string;
	}>;
}
