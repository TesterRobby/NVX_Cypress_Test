describe.skip("Login Test IDO Investor", () => {
  it("Succesfully login to investor website as an investor", () => {
    cy.visit("https://dev-ido.nvx.co.id/");
    cy.get('span').click()
    cy.get('[href="/login"]').click()
    cy.get('input[type="email"]').type("john.doe@example.com");
    cy.get('input[type="password"]').type("password123");
    cy.get('button[class*="w-[436px] h-[40px] flex"]').click();
    cy.url().should("contain", "/dashboard");
  });

  it("User input a wrong email and password", () => {
    cy.loginInvestor("invalidemail@gmail.com","wrongpassword")
    cy.get('p[class="w-full text-neutral-700 text-sm font-normal capitalize"]').contains("Invalid Email / Password")
  })

  it("User login with blank space in field", () => {
    cy.loginInvestor(" "," ")
    cy.get('p[class="text-red-500 text-sm font-light"]').contains("Email required")
  })
  
  it("Confirm failed login to IDO Issuer website due to invalid email format", () => {
    cy.loginInvestor("robby", "1234567890");
    cy.get(".text-red-500").should("contain", "Invalid email format");
  });
})

describe("logout as an Investor", () => {
  it("Successfully visit login page of IDO Investor website", () => {
    cy.loginInvestor("john.doe@example.com", "password123");
    cy.get('.setting-button').click()
    cy.get('.setting-button > .bg-white > :nth-child(2)').click()
    cy.url().should("contain", "dev-ido")
  })
})