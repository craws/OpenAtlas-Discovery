// Import discovery config
import discoveryConfig from '../../config/discoveryConfig.json';

describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Main to Map', () => {
    if (discoveryConfig.APIbase === undefined) {
      cy.task('log', 'APIbase is undefined, skipping test');
      this.skip();
    }

    cy.get('[data-test="main-map-btn"]')
      .should('exist')
      .click();

    cy.get('[data-test="map-page-container"]')
      .should('exist');
  });

  it('Main to Data', () => {
    if (discoveryConfig.APIbase === undefined) {
      cy.task('log', 'APIbase is undefined, skipping test');
      this.skip();
    } else {
      cy.get('[data-test="main-data-btn"]')
        .should('exist')
        .click();

      cy.get('[data-test="data-page-container"]')
        .should('exist');
    }
  });
});
