describe('Update Profile Info', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })
   it('passes', () => {
    cy.get('#root nav a[href="/profile"]').click();
    cy.get('#root input[name="fullName"]').clear().type('Emily Wilson');
    cy.get('#root input[name="email"]').clear().type('emily.wilson@lewisstores.local');
    cy.get('#root button.btn-primary').click();

cy.contains('Profile updated successfully').should('be.visible');
  })
  });