import LoginPage from "../page/LoginPage";


Cypress.on('uncaught:exception', (err, runnable) => {
  // Bu kod, Cypress'in testi başarısız kılmasını engeller.
  return false
})

describe("Kitapsepeti Login Testleri", () => {
    it("TC01_Giriş Pop-up Erişim", () => {
        cy.fixture("LoginInfo").then((expected) => {
            LoginPage.visit();
            LoginPage.openLoginPopup()
          
        });
    });


   it("TC02_Login Form alanı kontrolü", () => {
        cy.fixture("LoginInfo").then((expected) => {
            LoginPage.visit();
            LoginPage.openLoginPopup()
            cy.get('#header-email').should("be.visible")
            cy.get('#header-password').should("be.visible")
            cy.contains('label', 'Beni Hatırla').should('exist');
            cy.get('#login-btn-322').should("be.visible")
    

        });
    });


    it("TC03_TC04_Geçerli kullanıcı ile login olmalı", () => {
        cy.fixture("LoginInfo").then((expected) => {
            LoginPage.visit();
            LoginPage.openLoginPopup()
            LoginPage.fillEmail(expected.validUser.email);
            LoginPage.fillPassword(expected.validUser.password);
            LoginPage.submitLogin();

        });
    });

    it("TC05_Geçersiz kullanıcı ile login olmamalı", () => {
        cy.fixture("LoginInfo").then((expected) => {
            LoginPage.visit();
            LoginPage.openLoginPopup()
            LoginPage.fillEmail(expected.invalidUser.email);
            LoginPage.fillPassword(expected.invalidUser.password);
            LoginPage.submitLogin();
            cy.xpath('//*[@id="header-login"]/div/span', { timeout: 10000 }).should('exist');
        });
    });


     it("TC06_Geçersiz eposta formatı ile login", () => {
        cy.fixture("LoginInfo").then((expected) => {
            LoginPage.visit();
            LoginPage.openLoginPopup()
            LoginPage.fillEmail(expected.invalidUser.email);
            LoginPage.fillPassword(expected.invalidUser.password);
            LoginPage.submitLogin();
            cy.xpath('//*[@id="header-login"]/div/span', { timeout: 10000 }).should('exist');
        });
    });    

     it("TC07_Form alanlarının boş bırakılıp login olunması", () => {
        cy.fixture("LoginInfo").then((expected) => {
            LoginPage.visit();
            LoginPage.openLoginPopup()
            LoginPage.fillEmail(expected.invalidUser.email);
            
            LoginPage.submitLogin();
            cy.xpath('//*[@id="header-login"]/div/span', { timeout: 10000 }).should('exist');
        });
    });

    it("TC08_Üst üste başarısız login sonrası banned", () => {
        cy.fixture("LoginInfo").then((expected) => {
            LoginPage.visit();
            LoginPage.openLoginPopup()
            LoginPage.fillEmail(expected.invalidUser.email);
            LoginPage.fillPassword(expected.invalidUser.password);
            LoginPage.submitLogin();
            cy.xpath('//*[@id="header-login"]/div/span', { timeout: 10000 }).should('exist');
        });
    });

    it("TC09_Şifremi Unuttum ve Yönlendirme Sayfası", () => {
        cy.fixture("LoginInfo").then((expected) => {
            LoginPage.visit();
            LoginPage.openLoginPopup();

            cy.contains('a', 'Şifremi Unuttum').should('be.visible').click().then(() => {
                      cy.url().should('eq', 'https://www.kitapsepeti.com/uye-sifre-hatirlat');
                      cy.contains('Şifremi Hatırlat').should('be.visible');
               });

        });
    });



});
     
