---
title: Cần bao nhiêu tác nhân AI: số tác nhân tăng theo số bounded context
date: 2026-10-10
updated: 2026-11-08
description: Một tác nhân cho mỗi bounded context: vì sao có bấy nhiêu tác nhân như ranh giới ý nghĩa, nó mở rộng thế nào, giữa các tác nhân có gì và nên bắt đầu từ đâu.
tags: AI, tác nhân, bounded context, DDD, kiến trúc, mở rộng, harness
category: harness
layout: wide
mentions: bounded context, multi-agent, AI agent, DDD, context map, contracts, scaling, harness
toc: idea=Tác nhân cho mỗi ngữ cảnh | scale=Mở rộng | borders=Giữa các tác nhân | first=Bắt đầu từ đâu | faq=Câu hỏi | next=Đọc tiếp
---

Cần bao nhiêu tác nhân AI (AI agent)? Bấy nhiêu tác nhân như số bounded context: mỗi ranh giới ý nghĩa có một tác nhân riêng. Bên dưới: vì sao, nó mở rộng thế nào, giữa các tác nhân có gì và nên bắt đầu từ đâu.

<b-post series="harness">

<b-chapter id="idea" icon="ring-dot" title="Một tác nhân cho mỗi ngữ cảnh">
  <b-why align="left">Có bấy nhiêu tác nhân như số [bounded context](/materials/glossary/bounded-context/). Nhờ vậy một [tác nhân](/materials/glossary/ai-agent/) có đủ ngữ cảnh.</b-why>
  <b-lane title="Một tác nhân cho tất cả hay mỗi ngữ cảnh một tác nhân" color="accent">
    <iso-art name="agents-per-bounded-context/one-vs-per-context"></iso-art>
  </b-lane>
  <b-finding>
    <ex>"Đơn hàng" có nghĩa khác nhau ở bán hàng, giao hàng và thanh toán. Một tác nhân trộn lẫn các nghĩa, ba tác nhân thì mỗi tác nhân giữ nghĩa riêng của mình.</ex>
    <gen>Ranh giới ngữ cảnh đã cho thấy nơi ý nghĩa thay đổi. Đó là chỗ tiện để cắt cả đặc tả lẫn công việc của các tác nhân.</gen>
    <do k="Việc cần làm">Liệt kê các ngữ cảnh của dự án và ghi cạnh mỗi ngữ cảnh ai làm việc trong ranh giới của nó.</do>
  </b-finding>
</b-chapter>

<b-chapter id="scale" icon="chart-axes" title="Mở rộng thế nào">
  <b-lane title="Tải và số tác nhân" color="accent">
    <iso-art name="agents-per-bounded-context/load-chart"></iso-art>
  </b-lane>
  <b-finding>
    <ex>Tám ngữ cảnh: một tác nhân chìm trong các ý nghĩa, còn tám tác nhân mỗi tác nhân làm việc trong ranh giới của mình.</ex>
    <gen>Số tác nhân tăng tuyến tính theo số ngữ cảnh trong khi tải của mỗi tác nhân giữ phẳng.</gen>
    <do k="Việc cần làm">Thêm một tác nhân cùng với ngữ cảnh mới thay vì làm ngữ cảnh của một tác nhân phình ra.</do>
  </b-finding>
</b-chapter>

<b-chapter id="borders" icon="boxes-link" title="Giữa các tác nhân có gì">
  <b-why align="left">Các tác nhân nói chuyện qua hợp đồng: sự kiện và API. Ngữ cảnh của người khác không nằm dưới quyền kiểm soát của bạn, nên tác nhân chỉ chạm tới nó qua hợp đồng và với sự xác nhận của bạn. Thêm về cách đánh giá độ phức tạp: [độ phức tạp thật nằm ở đâu](/blog/agent-hands-work-back-to-you/#hard).</b-why>
  <b-lane title="Bản đồ ngữ cảnh" color="accent">
    <iso-art name="agents-per-bounded-context/context-map"></iso-art>
  </b-lane>
  <b-finding>
    <ex>Tác nhân bán hàng đọc sự kiện "đơn hàng đã thanh toán" từ thanh toán và chỉ ghi vào hệ thống đối tác qua một hợp đồng đã được duyệt.</ex>
    <gen>Hợp đồng thay cho ngữ cảnh dùng chung: các tác nhân không cần biết bên trong ranh giới của người khác, và một sai sót không lan ra.</gen>
    <do k="Việc cần làm">Với mỗi liên kết giữa các ngữ cảnh, viết hợp đồng trong một dòng: nó đưa gì, nhận gì, ai sở hữu.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="shield-check" title="Bắt đầu từ đâu">
  <b-lane title="Bước đầu tiên" color="accent">
    <iso-art name="agents-per-bounded-context/start"></iso-art>
  </b-lane>
  <b-finding>
    <ex>Bắt đầu với hai ngữ cảnh liền kề và một hợp đồng giữa chúng.</ex>
    <gen>Một ngữ cảnh, một tác nhân, một hợp đồng: cách đó thử sơ đồ trước khi kéo nó ra toàn dự án.</gen>
    <do k="Việc cần làm">Chọn hai ngữ cảnh nơi các từ hay bị trộn lẫn nhất và khởi chạy một tác nhân cho mỗi ngữ cảnh.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Cần bao nhiêu tác nhân AI?">Bấy nhiêu như số bounded context: mỗi ranh giới ý nghĩa có một tác nhân riêng.</q>
    <q t="Việc này mở rộng thế nào?">Số tác nhân tăng tuyến tính theo số ngữ cảnh, trong khi tải trên mỗi tác nhân giữ đều.</q>
    <q t="Cái gì nối các tác nhân với nhau?">Một hợp đồng ở ranh giới: các tác nhân không cần biết bên trong ngữ cảnh khác, và một sai sót không lan ra.</q>
    <q t="Bắt đầu từ đâu?">Từ một ngữ cảnh, một tác nhân và một hợp đồng: cách đó thử cách thiết lập trước khi kéo nó ra toàn dự án.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" icon="arrow-right" title="Đọc tiếp">
  <b-links>
    <item href="/blog/specs-by-aggregates/" k="Đặc tả" t="Đặc tả theo aggregate">ranh giới ngữ cảnh trong đặc tả</item>
    <item href="/blog/agent-hands-work-back-to-you/" k="Tác nhân" t="Tác nhân có lấy mất việc của bạn không">độ phức tạp thật nằm ở đâu</item>
    <item href="/materials/glossary/bounded-context/" k="Thuật ngữ" t="Bounded context">là gì và để làm gì</item>
    <item href="/blog/agent-checkpoint/" k="Kiểm tra" t="Kiểm tra công việc của tác nhân AI ở đâu">ranh giới aggregate và kích thước ngữ cảnh</item>
  </b-links>
</b-chapter>
</b-post>
