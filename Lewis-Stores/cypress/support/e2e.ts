import '../pages/LoginPage'

// Suppress uncaught exceptions from the app under test
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('ResizeObserver') || err.message.includes('hydrat')) {
    return false
  }
})

// Custom login command
Cypress.Commands.add('login', () => {

  cy.get('#root a[href="/auth"]').click()

  cy.get('#root input[type="email"]')
    .type('sarah.johnson@lewisstores.local')

  cy.get('#root input[type="password"]')
    .type('Password123!', { log: false })

  cy.get('#root button.btn')
    .click()

  cy.get('#root button.btn-primary')
    .click()

})

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>
    }
  }
}