/*global cy before*/

describe('Navigation', () => {
  before(() => {
    // This a simple list of headers and landmarks
    // change event listener is off
    // defaults are used
    cy.visit('/simpleMenuNav.html');
    cy.get('#skipMenu_menu').should('not.be.visible');
    cy.contains('Skip To Content').click();
    cy.get('#skipMenu_menu').should('be.visible');
    cy.get('#skipMenu_menu').find('[role="menuitem"]').should('have.length', 4);
  });
  beforeEach(() => {
    cy.get('#skipMenu_menu').then(($menu) => {
      if (!$menu.is(':visible')) {
        cy.contains('Skip To Content').click();
      }
    });
    cy.get('#skipMenu_menu').find('[role="menuitem"]').as('menuItems');
    cy.contains('Skip To Content').as('skipMenuButton');
  });

  it('When menu opens, the first element has focus', () => {
    cy.get('@menuItems').eq(0).should('have.focus');
  });

  it('User can use arrow keys to navigate', () => {
    /* Down arrow */
    cy.get('@menuItems').eq(0).should('have.focus');
    cy.get('@menuItems').eq(0).type('{downArrow}');
    cy.get('@menuItems').eq(1).should('have.focus');

    cy.get('@menuItems').eq(1).type('{downArrow}');
    cy.get('@menuItems').eq(2).should('have.focus');

    cy.get('@menuItems').eq(2).type('{downArrow}');
    cy.get('@menuItems').eq(3).should('have.focus');

    cy.get('@menuItems').eq(3).type('{downArrow}');
    cy.get('@menuItems').eq(0).should('have.focus');

    /* Up arrow */
    cy.get('@menuItems').eq(0).should('have.focus');
    cy.get('@menuItems').eq(0).type('{upArrow}');
    cy.get('@menuItems').eq(3).should('have.focus');

    cy.get('@menuItems').eq(3).type('{upArrow}');
    cy.get('@menuItems').eq(2).should('have.focus');

    cy.get('@menuItems').eq(2).type('{upArrow}');
    cy.get('@menuItems').eq(1).should('have.focus');

    cy.get('@menuItems').eq(1).type('{upArrow}');
    cy.get('@menuItems').eq(0).should('have.focus');
  });

  it('Users can use the enter key bring focus to element - header', () => {
    cy.get('@menuItems').eq(1).contains('1)');
    cy.get('@menuItems').eq(1).type('{enter}');
    cy.focused().contains('Heading 1');
    cy.get('#skipMenu_menu').should('not.be.visible');
  });

  it('Users can use the space key bring focus to element - landmark', () => {
    cy.get('@menuItems').eq(0).contains('Main');
    cy.get('@menuItems').eq(0).type('{enter}');
    cy.focused().should('have.prop', 'tagName').should('eq', 'MAIN');
    cy.get('#skipMenu_menu').should('not.be.visible');
  });

  it('Users can click on the menu to bring focus to element - header', () => {
    cy.get('@menuItems').eq(2).contains('2)');
    cy.get('@menuItems').eq(2).click();
    cy.focused().contains('Heading 2');
    cy.get('#skipMenu_menu').should('not.be.visible');
  });

  it('Headers have a tabindex set', () => {
    cy.get('h1').contains('Heading 1').should('have.attr', 'tabindex', '-1');
  });

  it('Headers that have a tabindex, do not have index reset', () => {
    cy.get('h2').contains('Heading 2').should('have.attr', 'tabindex', '10');
  });

  it('Focusable element(s) do not have a tabindex set', () => {
    cy.get('button')
      .contains('Focusable element')
      .should('not.have.attr', 'tabindex');
  });

  it('Can use bring focus and return key to close/open menu', () => {
    cy.get('@skipMenuButton').focus();
    cy.get('#skipMenu_menu').should('be.visible');
    cy.get('@skipMenuButton').type('{enter}');
    cy.get('#skipMenu_menu').should('not.be.visible');
    cy.get('@skipMenuButton').type('{enter}');
    cy.get('#skipMenu_menu').should('be.visible');
  });

  it('Tab will close menu and bring to next focusable element', () => {
    // Tab
    cy.get('@menuItems').eq(0).should('have.focus');
    cy.get('body').tab();
    cy.get('#skipMenu_menu').should('not.be.visible');
    cy.get('button').contains('Focusable element').should('have.focus');
  });

  it('Shift tab will close menu and bring focus on button', () => {
    // Shift tab (closes window and puts focus on the button)
    cy.get('@menuItems').eq(0).should('have.focus');
    cy.get('body').tab({ shift: true });
    cy.get('#skipMenu_menu').should('not.be.visible');
    cy.get('@skipMenuButton').should('have.focus');
  });

  it('Can click anywhere to close menu', () => {
    cy.get('#skipMenu_menu').should('be.visible');
    cy.get('body').click();
    cy.get('#skipMenu_menu').should('not.be.visible');
  });
});
