const { defineConfig } = require("cypress")
const cypressGrep = require('cypress-grep/src/plugin.js');
require('dotenv').config();



module.exports = defineConfig({
  projectId: '6q6icf',
  experimentalStudio: true,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    overwrite: true, 
    charts: true, 
    reportPageTitle: 'QATEST Project Report', 
    reportFilename: "[status]_[datetime]-[name]-report", 
    timestamp: "shortDate",
    embeddedScreenshots: true, 
    inlineAssets: true, 
    saveAllAttempts: false,
    ignoreVideos: false, 
    videoOnFailOnly: false 
  
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
