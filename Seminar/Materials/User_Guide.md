<div align="center">
  <h1>User Guide - Web Automation Testing</h1>
  <small>Nhóm 06</small> <br />
  <sub>29 tháng 06 năm 2026</sub>
</div>

## Tổng quan dự án

**Học Phần:** CSC15003 - Kiểm Thử Phần Mềm \
**Chủ đề:** T02 - Web Automation Testing \
**Software Under Test (SUT):** [EShop](https://github.com/ttbhanh/eshop-sut/tree/main) (React + Node.js/Express) \
**Official Repository:** [Seminar](https://github.com/phatnguyen975/eshop-sut/tree/main), nhánh Web-automation
**Thành viên nhóm:**

- 23127378 - Nguyễn Gia Huy
- 23127379 - Thái Minh Huy
- 23127396 - Lương Linh Khôi
- 23127449 - Nguyễn Tấn Phát

## Mục lục


[1. Tổng quan và giới thiệu](#1-tổng-quan-và-giới-thiệu) \
**Phần A — Playwright (Code-Based)** \
[2. Cài đặt Playwright](#2-cài-đặt-playwright-installation--setup) \
[3. Bước đầu với Playwright](#3-bước-đầu-với-playwright-first-steps) \
[4. Sử dụng nâng cao Playwright](#4-sử-dụng-nâng-cao-playwright-advanced-usage) \
[5. Xử lý sự cố Playwright](#5-xử-lý-sự-cố-playwright-troubleshooting) \
**Phần B — Mabl (AI-First, No-Code)** \
[6. Cài đặt Mabl](#6-cài-đặt-mabl-installation--setup) \
[7. Bước đầu với Mabl](#7-bước-đầu-với-mabl-first-steps) \
[8. Sử dụng nâng cao Mabl](#8-sử-dụng-nâng-cao-mabl-advanced-usage) \
[9. Xử lý sự cố Mabl](#9-xử-lý-sự-cố-mabl-troubleshooting) \
**Phần C — Phụ lục** \
[10. Tài liệu tham khảo](#11-tài-liệu-tham-khảo)


## 1. Tổng quan và giới thiệu

### 1.1 Bối cảnh bài toán và Khái niệm cốt lõi (Problem Space & Core Concepts)
Trong kỷ nguyên phát triển phần mềm hiện đại, việc đảm bảo chất lượng hệ thống thông qua kiểm thử hồi quy (Regression Testing) đóng vai trò sống còn nhằm bảo vệ các luồng nghiệp vụ cốt lõi và giảm thiểu tỷ lệ rò rỉ lỗi (defect leakage). Web Automation Testing (Kiểm thử tự động Web) ra đời như một giải pháp chiến lược nhằm thay thế các thao tác kiểm thử thủ công lặp đi lặp lại bằng các kịch bản mã nguồn tự động thực thi. Điều này giúp rút ngắn vòng phản hồi (feedback loop), cho phép phát hiện lỗi ngay sau khi mã nguồn thay đổi và là điều kiện tiên quyết để tích hợp vào các đường ống CI/CD.

### 1.2 Thách thức đặc thù của Ứng dụng React SPA (EShop)
Hệ thống EShop (Software Under Test - SUT) được xây dựng dựa trên kiến trúc Single Page Application (React cho Frontend và Node.js/Express cho Backend). Việc kiểm thử tự động trên các ứng dụng React SPA hiện đại đối mặt với những thách thức rất lớn do cơ chế Render DOM bất đồng bộ (Asynchronous DOM) và định tuyến phía Client (client-side routing). Trạng thái giao diện thay đổi liên tục theo thời gian thực dựa trên độ trễ của mạng và phản hồi từ API. Nếu công cụ kiểm thử không có cơ chế đồng bộ hóa tốt, kịch bản sẽ rơi vào trạng thái chập chờn (Flakiness) – tức là test case thất bại ngẫu nhiên dù mã nguồn hệ thống không lỗi. Điều này làm xói mòn niềm tin vào bộ kiểm thử và làm chậm tiến độ bàn giao phần mềm.

### 1.3 Giải pháp công nghệ và đối tượng hướng tới
Để giải quyết bài toán trên, tài liệu này hướng dẫn cách làm chủ Playwright – một framework kiểm thử tự động thế hệ mới mạnh mẽ, hỗ trợ cơ chế tự động đợi (Auto-waiting) thông minh, thực thi song song và tối ưu hoàn hảo cho các CLI terminal-native. Đồng thời tài liệu cũng sẽ hướng dẫn luôn cách sử dụng công cụ A.I First với tool Mabl.

Đối tượng hướng tới: Các kỹ sư QA, lập trình viên trong dự án EShop muốn xây dựng một hệ thống kiểm thử tự động E2E ổn định, tốc độ cao và có khả năng chống chập chờn (flake-resistant) dưới áp lực của mạng yếu. 

---

# PHẦN A — PLAYWRIGHT (Code-Based)

## 2. Cài đặt và khởi chạy

### 2.1 Yêu cầu hệ thống trước khi cài đặt (Prerequisites)
Trước khi tiến hành cài đặt, hãy đảm bảo máy tính của bạn đã trang bị sẵn:
- Môi trường Node.js (Phiên bản LTS từ v18 trở lên được khuyến nghị) và npm.
- Một IDE/Trình soạn thảo mã nguồn.
- Hệ thống EShop SUT đã được khởi chạy thành công cục bộ (cả Frontend và Backend) hoặc có quyền truy cập vào môi trường staging của giảng viên

### 2.2 Các bước cài đặt chi tiết
#### Bước 1: Khởi tạo Playwright test ở trong dự án
Nhóm sử dụng công cụ quản lý kiểm thử toàn diện Playwright Test. Mở terminal tại thư mục gốc của repository bất kỳ mà cần được Testing và chạy dòng lệnh sau: ***npm init playwright@latest***.

Quá trình cài đặt sẽ hỏi bạn một số tùy chọn, hãy thiết lập như sau:
- Language: Chọn TypeScript hoặc JavaScript.
- Where to put your end-to-end tests?: Để mặc định là tests.
- Add a GitHub Actions workflow?: Chọn false/true. Chọn true thì sẽ tự động khởi tạo CI Pipelines cho Playwright (Script mặc định). Có thể chọn false và tự cấu hình theo yêu cầu quy trình.
- Install Playwright browsers?: Chọn true (Để tải về các trình duyệt Chromium, Firefox, WebKit gốc).

#### Bước 2: Xác minh đã cài đặt thành công
Để kiểm tra xem môi trường đã sẵn sàng chưa, chạy lệnh thực thi các bài test mẫu đi kèm của Playwright: ***npx playwright test***.

Nếu terminal hiển thị màu xanh và báo cáo toàn bộ các bài test mẫu đã hoàn thành (Passed), môi trường kiểm thử của nhóm đã được thiết lập thành công.

## 3. First Steps
Mục này hướng dẫn từng bước xây dựng kịch bản kiểm thử End-to-End (E2E) đầu tiên bằng mã nguồn tự viết hoàn toàn bằng tay (Hand-crafted) trên Playwright Test, áp dụng trực tiếp cho luồng người dùng đăng nhập vào hệ thống và thực hiện thanh toán sản phẩm của EShop.

### 3.1 Kịch bản kiểm thử
Mục tiêu: Xác minh người dùng có tài khoản hợp lệ có thể đăng nhập thành công vào EShop và thao tác trên ứng dụng. 
- Dữ liệu kiểm thử mẫu:
    - Email: Được tự động tạo lúc test
    - Password: Mặc định là Password123!

### 3.2 Kịch bản kiểm thử
Kịch bản kiểm thử E2E được sử dụng là kịch bản người dùng sẽ đăng ký tài khoản của họ vào ứng dụng thương mại điện tử, sau khi đăng ký xong thì thực hiện đăng nhập vào thông tin từ trang đắng ký và truy cập để xem thông tin sản phẩm
```javascript
import { test, expect } from "../../../fixtures";
import { faker } from "@faker-js/faker";
import { RegisterPage } from "../../../pages/web/register.page";
import { LoginPage } from "../../../pages/web/login.page";
import { HomePage } from "../../../pages/web/home.page";

test("TC-AUTH-01: Customer completes registration, logs in and browses product catalog", async ({
  page,
  request,
  cleanup,
  adminApiRequest,
}) => {
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  const fullName = faker.person.fullName();
  const email = `user_${faker.string.uuid()}@example.com`;
  const password = process.env.USER_PASSWORD as string;

  await test.step("Step 1, 2 & 3: Navigate and register a new account (UI & API)", async () => {
    await registerPage.goto();

    await expect(page.locator('label:has-text("Họ Tên")')).toContainText("*");
    await expect(page.locator('label:has-text("Email")')).toContainText("*");
    await expect(
      page.locator('label:has-text("Mật khẩu")').first(),
    ).toContainText("*");
    await expect(
      page.locator('label:has-text("Xác nhận mật khẩu")'),
    ).toContainText("*");

    await expect(registerPage.emailInput).toHaveAttribute("type", "email");
    await expect(registerPage.passwordInput).toHaveAttribute(
      "type",
      "password",
    );
    await expect(registerPage.confirmPasswordInput).toHaveAttribute(
      "type",
      "password",
    );

    const registerPromise = page.waitForResponse(
      (response) =>
        response.url().includes("/api/register") &&
        response.request().method() === "POST",
    );

    await registerPage.register(fullName, email, password, password);

    const registerRes = await registerPromise;
    const resBody = await registerRes.json().catch(() => ({}));

    // Register cleanup — runs even if subsequent assertions fail
    if (resBody.id) {
      cleanup.add(async () => {
        await adminApiRequest
          .delete(`/api/admin/users/${resBody.id}`)
          .catch(() => {});
      });
    }

    expect(registerRes.status()).toBe(200);
    expect(resBody.message).toBe("User registered successfully");
    expect(typeof resBody.id).toBe("number");
  });

  await test.step("Step 4, 5 & 6: Login with the new account (UI & API)", async () => {
    await loginPage.waitForURL(/\/login/);
    await expect(loginPage.emailInput).toHaveAttribute("type", "email");
    await expect(loginPage.passwordInput).toHaveAttribute("type", "password");
    await expect(page.locator("h1")).toHaveCount(1);

    const loginPromise = page.waitForResponse(
      (response) =>
        response.url().includes("/api/login") &&
        response.request().method() === "POST",
    );

    await loginPage.login(email, password);

    const loginRes = await loginPromise;
    expect(loginRes.status()).toBe(200);
    const resBody = await loginRes.json();
    expect(resBody.token).toBeDefined();
    expect(resBody.user.email).toBe(email);
  });

  await test.step("Step 7 & 8: Verify Home page rendering and Navbar state", async () => {
    await homePage.waitForURL(/\/$/);

    await expect(homePage.loadingIndicator).not.toBeVisible();
    await expect(homePage.pageHeading).toHaveCount(1);
    await expect(homePage.cartLink).toContainText("0");
    await expect(homePage.logoutButton).toHaveText("Đăng xuất");

    const cards = homePage.productCards;
    await expect(cards.first()).toBeVisible();

    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const image = card.locator("img").first();
      await expect(image).toHaveAttribute("alt", /.+/);
      await expect(card).toContainText("₫");
    }
  });

  await test.step("Step 9 & 10: Search for a product (UI & API)", async () => {
    const firstCard = homePage.productCards.first();
    const firstProductName =
      (await firstCard.locator("h2, h3").first().textContent()) || "Product";

    await homePage.search(firstProductName);
    await expect(homePage.loadingIndicator).not.toBeVisible();
    await expect(homePage.productCards.filter({ hasText: firstProductName })).toBeVisible();

    // Verify search via API using the injected request fixture
    const apiRes = await request.get(
      `/api/products?search=${encodeURIComponent(firstProductName)}`,
    );
    expect(apiRes.status()).toBe(200);
    const products = await apiRes.json();
    expect(products.length).toBeGreaterThan(0);
    // Use regular expression or direct match
    const containsKeyword = products.some((p: any) =>
      p.name.includes(firstProductName),
    );
    expect(containsKeyword).toBe(true);
  });

  await test.step("Step 11: Empty state assertion", async () => {
    await homePage.search("xyzzy_nosuchproduct_12345");
    await expect(homePage.emptyState).toBeVisible();
  });
});
```

### 3.3 Quy trình vận hành 15 bước với Playwright
Để thực thi và kiểm tra kịch bản kiểm thử này từ terminal một cách terminal-native, hãy làm theo quy trình tinh gọn sau:
- Mở cửa sổ Terminal của hệ điều hành.
- Di chuyển vào thư mục gốc của dự án bằng lệnh cd e2e
- Khởi chạy môi trường Backend của EShop SUT.
- Khởi chạy môi trường Frontend của EShop SUT.
- Đảm bảo cơ sở dữ liệu (Database) của EShop đã được khởi tạo dữ liệu mẫu chính xác.
- Thực thi kịch bản kiểm thử ở chế độ chạy ngầm (Headless mode) bằng lệnh: npx playwright test tests/file-name.spec.js.
- (Tùy chọn) Chạy kịch bản ở chế độ giao diện (Headed mode) để quan sát bằng lệnh: npx playwright test tests/file-name.spec.js --headed.
- Chờ đợi Playwright kích hoạt cơ chế tự động chờ (Auto-waiting) khi tải trang và render các phần tử React SPA.
- Quan sát Terminal xem kết quả báo dòng chữ xanh báo cáo test case thành công (Passed).
- Mở công cụ xem báo cáo của Playwright bằng lệnh: ***npx playwright show-report***.
- Báo cáo HTML tự động bật lên trên trình duyệt cục bộ.
- Nhấp vào test case được hiển thị trong báo cáo để xem chi tiết.
- Kiểm tra từng bước lệnh thực thi (Step-by-step logs) và thời gian thực thi (Execution time) của từng hành động.
- Xem hình ảnh đính kèm hoặc video quay lại quá trình chạy tự động (nếu đã cấu hình trong tệp playwright.config.js).
- Tắt báo cáo HTML bằng tổ hợp phím Ctrl + C tại cửa sổ Terminal để giải phóng cổng kết nối.
## 4. Sử dụng nâng cao
Playwright cũng có thể được sử dụng để mà tích hợp trong quy trình CI/CD.
```yaml
name: Smoke Tests (Monorepo)

on:
  push:
    branches: [web-automation-testing]
  pull_request:
    branches: [web-automation-testing]

concurrency:
  group: smoke-${{ github.ref }}
  cancel-in-progress: true

env:
  CI: true

jobs:
  # 1. Monorepo Path Filtering
  changes:
    name: Detect File Changes
    runs-on: ubuntu-latest
    outputs:
      web: ${{ steps.filter.outputs.web }}
      admin: ${{ steps.filter.outputs.admin }}
    steps:
      - uses: actions/checkout@v4
      - uses: dorny/paths-filter@v3
        id: filter
        with:
          filters: |
            web:
              - 'frontend-web/**'
              - 'backend/**'
              - 'e2e/tests/web/**'
              - 'e2e/tests/smoke/web/**'
              - 'e2e/pages/web/**'
              - 'e2e/fixtures/**'
              - 'e2e/playwright.config.ts'
            admin:
              - 'frontend-admin/**'
              - 'backend/**'
              - 'e2e/tests/admin/**'
              - 'e2e/tests/smoke/admin/**'
              - 'e2e/pages/admin/**'
              - 'e2e/fixtures/**'
              - 'e2e/playwright.config.ts'

  # 2. Run tests dynamically based on changes
  smoke:
    name: Smoke — Chromium
    needs: changes
    # Only run if web or admin (or backend) changed
    if: ${{ needs.changes.outputs.web == 'true' || needs.changes.outputs.admin == 'true' }}
    timeout-minutes: 15
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: e2e/package-lock.json

      - name: Install dependencies
        run: npm ci
        working-directory: e2e

      - name: Cache Playwright browsers
        id: playwright-cache
        uses: actions/cache@v4
        with:
          path: ~/.cache/ms-playwright
          key: playwright-${{ runner.os }}-${{ hashFiles('e2e/package-lock.json') }}

      - name: Install Playwright browsers
        if: steps.playwright-cache.outputs.cache-hit != 'true'
        run: npx playwright install --with-deps chromium
        working-directory: e2e

      - name: Install Playwright OS dependencies
        if: steps.playwright-cache.outputs.cache-hit == 'true'
        run: npx playwright install-deps chromium
        working-directory: e2e

      # Determine which projects to run based on dorny/paths-filter
      - name: Set Project Flags
        id: set-flags
        run: |
          FLAGS=""
          if [ "${{ needs.changes.outputs.web }}" == "true" ]; then
            FLAGS="--project=smoke-web"
          fi
          if [ "${{ needs.changes.outputs.admin }}" == "true" ]; then
            FLAGS="$FLAGS --project=smoke-admin"
          fi
          echo "project_flags=$FLAGS" >> $GITHUB_OUTPUT

      - name: Run smoke suite
        run: npx playwright test ${{ steps.set-flags.outputs.project_flags }}
        working-directory: e2e
        env:
          WEB_BASE_URL: ${{ vars.WEB_BASE_URL }}
          ADMIN_BASE_URL: ${{ vars.ADMIN_BASE_URL }}
          API_BASE_URL: ${{ vars.API_BASE_URL }}
          USER_EMAIL: ${{ secrets.USER_EMAIL }}
          USER_PASSWORD: ${{ secrets.USER_PASSWORD }}
          ADMIN_EMAIL: ${{ secrets.ADMIN_EMAIL }}
          ADMIN_PASSWORD: ${{ secrets.ADMIN_PASSWORD }}

      - name: Upload smoke report
        uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: smoke-report-${{ github.run_number }}
          path: e2e/playwright-report/
          retention-days: 7

      - name: Upload traces on failure
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: smoke-traces-${{ github.run_number }}
          path: e2e/test-results/
          retention-days: 3

```

```yaml
name: Regression Tests (Monorepo)

on:
  push:
    branches: [web-automation-testing]
  schedule:
    - cron: "0 2 * * 1-5"
  workflow_dispatch:

concurrency:
  group: regression-${{ github.ref }}
  cancel-in-progress: true

env:
  CI: true

jobs:
  # 1. Monorepo Path Filtering
  changes:
    name: Detect File Changes
    runs-on: ubuntu-latest
    outputs:
      web: ${{ steps.filter.outputs.web }}
      admin: ${{ steps.filter.outputs.admin }}
    steps:
      - uses: actions/checkout@v4
      - uses: dorny/paths-filter@v3
        id: filter
        # If run on schedule or manual dispatch, run everything. Otherwise filter by paths.
        with:
          filters: |
            web:
              - 'frontend-web/**'
              - 'backend/**'
              - 'e2e/tests/web/**'
              - 'e2e/pages/web/**'
              - 'e2e/tests/api/**'
              - 'e2e/fixtures/**'
              - 'e2e/playwright.config.ts'
            admin:
              - 'frontend-admin/**'
              - 'backend/**'
              - 'e2e/tests/admin/**'
              - 'e2e/pages/admin/**'
              - 'e2e/tests/api/**'
              - 'e2e/fixtures/**'
              - 'e2e/playwright.config.ts'

  # 2. Sharded Regression — Chromium
  test:
    name: Regression — Chromium (Shard ${{ matrix.shard }})
    needs: changes
    # Run if anything changed OR if it's a scheduled/manual run
    if: ${{ needs.changes.outputs.web == 'true' || needs.changes.outputs.admin == 'true' || github.event_name == 'schedule' || github.event_name == 'workflow_dispatch' }}
    timeout-minutes: 20
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        shard: ["1/3", "2/3", "3/3"]

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: e2e/package-lock.json

      - run: npm ci
        working-directory: e2e

      - id: playwright-cache
        uses: actions/cache@v4
        with:
          path: ~/.cache/ms-playwright
          key: playwright-${{ runner.os }}-${{ hashFiles('e2e/package-lock.json') }}

      - if: steps.playwright-cache.outputs.cache-hit != 'true'
        run: npx playwright install --with-deps chromium firefox webkit
        working-directory: e2e

      - if: steps.playwright-cache.outputs.cache-hit == 'true'
        run: npx playwright install-deps chromium firefox webkit
        working-directory: e2e

      - name: Set Project Flags
        id: set-flags
        run: |
          FLAGS=""
          # If scheduled/manual, or if web changed
          if [ "${{ github.event_name }}" == "schedule" ] || [ "${{ github.event_name }}" == "workflow_dispatch" ] || [ "${{ needs.changes.outputs.web }}" == "true" ]; then
            FLAGS="--project=web-chromium --project=api"
          fi
          # If scheduled/manual, or if admin changed
          if [ "${{ github.event_name }}" == "schedule" ] || [ "${{ github.event_name }}" == "workflow_dispatch" ] || [ "${{ needs.changes.outputs.admin }}" == "true" ]; then
            FLAGS="$FLAGS --project=admin-chromium"
          fi
          echo "project_flags=$FLAGS" >> $GITHUB_OUTPUT

      - name: Run tests (shard ${{ matrix.shard }})
        run: npx playwright test ${{ steps.set-flags.outputs.project_flags }} --shard=${{ matrix.shard }}
        working-directory: e2e
        env:
          WEB_BASE_URL: ${{ vars.WEB_BASE_URL }}
          ADMIN_BASE_URL: ${{ vars.ADMIN_BASE_URL }}
          API_BASE_URL: ${{ vars.API_BASE_URL }}
          USER_EMAIL: ${{ secrets.USER_EMAIL }}
          USER_PASSWORD: ${{ secrets.USER_PASSWORD }}
          ADMIN_EMAIL: ${{ secrets.ADMIN_EMAIL }}
          ADMIN_PASSWORD: ${{ secrets.ADMIN_PASSWORD }}

      - name: Upload blob report
        uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: blob-report-${{ strategy.job-index }}
          path: e2e/blob-report/
          retention-days: 1

  # 3. Merge Reports
  merge-reports:
    if: ${{ !cancelled() && (needs.changes.outputs.web == 'true' || needs.changes.outputs.admin == 'true' || github.event_name == 'schedule' || github.event_name == 'workflow_dispatch') }}
    needs: [changes, test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
        working-directory: e2e
      - uses: actions/download-artifact@v4
        with:
          path: all-blob-reports
          pattern: blob-report-*
          merge-multiple: true
      - run: npx playwright merge-reports --reporter=html ./all-blob-reports
        working-directory: e2e
      - uses: actions/upload-artifact@v4
        with:
          name: regression-report-${{ github.run_number }}
          path: e2e/playwright-report/
          retention-days: 14

  # 4. Cross-browser Nightly
  cross-browser:
    needs: changes
    if: github.event_name == 'schedule' || github.event_name == 'workflow_dispatch'
    timeout-minutes: 30
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        browser: [web-firefox, web-webkit, admin-firefox, admin-webkit]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
        working-directory: e2e
      - run: npx playwright install --with-deps
        working-directory: e2e
      - run: npx playwright test --project=${{ matrix.browser }}
        working-directory: e2e
        env:
          WEB_BASE_URL: ${{ vars.WEB_BASE_URL }}
          ADMIN_BASE_URL: ${{ vars.ADMIN_BASE_URL }}
          API_BASE_URL: ${{ vars.API_BASE_URL }}
          USER_EMAIL: ${{ secrets.USER_EMAIL }}
          USER_PASSWORD: ${{ secrets.USER_PASSWORD }}
          ADMIN_EMAIL: ${{ secrets.ADMIN_EMAIL }}
          ADMIN_PASSWORD: ${{ secrets.ADMIN_PASSWORD }}
      - uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: regression-${{ matrix.browser }}-${{ github.run_number }}
          path: e2e/playwright-report/

```
## 5. Troubleshooting
### Troubleshoot-1 - `ECONNREFUSED` — Quên khởi động Server ứng dụng (SUT) trước khi test
**Thông báo lỗi:**
```
◇ injected env (0) from .env // tip: ◈ encrypted .env [www.dotenvx.com]
◇ injected env (0) from .env // tip: ⌘ override existing { override: true }
[global-setup] Authenticating Standard User (test@eshop.com)...
Error: apiRequestContext.post: connect ECONNREFUSED ::1:3000
Call log:
  - → POST http://localhost:3000/api/login
    - user-agent: Playwright/1.61.1 (arm64; macOS 26.4) node/26.0
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - content-type: application/json
    - content-length: 49

    at apiRequestContext.post: connect ECONNREFUSED ::1:3000
    at authenticateAndSave (/Users/thaiminhhuy/docs/Github/seminar-main/eshop-sut/e2e/global-setup.ts:87:42)
    at globalSetup (/Users/thaiminhhuy/docs/Github/seminar-main/eshop-sut/e2e/global-setup.ts:37:3)
[global-teardown] Suite complete. No global cleanup required.


To open last HTML report run:

  npx playwright show-report
```
**Bối cảnh xảy ra:** Ngay ở bước `global-setup` — trước khi bất kỳ test case nào chạy — khi Playwright cố gắng gọi API `POST /api/login` để đăng nhập sẵn (Standard User) và lưu session, phục vụ cho các test sau đó.

**Nguyên nhân:** Server ứng dụng đang test (EShop — System Under Test) **chưa được khởi động** ở `localhost:3000`. Global setup của Playwright chạy độc lập với việc dev server có đang chạy hay không, nên nếu quên bật server, request sẽ bị hệ điều hành từ chối kết nối (`ECONNREFUSED`) ngay từ bước xác thực, khiến toàn bộ suite dừng lại trước khi test thật sự bắt đầu.

**Cách khắc phục:**
```bash
# Bước 1: Mở terminal riêng, khởi động SUT trước
cd backend
npm run dev   # hoặc lệnh start tương ứng của dự án

# Bước 2: Xác nhận server đã sẵn sàng (tuỳ chọn nhưng nên làm)
curl http://localhost:3000/api/health

# Bước 3: Chạy lại test ở terminal khác
npx playwright test tests/web/auth/sc-01-auth-validation.spec.ts --headed --project=web-chromium
```

**Ghi chú / Bài học:** Lỗi này không phải do Playwright hay do test script — mà do **thiếu bước chuẩn bị môi trường**. Có thể phòng tránh bằng cách thêm `webServer` config trong `playwright.config.ts` để Playwright **tự động khởi động server** trước khi chạy test:
```typescript
// playwright.config.ts
export default defineConfig({
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
```

**Nguồn tham khảo:** [Playwright Docs — webServer config](https://playwright.dev/docs/test-webserver)

### Troubleshoot-2 — `Strict mode violation` do Locator khớp nhiều phần tử

**Thông báo lỗi:**
```text
Error: locator.click: Error: strict mode violation

locator('button')

resolved to 2 elements:
1) <button>Login</button>
2) <button>Login</button>
```

**Bối cảnh xảy ra:** Khi Playwright thực hiện thao tác (`click`, `fill`, `check`,...) trên một locator nhưng locator đó khớp với nhiều phần tử trên trang.

**Nguyên nhân:** Theo mặc định, Playwright hoạt động ở **Strict Mode**, nghĩa là một locator dùng cho thao tác phải xác định **chính xác một phần tử**. Nếu locator trả về nhiều kết quả (ví dụ dùng `page.locator("button")` hoặc một CSS selector quá chung), Playwright sẽ dừng test thay vì tự chọn ngẫu nhiên một phần tử.

**Cách khắc phục:**
- Sử dụng locator cụ thể hơn như `getByRole()`, `getByLabel()`, `getByTestId()`.
- Chỉ dùng `.first()` hoặc `.nth()` khi thứ tự phần tử là cố định và có chủ đích.

Ví dụ:

```ts
// Không nên
await page.locator("button").click();

// Nên
await page.getByRole("button", { name: "Login" }).click();
```

**Ghi chú / Bài học:** Không nên tắt Strict Mode hoặc cố tình dùng `.first()` để "chữa cháy". Việc locator không xác định duy nhất thường phản ánh rằng test chưa mô tả đúng phần tử mà người dùng thực sự tương tác.

**Nguồn tham khảo:** https://playwright.dev/docs/locators

### Troubleshoot-3 — `Timeout exceeded` do Locator không bao giờ đạt điều kiện mong đợi

**Thông báo lỗi:**
```text
Error: Timeout 5000ms exceeded while waiting for

expect(locator).toBeVisible()
```

**Bối cảnh xảy ra:** Trong quá trình thực hiện assertion hoặc thao tác với một phần tử mà Playwright phải chờ phần tử xuất hiện, hiển thị hoặc đạt trạng thái mong muốn.

**Nguyên nhân:** Playwright tự động chờ (auto-wait), nhưng nếu sau khoảng thời gian timeout phần tử vẫn không đạt điều kiện thì test sẽ thất bại. Nguyên nhân có thể là:
- Locator không đúng.
- Phần tử chưa được render do API chưa trả về.
- Điều kiện kiểm thử sai.
- Website phản hồi quá chậm.

**Cách khắc phục:**
1. Kiểm tra lại locator bằng Playwright Inspector hoặc Codegen.
2. Ưu tiên sử dụng web-first assertions như `toBeVisible()` hoặc `toHaveText()`.
3. Chỉ tăng timeout khi thực sự cần thiết.

Ví dụ:

```ts
await expect(page.getByRole("heading", {
  name: "Order Success"
})).toBeVisible();
```

Nếu cần tăng timeout:

```ts
await expect(locator).toBeVisible({
  timeout: 10000
});
```

**Ghi chú / Bài học:** Không nên xử lý bằng `waitForTimeout(5000)` vì đây chỉ là giải pháp tạm thời và dễ tạo ra flaky test. Hãy xác định đúng nguyên nhân khiến phần tử chưa xuất hiện.

**Nguồn tham khảo:** https://playwright.dev/docs/actionability
## 6. Failure Modes (Các tình huống khiến kết quả kiểm thử không đáng tin cậy)
### FM-1 — Điều kiện tranh chấp do Assertion không tự động thử lại (Non-Retrying Assertion Race Condition)

| Khía cạnh | Mô tả |
| --- | --- |
| **Nguyên nhân (Trigger)** | Sử dụng assertion chỉ kiểm tra **một lần duy nhất (one-shot assertion)**, chẳng hạn `expect(await locator.textContent()).toBe('...')`, thay vì **web-first assertion** như `await expect(locator).toHaveText('...')`. Với cách thứ nhất, Playwright chỉ đọc giá trị của DOM đúng **một thời điểm** khi dòng lệnh được thực thi và không tự động kiểm tra lại. |
| **Triệu chứng (Symptom)** | Bài kiểm thử có thể **thành công trên máy cục bộ (local)** nhưng **thất bại ngẫu nhiên trên môi trường CI**, nơi CPU và quá trình render thường chậm hơn. Thông báo lỗi cho thấy phần tử vẫn còn nội dung cũ hoặc rỗng tại thời điểm assertion được thực hiện, mặc dù chỉ vài mili-giây sau nội dung mong muốn đã xuất hiện. Những trường hợp này thường được phân loại là **flaky test**. |
| **Cách phát hiện (Detection)** | Bật `trace: 'on-first-retry'` trong `playwright.config.ts` và mở **Trace Viewer** sau khi test thất bại. Snapshot của DOM sẽ cho thấy nội dung mong đợi chưa xuất hiện tại đúng thời điểm assertion chạy nhưng đã xuất hiện ở các khung hình (frames) ngay sau đó. Ngoài ra, có thể tìm trong mã nguồn các mẫu như `expect(await locator.textContent())` hoặc `expect(await locator.innerText())`. |
| **Cách khắc phục (Mitigation)** | Thay thế toàn bộ các one-shot assertion bằng **web-first assertions** của Playwright như `toHaveText`, `toBeVisible`, `toHaveAttribute`,... Các assertion này sẽ tự động **poll** và **retry** cho đến khi điều kiện được thỏa mãn hoặc hết thời gian timeout. Không nên sử dụng `locator.textContent()` hoặc `locator.innerText()` trực tiếp bên trong `expect()`, vì Playwright đã khuyến nghị tránh cách viết này trong tài liệu chính thức. |

**Nguồn:**
- Playwright Docs — Assertions: https://playwright.dev/docs/test-assertions
- Playwright Best Practices — Use web-first assertions: https://playwright.dev/docs/best-practices#use-web-first-assertions

### FM-2 — Ô nhiễm dữ liệu giữa các bài kiểm thử chạy song song (Parallel Test Data Contamination)

| Khía cạnh | Mô tả |
| --- | --- |
| **Nguyên nhân (Trigger)** | Hai hoặc nhiều bài kiểm thử chạy song song (`fullyParallel: true`) cùng **đọc hoặc ghi trên một dữ liệu backend dùng chung**. Ví dụ: cùng sử dụng tài khoản `test@example.com`, cùng cập nhật số lượng tồn kho của một sản phẩm hoặc cùng xóa một đơn hàng. Mặc dù Playwright cô lập **Browser Context** cho từng test, nó **không thể cô lập cơ sở dữ liệu hoặc trạng thái backend của ứng dụng**. |
| **Triệu chứng (Symptom)** | Các bài kiểm thử hoạt động bình thường khi chạy riêng lẻ (`--workers=1`) nhưng thất bại không ổn định khi chạy song song. Các lỗi thường gặp bao gồm: `"product not found"` (sản phẩm đã bị test khác xóa), tổng tiền trong giỏ hàng không chính xác (dữ liệu bị thay đổi đồng thời), hoặc đăng nhập thất bại (mật khẩu đã bị test khác cập nhật). Các lỗi này xuất hiện ngẫu nhiên và rất khó tái hiện. |
| **Cách phát hiện (Detection)** | Chạy lại bộ kiểm thử với `--workers=1`. Nếu tất cả đều thành công khi chạy tuần tự nhưng thất bại khi chạy song song, rất có thể nguyên nhân là các test đang làm thay đổi cùng một trạng thái backend. Ngoài ra, cần kiểm tra mã nguồn để phát hiện các tài khoản dùng chung, ID được hardcode, hoặc thiếu cơ chế dọn dẹp dữ liệu sau khi test. Nếu không sử dụng `testInfo.workerIndex` hoặc cơ chế phân tách dữ liệu theo worker thì đây cũng là một dấu hiệu đáng chú ý. |
| **Cách khắc phục (Mitigation)** | (1) **Sinh dữ liệu kiểm thử duy nhất cho mỗi test**, ví dụ sử dụng `faker` hoặc `crypto.randomUUID()` để tạo email, tên người dùng hoặc tên thực thể; (2) **Phân chia tài nguyên theo từng worker**, sử dụng `testInfo.workerIndex` để cấp phát tài khoản hoặc dữ liệu riêng cho mỗi worker; (3) **Dọn dẹp dữ liệu trong `afterEach`**, chẳng hạn xóa các thực thể đã tạo thông qua API; (4) Chỉ sử dụng `test.describe.serial` khi các bài kiểm thử thực sự phụ thuộc vào cùng một chuỗi trạng thái (ví dụ: tạo → cập nhật → xóa). |

**Nguồn:** 
- Playwright Docs — Parallelism and Sharding: https://playwright.dev/docs/test-parallel
- Playwright Docs — Test Isolation: https://playwright.dev/docs/browser-contexts

### FM-3 — Locator mong manh do phụ thuộc vào cấu trúc giao diện (Brittle Locator)

| Khía cạnh | Mô tả |
| --- | --- |
| **Nguyên nhân (Trigger)** | Sử dụng các locator phụ thuộc quá nhiều vào cấu trúc DOM hoặc CSS như `div:nth-child(3) > button`, `.btn-primary`, hoặc XPath dài (`//div[2]/table/tr[3]/td[4]/button`). Khi giao diện thay đổi (thêm phần tử, đổi layout, đổi class CSS), locator không còn trỏ đúng phần tử mặc dù chức năng của ứng dụng không thay đổi. |
| **Triệu chứng (Symptom)** | Các bài kiểm thử từng hoạt động ổn định nhưng đột nhiên thất bại sau khi nhóm phát triển chỉ thay đổi giao diện hoặc bố cục HTML. Lỗi thường gặp là `"locator resolved to 0 elements"`, `"element not found"` hoặc `"Timeout exceeded while waiting for locator"`, mặc dù người dùng vẫn có thể thao tác bình thường trên ứng dụng. |
| **Cách phát hiện (Detection)** | Kiểm tra các locator trong mã nguồn. Nếu locator sử dụng nhiều `nth-child`, XPath tuyệt đối hoặc chuỗi CSS dài phụ thuộc vào cấu trúc HTML thì đây là dấu hiệu của brittle locator. Có thể sử dụng Playwright Codegen để so sánh locator hiện tại với locator được đề xuất hoặc kiểm tra lại bằng Playwright Inspector để xác nhận locator còn xác định đúng phần tử sau khi giao diện thay đổi. |
| **Cách khắc phục (Mitigation)** | Ưu tiên sử dụng các locator phản ánh cách người dùng tương tác với giao diện như `getByRole()`, `getByLabel()`, `getByPlaceholder()`, `getByText()` hoặc `getByTestId()`. Chỉ sử dụng CSS Selector hoặc XPath khi không có lựa chọn nào khác. Nếu ứng dụng hỗ trợ, nên bổ sung thuộc tính `data-testid` cho các thành phần quan trọng để locator ổn định hơn và ít bị ảnh hưởng bởi thay đổi giao diện. |

**Nguồn:**
- Playwright Docs — Locators: https://playwright.dev/docs/locators
- Playwright Best Practices — Use Locators: https://playwright.dev/docs/best-practices#use-locators

# PHẦN B — MABL (AI-First, No-Code)

---

## 6. Cài đặt Mabl (Installation & Setup)

### 6.1 Yêu cầu hệ thống trước khi cài đặt (Prerequisites)

Trước khi bắt đầu sử dụng Mabl, hãy đảm bảo bạn đã chuẩn bị:
- **Hệ điều hành được hỗ trợ:**
  - Windows 10 trở lên
  - macOS (Intel hoặc Apple Silicon M1/M2/M3/M4)
  - Linux (Ubuntu 16.04+, Debian, Fedora, Arch Linux, và các bản phân phối hỗ trợ Snap)
- **Hệ thống EShop SUT** đã được khởi chạy thành công cục bộ (cả Frontend tại `http://localhost:5173` và Backend tại `http://localhost:3000`), hoặc có quyền truy cập vào môi trường staging.
- **Kết nối Internet** — cần thiết để đăng ký tài khoản, tải ứng dụng và truy cập Mabl Dashboard (nền tảng SaaS).
- (Tùy chọn) **Node.js v18+** và npm — nếu muốn sử dụng Mabl CLI để tích hợp CI/CD.

### 6.2 Bước 1 — Đăng ký tài khoản Mabl

1. Truy cập trang đăng ký tại: **https://app.mabl.com/signup**
2. Chọn phương thức đăng ký phù hợp
3. Sau khi xác minh, bạn sẽ được chuyển đến trang **tải Mabl Desktop App** — đây là bước bắt buộc tiếp theo.

> **Lưu ý:** Mabl cung cấp bản **Free Trial 14 ngày** với đầy đủ tính năng. Đủ cho mục đích học tập và thực hành trong học phần.

### 6.3 Bước 2 — Tải và cài đặt Mabl Desktop App

Sau khi đăng ký thành công, Mabl sẽ yêu cầu bạn **tải về ứng dụng Mabl Desktop App** — đây là ứng dụng desktop chuyên dụng (native app) dùng để tạo test, ghi thao tác (Trainer), chạy test cục bộ và quản lý kịch bản kiểm thử. Mabl Desktop App **thay thế hoàn toàn** tiện ích mở rộng Chrome Extension trước đây, mang lại trải nghiệm ổn định và nhiều tính năng hơn (API testing, local test execution, tài nguyên hệ thống riêng biệt).

**Trang tải chính thức:** Sau khi đăng ký/đăng nhập, Mabl Dashboard sẽ tự động điều hướng bạn đến trang tải ứng dụng. Nếu không thấy, truy cập trực tiếp tại Dashboard → biểu tượng tải app, hoặc tìm trong **Help Center** tại https://help.mabl.com.

---

#### 6.3.1 Cài đặt trên Windows

**Yêu cầu:** Windows 10 trở lên.

1. Tại trang tải Mabl Desktop App, nhấn nút **Download for Windows**.
2. File cài đặt (`.exe`) sẽ được tải về thư mục Downloads.
3. **Mở file cài đặt** → Double-click file `.exe` vừa tải.
4. Trình cài đặt (Installation Wizard) sẽ tự động chạy → Nhấn **Next** theo các bước hướng dẫn trên màn hình.
5. Chờ quá trình cài đặt hoàn tất → Nhấn **Finish**.
6. Mabl Desktop App sẽ tự động khởi chạy hoặc bạn có thể mở từ **Start Menu** → Tìm `mabl`.
7. Đăng nhập bằng tài khoản đã đăng ký ở Bước 1.

---

#### 6.3.2 Cài đặt trên macOS

**Yêu cầu:** macOS với chip Intel hoặc Apple Silicon (M1/M2/M3/M4).

1. Tại trang tải, chọn đúng phiên bản phù hợp với chip máy
2. File cài đặt (`.dmg`) sẽ được tải về.
3. **Mở file `.dmg`** → Cửa sổ cài đặt hiện ra.
4. **Kéo biểu tượng Mabl** vào thư mục **Applications** (kéo-thả).
5. Mở **Applications** → Double-click **mabl** để khởi chạy.
6. Nếu macOS hiển thị cảnh báo *"mabl is an app downloaded from the Internet"* → Nhấn **Open** để cho phép.
7. Đăng nhập bằng tài khoản đã đăng ký ở Bước 1.

---

#### 6.3.3 Cài đặt trên Linux

Trên Linux, Mabl Desktop App được phân phối chính thức qua **Snap package** (`mabl-app`). Có nhiều cách cài đặt tuỳ theo bản phân phối và sở thích:

##### Cách 1: Cài đặt bằng dòng lệnh Snap (Khuyến nghị — Tất cả bản phân phối)

**Yêu cầu:** Đã cài đặt `snapd` (trình quản lý Snap). Hầu hết các bản Ubuntu 16.04+ đã có sẵn.

```bash
# Bước 1: Kiểm tra snapd đã cài chưa
snap version

# Nếu chưa có snapd, cài đặt:
# Ubuntu/Debian:
sudo apt update && sudo apt install snapd

# Fedora:
sudo dnf install snapd

# Arch Linux:
sudo pacman -S snapd
sudo systemctl enable --now snapd.socket
# Tạo symbolic link (cần thiết cho Arch):
sudo ln -s /var/lib/snapd/snap /snap

# Bước 2: Cài đặt Mabl Desktop App
sudo snap install mabl-app --classic

# Bước 3: Khởi chạy
mabl-app
```

> **Giải thích flag `--classic`:** Mabl Desktop App cần quyền truy cập hệ thống rộng hơn so với Snap sandbox mặc định (để tương tác với trình duyệt, mạng local, v.v.), nên yêu cầu chế độ `--classic`.

##### Cách 2: Cài đặt qua App Center / Snap Store (Ubuntu Desktop có GUI)

Nếu bạn sử dụng **Ubuntu Desktop** (có giao diện đồ hoạ):

1. Mở ứng dụng **App Center** (hoặc **Ubuntu Software** trên các phiên bản cũ hơn).
2. Tìm kiếm **"mabl"** trong thanh tìm kiếm.
3. Chọn **mabl Desktop Application** (Publisher: `mablops`).
4. Nhấn **Install** → Nhập mật khẩu sudo nếu được yêu cầu.
5. Sau khi cài xong, mở ứng dụng từ **Application Menu** hoặc nhập `mabl-app` trong terminal.

##### Cách 3: Cài đặt từ file .deb (Debian/Ubuntu — Không chính thức)

> **⚠️ Lưu ý quan trọng:** Mabl hiện **không phân phối chính thức** file `.deb` riêng. Tuy nhiên, bạn có thể trích xuất file `.deb` từ Snap package hoặc tìm trong kênh phân phối không chính thức. **Cách 1 (Snap) được khuyến nghị** vì đảm bảo nhận được cập nhật tự động.

Nếu hệ thống của bạn không hỗ trợ Snap (ví dụ: Linux Mint đã gỡ snapd), bạn có thể thử:

```bash
# Tải file .deb từ nguồn Snap (nếu có)
# Hoặc tải trực tiếp từ trang tải Mabl (nếu Mabl cung cấp)

# Cài đặt file .deb:
sudo dpkg -i mabl-desktop_<version>_amd64.deb

# Cài đặt các dependency bị thiếu (nếu có lỗi):
sudo apt-get install -f

# Khởi chạy:
mabl-app
```

##### Bảng tổng hợp cài đặt Linux theo bản phân phối:

| Bản phân phối | Cách cài đặt khuyến nghị | Lệnh |
|--------------|--------------------------|------|
| **Ubuntu 16.04+** | Snap (CLI) hoặc App Center | `sudo snap install mabl-app --classic` |
| **Debian** | Snap (CLI) | `sudo snap install mabl-app --classic` |
| **Fedora** | Snap (CLI) | Cài `snapd` trước, sau đó `sudo snap install mabl-app --classic` |
| **Arch Linux** | Snap (CLI) | Cài `snapd` + enable service, sau đó `sudo snap install mabl-app --classic` |
| **Linux Mint** | Snap (CLI) hoặc .deb | Cần cài lại `snapd` hoặc dùng file `.deb` |

---

#### 6.3.4 Xác minh cài đặt Desktop App thành công

Sau khi cài đặt và khởi chạy Mabl Desktop App trên bất kỳ nền tảng nào:

1. **Màn hình đăng nhập** hiện ra → Nhập email và password đã đăng ký.
2. Sau khi đăng nhập thành công, giao diện chính của Mabl Desktop App sẽ hiển thị 

> **Cập nhật ứng dụng:** Mabl Desktop App tự thông báo khi có bản cập nhật mới qua banner trong ứng dụng. Bạn cũng có thể kiểm tra thủ công: **Help** → **Check for updates**. Trên Linux (Snap), ứng dụng được cập nhật tự động trong nền.

### 6.4 Bước 3 — Tạo Workspace và Application
> ***Lưu ý:*** Có nhiều cách để kết nối `Mabl` với SUT
> - Bạn có thể dừng các dịch vụ deploy web và lấy đường dẫn web để kết nối
> - Bạn có thể dùng `ngrok` để tọ public link
> - Bạn có thể tạo môi trường riêng để test (Đây là cách mình trình bày)

1. **Tạo Workspace:**
   - Đặt tên workspace: `EShop-Testing` (hoặc tên tùy chọn).
   - Workspace là đơn vị quản lý cao nhất, chứa toàn bộ ứng dụng và test.


2. **Tạo Environment (Môi trường):**
   - Vào **Configuration** → **Environments** → **Create Environment**.
   - **Environment name:** `Local Development`
   - **Description:** Tùy chọn
   - **Page interaction speed:** `Normal`
   - Nhấn **Save**

3. **Tạo Application (Ứng dụng cần kiểm thử):**
   - Vào **Configuration** → **Applications** → **Create Application**.
   - **Application Name:** `EShop Web`
   - **Environment** Chọn `Local Development`
   - **Web application URL:** `http://localhost:5173` (URL trang chủ Frontend).
   - Nhấn **Save**.



### 6.5 Bước 4 — Thiết lập Biến ứng dụng (Application Variables)

Để tránh hard-code các giá trị thường dùng, hãy thiết lập biến ứng dụng trước khi tạo test:

1. Vào **Configuration** → **Environments** → Chọn `Local Development`.
2. Chọn `Edit environment` (Cây bút chì)
3. Chọn **Add environment variable**:

| Tên biến | Giá trị | Mục đích |
|----------|---------|----------|
| `app_base_url` | `http://localhost:5173` | URL Frontend EShop |
| `app_api_url` | `http://localhost:3000` | URL Backend API |
| `app_admin_email` | `admin@eshop.com` | Email tài khoản Admin |
| `app_admin_password` | `Admin123!` | Mật khẩu tài khoản Admin |
| `app_test_email` | `test@eshop.com` | Email tài khoản User test |
| `app_test_password` | `Test1234!` | Mật khẩu tài khoản User test |

3. Nhấn **Save** → Các biến này sẽ khả dụng trong mọi test thuộc ứng dụng `EShop Web`.

### 6.6 Tổng kết cài đặt

Sau khi hoàn tất các bước trên, bạn đã có:

| Thành phần | Trạng thái | Kiểm tra |
|-----------|------------|----------|
| Tài khoản Mabl | ✅ Đã đăng ký & xác minh | Đăng nhập tại app.mabl.com |
| Mabl Desktop App | ✅ Đã tải & cài đặt | Ứng dụng khởi chạy và đăng nhập thành công |
| Workspace | ✅ Đã tạo | Hiển thị trên Dashboard / Desktop App |
| Application `EShop Web` | ✅ Đã cấu hình URL | Hiển thị trong Settings → Applications |
| Environment `Local Development` | ✅ Đã tạo | Hiển thị trong Settings → Environments |
| Application Variables | ✅ Đã thiết lập 6 biến | Tab Variables trong Application settings |

---

## 7. Bước đầu với Mabl (First Steps)

Mục này hướng dẫn từng bước tạo kịch bản kiểm thử E2E đầu tiên trên Mabl bằng phương pháp **Record & Playback** (ghi và phát lại) — không cần viết một dòng mã nào. Kịch bản mẫu sẽ kiểm thử luồng **Đăng nhập → Xem sản phẩm → Thêm vào giỏ hàng** trên EShop.

### 7.1 Kịch bản kiểm thử mẫu

**Mục tiêu:** Xác minh người dùng có tài khoản hợp lệ có thể đăng nhập thành công vào EShop, xem sản phẩm và thêm sản phẩm vào giỏ hàng.

**Dữ liệu kiểm thử:**
- Email: `test@eshop.com`
- Password: `Test1234!`

**Các bước nghiệp vụ (Business Steps):**
1. Mở trang đăng nhập EShop.
2. Nhập email và mật khẩu.
3. Nhấn nút Đăng nhập.
4. Xác minh đăng nhập thành công (nút "Đăng xuất" xuất hiện trên Navbar).
5. Nhấn vào một sản phẩm bất kỳ trên trang chủ.
6. Xác minh trang chi tiết sản phẩm hiển thị đầy đủ thông tin.
7. Nhấn nút "Thêm vào giỏ hàng".
8. Xác minh sản phẩm có vào giỏ hàng chưa

### 7.2 Quy trình tạo Test bằng Mabl Desktop App (10 bước)

> **Lưu ý thuật ngữ:** Trong Mabl Desktop App, tính năng **Trainer** là chế độ ghi thao tác (Record Mode) được tích hợp sẵn bên trong ứng dụng. Khi bạn tạo test mới, Desktop App sẽ mở trình duyệt tích hợp riêng (không phải Chrome cá nhân) và kích hoạt Trainer để ghi lại mọi thao tác.

#### Bước 1 — Khởi chạy EShop SUT
Trước tiên, đảm bảo hệ thống EShop đang chạy:
```bash
# Terminal 1: Khởi chạy Backend
cd backend && node database.js && node server.js

# Terminal 2: Khởi chạy Frontend
cd frontend-web && npm run dev

# Cách ngắn gọn 
./run_servers.sh
```
Truy cập `http://localhost:5173` trên trình duyệt bất kỳ để xác minh trang chủ EShop hiển thị bình thường.

#### Bước 2 — Mở Mabl Desktop App và tạo Test mới
1. Mở **Mabl Desktop App** (đã cài đặt ở mục 6.3).
2. Đăng nhập nếu chưa đăng nhập → Giao diện chính hiện ra.
3. Nhấn nút **"Build test"** ở thanh menu trái.
4. Chọn ***"Create manually"*** để tạo thủ công
5. Cấu hình test mới:
   - **Test Name:** `[E2E] Đăng nhập và Thêm sản phẩm vào giỏ hàng`
   - Chọn tab ***MOBILE WEB***
   - **Application:** Chọn `EShop Web`
   - **Starting URL:** `http://localhost:5173`
   - **Mobile web viewport**: Chọn cái nào to to cho dễ nhìn
6. Nhấn **"Create Test"** → Mabl Desktop App sẽ mở một **cửa sổ trình duyệt tích hợp** (built-in browser), tự động điều hướng đến trang đăng nhập EShop và kích hoạt **Trainer (chế độ ghi — Recording Mode)**.

#### Bước 3 — Ghi thao tác đăng nhập
Trong chế độ ghi (Trainer), mọi thao tác của bạn trên cửa sổ trình duyệt tích hợp đều được Mabl tự động ghi lại:

1. **Nhấn nút đăng nhập**
2. **Nhấn vào ô Email** → Nhập: `test@eshop.com`
   - Mabl Trainer sẽ ghi lại bước: `Type "test@eshop.com" into [email field]`.
2. **Nhấn vào ô Password** → Nhập: `Test1234!`
   - Ghi lại: `Type "Test1234!" into [password field]`.
3. **Nhấn nút Đăng nhập**
   - Ghi lại: `Click [Đăng nhập button]`.
4. Chờ trang chuyển hướng về trang chủ EShop (Mabl tự động chờ — Smart Wait).

> **Mẹo:** Thay vì nhập giá trị cố định, bạn có thể sử dụng biến. Trong Mabl Trainer, rê chuột vào bước vừa ghi → chọn **"Edit"** → chọn ***Variable*** → chọn `{{app.test_email}}` hoặc `{{app.test_password}}` → ***Save***.

#### Bước 4 — Thêm Assertion xác minh đăng nhập thành công
Sau khi trang chủ EShop tải xong:

1. Trên thanh công cụ Mabl Trainer, nhấn nút **"Assert"** (biểu tượng ✓).
2. Chọn tab **Element**
3. Di chuột đến phần tử chứa text **"Thoát"** trên Navbar.
4. Nhấn vào phần tử → Mabl Trainer hiển thị menu assertion.
5. Chọn tab **"HTML"**
6. **Assertion type:** is present
   - Ghi lại: `Assert that [Thoát] is present`.

#### Bước 5 — Ghi thao tác xem sản phẩm
1. **Nhấn vào một sản phẩm** trên trang chủ (ví dụ: sản phẩm đầu tiên trong danh sách lưới).
   - Ghi lại: `Click [product card]`.
2. Chờ trang chi tiết sản phẩm tải xong.

#### Bước 6 — Thêm Assertion cho trang chi tiết sản phẩm
(Thực hiện tương tự bước 4)
1. Nhấn **"Assert"** trên Mabl Trainer.
2. Chọn phần tử **Tên sản phẩm** (thẻ `<h1>`) → **"is present"**.
3. Chọn phần tử **Giá sản phẩm** → **"Contains"** → **Expected value
**: `₫`.
4. Chọn nút **"Thêm vào giỏ hàng"** → **"is present"**.

#### Bước 7 — Ghi thao tác thêm vào giỏ hàng
1. **Nhấn nút "Thêm vào giỏ hàng"** trên trang chi tiết sản phẩm.
   - Ghi lại: `Click [Thêm vào giỏ hàng button]`.
2. **Nhấn nút "Giỏ hàng"** trên navbar

#### Bước 8 — Thêm Assertion cho text giỏ hàng trống
1. Nhấn **"Assert"** trên Mabl Trainer.
2. Chọn **Giỏ hàng của bạn đang trống** → **not present**

#### Bước 9 — Dừng ghi và Lưu Test
1. Trên Mabl Trainer, nhấn nút **"Stop Recording"** (biểu tượng ■).
2. Review lại danh sách các bước đã ghi trong Trainer:
   - Bước 1: Navigate to login page
   - Bước 2: Type email
   - Bước 3: Type password
   - Bước 4: Click Đăng nhập
   - Bước 5: Assert "Đăng xuất" is visible
   - Bước 6: Click product card
   - Bước 7: Assert product name is visible
   - Bước 8: Assert price contains "₫"
   - Bước 9: Click "Thêm vào giỏ hàng"
   ....
3. Nhấn **"Save Test"** → Test được lưu trên Mabl Cloud.

#### Bước 10 — Chạy Test và Xem kết quả
1. **Chạy từ Dashboard:** Vào **Tests** → Chọn test vừa tạo → Nhấn **"Run Test"**.
   - Mabl mở cửa sổ trình duyệt tích hợp và tự động thực thi lại toàn bộ các bước đã ghi.
   - Quan sát quá trình chạy — mỗi bước được đánh dấu xanh (✅ Pass) hoặc đỏ (❌ Fail).

2. **Xem báo cáo kết quả chi tiết:**
   - Xem **Local test run output** window


### 7.3 So sánh quy trình Playwright vs. Mabl

| Bước | Playwright | Mabl |
|------|-----------|------|
| Tạo test | Viết mã JavaScript/TypeScript trong file `.spec.js` | Mở Desktop App → "Create Test" → Ghi thao tác bằng Trainer |
| Thêm assertion | Viết code: `expect(locator).toBeVisible()` | Click nút "Assert" → Chọn phần tử → Chọn loại assertion |
| Chạy test | Terminal: `npx playwright test` | Nhấn "Run Test" trên Desktop App hoặc Dashboard |
| Xem báo cáo | `npx playwright show-report` → Mở HTML | Dashboard → Test Runs → Xem inline |
| Bảo trì test | Sửa mã nguồn khi selector thay đổi | Auto-Healing tự sửa selector |

---

## 8. Sử dụng nâng cao Mabl (Advanced Usage)

Phần này trình bày các kỹ thuật nâng cao khi sử dụng Mabl để kiểm thử hệ thống EShop SUT một cách chuyên sâu, hiệu quả và ổn định.

### 8.1 Tổng quan về Mô hình AI-First

Mabl là nền tảng kiểm thử thông minh tích hợp AI/ML vào toàn bộ vòng đời kiểm thử (test lifecycle). Khác với các framework truyền thống như Selenium hay Playwright vốn yêu cầu người dùng viết mã và xử lý đồng bộ thủ công, Mabl cung cấp:

- **Auto-Healing (Tự phục hồi):** Khi các phần tử giao diện (DOM elements) của EShop thay đổi (ví dụ: đổi class CSS, thay đổi cấu trúc React component), Mabl tự động cập nhật selector mà không cần sửa test thủ công.
- **Smart Wait (Chờ thông minh):** Mabl tự động phát hiện khi nào trang React SPA đã render xong, giải quyết triệt để vấn đề chập chờn (flakiness) phổ biến trên các ứng dụng bất đồng bộ.
- **Visual Change Detection (Phát hiện thay đổi giao diện):** So sánh ảnh chụp giao diện giữa các lần chạy test, phát hiện các thay đổi UI bất ngờ mà assertion truyền thống không bắt được.
- **Performance Monitoring:** Tự động thu thập các chỉ số hiệu năng (Core Web Vitals, thời gian tải trang) trong mỗi lần chạy test.

### 8.2 Tạo và Quản lý Reusable Flows (Luồng tái sử dụng)

Khi kiểm thử EShop, nhiều kịch bản test đều bắt đầu bằng bước đăng nhập (FR-02). Thay vì lặp lại các bước login trong mỗi test, Mabl cho phép tạo **Reusable Flow** (luồng tái sử dụng):

**Quy trình tạo Reusable Flow cho bước Đăng nhập EShop:**

1. Mở **Mabl Trainer** (tiện ích mở rộng trình duyệt).
2. Điều hướng đến trang đăng nhập EShop: `http://localhost:5173/login`.
3. Ghi lại các bước:
   - Nhập Email vào trường `type="email"` → sử dụng biến `{{app.login_email}}`.
   - Nhập Password vào trường `type="password"` → sử dụng biến `{{app.login_password}}`.
   - Nhấn nút **Đăng nhập**.
   - Thêm assertion xác minh đăng nhập thành công (ví dụ: kiểm tra sự xuất hiện của nút "Đăng xuất" trên Navbar).
4. Lưu flow với tên mô tả rõ ràng, ví dụ: `[Flow] Đăng nhập EShop - User`.
5. Trong các test khác, chèn flow này bằng cách chọn **Insert Flow** → chọn flow đã lưu.

**Lưu ý đặc biệt cho EShop:**
- Flow đăng nhập nên kiểm tra cả trường hợp tài khoản bị khóa sau 3 lần sai (FR-02), nên tách thành flow riêng cho kịch bản đăng nhập thất bại.
- Flow thanh toán (FR-08) nên tách thành các flow nhỏ: Thêm sản phẩm → Xem giỏ hàng → Checkout → Xác nhận.

### 8.3 Data-Driven Testing (Kiểm thử hướng dữ liệu)

Mabl hỗ trợ kiểm thử với nhiều bộ dữ liệu khác nhau thông qua **Data Tables** mà không cần viết mã lặp lại:

**Ví dụ: Kiểm thử Mã Giảm Giá (FR-09) với Data Table**

| Scenario           | coupon_code | cart_total | expected_discount | expected_result |
|--------------------|-------------|------------|-------------------|-----------------|
| Mã hợp lệ percent  | SAVE10      | 500000     | 50000             | success         |
| Mã hợp lệ fixed    | BIGBUY      | 600000     | 50000             | success         |
| Mã hết hạn          | EXPIRED     | 200000     | 0                 | error           |
| Dưới ngưỡng tối thiểu | SAVE10   | 100000     | 0                 | error           |
| Mã không tồn tại    | FAKECODE    | 500000     | 0                 | error           |

**Cách thiết lập:**
1. Trong Mabl Dashboard, vào **Configuration** → **Data Tables**.
2. Tạo bảng mới, nhập các cột và dữ liệu như bảng trên.
3. Trong test, sử dụng biến `{{dataTable.coupon_code}}`, `{{dataTable.cart_total}}`,... tại các bước nhập liệu tương ứng.
4. Mabl sẽ tự động chạy test với từng hàng dữ liệu, tạo ra nhiều kết quả test từ một kịch bản duy nhất.

### 8.4 Kiểm thử API trực tiếp trên Mabl

Ngoài kiểm thử giao diện (Browser Test), Mabl còn hỗ trợ **API Test** để kiểm thử trực tiếp các endpoint của Backend EShop. Điều này đặc biệt quan trọng cho các yêu cầu bảo mật (SEC-01 đến SEC-07):

**Ví dụ: Kiểm thử phân quyền Admin API (FR-12, SEC-03)**

1. Tạo một API Test mới trong Mabl.
2. Cấu hình request:
   - **Method:** `POST`
   - **URL:** `{{app.base_url}}/api/products`
   - **Headers:** `Authorization: Bearer {{user_token}}` (token của tài khoản user thường, không phải admin)
   - **Body:** `{"name": "Hack Product", "price": 1000, "category_id": 1}`
3. Thêm assertion:
   - **Status Code** phải là `403` (Forbidden).
   - **Response body** phải chứa thông báo lỗi về quyền truy cập.
4. Lặp lại tương tự cho các endpoint: `DELETE /api/products/:id`, `POST /api/categories`, `POST /api/coupons`.

**Kết hợp API Test với Browser Test:**
- Sử dụng API test để tạo dữ liệu tiền điều kiện (precondition data) trước khi chạy Browser test. Ví dụ: Tạo sản phẩm mới qua API, rồi kiểm tra hiển thị trên giao diện.
- Sử dụng API test để xác minh trạng thái Backend sau khi thao tác trên UI. Ví dụ: Sau khi đặt hàng trên giao diện, gọi API `GET /api/orders` để xác minh đơn hàng đã được tạo đúng.

### 8.5 Quản lý Biến và Môi trường (Variables & Environments)

Mabl cung cấp hệ thống biến phân cấp để quản lý cấu hình kiểm thử linh hoạt giữa các môi trường:

**Các loại biến trong Mabl:**

| Loại biến | Phạm vi | Ví dụ cho EShop |
|-----------|---------|-----------------|
| **Application Variables** | Toàn ứng dụng | `app.base_url = http://localhost:5173` |
| **Environment Variables** | Theo môi trường (Dev/Staging/Prod) | `env.api_url = http://localhost:3000` |
| **Flow Variables** | Trong một flow | `flow.created_email = test_{{timestamp}}@mail.com` |
| **Data Table Variables** | Từ bảng dữ liệu | `dataTable.coupon_code = SAVE10` |

**Thiết lập môi trường cho EShop:**
1. Vào **Settings** → **Environments** trên Mabl Dashboard.
2. Tạo các môi trường:
   - **Local:** `base_url = http://localhost:5173`, `api_url = http://localhost:3000`
   - **Staging (nếu có):** `base_url = https://staging.eshop.example.com`
3. Khi chạy test, chọn môi trường phù hợp. Mabl tự động thay thế tất cả biến `{{env.*}}` theo môi trường được chọn.

**Sử dụng biến động (Dynamic Variables):**
- `{{@timestamp}}` — Dấu thời gian hiện tại, hữu ích để tạo email đăng ký duy nhất: `user_{{@timestamp}}@test.com` (tránh lỗi trùng email theo FR-01).
- `{{@random.number(1000,9999)}}` — Số ngẫu nhiên, dùng để tạo dữ liệu test đa dạng.
- `{{@previous_step.output}}` — Giá trị đầu ra từ bước trước, dùng để truyền OTP từ bước "Lấy mã OTP" sang bước "Đặt lại mật khẩu" (FR-03).

### 8.6 Assertions nâng cao và Visual Testing

Mabl cung cấp nhiều loại assertion mạnh mẽ vượt xa khả năng của các framework truyền thống:

**Assertion cho EShop:**
- **Text Assertion:** Kiểm tra nội dung văn bản — ví dụ: Trạng thái đơn hàng phải hiển thị tiếng Việt ("Đang giao" thay vì "shipping") theo FR-11.
- **Element Assertion:** Kiểm tra sự tồn tại, hiển thị, hoặc thuộc tính của phần tử — ví dụ: Kiểm tra trường email có `type="email"` (FR-22).
- **URL Assertion:** Xác minh URL hiện tại sau điều hướng — ví dụ: Sau đăng nhập thành công, URL phải chuyển về trang chủ.
- **Style Assertion:** Kiểm tra CSS — ví dụ: Nút "Mua hàng" phải có màu xanh dương, nút "Hủy" phải có màu đỏ (FR-21).
- **JavaScript Assertion:** Chạy đoạn JavaScript tùy chỉnh để xác minh logic phức tạp:
  ```javascript
  // Kiểm tra định dạng tiền tệ VND (FR-21: phân cách hàng nghìn + ký hiệu ₫)
  var priceText = document.querySelector('.product-price').textContent;
  var isValidFormat = /[\d]{1,3}(,\d{3})*\s?₫/.test(priceText);
  return isValidFormat;
  ```

**Visual Testing (Kiểm thử trực quan):**
1. Khi chạy test lần đầu, Mabl tự động chụp ảnh baseline cho mỗi bước.
2. Các lần chạy tiếp theo, Mabl so sánh pixel-by-pixel và đánh dấu vùng thay đổi.
3. Thiết lập ngưỡng chấp nhận (sensitivity threshold) phù hợp cho EShop:
   - **Strict (Nghiêm ngặt):** Cho các trang quan trọng như Thanh toán, Giỏ hàng.
   - **Relaxed (Linh hoạt):** Cho các trang có nội dung động như Trang chủ (sản phẩm thay đổi thường xuyên).
4. Review và approve/reject các thay đổi visual trong Mabl Dashboard.

### 8.7 Tích hợp CI/CD Pipeline

Mabl tích hợp liền mạch vào quy trình CI/CD để kiểm thử tự động mỗi khi có thay đổi mã nguồn:

**Tích hợp với GitHub Actions (phù hợp với repository EShop):**

```yaml
# .github/workflows/mabl-test.yml
name: Mabl E2E Tests

on:
  push:
    branches: [main, web-automation-testing]
  pull_request:
    branches: [main]

jobs:
  mabl-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install & Start Backend
        run: |
          cd backend
          npm install
          node database.js
          node server.js &
          sleep 5

      - name: Install & Start Frontend
        run: |
          cd frontend-web
          npm install
          npm run dev &
          sleep 10

      - name: Run Mabl Tests
        uses: mablhq/github-run-tests-action@v1
        with:
          application-id: ${{ secrets.MABL_APP_ID }}
          environment-id: ${{ secrets.MABL_ENV_ID }}
          api-key: ${{ secrets.MABL_API_KEY }}
          await-completion: true

      - name: Deployment Event (tuỳ chọn)
        if: github.ref == 'refs/heads/main'
        uses: mablhq/github-deployment-events-action@v1
        with:
          application-id: ${{ secrets.MABL_APP_ID }}
          environment-id: ${{ secrets.MABL_ENV_ID }}
          api-key: ${{ secrets.MABL_API_KEY }}
```

**Sử dụng Mabl CLI:**
```bash
# Cài đặt Mabl CLI
npm install -g @mablhq/mabl-cli

# Đăng nhập
mabl auth activate-key <YOUR_API_KEY>

# Chạy test plan cụ thể
mabl deployments create \
  --application-id <APP_ID> \
  --environment-id <ENV_ID> \
  --await-completion

# Xem kết quả
mabl deployments list --application-id <APP_ID> --limit 5
```

### 8.8 Chiến lược kiểm thử nâng cao cho EShop với Mabl

**Kiểm thử Luồng đặt hàng End-to-End (FR-01 → FR-11):**

Tổ chức test plan theo chuỗi luồng nghiệp vụ hoàn chỉnh:

1. **[Flow] Đăng ký tài khoản** → Tạo tài khoản mới với email động `{{@timestamp}}`.
2. **[Flow] Đăng nhập** → Đăng nhập bằng tài khoản vừa tạo.
3. **[Flow] Tìm kiếm & Xem sản phẩm** → Tìm kiếm sản phẩm, xác minh kết quả.
4. **[Flow] Thêm vào giỏ hàng** → Thêm nhiều sản phẩm, xác minh badge số lượng (FR-23).
5. **[Flow] Áp mã giảm giá** → Nhập mã `SAVE10`, xác minh giảm giá 10%.
6. **[Flow] Thanh toán** → Hoàn tất thanh toán, xác minh giỏ hàng được xóa (FR-08).
7. **[Flow] Kiểm tra lịch sử** → Vào lịch sử đơn hàng, xác minh đơn mới ở trạng thái "Chờ xử lý" (FR-11).

**Kiểm thử State Machine Đơn hàng (FR-10):**
- Tạo flow riêng cho mỗi chuyển trạng thái hợp lệ: `pending → confirmed → shipping → delivered`.
- Tạo test case cho các chuyển trạng thái không hợp lệ: `delivered → canceled` (phải thất bại).
- Sử dụng API test để chuyển trạng thái nhanh thay vì thao tác qua UI Admin.

---

## 9. Xử lý sự cố Mabl (Troubleshooting)

Phần này cung cấp hướng dẫn khắc phục các lỗi thường gặp khi sử dụng Mabl để kiểm thử hệ thống EShop SUT.

### 9.1 Lỗi liên quan đến Mabl Trainer

#### Vấn đề 1: Mabl Trainer không ghi nhận thao tác click trên EShop

**Triệu chứng:** Nhấp vào nút hoặc liên kết trên EShop nhưng Mabl Trainer không ghi lại bước (step) nào.

**Nguyên nhân có thể:**
- Phần tử được xử lý bằng sự kiện JavaScript tùy chỉnh (custom event handler) của React thay vì sự kiện DOM gốc.
- Phần tử nằm trong Shadow DOM hoặc portal (React Portal).
- Sự kiện bị chặn bởi overlay hoặc modal chưa đóng.

**Cách khắc phục:**
1. Kiểm tra phần tử bằng DevTools (F12) → Xác minh phần tử có thể click được (không bị che bởi element khác).
2. Thử sử dụng tính năng **"Find Element"** trong Mabl Trainer để chọn phần tử thủ công.
3. Sử dụng bước **"Execute JavaScript"** để kích hoạt hành động:
   ```javascript
   document.querySelector('button[type="submit"]').click();
   ```
4. Đảm bảo không có dialog/modal nào đang mở che phủ phần tử mục tiêu.

---

#### Vấn đề 2: Mabl Trainer bị mất kết nối hoặc đóng đột ngột

**Triệu chứng:** Trainer hiển thị "Disconnected" hoặc cửa sổ Trainer biến mất giữa chừng.

**Cách khắc phục:**
1. Đóng hoàn toàn trình duyệt và mở lại.
2. Xóa cache của Mabl Extension: Vào `chrome://extensions/` → Tìm Mabl → **Details** → **Clear data**.
3. Đảm bảo phiên bản Mabl Extension là mới nhất.
4. Tắt các tiện ích mở rộng khác có thể xung đột (AdBlock, React DevTools, v.v.).
5. Thử sử dụng trình duyệt Chrome ở chế độ Incognito (chỉ bật Mabl Extension).

---

### 9.2 Lỗi liên quan đến React SPA (EShop)

#### Vấn đề 3: Test thất bại do phần tử chưa render kịp (Element Not Found)

**Triệu chứng:** Test báo lỗi `Element not found` hoặc `Unable to find element` dù phần tử tồn tại trên trang khi kiểm tra thủ công.

**Nguyên nhân gốc rễ:** Ứng dụng React SPA (EShop) render bất đồng bộ. Sau khi điều hướng (route change), React cần thời gian để:
- Fetch dữ liệu từ API Backend (`http://localhost:3000`).
- Render component mới vào DOM.
- Hoàn tất hydration và state update.

**Cách khắc phục:**
1. **Thêm bước Wait (Chờ):** Trong Mabl Trainer, chèn bước **"Wait for element"** trước khi tương tác:
   - Chọn **"Wait for element to be visible"**.
   - Chỉ định phần tử mục tiêu (ví dụ: tiêu đề trang, bảng dữ liệu).
   - Đặt timeout phù hợp (khuyến nghị: 10-15 giây cho EShop local).

2. **Chờ trạng thái loading biến mất:** EShop hiển thị trạng thái loading khi tải dữ liệu (FR-05). Thêm bước:
   - **"Wait for element to NOT be visible"** → Chọn spinner/loading indicator.

3. **Sử dụng "Wait for Network Idle":** Mabl tự động chờ network ổn định, nhưng có thể tùy chỉnh thời gian chờ trong **Test Settings**.

---

#### Vấn đề 4: Selector bị vỡ sau khi cập nhật mã nguồn EShop

**Triệu chứng:** Test đang chạy ổn bỗng nhiên thất bại hàng loạt sau khi team phát triển cập nhật mã nguồn Frontend.

**Nguyên nhân:** React build process tạo ra class CSS names khác nhau (CSS Modules, Tailwind purge).

**Cách khắc phục:**
1. **Tận dụng Auto-Healing:** Mabl tự động thử các selector thay thế. Kiểm tra trong **Test Output** xem bước nào đã được auto-heal.
2. **Review Auto-Heal:** Vào **Test Runs** → chọn run bị ảnh hưởng → xem tab **"Healed Steps"** → **Accept** hoặc **Reject** các thay đổi.
3. **Sử dụng selector ổn định hơn:**
   - Ưu tiên: `data-testid`, `id`, `name`, `aria-label`.
   - Tránh: Class CSS động, XPath phức tạp phụ thuộc cấu trúc DOM.
4. **Đề xuất cho team phát triển:** Thêm thuộc tính `data-testid` vào các phần tử quan trọng trong mã nguồn React của EShop.

---

### 9.3 Lỗi liên quan đến Dữ liệu và Môi trường

#### Vấn đề 5: Test thất bại do dữ liệu không nhất quán (Data Inconsistency)

**Triệu chứng:** Test đăng nhập thất bại vì tài khoản `test@eshop.com` đã bị xóa hoặc bị khóa. Test áp mã giảm giá thất bại vì mã `SAVE10` đã hết lượt sử dụng.

**Cách khắc phục:**
1. **Reset database trước mỗi test suite:**
   ```bash
   # Chạy lại script khởi tạo database
   cd backend && node database.js
   ```
   Tích hợp bước này vào CI/CD pipeline hoặc chạy thủ công trước mỗi phiên test.

2. **Sử dụng dữ liệu test động:** Thay vì dùng tài khoản cố định, tạo tài khoản mới cho mỗi lần chạy test:
   - Tạo flow đăng ký với email: `autotest_{{@timestamp}}@test.com`.
   - Lưu email và password vào biến flow để sử dụng ở các bước sau.

3. **Sử dụng API Setup/Teardown:**
   - **Setup (trước test):** Gọi API tạo tài khoản, tạo sản phẩm, tạo coupon cần thiết.
   - **Teardown (sau test):** Gọi API dọn dẹp dữ liệu test (xóa tài khoản, reset trạng thái).

---

#### Vấn đề 6: Test thất bại do Backend hoặc Frontend chưa sẵn sàng

**Triệu chứng:** Tất cả test đều thất bại với lỗi `ERR_CONNECTION_REFUSED` hoặc trang hiển thị trắng.

**Cách khắc phục:**
1. Xác minh Backend đang chạy:
   ```bash
   curl http://localhost:3000/api/products
   ```
   Nếu không nhận được phản hồi → khởi động lại Backend (`node server.js`).

2. Xác minh Frontend đang chạy:
   ```bash
   curl http://localhost:5173
   ```
   Nếu không nhận được phản hồi → khởi động lại Frontend (`npm run dev`).

3. Kiểm tra cổng (port) không bị xung đột:
   ```bash
   # Linux/macOS
   lsof -i :3000
   lsof -i :5173
   ```

4. Trong Mabl, đảm bảo biến `app.url` trỏ đúng đến URL của EShop Frontend.

---

### 9.4 Lỗi liên quan đến Tài khoản bị Khóa (FR-02)

#### Vấn đề 7: Tài khoản test bị khóa 30 giây giữa chừng

**Triệu chứng:** Test đăng nhập thất bại liên tục với thông báo tài khoản bị tạm khóa.

**Nguyên nhân:** Một test trước đó đã đăng nhập sai 3 lần liên tiếp (FR-02), kích hoạt cơ chế khóa tạm thời 30 giây.

**Cách khắc phục:**
1. **Thêm bước chờ (Wait):** Nếu test có kịch bản đăng nhập sai, thêm bước chờ ít nhất 35 giây trước khi thử đăng nhập lại:
   - Trong Mabl Trainer: **Add Step** → **Wait** → **Pause** → nhập `35000` ms.
2. **Tách test case:** Không ghép kịch bản đăng nhập sai và đăng nhập đúng vào cùng một test. Tạo test riêng cho:
   - `[Test] Đăng nhập thành công`
   - `[Test] Đăng nhập thất bại - Khóa tài khoản sau 3 lần sai`
3. **Sử dụng tài khoản khác nhau:** Mỗi test dùng tài khoản riêng để tránh xung đột trạng thái khóa.
4. **Reset database** trước khi chạy bộ test để xóa trạng thái khóa tài khoản.

---

### 9.5 Xử lý Flaky Tests (Test chập chờn)

#### Vấn đề 8: Test lúc pass lúc fail không rõ nguyên nhân

**Triệu chứng:** Cùng một test case, chạy lần 1 pass, lần 2 fail, lần 3 lại pass.

**Nguyên nhân phổ biến trên EShop (React SPA):**
- Thời gian phản hồi API Backend không ổn định.
- React render bất đồng bộ với thời gian khác nhau mỗi lần.
- Dữ liệu trong SQLite thay đổi giữa các lần chạy (ví dụ: coupon đã dùng hết lượt).
- Animation/Transition CSS chưa kết thúc khi Mabl cố tương tác.

**Chiến lược khắc phục toàn diện:**

1. **Phân tích Flaky Pattern trên Mabl Dashboard:**
   - Vào **Tests** → Chọn test bị flaky → Tab **"Reliability"**.
   - Xem biểu đồ tỷ lệ thành công theo thời gian, xác định pattern (thời điểm fail, bước fail).

2. **Thêm Wait thông minh thay vì Wait cố định:**
   - ❌ Tránh: `Pause 5000ms` (chờ cố định → chậm và không đáng tin cậy).
   - ✅ Nên: `Wait for element ".product-card" to be visible` (chờ phần tử xuất hiện).
   - ✅ Nên: `Wait for element ".loading-spinner" to NOT be visible` (chờ loading kết thúc).

3. **Đảm bảo tính độc lập của test (Test Isolation):**
   - Mỗi test phải tự tạo dữ liệu cần thiết (không phụ thuộc vào test khác).
   - Mỗi test phải dọn dẹp dữ liệu sau khi chạy xong (hoặc reset database).

4. **Cấu hình Retry trên Mabl:**
   - Vào **Plan Settings** → **Retry Configuration**.
   - Đặt số lần thử lại: 1-2 lần (không nên quá nhiều, sẽ che giấu lỗi thật).

---

### 9.6 Lỗi kết nối Mabl Cloud và Network

#### Vấn đề 9: Không thể chạy test từ Mabl Cloud đến localhost

**Triệu chứng:** Test chạy tốt trên Mabl Trainer (local) nhưng thất bại khi chạy từ Mabl Cloud Dashboard.

**Nguyên nhân:** Mabl Cloud không thể truy cập `localhost` của máy tính người dùng.

**Cách khắc phục:**
1. **Sử dụng Mabl Link (khuyến nghị):**
   - Tải và cài đặt **Mabl Link Agent** trên máy có chạy EShop.
   - Mabl Link tạo tunnel an toàn từ Mabl Cloud đến máy local.
   - Cấu hình trong Mabl Dashboard: **Settings** → **Networking** → **Enable Mabl Link**.

2. **Deploy EShop lên môi trường Staging:**
   - Nếu có server staging, deploy EShop lên đó và cập nhật URL trong Mabl Environment.

3. **Sử dụng ngrok hoặc tương tự (tạm thời):**
   ```bash
   # Expose Frontend
   ngrok http 5173
   # Cập nhật app.url trong Mabl với URL ngrok
   ```

---

### 9.7 Bảng tham chiếu nhanh (Quick Reference)

| Lỗi | Triệu chứng | Giải pháp nhanh |
|------|-------------|-----------------|
| Element Not Found | Test fail ở bước click/type | Thêm "Wait for element visible" |
| Connection Refused | Tất cả test fail | Kiểm tra Backend/Frontend có đang chạy |
| Account Locked | Đăng nhập thất bại liên tục | Chờ 35s hoặc reset database |
| Selector Broken | Test fail sau khi cập nhật code | Review Auto-Heal trong Mabl Dashboard |
| Data Inconsistency | Test fail vì dữ liệu sai | Reset database: `node database.js` |
| Flaky Test | Test lúc pass lúc fail | Thay Pause bằng Wait for element |
| Cloud → Localhost | Test cloud fail, local pass | Cài đặt Mabl Link Agent |
| Trainer Disconnected | Trainer mất kết nối | Xóa cache extension, khởi động lại |



# PHẦN C — PHỤ LỤC


## 10. Tài liệu tham khảo
- [Playwright Official Document](https://playwright.dev)
- [Playwright Offical Repository](https://github.com/microsoft/playwright)
- [Mabl Official Website](https://www.mabl.com)
- [Mabl Documentation](https://help.mabl.com)
- [Mabl GitHub Actions](https://github.com/mablhq/github-run-tests-action)
- [Mabl CLI Documentation](https://help.mabl.com/docs/mabl-cli)

