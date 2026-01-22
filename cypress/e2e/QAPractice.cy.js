import { generateData } from "../support/dataGenerator";

/// <reference types="cypress" />

const data = generateData();

describe("Forms Pages: Login Scenarios", () => {
  beforeEach(() => {
    cy.visit("https://www.qa-practice.razvanvancea.ro");
    cy.waitForElement(".display-4", 5000, "Welcome!");
  });

  context("Login Scenarios", () => {
    it("Login - Success", () => {
      cy.clickButton("#forms");
      cy.waitForElement("#login", 5000, "Login");
      cy.clickButton("#login");
      cy.waitForURL("/auth_ecommerce.html");
      cy.waitForElement("#loginSection");
      cy.login(
        "#email",
        "admin@admin.com",
        "#password",
        "admin123",
        "#submitLoginBtn",
      );
      cy.waitForElement("#logout", 5000, "Log Out");
    });

    it("Login - Invalid Password", () => {
      cy.clickButton("#forms");
      cy.waitForElement("#login", 5000, "Login");
      cy.clickButton("#login");
      cy.waitForURL("/auth_ecommerce.html");
      cy.waitForElement("#loginSection");
      cy.login(
        "#email",
        "admin@admin.com",
        "#password",
        "invalidpassword",
        "#submitLoginBtn",
      );
      cy.waitForElement(
        "#message",
        5000,
        "Bad credentials! Please try again! Make sure that you've registered.",
      );
    });

    it("Login - Invalid Email", () => {
      cy.clickButton("#forms");
      cy.waitForElement("#login", 5000, "Login");
      cy.clickButton("#login");
      cy.waitForURL("/auth_ecommerce.html");
      cy.waitForElement("#loginSection");
      cy.login(
        "#email",
        "invalidemail@example.com",
        "#password",
        "admin123",
        "#submitLoginBtn",
      );
      cy.waitForElement(
        "#message",
        5000,
        "Bad credentials! Please try again! Make sure that you've registered.",
      );
    });

    it("Login - Empty Fields", () => {
      cy.clickButton("#forms");
      cy.waitForElement("#login", 5000, "Login");
      cy.clickButton("#login");
      cy.waitForURL("/auth_ecommerce.html");
      cy.waitForElement("#loginSection");
      cy.clickButton("#submitLoginBtn");
      cy.waitForElement(
        "#message",
        5000,
        "Bad credentials! Please try again! Make sure that you've registered.",
      );
    });
  });

  context("Registration Scenarios", () => {
    it("Opens Forms Page: Registration - Success", () => {
      cy.clickButton("#forms");
      cy.waitForElement("#register", 5000, "Register");
      cy.clickButton("#register");
      cy.waitForURL("/register.html");
      cy.waitForElement("#registerForm");
      cy.fillInput("#firstName", data.firstName);
      cy.fillInput("#lastName", data.lastName);
      cy.fillInput("#phone", data.telephoneNumber);
      cy.selectOption("#countries_dropdown_menu", "United Kingdom");
      cy.fillInput("#emailAddress", data.emailAddress);
      cy.fillInput("#password", data.password);
      cy.checkCheckbox("#exampleCheck1");
      cy.clickButton("#registerBtn");
      cy.waitForElement(
        "#message",
        5000,
        "The account has been successfully created!",
      );
    });
  });
});
