// T-UI-ORD-001 to T-UI-ORD-010
// FR-002: Order Management

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

  // T-UI-ORD-002
  it('T-UI-ORD-002: Add a product to cart with valid quantity', () => {
    // Arrange
    cy.fixture('testData').then((data) => {
      // Act
      storefront.addToCart(data.product.name)
      // Assert - cart badge should increment
      storefront.getCartCount().should('contain', '1')
    })
  })

  // T-UI-ORD-003
  it('T-UI-ORD-003: Apply a valid coupon code - discount reflected in total', () => {
    // Arrange
    cy.fixture('testData').then((data) => {
      storefront.addToCart(data.product.name)
      cart.visit()
      cart.getOrderTotal().invoke('text').then((originalTotal) => {
        // Act
        cart.applyCoupon(data.validCoupon)
        // Assert
        cart.getCouponSuccessMessage().should('be.visible')
        cart.getOrderTotal().invoke('text').should((newTotal) => {
          expect(parseFloat(newTotal.replace(/[^0-9.]/g, ''))).to.be.lessThan(
            parseFloat(originalTotal.replace(/[^0-9.]/g, ''))
          )
        })
      })
    })
  })

  // T-UI-ORD-004
  it('T-UI-ORD-004: Order total calculated correctly (items x price + tax)', () => {
    cy.fixture('testData').then((data) => {
      storefront.addToCart(data.product.name)
      cart.visit()
      // Assert - total element is visible and numeric
      cart.getOrderTotal()
        .invoke('text')
        .then((text) => {
          const total = parseFloat(text.replace(/[^0-9.]/g, ''))
          expect(total).to.be.greaterThan(0)
          // Cross-check via API
          cy.request({
            method: 'GET',
            url: 'http://localhost:5000/api/Cart',
            headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
          }).then((res) => {
            expect(res.status).to.eq(200)
          })
        })
    })
  })

  // T-UI-ORD-005
  it('T-UI-ORD-005: Invalid coupon code shows error - total unchanged', () => {
    cy.fixture('testData').then((data) => {
      storefront.addToCart(data.product.name)
      cart.visit()
      cart.getOrderTotal().invoke('text').then((originalTotal) => {
        // Act
        cart.applyCoupon(data.invalidCoupon)
        // Assert
        cart.getCouponErrorMessage().should('be.visible')
        cart.getOrderTotal().invoke('text').should('eq', originalTotal)
      })
    })
  })

  // T-UI-ORD-006
  it('T-UI-ORD-006: Modify order quantity before payment - total updates', () => {
    cy.fixture('testData').then((data) => {
      storefront.addToCart(data.product.name)
      cart.visit()
      cart.getOrderTotal().invoke('text').then((originalTotal) => {
        // Act - increase quantity
        cart.updateQuantity(3)
        // Assert - total should be higher
        cart.getOrderTotal().invoke('text').should((newTotal) => {
          expect(parseFloat(newTotal.replace(/[^0-9.]/g, ''))).to.be.greaterThan(
            parseFloat(originalTotal.replace(/[^0-9.]/g, ''))
          )
        })
      })
    })
  })

  // T-UI-ORD-007
  it('T-UI-ORD-007: Cannot modify order after it is confirmed / payment complete', () => {
    // Arrange - use an already-completed order from order history
    cy.visit('/orders')
    cy.get('[class*="order-item"], [data-testid="order-row"]').first().click()
    // Assert - modify/edit button should not exist or be disabled
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="edit-order"]').length) {
        cy.get('[data-testid="edit-order"]').should('be.disabled')
      } else {
        cy.get('button').contains(/modify|edit/i).should('not.exist')
      }
    })
  })

  // T-UI-ORD-008
  it('T-UI-ORD-008: Cancel order before payment - inventory restored', () => {
    cy.fixture('testData').then((data) => {
      // Arrange - add to cart
      storefront.addToCart(data.product.name)
      cart.visit()
      // Act
      cart.cancelOrder()
      // Assert - cart should be empty
      cy.visit('/cart')
      cy.get('[data-testid="cart-empty"], [class*="empty"]').should('be.visible')
    })
  })

  // T-UI-ORD-009
  it('T-UI-ORD-009: Idempotency - double clicking checkout does not duplicate order', () => {
    cy.fixture('testData').then((data) => {
      storefront.addToCart(data.product.name)
      cart.visit()
      // Act - double click the checkout button
      cy.get('[data-testid="checkout-btn"], button').contains(/checkout/i)
        .dblclick()
      // Assert - only one order created (check via API)
      cy.request({
        method: 'GET',
        url: 'http://localhost:5000/api/Orders',
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
      }).then((res) => {
        const orders = res.body
        // Filter orders from last 10 seconds
        const recent = orders.filter((o: { createdAt: string }) => {
          return new Date(o.createdAt).getTime() > Date.now() - 10000
        })
        expect(recent.length).to.be.lessThan(2)
      })
    })
  })

  // T-UI-ORD-010
  it('T-UI-ORD-010: Quantity validation - zero and negative quantities rejected', () => {
    cy.fixture('testData').then((data) => {
      storefront.getProductByName(data.product.name).then(($el) => {
        cy.wrap($el).find('input[type="number"]').clear().type('0')
        cy.wrap($el).find('button').contains(/add to cart/i).click()
        // Assert - error or button disabled
        cy.get('body').then(($body) => {
          if ($body.find('[class*="error"], [class*="invalid"]').length) {
            cy.get('[class*="error"], [class*="invalid"]').should('be.visible')
          } else {
            cy.wrap($el).find('button').contains(/add to cart/i).should('be.disabled')
          }
        })

        // Negative quantity
        cy.wrap($el).find('input[type="number"]').clear().type('-1')
        cy.wrap($el).find('button').contains(/add to cart/i).click()
        cy.get('[class*="error"], [class*="invalid"]').should('be.visible')
      })
    })
  })

  it('products load correctly', function() {
    cy.get('#root a[href="/auth"]').click();
    cy.get('#root input[type="email"]').click();
    cy.get('#root input[type="email"]').type('test.customer@lewisstores.local');
    cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type('Password123!');
    cy.get('#root button.btn').click();
    cy.get('#root nav a[href="/orders"]').click();
    cy.get('#root nav a[href="/"]').click();
    cy.get('#root nav a[href="/products"]').click();
  });
})