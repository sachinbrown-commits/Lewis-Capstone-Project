beforeEach(function () {
  cy.fixture('users').then((users) => {
    this.users = users;
  });

  LoginPage.visitLoginPage();
});