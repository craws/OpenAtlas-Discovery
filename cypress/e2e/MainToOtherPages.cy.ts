const apiBase = Cypress.env("api_url");

describe("Navigation", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("Main to Map", () => {
		if (apiBase === undefined) {
			cy.task("log", "APIbase is undefined, skipping test");
			return;
		}

		cy.get('[data-test="main-map-btn"]').should("exist").click();

		cy.get('[data-test="map-page-container"]').should("exist");
	});

	it("Main to Data", () => {
		if (apiBase === undefined) {
			cy.task("log", "APIbase is undefined, skipping test");
			return;
		}

		cy.get('[data-test="main-data-btn"]').should("exist").click();

		cy.get('[data-test="data-page-container"]').should("exist");
	});

	it("Successive Nav Clicks", () => {
		if (apiBase === undefined) {
			cy.task("log", "APIbase is undefined, skipping test");
			return;
		}
		cy.get('[data-test="main-map-btn"]').should("exist").dblclick();

		cy.get('[data-test="map-page-container"]').should("exist");
	});
});
