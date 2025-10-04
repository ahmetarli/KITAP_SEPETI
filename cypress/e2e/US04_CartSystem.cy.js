import AddToCart from "../page/AddToCart";
import ProductDetails from "../page/ProductDetails";
import ProductData from '../fixtures/CartDetails.json';


Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})


describe("Kitapsepeti Sepet Sistemi", () => {
    it("TC22_Sepete Erişim", () => {
        cy.fixture("CartDetails").then((expected) => {
            AddToCart.visit();
            AddToCart.openLoginPopup();
            AddToCart.fillEmail(expected.email);
            AddToCart.fillPassword(expected.password);
            AddToCart.submitLogin();
            cy.wait(3000);
            AddToCart.blockAds();
            // Bu kısım öncesinden ürün eklememiz ve sonrasında kontrol etmemiz için 
            ProductDetails.SearchBox(expected.Product);     
            ProductDetails.SearchButton();
            AddToCart.blockAds();
            cy.wait(3000);
            cy.get('.product-title').contains(expected.Product).should('be.visible').click();
            AddToCart.addUrun();
            AddToCart.visit(); // tekrar anasayfaya dönüş
            AddToCart.buttonForCart();
            AddToCart.buttonForCart2(); //Sepete tıklatıldıktan sonra yeni bir sepete git seçeneğini tetiklemek için..
          
        });
    });


    it("TC23_Sepet değer kontrolleri", () => {
        cy.fixture("CartDetails").then((expected) => {
            AddToCart.visit();
            AddToCart.openLoginPopup();
            AddToCart.fillEmail(expected.email);
            AddToCart.fillPassword(expected.password);
            AddToCart.submitLogin();
            AddToCart.blockAds();
            AddToCart.buttonForCart();
            AddToCart.buttonForCart2(); //Sepete tıklatıldıktan sonra yeni bir sepete git seçeneğini tetiklemek için..
            AddToCart.blockAds();
            AddToCart.urunInfo(ProductData.product); 
            AddToCart.urunInfo();  
            AddToCart.sepetToplami();
          
        });
    });

    it("TC24_Sepet içinde ürün adeti arttırma", () => {
        cy.fixture("CartDetails").then((expected) => {
            AddToCart.visit();
            AddToCart.openLoginPopup();
            AddToCart.fillEmail(expected.email);
            AddToCart.fillPassword(expected.password);
            AddToCart.submitLogin();
            AddToCart.blockAds();
            AddToCart.buttonForCart();
            AddToCart.buttonForCart2(); //Sepete tıklatıldıktan sonra yeni bir sepete git seçeneğini tetiklemek için..
            AddToCart.blockAds();
            AddToCart.adetArttir();
          
        });
    });


    
    it("TC25_Sepet paneli içinde tüm sepeti temizleme ve kontrol ", () => {
        cy.fixture("CartDetails").then((expected) => {
            AddToCart.visit();
            AddToCart.openLoginPopup();
            AddToCart.fillEmail(expected.email);
            AddToCart.fillPassword(expected.password);
            AddToCart.submitLogin();
            AddToCart.blockAds();
            AddToCart.buttonForCart();
            AddToCart.blockAds();
            AddToCart.buttonForCart2(); //Sepete tıklatıldıktan sonra yeni bir sepete git seçeneğini tetiklemek için..
            AddToCart.blockAds();
            AddToCart.deleteAllProduct();
            cy.contains('Alışverişe Devam Et').should('be.visible');
            
          
        });
    });

    it("TC26_Sepet içinde ürünü satın alma", () => {
        cy.fixture("CartDetails").then((expected) => {
            AddToCart.visit();
            AddToCart.openLoginPopup();
            AddToCart.fillEmail(expected.email);
            AddToCart.fillPassword(expected.password);
            AddToCart.submitLogin();
            AddToCart.blockAds();
            ProductDetails.SearchBox(expected.Product);       /// daha önceden ürünü sildiğimiz için tekrar ürün ekleyelim görsün.
            ProductDetails.SearchButton();
            AddToCart.blockAds();
            cy.wait(3000);
            cy.get('.product-title').contains(expected.Product).should('be.visible').click();
            AddToCart.addUrun();
            AddToCart.buttonForCart();
            AddToCart.buttonForCart2(); //Sepete tıklatıldıktan sonra yeni bir sepete git seçeneğini tetiklemek için..
            AddToCart.blockAds();
            AddToCart.buyProductFromCart();
          
        });
    });


    it("TC27_Ana menüden satın alma", () => {
        cy.fixture("CartDetails").then((expected) => {
            AddToCart.visit();
            AddToCart.openLoginPopup();
            AddToCart.fillEmail(expected.email);
            AddToCart.fillPassword(expected.password);
            AddToCart.submitLogin();
            AddToCart.blockAds();
            AddToCart.buttonForCart();
            AddToCart.buyProductFromMain();
    
        });
    });

    it("TC28_Sepet içinde ürün silme", () => {
        cy.fixture("CartDetails").then((expected) => {
            AddToCart.visit();
            AddToCart.openLoginPopup();
            AddToCart.fillEmail(expected.email);
            AddToCart.fillPassword(expected.password);
            AddToCart.submitLogin();
            AddToCart.blockAds();
            AddToCart.buttonForCart();
            AddToCart.buttonForCart2(); //Sepete tıklatıldıktan sonra yeni bir sepete git seçeneğini tetiklemek için..
            AddToCart.blockAds();
            AddToCart.deleteProduct();  
          
        });
    });


})