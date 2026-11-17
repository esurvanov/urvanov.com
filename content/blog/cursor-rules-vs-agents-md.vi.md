---
title: Cursor rules và AGENTS.md: cái gì đặt ở đâu
seoTitle: Cursor rules và AGENTS.md: cái gì đặt ở đâu (2026)
date: 2026-11-15
updated: 2026-11-17
description: Cursor rules nằm trong .cursor/rules và có các chế độ; AGENTS.md là markdown thuần mà nhiều tác nhân đọc. Bảng so sánh, ví dụ di chuyển trước và sau, FAQ.
tags: AI, Cursor, AGENTS.md, quy tắc, .cursorrules, harness
category: specs
layout: wide
mentions: AGENTS.md, Cursor, CLAUDE.md, Codex
toc: answer=Trả lời nhanh | table=Đặt cạnh nhau | modes=Bốn chế độ | migrate=Di chuyển | readers=Ai đọc AGENTS.md | pick=Cái gì đặt ở đâu | faq=Câu hỏi | next=Đọc thêm
---

Cursor rules và AGENTS.md đều đưa cho tác nhân những chỉ dẫn thường trực, và chúng khác nhau về phạm vi. AGENTS.md là markdown thuần ở thư mục gốc dự án mà Cursor và nhiều tác nhân khác đọc. Các rule trong .cursor/rules là các tệp .mdc với bốn chế độ áp dụng, và đó là định dạng riêng của Cursor. Hãy đặt chỉ dẫn chung vào AGENTS.md và chỉ dẫn có điều kiện vào .mdc.

<b-post series="prompts">
<b-chapter id="answer" title="Trả lời nhanh" icon="crosshair">
  <b-why>Cursor chấp nhận hai định dạng cùng lúc: AGENTS.md cho các trường hợp đơn giản và các project rule để kiểm soát khi nào một rule được áp dụng<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «For more control over when rules apply, use project rules in .cursor/rules/ instead» — cursor.com/help/customization/rules"/>.</b-why>
  <b-finding>
    <ex>AGENTS.md chứa những gì mọi tác nhân phải biết; .cursor/rules chứa những gì chỉ Cursor phải biết, và chỉ đôi khi.</ex>
    <gen>AGENTS.md không có chế độ và không có metadata, nên tác nhân nào cũng đọc được. Một rule .mdc thêm các chế độ, nên nó có thể đợi đến khi một loại tệp hoặc một yêu cầu cần đến.</gen>
    <do>Chuyển các lệnh và điều cấm vào AGENTS.md, giữ các rule theo loại tệp trong .cursor/rules, xóa .cursorrules.</do>
  </b-finding>
</b-chapter>
<b-chapter id="table" title="Cursor rules và AGENTS.md đặt cạnh nhau" icon="table-grid">
  <b-why>Mỗi ô đều lấy từ tài liệu của Cursor, agents.md hoặc OpenAI; nguồn nằm sau biểu tượng. Đã kiểm tra ngày 15.11.2026.</b-why>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th></th><th>AGENTS.md</th><th>.cursor/rules/*.mdc</th></tr>
    </thead>
    <tbody>
      <tr><td>Phạm vi</td><td>dự án; một tệp lồng nhau cho một thư mục con<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Cursor supports AGENTS.md in the project root and subdirectories» — cursor.com/docs/context/rules"/></td><td>dự án, chia thành các rule; User Rules (mọi dự án của bạn) và Team Rules (cả một tổ chức) là các cấp riêng<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: Team Rules → Project Rules → User Rules is the order of precedence; Team Rules are managed from the dashboard — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Ai đọc nó</td><td>Cursor, Codex, Copilot, Windsurf, OpenCode và những tác nhân khác<b-proof href="https://agents.md/" quote="agents.md: «A simple, open format for guiding coding agents» — Cursor and Codex are in the list of supporting agents — agents.md"/></td><td>Cursor</td></tr>
      <tr><td>Tệp và vị trí</td><td><code>AGENTS.md</code> ở thư mục gốc và trong các thư mục con; tệp gần nhất với tệp đang sửa sẽ thắng<b-proof href="https://agents.md/" quote="agents.md: «The closest AGENTS.md to the edited file wins; explicit user chat prompts override everything» — agents.md"/></td><td><code>.cursor/rules/</code>, mỗi rule một tệp; rule có thể nằm trong thư mục<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Stored in .cursor/rules, version-controlled and scoped to your codebase» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Định dạng</td><td>markdown thuần, không có trường bắt buộc<b-proof href="https://agents.md/" quote="agents.md: «No. AGENTS.md is just standard Markdown» — agents.md"/></td><td>markdown với phần đầu gồm <code>description</code>, <code>globs</code>, <code>alwaysApply</code>; phần mở rộng phải là <code>.mdc</code>, một tệp <code>.md</code> thường sẽ bị bỏ qua<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Project rules must use the .mdc extension» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Khi nào áp dụng</td><td>được nhận tự động, không có chế độ<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «Write instructions in plain markdown. Cursor picks it up automatically» — cursor.com/help/customization/rules"/></td><td>một trong bốn chế độ: luôn luôn, theo mô tả, theo mẫu tệp, thủ công</td></tr>
      <tr><td>Quản lý phiên bản</td><td>một tệp trong kho mã, các thay đổi đi qua git</td><td>lưu trong kho mã; tài liệu khuyên commit các rule<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Check your rules into git so your whole team benefits» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Kích thước</td><td>tài liệu Cursor không đưa ra con số; Codex mặc định giới hạn tổng cộng mọi tệp chỉ dẫn của nó ở 32 KiB<b-proof href="https://learn.chatgpt.com/docs/agent-configuration/agents-md" quote="Codex: combined instructions are capped by project_doc_max_bytes, which is 32 KiB by default — learn.chatgpt.com/docs/agent-configuration/agents-md"/></td><td>dưới 500 dòng cho mỗi rule, rule lớn thì chia nhỏ<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «Keep rules under 500 lines. Split large rules into smaller, focused files» — cursor.com/help/customization/rules"/></td></tr>
      <tr><td>.cursorrules cũ</td><td colspan="2">một tệp duy nhất ở thư mục gốc, được thay bằng cả hai định dạng<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «The .cursorrules file in your project root is legacy and will be deprecated» — cursor.com/help/customization/rules"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Cursor cũng coi CLAUDE.md là luôn bật: nó áp dụng cho mọi cuộc trò chuyện, bất kể <code>alwaysApply</code> nói gì<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «CLAUDE.md files are always applied to every conversation, regardless of any alwaysApply frontmatter setting» — cursor.com/help/customization/rules"/>.</b-cap>
</b-chapter>
<b-chapter id="modes" title="Bốn chế độ của một Cursor rule" icon="list-arrow">
  <b-why>Chế độ quyết định khi nào một rule đi vào ngữ cảnh. Nó được đặt trong phần đầu của rule và trong menu loại rule.</b-why>
  <b-rule-modes>
    <mode t="Luôn luôn">mọi cuộc chat</mode>
    <mode t="Theo mô tả">tác nhân tự quyết định</mode>
    <mode t="Theo tệp">mẫu đường dẫn khớp</mode>
    <mode t="Thủ công">@rule</mode>
  </b-rule-modes>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Chế độ trong Cursor</th><th>Cái gì kích hoạt nó</th><th>Trường ở phần đầu</th></tr>
    </thead>
    <tbody>
      <tr><td>Always Apply</td><td>mọi phiên chat<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Always Apply — «included in every conversation» — cursor.com/help/customization/rules"/></td><td><code>alwaysApply: true</code>; khi đó globs và description bị bỏ qua<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: when alwaysApply is true the rule is always included, and globs and description are ignored — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Apply Intelligently</td><td>tác nhân quyết định dựa trên mô tả<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Apply Intelligently — «Agent decides when it's relevant» — cursor.com/help/customization/rules"/></td><td><code>description</code> với <code>alwaysApply: false</code> và không có globs</td></tr>
      <tr><td>Apply to Specific Files</td><td>một tệp khớp với một mẫu<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Apply to Specific Files — «only applies for files matching a pattern» — cursor.com/help/customization/rules"/></td><td><code>globs</code><b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Use globs to scope a rule to specific files or directories» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Apply Manually</td><td>bạn @mention rule trong chat<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Apply Manually — «only used when you @mention it in chat» — cursor.com/help/customization/rules"/></td><td>rule được gọi theo tên, ví dụ <code>@my-rule</code></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Các hướng dẫn cũ của bên thứ ba gọi cùng bốn chế độ này là Always, Auto Attached, Agent Requested và Manual. Tài liệu Cursor hiện nay dùng các tên trong bảng.</b-cap>
</b-chapter>
<b-chapter id="migrate" title="Di chuyển: từ .cursorrules sang AGENTS.md và .mdc" icon="notebook">
  <b-why>Một dự án ví dụ, viết cho bài này. Các định dạng tệp theo tài liệu của Cursor; còn dự án thì là bịa ra.</b-why>
  <b-sublabel top="18">Trước: một tệp ở thư mục gốc</b-sublabel>
  <b-codebox title="Cây dự án trước khi chuyển">
    my-app/
    ├── .cursorrules
    ├── src/
    └── package.json
  </b-codebox>
  <b-codebox title=".cursorrules">
    You are working on a React + TypeScript app.
    Run `npm test` before finishing a task.
    Format with `npm run lint -- --fix`.
    Never edit files in dist/.
    Never log tokens or user emails.
    Components: function components with hooks, one component per file,
    props typed with an interface named <Name>Props.
    The test file sits next to the component: Button.test.tsx.
    API calls go through src/api/client.ts; validate every response with zod.
  </b-codebox>
  <b-sublabel top="18">Cách chính thức: bốn bước</b-sublabel>
  <b-seq-row>
    <step t="Tạo">một rule qua command palette: “New Cursor Rule”</step>
    <step t="Sao chép">văn bản từ .cursorrules</step>
    <step t="Chế độ">Always Apply</step>
    <step t="Xóa">.cursorrules ở thư mục gốc</step>
  </b-seq-row>
  <b-cap>Đây là bốn bước trong hướng dẫn của Cursor; Always Apply giữ nguyên hành vi cũ<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «Set the rule type to Always Apply (this matches the old behavior)» — cursor.com/help/customization/rules"/>. Kết quả là một rule luôn bật. Việc tách theo điều kiện là bước tiếp theo.</b-cap>
  <b-sublabel top="18">Sau: văn bản chung trong AGENTS.md, văn bản có điều kiện trong .mdc</b-sublabel>
  <b-codebox title="Cây dự án sau khi chuyển">
    my-app/
    ├── AGENTS.md
    ├── .cursor/
    │   └── rules/
    │       ├── react-components.mdc
    │       └── api-validation.mdc
    ├── src/
    └── package.json
  </b-codebox>
  <b-codebox title="AGENTS.md" copy>
    # my-app
    React + TypeScript app.

    ## Commands
    - Run `npm test` before finishing a task.
    - Format with `npm run lint -- --fix`.

    ## Bans
    - Never edit files in `dist/`.
    - Never log tokens or user emails.
  </b-codebox>
  <b-codebox title=".cursor/rules/react-components.mdc" copy>
    ---
    description: Standards for React components
    globs: "*.tsx"
    alwaysApply: false
    ---
    - Function components with hooks, one component per file.
    - Props typed with an interface named `<Name>Props`.
    - The test file sits next to the component: `Button.test.tsx`.
  </b-codebox>
  <b-codebox title=".cursor/rules/api-validation.mdc" copy>
    ---
    description: Rules for API calls and response validation
    alwaysApply: false
    ---
    - API calls go through `src/api/client.ts`.
    - Validate every response with zod.
  </b-codebox>
  <b-finding>
    <ex>Chín dòng của một tệp trở thành ba tệp: năm dòng mà mọi tác nhân đọc, và hai rule mà Cursor chỉ nạp khi chúng áp dụng.</ex>
    <gen>Các lệnh và điều cấm đúng cho cả dự án, nên tác nhân nào cũng cần chúng. Các rule về component và API chỉ quan trọng với một phần của mã: rule đầu cho các tệp <code>.tsx</code>, rule sau khi tác nhân thấy mô tả liên quan.</gen>
    <do>Tách tệp cũ bằng một câu hỏi: mọi tác nhân có cần dòng này trong mọi phiên không? Có thì chuyển vào AGENTS.md, không thì vào một rule có chế độ.</do>
  </b-finding>
</b-chapter>
<b-chapter id="readers" title="Những tác nhân nào đọc AGENTS.md" icon="table-grid">
  <b-why>Trang agents.md liệt kê nhiều tác nhân hỗ trợ, trong đó có Codex, Cursor, Copilot, Windsurf, Gemini CLI, Zed và Warp<b-proof href="https://agents.md/" quote="agents.md: the page lists Codex, Jules, Cursor, Gemini CLI, GitHub Copilot's coding agent, Windsurf and others — agents.md"/>. Điều kiện khác nhau theo từng tác nhân: Claude Code chỉ đọc AGENTS.md khi dự án không có CLAUDE.md, Gemini CLI sau khi một thiết lập được đổi.</b-why>
  <b-links cols="1">
    <item href="/blog/specs-rules-skills/#matrix" k="Bảng" t="Tác nhân nào đọc tệp nào">Claude Code, Codex, Cursor, Copilot, Gemini CLI, Windsurf, OpenCode: AGENTS.md, CLAUDE.md và các tệp riêng của chúng</item>
  </b-links>
</b-chapter>
<b-chapter id="pick" title="Cái gì đặt ở đâu" icon="crosshair">
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Cái gì</th><th>Ở đâu</th><th>Vì sao</th></tr>
    </thead>
    <tbody>
      <tr><td>Các lệnh build và test</td><td>AGENTS.md</td><td>mọi tác nhân cần chúng trong mọi phiên</td></tr>
      <tr><td>Điều cấm: không sửa <code>dist/</code>, không đưa bí mật vào log</td><td>AGENTS.md</td><td>đúng cho cả dự án</td></tr>
      <tr><td>Phong cách của một loại tệp, ví dụ <code>*.tsx</code></td><td>.mdc, Apply to Specific Files</td><td>chỉ nạp khi có tệp như vậy đang được xử lý</td></tr>
      <tr><td>Một chủ đề thỉnh thoảng mới cần: các lệnh gọi API, migration</td><td>.mdc, Apply Intelligently</td><td>tác nhân đọc mô tả và kéo rule vào</td></tr>
      <tr><td>Một checklist hiếm dùng</td><td>.mdc, Apply Manually</td><td>chỉ vào chat khi @mention</td></tr>
      <tr><td>Một rule cho cả tổ chức</td><td>Team Rules</td><td>được quản lý từ dashboard của Cursor ở các gói Team và Enterprise<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: Team and Enterprise plans can create and enforce rules across their organization from the dashboard — cursor.com/docs/context/rules"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Mỗi chỉ dẫn giữ ở một chỗ. Một dòng được chép vào cả AGENTS.md và một rule thì phải sửa hai lần.</b-cap>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Các câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Cursor có đọc AGENTS.md không?">Có. Cursor đọc AGENTS.md ở thư mục gốc dự án và trong các thư mục con, như markdown thuần không có metadata, và nhận nó một cách tự động. Chỉ dẫn từ một AGENTS.md lồng nhau được gộp với chỉ dẫn của các thư mục cha, và những chỉ dẫn cụ thể hơn được ưu tiên. Nguồn: cursor.com/docs/context/rules và cursor.com/help/customization/rules, đã kiểm tra ngày 15.11.2026.</q>
    <q t="Tôi có còn cần .cursorrules không?">Không. Tài liệu Cursor gọi .cursorrules ở thư mục gốc là di sản (legacy) và mô tả cách chuyển: tạo một rule ở chế độ Always Apply, sao chép văn bản, xóa tệp. Nguồn: cursor.com/help/customization/rules, đã kiểm tra ngày 15.11.2026.</q>
    <q t="Tôi có thể giữ cả AGENTS.md lẫn .cursor/rules không?">Được. Cursor mô tả chúng là hai lựa chọn: AGENTS.md cho các trường hợp đơn giản, project rule để kiểm soát khi nào một rule được áp dụng. Một cách chia hợp lý là các lệnh và điều cấm chung trong AGENTS.md và các rule có điều kiện trong .cursor/rules; mỗi chỉ dẫn nằm ở một chỗ. Nguồn: cursor.com/help/customization/rules, đã kiểm tra ngày 15.11.2026.</q>
    <q t="Nên có bao nhiêu rule và dài đến đâu?">Cursor khuyên dưới 500 dòng cho mỗi rule và chia các rule lớn thành các tệp nhỏ, tập trung hơn. Các trang đã kiểm tra không nêu giới hạn số lượng rule cũng không nêu độ dài cho AGENTS.md; Codex mặc định giới hạn tổng cộng các tệp AGENTS.md của nó ở 32 KiB. Nguồn: tài liệu của Cursor và OpenAI, đã kiểm tra ngày 15.11.2026.</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="next" title="Đọc thêm">
  <b-links cols="2">
    <item href="/blog/specs-rules-skills/" k="Ngữ cảnh" t="AGENTS.md, CLAUDE.md và spec.md: cái gì đặt ở đâu">Bốn lớp, một bảng các tác nhân, một tệp thật</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="So sánh" t="Claude Code, Codex, Cursor và Hermes Agent">Tác nhân nào cho nhiệm vụ nào</item>
    <item href="/blog/harness-driven-development/" k="Phương pháp" t="Harness-Driven Development">Một lỗi của tác nhân trở thành một quy tắc</item>
  </b-links>
</b-chapter>
<b-footer>Dựa trên tài liệu của Cursor, agents.md và OpenAI, nguồn nằm sau biểu tượng cạnh mỗi khẳng định; đã kiểm tra ngày 15.11.2026. Dự án ví dụ là bịa ra.</b-footer>
</b-post>
