describe('First Test', function () {
    it('Finds an element', function () {
        // Arrange - setup initial app state
        // - visit a web page
        // - query for an element
        // Act - take action
        // - interact with that element
        // Assert - make an assertion
        // - make an assertion about page content

        cy.visit('/')
        cy.contains('Weiße Schuhe')
        //.click()
        //cy.get('.cypress-price').should('have.text', '69.90 €')
        //cy.contains('ADD TO CART').click()
        //cy.get('.title').click()
        //cy.url().should('include', 'http://localhost:3000/cart')
        //cy.get('.prices').should('have.text', '$69.90')
        
    })
})