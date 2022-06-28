/*global cy before*/

describe('Custom Headers', () => {
  before(() => {
    cy.visit('./customHeadings.html');
  });

  it('Only headings in headings config are shown', () => {
    cy.get('#skipMenu').should('exist');
    cy.get('#skipMenu_button').click({ force: true }); // Open menu
    cy.get('#skipMenu_menu').should('be.visible');

    cy.get('[role="menuitem"]').should('contain', 'Heading Aria 1');
    cy.get('h1').should('contain', 'Heading 1');
    cy.get('[role="menuitem"]').should('not.contain', 'Heading 1');

    cy.get('[role="menuitem"]').should('contain', 'Heading Aria 2');
    cy.get('h2').should('contain', 'Heading 2');
    cy.get('[role="menuitem"]').should('not.contain', 'Heading 2');

    cy.get('[role="menuitem"]').should('contain', 'Heading Aria 3');
    cy.get('h3').should('contain', 'Heading 3');
    cy.get('[role="menuitem"]').should('not.contain', 'Heading 3');

    cy.get('[role="menuitem"]').should('contain', 'Heading Aria 4');
    cy.get('h4').should('contain', 'Heading 4');
    cy.get('[role="menuitem"]').should('not.contain', 'Heading 4');
  });
});

describe('Custom Landmarks', () => {
  before(() => {
    cy.visit('./customLandmarks.html');
  });

  it('Only landmarks in landmarks config are shown', () => {
    cy.get('#skipMenu').should('exist');
    cy.get('#skipMenu_button').click({ force: true }); // Open menu
    cy.get('#skipMenu_menu').should('be.visible');

    cy.get('main').should('exist');
    cy.get('[role="menuitem"]').should('contain', 'Main');

    cy.get('section[aria-label="I am section 1"]').should('exist');
    cy.get('[role="menuitem"]').should('not.contain', 'I am section 1');

    cy.get('section[aria-label="I am section 2"]').should('exist');
    cy.get('[role="menuitem"]').should('not.contain', 'I am section 2');

    cy.get('section[aria-label="I am section 3"]').should('exist');
    cy.get('[role="menuitem"]').should('not.contain', 'I am section 3');
  });
});
