import { test, expect } from '@playwright/test';

// test.describe.configure({ mode: 'serial' });
test.describe('FR-02: Học sâu Cơ chế Kiểm thử Đăng nhập & An toàn Biểu mẫu', () => {

  // Trước mỗi test case, luôn đưa trình duyệt về trang Đăng nhập
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  /**
   * BÀI HỌC 1: Kiểm thử Hộp xám vạch trần lỗi thiết kế Form (GUI Audit)
   * Mục tiêu: Ép Playwright phải kiểm tra các thuộc tính kỹ thuật của DOM để xem có đúng SRS không.
   */
  test('KT-01: Kiểm tra các thuộc tính an toàn bảo mật của biểu mẫu', async ({ page }) => {
    // Tìm ô nhập Email (Username)
    const emailField = page.locator('input').first();
    
    // ĐẶC TẢ: Bắt buộc dùng type="email"
    // Đoạn code này kiểm tra xem thuộc tính type có phải là "email" không. Nó sẽ FAIL vì lập trình viên làm sai.
    await expect(emailField).toHaveAttribute('type', 'email'); 

    // Tìm ô nhập Mật khẩu
    const passwordField = page.locator('input').nth(1);
    
    // ĐẶC TẢ: Bắt buộc dùng type="password"
    // Đoạn code này sẽ FAIL để vạch trần lỗi lộ plaintext mật khẩu trên giao diện!
    await expect(passwordField).toHaveAttribute('type', 'password');
  });

  /**
   * BÀI HỌC 2: Kiểm thử Vị trí của Thông báo lỗi (DOM Position Verification)
   * Mục tiêu: Xác minh yêu cầu FR-22 "Thông báo lỗi phải xuất hiện TRÊN nút submit, không phải bên dưới."
   */
  test('KT-02: Xác minh vị trí hiển thị của thông báo lỗi so với nút Submit', async ({ page }) => {
    const emailField = page.locator('input').first();
    const passwordField = page.locator('input').nth(1);
    const submitButton = page.locator('button:has-text("Sign In")'); // Từ Login.jsx

    // Cố tình nhập sai để kích hoạt thông báo lỗi
    await emailField.fill('invalid_user@eshop.com');
    await passwordField.fill('WrongPass123');
    await submitButton.click();

    // Khối div báo lỗi hiển thị
    const errorAlert = page.locator('.bg-red-100');
    await expect(errorAlert).toBeVisible();

    // Sử dụng JavaScript chạy ngầm trên trình duyệt để kiểm tra vị trí hình học/DOM của 2 phần tử
    const isErrorBelowButton = await page.evaluate(() => {
      const btn = document.querySelector('button[type="submit"]');
      const err = document.querySelector('.bg-red-100');
      if (!btn || !err) return false;
      // Trả về true nếu nút submit nằm TRƯỚC khối lỗi (tức là khối lỗi nằm DƯỚI nút bấm)
      return !!(btn.compareDocumentPosition(err) & Node.DOCUMENT_POSITION_FOLLOWING);
    });

    // Đặc tả bắt lỗi phải nằm TRÊN, nên nếu err nằm DƯỚI (isErrorBelowButton === true), 
    // câu khẳng định này sẽ bắn ra lỗi để đánh dấu SUT vi phạm tài liệu thiết kế!
    expect(isErrorBelowButton).toBe(false); 
  });

  /**
   * BÀI HỌC 3: Kiểm thử Trạng thái Khóa Tài khoản (State Lockout Machine)
   * Mục tiêu: Kiểm tra bộ đếm tăng đúng 1 đơn vị và khóa khi đủ 3 lần liên tiếp.
   */
  test('KT-03: Nhập sai liên tiếp 3 lần xem hệ thống có kích hoạt chặn truy cập', async ({ page }) => {
    const emailField = page.locator('input').first();
    const passwordField = page.locator('input').nth(1);
    const submitButton = page.locator('button:has-text("Sign In")');
    const errorAlert = page.locator('.bg-red-100');

    // Chạy vòng lặp 3 lần nhập sai liên tiếp để kích hoạt điều kiện khóa của FR-02
    for (let i = 1; i <= 3; i++) {
      await emailField.fill('lockout_test@eshop.com');
      await passwordField.fill(`WrongPass_Attempt_${i}`);
      await submitButton.click();
      
      // Kiểm tra thông báo lỗi xuất hiện ở mỗi lần
      await expect(errorAlert).toBeVisible();
      await expect(errorAlert).toHaveText('Đăng nhập thất bại. Vui lòng kiểm tra lại.');
    }
    
    // ĐẶC TẢ: "Hệ thống trả về thông báo lỗi phù hợp; không để lộ chi tiết nguyên nhân."
    // Nhóm hãy kiểm tra xem chuỗi thông báo lúc này có thay đổi để cảnh báo người dùng đã bị khóa hay không,
    // hay nó vẫn hiển thị một câu thông báo tù mù giống hệt các lần trước.
    await expect(errorAlert).toContainText('thất bại');
  });
});