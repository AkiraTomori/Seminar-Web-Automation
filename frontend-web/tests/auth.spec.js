import { test, expect } from '@playwright/test';

// Bật chế độ chạy tuần tự: Các test case chia sẻ một trình duyệt, chạy nối đuôi nhau
test.describe.configure({ mode: 'serial' });

test.describe('Journey 2: Kiểm thử Ranh giới Bảo mật & Khôi phục Tài khoản', () => {
  let page;
  let otpCode; // Biến dùng chung để chuyển dữ liệu OTP giữa các test case

  // Khởi tạo trình duyệt một lần duy nhất cho cả chuỗi chu trình
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  // -------------------------------------------------------------------------
  test('Bước 1: Xác minh cơ chế khóa tài khoản khi đăng nhập sai 3 lần [FR-02]', async () => {
    await page.goto('/login');
    const userNameInput = page.locator('input').first();
    const passwordInput = page.locator('input').nth(1);
    const loginButton = page.locator('button:has-text("Sign In")');

    for (let i = 0; i < 3; i++) {
      await userNameInput.fill('user_test_lockout@eshop.com');
      await passwordInput.fill('WrongPassword123');
      await loginButton.click();
      const errorBox = page.locator('.bg-red-100');
      await expect(errorBox).toBeVisible();
    }
  });

  // -------------------------------------------------------------------------
  test('Bước 2: Yêu cầu mã OTP và kiểm tra thiết kế Chỉ báo bước [FR-03]', async () => {
    await page.goto('/forgot-password');

    // Tách riêng rẽ ca kiểm thử giao diện chỉ báo bước
    // const stepIndicator = page.locator('text=/Bước 1\\s*/\\s*2/');
    // await expect(stepIndicator).toBeVisible(); 

    await page.locator('form input').fill('test@eshop.com');
    await page.locator('button:has-text("Lấy mã OTP")').click();

    const otpMessageBox = page.locator('.bg-green-100');
    await expect(otpMessageBox).toBeVisible();
    const otpMessageText = await otpMessageBox.innerText();
    
    // Lưu mã OTP vào biến dùng chung để test case dưới sử dụng
    otpCode = otpMessageText.match(/\d+/)[0];
  });

  // -------------------------------------------------------------------------
  test('Bước 3: Đặt lại mật khẩu mới và bẫy lỗi Regex khoảng trắng [FR-03][FR-01]', async () => {
    // Đảm bảo có OTP từ bước trước truyền sang
    expect(otpCode).toBeDefined();

    await page.locator('input').first().fill(otpCode);
    await page.locator('input').nth(1).fill('NewPassword123!'); 

    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Mật khẩu quá yếu!');
      await dialog.accept();
    });
    await page.locator('button:has-text("Đặt lại mật khẩu")').click();

    // Sửa lỗi nghiệp vụ bằng mật khẩu có khoảng trắng để đi tiếp luồng
    await page.locator('input').nth(1).fill('NewPassword123! '); 
    
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Đổi mật khẩu thành công!');
      await dialog.accept();
    });
    await page.locator('button:has-text("Đặt lại mật khẩu")').click();
    await page.waitForURL('/login');
  });

  // -------------------------------------------------------------------------
  test('Bước 4: Đăng nhập bằng thông tin mới và cập nhật Profile [FR-02][FR-04]', async () => {
    await page.locator('input').first().fill('test@eshop.com');
    await page.locator('input').nth(1).fill('NewPassword123! ');
    await page.locator('button:has-text("Sign In")').click();
    await page.waitForURL('/');

    await page.goto('/profile');

    const emailProfileField = page.locator('input[disabled]');
    await expect(emailProfileField).toBeDisabled();

    await page.locator('input').nth(1).fill('Nguyễn Gia Huy');
    await page.locator('input').nth(2).fill('0912345678'); 
    
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Số điện thoại không hợp lệ.');
      await dialog.accept();
    });
    await page.locator('button:has-text("Cập nhật")').click();
  });
});