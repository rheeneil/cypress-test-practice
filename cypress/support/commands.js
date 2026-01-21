// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { generateData } from "./dataGenerator";

generateData();

Cypress.Commands.add("login", (username, password) => {
  cy.get("#user-name").click().type(username);
  cy.get("#password").click().type(password);
  cy.get("#login-button").click();
});

Cypress.Commands.add("waitForElement", (element, timeout = 5000, text) => {
  cy.get(element, { timeout }).should("be.visible");
  text ? cy.get(element).should("have.text", text) : null;
});

Cypress.Commands.add("clickButton", (button) => {
  cy.get(button).click();
});

Cypress.Commands.add("waitForURL", (urlPart, timeout = 5000) => {
  cy.url({ timeout }).should("include", urlPart);
});
