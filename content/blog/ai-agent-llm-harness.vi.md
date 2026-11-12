---
title: Tác nhân AI = LLM + harness: LLM, harness và tác nhân khác nhau thế nào và harness gồm những gì
date: 2026-10-12
updated: 2026-11-13
description: Tác nhân AI = LLM + harness. LLM, harness và tác nhân trong một bảng, năm nhóm thành phần của harness, và vì sao cùng một mô hình lại hành xử khác nhau trong chat và trong Claude Code.
tags: AI, tác nhân, tác nhân AI, LLM, harness, agent harness, harness engineering
category: harness
layout: wide
mentions: AI agent, LLM, agent harness, harness engineering, agent loop, MCP, Claude Code, Codex, ChatGPT
toc: formula=Tác nhân = LLM + harness | concepts=Năm khái niệm | table=LLM, harness và tác nhân | parts=Harness gồm những gì | same=Cùng một mô hình | example=Ví dụ | loop=Cách hoạt động | when=Nên chọn gì | faq=FAQ | next=Đọc tiếp
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
<b-chapter id="concepts" icon="table-cols" title="Năm khái niệm trong một bảng">
<b-why align="left">Các cột so sánh rõ nhất ở hàng “Ai điều khiển tác vụ”. Định nghĩa trợ lý và tác nhân theo <a href="https://www.ibm.com/think/topics/ai-agents-vs-ai-assistants" target="_blank" rel="noopener">IBM</a>: trợ lý mang tính phản ứng và thực hiện tác vụ theo yêu cầu của bạn, còn tác nhân chủ yếu chủ động, tự lập kế hoạch và hành động để đạt mục tiêu.</b-why>
<b-table>
<table><thead><tr><th></th><th>LLM</th><th>Chat</th><th>Chatbot</th><th>Trợ lý</th><th>Tác nhân AI</th></tr></thead><tbody><tr><td>Dùng để</td><td>động cơ bên trong sản phẩm</td><td>mọi câu hỏi và văn bản</td><td>các câu hỏi điển hình của một công ty</td><td>việc vặt của bạn trong ứng dụng</td><td>đưa tác vụ tới kết quả</td></tr><tr><td>Ai điều khiển tác vụ</td><td>—</td><td>bạn</td><td>một kịch bản</td><td>bạn, từng lệnh một</td><td><b>chính tác nhân</b></td></tr><tr><td>Hiểu lời nói tự do</td><td><b-tag-inline kind="ok">có</b-tag-inline></td><td><b-tag-inline kind="ok">có</b-tag-inline></td><td><b-tag-inline kind="muted">một phần</b-tag-inline></td><td><b-tag-inline kind="ok">có</b-tag-inline></td><td><b-tag-inline kind="ok">có</b-tag-inline></td></tr><tr><td>Hành động trong ứng dụng</td><td><b-tag-inline kind="no">không</b-tag-inline></td><td><b-tag-inline kind="muted">một phần</b-tag-inline></td><td><b-tag-inline kind="muted">một phần</b-tag-inline></td><td><b-tag-inline kind="ok">có</b-tag-inline></td><td><b-tag-inline kind="ok">có</b-tag-inline></td></tr><tr><td>Tự chọn bước và tự kiểm tra</td><td><b-tag-inline kind="no">không</b-tag-inline></td><td><b-tag-inline kind="no">không</b-tag-inline></td><td><b-tag-inline kind="no">không</b-tag-inline></td><td><b-tag-inline kind="no">không</b-tag-inline></td><td><b-tag-inline kind="ok">có</b-tag-inline></td></tr><tr><td>Do ai làm ra</td><td>các nhà cung cấp mô hình</td><td>nhà cung cấp, thường cùng với mô hình, và các bộ tổng hợp</td><td>công cụ no-code cho doanh nghiệp</td><td>các nền tảng: hệ điều hành, văn phòng, tìm kiếm</td><td>các tác nhân công nghiệp cho công việc</td></tr><tr><td>Ví dụ</td><td><a href="/materials/glossary/openai/">GPT</a>, <a href="/materials/glossary/anthropic/">Claude</a>, <a href="/materials/glossary/deepseek/">DeepSeek</a></td><td><a href="/materials/glossary/openai/">ChatGPT</a>, <a href="/materials/glossary/anthropic/">Claude</a>; bộ tổng hợp: <a href="https://poe.com/" target="_blank" rel="noopener">Poe</a>, <a href="https://openrouter.ai/" target="_blank" rel="noopener">OpenRouter</a></td><td><a href="https://vivochat.ai/" target="_blank" rel="noopener">vivochat.ai</a>, bot hỗ trợ của ngân hàng</td><td><a href="/materials/glossary/yandex/">Alice</a>, <a href="/materials/glossary/microsoft/">Copilot</a></td><td><a href="/materials/glossary/claude-code/">Claude Code</a>, <a href="/materials/glossary/codex/">Codex</a>, <a href="/materials/glossary/cursor/">Cursor</a></td></tr></tbody></table>
</b-table>
<b-why align="left" top="10"><b>Chatbot và trợ lý.</b> Chatbot trả lời thay mặt một công ty theo kịch bản: nút bấm, từ khóa, chuyển cho nhân viên. Một số bot chạy trên LLM nhưng giới hạn vẫn như cũ. Trợ lý hiểu mọi yêu cầu và thực hiện trong ứng dụng của bạn: một email, một lời nhắc, một lượt tìm kiếm. Mỗi bước tiếp theo là một lệnh mới từ bạn.</b-why>
<b-why align="left" top="6"><b>Tác nhân hiện nay mang tính công nghiệp:</b> cho code, dữ liệu, hỗ trợ khách hàng. Tác nhân đám mây đại chúng “cho tất cả mọi người” thì chưa có. Quan sát từ các dự án của tác giả.</b-why>
<b-finding>
  <ex>Bot ngân hàng trả lời về phí. Alice đặt lời nhắc theo lệnh. Tác nhân nhận mục tiêu “chuẩn bị bản phát hành” và tự quyết định đọc gì, chạy gì và khi nào dừng.</ex>
  <gen>Chatbot đi theo kịch bản của công ty, trợ lý đi theo lệnh của bạn, tác nhân tự điều khiển mình. Mô hình bên trong có thể là cùng một cái.</gen>
  <do>Hãy hỏi về một sản phẩm: ai chọn bước tiếp theo? Kịch bản thì là bot, bạn thì là trợ lý hoặc chat, chính sản phẩm thì là tác nhân.</do>
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
<b-chapter id="example" icon="arrow-right" title="Ví dụ: mỗi bên thấy gì của dự án">
<b-why align="left">Một tác vụ, “sửa test đang lỗi”, và năm chương trình. Dải bên dưới các phần của dự án cho thấy mỗi bên nhìn thấy gì. Cái không thấy thì nó đoán hoặc trả lại cho bạn.</b-why>
<b-lane-art names="ai-agent-llm-harness/example"/>
<b-sublabel top="18">Vì sao LLM sai mà không biết</b-sublabel>
<b-arrow-rows>
  <row t="Nó thấy gì" color="muted">chỉ văn bản của bạn: không có code, không có test, không có lỗi</row>
  <row t="Nó làm gì" color="warn">điền các phần còn thiếu một cách hợp lý: bịa ra tệp, hàm, thư viện</row>
  <row t="1 trên 5" color="warn">tên thư viện trong code do LLM viết không tồn tại: 19,7% trên 576.000 mẫu code từ 16 mô hình (<a href="https://arxiv.org/abs/2406.10279" target="_blank" rel="noopener">Spracklen et al.</a>)</row>
  <row t="0–7% so với 31%" color="accent">tác vụ thực được giải: mô hình chạy một lượt, dù có đúng các tệp, so với tác nhân có vòng lặp “chạy, kiểm tra” (<a href="https://arxiv.org/abs/2602.16069" target="_blank" rel="noopener">Raju et al., 2026</a>)</row>
</b-arrow-rows>
<b-finding>
  <ex>Tác nhân tự chạy cả vòng “chạy, đọc, sửa, kiểm tra”. Những bên còn lại giao các bước đó cho bạn.</ex>
  <gen>Tác vụ cần càng nhiều bước trong hệ thống của bạn thì tác nhân càng có lợi. Với một câu trả lời cho một câu hỏi thì chat nhanh hơn và rẻ hơn.</gen>
  <do>Đếm xem trong một tác vụ điển hình bạn sao chép giữa các cửa sổ bao nhiêu lần. Hơn hai lần thì hãy thử tác nhân.</do>
</b-finding>
</b-chapter>
<b-chapter id="loop" icon="swap-hm" title="Tác nhân AI hoạt động thế nào: vòng lặp tới kết quả">
<b-why align="left">Tác nhân AI hoạt động thế nào? Nó chạy theo <a href="/materials/glossary/agent-loop/">vòng lặp của tác nhân</a>: mô hình chọn bước tiếp theo, harness thực hiện bước đó bằng một công cụ và trả kết quả về cho mô hình. Vòng lặp lặp lại cho tới khi tác vụ được giải quyết hoặc cần đến con người. Sơ đồ “suy luận, hành động, quan sát” này được mô tả trong bài báo ReAct; các tác nhân lập trình như Claude Code, Codex và Cursor hoạt động theo cách tương tự.</b-why>
<b-arrow-rows>
  <row t="1 · Suy nghĩ" color="muted">mô hình đọc tác vụ, ngữ cảnh và các kết quả trước đó, rồi chọn một bước</row>
  <row t="2 · Gọi công cụ" color="accent">harness chạy một lệnh, đọc một tệp, gọi một dịch vụ</row>
  <row t="3 · Xem kết quả" color="accent">đầu ra của lệnh, nội dung lỗi hoặc phản hồi của dịch vụ quay về mô hình</row>
  <row t="4 · Quyết định" color="warn">xong thì thoát; có lỗi thì quay lại bước 1; bước rủi ro thì hỏi con người</row>
</b-arrow-rows>
<b-lane-art names="term:agent-loop"/>
<b-finding>
  <ex>Một test lỗi: tác nhân đọc lỗi và sửa lại mà không cần lệnh từ bạn.</ex>
  <gen>Vòng lặp không có kiểm tra biến thành một chuỗi đoán mò. Vì vậy test, linter và việc con người duyệt các bước rủi ro thuộc về harness.</gen>
  <do>Hãy cho tác nhân cách tự kiểm tra: một lệnh test, một tiêu chí hoàn thành, quyền truy cập log.</do>
</b-finding>
</b-chapter>
<b-chapter id="when" icon="shield-check" title="Khi nào chat là đủ và khi nào cần tác nhân">
<b-lane-art names="ai-agent-llm-harness/choose"/>
<b-table>
<table><thead><tr><th>Tác vụ</th><th>Nên chọn gì</th><th>Ví dụ trong blog</th></tr></thead><tbody><tr><td>Một câu hỏi, một lời giải thích, một bản nháp email</td><td>chat</td><td><a href="/blog/work-prompts-examples/">Prompt cho các tác vụ công việc</a></td></tr><tr><td>Các câu hỏi điển hình của khách hàng theo kịch bản</td><td>chatbot</td><td>—</td></tr><tr><td>Một hành động trong ứng dụng bằng giọng nói hoặc lệnh</td><td>trợ lý</td><td>—</td></tr><tr><td>Tác vụ nhiều bước trong code, tệp, dịch vụ</td><td>tác nhân AI</td><td><a href="/blog/incident-investigation-agent/">Điều tra sự cố bằng tác nhân AI</a><br><a href="/blog/bug-report-to-reproduction-agent/">Công việc QA sau bộ phận hỗ trợ với tác nhân AI</a><br><a href="/blog/analytics-reports-agent/">Báo cáo phân tích bằng tác nhân AI</a></td></tr><tr><td>Các bước liên quan đến tiền, quyền truy cập, xuất bản</td><td>tác nhân + con người duyệt</td><td><a href="/blog/agent-hands-work-back-to-you/#human">Tác nhân AI có cướp việc của bạn không</a><br><a href="/blog/data-plane-control-plane-prompt-injection/">Data plane và control plane của tác nhân</a></td></tr></tbody></table>
</b-table>
<b-finding>
  <ex>Một email gửi khách hàng là việc của chat. Tìm một tác vụ trong Jira, sửa code và mở merge request là việc của tác nhân.</ex>
  <gen>Với câu hỏi đơn giản, tác nhân chậm hơn và tốn hơn: nó đọc ngữ cảnh và thực hiện các bước. Với tác vụ nhiều bước, nó tiết kiệm sức tay của bạn.</gen>
  <do>Chọn một tác vụ nhiều bước trong tuần và giao trọn cho tác nhân.</do>
</b-finding>
</b-chapter>
<b-chapter id="faq" icon="check-circle" title="FAQ">
<b-faq-cards>
  <q t="Tác nhân AI khác trợ lý thế nào?">Trợ lý thực hiện yêu cầu của bạn qua các chức năng có sẵn: mỗi lần một hành động. Tác nhân nhận một mục tiêu, tự lập các bước, chọn công cụ và kiểm tra kết quả.</q>
  <q t="Tác nhân AI khác chatbot thế nào?">Chatbot trả lời theo kịch bản hoặc từ một kho câu trả lời. Tác nhân hành động trong các hệ thống của bạn và kiểm tra kết quả.</q>
  <q t="Tác nhân AI khác LLM thế nào?">LLM sinh văn bản. Tác nhân AI là LLM nằm trong một harness biến văn bản đó thành hành động và kiểm tra kết quả.</q>
  <q t="Agent harness là gì?">Toàn bộ code và cấu hình xung quanh mô hình mà không phải là mô hình: vòng lặp, công cụ, ngữ cảnh, quy tắc, quyền và các phép kiểm tra.</q>
  <q t="Harness khác framework thế nào?">Framework cung cấp các khối xây dựng để viết một tác nhân. Harness là lớp đang chạy thực thi vòng lặp và kiểm soát nó.</q>
  <q t="Tác nhân AI hoạt động thế nào?">Theo một vòng lặp: mô hình chọn một bước, harness thực hiện, kết quả quay về mô hình. Vòng lặp chạy cho tới khi tác vụ được giải quyết hoặc cần đến con người.</q>
  <q t="ChatGPT có phải là tác nhân không?">Ở chế độ chat thông thường nó là một ứng dụng chat. Ở chế độ tác nhân và trong Codex, cùng mô hình đó có harness hành động, điều này khiến nó trở thành tác nhân.</q>
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