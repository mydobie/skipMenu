/*global cy before*/
const urls = [/*'simpleMenuUpdateAuto',*/ 'simpleMenuUpdateManual'];

urls.forEach((url) => {
  describe(`Update ${url}`, () => {
    before(() => {
      cy.visit(`./${url}.html`);
    });
    beforeEach(() => {
      cy.reload();
      cy.get('#skip2_button').as('menuButton');
      cy.get('@menuButton').click(); // Open menu
      cy.get('#skip2_headings').find('[role="menuitem"]').as('menuHeadings');
      cy.get('#skip2_landmarks').find('[role="menuitem"]').as('menuLandmarks');
    });

    it('close and open menu', () => {
      cy.get('#skip2_menu').should('be.visible');
      cy.get('#closeMenu').click(); // Close menu
      cy.get('#skip2_menu').should('not.be.visible');
      cy.get('#openMenu').click(); // Open menu
      cy.get('#skip2_menu').should('be.visible');
    });

    it('Remove menu', () => {
      cy.get('#skip2').should('exist');
      cy.get('#removeMenu').click();
      cy.get('#skip2').should('not.exist');

      // should not exist after adding update
      cy.get('#addHeaderTag').click({ force: true });
      cy.get('#skip2').should('not.exist');
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
      cy.get('#skip2_headings').should('exist');
      cy.get('#removeHeaders').click();
      cy.get('@menuButton').click(); // open menu
      cy.get('#skip2_headings').should('not.exist');
    });

    it('Remove landmarks', () => {
      cy.get('#skip2_landmarks').should('exist');
      cy.get('#removeLandmarks').click();
      cy.get('@menuButton').click(); // open menu
      cy.get('#skip2_landmarks').should('not.exist');
    });

    it('Remove both landmarks and headers', () => {
      cy.get('#skip2').should('exist');
      cy.get('#removeBoth').click();
      cy.get('#skip2').should('not.exist');

      // should return after adding header/landmark and .update()
      cy.get('#addHeaderTag').click({ force: true });
      cy.get('#skip2').should('exist');
    });
  });
});
