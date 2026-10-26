import { test } from '../../fixtures/test-fixtures';

test.describe('Product Sorting', () => {
  test('Products can be sorted by price: low to high', async ({
    authenticatedPage,
    inventoryPage,
  }) => {
    await inventoryPage.sortProducts('Price (low to high)');
    await inventoryPage.expectPricesSorted('ascending');
  });

  test('Products can be sorted by price: high to low', async ({
    authenticatedPage,
    inventoryPage,
  }) => {
    await inventoryPage.sortProducts('Price (high to low)');
    await inventoryPage.expectPricesSorted('descending');
  });
});