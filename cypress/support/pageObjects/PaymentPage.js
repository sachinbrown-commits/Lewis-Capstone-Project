/**
 * PaymentPage
 * 
 * Purpose: Represents the Payment/Checkout page.
 * Handles credit card entry, payment processing, and refunds.
 */

class PaymentPage {
    
    // ==========================================
    // SELECTORS
    // ==========================================

    // Card number input field
    cardNumberInput() {
        return cy.get('#card-number');
    }

    // Card expiry date input
    cardExpiryInput() {
        return cy.get('#card-expiry');
    }

    // Card CVV input
    cardCvvInput() {
        return cy.get('#card-cvv');
    }

    // Cardholder name input
    cardholderNameInput() {
        return cy.get('#cardholder-name');
    }

    // Pay Now button
    payNowButton() {
        return cy.get('#pay-now');
    }

    // Payment success message
    paymentSuccessMessage() {
        return cy.get('.payment-success');
    }

    // Payment declined/error message
    paymentErrorMessage() {
        return cy.get('.payment-error');
    }

    // Refund button (on order details page)
    refundButton() {
        return cy.get('#request-refund');
    }

    // Refund confirmation button
    confirmRefundButton() {
        return cy.get('#confirm-refund');
    }

    // Refund success message
    refundSuccessMessage() {
        return cy.get('.refund-success');
    }

    // Order total display
    orderTotal() {
        return cy.get('#order-total');
    }

    // Billing address fields
    billingAddress() {
        return cy.get('#billing-address');
    }

    // ==========================================
    // ACTIONS
    // ==========================================

    /**
     * Fill in credit card details
     * @param {object} cardDetails - Object with cardNumber, expiry, cvv, name
     * 
     * Example: paymentPage.fillCardDetails({
     *     cardNumber: '4111111111111111',
     *     expiry: '12/25',
     *     cvv: '123',
     *     name: 'John Doe'
     * })
     */
    fillCardDetails(cardDetails) {
        this.cardNumberInput()
            .should('be.visible')
            .clear()
            .type(cardDetails.cardNumber);
        
        this.cardExpiryInput()
            .clear()
            .type(cardDetails.expiry);
        
        this.cardCvvInput()
            .clear()
            .type(cardDetails.cvv);
        
        this.cardholderNameInput()
            .clear()
            .type(cardDetails.name);
        
        cy.log('Filled in card details');
        return this;
    }

    /**
     * Click the Pay Now button to process payment
     */
    submitPayment() {
        this.payNowButton()
            .should('be.visible')
            .should('not.be.disabled')
            .click();
        cy.log('Submitted payment');
        return this;
    }

    /**
     * Complete a payment in one call
     * @param {object} cardDetails - Card information
     */
    payWithCard(cardDetails) {
        this.fillCardDetails(cardDetails)
            .submitPayment();
        cy.log('Completed payment transaction');
        return this;
    }

    /**
     * Request a refund for an order
     * @param {string} orderId - The order to refund
     */
    requestRefund(orderId) {
        cy.visit(`/orders/${orderId}`);
        this.refundButton().click();
        this.confirmRefundButton().click();
        cy.log(`Requested refund for order: ${orderId}`);
        return this;
    }

    // ==========================================
    // VERIFICATIONS
    // ==========================================

    /**
     * Verify payment was successful
     */
    verifyPaymentSuccessful() {
        this.paymentSuccessMessage()
            .should('be.visible')
            .and('contain', 'approved');
        cy.log('✓ Payment approved');
        return this;
    }

    /**
     * Verify payment was declined
     */
    verifyPaymentDeclined() {
        this.paymentErrorMessage()
            .should('be.visible')
            .and('contain', 'declined');
        cy.log('✓ Payment correctly declined');
        return this;
    }

    /**
     * Verify refund was processed
     */
    verifyRefundProcessed() {
        this.refundSuccessMessage()
            .should('be.visible')
            .and('contain', 'refund');
        cy.log('✓ Refund processed');
        return this;
    }

    /**
     * Verify order total matches expectations
     * @param {number} expectedTotal - Expected total amount
     */
    verifyOrderTotal(expectedTotal) {
        this.orderTotal()
            .should('contain', `R${expectedTotal.toFixed(2)}`);
        cy.log(`✓ Order total verified: R${expectedTotal.toFixed(2)}`);
        return this;
    }
}

export default PaymentPage;