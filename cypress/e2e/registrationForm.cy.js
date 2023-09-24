import { generateData } from "../support/dataGenerator"

/// <reference types="cypress" />

const data = generateData()

describe('Open Website', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('https://www.int.share-now.com/de/en/berlin/registration/personal-data')
    })

    it('displays header', () => {
        cy.get('#registration-step-1 > div:nth-child(3) > div.markdown-styling.personal-data__header > span > p')
    })

    it('goes through the form', () => {


        cy.get('camelot-input[type="email"]').click()
        .type(data.emailAddress)

        cy.get('input[name="password"]').click()
        .type(data.password)

        cy.get('input[name="mobilePhone"]').click()
        .type(data.telephoneNumber)

        
    })
})