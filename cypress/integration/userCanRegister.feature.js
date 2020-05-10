describe("user can register", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/");
  });

  it("with no problem", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth",
      response: "fixture:register.json",
      headers: {
        uid: "user@mail.com",
      },
    });

    cy.get("#signup").click();
    cy.get("#register-form").within(() => {
      cy.get("#email").type("user@email.com");
      cy.get("#password").type("password");
      cy.get("#password-confirmation").type("password");
      cy.get("#submit").click();
    });
    cy.get("#logout-btn").contains("user@mail.com");
  });

  it("with problem", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth",
      response: "fixture:register.json",
      status: "401",
      response: {
        errors: ["Invalid entries, Please try again"],
        success: false,
      },
    });

    cy.get("#signup").click();
    cy.get("#register-form").within(() => {
      cy.get("#email").type("user@email.com");
      cy.get("#password").type("password");
      cy.get("#password-confirmation").type("password123");
      cy.get("#submit").click();
    });
    cy.get("#login-message").contains("Invalid entries, Please try again");
  });
});
