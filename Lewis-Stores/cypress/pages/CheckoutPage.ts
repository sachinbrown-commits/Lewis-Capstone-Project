export class CheckoutPage {
  visit(): void {
    cy.visit('/checkout')
  }

  fillCardDetails(cardNumber: string, expiry: string, cvv: string, name: string): void {
    cy.get('[data-testid="card-number"], input[placeholder*="card" i]')
      .clear().type(cardNumber)
    cy.get('[data-testid="card-expiry"], input[placeholder*="expir" i], input[placeholder*="MM" i]')
      .clear().type(expiry)
    cy.get('[data-testid="card-cvv"], input[placeholder*="cvv" i], input[placeholder*="cvc" i]')
      .clear().type(cvv)
    cy.get('[data-testid="card-name"], input[placeholder*="name" i]')
      .clear().type(name)
  }

  submitPayment(): void {
    cy.get('[data-testid="pay-btn"], button[type="submit"]').contains(/pay/i).click()
  }

  getSuccessMessage(): Cypress.Chainable {
    return cy.get('[data-testid="payment-success"], .success-message, [class*="success"]')
  }

  getDeclinedMessage(): Cypress.Chainable {
    return cy.get('[data-testid="payment-declined"], .error-message, [class*="error"]')
  }

  getRefundStatus(): Cypress.Chainable {
    return cy.get('[data-testid="refund-status"], [class*="refund"]')
  }

  getOrderConfirmationNumber(): Cypress.Chainable {
    return cy.get('[data-testid="order-number"], [class*="order-number"], [class*="confirmation"]')
  }
}