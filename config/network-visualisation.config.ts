import type { ForceAtlas2Settings } from "graphology-layout-forceatlas2";

export const networkConfig = {
	sourceNodeColor: project.colors.geojson,
	relationsNodeColor: "#B8CF5D",
	sourceNodeSize: 4,
	relationNodeSize: 4,
};

export const layoutOptions: ForceAtlas2Settings = {
	barnesHutOptimize: true,
	gravity: 0.1,
	outboundAttractionDistribution: false,
	scalingRatio: 10,
	slowDown: 15,
	strongGravityMode: true,
};
