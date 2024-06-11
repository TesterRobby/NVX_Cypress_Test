describe("Login Test IDO Investor", () => {
  it.skip("Successfully visit login page of IDO Investor website", () => {
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
    cy.get('[style="width: 304px; height: 78px;"] > div > iframe').should(
      "not.be.checked"
    );
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
    cy.get("p.font-normal.mb-3").should("contain.text", "Wallet balance");
    cy.get("p.text-sm.font-normal.mb-3").should("contain.text", "Total asset");
    cy.get("h1.text-xl.font-medium").should("contain.text", "Your portfolio");
  });
});
