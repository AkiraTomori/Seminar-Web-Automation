

# Báo cáo hằng tuần 
:::success
**Thông tin chung**
- Mã nhóm: ***06***
- Chủ đề: ***T02 — Web Automation Testing***
- Thời gian: ***13/07 - 18/07/2026***
:::


# Các công việc đã hoàn thành trong tuần này

**23127378 – Nguyễn Gia Huy**
- Làm slide cho Seminar
- Viết User guide cho mabl
    - Hướng dẫn cài đặt và cấu hình
    - Hướng dẫn tạo một test cơ bản
    - Trình bày môt số tính năng nâng cao
    - Các lỗi có thể gặp và cách fix
- Tài liệu: [User_Guide.md](https://hackmd.io/@92MnU-E7RVq2TR_vtt2QdA/HylB6OC7fl)


**23127379 – Thái Minh Huy**
- Viết User Guide cho Playwright
    - Hướng dẫn cài đặt và cấu hình Playwright
    - Hướng dẫn cách chạy test cơ bản
    - Trình bày một số tính năng nâng cao
    - Các lỗi có thể gặp và cách sửa của lỗi được đề cập.
- Thiết kế Actitity Worksheet.md (Phiếu bài tập cho Seminar)
- Artifact:
    - [User_Guide.md](https://hackmd.io/hkOgoZinTrC_xHwYL276nA)
    - [Activity_Worksheet.md](https://hackmd.io/BxtplHd0RQKNqJClB8Xoqw)

**23127396 – Lương Linh Khôi**

- Quay video demo quá trình thực thi kịch bản kiểm thử SC-01 trên mabl, bao gồm kết quả chạy test và báo cáo thực thi.


**23127449 - Nguyễn Tấn Phát**

- Thực hiện thiết kế các script test cho 1 scenario cụ thể (SC-01) dựa trên các skill và workflow thiết kế để demo cho Playwright tool.
- Quay video demo chạy các script test, tích hợp CI với SC-01 đã làm.


# Báo cáo AI

**23127378 - Nguyễn Gia Huy**
- **Antigravity 2.0 (Claude Sonnet 4.6):** AI audit log có thể xem trong file [ai-audit-log.md](https://drive.google.com/file/d/1SyBNffBlAtXd3B8_SmRIsay2gxcKZ33y/view?usp=sharing)

**23127379 - Thái Minh Huy**
- **Antigravity (Claude Opus 4.6) && ChatGPT Web:** A.I Audit log co thể xem trong file [audit-log.md](https://drive.google.com/file/d/1vEBfqFMwH4s6K-RlTk_dvtyVOt_EXP8S/view?usp=sharing)

**23127379 - Lương Linh Khôi**


| Date & Time | Prompt | AI Answer (Summary) | Purpose | Outcome / Notes |
|--------------|--------|---------------------|---------|-----------------|
| **15/07/2026 09:00** | **How to perform web automation testing with mabl?** | Explained the end-to-end mabl workflow: creating an application, recording browser interactions, adding assertions, executing tests, and integrating with CI/CD pipelines. | Learn the overall workflow of web automation testing using mabl. | Understood the basic mabl testing process. |
| **05/07/2026 09:20** | **Can I test localhost?** | Explained that mabl cloud runners cannot access `localhost`. Suggested using the mabl Desktop App, Link Agent, or a secure tunnel to access local applications. | Determine whether a local development server can be tested. | Planned to use the Link Agent for localhost testing. |
| **15/07/2026 09:40** | **mabl Trainer where to download it?** | Provided instructions for downloading and installing the mabl Desktop App from the mabl portal. | Install the required testing tool. | Successfully installed the Desktop App. |
| **15/07/2026 10:10** | **How to run on localhost?** | Described configuring a Link Agent and creating an environment targeting `http://localhost:5173` for local test execution. | Execute automated tests against a local Vite application. | Local testing environment prepared. |
| **15/07/2026 10:45** | **localhost URL can't be reached** | Explained why mabl cloud execution cannot access localhost and recommended using a Link Agent or deploying the application to a staging environment. | Troubleshoot localhost connectivity issues. | Identified the correct execution approach. |
| **15/07/2026 11:05** | **docker run mablhq/link-agent...** | Explained the Docker command parameters, API key configuration, and the process of starting the Link Agent. | Configure the Link Agent for secure local access. | Successfully configured the Link Agent. |
| **15/07/2026 11:30** | **After installing successfully, how to perform test?** | Explained how to create an environment, record browser interactions, add assertions, save the test, and execute it using the configured Link Agent. | Learn how to create and execute browser automation tests. | Ready to automate browser tests. |
| **15/07/2026 12:00** | **Should I deploy the web app or use localhost + Link Agent?** | Compared localhost + Link Agent against deploying to a staging environment. Recommended localhost for development and staging deployment for CI/CD and regression testing. | Decide the appropriate testing environment strategy. | Chose localhost + Link Agent for development. |


**23127449 – Nguyễn Tấn Phát**

- **Antigravity CLI (Claude Sonnet 4.6 + Gemini Pro 3.1):** AI audit log có thể xem trong file sau: [ai-audit-2026-07.log.md](https://github.com/phatnguyen975/eshop-sut/blob/web-automation-testing/docs/audit/ai/ai-audit-2026-07.log.md)

# Công việc dự định cho tuần sau
**23127378 – Nguyễn Gia Huy**
- Chuẩn bị cho live demo mabl
- Chuẩn bị cho bài thuyết trình seminar


**23127379 – Thái Minh Huy**
- Chuẩn bị cho live demo Playwright
- Chuẩn bị kịch bản cho buổi Seminar
- Nắm rõ lại lý thuyết của kiểm thử tự động và công cụ Playwright

**23127396 – Lương Linh Khôi**

- Chuẩn bị cho live demo mabl
- Chuẩn bị cho bài thuyết trình seminar

**23127449 – Nguyễn Tấn Phát**

- Thiết kế và tạo script test thêm cho 2 scenario cụ thể nữa để tăng thêm test case trong test suite.
- Xem lại kĩ lý thuyết về topic này để chuẩn bị cho seminar.

# Vấn đề
Hiện tại nhóm không có gặp vấn đề phát sinh trong quá trình làm, nhóm sẽ tiếp tục theo dõi và cập nhật trong quá trình thực hiện.