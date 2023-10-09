describe("Main Page", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("Has the main Elements", () => {
		cy.get('[data-test="main-content-renderer"]').should("exist");

		cy.get('[data-test="main-map-btn"]').should("exist");

		cy.get('[data-test="main-data-btn"]').should("exist");
	});

	it("Has the Locale Selection with all Available Locales", () => {
		const locales: string[] = ["en", "de"];

		cy.wait(2000); // Initial load time needed. Unsure why, potentially to load vuetify components.

		cy.get('[data-test="header-locale-menu"]').should("exist").click();

		cy.get('[data-test="locale-selector-list"]').should("exist").should("be.visible");

		locales.forEach((locale: string) => {
			cy.get(`[data-test="locale-selector-${locale}"]`).should("be.visible");
		});
	});
});
