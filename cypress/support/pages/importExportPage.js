class importExportPage {

  constructor() {
    this.selectFirstDropdown = "#dropdown_export_select";
    this.selectDateFromDropdown = "#dropdown_date_range";
    this.toast = ".Toastify__toast-body > :nth-child(2)";
    this.recycle = ".btn-hover-danger";
    this.export = "#btn_export";
    this.dropdownImportSelect = "#dropdown_import_select"
    this.import = "#btn_import"
    this.importArea = '.CSVImporter_FileSelector'
    this.email = ':nth-child(1) > :nth-child(4) > .text-decoration-none'
    this.selectCustomer = ':nth-child(1) > .selection-cell > .checkbox > span'
    this.multiDelete = '#btn_multiple_delete'
    this.deleteModal = '#btn_delete_modal'
  }


  clickDropdown() {
    cy.get(this.selectFirstDropdown).click({ force: true }); //1. dropeDown1 tikladik
  }

  clickImportDropdown() {
    cy.get(this.dropdownImportSelect).click({ force: true });
  }

  selectImport(typ) {
    cy.contains("span", typ).click()
  }

  clickImport() {
    cy.get(this.import).click();
  }

  attachFile(fileName) {
    cy.get(this.importArea).attachFile(fileName, {
      subjectType: "drag-n-drop",
    });
  }

  checkEmail(mailAddress) {
    cy.get(this.email).should("have.text", mailAddress)
  }

  assertToastMessage(message) {
    cy.get(this.toast).should("have.text", message);
  }

  selectNewCustomer() {
    cy.get(this.selectCustomer).click({ force: true });
  }

  deleteSelected() {
    cy.get(this.multiDelete).click({ force: true });
  }

  exportFile() {

    let dropdownList = [
      "DATEV Export",
      "Angebote Exportieren",
      "Rechnungen Exportieren",
      "Gutschriften Exportieren",
      "Kundendaten Exportieren",
      "Artikeldaten Exportieren",
      "Kategorien Exportieren"
    ];

    let dateRangeList = [
      "Letzte 7 Tage",
      "Letzte 30 Tage",
      "Diesen Monat",
      "Im Vergangenen Monat",
      "Dieses Jahr",
      "Benutzerdefinierten Bereich festlegen",
    ];

    // For döngüsü kullanarak her bir ismi teker teker seçip sirayla tiklayalim...
    for (let i = 0; i < dropdownList.length; i++) {
      cy.get(this.selectFirstDropdown).click({ force: true })
      cy.log(dropdownList[i]);
      cy.contains("span", dropdownList[i]).click({ force: true });

      // ikinci dropedown gorunur ise rastgele birine tiklayalim gorunur degil ise gecelim
      cy.get("body").then(($body) => {
        if ($body.find(this.selectDateFromDropdown).is(":visible")) {
          cy.log("Element is visible");

          // Element görünürse tıkla
          cy.get(this.selectDateFromDropdown).click({ force: true }).then(() => {
            let randomIndex = Math.floor(Math.random() * dateRangeList.length);

            // Rastgele seçilen öğe
            let randomItem = dateRangeList[randomIndex];
            cy.contains("li", randomItem).click();
          });
          cy.log("Element is not visible");
        }
      });

      cy.get(this.export).click({ force: true });
      cy.get("body").then(($body) => {
        if ($body.find(this.recycle).is(":visible")) {
          cy.log("Element is visible");

          // Element görünürse tıkla
          cy.get(this.recycle).click({ force: true });
        } else {
          // Bir süre bekle
          cy.wait(1000); // 1 saniye bekle

          // Elementi tekrar kontrol et
          cy.get("body").then(($body) => {
            if ($body.find(this.recycle).is(":visible")) {
              cy.log("Element is now visible after wait");
              // Element görünürse tıkla
              cy.get(this.recycle).click({ force: true });
            } else {

              cy.get(this.toast).should(
                "have.text", "Für die von Ihnen ausgewählten Kriterien konnten keine zu exportierenden Daten gefunden werden");
            }
          });
        }
      });
    }
  }

}

export const importExport = new importExportPage();
