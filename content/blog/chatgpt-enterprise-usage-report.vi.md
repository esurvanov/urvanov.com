---
title: Báo cáo sử dụng ChatGPT Enterprise trong công ty: ai dùng, dùng để làm gì và nên mua công cụ AI nào tiếp theo
date: 2026-09-28
updated: 2026-11-08
description: Cách biết nhân viên dùng ChatGPT Enterprise ra sao: năm bản xuất từ bảng quản trị cho ra mức độ áp dụng, độ đồng đều giữa các nhóm, công cụ chính, bản đồ tác vụ, kiểm tra dữ liệu và danh sách người cần phỏng vấn.
tags: AI, nghiên cứu, phân tích
category: research
layout: wide
image: /og/chatgpt-enterprise-usage-report.en.png
mentions: ChatGPT Enterprise, Codex, ChatGPT Work, Claude in Chrome
toc: why=Vì sao cần báo cáo | order=Quy trình | data=Quản trị viên thấy gì | layer1=Bức tranh chung | layer2=Bản chất công việc | layer3=Kiểm chứng | layer4=Chọn người | start=Bắt đầu từ đâu | faq=Câu hỏi | next=Đọc tiếp
---

ChatGPT Enterprise là phiên bản ChatGPT dành cho tổ chức, có bảng quản trị cho thấy ai dùng công cụ và dùng như thế nào. Báo cáo này dựng từ năm bản xuất của bảng đó, cho ra mức độ áp dụng, độ đồng đều giữa các nhóm, bản chất tác vụ và những người cần phỏng vấn. Báo cáo giúp quyết định nên mua công cụ AI nào, đào tạo ai và kiểm chứng giả định nào.

<b-post series="kto">
<b-dir-map label="Bốn mảng phân tích">
  <dir href="#layer1" n="01" color="c-chat" t="Bức tranh chung" big="21%" sub="Dùng hằng tuần" dec="Đầu tư đào tạo vào đâu"><b-mini-funnel><seg w="82%" color="d-rare" ink="d-rare-t">82%</seg><seg w="47%" color="d-reg" ink="d-reg-t">47%</seg><seg w="21%" color="d-week" ink="d-week-t">21%</seg></b-mini-funnel></dir>
  <dir href="#layer2" n="02" color="c-work" t="Bản chất công việc" big="70%" sub="Số kết nối là Slack và Notion" dec="Nên mua công cụ nào" art="chatgpt-enterprise-usage-report/map-donut"></dir>
  <dir href="#layer3" n="03" color="c-code" t="Kiểm chứng" big="±2%" sub="Sai số cho phép khi đối chiếu bản xuất" dec="Có thể tin các con số không"><b-csv-check><file color="c-chat">CHAT</file><file color="c-work">WORK</file><file color="c-code">CODEX</file></b-csv-check></dir>
  <dir href="#layer4" n="04" color="c-proj" t="Chọn người" big="16" sub="Trong 340 người ở ví dụ — để phỏng vấn" dec="Nói chuyện với ai trước khi mua"><b-dot-grid n="340" on="5,31,58,77,96,120,141,163,187,205,226,248,269,290,311,333"/></dir>
</b-dir-map>
<b-chapter id="why" title="Báo cáo giúp đưa ra những quyết định nào">
  <b-lead-large><b>Bài toán kinh doanh:</b> tìm ra bộ công cụ AI hiện tại còn thiếu ở những tác vụ công việc nào và nên thử giải pháp nào trước khi mua. Quyết định thuộc về người nắm ngân sách công cụ AI cùng trưởng các nhóm chạy thử nghiệm. Quyền truy cập dữ liệu và bảo mật do bộ phận an toàn thông tin phê duyệt. Tiêu chí quyết định là các dấu hiệu trong bảng dưới đây.</b-lead-large>

  Việc bộ công cụ hiện tại chưa tối ưu ở đâu đó là một giả định: báo cáo và các cuộc phỏng vấn dùng để kiểm chứng nó. "Chưa tối ưu" được tách thành các dấu hiệu có thể kiểm tra. Kết luận "không cần công cụ mới" cũng là một kết quả.

  <b-table id="signs">
    <table><thead>
    <tr><th>Dấu hiệu</th><th>Biểu hiện</th><th>Nhóm trong phỏng vấn</th><th>Báo cáo cho thấy ở đâu</th></tr>
    </thead><tbody>
    <tr><td>Chất lượng kết quả</td><td>câu trả lời không chính xác hoặc bịa ra</td><td><b-tag kind="no" line>ảo giác</b-tag></td><td><a href="/blog/chatgpt-enterprise-usage-report/#connectors">Trình kết nối</a></td></tr>
    <tr><td>Thời gian và sửa tay</td><td>qua lại nhiều lần, kết quả phải hoàn thiện bằng tay</td><td><b-tag kind="no" line>prompt</b-tag></td><td><a href="/blog/chatgpt-enterprise-usage-report/#depth">Mức độ áp dụng</a>, <a href="/blog/chatgpt-enterprise-usage-report/#main-tool">Công cụ chính</a></td></tr>
    <tr><td>Khả năng lặp lại</td><td>cùng một tác vụ nhưng lần nào kết quả cũng khác</td><td><b-tag kind="no" line>khả năng lặp lại</b-tag></td><td><a href="/blog/chatgpt-enterprise-usage-report/#skills">Skill</a>, <a href="/blog/chatgpt-enterprise-usage-report/#projects">Chủ đề dự án</a></td></tr>
    <tr><td>Quy mô</td><td>một kịch bản đang chạy tốt không chuyển sang nhóm khác được</td><td><b-tag kind="no" line>quy mô</b-tag></td><td><a href="/blog/chatgpt-enterprise-usage-report/#uniformity">Độ đồng đều</a></td></tr>
    <tr><td>Truy cập dữ liệu</td><td>hệ thống cần dùng chưa được kết nối</td><td><b-tag kind="no" line>truy cập dữ liệu</b-tag></td><td><a href="/blog/chatgpt-enterprise-usage-report/#connectors">Trình kết nối</a></td></tr>
    <tr><td>Chi phí</td><td>đắt so với một đơn vị kết quả</td><td><b-tag kind="no" line>chi phí</b-tag></td><td><a href="/blog/chatgpt-enterprise-usage-report/#top-spend">Top theo chi tiêu</a></td></tr>
    </tbody></table>
  </b-table>
  <b-cap>Giới hạn dữ liệu: báo cáo chỉ thấy công cụ của công ty và chỉ trong kỳ xuất, tức 3 tháng. Tài khoản cá nhân và các công cụ khác không xuất hiện trong đó.</b-cap>
  <b-section-title id="decision" top="22">Từ câu trả lời đến quyết định mua</b-section-title>
  <b-why>Báo cáo chỉ ra nơi cần nhìn, còn quyết định mua chỉ được đưa ra sau năm bước này, để tiền đổ vào tác vụ mà nhiều người gặp và hiện chưa có gì đáp ứng.</b-why>
  <b-steps top="18" round>
    <step t="Phỏng vấn">Có những tác vụ và khó khăn nào, và hiện nay mọi người xoay xở ra sao</step>
    <step t="Khảo sát toàn công ty">Bao nhiêu người gặp khó khăn đó, gặp thường xuyên đến đâu và nó cản trở nhiều không</step>
    <step t="So sánh">Quy mô tác vụ, mức nghiêm trọng của hậu quả, cách xoay xở hiện có, chi phí giải pháp</step>
    <step t="Thử công cụ">Các lựa chọn triển vọng, thử trên tác vụ thật cùng nhân viên</step>
    <step t="Quyết định">Người nắm ngân sách quyết định theo sáu <a href="#signs">dấu hiệu ở trên</a>: chất lượng, thời gian và sửa tay, khả năng lặp lại, quy mô, truy cập dữ liệu, chi phí; "không cần công cụ mới" là một kết quả hợp lệ</step>
  </b-steps>
  <b-io justify>
    <item k="Đầu vào">Các bản xuất từ bảng quản trị: tin nhắn, chi tiêu, dự án và trình kết nối của từng người</item>
    <item k="Báo cáo làm gì">Biến các bản xuất thành các nhóm người dùng, mức trưởng thành của từng nhóm và những người cụ thể, làm tư liệu cho quyết định</item>
    <item k="Quyết định ở đầu ra">Thử nghiệm công cụ nào, cho nhóm nào, nói chuyện với ai trước khi mua và chỗ nào không cần ngân sách</item>
  </b-io>
</b-chapter>
<b-chapter id="order" title="Quy trình">

  Năm bước từ xuất dữ liệu đến danh sách người hoàn chỉnh.

  <b-steps top="18" round>
    <step t="Xuất dữ liệu">Năm mục của bảng quản trị, chi tiết ở phần "Lấy dữ liệu ở đâu"</step>
    <step t="Dựng bức tranh chung">Mức độ áp dụng, độ đồng đều giữa các nhóm, công cụ chính, các nhóm hành vi</step>
    <step t="Vẽ bản chất công việc">Mọi người giải những tác vụ nào, bằng công cụ tích hợp nào và qua tích hợp nào</step>
    <step t="Đối chiếu với dữ liệu gốc">Kiểm tra từng bản tổng hợp với bản xuất gốc</step>
    <step t="Chọn người và rút kết luận">Danh sách phỏng vấn và những câu hỏi cần kiểm chứng trong đó<b-link-chips><item href="/blog/who-to-interview-before-buying-ai-tools/" icon="arrow-right">Phỏng vấn ai</item><item href="/blog/ai-interviews-without-leading-questions/" icon="arrow-right">Cách tiến hành phỏng vấn</item></b-link-chips></step>
  </b-steps>
</b-chapter>
<b-chapter id="data" title="Quản trị viên ChatGPT Enterprise thấy gì: lấy dữ liệu ở đâu">

  Mọi thứ được dựng từ năm mục của một bảng quản trị <a href="https://openai.com/chatgpt/enterprise/" target="_blank" rel="noopener">ChatGPT Enterprise</a>. Rê chuột lên <b>i</b> để xem chính xác mỗi mục chứa gì.

  <b-subhead>Cách xuất dữ liệu từ bảng quản trị ChatGPT Enterprise: làm tay và nhờ tác nhân trình duyệt Claude in Chrome</b-subhead>
  <b-howto><b>Cách xuất.</b> Bảng quản trị có API, nhưng chúng chỉ phủ một phần dữ liệu: <a href="https://learn.chatgpt.com/docs/enterprise/analytics-api" target="_blank" rel="noopener">phân tích Codex</a>, chi phí theo credit và nhật ký hội thoại phục vụ tuân thủ. Các bản xuất về người dùng, dự án, skill và bảng xếp hạng theo từng sản phẩm dễ lấy hơn qua giao diện. Việc xuất rất hợp để giao cho <a href="https://claude.com/claude-in-chrome" target="_blank" rel="noopener">Claude in Chrome</a>: nó mở đúng mục, đặt bộ lọc, bấm xuất và lưu file CSV. Mỗi bước đều hiện trên màn hình, nên chọn sai bộ lọc hay sai mục sẽ bị phát hiện ngay, trước khi con số vào báo cáo.<warn icon="shield-alert"><b>Quyền truy cập.</b> API của bảng quản trị không phải lúc nào cũng dùng được: chính sách bảo mật của công ty thường hạn chế khóa API quản trị. Khi đó, hãy xuất từng mục qua giao diện.</warn></b-howto>
  <b-sources>
    <src icon="users-alt" href="https://chatgpt.com/admin/usage/users" t="Người dùng" path="chatgpt.com/admin/usage/users" what="Tin nhắn, ngày hoạt động và công cụ tích hợp của từng người" tip-label="Mục Người dùng chứa gì">Xuất CSV cho kỳ tối đa 12 tháng. Các trường: messages, tool_messages, gpt_messages, project_messages, department, groups, seat_type, last_day_active. Bảng quản trị tự gắn huy hiệu cho "power user".</src>
    <src icon="trophy" href="https://admin.openai.com" t="Bảng xếp hạng" path="admin.openai.com → Analytics → Leaderboard" what="Chi tiêu, token và số dòng code của từng người, tách riêng cho các sản phẩm Chat, Work và Codex" tip-label="Bảng xếp hạng chứa gì">Nút xuất cạnh tiêu đề → "User ranking", CSV hoặc JSON. Các trường: Name, Email, Credits, Estimated costs, Tokens, Lines of code. Bộ lọc "Product" thay đổi nội dung bản xuất. Lịch sử khoảng 120 ngày.</src>
    <src icon="folder-iv" href="https://chatgpt.com/admin/usage/projects" t="Dự án" path="chatgpt.com/admin/usage/projects" what="Ai tạo dự án, dự án có bao nhiêu tin nhắn và còn hoạt động không" tip-label="Mục Dự án chứa gì">Các trường: project_name, project_creator_email, messages_workspace, unique_messagers_workspace, is_active. Một số tên hiện là [content redacted]: bảng quản trị tự ẩn chúng.</src>
    <src icon="plug-alt" href="https://chatgpt.com/admin/usage" t="Tổng quan: trình kết nối và skill" path="chatgpt.com/admin/usage" what="Trợ lý được nối với những ứng dụng nào và mọi người dùng những skill nào" tip-label="Mục Tổng quan chứa gì">Hai khối "App interactions" và "Skills": số lần gọi từng trình kết nối và từng skill trong kỳ đã chọn.</src>
    <src icon="chart-line-iv" href="https://admin.openai.com" t="Phân tích: tác vụ" path="admin.openai.com → Analytics → Tasks" what="Cách bảng quản trị tự phân loại tác vụ: code hoặc công việc tri thức (mọi thứ trừ code)" tip-label="Thẻ Tác vụ chứa gì">Tỷ lệ code và công việc tri thức, các tác vụ đứng đầu theo credit. Một mô hình của OpenAI gán nhãn tác vụ trên mẫu khoảng 10% yêu cầu trong 30 ngày.</src>
  </b-sources>
</b-chapter>
<b-chapter id="layer1" icon="grid" title="Bức tranh chung">

  Bốn phần tiếp theo là chính báo cáo, mỗi phần có mục tiêu riêng. <b>Mục tiêu:</b> cho thấy trong công ty có những nhóm người nào và mỗi nhóm lớn đến đâu.

  <b-subsection id="depth" title="Mức độ áp dụng">
    <b-art-row names="chatgpt-enterprise-usage-report/depth-tried chatgpt-enterprise-usage-report/depth-regular chatgpt-enterprise-usage-report/depth-weekly"/>
    <b-why>Mức độ áp dụng cho biết công cụ đã đi sâu vào công việc của công ty đến đâu: bao nhiêu người đã dùng ít nhất một lần, dùng thường xuyên và dùng hằng tuần. Những người không bao giờ nhắn trong chat mà chỉ làm việc qua Codex được tách riêng. <b>Quyết định:</b> đầu tư đào tạo vào nhóm nào và có nên mua thêm giấy phép ngay bây giờ không.</b-why>
    <b-share-bar kind="wide">
      <seg w="20.9%" color="d-week" ink="d-week-t">71</seg>
      <seg w="25.9%" color="d-reg" ink="d-reg-t">88</seg>
      <seg w="28.5%" color="d-rare" ink="d-rare-t">97</seg>
      <seg w="6.8%" color="d-api" ink="d-api-t">23</seg>
      <seg w="17.9%" color="d-none" ink="d-none-t">61</seg>
    </b-share-bar>
    <b-legend>
      <item color="d-week">hằng tuần</item>
      <item color="d-reg">thường xuyên</item>
      <item color="d-rare">thỉnh thoảng</item>
      <item color="d-api">chỉ dùng Codex</item>
      <item color="d-none">hoàn toàn không hoạt động</item>
    </b-legend>
    <b-cap>340 người</b-cap>
    <b-cap>Nguồn: <a href="https://chatgpt.com/admin/usage/users" target="_blank" rel="noopener">Người dùng</a> · <a href="https://admin.openai.com" target="_blank" rel="noopener">Bảng xếp hạng</a> cho những người chỉ làm việc qua Codex</b-cap>
    <b-finding>
      <ex>82% số người đã thử công cụ, 47% dùng nó trong công việc và với 21% nó đã thành thói quen hằng tuần. Chỗ còn có thể làm sâu thêm là 97 người ở nhóm "thỉnh thoảng".</ex>
      <gen>Khoảng cách giữa "đã thử" và "dùng hằng tuần" cho thấy có bao nhiêu người dừng lại sau vài lần thử đầu. Mốc tham chiếu cho việc áp dụng đại trà là 50–70% nhân viên dùng trong công việc hằng ngày. Khi chưa đạt mốc đó, mua thêm giấy phép sẽ không tạo ra tăng trưởng: có thứ gì khác ngoài quyền truy cập đang cản mọi người.</gen>
      <do>Dồn đào tạo vào nhóm lớn nhất nằm giữa "đã thử" và "hằng tuần": nhóm này cho mức tăng nhanh nhất ở việc dùng thường xuyên. Sau đào tạo, tính lại phân bổ để xem mọi người đã chuyển đi đâu.</do>
    </b-finding>
    <b-info-note icon="flag-alt-iv"><b>Quan trọng.</b> Chọn 5–10 người từ nhóm "thỉnh thoảng", hỏi qua phỏng vấn xem hiện giờ họ hoàn thành việc bằng cách nào, rồi cùng họ xem lại các ca công việc thật. Sau buổi xem lại, tính lại tỷ lệ dùng hằng tuần. Cách hỏi mà không gợi ý sẵn đáp án có trong bài <a href="/blog/ai-interviews-without-leading-questions/">"Cách phỏng vấn mọi người về việc dùng AI"</a>.</b-info-note>
  </b-subsection>
  <b-subsection id="uniformity" title="Độ đồng đều">
    <b-art-row names="chatgpt-enterprise-usage-report/team-groups" cols="1"/>
    <b-why>Độ đồng đều cho thấy công cụ đã vào các nhóm đều đến mức nào: bao nhiêu phần trăm mỗi nhóm dùng thường xuyên và trung bình một người nhắn bao nhiêu tin. <b>Quyết định:</b> lấy kịch bản đang chạy tốt từ nhóm nào và đưa tới nhóm nào trước.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Nhóm</th><th>Người dùng thường xuyên</th><th class="bk-table-r">%</th><th class="bk-table-r">Tin nhắn / người</th></tr>
      </thead><tbody><b-table-group color="d-week" span="4">Mạnh · nguồn kịch bản</b-table-group>
      <tr><td>Nhóm A</td><td><b-bar value="74" min="120"/></td><td class="bk-table-r">74%</td><td class="bk-table-r">1,120</td></tr>
      <tr><td>Nhóm B</td><td><b-bar value="66" min="120"/></td><td class="bk-table-r">66%</td><td class="bk-table-r">870</td></tr><b-table-group color="d-reg" span="4">Trung bình</b-table-group>
      <tr><td>Nhóm C</td><td><b-bar value="51" min="120"/></td><td class="bk-table-r">51%</td><td class="bk-table-r">720</td></tr><b-table-group color="d-rare" span="4">Tụt lại · nơi cần đưa kịch bản tới</b-table-group>
      <tr><td>Nhóm D</td><td><b-bar value="34" min="120"/></td><td class="bk-table-r">34%</td><td class="bk-table-r">530</td></tr>
      <tr><td>Nhóm E</td><td><b-bar value="18" min="120"/></td><td class="bk-table-r">18%</td><td class="bk-table-r">290</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Nguồn: <a href="https://chatgpt.com/admin/usage/users" target="_blank" rel="noopener">Người dùng</a> · các trường department và groups</b-cap>
    <b-finding>
      <ex>Ở Nhóm A, 74% số người dùng công cụ thường xuyên; ở Nhóm E là 18%: chênh nhau 56 điểm phần trăm.</ex>
      <gen>Chênh lệch lớn giữa các nhóm nghĩa là các kịch bản hiệu quả đã có nhưng chỉ nằm ở một hai nhóm: chuyển chúng đi rẻ hơn mua thứ mới. Tỷ lệ thấp đồng loạt ở mọi nhóm cho thấy một rào cản chung: quyền truy cập, đào tạo hoặc tác vụ không phù hợp. Tỷ lệ cao đồng loạt nghĩa là công cụ đã bén rễ và có thể sang bước tiếp theo. Nhóm còn vướng rào cản thì chưa sẵn sàng cho công cụ mới.</gen>
      <do>Khi chênh lệch lớn, tổ chức một buổi meetup: nhóm mạnh nhất trình bày ba kịch bản của mình cho hai nhóm yếu nhất. Trước buổi đó, làm 2–3 cuộc phỏng vấn về rào cản ở nhóm yếu nhất. Sau meetup, tính lại chênh lệch: nó phải thu hẹp.</do>
    </b-finding>
  </b-subsection>
  <b-subsection id="main-tool" title="Công cụ chính">
    <b-why>Trong ba công cụ, công cụ nào chiếm hơn một nửa chi tiêu của một người trong ba tháng. Loại công cụ cho biết người đó làm việc với AI theo cách nào.</b-why>
    <b-tool-types>
      <prob title="nhiều tin nhắn cho mỗi tác vụ; ">Prompt</prob>
      <prob title="ít kết nối với ứng dụng; ">Ảo giác</prob>
      <prob title="cùng các tác vụ mà không có dự án hay skill; ">Khả năng lặp lại</prob>
      <prob title="skill chỉ được xây ở một nhóm; ">Quy mô</prob>
      <tool n="1" href="https://openai.com/chatgpt/enterprise/" color="c-chat" t="Chat" art="chatgpt-enterprise-usage-report/tool-chat" on="1,2,3,4"/>
      <tool n="2" href="https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex" color="c-work" t="Work" art="chatgpt-enterprise-usage-report/tool-work" on="3,4"/>
      <tool n="3" href="https://openai.com/codex/" color="c-code" t="Codex" art="chatgpt-enterprise-usage-report/tool-codex" on=""/>
    </b-tool-types>
    <b-share-bar kind="wide">
      <seg w="48.2%" color="c-chat">164 · Chat</seg>
      <seg w="13.8%" color="c-work">47 · Work</seg>
      <seg w="11.2%" color="c-code">38 · Codex</seg>
      <seg w="26.8%" color="c-none" ink="ink">91 · không chi tiêu</seg>
    </b-share-bar>
    <b-cap>340 người, cửa sổ 3 tháng</b-cap>
    <b-cap>Nguồn: <a href="https://admin.openai.com" target="_blank" rel="noopener">Bảng xếp hạng</a> · ba bản xuất: bộ lọc "Product" = Chat, Work, Codex</b-cap>
    <b-finding>
      <ex>Chat là sản phẩm chính của 164 trong 340 người, Codex của 38 người, Work của 47 người.</ex>
      <gen>Công cụ chính cho thấy kiểu công việc: trò chuyện, giao việc cho tác nhân hoặc viết code. Nó quyết định người đó cần gì tiếp theo và nên đưa vào thử nghiệm nào. Quy mô nhóm quyết định quy mô thử nghiệm: thử nghiệm rộng cho kịch bản phổ biến, hẹp cho kịch bản hiếm.</gen>
      <do>Quyết định là chuyển từng nhóm lên bước tiếp theo. Với nhóm Chat: Work cùng trình kết nối và MCP tới dữ liệu công việc, giúp bớt phải viết prompt và bớt ảo giác. Với nhóm Work: đặc tả, thiết lập harness và skill dùng chung, giúp kết quả lặp lại được và chuyển được sang nhóm khác.</do>
    </b-finding>
  </b-subsection>
  <b-subsection id="top-spend" title="Top theo chi tiêu">
    <b-art-row names="chatgpt-enterprise-usage-report/spend-few chatgpt-enterprise-usage-report/spend-mentor chatgpt-enterprise-usage-report/spend-experiment"/>
    <b-why>Danh sách top xếp hạng mọi người theo số tiền chi cho một sản phẩm cụ thể, ví dụ Codex. Nhờ vậy danh sách có cả người chi nhiều cho Codex dù phần lớn chi tiêu của họ nằm ở Chat.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Người</th><th>Nhóm</th><th class="bk-table-r">$ cho code / 3 tháng</th><th class="bk-table-r">Token / 3 tháng</th><th class="bk-table-r">Token trên $</th></tr>
      </thead><tbody>
      <tr><td>Hana Sato</td><td>Nhóm C</td><td class="bk-table-r">438.20</td><td class="bk-table-r">21.9M</td><td class="bk-table-r">50K</td></tr>
      <tr><td>Luis Moreno</td><td>Nhóm A</td><td class="bk-table-r">395.60</td><td class="bk-table-r">12.7M</td><td class="bk-table-r">32K</td></tr>
      <tr><td>Ada Kowalski</td><td>Nhóm D</td><td class="bk-table-r">84.30</td><td class="bk-table-r">4.3M</td><td class="bk-table-r">51K</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Nguồn: <a href="https://admin.openai.com" target="_blank" rel="noopener">Bảng xếp hạng</a> · mỗi sản phẩm một bản xuất</b-cap>
    <b-finding>
      <ex>Hana Sato và Luis Moreno chi cho code nhiều hơn người thứ ba trong danh sách khoảng năm lần. Với mức chi tương đương, Hana nhận được nhiều token trên mỗi đô la hơn Luis một lần rưỡi.</ex>
      <gen>Người dùng đứng đầu là tác nhân thay đổi: họ tìm ra các kịch bản hiệu quả đầu tiên, và kinh nghiệm của họ ảnh hưởng đến việc một công cụ chuyên dụng có đáng tiền hay không. Bên cạnh họ là những đồng nghiệp thận trọng hơn, cần thêm thời gian và một ví dụ sống trên chính tác vụ của mình. Xếp hạng theo tỷ lệ chi tiêu sẽ che mất các tác nhân thay đổi, nên hãy nhìn chi tiêu tuyệt đối.</gen>
      <do>Mời người dùng đứng đầu làm người cố vấn (mentor): để họ trình bày kịch bản cho đồng nghiệp mới bắt đầu, trên chính tác vụ của những đồng nghiệp đó. Mời các đồng nghiệp thận trọng bằng ví dụ và kết quả, không ép buộc. Đề nghị hai ba người đứng đầu làm một thử nghiệm với công cụ chuyên dụng kèm báo cáo trước và sau.</do>
    </b-finding>
    <b-info-note icon="chart-bar">Bảng xếp hạng có cả chi tiêu lẫn token. Hãy so tỷ lệ token trên chi tiêu trong cùng một nhóm: cùng một sản phẩm và các tác vụ tương tự. Ai nhận được nhiều token trên mỗi đô la rõ rệt thì thường chọn mô hình và chế độ tốt hơn. Đây là những người dùng thành thạo và hiệu quả nhất, nên mời họ làm người cố vấn trước. Giới thiệu họ với đồng nghiệp cùng nhóm có tỷ lệ thấp hơn: cùng làm một tác vụ thường hiệu quả hơn một buổi đào tạo chung. Các cặp từ những nhóm khác nhau mang lại sự thụ phấn chéo: kỹ thuật hay được lan giữa các nhóm.</b-info-note>
    <b-info-note icon="info">Trong giai đoạn triển khai, người dùng đứng đầu có thể chi nhiều gấp cả chục lần mọi người khác. Tốt hơn là chưa đặt giới hạn ở giai đoạn này: giới hạn dễ làm nản chính những người áp dụng công cụ sớm nhất. Thay cho giới hạn, hãy thống nhất các thử nghiệm và một báo cáo kết quả. Giới hạn có ý nghĩa về sau, khi các cách làm đã được chứng minh và đã biết chi phí bình thường của một kịch bản.</b-info-note>
  </b-subsection>
  <b-subsection id="segments" title="Các nhóm hành vi">
    <b-art-chain label="nhóm → phỏng vấn → vấn đề → công cụ">
      <step art="chatgpt-enterprise-usage-report/chain-segment">nhóm</step>
      <step art="chatgpt-enterprise-usage-report/chain-custdev">phỏng vấn</step>
      <step art="chatgpt-enterprise-usage-report/chain-problem">vấn đề</step>
      <step art="chatgpt-enterprise-usage-report/chain-tool">công cụ</step>
    </b-art-chain>
    <b-why>Các nhóm chia theo cường độ hành vi, dựng từ nhiều bản xuất: một người nhắn bao nhiêu, chi bao nhiêu và làm những gì.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Nhóm hành vi</th><th class="bk-table-r">Số người</th><th>Chi tiết</th></tr>
      </thead><tbody>
      <tr><td>Viết code ở bất kỳ sản phẩm nào</td><td class="bk-table-r">44</td><td>19 người trong số đó không thuộc nhóm kỹ thuật</td></tr>
      <tr><td>Nghiên cứu chuyên sâu trong chat</td><td class="bk-table-r">58</td><td>trung bình hơn 1,900 tin nhắn</td></tr>
      <tr><td>Tác vụ giao cho tác nhân</td><td class="bk-table-r">33</td><td>kịch bản nhiều bước, trình kết nối</td></tr>
      <tr><td>Tạo ảnh</td><td class="bk-table-r">21</td><td>hai phần ba đến từ một nhóm</td></tr>
      <tr><td>Hoàn toàn không hoạt động</td><td class="bk-table-r">61</td><td>0 tin nhắn, $0 trong cả kỳ</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Nguồn: <a href="https://chatgpt.com/admin/usage/users" target="_blank" rel="noopener">Người dùng</a> · <a href="https://admin.openai.com" target="_blank" rel="noopener">Bảng xếp hạng</a></b-cap>
    <b-finding>
      <ex>Các nhóm lớn nhất để phỏng vấn khách hàng là nghiên cứu chuyên sâu (58) và code (44, trong đó 19 người ngoài các nhóm kỹ thuật). Với 61 người không hoạt động, câu hỏi khác: điều gì ngăn họ bắt đầu.</ex>
      <gen>Dữ liệu cho thấy mọi người làm gì chứ không cho thấy công cụ hiện tại có đủ với họ hay không. Vì vậy một nhóm hành vi là một giả thuyết: nó gợi ý nên mời ai vào phỏng vấn khách hàng, nên hỏi gì và mọi người có thể gặp những vấn đề nào. Ứng viên công cụ đã xuất hiện từ đây, còn việc chọn giữa chúng chỉ làm sau phỏng vấn, cho một vấn đề đã được xác nhận.</gen>
      <do>Với mỗi nhóm, nói chuyện với 2–3 người: công cụ hiện tại còn thiếu ở đâu và họ vẫn làm gì bằng tay. Thu thập ứng viên cho vấn đề đã xác nhận từ ba nguồn: tham vấn những người đổi mới trong công ty, chuyên gia bên ngoài và mốc tham chiếu thị trường, tức các công ty tương tự đang dùng gì. Sau đó đi theo <a href="#decision">quy trình ra quyết định</a>: khảo sát, so sánh và thử các ứng viên trên tác vụ thật. Nếu vấn đề không được xác nhận, hoãn nhóm đó đến lần tính lại tiếp theo.</do>
    </b-finding>
  </b-subsection>
</b-chapter>
<b-chapter id="layer2" icon="briefcase" title="Bản chất công việc">

  <b>Mục tiêu:</b> cho thấy mọi người giải những tác vụ nào bằng công cụ, với tính năng tích hợp nào và qua những tích hợp nào.

  <b-subsection id="connectors" title="Trình kết nối">
    <b-art-row names="chatgpt-enterprise-usage-report/conn-guess chatgpt-enterprise-usage-report/conn-data chatgpt-enterprise-usage-report/conn-errors" arrows/>
    <b-why>Trình kết nối nối trợ lý với dữ liệu công việc: chat, tài liệu, code, lịch. Chúng quyết định lượng ảo giác: không có quyền truy cập dữ liệu thì mô hình tự điền câu trả lời. <b>Quyết định:</b> kết nối nhóm nào và hệ thống nào trước.</b-why>
    <b-count-bars>
      <bar k="Slack" w="100%" color="c-work">520</bar>
      <bar k="Notion" w="65%" color="c-work">340</bar>
      <bar k="GitHub" w="40%" color="c-work">210</bar>
      <bar k="Lịch" w="29%" color="c-work">150</bar>
    </b-count-bars>
    <b-cap>Nguồn: <a href="https://chatgpt.com/admin/usage" target="_blank" rel="noopener">Tổng quan</a> · khối "App interactions"</b-cap>
    <b-finding>
      <ex>Slack và Notion chiếm 70% tổng số kết nối. Mô hình không thấy các hệ thống ngoài danh sách này: hỏi về chúng thì nó trả lời bằng cách đoán.</ex>
      <gen>Lượng ảo giác giảm ở nơi mô hình có đủ ngữ cảnh cần thiết. Thiếu nó, tác nhân cố tự lấp chỗ trống. Những nhóm có số kết nối bằng không là làm việc với mô hình khi nó mù, và hầu như câu trả lời nào về quy trình của họ cũng là đoán. Dấu hiệu trong phỏng vấn khách hàng: "Tôi phải kiểm tra lại mọi thứ".</gen>
      <do>Tìm các nhóm có số kết nối bằng không và hỏi trong phỏng vấn dữ liệu công việc của họ nằm ở đâu. Kết nối một nguồn như vậy rồi so trước và sau trên 10 câu hỏi giống hệt nhau: bao nhiêu câu trả lời sai và bao nhiêu câu dựa trên dữ liệu công việc.</do>
    </b-finding>
  </b-subsection>
  <b-subsection id="skills" title="Skill">
    <b-art-row names="chatgpt-enterprise-usage-report/skill-adhoc chatgpt-enterprise-usage-report/skill-repeat chatgpt-enterprise-usage-report/shared-skill" arrows/>
    <b-why>Skill cho thấy mức trưởng thành của quy trình: một kịch bản đã được mô tả thành skill sẽ lặp lại giống nhau với bất kỳ ai chạy nó. Thống kê cho biết skill nào được dùng và ai tự xây skill. <b>Quyết định:</b> quy trình nào đã có thể triển khai sang nhóm khác và quy trình nào còn phụ thuộc vào từng cá nhân.</b-why>
    <b-count-bars>
      <bar k="spreadsheets" w="100%" color="c-code">88</bar>
      <bar k="pdf" w="65%" color="c-code">57</bar>
      <bar k="skill-creator" w="33%" color="c-code">29</bar>
    </b-count-bars>
    <b-cap>Nguồn: <a href="https://chatgpt.com/admin/usage" target="_blank" rel="noopener">Tổng quan</a> · khối "Skills"</b-cap>
    <b-finding>
      <ex>Skill bảng tính và PDF có 88 và 57 lượt gọi: các quy trình này đã lặp lại được. 29 lượt gọi skill-creator: một số người đang biến kịch bản của mình thành skill.</ex>
      <gen>Mức trưởng thành của quy trình tăng theo từng bậc: yêu cầu dùng một lần → skill cá nhân → skill dùng chung của nhóm. Ở bậc đầu, kết quả phụ thuộc vào người hỏi và cách hỏi. Với skill thì kết quả lặp lại được: cùng đầu vào cho cùng kết quả. Skill dùng chung giúp quy trình chuyển được sang các nhóm khác.</gen>
      <do>Gom các skill vào một danh sách kèm tác giả và đánh dấu bậc của từng quy trình. Biến hai skill cá nhân được dùng nhiều nhất thành skill dùng chung: tác giả giới thiệu chúng cho nhóm bên cạnh, và nhóm kiểm tra xem cùng đầu vào có cho cùng kết quả không. Các kịch bản lặp lại mỗi tuần mà chưa có skill là ứng viên đầu tiên cho skill mới.</do>
    </b-finding>
  </b-subsection>
  <b-subsection id="projects" title="Chủ đề dự án">
    <b-art-row names="chatgpt-enterprise-usage-report/proj-files chatgpt-enterprise-usage-report/proj-topics chatgpt-enterprise-usage-report/proj-author" arrows/>
    <b-why>Bản tổng hợp nhóm các dự án theo ý nghĩa và cho thấy những tác vụ cụ thể mà mọi người chạy trong các dự án đang diễn ra. Với phỏng vấn khách hàng, đây là danh sách sẵn có: nên bàn tác vụ nào và với ai. <b>Quyết định:</b> phỏng vấn tác vụ nào và dự án của ai trước.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Chủ đề</th><th class="bk-table-r">Dự án</th><th>Tác vụ</th><th>Câu hỏi cho tác giả</th></tr>
      </thead><tbody>
      <tr><td>Bán hàng<b-cell-sub>Pitch library · Elif Demir</b-cell-sub></td><td class="bk-table-r">11</td><td>bài chào hàng, xử lý từ chối, đề xuất thương mại</td><td><b-cell-quote>"Mô hình làm tốt phần nào của bài chào hàng, và bạn viết lại phần nào?"</b-cell-quote></td></tr>
      <tr><td>Hội nhập nhân viên mới<b-cell-sub>New hire guide · Rafael Costa</b-cell-sub></td><td class="bk-table-r">8</td><td>hướng dẫn cho người mới, trả lời các câu hỏi thường gặp</td><td><b-cell-quote>"Những câu hỏi nào của người mới mà mô hình đã tự xử lý được khi không có bạn?"</b-cell-quote></td></tr>
      <tr><td>Nghiên cứu thị trường<b-cell-sub>Competitor notes · Jonas Keller</b-cell-sub></td><td class="bk-table-r">5</td><td>tóm tắt đối thủ, so sánh giá</td><td><b-cell-quote>"Bạn lấy dữ liệu từ đâu và nó cũ đi nhanh đến mức nào?"</b-cell-quote></td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Nguồn: <a href="https://chatgpt.com/admin/usage/projects" target="_blank" rel="noopener">Dự án</a> · tên được nhóm theo ý nghĩa</b-cap>
    <b-finding>
      <ex>Bán hàng (11) và hội nhập nhân viên mới (8) có nhiều dự án đang chạy nhất. Tác giả của những dự án lớn nhất là những người nên phỏng vấn đầu tiên.</ex>
      <gen>Một dự án là một cơ sở tri thức: các file và chỉ dẫn mà mô hình dựa vào trong mỗi câu trả lời. Cơ sở càng đầy, kết quả càng chính xác và ổn định. Nội dung của dự án gợi ý nên hỏi gì trong phỏng vấn: đã thêm những file nào, còn thiếu gì và câu trả lời còn phải sửa ở đâu.</gen>
      <do>Mở ba dự án hoạt động nhiều nhất ở mỗi chủ đề và liệt kê các tác vụ cụ thể. Trong phỏng vấn, hỏi tác giả câu trong bảng và những file, chỉ dẫn nào đã đổi chất lượng câu trả lời nhiều nhất. Biến cách thiết lập dự án thành công thành mẫu cho chủ đề đó.</do>
    </b-finding>
  </b-subsection>
</b-chapter>
<b-chapter id="layer3" icon="check-circle-alt-iv" title="Kiểm chứng">

  <b>Mục tiêu:</b> đối chiếu các bản tổng hợp với bản xuất gốc, danh sách dự án và bảng xếp hạng. Mọi con số trong báo cáo đều truy ngược được về dòng nguồn trong bản xuất.

  <b-subsection title="Danh sách dự án đầy đủ">
    <b-why>Toàn bộ dự án kèm tác giả và trạng thái. Danh sách này dùng để kiểm tra bản tổng hợp theo chủ đề và để tìm tác giả của một dự án cụ thể.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Dự án</th><th>Tác giả</th><th>Trạng thái</th><th class="bk-table-r">Tin nhắn</th></tr>
      </thead><tbody>
      <tr><td>Pitch library</td><td>Elif Demir</td><td><b-status-dot color="c-work">đang hoạt động</b-status-dot></td><td class="bk-table-r">268</td></tr>
      <tr><td>Price list 2026</td><td>Oskar Berg</td><td><b-status-dot color="c-work">đang hoạt động</b-status-dot></td><td class="bk-table-r">64</td></tr>
      <tr><td>Personal draft</td><td>Pavel Novak</td><td><b-status-dot color="c-none">bị bỏ</b-status-dot></td><td class="bk-table-r">0</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Nguồn: <a href="https://chatgpt.com/admin/usage/projects" target="_blank" rel="noopener">Dự án</a></b-cap>
    <b-finding>
      <ex>Dự án "Personal draft" có không tin nhắn nào.</ex>
      <gen>Dự án trống là một lần thử bị bỏ dở: người đó đã bắt đầu nhưng công cụ chưa bao giờ trở thành một phần công việc của họ. Nếu giữ những dự án như vậy, bản tổng hợp theo chủ đề sẽ phóng đại mức sử dụng.</gen>
      <do>Lọc bỏ các dự án có không tin nhắn trước khi đếm và mời 2–3 tác giả của chúng: lý do họ bỏ là một câu trả lời có giá trị.</do>
    </b-finding>
  </b-subsection>
  <b-subsection title="Bảng xếp hạng">
    <b-why>Bản xuất thanh toán theo từng người và từng sản phẩm. Công cụ chính và các danh sách top được tính từ đó.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Tên</th><th>Email</th><th class="bk-table-r">Credit</th><th class="bk-table-r">$</th></tr>
      </thead><tbody>
      <tr><td>Hana Sato</td><td>hana@example.com</td><td class="bk-table-r">10,955</td><td class="bk-table-r">438.20</td></tr>
      <tr><td>Mira Castellano</td><td>mira@example.com</td><td class="bk-table-r">2,425</td><td class="bk-table-r">97.00</td></tr>
      <tr><td>Jonas Keller</td><td>jonas@example.com</td><td class="bk-table-r">470</td><td class="bk-table-r">18.80</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Nguồn: <a href="https://admin.openai.com" target="_blank" rel="noopener">Bảng xếp hạng</a> · ba bản xuất với các bộ lọc "Product" khác nhau</b-cap>
    <b-finding>
      <ex>Ba bản xuất theo sản phẩm cộng lại đúng bằng tổng chi tiêu của từng người trong danh sách.</ex>
      <gen>Ba bản xuất với các bộ lọc Product khác nhau cộng lại bằng tổng chi tiêu của mỗi người. Chênh lệch trên 2% nghĩa là một bản xuất chưa đầy đủ hoặc các kỳ không khớp nhau.</gen>
      <do>Trước khi chia sẻ báo cáo, cộng ba bản xuất theo từng người và so với tổng chi tiêu. Nếu lệch, hãy xuất lại dữ liệu cho cùng một kỳ.</do>
    </b-finding>
  </b-subsection>
</b-chapter>
<b-chapter id="layer4" icon="target" title="Chọn người">

  <b>Mục tiêu:</b> chỉ ra những người cụ thể cho từng cách hoàn thành tác vụ.

  <b-subsection id="candidates" title="Ứng viên phỏng vấn">
    <b-why>Danh sách ngắn những người cho mỗi hướng đã tìm ra. Ở ví dụ, danh sách cuối cùng là 16 người trong 340; bảng hiện ba người đầu. Công ty của bạn sẽ có con số riêng. Báo cáo ChatGPT chỉ là một trong các nguồn để chọn mẫu: người dùng công cụ khác và những người đã bỏ được thêm theo quy tắc trong bài <a href="/blog/who-to-interview-before-buying-ai-tools/#groups">"Phỏng vấn ai"</a>, còn việc kiểm tra trên toàn bộ nhân viên làm bằng <a href="/blog/ai-interviews-without-leading-questions/#form">bảng khảo sát</a>.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Người</th><th>Hướng</th><th class="bk-table-r">Tín hiệu</th></tr>
      </thead><tbody>
      <tr><td>Hana Sato</td><td><b-status-dot color="c-code">code</b-status-dot></td><td class="bk-table-r">$438 / 3 tháng</td></tr>
      <tr><td>Mira Castellano</td><td><b-status-dot color="c-work">tác vụ giao cho tác nhân</b-status-dot></td><td class="bk-table-r">$97 / 3 tháng</td></tr>
      <tr><td>Jonas Keller</td><td><b-status-dot color="c-chat">nghiên cứu</b-status-dot></td><td class="bk-table-r">3,200+ tin nhắn</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Nguồn: các bản xuất người dùng, bảng xếp hạng và dự án, ghép theo email</b-cap>
    <b-finding>
      <ex>Hana Sato, Mira Castellano và Jonas Keller đại diện cho ba cách làm việc khác nhau: code, tác vụ giao cho tác nhân và nghiên cứu.</ex>
      <gen>Danh sách ngắn có một người cho mỗi hướng: code, tác vụ tác nhân, nghiên cứu. Nhờ vậy mỗi cuộc trò chuyện cho thấy một cách làm việc riêng và không lặp lại cuộc khác.</gen>
      <do>Đặt lịch ba cuộc phỏng vấn, mỗi hướng một cuộc. Sau đó quyết định hướng nào cần thêm 2–3 người.</do>
    </b-finding>
  </b-subsection>
  <b-subsection id="people" title="Bảng tất cả mọi người">
    <b-why>Tất cả mọi người, có bộ lọc theo nhóm, mức hoạt động, hướng và công cụ chính.</b-why>
    <b-filter-chips>
      <f>Nhóm B</f>
      <f>Hoạt động: hằng tuần</f>
      <f on>Công cụ: Work</f>
    </b-filter-chips>
    <b-table>
      <table><thead>
      <tr><th>Người</th><th>Nhóm</th><th>Chat / Work</th><th class="bk-table-r">$ / 3 tháng</th></tr>
      </thead><tbody>
      <tr><td>Tomás Reid</td><td>Nhóm B</td><td><b-split-bar parts="c-chat:28% c-work:72%"/></td><td class="bk-table-r">112.00</td></tr>
      <tr><td>Mira Castellano</td><td>Nhóm B</td><td><b-split-bar parts="c-chat:35% c-work:65%"/></td><td class="bk-table-r">97.00</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Nguồn: các bản xuất người dùng, bảng xếp hạng và dự án, ghép theo email</b-cap>
    <b-finding>
      <ex>Bộ lọc "Nhóm B" và "Công cụ: Work" còn lại hai người: Mira Castellano và Tomás Reid.</ex>
      <gen>Bảng tất cả mọi người với bộ lọc theo nhóm, mức hoạt động và công cụ chính là nền cho mọi lần chọn mẫu tiếp theo: danh sách cho một câu hỏi mới không cần xuất lại dữ liệu.</gen>
      <do>Lưu mỗi bộ lọc thành một chế độ xem riêng của bảng để danh sách lần sau chỉ cần một cú bấm.</do>
    </b-finding>
  </b-subsection>
</b-chapter>
<b-chapter id="start" title="Bắt đầu từ hôm nay">

  Không cần cả báo cáo cùng lúc: kết quả hữu ích đầu tiên, danh sách người dùng tích cực nhất, có ngay sau mục thứ hai.

  <b-checklist>
    <item t="Xuất danh sách người dùng và bảng xếp hạng cho ba tháng">Bảng xếp hạng xuất ba lần, mỗi sản phẩm một lần. Tác nhân trình duyệt có thể làm việc xuất này<b-link-chips><item href="https://claude.com/claude-in-chrome" icon="arrow-up-right">Claude in Chrome</item><item href="https://support.google.com/gemini/answer/16821166" icon="arrow-up-right">Gemini in Chrome</item><item href="https://www.perplexity.ai/comet" icon="arrow-up-right">Perplexity Comet</item></b-link-chips></item>
    <item t="Tính công cụ chính và top theo số tiền">Danh sách đầu tiên về những người dùng tích cực nhất đã có</item>
    <item t="Tính mức độ áp dụng">Ít nhất một lần / thường xuyên / hằng tuần, người chỉ làm việc qua Codex được đếm riêng</item>
    <item t="Lập danh sách người và đặt lịch phỏng vấn">Cách chọn những người này có trong bài "Phỏng vấn ai"</item>
  </b-checklist>
  <b-sublabel top="22">Câu hỏi thường gặp</b-sublabel>
  <b-qa>
    <q t="Bảng quản trị ChatGPT Enterprise cho thấy gì">Năm mục: người dùng, bảng xếp hạng, dự án, tổng quan và tác vụ. Từ đó có mức độ áp dụng, độ đồng đều giữa các nhóm, công cụ chính, bản chất tác vụ và việc đối chiếu với dữ liệu gốc.</q>
    <q t="Cách xuất dữ liệu từ bảng quản trị">Bảng quản trị có API, nhưng chúng chỉ phủ một phần dữ liệu: phân tích Codex, chi phí theo credit và nhật ký hội thoại phục vụ tuân thủ. Các bản xuất về người dùng, dự án, skill và bảng xếp hạng theo từng sản phẩm dễ lấy hơn qua giao diện, và việc xuất có thể giao cho Claude in Chrome.</q>
    <q t="Cách biết có cần giấy phép mới hay không">Mức độ áp dụng cho biết bao nhiêu người dùng công cụ ít nhất một lần, thường xuyên và hằng tuần. Nó quyết định nên đào tạo nhóm nào và có nên mua thêm giấy phép ngay không.</q>
    <q t="Cách chọn người để phỏng vấn">Người được chọn cho từng hướng đã tìm ra: ở ví dụ, danh sách cuối cùng là 16 người trong 340. Người dùng công cụ khác và những người đã bỏ được thêm theo quy tắc trong bài <a href="/blog/who-to-interview-before-buying-ai-tools/">“Phỏng vấn ai”</a>.</q>
  </b-qa>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Bảng quản trị ChatGPT Enterprise cho thấy gì?">Người dùng, bảng xếp hạng, dự án, tổng quan và tác vụ. Từ đó dựng được mức độ áp dụng, độ đồng đều giữa các nhóm và bản chất công việc.</q>
    <q t="Làm sao biết có cần thêm giấy phép không?">Dựa vào mức độ áp dụng: bao nhiêu người dùng ít nhất một lần, thường xuyên và hằng tuần. Mốc tham chiếu cho việc áp dụng rộng là 50–70% nhân viên.</q>
    <q t="Chênh lệch lớn giữa các nhóm nghĩa là gì?">Các kịch bản hiệu quả đã có nhưng chỉ nằm ở một hai nhóm. Lan chúng sang nhóm khác có lợi hơn mua thứ mới.</q>
    <q t="Sau báo cáo nên phỏng vấn ai?">Những người cho mỗi hướng đã tìm ra: ở ví dụ là 16 trong 340 người, gồm cả người dùng phần mềm khác hoặc đã bỏ.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Đọc tiếp">
  <b-links>
    <item href="/blog/who-to-interview-before-buying-ai-tools/" k="Phỏng vấn" t="Phỏng vấn ai">Cách xây mẫu phỏng vấn từ bảng tất cả mọi người</item>
    <item href="/blog/ai-interviews-without-leading-questions/" k="Phỏng vấn" t="Cách phỏng vấn mọi người về việc dùng AI">Một cuộc gọi, một bảng khảo sát và một bảng Airtable</item>
  </b-links>
</b-chapter>
<b-footer>Mọi tên, nhóm, địa chỉ và con số trong các ví dụ đều là hư cấu.</b-footer>
</b-post>
