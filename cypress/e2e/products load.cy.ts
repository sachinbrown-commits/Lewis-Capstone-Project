describe('template spec', () => {
  it('passes', () => {
     import { StorefrontPage } from '../../support/pages/StorefrontPage'
     import { CartPage } from '../../support/pages/CartPage'
     import { LoginPage } from '../../support/pages/LoginPage'
     
     const storefront = new StorefrontPage()
     const cart = new CartPage()
     const login = new LoginPage()
     
     describe('FR-002 | Order Management', () => {
       beforeEach(() => {
         cy.fixture('testData').then((data) => {
           cy.loginAs(data.validUser.email, data.validUser.password)
         })
         storefront.visit()
       });
     
       // T-UI-ORD-001
       it('T-UI-ORD-001: Products load and display correctly on storefront', () => {
         // Arrange - page already loaded in beforeEach
         // Act
         storefront.getProductCards().should('have.length.greaterThan', 0)
         // Assert
         storefront.getProductCards().first().within(() => {
           cy.get('img').should('be.visible')
           cy.get('[class*="name"], [class*="title"], h2, h3').should('not.be.empty')
           cy.get('[class*="price"]').should('be.visible')
         })
       })
  })
})