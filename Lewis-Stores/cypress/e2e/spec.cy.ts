describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  });

  it('practice test', function() {
    cy.visit('http://localhost:3000')
    // Page title changed. The page title is 'Lewis Stores'
    cy.title()
      .should('eq', 'Lewis Stores')
    // The brand mark link is visible and points to the home page
    cy.get('#root a.brand-mark')
      .should(($el) => {
        expect($el).to.be.visible
        expect($el).to.have.attr('href', '/')
      })
    // The 'Home' navigation link is visible, active, and points to the home page
    cy.get('#root a.active')
      .should(($el) => {
        expect($el).to.be.visible
        expect($el).to.have.attr('href', '/')
        expect($el).to.contain.text('Home')
      })
    // The hero title is visible and says 'Furnish Your Home. Live Comfortably.'
    cy.get('#root h1.hero-title')
      .should('contain.text', 'Furnish Your Home.
                    
                    Live Comfortably.')
    // The hero text is visible and describes the store's offerings
    cy.get('#root p.hero-text')
      .should('contain.text', 'Quality furniture, appliances and electronics — all on affordable monthly instalments. Shop the Lewis way.')
    // The 'Shop Now' button is visible and points to the products page
    cy.get('#root div.row a.btn-primary')
      .should(($el) => {
        expect($el).to.have.attr('href', '/products')
        expect($el).to.contain.text('Shop Now')
      })
    // The 'Apply for Credit' button is visible and points to the credit page
    cy.get('#root div.row a.btn-secondary')
      .should(($el) => {
        expect($el).to.have.attr('href', '/credit')
        expect($el).to.contain.text('Apply for Credit')
      })
    // The 'Shop by Category' heading is visible
    cy.get('#root div.space-between h2')
      .should('contain.text', 'Shop by Category')
    
    
    cy.get('#root a[href="/auth"]').click();
    // The 'Home' navigation link is no longer active.
    cy.get('#root nav a[href="/"]')
      .should(($el) => {
        expect($el).to.not.have.class('active')
        expect($el).to.not.have.attr('aria-current')
      })
    // The page title is now 'Sign In'.
    cy.get('#root h1')
      .should('contain.text', 'Sign In')
    // A description for the sign-in form is displayed.
    cy.get('#root p')
      .should('contain.text', 'Access your saved profile, orders, and payment methods.')
    // An email input field is displayed.
    cy.get('#root input[type="email"]')
      .should(($el) => {
        expect($el).to.have.attr('required')
        expect($el).to.have.value('')
      })
    // A password input field is displayed.
    cy.get('#root input[type="password"]')
      .should('have.attr', 'required')
    // A 'Log In' button is displayed.
    cy.get('#root button.btn')
      .should('contain.text', 'Log In')
    // The 'Email' label is displayed.
    cy.get('#root form.form-grid div:nth-child(1)')
      .should('contain.text', 'Email')
    // The 'Password' label is displayed.
    cy.get('#root div:nth-child(2)')
      .should('contain.text', 'Password')
    
    cy.get('#root input[type="email"]').click();
    cy.get('#root input[type="email"]').type('sarah.johnson@lewisstores.local');
    // The email input field now contains the value 'sarah.johnson@lewisstores.local'.
    cy.get('#root input[type="email"]')
      .should('have.value', 'sarah.johnson@lewisstores.local')
    
    cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type('Password123!');
    cy.get('#root button.btn').click();
    // Page URL changed.
    cy.url()
      .should('eq', 'http://localhost:3000/profile')
    // The 'Profile' navigation link is now active.
    cy.get('#root nav a[href="/profile"]')
      .should(($el) => {
        expect($el).to.have.class('active')
        expect($el).to.have.attr('aria-current', 'page')
      })
    // The page heading is now 'My Account'.
    cy.get('#root h1')
      .should('contain.text', 'My Account')
    // The page description is now 'Manage your personal details and preferences.'.
    cy.get('#root section.stack-md > div:nth-child(1) > p')
      .should('contain.text', 'Manage your personal details and preferences.')
    // A welcome message with the user's email address is displayed.
    cy.get('#root > div:nth-child(2)')
      .should(($el) => {
        expect($el).to.be.visible
        expect($el).to.contain.text('Welcome back, sarah.johnson@lewisstores.local')
      })
    // The 'Log In' button is replaced by a 'Log Out' button.
    cy.get('#root div.nav-actions button.btn')
      .should(($el) => {
        expect($el).to.be.visible
        expect($el).to.contain.text('Log Out')
      })
    
    cy.get('#root a[href="/products"]').click();
    // The 'Products' navigation link is active.
    cy.get('#root nav a:nth-child(2)')
      .should(($el) => {
        expect($el).to.have.class('active')
        expect($el).to.have.attr('aria-current', 'page')
      })
    // The page heading is 'All Products'.
    cy.get('#root h1')
      .should('contain.text', 'All Products')
    // The 'Celine Queen Bed Frame' product card is displayed.
    cy.get('#root div.product-grid a:nth-child(1)')
      .should('have.attr', 'href', '/products/celine-bed-frame')
    // The 'Samsung 65" 4K UHD Smart TV' product card is displayed.
    cy.get('#root div.product-grid a:nth-child(2)')
      .should('have.attr', 'href', '/products/samsung-65-tv')
    // The 'Luca 3-Seater Sofa' product card is displayed.
    cy.get('#root div.product-grid a:nth-child(3)')
      .should('have.attr', 'href', '/products/luca-modular-sofa')
    // The 'Samsung 580L Double Door Fridge' product card is displayed.
    cy.get('#root div.product-grid a:nth-child(4)')
      .should('have.attr', 'href', '/products/samsung-fridge-double')
    // The 'Restonic Queen Comfort Mattress' product card is displayed.
    cy.get('#root div.product-grid a:nth-child(5)')
      .should('have.attr', 'href', '/products/restonic-mattress')
    // The 'Miren Coffee Table' product card is displayed.
    cy.get('#root a:nth-child(6)')
      .should('have.attr', 'href', '/products/miren-coffee-table')
    
  });
})