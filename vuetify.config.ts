import type { ThemeDefinition } from "vuetify";
import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";

import discoveryConfig from "./config/discoveryConfig.json";

const lightTheme: ThemeDefinition = {
	dark: false,
	colors: {
		primary: discoveryConfig.colors.primaryColor,
	},
};

if (discoveryConfig.colors.primaryColor) {
	lightTheme.colors!.primary = discoveryConfig.colors.primaryColor;
}

export default defineVuetifyConfiguration({
	theme: {
		defaultTheme: "lightTheme",
		themes: {
			lightTheme,
		},
		variations: {
			colors: ["primary", "secondary"],
			lighten: 1,
			darken: 2,
		},
	},
});
