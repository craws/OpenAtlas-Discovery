import { discoveryConfig } from "~/config/discoveryConfig";

export const useSafeRead = function (obj: Object, index: string): string | undefined {
	const indizes = index.split(/[.[\]"']/).filter((x) => x !== "");
	return indizes.reduce((o, key) => o[key], obj);
};

export const useFormatDateTime = (date: string) => {
	return date.split("T")[0];
};

export const selectedLocaleLocalStorageKey = "oad-selected-locale";

export function getLogo(): string {
	const logo = discoveryConfig.logo ?? "logo.svg";
	return logo;
}

export function getHeaderLogo(): string {
	return discoveryConfig.headerLogo ?? discoveryConfig.logo ?? "/header_logo.svg";
}

export function getFavicon(): { rel: string; type: string; href: string; sizes: string } {
	const favicon = {
		rel: "icon",
		type: "image/svg+xml",
		href: "/favicon.svg",
		sizes: "any",
	};
	const faviconExt = discoveryConfig.favicon?.split(".").pop();

	// Can Handle SVGs, .ico
	if (faviconExt === "ico") {
		favicon.type = "image/x-icon";
		favicon.href = "/" + discoveryConfig.favicon;
	}

	return favicon;
}
