// FIXME: why is this reactive?
export const config = ref({
	layout: "1x1",
	mainMenuSettings: {
		show: false,
	},
	workspaceControlPanel: {
		enabled: false,
	},
	window: {
		allowClose: false,
		defaultSideBarPanel: "attribution",
		sideBarOpenByDefault: false,
		forceDrawAnnotations: true,
		highlightAllAnnotations: true,
	},
	// workspace: {
	// 	type: "mosaic"
	// },
	language: "en",
	availableLanguages: {
		de: "Deutsch",
		en: "English",
	},
	windows: [
		{
			thumbnailNavigationPosition: "off",
		},
	],
});
