/**
 * Smoke Test
 * 
 * Purpose: Verify that the test framework is set up correctly.
 * This test will PASS if POMs can be imported and Cypress works.
 * It FAILS because we don't have a real website yet - THAT'S OKAY!
 */

// Import all Page Objects
import { LoginPage, OrderPage, PaymentPage, DashboardPage } from '../support/pageObjects';

// Create instances of each page object
const loginPage = new LoginPage();
const orderPage = new OrderPage();
const paymentPage = new PaymentPage();
const dashboardPage = new DashboardPage();

describe('Smoke Test - Framework Setup Verification', () => {
    
    it('should have all page objects defined', () => {
        // Verify that all page objects were created successfully
        expect(loginPage).to.not.be.undefined;
        expect(orderPage).to.not.be.undefined;
        expect(paymentPage).to.not.be.undefined;
        expect(dashboardPage).to.not.be.undefined;
        
        cy.log('✓ All page objects are defined');
    });
    
    it('should have valid selector methods', () => {
        // This test just proves the methods exist
        expect(loginPage.emailInput).to.be.a('function');
        expect(loginPage.fillEmail).to.be.a('function');
        expect(orderPage.addProductToCart).to.be.a('function');
        expect(paymentPage.payWithCard).to.be.a('function');
        expect(dashboardPage.verifyDashboardLoaded).to.be.a('function');
        
        cy.log('✓ All methods are defined');
    });
    
    it('Cypress should be able to visit a page', () => {
        // This will PROBABLY fail because we don't have a real website
        // But it proves Cypress can try to navigate
        cy.visit('/', { failOnStatusCode: false });
        
        cy.log('✓ Cypress can navigate to pages');
    });
});