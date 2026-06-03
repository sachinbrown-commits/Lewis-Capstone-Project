export class CartPage {
  visit(): void {
    cy.visit('/cart')
  }

  getOrderTotal(): Cypress.Chainable {
    return cy.get('[data-testid="order-total"], .order-total, [class*="total"]')
  }

  applyCoupon(code: string): void {
    cy.get('[data-testid="coupon-input"], input[placeholder*="coupon" i], input[placeholder*="promo" i]')
      .clear()
      .type(code)
    cy.get('[data-testid="apply-coupon"], button').contains(/apply/i).click()
  }

  getCouponSuccessMessage(): Cypress.Chainable {
    return cy.get('[data-testid="coupon-success"], .coupon-success, [class*="success"]')
  }

  getCouponErrorMessage(): Cypress.Chainable {
    return cy.get('[data-testid="coupon-error"], .coupon-error, [class*="error"]')
  }

  updateQuantity(newQty: number): void {
    cy.get('[data-testid="cart-quantity"], input[type="number"]')
      .first()
      .clear()
      .type(newQty.toString())
      .blur()
  }

  removeItem(): void {
    cy.get('[data-testid="remove-item"], button').contains(/remove/i).first().click()
  }

  proceedToCheckout(): void {
    cy.get('[data-testid="checkout-btn"], button').contains(/checkout/i).click()
  }

  cancelOrder(): void {
    cy.get('[data-testid="cancel-order"], button').contains(/cancel/i).click()
  }
}