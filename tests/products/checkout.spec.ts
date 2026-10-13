
import { test, expect } from '../../fixtures/test-fixtures';
import { checkoutDetails } from '../../test-data/users';

test('User can complete checkout successfully', async ({
  authenticatedPage,
  inventoryPage,
  cartPage,
  checkoutPage,
}) => {
  await inventoryPage.expectLoaded();

  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.openCart();

  await cartPage.expectLoaded();
  await cartPage.expectCheckoutAvailable();
  await cartPage.checkoutButton.click();

  await checkoutPage.fillCustomerDetails(
    checkoutDetails.firstName,
    checkoutDetails.lastName,
    checkoutDetails.postalCode
  );

  await checkoutPage.continueToOverview();

  await expect(
    authenticatedPage.getByText('Payment Information')
  ).toBeVisible();

  await expect(
    authenticatedPage.getByText('Shipping Information')
  ).toBeVisible();

  await checkoutPage.finishOrder();
  await checkoutPage.expectOrderConfirmed();
});
