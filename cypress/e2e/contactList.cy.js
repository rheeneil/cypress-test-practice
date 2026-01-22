import { generateData } from "../support/dataGenerator";

/// <reference types="cypress" />

const data = generateData();

describe("Contact List App", () => {
  beforeEach(() => {
    cy.visit("https://thinking-tester-contact-list.herokuapp.com/");
    cy.get("body > h1").should("be.visible", "Contact List App");
  });

  it("Sign up", () => {
    cy.clickButton("#signup");

    cy.waitForURL("/addUser");

    cy.fillInput("#firstName", data.firstName);

    cy.fillInput("#lastName", data.lastName);

    cy.fillInput("#email", data.emailAddress);

    cy.fillInput("#password", data.password);

    cy.clickButton("#submit");

    cy.waitForURL("/contactList");

    cy.waitForElement("h1", 5000, "Contact List");
  });

  it("Sign in and sign out", () => {
    cy.login(
      "#email",
      data.emailAddress,
      "#password",
      data.password,
      "#submit",
    );

    cy.waitForURL("/contactList");

    cy.waitForElement("h1", 5000, "Contact List");

    cy.clickButton("#logout");

    cy.waitForElement("body > h1", 5000, "Contact List App");
  });

  it("Add contact", () => {
    cy.login(
      "#email",
      data.emailAddress,
      "#password",
      data.password,
      "#submit",
    );

    cy.waitForURL("/contactList");

    cy.waitForElement("h1", 5000, "Contact List");

    cy.clickButton("#add-contact");
  });
});
