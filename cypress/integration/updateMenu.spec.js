/*global cy before*/
const urls = ['simpleMenuUpdateAuto', 'simpleMenuUpdateManual'];
//const urls = ['simpleMenuUpdateAuto'];
// const urls = ['simpleMenuUpdateManual'];

urls.forEach((url) => {
  describe(`Update ${url}`, () => {
    before(() => {
      cy.visit(`./${url}.html`);
    });
    beforeEach(() => {
      cy.reload();
      cy.get('#skipMenu_button').as('menuButton');
      cy.get('#skipMenu_headings').find('[role="menuitem"]').as('menuHeadings');
      cy.get('#skipMenu_landmarks')
        .find('[role="menuitem"]')
        .as('menuLandmarks');
    });

    it('close and open menu', () => {
      cy.get('#skipMenu').should('exist');
      cy.get('#skipMenu_button').click({ force: true }); // Open menu

      //   cy.get('#skipMenu_menu').should('be.visible'); // There is an issue with cyress on auto test
      cy.get('#skipMenu_button').should('have.attr', 'aria-expanded', 'true');

      cy.get('#closeMenu').click(); // Close menu
      //cy.get('#skipMenu_menu').should('not.be.visible'); // There is an issue with cyress on auto test
      cy.get('#skipMenu_button').should('not.have.attr', 'aria-expanded');

      cy.get('#openMenu').click(); // Open menu
      //cy.get('#skipMenu_menu').should('be.visible'); // There is an issue with cyress on auto test
      cy.get('#skipMenu_button').should('have.attr', 'aria-expanded', 'true');
    });

    it('Remove menu', () => {
      cy.get('#skipMenu').should('exist');
      cy.get('#removeMenu').click();
      cy.get('#skipMenu').should('not.exist');

      // should not exist after adding update
      cy.get('#addHeaderTag').click({ force: true });
      cy.get('#skipMenu').should('not.exist');
    });

    it('Edit header text', () => {
      cy.get('@menuHeadings')
        .eq(0)
        .should('have.text', '1) This is a tag header');
      cy.get('#editHeaderTagText').click({ force: true });
      cy.get('@menuButton').click();
      cy.get('@menuHeadings')
        .eq(0)
        .should('have.text', '1) This is a tag header - changed');
    });

    it('Edit aria header text', () => {
      cy.get('@menuHeadings')
        .eq(1)
        .should('have.text', '1) This is a role header');
      cy.get('#editHeaderAriaText').click({ force: true });
      cy.get('@menuButton').click();
      cy.get('@menuHeadings')
        .eq(1)
        .should('have.text', '1) This is a role header - changed');
    });

    it('Edit aria header level', () => {
      cy.get('@menuHeadings')
        .eq(1)
        .should('have.text', '1) This is a role header');
      cy.get('#editHeaderAriaLevel').click({ force: true });
      cy.get('@menuButton').click();
      cy.get('@menuHeadings')
        .eq(1)
        .should('have.text', '2) This is a role header');
    });

    it('Add header tag', () => {
      cy.get('@menuHeadings').eq(2).should('not.exist');
      cy.get('#addHeaderTag').click({ force: true });
      cy.get('@menuButton').click();
      cy.get('@menuHeadings')
        .eq(2)
        .should('have.text', '1) This is a new tag header');
    });

    it('Add header tag with aria', () => {
      cy.get('@menuHeadings').eq(2).should('not.exist');
      cy.get('#addHeaderAria').click({ force: true });
      cy.get('@menuButton').click();
      cy.get('@menuHeadings')
        .eq(2)
        .should('have.text', '2) This is a new aria header');
    });

    it('Edit nav text', () => {
      cy.get('@menuLandmarks')
        .eq(0)
        .should('have.text', 'Navigation: Arial label nav');
      cy.get('#editNavAriaText').click({ force: true });
      cy.get('@menuButton').click();
      cy.get('@menuLandmarks')
        .eq(0)
        .should('have.text', 'Navigation: Arial label nav - changed');
    });

    it('Change nav aria to a different landmark', () => {
      cy.get('@menuLandmarks')
        .eq(1)
        .should('have.text', 'Navigation: Aria role nav');
      cy.get('#editLandmarkRole').click({ force: true });
      cy.get('@menuButton').click();
      cy.get('@menuLandmarks')
        .eq(1)
        .should('have.text', 'Banner: Aria role nav');
    });

    it('Add navigation tag', () => {
      cy.get('@menuLandmarks').eq(2).should('not.exist');
      cy.get('#addLandmarkTag').click({ force: true });
      cy.get('@menuButton').click();
      cy.get('@menuLandmarks').eq(2).should('have.text', 'Complementary');
    });

    it('Add navigation arial role', () => {
      cy.get('@menuLandmarks').eq(2).should('not.exist');
      cy.get('#addLandmarkAria').click({ force: true });
      cy.get('@menuButton').click();
      cy.get('@menuLandmarks').eq(2).should('have.text', 'Region');
    });

    it('Remove headers', () => {
      cy.get('#skipMenu_headings').should('exist');
      cy.get('#removeHeaders').click();
      cy.get('@menuButton').click(); // open menu
      cy.get('#skipMenu_headings').should('not.exist');
    });

    it('Remove landmarks', () => {
      cy.get('#skipMenu_landmarks').should('exist');
      cy.get('#removeLandmarks').click();
      cy.get('@menuButton').click(); // open menu
      cy.get('#skipMenu_landmarks').should('not.exist');
    });

    it('Remove both landmarks and headers', () => {
      cy.get('#skipMenu').should('exist');
      cy.get('#removeBoth').click();
      cy.get('#skipMenu').should('not.exist');

      // should return after adding header/landmark and .update()
      cy.get('#addHeaderTag').click({ force: true });
      cy.get('#skipMenu').should('exist');
    });
  });
});
