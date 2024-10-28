const { defineConfig } = require("cypress")
const cypressGrep = require('cypress-grep/src/plugin.js');
require('dotenv').config();



module.exports = defineConfig({
  projectId: '6q6icf',
  experimentalStudio: true,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    overwrite: true, //deger true olursa eski html rapor dosyasını silip yeniden olusturur, true olursa index001 seklinde diğer dosyaları olusturur
    charts: true, // Testlerin pass ve fail durumlarını grafiksel olarak raporlar
    reportPageTitle: 'ToolShop Project Report', // Rapor başlığının custumise edilmesi için kullanılır
    reportFilename: "[status]_[datetime]-[name]-report", //raporlama dosyasının isimlendirmesi için kullanılır fail_08.02.2024.Perşembe-RegisterTest-report.html
    timestamp: "shortDate",//dosya ismindeki tarih alanının düzenlenmesinde kullanılır. shortDate, longDate seklinde kullanılır
    embeddedScreenshots: true, // gömülü ekran görüntüsünü harici bir dosyaya değil direct olarak html rapor dosyasına ekler
    inlineAssets: true, //assets klasorünün html dosyalarını html dosyasına gömülerek eklenmesini saglar
    saveAllAttempts: false,// fail olan testlerde eğer test tekrarı yapıyorsak sadece son teste ait ekran görüntüsünü rapora ekler
    ignoreVideos: false, // true ise testlerin video dosyalarını ignore eder
    videoOnFailOnly: false //true ise sadece fail durumlarında videoyu ekle-false ise tum testlerde videoyu ekle
    //videosOnFailOnly: true/false     komutunun calisabilmesi icin ignoreVideos: false olmasi gerekiyor
  },
  screenshotOnRunFailure: true, // Test fail olduğu durumda ekran dörüntüsü alır (npx cypress run komutu ile test çalıştırıldığında)
  trashAssetsBeforeRuns: true, // Test tekrar çalıştırıldığında önceki testten kalan resim ve videoları siler
  video: false, // Test npx cypress run komutu ile çalıştırıldığında video çeker
  retries: {
    runMode: 3, // npx cypress run komutu ile test çalıştırıldığında, test fail olursa burada belirtilen sayı mitarınca testi tekrar koşar
    openMode: 0, // npx cypress open komutu ile test çalıştırıldığında, test fail olursa burada belirtilen sayı mitarınca testi tekrar koşar
  },
  e2e: {
    baseUrl: process.env.BASE_URL,
    env: {
      grepFilterSpecs: true,
      grepFilterSpecs: true,
      grepOmitFiltered: true,
      register: process.env.REGISTER,
      login: process.env.LOGIN,
      email: process.env.EMAIL,
      password: process.env.PASSWORD
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      cypressGrep(config);
      return config;
    },
    downloadsFolder: 'cypress/downloads',
    reporter: 'cypress-mochawesome-reporter',
  },
});