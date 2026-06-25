describe('FR-002 | Order Management', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('T-UI-ORD-001: Products load and display correctly on storefront', () => {
   cy.get('#root div.row a.btn-primary').click();
   cy.url().should('include', '/products');
   cy.get('#root h1').should('contain', 'All Products');
   cy.get('.product-card').should('have.length.greaterThan', 0);
   cy.get('.product-card').its('length').then((count) => {
   cy.log(`Products displayed: ${count}`);
    expect(count).to.be.greaterThan(0);
  });
});

  it('T-UI-ORD-002: Add a product to cart with valid quantity', function() {
    cy.get('#root div.row a.btn-primary').click();
    cy.get('[href="/products/aurora-speaker"] > [style="padding: 0px 0.25rem;"] > .space-between > .btn').click();
    cy.get('[href="/products/aurora-speaker"] > [style="padding: 0px 0.25rem;"] > .space-between > .btn').click();
    cy.get('#root a[aria-label="Open cart"] svg').click();
  });

  it('T-UI-ORD-003: Remove product from cart - Order total updates correctly ', function() {
    cy.get('#root nav a[href="/products"]').click();
    cy.get('#root a[href="/products/aurora-speaker"] button.btn').click(); 
    cy.get('#root a[href="/products/mirror-wall"] button.btn').click();
    cy.get('#root a[aria-label="Open cart"] svg').click();
    cy.get('#root div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > button:nth-child(2)').click();
    cy.get('#root span.cart-badge').should('contain.text', '1')
    cy.get('#root p:nth-child(2)').should('contain.text', 'You have 1 item in your cart.')
    cy.get('#root div:nth-child(2) > div:nth-child(1) > span:nth-child(2)').should('contain.text', 'R 5 999')
    cy.get('#root div:nth-child(2) div:nth-child(3) span:nth-child(2)').should('contain.text', 'R 900')
    cy.get('#root div.summary-total span:nth-child(2)').should('contain.text', 'R 6 899')
   });

  it('T-UI-ORD-004: Order Total Calculated Correctly (items x price + tax)', function() {
    cy.get('#root div.row a.btn-primary').click();
    cy.get('[href="/products/cloudrest-mattress"] > [style="padding: 0px 0.25rem;"] > .space-between > .btn')
    cy.get('#root a[href="/products/cloudrest-mattress"] button.btn').click();
    cy.get('[href="/products/luca-modular"] > [style="padding: 0px 0.25rem;"] > .space-between > .btn')
    cy.get('#root a[href="/products/luca-modular"] button.btn').click();
    cy.get('#root a[aria-label="Open cart"] svg').click();
   });

  it('T-UI-ORD-005: Invalid coupon code shows error - Total unchanged', function() {
    cy.get('#root div.row a.btn-primary').click();
    cy.get('#root a[href="/products/mirror-wall"] div.product-image-container').click();
    cy.get('#root button.btn-block').click();
    cy.get('#root a[aria-label="Open cart"] svg').click();
    cy.get('#root input').click();
    cy.get('#root input').type('COUPON26');
    cy.get('#root button.btn').click();
    cy.get('#root button.btn').click();
    cy.get('#root button.btn').click();
   });

  it('T-UI-ORD-006: Modify order quantity before payment - total updates', function() {
    cy.get('#root div.row a.btn-primary').click();
    cy.get('[href="/products/luca-modular"] > [style="padding: 0px 0.25rem;"] > .space-between > .btn')
    cy.get('#root a[href="/products/luca-modular"] button.btn').click();
    cy.get('#root a[href="/products/aurora-speaker"] button.btn').click();
    cy.get('[href="/products/luca-modular"] > [style="padding: 0px 0.25rem;"] > .space-between > .btn')
    cy.get('#root a[aria-label="Open cart"] svg').click();
    cy.get('#root div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div > button:nth-child(3)').click();
    cy.get('#root div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div > button:nth-child(3)').click();
    cy.get('#root div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div > button:nth-child(3)').click();
    cy.get('#root div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div > button:nth-child(3)').click();
    cy.get('#root div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div > button:nth-child(3)').click();
    cy.get('#root div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div > button:nth-child(3)').click();
    cy.get('#root div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div > button:nth-child(3)').click();
    cy.get('#root div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div > button:nth-child(3)').click();
    cy.get('#root div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div > button:nth-child(3)').click();
    cy.get('#root div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div > button:nth-child(3)').click();
    cy.get('#root div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div > button:nth-child(3)').click();
    cy.get('#root div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div > button:nth-child(3)').click();
    cy.get('#root div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div > button:nth-child(3)').click();
    cy.get('#root div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div > button:nth-child(3)').click();
    cy.get('#root div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div > button:nth-child(3)').click();
    cy.get('#root div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div > button:nth-child(3)').click();
    cy.get('#root div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div > button:nth-child(3)').click();
    cy.get('#root div:nth-child(2) div:nth-child(2) div:nth-child(4) div button:nth-child(3)').click();
    cy.get('#root div:nth-child(2) div:nth-child(2) div:nth-child(4) div button:nth-child(3)').click();
    cy.get('#root div:nth-child(2) div:nth-child(2) div:nth-child(4) div button:nth-child(3)').click();
    cy.get('#root div:nth-child(2) div:nth-child(2) div:nth-child(4) div button:nth-child(3)').click();
    cy.get('#root div:nth-child(2) div:nth-child(2) div:nth-child(4) div button:nth-child(3)').click();
  });
  
  it('T-UI-ORD-007: Cannot modify payment after order is confirmed', function() {
    cy.get('#root div.row a.btn-primary').click();
    cy.get('#root a[href="/products/aurora-speaker"] div.product-image-container').click();
    cy.get('#root button.btn-block').click();
    cy.get('#root a[aria-label="Open cart"] svg').click();
    cy.get('#root a.btn-block').click();
    cy.get('#root button.btn-primary').click();
    cy.get('#root input[placeholder="e.g. Thabo Nkosi"]').click();
    cy.get('#root input[placeholder="e.g. Thabo Nkosi"]').click();
    cy.get('#root input[placeholder="e.g. Thabo Nkosi"]').type('Sarah Johnson');
    cy.get('#root input[placeholder="+27 82 000 0000"]').click();
    cy.get('#root input[placeholder="+27 82 000 0000"]').type('+27605060670');
    cy.get('#root input[placeholder="e.g. 12 Mandela Street, Sandton"]').click();
    cy.get('#root input[placeholder="e.g. 12 Mandela Street, Sandton"]').type('1 Lewis Road Cape Town ');
    cy.get('#root input[placeholder="e.g. Johannesburg"]').click();
    cy.get('#root input[placeholder="e.g. Johannesburg"]').type('Cape Town');
    cy.get('#root input[placeholder="e.g. 2196"]').click();
    cy.get('#root input[placeholder="e.g. 2196"]').type('1234');
    cy.get('#root button.btn-primary').click();
    cy.get('#root button.btn-primary').click();
    cy.get('#root a.btn-primary').click();
    cy.get('#root input[type="email"]').click();
    cy.get('#root input[type="email"]').type('sarah.johnson@lewisstores.local');
    cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type('Password123!');
    cy.get('#root button.btn').click();
    cy.get('#root button.btn-primary').click();
    cy.get('#root nav a[href="/orders"]').click();
    cy.get('#root nav a[href="/orders"]').click();
  });

  it('T-UI-ORD-008: Cancel order before payment - inventory restored', function() {
    // Test implementation
    cy.get('#root div.row a.btn-primary').click();
    cy.get('#root a[href="/orders"]').click();
    cy.get('#root a.btn-primary').click();
    cy.get('#root div:nth-child(2)').click();
    cy.get('#root input[type="email"]').click();
    cy.get('#root input[type="email"]').type('sarah.johnson@lewisstores.local');
    cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type('Password123!');
    cy.get('#root button.btn').click();
    cy.get('#root nav a[href="/orders"]').click();
    cy.get('#root a[aria-label="Open cart"] svg').click();
    cy.get('#root a.btn').click();
  });

    it('T-UI-ORD-009: Idempotency - Double clicking checkout does not duplicate order', function() {
      cy.get('#root section.hero').click();
      cy.get('#root div.row a.btn-primary').click();
      cy.get('#root a[href="/products/atlas-lounge"] div.product-image-container').click();
      cy.get('#root button.btn-block').click();
      cy.get('#root button.btn-block').click();
      cy.get('#root a[aria-label="Open cart"] svg').click();
      cy.get('#root a.btn-block').click();
      cy.get('#root div.split-layout').click();
      cy.get('#root button.btn-primary').click();
      cy.get('#root input[type="password"]').click();
      cy.get('#root input[type="password"]').type('Password123!');
      cy.get('#root input[type="email"]').click();
      cy.get('#root input[type="email"]').type('sarah.johnson@lewisstores.local');
      cy.get('#root button.btn-secondary').click();
      cy.get('#root button.btn-primary').click();
      cy.get('#root button.btn-primary').click();
      cy.get('#root button.btn-primary').click();
      cy.get('#root input[placeholder="e.g. Johannesburg"]').click();
      cy.get('#root input[placeholder="e.g. Johannesburg"]').type('joberg');
      cy.get('#root input[placeholder="e.g. 2196"]').click();
      cy.get('#root input[placeholder="e.g. 2196"]').type('2196');
      cy.get('#root button.btn-primary').click();
    });

    it('T-UI-ORD-010: Quantity Validation - Zero quantities rejected', () => {
  cy.get('#root a[href="/products/aurora-speaker"]')
    .click();
  cy.get('#root h1')
    .should('contain.text', 'Aurora Wireless Speaker');
  cy.get('#root div:nth-child(3) div button:nth-child(1)')
    .click()
    .click()
    .click();
  cy.get('#root div:nth-child(3)')
    .should('contain.text', '1');
   });
}); 






   
