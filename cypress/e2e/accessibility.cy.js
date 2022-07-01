/*global cy */

describe('Check for accessibility', () => {
  beforeEach(() => {
    cy.visit('./autoUpdate.html');
    cy.injectAxe();
    cy.get('#skipMenu_menu').find('[role="menuitem"]').as('menuItems');
  });

  it('Menu stays open on auto update', () => {
    cy.get('#skipMenu').should('exist');
    cy.checkA11y();
    cy.get('#skipMenu_button').click({ force: true }); // Open menu
    cy.get('#skipMenu_menu').should('be.visible');
    cy.checkA11y();

    // wait for heading 3 to appear
    cy.contains('Heading 3', { timeout: 1000 }).should('be.visible');
    cy.get('#skipMenu_menu').should('be.visible');
    cy.checkA11y();
  });
});
