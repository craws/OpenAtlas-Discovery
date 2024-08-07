import type {
	EmblaCarouselType as CarouselApi,
	EmblaOptionsType as CarouselOptions,
	EmblaPluginType as CarouselPlugin,
} from "embla-carousel";
import type { HTMLAttributes, Ref } from "vue";

export interface CarouselProps {
	opts?: CarouselOptions | Ref<CarouselOptions>;
	plugins?: Array<CarouselPlugin> | Ref<Array<CarouselPlugin>>;
	orientation?: "horizontal" | "vertical";
}

export type CarouselEmits = (e: "init-api", payload: CarouselApi) => void;

export interface WithClassAsProps {
	class?: HTMLAttributes["class"];
}
