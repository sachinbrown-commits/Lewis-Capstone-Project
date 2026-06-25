describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  })
  it('passes', () => {
    cy.get('#root a[href="/auth"]').click();
    cy.get('#root input[type="email"]').type('sarah.johnson@lewisstores.local');
    cy.get('#root input[type="password"]').type('Password123!', { log: false });
    cy.get('#root button.btn').click();
  })
})