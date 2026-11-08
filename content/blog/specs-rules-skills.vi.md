---
title: AGENTS.md và CLAUDE.md là gì: file ví dụ và nơi giữ đặc tả, quy tắc và skill
date: 2026-09-28
updated: 2026-11-08
description: Bốn loại ngữ cảnh bền vững cho AI (AGENTS.md, CLAUDE.md, skill): đặc tả nhiệm vụ, bible dự án, quy tắc và skill. Mỗi loại chứa gì, vào ngữ cảnh khi nào, và ChatGPT cùng Claude cung cấp gì. Dựa trên tài liệu của Anthropic, OpenAI, GitHub, Cursor và Cline.
tags: AI, Claude Code, CLAUDE.md, harness, đặc tả, skill
category: specs
layout: wide
mentions: AGENTS.md, CLAUDE.md, Agent Skills, Spec Kit, Memory Bank
toc: map=Bốn lớp | spec=Đặc tả | bible=Bible | rules=Quy tắc | skills=Skill | chat=Trong chat | pick=Cái gì ở đâu | faq=Câu hỏi | next=Đọc tiếp
---

AGENTS.md và CLAUDE.md là các file ở thư mục gốc dự án chứa chỉ dẫn thường trực cho tác nhân AI (AI agent): lệnh build và test, phong cách code, các điều cấm. AGENTS.md là định dạng mở được Codex, Cursor, Gemini CLI, Copilot và các tác nhân khác đọc; CLAUDE.md do Claude Code đọc. Harness đặt file như vậy vào đầu mỗi phiên. Bên dưới là một file ví dụ và nơi giữ đặc tả, bible dự án và skill.

<b-post series="prompts">
<b-ctx-layers>
  <layer kind="spec" t="Đặc tả" when="cho một nhiệm vụ">cần xây gì trong một nhiệm vụ</layer>
  <layer kind="bible" t="Bible" when="lúc bắt đầu nhiệm vụ">sản phẩm là gì</layer>
  <layer kind="rules" t="Quy tắc" when="mỗi phiên">làm việc trong dự án thế nào</layer>
  <layer kind="skill" t="Skill" when="khi được gọi">chạy một quy trình thế nào</layer>
</b-ctx-layers>
<b-cap>Mô hình không nhớ dự án giữa các phiên<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Large language models don&#x27;t retain memory between completions. Rules provide persistent, reusable context at the prompt level» — cursor.com/docs/context/rules"/>. Bốn loại file trả lại ngữ cảnh đó.</b-cap>
<b-chapter id="map" title="Bốn lớp ngữ cảnh" icon="table-grid">
  <b-ctx-table phone="hide4">
    <table>
    <thead>
      <tr><th>Lớp</th><th>Chứa gì</th><th>Vào ngữ cảnh khi nào</th><th>File</th></tr>
    </thead>
    <tbody>
      <tr><td><b-ctx-layer kind="spec">Đặc tả</b-ctx-layer></td><td>yêu cầu, kế hoạch, các bước của một nhiệm vụ</td><td>cho một nhiệm vụ</td><td><code>spec.md · plan.md · tasks.md</code></td></tr>
      <tr><td><b-ctx-layer kind="bible">Bible</b-ctx-layer></td><td>mục tiêu sản phẩm, người dùng, các quyết định</td><td>lúc bắt đầu nhiệm vụ</td><td><code>projectbrief.md · productContext.md</code></td></tr>
      <tr><td><b-ctx-layer kind="rules">Quy tắc</b-ctx-layer></td><td>lệnh, phong cách, các điều cấm</td><td>mỗi phiên</td><td><code>CLAUDE.md · AGENTS.md · .cursor/rules</code></td></tr>
      <tr><td><b-ctx-layer kind="skill">Skill</b-ctx-layer></td><td>quy trình kèm ví dụ và script</td><td>phần mô tả luôn có, phần thân khi được gọi</td><td><code>SKILL.md</code></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-finding>
    <ex>Các lớp khác nhau về tuổi thọ và về thời điểm vào ngữ cảnh.</ex>
    <gen>Quy tắc được nạp vào mỗi phiên, nên được giữ ngắn: Anthropic khuyên dưới 200 dòng mỗi file<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Size: target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence» — code.claude.com/docs/en/memory"/>. Nội dung dài và ít dùng chuyển sang skill, phần thân của skill chỉ được nạp khi gọi<b-proof href="https://code.claude.com/docs/en/skills" quote="Anthropic: «skill descriptions are loaded into context so Claude knows what&#x27;s available, but full skill content only loads when invoked» — code.claude.com/docs/en/skills"/>.</gen>
    <do>Đi qua file chỉ dẫn của bạn: giữ dữ kiện trong quy tắc, chuyển quy trình sang skill và phần mô tả sản phẩm sang bible.</do>
  </b-finding>
</b-chapter>
<b-chapter id="spec" title="Đặc tả: một nhiệm vụ trước khi viết code" icon="file-lines">
  <b-why>Đặc tả mô tả nhiệm vụ trước khi bắt đầu làm: trước hết là cái gì và vì sao, rồi mới đến thế nào<b-proof href="https://github.com/github/spec-kit" quote="GitHub Spec Kit: «Define what and why before deciding how to build it. SDD turns your requirements into a specification, a technical plan, and actionable tasks, then guides implementation against those artifacts» — github.com/github/spec-kit"/>.</b-why>
  <b-seq-row>
    <step t="Nguyên tắc">một lần cho mỗi dự án</step>
    <step t="Đặc tả">cái gì và vì sao</step>
    <step t="Kế hoạch">thế nào</step>
    <step t="Nhiệm vụ">các bước</step>
    <step t="Triển khai">code từng bước</step>
  </b-seq-row>
  <b-cap>Các bước chính của GitHub Spec Kit<b-proof href="https://github.com/github/spec-kit" quote="GitHub Spec Kit: constitution được tạo một lần cho mỗi dự án — «Create principles focused on code quality, testing, and maintainability». Diễn giải lại — github.com/github/spec-kit"/>. Cách chia một đặc tả lớn thành các phần: <a href="/blog/specs-by-aggregates/">Đặc tả theo aggregate</a></b-cap>
  <b-finding>
    <ex>Spec Kit đưa một nhiệm vụ từ nguyên tắc dự án qua đặc tả và kế hoạch đến các bước và code.</ex>
    <gen>Yêu cầu được viết trước code, và bước xem lại kiểm tra kết quả so với văn bản đó. Đặc tả nằm ở đâu trong harness được nói ở <a href="/blog/harness-driven-development/#spec">HDD và đặc tả</a>.</gen>
    <do>Với nhiệm vụ dài hơn một ngày, hãy viết đặc tả: cái gì, vì sao và làm sao biết là đã xong.</do>
  </b-finding>
</b-chapter>
<b-chapter id="bible" title="Bible dự án: sản phẩm là gì" icon="notebook">
  <b-why>Bible là bản mô tả thường trực về sản phẩm: vì sao nó tồn tại, phục vụ ai, hoạt động ra sao và đã quyết định những gì. Thuật ngữ này đến từ thực tế; chỗ tương tự gần nhất có tài liệu là Memory Bank của Cline<b-proof href="https://docs.cline.bot/prompting/cline-memory-bank" quote="Cline: Memory Bank — «a documentation methodology that transforms Cline from a stateless assistant into a persistent development partner. Through structured markdown files, Cline can &#x27;remember&#x27; your project details across sessions» — docs.cline.bot/prompting/cline-memory-bank"/>.</b-why>
  <b-file-grid>
    <file name="projectbrief.md">mục tiêu và yêu cầu</file>
    <file name="productContext.md">vì sao tồn tại, giải quyết gì</file>
    <file name="systemPatterns.md">kiến trúc và mẫu thiết kế</file>
    <file name="techContext.md">công nghệ và ràng buộc</file>
    <file name="activeContext.md">trọng tâm hiện tại và bước tiếp theo</file>
    <file name="progress.md">cái gì đã chạy, còn lại gì</file>
  </b-file-grid>
  <b-finding>
    <ex>Sáu file Memory Bank: từ mục tiêu sản phẩm đến tiến độ hiện tại.</ex>
    <gen>Bible trả lời những câu hỏi vốn phải hỏi ở mỗi cuộc chat mới: sản phẩm là gì, đã quyết định gì, đang làm dở gì. File ngữ cảnh hiện tại thay đổi thường xuyên nhất<b-proof href="https://docs.cline.bot/prompting/cline-memory-bank" quote="Cline: activeContext.md — trọng tâm hiện tại, các thay đổi gần đây và bước tiếp theo, được cập nhật thường xuyên hơn các file khác. Diễn giải lại — docs.cline.bot/prompting/cline-memory-bank"/>.</gen>
    <do>Bắt đầu với một file: mục tiêu sản phẩm, người dùng, các thuật ngữ chính và những quyết định gần đây kèm ngày.</do>
  </b-finding>
</b-chapter>
<b-chapter id="rules" title="Quy tắc: trong mỗi phiên" icon="list-arrow">
  <b-why>Quy tắc là các chỉ dẫn mà harness đặt vào đầu mỗi phiên<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «CLAUDE.md files are loaded into the context window at the start of every session» — code.claude.com/docs/en/memory"/>.</b-why>
  <b-io justify>
    <item k="CLAUDE.md" mono>Claude Code, quy tắc theo đường dẫn trong <code>.claude/rules/</code><b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Rules can also be scoped to specific file paths, so they only load into context when Claude works with matching files» — code.claude.com/docs/en/memory"/></item>
    <item k="AGENTS.md" mono>“README cho tác nhân”: Codex, Cursor, Gemini CLI, Copilot và các công cụ khác<b-proof href="https://agents.md/" quote="agents.md: «Think of AGENTS.md as a README for agents: a dedicated, predictable place to provide the context and instructions to help AI coding agents work on your project» — agents.md"/></item>
    <item k=".cursor/rules" mono>Cursor, bốn cách áp dụng<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: bốn chế độ — Always Apply, Apply Intelligently, Apply to Specific Files, Apply Manually — cursor.com/docs/context/rules"/></item>
  </b-io>
  <b-why align="left">Một ví dụ AGENTS.md cho dự án web. File chỉ chứa những gì tác nhân không thể tự biết từ code: lệnh, phong cách và các điều cấm. CLAUDE.md cho Claude Code hoạt động tương tự.</b-why>
  <b-codebox title="Ví dụ AGENTS.md">
    # AGENTS.md
    ## Commands
    - Install: npm ci
    - Tests: npm test
    - Type check: npx tsc --noEmit
    ## Style
    - Strict TypeScript, no any
    - kebab-case file names
    ## Don't
    - Don't change migrations/ without a task for it
    - Don't commit .env or keys
    ## Before finishing
    - Run the tests and the type check
  </b-codebox>
  <b-sublabel top="18">Khi nào quy tắc vào ngữ cảnh · Cursor</b-sublabel>
  <b-rule-modes>
    <mode t="Luôn luôn">mọi cuộc chat</mode>
    <mode t="Theo mô tả">tác nhân tự quyết định</mode>
    <mode t="Theo file">mẫu đường dẫn khớp</mode>
    <mode t="Thủ công">@rule</mode>
  </b-rule-modes>
  <b-metric-line value="≤ 200">dòng mỗi file CLAUDE.md<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Size: target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence» — code.claude.com/docs/en/memory"/></b-metric-line>
  <b-finding>
    <ex>Ba định dạng của cùng một ý tưởng: file chỉ dẫn mà harness đọc lúc bắt đầu.</ex>
    <gen>Quy tắc vẫn chỉ là ngữ cảnh, và mô hình có thể phá chúng; hành động tuyệt đối không được xảy ra thì bị chặn bằng hook. Quy tắc càng cụ thể và ngắn gọn thì càng được tuân theo nhất quán<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Claude treats them as context, not enforced configuration. To block an action regardless of what Claude decides, use a PreToolUse hook instead. The more specific and concise your instructions, the more consistently Claude follows them» — code.claude.com/docs/en/memory"/>.</gen>
    <do>Tạo AGENTS.md hoặc CLAUDE.md: lệnh build và test, phong cách code, các điều cấm. Chuyển các quy tắc riêng cho từng thư mục sang quy tắc theo đường dẫn.</do>
  </b-finding>
</b-chapter>
<b-chapter id="skills" title="Skill: quy trình khi được gọi" icon="zap">
  <b-why>Skill là một thư mục có chỉ dẫn SKILL.md, ví dụ và script cho một quy trình lặp lại<b-proof href="https://learn.chatgpt.com/docs/build-skills" quote="OpenAI: «ChatGPT and Codex start with each skill&#x27;s name and description, then load the full SKILL.md instructions when they decide to use that skill» — learn.chatgpt.com/docs/build-skills"/>.</b-why>
  <b-skill-pick start="Bắt đầu phiên" start-note="tên + mô tả" picked="↓ tác nhân chọn “Xem lại PR”" call="Khi được gọi" call-note="toàn bộ phần thân" file="SKILL.md" file-note="chỉ dẫn, ví dụ, script">
    <skill>báo cáo</skill>
    <skill on>Xem lại PR</skill>
    <skill>phát hành</skill>
    <skill>email khách hàng</skill>
  </b-skill-pick>
  <b-finding>
    <ex>Phần mô tả của mọi skill luôn nằm trong ngữ cảnh; phần thân được nạp khi một skill được chọn.</ex>
    <gen>Vì vậy một tài liệu tham khảo dài bên trong skill gần như không tốn gì cho đến khi được dùng. Nên tạo skill khi cùng một chỉ dẫn hay checklist cứ bị dán vào chat, hoặc khi một mục trong quy tắc đã phình thành quy trình<b-proof href="https://code.claude.com/docs/en/skills" quote="Anthropic: «Create a skill when you keep pasting the same instructions, checklist, or multi-step procedure into chat, or when a section of CLAUDE.md has grown into a procedure rather than a fact. Unlike CLAUDE.md content, a skill&#x27;s body loads only when it&#x27;s used» — code.claude.com/docs/en/skills"/>.</gen>
    <do>Tìm một mục trong quy tắc của bạn mô tả một quy trình và chuyển nó thành skill với phần mô tả chính xác về lúc nào dùng.</do>
  </b-finding>
</b-chapter>
<b-chapter id="chat" title="Tương tự trong chat: dự án và skill" icon="chat">
  <b-io justify>
    <item k="Chỉ dẫn dự án" eq="≈ quy tắc">Vai trò và định dạng khai báo một lần, cho mọi cuộc chat trong dự án<b-proof href="https://help.openai.com/en/articles/10169521-projects-in-chatgpt" quote="ChatGPT: a project keeps chats, files and instructions together; project instructions apply only inside it, and it can be shared with teammates. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/10169521"/><b-proof href="https://support.claude.com/en/articles/9517075-what-are-projects" quote="Claude: “You can define project instructions for each project to further tailor Claude&#39;s responses. For example, instructing Claude to use a more formal tone or answer questions from the perspective of a specific role” — support.claude.com/en/articles/9517075"/></item>
    <item k="File dự án" eq="≈ bible">Thư mẫu, chính sách và biểu mẫu nằm trong dự án<b-proof href="https://support.claude.com/en/articles/9517075-what-are-projects" quote="Claude: “You can upload relevant documents, text, code, or other files to a project&#39;s knowledge base, which Claude will use to better understand the context” — support.claude.com/en/articles/9517075"/></item>
    <item k="Skill" eq="= skill">Một quy trình lặp lại được, có chỉ dẫn và ví dụ<b-proof href="https://support.claude.com/en/articles/12512180-use-skills-in-claude" quote="Claude: “Skills extend Claude&#39;s capabilities by giving it access to specialized knowledge and workflows” — support.claude.com/en/articles/12512180"/><b-proof href="https://help.openai.com/en/articles/20001066-skills-in-chatgpt" quote="ChatGPT: skills are reusable workflows with instructions, examples and code, on Business, Enterprise and Edu plans. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/20001066"/></item>
  </b-io>
  <b-finding>
    <ex>Ba nơi để một prompt sống lâu hơn một cuộc chat: chỉ dẫn, file và skill.</ex>
    <gen>Vai trò, ví dụ và định dạng được chuyển vào một dự án sẽ hoạt động ở mọi cuộc chat mới mà không cần chép lại. Một dự án dùng chung cho cả nhóm một bộ ví dụ thống nhất.</gen>
    <do>Tạo một dự án cho nhiệm vụ hằng tuần thường gặp nhất của bạn và chuyển vai trò cùng định dạng từ prompt tốt nhất vào phần chỉ dẫn của nó.</do>
  </b-finding>
</b-chapter>
<b-chapter id="pick" title="Cái gì ở đâu" icon="crosshair">
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Nếu đó là…</th><th>Thì ở</th></tr>
    </thead>
    <tbody>
      <tr><td>một lệnh, phong cách hay điều cấm cần cho mọi nhiệm vụ</td><td><b-ctx-layer kind="rules">Quy tắc</b-ctx-layer></td></tr>
      <tr><td>một quy trình nhiều bước thỉnh thoảng mới cần</td><td><b-ctx-layer kind="skill">Skill</b-ctx-layer></td></tr>
      <tr><td>yêu cầu cho một nhiệm vụ</td><td><b-ctx-layer kind="spec">Đặc tả</b-ctx-layer></td></tr>
      <tr><td>kiến thức về sản phẩm và các quyết định đã đưa ra</td><td><b-ctx-layer kind="bible">Bible</b-ctx-layer></td></tr>
      <tr><td>một lỗi của tác nhân cứ quay lại</td><td><a href="/blog/harness-driven-development/#loop">quy tắc hoặc kiểm tra · HDD</a></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-finding>
    <ex>Năm tình huống và năm nơi.</ex>
    <gen>Tần suất và tuổi thọ quyết định nơi chốn. Cái luôn cần thì giữ ngắn; cái hiếm cần thì có thể chi tiết.</gen>
    <do>Xem lại các quy tắc mỗi tuần một lần: chuyển quy trình sang skill và các quyết định sang bible kèm ngày.</do>
  </b-finding>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="AGENTS.md và CLAUDE.md là gì?">Các file ở thư mục gốc dự án chứa chỉ dẫn thường trực cho tác nhân AI: lệnh build và test, phong cách code, các điều cấm.</q>
    <q t="Những tác nhân nào đọc AGENTS.md?">Codex, Cursor, Gemini CLI, Copilot và các tác nhân khác. Claude Code đọc CLAUDE.md.</q>
    <q t="CLAUDE.md nên dài bao nhiêu?">Anthropic khuyên dưới 200 dòng mỗi file: quy tắc được nạp vào mỗi phiên. Nội dung dài và hiếm dùng chuyển sang skill.</q>
    <q t="Quy tắc khác skill ở đâu?">Tác nhân thấy quy tắc ở mỗi phiên. Skill là quy trình mà tác nhân chỉ nạp đầy đủ khi một nhiệm vụ khớp.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Đọc tiếp">
  <b-links cols="2">
    <item href="/blog/harness-driven-development/" k="Phương pháp" t="Harness-Driven Development">Lỗi của tác nhân → quy tắc của môi trường</item>
    <item href="/blog/harness-work-approaches/" k="Cách tiếp cận" t="Các cách làm việc với harness">Vòng lặp câu trả lời và bước xem lại</item>
    <item href="/blog/work-prompts-examples/" k="Thực hành" t="Prompt cho công việc">Năm phần và sáu ví dụ</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="So sánh" t="So sánh các harness">Claude Code, Codex, Cursor, Hermes</item>
  </b-links>
</b-chapter>
<b-footer>Dựa trên tài liệu của Anthropic, OpenAI, GitHub, Cursor và Cline; nguồn nằm sau biểu tượng cạnh mỗi khẳng định. “Bible dự án” là thuật ngữ của giới thực hành; các chỗ diễn giải lại được đánh dấu trong chú giải nguồn.</b-footer>
</b-post>
