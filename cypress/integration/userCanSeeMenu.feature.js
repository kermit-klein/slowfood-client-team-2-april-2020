describe("User can see menu", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/menu_items",
      response: "fixture:menu_list_index.json",
    });
  });
  it("shows first item", () => {
    cy.visit("/");
    cy.get("#menu-item-1").within(() => {
      cy.contains("Pizza");
      cy.contains("Best pizza");
      cy.contains("55");
    });
  });

  it("shows second item", () => {
    cy.visit("/");
    cy.get("#menu-item-2").within(() => {
      cy.contains("Cheeseburger");
      cy.contains("Best burger");
      cy.contains("70");
    });
  });
});
