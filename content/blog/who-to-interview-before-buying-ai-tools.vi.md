---
title: Nên phỏng vấn ai trước khi mua công cụ AI: 16 người từ tám nhóm cực trị
date: 2026-09-28
updated: 2026-11-08
description: Cách chọn 16 người từ báo cáo, bảng khảo sát và danh sách giấy phép, kiểm tra độ phủ các nhóm và người thay thế, và quyết định hỏi họ điều gì.
tags: AI, custdev, nghiên cứu
category: research
layout: wide
image: /og/who-to-interview-before-buying-ai-tools.en.png
mentions: ChatGPT Enterprise, Codex
toc: why=Vì sao cần mẫu | top=Top theo mức hoạt động | groups=Tám nhóm | teams=Độ phủ các nhóm | ask=Cần tìm hiểu gì | order=Quy trình | faq=Câu hỏi | next=Đọc thêm
---

Trước khi mua công cụ AI, hãy mời 16 người phỏng vấn: hai người từ mỗi nhóm trong tám nhóm cực trị, như những người chỉ làm việc trong Codex, đã bỏ công cụ hoặc chạy nhiều dự án. Những người dùng tích cực nhất rất quan trọng, nhưng gộp lại họ chỉ mô tả một hai kịch bản: top theo số tin nhắn phủ 2 trên 8 kịch bản. Người được chọn từ báo cáo, khảo sát và danh sách giấy phép. Bên dưới là các nhóm, ngưỡng và những điều cần hỏi.

<b-post series="gruppy">
<b-credit para>Thiết kế mẫu phỏng vấn dựa trên khuyến nghị của <a href="https://t.me/Kseniya_Vasil" target="_blank" rel="noopener">@Kseniya_Vasil</a></b-credit>
<b-gruppy-chain label="Từ báo cáo đến danh sách phỏng vấn">
  <stage n="340" t="Người trong báo cáo" dots="340" on="5:c-code 31:c-code 58:c-work 77:c-work 96:c-chat 120:c-chat 141:c-silent 163:c-silent 187:c-none 205:c-none 226:c-light 248:c-light 269:c-proj 290:c-proj 311:c-team 333:c-team"/>
  <stage n="8" t="Nhóm cực trị" icons="code-alt:c-code zap-alt:c-work search-alt:c-chat card:c-silent slash:c-none log-out:c-light folder:c-proj grid-sm:c-team"/>
  <stage n="16" t="Cuộc phỏng vấn" circles="c-code c-code c-work c-work c-chat c-chat c-silent c-silent c-none c-none c-light c-light c-proj c-proj c-team c-team"/>
</b-gruppy-chain>
<b-cap>Mọi con số và tên đều là ví dụ</b-cap>

<b-chapter id="why" icon="target" title="Quyết định nào được hỗ trợ">

**Bài toán kinh doanh** đến từ [báo cáo](/blog/chatgpt-enterprise-usage-report/#why): bộ công cụ AI hiện tại không đáp ứng được những tác vụ công việc nào và cần thử gì trước khi mua. Báo cáo cũng cho biết ai ra quyết định và dựa trên dấu hiệu nào. Mẫu quyết định việc các cuộc phỏng vấn sẽ cho thấy tác vụ của những ai.

Trước hết, xác định cần thấy những cách hoàn thành tác vụ nào: qua công cụ AI của công ty, qua các công cụ AI khác, bằng tay hoặc nhờ đồng nghiệp, và ở những người đã thử công cụ rồi bỏ. [Báo cáo sử dụng ChatGPT Enterprise](/blog/chatgpt-enterprise-usage-report/) là một trong các nguồn: nó tìm ra nhóm đầu tiên và những người đã bỏ. Người dùng công cụ khác được tìm qua [bảng khảo sát](/blog/ai-interviews-without-leading-questions/#form) toàn công ty và danh sách giấy phép, mua sắm.

  <b-io justify>
    <item k="Đầu vào">Bảng người từ báo cáo, bảng khảo sát toàn công ty, danh sách giấy phép và mua sắm</item>
    <item k="Phương pháp làm gì">Chọn 2 người cho mỗi cách hoàn thành tác vụ</item>
    <item k="Quyết định đầu ra">Nói chuyện với ai trước khi mua và thử gì, cho đến kết luận rằng không cần công cụ mới</item>
  </b-io>
</b-chapter>

<b-chapter id="top" icon="bar-chart" title="Vì sao danh sách top theo mức hoạt động là chưa đủ">
  <b-why>Ba cách tuyển 16 người. Màu chấm là kịch bản sử dụng. Những người tích cực nhất và người tình nguyện là người trả lời tốt và thuộc về mọi mẫu, nhưng riêng họ thì chưa đủ.</b-why>
  <b-gruppy-compare>
    <way kind="bad" s="partial" t="Top theo số tin nhắn" dots="c-chat c-chat c-chat c-chat c-chat c-chat c-work c-chat c-chat c-chat c-chat c-chat c-work c-chat c-chat c-chat">kịch bản: **2 trên 8**</way>
    <way kind="bad" s="partial" t="Người tình nguyện" dots="c-chat c-chat c-code c-chat c-code c-chat c-proj c-chat c-chat c-code c-chat c-chat c-proj c-chat c-chat c-chat">kịch bản: **3 trên 8**</way>
    <way kind="good" s="full" t="Nhóm cực trị" dots="c-code c-code c-work c-work c-chat c-chat c-silent c-silent c-none c-none c-light c-light c-proj c-proj c-team c-team">kịch bản: **8 trên 8**</way>
  </b-gruppy-compare>
  <b-finding>
    <ex>Top theo số tin nhắn phủ 2 trên 8 kịch bản, người tình nguyện phủ 3, còn các nhóm cực trị phủ cả 8.</ex>
    <gen>Những người tích cực nhất và nhiệt tình nhất biết công cụ rõ nhất và đáng mời. Họ giống nhau và gộp lại chỉ mô tả một hai kịch bản. Để nghe được phần còn lại, mẫu được bổ sung bằng những người ở các cực của những thuộc tính khác.</gen>
    <do>Lấy 2–3 người từ top theo số tin nhắn. Dành các suất còn lại cho người có kịch bản khác: những người chỉ làm việc qua Codex, đã bỏ công cụ, dùng công cụ khác hoặc chạy nhiều dự án.</do>
  </b-finding>
</b-chapter>

<b-chapter id="groups" icon="grid" title="Tám nhóm">
  <b-why>Sáu nhóm xuất phát từ ngưỡng trong báo cáo, nhóm "đã bỏ" từ ngày hoạt động gần nhất, và nhóm "công cụ khác" từ bảng khảo sát. Mỗi nhóm có một câu hỏi mà nó giúp kiểm chứng. Câu trả lời có thể là bất cứ điều gì, kể cả "không cần công cụ mới". Các ngưỡng ở đây chỉ để tham khảo: hãy chỉnh sao cho mỗi nhóm có 2–5 người.</b-why>
  <b-gruppy-groups>
    <group icon="code-alt" color="c-code" t="Tích cực nhất về code" c="code &gt; $200 / 3 tháng" p="Hana Sato, Luis Moreno">thiếu gì trong phát triển: công cụ, quyền truy cập repository, hay không thiếu gì</group>
    <group icon="zap-alt" color="c-work" t="Tác vụ của tác nhân" c="agent &gt; $60 / 3 tháng" p="Mira Castellano, Tomás Reid">tác nhân chưa đáp ứng ở đâu và vì sao: dữ liệu, tác vụ, hay chính tác nhân</group>
    <group icon="search-alt" color="c-chat" t="Nghiên cứu cường độ cao" c="&gt; 3.000 tin nhắn, chat là chính" p="Jonas Keller, Aiko Lind">họ kiểm tra câu trả lời thế nào và tìm kiếm hiện tại có đủ không</group>
    <group icon="card" color="c-silent" t="Chỉ dùng Codex" c="0 tin nhắn và &gt; $20 / 3 tháng" p="Ben Ortiz, Lena Moss">họ xử lý những tác vụ nào không cần chat và có cần thêm gì khác không</group>
    <group icon="slash" color="c-none" t="Không hoạt động" c="0 tin nhắn và $0 trong kỳ" p="Pavel Novak, Sara Quinn">họ hoàn thành tác vụ bằng cách nào và đã cân nhắc những phương án nào</group>
    <group icon="log-out" color="c-light" t="Đã thử rồi bỏ" c="từng có tin nhắn, 0 trong 60 ngày gần nhất" p="Farah Nasser, Yara Selim">vì sao họ dừng: kết quả, thời gian, bảo mật, hay tác vụ đã biến mất</group>
    <group icon="folder" color="c-proj" t="Người tổ chức dự án" c="≥ 6 dự án đang hoạt động" p="Elif Demir, Rafael Costa">dự án đem lại gì cho họ và họ còn thiếu gì</group>
    <group icon="grid-sm" color="c-team" t="Công cụ khác" c="theo khảo sát: công cụ AI chính không phải của công ty" p="Nadia Rahimi, Oskar Berg">công cụ kia tốt hơn ở đâu và công cụ hiện tại có thể cung cấp điều đó không</group>
  </b-gruppy-groups>
  <b-stack label="16 cuộc phỏng vấn theo nhóm">
    <seg w="2" color="c-code">2</seg>
    <seg w="2" color="c-work">2</seg>
    <seg w="2" color="c-chat">2</seg>
    <seg w="2" color="c-silent">2</seg>
    <seg w="2" color="c-none" ink="ink">2</seg>
    <seg w="2" color="c-light" ink="ink">2</seg>
    <seg w="2" color="c-proj">2</seg>
    <seg w="2" color="c-team">2</seg>
  </b-stack>
  <b-legend>
    <item color="c-code">code</item>
    <item color="c-work">tác nhân</item>
    <item color="c-chat">nghiên cứu</item>
    <item color="c-silent">chỉ Codex</item>
    <item color="c-none">không hoạt động</item>
    <item color="c-light">đã bỏ</item>
    <item color="c-proj">dự án</item>
    <item color="c-team">công cụ khác</item>
  </b-legend>
  <b-finding>
    <ex>16 cuộc trò chuyện: hai người trong mỗi nhóm trong tám nhóm.</ex>
    <gen>Hai hoặc ba người mỗi nhóm cho thấy một vấn đề có lặp lại hay không: nếu hai trong ba người nói cùng một điều thì đó là tín hiệu. Những người có giá trị trung bình bị bỏ qua: câu trả lời của họ giống các nhóm lân cận và không thêm kịch bản mới trong 16 cuộc trò chuyện.</gen>
    <do>Trong mỗi nhóm, sắp xếp ứng viên theo ngưỡng của nhóm và lấy hai người có giá trị cực đoan nhất, từ các nhóm làm việc khác nhau nếu có thể. Nếu một người rơi vào hai nhóm, giữ họ ở nhóm nơi giá trị của họ cực đoan hơn và lấy ứng viên kế tiếp ở nhóm kia.</do>
  </b-finding>
</b-chapter>

<b-chapter id="teams" icon="alert-circle" title="Độ phủ các nhóm làm việc và người thay thế">
  <b-why>Một bước riêng sau khi tuyển, không thay đổi các nhóm: có bao nhiêu người được chọn thuộc mỗi nhóm làm việc và ai thay thế những người từ chối.</b-why>
<b-table>
| Nhóm làm việc | Người dùng thường xuyên | Đã chọn | Trạng thái |
|---|---|---|---|
| Nhóm A | <b-bar value="74"/> | <b-gruppy-cov colors="c-code c-chat c-silent c-proj c-light"/> | <b-tag kind="ok" inline>đã phủ</b-tag> |
| Nhóm B | <b-bar value="66"/> | <b-gruppy-cov colors="c-work c-work c-chat c-none"/> | <b-tag kind="ok" inline>đã phủ</b-tag> |
| Nhóm C | <b-bar value="51"/> | <b-gruppy-cov colors="c-code c-silent c-none c-proj"/> | <b-tag kind="ok" inline>đã phủ</b-tag> |
| Nhóm D | <b-bar value="34"/> | <b-gruppy-cov colors="c-team"/> | <b-tag kind="ok" inline>sau khi thay</b-tag> |
| Nhóm E | <b-bar value="18"/> | <b-gruppy-cov colors="c-light c-team"/> | <b-tag kind="ok" inline>sau khi thay</b-tag> |
</b-table>
  <b-finding>
    <ex>Sau khi tuyển theo nhóm, nhóm làm việc D và E không có ai. Ba ứng viên được thay bằng người từ D và E có cùng hành vi, và cả năm nhóm làm việc giờ đã được phủ.</ex>
    <gen>Ngưỡng chi tiêu và số tin nhắn bắt được những người dùng cực đoan. Một nhóm làm việc mà ai cũng dùng công cụ ít thì không bao giờ vượt ngưỡng, và các tác vụ của nhóm đó rơi khỏi nghiên cứu. Vì vậy các nhóm làm việc được kiểm tra như một bước riêng.</gen>
    <do>Xếp những người đã chọn theo nhóm làm việc. Nếu một nhóm không có ai, thay một ứng viên trong nhóm phù hợp bằng người của nhóm làm việc đó có cùng hành vi. Người từ chối được thay bằng ứng viên kế tiếp của cùng nhóm theo ngưỡng của nhóm.</do>
  </b-finding>
</b-chapter>

<b-chapter id="ask" icon="chat" title="Cần tìm hiểu gì trong buổi phỏng vấn">
  <b-why>Cuộc trò chuyện bắt đầu từ tác vụ công việc gần nhất chứ không phải từ công cụ: họ cần đạt được gì, họ có những phương tiện nào, họ chọn gì và đã đi đến kết quả bằng cách nào. Kịch bản đầy đủ nằm trong [bài về phỏng vấn](/blog/ai-interviews-without-leading-questions/#script).</b-why>
  <b-gruppy-phases>
    <b-gruppy-phase icon="clock-sm" color="c-chat" t="Tác vụ">
      <item t="Tác vụ công việc gần nhất">Họ cần đạt được gì và cho ai</item>
      <item t="Phương tiện và lựa chọn">Họ có gì, chọn gì và vì sao</item>
    </b-gruppy-phase>
    <b-gruppy-phase icon="eye-wide" color="c-proj" t="Đường đi">
      <item t="Cách họ đi đến kết quả">Phần dùng nguyên trạng, phần tự hoàn thiện</item>
      <item t="Công sức và ràng buộc">Thời gian, dữ liệu, quyền truy cập, bảo mật</item>
    </b-gruppy-phase>
    <b-gruppy-phase icon="check-thin" color="c-work" t="Một ca thành công">
      <item t="Khi mọi việc suôn sẻ">Lúc đó khác ở điểm nào</item>
    </b-gruppy-phase>
    <b-gruppy-phase icon="trend-up" color="c-code" t="Bỏ và chuyển đổi">
      <item t="Bỏ hoặc đổi công cụ">Họ chuyển sang cái gì và vì sao</item>
    </b-gruppy-phase>
  </b-gruppy-phases>
  <b-finding>
    <ex>Sáu điểm: bốn điểm về một tác vụ, một ca thành công, và việc bỏ hoặc chuyển đổi.</ex>
    <gen>Câu chuyện về một tác vụ đã qua cho ra sự thật: bạn thấy người đó chọn AI ở đâu, chọn cách khác ở đâu và vì sao. Ca thành công cho thấy điều gì đã hiệu quả; việc bỏ và chuyển đổi cho thấy vì sao công cụ bị thay. Dự đoán về tương lai thì không kiểm chứng được.</gen>
    <do>Hãy yêu cầu họ nêu tác vụ công việc gần nhất trong những phút đầu và dẫn dắt cả cuộc trò chuyện xoay quanh nó. Nếu người đó không nhắc đến AI, hãy hỏi họ đã cân nhắc những phương án nào, đừng hỏi vì sao họ không dùng.</do>
  </b-finding>
</b-chapter>

<b-chapter id="order" icon="list-dotted" title="Quy trình">
  <b-gruppy-steps>
    <step t="Gom ứng viên vào tám nhóm">Sáu nhóm từ ngưỡng trong báo cáo, nhóm "đã bỏ" từ ngày hoạt động gần nhất, nhóm "công cụ khác" từ bảng khảo sát</step>
    <step t="Giữ 2 người mỗi nhóm">Từ các nhóm làm việc khác nhau nếu có lựa chọn; mỗi người chỉ ở một nhóm</step>
    <step t="Kiểm tra độ phủ các nhóm làm việc">Nếu một nhóm không có ai, thay một ứng viên bằng người của nhóm đó có cùng hành vi</step>
    <step t="Lên lịch phỏng vấn 30 phút">Cuộc trò chuyện bắt đầu từ tác vụ công việc gần nhất: họ cần đạt được gì, có những phương tiện nào, chọn gì và đi đến kết quả bằng cách nào. Với người đã bỏ, hãy bàn thêm vì sao họ dừng</step>
  </b-gruppy-steps>
  <b-gruppy-limit t="Hạn chế.">16 cuộc phỏng vấn cho thấy những vấn đề nào xuất hiện và chúng trông ra sao trong công việc thật. Chúng không cho biết có bao nhiêu người trong công ty gặp từng vấn đề. Để biết quy mô, hãy gửi cả công ty một [bảng khảo sát](/blog/ai-interviews-without-leading-questions/#form) ngắn, soạn sau các buổi phỏng vấn. Nếu các vấn đề không được xác nhận, đó cũng là một kết quả: không cần công cụ mới.</b-gruppy-limit>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Nên phỏng vấn bao nhiêu người trước khi mua AI?">16 người: hai người từ mỗi nhóm trong tám nhóm cực trị.</q>
    <q t="Vì sao chỉ phỏng vấn những người dùng tích cực nhất là chưa đủ?">Họ giống nhau và gộp lại chỉ mô tả một hai kịch bản: top theo số tin nhắn phủ 2 trên 8 kịch bản.</q>
    <q t="Chọn người cho các nhóm thế nào?">Từ báo cáo, khảo sát và danh sách giấy phép: trong mỗi nhóm lấy hai người có giá trị cực đoan nhất, từ các nhóm làm việc khác nhau nếu có thể.</q>
    <q t="Nên hỏi gì trong buổi phỏng vấn?">Về tác vụ thật gần nhất: người đó chọn AI ở đâu, chọn cách khác ở đâu và vì sao.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Đọc thêm">
  <b-links>
    <item href="/blog/chatgpt-enterprise-usage-report/" k="Báo cáo" t="Báo cáo sử dụng ChatGPT Enterprise">Cách lập báo cáo sử dụng mà bảng người được lấy ra từ đó</item>
    <item href="/blog/ai-interviews-without-leading-questions/" k="Phỏng vấn" t="Phỏng vấn không đặt câu hỏi dẫn dắt">Cách tiến hành cuộc trò chuyện bằng giọng nói hoặc bảng khảo sát và thu thập câu trả lời trong Airtable</item>
  </b-links>
</b-chapter>
<b-footer>Thiết kế mẫu phỏng vấn dựa trên khuyến nghị của <a href="https://t.me/Kseniya_Vasil" target="_blank" rel="noopener">@Kseniya_Vasil</a>. Mọi tên, nhóm làm việc và con số trong các ví dụ đều là hư cấu.</b-footer>
</b-post>
