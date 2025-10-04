# Cypress E2E Test Projesi

Bu proje, bir e-ticaret sitesinin temel kullanıcı senaryolarını **Cypress ile otomatik olarak test etmek** amacıyla hazırlanmıştır.  
Login, ürün arama, ürün detayına giriş,sepete ekleme ve ödeme işlemleri gibi test senaryolarını kapsamaktadır.

---

## 📝 Proje Özeti

- Login testi 
- Ürün arama ve filtreleme  
- Ürün detayına giriş  
- Sepete yönetimi ve kontrolü  
- Ödeme ve Sipariş Onayı
- Misafir olarak satın alma işlemleri 
- Testler POM (Page Object Model) yapısına uygun olarak yazılmıştır  

---

## 📂 Dosya Yapısı
KITAP_SEPETI
/cypress
    /e2e                -> Test senaryoları
    /fixtures           -> Test verileri
    /support            -> Custom commands ve setup
/allure-results         -> Allure raporları (otomatik oluşturulur)
/node_modules
cypress/screenshots/    -> Screenshotlar
cypress/videos/         -> Test videoları
cypress.config.js       -> Cypress yapılandırma dosyası
package.json            -> Proje bağımlılıkları
README.md               -> Proje açıklaması

---

## 📂 Kurulum ve Çalıştırma
git clone https://github.com/kullanici/KITAP_SEPETI.git                         -> Projeyi klonlar
cd KITAP_SEPETI                                                                 -> Proje klasörüne girer
npm install                                                                     -> Projenin çalışması için gerekli tüm kütüphaneleri ve paketleri yükler
npx cypress open                                                                -> Cypress GUI ile testleri çalıştırır
npx cypress run                                                                 -> CLI ile testleri çalıştırır
npx mochawesome-merge cypress/reports/*.json > cypress/reports/report.json      -> JSON dosyalarını birleştirir
npx marge cypress/reports/report.json -f report -o cypress/reports/html         -> HTML raporunu oluşturur
start cypress/reports/html/report.html                                          -> Windows'ta HTML raporu açar
open cypress/reports/html/report.html                                           -> Mac'te HTML raporu açar
xdg-open cypress/reports/html/report.html                                       -> Linux'ta HTML raporu açar

---

## 📂 Config ayarları ve Mocha kurulumu için gerekli şartlar
// cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // Reporter Ayarları
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports", // HTML raporların kaydedileceği klasör
    overwrite: true,               // Önceki raporların üzerine yaz
    html: true,                    // HTML rapor oluştur                ---> eğer html yaparsak testlerimizi tek tek çalıştırmamız lazım spec olarak
    json: false                     // JSON raporu istemiyorsan false   ---> json formatında çoklu çıktı alabiliriz 
  },

  // E2E Test Ayarları
  e2e: {
    screenshotsFolder: "cypress/screenshots", // Hatalı testlerde screenshot klasörü
    videosFolder: "cypress/videos",           // Test videolarının kaydedileceği klasör
    video: true,                               // Video kaydını aktif et
    screenshotOnRunFailure: true,              // Test başarısız olursa otomatik screenshot al
    supportFile: "cypress/support/e2e.js",    // Support dosyası
  },
});
