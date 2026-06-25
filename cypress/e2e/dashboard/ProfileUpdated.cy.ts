describe('Address management', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })
  it('passes', () => {
  cy.get('.nav-actions > .btn').click();
  cy.get('#root input[type="email"]').click().type("test.customer@lewisstores.local")
    cy.get('#root input[type="password"]').click().type("Password123!")
    cy.get('#root button.btn-primary').click();
    cy.get('#root button.btn-primary').click().click()
  })
})