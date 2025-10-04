import ProductDetails from "../page/ProductDetails";


Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe("Kitapsepeti Ürün Detayları", () => {
    it("TC01_Arama yapılan ürünün içeriğine gidilmesi", () => {
        cy.fixture("ProdDetails").then((expected) => {
            ProductDetails.visit();
            ProductDetails.openLoginPopup();
            ProductDetails.fillEmail(expected.email);
            ProductDetails.fillPassword(expected.password);
            ProductDetails.submitLogin();
            cy.get('.cc-nb-okagree').click();  // çerez kabul etmek için.
            ProductDetails.SearchBox(expected.Product);     // ürünümüzü aratmak
            ProductDetails.SearchButton();
            cy.wait(2000);
            cy.get('.product-title').contains(expected.Product).should('be.visible').click();                        


        });
    }); 

     it("TC02_Ürün içeriğinin kontrolü", () => {
        cy.fixture("ProdDetails").then((expected) => {
            ProductDetails.visit();
            ProductDetails.openLoginPopup();
            ProductDetails.fillEmail(expected.email);
            ProductDetails.fillPassword(expected.password);
            ProductDetails.submitLogin();
            cy.get('.cc-nb-okagree').click();
            ProductDetails.SearchBox(expected.Product); 
            ProductDetails.SearchButton();
            cy.wait(2000);
            cy.get('.product-title').contains(expected.Product).should('be.visible').click();
            cy.get('.product-title.text-center').should("be.visible");  // ürün ismi
            cy.get('.fw-regular.brand-title').should("be.visible");   // ürün markası
            cy.get('.fw-regular.current-price').should("be.visible"); // ücreti                        


        });
    });

    it("TC03_Ürün içeriğinin özellikleri", () => {
        cy.fixture("ProdDetails").then((expected) => {
            ProductDetails.visit();
            ProductDetails.openLoginPopup();
            ProductDetails.fillEmail(expected.email);
            ProductDetails.fillPassword(expected.password);
            ProductDetails.submitLogin();
            cy.get('.cc-nb-okagree').click();
            ProductDetails.SearchBox(expected.Product);   
            ProductDetails.SearchButton();
            cy.wait(2000);
            cy.get('.product-title').contains(expected.Product).should('be.visible').click();
            cy.contains('Türü').should('exist');
            cy.contains('ISBN').should('exist');
            cy.contains('Sayfa Sayısı').should('exist');
            cy.contains('Kağıt Tipi').should('exist');
            cy.contains('Basım Yılı').should('exist');                    


        });
    });

    it("TC05_Ürün içeriğine girerek sepete ekleme", () => {
        cy.fixture("ProdDetails").then((expected) => {
            ProductDetails.visit();
            ProductDetails.openLoginPopup();
            ProductDetails.fillEmail(expected.email);
            ProductDetails.fillPassword(expected.password);
            ProductDetails.submitLogin();
            cy.get('.cc-nb-okagree').click();
            ProductDetails.SearchBox(expected.Product);   
            ProductDetails.SearchButton();
            cy.wait(2000);
            cy.get('.product-title').contains(expected.Product).should('be.visible').click();
            cy.get('#addToCartBtn').should('be.visible').click();             // sepete ekleme 
            cy.wait(2000); 
            cy.contains('Ürün Başarıyla Sepete Eklendi').should('be.visible');  
            cy.get('#cart-popup-go-cart').should('be.visible').and('contain.text', 'Sepete Git'); 
            cy.wait(2000);
            cy.get('#cart-popup-continue-shopping').should('be.visible').and('contain.text', 'Satın Al');    
            
        });
    });

    it("TC06_Ürün içeriğine girerek sepete ekleme ve kontrol", () => {
        cy.fixture("ProdDetails").then((expected) => {
            ProductDetails.visit();
            ProductDetails.openLoginPopup();
            ProductDetails.fillEmail(expected.email);
            ProductDetails.fillPassword(expected.password);
            ProductDetails.submitLogin();
            cy.get('.cc-nb-okagree').click();
            ProductDetails.SearchBox(expected.Product);     
            ProductDetails.SearchButton();
            cy.wait(2000);
            cy.get('.product-title').contains(expected.Product).click({ force: true }); //ürünü sepete ekleme

            // artık ProductDetails üzerinden çağırıyoruz
             ProductDetails.verifyCartIncreasedByOne(() => {
            cy.get('#addToCartBtn').should('be.visible').click();
            cy.contains('Ürün Başarıyla Sepete Eklendi').should('be.visible');
            cy.get('i.ti-close').first().click({ force: true });
            });
        });
    });
           
}) 







