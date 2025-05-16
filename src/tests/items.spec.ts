import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { ItemsPage } from "../pages/items.page";
import { PersonDTO } from "../dto/person.dto";

test.describe("Inventory and Cart tests", () => {
  let loginPage: LoginPage;
  let itemsPage: ItemsPage;
  const productName = "Sauce Labs Backpack";

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    itemsPage = new ItemsPage(page);
    await loginPage.goto();
    await loginPage.login(PersonDTO.username, PersonDTO.password);
  });

  test("Add item to cart and verify count", async () => {
    await itemsPage.addBackpackToCart();
    await itemsPage.checkCartItemCount(1);
  });

  test("Remove item from cart and verify empty cart", async () => {
    await itemsPage.addBackpackToCart();
    await itemsPage.removeBackpackFromCart();
    await itemsPage.cartIsEmpty();
  });

  test("Open item card, check content and go back to products by two ways", async ({
    page,
  }) => {
    await itemsPage.openItemByName(productName);
    await itemsPage.expectItemDetails();
    await itemsPage.backToProducts();
    await expect(page).toHaveURL(/inventory\.html/);
    await itemsPage.openItemByName(productName);
    await itemsPage.openAllItemsViaMenu();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test("Check items filtering", async () => {
    await itemsPage.selectSortOption("za");
    const names = await itemsPage.getItemNames();
    expect(names).toEqual([...names].sort().reverse());

    await itemsPage.selectSortOption("lohi");
    const pricesAsc = await itemsPage.getItemPrices();
    expect(pricesAsc).toEqual([...pricesAsc].sort((a, b) => a - b));

    await itemsPage.selectSortOption("hilo");
    const pricesDesc = await itemsPage.getItemPrices();
    expect(pricesDesc).toEqual([...pricesDesc].sort((a, b) => b - a));
  });

  test("Check Reset App State functionality", async () => {
    await itemsPage.addBackpackToCart();
    await itemsPage.checkCartItemCount(1);
    await itemsPage.checkResetAppState();
    await itemsPage.openCart();
    await itemsPage.cartIsEmpty();
  });
});
