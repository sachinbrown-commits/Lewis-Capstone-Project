// cypress/support/e2e.ts

Cypress.Commands.add('loginAs', (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/Auth/login',
      body: { email, password },
      headers: { 'Content-Type': 'application/json' },
      failOnStatusCode: false,
    }).then((res) => {
      cy.log('Login API status: ' + res.status)
      cy.log('Login API body: ' + JSON.stringify(res.body))

      const token =
        res.body.token ||
        res.body.accessToken ||
        res.body.jwt ||
        res.body.data?.token

      expect(res.status, 'Login API should return 200').to.eq(200)
      expect(token, 'Token should exist in response').to.exist

      window.localStorage.setItem('token', token)
      window.localStorage.setItem('authToken', token)
      cy.setCookie('token', token)
    })

    cy.visit('/')
    cy.url().should('not.include', '/login')
  })
})

Cypress.on('uncaught:exception', () => false)