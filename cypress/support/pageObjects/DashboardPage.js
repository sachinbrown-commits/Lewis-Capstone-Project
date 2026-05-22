/**
 * DashboardPage
 * 
 * Purpose: Represents the User Dashboard/Account page.
 * Handles viewing order history, managing profile, and accounts.
 */

class DashboardPage {
    
    // ==========================================
    // SELECTORS
    // ==========================================

    // Welcome/greeting message
    welcomeMessage() {
        return cy.get('.dashboard-welcome');
    }

    // Order history table
    orderHistoryTable() {
        return cy.get('#order-history');
    }

    // Individual order row in history
    orderRow(orderId) {
        return cy.contains('.order-row', orderId);
    }

    // Order status badge
    orderStatus(orderId) {
        return this.orderRow(orderId).find('.status-badge');
    }

    // Profile edit button
    editProfileButton() {
        return cy.get('#edit-profile');
    }

    // Name input in profile
    profileNameInput() {
        return cy.get('#profile-name');
    }

    // Email input in profile
    profileEmailInput() {
        return cy.get('#profile-email');
    }

    // Save profile button
    saveProfileButton() {
        return cy.get('#save-profile');
    }

    // Saved addresses section
    savedAddresses() {
        return cy.get('#saved-addresses');
    }

    // Add new address button
    addAddressButton() {
        return cy.get('#add-address');
    }

    // Logout button
    logoutButton() {
        return cy.get('#logout');
    }

    // ==========================================
    // ACTIONS
    // ==========================================

    /**
     * Navigate to the dashboard
     */
    visit() {
        cy.visit('/dashboard');
        cy.log('Navigated to dashboard');
        return this;
    }

    /**
     * View a specific order's details
     * @param {string} orderId - The order ID to view
     */
    viewOrderDetails(orderId) {
        this.orderRow(orderId).click();
        cy.log(`Viewing details for order: ${orderId}`);
        return this;
    }

    /**
     * Update the user's profile name
     * @param {string} newName - The new name to set
     */
    updateProfileName(newName) {
        this.editProfileButton().click();
        this.profileNameInput().clear().type(newName);
        this.saveProfileButton().click();
        cy.log(`Updated profile name to: ${newName}`);
        return this;
    }

    /**
     * Logout of the application
     */
    logout() {
        this.logoutButton().click();
        cy.log('Logged out');
        return this;
    }

    // ==========================================
    // VERIFICATIONS
    // ==========================================

    /**
     * Verify the dashboard loaded correctly
     * @param {string} userName - Expected user name in welcome message
     */
    verifyDashboardLoaded(userName) {
        this.welcomeMessage()
            .should('be.visible')
            .and('contain', userName);
        cy.log(`✓ Dashboard loaded for: ${userName}`);
        return this;
    }

    /**
     * Verify an order's status in history
     * @param {string} orderId - The order ID
     * @param {string} expectedStatus - Expected status (e.g., 'Shipped', 'Delivered')
     */
    verifyOrderStatus(orderId, expectedStatus) {
        this.orderStatus(orderId)
            .should('be.visible')
            .and('contain', expectedStatus);
        cy.log(`✓ Order ${orderId} status: ${expectedStatus}`);
        return this;
    }

    /**
     * Verify the order history is displaying
     */
    verifyOrderHistoryVisible() {
        this.orderHistoryTable().should('be.visible');
        cy.log('✓ Order history is visible');
        return this;
    }

    /**
     * Verify profile update was successful
     */
    verifyProfileUpdated() {
        cy.contains('Profile updated').should('be.visible');
        cy.log('✓ Profile updated successfully');
        return this;
    }
}

export default DashboardPage;