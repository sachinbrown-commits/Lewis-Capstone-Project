class LoginPage {

  emailInput = '#email';
  passwordInput = '#password';
  loginButton = 'button[type="submit"]';

  visitLoginPage() {
    cy.visit('/login');
  }

  enterEmail(email: string) {
    cy.get(this.emailInput).clear().type(email);
  }

  enterPassword(password: string) {
    cy.get(this.passwordInput).clear().type(password);
  }

  clickLogin() {
    cy.get(this.loginButton).click();
  }

  login(email: string, password: string) {
    this.enterEmail(email);
    this.enterPassword(password);
    this.clickLogin();
  }
}

export default new LoginPage();