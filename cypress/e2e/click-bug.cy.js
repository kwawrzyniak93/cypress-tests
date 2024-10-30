describe("Cart", () => {
  it("works", () => {
    cy.viewport(1440, 900);
    cy.visit("https://www.morele.net/kategoria/lustrzanki-114/");
    cy.get('[data-action="cookie-consent#onApproveAll"]').click();

    cy.get(".cat-product").first().find("a.productLink").click();
    cy.get("h1.prod-name").should("contain", "Canon EOS 4000D");
  });

  it("works only with wait", () => {
    cy.viewport(1440, 900);
    cy.visit("https://www.morele.net/");
    cy.get('[data-action="cookie-consent#onApproveAll"]').click();

    cy.get("div.cn-bar ul.cn-current-departments").children().eq(6).as("foto");
    cy.get("@foto").trigger("mouseenter");
    cy.get("@foto").find(".cn-shop-window").should("be.visible");
    cy.get("@foto")
      .contains("li.cn-departments-menu-item", "Foto i kamery")
      .contains("Lustrzanki")
      .click();

    // cy.wait(2000);
    cy.get(".cat-product").first().find("a.productLink").click();
    cy.get("h1.prod-name").should("contain", "Canon EOS 4000D");
  });
});
