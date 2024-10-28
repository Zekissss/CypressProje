import { register } from "../../../support/pages/registerPage";
import { faker } from "@faker-js/faker";



describe('Register', () => {
  let registerData
  let fakeEmail
  let fakePassword

  before(() => {
    cy.fixture('registerData').then((data) => {
      registerData = data
      fakeEmail = faker.internet.email()
      fakePassword = faker.internet.password()
    })

  });

  beforeEach(() => {
    cy.wait(2000)
    cy.visit('/' + Cypress.env('register'));
  });

  it('Register Positive Test', { tags: ['@smoke'] }, () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })

    register.writeRegisterFirstName(registerData.firstName)
    register.writeRegisterLastName(registerData.lastName)
    register.writeRegisterEmail(fakeEmail)
    register.writeRegisterPassword(fakePassword)
    register.clickRegisterButton()
  })

  it('Register Negative Test-Name empty', () => {
    register.writeRegisterLastName(registerData.lastName)
    register.writeRegisterEmail(fakeEmail)
    register.writeRegisterPassword(fakePassword)
    register.clickRegisterButton()
    register.verifyEmptyFirstNameMessage(registerData.firstNameMessage)
  });

  it('Register Negative Test-Surname empty', () => {
    register.writeRegisterFirstName(registerData.firstName)
    register.writeRegisterEmail(fakeEmail)
    register.writeRegisterPassword(fakePassword)
    register.clickRegisterButton()
    register.verifyEmptyLastNameMessage(registerData.lastNameMessage)
  });

})
