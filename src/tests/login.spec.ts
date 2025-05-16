import { test, expect } from "@playwright/test";
import { Facade } from "../facade/facade.page";
import { PersonDTO, getPerson } from "../dto/person.dto";
import { LoginPage } from "../pages/login.page";

test.describe("Login page tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("Login and verify inventory via Facade", async ({ page }) => {
    const facade = new Facade(page);
    await facade.loginAndCheckItemIsVisible(PersonDTO);
  });

  test("Login with blank fields", async () => {
    await loginPage.loginWithoutCreds();
    await expect(loginPage.getLoginError()).toContainText(
      "Epic sadface: Username is required"
    );
  });

  test("Login with random user to get an error", async () => {
    const fakeUser = getPerson();
    await loginPage.login(fakeUser.username, fakeUser.password);
    await expect(loginPage.getLoginError()).toContainText(
      "Epic sadface: Username and password do not match any user"
    );
  });
});
