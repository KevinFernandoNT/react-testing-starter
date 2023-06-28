describe("payment", () => {
  it("Create payment transaction", () => {
    //Login
    cy.visit("http://localhost:3000/signin");
    cy.findByRole("textbox", { name: /username/i }).type("kevin123");
    cy.findByLabelText(/password/i).type("kevin@123");
    cy.findByRole("button", /sign in/i).click();

    //Check Balance
    let oldBalance;
    cy.get('[data-test="sidenav-user-balance"]')
      .invoke("text")
      .then((value) => {
        oldBalance = Math.floor(value.split("$")[1]);

        //You could do a validation in this function
        // if (oldBalance != 0) {
        //   cy.findByRole("button", { name: /new/i }).click();
        // }
      });

    //create new transaction
    cy.findByRole("button", { name: /new/i }).click();

    //search for a user
    cy.findByPlaceholderText(/search/i).type("jhon doe");

    //go to user transaction page
    cy.findByText(/john doe/i).click();

    cy.findByRole("pay").should("be.disabled");

    cy.findByPlaceholderText(/amount/i).type("50");

    cy.findByPlaceholderText(/add a note/i).type("Test transaction");

    cy.findByRole("pay").should("be.enabled");

    cy.findByRole("pay").click();

    cy.findByRole("button", { name: /return to transactions/i }).click();
  });
});
