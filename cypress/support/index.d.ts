// cypress/support/index.d.ts

declare namespace Cypress {
  interface Chainable {
    loginAs(email: string, password: string): Chainable<void>
  }
}