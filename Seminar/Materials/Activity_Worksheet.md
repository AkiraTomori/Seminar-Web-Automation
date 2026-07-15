<div align="center">
  <h1>Phiếu bài tập (Activity Worksheet) - Web Automation Testing</h1>
  <small>Nhóm 06</small> <br />
  <sub>29 tháng 6, 2026</sub>
</div>

## Tổng quan dự án

**Học Phần:** CSC15003 - Kiểm Thử Phần Mềm \
**Chủ đề:** T02 - Web Automation Testing \
**Software Under Test (SUT):** [EShop](https://github.com/ttbhanh/eshop-sut/tree/main) (React + Node.js/Express) \
**Official Repository:** [Seminar](https://github.com/phatnguyen975/eshop-sut/tree/web-automation-testing)
**Thành viên nhóm:**

- 23127378 - Nguyễn Gia Huy
- 23127379 - Thái Minh Huy
- 23127396 - Lương Linh Khôi
- 23127449 - Nguyễn Tấn Phát

## Mục lục

[1. Tổng quan hoạt động & Thông tin](#1-tổng-quan-hoạt-động--thông-tin) \
[2. Kết quả mong đợi](#2-kết-quả-mong-đợi) \
[3. Hướng dẫn từng bước](#3-hướng-dẫn-từng-bước) \
[4. Đánh giá và tiêu chí](#4-đánh-giá-và-tiêu-chí) \
[5. Đáp án](#5-đáp-án)

---

## 1. Tổng quan hoạt động & Thông tin

| Trường                 | Chi tiết                                                                                          |
| :--------------------- | :----------------------------------------------------------------------------------------------- |
| **Tiêu đề hoạt động**  | 🔍 **Locator Showdown — Viết tay vs Do AI đề xuất trong điều kiện mạng chậm**                    |
| **Thời gian**          | 25 phút (giới hạn thời gian, xem lịch trình bên dưới)                                            |
| **Số lượng thành viên**| 3–4 sinh viên                                                                                    |
| **Kịch bản**           | Luồng Thêm vào giỏ hàng (Add-to-Cart) trên EShop — FR-07 (Giỏ hàng)                              |
| **Công cụ so sánh**    | **Playwright** (truyền thống, code-first) vs **Mabl** (hỗ trợ bởi AI, low-code)                  |
| **Khái niệm chính**    | Sức bền của locator và chiến lược đồng bộ hóa locator dưới điều kiện mạng bị suy giảm            |
| **Yêu cầu Internet?**  | ❌ Không — tất cả công việc sau khi thiết lập đều chạy cục bộ (EShop SUT chạy trên `localhost`)  |
| **Điều kiện tiên quyết**| EShop SUT chạy trên (`localhost:3000` + `localhost:5173`); Playwright đã được cài đặt; Mabl trainer đang mở |

### Nội dung hoạt động

Nhóm của bạn sẽ tự động hóa cùng một kịch bản Add-to-Cart của EShop **hai lần** — một lần bằng cách tự tạo locators Playwright, và một lần bằng cách quan sát cách Mabl tự động tạo locators. Sau đó, bạn sẽ áp dụng **Slow 3G** (điều tiết mạng) cho cả hai scripts và so sánh phương pháp nào tồn tại trong điều kiện mạng bị suy giảm. Điều này mô phỏng một kịch bản thực tế, nơi sức bền của locator và chiến lược đồng bộ hóa quyết định liệu bộ kiểm thử của bạn có đáng tin cậy hay không.

### Kịch bản kiểm thử: FR-07 — Giỏ hàng (Luồng Thêm vào giỏ)

EShop SRS yêu cầu các hành vi sau cho FR-07:

| Bước | Hành động của người dùng                             | Kết quả theo SRS                                                   |
| :--- | :----------------------------------------------------- | :---------------------------------------------------------------------- |
| S1   | Duyệt danh sách sản phẩm trên trang chủ                      | Thẻ sản phẩm hiển thị tên, giá và nút hành động                   |
| S2   | Click **"Thêm vào giỏ"** trên một thẻ sản phẩm            | Sản phẩm được thêm vào giỏ hàng; thêm cùng một sản phẩm sẽ tăng số lượng    |
| S3   | Điều hướng đến trang `/cart`                             | Bảng giỏ hàng hiển thị: Sản phẩm, Đơn giá, Số lượng, Thành tiền, Thao tác   |
| S4   | Xác minh nhãn tổng giỏ hàng                            | Phải hiển thị **"Tổng cộng"** (SRS) — SUT thực tế hiển thị "Tổng tạm tính"  |
| S5   | Click **"Xóa"** để xóa một sản phẩm                   | SRS yêu cầu một hộp thoại xác nhận trước khi xóa (SUT có thể bỏ qua)     |

> **Lưu ý:** Các bước S4 và S5 chứa các lỗi SUT cố ý. Một phần của hoạt động này là quan sát xem các locator và assertion của bạn có còn *phát hiện* các lỗi này dưới điều kiện mạng bị suy giảm hay không.

---

## 2. Mục tiêu học tập

Sau khi hoàn thành hoạt động này, bạn sẽ có thể:

| #  | Mục tiêu học tập                                                                                   | Đánh giá trong       |
| :- | :------------------------------------------------------------------------------------------------- | :----------------- |
| L1 | **Viết locators Playwright mạnh** bằng `getByRole()`, `getByText()`, và `getByLabel()`     | Phần A, Câu hỏi 2 |
| L2 | **Đối chiếu locators tự tạo và do AI đề xuất** cho cùng một DOM elements                       | Phần B, Câu hỏi 4 |
| L3 | **Áp dụng điều tiết mạng (network throttling)** trong Playwright để mô phỏng điều kiện bị suy giảm | Phần C              |
| L4 | **Xác định các mẫu locator dễ hỏng** khi bị suy giảm (ví dụ: CSS-index so với semantic)         | Phần C, Câu hỏi 6 |
| L5 | **Phát hiện lỗi SUT** bằng cách viết các assertion xuất phát từ SRS, không phải từ UI quan sát     | Phần A, Câu hỏi 3 |

---

## 3. Hướng dẫn từng bước

### ⏱️ Lịch trình thời gian

| Thời gian    | Giai đoạn                                   | Công việc của bạn                                               |
| :----------- | :------------------------------------------- | :-------------------------------------------------------------- |
| 0:00 – 0:02  | **Kiểm tra Thiết lập**                       | Xác minh EShop SUT đang chạy; mở terminals và Mabl trainer    |
| 0:02 – 0:10  | **Phần A — Viết tay Playwright Locators**    | Viết locators + một assertion (xác nhận) cho mỗi bước FR-07              |
| 0:10 – 0:16  | **Phần B — Quan sát Mabl AI Locators**       | Ghi lại cùng một luồng trong Mabl; ghi nhận AI-generated locators        |
| 0:16 – 0:22  | **Phần C — Điều tiết mạng & So sánh**        | Áp dụng Slow 3G cho cả hai; chạy tests; ghi nhận pass/fail              |
| 0:22 – 0:25  | **Phần D — Đánh giá nhóm**                   | Điền vào bảng so sánh; thảo luận; chuẩn bị bài tóm tắt miệng 1 phút   |

---

### Giai đoạn 0 — Kiểm tra Thiết lập (0:00 – 0:02)

Xác nhận các điều sau trước khi tiếp tục:

- [ ] EShop backend đang chạy tại `http://localhost:3000`
- [ ] EShop frontend-web đang chạy tại `http://localhost:5173`
- [ ] Terminal với Playwright đã sẵn sàng (`npx playwright --version` in ra `1.x`)
- [ ] Mabl trainer desktop app đang mở (hoặc tiện ích mở rộng Mabl trình duyệt đã được cài đặt)
- [ ] Phiếu bài tập này đang mở (đã in hoặc trên màn hình thứ hai)

> **Lưu ý cho người điều phối (Facilitator):** Nếu bất kỳ nhóm nào không thể xác nhận tất cả các mục trong vòng 2 phút, người điều phối sẽ hỗ trợ. Đừng chờ đợi trong im lặng.

---

### Phần A — Viết tay Playwright Locators (0:02 – 0:10) ✍️

Mở một tệp mới hoặc bảng nháp. Đối với mỗi phần tử DOM bên dưới, hãy viết **Playwright locator tốt nhất** mà bạn có thể. Sau đó viết **một assertion** cho mỗi bước.

**Tham chiếu — Cấu trúc DOM thực tế của EShop (từ mã nguồn):**

```text
Trang chủ (Home Page) (localhost:5173/)
├── <h1>  "Danh sách sản phẩm"
├── <input type="text" placeholder="Tìm kiếm...">
├── Thẻ sản phẩm (Product Card) (lặp lại cho mỗi sản phẩm)
│   ├── <h2 class="text-xl font-semibold mb-2 truncate">  {product.name}
│   ├── <p class="text-red-500 font-bold mb-2">  {price} VND
│   ├── <a href="/product/{id}">  "Xem chi tiết"
│   └── <button class="flex-1 bg-blue-600 text-white ...">  "Thêm vào giỏ"
│
Trang Giỏ hàng (Cart Page) (localhost:5173/cart)
├── <h2 class="text-2xl font-bold mb-6">  "Giỏ Hàng"
├── <table>
│   ├── <th>  "Sản phẩm" | "Giá" | "Số lượng" | "Thành tiền" | "Thao tác"
│   └── <tr> cho mỗi sản phẩm
│       ├── <td>  {item.name}
│       ├── <td>  {item.price} ₫
│       ├── <td>  {item.quantity}
│       ├── <td>  {lineTotal} ₫
│       └── <button class="text-red-500 ...">  "Xóa"
├── <div>  "Tổng tạm tính: {total} ₫"     ← ⚠️ SRS ghi "Tổng cộng"
├── <a href="/">  "← Mua tiếp"
└── <button class="bg-green-500 ...">  "Tiến hành thanh toán"
```

#### Câu hỏi 1 — Viết Playwright Locators

Điền vào cột **Playwright locator**. Sử dụng semantic locators (`getByRole`, `getByText`, `getByLabel`, `getByPlaceholder`) ở những nơi có thể. Chỉ chuyển sang dùng CSS nếu không có tùy chọn ngữ nghĩa (semantic).

| #   | Phần tử mục tiêu (Target Element)      | Playwright Locator của bạn                           |
| :-- | :-------------------------------------- | :--------------------------------------------------- |
| L1  | Tiêu đề trang chủ "Danh sách sản phẩm" | `page.`________________________________________       |
| L2  | Ô nhập tìm kiếm (Search input field)    | `page.`________________________________________       |
| L3  | Nút "Thêm vào giỏ" (sản phẩm đầu tiên)  | `page.`________________________________________       |
| L4  | Tiêu đề trang Giỏ Hàng "Giỏ Hàng"      | `page.`________________________________________       |
| L5  | Văn bản tổng giỏ hàng                  | `page.`________________________________________       |
| L6  | Nút "Xóa" (dòng đầu tiên)              | `page.`________________________________________       |
| L7  | Nút "Tiến hành thanh toán"             | `page.`________________________________________       |

#### Câu hỏi 2 — Viết một Assertion cho mỗi bước FR-07

Đối với mỗi bước từ bảng kịch bản ở Phần 1, hãy viết một assertion theo chuẩn web-first của Playwright.

| Bước | Những gì cần Assert (Xác nhận)                               | Mã Assertion của bạn                                        |
| :--- | :---------------------------------------------------------- | :---------------------------------------------------------- |
| S1   | Trang chủ hiển thị ít nhất một thẻ sản phẩm                 | `await expect(`____________________`).`____________________ |
| S2   | Sau khi nhấn "Thêm vào giỏ", trang giỏ hàng hiển thị sản phẩm | `await expect(`____________________`).`____________________ |
| S3   | Bảng giỏ hàng có các tiêu đề cột chính xác                   | `await expect(`____________________`).`____________________ |
| S4   | Nhãn tổng giỏ hàng ghi **"Tổng cộng"** (theo SRS)          | `await expect(`____________________`).`____________________ |
| S5   | Nhấn "Xóa" sẽ kích hoạt hộp thoại xác nhận                  | `await expect(`____________________`).`____________________ |

#### Câu hỏi 3 — Phát hiện Lỗi 🐛

Dựa trên cây DOM ở trên và yêu cầu của SRS, hãy xác định **hai lỗi SUT** hiển thị trong luồng FR-07:

| # | Mong đợi theo SRS                                          | Hành vi thực tế của SUT            | Đánh giá      |
| :- | :------------------------------------------------------- | :-------------------------------- | :----------- |
| D1 | ________________________________________________         | _________________________________ | ☐ LỖI (DEFECT) |
| D2 | ________________________________________________         | _________________________________ | ☐ LỖI (DEFECT) |

---

### Phần B — Quan sát Mabl AI Locators (0:10 – 0:16) 🤖

Bây giờ hãy ghi lại **cùng một luồng FR-07** bằng Mabl trainer:

1. Mở Mabl trainer và bắt đầu bài test mới trên `http://localhost:5173`.
2. Thực hiện các bước tương tự: duyệt web → nhấn "Thêm vào giỏ" → điều hướng tới giỏ hàng → xem tổng tiền → nhấn "Xóa".
3. Sau khi ghi, mở chi tiết bước trong Mabl và ghi nhận **locator do AI tạo ra** cho mỗi phần tử.

#### Câu hỏi 4 — Ghi lại Mabl AI Locators

Điền vào những gì Mabl đã tạo. Nếu Mabl không sử dụng một chiến lược cụ thể, viết "N/A".

| #   | Phần tử mục tiêu (Target Element)       | Mabl AI Locator Chính                   | Mabl Locator Dự phòng (Fallback)      |
| :-- | :-------------------------------------- | :-------------------------------------- | :------------------------------------ |
| M1  | Tiêu đề trang chủ "Danh sách sản phẩm" | ________________________________________| ______________________________________|
| M2  | Ô nhập tìm kiếm (Search input field)    | ________________________________________| ______________________________________|
| M3  | Nút "Thêm vào giỏ" (sản phẩm đầu tiên)  | ________________________________________| ______________________________________|
| M4  | Tiêu đề trang Giỏ Hàng "Giỏ Hàng"      | ________________________________________| ______________________________________|
| M5  | Văn bản tổng giỏ hàng                  | ________________________________________| ______________________________________|
| M6  | Nút "Xóa" (dòng đầu tiên)              | ________________________________________| ______________________________________|
| M7  | Nút "Tiến hành thanh toán"             | ________________________________________| ______________________________________|

#### Câu hỏi 5 — So sánh chiến lược Locator

Đối với mỗi cặp (L# vs M#), locator nào **có tính kháng lỗi (resilient) cao hơn** với việc tái cấu trúc (refactoring) UI? Hãy khoanh tròn lựa chọn của bạn.

| Cặp       | Có tính kháng lỗi cao hơn? | Tại sao? (1 câu)                         |
| :-------- | :------------------------- | :--------------------------------------- |
| L1 vs M1  | PW / Mabl                  | ________________________________________ |
| L3 vs M3  | PW / Mabl                  | ________________________________________ |
| L6 vs M6  | PW / Mabl                  | ________________________________________ |

---

### Phần C — Điều tiết mạng (Throttle) & So sánh (0:16 – 0:22) 🌐➡️🐌

#### Bước C1 — Playwright với mạng Slow 3G

Tạo (hoặc cập nhật) tệp kịch bản kiểm thử Playwright với các locators từ Phần A. Thêm thiết lập **điều tiết mạng (network throttling)** sau đây bằng cách sử dụng phiên CDP:

```typescript
import { test, expect, chromium } from '@playwright/test';

test('FR-07 Add-to-Cart dưới mạng Slow 3G', async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Bật phiên CDP cho điều tiết mạng
  const cdpSession = await context.newCDPSession(page);
  await cdpSession.send('Network.emulateNetworkConditions', {
    offline: false,
    downloadThroughput: (400 * 1024) / 8,   // 400 Kbps
    uploadThroughput: (400 * 1024) / 8,     // 400 Kbps
    latency: 2000,                          // 2000ms RTT
  });

  await page.goto('http://localhost:5173/');

  // --- LOCATORS + ASSERTIONS TỪ PHẦN A CỦA BẠN ĐẶT Ở ĐÂY ---

  await browser.close();
});
```

Chạy test ở chế độ có giao diện (headed):

```bash
npx playwright test fr07-throttle.spec.ts --headed
```

#### Bước C2 — Mabl với Điều tiết mạng

Trong Mabl trainer:
1. Mở test đã ghi lại từ Phần B.
2. Điều hướng đến **Test Settings → Network Conditions**.
3. Chọn **"Slow 3G"** hoặc tự định cấu hình: 400 Kbps down / 400 Kbps up / 2000 ms latency.
4. Chạy lại test.

#### Câu hỏi 6 — Kết quả khi có Điều tiết mạng

Ghi nhận kết quả của từng bước kiểm thử dưới điều kiện Slow 3G:

| Bước | Kết quả Playwright | Kết quả Mabl | Ghi chú (timeouts, flakiness, self-healing?) |
| :--- | :----------------- | :---------- | :------------------------------------------- |
| S1   | ☐ ĐẠT (PASS) ☐ RỚT (FAIL) | ☐ ĐẠT ☐ RỚT | ____________________________________________ |
| S2   | ☐ ĐẠT ☐ RỚT | ☐ ĐẠT ☐ RỚT | ____________________________________________ |
| S3   | ☐ ĐẠT ☐ RỚT | ☐ ĐẠT ☐ RỚT | ____________________________________________ |
| S4   | ☐ ĐẠT ☐ RỚT | ☐ ĐẠT ☐ RỚT | ____________________________________________ |
| S5   | ☐ ĐẠT ☐ RỚT | ☐ ĐẠT ☐ RỚT | ____________________________________________ |

#### Câu hỏi 7 — Phân tích nguyên nhân gốc rễ

Nếu có bất kỳ bước nào **rớt (failed)** dưới điều kiện điều tiết mạng, hãy giải thích nguyên nhân gốc rễ:

| Công cụ    | Bước rớt | Nguyên nhân gốc rễ (Root Cause)                                        | Chiến lược sửa lỗi (Fix Strategy)             |
| :--------- | :---------- | :-------------------------------------------------------- | :-------------------------------------------- |
| Playwright | S__         | ____________________________________________________________ | _____________________________________________  |
| Mabl       | S__         | ____________________________________________________________ | _____________________________________________  |

---

### Phần D — Đánh giá nhóm (0:22 – 0:25) 💬

#### Câu hỏi 8 — So sánh trực tiếp (Head-to-Head Comparison)

Với tư cách là một nhóm, hãy điền vào bảng tóm tắt này:

| Tiêu chí                                | Playwright (Viết tay)      | Mabl (AI đề xuất)         | Người thắng |
| :--------------------------------------- | :------------------------- | :------------------------ | :---------- |
| **Tốc độ viết locator**                  | ___ phút để viết 7 locators| ___ phút ghi lại 7 bước   | PW / Mabl   |
| **Khả năng kháng lỗi locator (refactoring)**| ___ / 7 sẽ sống sót       | ___ / 7 sẽ sống sót       | PW / Mabl   |
| **Tỷ lệ sống sót khi điều tiết mạng**    | ___ / 5 bước đạt           | ___ / 5 bước đạt          | PW / Mabl   |
| **Độ chính xác phát hiện lỗi**           | Bắt được ___ / 2 lỗi       | Bắt được ___ / 2 lỗi      | PW / Mabl   |
| **Độ minh bạch khi gỡ lỗi (Debugging)**  | ☐ Cao  ☐ TB  ☐ Thấp      | ☐ Cao  ☐ TB  ☐ Thấp     | PW / Mabl   |

#### Câu hỏi 9 — Kết luận rút ra (One-Sentence Takeaway)

Viết một câu mà nhóm của bạn đồng thuận:

> "Đối với kịch bản Thêm vào giỏ của EShop dưới điều kiện mạng bị suy giảm, chúng tôi sẽ chọn **________** bởi vì ____________________________________________________________."

---

## 4. Tổng kết & Tiêu chí Đánh giá (Debrief & Evaluation Rubric)

### Hướng dẫn Tổng kết (sau khi tất cả các nhóm hoàn thành)

Nhóm điều phối sẽ yêu cầu mỗi nhóm chia sẻ:
1. **Kết luận rút ra (one-sentence takeaway)** (Câu hỏi 9).
2. **Quan sát đáng ngạc nhiên nhất** từ quá trình kiểm tra điều tiết mạng.
3. Liệu khả năng self-healing của Mabl có giúp hay làm hại đến việc phát hiện lỗi.

### Tiêu chí Đánh giá

| Tiêu chí                                                            | Xuất sắc (5)                                                    | Tốt (3)                                                       | Cần Cải thiện (1)                                             |
| :------------------------------------------------------------------ | :--------------------------------------------------------------- | :------------------------------------------------------------- | :------------------------------------------------------------ |
| **Chất lượng Locator (Q1)**                                         | Cả 7 dùng semantic locators; không có CSS không cần thiết        | 5–6 semantic; 1–2 chuyển sang CSS với lý do chính đáng         | Chủ yếu là CSS / XPath; không dùng semantic locators          |
| **Độ chính xác Assertion (Q2)**                                     | Cả 5 assertion là web-first và bắt nguồn từ SRS                  | 3–4 cái đúng; vài lỗi cú pháp nhỏ                              | Các assertion kiểm tra hành vi SUT thay vì đặc tả SRS         |
| **Nhận diện lỗi (Q3)**                                              | Nhận diện đúng cả hai lỗi kèm theo tham chiếu tới SRS            | Xác định đúng một lỗi                                          | Không nhận diện được lỗi nào, hoặc báo cáo sai (false positives)|
| **Quan sát Mabl (Q4–Q5)**                                           | Ghi nhận được toàn bộ 7 locator; có so sánh chuyên sâu về độ bền vững| Ghi nhận được 5+ locators; mức độ so sánh cơ bản                | Ghi nhận chưa hoàn chỉnh; không thực hiện đánh giá so sánh    |
| **Phân tích điều tiết mạng (Q6–Q7)**                                | Các bước đều được chạy thử; chẩn đoán chính xác nguyên nhân gốc rễ| Chạy thử được hầu hết; chẩn đoán nguyên nhân gốc rễ một phần | Không áp dụng throttle hoặc không ghi lại kết quả             |
| **Sự sâu sắc trong phần đánh giá (Q8–Q9)**                          | Có so sánh tinh tế đi kèm giải thích hợp lý vì sao chọn công cụ  | So sánh ở mức cơ bản; giải thích không sâu sắc                   | Bảng chưa hoàn thiện; không có kết luận tóm tắt lại             |

**Cách chấm điểm:** Mỗi tiêu chí được chấm 1–5. Tổng = tổng số / 30 × 100%.

---

## 5. Đáp án

> ⚠️ **Chỉ dành cho người điều phối — không phân phát cho các nhóm khán giả trước khi hoạt động diễn ra.**

---

### Câu hỏi 1 — Playwright Locators (Đáp án mong đợi)

| #   | Phần tử mục tiêu (Target Element)      | Expected Playwright Locator (Đáp án Playwright Locator)                      |
| :-- | :-------------------------------------- | :--------------------------------------------------------------------------- |
| L1  | Tiêu đề trang chủ "Danh sách sản phẩm" | `page.getByRole('heading', { name: 'Danh sách sản phẩm' })`                 |
| L2  | Ô nhập tìm kiếm (Search input field)    | `page.getByPlaceholder('Tìm kiếm...')`                                      |
| L3  | Nút "Thêm vào giỏ" (sản phẩm đầu tiên)  | `page.getByRole('button', { name: 'Thêm vào giỏ' }).first()`               |
| L4  | Tiêu đề trang Giỏ Hàng "Giỏ Hàng"      | `page.getByRole('heading', { name: 'Giỏ Hàng' })`                           |
| L5  | Văn bản tổng giỏ hàng                  | `page.getByText('Tổng tạm tính')`  *(SUT thực tế — SRS mong đợi "Tổng cộng")*|
| L6  | Nút "Xóa" (dòng đầu tiên)              | `page.getByRole('button', { name: 'Xóa' }).first()`                         |
| L7  | Nút "Tiến hành thanh toán"             | `page.getByRole('button', { name: 'Tiến hành thanh toán' })`                |

**Lưu ý chấm điểm:**
- Điểm tối đa cho semantic locators (`getByRole`, `getByText`, `getByPlaceholder`).
- Giải pháp thay thế có thể chấp nhận được: `getByRole('textbox')` cho L2 nếu trang chỉ có duy nhất một ô văn bản (textbox).
- Trừ điểm nếu dùng CSS thô như `.bg-blue-600` hoặc XPath định vị vị trí như `//button[1]` mà không có lời giải thích thoả đáng.

---

### Câu hỏi 2 — Assertions (Đáp án mong đợi)

| Bước | Đáp án Assertion (Expected Assertion)                                                                          |
| :--- | :------------------------------------------------------------------------------------------------------------- |
| S1   | `await expect(page.getByRole('button', { name: 'Thêm vào giỏ' }).first()).toBeVisible();`                     |
| S2   | `await expect(page.getByRole('cell', { name: /ProductName/ })).toBeVisible();`  *(sau khi vào /cart)*          |
| S3   | `await expect(page.getByRole('columnheader', { name: 'Sản phẩm' })).toBeVisible();`                           |
| S4   | `await expect(page.getByText('Tổng cộng')).toBeVisible();`  **← SẼ RỚT (lỗi cố ý từ SUT)**                    |
| S5   | `await expect(page.getByRole('dialog')).toBeVisible();` hoặc `page.on('dialog', ...)` **← Có thể RỚT (lỗi SUT)**|

**Phân tích chính đối với S4:** Sinh viên viết `getByText('Tổng tạm tính')` sẽ đạt bài test nhưng lại đang xác nhận chống lại *SUT có lỗi*, chứ không phải SRS. Việc kiểm tra bằng `'Tổng cộng'` là đúng và test nên **rớt** — lúc này mới phát hiện ra lỗi.

**Phân tích chính đối với S5:** Theo SRS, có yêu cầu hiển thị hộp thoại xác nhận trước khi xoá. Nếu SUT không xuất hiện hộp thoại này, assertion sẽ thất bại và tiết lộ một lỗi thứ hai.

---

### Câu hỏi 3 — Nhận diện lỗi (Đáp án mong đợi)

| # | Mong đợi theo SRS                                                                                | Hành vi thực tế của SUT                                                | Đánh giá  |
| :- | :----------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------- | :------- |
| D1 | FR-07: Nhãn tổng của giỏ hàng phải ghi **"Tổng cộng"**                                           | SUT hiển thị **"Tổng tạm tính"** (xem file `Cart.jsx` dòng 63)         | ✅ LỖI    |
| D2 | FR-07: Nút "Xóa sản phẩm" phải hiển thị một **hộp thoại xác nhận** trước khi gỡ bỏ               | SUT gọi thẳng `removeFromCart(index)` trực tiếp, bỏ qua việc gọi hộp thoại `confirm()` | ✅ LỖI    |

**Bonus lỗi (không bắt buộc, nhưng có thể thưởng điểm cộng):**

| #  | Mong đợi theo SRS                                                           | Hành vi thực tế của SUT                                                                                                          | Đánh giá  |
| :- | :-------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- | :------- |
| D3 | FR-06: Nhấp vào nút "Thêm vào giỏ hàng" tại Trang chi tiết sản phẩm sẽ ngay lập tức thêm ở lần nhấp đầu tiên | `ProductDetail.jsx` dòng 22–25: lần click đầu tiên sẽ bị bỏ qua một cách im lặng (`clickCount === 0` guard); sản phẩm sẽ chỉ được thêm vào khi click **lần thứ hai** | ✅ LỖI    |

---

### Câu hỏi 4 — Mabl AI Locators (Các mẫu mong đợi)

Mabl sử dụng một mô hình đánh giá thuộc tính đa hướng (multi-attribute model) và đưa ra các trọng số. Những locator mà AI có khả năng khởi tạo cho EShop DOM:

| #   | Phần tử mục tiêu (Target Element)| Khả năng Locator Chính của Mabl                              | Khả năng Locator Dự phòng của Mabl                                 |
| :-- | :------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------------- |
| M1  | Tiêu đề Trang chủ           | Nội dung Text: `"Danh sách sản phẩm"`                        | CSS: `h1.text-3xl.font-bold`                                      |
| M2  | Ô Tìm kiếm                 | Placeholder: `"Tìm kiếm..."`                                | CSS: `input[type="text"]`                                          |
| M3  | Nút "Thêm vào giỏ"         | Nội dung Text: `"Thêm vào giỏ"` + vị trí hiển thị (thẻ 1)    | CSS: `button.bg-blue-600` + nth-child index                       |
| M4  | Tiêu đề Giỏ hàng           | Nội dung Text: `"Giỏ Hàng"`                                  | CSS: `h2.text-2xl.font-bold`                                      |
| M5  | Văn bản tổng giỏ hàng      | Nội dung Text: `"Tổng tạm tính"` (trùng với SUT, không trùng SRS)| CSS: `div.text-xl.font-bold`                                      |
| M6  | Nút "Xóa"                  | Nội dung Text: `"Xóa"` + vị trí gần kề dòng             | CSS: `button.text-red-500` + index                                |
| M7  | Nút Thanh toán             | Nội dung Text: `"Tiến hành thanh toán"`                       | CSS: `button.bg-green-500`                                        |

**Phân tích chính:** Mabl sẽ ghi lại những gì SUT *hiển thị trong thực tế* (ví dụ: "Tổng tạm tính"). AI sẽ không gán mác hành vi này là một khiếm khuyết vì nó không có quyền truy cập vào bảng tài liệu SRS. Đây là hạn chế lớn nhất của kỹ thuật ghi lại và phát lại do AI điều khiển (AI-driven record-and-playback): nó tối ưu hoá sự đáng tin cậy của việc phát lại các bước kiểm thử, **chứ không phải theo sự tuân thủ yêu cầu (requirement conformance)**.

---

### Câu hỏi 5 — So sánh khả năng kháng lỗi (Đáp án mong đợi)

| Cặp       | Có tính kháng lỗi cao hơn? | Tại sao?                                                                                                       |
| :-------- | :-------------- | :------------------------------------------------------------------------------------------------------------- |
| L1 vs M1  | **Hòa**         | Cả 2 đều dùng văn bản chứa bên trong nội dung (text content); Playwright's `getByRole('heading')` giúp bổ sung độ chuẩn xác ngữ nghĩa, nhưng cả hai loại đều vẫn chạy ổn ngay cả khi tái cấu trúc cấu trúc UI (refactoring) |
| L3 vs M3  | **Mabl**        | Biện pháp dự phòng đa thuộc tính của Mabl (nhận diện cả chữ và vị trí hiển thị) có tính bền vững cao hơn nếu các lớp CSS thay đổi |
| L6 vs M6  | **Playwright**  | `getByRole('button', { name: 'Xóa' }).first()` có tính ngữ nghĩa rất cao; Việc dùng CSS làm yếu tố dự phòng của Mabl sẽ dẫn đến lỗi nếu lớp CSS bị thay đổi |

**Chấp nhận bất kỳ câu trả lời hợp lý nào.** Mục đích của phần này là để nhấn mạnh rằng không có công cụ nào hoàn hảo trên mọi khía cạnh — mỗi cái đều có ưu và nhược điểm riêng (trade-offs).

---

### Câu hỏi 6 — Kết quả khi có Điều tiết mạng (Kết quả mong đợi)

| Bước | Kỳ vọng của Playwright                 | Kỳ vọng của Mabl                       | Ghi chú                                                                              |
| :--- | :------------------------------------- | :------------------------------------- | :----------------------------------------------------------------------------------- |
| S1   | ✅ ĐẠT (PASS)                           | ✅ ĐẠT (PASS)                           | Cả hai công cụ đều tự động đợi thẻ heading hiển thị; Độ trễ (latency) 2s là nằm trong khoảng thời gian chờ (timeout) mặc định (30s) |
| S2   | ✅ ĐẠT (nhờ thời gian chờ được tăng lên) | ✅ ĐẠT                                 | Playwright tự động đợi đến khi có thể thực hiện thao tác (actionability); Mabl có khả năng điều chỉnh sự chờ đợi (adaptive waits) |
| S3   | ✅ ĐẠT                                  | ✅ ĐẠT                                 | Trang Giỏ hàng được xử lý render sau khi điều hướng thành công; cả 2 đều đợi các tiêu đề bảng xuất hiện |
| S4   | ❌ RỚT (chính xác! giúp nhận diện lỗi)   | ✅ ĐẠT (Đạt giả tạo — lỗi SUT bị ẩn mất)| Playwright assert rằng theo văn bản SRS là chữ "Tổng cộng" → rớt. Mabl lưu lại theo "Tổng tạm tính" → bài test đạt nhưng đã bỏ sót lỗi |
| S5   | ❌ RỚT (chính xác! giúp nhận diện lỗi)   | ✅ ĐẠT hoặc ⚠️ BỎ QUA                  | Playwright chờ đợi một cửa sổ đối thoại không bao giờ xuất hiện → test bị timeout. Mabl đã lưu lại thao tác trực tiếp của việc nhấn nút Delete, vì vậy quá trình test khi replay lại đã thành công |

**Khoảnh khắc giảng dạy quan trọng:** Một test **PASS** không phải lúc nào cũng là test **ĐÚNG**. Mabl đạt được độ tin cậy trong việc replay bài test cao hơn ngay cả trong điều kiện mạng chậm, nhưng mà Playwright (khi assertions được bắt nguồn từ SRS) lại bắt được lỗi phần mềm trên thực tế. Khái niệm này cho chúng ta thấy ưu nhược điểm (trade-off) giữa **chi phí duy trì bảo trì test** (Mabl chiến thắng) và việc **tuân thủ các quy tắc trong đặc tả SRS** (Playwright giành chiến thắng).

---

### Câu hỏi 7 — Phân tích Nguyên nhân gốc rễ (Đáp án mong đợi)

| Công cụ    | Bước rớt | Nguyên nhân gốc rễ (Root Cause)                                                                                                                    | Chiến lược sửa lỗi (Fix Strategy)                                                                        |
| :--------- | :---------- | :---------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| Playwright | S4          | Assertion kiểm tra theo chữ "Tổng cộng" (đúng theo SRS) nhưng SUT lại trả về chữ "Tổng tạm tính" — Đây là lỗi thuộc về bản chất của SUT, không phải lỗi test (test bug) | Report dưới dạng lỗi của SUT (defect). TUYỆT ĐỐI KHÔNG sửa lại assertion để khớp với những gì SUT trả ra. |
| Playwright | S5          | Code Test kỳ vọng `page.on('dialog')` hoặc `getByRole('dialog')` nhưng SUT lại chưa từng gọi bất kỳ sự kiện xác nhận nào — Vẫn là do lỗi của SUT | Report lỗi defect này lại. Việc thực hiện viết bài test đã chỉ ra đúng thực trạng khuyết thiếu chức năng theo hành vi mong muốn. |
| Mabl       | (không có)  | Mabl thực hiện lại thao tác theo những gì nó đã lưu lúc đầu. Vì nó không có bất kỳ kiến thức nào thuộc về SRS, nên Mabl đã bỏ qua khả năng nhận diện các lỗi liên quan đến chức năng hành vi. | Bổ sung thêm cho Mabl công việc kiểm tra manual (thủ công) vào assertion hoặc dùng Playwright để thực hiện kiểm tra tính tuân thủ quy tắc. |

---

### Câu hỏi 8 — So sánh trực tiếp (Khoảng dự kiến)

| Tiêu chí                                | Playwright (Thông thường) | Mabl (Thông thường)     | Người thắng kỳ vọng |
| :--------------------------------------- | :---------------------- | :---------------------- | :-------------- |
| **Tốc độ viết locator**                  | 5–8 phút                | 2–4 phút                | **Mabl**        |
| **Khả năng kháng lỗi locator (refactoring)**| Sống sót 5–6 / 7       | Sống sót 5–7 / 7        | **Hòa hoặc Mabl** |
| **Tỷ lệ sống sót khi điều tiết mạng**    | Qua 3–5 / 5 bước        | Qua 4–5 / 5 bước        | **Mabl**        |
| **Độ chính xác phát hiện lỗi**           | Bắt được 2 / 2 lỗi      | Bắt được 0 / 2 lỗi      | **Playwright**  |
| **Độ minh bạch khi gỡ lỗi (Debugging)**  | Cao                     | Thấp–TB                 | **Playwright**  |

---

### Câu hỏi 9 — Kết luận rút ra (Các câu trả lời được chấp nhận ví dụ)

> "Đối với kịch bản Thêm vào giỏ hàng của EShop dưới điều kiện mạng bị suy giảm, chúng tôi sẽ chọn **Playwright** bởi vì khả năng kiểm chứng assertions có nguồn gốc từ hệ thống SRS có thể chỉ điểm ra các lỗi thực tế mà các nền tảng chạy kiểu ghi-lại-rồi-chạy-lại (record-and-replay) như của Mabl lại bỏ qua một cách thầm lặng."

> "Đối với kịch bản Thêm vào giỏ của EShop dưới điều kiện mạng bị suy giảm, chúng tôi sẽ chọn **phương pháp lai (hybrid)** bởi vì Mabl tỏ rõ thế mạnh qua khả năng lập tự động và chữa lành một cách đáng nể trước điều kiện làm chậm trễ độ phản hồi (latency), tuy nhiên thì lại phải cần Playwright với các dòng lệnh test do con người viết (hand-crafted assertions) mới đủ khả năng làm công việc so sánh tính tuân thủ quy định SRS."

**Chấp nhận bất kỳ câu trả lời nào chỉ ra được sự am hiểu về sự đánh đổi qua lại của ưu và nhược điểm (trade-off).** Hủy bỏ và bác bỏ các câu trả lời nào khẳng định một công cụ thì phổ biến và hoàn hảo hơn mà không có tính chuyên môn hoặc bằng chứng nhận định liên quan.

---

*— Hết Phiếu bài tập & Đáp án —*
