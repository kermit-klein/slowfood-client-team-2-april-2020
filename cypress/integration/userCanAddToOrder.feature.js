describe("User can add a product to their order", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/menu_items",
      response: "fixture:menu_list_index.json",
    });

    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/orders",
      response: { message: "The product has been added to your order" },
    });
  });

  it("user gets confirmation message when adding a product to order", () => {
    cy.visit("/");
    cy.get("#menu-item-1").within(() => {
      cy.get("button").contains("Add to order").click();
      cy.get(".message").should(
        "contain",
        "The product has been added to your order"
      );
    });
    cy.get("#menu-item-2").within(() => {
      cy.get("button").contains("Add to order").click();
      cy.get(".message").should(
        "contain",
        "The product has been added to your order"
      );
    });
  });
});
