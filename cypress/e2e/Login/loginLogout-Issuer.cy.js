describe("Login Test IDO Issuer", () => {
  it("Successfully visit login page of IDO Issuer website", () => {
    cy.visit("https://dev-ido.nvx.co.id/");
    cy.get('a[href="/issuer-login"]').contains("Login as Issuer").click();
    cy.url().should("contain", "/issuer-login");
    cy.get('input[type="email"]')
      .clear()
      .should("have.attr", "placeholder")
      .and("contain", "loremipsum@mail.com");
    cy.get('input[type="password"]')
      .clear()
      .should("have.attr", "placeholder")
      .and("contain", "********");
    cy.get('button[class*="w-5 h-5"]')
      .should("be.visible")
      .and("not.be.disabled");
    cy.get('[style="width: 304px; height: 78px;"] > div > iframe').should(
      "not.be.checked"
    );
    cy.get('a[href="/issuer-forgot"]')
      .contains("Forgot password?")
      .should("be.visible")
      .and("not.be.disabled");
    cy.get('button[class*="w-[436px] h-[40px] flex"]')
      .should("contain", "Login")
      .and("not.be.disabled");
  });

  it("Successfully login to IDO Issuer website", () => {
    cy.visit("https://dev-ido.nvx.co.id/issuer-login");
    cy.url().should("contain", "/issuer-login");
    cy.get('input[type="email"]').type("regitatester@gmail.com");
    cy.get('input[type="password"]').type("password123");
    cy.get('[style="width: 304px; height: 78px;"] > div > iframe').click();
    cy.pause();
    cy.get('button[class*="w-[436px] h-[40px] flex"]').click();
    cy.url().should("contain", "/dashboard");
    cy.get("h1.text-xl.font-medium").should("contain.text", "Dashboard");
    cy.get("h1.text-xl.font-medium").should("contain.text", "Your portfolio");
  });

  it("Confirm mandatory fields on login page of IDO Issuer website", () => {
    cy.visit("https://dev-ido.nvx.co.id/issuer-login");
    cy.url().should("contain", "/issuer-login");
    cy.get('input[type="email"]').clear();
    cy.get('input[type="password"]').clear();
    cy.get('[style="width: 304px; height: 78px;"] > div > iframe').should(
      "not.be.checked"
    );
    cy.get('button[class*="w-[436px] h-[40px] flex"]').click();
    cy.get(":nth-child(1) > .text-red-500").should(
      "contain",
      "Email is required"
    );
    cy.get(":nth-child(2) > .text-red-500").should(
      "contain",
      "Password is required"
    );
    cy.get(".gap-4 > .text-center").should(
      "contain",
      "Please complete the reCAPTCHA"
    );
  });

  it("Confirm failed login to IDO Issuer website due to incorrect credentials", () => {
    cy.loginIssuer("regitatester@gmail.com", "passwordabc");
    cy.get(".text-red-500").should(
      "contain",
      "The user credentials were incorrect."
    );
  });

  it("Confirm failed login to IDO Issuer website due to invalid email format", () => {
    cy.loginIssuer("regitatester@gmail", "password123");
    cy.get(".text-red-500").should("contain", "Invalid email format");
  });
});

describe("Logout Test IDO Issuer", () => {
  it("Successfully logout from IDO Issuer website", () => {
    cy.loginIssuer("regitatester@gmail.com", "password123");
    cy.url().should("contain", "/dashboard");
    cy.get(".w-6 > .w-full").should("be.visible").click();
    cy.contains("h1", "Logout").click();
    cy.url().should("contain", "dev-ido.nvx.co.id");
    cy.get('a[href="/issuer-login"]')
      .contains("Login as Issuer")
      .should("be.visible")
      .and("not.be.disabled");
  });
});

describe("Confirm reset password login Test IDO Issuer", () => {
  it("Successfully reset password", () => {
    cy.visit("https://dev-ido.nvx.co.id/issuer-login");
    cy.url().should("contain", "/issuer-login");
    cy.get('a[href="/issuer-forgot"]').contains("Forgot password?").click();
    cy.url().should("contain", "/issuer-forgot");
    cy.get(".text-xl").should("contain.text", "Forgot your password?");
    cy.get(".font-light").should(
      "contain.text",
      "Enter your email address to get a link reset your password."
    );
    cy.get(".text-center > .text-sm").should("not.be.disabled");
    cy.get('input[type="email"]').clear().type("regitatester@gmail.com");
    cy.get('button[class*="w-[436px] h-[40px] flex"]')
      .contains("Send email")
      .click();
    cy.get("#modal-title").should("contain", "Recovery email has been sent");
    cy.get(".mt-3 > .mt-2   > .text-sm").should(
      "contain",
      "Please check your email inbox and click the link to recover your password."
    );
    cy.get('button[type="button"]')
      .contains("Close")
      .should("be.visible")
      .and("not.be.disabled");
  });
});
