---
title: MCP cho tác nhân AI (AI agent): giải quyết vấn đề gì và cách giao việc thiết lập cho chính tác nhân
date: 2026-10-04
updated: 2026-11-08
unrelated: mcp-1c
description: MCP nối tác nhân vào GitLab, Jira, Confluence và bản ghi cuộc họp. Nó giải quyết vấn đề gì, thiết lập trong vài phút và giao việc đó cho chính tác nhân ra sao, tiết kiệm thời gian và token thế nào và vì sao tác nhân bịa ít hơn.
tags: AI, tác nhân, MCP, Jira, ngữ cảnh, ảo giác, token, harness
category: harness
layout: wide
mentions: Model Context Protocol, MCP, AI agent, Claude Code, Jira, Airtable, hallucinations, tokens, permissions, prompt injection
toc: what=Là gì | ours=Ngữ cảnh | connect=Kết nối | saving=Tiết kiệm | facts=Dữ kiện | risks=Rủi ro | first=Bắt đầu từ đâu | cases=Tình huống | faq=Câu hỏi | next=Đọc tiếp
---

MCP nối tác nhân AI (AI agent) vào các hệ thống đang làm việc, để nó đọc dữ kiện từ nguồn thay vì từ lời kể lại. Việc này dễ và nhanh: chỉ cần hiểu nó giải quyết vấn đề gì và giao việc thiết lập cho chính tác nhân. Bên dưới: ý tưởng, cách kết nối, MCP mang lại gì và nên cấp những quyền nào. Ví dụ QA với MCP có trong bài [QA cùng tác nhân qua MCP](/blog/bug-report-to-reproduction-agent/#mcp).

<b-post series="harness">
<b-chapter id="what" icon="plug" title="MCP là gì">
<b-why align="left">MCP là một đầu cắm chung, như USB. Nối tác nhân với Jira hoặc GitLab và nó tự lấy dữ liệu từ đó. <a href="https://modelcontextprotocol.io/docs/getting-started/intro" target="_blank" rel="noopener">Chi tiết</a></b-why>
<b-why align="left">Hình vẽ hai đường đi của dữ liệu. Ở đường thứ nhất, một người kể lại nhiệm vụ cho tác nhân, và chi tiết rơi rụng dọc đường. Ở đường thứ hai, tác nhân tự đọc hệ thống qua MCP và thấy mọi thứ mà con người thấy. MCP (Model Context Protocol) là một chuẩn mở nối các ứng dụng AI với hệ thống bên ngoài<b-proof href="https://modelcontextprotocol.io/docs/getting-started/intro" quote="MCP (Model Context Protocol) is an open-source standard for connecting AI applications to external systems."/>. Tác nhân có MCP client, hệ thống có MCP server, và server cho tác nhân biết có những dữ liệu và hành động nào.</b-why>
<b-lane title="Lời kể lại hay chính hệ thống" color="accent">
<b-scene names="mcp-agent-access/retell-vs-mcp"/>
</b-lane>
<b-finding>
  <ex>Trong Jira, tác nhân thấy những gì con người thấy: chính nhiệm vụ PAY-142, các bình luận và lịch sử thay đổi. Không cần tìm nhiệm vụ rồi chép vào cuộc trò chuyện. Nó kéo các nhiệm vụ liên quan khi được yêu cầu. Nó có thể bình luận thay bạn, tạo nhiệm vụ hoặc đổi trạng thái (sau khi bạn xác nhận). Lần đầu dùng, bạn nên thấy một tiếng “wow”: nghĩa là đã thiết lập đúng. Và việc này rất đơn giản.</ex>
  <gen>Tác nhân nhìn rộng hơn con người: nó cân nhắc các nhiệm vụ lân cận, bài trong cơ sở tri thức và các quyết định cũ, rồi tìm ra những hướng đi không hiển nhiên mà riêng một nhiệm vụ không cho thấy. Không có MCP, nó chỉ biết những gì được dán vào. Con người thôi làm người chuyển phát giữa các cửa sổ và ở lại vai người duyệt.</gen>
  <do k="Việc cần làm">Bắt đầu từ hệ thống theo dõi nhiệm vụ: khởi đầu dễ và nhanh nhất. Cách kết nối Jira: <a href="#connect">xem bên dưới</a>. Cũng nên đếm một ngày bạn chép văn bản vào cuộc trò chuyện bao nhiêu lần: đó là danh sách ứng viên để kết nối.</do>
</b-finding>
</b-chapter>
<b-chapter id="ours" icon="target-ring" title="Ngữ cảnh của tác nhân và các ngữ cảnh khác">
<b-why align="left">Ngữ cảnh của tác nhân là mọi thứ nó thấy cùng lúc (cuộc trò chuyện với tác nhân, các file dự án). Các ngữ cảnh khác là mọi thứ còn lại (GitLab, Jira, bản ghi cuộc họp, cơ sở tri thức). Cây cầu giữa chúng là MCP: tác nhân có MCP client và hệ thống có MCP server.</b-why>
<b-lane-art names="mcp-agent-access/contexts"/>
<b-why align="left">Bên trái hình là ngữ cảnh của tác nhân: cuộc trò chuyện với nó và các file dự án nó thấy cùng lúc. Bên phải là các hệ thống khác: GitLab, Jira, tldv với bản ghi cuộc họp, Confluence với cơ sở tri thức. Khi chưa kết nối MCP, tác nhân không thấy chúng. Cây cầu giữa hai bên có hai phần: MCP client ở phía tác nhân và MCP server ở phía hệ thống.</b-why>
<b-section-h3 top="18">Ngữ cảnh là gì</b-section-h3>
<b-why align="left"><a href="/materials/glossary/context/">Ngữ cảnh</a> là mọi thứ mô hình thấy tại thời điểm đó. Cái gì không có trong ngữ cảnh thì tác nhân không biết.</b-why>
<b-lane title="Ngữ cảnh" color="accent" top="12">
<b-scene names="term:context"/>
</b-lane>
<b-why align="left">Có thể hình dung ngữ cảnh như một chiếc bàn đặt mọi thứ mô hình đang thấy: tin nhắn trong cuộc trò chuyện, các file đang mở, kết quả các lần gọi. Cái gì không nằm trên bàn thì với mô hình là không tồn tại, cho đến khi được đặt lên. Vì vậy câu hỏi chính khi làm việc với tác nhân là trên bàn của nó có gì.</b-why>
<b-table-plain>
<table><thead><tr><th>Dữ kiện nằm ở đâu</th><th>Tác nhân thấy nó</th><th>Điều xảy ra</th></tr></thead><tbody><tr><td><b>Ngữ cảnh của tác nhân</b>: cuộc trò chuyện, file dự án</td><td><b-tag-inline kind="ok">ngay lập tức</b-tag-inline></td><td>câu trả lời từ dữ liệu</td></tr><tr><td><b>Ngữ cảnh khác</b>: GitLab, Jira, bản ghi cuộc họp</td><td><b-tag-inline kind="ok">qua MCP</b-tag-inline></td><td>tác nhân tự lấy thứ cần</td></tr><tr><td><b>Không ở đâu cả</b>: trong đầu người, trong hệ thống đóng</td><td><b-tag-inline kind="no">không</b-tag-inline></td><td>đoán thay cho dữ kiện</td></tr></tbody></table>
</b-table-plain>
<b-why align="left">Bảng cho thấy điều gì xảy ra với một dữ kiện tùy theo nơi nó nằm. Dữ kiện nằm trong ngữ cảnh của tác nhân (cuộc trò chuyện, file dự án): tác nhân trả lời từ dữ liệu. Dữ kiện nằm ở hệ thống khác (GitLab, Jira, bản ghi cuộc họp): tác nhân tự lấy, nhưng chỉ qua MCP. Dữ kiện không được ghi ở đâu (trong đầu mọi người, trong hệ thống đóng): tác nhân sẽ không thấy và thay nó bằng một phỏng đoán. Từ đó có quy tắc thực tế: ghi các quyết định vào nơi tác nhân lấy được.</b-why>
<b-section-h3 top="18">Tác nhân lấy ngữ cảnh khác thế nào: ReAct</b-section-h3>
<b-why align="left">Tác nhân làm việc theo vòng lặp <a href="/materials/glossary/react/">ReAct</a>: suy luận, hành động, đọc kết quả rồi suy luận tiếp. MCP là bước “hành động”: kết quả của lần gọi rơi vào ngữ cảnh của tác nhân.</b-why>
<b-lane title="ReAct" color="accent" top="12">
<b-scene names="term:react"/>
</b-lane>
<b-step-chain>
  <node t="Suy luận">“Mình cần các bước của lỗi PAY-142”</node>
  <node t="Hành động">Gọi server MCP của Jira</node>
  <node t="Đọc">Câu trả lời của Jira rơi vào ngữ cảnh</node>
</b-step-chain>
<b-rules-fixed cols="3" top="12">
  <rule t="Chỉ suy luận">Các ngữ cảnh khác đóng: mô hình tự bịa câu trả lời.</rule>
  <rule t="Chỉ hành động">Gọi mọi thứ không có kế hoạch và đốt token.</rule>
  <rule t="Xen kẽ">Lấy đúng thứ còn thiếu và trả lời từ dữ liệu.</rule>
</b-rules-fixed>
<b-why align="left">Một ví dụ về chu trình: tác nhân suy luận (“Mình cần các bước của lỗi PAY-142”), hành động (gọi server MCP của Jira), đọc câu trả lời (nó rơi vào ngữ cảnh) và trả lời từ dữ liệu. Ba thẻ cho thấy điều gì xảy ra khi chu trình bị đứt. Chỉ suy luận thì ra câu trả lời bịa, chỉ hành động thì ra các lần gọi thừa và tốn token, còn xen kẽ thì ra câu trả lời đúng từ dữ liệu.</b-why>
<b-section-h3 top="18">Neo vào dữ liệu: mỗi phần của câu trả lời đều có chỗ dựa</b-section-h3>
<b-why align="left">Câu trả lời được neo vào dữ liệu khi mỗi phần của nó đều đến từ ngữ cảnh. Phép đối ứng không có chỗ trống như vậy gọi là <a href="/materials/glossary/epimorphism/">toàn cấu (epimorphism)</a>.</b-why>
<b-lane title="Toàn cấu" color="accent" top="12">
<b-scene names="term:epimorphism"/>
</b-lane>
<b-table-plain>
<table><thead><tr><th>Phần của câu trả lời</th><th>Chỗ dựa</th></tr></thead><tbody><tr><td>Các bước tái hiện</td><td>Jira, phiếu PAY-142</td></tr><tr><td>Chỗ code lỗi</td><td>GitLab, file và dòng</td></tr><tr><td>Vì sao đã quyết định như vậy</td><td>tldv, bản ghi cuộc họp</td></tr></tbody></table>
</b-table-plain>
<b-why align="left">Bảng cho thấy việc kiểm tra chỗ dựa trên một ví dụ. Các bước tái hiện lấy từ phiếu Jira, chỗ code lỗi từ GitLab, lý do của quyết định từ bản ghi cuộc họp. Nếu một phần của câu trả lời không có chỗ dựa như vậy, nó được kiểm lại bằng tay.</b-why>
<b-section-h3 top="18">Ảo giác: phần không có chỗ dựa</b-section-h3>
<b-why align="left"><a href="/materials/glossary/hallucination/">Ảo giác (hallucination)</a> là một phỏng đoán tự tin ở chỗ không có chỗ dựa. Nó trông trơn tru y như câu trả lời từ dữ liệu. Chi tiết và lời khuyên của Anthropic có <a href="#facts">trong mục về ảo giác bên dưới</a>.</b-why>
<b-lane title="Ảo giác" color="accent" top="12">
<b-scene names="term:hallucination"/>
</b-lane>
<b-why align="left">Ảo giác trông trơn tru như câu trả lời từ dữ liệu, nên không thể phân biệt bằng giọng điệu. Chỉ chỗ dựa mới phân biệt được chúng: có hoặc không.</b-why>
<b-section-h3 top="18">Vì sao chọn những hệ thống này</b-section-h3>
<b-source-rows>
  <row t="GitLab" note="MCP chính thức" href="https://docs.gitlab.com/user/model_context_protocol/mcp_server/" miss="Tác nhân đoán code từ các ngữ cảnh khác và thường sai, đó là cách ảo giác xuất hiện; con người chép file và diff vào cuộc trò chuyện bằng tay">Code và merge request: tác nhân đọc code thật</row>
  <row t="Jira" note="MCP chính thức của Atlassian" href="https://support.atlassian.com/atlassian-rovo-mcp-server/docs/getting-started-with-the-atlassian-remote-mcp-server/" miss="Có nhiều thứ phải chép bằng tay và lịch sử thay đổi bị mất">Nhiệm vụ và yêu cầu: điều thực sự được đề nghị</row>
  <row t="Confluence" note="Cùng MCP của Atlassian" href="https://support.atlassian.com/atlassian-rovo-mcp-server/docs/getting-started-with-the-atlassian-remote-mcp-server/" miss="Mất đi cách hiển thị và trình bày yêu cầu mà mọi lập trình viên đã quen. Cần giới hạn tác nhân và không để nó đi lang thang quá xa: yêu cầu cũ có thể đã lỗi thời. Hãy bắt nó kiểm tra bức tranh thực tế trong GitLab">Cơ sở tri thức: quy tắc, đặc tả, quyết định</row>
  <row t="tldv" note="Ghi âm và API mở" href="https://doc.tldv.io" miss="Các quyết định nằm lại trong đầu người, còn biên bản họp và yêu cầu được viết từ trí nhớ nhiều giờ sau, có sai sót">Bản ghi cuộc họp: các quyết định không tồn tại ở đâu dưới dạng văn bản. Theo kinh nghiệm của tác giả, quyền truy cập có sau cuộc họp 5–10 phút, nên có thể viết biên bản và yêu cầu ngay. Phiên bản enterprise, kiểm soát truy cập và MCP yếu hơn, nhưng bản dịch và bản chép lời có chất lượng tốt hơn</row>
  <row t="Granola" note="MCP" href="https://docs.granola.ai/help-center/sharing/integrations/mcp" miss="Giống như khi không có tldv: các quyết định từ cuộc họp bị mất">Cũng là bản ghi cuộc họp. Có MCP, nhưng theo kinh nghiệm của tác giả thì kém tldv đôi chút: từ tiếng Tây Ban Nha lọt vào văn bản tiếng Nga, làm hỏng trải nghiệm người dùng và gây phản kháng khi áp dụng. Theo tài liệu: chỉ không gian làm việc đang hoạt động, gói miễn phí giữ ghi chú 30 ngày</row>
</b-source-rows>
<b-why align="left">Các hệ thống này được chọn vì chúng chứa bốn loại dữ kiện: code, nhiệm vụ, quy tắc và quyết định từ cuộc họp. Mỗi hàng nói rằng thiếu kết nối thì mất gì. Confluence đi kèm một lưu ý: chỉ kết nối khi các trang đã được chăm chút (có người sở hữu và ngày kiểm tra), và để tác nhân đối chiếu bức tranh thực tế với code trong GitLab. Còn đáng tin hơn nữa là giữ yêu cầu và đặc tả trong Git: ở đó mỗi chỉnh sửa có tác giả, ngày và lý do.</b-why>
<b-finding>
  <ex>Bạn hỏi về một lỗi và cuộc trò chuyện không có các bước. Tác nhân tìm trong file dự án, Jira đóng với nó, nên nó tự viết các bước: tự tin, trơn tru, bịa. Bạn đi theo một con đường không tồn tại.</ex>
  <gen>Tác nhân hiếm khi trả lời “tôi không biết”. Nếu câu trả lời không nằm trong ngữ cảnh của nó và các ngữ cảnh khác đều đóng, nó lấp chỗ trống bằng các mẫu chung và đưa ra như dữ kiện. Mỗi nguồn được kết nối làm giảm chỗ cho sự bịa đặt.</gen>
  <do k="Việc cần làm">Mỗi lần tác nhân gặp ảo giác, hãy tìm ngữ cảnh chứa câu trả lời và cấp cho tác nhân quyền truy cập đó. Bắt đầu từ câu hỏi gần nhất mà nó trả lời bằng sự bịa đặt.</do>
</b-finding>
</b-chapter>
<b-chapter id="connect" icon="arrow-right" title="Cách kết nối Jira">
<b-why align="left">Tác nhân và harness của nó có thể tự kết nối. Hướng dẫn: <a href="https://support.atlassian.com/atlassian-rovo-mcp-server/docs/getting-started-with-the-atlassian-remote-mcp-server/" target="_blank" rel="noopener">Atlassian</a> và <a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">Claude Code</a>.</b-why>
<b-lane title="Làm tay hay giao việc" color="accent">
<b-scene names="mcp-agent-access/one-phrase-setup"/>
</b-lane>
<b-why align="left">Hình so sánh hai cách. Làm tay: bạn tìm hướng dẫn, gõ lệnh, đăng nhập và kiểm tra kết quả. Giao cho tác nhân: bạn nói một câu, tác nhân tự kết nối Jira, và việc của bạn chỉ là đăng nhập qua trình duyệt.</b-why>
<b-section-h3 top="14">Nói với tác nhân</b-section-h3>
<b-copy-quote>Kết nối server MCP của Jira theo hướng dẫn của Atlassian và thử trên nhiệm vụ PAY-142: đọc nó và tóm tắt các bình luận.</b-copy-quote>
<b-why align="left">Tác nhân tự chạy các lệnh. Việc của bạn chỉ là đăng nhập qua trình duyệt (OAuth): tác nhân không bao giờ nhận được mật khẩu của bạn. <a href="/blog/agent-hands-work-back-to-you/" target="_blank" rel="noopener">Nếu tác nhân nhờ bạn tự làm</a>.</b-why>
<b-section-h3 top="14">Điều sẽ xảy ra</b-section-h3>
<b-steps-round>
  <step t="Tác nhân kết nối Jira">bằng một lệnh, bạn không gõ gì</step>
  <step hl t="Trang Jira mở ra — bước then chốt">trang đề nghị cấp cho tác nhân quyền truy cập Jira; bạn đăng nhập và đồng ý, còn tác nhân không bao giờ thấy mật khẩu</step>
  <step t="Tác nhân đọc PAY-142">mở nhiệm vụ cùng các bình luận và kể lại</step>
</b-steps-round>
<b-why align="left">Bước then chốt ở đây là bước thứ hai: chính bạn cấp quyền truy cập bằng cách đăng nhập qua trình duyệt. Tác nhân không thấy mật khẩu của bạn và chỉ nhận những quyền bạn đã xác nhận trên trang Jira. Bước thứ nhất và thứ ba do tác nhân tự làm.</b-why>
<b-callout icon="shield-check"><b>Chỉ đọc.</b> Không phải lúc nào bạn cũng chọn được quyền chỉ đọc trên trang đó. Điều này an toàn: tác nhân có xu hướng đọc và hầu như không ghi gì cho đến khi bạn yêu cầu.</b-callout>
<b-details-more summary="Cách làm bằng tay" top="12">
<b-scene names="mcp-agent-access/setup-steps"/>
<b-copy-code>
  claude mcp add --transport http atlassian https://mcp.atlassian.com/v2/mcp
  /mcp               # log in via browser (OAuth)
  claude mcp list     # status: connected / needs login / failed
</b-copy-code>
<b-scene names="mcp-agent-access/scopes"/>
<p>Thiết lập nằm ở đâu và ai thấy server: <a href="/blog/mcp-scopes/">phạm vi MCP trong Claude Code</a>.</p>
</b-details-more>
<b-why align="left">Làm tay là ba lệnh: thêm server, đăng nhập qua trình duyệt bằng /mcp và kiểm tra trạng thái. Trạng thái có ba loại: đã kết nối, cần đăng nhập hoặc lỗi. Sơ đồ ở trên cho thấy từng bước, còn các phạm vi bên dưới nói thiết lập được lưu ở đâu.</b-why>
<b-finding>
  <ex>Tác nhân tự chạy các lệnh và kiểm tra kết nối, và nhiệm vụ PAY-142 được đọc đầy đủ cùng các bình luận. Đó là khoảnh khắc “wow”.</ex>
  <gen>Kết nối mất vài phút. Phạm vi “Project” đặt thiết lập vào repo để cả nhóm có cùng các server. Cả ba phạm vi được nói trong <a href="/blog/mcp-scopes/">phạm vi MCP trong Claude Code</a>.</gen>
  <do k="Việc cần làm">Giao việc thiết lập cho tác nhân và so câu trả lời của nó với những gì bạn tự thấy trong Jira.</do>
</b-finding>
</b-chapter>
<b-chapter id="saving" icon="coin-hm" title="Tiết kiệm">
<b-why align="left">Khoản tiết kiệm đến từ độ chính xác. Yêu cầu mơ hồ nhận câu trả lời mơ hồ, mỗi lần sửa lại sinh yêu cầu mới, và sai sót chồng chất từ bước này sang bước khác; khi chép và kể lại bằng tay, con người thêm những sơ suất như vậy mà không nhận ra. Tác nhân lấy dữ liệu thẳng từ nguồn, nên chuỗi ngắn hơn và ít lỗi hơn. Cái giá là lượng token tăng trong một lần chạy dài, và có các bộ giới hạn cho việc đó.</b-why>
<b-lane title="Sai sót chồng chất: làm tay hay từ nguồn" color="accent">
<b-scene names="mcp-agent-access/exact-request"/>
</b-lane>
<b-why align="left">Bên trái là đường đi với việc chép tay: mỗi bước thêm một chỗ thiếu chính xác, và đến lượt thứ ba các sai sót đã chồng lên. Bên phải là đường đi từ nguồn: một yêu cầu chính xác và một câu trả lời, không có chuỗi lời kể lại.</b-why>
<b-spacer h="12"/>
<b-rules sw="1.8">
  <rule icon="eye" t="Yêu cầu và câu trả lời mơ hồ">Kể lại và chép tay làm mất chi tiết, nên yêu cầu ra mơ hồ và câu trả lời cũng vậy.</rule>
  <rule icon="users" t="Sai sót chồng chất">Mỗi lần sửa sinh ra yêu cầu mới với một chỗ thiếu chính xác mới: sai sót cộng dồn từ bước này sang bước khác.</rule>
  <rule icon="layers" t="Cái giá: token">Ít bước hơn, nhưng lượng token tăng trong một lần chạy dài; có các giới hạn cho việc đó.</rule>
</b-rules>
<b-section-h3 top="14">Giới hạn chi tiêu</b-section-h3>
<b-why align="left">Câu trả lời của hệ thống được kết nối rơi vào cuộc trò chuyện và chiếm chỗ ở đó, còn chỗ được đo bằng token. Vì vậy Claude Code theo dõi kích thước câu trả lời và đặt hai ngưỡng.</b-why>
<b-scene names="mcp-agent-access/reply-size-scale"/>
<b-why align="left">Thang đo cho thấy kích thước câu trả lời của hệ thống tính bằng token. Đến 10.000 token thì câu trả lời qua mà không có nhận xét. Sau 10.000, Claude Code cảnh báo rằng câu trả lời lớn. Sau 25.000, câu trả lời không vào cuộc trò chuyện nguyên vẹn mà được lưu vào file.</b-why>
<b-art-note top="6">Mức trần 25.000 có thể nâng bằng biến môi trường MAX_MCP_OUTPUT_TOKENS, còn ngưỡng cảnh báo thì cố định.</b-art-note>
<b-why align="left"><a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">Chi tiết</a>.</b-why>
<b-finding>
  <ex>Ba lượt với sai sót tăng dần thành một lượt cho một yêu cầu chính xác.</ex>
  <gen>Khoản tiết kiệm là không còn những vòng thừa: một yêu cầu chính xác và câu trả lời từ nguồn không làm sai sót chồng chất. Con số chính xác chỉ có từ việc đo công việc của chính bạn.</gen>
  <gen k="Về giới hạn">Việc càng dài thì càng tốn token, nên Claude Code giới hạn các câu trả lời dài: cảnh báo sau 10.000 token và lưu vào file sau 25.000.</gen>
  <do k="Việc cần làm">Đo hai thứ trên một nhiệm vụ: chuyển tay mất bao nhiêu phút và bao nhiêu lần sửa, và tác nhân tiêu bao nhiêu token.</do>
</b-finding>
</b-chapter>
<b-chapter id="facts" icon="check-circle" title="Ít ảo giác hơn">
<b-why align="left">Ảo giác: mô hình tạo ra văn bản trông đúng nhưng sai hoặc không suy ra từ dữ liệu. Mô hình nghe tự tin như nhau trong hai tình huống. <a href="https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations" target="_blank" rel="noopener">Chi tiết</a></b-why>
<b-rules-fixed cols="2" sw="1.8">
  <rule icon="help" t="Ít ngữ cảnh">Mô hình tự lấp chỗ trống và không nói đó là phỏng đoán.</rule>
  <rule icon="file-text" t="Có ngữ cảnh">Mô hình trích dẫn nhanh gọn và tự tin, nên hãy mở liên kết và kiểm tra.</rule>
</b-rules-fixed>
<b-lane title="Nơi thiếu dữ liệu" color="accent" top="14">
<b-scene names="mcp-agent-access/fills-gaps"/>
</b-lane>
<b-art-note top="10" align="left">Câu trả lời của tác nhân được đối chiếu với dữ liệu: mỗi phần của nó đều phải có chỗ dựa. Trong toán học, phép đối ứng như vậy gọi là toàn cấu. Các phần không có chỗ dựa được mô hình lấp bằng phỏng đoán, và chúng trông tự tin y như vậy.</b-art-note>
<b-why align="left">Điều này nghĩa là gì trong thực tế. Nếu các hệ thống chưa được kết nối, tác nhân lấp chỗ trống bằng phỏng đoán và nói với cùng giọng tự tin: văn bản không cho thấy đâu là phỏng đoán, đâu là dữ kiện. Nếu các hệ thống đã được kết nối, dữ liệu thật kèm liên kết nằm ở chỗ của phỏng đoán, và kiểm tra mất một cú bấm. Ba lời khuyên của Anthropic bổ trợ nhau: cho phép tác nhân nói “tôi không biết” khi không có dữ liệu, yêu cầu nó dựa vào nguyên văn của nguồn, và đòi liên kết cho mỗi khẳng định.</b-why>
<b-section-h3 top="18">Anthropic khuyến nghị gì</b-section-h3>
<b-step-chain>
  <node t="&quot;Tôi không biết&quot;">Cho phép thừa nhận thiếu dữ liệu</node>
  <node t="Trích dẫn">Dựa vào nguyên văn của nguồn</node>
  <node t="Dẫn nguồn">Mỗi khẳng định có nguồn của nó</node>
</b-step-chain>
<b-why align="left">Ba lời khuyên của Anthropic bịt các lỗ hổng trong dữ liệu. Cho phép “tôi không biết”: nếu không, mô hình lấp chỗ trống bằng phỏng đoán. Dựa vào trích dẫn: nguyên văn của nguồn kiểm tra được. Đưa liên kết cho mỗi khẳng định: có thể mở ra và so sánh.</b-why>
<b-finding>
  <ex>Jira đóng, nên tác nhân bịa hai phần của câu trả lời. Khi Jira được kết nối, những chỗ đó chứa dữ liệu từ phiếu PAY-142 kèm liên kết, và bạn mở nó trong một cú bấm.</ex>
  <gen>Tác nhân lấp các lỗ hổng trong dữ liệu bằng phỏng đoán và không nói ra. Ba lời khuyên của Anthropic bịt chúng: cho phép “tôi không biết”, dựa vào trích dẫn, đưa liên kết tới nguồn. Điều này không loại bỏ hoàn toàn ảo giác, vẫn cần con người kiểm tra.</gen>
  <do k="Việc cần làm">Đòi nguồn cho mỗi dữ kiện: hệ thống, số, trường. Cách làm trong yêu cầu và biên bản họp có trong <a href="/blog/requirements-sources-facts-assumptions/">một bài riêng</a>.</do>
</b-finding>
</b-chapter>
<b-chapter id="risks" icon="shield-check" title="Rủi ro và quy tắc">
<b-why align="left">Trong đa số trường hợp, sự bảo vệ đã có sẵn trong cách MCP hoạt động ở Claude Code. Còn lại là chọn các server đáng tin và không cấp quyền thừa. <a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">Chi tiết</a></b-why>
<b-why align="left">Có ba rủi ro đáng nhớ. Quyền thừa: server được cấp quyền ghi có thể đổi hoặc xóa dữ liệu, nên quyền được cấp ở mức tối thiểu. Server không đáng tin: một server MCP của bên thứ ba có quyền truy cập vào những gì bạn mở cho nó, nên hãy kết nối các server đã được kiểm chứng. Văn bản từ hệ thống: một nhiệm vụ hoặc bình luận có thể chứa một câu nhắm vào tác nhân, điều này được nói trong bài [về mặt phẳng dữ liệu và mặt phẳng điều khiển](/blog/data-plane-control-plane-prompt-injection/).</b-why>
<b-rules sw="1.8">
  <rule icon="bell" t="Xin phép">Claude Code xin phép trước khi dùng công cụ của một server.</rule>
  <rule icon="folder-hm" t="Server của dự án">Các server trong file .mcp.json của dự án phải được duyệt trước lần dùng đầu.</rule>
  <rule icon="key" t="Quyền">Với các server có đăng nhập, có thể giới hạn những quyền chúng yêu cầu.</rule>
</b-rules>
<b-lane title="Bậc thang quyền" color="accent" top="14">
<b-scene names="mcp-agent-access/rights-ladder"/>
</b-lane>
<b-why align="left">Bậc thang trong hình cho thấy thứ tự cấp quyền. Trước hết là đọc: tác nhân chỉ nhìn. Rồi ghi có xác nhận: tác nhân đề xuất, con người duyệt mỗi lần ghi. Ghi không cần xác nhận phải đợi đến khi đã đủ tin cậy. Chỉ lên một bậc khi đã kiểm tra rằng bậc trước hoạt động tốt.</b-why>
<b-finding>
  <ex>Tác nhân đọc prod, chỉ ghi vào một bảng thử nghiệm và cho con người xem mỗi lần ghi.</ex>
  <gen>Quyền tăng dần theo bậc thang: đọc trước, rồi ghi có xác nhận. Ghi không xác nhận đợi đến khi có được tin cậy.</gen>
  <do k="Việc cần làm">Cấp cho server mới quyền chỉ đọc và nâng quyền sau một tuần làm việc đã kiểm tra.</do>
</b-finding>
</b-chapter>
<b-chapter id="first" icon="arrow-right" title="Bắt đầu từ đâu">
<b-why align="left">Tốt hơn là bắt đầu nhỏ: một nguồn, một người kiểm tra và chế độ chỉ đọc. Kết nối Jira, hỏi tác nhân năm câu về các nhiệm vụ thật và so câu trả lời với những gì bạn tự thấy. Điều đó cho thấy có thể tin tác nhân đến đâu trước khi cấp quyền ghi.</b-why>
<b-scene names="mcp-agent-access/start-small"/>
<b-finding>
  <ex>Bắt đầu với Jira chỉ đọc và so năm câu trả lời của tác nhân với những gì bạn tự thấy.</ex>
  <gen>Một nguồn, một người duyệt, mỗi lần một bậc quyền.</gen>
  <do k="Việc cần làm">Hôm nay kết nối server đầu tiên và ghi lại tác nhân đọc đúng gì và sai gì.</do>
</b-finding>
</b-chapter>
<b-chapter id="cases" icon="grid-alt" title="Các tình huống khác">
<b-why>Một cách tiếp cận dùng được cho nhiều nhiệm vụ: tác nhân đọc các nguồn và con người kiểm tra kết quả.</b-why>
<b-scene names="mcp-agent-access/three-cases"/>
<b-table>
<table><thead><tr><th>Tình huống</th><th>Nguồn</th><th>Tác nhân làm gì</th><th>Con người kiểm tra gì</th></tr></thead><tbody><tr><td><a href="/blog/bug-report-to-reproduction-agent/">QA</a></td><td>Jira, môi trường kiểm thử, trình duyệt</td><td>tái hiện lỗi, thu hẹp đường đi, viết báo cáo</td><td>các bước bằng tay trên môi trường kiểm thử</td></tr><tr><td><a href="/blog/analytics-reports-agent/">Báo cáo và phân tích</a></td><td>cơ sở dữ liệu, bảng tính, tài liệu</td><td>tính bằng truy vấn, lập bản tổng hợp</td><td>một con số bằng cách khác</td></tr><tr><td><a href="/blog/incident-investigation-agent/">Sự cố</a></td><td>Sentry, Grafana</td><td>đối chiếu lỗi, chỉ số và thời điểm phát hành</td><td>giả thuyết với biểu đồ và sự kiện</td></tr></tbody></table>
</b-table>
<b-why align="left">Cách đọc bảng. Mỗi hàng theo một trình tự: tác nhân đọc các nguồn, làm phần việc chính và đưa ra kết quả, còn con người kiểm tra bằng một thao tác ngắn. Trong QA, các bước của báo cáo được lặp lại bằng tay trên môi trường kiểm thử. Trong phân tích, một con số được tính lại bằng cách khác. Trong sự cố, giả thuyết được so với biểu đồ và sự kiện. Chi tiết có trong các bài sau các liên kết.</b-why>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="MCP giải quyết vấn đề gì?">Không có MCP, tác nhân chỉ biết những gì được nói với nó. MCP nối nó với các hệ thống đang làm việc, để nó đọc dữ kiện từ nguồn.</q>
    <q t="Kết nối MCP như thế nào?">Nhờ chính tác nhân kết nối: việc này mất vài phút, và phạm vi project đặt thiết lập vào repo cho cả nhóm.</q>
    <q t="Vì sao có MCP thì ít ảo giác hơn?">Khi câu trả lời không nằm trong ngữ cảnh, tác nhân lấp nó bằng phỏng đoán. Mỗi nguồn được kết nối lấp khoảng trống đó bằng dữ kiện.</q>
    <q t="Nên cấp cho MCP những quyền nào?">Bắt đầu với quyền đọc và chỉ cấp quyền ghi ở nơi nhiệm vụ cần.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" icon="arrow-right" title="Đọc tiếp">
  <b-links>
    <item href="/blog/bug-report-to-reproduction-agent/" k="QA cùng tác nhân" t="QA sau hỗ trợ">MCP và skill trong công việc QA</item>
    <item href="/blog/specs-rules-skills/" k="Skill" t="Đặc tả, quy tắc và skill">tác nhân phải biết gì về dự án</item>
    <item href="/blog/harness-driven-development/" k="Vòng lặp lỗi" t="Harness-Driven Development">sai sót của tác nhân trở thành quy tắc thế nào</item>
  </b-links>
</b-chapter>
<b-footer>Nhiệm vụ PAY-142 được bịa ra làm ví dụ.</b-footer>
</b-post>
