/*global cy before*/

describe('Build initial menu ', () => {
  before(() => {
    // This a simple list of headers and landmarks
    // change event listener is off
    // defaults are used
    cy.visit('/simpleMenuDefault.html');
    cy.contains('Skip To Content').click();
    cy.get('#skip2_menu').should('be.visible');
    cy.get('#skip2_menu').should('have.attr', 'role', 'menu');

    // headers = cy
    //   .get('#skip2_menu')
    //   .find('#skip2_headings')
    //   .find('[role="menuitem"]');

    // headers.should('have.length', 13);

    // landmarks = cy
    //   .get('#skip2_menu')
    //   .find('#skip2_landmarks')
    //   .find('[role="menuitem"]');

    // landmarks.should('have.length', 17);
  });
  beforeEach(() => {
    cy.get('#skip2_menu')
      .find('#skip2_headings')
      .find('[role="menuitem"]')
      .as('headers');
    cy.get('@headers').should('have.length', 13);

    cy.get('#skip2_menu')
      .find('#skip2_landmarks')
      .find('[role="menuitem"]')
      .as('landmarks');
    cy.get('@landmarks').should('have.length', 17);
  });

  describe('Landmark tests', () => {
    it('Aria label is shown', () => {
      cy.get('nav').eq(0).should('have.attr', 'aria-label', 'Aria label');
      cy.get('@landmarks').eq(0).contains('Navigation: Aria label');
    });

    it('Aria labeled by is shown', () => {
      cy.get('nav')
        .eq(1)
        .should('have.attr', 'aria-labelledby', 'navAriaLabel');
      cy.get('@landmarks').eq(1).contains('Navigation: Aria labeled by');
    });

    it('Title is shown', () => {
      cy.get('nav').eq(2).should('have.attr', 'title', 'Aria title');
      cy.get('@landmarks').eq(2).contains('Navigation: Aria title');
    });

    it('Just show landmark name', () => {
      cy.get('@landmarks').eq(3).contains('Navigation');
    });

    it('Finds all landmarks', () => {
      const expected = [
        'Navigation: Aria label',
        'Navigation: Aria labeled by',
        'Navigation: Aria title',
        'Navigation',
        'Main',
        'Main',
        'Search',
        'Navigation',
        'Section',
        'Region',
        'Form',
        'Complementary',
        'Complementary',
        'Banner',
        'Banner',
        'Footer',
        'Footer',
      ];
      cy.get('@landmarks').each((landmark, index) => {
        cy.wrap(landmark).contains(expected[index]);
      });
    });
  });

  describe('Heading tests', () => {
    it('Aria label is shown', () => {
      cy.get('@headers').eq(0).contains('Aria label heading 1');
    });

    it('Aria labeled by is shown', () => {
      cy.get('@headers').eq(1).contains('Aria label heading 2');
    });

    it('Title is shown', () => {
      cy.get('@headers').eq(2).contains('Title heading 3');
    });

    it('Find all headings on the page', () => {
      const expected = [
        '1) Aria label heading 1',
        '2) Aria label heading 2',
        '3) Title heading 3',
        '1) Heading 1 - tag',
        '1) Heading 1 - aria',
        '2) Heading 2 - tag',
        '2) Heading 2 - aria',
        '3) Heading 3 - tag',
        '3) Heading 3 - aria',
        '4) Heading 4 - tag',
        '4) Heading 4 - aria',
        '5) Heading 5 - tag',
        '5) Heading 5 - aria',
      ];
      cy.get('@headers').each((header, index) => {
        cy.wrap(header).contains(expected[index]);
      });
    });

    it('Headings are properly nested', () => {
      cy.get('@headers').eq(0).contains('1)');
      cy.get('@headers')
        .eq(0)
        .should('have.class', 'skip2-menu-header-level-1');

      cy.get('@headers').eq(1).contains('2)');
      cy.get('@headers')
        .eq(1)
        .should('have.class', 'skip2-menu-header-level-2');

      cy.get('@headers').eq(2).contains('3)');
      cy.get('@headers')
        .eq(2)
        .should('have.class', 'skip2-menu-header-level-3');

      cy.get('@headers').eq(3).contains('1)');
      cy.get('@headers')
        .eq(3)
        .should('have.class', 'skip2-menu-header-level-1');
    });
  });
});
