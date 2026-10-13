# Playwright Automation Framework

A reusable end-to-end (E2E) test automation framework built with **Playwright, TypeScript, and Page Object Model (POM)**. It supports Chromium, Firefox, and WebKit, with automated cross-browser execution through GitHub Actions.

## Features

- Cross-browser testing: Chromium, Firefox, and WebKit
- Page Object Model for maintainable test code
- Reusable Playwright fixtures, including authenticated sessions
- Centralized test data and environment configuration
- TypeScript type checking
- HTML test reports
- Failure screenshots and trace configuration
- GitHub Actions CI/CD with separate browser jobs
- Playwright report artifacts uploaded by GitHub Actions

## Tech Stack

- Playwright Test
- TypeScript
- Node.js and npm
- GitHub Actions

## Project Structure

```text
playwrite/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── fixtures/
│   └── test-fixtures.ts
├── pages/
│   ├── BasePage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── InventoryPage.ts
│   └── LoginPage.ts
├── test-data/
│   └── users.ts
├── tests/
│   ├── auth/
│   │   └── login.spec.ts
│   └── products/
│       ├── cart.spec.ts
│       ├── checkout.spec.ts
│       └── inventory.spec.ts
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

## Prerequisites

Install the following before running the tests:

- Node.js (LTS recommended)
- npm
- Git

## Installation

Clone the repository:

```bash
git clone https://github.com/nadirsohail633641/playwright-automation-framework.git
cd playwright-automation-framework
```

Install dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install
```

On Linux CI environments, browser system dependencies may also be required. GitHub Actions handles these through `npx playwright install --with-deps`.

## Environment Configuration

Create a `.env` file in the project root using `.env.example` as a reference:

```dotenv
BASE_URL=https://www.saucedemo.com
```

The framework uses `BASE_URL` as the application base URL. Keep `.env` out of version control and never commit passwords, tokens, or other secrets.

## Running Tests

Run all configured browser projects:

```bash
npx playwright test
```

Run tests in a specific browser:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Run a specific test file:

```bash
npx playwright test tests/auth/login.spec.ts --project=chromium
```

Run TypeScript type checking:

```bash
npx tsc --noEmit
```

## HTML Reports

Open the latest local Playwright HTML report:

```bash
npx playwright show-report
```

GitHub Actions uploads a separate report artifact for each browser job. Open the relevant workflow run on GitHub and download the corresponding artifact.

## CI/CD

The GitHub Actions workflow is located at `.github/workflows/playwright.yml`.

It runs on pushes and pull requests targeting the `main` or `master` branches. A matrix strategy runs the test suite independently on Chromium, Firefox, and WebKit, then uploads a report artifact for each browser.

## Current Test Coverage

The framework currently covers:

- Successful login
- Invalid login error
- Adding a product to the cart
- Removing a product from the cart
- Completing checkout successfully

The tests currently use the SauceDemo demo application. Configure the base URL, page objects, test data, and scenarios before using this framework against another application.

## Future Improvements

- API testing and API/UI integration scenarios
- Additional negative and edge-case scenarios
- Authentication state reuse with Playwright storage state
- Accessibility and visual regression testing
- Expanded CI reporting and notifications

## License

No license has been added yet. Add a license file if you intend to define how others may use, modify, or distribute this project.