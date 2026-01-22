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

Cypress.Commands.add(
  "login",
  (usernameField, username, passwordField, password, loginButton) => {
    cy.get(usernameField).should("be.visible");
    cy.get(usernameField).click().type(username);
    cy.get(passwordField).should("be.visible");
    cy.get(passwordField).click().type(password);
    cy.get(loginButton).should("be.visible");
    cy.get(loginButton).click();
  },
);

Cypress.Commands.add("waitForElement", (element, timeout = 5000, text) => {
  cy.get(element, { timeout }).should("be.visible");
  text ? cy.get(element).should("have.text", text) : null;
});

Cypress.Commands.add("clickButton", (button) => {
  cy.get(button).should("be.visible");
  cy.get(button).click();
});

Cypress.Commands.add("waitForURL", (urlPart, timeout = 5000) => {
  cy.url({ timeout }).should("include", urlPart);
});

Cypress.Commands.add("fillInput", (input, value) => {
  cy.get(input).should("be.visible");
  cy.get(input).click().type(value);
});

Cypress.Commands.add("selectOption", (select, option) => {
  cy.get(select).should("be.visible");
  cy.get(select).select(option);
});

Cypress.Commands.add("checkCheckbox", (checkbox) => {
  cy.get(checkbox).should("be.visible");
  cy.get(checkbox).check();
});

Cypress.Commands.add("uncheckCheckbox", (checkbox) => {
  cy.get(checkbox).should("be.visible");
  cy.get(checkbox).uncheck();
});
