describe("User can add a product to their order", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/menu_items",
      response: "fixture:menu_list_index.json",
    });

    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/orders",
      response: {
        message: "The product has been added to your order",
        order_id: 1,
      },
    });

    cy.route({
      method: "PUT",
      url: "http://localhost:3000/api/v1/orders/1",
      response: {
        message: "The product has been added to your order",
        order_id: 1,
      },
    });
  });
  describe("user can add multiple products", () => {
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
  describe("user can add multiple products ", () => {
    it("and view its content", () => {
      cy.visit("/");
      cy.get("button").contains("View order").should("not.exist");
      cy.get("#menu-item-1").within(() => {
        cy.get("button").contains("Add to order").click();
        cy.get(".message").should(
          "contain",
          "The product has been added to your order"
        );
      });

      cy.get("button").contains("View order").should("exist");
      cy.get("#menu-item-2").within(() => {
        cy.get("button").contains("Add to order").click();
        cy.get(".message").should(
          "contain",
          "The product has been added to your order"
        );
      });
    });
  });
});
