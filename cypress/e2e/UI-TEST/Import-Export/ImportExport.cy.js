import { importExport } from "../../../support/pages/importExportPage.js";



describe("importExport", () => {
  let importExportData

  before(() => {
    cy.fixture("importExport").then((data) => {
      importExportData = data;
    });
  });

  beforeEach(() => {
    cy.visitSaleVali()
    cy.loginSaleVali();
    cy.selectFromMenu(importExportData.page1);
  });

  it.only("Positive Export Test", () => {
    cy.selectFromMenu(importExportData.page2);
    cy.assertCurrentPageName(importExportData.page2)
    importExport.clickDropdown()
    importExport.exportFile();
  });

  it("Positive Customer Import Test", () => {
    cy.selectFromMenu(importExportData.page3);
    cy.assertCurrentPageName(importExportData.page3)
    importExport.clickImportDropdown()
    importExport.selectImport(importExportData.importType1)
    importExport.clickImport()
    importExport.attachFile(importExportData.csvCustomer)
    cy.clickButton(importExportData.beforeImportButton)
    cy.clickButton(importExportData.importButton)
    cy.clickButton(importExportData.finishedButton)
    cy.clickButton(importExportData.saveButton)
    importExport.checkEmail(importExportData.email)
    cy.assertToastMessage(importExportData.toastMessage1)
  });

  it('Positive Delete Customer Data Import', () => {
    cy.selectFromMenu(importExportData.page5);
    cy.assertCurrentPageName(importExportData.page5)
    importExport.selectNewCustomer()
    importExport.deleteSelected()
    cy.deleteModal()
  });

  it('Positive Product Data Import', () => {
    cy.selectFromMenu(importExportData.page3);
    cy.assertCurrentPageName(importExportData.page3)
    importExport.clickImportDropdown()
    cy.log(importExport.importType2)
    importExport.selectImport(importExportData.importType2)
    importExport.clickImport()
    importExport.attachFile(importExportData.csvProduct)
    cy.clickButton(importExportData.beforeImportButton)
    cy.clickButton(importExportData.importButton)
    cy.clickButton(importExportData.finishedButton)
    cy.clickButton(importExportData.saveButton)
    cy.assertToastMessage(importExportData.toastMessage2)
  });

  it('Positive Delete Product Data Import', () => {
    cy.selectFromMenu(importExportData.page6);
    cy.selectFromMenu(importExportData.page7);
    cy.assertCurrentPageName(importExportData.page7)
    importExport.selectNewCustomer()
    importExport.deleteSelected()
    cy.deleteModal()
  });

});