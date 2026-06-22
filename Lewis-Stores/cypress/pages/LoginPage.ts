  export class LoginPage {
  visit(): void {
    cy.visit('/login')
  }

  enterEmail(email: string): void {
    cy.get('[data-testid="email-input"], input[type="email"], #email')
      .clear()
      .type(email)
  }

  enterPassword(password: string): void {
    cy.get('[data-testid="password-input"], input[type="password"], #password')
      .clear()
      .type(password)
  }

  submit(): void {
    cy.get('[data-testid="login-btn"], button[type="submit"]').click()
  }

  loginAs(email: string, password: string): void {
    this.visit()
    this.enterEmail(email)
    this.enterPassword(password)
    this.submit()
  }
}