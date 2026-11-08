---
title: Cách phỏng vấn và phân tích phỏng vấn về việc dùng AI: kịch bản 30 phút, prompt phân tích và bảng Airtable
date: 2026-09-28
updated: 2026-11-08
description: Kịch bản cuộc gọi 30 phút, quy tắc giữ đúng chủ đề, bảng khảo sát ngắn cho toàn công ty, phân tích phỏng vấn bằng ChatGPT hoặc tác nhân với prompt có sẵn, và đối chiếu lời nói với số đo trong báo cáo.
tags: AI, custdev, phỏng vấn
category: research
layout: wide
image: /og/ai-interviews-without-leading-questions.en.png
mentions: Airtable, tl;dv, ChatGPT, Claude Code, Model Context Protocol
toc: format=Chọn hình thức | prep=Chuẩn bị cho buổi gặp | script=Kịch bản 30 phút | focus=Giữ đúng chủ đề | base=Ghi nhận trong Airtable | agent=Cùng Claude Code | wording=Văn bản: cách đặt câu hỏi | form=Bảng khảo sát | after=Phân tích phỏng vấn | faq=Câu hỏi | next=Đọc thêm
---

Một cuộc phỏng vấn về việc làm việc với AI kéo dài 30 phút và xoay quanh tác vụ thật gần nhất: đã làm gì, kết quả và chi phí, rồi một trường hợp thành công và một trường hợp người đó bỏ AI hoặc chuyển sang cách khác. Người được hỏi tự chọn hình thức: gọi điện hoặc nhắn tin. Câu trả lời được phân tích bằng một prompt trong ChatGPT hoặc tác nhân AI (AI agent), đưa vào bảng Airtable và đối chiếu với số liệu sử dụng. Phần dưới có kịch bản, bảng khảo sát và prompt phân tích.

<b-post series="intervyu">
<b-credit para>Thiết kế phỏng vấn dựa trên các khuyến nghị của <a href="https://t.me/Kseniya_Vasil" target="_blank" rel="noopener">@Kseniya_Vasil</a>. Con người, nhóm và số liệu cho các cuộc phỏng vấn lấy từ <a href="/blog/chatgpt-enterprise-usage-report/">báo cáo sử dụng ChatGPT Enterprise</a>. Báo cáo cũng chứa <a href="/blog/chatgpt-enterprise-usage-report/#why">bài toán kinh doanh</a>: công ty quyết định gì, ai quyết định và dựa trên dấu hiệu nào.</b-credit>
<b-lead tight>Ở đây việc phân tích gồm bốn bước: văn bản cuộc trò chuyện được đưa vào ChatGPT với cùng một prompt mỗi lần, câu trả lời được sao chép vào hàng của người đó, bảng được nhóm theo khó khăn, và những điều lặp lại được kiểm tra bằng bảng khảo sát toàn công ty. Điều mọi người nói được so với số liệu của báo cáo. Phần dưới: kịch bản cuộc gọi, bảng và <a href="#after">prompt phân tích</a>.</b-lead>
<b-flow label="Hai hình thức phỏng vấn hội tụ về một bảng">
  <b-lane title="Giọng nói" color="c-chat">
    <node icon="phone" t="Cuộc gọi">30 phút</node>
    <node icon="record" t='<a href="https://tldv.io/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">tl;dv</a> · <a href="https://www.granola.ai/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">Granola</a>'>Ghi chú</node>
    <node icon="file-text" t="Bản ghi lời">Vào Notes</node>
  </b-lane>
  <b-lane title="Văn bản" color="c-work">
    <node icon="doc-lines" t="Câu hỏi">Trong chat</node>
    <node icon="chat" t="Hỏi thêm">1 tin nhắn</node>
    <node icon="file-text" t="Nhật ký chat">Sao chép vào Notes</node>
  </b-lane>
  <b-drop-arrows n="2"/>
  <b-airtable-preview icon="table" title='<a href="https://airtable.com" target="_blank" rel="noopener">Airtable</a>' sub="Mọi thứ trong một bảng" count="16 bản ghi">
    <col w="1.1fr" mw="1.2fr">Tên</col>
    <col w="1.7fr" kind="note">Ghi chú</col>
    <col w=".9fr" kind="wide">Hình thức</col>
    <col w="1fr" mw="1fr" kind="ours">Tần suất, tự khai</col>
    <col w="1fr" mw="1fr">Theo báo cáo</col>
    <col w=".9fr" kind="wide">Trạng thái</col>
    <row>Hana Sato | Người hỏi [00:00]: Hãy nhớ lại lần gần nhất… | <b-select-pill tone="cyan">giọng nói</b-select-pill> | <b-select-pill tone="green">hằng tuần</b-select-pill> | <b-select-pill tone="green">hằng tuần</b-select-pill> | <b-select-pill tone="green">Xong</b-select-pill></row>
    <row>Pavel Novak | [27.09 10:15] Người hỏi: Hãy mô tả lần gần nhất… | <b-select-pill tone="purple">văn bản</b-select-pill> | <b-select-pill tone="cyan">thường xuyên</b-select-pill> | <b-select-pill tone="red">không dùng</b-select-pill><b-match-mark kind="diff">≠</b-match-mark> | <b-select-pill tone="green">Xong</b-select-pill></row>
    <row>Nadia Rahimi | Người hỏi [00:00] | <b-select-pill tone="cyan">giọng nói</b-select-pill> | <b-select-pill tone="yellow">thỉnh thoảng</b-select-pill> | <b-select-pill tone="yellow">thỉnh thoảng</b-select-pill> | <b-select-pill tone="green">Xong</b-select-pill></row>
  </b-airtable-preview>
</b-flow>
<b-chapter id="format" icon="split" title="Chọn hình thức">
  <b-table>
    <table><thead><tr><th>Tiêu chí</th><th><b-icon name="mic" sw="2.2"/> Giọng nói</th><th><b-icon name="lines" sw="2.2"/> Văn bản</th></tr></thead><tbody>
    <tr><td>Độ sâu của câu trả lời</td><td><b-rating value="5" of="5" label="5 trên 5"/></td><td><b-rating value="2" of="5" label="2 trên 5"/></td></tr>
    <tr><td>Hỏi thêm ngay lúc đó</td><td><b-rating value="5" of="5" label="5 trên 5"/></td><td><b-rating value="1" of="5" label="1 trên 5"/></td></tr>
    <tr><td>Tiếp cận được bao nhiêu người</td><td><b-rating value="2" of="5" label="2 trên 5"/></td><td><b-rating value="5" of="5" label="5 trên 5"/></td></tr>
    <tr><td>Thời gian của người trả lời</td><td>30 phút</td><td>10 phút</td></tr>
    <tr><td>Nguy cơ lạc đề</td><td><b-rating value="4" of="5" warn label="4 trên 5"/></td><td><b-rating value="1" of="5" warn label="1 trên 5"/></td></tr>
    </tbody></table>
  </b-table>
  <b-cap>Các chấm là điểm từ 1 đến 5. Với nguy cơ, càng nhiều chấm càng tệ.</b-cap>
  <b-sublabel top="22">Kết hợp: người trả lời chọn hình thức</b-sublabel>
  <b-choice-flow label="Giọng nói hay văn bản — người trả lời chọn">
    <step t="Lời mời">Qua tin nhắn trực tiếp</step>
    <step t="Gọi được không?">30 phút</step>
    <opt k="có" tone="cyan" pill="giọng nói">cuộc gọi có trợ lý ghi chú</opt>
    <opt k="không" tone="purple" pill="văn bản">cùng các câu hỏi, từng câu một, trong chat</opt>
  </b-choice-flow>
  <b-finding>
    <ex>Giọng nói được 5 trên 5 về độ sâu, văn bản được 5 trên 5 về phạm vi tiếp cận. Mỗi người tự chọn hình thức.</ex>
    <gen>Khi mọi người tự chọn hình thức, ít người từ chối hơn. Các hình thức khác nhau về độ sâu: cuộc gọi cho câu chuyện chi tiết kèm câu hỏi thêm, chat cho câu trả lời ngắn. Vì vậy câu trả lời qua chat giúp tìm tình huống và chủ đề, nhưng không được coi ngang với cuộc gọi. Giọng nói là hình thức chính; chat dành cho người không gọi được. Bảng khảo sát toàn công ty là một công cụ riêng, được viết sau các cuộc phỏng vấn.</gen>
    <do>Đưa cả hai hình thức vào một câu trong lời mời: “Chúng ta gọi 30 phút nhé, hay bạn muốn trả lời các câu hỏi trong chat hơn?”</do>
  </b-finding>
</b-chapter>
<b-chapter id="prep" icon="mic" title="Chuẩn bị cho buổi gặp">
  <b-todo>
    <item t="Nhắc đến trợ lý ghi chú">Trong lời mời và lúc bắt đầu cuộc gọi: trợ lý ghi chú và bản ghi lời chỉ nhóm mới thấy, và câu trả lời vào báo cáo không kèm tên. Với <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link>, không lưu âm thanh</item>
    <item t='<a href="https://tldv.io/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">tl;dv</a> hoặc <a href="https://www.granola.ai/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">Granola</a>'><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> được nối với lịch và tự vào cuộc họp Google Meet hoặc Zoom. <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> chạy không cần bot, dùng âm thanh của máy tính, và chỉ giữ bản ghi lời cùng ghi chú</item>
    <item t="Hàng Airtable tạo sẵn">Tên, nhóm và số liệu từ <a href="/blog/chatgpt-enterprise-usage-report/#people">bảng tất cả mọi người</a>, trạng thái “Đang làm”, trước tin nhắn đầu tiên</item>
    <item t="Hướng dẫn mở trên màn hình thứ hai">Bảy khối kịch bản và đồng hồ đếm 30 phút</item>
    <item t="Một người hỏi, không ghi chép"><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> hoặc <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> làm bản ghi lời, ChatGPT làm phân tích</item>
  </b-todo>
  <b-finding>
    <do>Trước buổi gặp, kiểm tra xem <b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> có thấy cuộc họp trong lịch không hoặc <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> đã chạy trên máy tính chưa, và tạo hàng Airtable, để cuộc gọi chỉ còn lại các câu hỏi.</do>
  </b-finding>
</b-chapter>
<b-chapter id="script" icon="clock" title="Kịch bản 30 phút">
  <b-share-bar kind="time" label="30">
    <seg w="2" color="c-none" ink="ink">2</seg>
    <seg w="3" color="c-light">3</seg>
    <seg w="8" color="c-chat">8</seg>
    <seg w="5" color="c-proj">5</seg>
    <seg w="4" color="c-team">4</seg>
    <seg w="5" color="c-work">5</seg>
    <seg w="3" color="c-none" ink="ink">3</seg>
  </b-share-bar>
  <b-cap>Số phút cho mỗi khối</b-cap>
  <b-call-script>
    <step color="c-none" ink="ink" t="Mở đầu" q="&quot;Tôi đang tìm hiểu mọi người trong công ty thực sự hoàn thành các tác vụ công việc như thế nào. Đây không phải đánh giá bạn. Cả trường hợp thành công lẫn không thành công đều hữu ích như nhau với tôi. Có một trợ lý ghi chú đi cùng tôi: chỉ chúng ta thấy bản ghi lời, và câu trả lời vào báo cáo không kèm tên. Tôi bật nó được không?&quot;"></step>
    <step color="c-light" t="Vai trò và bối cảnh" q='"Bạn dành phần lớn tuần cho việc gì?"'>Những tác vụ nào lặp lại · bạn tìm thông tin và soạn thảo ở đâu</step>
    <step color="c-chat" t="Tác vụ công việc gần nhất" q='"Hãy nghĩ đến tác vụ công việc gần nhất đã tốn của bạn một lượng thời gian đáng kể. Bạn cần có được gì?"'>Bạn có những phương tiện nào · bạn chọn gì và vì sao · bạn đi đến kết quả bằng cách nào</step>
    <step color="c-proj" t="Kết quả và công sức" q='"Cuối cùng bạn có được gì, và tốn bao nhiêu công sức?"'>Phần nào dùng nguyên trạng · phần nào tự hoàn thiện · có những ràng buộc nào: dữ liệu, quyền truy cập, bảo mật</step>
    <step color="c-team" t="Một trường hợp thành công" q='"Hãy nghĩ đến một lần tác vụ tương tự suôn sẻ. Lúc đó khác ở điểm nào?"'>Công cụ · dữ liệu · sự chuẩn bị</step>
    <step color="c-work" t="Bỏ và chuyển sang cách khác" q='"Bạn đã bao giờ ngừng dùng một công cụ hoặc chuyển sang công cụ khác chưa? Việc đó diễn ra thế nào?"'>Công cụ nào · chuyển sang gì · vì sao. Nếu chưa từng, bỏ qua</step>
    <step color="c-none" ink="ink" t="Kết thúc" q="&quot;Tôi chưa hỏi điều gì mà quan trọng để hiểu công việc của bạn?&quot;">Cảm ơn · nói rằng câu trả lời vào phần phân tích chung không kèm tên</step>
  </b-call-script>
  <b-branch icon="git-branch" t="Nếu người đó không nhắc đến AI">Đừng hỏi vì sao họ không dùng. Hãy hỏi họ đã làm tác vụ thế nào và đã cân nhắc những phương án nào. Chỉ hỏi về AI nếu chính người đó nêu nó như một phương án khả dĩ</b-branch>
  <b-finding>
    <ex>Tác vụ gần nhất, kết quả và công sức chiếm 13 trong 30 phút; trường hợp thành công cùng việc bỏ hoặc chuyển chiếm thêm 9.</ex>
    <gen>Cuộc trò chuyện được xây quanh công việc, không phải công cụ. Điều đó cho thấy AI giúp ở đâu, người ta chọn cách khác ở đâu, và ở đâu không cần công cụ mới. Trường hợp thành công cho thấy cái gì đã chạy tốt; việc bỏ và chuyển cho thấy vì sao công cụ bị thay.</gen>
    <do>Đặt đồng hồ: đến phút thứ 5, chuyển sang tác vụ công việc gần nhất. Nếu chưa, rút bối cảnh còn một câu hỏi. Chọn chủ đề tác vụ giúp người đó: các tác vụ của họ hiện trong <a href="/blog/chatgpt-enterprise-usage-report/#projects">Chủ đề dự án</a>.</do>
  </b-finding>
</b-chapter>
<b-chapter id="focus" icon="target" title="Giữ đúng chủ đề">
  <b-rules>
    <rule icon="parking" t="Bãi đỗ ý kiến">Điểm lạc đề vào một trường riêng; quay lại chúng trong 2 phút cuối</rule>
    <rule icon="one" t="Mỗi lần một câu hỏi">Không có “và còn…” trong cùng một câu</rule>
    <rule icon="undo" t="Quay về tình huống">Ý kiến chung → “Bạn nhớ ra một lần cụ thể không?”</rule>
    <rule icon="shield-off" t="Đừng bênh vực công cụ">Đáp lại lời chê chỉ bằng “Sau đó chuyện gì xảy ra?”</rule>
    <rule icon="pause" t="Dừng 5 giây">Im lặng sau một câu trả lời: người ta thường tự thêm điểm mấu chốt</rule>
    <rule icon="bulb-off" t="Đừng gợi ý giải pháp">Không đưa ý tưởng của mình, không nêu tên sản phẩm khác</rule>
  </b-rules>
  <b-sublabel top="22">Tình huống → nên nói gì</b-sublabel>
  <b-table>
    <table><thead>
    <tr><th>Tình huống</th><th>Lời của người hỏi</th></tr>
    </thead><tbody>
    <tr><td>Đòi một tính năng mới</td><td>“Lần gần nhất bạn cần nó là khi nào? Lúc đó bạn đã làm gì?”</td></tr>
    <tr><td>Trôi sang than phiền về quy trình</td><td>“Tôi sẽ ghi vào bãi đỗ ý kiến. Quay lại tác vụ báo cáo: sau đó chuyện gì xảy ra?”</td></tr>
    <tr><td>Trả lời bằng “thường” và “luôn luôn”</td><td>“Còn lần gần nhất thì diễn ra thế nào?”</td></tr>
    <tr><td>Hỏi ý kiến của người hỏi</td><td>“Tôi sẽ chia sẻ ở cuối. Bây giờ điều quan trọng là nó hoạt động với bạn ra sao”</td></tr>
    <tr><td>Hết thời gian của khối</td><td>“Điều đó quan trọng, hãy ghi lại. Tôi chuyển sang câu hỏi tiếp theo”</td></tr>
    </tbody></table>
  </b-table>
  <b-finding>
    <ex>Năm tình huống thường gặp, mỗi tình huống có một câu đưa cuộc trò chuyện về lại tình tiết.</ex>
    <gen>Đằng sau một yêu cầu tính năng có một trường hợp cụ thể, và trường hợp đó mới là thứ bạn cần. Bản thân yêu cầu hữu ích về sau như một gợi ý nơi tìm vấn đề.</gen>
    <do>Giữ bảng câu bên cạnh hướng dẫn và ghi nguyên văn mọi yêu cầu tính năng vào một trường riêng của bảng dành cho các mục lạc đề.</do>
  </b-finding>
</b-chapter>
<b-chapter id="base" icon="table" title="Ghi nhận trong Airtable">
  <b-why>Bảng giữ mọi người trong mẫu, các cuộc trò chuyện của họ và số liệu báo cáo ở một chỗ. <b>Quyết định:</b> mời thêm ai để mỗi nhóm đủ số cuộc phỏng vấn, gửi tin hỏi thêm cho ai, và những chênh lệch nào giữa mức dùng tự khai và đo được cần bàn với người đó.</b-why>
  <b-pipe label="Đường đi của một bản ghi từ cuộc gọi đến bảng">
    <node icon="record" color="c-chat" sub="Bản ghi lời"><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> · <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link></node>
    <node icon="table" color="c-proj" sub="Trường Ghi chú trong hàng của người đó"><b-ink-link href="https://airtable.com" plain>Airtable</b-ink-link></node>
  </b-pipe>
  <b-tool-links>
    <item href="https://airtable.com" icon="external" sub="Cơ sở và biểu mẫu">Airtable</item>
    <item href="https://tldv.io" icon="external" sub="Ghi chú và bản ghi lời cuộc gọi">tl;dv</item>
    <item href="https://www.granola.ai/" icon="external" sub="Ghi chú không cần bot, không lưu âm thanh">Granola</item>
  </b-tool-links>
  <b-cap>Giọng nói: bản ghi lời của <b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> hoặc <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> được sao chép vào trường Ghi chú. Văn bản: nhật ký chat được sao chép vào cùng trường với ngày giờ của từng tin nhắn.</b-cap>
  <b-sublabel top="22">Một bảng: một hàng cho mỗi người</b-sublabel>
  <b-airtable-grid foot="16 bản ghi · hiển thị 9">
    <field type="A" kind="name">Tên</field>
    <field type="≡" kind="note">Ghi chú</field>
    <field type="◉">Hình thức</field>
    <field type="◉">Nhóm</field>
    <field type="◉">Trạng thái</field>
    <field type="◉" kind="ours">Tần suất · tự khai</field>
    <field type="◉">Tần suất · theo báo cáo</field>
    <field type="ƒ" kind="mark">≠</field>
    <field type="#" kind="num">Token · 3 tháng</field>
    <field type="#" kind="num">$ / 3 tháng</field>
    <field type="▦" kind="num">Hoạt động</field>
    <row>Hana Sato | Người hỏi [00:00]: Hãy nhớ lại lần gần nhất bạn… | <b-select-pill tone="cyan">giọng nói</b-select-pill> | code | <b-select-pill tone="green">Xong</b-select-pill> | <b-select-pill tone="green">hằng tuần</b-select-pill> | <b-select-pill tone="green">hằng tuần</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 21.9M | 438 | 25.09</row>
    <row>Luis Moreno | Người hỏi [00:00]: Cảm ơn bạn đã dành thời gian… | <b-select-pill tone="cyan">giọng nói</b-select-pill> | code | <b-select-pill tone="green">Xong</b-select-pill> | <b-select-pill tone="cyan">thường xuyên</b-select-pill> | <b-select-pill tone="green">hằng tuần</b-select-pill> | <b-match-mark kind="diff">≠</b-match-mark> | 12.7M | 396 | 24.09</row>
    <row>Mira Castellano | [26.09 18:40] Người hỏi: Bạn đã mong đợi kết quả nào… | <b-select-pill tone="purple">văn bản</b-select-pill> | tác nhân | <b-select-pill tone="yellow">Một phần</b-select-pill> | <b-select-pill tone="cyan">thường xuyên</b-select-pill> | <b-select-pill tone="cyan">thường xuyên</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 3.9M | 97 | 26.09</row>
    <row>Jonas Keller | Người hỏi [00:00]: Bạn dành phần lớn… | <b-select-pill tone="cyan">giọng nói</b-select-pill> | nghiên cứu | <b-select-pill tone="green">Xong</b-select-pill> | <b-select-pill tone="green">hằng tuần</b-select-pill> | <b-select-pill tone="green">hằng tuần</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 1.1M | 19 | 26.09</row>
    <row>Ben Ortiz |  |  | chỉ Codex | <b-select-pill tone="cyan">Chờ phản hồi</b-select-pill> |  | <b-select-pill tone="purple">chỉ Codex</b-select-pill> |  | 3.2M | 64 | 22.09</row>
    <row>Pavel Novak | [27.09 10:15] Người hỏi: Hãy mô tả tác vụ gần nhất… | <b-select-pill tone="purple">văn bản</b-select-pill> | không hoạt động | <b-select-pill tone="green">Xong</b-select-pill> | <b-select-pill tone="cyan">thường xuyên</b-select-pill> | <b-select-pill tone="red">không dùng</b-select-pill> | <b-match-mark kind="diff">≠</b-match-mark> | 0 | 0 | —</row>
    <row>Sara Quinn |  |  | không hoạt động | <b-select-pill tone="red">Từ chối</b-select-pill> |  | <b-select-pill tone="red">không dùng</b-select-pill> |  | 0 | 0 | —</row>
    <row>Nadia Rahimi | Người hỏi [00:00]: Hôm qua bạn đã làm gì trong ChatGPT… | <b-select-pill tone="cyan">giọng nói</b-select-pill> | công cụ khác | <b-select-pill tone="green">Xong</b-select-pill> | <b-select-pill tone="yellow">thỉnh thoảng</b-select-pill> | <b-select-pill tone="yellow">thỉnh thoảng</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 0.3M | 6 | 20.09</row>
    <row>Elif Demir |  |  | dự án | <b-select-pill tone="gray">Đang làm</b-select-pill> |  | <b-select-pill tone="green">hằng tuần</b-select-pill> |  | 1.8M | 41 | 27.09</row>
  </b-airtable-grid>
  <b-cap>ChatGPT điền vào trường màu cam từ cuộc trò chuyện trong Ghi chú. “Theo báo cáo”, “Token”, “$” và “Hoạt động” lấy từ <a href="/blog/chatgpt-enterprise-usage-report/">báo cáo sử dụng ChatGPT Enterprise</a>. Trường “≠” là công thức so sánh hai tần suất.</b-cap>
  <b-sublabel top="22">Đọc bảng: mỗi cột cho bạn biết gì</b-sublabel>
  <b-table>
    <table><thead>
    <tr><th>Cột</th><th>Nguồn</th><th>Ảnh hưởng đến gì</th></tr>
    </thead><tbody>
    <tr><td>Tên · Nhóm</td><td><a href="/blog/who-to-interview-before-buying-ai-tools/#groups">Mẫu “Tám nhóm”</a></td><td>người đó đại diện cho cách hoàn thành tác vụ nào</td></tr>
    <tr><td>Ghi chú</td><td><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link>, <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> hoặc nhật ký chat</td><td>nguồn cho mọi trường; mọi kết luận đều được đối chiếu với một trích dẫn</td></tr>
    <tr><td>Hình thức</td><td>người hỏi</td><td>độ sâu của câu trả lời: chat ít chi tiết hơn cuộc gọi</td></tr>
    <tr><td>Trạng thái</td><td>người hỏi</td><td>hành động tiếp theo: nhắc, hỏi thêm, hoặc thay người</td></tr>
    <tr><td>Tần suất · tự khai</td><td>ChatGPT lấy từ cuộc trò chuyện</td><td>người đó nói mình dùng AI thường xuyên đến đâu</td></tr>
    <tr><td>Tần suất · theo báo cáo</td><td><a href="/blog/chatgpt-enterprise-usage-report/#depth">báo cáo · độ sâu áp dụng</a></td><td>họ dùng thường xuyên đến đâu theo dữ liệu của bảng điều khiển</td></tr>
    <tr><td>≠</td><td>Công thức Airtable: so sánh hai tần suất</td><td>không khớp: một câu hỏi cần làm rõ trong phỏng vấn, vì báo cáo chỉ thấy công cụ của công ty trong 3 tháng</td></tr>
    <tr><td>Token · 3 tháng</td><td>báo cáo · <a href="/blog/chatgpt-enterprise-usage-report/#top-spend">xếp hạng theo chi tiêu</a></td><td>khối lượng công việc trong công cụ của công ty trong 3 tháng, để chọn mẫu, không để đặt trọng số cho câu trả lời</td></tr>
    <tr><td>$ · 3 tháng</td><td>báo cáo · bảng xếp hạng</td><td>chi tiêu trong 3 tháng, để chọn mẫu, không để đặt trọng số cho câu trả lời</td></tr>
    <tr><td>Hoạt động</td><td>báo cáo · xuất danh sách người dùng</td><td>ngày của hành động gần nhất: lâu rồi nghĩa là ứng viên cho nhóm “Đã thử và bỏ”</td></tr>
    </tbody></table>
  </b-table>
  <b-sublabel top="22">Cách đọc các hàng mẫu</b-sublabel>
  <b-table>
    <table><thead>
    <tr><th>Hàng</th><th>Tín hiệu</th><th>Làm gì</th></tr>
    </thead><tbody>
    <tr><td>Hana Sato</td><td>tần suất khớp · $438 cho code · <b-select-pill tone="green">Xong</b-select-pill></td><td>chi tiêu cao nhất cho code: cuộc trò chuyện về tác vụ gần nhất của cô cho thấy công cụ hiện tại có đủ không</td></tr>
    <tr><td>Luis Moreno</td><td><b-match-mark kind="diff">≠</b-match-mark> nói “thường xuyên”, thực tế là hằng tuần</td><td>làm rõ: anh ấy tính những tác vụ nào là việc dùng AI</td></tr>
    <tr><td>Pavel Novak</td><td><b-match-mark kind="diff">≠</b-match-mark> “thường xuyên” nhưng token bằng không</td><td>làm rõ: anh ấy dùng những công cụ nào và cho tác vụ nào</td></tr>
    <tr><td>Mira Castellano</td><td><b-select-pill tone="yellow">Một phần</b-select-pill></td><td>gửi một tin hỏi thêm: ở chỗ nào trong tác vụ họ phải tự hoàn thiện bằng tay</td></tr>
    <tr><td>Ben Ortiz</td><td><b-select-pill tone="cyan">Chờ phản hồi</b-select-pill> · chỉ Codex · $64</td><td>gửi lời nhắc: không có anh ấy, nhóm “chỉ Codex” vẫn trống</td></tr>
    <tr><td>Sara Quinn</td><td><b-select-pill tone="red">Từ chối</b-select-pill></td><td>thay theo <a href="/blog/who-to-interview-before-buying-ai-tools/#teams">quy tắc thay thế</a>: ứng viên kế tiếp của nhóm “Không hoạt động”</td></tr>
    <tr><td>Elif Demir</td><td><b-select-pill tone="gray">Đang làm</b-select-pill> · 7 dự án đang hoạt động</td><td>hẹn một cuộc gọi; điền tần suất tự khai sau cuộc trò chuyện</td></tr>
    </tbody></table>
  </b-table>
  <b-sublabel top="22">Tự khai và dữ liệu: cần làm rõ gì trong phỏng vấn</b-sublabel>
  <b-vs-grid>
    <h>Đo trong phỏng vấn</h>
    <h>Cặp tương ứng trong báo cáo</h>
    <h>Nếu khác nhau, hãy làm rõ</h>
    <c><b>Dùng thường xuyên đến đâu</b></c>
    <c><a href="/blog/chatgpt-enterprise-usage-report/#depth">hoạt động hằng tuần</a></c>
    <c>người đó dùng những công cụ nào và cho tác vụ nào</c>
    <c><b>Tác vụ chính</b></c>
    <c><a href="/blog/chatgpt-enterprise-usage-report/#main-tool">công cụ chính</a></c>
    <c>người đó tính những tác vụ nào là việc dùng AI</c>
    <c><b>Phủ được bao nhiêu tác vụ</b></c>
    <c><a href="/blog/chatgpt-enterprise-usage-report/#projects">số dự án</a></c>
    <c>dự án nào còn sống và cho tác vụ nào</c>
    <c><b>Còn dùng gì khác</b></c>
    <c><a href="/blog/chatgpt-enterprise-usage-report/#connectors">trình kết nối</a></c>
    <c>các công cụ đó là gì và cho tác vụ nào; ghi lại như một cách làm việc</c>
    <c><b>Tiết kiệm được bao nhiêu thời gian</b></c>
    <c>không có cặp</c>
    <c>chỉ có tự khai</c>
  </b-vs-grid>
  <b-cap>Giới hạn của dữ liệu: báo cáo chỉ thấy công cụ của công ty và chỉ trong 3 tháng. Tài khoản cá nhân và công cụ khác không hiện trong đó, nên sự không khớp là một câu hỏi cần làm rõ, không phải một kết luận.</b-cap>
  <b-sublabel top="22">Trạng thái của 16 người được mời</b-sublabel>
  <b-share-bar kind="status" label="Phân bổ trạng thái">
    <seg w="9" color="pg" ink="pg-i">Xong · 9</seg>
    <seg w="2" color="py" ink="py-i">2</seg>
    <seg w="2" color="pc" ink="pc-i">2</seg>
    <seg w="2" color="pn" ink="pn-i">2</seg>
    <seg w="1" color="pr" ink="pr-i">1</seg>
  </b-share-bar>
  <b-legend>
    <item color="pg">Xong</item>
    <item color="py">Một phần</item>
    <item color="pc">Chờ phản hồi</item>
    <item color="pn">Đang làm</item>
    <item color="pr">Từ chối</item>
  </b-legend>
  <b-finding>
    <ex>9 trong 16 người được mời đã phỏng vấn: tỷ lệ “Xong” là 56%. Tần suất tự khai của Pavel Novak không khớp với báo cáo.</ex>
    <gen>Một hàng cho mỗi người giữ số liệu báo cáo, hình thức, cuộc trò chuyện gốc và trạng thái ở cùng nhau. Các trạng thái cho thấy bạn đã đủ người chưa: tỷ lệ “Xong” trong số người được mời cho biết cần mời bao nhiêu để mỗi nhóm đủ số cuộc phỏng vấn cần thiết. Chênh lệch giữa mức dùng tự khai và đo được là một câu hỏi cần làm rõ: báo cáo chỉ thấy công cụ của công ty trong 3 tháng.</gen>
    <do>Cập nhật trạng thái ngay sau mỗi cuộc trò chuyện. Giữ đủ số cuộc phỏng vấn cần thiết ở mỗi nhóm: với tỷ lệ “Xong” 56%, hãy mời bốn người để có hai cuộc phỏng vấn mỗi nhóm. Gửi một tin hỏi thêm cho mọi người được đánh dấu Một phần.</do>
  </b-finding>
</b-chapter>
<b-chapter id="wording" icon="lines" title="Văn bản: cách đặt câu hỏi">
  <b-why>Trong chat hoặc bảng khảo sát khó hỏi lại, nên một câu hỏi diễn đạt kém sẽ làm hỏng câu trả lời mà không còn cơ hội sửa. Năm lỗi thường gặp:</b-why>
  <b-question-pairs>
    <pair tag="gợi ý đáp án" bad="Công cụ này tiện với bạn đến đâu?">Hãy mô tả tác vụ công việc gần nhất đã tốn của bạn một lượng thời gian đáng kể.</pair>
    <pair tag="khiêu khích" bad="Sao bạn không dùng công cụ nếu công ty trả tiền?">Bạn đã làm tác vụ cùng loại gần nhất như thế nào? Bạn đã cân nhắc những phương án nào?</pair>
    <pair tag="yêu cầu tính năng" bad="Bạn còn thiếu những tính năng nào?">Ở thời điểm nào trong tác vụ gần nhất bạn phải hoàn thiện công việc bằng tay?</pair>
    <pair tag="giả định" bad="Bạn có dùng nhiều hơn nếu nó có tác nhân không?">Lần gần nhất kết quả không dùng được với bạn, bạn đã làm gì?</pair>
    <pair tag="hai câu trong một" bad="Bạn làm gì trong công cụ và làm thường xuyên đến đâu?">Tác vụ gần nhất bạn làm với AI là gì?</pair>
  </b-question-pairs>
  <b-finding>
    <ex>Cả năm câu đã sửa đều hỏi về một tình tiết trong quá khứ.</ex>
    <gen>Các câu hỏi về sự tiện lợi, tính năng và tương lai thu thập ý kiến. Quyết định mua dựa trên những gì người ta đã làm, nên một câu hỏi tốt hỏi về một trường hợp cụ thể trong quá khứ.</gen>
    <do>Đọc lại các câu hỏi trong chat và bảng khảo sát rồi viết lại mọi câu có “tiện”, “bạn có muốn” hoặc “những tính năng nào” thành câu hỏi về tác vụ công việc gần nhất.</do>
  </b-finding>
</b-chapter>
<b-chapter id="agent" icon="terminal" title="Điền bảng với Claude Code">
  <b-why>Có thể giao cả bảng cho một tác nhân: Claude Code hoặc tác nhân khác hỗ trợ MCP kết nối với Airtable và tự tạo hàng, lấy số liệu báo cáo và phân tích các cuộc trò chuyện.</b-why>
  <b-pipe label="Tác nhân điền bảng">
    <node icon="terminal" color="c-code" sub="Hoặc tác nhân bất kỳ hỗ trợ MCP"><b-ink-link href="https://code.claude.com/docs" plain>Claude Code</b-ink-link></node>
    <node icon="plug" color="c-light" sub="Đọc và ghi bảng">Airtable MCP</node>
    <node icon="table" color="c-proj" sub="Mọi trường và trạng thái">Airtable</node>
  </b-pipe>
  <b-todo top="12">
    <item t="Tạo hàng">Từ danh sách những người được chọn để phỏng vấn: tên, nhóm, trạng thái</item>
    <item t="Lấy số liệu báo cáo">Token, $, hoạt động, tần suất theo báo cáo</item>
    <item t="Phân tích Ghi chú">Với cùng prompt như trong ChatGPT: các trường, khó khăn, tần suất tự khai, trích dẫn</item>
    <item t="Cập nhật trạng thái">“Một phần” (câu trả lời chưa đầy đủ) nếu phân tích có “không có dữ liệu”</item>
  </b-todo>
  <b-tool-links>
    <item href="https://support.airtable.com/docs/using-the-airtable-mcp-server" icon="external" sub="Cách kết nối">Airtable MCP</item>
  </b-tool-links>
  <b-finding>
    <ex>Tác nhân tạo hàng, lấy báo cáo, phân tích Ghi chú và cập nhật trạng thái: bốn bước không nhập tay.</ex>
    <gen>Qua MCP, tác nhân làm việc trực tiếp với bảng, để lại cho nhà nghiên cứu các cuộc trò chuyện và việc đối chiếu kết luận với trích dẫn. Một prompt phân tích cho cả tác nhân lẫn ChatGPT giữ cho các hàng so sánh được với nhau.</gen>
    <do>Kết nối Airtable MCP với Claude Code và bắt đầu bằng một lệnh: “Tạo hàng cho những người trong danh sách với trạng thái Đang làm”.</do>
  </b-finding>
</b-chapter>
<b-chapter id="form" icon="doc-lines" title="Bảng khảo sát">
  <b-why>Bảng khảo sát được viết sau các cuộc phỏng vấn, khi đã biết những tác vụ và khó khăn nào xuất hiện. Nó được gửi cho cả công ty để biết chúng phổ biến đến đâu. Câu hỏi ngắn, và các lựa chọn trả lời đến từ phần phân tích phỏng vấn.</b-why>
  <b-survey>
    <q t="Bạn làm những tác vụ nào trong số này ở nơi làm việc?" color="c-proj" tag="tác vụ">chọn: các tác vụ từ phỏng vấn · khác, ô tự do</q>
    <q t="Bạn làm các tác vụ này thường xuyên đến đâu?" color="c-proj" tag="tần suất tác vụ">chọn: mỗi ngày · mỗi tuần · ít hơn · tôi không làm</q>
    <q t="Bạn dùng những công cụ nào cho chúng?" color="c-proj" tag="công cụ">chọn: ChatGPT · Claude · Cursor · công cụ AI khác · tôi không dùng AI</q>
    <q t="Bạn gặp những khó khăn nào trong các tác vụ này?" color="c-proj" tag="khó khăn">chọn: các khó khăn từ phỏng vấn · tôi không gặp khó khăn nào · khác, ô tự do</q>
    <q t="Khó khăn này cản trở thường xuyên đến đâu?" color="c-proj" tag="tần suất khó khăn">chọn: gần như ở mọi tác vụ · đôi khi · hiếm khi</q>
    <q t="Nó quan trọng thế nào với kết quả?" color="c-proj" tag="mức ảnh hưởng">chọn: cản trở nhiều · cản trở · hầu như không quan trọng</q>
    <q t="Hiện giờ bạn xoay xở với khó khăn này thế nào?" tag="cách xoay xở">ô tự do · tôi không</q>
    <q t="Còn điều gì quan trọng mà các câu hỏi bỏ sót?" tag="điều bị bỏ sót">ô tự do</q>
  </b-survey>
  <b-finding>
    <ex>Tám câu hỏi ngắn: sáu câu trắc nghiệm với lựa chọn từ phỏng vấn và hai ô tự do.</ex>
    <gen>Các cuộc phỏng vấn cho thấy có những tác vụ và khó khăn nào; bảng khảo sát cho thấy có bao nhiêu người gặp chúng và chúng cản trở đến mức nào. Các lựa chọn “tôi không gặp khó khăn nào”, “tôi không dùng AI” và ô tự do bắt được những gì phỏng vấn bỏ sót.</gen>
    <do>Thu thập các lựa chọn trả lời từ phần phân tích phỏng vấn và gửi bảng khảo sát cho cả công ty. Đếm tỷ lệ người gặp từng khó khăn, thường xuyên đến đâu và cản trở đến mức nào. Các tỷ lệ này đưa vào <a href="/blog/chatgpt-enterprise-usage-report/#decision">quy trình ra quyết định</a> trong báo cáo.</do>
  </b-finding>
</b-chapter>
<b-chapter id="after" icon="bulb" title="Phân tích phỏng vấn: prompt phân tích và đối chiếu với số liệu báo cáo">
  <b-steps round>
    <step t="Đưa văn bản Ghi chú cho ChatGPT">Với cùng một prompt cho mọi cuộc phỏng vấn</step>
    <step t="Chuyển câu trả lời của ChatGPT vào hàng của người đó">Tác vụ, bối cảnh, cách đã chọn, kết quả, công sức, ràng buộc, khó khăn, tần suất tự khai</step>
    <step t="Nhóm bảng theo khó khăn">Những người cùng một khó khăn nằm cạnh nhau: bạn thấy có bao nhiêu người và từ nhóm nào</step>
    <step t="Kiểm tra bằng bảng khảo sát">Các điều lặp lại trở thành lựa chọn trả lời trong bảng khảo sát toàn công ty; phân bổ theo nhóm được so với <a href="/blog/chatgpt-enterprise-usage-report/#uniformity">Mức đồng đều</a></step>
  </b-steps>
  <b-subhead>Prompt phân tích phỏng vấn</b-subhead>
  <b-prompt>
    Dưới đây là cuộc trò chuyện với một nhân viên về các tác vụ công việc của họ.
    Trả về đúng theo từng trường, chỉ những gì chính người đó đã nói:
    1. Tác vụ: tác vụ công việc cụ thể gần nhất
    2. Bối cảnh: cho ai và vì sao, có những phương tiện nào
    3. Công cụ hoặc cách đã chọn, và vì sao
    4. Kết quả
    5. Công sức: thời gian và việc làm lại bằng tay
    6. Ràng buộc: dữ liệu, quyền truy cập, bảo mật
    7. Khó khăn: các nhóm từ danh sách {các nhóm từ bảng dấu hiệu của báo cáo} hoặc “không có khó khăn”; nếu không nhóm nào phù hợp, một nhóm mới bằng lời của bạn
    8. Tần suất tự khai: hằng tuần / thường xuyên / thỉnh thoảng / không dùng / không rõ
    9. 1–2 trích dẫn nguyên văn
    Nếu điều gì không có trong cuộc trò chuyện, hãy viết “không có dữ liệu” và đừng bịa.

    {văn bản từ Ghi chú}
  </b-prompt>
  <b-gauge label="Làm gì với một điều lặp lại">
    <row k="1 người" w="15%" color="c-none">một trường hợp</row>
    <row k="lặp lại ở nhiều người" w="45%" color="c-light">kiểm tra bằng bảng khảo sát</row>
    <row k="khảo sát xác nhận" w="100%" color="c-work">đưa vào quy trình ra quyết định</row>
  </b-gauge>
  <b-finding>
    <ex>Khó khăn của một người là một trường hợp; lặp lại ở nhiều người là lý do để kiểm tra bằng bảng khảo sát.</ex>
    <gen>Phân tích giữ nguyên cả tác vụ, không chỉ khó khăn: thiếu bối cảnh, cách đã chọn và công sức thì không thể biết có cần công cụ mới hay không. Một điều lặp lại trong phỏng vấn cho thấy cần kiểm tra gì, không cho thấy bao nhiêu người gặp: chỉ bảng khảo sát mới cho thấy điều đó. Một prompt cho mọi cuộc trò chuyện giữ các trường so sánh được, và “không có dữ liệu” ngăn ChatGPT bịa.</gen>
    <do>Khi đã có vài bản phân tích, hãy nhóm bảng theo khó khăn và chuyển các điều lặp lại vào lựa chọn trả lời của <a href="#form">bảng khảo sát</a>. Ghi “không có khó khăn” như một kết quả. Lấy các nhóm từ <a href="/blog/chatgpt-enterprise-usage-report/#signs">bảng dấu hiệu</a> của báo cáo và thêm nhóm mới nếu không nhóm nào phù hợp. Quyết định thí điểm theo <a href="/blog/chatgpt-enterprise-usage-report/#decision">quy trình</a> trong báo cáo.</do>
  </b-finding>
  <b-sublabel top="22">Câu hỏi thường gặp</b-sublabel>
  <b-qa>
    <q t="Phân tích phỏng vấn bằng ChatGPT như thế nào">Văn bản cuộc trò chuyện từ trường Ghi chú được đưa vào ChatGPT với cùng một prompt cho mọi cuộc phỏng vấn. Câu trả lời được sao chép vào hàng của người đó: tác vụ, bối cảnh, cách làm, kết quả, chi phí, ràng buộc, khó khăn, tần suất tự khai. Sau đó bảng được nhóm theo khó khăn.</q>
    <q t="Tác nhân có làm được phần phân tích phỏng vấn không">Có. Claude Code hoặc tác nhân khác hỗ trợ MCP kết nối với Airtable, tạo hàng, lấy số liệu báo cáo và phân tích Ghi chú với cùng prompt. Nhà nghiên cứu giữ các cuộc trò chuyện và đối chiếu kết luận với trích dẫn.</q>
    <q t="So sánh điều mọi người nói với dữ liệu thế nào">Bảng có hai trường: tần suất tự khai và tần suất theo báo cáo, kèm cờ không khớp bên cạnh. Những chỗ không khớp được bàn với người đó chứ không lặng lẽ sửa.</q>
    <q t="Phân tích cuộc gọi và câu trả lời bằng văn bản cùng nhau thế nào">Cuộc trò chuyện bằng văn bản được sao chép vào cùng trường Ghi chú kèm thời gian của từng tin nhắn. Câu trả lời bằng văn bản giúp tìm tình huống và chủ đề, nhưng không được coi ngang với cuộc gọi.</q>
  </b-qa>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Phỏng vấn 30 phút về việc làm việc với AI như thế nào?">Xây cuộc trò chuyện quanh tác vụ thật gần nhất: đã làm gì, kết quả và chi phí, rồi một trường hợp thành công và một trường hợp người đó bỏ AI.</q>
    <q t="Gọi điện hay nhắn tin?">Người trả lời chọn hình thức. Cuộc gọi cho câu chuyện chi tiết kèm câu hỏi thêm, văn bản cho câu trả lời ngắn, nên câu trả lời bằng văn bản không được coi ngang với cuộc gọi.</q>
    <q t="Phân tích phỏng vấn bằng ChatGPT như thế nào?">Đưa văn bản cuộc trò chuyện cho ChatGPT với cùng một prompt cho mọi cuộc phỏng vấn và sao chép câu trả lời vào hàng của người đó trong Airtable.</q>
    <q t="Đối chiếu điều mọi người nói với dữ liệu thế nào?">Bảng có hai trường cạnh nhau: tần suất tự khai và tần suất từ báo cáo. Những khác biệt được bàn với người đó.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Đọc thêm">
  <b-links cols="2">
    <item href="/blog/chatgpt-enterprise-usage-report/" k="Báo cáo" t="Báo cáo sử dụng ChatGPT Enterprise">Ai dùng, cho tác vụ nào, và nên mua công cụ nào tiếp theo</item>
    <item href="/blog/who-to-interview-before-buying-ai-tools/" k="Mẫu" t="Nên phỏng vấn ai">Nên mời ai phỏng vấn</item>
  </b-links>
</b-chapter>
<b-footer>Thiết kế phỏng vấn dựa trên các khuyến nghị của <a href="https://t.me/Kseniya_Vasil" target="_blank" rel="noopener">@Kseniya_Vasil</a>. Mọi tên, nhóm và số liệu trong các ví dụ đều là hư cấu.</b-footer>
</b-post>
