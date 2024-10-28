import { settings } from "../../../support/pages/settingsPage";

describe('Settings Tests', () => {
  let settingsData;

  before(() => {
    cy.fixture('settingsData').then((data) => {
      settingsData = data;
    });
  });

  beforeEach(() => {
    cy.visit('/' + Cypress.env('login'));
    cy.loginSaleVali();
    settings.clickSettingsButton();
    settings.verifyPageTitle(settingsData.PageTitle);

  });

  it('Company_Information_Control', { tags: ['@smoke'] }, () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    settings.clickCompanyEditButton();
    settings.verifyAccountOwnerEmailAddress(Cypress.env('email')); // Çevresel değişkeni kullanarak email doğrulama
    settings.verifyCompanyName(Cypress.env('firma')); // Firma adı doğrulaması

  });

  it('Company_Information_Edit', { tags: ['@smoke'] }, () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    settings.clickCompanyEditButton();
    settings.editTelephone();
    settings.attachPicture();
    settings.clickSaveButton();
    cy.assertToastMessage(settingsData.SuccesfullyUpdated)

  });

  it('Categories_New_Category_Add_Edit_Delete_', { tags: ['@smoke'] }, () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    settings.clickCategoriesButton();
    settings.clickNewCategoryButton();
    settings.writeCategoryName(settingsData.CategoryName);
    settings.clickCategorySaveButton();
    settings.clickCategoryEditButton();
    settings.writeCategoryName(settingsData.EditCategoryName);
    settings.clickCategorySaveButton();
    cy.assertToastMessage(settingsData.CategoryUpdated);
    settings.clickCategoryDeleteButton();
    cy.assertToastMessage(settingsData.CategoryDeleted)

  });

  it('Account_Change_Email', { tags: ['@smoke'] }, () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    settings.clickAccountButton();
    settings.clickChangeEmailButton();
    settings.writeNewEmailAddress(settingsData.NewEmailAddress);
    settings.clickNewEmailAddressSaveChangedButton();
    settings.writeCurrentPasswordForNewEmailAddress(Cypress.env('password'));
    settings.clickNewEmailSaveChangedButton();
    settings.verifyEmailChangedMessage(settingsData.EmailChangeMessage);

  });

  it('Account_Change_Password', { tags: ['@smoke'] }, () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    settings.clickAccountButton();
    settings.clickChangePasswordButton();
    settings.writeCurrentlyPassword(Cypress.env('password'));
    settings.writeNewPassword(settingsData.NewPassword);
    settings.clickNewPasswordSaveChangedButton();
    settings.clickAccountButton();
    settings.clickChangePasswordButton();
    settings.writeCurrentlyPassword(settingsData.NewPassword);
    settings.writeNewPassword(Cypress.env('password'));
    settings.clickNewPasswordSaveChangedButton();
    settings.verifyPasswordChangeMessage(settingsData.PasswordChangeMessage);
  });

  it('Product_Standard_Settings', { tags: ['@smoke'] }, () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    settings.clickProductButton();
    settings.writeStandardVAT(settingsData.Vat);
    settings.writeStandardUnit(settingsData.Unit);
    settings.writeStandardCurrency(settingsData.Currency);
    settings.clickSaveButton();
    cy.assertToastMessage(settingsData.SettingsUpdated);
    settings.verifyProductStandardSettings(settingsData.Vat);
    settings.clickSettingsButton();
    settings.clickPageLeaveButton();
    settings.clickProductButton();
    settings.clickAddVariant();
    settings.writeVariantName(settingsData.VariantName);
    settings.writeAspectName(settingsData.Aspectname1);
    //settings.writeAspectName(settingsData.Aspectname2);
    settings.clickDeleteAspect();
    settings.clickVariantSaveButton();
    settings.verifyVariantName(settingsData.VariantName);

  });

})
