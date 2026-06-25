describe('FR-003 & FR-004 | Payment & Delivery Tracking', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('T-UI-PAY-001: Payment succeeds with a valid card', () => {
    cy.get('#root div.row a.btn-primary').click();
  });
});