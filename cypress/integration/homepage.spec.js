describe("Login The App", () => {
    beforeEach(() =>{
      cy.login("email2@gmail.com", "password");
      cy.visit("http://localhost:3000")
    })
    it("Sucessfully Logged In",() =>{
      cy.url().should("include","/homepage")
    })
    afterEach(() => {
        cy.Logout()
    })
  });
  