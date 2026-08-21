
# ServeRest API Tests

Automated API testing project for [ServeRest](https://serverest.dev/) using **Playwright**, **TypeScript** and **Faker**.

The project focuses on testing the **Products** and **Shopping Cart** APIs, including authentication and business rules.

## 🚀 Technologies

- Playwright
- TypeScript
- Faker
- Node.js
- ServeRest API

## 🧪 Tests

### Products

- Create product with valid data
- Validate required fields
- Prevent duplicate product names
- Prevent unauthenticated product creation

### Shopping Cart

- Add product to cart
- Prevent quantity greater than available stock
- Cancel purchase
- Remove cart after cancellation
- Restore product stock after cancellation

## 🏗️ Project Structure

```text
├── api/          # API classes
├── builders/     # Test data generation
├── helpers/      # Reusable flows
├── models/       # Data models
└── tests/        # Test scenarios
```

## ⚙️ Running the Project

### Install dependencies

```bash
npm install
```

### Install Playwright browsers

```bash
npx playwright install
```

### Run all tests

```bash
npx playwright test
```

### Run Product tests

```bash
npx playwright test tests/product.spec.ts
```

### Run Shopping Cart tests

```bash
npx playwright test tests/cart.spec.ts
```

### Open the test report

```bash
npx playwright show-report
```
