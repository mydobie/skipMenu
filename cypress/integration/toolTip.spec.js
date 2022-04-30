/*global cy before*/

describe('Navigation', () => {
  before(() => {
    // This a simple list of headers and landmarks
    // change event listener is off
    // defaults are used
    cy.visit('/toolTip.html');
  });
  beforeEach(() => {
    cy.contains('Skip To Content').as('skip2Button');
    cy.get('#skip2_menu').as('skip2Menu');
    cy.get('#skip2_tooltip').as('skip2Tooltip');
    cy.get('@skip2Menu').then(($menu) => {
      if (!$menu.is(':visible')) {
        cy.get('@skip2Button').click();
      }
    });
  });

  it('Tooltip is not shown when menu is open', () => {
    cy.get('@skip2Menu').should('be.visible');
    cy.get('@skip2Tooltip').should('not.be.visible');

    cy.get('@skip2Button').focus();
    cy.get('@skip2Menu').should('be.visible');
    cy.get('@skip2Tooltip').should('not.be.visible');
  });

  it('Tooltip is shown when button has focus', () => {
    cy.get('@skip2Menu').then(($menu) => {
      if ($menu.is(':visible')) {
        cy.get('@skip2Button').click();
      }
    });
    cy.get('@skip2Button').focus();
    cy.get('@skip2Menu').should('not.be.visible');
    cy.get('@skip2Tooltip').should('be.visible');
  });

  it('Tooltip is not shown when button does not have focus', () => {
    cy.get('@skip2Menu').then(($menu) => {
      if ($menu.is(':visible')) {
        cy.get('@skip2Button').click();
      }
    });
    cy.get('@skip2Button').focus();
    cy.get('@skip2Menu').should('not.be.visible');
    cy.get('@skip2Tooltip').should('be.visible');
    cy.get('@skip2Button').blur();
    cy.get('@skip2Tooltip').should('not.be.visible');
  });

  it('Toggle tooltip on mouse over and out', () => {
    cy.get('@skip2Menu').then(($menu) => {
      if ($menu.is(':visible')) {
        cy.get('@skip2Button').click();
      }
    });
    cy.get('@skip2Menu').should('not.be.visible');
    cy.get('@skip2Button').trigger('mouseover');
    cy.get('@skip2Tooltip').should('be.visible');
    cy.get('@skip2Button').trigger('mouseout');
    cy.get('@skip2Tooltip').should('not.be.visible');
  });

  it('Tooltip describes access key', () => {
    cy.get('@skip2Tooltip').contains('+ 0');
  });

  // Leaving this as todo because the machine is unknown
  //it.todo('Menu is opened when access key is pressed');
});
