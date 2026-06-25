describe('Order History', () => {
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
    cy.contains('Order History').should('be.visible');
    cy.contains('TOTAL ORDERS').should('be.visible');
    cy.contains('ACTIVE DELIVERIES').should('be.visible');
    cy.contains('LATEST ORDER').should('be.visible');

    cy.get('table').should('be.visible');

    cy.contains('View').first().click();

      cy.url().should('include', '/orders');
      });
    })