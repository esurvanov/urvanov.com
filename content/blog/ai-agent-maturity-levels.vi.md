---
title: Các mức trưởng thành của tác nhân AI: từ chat đến spec, skill, mã, harness và hệ thống agentic
date: 2026-11-14
updated: 2026-11-17
description: Công việc của lập trình viên với AI lớn dần từ một câu hỏi trong chat thành hệ thống agentic; mỗi bước ghi lại điều gì, khi nào đi tiếp, cái giá ra sao.
tags: AI, tác nhân, spec, skill, harness, mức trưởng thành, compound engineering
category: specs
layout: wide
mentions: Compound Engineering, Agent Skills, AGENTS.md, CLAUDE.md, Spec-Driven Development, Progressive Crystallization, Harness engineering, Harness-Driven Development
toc: map=Bảy bước | sources=Thị trường nói gì | chat=Chat | agent=Tác nhân và quy tắc | spec=Spec | skill=Skill | script=Script | crystal=Cái giá của một bước | harness=Harness | system=Hệ thống agentic | traps=Cạm bẫy | stop=Khi nào dừng | start=Bắt đầu từ đâu | faq=Câu hỏi | next=Đọc thêm
---

Các mức trưởng thành của tác nhân AI đi từ chat đến tác nhân, spec, skill, script, harness và hệ thống agentic: ở mỗi bước, điều con người từng giải thích bằng lời được ghi vào một tệp hoặc vào mã và thôi phụ thuộc vào trí nhớ của bất kỳ ai. Các thang bậc của <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>, <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a>, <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>, <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a>, <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> và <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> mô tả cùng một trình tự dưới các biến thể khác nhau. Phần dưới nói về các bước, những chỗ chuyển giữa chúng và cái giá của các bước cuối.

<b-post series="prompts">
<b-chapter id="map" title="Bảy bước" icon="stairs">
  <b-art names="ai-agent-maturity-levels/ladder ai-agent-maturity-levels/ladder-mobile"></b-art>
  <b-cap>Bảy bước. Màu xám là con người, màu xanh là tác nhân và mọi thứ được ghi lại cho nó, màu cam là rủi ro: phải giải thích lại. Con bọ màu cam ở bước Harness là một lỗi tìm thấy trong báo cáo đã xong: harness biến nó thành một phép kiểm tra, được chỉ bằng mũi tên, để lỗi đó không quay lại.</b-cap>
  <b-why>Hình vẽ cho thấy tri thức đi về đâu. Trong chat nó nằm trong đầu con người và trong cuộc trò chuyện. Sau đó nó lần lượt chuyển vào phiên làm việc của tác nhân, một tệp yêu cầu, một tệp quy trình, một script và cuối cùng là kho mã cùng các phép kiểm tra. Bảng dưới đây đi qua cùng một báo cáo theo các ngày thứ Hai: con người làm gì bằng tay và thứ Hai tuần sau thì ra sao.</b-why>
  <b-table code="prose">
    <table>
    <thead>
      <tr><th>Bước</th><th>Con người làm gì bằng tay</th><th>Tri thức nằm ở đâu</th><th>Thứ Hai tuần sau thì sao</th></tr>
    </thead>
    <tbody>
      <tr><td><b>1. Chat</b></td><td>dán bảng doanh số vào chat và giải thích cần những cột nào</td><td>trong đầu và trong cuộc trò chuyện</td><td>mọi thứ được giải thích lại</td></tr>
      <tr><td><b>2. <a class="s-term" href="/materials/glossary/ai-agent/">Tác nhân</a></b></td><td>nhờ một tác nhân có quyền truy cập tệp dựng báo cáo, sửa lại và thêm “số tiền tính bằng rúp” vào tệp quy tắc</td><td>trong phiên và trong tệp quy tắc</td><td>tác nhân nhớ các quy tắc nhưng không nhớ lần trước đã tính thế nào</td></tr>
      <tr><td><b>3. <a class="s-term" href="/materials/glossary/spec-driven-development/">Spec</a></b></td><td>viết spec.md: những cột nào, dữ liệu lấy từ đâu, làm sao biết báo cáo đã xong</td><td>trong <code>spec.md</code></td><td>tác nhân nào cũng dựng ra cùng một báo cáo từ cùng một mô tả</td></tr>
      <tr><td><b>4. <a class="s-term" href="/materials/glossary/agent-skills/">Skill</a></b></td><td>biến trình tự dựng báo cáo thành một skill</td><td>trong <code>SKILL.md</code> với các bước và ví dụ</td><td>tác nhân tự tìm skill khi được yêu cầu làm báo cáo</td></tr>
      <tr><td><b>5. Script</b></td><td>rút các bước ổn định ra khỏi skill thành một script cho bản xuất dữ liệu và bảng tổng hợp: skill trên dữ liệu thì không có lợi, script tính giống hệt nhau ở mọi lần</td><td>trong <code>report.py</code></td><td>bản xuất chạy trong vài giây, không tốn chi phí mô hình và cho cùng một kết quả trên cùng dữ liệu; mô hình chỉ viết phần kết luận</td></tr>
      <tr><td><b>6. <a class="s-term" href="/materials/glossary/harness/">Harness</a></b></td><td>đọc báo cáo đã xong; một lỗi trong báo cáo trở thành quy tắc hoặc phép kiểm tra mới trong môi trường của tác nhân</td><td>trong kho mã: quy tắc, phép kiểm tra, hook</td><td>lỗi cũ không quay lại: quy tắc và phép kiểm tra tự kích hoạt</td></tr>
      <tr><td><b>7. <a class="s-term" href="/materials/glossary/agentic-system/">Hệ thống agentic</a></b></td><td>chỉ giao cho tác nhân những phần phức tạp như phân loại các yêu cầu của khách hàng, còn lại để cho mã và các phép kiểm tra</td><td>trong một dịch vụ: mã, lịch chạy, các phép kiểm tra và một tác nhân ở những chỗ phức tạp</td><td>báo cáo đến đúng lịch: các bước xác định chạy như mã, phần phức tạp do tác nhân quyết định kèm lý do được ghi lại, con người chỉ xử lý cảnh báo sai lệch</td></tr>
    </tbody>
    </table>
  </b-table>
  Bài viết gọi việc chuyển từ bước này sang bước kế tiếp là <b><a class="s-term" href="/materials/glossary/pulling-out/">rút ra (pulling out)</a></b> (“vytyagivanie” trong bản tiếng Nga): phần lặp lại được trong những gì con người và tác nhân đã làm cùng nhau được rút ra và ghi lại ở một bước cao hơn. Đây là một quá trình tiến hóa trong việc phát triển các quy trình của một tổ chức: chúng không được thiết kế nguyên khối từ trước mà lớn dần từng bước từ công việc lặp lại. Quy tắc được rút ra từ chat, spec từ các quy tắc và những phiên làm việc tốt, quy trình của skill từ spec, script từ skill, và harness từ các lỗi và các phép kiểm tra quanh tác nhân. Cuối thang là một hệ thống agentic. Mọi thứ bắt đầu từ cách làm “tác nhân làm hết”, nhưng ở cuối con đường tỷ trọng của tác nhân vẫn nhỏ: nền tảng của hệ thống là mã cổ điển, các phép kiểm tra và lịch chạy, còn tác nhân nhận những khối phức tạp không giải được bằng cách nào khác. Hành vi đang chạy tốt không được phát minh lại. Nó được lấy từ những gì đã chạy tốt và được cố định ở chỗ không cần giải thích nữa.
  <b-finding>
    <ex>Một báo cáo hằng tuần đi từ chỗ giải thích lặp đi lặp lại trong chat đến một báo cáo theo lịch.</ex>
    <gen>Bước được xác định bởi nơi tri thức nằm: trong đầu một người, trong một phiên, trong một tệp hay trong mã. Càng nhiều thứ được ghi lại thì càng ít phụ thuộc vào trí nhớ của con người và tâm trạng của mô hình.</gen>
    <do>Chọn một công việc lặp lại và dùng bảng để xem nó đang ở bước nào.</do>
  </b-finding>
</b-chapter>

<b-chapter id="sources" title="Quan điểm của tác giả và thị trường nói gì" icon="book">
  <b-why>Bảy bước ở trên là quan điểm của tác giả, được ghép theo một tiêu chí: ở mỗi bước cụ thể được ghi lại cái gì. Trên thị trường, các tác giả khác nhau mô tả cùng một chuyển động, mỗi người ở một đoạn của mình: người thì về quy tắc, người về spec, người khác về skill hay harness. Tất cả đều đi cùng một hướng, từ cuộc trò chuyện vào một tệp và từ tệp vào mã. Bảng cho thấy các bước khớp với các nguồn ra sao.</b-why>
  <b-art names="ai-agent-maturity-levels/matrix"></b-art>
  <b-cap>Ô đặc nghĩa là tác giả mô tả bước đó một cách tường minh, vòng tròn nghĩa là mô tả một thứ tương đương gần (ví dụ “deterministic tooling” ở <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> và <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> được tính là gần với script). Hàng dưới cùng là bảy bước của bài viết này; chỉ <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a> mô tả bước cuối một cách tường minh.</b-cap>

  Ma trận cho thấy thị trường được sắp xếp thế nào: mỗi tác giả mô tả đoạn đường của mình, và các đoạn cộng lại phủ cả bảy bước. <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> không có spec hay skill, Rezvov và Clark không có skill, <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> không có script. Chi tiết về từng tác giả nằm trong bảng dưới.
  <b-table>
    <table>
    <thead>
      <tr><th>Nguồn</th><th>Các bước theo thứ tự</th><th>Spec và skill nằm ở đâu</th></tr>
    </thead>
    <tbody>
      <tr><td><a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every, Compound Engineering</a> (Kieran Klaassen)</td><td>phát triển thủ công → chat → tác nhân với review từng dòng → lập kế hoạch trước và review PR đã xong → từ ý tưởng đến PR → các tác nhân đám mây song song</td><td>kế hoạch ở giai đoạn 3; skill và quy tắc được thêm ở bước Compound</td></tr>
      <tr><td><a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a>, 05.02.2026</td><td>bỏ chatbot → tái hiện công việc của chính mình bằng tác nhân → tác nhân cuối ngày → giao các nhiệm vụ dễ cho bên ngoài → thiết kế harness → luôn có một tác nhân đang chạy</td><td>AGENTS.md và các phép kiểm tra được lập trình ở bước 5; không có spec hay skill</td></tr>
      <tr><td><a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>, 10.03.2026</td><td>8 cấp: tab complete và chat trong IDE → ngữ cảnh → compounding → MCP và skill → harness → tác nhân chạy nền → nhóm tác nhân</td><td>skill ở cấp 5; không có spec</td></tr>
      <tr><td><a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a>, 06.04.2026</td><td>L0 tra cứu → L1 trông chừng tác nhân → L2 quy tắc → L3 deterministic tooling → L4 SDD → L5 tác nhân tự chủ</td><td>spec ở L4; không có skill</td></tr>
      <tr><td><a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a>, Hyperact, 05.01.2026</td><td>7 cấp: prompt thủ công → hỗ trợ trong IDE → truy cập kho mã → deterministic tooling → ngữ cảnh của nhóm → các quy trình song song chuyên biệt → spec-driven development</td><td>spec ở cấp 7; không có skill</td></tr>
      <tr><td><a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a>, 23.01.2026</td><td>các cấp 0–5 theo phép loại suy với tự động hóa lái xe: từ autocomplete đến “dark factory”</td><td>spec và skill ở cấp 4; ở cấp 5 spec biến thành phần mềm</td></tr>
      <tr><td><a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat, Naszcyniec</a>, 30.03.2026</td><td>bốn trụ cột như một chồng: vibes → spec → skill → tác nhân</td><td>cả bốn trong một sơ đồ</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-callout icon="bulb">**Tệp quy tắc** (CLAUDE.md, AGENTS.md) nằm ở những chỗ khác nhau. Ở <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>, <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> và <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> nó xuất hiện ngay sau tác nhân đầu tiên; ở <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> và <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> chỉ ở cấp thứ năm. Trong bài viết này nó thuộc bước “tác nhân”: chính lần ghi đầu tiên “tác nhân mắc lỗi, một quy tắc được thêm vào” biến một chat thành một tác nhân có trí nhớ.</b-callout>
  <b-callout icon="trend-up">Các thang của Eledath, <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> và Clark đếm các bước theo tính tự chủ: bao nhiêu tác nhân làm việc và con người hiếm khi nhìn vào mã đến mức nào. Các bước trong bài này được đếm theo nơi tri thức nằm. Hai thang đo ăn khớp nhau: một khi tri thức đã được ghi lại, có thể giao cho tác nhân nhiều hơn.</b-callout>
  <b-finding>
    <ex>Rezvov, Clark và Shapiro đặt spec, Eledath và Shapiro đặt skill; bài này đặt chúng lên một thang duy nhất.</ex>
    <gen>Các thang khác nhau mô tả cùng một chuyển động từ những phía khác nhau: đầu tiên mọi thứ nằm trong cuộc trò chuyện, rồi trong một tệp, rồi trong mã.</gen>
    <do>Hãy so sánh kinh nghiệm của chính bạn với bảy bước ở trên thay vì với danh sách của một tác giả riêng lẻ.</do>
  </b-finding>
</b-chapter>

<b-chapter id="chat" title="Bước 1. Chat: tri thức nằm trong một cuộc trò chuyện" icon="chat">
  <b-why>Trong chat, con người mang dữ liệu qua lại và nói bằng tay rằng một câu trả lời là sai. Với một câu hỏi một lần thì thế là đủ.</b-why>
  <b-art names="ai-agent-maturity-levels/chat"></b-art>
  <b-cap>Ba thứ Hai liên tiếp, con người trả lời cùng những câu hỏi. Tri thức về việc báo cáo cần gì chỉ còn trong đầu họ.</b-cap>
  <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> gọi chế độ này là tra cứu (reference): tác nhân như “Stack Overflow, nhưng thân thiện hơn”, và ông thêm rằng nó thực ra không phải một cấp. <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> khuyên bỏ chatbot khi làm việc có ý nghĩa<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: “To find value, you must use an agent” — mitchellh.com/writing/my-ai-adoption-journey"></b-proof>, vì tác nhân đọc tệp, chạy chương trình và tự kiểm tra kết quả. <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> và <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> đặt chat ở cấp đầu tiên: sao chép các đoạn qua lại.

  Ngay ở bước này, <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> khuyên ghi chú lại các prompt đã hiệu quả: bản ghi đầu tiên, trước cả tệp quy tắc<b-proof href="https://every.to/guides/compound-engineering" quote="Every: “Keep a running note of prompts that worked well” — every.to/guides/compound-engineering"></b-proof>. Một ghi chú trả lời câu hỏi “lần trước tôi đã giải thích việc này thế nào”, dù tác nhân chưa đọc nó.
  <b-finding>
    <ex>Mỗi thứ Hai, các cột của báo cáo lại phải giải thích từ đầu.</ex>
    <gen>Chat không giữ các thỏa thuận giữa những cuộc trò chuyện. Rezvov mô tả lối ra như sau: khi việc lặp lại cùng một điều trở nên mệt mỏi, các chỉ dẫn lặp lại được biến thành quy tắc.</gen>
    <do>Ngay khi bạn giải thích cùng một điều lần thứ hai, hãy chuyển sang bước tiếp theo.</do>
  </b-finding>
</b-chapter>

<b-chapter id="agent" title="Bước 2. Tác nhân và tệp quy tắc" icon="bot">
  <b-why>Tác nhân có quyền truy cập tệp và lệnh và hành động độc lập. Bản ghi đầu tiên làm cho nó là một tệp quy tắc: danh sách những gì tác nhân phải biết về dự án trong mọi phiên.</b-why>
  <b-art names="ai-agent-maturity-levels/agent-rules"></b-art>
  <b-cap>Một lỗi của tác nhân biến thành một dòng của tệp quy tắc, và phiên tiếp theo của tác nhân bắt đầu với dòng đó đã có sẵn.</b-cap>
  <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> đã đi qua bước này theo đúng nghĩa đen: ông làm lại tất cả các commit thủ công của mình bằng một tác nhân<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: “I literally did the work twice” — mitchellh.com/writing/my-ai-adoption-journey"></b-proof> và rút ra ba bài học: chia công việc thành các nhiệm vụ rõ ràng, tách lập kế hoạch khỏi thực hiện, và cho tác nhân một cách để tự kiểm tra kết quả của nó. Hướng dẫn của <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> đề xuất bước đầu tiên hướng tới việc ghi lại mọi thứ: tạo một tệp CLAUDE.md và thêm một ghi chú vào đó sau mỗi lỗi của tác nhân.
  <b-steps>
    <step t="Tác nhân mắc lỗi">ví dụ, nó tính các khoản tiền bằng đô la thay vì rúp.</step>
    <step t="Một dòng trong tệp quy tắc">“các khoản tiền trong báo cáo tính bằng rúp”: một dòng cho mỗi hành vi xấu. Hashimoto viết rằng trong tệp của dự án Ghostty mỗi dòng đều dựa trên một hành vi xấu của tác nhân<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: “Each line in that file is based on a bad agent behavior” — mitchellh.com/writing/my-ai-adoption-journey"></b-proof>.</step>
    <step t="Phiên tiếp theo">tác nhân đọc tệp ở đầu phiên và không lặp lại lỗi.</step>
  </b-steps>
  <b-callout icon="alert-circle">Một tệp quy tắc có thể bị quá tải. <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> cảnh báo rằng các quy tắc viết tệ cho kết quả tệ hơn là không có quy tắc nào<b-proof href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" quote="Rezvov: “poorly written rules can actually make output worse than having no rules at all” — dev.to/arezvov"></b-proof>. <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> khuyên đừng nhét mọi thứ vào tệp quy tắc: tốt hơn là giữ một thư mục tài liệu cập nhật để tác nhân tìm thấy trong đó những gì nó cần.</b-callout>

  Hashimoto biến bước này thành thói quen: trong nửa giờ cuối của ngày làm việc ông chạy các tác nhân để nghiên cứu, cho những ý tưởng còn mơ hồ và phân loại nhiệm vụ, để buổi sáng có một “khởi động ấm”<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: “warm start” — mitchellh.com/writing/my-ai-adoption-journey"></b-proof>. Ông không để các tác nhân chạy qua đêm: phần lớn nhiệm vụ của ông xong trong chưa đến nửa giờ. Every cảnh báo rằng phần lớn lập trình viên mắc kẹt ở bước này<b-proof href="https://every.to/guides/compound-engineering" quote="Every: “Most developers plateau here” — every.to/guides/compound-engineering"></b-proof> trong khi duyệt bằng tay từng hành động của tác nhân.
  <b-finding>
    <ex>Dòng về rúp trong tệp quy tắc đóng lại vĩnh viễn một lỗi lặp lại.</ex>
    <gen>Một quy tắc lưu trữ một thỏa thuận nhưng không lưu toàn bộ ý định của một nhiệm vụ: làm gì và làm sao biết đã xong thì không được viết trong đó.</gen>
    <do>Giữ tệp quy tắc ngắn; chuyển phần mô tả nhiệm vụ vào một spec. Thêm trong bài <a href="/blog/specs-rules-skills/">AGENTS.md, CLAUDE.md và spec.md: cái gì đặt ở đâu</a>.</do>
  </b-finding>
</b-chapter>

<b-chapter id="spec" title="Bước 3. Spec: ý định được viết trước mã" icon="file-lines">
  <b-why>Một spec mô tả một nhiệm vụ: cần tạo ra cái gì và làm sao biết đã xong. Tác nhân và con người đọc cùng một văn bản, và review kiểm tra kết quả theo nó.</b-why>
  <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> chia spec thành hai loại: “cái gì” (mục tiêu, yêu cầu, tiêu chí thành công) và “như thế nào” (bảo mật, cấu trúc, test, tiêu chuẩn). Tác giả khuyên dùng vài tệp nhỏ như <code>what-vision.md</code>, <code>how-security.md</code> và <code>how-testing.md</code> thay vì một tài liệu dài, để chỉ nạp ngữ cảnh liên quan<b-proof href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" quote="Naszcyniec, Red Hat: “the days of the 100-page PDF specification are over” — developers.redhat.com"></b-proof>. <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> thêm khả năng truy vết đầu cuối: một yêu cầu có định danh như FR-AUTH-PASSWORDRESET, và nó hiện ra trong mô tả API, trong mã và trong các test<b-proof href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" quote="Rezvov: “The core of SDD is traceability” — dev.to/arezvov"></b-proof>.
  Một spec cũng có thang trưởng thành riêng. Ba cấp đầu được Birgitta <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a> (Thoughtworks) mô tả<b-proof href="https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html" quote="Böckeler: three maturity levels of a spec, spec-first, spec-anchored and spec-as-source (paraphrase) — martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html"></b-proof>; cấp thứ tư, Spec-in-the-loop, được thêm trong bài nói của tác giả trang này <a href="/talk/spec-driven-development/">“Spec-Driven Development”</a> (bằng tiếng Nga): trên <a href="/slide/20/">slide có bốn cấp</a>, spec học từ hệ thống đang chạy, và các metric cùng sự cố của nó sửa lại spec.
  <b-art names="ai-agent-maturity-levels/spec-levels"></b-art>
  <b-cap>Như trên slide của bài nói: spec ở bên trái, mã ở bên phải, các mũi tên cho thấy cái gì sinh ra từ cái gì và ai gửi thay đổi ngược lại. Mũi tên xám đứt nét nghĩa là con người trả thay đổi về, mũi tên xanh nghĩa là hệ thống đang chạy tự làm việc đó. Bên phải: cấp đó giải quyết gì và cái gì cản trở nó.</b-cap>
  <b-table>
    <table>
    <thead>
      <tr><th>Cấp của spec</th><th>Điều gì xảy ra với spec</th><th>Chương trình ví dụ</th></tr>
    </thead>
    <tbody>
      <tr><td><b>Spec-first</b></td><td>spec được viết trước mã và dùng cho một nhiệm vụ</td><td>GitHub Spec Kit</td></tr>
      <tr><td><b>Spec-anchored</b></td><td>spec sống tiếp sau nhiệm vụ: các thay đổi được gộp vào nó</td><td><a href="/blog/openspec/">OpenSpec</a></td></tr>
      <tr><td><b>Spec-as-source</b></td><td>con người chỉ sửa spec, mã được sinh ra từ nó</td><td>Tessl; chỉ cấp này được <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a> nêu</td></tr>
      <tr><td><b>Spec-in-the-loop</b></td><td>metric và sự cố từ hệ thống đang chạy sửa lại spec</td><td>không có chương trình sẵn; hành vi tương tự ở <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> và <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>, xem bên dưới</td></tr>
    </tbody>
    </table>
  </b-table>

  Red Hat phân biệt hai chế độ làm việc với spec. Ở chế độ “tương tác” (interacting), con người tinh chỉnh spec cùng với tác nhân: ví dụ, nhờ tác nhân chấm spec từ 0 đến 10 và nói còn thiếu gì để triển khai tự chủ. Khi điểm là 9–10, chế độ “chỉ thị” (instructing) bắt đầu: tác nhân đọc các spec, tìm các skill cần thiết, viết mã, chạy test và tự sửa lỗi. Ở <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> điều này khớp với cấp thứ tư, nơi con người viết một spec, tranh luận với tác nhân về nó rồi bỏ đi<b-proof href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" quote="Shapiro: “You write a spec. You argue with it about the spec.” — danshapiro.com"></b-proof>.
  <b-callout icon="refresh">Red Hat gọi cấp thứ tư là “đồng tiến hóa” (co-evolution) của spec. Tác nhân giữ một tệp LessonsLearned.md: ở mỗi lỗi nó ghi nguyên nhân và cách sửa và đề xuất một chỉnh sửa cho spec “như thế nào” liên quan<b-proof href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" quote="Naszcyniec, Red Hat: “turns every off-key moment into a permanent improvement” — developers.redhat.com"></b-proof>. Every làm điều tương tự ở bước Compound, được mô tả bên dưới.</b-callout>
  <b-finding>
    <ex>spec.md của báo cáo nói: những cột nào, dữ liệu lấy từ đâu, và báo cáo xong khi các tổng khớp với bản xuất.</ex>
    <gen><a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> đặt spec ở đỉnh thang của mình: phần triển khai ở đó trở thành một đầu ra có thể thay thế chứ không phải một tài sản bền vững<b-proof href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" quote="Clark: “interchangeable output rather than a durable asset” — hyperact.co.uk"></b-proof>. Ông cũng gọi cấp thứ bảy là gần với một lần đặt lại hơn là sự tiếp nối của thang.</gen>
    <do>Viết một spec cho mọi nhiệm vụ dài hơn một ngày. Cách chia một spec lớn thành các phần có trong bài <a href="/blog/specs-by-aggregates/">Spec theo aggregate</a>.</do>
  </b-finding>
</b-chapter>

<b-chapter id="skill" title="Bước 4. Skill: quy trình được viết cho tác nhân" icon="notebook">
  <b-why>Nếu spec nói cần tạo ra cái gì thì skill nói nó được làm như thế nào. Đó là một thư mục có tệp SKILL.md: tên, mô tả và các chỉ dẫn từng bước, đôi khi kèm mẫu và script.</b-why>
  <b-art names="ai-agent-maturity-levels/spec-skill"></b-art>
  <b-cap>Spec nằm trong ngữ cảnh của nhiệm vụ. Skill chiếm hai dòng của ngữ cảnh cho đến khi cần và chỉ được nạp đầy đủ khi gọi.</b-cap>
  <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> mô tả skill là các quy trình lặp lại dạng module: tác nhân tìm skill theo tên và mô tả của nó và nạp đầy đủ khi nhiệm vụ phù hợp<b-proof href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" quote="Naszcyniec, Red Hat: “A skill is not just a prompt; it is a directory containing a SKILL.md file” — developers.redhat.com"></b-proof>. Anthropic so sánh skill với một cẩm nang hội nhập cho nhân viên mới<b-proof href="https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills" quote="Anthropic: “like putting together an onboarding guide for a new hire” — anthropic.com/engineering"></b-proof>. Với <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a>, tạo skill là dấu hiệu của cấp thứ tư, nơi con người không còn ngồi cạnh tác nhân nữa mà viết spec và skill rồi bỏ đi.
  Andrew <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a> mô tả cách lấy một skill từ một chat: nếu tác nhân lặp lại cùng một nhiệm vụ, hãy nhờ nó đọc lại cuộc trò chuyện và biến nó thành một skill<b-proof href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" quote="Shu: “ask it to reflect on the conversation and turn it into an Agent Skill” — dev.to/0xandrewshu"></b-proof>.

  Một skill ví dụ từ bài của Red Hat là triển khai một ứng dụng lên OpenShift. Đó là một thư mục bình thường với ba tệp: một chỉ dẫn có tên và mô tả ở đầu, một mẫu và một script kiểm tra.
  <b-file-grid>
    <file name="SKILL.md">tên, mô tả, các bước: kiểm tra đăng nhập, chọn dự án, áp dụng mẫu, kiểm tra kết quả; các ràng buộc</file>
    <file name="deploy-template.yaml">mẫu triển khai mà chỉ dẫn sử dụng</file>
    <file name="validate-route.sh">một script kiểm tra ứng dụng có mở được không</file>
  </b-file-grid>
  <b-cap>Skill đã chứa sẵn một script: không có ranh giới rõ ràng giữa bước “skill” và bước “script”, chúng là hai phần của cùng một thư mục.</b-cap>
  <b-finding>
    <ex>Sau khi dựng báo cáo thành công, tác nhân, theo yêu cầu, đã biến trình tự dựng thành một skill với các bước và một mẫu của bảng cuối cùng.</ex>
    <gen>Ở đầu phiên, một skill chỉ chiếm tên và mô tả trong ngữ cảnh và được nạp đầy đủ khi gọi. Vì vậy các quy trình thỉnh thoảng mới cần nên để trong skill, chỉ giữ trong tệp quy tắc những gì thường trực.</gen>
    <do>Nếu cùng một quy trình chạy tốt hai lần, hãy nhờ tác nhân biến nó thành một skill.</do>
  </b-finding>
</b-chapter>

<b-chapter id="script" title="Bước 5. Script: mã chạy các bước" icon="code">
  <b-why>Skill vẫn là văn bản, và mô hình thực hiện nó lại từ đầu mỗi lần. Script là mã bình thường: nhanh hơn, rẻ hơn và giống nhau ở mọi lần chạy.</b-why>
  <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a> so sánh chúng: skill không xác định (non-deterministic), vì mười lần chạy cùng một skill có thể cho thấy hành vi khác nhau rõ rệt<b-proof href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" quote="Shu: “running the same Skill 10 times can lead to different behavior” — dev.to/0xandrewshu"></b-proof>. Script nhanh hơn, ổn định hơn và không tốn token, nhưng cần thời gian để viết, cứng nhắc hơn trước các điều kiện bất ngờ và có thể hỏng. <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> nêu quy tắc đơn giản hơn: giao càng nhiều càng tốt cho logic xác định và chỉ để mô hình phần sáng tạo<b-proof href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" quote="Rezvov: “Delegate as much as possible to deterministic logic” — dev.to/arezvov"></b-proof>. <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> áp dụng cùng ý tưởng cho các lỗi của tác nhân: bên cạnh quy tắc trong tệp, ông viết các công cụ được lập trình như script chụp màn hình và script chạy các test đã lọc.
  <b-art names="ai-agent-maturity-levels/skill-script"></b-art>
  <b-cap>Cùng một lần chạy mười lần: skill cho thấy độ phân tán và tốn token, script lặp lại kết quả và không tốn gì.</b-cap>
  <b-table>
    <table>
    <thead>
      <tr><th></th><th>Skill</th><th>Script</th></tr>
    </thead>
    <tbody>
      <tr><td><b>Nó là gì</b></td><td>chỉ dẫn bằng ngôn ngữ tự nhiên trong SKILL.md</td><td>mã bằng Bash, Python và các ngôn ngữ tương tự</td></tr>
      <tr><td><b>Ai chạy nó</b></td><td>mô hình, làm lại từ đầu mỗi lần</td><td>máy tính, không có mô hình</td></tr>
      <tr><td><b>Kết quả có giống nhau không</b></td><td>không: có thể có khác biệt rõ rệt giữa các lần chạy</td><td>có, với cùng đầu vào</td></tr>
      <tr><td><b>Chi phí mỗi lần chạy</b></td><td>token ở mỗi lần thực hiện</td><td>vài giây và không tốn token</td></tr>
      <tr><td><b>Khi nào phù hợp</b></td><td>quy trình thay đổi, cần sự linh hoạt, chạy hiếm</td><td>quy trình lặp lại, đắt hoặc phải dự đoán được</td></tr>
      <tr><td><b>Cái giá</b></td><td>ít thời gian tạo hơn</td><td>thời gian viết, tính cứng nhắc trước điều bất ngờ, bảo trì</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-cap>Theo văn bản “Turn chats into Skills, Skills into scripts” của Andrew <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a> (19.09.2026). Tác giả nhấn mạnh rằng không phải mọi thứ đều nên tự động hóa: cả skill lẫn script đều có chi phí tạo và bảo trì.</b-cap>
  Một script được <b>rút ra</b> từ skill khi skill bắt đầu lặp lại. Làm một skill cho công việc như vậy trở nên không có lợi: trên cùng dữ liệu, script hành xử giống nhau ở mọi lần chạy, trong khi skill mang độ phân tán ngay bên trong mô hình. Độ phân tán đó là thứ sinh ra <a class="s-term" href="/materials/glossary/flaky-test/">flaky test</a>: cùng một bước trên cùng dữ liệu lúc đạt lúc không, vì tác nhân hành xử hơi khác nhau mỗi lần. Script không có nguyên nhân như vậy, nên với công việc lặp lại, tính xác định có lợi hơn.
  <b-callout icon="alert-circle">Vẫn còn nhiều điều bất định: định dạng của dữ liệu đầu vào, các chỗ trống, những giá trị bất ngờ. Script thường bắt đầu làm việc với dữ liệu, nên điều quan trọng với chúng là phần xác định: cùng đầu vào cho cùng đầu ra và một lỗi có thể tái hiện. Sự bất định chuyển từ bước sang phép kiểm tra dữ liệu đầu vào.</b-callout>
  <b-finding>
    <ex>Bản xuất cơ sở dữ liệu và bảng tổng hợp trong báo cáo giống nhau mỗi thứ Hai, nên script report.py tiếp quản chúng, còn mô hình chỉ viết phần kết luận.</ex>
    <gen>Shu thường nhúng script vào skill: skill vẫn là một lớp vỏ chạy các script, ghép chúng lại và kiểm tra đầu vào, đầu ra.</gen>
    <do>Biến một skill thành script khi nó lặp lại, phức tạp hoặc đắt. Giữ các quy trình hiếm và hay thay đổi dưới dạng skill.</do>
  </b-finding>
</b-chapter>

<b-chapter id="crystal" title="Cái giá của một bước: Malik đã đo gì" icon="gauge">
  <b-why>Việc chuyển từ skill sang script thường được mô tả bằng lời. Arun <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a> của nhóm Azure Networking (Microsoft) đã đo nó trên một hệ thống đang chạy và gọi nó là “progressive crystallization” (kết tinh dần): hành vi mà tác nhân đã tìm ra và kiểm chứng dần dần biến thành mã xác định<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: “agent exploration should be a discovery mechanism, not a permanent execution model” — arxiv.org/abs/2607.07052"></b-proof>.</b-why>
  Hệ thống của Malik xử lý các sự cố trong một mạng đám mây. Một sự cố mới lúc đầu do tác nhân giải quyết, và đường đi của nó được ghi lại. Nếu đường đi được xác nhận qua các lần thành công lặp lại, nó trở thành một mẫu, rồi một kịch bản lai và cuối cùng là mã không có mô hình. Ba chế độ là các giai đoạn trong vòng đời của cùng một hành vi đã được khám phá. Đây là việc rút ra ở các bước cuối: con đường tác nhân đã đi một mình được rút ra thành một mẫu, rồi một bản lai, rồi mã.
  <b-art names="ai-agent-maturity-levels/crystal-modes"></b-art>
  <b-cap>Đi lên thang, hành vi được nâng cấp theo số lần chạy thành công và bị trả xuống khi thất bại: sự kết tinh có thể đảo ngược.</b-cap>
  <b-table>
    <table>
    <thead>
      <tr><th>Chế độ</th><th>Chạy thế nào</th><th>Kết quả có giống nhau không</th><th>Token mỗi lần chạy</th></tr>
    </thead>
    <tbody>
      <tr><td><b>Tác nhân</b> (Type 3)</td><td>các subagent suy luận trong phạm vi giới hạn, các bước ghi chờ con người phê duyệt</td><td>khoảng 50%</td><td>10–50 nghìn</td></tr>
      <tr><td><b>Lai</b> (Type 2)</td><td>các bước được cố định, mô hình tham gia ở một số giai đoạn riêng: phân tích cú pháp, phân loại, tóm tắt; mọi hành động được kiểm tra theo schema</td><td>khoảng 90%</td><td>1–5 nghìn</td></tr>
      <tr><td><b>Mã</b> (Type 1)</td><td>logic viết sẵn, không có mô hình lúc chạy</td><td>100%</td><td>0</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-sublabel top="22">Khi nào nâng một chế độ</b-sublabel>
  <b-steps>
    <step t="Tác nhân → lai" hl>ít nhất 10 lần chạy thành công, không có vi phạm an toàn, ít nhất 90% lần chạy cho cùng một chuỗi hành động, các test chấp nhận được tạo tự động đều đạt.</step>
    <step t="Lai → mã">ít nhất 50 lần chạy lai thành công, độ nhất quán câu trả lời của mô hình ít nhất 99%, quy tắc bao quát mọi biến thể đầu vào đã quan sát, toàn bộ bộ test hồi quy đạt mà không cần mô hình, một người đã review logic cuối cùng.</step>
    <step t="Mã → quay lại">khi có thất bại, vi phạm an toàn hoặc test không đạt, playbook bị hạ cấp. Một ví dụ từ bài báo: sau một bản cập nhật firmware, định dạng đầu ra của một lệnh thay đổi, bộ phân tích cú pháp hỏng, playbook bị trả về chế độ lai và, sau một loạt lần chạy sạch, lại được nâng lên<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: “Crystallization is not one-way” — arxiv.org/abs/2607.07052"></b-proof>.</step>
  </b-steps>
  <b-sublabel top="22">Kết quả sau 8 tháng</b-sublabel>
  <b-count-bars>
    <bar k="Mã" w="45%" color="accent">45%</bar>
    <bar k="Lai" w="30%" color="c-light">30%</bar>
    <bar k="Tác nhân" w="25%" color="c-none">25%</bar>
  </b-count-bars>
  <b-cap>Tỷ lệ các lần thực thi theo chế độ vào cuối tháng thứ tám (mục VIII của bài báo của <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>). Lúc đầu gần như mọi lần thực thi chạy ở chế độ “tác nhân”.</b-cap>
  Chi phí của tác nhân cho mỗi sự cố giảm hơn 70% trong khi số sự cố tăng gần gấp đôi. Hơn 90% các loại sự cố điển hình được giải quyết tự chủ, và tỷ lệ các bản sửa dương tính giả vẫn dưới 5%. Tác giả đưa ra kết luận như sau: nền tảng rẻ đi khi làm nhiều hơn, vì nó thôi trả tiền cho suy luận ở những việc đã học xong<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: “the platform got cheaper as it did more” — arxiv.org/abs/2607.07052"></b-proof>.
  <b-callout icon="alert-circle">Các lưu ý của tác giả. Kết quả đến từ một tổ chức và một lĩnh vực, nên các ngưỡng phải được tính lại. Đây là những quan sát về nền tảng trong tám tháng; không có so sánh có đối chứng. Con số 45% nghĩa là tỷ lệ các lần thực thi do mã phục vụ; không thể đọc nó là tỷ lệ sự cố được giải quyết “không cần AI”. Lợi ích nhỏ hơn ở nơi các nhiệm vụ một lần thật sự mới chiếm ưu thế.</b-callout>
  <b-callout icon="bulb">Từ “kết tinh” (crystallization) cũng xuất hiện trong một bài báo khác: Linghao Zhang (<a href="https://arxiv.org/abs/2603.10808" target="_blank" rel="noopener">arXiv 2603.10808</a>, 11.03.2026) mô tả cách tri thức rời rạc từ các cuộc đối thoại làm việc được định kỳ củng cố thành các tài sản có cấu trúc, tái sử dụng được. Trong bài của Zhang, một cuộc đối thoại biến thành tri thức, trong bài của Malik, một vết thực thi biến thành mã. Cả hai đều mô tả cùng một chuyển động xuống thang: từ cuộc trò chuyện đến cái được ghi lại.</b-callout>
  <b-finding>
    <ex>Trong hệ thống của Malik, tỷ lệ các lần thực thi không có mô hình tăng từ không lên 45% trong tám tháng, và chi phí cho mỗi sự cố giảm hơn 70%.</ex>
    <gen>Việc đi xuống thang, từ mô hình sang mã, có lợi ở nơi cùng các nhiệm vụ lặp lại. Tính tự chủ gắn với lịch sử tích lũy của các lần chạy một kịch bản cụ thể và tăng theo nó; một mô hình mạnh hơn không tự mang lại nó<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: “A more capable model does not automatically earn more autonomy; a track record does” — arxiv.org/abs/2607.07052"></b-proof>.</gen>
    <do>Đếm các lần chạy thành công của một skill. Đạt mười lần không lỗi thì biến các bước lặp lại thành một script, và lên kế hoạch quay lại bước trên cho lúc script hỏng.</do>
  </b-finding>
</b-chapter>

<b-chapter id="harness" title="Bước 6. Harness: các lỗi trở thành quy tắc của môi trường" icon="loop-double">
  <b-why>Khi đã có spec, skill và script, bước tiếp theo là dựng một môi trường quanh tác nhân: một harness. Đó là mọi thứ ngoại trừ bản thân mô hình, và nó lớn lên từ các lỗi: mỗi nhiệm vụ để lại một bản ghi và nhiệm vụ sau chạy tốt hơn.</b-why>
  <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> xây toàn bộ hướng dẫn của mình quanh một vòng lặp bốn bước: Plan → Work → Review → Compound<b-proof href="https://every.to/guides/compound-engineering" quote="Every: “Plan → Work → Review → Compound → Repeat” — every.to/guides/compound-engineering"></b-proof>. Ba bước đầu tạo ra một tính năng, bước thứ tư tạo ra một hệ thống dựng các tính năng tốt hơn mỗi lần<b-proof href="https://every.to/guides/compound-engineering" quote="Every: “a system that builds features better each time” — every.to/guides/compound-engineering"></b-proof>. Theo Every, khoảng 80% thời gian của một kỹ sư nên dành cho lập kế hoạch và review, và 20% còn lại cho làm việc và bước Compound.
  <b-art names="ai-agent-maturity-levels/compound-loop"></b-art>
  <b-cap>Ba bước đầu tạo ra một tính năng. Bước thứ tư ghi bài học vào các tệp và skill, nên mỗi vòng tiếp theo bắt đầu tốt hơn vòng trước.</b-cap>
  <b-steps round>
    <step t="Plan">một ý tưởng biến thành một kế hoạch: nghiên cứu yêu cầu và mã, thiết kế giải pháp và thẩm định kế hoạch.</step>
    <step t="Work">tác nhân thực hiện kế hoạch trong một nhánh riêng; test và linter chạy sau mỗi thay đổi.</step>
    <step t="Review">nhiều tác nhân kiểm tra kết quả, các phát hiện được gán mức ưu tiên P1, P2 hoặc P3 và được ghi lại.</step>
    <step t="Compound" hl>điều gì đã hiệu quả và điều gì không được ghi vào đúng các tệp: ghi chú trong CLAUDE.md, một tài liệu giải pháp trong docs/solutions/, các tác nhân và skill mới. Câu hỏi kiểm tra: lần sau hệ thống có tự bắt được lỗi này không?</step>
  </b-steps>
  <b-cap>Theo hướng dẫn của Every. Các giải pháp được lưu trong docs/solutions/ kèm metadata để tìm kiếm, kế hoạch trong docs/plans/, các phát hiện của review trong todos/.</b-cap>
  Birgitta <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a> chia harness thành hai loại kiểm soát: “guide” định hướng tác nhân từ trước, còn “sensor” theo dõi kết quả và giúp nó tự sửa<b-proof href="https://martinfowler.com/articles/harness-engineering.html" quote="Böckeler: guides “anticipate the agent's behaviour and aim to steer it before it acts”; sensors “observe after the agent acts and help it self-correct”"></b-proof>. Quy tắc của bà: khi một vấn đề lặp lại, các guide và sensor nên được cải thiện<b-proof href="https://martinfowler.com/articles/harness-engineering.html" quote="Böckeler: “Whenever an issue happens multiple times, the feedforward and feedback controls should be improved”"></b-proof>. Kỷ luật điều chỉnh một harness được gọi là harness engineering, và HDD (Harness-Driven Development) là một phương pháp trong đó: mỗi lỗi của tác nhân trở thành một quy tắc của môi trường, tức là một chỉ dẫn, một phép kiểm tra hoặc một giới hạn.
  <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> đặt harness ở cấp 6: test, linter và các phép kiểm tra để tác nhân thấy kết quả công việc của chính nó. Ông có một điều kiện: cần có phản hồi, nếu không kết quả là một cỗ máy tạo ra thứ vô giá trị (slop machine)<b-proof href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" quote="Eledath: “If you want autonomy, you need backpressure” — bassimeledath.com"></b-proof>.
  <b-finding>
    <ex>Tác nhân lấy sai một tỷ giá tiền tệ: review ghi lại nguyên nhân, một quy tắc xuất hiện trong CLAUDE.md và một phép kiểm tra tỷ giá được thêm vào script.</ex>
    <gen>Harness khác với một bộ tệp ở chỗ một lỗi tự động biến thành một bản ghi: một quy tắc, một phép kiểm tra, một skill hoặc một chỉnh sửa spec. <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> gọi ý tưởng này là harness engineering. Thêm trong bài <a href="/blog/harness-driven-development/">Harness engineering trong thực tế</a>.</gen>
    <do>Sau mỗi lỗi đã sửa, hãy hỏi một câu: cần ghi lại gì để nó không lặp lại. Bản ghi đó là bước Compound và là một thay đổi đối với harness.</do>
  </b-finding>
</b-chapter>

<b-chapter id="system" title="Bước 7. Hệ thống agentic: mã ở nền tảng, tác nhân ở những chỗ phức tạp" icon="boxes-link">
  <b-why>Thang kết thúc bằng một hệ thống agentic: một hệ thống xây trên các nguyên tắc cổ điển, trong đó các khối phức tạp được thay bằng tác nhân, và mọi thứ làm việc cùng nhau trong một dịch vụ. Bài viết cho thấy cách đi đến đó: từng bước, rút những gì lặp lại ra thành mã và các phép kiểm tra.</b-why>
  Con đường bắt đầu từ các tác nhân: trong chat và trong một phiên, tác nhân làm mọi thứ. Đến cuối con đường, tỷ trọng của tác nhân vẫn nhỏ, và nền tảng của hệ thống là mã cổ điển: script, các phép kiểm tra, lịch chạy, dữ liệu. Tác nhân chỉ nhận những chỗ phức tạp mà trước các mô hình ngôn ngữ lớn do các nhóm chuyên gia ML giải quyết: phân tích văn bản của các yêu cầu, phân loại, đo độ giống nhau, tóm tắt. Nay đây là một giải pháp có sẵn: mô hình được gọi như một phần của dịch vụ, cho chất lượng cao hơn và giải thích các quyết định của nó bằng lời, nên có thể đọc và kiểm tra lập luận. Toàn bộ hệ thống vẫn dự đoán được vì phần phức tạp được bao quanh bởi các phép kiểm tra xác định.
  Các con số của <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a> chỉ cùng một hướng: trong tám tháng, tỷ lệ các lần thực thi bằng mã không có mô hình tăng lên 45%, còn tác nhân giữ ở 25% số lần thực thi. Các thang của <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> (cấp 7–8: tác nhân chạy nền và nhóm tác nhân), <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> (“dark factory”, một hộp đen biến spec thành phần mềm) và <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> (con người chỉ tạo ticket trong một tracker còn các tác nhân tự nhận chúng, và bảo mật là rào cản chính) tiếp tục theo hướng tính tự chủ tăng dần. Để tính tự chủ như vậy không đổ vỡ, nó cần một harness, bước ở ngay dưới.
  <b-finding>
    <ex>Báo cáo hằng tuần: một script tính bản xuất và bảng tổng hợp, các quy tắc và phép kiểm tra nằm trong harness, và tác nhân chỉ xử lý văn bản tự do trong các bình luận của quản lý.</ex>
    <gen>Một hệ thống agentic dựa trên mã và các phép kiểm tra, còn tác nhân chỉ giải quyết những gì không giải được bằng cách nào khác. Tỷ trọng của tác nhân trong đó nhỏ, và khả năng dự đoán đến từ nền tảng xác định.</gen>
    <do>Trước khi giao một khối cho tác nhân, hãy hỏi liệu nó có thể được viết thành mã hay phép kiểm tra không. Chỉ để lại cho tác nhân những gì mã không giải được, và đặt các phép kiểm tra ở đầu vào và đầu ra.</do>
  </b-finding>
</b-chapter>

<b-chapter id="traps" title="Cạm bẫy ở mỗi bước" icon="alert-circle">
  <b-why>Mỗi bước có một lỗi điển hình làm dừng việc leo thang hoặc làm nó quá đắt. Bảng được tập hợp từ chính các lưu ý của các tác giả.</b-why>
  <b-table>
    <table>
    <thead>
      <tr><th>Bước</th><th>Cạm bẫy điển hình</th><th>Ai viết về nó</th><th>Lối ra</th></tr>
    </thead>
    <tbody>
      <tr><td><b>1. Chat</b></td><td>chuyển văn bản qua lại thay vì để tác nhân làm việc với các tệp</td><td><a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a>: công việc có ý nghĩa cần một tác nhân</td><td>cho tác nhân quyền truy cập dự án và một cách kiểm tra kết quả</td></tr>
      <tr><td><b>2. <a class="s-term" href="/materials/glossary/ai-agent/">Tác nhân</a></b></td><td>con người duyệt từng hành động trong khi tệp quy tắc phình ra không được phân loại</td><td><a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>: phần lớn mắc kẹt ở đây; <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a>: quy tắc tệ còn tệ hơn không có</td><td>lập kế hoạch trước, giữ quy tắc ngắn và xem lại từng dòng</td></tr>
      <tr><td><b>3. <a class="s-term" href="/materials/glossary/spec-driven-development/">Spec</a></b></td><td>một spec cho mọi việc vặt: Kiro biến một lỗi nhỏ thành 4 user story và 16 tiêu chí chấp nhận</td><td><a href="https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html" target="_blank" rel="noopener">Böckeler</a> (Thoughtworks)</td><td>viết spec cho các nhiệm vụ dài hơn một ngày và để các bản sửa nhỏ không có spec</td></tr>
      <tr><td><b>4. <a class="s-term" href="/materials/glossary/agent-skills/">Skill</a></b></td><td>một skill cho mọi thứ: nó có chi phí tạo và bảo trì</td><td><a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a></td><td>làm một skill sau hai lần lặp lại thành công, không làm trước</td></tr>
      <tr><td><b>5. Script</b></td><td>nâng cấp quá sớm: một mẫu chỉ mới thấy vài lần hóa ra không đáng tin</td><td><a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>: chất lượng phụ thuộc vào các test dựng từ các lần chạy</td><td>một ngưỡng về số lần chạy và quay lại một bước lên khi thất bại</td></tr>
      <tr><td><b>6. Harness</b></td><td>review của con người thành nút thắt; các phép kiểm tra do chính tác nhân viết xác nhận bất cứ thứ gì</td><td><a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>: review của con người thành nút thắt; <a href="https://law.stanford.edu/2026/02/08/built-by-agents-tested-by-agents-trusted-by-whom/" target="_blank" rel="noopener">Stanford CodeX</a>: các tác nhân viết một stub luôn trả về “thành công”</td><td>các phép kiểm tra phải độc lập với tác nhân và review được tự động hóa một phần</td></tr>
      <tr><td><b>7. Hệ thống agentic</b></td><td>tác nhân nhận những gì mã có thể giải: giá và độ phân tán của kết quả tăng</td><td><a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>: hành vi do tác nhân tìm ra chuyển vào mã theo số lần chạy thành công</td><td>chỉ đặt tác nhân ở chỗ phức tạp và rút những gì lặp lại ra thành mã</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-cap>Trường hợp stub của StrongDM được bàn <a href="https://law.stanford.edu/2026/02/08/built-by-agents-tested-by-agents-trusted-by-whom/" target="_blank" rel="noopener">trong bài của Stanford CodeX</a>.</b-cap>
  <b-finding>
    <ex>Tác nhân viết cả mã lẫn phép kiểm tra, và phép kiểm tra chỉ đơn giản trả về “thành công”: hệ thống trông xanh và không kiểm chứng gì.</ex>
    <gen>Bước càng cao thì lỗi khi ghi lại càng đắt: một quy tắc sai, một phép kiểm tra tồi hay một script quá sớm ảnh hưởng đến mọi lần chạy sau đó.</gen>
    <do>Trước khi ghi lại một điều gì, hãy hỏi: ai sẽ kiểm tra bản ghi này và bằng cách nào? Nếu không có ai, hãy giữ tri thức ở một bước thấp hơn.</do>
  </b-finding>
</b-chapter>

<b-chapter id="stop" title="Khi nào dừng" icon="target">
  <b-why>Các bước trên cao tốn kém hơn các bước dưới, và không phải nhóm nào cũng cần chúng.</b-why>
  <b-table>
    <table>
    <thead>
      <tr><th>Nguồn nói gì</th><th>Trong thực tế điều đó nghĩa là gì</th></tr>
    </thead>
    <tbody>
      <tr><td><a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a>: phần lớn các nhóm nên nhắm tới cấp 5; trên đó thông lượng tăng nhưng khả năng hiểu và kiểm chứng kết quả thì không</td><td>các quy tắc được viết ra, deterministic tooling và ngữ cảnh chung thường quan trọng hơn tự động hóa tối đa</td></tr>
      <tr><td><a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>: với công việc hằng ngày, đòn bẩy nằm ở cấp 7; tác giả coi cấp 8 là biên giới mà chưa ai làm chủ</td><td>các tác nhân chạy nền cùng các phép kiểm tra là giới hạn trên hợp lý hiện nay</td></tr>
      <tr><td><a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a>: ở cấp 3 nhiều người cảm thấy mọi thứ tệ đi vì công việc chỉ còn là đọc diff</td><td>sau lần tăng tốc đầu tiên có thể có một đoạn trũng; vượt qua nó bằng cách chuyển sang spec và skill, không cần quay lại chat</td></tr>
      <tr><td><a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a>: cả skill lẫn script đều có chi phí tạo và bảo trì</td><td>tự động hóa những gì thực sự lặp lại</td></tr>
      <tr><td><a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>: lợi ích nhỏ hơn ở nơi các nhiệm vụ một lần mới chiếm ưu thế</td><td>với công việc thăm dò, hãy ở lại với một tác nhân kèm spec</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-finding>
    <ex>Trong thang của <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a>, cấp thứ bảy đứng riêng: ông gọi nó là gần với một lần đặt lại hơn là sự tiếp nối.</ex>
    <gen>Leo thang chỉ có ý nghĩa khi nó giảm công việc của con người; số lượng tệp trong một kho mã không chứng minh được gì.</gen>
    <do>Trước mỗi lần chuyển, hãy kiểm tra: nhiệm vụ có lặp lại không? Kết quả có thể được kiểm chứng tự động không? Nếu không, hãy ở lại bước hiện tại.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" title="Bắt đầu từ đâu: các prompt sẵn cho tác nhân" icon="play">
  <b-why>Bốn prompt nâng tri thức lên một bước, tức là rút nó ra khỏi bước bên dưới. Hãy đặt nhiệm vụ của chính bạn vào chỗ các dấu ngoặc vuông.</b-why>
  <b-sublabel top="12">Từ chat đến tệp quy tắc</b-sublabel>
  <b-prompt>
    Hãy đọc lại cuộc đối thoại này. Tìm những chỗ tôi đã sửa bạn hoặc lặp lại cùng một điều.
    Với mỗi chỗ, hãy viết một dòng quy tắc ngắn cho tệp CLAUDE.md.
    Đừng thêm lời khuyên chung chung, chỉ những gì có trong cuộc đối thoại.
  </b-prompt>
  <b-sublabel top="22">Từ quy tắc đến spec</b-sublabel>
  <b-prompt>
    Nhiệm vụ: [mô tả]. Trước khi viết mã, hãy soạn spec.md:
    cần tạo ra cái gì, dữ liệu lấy từ đâu, các ràng buộc là gì và làm sao biết nhiệm vụ đã xong.
    Hãy hỏi tôi nếu thiếu điều gì.
  </b-prompt>
  <b-sublabel top="22">Từ một lần chạy tốt đến skill</b-sublabel>
  <b-prompt>
    Hãy đọc lại cuộc đối thoại này và biến quy trình bạn đã thực hiện trong đó thành một skill: một thư mục có SKILL.md,
    tên và mô tả ở đầu, sau đó là các chỉ dẫn từng bước, các ràng buộc và một mẫu kết quả.
  </b-prompt>
  <b-sublabel top="22">Từ skill đến script</b-sublabel>
  <b-prompt>
    Hãy xem skill [tên]. Chọn ra các bước chạy giống hệt nhau ở mọi lần và viết một script Python cho chúng.
    Trong skill chỉ để lại việc chạy script và kiểm tra kết quả.
  </b-prompt>
  <b-finding>
    <ex>Bốn prompt thay cho một cuộc thảo luận về “cách áp dụng AI”: mỗi prompt nâng đúng một phần tri thức lên một bước.</ex>
    <gen>Chỉ có một quy tắc chuyển bước: nó lặp lại lần thứ hai thì ghi lại; bản ghi lặp lại và ổn định thì biến nó thành mã.</gen>
    <do>Bắt đầu với prompt khớp với bước hiện tại của bạn trong bảng ở đầu bài.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Các câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Có những mức trưởng thành nào của việc làm việc với AI trong phát triển phần mềm?">Không có một thang duy nhất. Bài này có bảy bước, <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> có sáu bước từ phát triển thủ công đến các tác nhân đám mây song song, <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> có tám cấp, <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> bảy, còn <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> và <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> mỗi người sáu (các cấp 0–5). Tất cả đều đồng ý rằng con đường đi từ chat đến tác nhân, rồi đến các quy tắc và spec được viết ra và tiếp đến một hệ thống tự chủ.</q>
    <q t="Compound engineering là gì?">Một cách tiếp cận của Every trong đó mỗi nhiệm vụ xong để lại một bản ghi giúp các nhiệm vụ sau: vòng lặp Plan → Work → Review → Compound. Bước cuối ghi bài học vào CLAUDE.md, các tài liệu giải pháp, skill và tác nhân.</q>
    <q t="Skill khác script thế nào?">Skill là một chỉ dẫn văn bản mà mô hình thực hiện lại từ đầu ở mỗi lần chạy, nên kết quả có thể khác nhau. Script là mã bình thường: nhanh hơn, rẻ hơn và cho cùng một kết quả, nhưng viết lâu hơn và cứng nhắc hơn trước các điều kiện bất ngờ.</q>
    <q t="Có cần thiết phải đạt tới “dark factory” không?">Không. Clark khuyên phần lớn các nhóm dừng ở cấp 5, còn Eledath gọi cấp 7 là điểm có đòn bẩy chính. Chỉ leo cao hơn nếu các nhiệm vụ lặp lại và kết quả có thể được kiểm chứng tự động.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Đọc thêm">
  <b-links cols="2">
    <item href="/blog/harness-driven-development/" k="Phương pháp" t="Harness-Driven Development">Một lỗi của tác nhân → một quy tắc của môi trường</item>
    <item href="/blog/specs-rules-skills/" k="Ngữ cảnh" t="AGENTS.md, CLAUDE.md và spec.md">Cái gì đặt ở đâu: spec, quy tắc, skill</item>
    <item href="/blog/spec-reconcile-loop/" k="Spec" t="Vòng đối chiếu spec">Cách một spec học từ hệ thống đang chạy</item>
    <item href="/blog/specs-by-aggregates/" k="Spec" t="Spec theo aggregate">Cách chia một spec lớn thành các phần</item>
    <item href="/blog/quality-gates-ai-agents/" k="Cổng" t="Cổng chất lượng cho tác nhân AI là gì">nên đặt những phép kiểm tra nào ở các bước của thang</item>
    <item href="/blog/agent-escalation-to-human/" k="Escalation" t="Escalation sang con người ở tác nhân AI">tác nhân dừng lại và hỏi thế nào</item>
  </b-links>
</b-chapter>
<b-footer>Dựa trên các nguồn gốc: <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> (compound engineering), <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> (05.02.2026), <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> (10.03.2026), <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> (06.04.2026), <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> (05.01.2026), <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> (23.01.2026), <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> (30.03.2026), <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a> (19.09.2026), <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a> (arXiv 2607.07052, 08.07.2026), Zhang (arXiv 2603.10808), <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a> (martinfowler.com). Sáu bước được ghép từ các nguồn này theo tiêu chí “cái gì được ghi lại”; các tác giả không có một thang duy nhất với trình tự này.</b-footer>
</b-post>
