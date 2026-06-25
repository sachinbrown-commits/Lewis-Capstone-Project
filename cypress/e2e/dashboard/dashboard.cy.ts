describe('Order History', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');

        it('should display order history table', () => {
              
        cy.get('#root a[href="/auth"]').click();
        cy.get('#root input[type="email"]').type('sarah.johnson@lewisstores.local');
        cy.get('#root input[type="password"]').type('Password123!', { log: false });
        cy.get('#root button.btn').click();
        cy.get('#root nav a[href="/orders"]').click();
        });
    })
})
