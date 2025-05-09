import { test } from "@playwright/test";
import { Facade } from "../facade/facade.page";
import { FakerDTO } from "../dto/faker.dto";

test("Login and verify inventory", async ({ page }) => {
  const facade = new Facade(page);
  await facade.loginAndVerify();
});

test("Login fails with random invalid credentials", async ({ page }) => {
  const facade = new Facade(page);
  const randomUsername = FakerDTO.username;
  const randomPassword = FakerDTO.password;

  console.log("Attempting login with:", randomUsername, randomPassword);
  await facade.loginWithRandomCredentials(randomUsername, randomPassword);
});
