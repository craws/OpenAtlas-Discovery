import { variants } from "@/utils/styles";

export { default as Badge } from "./Badge.vue";

export const badgeVariants = variants({
	base: "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",

	variants: {
		variant: {
			default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
			secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
			destructive:
				"border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
			outline: "text-foreground",
			groupOutline:
				"bg-neutral-200 dark:bg-black text-foreground group-hover:border-transparent group-hover:bg-white group-hover:dark:bg-primary group-hover:text-primary group-hover:dark:text-primary-foreground group-hover:shadow group-data-[state=on]:bg-white group-data-[state=on]:dark:text-primary-foreground",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});
