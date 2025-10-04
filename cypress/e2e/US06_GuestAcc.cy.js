import AddToCart from "../page/AddToCart";

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})



describe("Kitapsepeti MisafirAcc Anasayfadan Ürün Sepete Ekleme", () => {
    it("TC34_Satın Alma Ekranı", () => {
        cy.fixture("CartDetails").then((expected) => {
            AddToCart.visit();
            AddToCart.guessAddProduct();
            AddToCart.continueShopping();  // satın al butonuna tıklar ve üye girişi sekmesinin kontrolünü sağlar.
            AddToCart.blockAds();
            
        });
    });

     it("TC35_Üye olmadan devam etme", () => {
        cy.fixture("CartDetails").then((expected) => {
            AddToCart.visit();
            AddToCart.guessAddProduct();
            AddToCart.continueShopping();  // satın al butonuna tıklar ve üye girişi sekmesinin kontrolünü sağlar.
            AddToCart.blockAds();
            cy.contains('button', 'Üye Olmadan Devam Et').click();

        });
    });
    
    it("TC36_Üye olmadan devam etme adres bilgilerin sayfasına yönlendirme ve kontrol", () => {
        cy.fixture("CartDetails").then((expected) => {
            AddToCart.visit();
            AddToCart.guessAddProduct();
            AddToCart.continueShopping();  // satın al butonuna tıklar ve üye girişi sekmesinin kontrolünü sağlar.
            AddToCart.blockAds();
            cy.contains('button', 'Üye Olmadan Devam Et').click();
            AddToCart.adressPageCheck();

        });
    });
    
    it("TC37_Adres bilgileri formunu doldurma negatif", () => {
        cy.fixture("CartDetails").then((expected) => {
            AddToCart.visit();
            AddToCart.guessAddProduct();
            cy.wait(2000);
            AddToCart.continueShopping();  // satın al butonuna tıklar ve üye girişi sekmesinin kontrolünü sağlar.
            AddToCart.blockAds();
            cy.contains('button', 'Üye Olmadan Devam Et').click();
            AddToCart.adressPageCheck();  // adres bilgilerinine yönlendirildiğini ve mahalle-cep telefonu-adres bilgisi gibi bilgilerin içerildiğini kontrol eder.
            AddToCart.adressPageFillNegative();
            cy.contains('button', 'Adresi Kaydet').click();


        });
    });

    it("TC38_Adres bilgileri formunu doldurma pozitif", () => {
        cy.fixture("CartDetails").then((expected) => {
            AddToCart.visit();
            AddToCart.guessAddProduct();
            AddToCart.continueShopping();  // satın al butonuna tıklar ve üye girişi sekmesinin kontrolünü sağlar.
            AddToCart.blockAds();
            cy.contains('button', 'Üye Olmadan Devam Et').click();
            AddToCart.adressPageCheck();  // adres bilgilerinine yönlendirildiğini ve mahalle-cep telefonu-adres bilgisi gibi bilgilerin içerildiğini kontrol eder.
            AddToCart.adressPageFillPos();
            cy.contains('button', 'Adresi Kaydet').click();


        });
    });



})