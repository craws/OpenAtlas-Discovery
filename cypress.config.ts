import { defineConfig } from "cypress";
import "dotenv/config";

export default defineConfig({
	env: {
		api_url: process.env.NUXT_PUBLIC_API_BASE_URL,
	},
	e2e: {
		baseUrl: "http://localhost:3000",
		setupNodeEvents(on, _config) {
			on("task", {
				log(message) {
					// eslint-disable-next-line no-console
					console.log(message);

					return null;
				},
			});
		},
	},
});
