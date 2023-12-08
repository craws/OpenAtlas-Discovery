// Import discovery config

describe("Main Page", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("Has the main Elements", () => {
		const apiBase = Cypress.env("api_url");
		cy.get('[data-test="main-content-renderer"]').should("exist");

		if (apiBase === undefined) {
			cy.task("log", "APIbase is undefined, skipping map button & data button");
			cy.task("log", apiBase);
			return;
		}

		cy.get('[data-test="main-map-btn"]').should("exist");

		cy.get('[data-test="main-data-btn"]').should("exist");
	});

	it("Has the Locale Selection with all Available Locales", () => {
		const locales: Array<string> = ["en", "de"];

		cy.wait(2000); // Initial load time needed. Unsure why, potentially to load vuetify components.

		cy.get('[data-test="header-locale-menu"]').should("exist").click();

		cy.get('[data-test="locale-selector-list"]').should("exist").should("be.visible");

		locales.forEach((locale: string) => {
			cy.get(`[data-test="locale-selector-${locale}"]`).should("be.visible");
		});
	});
});
