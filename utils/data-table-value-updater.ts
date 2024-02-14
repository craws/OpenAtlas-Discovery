import type { Updater } from "@tanstack/vue-table";
import type { Ref } from "vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	ref.value = typeof updaterOrValue === "function" ? updaterOrValue(ref.value) : updaterOrValue;
}
