# Setup Playwright
- Bạn có thể setup Playwright bằng cách chạy lệnh sau trong terminal là thư mục gốc của dự án với câu lệnh là npx init playwright@latest. 
- Câu lệnh trên có thể sử dụng ở trong terminal tại bất kỳ dự án nào để thiết lập Playwright. Một cách khác thì có thể dùng Playwright Extension của nhà Microsoft để setup Playwright. Áp dụng cho cả ba hệ điều hành Windows, MacOS và Linux.
- Bạn sẽ cần có Node.JS và npm đã được cài đặt ở trên máy bạn. Đối với macOS và Linux, sử dụng lệnh sudo apt install hoặc brew install để tải. Đối với Windows thì tải trực tiếp từ trang chủ của Node.JS. Sau khi cài đặt xong, bạn có thể kiểm tra bằng cách chạy lệnh node -v và npm -v trong terminal để xem phiên bản đã được cài đặt.
```
npm init playwright@latest

> frontend-web@0.0.0 npx
> "create-playwright"

Getting started with writing end-to-end tests with Playwright:
Initializing project in '.'
✔ Do you want to use TypeScript or JavaScript? · JavaScript
✔ Where to put your end-to-end tests? · tests
✔ Add a GitHub Actions workflow? (Y/n) · true
✔ Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n) · true
Installing Playwright Test (npm install --save-dev @playwright/test)…

removed 2 packages, changed 3 packages, and audited 231 packages in 4s

53 packages are looking for funding
  run `npm fund` for details

5 vulnerabilities (3 low, 2 high)

To address all issues, run:
  npm audit fix

Run `npm audit` for details.
Installing Types (npm install --save-dev @types/node)…

added 2 packages, and audited 233 packages in 1s

53 packages are looking for funding
  run `npm fund` for details

5 vulnerabilities (3 low, 2 high)

To address all issues, run:
  npm audit fix

Run `npm audit` for details.
Writing playwright.config.js.
Writing .github/workflows/playwright.yml.
Writing tests/example.spec.js.
Writing package.json.
Downloading browsers (npx playwright install)…
✔ Success! Created a Playwright Test project at /Users/thaiminhhuy/docs/Github/Seminar-Web-Automation/frontend-web

Inside that directory, you can run several commands:

  npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test

And check out the following files:
  - ./tests/example.spec.js - Example end-to-end test
  - ./playwright.config.js - Playwright Test configuration

Visit https://playwright.dev/docs/intro for more information. ✨

Happy hacking! 🎭
```