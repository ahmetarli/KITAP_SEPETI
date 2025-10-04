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
    selectAccordion() {
        cy.get('#accordion-categories-361').click();
            cy.get('#accordion-model-361').click();
            cy.get('#accordion-brand-361')
            .should('have.class', 'active')
            .next('div')
            .find('label.filter-item')
            .first()
            .scrollIntoView()
            .click({ force: true });
            cy.get('button.btn.btn-secondary').contains('Seçimi Filtrele').scrollIntoView().click({ force: true });
    }

    filterVisib(){            cy.get('select#sort').should('be.visible')
            cy.get('select#sort > option').contains('Varsayılan Sıralama').should('exist');
            cy.get('select#sort > option').contains('Yeniden Eskiye').should('exist');
            cy.get('select#sort > option').contains('Eskiden Yeniye').should('exist');
            cy.get('select#sort > option').contains('Fiyat Artan').should('exist');
            cy.get('select#sort > option').contains('Fiyat Azalan').should('exist');
        }
    
    brandVisib(){
        cy.get('img').should("be.visible");
        cy.get('.product-title.text-center').should("be.visible");  // ürün ismi
        cy.get('.fw-regular.brand-title').should("be.visible");   // ürün markası
        cy.get('.fw-regular.current-price').should("be.visible"); // ücreti
    }


}

export default new Search();


