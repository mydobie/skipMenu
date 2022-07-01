/*global cy   */

describe('AttachTo tests', () => {
  beforeEach(() => {
    cy.visit('/keyEvents.html');
  });

  it('Ensure that up down activates the menu and puts focus on first item', () => {
    cy.get('#skipMenu_button').should('exist').focus();
    cy.get('#skipMenu_menu').should('not.be.visible');
    cy.get('#skipMenu_button').type('{downArrow}');
    cy.get('#skipMenu_menu').should('be.visible');
    cy.focused().should('contain.text', 'Main');
  });

  it('Ensure that up up activates the menu and puts focus on last item', () => {
    cy.get('#skipMenu_button').should('exist').focus();
    cy.get('#skipMenu_menu').should('not.be.visible');
    cy.get('#skipMenu_button').type('{upArrow}');
    cy.get('#skipMenu_menu').should('be.visible');
    cy.focused().should('contain.text', 'Super heading end');
  });

  it('Home key puts focus on first item', () => {
    cy.get('#skipMenu_button').should('exist').focus();
    cy.get('#skipMenu_button').type('{upArrow}');
    cy.focused().should('contain.text', 'Super heading end');

    cy.focused().type('{home}');
    cy.focused().should('contain.text', 'Main');
    cy.get('#skipMenu_menu').should('be.visible');
  });

  it('End key puts focus on last item', () => {
    cy.get('#skipMenu_button').should('exist').focus();
    cy.get('#skipMenu_button').type('{downArrow}');
    cy.focused().should('contain.text', 'Main');

    cy.focused().type('{end}');
    cy.focused().should('contain.text', 'Super heading end');
    cy.get('#skipMenu_menu').should('be.visible');
  });

  it('When a letter is typed, next item starting with that letter has focus', () => {
    cy.get('#skipMenu_button').should('exist').focus();
    cy.get('#skipMenu_button').type('{downArrow}');
    cy.focused().should('contain.text', 'Main');

    cy.focused().type('s');
    cy.focused().should('contain.text', 'Section');

    cy.focused().type('s');
    cy.focused().should('contain.text', 'Super heading 1');
    cy.focused().type('s');
    cy.focused().should('contain.text', 'Super heading 2');
    cy.focused().type('s');
    cy.focused().should('contain.text', 'Super heading end');

    // Return back to top of the list
    cy.focused().type('s');
    cy.focused().should('contain.text', 'Section');

    cy.get('#skipMenu_menu').should('be.visible');
  });

  it('When a letter is typed, current item stays focused if no item starts with letter typed', () => {
    cy.get('#skipMenu_button').should('exist').focus();
    cy.get('#skipMenu_button').type('{downArrow}');
    cy.focused().should('contain.text', 'Main');

    cy.focused().type('q');
    cy.focused().should('contain.text', 'Main');

    cy.get('#skipMenu_menu').should('be.visible');
  });

  it('When a number is typed, move to heading with that level', () => {
    cy.get('#skipMenu_button').should('exist').focus();
    cy.get('#skipMenu_button').type('{downArrow}');
    cy.focused().should('contain.text', 'Main');

    cy.focused().type('2');
    cy.focused().should('contain.text', 'Super heading 2');

    cy.focused().type('2');
    cy.focused().should('contain.text', 'A super heading more');

    cy.focused().type('2');
    cy.focused().should('contain.text', 'Super heading 2');
  });

  it('When a number is typed, current item stays focused if no heading with that level', () => {
    cy.get('#skipMenu_button').should('exist').focus();
    cy.get('#skipMenu_button').type('{downArrow}');
    cy.focused().should('contain.text', 'Main');

    cy.focused().type('6');
    cy.focused().should('contain.text', 'Main');

    cy.get('#skipMenu_menu').should('be.visible');
  });
});
