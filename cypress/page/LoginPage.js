class LoginPage {


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
    forgetPassw(){
        cy.contains('a', 'Şifremi Unuttum').should('be.visible').click().then(() => {
                      cy.url().should('eq', 'https://www.kitapsepeti.com/uye-sifre-hatirlat');
                      cy.contains('Şifremi Hatırlat').should('be.visible');
               });
    }


}

export default new LoginPage();
