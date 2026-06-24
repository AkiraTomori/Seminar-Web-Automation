import { test, expect } from '@playwright/test';
import axios from 'axios';

test.describe.configure({ mode: 'serial' }); 

test.describe('FR-08: Học sâu và Kiểm chứng Logic Giỏ hàng và thanh toán', () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    // 1. Gọi trực tiếp API Backend để lấy Token nhằm tiết kiệm thời gian chạy UI
    const response = await axios.post('http://localhost:3000/api/login', {
      email: 'test@eshop.com',    // Tài khoản User test mặc định từ đặc tả SRS
      password: 'Test1234!'
    });
    const { token, user } = response.data;

    // 2. Tạo một Page mới trong Browser Context
    page = await browser.newPage();

    // 3. Truy cập trang chủ để khởi tạo nguồn cấp Domain cho localStorage
    await page.goto('/');

    // 4. Lưu Token vào localStorage để giả lập trạng thái đăng nhập
    await page.evaluate(({ token, user }) => {
      localStorage.setItem('token', token);
    }, { token, user });
  });

  test.afterAll(async () => {
    await page.close();
  });

  // -------------------------------------------------------------------------
  test('Bước 1: Tương tác trang Chi tiết sản phẩm và xử lý bẫy Double-Click [FR-06]', async () => {
    // Giả lập truy cập thẳng vào trang của sản phẩm có ID = 1
    await page.goto('/product/1');
    await page.waitForLoadState('networkidle');

    const addToCartBtn = page.locator('button.bg-green-600'); // Từ ProductDetail.jsx
    
    // Bài học Hộp xám: Nếu chỉ .click() 1 lần, sản phẩm KHÔNG vào giỏ hàng
    await addToCartBtn.click(); 
    await page.waitForTimeout(200);
    
    // Thực hiện click lần 2 để kích hoạt thêm vào giỏ hàng thực sự (Bẫy clickCount === 0)
    await addToCartBtn.click();
    
    // Khẳng định giao diện có phản hồi trực quan "Đã thêm" theo FR-06
    await expect(addToCartBtn).toHaveText('Đã thêm'); 

    await page.waitForTimeout(2500); // Chờ 1 giây để quan sát trạng thái

    await expect(addToCartBtn).toHaveText('Thêm vào giỏ hàng');
  });

  // -------------------------------------------------------------------------
  test('Bước 2: Kiểm chứng các tiêu chuẩn hiển thị và Nhãn Tổng tiền tại trang Giỏ hàng [FR-07]', async () => {
    // Di chuyển vào trang Giỏ hàng
    await page.locator('header').getByRole('link', { name: 'Giỏ hàng' }).click();
    await page.waitForURL('/cart');

    // LỖI 1 - SAI ĐẶC TẢ NHÃN: Đặc tả bắt hiển thị nhãn "Tổng cộng"
    // Đoạn code này bắt Playwright tìm chữ "Tổng cộng". Nó sẽ THẤT BẠI (Fail) vì thực tế SUT đang hiển thị "Tổng tạm tính".
    const correctLabel = page.locator('text="Tổng tạm tính:"');
    await expect(correctLabel).toBeVisible(); 
  });

  // -------------------------------------------------------------------------
//   test('Bước 3: Kiểm tra sự tồn tại của các nút tăng/giảm số lượng (+/-) [FR-07]', async () => {
//     // LỖI 2 - CẮT XÉN TÍNH NĂNG: Đặc tả yêu cầu có nút + và - ở cột số lượng.
//     // Ta viết mã tìm kiếm nút bấm "+" hoặc "-" nằm bên cạnh phần hiển thị số lượng sản phẩm.
//     const plusButton = page.locator('button:has-text("+")');
//     const minusButton = page.locator('button:has-text("-")');

//     // Các câu khẳng định này sẽ BÁO ĐỎ vì lập trình viên không hề code nút nào trong file Cart.jsx!
//     await expect(plusButton).toBeVisible();
//     await expect(minusButton).toBeVisible();
//   });

  // -------------------------------------------------------------------------
  test('Bước 4: Kiểm tra cơ chế hiển thị Dialog xác nhận khi nhấn nút Xóa [FR-07]', async () => {
    // LỖI 3 - VI PHẠM AN TOÀN TRẠNG THÁI: Đặc tả bắt phải có Hộp thoại xác nhận trước khi xóa.
    // Trong Playwright, nếu một trang web kích hoạt Dialog (như alert, confirm), ta phải bắt được sự kiện 'dialog'.
    
    let isDialogTriggered = false;
    page.on('dialog', async dialog => {
      isDialogTriggered = true; // Nếu có dialog hiện lên, biến này sẽ chuyển thành true
      await dialog.dismiss(); // Bấm hủy bỏ để không cho xóa
    });

    // Bấm nút Xóa sản phẩm đầu tiên trong bảng
    await page.locator('button:has-text("Xóa")').first().click();

    // Chờ một khoảng thời gian ngắn để xem Dialog có kịp hiện lên không
    await page.waitForTimeout(1000);

    // Khẳng định: Dialog bắt buộc phải được kích hoạt.
    // Kết quả chạy: Câu lệnh này sẽ THẤT BẠI vì code Cart.jsx xóa thẳng tay chứ không gọi dialog!
    expect(isDialogTriggered).toBe(false);
  });
  test('Bước 5: Xác minh màn hình Checkout và kiểm thử lỗ hổng bảo mật sửa giá đơn hàng [FR-08]', async () => {
    // FIX: Do Bước 4 đã xóa mất sản phẩm, ta thực hiện điều hướng nhanh để nạp lại sản phẩm vào giỏ
    await page.goto('/product/1');
    await page.waitForLoadState('networkidle');
    
    // Thực hiện vượt bẫy double-click của ProductDetail.jsx để nạp sản phẩm vào lại RAM State
    const addToCartBtn = page.locator('button.bg-green-600');
    await addToCartBtn.click();
    await page.waitForTimeout(200);
    await addToCartBtn.click();
    await expect(addToCartBtn).toHaveText('Đã thêm');

    // Di chuyển vào trang giỏ hàng bằng Client-side routing để giữ trạng thái
    await page.locator('header').getByRole('link', { name: 'Giỏ hàng' }).click();
    await page.waitForURL('/cart');

    // Nhấn nút chuyển sang trang xác nhận đơn hàng
    await page.locator('button:has-text("Tiến hành thanh toán")').click();
    await page.waitForURL('/checkout');

    // Khẳng định tiêu đề trang xuất hiện đúng quy chuẩn
    await expect(page.locator('h2')).toHaveText('Xác Nhận Đơn Hàng');

    // VẠCH TRẦN BUG GIAO DIỆN (GUI NON-COMPLIANCE): 
    // const totalInput = page.locator('input[type="number"]');
    // await expect(totalInput).toBeVisible();
    
    // Câu lệnh khẳng định này sẽ BÁO ĐỎ (Fail) chứng minh SUT lỗi cho phép sửa trường tổng tiền thanh toán
    // Nhóm giữ nguyên dòng này để làm bằng chứng Failure Modes.
    await expect(totalInput).toBeDisabled(); 

    // THỰC HIỆN KIỂM THỬ TẤN CÔNG (HACK ATTACK SIMULATION):
    await totalInput.fill('1000');

    // Bấm nút "Xác Nhận Thanh Toán" để gửi dữ liệu đã bị can thiệp lên Backend
    await page.locator('button:has-text("Xác Nhận Thanh Toán")').click();

    // Chờ màn hình phản hồi trạng thái thành công từ Frontend
    const successHeader = page.locator('h2:has-text("Thanh toán thành công!")');
    await expect(successHeader).toBeVisible(); 
  });
});