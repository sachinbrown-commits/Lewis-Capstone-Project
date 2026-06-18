describe('Authentication Validation', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    
  });


  // AUTH-001: Valid login succeeds and session is created
  it('should login successfully with valid credentials', () => {
    cy.get('input[type="email"]').type('test.customer@lewisstores.local');
    cy.get('input[type="password"]').type('Password123!');
    cy.get('button.btn').click();
    cy.url().should('include', '/profile');
  });


  // AUTH-002: Invalid credentials are rejected
it('should stay on login page with invalid credentials', () => {
  cy.get('input[type="email"]').type('testcustomer@lewisstores.local');
  cy.get('input[type="password"]').type('Password123');
  cy.get('button.btn').click();
  cy.get('input[type="email"]').should('be.visible');
  cy.get('input[type="password"]').should('be.visible');
  cy.url().should('not.include', '/profile');
});


  // AUTH-003: Session persists across page navigation
  it('should maintain session across page navigation', () => {
    cy.get('input[type="email"]').type('test.customer@lewisstores.local');      
    cy.get('input[type="password"]').type('Password123!');   
    cy.get('button.btn').click();
    cy.get('a[href="/products"]').click();
    cy.reload();
    cy.get('nav a[href="/profile"]').click();
    cy.url().should('include', '/profile');
  });


  // AUTH-004: Logout invalidates session
  it('should invalidate session on logout', () => {
    cy.get('input[type="email"]').type('test.customer@lewisstores.local');
    cy.get('input[type="password"]').type('Password123!');
    cy.get('button.btn').click();
    cy.url().should('include', '/profile');
    cy.get('div.nav-actions button.btn').click();
    cy.get('a[aria-label="User profile"]').click();
    cy.get('a.btn-primary').click();
    cy.contains('Sign In').should('be.visible');
  });

  // AUTH-005: Email field is required
it('should require email before login', () => {
  cy.get('input[type="password"]').type('Password123!');
  cy.get('button.btn').click();
  
});

// AUTH-006: Password field is required
it('should require password before login', () => {
  cy.get('input[type="email"]').type('test.customer@lewisstores.local');
  cy.get('button.btn').click();

});
});
