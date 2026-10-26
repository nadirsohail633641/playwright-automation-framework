import { type Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly pageTitle;
  readonly cartLink;
  readonly sortDropdown;
  readonly productPrices;

  constructor(page: Page) {
    super(page);

    this.pageTitle = page.getByText('Products', { exact: true });
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.getByRole('combobox');
    this.productPrices = page.locator('.inventory_item_price');
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
  async sortProducts(option: 'Price (low to high)' | 'Price (high to low)'): Promise<void> {
  const value = option === 'Price (low to high)' ? 'lohi' : 'hilo';

  await this.sortDropdown.selectOption(value);
}

async expectPricesSorted(order: 'ascending' | 'descending'): Promise<void> {
  const prices = await this.productPrices.allTextContents();

  const numericPrices = prices.map(price =>
    Number(price.replace('$', ''))
  );

  const sortedPrices = [...numericPrices].sort((a, b) =>
    order === 'ascending' ? a - b : b - a
  );

  expect(numericPrices).toEqual(sortedPrices);
}

}