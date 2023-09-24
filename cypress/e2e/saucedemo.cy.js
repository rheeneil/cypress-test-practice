import { generateData } from "../support/dataGenerator"

/// <reference types="cypress" />

const data = generateData();


describe('Open Website', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('https://www.saucedemo.com/')

    })

    it('sign in - standard user', () => {
        cy.get('#user-name')
        .click()
        .type('standard_user')

        cy.get('#password')
        .click()
        .type('secret_sauce')

        cy.get('#login-button')
        .click()

        cy.url().should('include', '/inventory.html')

        cy.get('.app_logo')
        .should('be.visible', 'Swag Labs')
    })

    it('sign in - locked out user', () => {
      cy.get('#user-name')
      .click()
      .type('locked_out_user')

      cy.get('#password')
      .click()
      .type('secret_sauce')

      cy.get('#login-button')
      .click()

      cy.get('h3[data-test="error"]')
      .should('be.visible')
  })

  it('end to end - buying item', () => {
    cy.get('#user-name')
        .click()
        .type('standard_user')

        cy.get('#password')
        .click()
        .type('secret_sauce')

        cy.get('#login-button')
        .click()

        cy.get('#inventory_container')
        .should('be.visible')

        cy.get('#add-to-cart-sauce-labs-backpack')
        .click()

        cy.get('.shopping_cart_badge')
        .should('be.visible', '1')

        cy.get('#shopping_cart_container')
        .click()
        
        cy.get('.title')
        .should('be.visible', 'Your Cart')

        cy.get('#checkout')
        .click()

        cy.url().should('include', '/checkout-step-one.html')

        cy.get('.title')
        .should('be.visible', 'Checkout: Your Information')

        cy.get('.checkout_info')
        .should('be.visible')

        cy.get('#first-name')
        .click()
        .type(data.firstName)

        cy.get('#last-name')
        .click()
        .type(data.lastName)

        cy.get('#postal-code')
        .click()
        .type(data.zipCode)

        cy.get('#continue')
        .click()

        cy.url().should('include', '/checkout-step-two.html')

        cy.get('.title')
        .should('be.visible', 'Checkout: Overview')

        cy.get('#finish')
        .click()

        cy.url().should('include', '/checkout-complete.html')

        cy.get('.title')
        .should('be.visible', 'Checkout: Complete!')

        cy.get('#checkout_complete_container')
        .should('be.visible')


  })

})