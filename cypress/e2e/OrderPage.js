/**
 * OrderPage
 * 
 * Purpose: Represents the Order Creation/Management page.
 * Handles adding items to cart, modifying orders, and cancellation.
 */

class OrderPage {
    
    // ==========================================
    // SELECTORS
    // ==========================================

    // Search bar to find products
    searchBar() {
        return cy.get('#product-search');
    }

    // Search results list
    searchResults() {
        return cy.get('.search-results');
    }

    // Product card in search results
    productCard(productName) {
        return cy.contains('.product-card', productName);
    }

    // "Add to Cart" button for a specific product
    addToCartButton(productName) {
        return this.productCard(productName).find('.add-to-cart-btn');
    }

    // Cart icon in the header (shows item count)
    cartIcon() {
        return cy.get('#cart-icon');
    }

    // Cart total price display
    cartTotal() {
        return cy.get('#cart-total');
    }

    // Checkout button
    checkoutButton() {
        return cy.get('#checkout-btn');
    }

    // Quantity input field (for modifying order)
    quantityInput() {
        return cy.get('#quantity');
    }

    // Coupon code input
    couponInput() {
        return cy.get('#coupon-code');
    }

    // Apply coupon button
    applyCouponButton() {
        return cy.get('#apply-coupon');
    }

    // Discount amount display
    discountAmount() {
        return cy.get('.discount-amount');
    }

    // Cancel order button
    cancelOrderButton() {
        return cy.get('#cancel-order');
    }

    // Confirmation dialog for cancellation
    confirmCancelButton() {
        return cy.get('#confirm-cancel');
    }

    // Order success message
    orderSuccessMessage() {
        return cy.get('.order-success');
    }

    // Error message for invalid actions
    errorMessage() {
        return cy.get('.order-error');
    }

    // ==========================================
    // ACTIONS
    // ==========================================

    /**
     * Search for a product by name
     * @param {string} productName - Name of product to search for
     */
    searchProduct(productName) {
        this.searchBar()
            .should('be.visible')
            .clear()
            .type(`${productName}{enter}`);     // Types and presses Enter
        cy.log(`Searched for product: ${productName}`);
        return this;
    }

    /**
     * Add a product to the cart
     * @param {string} productName - Name of product
     * @param {number} quantity - How many to add (default: 1)
     */
    addProductToCart(productName, quantity = 1) {
        this.searchProduct(productName);
        
        // Wait for results to load
        this.searchResults().should('be.visible');
        
        // Click the "Add to Cart" button
        this.addToCartButton(productName).click();
        
        // If quantity > 1, update the quantity
        if (quantity > 1) {
            this.quantityInput().clear().type(quantity.toString());
            cy.get('#update-cart').click();
        }
        
        cy.log(`Added ${quantity} x ${productName} to cart`);
        return this;
    }

    /**
     * Apply a coupon code to the order
     * @param {string} couponCode - The coupon code string
     */
    applyCoupon(couponCode) {
        this.couponInput()
            .should('be.visible')
            .clear()
            .type(couponCode);
        this.applyCouponButton().click();
        cy.log(`Applied coupon: ${couponCode}`);
        return this;
    }

    /**
     * Proceed to checkout
     */
    proceedToCheckout() {
        this.cartIcon().click();
        this.checkoutButton().should('be.visible').click();
        cy.log('Proceeded to checkout');
        return this;
    }

    /**
     * Cancel an order by order ID
     * @param {string} orderId - The order ID to cancel
     */
    cancelOrder(orderId) {
        cy.visit(`/orders/${orderId}`);
        this.cancelOrderButton().click();
        this.confirmCancelButton().click();
        cy.log(`Cancelled order: ${orderId}`);
        return this;
    }

    /**
     * Complete order creation flow
     * @param {string} productName - Product to order
     * @param {number} quantity - Quantity to order
     */
    createOrder(productName, quantity = 1) {
        this.addProductToCart(productName, quantity)
            .proceedToCheckout();
        cy.log(`Creating order for: ${productName}`);
        return this;
    }

    // ==========================================
    // VERIFICATIONS
    // ==========================================

    /**
     * Verify the cart total matches expected amount
     * @param {number} expectedTotal - Expected total price
     */
    verifyCartTotal(expectedTotal) {
        this.cartTotal()
            .should('contain', `R${expectedTotal.toFixed(2)}`);
        cy.log(`✓ Cart total verified: R${expectedTotal.toFixed(2)}`);
        return this;
    }

    /**
     * Verify order was created successfully
     */
    verifyOrderCreated() {
        this.orderSuccessMessage()
            .should('be.visible')
            .and('contain', 'successful');
        cy.log('✓ Order created successfully');
        return this;
    }

    /**
     * Verify order was cancelled successfully
     */
    verifyOrderCancelled() {
        this.orderSuccessMessage()
            .should('be.visible')
            .and('contain', 'cancelled');
        cy.log('✓ Order cancelled successfully');
        return this;
    }

    /**
     * Verify coupon was applied correctly
     * @param {number} expectedDiscount - Expected discount amount
     */
    verifyCouponApplied(expectedDiscount) {
        this.discountAmount()
            .should('be.visible')
            .and('contain', `-R${expectedDiscount.toFixed(2)}`);
        cy.log(`✓ Coupon discount of R${expectedDiscount.toFixed(2)} applied`);
        return this;
    }

    /**
     * Verify error message is shown for invalid actions
     */
    verifyErrorShown() {
        this.errorMessage().should('be.visible');
        cy.log('✓ Error message displayed');
        return this;
    }
}

export default OrderPage;