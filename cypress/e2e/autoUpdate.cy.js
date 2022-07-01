/*global cy before*/

describe('Menu stays open on update', () => {
  before(() => {
    cy.visit('./autoUpdate.html');
  });
  beforeEach(() => {
    cy.get('#skipMenu_menu').find('[role="menuitem"]').as('menuItems');
  });

  it('Menu stays open on auto update', () => {
    cy.get('#skipMenu').should('exist');
    cy.get('#skipMenu_button').click({ force: true }); // Open menu
    cy.get('#skipMenu_menu').should('be.visible');
    cy.get('@menuItems').eq(0).should('have.focus');
    cy.get('@menuItems').eq(0).type('{downArrow}');
    cy.get('@menuItems').eq(1).type('{downArrow}');

    cy.focused().should('contain.text', 'Heading 2');
    cy.contains('Heading 3').should('not.exist');

    // wait for heading 3 to appear
    cy.contains('Heading 3', { timeout: 1000 }).should('be.visible');
    cy.get('#skipMenu_menu').should('be.visible');
    cy.focused().should('contain.text', 'Heading 2');
  });
});
