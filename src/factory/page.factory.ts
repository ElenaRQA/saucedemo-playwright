import { Page } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { ItemsPage } from "../pages/items.page";
import { CheckoutPage } from "../pages/checkout.page";

export class PageFactory {
  readonly loginPage: LoginPage;
  readonly itemsPage: ItemsPage;
  readonly checkoutPage: CheckoutPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.itemsPage = new ItemsPage(page);
    this.checkoutPage = new CheckoutPage(page);
  }
}
