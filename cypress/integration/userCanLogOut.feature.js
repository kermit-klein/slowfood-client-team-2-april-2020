describe("User can logout", () => {
  beforeEach(() => {
    cy.server();
  });

  it("before, logs in", () => {
    cy.visit("/");
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/sign_in",
      response: "fixture:login.json",
      headers: {
        uid: "user@mail.com",
      },
    });
    cy.get("#signup").click();
    cy.get("#login-form").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("password");
      cy.get("#submit").contains("Submit").click();
    });
    cy.get("#logout-btn").should("contain", "Logout user@mail.com");
  });

  it("after, logs out", () => {
    cy.route({
      method: "DELETE",
      url: "http://localhost:3000/api/v1/auth/sign_out",
      response: "fixture:logout.json",
    });
    cy.get("#logout-btn").click();
    cy.get("#signup").should("contain", "Sign up");
  });
});
