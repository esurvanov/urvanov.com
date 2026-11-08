---
title: Báo cáo phân tích với tác nhân AI: dữ liệu từ cơ sở dữ liệu, bảng tính và tài liệu qua MCP
date: 2026-10-05
updated: 2026-11-08
description: Cách làm báo cáo phân tích bằng tác nhân AI: kết nối cơ sở dữ liệu chỉ đọc qua MCP, giao truy vấn và phần tóm tắt cho tác nhân, tự kiểm tra một con số và đặt quyền riêng cho từng nguồn.
tags: AI, tác nhân, MCP, phân tích, báo cáo, cơ sở dữ liệu, harness
category: harness
layout: wide
mentions: MCP, Model Context Protocol, analytics, reports, SQL, database, Claude Code, permissions
toc: flow=Báo cáo được làm thế nào | access=Nguồn và quyền | connect=Kết nối | verify=Kiểm tra | first=Bắt đầu từ đâu | faq=Câu hỏi | next=Đọc tiếp
---

Làm báo cáo thủ công là xuất dữ liệu từ cơ sở dữ liệu, dựng bảng, vẽ biểu đồ và viết nhận xét, và bước nào cũng phải chờ một người. Tác nhân AI (AI agent) có quyền truy cập các nguồn sẽ tự đi hết chuỗi này, còn con người kiểm tra số liệu và quyết định bước tiếp theo. Phần dưới nói về quy trình đó, quyền nên cấp cho từng nguồn, cách kết nối cơ sở dữ liệu và cách kiểm tra kết quả. Kiến thức nền có trong bài [MCP cho tác nhân AI](/blog/mcp-agent-access/).

<b-post series="harness">

<b-chapter id="flow" icon="grid-alt" title="Báo cáo được làm thế nào">
  <iso-art name="analytics-reports-agent/before-after"></iso-art>
  <b-finding>
    <ex>Làm thủ công, một người tự chuyển dữ liệu giữa cơ sở dữ liệu, bảng, biểu đồ và văn bản. Với tác nhân, họ nhận bản nháp hoàn chỉnh và chỉ việc kiểm tra số liệu.</ex>
    <gen>Các nguồn kết nối với tác nhân qua MCP. Mỗi bước trong chuỗi đều lặp lại được và cho kết quả rõ ràng, nên có thể giao cho tác nhân. Các con số có ý nghĩa gì thì do con người quyết định.</gen>
    <do k="Việc cần làm">Liệt kê các bước của báo cáo gần nhất và đánh dấu bước nào chỉ là sao chép.</do>
  </b-finding>
</b-chapter>

<b-chapter id="access" icon="lock" title="Nguồn và quyền">
  <b-why>Hệ thống, dữ liệu và tài liệu nằm ngoài cuộc trò chuyện. Quyền được đặt riêng cho từng nguồn.</b-why>
  <iso-art name="analytics-reports-agent/source-rights"></iso-art>
  <b-finding>
    <ex>Jira, tài liệu và cơ sở dữ liệu mở để đọc, bảng tính mở để ghi nhưng phải xác nhận, và chỉ môi trường kiểm thử mới được phép làm hỏng.</ex>
    <gen>Tác nhân thấy đúng những gì đã được kết nối và chỉ làm đúng những gì được cho phép.</gen>
    <do k="Việc cần làm">Với mỗi nguồn, viết một từ: đọc, ghi hoặc chỉ môi trường kiểm thử.</do>
  </b-finding>
</b-chapter>

<b-chapter id="connect" icon="plug" title="Cách kết nối cơ sở dữ liệu">
  <b-say-agent title="Nói với tác nhân">Hãy kết nối cơ sở dữ liệu phân tích ở chế độ chỉ đọc. Cho xem lược đồ của bảng orders và tính doanh thu tháng này. Hiển thị truy vấn bạn đã dùng.</b-say-agent>
  <b-why align="left">Tác nhân tự chạy lệnh kết nối. [Nếu tác nhân nhờ bạn làm việc đó](/blog/agent-hands-work-back-to-you/).</b-why>
  <b-spoiler summary="Cách làm thủ công">
    <iso-art name="analytics-reports-agent/setup-steps"></iso-art>
    <b-codebox copy>
      claude mcp add --transport stdio db -- npx -y @bytebase/dbhub \
        --dsn "postgresql://readonly:pass@prod.db.com:5432/analytics"
    </b-codebox>

Hãy tạo người dùng chỉ đọc để truy vấn của tác nhân không thể thay đổi gì. Ví dụ prompt trong tài liệu: “What’s our total revenue this month?”, “Show me the schema for the orders table”.

  </b-spoiler>
  <b-finding>
    <ex>Tác nhân kết nối cơ sở dữ liệu, xem lược đồ, tính doanh thu và hiển thị truy vấn.</ex>
    <gen>Quyền chỉ đọc giữ cho truy vấn an toàn: tác nhân không thể thay đổi dữ liệu.</gen>
    <do k="Việc cần làm">Tạo người dùng cơ sở dữ liệu chỉ đọc và kết nối nó trước tiên.</do>
  </b-finding>
</b-chapter>

<b-chapter id="verify" icon="shield-check" title="Cách kiểm tra báo cáo">
  <iso-art name="analytics-reports-agent/check-number"></iso-art>
  <b-finding>
    <ex>Tác nhân hiển thị truy vấn và kết quả, còn con người tính lại một con số bằng cách khác.</ex>
    <gen>Mô hình tính toán bằng truy vấn, và truy vấn có thể đọc lại. Một con số khớp sẽ làm tăng độ tin cậy cho phần còn lại.</gen>
    <do k="Việc cần làm">Trước khi gửi báo cáo đi tiếp, hãy tự kiểm tra một con số trong báo cáo.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="Bắt đầu từ đâu">
  <iso-art name="analytics-reports-agent/start-steps"></iso-art>
  <b-finding>
    <ex>Ba bước: cơ sở dữ liệu chỉ đọc, một báo cáo, kiểm tra một con số.</ex>
    <gen>Hãy bắt đầu bằng báo cáo mà bạn đã biết sẵn các con số: như vậy sẽ thấy ngay tác nhân sai ở đâu.</gen>
    <do k="Việc cần làm">Hôm nay hãy tạo người dùng chỉ đọc và nhờ tác nhân tính một chỉ số quen thuộc.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Tác nhân AI làm báo cáo phân tích như thế nào?">Tác nhân tự đi hết chuỗi: xuất dữ liệu từ cơ sở dữ liệu, bảng, biểu đồ và văn bản. Con người kiểm tra số liệu và quyết định bước tiếp theo.</q>
    <q t="Kết nối cơ sở dữ liệu với tác nhân bằng cách nào?">Qua MCP với quyền chỉ đọc: tác nhân không thể thay đổi dữ liệu.</q>
    <q t="Kiểm tra báo cáo của tác nhân bằng cách nào?">Đọc lại các truy vấn đã dùng và đối chiếu một hai con số với số liệu đã biết: nếu khớp thì phần còn lại đáng tin hơn.</q>
    <q t="Tác nhân thấy gì trong các nguồn?">Đúng những gì đã được kết nối, và chỉ làm đúng những gì được cho phép.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Đọc tiếp">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="Kiến thức nền" t="MCP cho tác nhân AI: giải quyết vấn đề gì và cách giao việc kết nối cho tác nhân">MCP là gì và cách kết nối</item>
    <item href="/blog/incident-investigation-agent/" k="Tình huống khác" t="Điều tra sự cố bằng tác nhân AI">Sentry và Grafana qua MCP</item>
    <item href="/blog/work-prompts-examples/" k="Thực hành" t="Prompt cho công việc: năm phần và sáu ví dụ cho ChatGPT và Claude">Ví dụ “phân tích bảng”</item>
  </b-links>
</b-chapter>
<b-footer>Ví dụ là hư cấu. Lệnh kết nối cơ sở dữ liệu và lời khuyên về người dùng chỉ đọc dựa theo tài liệu Claude Code: <a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">Connect Claude Code to tools via MCP</a>.</b-footer>
</b-post>
