import { test } from "@playwright/test";
import { Facade } from "../facade/facade.page";

test("Add item to cart", async ({ page }) => {
  const facade = new Facade(page);
  await facade.loginAndVerify();
  await facade.addItemToCart();
  await facade.checkCartItemCount(1);
});

test("Remove item from cart", async ({ page }) => {
  const facade = new Facade(page);
  await facade.loginAndVerify();
  await facade.addItemToCart();
  await facade.removeItemFromCart();
  await facade.cartIsEmpty();
});
