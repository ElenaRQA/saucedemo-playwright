import { test, expect } from "@playwright/test";
import { PageFactory } from "../factory/page.factory";
import { Facade } from "../facade/facade.page";
import { PersonDTO, FakerCheckoutDTO } from "../dto/person.dto";

test.describe("Complete Purchase Flow", () => {
  let pf: PageFactory;
  let facade: Facade;

  test.beforeEach(async ({ page }) => {
    pf = new PageFactory(page);
    facade = new Facade(page);
  });

  test("User logs in, sorts products, adds to cart, and completes purchase", async () => {
    await facade.loginAndCheckItemIsVisible(PersonDTO);

    await pf.itemsPage.selectSortOption("lohi");
    const prices = await pf.itemsPage.getItemPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));

    await pf.itemsPage.addBackpackToCart();
    await pf.itemsPage.addAnother("sauce-labs-bike-light");
    await pf.itemsPage.checkCartItemCount(2);

    await pf.itemsPage.openCart();
    await pf.itemsPage.checkCartItemCount(2);

    await pf.checkoutPage.checkoutOpen();
    await pf.checkoutPage.fillCheckoutForm(FakerCheckoutDTO);

    await expect(pf.checkoutPage.getFirstNameField()).toHaveValue(
      FakerCheckoutDTO.firstName
    );
    await expect(pf.checkoutPage.getLastNameField()).toHaveValue(
      FakerCheckoutDTO.lastName
    );
    await expect(pf.checkoutPage.getPostalCodeField()).toHaveValue(
      FakerCheckoutDTO.postalCode
    );

    await pf.checkoutPage.submitCheckoutForm();
    await pf.checkoutPage.finishCheckout();

    await expect(pf.checkoutPage.getCompleteContainer()).toBeVisible();
  });
});
