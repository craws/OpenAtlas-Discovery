import { HttpError, log } from "@acdh-oeaw/lib";
import {
	dehydrate,
	type DehydratedState,
	hydrate,
	keepPreviousData,
	QueryCache,
	QueryClient,
	VueQueryPlugin,
	type VueQueryPluginOptions,
} from "@tanstack/vue-query";
import type { I18n } from "vue-i18n";

import { toast } from "@/components/ui/toast";
import type { Locale } from "@/config/i18n.config";

export default defineNuxtPlugin((nuxt) => {
	const state = useState<DehydratedState | null>("vue-query");
	// eslint-disable-next-line @typescript-eslint/ban-types
	const { t } = nuxt.$i18n as I18n<{ [K in Locale]: Messages }, {}, {}, Locale, false>["global"];

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				placeholderData: keepPreviousData,
				staleTime: 1000 * 60 * 15,
			},
		},
		queryCache: new QueryCache({
			async onError(error) {
				const message = await getErrorMessage(error);

				if (import.meta.client) {
					toast.error(t("Toast.error"), {
						description: message,
					});
				} else {
					log.error(message);
				}
			},
		}),
	});

	const options: VueQueryPluginOptions = { queryClient };

	nuxt.vueApp.use(VueQueryPlugin, options);

	if (import.meta.server) {
		nuxt.hooks.hook("app:rendered", () => {
			state.value = dehydrate(queryClient);
		});
	}

	if (import.meta.client) {
		nuxt.hooks.hook("app:created", () => {
			hydrate(queryClient, state.value);
		});
	}
});

async function getErrorMessage(error: Error): Promise<string> {
	if (error instanceof HttpError) {
		const mediaType = error.response.headers.get("content-type")?.split(";", 1).at(0);
		if (mediaType === "application/json" && !error.response.bodyUsed) {
			try {
				/**
				 * @see https://manual.openatlas.eu/technical/api.html#error-handling
				 */
				const data = (await error.response.json()) as {
					message: string;
					timestamp: string;
					title: string;
					status: number;
				};

				return data.message;
			} catch {
				/** */
			}
		}

		return error.response.statusText;
	}

	return error.message;
}
