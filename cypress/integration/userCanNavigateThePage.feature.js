describe("User can navigate the page", () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should start on about page', () => {
    cy.get('#about-page').contains('Bigheadgigolo')
  })

  it('can go to about page', () => {
    cy.get('a#about').click()
    cy.url().should("contain", "/about")
    cy.get('#about-page').contains('Bigheadgigolo')
  })

  it('can go to menu', () => {
    cy.get('a#menu').click()
    cy.url().should("contain", "menu")
    cy.get('div#menu').should('exist')
  })

  it('can go to checkout page', () => {
    cy.get('a#checkout').click()
    cy.url().should("contain", "checkout")
    cy.get('#checkout-page').contains('Checkout')
  })
}) 