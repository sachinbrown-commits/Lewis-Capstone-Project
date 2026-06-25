describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })
  it('passes', () => {
    cy.get('#root a[href="/auth"]').click();
    cy.get('#root input[type="email"]').type('sarah.johnson@lewisstores.local');
    cy.get('#root input[type="password"]').type('Password123!', { log: false });
    cy.get('#root button.btn').click();

    cy.get('#root nav a[href="/orders"]').click();

    cy.get('#root td:nth-child(1)').should("have.text", "#ORD-002-20260511");
  })
})