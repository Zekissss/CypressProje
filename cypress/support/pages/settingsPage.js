class SettingsPage {
  constructor() {
    this.settingsButton = '#menu_settings';
    this.pageTitle = '#title_settings';
    this.companyButton = ':nth-child(1) > .navi-link';
    this.categoriesButton = ':nth-child(2) > .navi-link';
    this.accountButton = ':nth-child(3) > .navi-link';
    this.productButton = ':nth-child(4) > .navi-link';
    this.shippingButton = ':nth-child(5) > .navi-link';
    this.orderButton = ':nth-child(6) > .navi-link';
    this.invoiceButton = ':nth-child(7) > .navi-link';
    this.offerButton = ':nth-child(8) > .navi-link';
    this.waybillButton = ':nth-child(9) > .navi-link';
    this.creditButton = ':nth-child(10) > .navi-link';
    this.accountOwnerMailAdress = '[type="text"][name="email"]'
    this.companyEditButton = '.btn.btn-primary.svg-icon.svg-icon-sm.font-weight-bold';
    this.companyName = '[type="text"][name="company_name"]'
    this.companyOwner = '.sc-cwHptR zoEBx form-control form-control-md';
    this.companyTelephone = ':nth-child(1) > .card-body > .row > :nth-child(4) > .sc-gsFSXq > :nth-child(2) > .sc-cwHptR'
    this.saveButton = '#btn_save'
    this.newCategoryButton = '#btn_new'
    this.categoryName = '[type="text"][name="name"]'
    this.categorySaveButton = '#btn_save_modal'
    this.categoryEditButton = '.btn.btn-icon.btn-hover-primary.btn-sm'
    this.categoryDelete = "a[id*='btn_delete']"
    this.delete = '#btn_delete_modal'
    this.importArea = '#images_upload'
    this.logoDelete = '#btn_logo_delete'
    this.logoCompleteDeleted = '#btn_delete_modal'
    this.changeEmailButton = ':nth-child(1) > .card > .card-body > .justify-content-between > .font-weight-bold'
    this.newEmailAddress = '[type="text"][name="new_email"]'
    this.newEmailAddressCurrentlyPassword = '[type="password"][name="password"]'
    this.changePassword = ':nth-child(2) > .card > .card-body > .justify-content-between > .font-weight-bold'
    this.newEmailAddressSaveChanged = '.modal-footer > .ml-2'
    this.emailAddressChanged = '.modal-footer > .ml-2'
    this.currentlyPassword = ':nth-child(2) > .sc-gsFSXq > :nth-child(2) > .sc-cwHptR'
    this.newPassword = ':nth-child(3) > .sc-gsFSXq > :nth-child(2) > .sc-cwHptR'
    this.newPasswordSaveChanged = '.modal-footer > .ml-2'
    this.currentlyVisiblePassword = ':nth-child(2) > .sc-gsFSXq > .position-absolute'
    this.passwordChangedAlert = '[role="alert"][class="fade svg-icon mb-0 alert alert-success show"]'
    this.emailChangedAlert = '[role="alert"][class="fade svg-icon mb-0 alert alert-success show"]'
    this.loginPageTitle = '.text-center > .mb-3'
    this.standardVAT = ':nth-child(2) > .sc-gsFSXq > .sc-eDPEul > .css-jmdd3l-control > .css-hlgwow > .css-19bb58m'
    this.standardUnit = ':nth-child(3) > .sc-gsFSXq > .sc-eDPEul > .css-jmdd3l-control > .css-hlgwow > .css-19bb58m'
    this.standardCurrency = ':nth-child(4) > .sc-gsFSXq > .sc-eDPEul > .css-jmdd3l-control > .css-hlgwow > .css-19bb58m'
    this.catalogButton = '#menu_catalog'
    this.productsButton = '#menu_product'
    this.newProductButton = '#btn_new'
    this.digitalProductInfo = '.ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred'
    this.addVariant = '#btn_add_variant'
    this.pageLeaveButton = '#btn_leave_modal'
    this.variantNameInput = '[type="text"][name="variant_name"]'
    this.aspectNameInput = '[type="text"][name="aspect_names"]'
    this.addAspectButton = '#btn_add_variant'
    this.deleteAspectButton = '#btn_delete'
    this.variantSaveButton = '#btn_save_modal'
    this.lookAtVariant = '.font-weight-bold text-hover-primary svg-icon svg-icon-sm'

  }

  clickSettingsButton() {
    cy.get(this.settingsButton).click({ force: true });
  }

  verifyPageTitle(title) {
    cy.get(this.pageTitle).should('have.text', title);
  }

  verifyAccountOwnerEmailAddress(email) {
    cy.wait(4000);
    cy.get(this.accountOwnerMailAdress).should('have.to', email);
  }

  clickCompanyEditButton() {
    cy.get(this.companyEditButton).click({ force: true });
  }

  verifyCompanyName(company) {
    cy.get(this.companyName).should('have.to', company)
  }

  editTelephone() {
    cy.get(this.companyTelephone).clear().type('123456789')
  }

  attachPicture() { // Öncelikle logonun var olup olmadığını kontrol ediyoruz
    cy.get('body').then(($body) => {
      if ($body.find(this.logoDelete).length > 0) {// Eğer logo varsa, silme işlemini gerçekleştir
        cy.get(this.logoDelete).click();
        cy.get(this.logoCompleteDeleted).click();
        cy.wait(2000);
      }
    });// Logoyu ekleme işlemi
    cy.get(this.importArea).attachFile("testSirketLogo.png", {
      subjectType: "drag-n-drop",
    });
    cy.wait(2000);
  }

  clickSaveButton() {
    cy.get(this.saveButton).click({ force: true });
  }

  clickCategoriesButton() {
    cy.get(this.categoriesButton).click({ force: true });
  }

  clickNewCategoryButton() {
    cy.get(this.newCategoryButton).click({ force: true });
  }

  writeCategoryName(category) {
    cy.get(this.categoryName).clear().type(category)
    cy.wait(2000);
  }

  clickCategorySaveButton() {
    cy.get(this.categorySaveButton).click({ force: true });
    cy.wait(2000);
  }

  clickCategoryEditButton() {
    cy.get(this.categoryEditButton).eq(0).click(); // İkinci öğe 0-indexlidir
    cy.wait(2000);
  }

  clickCategoryDeleteButton() {
    cy.get(this.categoryDelete).eq(0).click(); // ilk öğe için 0 indeksli
    cy.wait(2000);
    cy.get(this.delete).click({ force: true });
  }

  clickLogoDeleteButton() {
    cy.get(this.logoDelete).click({ force: true });
  }

  clickChangeEmailButton() {
    cy.get(this.changeEmailButton).click({ force: true });
  }

  clickChangePasswordButton() {
    cy.get(this.changePassword).click({ force: true });
  }

  clickAccountButton() {
    cy.wait(2000);
    cy.get(this.accountButton).click({ force: true });
    cy.wait(2000);
  }

  writeNewEmailAddress(email) {
    cy.get(this.newEmailAddress).type(email);
    cy.wait(2000);
  }

  clickNewEmailAddressSaveChangedButton() {
    cy.get(this.newEmailAddressSaveChanged).click({ force: true });
    cy.wait(2000);
  }

  writeCurrentPasswordForNewEmailAddress(pass) {
    cy.get(this.newEmailAddressCurrentlyPassword).type(pass)
    cy.wait(2000);
  }

  writeCurrentlyPassword(pass) {
    cy.get(this.currentlyPassword).click({ force: true });
    cy.wait(2000);
    cy.get(this.currentlyPassword).type(pass);
  }

  writeNewPassword(password) {
    cy.get(this.newPassword).type(password);
    cy.wait(2000);
  }

  clickNewPasswordSaveChangedButton() {
    cy.wait(3000);
    cy.get(this.newPasswordSaveChanged).click({ force: true });
    cy.wait(3000);
  }

  clickNewEmailSaveChangedButton() {
    cy.wait(3000);
    cy.get(this.emailAddressChanged).click({ force: true });
    cy.wait(3000);
  }

  clickVisiblePassword() {
    cy.get(this.currentlyVisiblePassword).click({ force: true });
  }

  verifyPasswordChangeMessage(message) {
    cy.wait(3000);
    cy.get(this.passwordChangedAlert).should('have.to', message);
  }

  verifyLoginPageTitle() {
    cy.get(this.loginPageTitle).should('have.to', 'Login');

  }

  verifyEmailChangedMessage(message) {
    cy.get(this.emailChangedAlert).should('have.to', message);
  }

  clickProductButton() {
    cy.get(this.productButton).click({ force: true });
  }

  writeStandardVAT(vat) {
    cy.wait(3000);
    cy.get(this.standardVAT).type(vat);
  }

  writeStandardUnit(unit) {
    cy.get(this.standardUnit).type(unit);
  }

  writeStandardCurrency(currency) {
    cy.get(this.standardCurrency).type(currency);
  }

  verifyProductStandardSettings(vat) {
    cy.get(this.catalogButton).click({ force: true });
    cy.wait(2000);
    cy.get(this.productsButton).click({ force: true });
    cy.wait(1000);
    cy.get(this.newProductButton).click({ force: true });
    cy.wait(1000);
    cy.get(this.standardVAT).should('have.to', vat);
  }

  clickAddVariant() {
    cy.get(this.addVariant).click({ force: true });
    cy.wait(2000);
  }

  clickPageLeaveButton() {
    cy.get(this.pageLeaveButton).click({ force: true });
  }

  writeVariantName(variantname) {
    cy.get(this.variantNameInput).type(variantname);
    cy.wait(2000);
  }

  writeAspectName(aspectname) {
    cy.get(this.aspectNameInput).type(aspectname);
  }

  clickDeleteAspect() {
    cy.wait(3000);
    cy.get(this.deleteAspectButton).click({ force: true });
    cy.wait(1000);
  }

  clickVariantSaveButton() {
    cy.get(this.variantSaveButton).click({ force: true });
    cy.wait(1000);
  }

  verifyVariantName(variant) {
    cy.get(this.lookAtVariant).should('have.to', variant);
  }

}

export const settings = new SettingsPage();