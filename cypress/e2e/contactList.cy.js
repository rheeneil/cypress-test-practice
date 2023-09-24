import { generateData } from "../support/dataGenerator"

/// <reference types="cypress" />

const data = generateData();

describe('Contact List App', () => {
    beforeEach(() => {
        cy.visit('https://thinking-tester-contact-list.herokuapp.com/');
        cy.get('body > h1')
        .should('be.visible', 'Contact List App')
    })

    it('Sign up', () => {
        cy.get('#signup')
        .click()

        cy.url()
        .should('include','/addUser')

        cy.get('#firstName')
        .should('be.visible')
        .click()
        .type(data.firstName)

        cy.get('#lastName')
        .should('be.visible')
        .click()
        .type(data.lastName)

        cy.get('#email')
        .should('be.visible')
        .click()
        .type(data.emailAddress)

        cy.get('#password')
        .should('be.visible')
        .click()
        .type(data.password)

        cy.get('#submit')
        .should('be.visible')
        .click()

        cy.url()
        .should('include', '/contactList')

        cy.get('h1')
        .should('be.visible', 'Contact List')

    })

    it('Sign in and sign out', () => {

        cy.get('#email')
        .click()
        .type(data.emailAddress)

        cy.get('#password')
        .click()
        .type(data.password)

        cy.get('#submit')
        .click()

        cy.url()
        .should('include', '/contactList')

        cy.get('h1')
        .should('be.visible', 'Contact List')

        cy.get('#logout')
        .click()

        cy.get('body > h1')
        .should('be.visible', 'Contact List App')
    })

    it('Add contact', () => {
        cy.get('#email')
        .click()
        .type(data.emailAddress)

        cy.get('#password')
        .click()
        .type(data.password)

        cy.get('#submit')
        .click()

        cy.url()
        .should('include', '/contactList')

        cy.get('h1')
        .should('be.visible', 'Contact List')

        cy.get('#add-contact')
        .click()
    })
})