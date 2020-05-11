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
      response: "fixture:post_response.json",
    });

    cy.route({
      method: "PUT",
      url: "http://localhost:3000/api/v1/orders/1",
      response: "fixture:put_response.json",
    });
  });

  describe("user can add multiple products", () => {
    it("user gets confirmation message when adding a product to order", () => {
      cy.visit("/menu");
      cy.get("a").contains("Main Course").click();
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
    it("and view order details", () => {
      cy.visit("/menu");
      cy.get("button").contains("View order").should("not.exist");
      cy.get("#menu-item-5").within(() => {
        cy.get("button").contains("Add to order").click();
        cy.get(".message").should(
          "contain",
          "The product has been added to your order"
        );
      });

      cy.get("button").contains("View order").should("exist");
      cy.get("button").contains("View order").click();
      cy.get("#order-details").within(() => {
        cy.get("li")
          .should("have.length", 1)
          .first()
          .should("have.text", "1 x Salad");
      });
      cy.get("#total-amount").should("contain", "4");

      cy.get("a").contains("Main Course").click();
      cy.get("#menu-item-2").within(() => {
        cy.get("button").contains("Add to order").click();
        cy.get(".message").should(
          "contain",
          "The product has been added to your order"
        );
      });

      cy.get("#order-details").within(() => {
        cy.get("li")
          .should("have.length", 2)
          .first()
          .should("have.text", "1 x Salad")
          .next()
          .should("have.text", "1 x Ice Cream");
      });
      cy.get("#total-amount").should("contain", "7.75");
      cy.get("button").contains("View order").click();
      cy.get("#order-details").should("not.exist");
    });
  });
});
