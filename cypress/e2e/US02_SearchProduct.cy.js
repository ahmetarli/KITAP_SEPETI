
import SearchProduct from "../page/SearchProduct";

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})



describe("Kitapsepeti Search Testleri", () => {
    it("TC01_Arama Çubuğuna en az 1 karakter yazılarak arama yapılması", () => {
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

    it("TC02_Arama yapılan ürünün yüklenmesi", () => {
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


    it("TC03_Sistemde olmayan bir ürünü aratma", () => {
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


    it("TC04_Arama yapılan ürün bilgilerinin yüklenmesi", () => {
        cy.fixture("Search").then((expected) => {
            SearchProduct.visit();
            // SearchProduct.openLoginPopup();
            // SearchProduct.fillEmail(expected.email);
            // SearchProduct.fillPassword(expected.password);
            // SearchProduct.submitLogin();
            SearchProduct.SearchBox(expected.Product);     
            SearchProduct.SearchButton();
            SearchProduct.cleanSearchButton();
            cy.get('img').should("be.visible");
            cy.get('.product-title.text-center').should("be.visible");  // ürün ismi
            cy.get('.fw-regular.brand-title').should("be.visible");   // ürün markası
            cy.get('.fw-regular.current-price').should("be.visible"); // ücreti
            
            
        });
    });  

    it("TC05_Arama yapılan ürünün sepete ekle butonu kontrolü", () => {
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
    
    it("TC06_Sıralama Seçenekleri", () => {
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
            cy.get('select#sort').should('be.visible')
            cy.get('select#sort > option').contains('Varsayılan Sıralama').should('exist');
            cy.get('select#sort > option').contains('Yeniden Eskiye').should('exist');
            cy.get('select#sort > option').contains('Eskiden Yeniye').should('exist');
            cy.get('select#sort > option').contains('Fiyat Artan').should('exist');
            cy.get('select#sort > option').contains('Fiyat Azalan').should('exist');

            
     
        });
    });  
    
    
    it("TC07_TC08_Kategorilerden ürün seçmek", () => {
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
     
        });
    }); 


    it("TC09_Arama yapılan ürünün yüklenmesi SCROLL YAPMA", () => {
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