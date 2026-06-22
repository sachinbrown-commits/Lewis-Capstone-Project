describe('Sanity Check', () => {
  it('App loads at localhost:3000', () => {
    cy.visit('http://localhost:3000')
    cy.get('body').should('be.visible')
    cy.url().should('include', 'localhost:3000')
    cy.log('App loaded successfully')
  });

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

  it('test 1', function() {
    cy.visit('http://localhost:3000')
    // Page title changed. The page title is 'Lewis Stores'.
    cy.title()
      .should('eq', 'Lewis Stores')
    // The brand logo is visible and links to the home page.
    cy.get('#root a.brand-mark')
      .should(($el) => {
        expect($el).to.be.visible
        expect($el).to.have.attr('href', '/')
      })
    // The 'Home' navigation link is visible and active.
    cy.get('#root a.active')
      .should(($el) => {
        expect($el).to.be.visible
        expect($el).to.have.attr('href', '/')
        expect($el).to.contain.text('Home')
      })
    // The 'Furniture' navigation link is visible and links to the products page.
    cy.get('#root nav a:nth-child(2)')
      .should(($el) => {
        expect($el).to.be.visible
        expect($el).to.have.attr('href', '/products')
        expect($el).to.contain.text('Furniture')
      })
    // The 'Credit' navigation link is visible and links to the credit page.
    cy.get('#root nav a:nth-child(3)')
      .should(($el) => {
        expect($el).to.be.visible
        expect($el).to.have.attr('href', '/credit')
        expect($el).to.contain.text('Credit')
      })
    // The 'Orders' navigation link is visible and links to the orders page.
    cy.get('#root nav a:nth-child(4)')
      .should(($el) => {
        expect($el).to.be.visible
        expect($el).to.have.attr('href', '/orders')
        expect($el).to.contain.text('Orders')
      })
    // The 'Profile' navigation link is visible and links to the profile page.
    cy.get('#root nav a:nth-child(5)')
      .should(($el) => {
        expect($el).to.be.visible
        expect($el).to.have.attr('href', '/profile')
        expect($el).to.contain.text('Profile')
      })
    // The hero title 'Furnish Your Home. Live Comfortably.' is visible.
    cy.get('#root h1.hero-title')
      .should('contain.text', 'Furnish Your Home.
                    
                    Live Comfortably.')
    
    
    cy.get('#root a[href="/auth"]').click();
    // The page heading changed to 'Sign In'.
    cy.get('#root h1')
      .should('contain.text', 'Sign In')
    // A descriptive paragraph for the sign-in page appeared.
    cy.get('#root p')
      .should('contain.text', 'Access your saved profile, orders, and payment methods.')
    // The email input field is visible.
    cy.get('#root input[type="email"]')
      .should(($el) => {
        expect($el).to.have.attr('required')
        expect($el).to.have.value('')
      })
    // The password input field is visible.
    cy.get('#root input[type="password"]')
      .should('have.attr', 'required')
    // The 'Log In' button is visible.
    cy.get('#root button.btn')
      .should('contain.text', 'Log In')
    // The 'Need an account? Create one' link is visible.
    cy.get('#root button[type="button"]')
      .should('contain.text', 'Need an account? Create one')
    // The 'Email' label is visible.
    cy.get('#root form.form-grid div:nth-child(1)')
      .should('contain.text', 'Email')
    // The 'Password' label is visible.
    cy.get('#root div:nth-child(2)')
      .should('contain.text', 'Password')
    
    cy.get('#root input[type="email"]').click();
    cy.get('#root input[type="email"]').type('sarah.johnson@lewisstores.local');
    // The email input field now contains 'sarah.johnson@lewisstores.local'.
    cy.get('#root input[type="email"]')
      .should('have.value', 'sarah.johnson@lewisstores.local')
    
    cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type('Password123!');
    cy.get('#root button.btn').click();
    // Page URL changed.
    cy.url()
      .should('eq', 'http://localhost:3000/profile')
    // The 'Profile' navigation link is active.
    cy.get('#root nav a[href="/profile"]')
      .should(($el) => {
        expect($el).to.have.class('active')
        expect($el).to.have.attr('aria-current', 'page')
      })
    // The page heading is 'My Account'.
    cy.get('#root h1')
      .should('contain.text', 'My Account')
    // A welcome back message is displayed.
    cy.get('#root > div:nth-child(2)')
      .should(($el) => {
        expect($el).to.be.visible
        expect($el).to.contain.text('Welcome back, sarah.johnson@lewisstores.local')
      })
    // The 'Log Out' button is visible.
    cy.get('#root div.nav-actions button.btn')
      .should(($el) => {
        expect($el).to.be.visible
        expect($el).to.contain.text('Log Out')
      })
    
    cy.get('#root a[href="/products"]').click();
    // The 'Furniture' navigation link is active.
    cy.get('#root nav a:nth-child(2)')
      .should(($el) => {
        expect($el).to.have.class('active')
        expect($el).to.have.attr('aria-current', 'page')
      })
    // The 'Profile' navigation link is no longer active.
    cy.get('#root nav a[href="/profile"]')
      .should(($el) => {
        expect($el).to.not.have.class('active')
        expect($el).to.not.have.attr('aria-current')
      })
    // The page heading is 'All Products'.
    cy.get('#root h1')
      .should('contain.text', 'All Products')
    // A descriptive paragraph for the products page is displayed.
    cy.get('#root section.stack-md > div:nth-child(1) > p')
      .should('contain.text', 'Quality brands on flexible credit — shop furniture, appliances, electronics and more.')
    // The 'Categories' heading is visible.
    cy.get('#root aside h3')
      .should('contain.text', 'Categories')
    // The product count message is visible.
    cy.get('#root div:nth-child(3) p')
      .should(($el) => {
        expect($el).to.contain.text('Showing')
        expect($el).to.contain.text('products')
      })
    // The sort dropdown is visible.
    cy.get('#root select > option')
      .should('have.length', 3)
    // The 'All' category link is active.
    cy.get('#root li:nth-child(1) a.side-menu-link')
      .should(($el) => {
        expect($el).to.have.attr('href', '/products')
        expect($el).to.contain.text('All')
      })
    
  });
})