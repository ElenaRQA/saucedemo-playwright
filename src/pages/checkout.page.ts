import { Page } from "@playwright/test";
import { ICheckoutDTO } from "../dto/person.dto";

const checkoutButton = '[data-test="checkout"]';
const firstNameInput = '[data-test="firstName"]';
const lastNameInput = '[data-test="lastName"]';
const postalCodeInput = '[data-test="postalCode"]';
const continueButton = '[data-test="continue"]';
const finishButton = '[data-test="finish"]';
const errorMessage = '[data-test="error"]';

export class CheckoutPage {
  constructor(private page: Page) {}

  async checkoutOpen() {
    await this.page.click(checkoutButton);
  }

  async fillCheckoutForm(dto: ICheckoutDTO) {
    await this.page.fill(firstNameInput, dto.firstName);
    await this.page.fill(lastNameInput, dto.lastName);
    await this.page.fill(postalCodeInput, dto.postalCode);
  }

  async submitCheckoutForm() {
    await this.page.click(continueButton);
  }

  async finishCheckout() {
    await this.page.click(finishButton);
  }

  getCheckoutError() {
    return this.page.locator(errorMessage);
  }
}
