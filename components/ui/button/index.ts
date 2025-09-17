import { variants } from "@/utils/styles";

export { default as Button } from "@/components/ui/button/Button.vue";

export const buttonVariants = variants({
	base: "inline-flex gap-1.5 items-center justify-center cursor-default rounded-md whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline:
				"border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline",
			brand: "bg-brand text-brand-foreground shadow hover:bg-brand/90",
			transparent: "bg-none dark:text-black",
			iiif: "bg-muted text-primary shadow hover:bg-primary hover:text-primary-foreground  dark:bg-transparent dark:text-primary hover:dark:bg-muted hover:dark:text-primary",
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});
