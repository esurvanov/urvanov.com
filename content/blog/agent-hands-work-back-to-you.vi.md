---
title: Tác nhân AI có cướp việc của bạn không: tùy ai đẩy việc cho ai — bạn cho tác nhân hay tác nhân cho bạn
date: 2026-10-05
updated: 2026-11-08
description: Tác nhân AI có cướp việc của bạn không? Trên thực tế nó thường nhờ người chạy một lệnh, tìm một tác vụ hay sao chép một tệp. Tác nhân tự làm gì, phần nào ở lại với bạn và làm sao để thôi làm người chạy việc giữa các cửa sổ.
tags: AI, tác nhân, việc làm, sự nghiệp, tương lai công việc, giao việc, MCP, harness
category: harness
layout: wide
mentions: AI replacing jobs, will AI take my job, AI agent, future of work, delegation, MCP, Claude Code, CLAUDE.md, harness, human-in-the-loop
toc: what=Có cướp việc không | phrases=Câu báo hiệu | lazy=Vì sao chần chừ | hard=Độ khó thật | fix=Cách bỏ thói quen | human=Phần ở lại với bạn | faq=FAQ | next=Đọc tiếp
---

Tác nhân AI (AI agent) có cướp việc của bạn không? Nó nhận phần việc lặp lại và đẩy một phần việc ngược về cho bạn: nhờ bạn chạy lệnh, tìm tác vụ, sao chép tệp. Phần dưới nói về những gì tác nhân tự làm, cách nhận ra các lời nhờ như vậy, nên đáp lại thế nào, cách viết một quy tắc và phần nào thật sự ở lại với con người. Bài liên quan: [MCP cho tác nhân AI](/blog/mcp-agent-access/).

<b-post series="harness">
<b-chapter id="what" icon="swap-hm" title="Tác nhân có cướp việc của bạn không">
<b-why align="left">Tác nhân nhận phần việc lặp lại và đẩy một phần ngược về cho bạn: nó nhờ bạn chạy, tìm và sao chép những thứ nó tự làm được.</b-why>
<b-lane title="Ai làm việc" color="accent">
<b-scene names="agent-hands-work-back-to-you/before-after"/>
</b-lane>
<b-finding>
  <ex>Tác nhân viết: “Hãy chạy lệnh và gửi tôi kết quả”. Nó có thể tự chạy và tự đọc kết quả.</ex>
  <gen>Việc lặp lại chuyển cho tác nhân, còn quyết định và trách nhiệm ở lại với con người. Theo kinh nghiệm thực tế, tác nhân cũng hay chọn con đường để người làm thay, và mỗi lời nhờ như vậy lại đẩy bạn về vai người chạy việc giữa các cửa sổ.</gen>
  <do k="Việc cần làm">Giao việc lặp lại cho tác nhân và giữ lại các quyết định. Thấy lời nhờ “bạn tự làm đi”? Hãy đáp: “Bạn tự làm đi”.</do>
</b-finding>
</b-chapter>
<b-chapter id="phrases" icon="check-circle" title="Câu báo hiệu">
<b-why align="left">Hai lời nhờ của tác nhân và câu đáp “bạn tự làm đi”. Tác nhân xử lý được cả hai.</b-why>
<b-agent-term app="Claude&#8203; Code" ver="v2.1" model="Sonnet 5.5 · Claude Max" path="~/projects/shop">
  <line kind="ask">Sửa bài kiểm thử đang lỗi</line>
  <line kind="req" note="tác nhân nhờ bạn">Hãy chạy `npm test` và gửi tôi kết quả.</line>
  <line kind="you" note="bạn: tự làm đi">Bạn tự chạy và đọc kết quả đi.</line>
  <line kind="act">Bash(npm test)</line>
  <line kind="out">2 failed: auth.test.ts</line>
  <line kind="act">Đã thấy nguyên nhân trong auth.ts, đang sửa.</line>
  <line kind="ask">Tác vụ PAY-142 có gì?</line>
  <line kind="req" note="tác nhân nhờ bạn">Hãy mở Ji&#8203;ra và tìm tác vụ đó.</line>
  <line kind="you" note="bạn: tự làm đi">Bạn tự tìm qua M&#8203;CP đi.</line>
  <line kind="act">jira.get_issue(PAY-142)</line>
  <line kind="out">các bước, bình luận, lịch sử</line>
  <line kind="act">Đã đọc. Các bước là: …</line>
</b-agent-term>
<b-finding>
  <ex>Tác nhân nhờ mở Jira. Bạn đáp “Tự tìm qua MCP đi” và nhận được toàn bộ tác vụ.</ex>
  <gen>Đằng sau mỗi câu là một hành động mà tác nhân tự làm được nếu có quyền truy cập.</gen>
  <do k="Việc cần làm">Ghi ra ba câu bạn nghe nhiều nhất và một câu đáp cho mỗi câu.</do>
</b-finding>
</b-chapter>
<b-chapter id="lazy" icon="clock" title="Vì sao tác nhân chần chừ">
<b-why align="left">Tác nhân ước lượng công sức từ trước. Theo kinh nghiệm thực tế, nó hay kết luận “việc này dài và khó”, nhất là với các tích hợp. Có khi nó đúng, có khi không.</b-why>
<b-embed-frame src="/embed/estimate-check.html?v=27&lang=en" title="Ba màn: tác nhân nghĩ thế nào, bạn nghĩ thế nào và thực tế ra sao. Cảnh 3D và đồ thị chạy đồng bộ" ratio="4/4"/>
<b-finding>
  <ex>Tác nhân: “Tích hợp Jira sẽ mất nhiều thời gian”. Bạn: “Đọc thử một tác vụ đi”. Một phút sau tác vụ đã được đọc.</ex>
  <gen>Ước lượng của tác nhân chỉ là phỏng đoán cho đến khi thử mới biết. Một số ước lượng đúng: không có quyền truy cập, cần đăng nhập, mạng đóng.</gen>
  <do k="Việc cần làm">Luôn để nó thử trước. Sau 2–3 lần thử vẫn không ra kết quả: bảo nó chia tác vụ thành các bước và nêu chỗ có thể gặp vấn đề. Hỏi tác nhân vì sao việc không chạy.</do>
</b-finding>
</b-chapter>
<b-chapter id="hard" icon="cube" title="Độ phức tạp thật nằm ở đâu">
<b-why align="left">Có thể dựa vào <a href="/materials/glossary/osi/">mô hình OSI</a>: một yêu cầu đi qua bảy tầng, và các tầng có thể nằm trên những hệ thống vật lý khác nhau. Độ phức tạp là thật khi có nhiều tầng và nhiều hệ thống hơn, và khi liên quan đến vài <a href="/materials/glossary/bounded-context/">bounded context</a>, nhất là khi có một cái không nằm trong tầm kiểm soát. Đây là theo kinh nghiệm thực tế.</b-why>
<b-why align="left" top="14">Độ phức tạp đến từ khối lượng việc phải khảo sát. Dịch vụ của chính mình thì mở: mã và kiểm thử ở ngay đó, chỉ cần đọc. Hệ thống của người khác là hộp đen: chỉ có thể biết nó chạy ra sao bằng cách thăm dò từ bên ngoài.</b-why>
<b-lane title="Mấu chốt: các hộp đen cần khảo sát bao nhiêu" color="warn" top="12">
<b-scene names="agent-hands-work-back-to-you/research-volume"/>
</b-lane>
<b-why align="left" top="14">Hãy xem một ví dụ: hai tác vụ trong cùng một dự án.</b-why>
<b-view-switch id="vt-hard">
  <view label="Đơn giản"><b-lane title="Có cần thay đổi không" color="accent">
<b-scene names="agent-hands-work-back-to-you/whose-changes"/>
</b-lane>
<b-why align="left" top="10">Chỉ có một câu hỏi: có cần thay đổi ở phía người khác không. Ví dụ, đổi mức giảm giá giữa hai dịch vụ của chính mình: tất cả nằm trong phạm vi của mình, không cần thay đổi gì ở ngoài, tác nhân làm được. Nhưng khi lấy tồn kho từ hệ thống kho của nhóm khác, nhóm đó phải thay đổi, và đó không còn là việc của tác nhân.</b-why></view>
  <view label="Chi tiết"><b-lane title="A · giảm giá: hai dịch vụ của mình" color="accent">
<b-scene names="agent-hands-work-back-to-you/layers-discount"/>
</b-lane>
<b-why align="left" top="16">Mức giảm giá đi qua một tầng và nằm trong phạm vi của mình. Tồn kho từ kho đi qua các tầng của phía bên kia, và mỗi tầng cần một lần thăm dò mù.</b-why>
<b-lane title="B · tồn kho từ kho: đường đi qua ba tầng" color="warn" top="16">
<b-scene names="agent-hands-work-back-to-you/layers-warehouse"/>
</b-lane></view>
</b-view-switch>
<b-finding>
  <ex>Giảm giá giữa các dịch vụ của mình: mọi thứ đều của mình, tác nhân làm được. Tồn kho từ kho: nhóm kho phải thay đổi (quyền truy cập, cổng), nên tác nhân nói đúng khi bảo việc này mất nhiều thời gian.</ex>
  <gen>Mấu chốt là phải khảo sát bao nhiêu điều chưa biết. Hộp đen không mở ra được, chỉ kiểm tra bằng thăm dò từ bên ngoài, và mỗi tầng, mỗi hệ thống của người khác lại thêm những lần thăm dò như vậy.</gen>
  <do k="Việc cần làm">Ước lượng phía trước có bao nhiêu lần thăm dò mù. Nhiều: chia tác vụ theo ranh giới giữa các hệ thống và nhờ tác nhân kiểm tra từng phần một.</do>
</b-finding>
</b-chapter>
<b-chapter id="fix" icon="arrow-right" title="Cách bỏ thói quen">
<b-why align="left">Điểm neo là “bible” của dự án: mô tả cố định về sản phẩm và các quy tắc mà tác nhân đọc ở mỗi phiên. Ba mức: quyền truy cập, ghi chú trong bible, lời nhắc. <a href="https://code.claude.com/docs/en/memory" target="_blank" rel="noopener">Chi tiết</a></b-why>
<b-lane-art names="agent-hands-work-back-to-you/project-bible" top="10"/>
<b-step-chain>
  <node t="1">Cấp quyền truy cập</node>
  <node t="2">Ghi vào bible</node>
  <node t="3">Nhắc bằng một câu</node>
</b-step-chain>
<b-section-h3 top="14">Nên ghi gì vào bible</b-section-h3>
<b-arrow-rows wide>
  <row t="Tác nhân ước lượng thay vì làm" color="accent">Thử trước, ước lượng sau khi thử</row>
  <row t="Thử 2–3 lần không được" color="warn">Chia tác vụ thành các bước, nêu chỗ có thể gặp vấn đề và giải thích vì sao không chạy</row>
  <row t="Hệ thống của người khác: hộp đen" color="muted">Tìm hiểu bằng thăm dò từ bên ngoài và ghi kết quả vào bible để không phải tìm lại</row>
  <row t="Cần đăng nhập, bí mật, xác nhận, thanh toán" color="accent">Con người làm phần đó, phần còn lại do tác nhân</row>
</b-arrow-rows>
<b-section-h3 top="14">Quy tắc trong bible của dự án</b-section-h3>
<b-code-text wrap>
  Thử trước, ước lượng sau khi thử.
  Nếu thử 2–3 lần không được: chia tác vụ thành các bước, nêu chỗ có thể gặp vấn đề và giải thích vì sao không chạy.
  Tìm hiểu hệ thống của người khác bằng thăm dò từ bên ngoài và ghi kết quả vào đây.
  Nếu tự làm được thì tự làm. Chỉ nhờ người những việc cần đến người: đăng nhập, mật khẩu, xác nhận thao tác ghi, thanh toán.
</b-code-text>
<b-why align="left">Bible nằm trong các tệp <a href="/materials/glossary/claude-md/">CLAUDE.md</a> và <a href="/materials/glossary/agents-md/">AGENTS.md</a>: tác nhân đọc chúng ở mỗi phiên nhưng coi là ngữ cảnh chứ không phải rào chắn cứng. Quy tắc càng cụ thể và ngắn thì càng chạy đáng tin. Các quy trình lặp lại được đóng gói thành <a href="/materials/glossary/agent-skills/">skill</a>. Thêm về bible, quy tắc, đặc tả và skill: <a href="/blog/specs-rules-skills/">Đặc tả, bible, quy tắc và skill</a>.</b-why>
<b-finding>
  <ex>Tác nhân đã được kết nối với Jira và biết quy tắc. Thay vì “hãy mở Jira”, nó tự đọc tác vụ.</ex>
  <gen>Không có quyền truy cập thì quy tắc không giúp được gì: tác nhân không thể tự làm. Vì vậy kết nối trước, quy tắc sau.</gen>
  <do k="Việc cần làm">Kết nối nguồn mà tác nhân hay đẩy bạn tới nhất và ghi quy tắc vào bible của dự án.</do>
</b-finding>
</b-chapter>
<b-chapter id="human" icon="shield-check" title="Phần ở lại với bạn">
<b-lane title="Ranh giới" color="accent">
<b-scene names="agent-hands-work-back-to-you/split"/>
</b-lane>
<b-finding>
  <ex>Tác nhân tự đọc tác vụ và soạn bình luận, còn việc đăng bình luận lên Jira diễn ra sau khi bạn xác nhận.</ex>
  <gen>Phần ở lại với con người là nơi danh tính và trách nhiệm có ý nghĩa: đăng nhập, bí mật, xác nhận thao tác ghi, tiền.</gen>
  <do k="Việc cần làm">Ghi ranh giới vào quy tắc của dự án để tác nhân không hỏi quá nhiều và cũng không làm quá nhiều.</do>
</b-finding>
</b-chapter>
<b-chapter id="faq" icon="check-circle" title="FAQ">
<b-faq-cards>
  <q t="Tác nhân AI có thay thế chuyên gia không?">Tác nhân nhận các bước lặp lại. Quyết định, trách nhiệm và việc kiểm tra kết quả ở lại với con người.</q>
  <q t="Tác nhân tự làm những việc nào?">Đọc, tìm kiếm, sao chép, chạy lệnh và viết bản nháp, với điều kiện nó có quyền truy cập vào các hệ thống.</q>
  <q t="Tác nhân sẽ không làm gì nếu thiếu bạn?">Đăng nhập, nhập mật khẩu, xác nhận thao tác ghi, thanh toán. Phần đó ở lại với con người.</q>
  <q t="Vì sao tác nhân nhờ tôi làm việc nó tự làm được?">Theo kinh nghiệm thực tế, nó chọn con đường để người làm thay. Quyền truy cập vào các hệ thống và một quy tắc trong hướng dẫn của dự án sẽ giúp ích.</q>
  <q t="Làm việc với tác nhân thế nào để không thua thiệt về chuyên môn?">Giao việc lặp lại, giữ lại việc đặt đề bài và việc xem xét kết quả. Những bước đó ở lại với con người.</q>
</b-faq-cards>
</b-chapter>
<b-chapter id="next" icon="arrow-right" title="Đọc tiếp">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="MCP" t="MCP cho tác nhân AI">cách cấp quyền truy cập cho tác nhân</item>
    <item href="/blog/specs-rules-skills/" k="Quy tắc" t="Đặc tả, quy tắc và skill">nên đưa gì vào hướng dẫn</item>
    <item href="/blog/harness-driven-development/" k="Vòng lỗi" t="Harness-Driven Development">lỗi của tác nhân biến thành quy tắc như thế nào</item>
  </b-links>
</b-chapter>
</b-post>
