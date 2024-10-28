import { login } from "../../../support/pages/loginPage";



describe('Login', () => {

  beforeEach(() => {
    cy.visit('/' + Cypress.env('login'));
  });

  it('Login-Positive Test', { tags: ['@smoke'] }, () => {
    login.writeLoginMail(Cypress.env("email"))
    login.writeLoginPassword(Cypress.env("password"))
    login.clickLoginButton()
  });

})
