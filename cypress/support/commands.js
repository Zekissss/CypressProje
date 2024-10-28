// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --

// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("xpath", (selector, ...args) => {
  return cy.get(`xpath=${selector}`, ...args);
});

//Login methodu
Cypress.Commands.add("loginSaleVali", () => {

  //killanici adi gir
  cy.get('[name="email"]').type(Cypress.env("email"));

  //sifre gir
  cy.get('[name="password"]').type(Cypress.env("password"));

  //login butonuna tikla
  cy.xpath('//button[@id="btn_login"]').click();
});

//  User POST REQUEST ICIN REUSABLE BIR METOT OLUSTURALIM
Cypress.Commands.add("addUser", (token, userData) => {
  cy.request({
    method: "POST", //creating new data
    url: "https://test.salevali.com/auth/registration",
    headers: {
      Authorization: `${token}`, // Assuming your API uses Bearer token authentication
      "Content-Type": "application/json",
    },
    body: userData,
  });
});

// token uretmek icin gerekli olan metot
Cypress.Commands.add(
  "generateToken",
  (email, password, recaptcha_token, remember) => {
    const body = {
      email: email,
      password: password,
      recaptcha_token: recaptcha_token,
      remember: remember,
    };

    cy.request({
      method: "POST",
      url: "https://test.salevali.com/auth/login",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      return response.body.access_token;
    });
  }
);

Cypress.Commands.add("visitSaleVali", () => {
  cy.visit("/" + Cypress.env("login"));
});

Cypress.Commands.add("selectFromMenu", (page_name) => {
  cy.contains("span", page_name).click();
});

Cypress.Commands.add("assertCurrentPageName", (page_name) => {
  cy.contains("h3", page_name).should("exist");
});

Cypress.Commands.add("clickButton", (buttonName) => {
  cy.contains("button", buttonName).click();
});

Cypress.Commands.add("deleteModal", (buttonName) => {
  cy.get('#btn_delete_modal').click()
});

Cypress.Commands.add("assertToastMessage", (message) => {
  cy.get('.Toastify__toast-body > :nth-child(2)').should("have.text", message);
});

Cypress.Commands.add("generateFakePhone", (format = 'string') => {
  const randomNumber = () => Math.floor(Math.random() * 10);
  const phoneNumber = `${randomNumber()}${randomNumber()}${randomNumber()}-${randomNumber()}${randomNumber()}${randomNumber()}-${randomNumber()}${randomNumber()}${randomNumber()}${randomNumber()}`;

  if (format === 'number') {
    return parseInt(phoneNumber.replace(/[-]/g, ''), 10);
  } else {
    return phoneNumber;
  }
});

Cypress.Commands.add('generateFakeTaxNumber', (format = 'string') => {
  const birthYear = Math.floor(Math.random() * 100) + 1900; // Rastgele bir doğum yılı oluştur
  const birthMonth = Math.floor(Math.random() * 12) + 1; // Rastgele bir doğum ayı oluştur
  const birthDay = Math.floor(Math.random() * 28) + 1; // Rastgele bir doğum günü oluştur (28 gün varsayıldı)
  const gender = Math.random() < 0.5 ? "0" : "1"; // Rastgele bir cinsiyet seç (0: Kadın, 1: Erkek)
  const sequenceNumber = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0"); // Sıra numarası oluştur
  const taxNumber = `${birthYear}${birthMonth.toString()
    .padStart(2, "0")}${birthDay.toString()
      .padStart(2, "0")}${gender}${sequenceNumber}`;

  if (format === 'number') {
    // Format 'number' ise, telefon numarasını sadece rakam olarak döndür
    const taxNumberAsNumber = parseInt(taxNumber, 10);
    return cy.wrap(taxNumberAsNumber); // Cypress komut zincirine dahil et
  } else {
    // Varsayılan olarak 'string' formatında döndür
    return cy.wrap(taxNumber); // Cypress komut zincirine dahil et
  }
});

Cypress.Commands.add("generateFakeIBAN", () => {
  const countryCode = "TR";
  const checkDigits = "00";
  const bankCode = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  const accountNumber = Math.floor(Math.random() * 10000000000)
    .toString()
    .padStart(10, "0");

  // IBAN'ı oluştur
  const IBAN = countryCode + checkDigits + bankCode + accountNumber;

  // Boşlukları ekleyerek IBAN'ı formatla
  const formattedIBAN = IBAN.slice(0, 2) + " " +
    IBAN.slice(2, 6) + " " +
    IBAN.slice(6, 16) + " " +
    IBAN.slice(16, 26);

  // String olarak döndür
  return cy.wrap(formattedIBAN);
});

Cypress.Commands.add('generateFakePostalCode', (format = 'string') => {
  const postalCode = Math.floor(Math.random() * 90000) + 10000; // Rastgele beş haneli bir sayı oluştur

  if (format === 'number') {
    // Format 'number' ise, posta kodunu sayısal formatta döndür
    return cy.wrap(postalCode);
  } else {
    // Varsayılan olarak 'string' formatında döndür
    return cy.wrap(postalCode.toString());
  }
});

Cypress.Commands.add('generateRabat', (format = 'number') => {
  const discount = Math.floor(Math.random() * 100); // 0-99 arası rastgele bir indirim oranı oluştur

  if (format === 'string') {
    // Format 'string' ise, indirim oranını string olarak döndür
    return cy.wrap(discount.toString());
  } else {
    // Varsayılan olarak 'number' formatında döndür
    return cy.wrap(discount);
  }
});