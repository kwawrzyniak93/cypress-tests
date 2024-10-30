describe("Cart", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
    cy.visit("https://www.morele.net/");
    cy.get('[data-action="cookie-consent#onApproveAll"]').click();
  });

  it("Select category based on position in the list", () => {
    // hover "Laptopy"
    cy.get("div.cn-bar ul.cn-current-departments")
      .children()
      .first()
      .trigger("mouseenter");
    cy.get("div.cn-bar ul.cn-current-departments")
      .children()
      .first()
      .find(".cn-shop-window")
      .should("be.visible");
    // click on "Tablety poleasingowe"
    cy.get("div.cn-bar ul.cn-current-departments")
      .children()
      .first()
      .find(".cn-shop-window .cn-rows > ul")
      .first()
      .children()
      .first()
      .find("ul > li")
      .eq(4)
      .click();
    cy.location("pathname").should(
      "eq",
      "/kategoria/tablety-poleasingowe-12379/",
    );
  });

  it("Select category based on position in the list - using alias", () => {
    cy.get("div.cn-bar ul.cn-current-departments")
      .children()
      .first()
      .as("laptops");
    // hover "Laptopy"
    cy.get("@laptops").trigger("mouseenter");
    cy.get("@laptops").find(".cn-shop-window").should("be.visible");
    // click on "Tablety poleasingowe"
    cy.get("@laptops")
      .find(".cn-shop-window .cn-rows > ul")
      .first()
      .children()
      .first()
      .find("ul > li")
      .eq(4)
      .click();
    cy.location("pathname").should(
      "eq",
      "/kategoria/tablety-poleasingowe-12379/",
    );
  });

  it("Select category based on displayed text", () => {
    cy.get("div.cn-bar ul.cn-current-departments")
      .contains("li.cn-departments-menu-item", "Komputery")
      .as("computers");
    cy.get("@computers").trigger("mouseenter");
    cy.get("@computers").find(".cn-shop-window").should("be.visible");
    cy.get("@computers").contains("Słuchawki dokanałowe").click();
    cy.location("pathname").should(
      "eq",
      "/kategoria/sluchawki-dokanalowe-457/",
    );
  });

  it("Add product to cart", () => {
    cy.get("div.cn-bar ul.cn-current-departments").children().eq(6).as("foto");
    cy.get("@foto").trigger("mouseenter");
    cy.get("@foto").find(".cn-shop-window").should("be.visible");
    cy.get("@foto")
      .find(".cn-shop-window .cn-rows > ul")
      .first()
      .children()
      .first()
      .find("ul > li")
      .first()
      .click();
    cy.location("pathname").should("eq", "/kategoria/lustrzanki-114/");

    cy.get(".cat-product")
      .first()
      .find("a.productLink")
      .should("be.visible")
      .then((productLink) => {
        const productDisplayName = productLink.text().trim();
        cy.get(".cat-product").first().find("a.productLink").wait(2000).click();
        // for some reason this works only with wait, alternative solution:
        // cy.get('.cat-product').first().find('a.productLink').then(link => {
        //     cy.visit(link[0].href);
        // });
        cy.get("h1.prod-name").should("contain", productDisplayName);
        cy.get('button[data-tracking-event-param="add_to_cart"]')
          .wait(2000)
          .click();
        cy.get("div.product-title").should("contain", productDisplayName);
      });
  });
});
