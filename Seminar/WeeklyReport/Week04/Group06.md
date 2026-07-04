# Báo cáo hằng tuần
**Thông tin chung**
- Mã nhóm: ***06***
- Chủ đề: ***T02 — Web Automation Testing***
- Thời gian: ***29/06 - 04/07/2026***


# Các công việc đã hoàn thành trong tuần này

**23127378 – Nguyễn Gia Huy**
- Tìm hiểu tool Mabl (Ưu nhược điểm, mức độ phù hợp với đồ án, chi phí,....)
- Tìm hiểu cài đặt, hướng dẫn sử dụng Mabl, quy trình làm việc
- Tìm hiểu cách build skill (1 phần của bài tập về nhà và đồ án chung)
- Các thông tin tìm hiểu: [report](https://docs.google.com/document/d/1Bx-_nexX8tLMDCKgz3ePpMU8fEtzve2nWjmyMm-BtxM/edit?usp=sharing)

**23127379 – Thái Minh Huy**
- Tìm hiểu khái quát về công cụ Playwright (về lý thuyết kiểm thử tự động, test type, test level, test technique)
- Tìm hiểu về kiến trúc của công cụ Playwright có gì so với công cụ như Selenium
- Tài liệu sinh viên đã sử dụng để tìm hiểu thêm:
    - [Ưu và nhược điểm](https://devsquad.com/blog/playwright-testing-framework#the-pros-and-cons-of-the-playwright-testing-framework)
    - [Kiến trúc của Playwright](https://www.youtube.com/watch?v=eSlxSmCory4)
- Evidence: [Report](https://docs.google.com/document/d/1J-GU5yjrPgYpDfi3uWiwPJb-BWZNm4FVLAU8tOxuOIE/edit?usp=sharing)

**23127396 – Lương Linh Khôi**

- Tìm hiểu công cụ Mabl.
- Nghiên cứu các tính năng chính của Mabl trong kiểm thử tự động.
- Tìm hiểu quy trình tạo, thực thi và quản lý test case trên Mabl.
- Khảo sát khả năng ứng dụng Mabl vào quy trình kiểm thử của dự án.
- Các thông tin đã tìm hiểu: [mabl](https://github.com/linhkhoi1309/mabl/blob/main/mabl.md)

**23127449 – Nguyễn Tấn Phát**

- Tìm hiểu các lý thuyết về Automation Testing, Web Automation Testing
- Các kỹ thuật thiết kế kịch bản kiểm thử áp dụng vào Web Automation Testing
- Tìm hiểu về Playwright, các ứng dụng của tool này về Web Automation Testing
- Lên kế hoạch setup workflow cho AI Agent, xác định các skill cần dùng trong workflow này
- Các thông tin đã tìm hiểu và plan chi tiết: [playwright-automation-plan.md](https://drive.google.com/file/d/1s5CMEAgvEM1PuaCpOmsltLTM8PBOo_Pc/view)

# Khai báo sử dụng AI

**23127378 – Nguyễn Gia Huy**
- Gemini 3.1 Pro, Google. Truy cập 22h00 ngày 03/07/2026
    - Mục đích: Tìm hiểu tool **Mabl**
    - Prompt: "Chủ đề của tôi là test một website bán hàng theo yêu cầu trong file. Tool này có phù hợp không. Ưu và nhược điểm các điểm hạn chế"
    - Kết quả: AI nhận xét Mabl phù hợp với đồ án nhưng cần lưu ý một số vấn đề (giới hạn của bản dùng thử/miễn phí, khó giả lập mạng chậm để test độ ổn định, cơ chế tự phục hồi có thể che giấu lỗi thật, và các bộ chọn do AI sinh ra thường kém ổn định hơn data-test-id)
    - Nhận xét: AI đã dựa trên tài liệu mô tả đề tài để pgaan tích và xác nhận Mabl đáp ứng tiêu chí bắt buộc về việc sử dụng công cụ AI của đồ án. Các phân tích về ưu, nhược điểm khá thực tế


*  Gemini, Google. Truy cập 16h47 ngày 04/07/2026
    * Mục đích: Tìm hiểu cách cài đặt, sử dụng cơ bản và các tính năng nổi bật của nền tảng Mabl.
    * Prompt: "Hãy viết hướng dẫn cài, sử dụng, các tính năng nổi bật của Mabl"
    * Kết quả: AI đã cung cấp một bản hướng dẫn gồm 3 phần rõ ràng: các bước cài đặt (thông qua việc tải Mabl Desktop App), các bước sử dụng cơ bản (từ tạo ứng dụng, record thao tác trên trình duyệt nhúng, thêm assertion, đến chạy test), và tóm tắt các tính năng cốt lõi (Auto-healing, Visual Diff, No-code, Cloud Execution).
    * Nhận xét: AI trả lời đúng trọng tâm, cấu trúc mạch lạc và rất dễ hiểu cho người mới bắt đầu. Các bước hướng dẫn (ví dụ: tạo test case cho luồng giỏ hàng) và các tính năng được liệt kê (như Auto-healing, Visual diff) bám rất sát với ngữ cảnh và yêu cầu kiểm thử EShop của đồ án. Thông tin giúp nhóm dễ dàng hình dung quy trình làm việc thực tế với Mabl để đưa vào báo cáo và demo.

**23127379 – Thái Minh Huy**
- Gemini 3.1 Pro, Google. Truy cập 20h00 ngày 03/07/2026
    - Mục đích: Tìm hiểu sơ bộ về tool **Playwright**
    - Prompt: "Tôi đang tìm hiểu về Tool Playwright trong Seminar, bạn hãy cho tôi biết là tool Playwright là công cụ kiểm thử gì, tool này phù hợp cho các đối tượng nào, tool này được sử dụng trong những dự án mang tính chất như thế nào (lớn hay nhỏ hay nghiệp vụ phức tạp,...), công cụ này có test type, test level, test technique như thế nào."
    - Kết quả: A.I đã đưa ra thông tin sơ bộ về Playwright là công cụ kiểm thử như nào, phù hợp cho đối tượng lập trình viên và các kỹ sư kiểm thử tự động, tool phù hợp cho ứng dụng web SPA (ReactJS của Eshop), mỗi trình duyệt được test ở Playwright sử dụng một Browser Context độc lập và riêng biệt, có cơ chế tích hợp CI/CD nếu dự án có áp dụng quy trình DevOps.
    - Nhận xét: A.I đã dựa trên tài liệu mô tả được tích hợp đính kèm với prompt của sinh viên để phân tích và nêu ra các câu trả lời phù hợp với ngữ cảnh và tài liệu khá thực tế.

- Gemini 3.1 Pro, Google. Truy cập 20h10 ngày 03/07/2026
    - Mục đích: Cho biết ưu và nhược điểm của công cụ Playwright.
    - Prompt: "Ưu và nhược điểm của công cụ Playwright có những gì."
    - Kết quả: A.I đã nêu rõ về những ưu điểm của Playwright như là phù hợp với ứng dụng SPA của ReactJS, có cơ chế sử dụng Browser Context, chưa kể thì Playwright còn là mã nguồn mở và cộng đồng sử dụng rất nhiều. Nhược điểm, Playwright không có hỗ trợ trong việc kiểm thử web ở Mobile, Playwright sẽ là công cụ tập trung vào viết code để thiết kế kịch bản kiểm thử nên đòi hỏi người sử dụng cũng phải có nền tảng lập trình.
    - Nhận xét: với tài liệu kỹ thuật được lấy làm ngữ cảnh, A.I đã nêu ra những ưu và nhược điểm của công cụ Playwright khá thực tế, đáp ứng phù hợp với yêu cầu của đồ án.

**23127396 – Lương Linh Khôi**

- ChatGPT, OpenAI. Truy cập 16h32 ngày 04/07/2026
  - Mục đích: Tìm hiểu cơ chế hoạt động của Auto Healing trong Mabl.
  - Prompt: "Giải thích cơ chế hoạt động của Auto Healing trong Mabl Web Automation Testing. Trình bày cách Mabl nhận diện phần tử, xử lý khi locator thay đổi, vai trò của Machine Learning trong việc tự động khôi phục test và các trường hợp Auto Healing hoạt động hiệu quả hoặc không hiệu quả."
  - Kết quả: A.I đã cung cấp thông tin về cơ chế Auto Healing của Mabl. Theo đó, Mabl không chỉ lưu một locator duy nhất mà còn lưu nhiều thuộc tính của phần tử như ID, CSS Selector, XPath, văn bản hiển thị và vị trí trong DOM để tạo "dấu vân tay" (fingerprint) cho phần tử. Khi giao diện thay đổi, Mabl sử dụng các thuật toán so khớp và Machine Learning để tìm phần tử tương tự có độ tin cậy cao nhất, từ đó giúp test tiếp tục thực thi mà không cần chỉnh sửa thủ công.
  - Nhận xét: A.I đã giải thích rõ nguyên lý hoạt động của Auto Healing, đồng thời đưa ra các ví dụ thực tế về thay đổi locator và cấu trúc DOM. Nội dung giúp người học hiểu được lợi ích của Auto Healing trong việc giảm chi phí bảo trì test automation cũng như nhận biết các trường hợp mà cơ chế này không thể xử lý được.


**23127449 – Nguyễn Tấn Phát**

- Claude Sonnet 4.6, Anthropic, 2026-07-02 02:17:

  - **Prompt:**

    ```
    Tôi đang có nhiệm vụ là tiến hành kiểm thử SUT (system under test) eshop-sut
    này cho môn học Software Testing của tôi. Nhiệm vụ của tôi là tìm hiểu về
    Web Automation Testing và sau đó tiến hành setup, thiết kế các kịch bản test,
    thực thi các kịch bản đó, tổng kết lại kết quả, và vấn đáp (phải demo được
    1 kịch bản cụ thể đã làm), đồng thời trong quá trình làm phải có audit lại
    rõ ràng khi sử dụng AI (input prompt, model nào, AI output là gì, tôi có
    đồng ý kết quả không, nếu không đồng ý thì tôi sẽ chỉ ra các chỗ sai là gì,
    lý do kết quả AI cung cấp sai, và cần sửa lại nó như nào). Do đó tôi muốn
    bạn vào vai là một Senior QA/QC với trên 5 năm kinh nghiệm về lĩnh vực Web
    Automation Testing để hướng dẫn tôi hoàn thành toàn bộ nhiệm vụ được giao
    thật đầy đủ và chi tiết nhất.

    Hãy confirm bạn đã sẵn sàng để chúng ta bắt đầu. Sau đó tôi sẽ đưa ra các
    yêu cầu tiếp theo.
    ```

  - **AI Output:**

    ```
    Xin chào! Tôi sẵn sàng rồi! 👋
    ──────
    ## Giới thiệu vai trò

    Tôi sẽ đóng vai Senior QA/QC Engineer với hơn 5 năm kinh nghiệm trong lĩnh vực:

    • Web Automation Testing (Selenium, Playwright, Cypress)
    • Test Design (Test Case, Test Scenario, Boundary Value Analysis, Equivalence Partitioning)
    • CI/CD Integration & Test Reporting
    • Agile/Scrum testing workflows
    ──────
    ## Kế hoạch tổng thể cho nhiệm vụ của bạn

    Chúng ta sẽ đi qua các phase sau:

      Phase     │ Nội dung                                │ Deliverable
    ────────────┼─────────────────────────────────────────┼────────────────────────────────
      1         │ Tìm hiểu SUT & Web Automation Testing   │ Báo cáo phân tích SUT
      2         │ Setup môi trường testing                │ Môi trường chạy được
      3         │ Thiết kế kịch bản test                  │ Test Cases / Test Scenarios
      4         │ Thực thi & ghi nhận kết quả             │ Test Report
      5         │ Demo kịch bản cụ thể                    │ Script demo
      6         │ AI Audit Log                            │ Tài liệu audit
    ──────
    ## Bước đầu tiên — Tôi cần biết thêm

    Trước khi bắt đầu, cho tôi hỏi một vài điều:

    1. Framework testing — Bạn có yêu cầu dùng framework cụ thể không? (Selenium + Python/Java, Playwright, Cypress...)
    2. SUT hiện tại — Eshop-SUT đang chạy local hay có URL deploy sẵn?

    Bạn hãy chia sẻ thêm để tôi định hướng chính xác nhất! 🚀
    ```

- Claude Sonnet 4.6, Anthropic, 2026-07-02 03:05:
    - **Prompt:**
    ```
    Trước khi bắt đầu vào setup hay thiết kế các kịch bản kiểm thử và thực thi nó, tôi muốn chúng ta bắt đầu vào bước lên kế hoạch thật chi tiết nhất toàn bộ các bước từ đầu đến cuối để có thể hoàn thành được nhiệm vụ được giao. Tôi muốn bạn phân tích thật kĩ vào tạo plan này cho tôi, lưu ý tool tôi muốn chọn để tìm hiểu và thực hiện là Playwright. Và nội dung trong plan của bạn ở từng mục cần phải chi tiết nhất, chi tiết ở đây là chi tiết về các nội dung cần làm trong mục đó (chứ không phải là chi tiết luôn các bước cần làm gì), và phải chi tiết nhất về các mục cần phải có trong plan. Tôi muốn đặt tên plan là playwright-automation-plan.md, trình bày toàn bộ nội dung bằng markdown và lưu lại vào file này, từ ngữ sử dụng phải đúng chuyên môn, dùng tiếng anh, trình bày rõ ràng, chuẩn production, không được bịa các nội dung, và các nội dung bạn cung cấp phãi chính xác lý thuyết thực tế và là các best practice.

    Hiện tại trong eshop-sut/ có 2 file bạn cần tham khảo để hiểu hơn về hệ thống sut eshop-sut của tôi:

    - README.md: Chứa các Đặc tả Yêu cầu Hệ thống, Mô tả **yêu cầu nghiệp vụ đúng** của hệ thống EShop.
    - api_specification.md: Cung cấp danh sách và cách sử dụng các Backend API của hệ thống EShop.

    Đồng thời tôi muốn trong plan bạn phải trình bày được ít nhất các nội dung mà tôi liệt kê sau đây (nói là plan nhưng tôi vẫn muốn trình bày luôn các lý thuyết về web automation testing, vì nó dùng để tôi trả lời các câu hỏi lúc vấn đáp sau này):

    - Automation Testing là gì? Web Automation Testing là gì, có gì khác biệt hơn? (do tôi thấy có cả mobile và desktop cũng automation testing được)
    - Đặc điểm (và các lý thuyết liên quan) của web automation testing là gì? Và chúng ta sẽ cần test những gì (API, UI, DB), hay chỉ cần có các kịch bản test và viết script cho các kịch bản đó thôi, không quan tâm API, UI, DB ra sao?
    - Ưu điểm, nhược điểm của web automation testing? Nó giải quyết được vấn đề gì, và trong thực tế nó được áp dụng như thế nào?
    - Test Type? Test Method? Test Level? Test Technique? Execution Type? của Web Automation Testing?
    - Chúng ta sẽ thiết kế các kịch bản test (test case) như nào, dùng kĩ thuật gì để thiết kế là tối ưu nhất? (kĩ thuật nào trong thực tế hay được dùng)
    - Web Automation Lifecycle là gì?
    - Các lý thuyết và justify cho tool Playwright mà tôi chọn:
      - Đặc điểm là gì? Ưu điểm, nhược điểm? Tại sao lại dùng tool này mà không dùng các tool khác (so sánh với Selenium, Cypress, mabl, testim)?
      - Tool này có các tính năng gì hỗ trợ cho web automation testing, nhớ mô tả các tính năng đó hỗ trợ được chi tiết như nào?
      - Tool này có free không, phù hợp với đối tượng nào, loại test type nào, và sử dụng được trong project lớn hay nhỏ hay cả hai?
      - Cần setup như nào dựa trên cấu trúc của eshop-sut/ hiện tại là best practice với playwright. Và playwright tôi muốn setup theo hướng dùng typescript.
    - Và các nội dung liên quan khác, nếu bạn thấy nó phù hợp và cần thêm vào

    Lưu ý các nội dung về lý thuyết của Web automation testing hay playwright bạn phải cung cấp thật đầy đủ và chi tiết nhất. Riêng các nội dung về các kịch bản kiểm thử bạn không cần phải cung cấp các thông tin chi tiết luôn về các kịch bản đó (nội dung của các kịch bản đó), do tôi muốn làm nó chi tiết lúc sau bằng cách sử dụng các skill/command trong AI Agent.

    Tiếp theo tôi muốn bạn trình bày tổng quát kế hoạch để setup eshop-sut/ để có thể tích hợp AI Agent vào hỗ trợ trong quá trình làm. Lưu ý tôi muốn setup theo hướng sử dụng skill và các command workflow kết hợp với Antigravity CLI để cùng hoàn thành nhiệm vụ, nhưng trong các nội dung bạn cung cấp chỉ cần ghi tổng quát là AI Agent là được, do tôi muốn setup skill và workflow tổng quát nhất, và các nội dung chi tiết cho skill hay command bạn không cần cung cấp trong plan này, tôi sẽ làm sau. Tôi có các yêu cầu sau bạn cần phải trình bày cho rõ:

    - Tôi muốn chúng ta phải đi từ từ từng bước và phải có sự kiểm tra của con người (không được automation toàn bộ, ngoại trừ khi chạy script test). Ví dụ như bắt đầu từ bước phân tích requirement và thiết kế các kịch bản kiểm thử, xác định các scope, tiêu chí đánh giá thế nào là pass/fail. Sau đó mới tiến hành setup môi trường để test cho từng kịch bản, tiến hành thực thi và sau đó ghi nhận kết quả, và phải có bước log AI interaction lại sau mỗi một workflow hoàn chỉnh. ví dụ như workflow là plan -> build -> review, thì nếu chúng ta dùng workflow này, chúng ta phải log lại toàn bộ AI interaction sau từng command. Do đó tôi cần bạn phân tích thật kĩ để đề xuất một workflow chuẩn nhất (các command cần có là gì, các skill cần có là gì) và phải là best practice trong thực tế.
    - Phân tích xem chúng ta sẽ cần có các skill, command (workflow) nào? Chức năng của mỗi skill, command đó là gì? Mỗi command sử dụng các skill nào? Lưu ý một command có thể dùng nhiều skill, nhưng phải phù hợp
    - Và cần có 1 skill như ai-audit-logger để log lại AI interaction
    - Tôi tìm trên github có 1 skill về playwright là playwright-skill trong repo https://github.com/testdino-hq/playwright-skill. Tôi cần bạn phân tích xem skill này nên được dùng trong command nào, và skill này hỗ trợ được gì, nó có hỗ trợ generate các script playwright cho chúng ta không. Ví dụ tôi tải skill đó về global rồi thì chỉ cần chỉ nó cần được dùng trong command nào thôi, nhưng bạn cũng cần list nó ra trong plan để tôi biết.
    - File AGENTS.md cần trình bày các nội dung nào (chỉ cần tổng quát chứ không cung cấp luôn nội dung chi tiết)? Ví dụ như mô tả tổng quan về eshop-sut, có các role nào, mapping 2 file README.md và api_specification.md và chức năng 2 file này, AI cần đọc nó khi nào. Tech stack là gì (backend, frontend-web, frontend-admin, mobile không cần vì chúng ta làm web). Mapping các skill và trình bày tổng quát workflow các command đó, mỗi command dùng các skill nào. Và các thông tin khác mà file này thường hay trình bày trong thực tế.

    Lưu ý trong quá trình phân tích và tạo file md này, nếu có chỗ nào bạn thấy mơ hồ, chỗ nào cần có sự lựa chọn của tôi hay cần hỏi lại tôi thì phải dừng lại và hỏi ý kiến của tôi để tôi trả lời trước khi thêm nội dung đó vào file, và bạn nên có giải thích cho các lựa chọn để tôi dễ chọn. Sau đó tôi sẽ kiểm tra lại plan và feedback lại.
    ```
    
    - **AI Output:** File [playwright-automation-plan.md](https://drive.google.com/file/d/1s5CMEAgvEM1PuaCpOmsltLTM8PBOo_Pc/view)
    ```
    ## Tóm tắt nội dung đã hoàn thành

    File  playwright-automation-plan.md  đã được viết đầy đủ với 14 sections chính:

      Section     │ Nội dung
    ──────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
      §1          │ Automation Testing là gì, phân loại theo platform (Web/Mobile/Desktop), Web Automation khác biệt ra sao
      §2          │ Deep dive Web Automation: đặc điểm, ưu/nhược điểm, ứng dụng thực tế trong industry
      §3          │ Test Classification: Levels (Testing Pyramid), Types, Methods (Black/White/Grey-box), Execution Types
      §4          │ Test Design Techniques: EP, BVA, Decision Table (applied to FR-09 coupon), State Transition (FR-10 order FSM), Error Guessing — với bảng áp dụng cụ thể vào EShop
      §5          │ Web Automation Testing Lifecycle (WATL) — 6 phases từ Planning → Maintenance
      §6          │ Playwright: định nghĩa, 13 tính năng core, bảng so sánh với Selenium/Cypress/mabl/Testim, đối tượng phù hợp,  playwright-skill  reference
      §7          │ EShop SUT analysis: scope, test accounts, FR traceability matrix, coupon data, out-of-scope
      §8          │ Project structure  e2e/  chi tiết đầy đủ với rationale,  tsconfig.json ,  playwright.config.ts , setup steps
      §9          │ Test Suite Architecture: POM pattern với code example, Fixture strategy, naming convention  TC-MODULE-NNN , test data strategy
      §10         │ AI Agent Workflow: human-in-the-loop philosophy, 6 commands ( /spec ,  /plan ,  /build ,  /review ,  /fix ,  /log-audit ), full workflow diagram, skills inventory
      §11         │ AI Audit Logging Protocol: mục đích, cấu trúc entry đầy đủ, trigger events,  ai-audit-logger  skill
      §12         │ Execution & Reporting: environments, CLI commands reference, result classifications, defect severity, defect template, test report structure
      §13         │ Definition of Done (per test case, per feature, project), Exit Criteria, Entry Criteria
      Appendix A  │ AGENTS.md structure: 7 sections cần có (Overview, Roles, Reference Docs, Tech Stack, Skill Mapping, Conventions, Constraints)

    Bạn hãy đọc qua và feedback lại cho tôi nhé! 🎯
    ```
    - **Ghi chú:** File này đã được kiểm tra, và rút gọn lại nội dung xuống còn 10 section

# Công việc dự định cho tuần sau
**23127378 – Nguyễn Gia Huy**
- Tải các tool mà nhóm sử dụng (Mabl, Playwright)
- Thực hành test thử một số test case đã làm bở HW2
- Tìm hiểu cách tạo workflow kiểm thử tự động

**23127379 – Thái Minh Huy**
- Cấu hình khởi đầu và chạy thử tool mà nhóm sử dụng (Playwright, Mabl)
- Thực hành và tìm hiểu các tính năng liên quan của tool để lên ý tưởng cho dự án và xây dựng Skill liên quan đến tool được sử dụng

**23127396 – Lương Linh Khôi**

- Cài đặt và cấu hình môi trường làm việc với Mabl.
- Thực hành tạo các test case Web Automation cơ bản bằng Mabl.
- Tìm hiểu và thực hành các tính năng chính của Mabl như Test Recorder, Assertions, Data-driven Testing và Test Scheduling.

**23127449 – Nguyễn Tấn Phát**

- Thiết kế các skill dựa trên plan chi tiết
- Setup Playwright và kiểm tra tính khả thi của workflow dựa trên một kịch bản kiểm thử cụ thể

# Vấn đề
Hiện tại nhóm chưa gặp vấn đề khó khăn trong tuần này


