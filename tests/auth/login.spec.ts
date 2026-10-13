
import { test, expect } from '../../fixtures/test-fixtures';
import { users } from '../../test-data/users';

test.describe('SauceDemo Login', () => {
  test('User can login successfully', async ({ loginPage, page }) => {
    await loginPage.open();

    await loginPage.login(
      users.standard.username,
      users.standard.password
    );

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(
      page.getByText('Products', { exact: true })
    ).toBeVisible();
  });

  test('Invalid login shows an error', async ({ loginPage }) => {
    await loginPage.open();

    await loginPage.login(
      users.invalid.username,
      users.invalid.password
    );

    await expect(loginPage.errorMessage).toBeVisible();
  });
});
