describe("Login Test IDO Investor", () => {
  it("Successfully visit login page of IDO Investor website", () => {
    cy.visit("https://dev-ido.nvx.co.id/");
    cy.get('a[href="/login"]').contains("Login as Investor").click();
    cy.get(".text-xl").contains("Login");
    cy.url().should("contain", "login");
    cy.get(":nth-child(1) > .font-medium").contains("Email");
    cy.get('input[type="email"]')
      .should("have.attr", "placeholder")
      .and("contain", "loremipsum@mail.com");
    cy.get('input[type="password"]')
      .should("have.attr", "placeholder")
      .and("contain", "********");
    cy.get('button[class*="w-5 h-5"]').should("be.visible").and("be.enabled");
    cy.get('[style="width: 304px; height: 78px;"] > div > iframe').should("not.be.checked");
    cy.get(".gap-4 > .text-center").contains("Dont have an account? Sign up");
    cy.get('a[href="/register"]').should("not.be.disabled");
    cy.get('button[class*="w-[436px] h-[40px] flex"]')
      .should("contain", "Login")
      .and("not.be.disabled");
    cy.get('button[class*="w-[436px] h-[40px] flex"]')
      .should("contain", "Login")
      .and("not.be.disabled");
  });

  it("Succesfully login to investor website as an investor", () => {
    cy.visit("https://dev-ido.nvx.co.id/");
    cy.get('a[href="/login"]').contains("Login as Investor").click();
    cy.get(".text-xl").contains("Login");
    cy.url().should("contain", "login");
    cy.get('input[type="email"]').type("alice.johnson@example.com");
    cy.get('input[type="password"]').type("password789");
    cy.pause();
    cy.get('button[class*="w-[436px] h-[40px] flex"]').click();
    cy.url().should("contain", "/dashboard");
    cy.get("h1.text-xl.font-medium").should("contain.text", "Dashboard");
    cy.get("p.text-neutral-600.text-sm").should(
      "contain.text",
      "Total investment"
    );
    cy.get('p[class*="text-neutral-600 text-sm font-normal mb-3"]').should("contain.text", "Wallet balance");
    cy.get("p.font-normal.mb-3").should("contain.text", "Total asset");
    cy.get("h1.text-xl.font-medium").should("contain.text", "Your portfolio");
  });

  it("User input a wrong email and password", () => {
    cy.visit("https://dev-ido.nvx.co.id/");
    cy.get('a[href="/login"]').contains("Login as Investor").click();
    cy.get(".text-xl").contains("Login");
    cy.url().should("contain", "login");
    cy.get('input[type="email"]').type("Wrongemail@example.com");
    cy.get('input[type="password"]').type("WrongPasssword");
    cy.pause();
    cy.get('button[class*="w-[436px] h-[40px] flex"]').click();
    cy.get('div[class="w-[328px] h-fit flex items-center -ms-3 shadow-md bg-white rounded-lg overflow-hidden"]')
      .should("be.visible")
      .and("contain.text", "Invalid Email / Password")
  })

  it("User login with blank space in field", () => {
    cy.visit("https://dev-ido.nvx.co.id/");
    cy.get('a[href="/login"]').contains("Login as Investor").click();
    cy.get('button[class*="w-[436px] h-[40px] flex"]').click();
    cy.get('p[class="text-center text-sm text-red-500"]')
  })
  
  it("Confirm failed login to IDO Issuer website due to invalid email format", () => {
    cy.loginInvestor("robby", "1234567890");
    cy.get(".text-red-500").should("contain", "Invalid email format");
  });
})

describe("logout as an Investor", () => {
  it("Successfully visit login page of IDO Investor website", () => {
    cy.loginInvestor("alice.johnson@example.com", "password789");
    cy.get('.w-6 > .w-full').click();
    cy.contains("h1", "Logout").click();
    cy.url().should("contain", "dev-ido.nvx.co.id");
  })
})