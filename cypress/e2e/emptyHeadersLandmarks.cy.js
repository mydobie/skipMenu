/*global cy */

describe('Empty sections', () => {
  it('Headings sections is not shown when empty headers is passed', () => {
    cy.visit('./emptyHeadings.html');
    cy.get('h1').should('exist');
    cy.get('#skipMenu').should('exist');
    cy.get('#skipMenu_button').click({ force: true }); // Open menu
    cy.get('#skipMenu_menu').should('be.visible');
    cy.get('[role="separator"]').should('contain', 'Landmarks');
    cy.get('[role="separator"]').should('not.contain', 'Headings');
  });

  it('Landmarks sections is not shown when empty landmark is passed', () => {
    cy.visit('./emptyLandmarks.html');
    cy.get('main').should('exist');
    cy.get('#skipMenu').should('exist');
    cy.get('#skipMenu_button').click({ force: true }); // Open menu
    cy.get('#skipMenu_menu').should('be.visible');
    cy.get('[role="separator"]').should('not.contain', 'Landmarks');
    cy.get('[role="separator"]').should('contain', 'Headings');
  });
});
