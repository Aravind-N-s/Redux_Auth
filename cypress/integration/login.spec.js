import moduleName from "module";
describe("Test App without crash", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.url().should("include", "/users/login");
  });
  it("Initial Redirect Of App", () => {
    cy.get("label").and($value => {
      expect($value[0].textContent).to.equal("Email address");
      expect($value[1].textContent).to.equal("Password");
    });
    cy.get("small").contains(`We'll Never Share Your Email With Anyone Else`);
    cy.contains("Submit");
  });
  it("Blank Username And Password", () => {
    cy.contains("Submit").click();
    cy.get("h4")
      .should("have.length", "2")
      .and($text => {
        expect($text[0].textContent).to.equal("Please Check The Email Format");
        expect($text[1].textContent).to.equal("Password Cannot Be Empty");
      });
  });
  it("Invalid email format should throw error", () => {
    cy.get("input[name='email']").type("email2@gmail");
    cy.get("input[name='password']").type("password");
    cy.Button("Submit").click();
    cy.Error("Please Check The Email Format");
  });
  it("Should login to the App with no error messages", () => {
    cy.get("input[name='email']").type("email2@gmail.com");
    cy.get("input[name='password']").type("password");
    cy.screenshot();
    cy.get("input[name=email]")
      .screenshot()
      .should("have", "email2@gmail");
  });
  it("Should show error on 500", () => {
    cy.get("input[name='email']").type("email2@gmail.com");
    cy.get("input[name='password']").type("password");
    cy.server();
    cy.route({
      method: "POST",
      url: "/user/login",
      status: 500,
      response: [{message: "invalid"}]
    }).as("urlRequest");
    cy.get("Button").click()
    cy.get('@urlRequest').then((resp) => {
      expect(resp).to.be.calledWith('alert')
    }).should("have.property","status").should("equal",500)
  });
  // it("Wrong Email")
});
