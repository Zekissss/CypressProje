class RegisterPage {

  constructor() {
    this.registerForFreeButton = '.justify-content-center > #btn_login'
    this.firstName = 'input[name="name"]'
    this.lastName = '[name="surname"]'
    this.email = '[name="email"]'
    this.password = '[name="password"]'
    this.tryNowForFreeButton = '#btn_register'
    this.emptyFirstNameWarningMessage = ':nth-child(1) > .sc-dAlyuH > .sc-dhKdcB'
    this.emptyLastNameWarningMessage = ':nth-child(2) > .sc-dAlyuH > .sc-dhKdcB'
  }


  clickRegisterFirstButton() {
    cy.get(this.registerForFreeButton).click({ force: true });
  }

  writeRegisterFirstName(name) {
    // cy.get(this.vorname).click({force:true})
    cy.get(this.firstName).type(name);
  }

  writeRegisterLastName(lastnamee) {
    cy.get(this.lastName).type(lastnamee);
  }

  writeRegisterEmail(email) {
    cy.get(this.email).type(email);
  }

  writeRegisterPassword(pass) {
    cy.get(this.password).type(pass);
  }

  clickRegisterButton() {
    cy.get(this.tryNowForFreeButton).click();
  }

  verifyEmptyFirstNameMessage(emptyFirstName) {
    cy.get(this.emptyFirstNameWarningMessage).should('have.to', emptyFirstName)
  }

  verifyEmptyLastNameMessage(emptyLastName) {
    cy.get(this.emptyLastNameWarningMessage).should('have.to', emptyLastName)
  }

}

export const register = new RegisterPage()