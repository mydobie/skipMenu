/*global cy before*/

describe('Navigation', () => {
  before(() => {
    // This a simple list of headers and landmarks
    // change event listener is off
    // defaults are used
    cy.visit('/toolTip.html');
  });
  beforeEach(() => {
    cy.contains('Skip to content').as('skipMenuButton');
    cy.get('#skipMenu_menu').as('skipMenuMenu');
    cy.get('#skipMenu_tooltip').as('skipMenuTooltip');
    cy.get('@skipMenuMenu').then(($menu) => {
      if (!$menu.is(':visible')) {
        cy.get('@skipMenuButton').click();
      }
    });
  });

  it('Tooltip is not shown when menu is open', () => {
    cy.get('@skipMenuMenu').should('be.visible');
    cy.get('@skipMenuTooltip').should('not.be.visible');

    cy.get('@skipMenuButton').focus();
    cy.get('@skipMenuMenu').should('be.visible');
    cy.get('@skipMenuTooltip').should('not.be.visible');
  });

  it('Tooltip is shown when button has focus', () => {
    cy.get('@skipMenuMenu').then(($menu) => {
      if ($menu.is(':visible')) {
        cy.get('@skipMenuButton').click();
      }
    });
    cy.get('@skipMenuButton').focus();
    cy.get('@skipMenuMenu').should('not.be.visible');
    cy.get('@skipMenuTooltip').should('be.visible');
  });

  it('Tooltip is not shown when button does not have focus', () => {
    cy.get('@skipMenuMenu').then(($menu) => {
      if ($menu.is(':visible')) {
        cy.get('@skipMenuButton').click();
      }
    });
    cy.get('@skipMenuButton').focus();
    cy.get('@skipMenuMenu').should('not.be.visible');
    cy.get('@skipMenuTooltip').should('be.visible');
    cy.get('@skipMenuButton').blur();
    cy.get('@skipMenuTooltip').should('not.be.visible');
  });

  it('Toggle tooltip on mouse over and out', () => {
    cy.get('@skipMenuMenu').then(($menu) => {
      if ($menu.is(':visible')) {
        cy.get('@skipMenuButton').click();
      }
    });
    cy.get('@skipMenuMenu').should('not.be.visible');
    cy.get('@skipMenuButton').trigger('mouseover');
    cy.get('@skipMenuTooltip').should('be.visible');
    cy.get('@skipMenuButton').trigger('mouseout');
    cy.get('@skipMenuTooltip').should('not.be.visible');
  });

  it('Tooltip describes access key', () => {
    cy.get('@skipMenuTooltip').contains('+ 0');
  });

  // Leaving this as todo because the machine is unknown
  //it.todo('Menu is opened when access key is pressed');
});
