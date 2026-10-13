
import { test, expect } from '../../fixtures/test-fixtures';

test('User can add a product to cart', async ({
  authenticatedPage,
  inventoryPage,
}) => {
  await inventoryPage.expectLoaded();

  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.expectCartCount(1);
  await inventoryPage.openCart();

  await expect(
    authenticatedPage.getByText('Sauce Labs Backpack', { exact: true })
  ).toBeVisible();
});
