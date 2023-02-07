
describe('Navigation', () => {
  it('From Main to Map', () => {
    cy.visit('/');

    cy.get('[data-test="main-map-btn"]')
      .should('exist')
      .click();

    cy.get('[data-test="map-page-container"]')
      .should('exist');
  });

  it('From Main to Data', () => {
    cy.visit('/');

    cy.get('[data-test="main-data-btn"]')
      .should('exist')
      .click();

    cy.get('[data-test="data-page-container"]')
      .should('exist');
  });
});
