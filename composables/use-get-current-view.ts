import { z } from "zod";

const viewSchema = z.enum(["map", "network"]).catch("map");

export function useGetCurrentView() {
	const route = useRoute();

	return computed(() => {
		const view = viewSchema.parse(route.path.split("/").pop());
		return view;
	});
}
