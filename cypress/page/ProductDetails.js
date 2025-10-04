class Details { 
    
    
    SearchBox(product) {
    cy.get('[name="q"]').type(product).should('have.value', product);   
  } 
    SearchButton(){

    cy.get('#live-search-btn').click({ force: true });
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

    selectProduct() {
        cy.get('.ccp---nb-interstitial-overlay').invoke('remove');
    }
    getCartCount() {
    return cy.get('span.cart-soft-count').invoke('text');
           }

  verifyCartIncreasedByOne(callback) {
    this.getCartCount().then((textBefore) => {
      const countBefore = parseInt(textBefore) || 0;

      callback(); // burada ürün ekleme işlemi yapılacak

      this.getCartCount().then((textAfter) => {
        const countAfter = parseInt(textAfter) || 0;
        expect(countAfter).to.eq(countBefore + 1);
      });
    });
  }
  controlProduct(){
            cy.get('.product-title').contains(expected.Product).should('be.visible').click();
            cy.get('.product-title.text-center').should("be.visible");  // ürün ismi
            cy.get('.fw-regular.brand-title').should("be.visible");   // ürün markası
            cy.get('.fw-regular.current-price').should("be.visible"); // ücreti  
  }



}


export default new Details();