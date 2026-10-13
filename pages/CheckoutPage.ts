
import { type Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly firstNameInput;
  readonly lastNameInput;
  readonly postalCodeInput;
  readonly continueButton;
  readonly finishButton;
  readonly confirmationMessage;

  constructor(page: Page) {
    super(page);

    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');

    this.continueButton = page.getByRole('button', {
      name: 'Continue',
    });

    this.finishButton = page.getByRole('button', {
      name: 'Finish',
    });

    this.confirmationMessage = page.getByText(
      'Thank you for your order!',
      { exact: true }
    );
  }

  async fillCustomerDetails(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview(): Promise<void> {
    await this.continueButton.click();
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }

  async expectOrderConfirmed(): Promise<void> {
    await expect(this.confirmationMessage).toBeVisible();
  }
}
