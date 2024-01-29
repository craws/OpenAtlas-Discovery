import type { Component } from "nuxt/dist/app/compat/capi";

import type { LinkedPlacesModelRelations } from "@/composables/api";

export interface relationGroup {
	relationType: string;
	relations: Array<LinkedPlacesModelRelations>;
}

export interface DetailItem {
	id: string;
	label: string;
	subheader?: string;
}

export interface DetailTab {
	title: string;
	component: Component | string;
	props: any;
}
