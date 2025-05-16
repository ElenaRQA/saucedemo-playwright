import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { ItemsPage } from "../pages/items.page";
import { CheckoutPage } from "../pages/checkout.page";
import { FakerCheckoutDTO, PersonDTO } from "../dto/person.dto";

test.describe("Checkout tests", () => {
  let loginPage: LoginPage;
  let itemsPage: ItemsPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    itemsPage = new ItemsPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
    await loginPage.login(PersonDTO.username, PersonDTO.password);
  });

  test("Checkout with random valid data", async () => {
    await itemsPage.addBackpackToCart();
    await itemsPage.openCart();
    await checkoutPage.checkoutOpen();
    await checkoutPage.fillCheckoutForm(FakerCheckoutDTO);
    await checkoutPage.submitCheckoutForm();
    await checkoutPage.finishCheckout();
  });

  test("Checkout with blank fields", async () => {
    await itemsPage.openCart();
    await checkoutPage.checkoutOpen();
    await checkoutPage.submitCheckoutForm();
    await expect(checkoutPage.getCheckoutError()).toContainText(
      "Error: First Name is required"
    );
  });
});
