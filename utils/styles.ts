import { defineConfig } from "cva";
import { twMerge } from "tailwind-merge";

export const {
	cx: cn,
	compose,
	cva: variants,
} = defineConfig({
	hooks: {
		onComplete(className) {
			return twMerge(className);
		},
	},
});

export type { VariantProps } from "cva";
