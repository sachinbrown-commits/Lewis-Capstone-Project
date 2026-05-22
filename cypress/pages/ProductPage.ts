// cypress/support/pages/ProductPage.ts
// Page Object for the Lewis Stores product listing and cart pages
// Base URL: http://localhost:3000
//
// IMPORTANT: After cloning Lewis-Stores and running the app, inspect
// each element with Chrome DevTools (F12 → Inspector) and update
// selectors below with the REAL ones from the actual DOM.
 
export class ProductPage {
 
  // ── Selectors ──────────────────────────────────────────────────────────────
  // Product listing
  private productCards   = () => cy.get('[data-testid="product-card"], .product-card, .product-item, [class*="product"]').filter(':visible');
  private productNames   = () => cy.get('[data-testid="product-name"], .product-name, [class*="product-title"]');
  private productPrices  = () => cy.get('[data-testid="product-price"], .product-price, [class*="price"]');
  private addToCartBtns  = () => cy.get('[data-testid="add-to-cart"], button').filter(':contains("Add")');
  private searchInput    = () => cy.get('[data-testid="search"], input[placeholder*="Search"], input[placeholder*="search"]').first();
 
  // Cart
  private cartBadge      = () => cy.get('[data-testid="cart-count"], .cart-count, .cart-badge, [class*="cart-badge"]').first();
  private cartIcon       = () => cy.get('[data-testid="cart-icon"], [href*="cart"], [aria-label*="cart"], [aria-label*="Cart"]').first();
  private cartItems      = () => cy.get('[data-testid="cart-item"], .cart-item, [class*="cart-item"]');
  private cartTotal      = () => cy.get('[data-testid="cart-total"], .cart-total, [class*="cart-total"], [class*="total"]').first();
  private lineItemPrices = () => cy.get('[data-testid="line-item-price"], .line-item-price, [class*="item-price"]');
  private qtyInputs      = () => cy.get('[data-testid="qty-input"], input[type="number"], [class*="quantity"] input');
  private updateCartBtn  = () => cy.get('[data-testid="update-cart"], button').filter(':contains("Update")').first();
  private removeItemBtn  = () => cy.get('[data-testid="remove-item"], button').filter(':contains("Remove"), :contains("Delete")').first();
  private checkoutBtn    = () => cy.get('[data-testid="checkout-btn"], button').filter(':contains("Checkout"), :contains("checkout")').first();
 
  // Coupon
  private couponInput    = () => cy.get('[data-testid="coupon-input"], input[placeholder*="coupon"], input[placeholder*="promo"], input[placeholder*="Coupon"]').first();
  private applyCouponBtn = () => cy.get('[data-testid="apply-coupon"], button').filter(':contains("Apply")').first();
  private couponError    = () => cy.get('[data-testid="coupon-error"], .coupon-error, [class*="coupon-error"], .error-message').first();
  private discountRow    = () => cy.get('[data-testid="discount-row"], [class*="discount"], .discount-line').first();
  private discountAmount = () => cy.get('[data-testid="discount-amount"], [class*="discount-amount"]').first();
 
  // Quantity error
  private qtyError       = () => cy.get('[data-testid="qty-error"], .quantity-error, [class*="qty-error"], .validation-error').first();
 
  // ── Navigation ─────────────────────────────────────────────────────────────
  visit() {
    cy.visit('/');
  }
 
  visitCart() {
    cy.visit('/cart');
  }
 
  // ── Product interactions ────────────────────────────────────────────────────
  getProductCards() {
    return this.productCards();
  }
 
  getProductCount() {
    return this.productCards().its('length');
  }
 
  addFirstProductToCart() {
    this.productCards().first().within(() => {
      this.addToCartBtns().first().click();
    });
  }
 
  addProductByIndex(index: number) {
    this.productCards().eq(index).within(() => {
      this.addToCartBtns().first().click();
    });
  }
 
  // ── Cart interactions ───────────────────────────────────────────────────────
  getCartBadge() {
    return this.cartBadge();
  }
 
  openCart() {
    this.cartIcon().click();
  }
 
  getCartTotal() {
    return this.cartTotal();
  }
 
  getCartTotalValue(): Cypress.Chainable<number> {
    return this.cartTotal().invoke('text').then((text) => {
      return parseFloat(text.replace(/[^0-9.]/g, ''));
    });
  }
 
  getLineItemPrices() {
    return this.lineItemPrices();
  }
 
  setQuantity(value: number) {
    this.qtyInputs().first().clear().type(String(value));
    this.updateCartBtn().click();
  }
 
  getQtyError() {
    return this.qtyError();
  }
 
  clickCheckout() {
    this.checkoutBtn().click();
  }
 
  // ── Coupon interactions ─────────────────────────────────────────────────────
  applyCoupon(code: string) {
    this.couponInput().clear().type(code);
    this.applyCouponBtn().click();
  }
 
  getCouponError() {
    return this.couponError();
  }
 
  getDiscountRow() {
    return this.discountRow();
  }
 
  getDiscountAmount() {
    return this.discountAmount();
  }
}