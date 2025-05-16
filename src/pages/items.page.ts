import { Page, expect } from "@playwright/test";

const inventoryList = '[data-test="inventory-list"]';
const addToCartFromItemCardButton = '[data-test="add-to-cart"]';
const addToCartButton = '[data-test="add-to-cart-sauce-labs-backpack"]';
const removeFromCartButton = '[data-test="remove-sauce-labs-backpack"]';
const itemImage = '[data-test="item-sauce-labs-backpack-img"]';
const itemName = '[data-test="inventory-item-name"]';
const itemDesc = '[data-test="inventory-item-desc"]';
const itemPrice = '[data-test="inventory-item-price"]';
const cartIcon = '[data-test="shopping-cart-link"]';
const cartCounter = '[data-test="shopping-cart-badge"]';
const cartItem = '[data-test="cart-item"]';
const filterIcon = '[data-test="product-sort-container"]';
const burgerMenuButton = "#react-burger-menu-btn";
const allItemsLink = '[data-test="inventory-sidebar-link"]';
const resetAppStateLink = '[data-test="reset-sidebar-link"]';
const backToProductsButton = '[data-test="back-to-products"]';

export class ItemsPage {
  constructor(private page: Page) {}

  inventoryTitle() {
    return this.page.locator(inventoryList);
  }

  async addBackpackToCart() {
    await this.page.click(addToCartButton);
  }

  async removeBackpackFromCart() {
    await this.page.click(removeFromCartButton);
  }

  async openCart() {
    await this.page.click(cartIcon);
  }

  async cartIsEmpty() {
    await this.page.waitForSelector(cartItem, { state: "hidden" });
  }

  async checkCartItemCount(count: number) {
    const badge = this.page.locator(cartCounter);
    await badge.waitFor();
    const actual = await badge.innerText();
    if (parseInt(actual) !== count) {
      throw new Error(`Expected cart count: ${count}, got: ${actual}`);
    }
  }

  async openItemByName(name: string) {
    await this.page.locator(itemName).filter({ hasText: name }).click();
  }

  async expectItemDetails() {
    await expect(this.page.locator(itemImage)).toBeVisible();
    await expect(this.page.locator(itemName)).toBeVisible();
    await expect(this.page.locator(itemDesc)).toBeVisible();
    await expect(this.page.locator(itemPrice)).toBeVisible();
    await expect(this.page.locator(addToCartFromItemCardButton)).toBeVisible();
  }

  async backToProducts() {
    await this.page.click(backToProductsButton);
  }

  async openAllItemsViaMenu() {
    await this.page.click(burgerMenuButton);
    await this.page.click(allItemsLink);
  }

  async checkResetAppState() {
    await this.page.click(burgerMenuButton);
    await this.page.click(resetAppStateLink);
  }

  async selectSortOption(value: string) {
    await this.page.selectOption(filterIcon, value);
  }

  async getItemNames(): Promise<string[]> {
    return await this.page.locator(itemName).allInnerTexts();
  }

  async getItemPrices(): Promise<number[]> {
    const priceStrings = await this.page.locator(itemPrice).allInnerTexts();
    return priceStrings.map((text) => parseFloat(text.replace("$", "")));
  }
}
