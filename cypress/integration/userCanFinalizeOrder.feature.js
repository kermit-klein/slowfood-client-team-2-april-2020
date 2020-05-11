describe("User can add products and finalize order", () => {
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
      response: "fixture:post_response.json",
    });

    cy.route({
      method: "PUT",
      url: "http://localhost:3000/api/v1/orders/1",
      response: "fixture:put_response.json",
    });
    cy.visit("/menu");
  });

  describe("user can add multiple products ", () => {
    it("user can finalize the order", () => {
      cy.get("a").contains("Main Course").click();
      cy.get("#menu-item-1").within(() => {
        cy.get("button").contains("Add to order").click();
      });
      cy.get("#menu-item-2").within(() => {
        cy.get("button").contains("Add to order").click();
      });
      cy.get("button").contains("View order").click();
      cy.route({
        method: "PUT",
        url: "http://localhost:3000/api/v1/orders/1",
        response: { message: "Your order will be ready in 30 minutes!" },
      });
      cy.get("button").contains("Confirm!").click();
      cy.get(".message").should(
        "contain",
        "Your order will be ready in 30 minutes!"
      );
    });
  });
});
