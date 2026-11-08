---
title: Vòng phản hồi lỗi ngắn: từ nút “Báo lỗi” đến bản sửa với tác nhân AI
date: 2026-10-20
updated: 2026-11-08
description: Cách sửa lỗi nhanh hơn mà không bị “truyền tin qua nhiều tay”: nhân viên báo lỗi ngay trong ứng dụng, ngữ cảnh được thu thập sẵn, tác nhân AI tìm nguyên nhân, con người duyệt.
tags: AI, tác nhân, lỗi, phản hồi, MTTR, MCP, Claude Code, harness
category: harness
layout: wide
mentions: feedback loop, MTTR, DORA, bug report, AI agent, Claude Code, Model Context Protocol, human-in-the-loop
toc: chain=Thời gian mất ở đâu | button=Nút bấm thay cho kể lại | agent=Tác nhân và con người | modes=Hai chế độ | cases=Ví dụ và con số | risks=Rủi ro | first=Cách bắt đầu | faq=Câu hỏi | next=Đọc tiếp
---

Vòng phản hồi lỗi ngắn hoạt động như sau: nhân viên gửi lỗi bằng một nút ngay trong ứng dụng, ứng dụng tự đính kèm ngữ cảnh kỹ thuật, tác nhân AI (AI agent) tìm nguyên nhân và đề xuất kế hoạch, rồi con người duyệt kế hoạch và bản sửa. Không có quản lý hay ticket nào kể lại lỗi. Phần dưới nói về thời gian đi đâu, hai chế độ và các rủi ro.

<b-post series="harness">

<b-chapter id="chain" icon="clock" title="Thời gian mất ở đâu">
  <b-why align="left">Một lỗi thường đi một quãng đường dài từ người thấy nó đến người sửa nó. Chuỗi trên cho thấy đường đi quen thuộc: nhân viên, quản lý, ticket, làm rõ, tái hiện. Chuỗi dưới cho thấy vòng ngắn: nút trong ứng dụng, báo cáo có ngữ cảnh, tác nhân, con người duyệt, phát hành. Các thanh bên dưới cho thấy báo cáo thiếu thông tin thường đến mức nào: 92% lỗi Android không có các bước tái hiện, khoảng 70% báo cáo trên GitHub không đầy đủ, và chỉ 37–44% lỗi được chuyển tiếp.</b-why>
  <b-sublabel>Đường đi quen thuộc</b-sublabel>
  <b-hchain label="Nhân viên, quản lý, ticket, lập trình viên, làm rõ, tái hiện">
    <step icon="user" t="Nhân viên">thấy lỗi</step>
    <step icon="users" t="Quản lý">kể lại</step>
    <step icon="file-text" t="Ticket">chờ</step>
    <step icon="help" t="Làm rõ">nhiều vòng</step>
    <step icon="bug" t="Tái hiện">hàng giờ</step>
  </b-hchain>
  <b-sublabel top="22">Vòng ngắn</b-sublabel>
  <b-hchain label="Nút trong ứng dụng, báo cáo có ngữ cảnh, tác nhân, con người duyệt, phát hành">
    <step icon="target" t="Nút">trong ứng dụng</step>
    <step icon="database" t="Báo cáo">có ngữ cảnh</step>
    <step icon="bot" t="Tác nhân">nguyên nhân</step>
    <step icon="check-circle" t="Con người">duyệt</step>
    <step icon="zap" t="Phát hành">đã sửa</step>
  </b-hchain>
  <b-sublabel top="22">Tỷ lệ lỗi và báo cáo</b-sublabel>
  <b-count-bars>
    <bar k="Không có các bước (Android)" w="92%" color="c-none">92%</bar>
    <bar k="Không đầy đủ (GitHub)" w="70%" color="c-none">~70%</bar>
    <bar k="Được chuyển tiếp" w="44%" color="c-light">37–44%</bar>
  </b-count-bars>
  <b-finding>
    <ex>Mỗi lần kể lại lại làm rơi mất thứ lập trình viên cần nhất: các bước, kết quả mong đợi, trạng thái màn hình.</ex>
    <gen>Lập trình viên cần nhất là các bước tái hiện và stack lỗi, còn người dùng khó cung cấp chúng nhất<b-proof href="https://thomas-zimmermann.com/publications/files/zimmermann-tse-2010.pdf" quote="Zimmermann et al., What Makes a Good Bug Report — a survey of Apache, Eclipse and Mozilla developers"/>. Tái hiện một báo cáo không đầy đủ mất 201 phút so với 120 phút<b-proof href="https://arxiv.org/pdf/2203.12093" quote="A study of bug report completeness — arxiv.org/pdf/2203.12093"/>.</gen>
    <do>Đếm xem một lỗi đi qua bao nhiêu tay, từ người thấy nó đến người sửa nó.</do>
  </b-finding>
</b-chapter>

<b-chapter id="button" icon="target" title="Nút bấm thay cho kể lại">
  <b-why>Người dùng chỉ cung cấp thứ máy không thể biết: họ muốn gì và đã thấy gì. Ứng dụng tự ghi lại phần còn lại.</b-why>
  <b-rules>
    <rule icon="image" t="Ảnh chụp có khung">Người dùng khoanh vùng cần chú ý, và các khung được in thẳng vào ảnh</rule>
    <rule icon="list-check" t="Ba câu hỏi">Bạn đã làm gì, bạn mong đợi gì, điều gì đã xảy ra; câu đầu được điền sẵn từ các lần bấm gần nhất</rule>
    <rule icon="mic" t="Giọng nói">Nói thành tiếng, và bản ghi lời được thêm vào đúng bước</rule>
    <rule icon="history" t="Thao tác">Các lần bấm, điều hướng, nhập liệu nhưng không kèm giá trị</rule>
    <rule icon="log-lines" t="Yêu cầu và lỗi">Các yêu cầu gần nhất tới máy chủ kèm phản hồi, lỗi console, trạng thái máy chủ</rule>
    <rule icon="lock" t="Ẩn dữ liệu cá nhân">Tên, thông tin liên hệ và tin nhắn trong văn bản được che, khóa bí mật bị cắt bỏ</rule>
  </b-rules>
  <b-finding>
    <ex>Mô tả lỗi chỉ mất vài giây: các câu trả lời được chọn bằng một lần chạm.</ex>
    <gen>Báo cáo được viết cho tác nhân, thứ đọc được lượng chi tiết kỹ thuật bất kỳ, nên toàn bộ được thu thập ngay một lần.</gen>
    <do>Đặt nút ở nơi người dùng thấy vấn đề, thay vì một tracker riêng.</do>
  </b-finding>
</b-chapter>

<b-chapter id="agent" icon="bot" title="Tác nhân và con người">
  <b-why align="left">Tác nhân phân tích, con người ra quyết định. Tác nhân nhận từng báo cáo riêng, điều tra và mang về một bản tổng kết: cái gì nhìn thấy được, nguyên nhân có thể kèm vị trí trong mã, kế hoạch và rủi ro. Nó không đổi mã và không đổi trạng thái. Con người duyệt kế hoạch. Sau đó tác nhân sửa trong một nhánh riêng, còn con người merge thay đổi và phát hành. Câu trong khung là yêu cầu mẫu gửi tác nhân.</b-why>
  <b-steps>
    <step t="Tác nhân nhận một báo cáo">mỗi báo cáo giao cho một tác nhân riêng, không chung phỏng đoán</step>
    <step t="Điều tra và báo cáo" hl>cái gì nhìn thấy được, nguyên nhân có thể kèm vị trí trong mã, kế hoạch, rủi ro, câu hỏi; không đụng đến mã và trạng thái</step>
    <step t="Con người duyệt kế hoạch">hoặc đặt câu hỏi</step>
    <step t="Sửa">nhánh, kiểm tra, merge request</step>
    <step t="Con người merge và phát hành">tác nhân chạy lại kịch bản trong báo cáo đến cuối rồi mới nói “đã sửa”</step>
  </b-steps>
  <b-say-agent title="Nói với tác nhân">Hãy lấy các báo cáo lỗi đang mở, phân tích từng cái bằng một tác nhân riêng và quay lại với báo cáo tổng hợp. Đừng thay đổi gì cho đến khi tôi duyệt.</b-say-agent>
  <b-finding>
    <ex>Tracker tự trao cho tác nhân các quy tắc làm việc khi kết nối, nên mọi phiên đều hành xử như nhau.</ex>
    <gen>Tác nhân mang lại tốc độ, còn quyết định ở lại với con người tại hai điểm: kế hoạch và merge.</gen>
    <do>Ghi thứ tự “điều tra → báo cáo → chờ duyệt” ở nơi tác nhân sẽ đọc mà không cần bạn.</do>
  </b-finding>
</b-chapter>

<b-chapter id="modes" icon="scales" title="Hai chế độ: theo nút bấm hoặc tự động">
  <b-why align="left">Có hai chế độ. Theo nút bấm, lập trình viên khởi động tác nhân bằng một lệnh, tác nhân tìm nguyên nhân và kế hoạch, con người duyệt. Ở chế độ tự động, hệ thống khởi động một tác nhân cho mỗi báo cáo và nó viết bản sửa ngay. Bảng so sánh hai chế độ theo tốc độ và chi phí.</b-why>
  <b-table>
| | Theo nút bấm | Tự động |
|---|---|---|
| Ai khởi động | lập trình viên, bằng một lệnh | hệ thống, ngay khi có báo cáo |
| Tác nhân làm gì | tìm nguyên nhân và kế hoạch | viết bản sửa ngay |
| Vai trò của lập trình viên | duyệt kế hoạch, kiểm tra thay đổi | kiểm tra thay đổi đã hoàn tất |
| Tốc độ | vài phút để có báo cáo | thay đổi đã sẵn sàng khi con người đến |
| Chi phí | tác nhân chỉ làm với các báo cáo quan trọng | tác nhân bị tiêu cho mọi báo cáo, kể cả trùng lặp và không phải lỗi |
  </b-table>
  <b-finding>
    <ex>Abnormal AI biến cả hai chế độ thành nhãn trên tác vụ: nhãn đầu nhờ tác nhân tìm nguyên nhân, nhãn sau nhờ viết bản sửa<b-proof href="https://abnormal.ai/blog/ai-agents-are-absorbing-the-first-pass-on-every-bug" quote="Abnormal AI: AI agents are absorbing the first pass on every bug"/>.</ex>
    <gen>Bắt đầu với chế độ theo nút bấm sẽ rẻ hơn: lập trình viên lọc nhiễu trước khi tác nhân bắt đầu viết mã.</gen>
    <do>Bật chế độ tự động khi luồng báo cáo đã sạch và hiếm khi trùng lặp.</do>
  </b-finding>
</b-chapter>

<b-chapter id="cases" icon="trend-up" title="Ví dụ và con số">
  <b-why align="left">Các con số từ thực tế doanh nghiệp cho thấy quy mô của hiệu quả: ở Wix thời gian giảm từ vài tuần xuống vài giờ, còn ở Ramp với Jam một báo cáo mất vài giây thay vì 15–20 phút. Dòng dưới bảng nói về ví dụ riêng của tác giả: trong 25 báo cáo ở tracker tích hợp sẵn, 23 đã được đóng.</b-why>
  <b-table>
| Ai | Họ làm gì | Trước → sau |
|---|---|---|
| Wix | tác nhân thu thập ngữ cảnh, viết và kiểm tra bản sửa, con người duyệt | vài tuần → vài giờ |
| Salesforce | một mô hình phân tích lỗi của khách hàng | ~300 ngày công → dưới một tuần |
| Metaview | tác nhân phân tích sự cố, con người kiểm tra | 30–45 phút → ~5 phút |
| LaunchDarkly | tác nhân tìm lỗi và mở bản sửa | ~40% lỗi không trùng lặp đã có bản sửa |
| Ramp + Jam | báo cáo kèm ảnh chụp và tự động thu thập ngữ cảnh | 15–20 phút → vài giây mỗi báo cáo |
  </b-table>
  <b-metric-line value="23 / 25">báo cáo đã đóng trong tracker tích hợp sẵn của một ứng dụng đang chạy</b-metric-line>
  <b-finding>
    <ex>Mọi ví dụ có chung một bước: ngữ cảnh được thu thập trước khi con người ngồi xuống với lỗi.</ex>
    <gen>Thời gian sửa ngắn hơn (MTTR trong các chỉ số DORA) đến từ việc thu thập ngữ cảnh và chuỗi người ngắn<b-proof href="https://www.wix.engineering/post/from-weeks-to-hours-inside-wix-s-autonomous-bug-fixing-system" quote="Wix Engineering: From weeks to hours — inside Wix’s autonomous bug-fixing system"/>.</gen>
    <do>Hãy đo ngay thời gian từ báo cáo đến phát hành, để có cái mà so sánh.</do>
  </b-finding>
</b-chapter>

<b-chapter id="risks" icon="alert" title="Rủi ro">
  <b-why align="left">Tác nhân đọc văn bản do con người viết, nên phương pháp này có rủi ro riêng: báo cáo giả, dữ liệu cá nhân trong ảnh chụp, kiểm thử xanh nhưng tính năng hỏng và trách nhiệm bị mờ. Bốn thẻ bên dưới nêu từng rủi ro và cách loại bỏ.</b-why>
  <b-rules cols="2">
    <rule icon="shield-alert" t="Báo cáo giả">Con người viết nội dung báo cáo; tác nhân đọc nó như dữ liệu, không bao giờ như lệnh</rule>
    <rule icon="lock" t="Dữ liệu cá nhân">Văn bản được che, ảnh chụp gửi nguyên trạng, và một hộp thoại cảnh báo về điều đó</rule>
    <rule icon="check-square" t="Kiểm thử xanh, tính năng hỏng">Phép kiểm tra là chạy lại đúng kịch bản trong báo cáo trên cùng loại dữ liệu</rule>
    <rule icon="users" t="Trách nhiệm bị mờ">Con người duyệt kế hoạch và merge; im lặng không được tính là đồng ý</rule>
  </b-rules>
  <b-finding>
    <ex>Tác nhân có quyền ghi và nhận văn bản từ người dùng là một kênh để bị đánh lừa qua văn bản.</ex>
    <gen>Để biết cách giữ cho dữ liệu không biến thành lệnh, xem bài về [mặt phẳng dữ liệu và mặt phẳng điều khiển](/blog/data-plane-control-plane-prompt-injection/).</gen>
    <do>Cho tác nhân một khóa riêng: chỉ đọc để phân tích, chỉ ghi sau khi được duyệt.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="Cách bắt đầu">
  <b-why align="left">Bắt đầu bằng đo lường: trước hết đo đường đi của lỗi, rồi thêm nút, rồi cho tác nhân quyền đọc cùng quy tắc “báo cáo trước, duyệt sau”. Quyền ghi và chế độ tự động thêm sau.</b-why>
  <b-steps>
    <step t="Đo đường đi của lỗi">bao nhiêu người và bao nhiêu ngày từ “thấy lỗi” đến “đã sửa”</step>
    <step t="Thêm nút">ảnh chụp, ba câu hỏi, tự động thu thập thao tác và lỗi</step>
    <step t="Cho tác nhân quyền đọc" hl>và quy tắc: báo cáo trước, duyệt sau</step>
  </b-steps>
  <b-finding>
    <ex>Ba bước, chưa có chế độ tự động và chưa có quyền ghi.</ex>
    <gen>Trước hết là chuỗi người ngắn, sau đó mới đến tốc độ của tác nhân.</gen>
    <do>Bắt đầu với một ứng dụng và mười báo cáo.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Vòng phản hồi lỗi ngắn là gì?">Nhân viên gửi lỗi bằng một nút trong ứng dụng, ứng dụng đính kèm ngữ cảnh kỹ thuật, tác nhân tìm nguyên nhân và đề xuất kế hoạch, còn con người duyệt kế hoạch và bản sửa.</q>
    <q t="Vì sao nút “Báo lỗi” quan trọng?">Lập trình viên cần nhất là các bước tái hiện và stack trace, còn người dùng khó cung cấp chúng nhất. Nút bấm tự thu thập chúng.</q>
    <q t="Con người quyết định ở đâu?">Ở hai điểm: duyệt kế hoạch sửa và merge mã.</q>
    <q t="Nên bắt đầu với chế độ nào?">Chế độ theo nút bấm: lập trình viên lọc nhiễu trước khi tác nhân bắt đầu viết mã.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Đọc tiếp">
  <b-links>
    <item href="/blog/jira-ai-agent-boundaries/" k="Ranh giới" t="Jira và tác nhân AI: ưu điểm, nhược điểm và nên vạch ranh giới ở đâu">Vì sao thu thập lỗi là một dịch vụ riêng</item>
    <item href="/blog/bug-report-to-reproduction-agent/" k="QA" t="Công việc của QA sau bộ phận hỗ trợ với tác nhân AI">Tác nhân tái hiện lỗi từ Jira</item>
    <item href="/blog/incident-investigation-agent/" k="Sự cố" t="Điều tra sự cố bằng tác nhân AI">Sentry và Grafana qua MCP</item>
  </b-links>
</b-chapter>
<b-footer>Các con số lấy từ nghiên cứu về báo cáo lỗi (Zimmermann et al.; arxiv 2203.12093, 2301.01235; Jeong et al.) và blog kỹ thuật của Wix, Salesforce, Metaview, LaunchDarkly, Abnormal AI và Jam. Ví dụ là tracker lỗi tích hợp sẵn của một ứng dụng đang chạy, tháng 10/2026.</b-footer>
</b-post>
