describe('End-To-End Testing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

 it('should create an order successfully', () => {

  const email = 'test.customer@lewisstores.local';
  const password = 'Password123!';
  cy.get('a[href="/products/aurora-speaker"]').click();
  cy.get('button.btn-block').click();
  cy.get('a[aria-label="Open cart"]').click();
  cy.get('a.btn-block').click();
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button.btn-secondary').click();
  cy.get('input[placeholder="e.g. Johannesburg"]').type('Cape Town');
  cy.get('input[placeholder="e.g. 2196"]').type('2196');
  cy.get('button.btn-primary').click();
  cy.get('a[href="/orders"]').click();
});
});