# Basic Command for Playwright

- npx playwright test: Run the end-to-end tests in headless mode.

- npx playwright test --workers 3: run with 3 workders in parellel.

- npx playwright test one.spec.js: Run the tests in a specific file.

- npx playwright test one.spec.js two.spec.js: Run the tests in multiple specific files.

- npx playwright test one two: Run files that have one or two in the file name.

- npx playwright test -g "check title": Run tests with the title

- npx playwright test --project=chromium: Run the tests only on Desktop Chrome (specific browser).

- npx playwright test --headed: run tests in headed mode.

- npx playwright test --debug: Run the tests in debug mode.

- npx playwright test example.spec.js --debug: Run the tests in debug mode for a specific file.

- npx playwright test example.spec.js:21 --debug: debug starting from a specific line in a specific file.

- npx playwright codegen https://example.com: Generate a test script for a specific URL.

- npx playwright code --target=playwright-test -o tests/<>.spec.js https://example.com: Generate a test script for a specific URL and save it to a specific file.