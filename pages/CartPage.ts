
import { type Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartTitle;
  readonly checkoutButton;

  constructor(page: Page) {
    super(page);

    this.cartTitle = page.getByText('Your Cart', { exact: true });
    this.checkoutButton = page.getByRole('button', {
      name: 'Checkout',
    });
  }

  async open(): Promise<void> {
    await this.goto('/cart.html');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.cartTitle).toBeVisible();
  }

  async removeProduct(productName: string): Promise<void> {
    const product = this.page
      .locator('.cart_item')
      .filter({ hasText: productName });

    await product.getByRole('button', { name: 'Remove' }).click();
  }

  async expectProductVisible(productName: string): Promise<void> {
    await expect(
      this.page.getByText(productName, { exact: true })
    ).toBeVisible();
  }

  async expectProductNotVisible(productName: string): Promise<void> {
    await expect(
      this.page.getByText(productName, { exact: true })
    ).toHaveCount(0);
  }

  async expectCheckoutAvailable(): Promise<void> {
    await expect(this.checkoutButton).toBeEnabled();
  }
}
