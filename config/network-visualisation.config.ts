import type { ForceAtlas2Settings } from "graphology-layout-forceatlas2";

export const networkConfig = {
	sourceNodeColor: "#666",
	relationsNodeColor: "#B8CF5D",
	sourceNodeSize: 4,
	relationNodeSize: 4,
	colors: {
		disabledNodeColor: "#aaa",
		entityColors: {
			stratigraphic_unit: "#9723c1",
			place: "#69c0ef",
			acquisition: "#6a040f",
			activity: "#9d0208",
			move: "#e85d04",
			artifact: "#ee6c4d",
			human_remains: "#3d0066",
			person: "#ffca3a",
			feature: "#b8cf5b",
			event: "#ff595e",
			type: "#6a4c93",
			source: "#d60C19",
			file: "#9d4edd",
			group: "#f48c06",
		},
		entityDefaultColor: "#666",
	},
};

export const layoutOptions: ForceAtlas2Settings = {
	barnesHutOptimize: true,
	gravity: 0.1,
	outboundAttractionDistribution: false,
	scalingRatio: 10,
	slowDown: 15,
	strongGravityMode: true,
};
