describe("User can see menu", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3001/api/v1/menu_items",
      response: "fixture:menu_list_index.json",
    });
  });

  it("User can select main dishes", () => {
    cy.visit("/");
    cy.get("a").contains("Main Dish").click();
    cy.get("#menu-item-1").within(() => {
      cy.contains("Pizza");
      cy.contains("Best pizza");
      cy.contains("55");
    });
  });

  it("User can select drinks", () => {
    cy.visit("/");
    cy.get("a").contains("Drinks").click();
    cy.get("#menu-item-3").within(() => {
      cy.contains("Coke");
      cy.contains("Best COKE");
      cy.contains("20");
    });
  });
});
