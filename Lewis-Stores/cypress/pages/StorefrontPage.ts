export class StorefrontPage {
  visit(): void {
    cy.visit('/')
  }

  getProductCards(): Cypress.Chainable {
    return cy.get('[data-testid="product-card"], .product-card, [class*="product"]')
  }

  getProductByName(name: string): Cypress.Chainable {
    return cy.contains('[data-testid="product-card"], .product-card', name)
  }

  addToCart(productName: string): void {
    this.getProductByName(productName)
      .find('[data-testid="add-to-cart"], button')
      .contains(/add to cart/i)
      .click()
  }

  setQuantity(quantity: number): void {
    cy.get('[data-testid="quantity-input"], input[type="number"]')
      .clear()
      .type(quantity.toString())
  }

  getCartCount(): Cypress.Chainable {
    return cy.get('[data-testid="cart-count"], .cart-badge, [class*="cart-count"]')
  }
}