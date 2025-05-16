import { Page, expect } from "@playwright/test";
import { PageFactory } from "../factory/page.factory";
import { Person } from "../dto/person.dto";

export class Facade {
  page: Page;
  pageFactory: PageFactory;

  constructor(page: Page) {
    this.page = page;
    this.pageFactory = new PageFactory(page);
  }

  async loginAndCheckItemIsVisible(user: Person) {
    await this.pageFactory.loginPage.goto();
    await this.pageFactory.loginPage.loginWithDTO(user);
    await expect(this.pageFactory.itemsPage.inventoryTitle()).toBeVisible();
  }
}
