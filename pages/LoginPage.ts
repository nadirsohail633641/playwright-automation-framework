import { type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

  readonly usernameInput;
  readonly passwordInput;
  readonly loginButton;
  readonly errorMessage;

  constructor(page: Page) {
    super(page);

    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('[data-test="error"]');
  }
  
  async open(): Promise<void> {
  await this.goto('/');
  }

  async login(username: string, password: string): Promise<void>{

    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

  }
}