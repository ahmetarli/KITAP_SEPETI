import AddToCart from "../page/AddToCart";
import ProductDetails from "../page/ProductDetails";

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe("Kitapsepeti Ödeme İşlemleri", () => {
    it("TC29_Satın Alma Ekranı", () => {
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
                        cy.wait(3000);
                        cy.get('.product-title').contains(expected.Product).should('be.visible').click();
                        AddToCart.addUrun();
                        AddToCart.blockAds();
                        AddToCart.visit(); // tekrar anasayfaya dönüş
            AddToCart.buttonForCart();
            AddToCart.buttonForCart2(); //Sepete tıklatıldıktan sonra yeni bir sepete git seçeneğini tetiklemek için..
            AddToCart.blockAds();
            AddToCart.buyProductFromCart(); // Sepet içindeyken satın alma işlemi için
            AddToCart.pageConfirm(); // adres bilgilerinin görüntülenmesi
            
          
        });
    });

    it("TC30_Ödeme Adımına Geçiş", () => {
        cy.fixture("CartDetails").then((expected) => {
            AddToCart.visit();
            AddToCart.openLoginPopup();
            AddToCart.fillEmail(expected.email);
            AddToCart.fillPassword(expected.password);
            AddToCart.submitLogin();
            cy.wait(3000);
            AddToCart.blockAds();
            AddToCart.buttonForCart();
            AddToCart.buttonForCart2(); //Sepete tıklatıldıktan sonra yeni bir sepete git seçeneğini tetiklemek için..
            AddToCart.blockAds();
            AddToCart.buyProductFromCart();
            AddToCart.paymentPage();    
            AddToCart.pageConfirmKargo();  //sayfadaki kargo seçeneklerini kontrol eder.
            AddToCart.paymentChoose();   //sayfadaki ödeme seçeneklerini kontrol eder.
        });
    });

    it("TC31_Kartla Ödeme Positive", () => {
        cy.fixture("CartDetails").then((expected) => {
            AddToCart.visit();
            AddToCart.openLoginPopup();
            AddToCart.fillEmail(expected.email);
            AddToCart.fillPassword(expected.password);
            AddToCart.submitLogin();
            cy.wait(3000);
            AddToCart.blockAds();
            AddToCart.buttonForCart();
            AddToCart.buttonForCart2(); //Sepete tıklatıldıktan sonra yeni bir sepete git seçeneğini tetiklemek için..
            AddToCart.blockAds();
            AddToCart.buyProductFromCart();
            AddToCart.paymentPage();
            AddToCart.pageConfirmKargo(); 
            AddToCart.paymentWithCard();
            AddToCart.cardPageConfirm(); 
            AddToCart.cardInfos();  // card bilgilerini girmek için
            AddToCart.buttonControl(); // butonun aktif mi değil mi ?
        });
    });

    it("TC32_Kartla Ödeme Negative", () => {
        cy.fixture("CartDetails").then((expected) => {
            AddToCart.visit();
            AddToCart.openLoginPopup();
            AddToCart.fillEmail(expected.email);
            AddToCart.fillPassword(expected.password);
            AddToCart.submitLogin();
            cy.wait(3000);
            AddToCart.blockAds();
            AddToCart.buttonForCart();
            AddToCart.buttonForCart2(); //Sepete tıklatıldıktan sonra yeni bir sepete git seçeneğini tetiklemek için..
            AddToCart.blockAds();
            AddToCart.buyProductFromCart();
            AddToCart.paymentPage();
            AddToCart.pageConfirmKargo(); 
            AddToCart.paymentWithCard();
            AddToCart.cardPageConfirm();
            AddToCart.cardInfosFalse();
            cy.get('#iyz-payment-button').click();
            cy.contains('Güvenlik kodu (CVC) giriniz').should('be.visible'); //cvv boş bırakılır.
        });
    });

    it("TC33_Kartla Ödeme Sipariş Özeti Kontrolü", () => {
        cy.fixture("CartDetails").then((expected) => {
            AddToCart.visit();
            AddToCart.openLoginPopup();
            AddToCart.fillEmail(expected.email);
            AddToCart.fillPassword(expected.password);
            AddToCart.submitLogin();
            cy.wait(3000);
            AddToCart.blockAds();
            AddToCart.buttonForCart();
            AddToCart.buttonForCart2(); //Sepete tıklatıldıktan sonra yeni bir sepete git seçeneğini tetiklemek için..
            AddToCart.blockAds();   
            AddToCart.buyProductFromCart(); 
            AddToCart.paymentPage();
            AddToCart.pageConfirmKargo(); 
            AddToCart.paymentWithCard();
            AddToCart.cardPageConfirm();
            AddToCart.siparisOzeti();   // toplam tutar -sepet özeti görmek için.
            
        });
    });






})