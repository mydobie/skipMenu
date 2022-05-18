/*global cy before*/

describe('AttachTo tests', () => {
  before(() => {
    // This a simple list of headers and landmarks
    // change event listener is off
    // defaults are used
    cy.visit('/attachMenu.html');
  });

  //  beforeEach(() => {});

  it('Ensure that position is set sticky menus', () => {
    cy.get('#sticky').find('[data-skip-menu]');
    cy.get('#sticky').invoke('css', 'position').should('equal', 'sticky');

    cy.get('#stickyInline').find('[data-skip-menu]');
    cy.get('#stickyInline').invoke('css', 'position').should('equal', 'sticky');
  });

  it('Ensure that position is set absolute menus', () => {
    cy.get('#absolute').find('[data-skip-menu]');
    cy.get('#absolute').invoke('css', 'position').should('equal', 'absolute');

    cy.get('#absoluteInline').find('[data-skip-menu]');
    cy.get('#absoluteInline')
      .invoke('css', 'position')
      .should('equal', 'absolute');
  });

  it('Ensure that position is set fixed menus', () => {
    cy.get('#fixed').find('[data-skip-menu]');
    cy.get('#fixed').invoke('css', 'position').should('equal', 'fixed');

    cy.get('#fixedInline').find('[data-skip-menu]');
    cy.get('#fixedInline').invoke('css', 'position').should('equal', 'fixed');
  });

  it('Ensure that position is set relative menus', () => {
    cy.get('#relative').find('[data-skip-menu]');
    cy.get('#relative').invoke('css', 'position').should('equal', 'relative');

    cy.get('#relativeInline').find('[data-skip-menu]');
    cy.get('#relativeInline')
      .invoke('css', 'position')
      .should('equal', 'relative');
  });

  it('Ensure that position is set static menus', () => {
    cy.get('#static').find('[data-skip-menu]');
    cy.get('#static').invoke('css', 'position').should('equal', 'relative');

    cy.get('#staticInline').find('[data-skip-menu]');
    cy.get('#staticInline')
      .invoke('css', 'position')
      .should('equal', 'relative');
  });

  it('Ensure that position is set on non-positioned menus', () => {
    cy.get('#none').find('[data-skip-menu]');
    cy.get('#none').invoke('css', 'position').should('equal', 'relative');
  });
});
