import { Page } from "@playwright/test";
import { Person } from "../dto/person.dto";

const usernameInput = '[data-test="username"]';
const passwordInput = '[data-test="password"]';
const loginButton = '[data-test="login-button"]';
const errorMessage = '[data-test="error"]';

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

  async loginWithDTO(user: Person) {
    await this.login(user.username, user.password);
  }

  async loginWithoutCreds() {
    await this.page.fill(usernameInput, "");
    await this.page.fill(passwordInput, "");
    await this.page.click(loginButton);
  }

  getLoginError() {
    return this.page.locator(errorMessage);
  }
}
