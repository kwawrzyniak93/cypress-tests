describe("Login", () => {
  beforeEach(() => {
    cy.viewport(1440, 768);
    cy.visit("https://www.morele.net/login");
    cy.get('[data-action="cookie-consent#onApproveAll"]').click();
    // as of 30.10.2024 page is throwing uncaught exception, ignoring it.
    cy.on("uncaught:exception", (err) => {
      if (err.message.includes("header is not defined")) {
        return false;
      }
    });
  });

  it("Sign in", () => {
    cy.get("#username").type("test@mail.com");
    cy.get("#password-log").type("password123!");
    cy.get("#login-container")
      .find('button[type="submit"]')
      .should("be.enabled")
      .click();
    cy.get("div.morele-notify-container div.mn-body")
      .should("be.visible")
      .should("contain", "Dane logowania nie są poprawne");
    cy.get("div.morele-notify-container div.mn-close").click();
    cy.get("div.morele-notify-container div.mn-body").should("not.exist");
  });

  it("Click on the main page", () => {
    cy.get(".logo > a > img").click();
    cy.location("pathname").should("eq", "/");
  });

  it("Register not visible", () => {
    cy.get("#user_userEmail").should("not.be.visible");
  });
});
