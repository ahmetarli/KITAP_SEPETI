class Cart { 
    
    
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

    selectProduct() {
        cy.get('.ccp---nb-interstitial-overlay').invoke('remove');
    }


    blockAds() {
  // 5 saniye boyunca element görünürse tıkla, yoksa geç
  cy.get('.cc-nb-okagree', { timeout: 5000 }).then($btn => {
    if ($btn.length && $btn.is(':visible')) {
      cy.wrap($btn).click({ force: true });
        }
      });
    }


    addUrun(){
            
            cy.get('#addToCartBtn').should('be.visible').click();             // sepete ekleme   
            cy.contains('Ürün Başarıyla Sepete Eklendi').should('be.visible');  
            cy.get('#cart-popup-go-cart').should('be.visible').and('contain.text', 'Sepete Git');  
            cy.get('#cart-popup-continue-shopping').should('be.visible').and('contain.text', 'Satın Al');
            cy.get('i.ti-close').first().click({ force: true }); // sepetin kontrolünü sağlamak için uyarı popuptan çıkmamız gerek
    }






    buttonForCart() {
        cy.get('#header-cart-btn').click({ force: true });
    }

    buttonForCart2() {
        cy.get('#go-cart-btn').click({ force: true });   //Sepete tıklatıldıktan sonra yeni bir sepete git seçeneğini tetiklemek için..
    }


   
    urunInfo(expectedProduct = 'Raven Suikastçısı') {
      cy.get('a.cart-item-title').each(($el) => {
       cy.wrap($el).should('contain.text', expectedProduct);
       const kitapAdi = $el.text().trim();
       cy.log('Ürün adı: ' + kitapAdi);
      });

     cy.get('input[type="number"].form-control')
        .first()  // ilk ürün
        .invoke('val')  // input’un value’sunu okuma komutu.
        .then(qty => {    // inputun adeti qty 
            const adet = Number(qty);
            cy.log('Sepetteki ürün adedi: ' + adet);
            console.log('Sepetteki ürün adedi:', adet);
            expect(adet).to.be.greaterThan(0);
      });
    }
  // Sepet toplamını kontrol eden metod
  sepetToplami() {
    cy.get('div.row.fw-black').within(() => {
      cy.get('div.col-6.pr-0').should('contain.text', 'Sepet Toplamı');
      cy.get('div.col-6.pl-0.text-right').invoke('text').then((text) => {
        const sepetToplami = parseFloat(
          text.replace('TL', '').replace('.', '').replace(',', '.')
        );
        expect(sepetToplami).to.be.greaterThan(0);
        cy.log('Sepet Toplamı:', text);
       });
     });
    }



    adetArttir() {
           // Önce input'u al
        cy.get('#qty5024820')
        .invoke('val')
        .then(initialQty => {
                const eskiAdet = Number(initialQty);
                cy.log('Eski adet: ' + eskiAdet);

                // Arttırma butonuna tıkla (id kullanarak)
                cy.get('#qty-plus5024820').click({ force: true });

                // Yeni adeti kontrol et
                cy.get('#qty5024820')
                .invoke('val')
                .then(newQty => {
                    const yeniAdet = Number(newQty);
                    cy.log('Yeni adet: ' + yeniAdet);
                    expect(yeniAdet).to.eq(eskiAdet + 1); // artış kontrolü
       });
      });
    }

    deleteProduct(){
        cy.get('i.ti-trash-o').first().click({ force: true });
        cy.get('button.t-popconfirm-cancel-btn').should('be.visible').click({ force: true });
    }
    
    deleteAllProduct(){
        cy.get('#clear-cart-btn-129').click({ force: true });

    }
    
    buyProductFromMain() {
        cy.get('#go-order-btn').click();
    }
    buyProductFromCart() {
        cy.get('#cart-buy-btn').click();
    }
    
    pageConfirm(){
      cy.url().should('include', '/order/'); // Adres bilgilerinde olduğumuzu kontrol etmek için 
      cy.get('a.active.disable').should('be.visible').and('contain.text', 'Adres Bilgileri'); // adres bilgileri kontrol 
    }
    paymentPage(){
        cy.get('button.order-next-btn').click();

    }
    pageConfirm1() {
        cy.contains('Alışverişe Devam Et').should('be.visible');
    }
    pageConfirmKargo() {
        cy.get('div.cargo-content').should('contain.text', 'PTT Kargo');
    }
    paymentChoose(){
        
        cy.contains('Kartla Ödeme').should('be.visible');
    }
    paymentWithCard(){
        cy.contains('span', 'Kartla Ödeme').click();
    }
    cardPageConfirm(){
        cy.get('#ccname')
                .should('have.attr', 'placeholder', 'Kart Üzerindeki Ad Soyad');
        cy.get('#ccnumber')
                .should('have.attr', 'placeholder', 'Kart Numarası');
        cy.get('#ccexp')
                .should('have.attr', 'placeholder', 'Ay / Yıl');
                
    }
    cardInfos(){
        cy.get('#ccname').click().type('PAYTR TEST');
        cy.get('#ccnumber').click().type('4355 0843 5508 4358');
        cy.get('#ccexp').click().type('12 / 30');
        cy.get('#cccvc').click().type('000');
    }
        cardInfosFalse(){
        cy.get('#ccname').click().type('PAYTR TEST');
        cy.get('#ccnumber').click().type('4355 0843 5508 4358');
        cy.get('#ccexp').click().type('12 / 30');
    }
    buttonControl(){
        cy.get('#iyz-payment-button')
            .should('be.visible')
            .and('not.be.disabled');
    }

    siparisOzeti(){
        // Sepet Toplamı
        cy.get('#order-summary')
          .contains('Sepet Toplamı')
          .parent() // div d-flex align-items-center 
          .find('div')
          .eq(1) // sağdaki fiyat div'i
          .invoke('text')
          .then(text => {
            const sepetToplam = parseFloat(text.replace('.', '').replace(',', '.').replace(' TL', ''));
            cy.log('Sepet Toplamı: ' + sepetToplam);
          });

        // Kargo Ücreti
        cy.get('#priceCargo')
          .invoke('text')   // içindeki metni almak için 
          .then(text => {
            const kargo = parseFloat(text.replace(',', '.'));        // parseFloat TL formatını sayı haline getirmek için çünkü string olarak aldı bu değerleri  
            cy.log('Kargo Ücreti: ' + kargo);
          });

        // Genel Toplam
        cy.get('#order-summary')
          .contains('Genel Toplam')
          .parent()
          .find('div')
          .eq(1)
          .invoke('text')  //içindeki metni almak için
          .then(text => {
            const genelToplam = parseFloat(text.replace('.', '').replace(',', '.').replace(' TL', ''));
            cy.log('Genel Toplam: ' + genelToplam);
          });

    }

    guessAddProduct(){
     cy.scrollTo('top');
     cy.get('span.add-to-cart-btn').first().click({ force: true });
    }
    continueShopping(){
      cy.get('a#cart-popup-continue-shopping').click();
      cy.get('a[href="#login-form-131"][data-toggle="tab"]')
      .should('be.visible')
      .and('contain.text', 'Üye Girişi');

    }
    adressPageCheck(){
      // URL kontrolü
      cy.url().should('include', '/order/address');

      // Element ve text kontrolü
      cy.get('a.active.disable')
        .should('be.visible')
        .and('contain.text', 'Adres Bilgileri');
      // Adres textarea kontrolü
      cy.get('textarea#address')
        .should('be.visible')
        .and('have.attr', 'placeholder', 'Adres');

      // Mahalle input kontrolü
      cy.get('input#district')
        .should('be.visible')
        .and('have.attr', 'placeholder', 'Mahalle');

      // Cep Telefonu input kontrolü
      cy.get('input#mobile_phone')
        .should('be.visible')
        .and('have.attr', 'placeholder', 'Cep Telefonu');
    }
    
    adressPageFillNegative(){
      cy.fixture('CartDetails.json').then((data) => {
       cy.get('input#fullname').click().type(data.nameAdress);
       cy.get('select#city_code').select('İstanbul');
       cy.get('select#town_code').should('not.be.disabled');
       cy.get('select#town_code').select('Çatalca');
       cy.get('select#district_code').should('not.be.disabled');
       cy.get('select#district_code').select('FATİH MAH');
       cy.get('textarea#address').click().type(data.fullAdress);
       
      });
    }
    adressPageFillPos(){
      cy.fixture('CartDetails.json').then((data) => {
       cy.get('input#fullname').click().type(data.nameAdress);
       cy.get('select#city_code').select('İstanbul');
       cy.get('select#town_code').should('not.be.disabled');
       cy.get('select#town_code').select('Çatalca');
       cy.get('select#district_code').should('not.be.disabled');
       cy.get('select#district_code').select('FATİH MAH');
       cy.get('textarea#address').click().type(data.fullAdress);
       cy.get('input#mobile_phone').click().type(data.Mobile);
       cy.get('input[name="email"]').click().type(data.email2);


      });
    }



}


export default new Cart();