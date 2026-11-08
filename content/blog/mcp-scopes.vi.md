---
title: Phạm vi MCP trong Claude Code: local, project và user — server nằm ở đâu và ai thấy nó
date: 2026-10-05
updated: 2026-11-08
description: Ba phạm vi của server MCP trong Claude Code: local, project và user. Thiết lập nằm ở đâu, ai thấy nó, cái nào thắng khi trùng tên, cách chia sẻ server với nhóm và giữ bí mật ngoài các commit.
tags: AI, tác nhân, MCP, Claude Code, nhóm, harness
category: harness
layout: wide
mentions: MCP, Model Context Protocol, Claude Code, mcp scope, .mcp.json, environment variables
toc: what=Ba phạm vi | pick=Chọn cái nào | order=Cái nào thắng | team=Project cho nhóm | secrets=Bí mật | first=Bắt đầu từ đâu | faq=Câu hỏi | next=Tiếp theo
---

Phạm vi của một server MCP trả lời hai câu hỏi: nó làm việc trong những dự án nào và ai thấy nó. Claude Code có ba phạm vi: local, project và user. Bên dưới: chúng khác nhau thế nào, chọn cái nào, cái nào thắng khi trùng tên và cách chia sẻ server với nhóm. MCP là gì và cách kết nối có trong bài [MCP cho tác nhân AI (AI agent)](/blog/mcp-agent-access/).

<b-post series="harness">

<b-chapter id="what" icon="layers" title="Ba phạm vi">
  <iso-art name="mcp-scopes/scopes"></iso-art>
  <b-table code="prose">
| Phạm vi | Làm việc trong | Ai thấy | Lưu ở |
|---|---|---|---|
| Local | dự án hiện tại | chỉ bạn | `~/.claude.json` |
| Project | dự án hiện tại | cả nhóm, qua repo | `.mcp.json` ở thư mục gốc |
| User | mọi dự án của bạn | chỉ bạn | `~/.claude.json` |
  </b-table>
  <b-finding>
    <ex>Cùng một server có thể được kết nối cho riêng bạn trong một dự án, cho cả nhóm, hoặc cho mọi dự án của bạn.</ex>
    <gen>Local là mặc định: server chỉ bạn thấy và chỉ trong dự án này.</gen>
    <do k="Việc cần làm">Xem mỗi server của bạn nằm ở phạm vi nào: claude mcp list.</do>
  </b-finding>
</b-chapter>

<b-chapter id="pick" icon="help" title="Chọn cái nào">
  <b-say-agent title="Nói với tác nhân">Cho xem các server MCP của tôi được cấu hình ở phạm vi nào và gợi ý những cái nào nên chuyển sang project cho cả nhóm.</b-say-agent>
  <b-why align="left">Tác nhân tự chạy các lệnh: claude mcp list và claude mcp get.</b-why>
  <b-spoiler summary="Cách làm bằng tay">
    <iso-art name="mcp-scopes/what-where"></iso-art>
    <b-codebox copy>
      # local — the default
      claude mcp add --transport http stripe https://mcp.stripe.com
      # project — the whole team, .mcp.json file
      claude mcp add --transport http shared-server --scope project https://example.com/mcp
      # user — all your projects
      claude mcp add --transport http hubspot --scope user https://mcp.hubspot.com/anthropic
    </b-codebox>

Danh sách server: `claude mcp list`; chi tiết: `claude mcp get <name>`; xóa: `claude mcp remove <name>`; bên trong Claude Code: `/mcp`.

  </b-spoiler>
  <b-finding>
    <ex>Một thử nghiệm bắt đầu ở local, công cụ dùng chung nằm ở project, tiện ích cá nhân ở user.</ex>
    <gen>Phạm vi quyết định ai thấy server và cấu hình của nó nằm ở đâu.</gen>
    <do k="Việc cần làm">Thêm công cụ dùng chung với --scope project và công cụ cá nhân với --scope user.</do>
  </b-finding>
</b-chapter>

<b-chapter id="order" icon="layers" title="Cái nào thắng khi trùng tên">
  <b-why>Nếu một server cùng tên tồn tại ở nhiều nơi, mục ở tầng trên cùng được dùng nguyên vẹn.</b-why>
  <iso-art name="mcp-scopes/priority-layers"></iso-art>
  <b-finding>
    <ex>Local ghi đè project và user, project ghi đè user, còn plugin, connector của claude.ai và MCP được quản lý nằm bên dưới.</ex>
    <gen>Mục cá nhân ghi đè nguyên cả mục dùng chung cùng tên: các trường của hai mục không được gộp.</gen>
    <do k="Việc cần làm">Đặt tên khác cho các server cá nhân để chúng không ghi đè các server dùng chung.</do>
  </b-finding>
</b-chapter>

<b-chapter id="team" icon="git-branch" title="Project: thiết lập chung cho nhóm">
  <b-rules sw="1.8">
    <rule icon="folder-tab" t=".mcp.json">File nằm ở thư mục gốc dự án, trong repository: cả nhóm nhận cùng các server.</rule>
    <rule icon="bell" t="Phê duyệt">Trong phiên tương tác, Claude Code hỏi trước khi dùng các server từ .mcp.json.</rule>
    <rule icon="users" t="Không hỏi">Trong các lần chạy không tương tác (claude -p, Agent SDK, phiên trên đám mây), server được nạp mà không hỏi.</rule>
    <rule icon="lock" t="Tin cậy thư mục">Ở thư mục không đáng tin, server chờ phê duyệt (“Pending approval”) cho đến khi có hộp thoại tin cậy.</rule>
    <rule icon="ban" t="Tắt">Thêm server không muốn dùng vào disabledMcpjsonServers; claude mcp reset-project-choices xóa các lựa chọn phê duyệt.</rule>
  </b-rules>
  <b-finding>
    <ex>Một file trong repository biến thiết lập tác nhân thành dùng chung: thành viên mới nhận các server cùng với code.</ex>
    <gen>Phê duyệt bảo vệ khỏi server lạ trong công việc tương tác, còn trong các lần chạy tự động thì server bật ngay.</gen>
    <do k="Việc cần làm">Xem lại .mcp.json trong code review như mọi đoạn code khác.</do>
  </b-finding>
</b-chapter>

<b-chapter id="secrets" icon="key" title="Bí mật trong .mcp.json">
  <b-why>File chứa tên các biến môi trường. ${VAR} chèn giá trị và ${VAR:-default} đặt giá trị dự phòng. Việc mở rộng hoạt động trong command, args, env, url và headers.</b-why>
  <iso-art name="mcp-scopes/env-keys"></iso-art>
  <b-codebox copy>
    {
      "mcpServers": {
        "api-server": {
          "type": "http",
          "url": "${API_BASE_URL:-https://api.example.com}/mcp",
          "headers": { "Authorization": "Bearer ${API_KEY}" }
        }
      }
    }
  </b-codebox>

Nếu một biến chưa được đặt và không có giá trị mặc định, cấu hình được nạp nguyên trạng, và claude mcp list cùng /mcp hiện cảnh báo. Thông tin xác thực của Claude Code (ANTHROPIC_API_KEY, ANTHROPIC_AUTH_TOKEN) và một số biến khác được đọc là rỗng trong url và headers: hãy sao chép giá trị sang một biến có tên khác.

  <b-finding>
    <ex>Repository chứa ${API_KEY}, và mỗi lập trình viên giữ khóa thật trong biến môi trường của riêng mình.</ex>
    <gen>Nhờ vậy file dùng chung commit được an toàn.</gen>
    <do k="Việc cần làm">Xóa các khóa khỏi .mcp.json và thay bằng biến.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="Bắt đầu từ đâu">
  <iso-art name="mcp-scopes/steps"></iso-art>
  <b-finding>
    <ex>Ba bước: xem, chia sẻ, giấu khóa.</ex>
    <gen>Trước hết sắp xếp các server của riêng bạn, rồi mới đến thiết lập chung cho nhóm.</gen>
    <do k="Việc cần làm">Chạy claude mcp list và tìm một server mà cả nhóm cần.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Claude Code có những phạm vi MCP nào?">Ba: local cho riêng bạn trong dự án hiện tại, project cho cả nhóm qua file .mcp.json trong repo, và user cho riêng bạn trong mọi dự án.</q>
    <q t="Phạm vi nào là mặc định?">Local: server chỉ bạn thấy và chỉ trong dự án này.</q>
    <q t="Điều gì xảy ra khi tên server trùng nhau?">Mục cá nhân ghi đè hoàn toàn mục dùng chung cùng tên: các trường của hai mục không được gộp.</q>
    <q t="Làm sao chia sẻ server MCP với nhóm?">Thêm nó vào phạm vi project: thiết lập đi vào repo, còn bí mật ở lại trong biến môi trường.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Tiếp theo">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="Cơ bản" t="MCP cho tác nhân AI: giải quyết vấn đề gì và cách giao việc kết nối cho tác nhân">MCP là gì và cách kết nối</item>
    <item href="/blog/claude-in-chrome/" k="Trình duyệt" t="Claude in Chrome: cách tác nhân làm việc trong trình duyệt của bạn — kiểm thử, gỡ lỗi và biểu mẫu dưới phiên đăng nhập của bạn">Tác nhân trong trình duyệt của bạn</item>
    <item href="/blog/bug-report-to-reproduction-agent/" k="Ví dụ" t="Công việc của QA sau bộ phận hỗ trợ cùng tác nhân AI: nghiên cứu, mô tả và lập tài liệu qua MCP và skill">Tác nhân tái hiện một lỗi trong Jira</item>
  </b-links>
</b-chapter>
<b-footer>Dữ kiện về phạm vi và thứ tự ưu tiên theo tài liệu Claude Code: <a href="https://code.claude.com/docs/en/mcp#mcp-installation-scopes" target="_blank" rel="noopener">MCP installation scopes</a>.</b-footer>
</b-post>
