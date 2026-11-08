---
title: Điều tra sự cố cùng tác nhân AI: lỗi Sentry và chỉ số Grafana trong một bức tranh qua MCP
date: 2026-10-05
updated: 2026-11-08
description: Cách điều tra sự cố cùng tác nhân AI: kết nối Sentry và Grafana qua MCP, để nó đối chiếu lỗi, chỉ số và thời điểm phát hành, giới hạn quyền và kiểm chứng giả thuyết.
tags: AI, tác nhân, MCP, Sentry, Grafana, sự cố, harness
category: harness
layout: wide
mentions: MCP, Model Context Protocol, Sentry, Grafana, incident investigation, observability, Claude Code
toc: flow=Diễn ra thế nào | connect=Kết nối | timeline=Tác nhân đối chiếu gì | rights=Quyền và rủi ro | first=Bắt đầu từ đâu | faq=Câu hỏi | next=Tiếp theo
---

Khi có sự cố, con người nhảy qua lại giữa Sentry, Grafana và chat rồi tự ghép bức tranh. Một tác nhân AI (AI agent) có quyền truy cập cả hai hệ thống gom lỗi, chỉ số và thời điểm sự kiện vào một bản nháp, còn con người kiểm tra giả thuyết và quyết định cần làm gì. Bên dưới: diễn ra thế nào, cách kết nối Sentry và Grafana, nên cấp những quyền nào. Phần cơ bản có trong bài [MCP cho tác nhân AI](/blog/mcp-agent-access/).

<b-post series="harness">

<b-chapter id="flow" icon="bug" title="Cuộc điều tra diễn ra thế nào">
  <iso-art name="incident-investigation-agent/before-after"></iso-art>
  <b-finding>
    <ex>Tác nhân đọc lỗi trong Sentry và biểu đồ trong Grafana, và con người nhận một bản nháp điều tra duy nhất.</ex>
    <gen>Sentry và Grafana được kết nối qua MCP ở chế độ chỉ đọc, nên tác nhân không thay đổi gì khi chưa được bạn cho phép. Con người kiểm tra giả thuyết.</gen>
    <do k="Việc cần làm">Liệt kê các hệ thống bạn đã tìm nguyên nhân trong sự cố gần nhất.</do>
  </b-finding>
</b-chapter>

<b-chapter id="connect" icon="plug" title="Cách kết nối Sentry và Grafana">
  <b-say-agent title="Nói với tác nhân">Kết nối Sentry và Grafana ở chế độ chỉ đọc. Tìm các lỗi mới của dịch vụ thanh toán trong Sentry trong một giờ qua, tìm trong Grafana lúc tỷ lệ phản hồi 5xx tăng, và đối chiếu với thời điểm phát hành. Đề xuất một giả thuyết và nêu nguồn của từng dữ kiện.</b-say-agent>
  <b-why align="left">Tác nhân tự chạy các lệnh; bạn chỉ đăng nhập Sentry qua trình duyệt và cung cấp token Grafana. [Nếu tác nhân nhờ bạn tự làm](/blog/agent-hands-work-back-to-you/).</b-why>
  <b-spoiler summary="Cách làm bằng tay">
    <iso-art name="incident-investigation-agent/setup-steps"></iso-art>

#### Sentry

    <b-codebox copy>
      claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
      /mcp   # sign in through the browser (OAuth)
    </b-codebox>

Đăng nhập dùng OAuth, và token được lưu cùng làm mới tự động.

#### Grafana

    <b-codebox copy>
      claude mcp add --transport stdio \
        --env GRAFANA_URL=https://myinstance.grafana.net \
        --env GRAFANA_SERVICE_ACCOUNT_TOKEN=$GRAFANA_TOKEN \
        grafana -- uvx mcp-grafana --disable-write
    </b-codebox>

Đây là server chính thức <a href="https://github.com/grafana/mcp-grafana" target="_blank" rel="noopener">grafana/mcp-grafana</a>. Token lấy từ một service account với quyền tối thiểu, và cờ --disable-write cấm thay đổi.

  </b-spoiler>
  <b-finding>
    <ex>Tác nhân kết nối cả hai hệ thống, tìm lỗi và biểu đồ, đối chiếu với bản phát hành và nêu các nguồn.</ex>
    <gen>Cả hai hệ thống kết nối bằng một lệnh, và quyền đọc giữ cuộc điều tra an toàn.</gen>
    <do k="Việc cần làm">Giao việc kết nối cho tác nhân và so kết quả của nó với những gì bạn tự thấy trong Sentry và Grafana.</do>
  </b-finding>
</b-chapter>

<b-chapter id="timeline" icon="lines" title="Tác nhân đối chiếu gì">
  <iso-art name="incident-investigation-agent/event-timeline"></iso-art>
  <b-finding>
    <ex>Bản phát hành, đỉnh lỗi và cảnh báo nằm trên cùng một dòng thời gian, và thấy được cái gì xảy ra trước.</ex>
    <gen>Trùng khớp về thời gian cho ra một giả thuyết và không chứng minh nguyên nhân: việc kiểm tra vẫn thuộc về con người.</gen>
    <do k="Việc cần làm">Yêu cầu kèm liên kết tới biểu đồ hoặc sự kiện với mỗi kết luận.</do>
  </b-finding>
</b-chapter>

<b-chapter id="rights" icon="shield-check" title="Quyền và rủi ro">
  <iso-art name="incident-investigation-agent/rights-ladder"></iso-art>
  <b-rules sw="1.8">
    <rule icon="key" t="Token">Một service account Grafana với quyền tối thiểu; giá trị nằm trong biến môi trường.</rule>
    <rule icon="lock" t="Chỉ đọc">Cờ --disable-write cấm thay đổi, kể cả tạo sự cố.</rule>
    <rule icon="ban" t="Server bên thứ ba">Chỉ kết nối các server bạn tin cậy: các server đọc văn bản từ bên ngoài mở cửa cho tấn công chèn prompt (prompt injection).</rule>
  </b-rules>
  <b-finding>
    <ex>Tác nhân đọc lỗi và biểu đồ, và không được thay đổi gì trong các hệ thống.</ex>
    <gen>Quyền được cấp theo từng nguồn, và những quyền rộng nhất vẫn đóng.</gen>
    <do k="Việc cần làm">Tạo một service account chỉ đọc và kết nối Grafana với cờ --disable-write.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="Bắt đầu từ đâu">
  <iso-art name="incident-investigation-agent/start-steps"></iso-art>
  <b-finding>
    <ex>Ba bước: Sentry, Grafana, một thử nghiệm trên sự cố đã qua.</ex>
    <gen>Bạn biết sự cố đã qua, nên thấy được tác nhân tìm ra nguyên nhân ở đâu và sai ở đâu.</gen>
    <do k="Việc cần làm">Lấy một sự cố đã đóng và nhờ tác nhân tìm nguyên nhân qua Sentry và Grafana.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Tác nhân AI giúp điều tra sự cố thế nào?">Nó gom lỗi từ Sentry, chỉ số từ Grafana và thời điểm sự kiện vào một bản nháp, còn con người kiểm tra giả thuyết và quyết định cần làm gì.</q>
    <q t="Làm sao kết nối Sentry và Grafana với tác nhân?">Qua MCP bằng một lệnh, với quyền chỉ đọc.</q>
    <q t="Có thể tin kết luận của tác nhân không?">Trùng khớp về thời gian cho ra một giả thuyết và không chứng minh nguyên nhân. Việc kiểm tra vẫn thuộc về con người.</q>
    <q t="Nên cấp cho tác nhân những quyền nào?">Riêng cho từng nguồn, chỉ đọc; những quyền rộng nhất vẫn đóng.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Tiếp theo">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="Cơ bản" t="MCP cho tác nhân AI: giải quyết vấn đề gì và cách giao việc kết nối cho tác nhân">MCP là gì và cách kết nối</item>
    <item href="/blog/analytics-reports-agent/" k="Tình huống khác" t="Báo cáo phân tích cùng tác nhân AI">Cơ sở dữ liệu, bảng tính và tài liệu qua MCP</item>
    <item href="/blog/mcp-scopes/" k="Thiết lập" t="Phạm vi MCP trong Claude Code: local, project và user — server nằm ở đâu và ai thấy nó">Server nằm ở đâu và ai thấy nó</item>
  </b-links>
</b-chapter>
<b-footer>Sự cố được bịa ra. Việc kết nối Sentry theo tài liệu Claude Code: <a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">MCP</a>, Grafana theo repository <a href="https://github.com/grafana/mcp-grafana" target="_blank" rel="noopener">grafana/mcp-grafana</a>.</b-footer>
</b-post>
