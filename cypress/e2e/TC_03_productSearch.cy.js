describe("ProductSearch", () => {
  beforeEach(() => {
    cy.viewport(1536, 960);
    cy.visit("https://www.morele.net");
    cy.get('[data-action="cookie-consent#onApproveAll"]').click();
  });

  // this test is just for demonstration, it will stop working when all iPhones 15 will be sold out.
  it("Search for a product and visit a product page", () => {
    cy.get(".h-quick-search")
      .find("input.quick-search-autocomplete")
      .type("iPhone 15{enter}");
    cy.get(".cat-product")
      .first()
      .find("a.productLink")
      .then((link) => {
        cy.visit(link[0].href);
      });
    cy.get("h1.prod-name").should("contain", "iPhone 15");
  });
});
