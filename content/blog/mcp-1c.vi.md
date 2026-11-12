---
title: MCP server và tác nhân AI cho 1C: cho Claude Code, Codex hay Cursor vào cơ sở dữ liệu mà không làm hỏng nó
date: 2026-10-12
updated: 2026-11-13
description: MCP server cho 1C:Enterprise cho phép tác nhân AI (Claude Code, Codex hay Cursor) truy cập mã cấu hình và dữ liệu trong cơ sở dữ liệu. Cách kết nối trong 3 bước, điều gì hỏng trong thực tế, cách tách đọc khỏi ghi và kiểm tra kết quả.
tags: AI, tác nhân, MCP, 1C, quyền truy cập, bảo mật, Claude Code, Codex, Cursor
category: harness
layout: wide
mentions: Model Context Protocol, MCP, 1C:Enterprise, AI agent, Claude Code, Codex, Cursor, permissions, prompt injection
toc: what=Là gì | specifics=Đặc thù 1C | breaks=Hỏng ở đâu | servers=Các server | cases=Điều gì hỏng | scheme=Sơ đồ | rights=Quyền | check=Kiểm tra | agents=Tác nhân | start=Bắt đầu từ đâu | faq=Câu hỏi | next=Đọc tiếp
---

Để cho Claude Code, Codex hay Cursor vào cơ sở dữ liệu 1C mà không làm hỏng nó, hãy kết nối tác nhân AI (AI agent) qua MCP server cho 1C — cầu nối tới mã cấu hình và dữ liệu trong cơ sở dữ liệu — và chia nhỏ quyền truy cập. Tác nhân chỉ đọc cơ sở dữ liệu production dưới một người dùng không có quyền ghi, thực hiện thay đổi trên bản sao kiểm thử, còn con người đưa thay đổi lên production qua repository sau khi review. Bên dưới: có những server nào, điều gì hỏng trong thực tế, thang quyền và cách kiểm tra kết quả. MCP nói chung hoạt động ra sao được trình bày trong [MCP cho tác nhân AI](/blog/mcp-agent-access/).

<b-post series="harness">
<b-chapter id="what" icon="plug" title="MCP server cho 1C là gì">
<b-why align="left"><a href="/materials/glossary/mcp/">MCP</a> là đầu cắm chung giữa tác nhân và một hệ thống. Với 1C đó là <a href="/materials/glossary/mcp-server/">MCP server</a> cung cấp cho tác nhân mã cấu hình và metadata, dữ liệu trong cơ sở dữ liệu, trợ giúp của nền tảng hoặc các phép kiểm tra. Nhiều server kết hợp vài thứ trong số đó. Cách hoạt động giống như với mọi hệ thống khác: 1C chỉ là thêm một <a href="/blog/mcp-agent-access/#ours">ngữ cảnh khác</a>, như Jira hay GitLab, với cùng đầu cắm và cùng các tác nhân. Phần riêng của 1C chỉ là cách server tiếp cận 1C: qua bản xuất cấu hình, IDE của 1C, phần mở rộng cấu hình hoặc bộ xử lý dữ liệu ngoài.</b-why>
<b-lane title="MCP server cung cấp gì" color="accent">
<b-scene names="mcp-1c/servers"/>
</b-lane>
<b-table-plain>
<table><thead><tr><th></th><th>Mã và metadata</th><th>Dữ liệu trong cơ sở dữ liệu</th></tr></thead><tbody><tr><td>Tác nhân thấy gì</td><td>module, metadata, form</td><td>danh mục, chứng từ, thanh ghi, báo cáo</td></tr><tr><td>Lấy từ đâu</td><td>bản xuất cấu hình hoặc 1C:EDT</td><td>cơ sở dữ liệu 1C qua phần mở rộng cấu hình hoặc bộ xử lý dữ liệu ngoài</td></tr><tr><td>Để làm gì</td><td>viết mã theo cấu hình thật, ít bịa hơn</td><td>trả lời bằng số liệu từ cơ sở dữ liệu, phân tích dữ liệu</td></tr><tr><td>Rủi ro chính</td><td><b-tag-inline kind="no">sửa nhầm cấu hình</b-tag-inline></td><td><b-tag-inline kind="no">ghi vào production, dữ liệu của người khác</b-tag-inline></td></tr></tbody></table>
</b-table-plain>
<b-finding>
  <ex k="Mã">Tác nhân thôi bịa ra các phương thức và thuộc tính không có trong cấu hình.</ex>
  <gen k="Dữ liệu">Tác nhân trả lời từ cơ sở dữ liệu, nghĩa là nó cũng có thể thay đổi dữ liệu. Chính ở đây cần các quy tắc truy cập.</gen>
  <do k="Làm gì">Bắt đầu từ mã: an toàn hơn. Chỉ bật truy cập dữ liệu theo sơ đồ bên dưới, ngay cả khi server làm được cả hai.</do>
</b-finding>
</b-chapter>
<b-chapter id="specifics" icon="form" title="1C khác biệt thế nào đối với tác nhân AI">
<b-why align="left">Vibe coding trong 1C khác với các ngôn ngữ thông thường: chương trình nằm trong cơ sở dữ liệu và trong các trình thiết kế trực quan, còn mã chỉ là một phần. Sơ đồ cho thấy đường đi của chương trình từ máy của <a href="/materials/glossary/ai-agent/">tác nhân AI</a> đến production trong <a href="/materials/glossary/gitlab/">GitLab</a> và trong 1C.</b-why>
<b-lane title="Đường đi của chương trình: cục bộ, kiểm thử, production" color="accent">
<b-scene names="mcp-1c/pipeline"/>
</b-lane>
<b-rules-fixed cols="3" top="12" sw="1.8">
  <rule icon="monitor-hm" t="Cục bộ">Trong GitLab, <a href="/materials/glossary/ai-agent/">tác nhân</a> sửa tệp và chạy test ngay. Trong 1C nó sửa bản dump và chỉ kiểm tra được sau khi nạp vào một cơ sở dữ liệu, cục bộ hoặc kiểm thử.</rule>
  <rule icon="git-fork" t="Phiên bản">Trong GitLab, các phiên bản nằm trong git repository kèm <a href="/materials/glossary/checks/">kiểm tra</a>. Trong 1C chúng nằm trong kho cấu hình (configuration repository); git có thể dùng nhưng không bắt buộc.</rule>
  <rule icon="cylinder-hm" t="Kiểm thử và production">Trong GitLab, chương trình và dữ liệu được tách riêng. Trong 1C mỗi môi trường có cơ sở dữ liệu riêng chứa cả hai: cập nhật production nghĩa là cập nhật cơ sở dữ liệu production.</rule>
</b-rules-fixed>
</b-chapter>
<b-chapter id="breaks" icon="alert" title="Tác nhân AI hỏng ở đâu trong 1C và vì sao">
<b-why align="left">Chọn một mục để xem điều gì hỏng và điều gì giúp ngay dưới sơ đồ. Năm đặc thù được bàn nhiều nhất trong các nhóm chat của lập trình viên 1C, mục thứ sáu nói về MCP.</b-why>
<b-lane title="Điều gì hỏng và ở đâu" color="warn">
<b-scene names="mcp-1c/breaks"/>
<b-pick-tabs id="brk" tone="warn">
  <tab t="Yếu về 1C">
    <b-pick-cell k="Đặc thù" t="Mô hình biết ngôn ngữ 1C và thư viện chuẩn của nó kém"/>
    <b-pick-cell k="Điều gì hỏng" tone="warn">phương thức bịa ra, cú pháp SQL thay cho ngôn ngữ truy vấn của 1C</b-pick-cell>
    <b-pick-cell k="Điều gì giúp" tone="accent">trợ giúp của nền tảng qua MCP, 2–3 mẫu từ chính cấu hình của hãng</b-pick-cell>
  </tab>
  <tab t="Tệp ≠ cơ sở dữ liệu">
    <b-pick-cell k="Đặc thù" t="Không thể sửa các tệp dịch vụ như văn bản"/>
    <b-pick-cell k="Điều gì hỏng" tone="warn">dự án lệch khỏi cơ sở dữ liệu, việc nạp treo hàng giờ</b-pick-cell>
    <b-pick-cell k="Điều gì giúp" tone="accent">chỉ sửa qua MCP server, chặn ghi trực tiếp</b-pick-cell>
  </tab>
  <tab t="Form bằng chuột">
    <b-pick-cell k="Đặc thù" t="Form, báo cáo và mẫu in được dựng bằng chuột"/>
    <b-pick-cell k="Điều gì hỏng" tone="warn">tác nhân không nối sự kiện, để lại báo cáo rỗng, mẫu in không thay đổi</b-pick-cell>
    <b-pick-cell k="Điều gì giúp" tone="accent">khung dựng bằng tay, chỉ giao mã cho tác nhân; ảnh chụp form để kiểm tra</b-pick-cell>
  </tab>
  <tab t="Nạp chậm">
    <b-pick-cell k="Đặc thù" t="Vòng kiểm tra chậm"/>
    <b-pick-cell k="Điều gì hỏng" tone="warn">cập nhật cơ sở dữ liệu mất hàng chục phút, tác nhân bỏ giữa chừng và báo cáo quá sớm</b-pick-cell>
    <b-pick-cell k="Điều gì giúp" tone="accent">cập nhật chạy nền, test trên một server riêng</b-pick-cell>
  </tab>
  <tab t="Sai phần mở rộng">
    <b-pick-cell k="Đặc thù" t="Cấu hình của hãng đang được hỗ trợ, thay đổi nằm trong phần mở rộng"/>
    <b-pick-cell k="Điều gì hỏng" tone="warn">tác nhân ghi vào cấu hình chính, kéo thêm các đối tượng mượn thừa</b-pick-cell>
    <b-pick-cell k="Điều gì giúp" tone="accent">dự án phần mở rộng được nêu trong quy tắc của tác nhân, dự án chính bị đóng</b-pick-cell>
  </tab>
  <tab t="Bỏ qua bước thử">
    <b-pick-cell k="Đặc thù" t="Ghi vào production qua MCP"/>
    <b-pick-cell k="Điều gì hỏng" tone="warn">thay đổi bỏ qua kho và bước thử, rơi thẳng vào dữ liệu thật</b-pick-cell>
    <b-pick-cell k="Điều gì giúp" tone="accent">production chỉ đọc, việc ghi đi vào cơ sở dữ liệu kiểm thử</b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-finding>
  <ex k="Khác biệt">Trong 1C, tác nhân cần một trung gian: IDE, trợ giúp và một nền tảng đang chạy. Thiếu chúng, nó sửa thứ mà nó không nhìn thấy.</ex>
  <gen k="Kích thước">Cấu hình của hãng rất lớn, module dài 15–26 nghìn dòng. Tác nhân được cấp tính năng tìm kiếm trong cấu hình và chỉ đọc phần cần thiết.</gen>
  <do k="Làm gì">Bắt đầu từ mã và truy vấn; để form và báo cáo cho con người cho đến khi tác nhân cho kết quả ổn định.</do>
</b-finding>
</b-chapter>
<b-chapter id="servers" icon="cylinder-alt" title="MCP server miễn phí cho 1C và 1C:EDT">
<b-why align="left">Có nhiều server làm sẵn và chúng thay đổi nhanh. Trước khi kết nối một server, hãy đọc xem nó hỗ trợ những hành động nào: chỉ đọc hay cả ghi.</b-why>
<b-source-rows wide>
  <row t="mcp-1c" note="Mã và dữ liệu" href="https://github.com/feenlace/mcp-1c" link="GitHub">Cấu trúc cấu hình, tìm kiếm mã, trợ giúp về ngôn ngữ và truy vấn dữ liệu chỉ đọc</row>
  <row t="1c_mcp" note="Mã và dữ liệu" href="https://github.com/vladimir-kharin/1c_mcp" link="GitHub">Bộ công cụ để dựng MCP server riêng ngay trong 1C dưới dạng phần mở rộng cấu hình: cấu hình có sẵn, dữ liệu qua công cụ do bạn viết</row>
  <row t="1c-mcp-toolkit" note="Dữ liệu" href="https://github.com/ROCTUP/1c-mcp-toolkit" link="GitHub">Kết nối với cơ sở dữ liệu qua bộ xử lý dữ liệu ngoài, không thay đổi cấu hình</row>
  <row t="EDT-MCP" note="Mã" href="https://github.com/DitriXNew/EDT-MCP" link="GitHub">Plugin cho 1C:EDT: tác nhân làm việc với dự án qua các công cụ của IDE</row>
  <row t="MCP:RSV Data" note="Dữ liệu" href="https://infostart.ru/1c/articles/2720241/" link="Infostart">Phần mở rộng cho dữ liệu và metadata của mọi cấu hình: chỉ đọc, và chỉ những gì người dùng hiện tại thấy được</row>
  <row t="bsl-ai-toolkit" note="Mã" href="https://github.com/vgtitov/bsl-ai-toolkit" link="GitHub">Quy tắc, skill và server để tác nhân làm việc dựa trên mã của bạn</row>
  <row t="1c-mcp catalog" note="Danh mục" href="https://github.com/Untru/1c-mcp" link="GitHub">Các server theo nhóm: IDE, cơ sở dữ liệu, mã, trợ giúp, test</row>
  <row t="1C AI Dev Tools" note="Danh mục" href="https://aitools1c.dev" link="Website">Danh mục server, skill và tích hợp cho phát triển 1C với AI</row>
</b-source-rows>
<b-finding>
  <ex k="Lựa chọn">Mã đi trước, dữ liệu là bước thứ hai, riêng biệt.</ex>
  <gen k="Kiểm tra">Danh sách công cụ của server chính là danh sách những gì tác nhân sẽ làm được với cơ sở dữ liệu.</gen>
  <do k="Làm gì">Liệt kê các công cụ của server và đánh dấu công cụ nào thay đổi dữ liệu.</do>
</b-finding>
</b-chapter>
<b-chapter id="cases" icon="alert-alt" title="Điều gì hỏng trong thực tế">
<b-why align="left">Các nhóm chat mở của lập trình viên 1C mô tả những trường hợp tương tự. Dưới đây được kể lại bằng lời văn riêng, không nêu tên. Đây là các ví dụ từ thực tế: từng trường hợp không kiểm chứng được. Chọn một trường hợp: sơ đồ cho thấy nó xảy ra ở đâu, thẻ cho thấy vì sao và cách phòng ngừa.</b-why>
<b-lane title="Các trường hợp từ thực tế" color="warn">
<b-scene names="mcp-1c/cases"/>
<b-pick-tabs id="cs" tone="warn">
  <tab t="Production">
    <b-pick-cell k="Chuyện gì xảy ra" t="Làm hỏng cơ sở dữ liệu production">Tác nhân được cấp quyền ghi vào production để làm nhanh hơn. Thay đổi rơi vào sổ kế toán thật và phải khôi phục từ bản sao lưu.</b-pick-cell>
    <b-pick-cell k="Vì sao" tone="warn">Không có cơ sở dữ liệu kiểm thử giữa tác nhân và dữ liệu thật; việc ghi vào production được mở.</b-pick-cell>
    <b-pick-cell k="Phòng ngừa" tone="accent">Production chỉ đọc. Tác nhân ghi vào cơ sở dữ liệu kiểm thử; con người chuyển thay đổi sau khi review.</b-pick-cell>
  </tab>
  <tab t="Một trăm cơ sở dữ liệu">
    <b-pick-cell k="Chuyện gì xảy ra" t="Xóa danh sách một trăm cơ sở dữ liệu">Tác nhân dọn dẹp server và xóa các thứ thừa, trong đó có danh sách các cơ sở dữ liệu đang chạy.</b-pick-cell>
    <b-pick-cell k="Vì sao" tone="warn">Tài khoản có quyền quản trị server, trong khi tác vụ chỉ liên quan một cơ sở dữ liệu.</b-pick-cell>
    <b-pick-cell k="Phòng ngừa" tone="accent">Một người dùng riêng cho tác vụ, chỉ có quyền với một cơ sở dữ liệu, không có quyền quản trị server.</b-pick-cell>
  </tab>
  <tab t="Dữ liệu của người khác">
    <b-pick-cell k="Chuyện gì xảy ra" t="Đưa dữ liệu của giám đốc cho kế toán">Một tác nhân MCP trả lời nhân viên. Một kế toán nhận được số liệu mà họ không được phép xem.</b-pick-cell>
    <b-pick-cell k="Vì sao" tone="warn">Server vào cơ sở dữ liệu dưới một người dùng chung với đầy đủ quyền, nên vai trò và hạn chế của 1C không được áp dụng.</b-pick-cell>
    <b-pick-cell k="Phòng ngừa" tone="accent">Đăng nhập dưới danh nghĩa người đang hỏi: khi đó vai trò và hạn chế ở mức bản ghi của họ được áp dụng.</b-pick-cell>
  </tab>
  <tab t="Mật khẩu trong log">
    <b-pick-cell k="Chuyện gì xảy ra" t="Mật khẩu và khóa nằm trong log">Mật khẩu cơ sở dữ liệu được đưa cho tác nhân ngay trong yêu cầu. Nó còn lại trong log các lần gọi và lịch sử chat.</b-pick-cell>
    <b-pick-cell k="Vì sao" tone="warn">Bí mật được đưa vào tham số của công cụ và nằm trong các tệp cạnh dự án.</b-pick-cell>
    <b-pick-cell k="Phòng ngừa" tone="accent">Bí mật chỉ nằm trong cài đặt của server, không bao giờ cho tác nhân thấy. Các thư mục chứa khóa bị đóng với tác nhân.</b-pick-cell>
  </tab>
  <tab t="“Xong”">
    <b-pick-cell k="Chuyện gì xảy ra" t="“Xong”, nhưng không có gì thay đổi">Tác nhân thêm một thuộc tính và báo là xong. Ở chế độ người dùng không có gì thay đổi: cơ sở dữ liệu không được cập nhật sau khi sửa.</b-pick-cell>
    <b-pick-cell k="Vì sao" tone="warn">Báo cáo của tác nhân được chấp nhận mà không kiểm tra kết quả.</b-pick-cell>
    <b-pick-cell k="Phòng ngừa" tone="accent">Sau khi sửa: cập nhật cơ sở dữ liệu, kiểm tra lỗi và một autotest. “Xong” chỉ khi kèm liên kết tới kết quả.</b-pick-cell>
  </tab>
  <tab t="Câu trả lời sai">
    <b-pick-cell k="Chuyện gì xảy ra" t="Truy vấn không lỗi nhưng câu trả lời sai">Tác nhân viết một truy vấn chạy không lỗi, nhưng số liệu không khớp với báo cáo của 1C.</b-pick-cell>
    <b-pick-cell k="Vì sao" tone="warn">Mô hình hiểu kém về thanh ghi và kỳ của 1C và viết truy vấn như cho một cơ sở dữ liệu thông thường.</b-pick-cell>
    <b-pick-cell k="Phòng ngừa" tone="accent">Đối chiếu với báo cáo chuẩn của 1C, hoặc trả lời qua báo cáo có sẵn thay vì truy vấn tự viết.</b-pick-cell>
  </tab>
  <tab t="Dữ liệu lên đám mây">
    <b-pick-cell k="Chuyện gì xảy ra" t="Dữ liệu cá nhân bị đưa lên đám mây">Tác nhân nhận một bản dump chứa hộ chiếu và lương, và nó được gửi tới một mô hình trên đám mây.</b-pick-cell>
    <b-pick-cell k="Vì sao" tone="warn">Tác nhân nhận toàn bộ cơ sở dữ liệu thay vì chỉ các trường cần thiết.</b-pick-cell>
    <b-pick-cell k="Phòng ngừa" tone="accent">Ẩn danh hóa và chỉ các trường cần thiết. Với dữ liệu nhạy cảm, dùng mô hình nằm trong phạm vi của bạn.</b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-finding>
  <ex k="Điểm chung">Hầu hết các trường hợp đều xoay quanh quyền và kiểm tra. Mô hình chỉ là thứ yếu ở đây.</ex>
  <gen k="Nguyên nhân">Tác nhân có quyền ngang quản trị viên, và báo cáo của nó được tin ngay.</gen>
  <do k="Làm gì">Xem lần lượt các trường hợp và đánh dấu những biện pháp phòng ngừa bạn đã có.</do>
</b-finding>
</b-chapter>
<b-chapter id="scheme" icon="shield-check" title="Sơ đồ an toàn">
<b-why align="left">Tác nhân chỉ đọc cơ sở dữ liệu production. Nó ghi vào cơ sở dữ liệu kiểm thử. Con người chuyển thay đổi lên production sau khi review.</b-why>
<b-lane title="Đọc tách khỏi ghi" color="accent">
<b-scene names="mcp-1c/safe-scheme"/>
<b-pick-tabs id="sf" tone="accent">
  <tab t="Đọc">
    <b-pick-cell k="Bước" t="Tác nhân đọc">Dữ liệu và mã của production, để trả lời và phân tích.</b-pick-cell>
    <b-pick-cell k="Ở đâu" tone="accent">Production, dưới người dùng 1C riêng với vai trò chỉ đọc.</b-pick-cell>
    <b-pick-cell k="Vì sao">Tác nhân thấy dữ liệu thật nhưng không thể thay đổi nó.</b-pick-cell>
  </tab>
  <tab t="Ghi">
    <b-pick-cell k="Bước" t="Tác nhân ghi">Mã, metadata và chứng từ.</b-pick-cell>
    <b-pick-cell k="Ở đâu" tone="accent">Cơ sở dữ liệu kiểm thử hoặc <a href="/materials/glossary/sandbox/">sandbox</a> có bản sao của production.</b-pick-cell>
    <b-pick-cell k="Vì sao">Lỗi nằm lại trong cơ sở dữ liệu kiểm thử và không bao giờ đến sổ sách.</b-pick-cell>
  </tab>
  <tab t="Kiểm tra và chuyển">
    <b-pick-cell k="Bước" t="Kiểm tra và chuyển">Autotest, rồi con người review các thay đổi.</b-pick-cell>
    <b-pick-cell k="Ở đâu" tone="accent">Thay đổi đi vào kho, production được cập nhật từ kho đó.</b-pick-cell>
    <b-pick-cell k="Vì sao">Chỉ các thay đổi đã kiểm tra mới đến production, và mỗi thay đổi có một phiên bản.</b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-finding>
  <ex k="Sơ đồ">Lỗi của tác nhân nằm lại trong cơ sở dữ liệu kiểm thử và không bao giờ đến sổ sách.</ex>
  <gen k="Chi phí">Cần một cơ sở dữ liệu kiểm thử bên cạnh production. Điều đó rẻ hơn một lần khôi phục từ bản sao lưu.</gen>
  <do k="Làm gì">Dựng <a href="/materials/glossary/test-stand/">môi trường kiểm thử</a> với bản sao cơ sở dữ liệu trước khi kết nối server dữ liệu.</do>
</b-finding>
</b-chapter>
<b-chapter id="rights" icon="key" title="Quyền: thang truy cập">
<b-why align="left">Quyền của tác nhân được xây theo từng bậc: bậc tiếp theo chỉ mở khi bậc trước chạy không có bất ngờ. <a href="/materials/glossary/permissions/">Quyền của tác nhân là gì</a></b-why>
<b-lane title="Thang truy cập" color="accent">
<b-scene names="mcp-1c/rights"/>
<b-pick-tabs id="rt" tone="accent">
  <tab t="Đọc mã">
    <b-pick-cell k="Tác nhân làm được gì" t="Đọc mã">Module, metadata, form.</b-pick-cell>
    <b-pick-cell k="Khi nào mở" tone="accent">Ngay lập tức.</b-pick-cell>
    <b-pick-cell k="Cách thiết lập">Một server có quyền truy cập bản dump cấu hình hoặc dự án EDT, không truy cập cơ sở dữ liệu.</b-pick-cell>
  </tab>
  <tab t="Đọc dữ liệu">
    <b-pick-cell k="Tác nhân làm được gì" t="Đọc dữ liệu">Truy vấn và báo cáo dưới người dùng 1C riêng.</b-pick-cell>
    <b-pick-cell k="Khi nào mở" tone="accent">Trên bản sao cơ sở dữ liệu, sau khi việc đọc mã không gây bất ngờ.</b-pick-cell>
    <b-pick-cell k="Cách thiết lập">Người dùng 1C với vai trò chỉ đọc; công cụ “chạy mã tùy ý” bị tắt.</b-pick-cell>
  </tab>
  <tab t="Ghi vào kiểm thử">
    <b-pick-cell k="Tác nhân làm được gì" t="Ghi vào kiểm thử">Mã, metadata, chứng từ.</b-pick-cell>
    <b-pick-cell k="Khi nào mở" tone="accent">Khi đã có autotest.</b-pick-cell>
    <b-pick-cell k="Cách thiết lập">Một cơ sở dữ liệu kiểm thử riêng; kiểm tra lỗi và autotest sau mỗi lần sửa.</b-pick-cell>
  </tab>
  <tab t="Ghi vào production">
    <b-pick-cell k="Tác nhân làm được gì" t="Ghi vào production">Không gì cả: bậc này đóng với tác nhân.</b-pick-cell>
    <b-pick-cell k="Khi nào mở" tone="accent">Không bao giờ — chỉ con người.</b-pick-cell>
    <b-pick-cell k="Cách thiết lập">Con người chuyển thay đổi qua kho sau khi review.</b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-rules-fixed cols="2" sw="1.8">
  <rule icon="user" t="Người dùng 1C riêng">Tác nhân đăng nhập bằng một người dùng riêng hoặc dưới danh nghĩa người đã hỏi. Khi đó các quyền thông thường và hạn chế ở mức bản ghi được áp dụng.</rule>
  <rule icon="eye-wide-hm" t="Vai trò chỉ đọc">Với production, dùng vai trò không có quyền ghi hay ghi sổ chứng từ. Ví dụ: trong mcp-1c, các truy vấn cơ sở dữ liệu được thiết kế chỉ để đọc.</rule>
  <rule icon="prompt" t="Không chạy mã tùy ý">Tắt công cụ “chạy mã tùy ý” trên production: nó vượt qua mọi quyền.</rule>
  <rule icon="lock-alt" t="Bí mật để riêng">Mật khẩu và khóa nằm trong cài đặt của server. Chúng không bao giờ được cho tác nhân thấy hay truyền trong yêu cầu.</rule>
</b-rules-fixed>
<b-finding>
  <ex k="Dữ liệu thành lệnh">Một ghi chú trong chứng từ hoặc một email trong cơ sở dữ liệu có thể chứa chỉ thị cho tác nhân. Đó là <a href="/materials/glossary/prompt-injection/">tấn công chèn prompt (prompt injection)</a>, và quyền hạn giới hạn thiệt hại của nó.</ex>
  <gen k="Quy tắc">Tác nhân có quyền của một người dùng thông thường. Điều người dùng không làm được thì tác nhân cũng không làm được.</gen>
  <do k="Làm gì">Cách phân biệt dữ liệu với lệnh được trình bày <a href="/blog/data-plane-control-plane-prompt-injection/">trong bài về prompt injection</a>.</do>
</b-finding>
</b-chapter>
<b-chapter id="check" icon="check-square" title="Kiểm tra kết quả">
<b-why align="left">“Xong” của tác nhân chỉ là một tuyên bố. Các phép kiểm tra và <a href="/materials/glossary/human-in-the-loop/">con người trong vòng lặp</a> xác nhận nó.</b-why>
<b-lane title="Bốn phép kiểm tra trước khi nhận kết quả" color="accent">
<b-scene names="mcp-1c/checks"/>
<b-pick-tabs id="ck" tone="accent">
  <tab t="Lỗi IDE">
    <b-pick-cell k="Phép kiểm tra" t="Kiểm tra lỗi của IDE"/>
    <b-pick-cell k="Bắt được gì" tone="warn">Cú pháp, phương thức và thuộc tính không tồn tại.</b-pick-cell>
    <b-pick-cell k="Chạy thế nào" tone="accent">Sau mỗi lần sửa; tác nhân nêu kết quả kiểm tra trong báo cáo.</b-pick-cell>
  </tab>
  <tab t="Autotest">
    <b-pick-cell k="Phép kiểm tra" t="Autotest"/>
    <b-pick-cell k="Bắt được gì" tone="warn">Một kịch bản thất bại, một form không mở.</b-pick-cell>
    <b-pick-cell k="Chạy thế nào" tone="accent">Test kịch bản và unit test trên cơ sở dữ liệu kiểm thử ở mỗi vòng.</b-pick-cell>
  </tab>
  <tab t="Đối chiếu với 1C">
    <b-pick-cell k="Phép kiểm tra" t="Đối chiếu với báo cáo của 1C"/>
    <b-pick-cell k="Bắt được gì" tone="warn">Số liệu của tác nhân không khớp với sổ sách.</b-pick-cell>
    <b-pick-cell k="Chạy thế nào" tone="accent">Cùng kỳ và cùng công ty trong báo cáo chuẩn; lệch nghĩa là dừng.</b-pick-cell>
  </tab>
  <tab t="Con người">
    <b-pick-cell k="Phép kiểm tra" t="Con người review các thay đổi"/>
    <b-pick-cell k="Bắt được gì" tone="warn">Sửa nhầm chỗ, đối tượng mượn thừa, công cụ bị đi vòng.</b-pick-cell>
    <b-pick-cell k="Chạy thế nào" tone="accent">So sánh thay đổi trước khi chuyển: chỉ phần mở rộng, chỉ các đối tượng cần thiết.</b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-finding>
  <ex k="Lỗi thường gặp">Tác nhân sửa tệp cấu hình đi vòng qua công cụ của IDE, và dự án lệch khỏi cơ sở dữ liệu.</ex>
  <gen k="Quy tắc">Mỗi “xong” đều có một phép kiểm tra hoặc liên kết tới kết quả làm chứng.</gen>
  <do k="Làm gì">Thêm vào quy tắc của tác nhân: sau khi sửa, chạy kiểm tra lỗi và nêu kết quả.</do>
</b-finding>
</b-chapter>
<b-chapter id="agents" icon="prompt" title="Claude Code, Codex và Cursor cho 1C">
<b-why align="left">MCP server cho 1C kết nối với mọi tác nhân hỗ trợ MCP. Chỉ nơi thiết lập là khác nhau.</b-why>
<b-section-h3 top="4">Kết nối trong 3 bước</b-section-h3>
<b-step-chain>
  <node t="1. Chọn server">Cho mã hoặc cho dữ liệu, từ danh sách trên</node>
  <node t="2. Giao cho tác nhân">“Kết nối MCP server cho 1C theo README của nó”</node>
  <node t="3. Thử trên bản sao">Yêu cầu danh sách công cụ và tra cứu một danh mục</node>
</b-step-chain>
<b-lane title="Thiết lập ở đâu" color="accent">
<b-scene names="mcp-1c/agents"/>
<b-pick-tabs id="ag" tone="accent">
  <tab t="Claude Code">
    <b-pick-cell k="Thiết lập ở đâu">lệnh <code>claude mcp add</code></b-pick-cell>
    <b-pick-cell k="Cho nhóm" tone="accent"><code>.mcp.json</code> trong repository</b-pick-cell>
    <b-pick-cell k="Tài liệu"><a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">MCP trong Claude Code</a></b-pick-cell>
  </tab>
  <tab t="Codex">
    <b-pick-cell k="Thiết lập ở đâu"><code>~/.codex/config.toml</code> hoặc <code>.codex/config.toml</code> trong dự án</b-pick-cell>
    <b-pick-cell k="Cho nhóm" tone="accent"><code>.codex/config.toml</code> trong dự án đã được tin cậy</b-pick-cell>
    <b-pick-cell k="Tài liệu"><a href="https://learn.chatgpt.com/docs/extend/mcp?surface=cli" target="_blank" rel="noopener">MCP trong Codex</a></b-pick-cell>
  </tab>
  <tab t="Cursor">
    <b-pick-cell k="Thiết lập ở đâu">tệp <code>mcp.json</code></b-pick-cell>
    <b-pick-cell k="Cho nhóm" tone="accent">kho server của nhóm</b-pick-cell>
    <b-pick-cell k="Tài liệu"><a href="https://cursor.com/docs/mcp" target="_blank" rel="noopener">MCP trong Cursor</a></b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-finding>
  <ex k="Điểm chung">Quyền do server và người dùng 1C quyết định. Sơ đồ ở trên dùng được với cả ba.</ex>
  <gen k="Xác nhận">Giữ bước xác nhận cho các công cụ thay đổi dữ liệu.</gen>
  <do k="Làm gì">Giao việc thiết lập cho chính tác nhân, như mô tả <a href="/blog/mcp-agent-access/#connect">trong bài về MCP</a>.</do>
</b-finding>
</b-chapter>
<b-chapter id="start" icon="flag-alt" title="Bắt đầu từ đâu">
<b-why align="left">Ba bước. Mỗi bước tiếp theo chỉ đến sau khi bước trước chạy không có bất ngờ.</b-why>
<b-lane-art names="mcp-1c/start-steps"/>
<b-finding>
  <ex k="Tuần 1">Server mã và đọc dữ liệu trên bản sao cơ sở dữ liệu. Kiểm tra bằng tay 5 câu trả lời của tác nhân.</ex>
  <gen k="Tuần 2">Ghi vào cơ sở dữ liệu kiểm thử và autotest. Tác nhân nêu rõ nó đã kiểm tra gì.</gen>
  <do k="Sau đó">Production vẫn chỉ đọc. Việc chuyển thay đổi do con người làm.</do>
</b-finding>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Kết nối tác nhân AI với 1C như thế nào?">Qua MCP server cho 1C, cầu nối tới mã cấu hình và dữ liệu trong cơ sở dữ liệu. Cách này dùng được cho Claude Code, Codex và Cursor.</q>
    <q t="Làm sao để không làm hỏng cơ sở dữ liệu 1C đang chạy?">Tác nhân chỉ đọc cơ sở dữ liệu đang chạy dưới một người dùng không có quyền ghi, sửa trên bản sao kiểm thử, và con người chuyển thay đổi lên cơ sở dữ liệu chính qua repository sau khi review.</q>
    <q t="Tác nhân nên có quyền gì trong 1C?">Theo thang truy cập: bắt đầu với chỉ đọc và nâng quyền từng bước chỉ khi tác vụ cần.</q>
    <q t="Có MCP server miễn phí cho 1C không?">Có, bài viết nêu các MCP server miễn phí cho 1C và 1C:EDT cùng điều gì hỏng ở chúng trong thực tế.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" icon="arrow-right" title="Đọc tiếp">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="Kết nối" t="MCP cho tác nhân AI">cách kết nối và giao việc đó cho tác nhân</item>
    <item href="/blog/data-plane-control-plane-prompt-injection/" k="Bảo mật" t="Dữ liệu và lệnh">cách phòng thủ trước prompt injection</item>
    <item href="/blog/mcp-scopes/" k="Phạm vi" t="Phạm vi của MCP">nơi lưu cấu hình server</item>
  </b-links>
</b-chapter>
<b-footer>Các trường hợp được kể lại từ những cuộc thảo luận mở giữa lập trình viên 1C, không nêu tên và không trích dẫn. Đây là các ví dụ từ thực tế, và từng trường hợp không kiểm chứng được. Các quy tắc phòng ngừa là kinh nghiệm của tác giả.</b-footer>
</b-post>
