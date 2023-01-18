describe('Main Page', () => {
  it('Has the main elements', () => {
    cy.visit('/');

    cy.get('#openatlas-discovery')
      .should('contain.text', 'OpenAtlas Discovery');

    cy.get('[data-test="main-map-btn"]').should('exist');

    cy.get('[data-test="main-data-btn"]').should('exist');
  });
});
