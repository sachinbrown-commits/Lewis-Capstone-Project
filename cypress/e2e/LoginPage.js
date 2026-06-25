/**
 * LoginPage
 * 
 * Purpose: Represents the Login/Sign-In page of the Lewis Retail website.
 * Contains all actions a user can perform on the login page.
 * 
 * Usage: const loginPage = new LoginPage();
 *        loginPage.visit();
 *        loginPage.fillEmail('user@example.com');
 *        loginPage.fillPassword('password123');
 *        loginPage.clickLoginButton();
 *        loginPage.verifySuccessfulLogin();
 */

class LoginPage {
    
    // ==========================================
    // SELECTORS (The "Addresses" of elements)
    // ==========================================
    // These are like GPS coordinates for web elements.
    // They tell Cypress WHERE to find things on the page.
    //
    // NOTE: These selectors are ESTIMATES based on common e-commerce patterns.
    // You will need to UPDATE these when you see the actual website!

    // The input field for entering email/username
    emailInput() {
        return cy.get('#email');           // Tries to find an element with id="email"
    }

    // The input field for entering password
    passwordInput() {
        return cy.get('#password');        // Tries to find an element with id="password"
    }

    // The login/submit button
    loginButton() {
        return cy.get('button[type="submit"]');  // Tries to find a <button> with type="submit"
    }

    // Error message that appears on failed login
    errorMessage() {
        return cy.get('.error-message');   // Tries to find an element with class="error-message"
    }

    // Welcome/greeting text that appears after successful login
    welcomeMessage() {
        return cy.get('.welcome-text');    // Tries to find an element with class="welcome-text"
    }

    // ==========================================
    // ACTIONS (Things users can DO on this page)
    // ==========================================
    // Each method below performs ONE clear action.
    // This is called "high cohesion" - each method does one thing well.

    /**
     * Navigate to the login page
     * Action: Opens the /login URL in the browser
     */
    visit() {
        cy.visit('/login');                // Goes to http://your-website.com/login
        cy.log('Navigated to login page'); // Logs this action in Cypress output
        return this;                       // Allows method chaining (e.g., loginPage.visit().fillEmail())
    }

    /**
     * Type an email address into the email field
     * @param {string} email - The email address to type
     * 
     * Example: loginPage.fillEmail('john@lewis.com')
     */
    fillEmail(email) {
        this.emailInput()
            .should('be.visible')          // First check: is the field visible?
            .clear()                       // Clear any existing text
            .type(email);                  // Type the new email
        cy.log(`Entered email: ${email}`);
        return this;
    }

    /**
     * Type a password into the password field
     * @param {string} password - The password to type
     */
    fillPassword(password) {
        this.passwordInput()
            .should('be.visible')
            .clear()
            .type(password, { log: false });  // { log: false } hides password from Cypress logs
        cy.log('Entered password');
        return this;
    }

    /**
     * Click the login/submit button
     */
    clickLoginButton() {
        this.loginButton()
            .should('be.visible')
            .should('not.be.disabled')     // Ensure button is clickable
            .click();
        cy.log('Clicked login button');
        return this;
    }

    /**
     * Complete the entire login flow in one call
     * @param {string} email - User's email
     * @param {string} password - User's password
     * 
     * This is a "convenience method" - combines multiple steps
     * Example: loginPage.loginAs('user@test.com', 'password123')
     */
    loginAs(email, password) {
        this.visit()
            .fillEmail(email)
            .fillPassword(password)
            .clickLoginButton();
        cy.log(`Completed login flow for: ${email}`);
        return this;
    }

    // ==========================================
    // ASSERTIONS / VERIFICATIONS (Checking results)
    // ==========================================
    // These methods CHECK that something happened correctly.

    /**
     * Verify that login was successful
     * Looks for the welcome message on the dashboard
     */
    verifySuccessfulLogin() {
        this.welcomeMessage()
            .should('be.visible')
            .and('contain', 'Welcome');     // Checks the text contains "Welcome"
        cy.log('✓ Login was successful');
        return this;
    }

    /**
     * Verify that login failed
     * Looks for the error message
     */
    verifyLoginFailed() {
        this.errorMessage()
            .should('be.visible')
            .and('contain', 'Invalid');      // Checks the error contains "Invalid"
        cy.log('✓ Login failure was correctly shown');
        return this;
    }

    /**
     * Verify that the login page has all required fields
     */
    verifyLoginPageLoaded() {
        this.emailInput().should('be.visible');
        this.passwordInput().should('be.visible');
        this.loginButton().should('be.visible');
        cy.log('✓ Login page loaded correctly');
        return this;
    }
}

// Export this class so other files can use it
// Other files will use: import LoginPage from './pageObjects/LoginPage';
export default LoginPage;