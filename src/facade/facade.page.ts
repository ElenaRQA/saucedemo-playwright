import { LoginPage } from "../pages/login.page";
import { ItemsPage } from "../pages/items.page";
import { Page } from "@playwright/test";

export class Facade {
  constructor(private page: Page) {}

  async loginAndVerify() {
    const loginPage = new LoginPage(this.page);
    const itemsPage = new ItemsPage(this.page);

    await loginPage.goto();
    await loginPage.login(
      process.env.SAUCE_USERNAME!,
      process.env.SAUCE_PASSWORD!
    );
    await itemsPage.inventoryIsVisible();
  }

  async loginWithRandomCredentials(username: string, password: string) {
    const loginPage = new LoginPage(this.page);

    console.log("Attempting login with:", username, password);

    await loginPage.goto();
    await loginPage.login(username, password);
    await loginPage.errorIsVisible();
  }

  async addItemToCart() {
    const itemsPage = new ItemsPage(this.page);
    await itemsPage.addItemToCart();
  }

  async removeItemFromCart() {
    const itemsPage = new ItemsPage(this.page);
    await itemsPage.goToCart();
    await itemsPage.removeItemFromCart();
  }

  async checkCartItemCount(count: number) {
    const itemsPage = new ItemsPage(this.page);
    await itemsPage.checkCartItemCount(count);
  }

  async cartIsEmpty() {
    const itemsPage = new ItemsPage(this.page);
    await itemsPage.cartIsEmpty();
  }
}
