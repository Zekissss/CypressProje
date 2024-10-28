class LoginPage {

  constructor() {
    this.email = '[name="email"]'
    this.password = '[name="password"]'
    this.loginButton = '//button[@id="btn_login"]'
  }


  writeLoginMail(mail) {
    cy.get(this.email).type(mail);
  }

  writeLoginPassword(pass) {
    cy.get(this.password).type(pass);
  }

  clickLoginButton() {
    cy.xpath(this.loginButton).click({ force: true })
  }

}

export const login = new LoginPage()