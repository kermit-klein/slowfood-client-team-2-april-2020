describe("User can see menu", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/menu_items",
      response: "fixture:menu_list_index.json",
    });
  });

  // it("shows first item", () => {
  //   cy.visit("/");
  //   cy.get("#menu-item-1").within(() => {
  //     cy.contains("Pizza");
  //     cy.contains("Best pizza");
  //     cy.contains("55");
  //   });
  // });

  // it("shows second item", () => {
  //   cy.visit("/");
  //   cy.get("#menu-item-2").within(() => {
  //     cy.contains("Cheeseburger");
  //     cy.contains("Best burger");
  //     cy.contains("70");
  //   });
  // });

  it("User can select main dishes", () => {
    cy.visit("/");
    cy.get("#main-dish").click();
    cy.get("#menu-item-1").within(() => {
      cy.contains("Pizza");
      cy.contains("Best pizza");
      cy.contains("55");
    });
  });

  it("User can select drinks", () => {
    cy.visit("/");
    cy.get("#drinks").click();
    cy.get("#menu-item-1").within(() => {
      cy.contains("Coke");
      cy.contains("Best COKE");
      cy.contains("20");
    });
  });
});
