
import SearchProduct from "../page/SearchProduct";

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})



describe("Kitapsepeti Search Testleri", () => {
    it("TC09_Arama Çubuğuna en az 1 karakter yazılarak arama yapılması", () => {
        cy.fixture("Search").then((expected) => {
            SearchProduct.visit();
           // SearchProduct.openLoginPopup();
           // SearchProduct.fillEmail(expected.email);
           // SearchProduct.fillPassword(expected.password);
           // SearchProduct.submitLogin();
            SearchProduct.SearchBox(expected.Product);     
            SearchProduct.SearchButton();

        });
    });

    it("TC10_Arama yapılan ürünün yüklenmesi", () => {
        cy.fixture("Search").then((expected) => {
            SearchProduct.visit();
           // SearchProduct.openLoginPopup();
           // SearchProduct.fillEmail(expected.email);
           // SearchProduct.fillPassword(expected.password);
           // SearchProduct.submitLogin();
            SearchProduct.SearchBox(expected.Product);     
            SearchProduct.SearchButton();
            SearchProduct.cleanSearchButton();

        });
    });  


    it("TC11_Sistemde olmayan bir ürünü aratma", () => {
        cy.fixture("Search").then((expected) => {
            SearchProduct.visit();
           // SearchProduct.openLoginPopup();
           // SearchProduct.fillEmail(expected.email);
           // SearchProduct.fillPassword(expected.password);
           // SearchProduct.submitLogin();
            SearchProduct.SearchBox(expected.Product1);     
            SearchProduct.SearchButton();
            SearchProduct.cleanSearchButton();
            
        });
    });  


    it("TC12_Arama yapılan ürün bilgilerinin yüklenmesi", () => {
        cy.fixture("Search").then((expected) => {
            SearchProduct.visit();
            // SearchProduct.openLoginPopup();
            // SearchProduct.fillEmail(expected.email);
            // SearchProduct.fillPassword(expected.password);
            // SearchProduct.submitLogin();
            SearchProduct.SearchBox(expected.Product);     
            SearchProduct.SearchButton();
            SearchProduct.cleanSearchButton();
            SearchProduct.brandVisib(); // ücret-marka-ürün ismi görüntüler
            
            
        });
    });  

    it("TC13_Arama yapılan ürünün sepete ekle butonu kontrolü", () => {
        cy.fixture("Search").then((expected) => {
            SearchProduct.visit();
            // SearchProduct.openLoginPopup();
            // SearchProduct.fillEmail(expected.email);
            // SearchProduct.fillPassword(expected.password);
            // SearchProduct.submitLogin();
            SearchProduct.SearchBox(expected.Product);     
            SearchProduct.SearchButton();
            SearchProduct.cleanSearchButton();
            SearchProduct.productVisible();
            cy.get('.fw-regular.current-price').should("be.visible");
            
        });
    });  
    
    it("TC14_Sıralama Seçenekleri", () => {
        cy.fixture("Search").then((expected) => {
            SearchProduct.visit();
            // SearchProduct.openLoginPopup();
            // SearchProduct.fillEmail(expected.email);
            // SearchProduct.fillPassword(expected.password);
            // SearchProduct.submitLogin();
            SearchProduct.SearchBox(expected.Product);     
            SearchProduct.SearchButton();
            SearchProduct.cleanSearchButton();
            cy.get('.cc-nb-okagree', { timeout: 10000 }).should('be.visible').click();
            SearchProduct.productVisible();
            SearchProduct.filterVisib();

        });
    });  
    
    
    it("TC15_Kategorilerden ürün seçmek", () => {
        cy.fixture("Search").then((expected) => {
            SearchProduct.visit();
            // SearchProduct.openLoginPopup();
            // SearchProduct.fillEmail(expected.email);
            // SearchProduct.fillPassword(expected.password);
            // SearchProduct.submitLogin();
            SearchProduct.SearchBox(expected.Product);     
            SearchProduct.SearchButton();
            SearchProduct.cleanSearchButton();
            SearchProduct.productVisible();
            cy.get('.cc-nb-okagree', { timeout: 10000 }).should('be.visible').click();
            cy.wait(3000);
            // Marka accordion aç, ilk seçeneğe tıkla ve kontrol et.  Kategori ve model için de accordion yanına isimlerini yazmak yeterli.
            SearchProduct.selectAccordion();
     
        });
    }); 


    it("TC16_Arama yapılan ürünün yüklenmesi SCROLL YAPMA", () => {
        cy.fixture("Search").then((expected) => {
            SearchProduct.visit();
            // SearchProduct.openLoginPopup();
            // SearchProduct.fillEmail(expected.email);
            // SearchProduct.fillPassword(expected.password);
            // SearchProduct.submitLogin();
            SearchProduct.SearchBox(expected.Product);     
            SearchProduct.SearchButton();
            SearchProduct.cleanSearchButton();
            SearchProduct.productVisible();
            cy.get('.fw-regular.current-price').should("be.visible");   
            cy.scrollTo('0%', '75%');  
            cy.wait(2000);     
            cy.scrollTo('0%', '80%');
            cy.wait(2000);
        });
    });  
    


    





})