import { generateData } from "../support/dataGenerator";

/// <reference types="cypress" />

const data = generateData();

describe("Open Website", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("https://www.saucedemo.com/");
  });

  it("sign in - standard user", () => {
    cy.login("standard_user", "secret_sauce");

    cy.url().should("include", "/inventory.html");

    cy.get(".app_logo").should("be.visible", "Swag Labs");
  });

  it("sign in - locked out user", () => {
    cy.login("locked_out_user", "secret_sauce");

    cy.waitForElement('h3[data-test="error"]');
  });

  it("end to end - buying item", () => {
    cy.login("standard_user", "secret_sauce");

    cy.waitForElement("#inventory_container");

    cy.clickButton("#add-to-cart-sauce-labs-backpack");

    cy.waitForElement(".shopping_cart_badge");

    cy.clickButton("#shopping_cart_container");

    cy.waitForURL("/cart.html");
    cy.waitForElement(".title", 5000, "Your Cart");

    cy.clickButton("#checkout");

    cy.waitForURL("/checkout-step-one.html");
    cy.waitForElement(".title", 5000, "Checkout: Your Information");

    cy.waitForElement(".checkout_info");

    cy.fillInput("#first-name", data.firstName);
    cy.fillInput("#last-name", data.lastName);
    cy.fillInput("#postal-code", data.zipCode);

    cy.clickButton("#continue");

    cy.waitForURL("/checkout-step-two.html");

    cy.waitForElement(".title", 5000, "Checkout: Overview");

    cy.clickButton("#finish");

    cy.waitForURL("/checkout-complete.html");

    cy.waitForElement(".title", 5000, "Checkout: Complete!");

    cy.waitForElement("#checkout_complete_container");
  });
});
