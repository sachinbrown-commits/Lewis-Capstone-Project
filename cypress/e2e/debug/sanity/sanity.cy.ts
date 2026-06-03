describe('Sanity Check', () => {
  it('App loads at localhost:3000', () => {
    cy.visit('http://localhost:3000')
    cy.get('body').should('be.visible')
    cy.url().should('include', 'localhost:3000')
    cy.log('App loaded successfully')
  })

  it('API is reachable at localhost:5000', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:5000/api/Products',
      failOnStatusCode: false,
    }).then((res) => {
      cy.log('API status: ' + res.status)
      expect(res.status).to.eq(200)
    })
  })

  it('Login API works and returns a token', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/Auth/login',
      body: {
        email: 'test.customer@lewisstores.local',
        password: 'Password123!',
      },
      headers: { 'Content-Type': 'application/json' },
      failOnStatusCode: false,
    }).then((res) => {
      cy.log('Status: ' + res.status)
      cy.log('Body: ' + JSON.stringify(res.body))
      expect(res.status).to.eq(200)
      expect(res.body).to.have.any.keys('token', 'accessToken', 'jwt')
    })
  })
})