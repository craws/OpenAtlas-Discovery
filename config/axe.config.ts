import type { Spec } from "axe-core";

export const axeConfig: Pick<Spec, "rules"> = {
	rules: [
		/**
		 * Radix adds a hidden select.
		 */
		{
			id: "select-name",
			selector: "select:not([aria-hidden])",
		},
	],
};
