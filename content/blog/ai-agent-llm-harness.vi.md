---
title: Tác nhân AI = LLM + harness: LLM, harness và tác nhân khác nhau thế nào và harness gồm những gì
date: 2026-10-12
updated: 2026-11-08
description: Tác nhân AI = LLM + harness. LLM, harness và tác nhân trong một bảng, năm nhóm thành phần của harness, và vì sao cùng một mô hình lại hành xử khác nhau trong chat và trong Claude Code.
tags: AI, tác nhân, tác nhân AI, LLM, harness, agent harness, harness engineering
category: harness
layout: wide
mentions: AI agent, LLM, agent harness, harness engineering, agent loop, MCP, Claude Code, Codex, ChatGPT
toc: formula=Tác nhân = LLM + harness | table=LLM, harness và tác nhân | parts=Harness gồm những gì | same=Cùng một mô hình | faq=FAQ | next=Đọc tiếp
---

Tác nhân AI (AI agent) là LLM cộng với harness: LLM chỉ suy luận và viết văn bản, còn harness là mọi thứ xung quanh giúp nó hành động — vòng lặp các bước, công cụ, ngữ cảnh, quy tắc và các phép kiểm tra. Hợp lại, chúng đưa một tác vụ tới kết quả, còn LLM đứng một mình chỉ trả lời. Bên dưới: LLM, harness và tác nhân trong một bảng, năm nhóm thành phần của harness, và cùng một mô hình trong hai harness.

<b-post series="harness">
<b-chapter id="formula" icon="target-dot" title="Tác nhân = LLM + harness">
<b-why align="left">An <a href="/materials/glossary/llm/">LLM</a> chỉ viết tiếp văn bản. <a href="/materials/glossary/harness/">Harness</a> là mọi thứ xung quanh nó: vòng lặp các bước, công cụ, quyền truy cập tệp và dịch vụ, quy tắc và các phép kiểm tra. Hợp lại chúng tạo thành <a href="/materials/glossary/ai-agent/">tác nhân AI</a>.</b-why>
<b-lane-art names="ai-agent-llm-harness/formula"/>
<b-finding>
  <ex>Cùng một mô hình Claude vừa trả lời trong chat vừa sửa code trong Claude Code. Khác biệt là harness.</ex>
  <gen>Ứng dụng chat, trợ lý và tác nhân có thể chạy trên cùng các mô hình. Thứ phân biệt chúng là cái bao quanh mô hình.</gen>
  <do>Khi so sánh các sản phẩm AI, hãy so sánh harness: sản phẩm tự làm được gì và ở đâu.</do>
</b-finding>
</b-chapter>
<b-chapter id="table" icon="table-cols" title="LLM, harness và tác nhân">
<b-why align="left">Mỗi trong ba thứ có gì. Cột tác nhân là tổng của hai cột đầu.</b-why>
<b-table>
<table><thead><tr><th></th><th>LLM</th><th>Harness</th><th>Tác nhân AI</th></tr></thead><tbody><tr><td><a href="/materials/glossary/llm/">Mô hình</a> suy luận bằng văn bản</td><td><b-tag-inline kind="ok">có</b-tag-inline></td><td><b-tag-inline kind="no">không</b-tag-inline></td><td><b-tag-inline kind="ok">có</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/agent-loop/">Vòng lặp</a>: bước, hành động, quan sát</td><td><b-tag-inline kind="no">không</b-tag-inline></td><td><b-tag-inline kind="ok">có</b-tag-inline></td><td><b-tag-inline kind="ok">có</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/tool/">Công cụ</a> và <a href="/materials/glossary/mcp/">MCP</a></td><td><b-tag-inline kind="no">không</b-tag-inline></td><td><b-tag-inline kind="ok">có</b-tag-inline></td><td><b-tag-inline kind="ok">có</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/context/">Ngữ cảnh</a> và <a href="/materials/glossary/memory/">bộ nhớ</a></td><td><b-tag-inline kind="no">không</b-tag-inline></td><td><b-tag-inline kind="ok">có</b-tag-inline></td><td><b-tag-inline kind="ok">có</b-tag-inline></td></tr><tr><td>Quy tắc: <a href="/materials/glossary/claude-md/">CLAUDE.md</a>, <a href="/materials/glossary/agents-md/">AGENTS.md</a>, <a href="/materials/glossary/agent-skills/">skill</a></td><td><b-tag-inline kind="no">không</b-tag-inline></td><td><b-tag-inline kind="ok">có</b-tag-inline></td><td><b-tag-inline kind="ok">có</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/permissions/">Quyền</a>, <a href="/materials/glossary/sandbox/">sandbox</a>, <a href="/materials/glossary/hooks/">hook</a></td><td><b-tag-inline kind="no">không</b-tag-inline></td><td><b-tag-inline kind="ok">có</b-tag-inline></td><td><b-tag-inline kind="ok">có</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/checks/">Kiểm tra</a> và <a href="/materials/glossary/human-in-the-loop/">con người trong vòng lặp</a></td><td><b-tag-inline kind="no">không</b-tag-inline></td><td><b-tag-inline kind="ok">có</b-tag-inline></td><td><b-tag-inline kind="ok">có</b-tag-inline></td></tr><tr><td>Tự hành động</td><td><b-tag-inline kind="no">không</b-tag-inline></td><td><b-tag-inline kind="no">không</b-tag-inline></td><td><b-tag-inline kind="ok">có</b-tag-inline></td></tr></tbody></table>
</b-table>
<b-finding>
  <ex>Harness không có mô hình thì có công cụ nhưng không ai chọn giữa chúng. Mô hình không có harness thì chọn được nhưng không hành động được.</ex>
  <gen>Không nửa nào tự nó là tác nhân. Tác nhân = mô hình + harness đúng như một định nghĩa: bỏ một bên thì tác nhân biến mất.</gen>
  <do>Hãy gọi tên harness của tác nhân bạn dùng: vòng lặp, công cụ, quy tắc và các phép kiểm tra của nó nằm ở đâu.</do>
</b-finding>
</b-chapter>
<b-chapter id="parts" icon="cube" title="Harness gồm những gì: năm nhóm">
<b-arrow-rows>
  <row t="Vòng lặp" color="accent">vòng lặp của tác nhân, điều phối các tác nhân con</row>
  <row t="Tầm với" color="accent">công cụ, MCP server, sandbox, trình duyệt</row>
  <row t="Kiến thức" color="accent">ngữ cảnh, bộ nhớ, CLAUDE.md / AGENTS.md, skill</row>
  <row t="Kiểm soát" color="warn">quyền, hook, con người duyệt các bước rủi ro</row>
  <row t="Xác minh" color="warn">test, linter, log và truy vết</row>
</b-arrow-rows>
<b-finding>
  <ex>Claude Code: vòng lặp trong CLI, công cụ qua MCP, quy tắc trong CLAUDE.md, kiểm soát qua quyền và hook, xác minh qua test của bạn.</ex>
  <gen>Theo quan sát thực tế, phần lớn lỗi của tác nhân quy về một trong năm nhóm: thiếu công cụ, thiếu ngữ cảnh hoặc thiếu phép kiểm tra.</gen>
  <do>Khi tác nhân thất bại, hãy hỏi nhóm nào còn thiếu và sửa ở đó thay vì viết lại prompt.</do>
</b-finding>
</b-chapter>
<b-chapter id="same" icon="chart-line" title="Cùng mô hình, harness khác nhau">
<b-table>
<table><thead><tr><th>Mô hình</th><th>Harness chat</th><th>Harness của tác nhân</th></tr></thead><tbody><tr><td>Claude</td><td>Claude trong trình duyệt: hội thoại, không truy cập dự án</td><td>Claude Code: đọc repository, sửa tệp, chạy lệnh</td></tr><tr><td>GPT</td><td>ChatGPT: hội thoại, không truy cập dự án</td><td>Codex: làm việc trong repository, chạy test, mở pull request</td></tr></tbody></table>
</b-table>
<b-why align="left" top="10">Một nghiên cứu tại ICML 2026 cho thấy chọn harness tốt nhất cho mức cải thiện tương đương việc chọn mô hình tốt nhất. <a href="https://icml.cc/virtual/2026/68323" target="_blank" rel="noopener">Nguồn</a></b-why>
<b-finding>
  <ex>Chuyển từ chat sang Claude Code chỉ đổi harness, và tác vụ từ lời khuyên trở thành một thay đổi hoàn chỉnh.</ex>
  <gen>Chọn mô hình và chọn harness có sức nặng gần như nhau. Những nhóm chỉ so sánh mô hình bỏ lỡ một nửa kết quả.</gen>
  <do>Trước khi đổi mô hình, hãy thử một harness mạnh hơn trên mô hình bạn đang có.</do>
</b-finding>
</b-chapter>
<b-chapter id="faq" icon="check-circle" title="FAQ">
<b-faq-cards>
  <q t="Agent harness là gì?">Toàn bộ code và cấu hình xung quanh mô hình mà không phải là mô hình: vòng lặp, công cụ, ngữ cảnh, quy tắc, quyền và các phép kiểm tra.</q>
  <q t="Tác nhân AI khác LLM thế nào?">LLM sinh văn bản. Tác nhân AI là LLM nằm trong một harness biến văn bản đó thành hành động và kiểm tra kết quả.</q>
  <q t="Tác nhân AI khác chatbot thế nào?">Chatbot trả lời trong một kịch bản hoặc một cuộc hội thoại. Tác nhân hành động trong các hệ thống của bạn và tự quyết định bước tiếp theo.</q>
  <q t="ChatGPT có phải là tác nhân không?">Ở chế độ chat thông thường nó là một ứng dụng chat. Ở chế độ tác nhân và trong Codex, cùng mô hình đó có harness hành động, điều này khiến nó trở thành tác nhân.</q>
  <q t="Harness khác framework thế nào?">Framework cung cấp các khối xây dựng để viết một tác nhân. Harness là lớp đang chạy thực thi vòng lặp và kiểm soát nó.</q>
</b-faq-cards>
</b-chapter>
<b-chapter id="next" icon="arrow-right" title="Đọc tiếp">
  <b-links>
    <item href="/materials/glossary/harness/" k="Thuật ngữ" t="Harness">mọi thành phần, có liên kết</item>
    <item href="/blog/harness-driven-development/" k="Thực hành" t="Harness engineering">biến lỗi thành quy tắc</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Lựa chọn" t="Claude Code, Codex, Cursor">chọn tác nhân nào</item>
  </b-links>
</b-chapter>
</b-post>
