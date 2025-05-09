import { Page } from "@playwright/test";

const inventoryItem = '[data-test="inventory_item"]';
const addToCartButton = '[data-test="add-to-cart-sauce-labs-backpack"]';
const removeFromCartButton = '[data-test="remove-sauce-labs-backpack"]';
const cartIcon = '[data-test="shopping-cart-link"]';
const cartCounter = '[data-test="shopping-cart-badge"]';
const cartItem = '[data-test="cart_item"]';
const checkoutButton = '[data-test="checkout"]';

export class ItemsPage {
  constructor(private page: Page) {}

  async inventoryIsVisible() {
    await this.page.isVisible(inventoryItem);
  }

  async addItemToCart() {
    await this.page.click(addToCartButton);
  }

  async goToCart() {
    await this.page.click(cartIcon);
  }

  async removeItemFromCart() {
    await this.page.click(removeFromCartButton);
  }

  async checkCartItemCount(count: number) {
    await this.page.waitForSelector(cartCounter);
    const cartCount = await this.page.locator(cartCounter).innerText();
    if (parseInt(cartCount) !== count) {
      throw new Error(
        `Expected cart count to be ${count}, but found ${cartCount}`
      );
    }
  }

  async cartIsEmpty() {
    await this.page.waitForSelector(cartItem, { state: "hidden" });
  }
}
