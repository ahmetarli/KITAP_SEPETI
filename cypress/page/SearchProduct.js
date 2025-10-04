class Search { 
    
    
    SearchBox(product) {
    cy.get('[name="q"]').clear().type(product).should('have.value', product);   
  } 
    SearchButton(){

    cy.get('#live-search-btn').click();
    }
    visit() {
        cy.visit('https://www.kitapsepeti.com/');
        cy.get('.ccp---nb-interstitial-overlay').invoke('remove');
    }

    openLoginPopup() {
       cy.get('.d-flex.text-color.member-login-btn').should("be.visible").click();
    }

    fillEmail(email) {
        cy.get('#header-email').should("be.visible").click().type(email);
    }

    fillPassword(password) {
        cy.get('#header-password').should("be.visible").click().type(password);
    }

    submitLogin() {
        cy.get('#login-btn-322').should("be.visible").click();  
    }
    cleanSearchButton() {
    cy.get('#live-search').invoke('val').should('eq', '');
}
    SepeteEkleButon() {
    cy.get('.fw-regular.current-price').should("be.visible").click();
    }
    productVisible() {
        cy.get('.container secure-block py-3').should('have.length', 0);

    }


}

export default new Search();


