---
title: Codex vs Claude Code, Cursor vs Hermes Agent: so sánh các tác nhân AI viết code
date: 2026-09-28
updated: 2026-11-08
description: Claude Code hay Codex, Cursor hay Hermes Agent: tác nhân chạy ở đâu, thấy gì, dùng mô hình nào và tốn bao nhiêu — năm harness đặt cạnh nhau và cách chọn theo tác vụ. Có liên kết tới tài liệu.
tags: AI, harness, Claude Code, Codex, Cursor, Hermes Agent, tác nhân AI
category: harness
layout: wide
toc: tasks=Chọn harness nào cho tác vụ nào | stable=Điều gì không đổi | harness=Harness là gì | compare=Chúng thấy và làm gì | faq=Câu hỏi | next=Đọc thêm
---

Codex và Claude Code gần như giống nhau về quyền truy cập dự án và các hành động, chỉ khác dòng mô hình (GPT cho Codex, Claude cho Claude Code) và gói đăng ký. Vì vậy hãy chọn cái mà mô hình và gói của nhóm bạn đã có. Cursor hợp nếu bạn làm việc trong trình soạn thảo và muốn dùng mô hình của nhiều hãng, Hermes Agent hợp nếu cần mô hình bất kỳ, kể cả mô hình chạy cục bộ. Bên dưới là sơ đồ, bảng và cách chọn theo tác vụ.

<b-post series="harness">
<b-tool-groups label="Các nhóm công cụ">
  <group k="tác nhân của hãng" kind="pair" chips="Claude Code|Codex" swap="gần như tương đương"></group>
  <group k="harness mã nguồn mở" kind="open" chips="Hermes Agent" alts="và các lựa chọn khác: OpenCode, Aider, Cline, Goose">Harness cùng loại với mô hình bất kỳ, qua API tính tiền theo token hoặc chạy cục bộ trên máy của bạn</group>
  <group k="trình soạn thảo code có AI" chip="Cursor">IDE xây quanh AI, mô hình của nhiều hãng</group>
  <group k="trợ lý AI trong trình duyệt" kind="chat" chip="ChatGPT, Claude">code chạy trong sandbox, không truy cập dự án</group>
</b-tool-groups>
<b-cap>Nhãn <b-drift sm>snapshot</b-drift> nghĩa là thông tin chính xác tính đến tháng 9 năm 2026 và có thể lỗi thời trong vòng một tuần.</b-cap>

<b-chapter id="tasks" icon="venn" title="Chọn harness nào cho tác vụ nào">
  <b-why>Việc chọn bắt đầu từ tác vụ. Hai vòng tròn là hai dòng mô hình, Claude và GPT: vị trí của sản phẩm trên bản đồ cho biết nó làm việc với những mô hình nào. Claude Code và Codex mỗi cái gắn với dòng mô hình riêng, Cursor và chat nằm ở phần giao nhau, còn Hermes Agent bao trọn Cursor và chat, giao một phần với Claude Code và Codex và vươn ra ngoài cả hai vòng, kết nối mô hình bất kỳ, kể cả mô hình cục bộ<b-proof href="https://hermes-agent.nousresearch.com/docs/integrations/providers" quote="Hermes Agent: local models via Ollama, llama.cpp, vLLM or LM Studio — “Ollama runs open-weight models locally with one command. Best for: quick local experimentation, privacy-sensitive work, offline use” — hermes-agent.nousresearch.com/docs/integrations/providers"/>.</b-why>
  <b-drift>ghi chú · snapshot tháng 9 năm 2026</b-drift>
  <b-venn name="ai-in-code-harness-and-tools/venn"/>
  <b-table>
  | Tác vụ | Nhóm |
  |---|---|
  | Một câu hỏi lẻ không cần repository | chat: ChatGPT hoặc Claude |
  | Sửa trong dự án đang mở, nhiều tệp | tác nhân trong trình soạn thảo |
  | Làm trọn tác vụ từ đầu đến cuối mà không cần theo từng bước | Claude Code hoặc Codex |
  | Làm việc trong một dự án ở trình soạn thảo quen thuộc với mô hình của nhiều hãng | Cursor |
  | Harness tự chọn trên mô hình bất kỳ, tính tiền theo token | Hermes Agent |
  | Prompt cho môi trường production qua API với đầu vào lớn | dữ liệu trong thẻ XML |
  </b-table>
  <b-sublabel top="22">Câu hỏi thường gặp</b-sublabel>
  <b-qa>
    <q t="Claude Code hay Codex">Hai công cụ giống nhau về quyền truy cập dự án và hành động, khác nhau ở mô hình (Claude và GPT) và ở một số tính năng riêng thay đổi theo từng bản phát hành. Lựa chọn do mô hình và gói mà nhóm đã có quyết định.</q>
    <q t="Cursor hay Claude Code">Cursor làm việc trong trình soạn thảo với dự án đang mở và cho chọn giữa mô hình của nhiều hãng. Claude Code nhận một tác vụ và làm từ đầu đến cuối trong terminal, nhưng chỉ với mô hình Claude.</q>
    <q t="Hermes Agent hay Claude Code">Hermes Agent là harness mã nguồn mở: nó kết nối mô hình bất kỳ, kể cả mô hình cục bộ, và bạn trả tiền theo token. Claude Code gắn với dòng Claude và gói đăng ký. Hãy chọn Hermes khi cần mô hình của nhiều hãng hoặc mô hình riêng.</q>
    <q t="Lựa chọn thay thế Claude Code">Trong những công cụ được nêu ở đây: Codex (cùng thiết kế, mô hình GPT), Cursor (trình soạn thảo, mô hình của nhiều hãng) và Hermes Agent. <a href="https://opencode.ai" target="_blank" rel="noopener">OpenCode</a>, <a href="https://aider.chat" target="_blank" rel="noopener">Aider</a>, <a href="https://cline.bot" target="_blank" rel="noopener">Cline</a> and <a href="https://goose-docs.ai" target="_blank" rel="noopener">Goose</a> có cách xây dựng tương tự.</q>
  </b-qa>
  <b-finding>
    <ex>Tác vụ đặt ra hai yêu cầu cho harness: có cần dự án hay không và dòng mô hình nào phù hợp. Tác nhân của hãng làm việc với một dòng, Cursor và chat cho chọn giữa Claude và GPT, còn harness mã nguồn mở nhận mô hình bất kỳ, kể cả mô hình cục bộ.</ex>
    <gen>Trước hết chọn nhóm theo tác vụ, rồi chọn sản phẩm trong nhóm. Claude Code và Codex khác nhau ở mô hình và ở một số tính năng harness thay đổi theo từng bản phát hành, nhưng về khái niệm chúng được xây dựng giống nhau. Vì vậy điều quyết định là mô hình và gói mà nhóm đã có.</gen>
    <do>Mô tả tác vụ trong một dòng và xác định ba điều kiện: có cần dự án không, có cần người ở mỗi bước không, và có cần mô hình của hãng khác hoặc mô hình cục bộ không. Chọn nhóm theo các điều kiện đó.</do>
  </b-finding>
</b-chapter>

<b-chapter id="stable" icon="lock" title="Điều gì không đổi">
  <b-why>Claude Code và Codex là các sản phẩm cạnh tranh có khả năng ngày càng gần nhau sau mỗi bản phát hành. Khoảng cách giữa chúng nhỏ, nên bài viết dựa vào những gì không đổi.</b-why>
  <b-two-lists>
    <list icon="lock" t="Ổn định" items="dòng mô hình|cách xây dựng harness|cách làm việc với tác nhân"></list>
    <list icon="refresh" t="Thay đổi mỗi tuần" warn items="tính năng và chế độ|cài đặt tự chủ mặc định|định vị|mô hình, gói và giới hạn"><b-proof href="https://code.claude.com/docs/en/changelog" quote="Claude Code: 8 releases from 17 to 25 September 2026, from 2.1.275 to 2.1.283 — code.claude.com/docs/en/changelog"/><b-proof href="https://learn.chatgpt.com/docs/changelog" quote="Codex: four CLI releases from 22 to 26 September 2026 and the new GPT-6 Sol and Luna models — learn.chatgpt.com/docs/changelog"/></list>
  </b-two-lists>
  <b-finding>
    <ex>Tám bản phát hành Claude Code ra mắt từ 17 đến 25 tháng 9; bốn bản phát hành Codex và các mô hình GPT-6 mới ra mắt từ 22 đến 26 tháng 9.</ex>
    <gen>Bảng so sánh tính năng của Claude Code và Codex lỗi thời nhanh hơn mức ai đó kịp tiếp thu. Ba thứ vẫn ổn định: dòng mô hình, cách xây dựng harness và cách làm việc với tác nhân.</gen>
    <do>Khi chọn giữa Claude Code và Codex, hãy dựa vào mô hình và gói mà nhóm đã có.</do>
  </b-finding>
</b-chapter>

<b-chapter id="harness" icon="layers" title="Harness là gì">
  <b-why>Mô hình trả lời bằng văn bản. Harness là mọi thứ xung quanh nó: skill, công cụ, môi trường, con người trong vòng lặp. Sản phẩm AI nào cũng có harness, từ tác nhân trong terminal đến chat trong trình duyệt<b-proof href="https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code" quote="Anthropic calls Claude Code a harness: the post “A harness for every task” — claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code"/>. Chỗ khác nhau là thành phần. Cột “Qua API” lấy Hermes Agent làm ví dụ; có nhiều harness mã nguồn mở, như OpenCode, Aider, Cline và Goose, và chúng được xây dựng giống nhau.</b-why>
  <b-drift>snapshot · tháng 9 năm 2026</b-drift>
  <b-harness-matrix label="Các lớp của harness theo cột" diff="khác bản enterprise" legend="khác bản enterprise|có|một phần">
    <col icon="code-wide" t="Qua API">Hermes Agent · API công khai</col>
    <col icon="laptop" t="Enterprise">Claude Code · Codex · API riêng</col>
    <col icon="cloud" t="Đám mây">Claude Code · Codex</col>
    <col icon="chat-box" t="Chat">ChatGPT · Claude</col>
    <row t="Con người"/>
    <row t="Môi trường"/>
    <row t="Công cụ"/>
    <row t="Skill"/>
    <row t="Mô hình"/>
    <cell icon="user-alt" t="đi cùng / ở cuối"><b-proof href="https://hermes-agent.nousresearch.com/docs/user-guide/security" quote="Hermes Agent: for dangerous commands “the user must explicitly approve it”; sessions without a human use unattended_mode — hermes-agent.nousresearch.com/docs/user-guide/security"/></cell>
    <cell icon="user-alt" t="đi cùng / ở cuối"><b-proof href="https://code.claude.com/docs/en/permission-modes" quote="Claude Code: “In Manual mode, Claude Code stops and asks you before most actions… In auto mode, a second model, the classifier, reviews actions instead of you” — code.claude.com/docs/en/permission-modes"/><b-proof href="https://learn.chatgpt.com/docs/sandboxing" quote="Codex: “The agent works inside the sandbox by default and asks when it needs to go beyond that boundary” — learn.chatgpt.com/docs/sandboxing"/></cell>
    <cell icon="user-alt" t="đi cùng / ở cuối"><b-proof href="https://code.claude.com/docs/en/claude-code-on-the-web" quote="Claude Code: “You pick a cloud session's permission mode from the mode dropdown, both when you create the task and while the session runs” — code.claude.com/docs/en/claude-code-on-the-web"/><b-proof href="https://learn.chatgpt.com/docs/cloud" quote="Codex: “Give longer tasks dedicated environments and let them continue while you work on something else” — learn.chatgpt.com/docs/cloud"/></cell>
    <cell icon="user-alt" t="mỗi bước" diff></cell>
    <cell icon="rows" t="máy của bạn"><b-proof href="https://hermes-agent.nousresearch.com/docs/user-guide/security" quote="Hermes Agent: the default backend is “local — runs on host”, commands run on your computer — hermes-agent.nousresearch.com/docs/user-guide/security"/></cell>
    <cell icon="rows" t="máy của bạn"><b-proof href="https://code.claude.com/docs/en/overview" quote="Claude Code: “Desktop scheduled tasks run on your computer, with direct access to your local files and tools” — code.claude.com/docs/en/overview"/><b-proof href="https://learn.chatgpt.com/docs/codex/cli" quote="Codex: “Codex can inspect files, make edits, and run the tools already installed on your computer” — learn.chatgpt.com/docs/codex/cli"/></cell>
    <cell icon="cloud" t="VM của hãng" diff part><b-proof href="https://code.claude.com/docs/en/claude-code-on-the-web" quote="Claude Code: “Isolated virtual machines: each session runs in an isolated, Anthropic-managed VM” — code.claude.com/docs/en/claude-code-on-the-web"/><b-proof href="https://learn.chatgpt.com/docs/cloud" quote="Codex: “Run tasks in isolated cloud environments, work in parallel, and start work from the web, GitHub, GitLab, Linear, or Slack” — learn.chatgpt.com/docs/cloud"/></cell>
    <cell icon="rows" t="sandbox" diff part><b-proof href="https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude" quote="Claude: “When Claude executes code or creates files, it operates within an isolated, sandboxed container” — support.claude.com/en/articles/12111783"/><b-proof href="https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt" quote="ChatGPT: for data analysis it writes and runs Python in an isolated environment with no external requests. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/8437071"/></cell>
    <cell icon="terminal-alt"><b-proof href="https://hermes-agent.nousresearch.com/docs/user-guide/features/overview" quote="Hermes Agent: built-in tools — “web search, terminal execution, file editing, memory, delegation” — hermes-agent.nousresearch.com/docs/user-guide/features/overview"/></cell>
    <cell icon="terminal-alt"><b-proof href="https://code.claude.com/docs/en/overview" quote="Claude Code: “reads your codebase, edits files, runs commands, and integrates with your development tools” — code.claude.com/docs/en/overview"/><b-proof href="https://learn.chatgpt.com/docs/codex/cli" quote="Codex: “Inspect code, make changes, run commands, and automate repeatable work without leaving your terminal” — learn.chatgpt.com/docs/codex/cli"/></cell>
    <cell icon="terminal-alt"><b-proof href="https://code.claude.com/docs/en/overview" quote="Claude Code: “reads your codebase, edits files, runs commands, and integrates with your development tools” — code.claude.com/docs/en/overview"/><b-proof href="https://learn.chatgpt.com/docs/codex/cli" quote="Codex: “Inspect code, make changes, run commands, and automate repeatable work without leaving your terminal” — learn.chatgpt.com/docs/codex/cli"/></cell>
    <cell icon="terminal-alt" t="connector" diff part><b-proof href="https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities" quote="Claude: “Connectors let Claude access your apps and services, retrieve your data, and take actions within connected services” — support.claude.com/en/articles/11176164"/><b-proof href="https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt" quote="ChatGPT: “An app connects ChatGPT to an external service, such as Google Drive or Slack, so it can access information or perform supported actions” — help.openai.com/en/articles/11487775"/></cell>
    <cell icon="sparkle"><b-proof href="https://hermes-agent.nousresearch.com/docs/user-guide/features/skills" quote="Hermes Agent: skills are “on-demand knowledge documents the agent can load when needed”, following agentskills.io — hermes-agent.nousresearch.com/docs/user-guide/features/skills"/></cell>
    <cell icon="sparkle"><b-proof href="https://code.claude.com/docs/en/overview" quote="Claude Code: “Each surface connects to the same underlying Claude Code engine, so your repo's CLAUDE.md files, settings, and MCP servers work across all of them” — code.claude.com/docs/en/overview"/><b-proof href="https://learn.chatgpt.com/docs/customization/overview" quote="Codex: “AGENTS.md gives Codex durable project guidance that travels with your repository”; “Skills give Codex reusable capabilities for repeatable workflows” — learn.chatgpt.com/docs/customization/overview"/></cell>
    <cell icon="sparkle"><b-proof href="https://code.claude.com/docs/en/overview" quote="Claude Code: “Each surface connects to the same underlying Claude Code engine, so your repo's CLAUDE.md files, settings, and MCP servers work across all of them” — code.claude.com/docs/en/overview"/><b-proof href="https://learn.chatgpt.com/docs/customization/overview" quote="Codex: “AGENTS.md gives Codex durable project guidance that travels with your repository”; “Skills give Codex reusable capabilities for repeatable workflows” — learn.chatgpt.com/docs/customization/overview"/></cell>
    <cell icon="sparkle"><b-proof href="https://support.claude.com/en/articles/12512180-use-skills-in-claude" quote="Claude: “Skills extend Claude's capabilities by giving it access to specialized knowledge and workflows” — support.claude.com/en/articles/12512180"/><b-proof href="https://help.openai.com/en/articles/20001066-skills-in-chatgpt" quote="ChatGPT: skills are reusable workflows with instructions, examples and code, on Business, Enterprise and Edu plans. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/20001066"/></cell>
    <cell icon="circle-dot" t="bất kỳ · API tính $/token hoặc cục bộ" diff><b-proof href="https://hermes-agent.nousresearch.com/docs/integrations/providers" quote="Hermes Agent: “works with any OpenAI-compatible API endpoint”; with a provider key “requests are billed pay-per-token against that key's organization (standard API pricing)” — hermes-agent.nousresearch.com/docs/integrations/providers"/><b-proof href="https://hermes-agent.nousresearch.com/docs/integrations/providers" quote="Hermes Agent: local models via Ollama, llama.cpp, vLLM or LM Studio — “Ollama runs open-weight models locally with one command. Best for: quick local experimentation, privacy-sensitive work, offline use” — hermes-agent.nousresearch.com/docs/integrations/providers"/></cell>
    <cell icon="circle-dot" t="Claude / GPT · API riêng, gói"><b-proof href="https://code.claude.com/docs/en/overview" quote="Claude Code: “Most surfaces require a Claude subscription or Anthropic Console account” — code.claude.com/docs/en/overview"/><b-proof href="https://learn.chatgpt.com/docs/pricing" quote="Codex: “ChatGPT Work and Codex are included in your ChatGPT Free, Go, Plus, Pro, Business, Edu, or Enterprise plan” — learn.chatgpt.com/docs/pricing"/></cell>
    <cell icon="circle-dot" t="Claude / GPT · API riêng, gói"><b-proof href="https://code.claude.com/docs/en/claude-code-on-the-web" quote="Claude Code: “Cloud sessions are available on Pro, Max, and Team plans, and for Enterprise users with premium seats” — code.claude.com/docs/en/claude-code-on-the-web"/><b-proof href="https://learn.chatgpt.com/docs/pricing" quote="Codex: “ChatGPT Work and Codex are included in your ChatGPT Free, Go, Plus, Pro, Business, Edu, or Enterprise plan” — learn.chatgpt.com/docs/pricing"/></cell>
    <cell icon="circle-dot" t="Claude / GPT, miễn phí / gói" diff></cell>
  </b-harness-matrix>
  <b-sublabel top="22">Chat và tác nhân</b-sublabel>
  <b-qa>
    <q t="Claude Code khác Claude trong chat thế nào">Dòng mô hình giống nhau; harness khác nhau. Chat trả lời trong hội thoại và không thấy dự án của bạn. Claude Code đọc code, sửa tệp và chạy lệnh trong dự án: trong terminal, trình soạn thảo, ứng dụng desktop hoặc trình duyệt. <a href="https://code.claude.com/docs/en/overview" target="_blank" rel="noopener">Tài liệu</a></q>
    <q t="Codex khác ChatGPT thế nào">Cùng quy tắc: các mô hình GPT dùng chung, môi trường khác nhau. ChatGPT trò chuyện mà không truy cập dự án; Codex làm việc với code và chạy lệnh.</q>
  </b-qa>
  <b-finding>
    <ex>Bốn loại khác nhau ở hai điểm: code chạy ở đâu và cách truy cập mô hình. Bản mã nguồn mở và bản enterprise đều chạy trên máy của bạn và chỉ khác nhau ở cách truy cập mô hình, đó là nguồn gốc của chênh lệch chi phí.</ex>
    <gen>Loại cục bộ hợp với việc làm với tệp và bí mật trên máy của bạn, đám mây hợp với tác vụ dài và song song, chat hợp với tác vụ không cần truy cập dự án. Các ràng buộc thu hẹp lựa chọn: gói enterprise không có sẵn ở mọi vùng pháp lý<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: “To the extent permitted by law, Anthropic reserves the right to not provide its products or services to entities whose majority direct or indirect ownership is attributable to nations other than those listed in our Supported Regions Policy” — anthropic.com/supported-countries"/>.</gen>
    <do>Xác định tác vụ có cần tệp trên máy của bạn không, tác nhân có nên làm việc khi bạn vắng mặt không, và bạn dùng được mô hình nào. Điều đầu dẫn đến loại cục bộ, điều thứ hai dẫn đến đám mây, không điều nào thì dùng chat.</do>
  </b-finding>
</b-chapter>

<b-chapter id="compare" icon="table" title="Chúng thấy và làm gì">
  <b-drift>snapshot · tháng 9 năm 2026</b-drift>
  <b-harness-compare label="Thấy gì · Tự làm gì · Mô hình" heads="Thấy gì|Tự làm gì|Mô hình|Chi phí|Nguồn" acts="Sửa tệp dự án|Chạy lệnh trên máy của bạn|Tự chạy vòng lặp “sửa → kiểm thử → sửa”|Làm việc trong môi trường cô lập" yes="có" no="không" cheap="rẻ hơn" dear="đắt hơn · giá chính xác trong chú thích">
    <row t="Hermes Agent" scope="3" scopelabel="Toàn bộ codebase" acts="1110" models="5" modelslabel="Mô hình bất kỳ: qua API hoặc cục bộ" cost="3" costlabel="$/token hoặc $0. API theo giá nhà cung cấp hoặc mô hình riêng chạy cục bộ" costproofs="2"><b-proof href="https://hermes-agent.nousresearch.com/docs/integrations/providers" quote="Hermes Agent: with a provider key “requests are billed pay-per-token against that key's organization (standard API pricing)” — hermes-agent.nousresearch.com/docs/integrations/providers"/><b-proof href="https://hermes-agent.nousresearch.com/docs/integrations/providers" quote="Hermes Agent: local models via Ollama, llama.cpp, vLLM or LM Studio — “Ollama runs open-weight models locally with one command. Best for: quick local experimentation, privacy-sensitive work, offline use” — hermes-agent.nousresearch.com/docs/integrations/providers"/><b-proof href="https://hermes-agent.nousresearch.com/docs/user-guide/security" quote="Hermes Agent: works in your project, the default backend is “local — runs on host” — hermes-agent.nousresearch.com/docs/user-guide/security"/><b-proof href="https://hermes-agent.nousresearch.com/docs/user-guide/features/overview" quote="Hermes Agent: edits files, runs terminal commands, uses skills — hermes-agent.nousresearch.com/docs/user-guide/features/overview"/><b-proof href="https://hermes-agent.nousresearch.com/docs/integrations/providers" quote="Hermes Agent: connects to models from different providers via API — hermes-agent.nousresearch.com/docs/integrations/providers"/></row>
    <row t="Claude Code và Codex" scope="3" scopelabel="Toàn bộ codebase" acts="1110" models="1" modelslabel="Một dòng mô hình: mỗi sản phẩm có dòng riêng" cost="2" costlabel="từ $20/tháng hoặc $/token qua API" costproofs="3"><b-proof href="https://claude.com/pricing" quote="Claude: Pro is $20 a month billed monthly, Claude Code is included in Pro and Max; Enterprise is “Seat price + usage at API rates” — claude.com/pricing"/><b-proof href="https://learn.chatgpt.com/docs/pricing" quote="Codex: “ChatGPT Work and Codex are included in your ChatGPT Free, Go, Plus, Pro, Business, Edu, or Enterprise plan”; the alternative is to “Pay for Codex usage based on API pricing” — learn.chatgpt.com/docs/pricing"/><b-proof href="https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus" quote="ChatGPT Plus is $20 a month. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/6950777"/><b-proof href="https://code.claude.com/docs/en/overview" quote="Claude Code: “Claude Code is an agentic coding tool that reads your codebase” — code.claude.com/docs/en/overview"/><b-proof href="https://learn.chatgpt.com/docs/codex/cli" quote="Codex: “Codex can inspect files, make edits, and run the tools already installed on your computer” — learn.chatgpt.com/docs/codex/cli"/><b-proof href="https://code.claude.com/docs/en/overview" quote="Claude Code: “reads your codebase, edits files, runs commands, and integrates with your development tools” — code.claude.com/docs/en/overview"/><b-proof href="https://learn.chatgpt.com/docs/codex/cli" quote="Codex: “Inspect code, make changes, run commands, and automate repeatable work without leaving your terminal” — learn.chatgpt.com/docs/codex/cli"/></row>
    <row t="Cursor" scope="2" scopelabel="Dự án đang mở" acts="1100" models="4" modelslabel="Mô hình của 4 hãng" cost="2" costlabel="từ $20/tháng, phần vượt tính sau" costproofs="1"><b-proof href="https://cursor.com/pricing" quote="Cursor: Pro is “$20 / mo.”; “Every plan includes a set amount of model usage. On-demand usage allows you to continue using models after your included amount is consumed, billed in arrears” — cursor.com/pricing"/><b-proof href="https://cursor.com/docs/agent/chat/checkpoints" quote="Cursor: “Checkpoints save snapshots of your codebase during an Agent session” — cursor.com/docs/agent/chat/checkpoints"/><b-proof href="https://cursor.com/docs/agent/overview" quote="Cursor: “Suggest edits to files and apply them automatically”, “Execute terminal commands and monitor output” — cursor.com/docs/agent/overview"/><b-proof href="https://cursor.com/docs/models" quote="Cursor: “Cursor supports frontier models from OpenAI, Anthropic, Google, SpaceXAI, and more”; it also has its own models such as Composer 2.5 — cursor.com/docs/models"/><b-proof href="https://cursor.com/pricing" quote="Cursor: “Every plan includes a set amount of model usage. On-demand usage allows you to continue using models after your included amount is consumed, billed in arrears” — cursor.com/pricing"/></row>
    <row t="Chat: ChatGPT, Claude" scope="1" scopelabel="Chỉ hội thoại và các dịch vụ đã kết nối" acts="0001" models="1" modelslabel="Một dòng mô hình: mỗi sản phẩm có dòng riêng" cost="1" costlabel="miễn phí · gói từ $20" costproofs="2"><b-proof href="https://claude.com/pricing" quote="Claude: Pro is $20 a month billed monthly, Claude Code is included in Pro and Max; Enterprise is “Seat price + usage at API rates” — claude.com/pricing"/><b-proof href="https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus" quote="ChatGPT Plus is $20 a month. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/6950777"/><b-proof href="https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities" quote="Claude: “Connectors let Claude access your apps and services, retrieve your data, and take actions within connected services” — support.claude.com/en/articles/11176164"/><b-proof href="https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt" quote="ChatGPT: “An app connects ChatGPT to an external service, such as Google Drive or Slack, so it can access information or perform supported actions” — help.openai.com/en/articles/11487775"/><b-proof href="https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude" quote="Claude: “When Claude executes code or creates files, it operates within an isolated, sandboxed container” — support.claude.com/en/articles/12111783"/><b-proof href="https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt" quote="ChatGPT: for data analysis it writes and runs Python in an isolated environment with no external requests. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/8437071"/></row>
  </b-harness-compare>
  <b-sublabel top="22">Cái nào là gì</b-sublabel>
  <b-qa cols="3">
    <q t="Codex là gì">Tác nhân của OpenAI để làm việc với code: nhận một tác vụ, sửa tệp và chạy lệnh. Nó hoạt động trong terminal, trong phần mở rộng của trình soạn thảo và trên đám mây, với mô hình GPT. Quyền truy cập dự án là điều phân biệt nó với chat ChatGPT. <a href="https://learn.chatgpt.com/docs/codex/cli" target="_blank" rel="noopener">Tài liệu</a></q>
    <q t="Cursor là gì">Trình soạn thảo code có tác nhân tích hợp: tác nhân tự hoàn thành tác vụ, chạy lệnh terminal và sửa code. Nó làm việc trong dự án đang mở và hỗ trợ mô hình của nhiều hãng. <a href="https://cursor.com/docs/agent/overview" target="_blank" rel="noopener">Tài liệu</a></q>
    <q t="Hermes Agent là gì">Tác nhân mã nguồn mở của Nous Research. Nó chạy trên máy của bạn, kết nối với nhiều nhà cung cấp mô hình, gồm Claude và các mô hình mở, và có thể làm việc với mô hình cục bộ. <a href="https://hermes-agent.nousresearch.com/docs/user-guide/features/overview" target="_blank" rel="noopener">Tài liệu</a></q>
  </b-qa>
  <b-finding>
    <ex>Claude Code và Codex giống nhau về quyền truy cập dự án và hành động; chúng khác nhau ở mô hình và một số tính năng harness riêng, còn về khái niệm vẫn như nhau.</ex>
    <gen>Cursor nổi bật nhờ trình soạn thảo tích hợp và mô hình của nhiều hãng, chat nổi bật ở chỗ không truy cập dự án. Giữa Claude Code và Codex, mô hình và gói quyết định lựa chọn.</gen>
    <do>Nếu tác vụ cần tệp dự án thì chat không phù hợp. Khi đó hãy chọn theo mô hình mà nhóm đã có.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Codex hay Claude Code: chọn cái nào?">Về quyền truy cập dự án và hành động hai công cụ gần như giống nhau; chúng khác ở mô hình, GPT cho Codex và Claude cho Claude Code. Hãy chọn cái mà mô hình và gói đăng ký của nhóm bạn đã có.</q>
    <q t="Cursor hay Claude Code?">Cursor làm việc trong trình soạn thảo và cung cấp mô hình của nhiều hãng. Claude Code nhận tác vụ và làm từ đầu đến kết quả trong terminal với mô hình Claude.</q>
    <q t="Có những lựa chọn nào thay thế Claude Code?">Codex, xây dựng giống vậy trên mô hình GPT, Cursor với trình soạn thảo của nó và Hermes Agent với mô hình bất kỳ. OpenCode, Aider, Cline và Goose hoạt động tương tự.</q>
    <q t="Vì sao bảng so sánh tính năng lỗi thời nhanh vậy?">Phiên bản mới của Claude Code và Codex ra mỗi tuần. Ba thứ vẫn ổn định: dòng mô hình, thiết kế harness và cách làm việc với tác nhân.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Đọc thêm">
  <b-links cols="2">
    <item href="/blog/chatgpt-enterprise-usage-report/" k="Báo cáo" t="Báo cáo sử dụng ChatGPT Enterprise">Ai trong công ty dùng gì</item>
    <item href="/blog/ai-interviews-without-leading-questions/" k="Phỏng vấn" t="Phỏng vấn không đặt câu hỏi dẫn dắt">Cách xác định nhân viên thực sự cần gì từ AI</item>
  </b-links>
</b-chapter>
<b-footer>Snapshot tính đến tháng 9 năm 2026. Các khẳng định về sản phẩm theo tài liệu chính thức của Anthropic, OpenAI, Cursor và Nous Research; nguồn nằm sau biểu tượng cạnh mỗi khẳng định. Hai trích dẫn từ OpenAI Help Center được diễn giải lại.</b-footer>
</b-post>
