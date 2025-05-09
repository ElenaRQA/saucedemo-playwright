import { Page } from "@playwright/test";

const usernameInput = '[data-test="username"]';
const passwordInput = '[data-test="password"]';
const loginButton = '[data-test="login-button"]';
const errorMessage = '[data-test="error"]';
const inventoryItem = '[data-test="inventory_item"]';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/");
  }

  async login(username: string, password: string) {
    await this.page.fill(usernameInput, username);
    await this.page.fill(passwordInput, password);
    await this.page.click(loginButton);
  }

  async errorIsVisible() {
    await this.page.waitForSelector(errorMessage);
  }

  async inventoryIsVisible() {
    await this.page.waitForSelector(inventoryItem);
  }
}
