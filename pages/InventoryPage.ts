import { type Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly pageTitle;
  readonly cartLink;

  constructor(page: Page) {
    super(page);

    this.pageTitle = page.getByText('Products', { exact: true });
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
  }

  async addProductToCart(productName: string): Promise<void> {
    const product = this.page.locator('.inventory_item')
      .filter({ hasText: productName });

    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async expectCartCount(count: number): Promise<void> {
    await expect(this.cartLink).toHaveText(String(count));
  }
}