import { test } from '../../fixtures/test-fixtures';

test('User can remove a product from cart @regression', async ({
  authenticatedPage,
  inventoryPage,
  cartPage,
}) => {
  await inventoryPage.expectLoaded();

  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.openCart();

  await cartPage.expectLoaded();
  await cartPage.expectProductVisible('Sauce Labs Backpack');

  await cartPage.removeProduct('Sauce Labs Backpack');

  await cartPage.expectProductNotVisible('Sauce Labs Backpack');
  await cartPage.expectCheckoutAvailable();
});
