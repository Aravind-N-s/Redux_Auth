// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (email, password) => {
  cy.request({
    method: "POST",
    url: "user/login",
    body: {
      email: email,
      password: password
    }
  }).then(resp => {
    const { token } = resp.body;
    return window.localStorage.setItem('userAuthToken', token);
  });
  cy.visit()
  // .catch((err)=>{
  //     console.log(err)
  // })
});

Cypress.Commands.add("Button",(type) => {
  cy.contains(type)
})

Cypress.Commands.add("Error",(message) => {
  cy.get("h4").contains(message)
})

Cypress.Commands.add("Logout",(message) =>{
  window.localStorage.removeItem("userAuthToken")
})
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
