import LoginPage from '../../pages/LoginPage';

describe('Authentication Tests', () => {

  beforeEach(() => {
    LoginPage.visitLoginPage();
  });

  it('T-UI-AUTH-001 Valid login succeeds', () => {

    LoginPage.login(
      'test.customer@lewisstores.local',
      'Password123!'
    );

    cy.url().should('include', '/dashboard');

    cy.contains('Dashboard')
      .should('be.visible');
  });

  it('T-UI-AUTH-002 Invalid password shows error', () => {

    LoginPage.login(
      'test.customer@lewisstores.local',
      'WrongPassword'
    );

    cy.contains('Invalid')
      .should('be.visible');
  });
});