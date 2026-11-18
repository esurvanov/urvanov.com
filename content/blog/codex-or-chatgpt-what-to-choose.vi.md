---
title: Codex hay ChatGPT: nên chọn gì khi làm việc với mã
seoTitle: Codex hay ChatGPT: nên chọn gì để viết code (2026)
date: 2026-11-17
updated: 2026-11-18
description: Chat trả lời bằng văn bản, còn tác nhân Codex tự sửa dự án và chạy kiểm thử. Khi nào cần cái nào, bảng so sánh, gói cước, prompt mẫu và câu hỏi thường gặp.
tags: AI, Codex, ChatGPT, tác nhân, harness, Claude Code, Cursor
category: harness
layout: wide
mentions: Codex, ChatGPT, Claude Code, Cursor, AGENTS.md
toc: answer=Trả lời nhanh | modes=Ba chế độ | table=So sánh cạnh nhau | plans=Gói cước và giới hạn | pick=Khi nào dùng gì | start=Bắt đầu | faq=Câu hỏi | next=Đọc tiếp
---

Codex hay ChatGPT, nên chọn cái nào còn tùy nhiệm vụ. ChatGPT trả lời bằng văn bản: giải thích, viết bản nháp, phân tích đoạn mã bạn dán vào. Codex làm việc ngay trong dự án: đọc mã, sửa tệp, chạy kiểm thử, chuẩn bị pull request. Có câu hỏi thì dùng chat, cần sửa kho mã thì dùng Codex; Codex nằm trong gói ChatGPT, không tính phí riêng.

<b-post series="prompts">
<b-chapter id="answer" title="Trả lời nhanh" icon="crosshair">
  <b-why>Trong trang trợ giúp của OpenAI, ChatGPT chia thành các chế độ Chat, Work và Codex; Codex được chọn khi cần giao diện cho nhà phát triển và nhiều chi tiết kỹ thuật hơn<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “Select Codex when you want developer views or more technical detail, especially for software development” — learn.chatgpt.com/docs/use-chatgpt"/>.</b-why>

  <iso-art name="codex-or-chatgpt-what-to-choose/chat-vs-agent"></iso-art>
  <b-cap>Bên trái là chat: bạn dán mã vào, nhận văn bản và tự chuyển nó vào dự án. Bên phải là tác nhân: tự mở dự án, sửa và kiểm tra.</b-cap>
  <b-sublabel top="18">Nói đơn giản thì nghĩa là gì</b-sublabel>

  ChatGPT là ứng dụng của OpenAI, nơi bạn trò chuyện với mô hình theo ba chế độ: Chat, Work và Codex. Chat chỉ thấy phần bạn đã dán vào và trả lời bằng văn bản. Tác nhân cho lập trình, và Codex chính là loại này, tự mở các tệp trong dự án của bạn, sửa chúng và kiểm tra kết quả bằng lệnh. Pull request là đề nghị đưa thay đổi vào nhánh chính của dự án: đồng nghiệp xem rồi chấp nhận hoặc trả lại để sửa tiếp. Ở mọi chế độ, mô hình đều thuộc họ GPT, nên lựa chọn dựa vào việc có quyền truy cập dự án hay không và vào thứ bạn cần nhận được ở đầu ra.

  Một ví dụ đời thường. Timur sống ở Almaty và sửa một cửa hàng trực tuyến. Buổi sáng anh dán vào chat một hàm lạ và nhờ giải thích cách nó tính giảm giá: câu trả lời đến dưới dạng văn bản, thế là đủ. Buổi chiều anh cần sửa một bài kiểm thử đang lỗi. Anh mở Codex, nêu tên bài kiểm thử và nhờ chạy toàn bộ kiểm tra sau khi sửa. Tác nhân tìm tệp, thay đổi, chạy kiểm thử và hiện danh sách thay đổi. Một câu hỏi, một lần sửa: hai chế độ trong cùng một ngày.

  Lỗi hay gặp là nhờ chat sửa cả kho mã. Chat trả về một đoạn mã, còn việc dán vào đúng tệp và chạy kiểm thử vẫn là của bạn. Nếu bạn nhận ra mình cứ phải chuyển câu trả lời vào dự án bằng tay hết lần này đến lần khác, nhiệm vụ đó thuộc về Codex. Lỗi ngược lại là chạy tác nhân chỉ để hỏi «cái này hoạt động thế nào». Để giải thích thì chat là đủ, không cần sửa gì trong dự án.

  Bạn có thể kiểm tra lựa chọn bằng một câu hỏi tự hỏi mình: sau câu trả lời, mình có phải sửa tệp và chạy chương trình không? Nếu có, hãy chọn Codex; nếu chỉ cần câu trả lời, hãy chọn chat.
</b-chapter>
<b-chapter id="modes" title="Ba chế độ của ChatGPT" icon="layers">
  <b-why>Trong trang trợ giúp của OpenAI, mỗi chế độ được mô tả bằng một dòng: Chat cho câu hỏi và trao đổi qua lại, Work cho nhiệm vụ lớn cần đưa đến kết quả kiểm tra được, Codex cho phát triển phần mềm<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “Use Chat for a question or back-and-forth” — learn.chatgpt.com/docs/use-chatgpt"/>.</b-why>

  Chế độ là một cách làm việc với cùng một mô hình: nó quyết định bạn nhận được gì ở đầu ra và ChatGPT được cấp quyền truy cập đến đâu. Cả ba chế độ nằm trong một ứng dụng và dùng chung một gói đăng ký.
  <iso-art name="codex-or-chatgpt-what-to-choose/three-modes"></iso-art>
  <b-cap>Mỗi chế độ cho ra gì: Chat là văn bản, Work là tài liệu hoặc bảng hoàn chỉnh, Codex là các thay đổi trong mã, kết quả kiểm thử và pull request.</b-cap>
  <b-sublabel top="18">Tình huống xuyên suốt</b-sublabel>

  Nadya sống ở Berlin và điều hành một dịch vụ đặt lịch hẹn nhỏ. Trong một ngày cô cần cả ba chế độ. Buổi sáng cô hỏi hai cách lưu thời gian trong cơ sở dữ liệu khác nhau thế nào: đó là Chat. Buổi chiều cô cần bản tóm tắt tháng cho khách hàng về những gì đã làm: cô bật Work và nhận một tài liệu hoàn chỉnh. Buổi tối cần sửa phép tính thời lượng cuộc hẹn và kiểm tra bằng kiểm thử: đó là Codex. Với mỗi chế độ, Nadya đều xuất phát từ kết quả cô muốn nhận.

  <b-sublabel top="18">Chat: câu hỏi và trao đổi</b-sublabel>

  Chat là chế độ cho một câu hỏi hoặc một cuộc trò chuyện có qua lại. Trang trợ giúp của OpenAI nêu các ví dụ: ý tưởng, bản nháp, tóm tắt tệp. Làm việc với mã cũng hợp, nếu cần hiểu một đoạn hay một lỗi: bạn dán văn bản vào và nhận lời giải thích. Đầu ra luôn là văn bản. Ví dụ: Nadya dán thông báo lỗi từ nhật ký và hỏi nó nghĩa là gì.

  <b-sublabel top="18">Work: nhiệm vụ lớn đến kết quả</b-sublabel>

  Ở chế độ Work, ChatGPT nhận một nhiệm vụ lớn và đưa nó đến kết quả có thể kiểm tra. Chế độ này được bật trong bộ chuyển. Đầu ra là tài liệu hoàn chỉnh, bảng hoặc bản nghiên cứu. Trên web, nó chạy trong môi trường đám mây được quản lý<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “ChatGPT Work runs in a managed cloud environment” — learn.chatgpt.com/docs/use-chatgpt"/>. Ví dụ: Nadya nhờ tổng hợp bản tóm tắt cho khách hàng và nhận một tài liệu chỉ còn việc đọc rồi gửi đi.

  <b-sublabel top="18">Codex: sửa trong dự án</b-sublabel>

  Codex là chế độ cho phát triển phần mềm: chi tiết kỹ thuật và giao diện kỹ sư. Nó tự đọc kho mã, sửa tệp, chạy kiểm thử và chuẩn bị pull request. Nếu bạn cần sơ đồ của khái niệm này, nó có trong bảng thuật ngữ.
  <iso-art name="term:codex"></iso-art>

  Ví dụ: Nadya nêu bài kiểm thử đang lỗi và giới hạn việc sửa trong một thư mục. Vài phút sau cô có danh sách thay đổi và kết quả chạy. Các hạn chế theo vùng của Codex không được bàn trong bài này: chúng có <a href="/blog/codex-access-regions-vpn-bans/">bài riêng về quyền truy cập Codex</a>.

  <b-sublabel top="18">Mỗi chế độ mở ở đâu</b-sublabel>

  Chat mở trên trang web và trong ứng dụng di động<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Chat is available on the web and mobile — learn.chatgpt.com/docs/use-chatgpt"/>. Work chạy trên trang web trong môi trường đám mây được quản lý và trong ứng dụng máy tính. Codex được chọn trong ứng dụng máy tính; OpenAI nêu thêm terminal, tiện ích mở rộng cho IDE và đám mây của OpenAI trong số các nơi của Codex<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Codex is selected in the desktop app; places include CLI, IDE extension, Cloud — learn.chatgpt.com/docs/use-chatgpt"/>. Dấu gạch ngang trên sơ đồ nghĩa là trang trợ giúp không nêu nơi như vậy cho chế độ đó.
  <iso-art name="codex-or-chatgpt-what-to-choose/where-to-open"></iso-art>
  <b-cap>Các nơi mở của từng chế độ. Terminal và tiện ích mở rộng cho IDE chỉ được nêu ở Codex.</b-cap>
</b-chapter>
<b-chapter id="table" title="Codex và ChatGPT cạnh nhau" icon="table-grid">
  <b-why>Các dòng được lấy từ trang trợ giúp của OpenAI về chế độ và gói cước; nguồn nằm ở biểu tượng. Ngày kiểm tra: 18.11.2026.</b-why>

  David sống ở Tbilisi và đang chọn xuất phát điểm cho nhóm ba người. Anh dùng bảng tổng hợp như một tờ ghi nhớ: đi qua các dòng «dùng để làm gì», «đầu ra» và «thấy dự án» và thấy ngay rằng chat không thay được tác nhân trong kho mã. Bạn có thể tự kiểm tra bảng qua hai trang của OpenAI: trang trợ giúp về chế độ và trang trợ giúp về gói cước.
  <b-sublabel top="18">Codex hoạt động thế nào</b-sublabel>

  Công việc của Codex là một chu trình nhiều bước. Tác nhân đọc dự án, sửa tệp, chạy kiểm thử và hiện diff, tức là danh sách thay đổi theo từng dòng. Nếu kiểm thử lỗi, nó quay lại sửa. Đầu ra là pull request để con người xem. Chỉ dẫn của dự án tác nhân lấy từ tệp AGENTS.md: nên ghi vào đó các lệnh build và những điều cấm.
  <iso-art name="codex-or-chatgpt-what-to-choose/codex-loop"></iso-art>
  <b-cap>Chu trình Codex: đọc, sửa, chạy kiểm thử và khi lỗi thì sửa lại; diff và pull request do con người xem.</b-cap>
  <b-sublabel top="18">Bảng tổng hợp</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th></th><th>ChatGPT Chat</th><th>ChatGPT Work</th><th>Codex</th></tr>
    </thead>
    <tbody>
      <tr><td>Dùng để làm gì</td><td>câu hỏi và trao đổi: ý tưởng, bản nháp, tóm tắt tệp<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “Use Chat for a question or back-and-forth” — learn.chatgpt.com/docs/use-chatgpt"/></td><td>nhiệm vụ lớn đến kết quả kiểm tra được<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “carry a larger task through to a reviewable result” — learn.chatgpt.com/docs/use-chatgpt"/></td><td>phát triển phần mềm: chi tiết kỹ thuật và giao diện kỹ sư<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Codex is the mode for technical detail in the mode table — learn.chatgpt.com/docs/use-chatgpt"/></td></tr>
      <tr><td>Đầu ra</td><td>văn bản</td><td>kết quả hoàn chỉnh: tài liệu, bảng, bản nghiên cứu</td><td>thay đổi trong mã, kết quả kiểm thử, pull request</td></tr>
      <tr><td>Thấy dự án</td><td>chỉ phần đã dán vào</td><td>những gì được cấp quyền truy cập</td><td>tự đọc kho mã</td></tr>
      <tr><td>Mở ở đâu</td><td>trang web và ứng dụng di động<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Chat is available on the web and mobile — learn.chatgpt.com/docs/use-chatgpt"/></td><td>trang web và ứng dụng máy tính; trên web chạy trong môi trường đám mây được quản lý<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “ChatGPT Work runs in a managed cloud environment” — learn.chatgpt.com/docs/use-chatgpt"/></td><td>ứng dụng máy tính, terminal, tiện ích mở rộng cho IDE, đám mây<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Codex is selected in the desktop app; places include CLI, IDE extension, Cloud — learn.chatgpt.com/docs/use-chatgpt"/></td></tr>
      <tr><td>Gói cước</td><td colspan="3">Work và Codex nằm trong Free, Go, Plus, Pro, Business, Edu và Enterprise; không tính phí riêng<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: “ChatGPT Work and Codex are included in your ChatGPT Free, Go, Plus, Pro, Business, Edu, or Enterprise plan” — learn.chatgpt.com/docs/pricing"/></td></tr>
      <tr><td>Giới hạn</td><td colspan="3">phụ thuộc vào gói; ở Free và Go, Codex dành cho việc nhẹ, Plus giá 20 đô la một tháng<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: Free — quick coding tasks, Go — lightweight tasks, Plus — $20/month — learn.chatgpt.com/docs/pricing"/></td></tr>
      <tr><td>Qua khóa API</td><td>—</td><td>—</td><td>terminal, SDK và IDE hoạt động theo giá API; các chức năng đám mây như kiểm tra trên GitHub không nằm trong chế độ này<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: an API key lets you use Codex in the CLI, SDK or IDE at API rates; cloud features not included — learn.chatgpt.com/docs/pricing"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Mô hình ở cả ba chế độ thuộc họ GPT; khác nhau ở quyền truy cập dự án và dạng kết quả.</b-cap>
</b-chapter>
<b-chapter id="plans" title="Gói cước và giới hạn" icon="card">
  <b-why>Work và Codex không bán riêng: chúng nằm trong các gói ChatGPT<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: “ChatGPT Work and Codex are included in your ChatGPT Free, Go, Plus, Pro, Business, Edu, or Enterprise plan” — learn.chatgpt.com/docs/pricing"/>.</b-why>

  Gói cước là khoản bạn trả cho ChatGPT, và một gói mở cả ba chế độ. Các gói khác nhau ở giới hạn: bao nhiêu việc với Codex nằm vừa trong gói của bạn. Ở Free và Go, Codex dành cho các việc nhẹ và nhanh, Plus giá 20 đô la một tháng<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: Free — quick coding tasks, Go — lightweight tasks, Plus — $20/month — learn.chatgpt.com/docs/pricing"/>. Bài này không đưa con số giới hạn chính xác: tôi không tìm thấy, và chúng phụ thuộc vào gói.
  <iso-art name="codex-or-chatgpt-what-to-choose/one-subscription"></iso-art>
  <b-cap>Một gói mở ba chế độ. Giới hạn phụ thuộc vào gói.</b-cap>
  <b-sublabel top="18">Tình huống xuyên suốt</b-sublabel>

  Lina sống ở Warsaw và viết các tập lệnh cho phòng kế toán. Cô mở trang gói cước của OpenAI và thấy Codex có cả trong gói miễn phí, nhưng ở đó dành cho việc nhanh. Tuần đầu như vậy là đủ: cô sửa một tập lệnh và thấy cách làm này dùng được. Khi việc nhiều lên, cô chuyển sang Plus giá 20 đô la một tháng. Bạn có thể kiểm tra gói của mình trên trang gói cước của OpenAI: ở đó có dòng về Codex cho từng gói.

  <b-sublabel top="18">Làm việc qua khóa API</b-sublabel>

  Khóa API là mật khẩu cho chương trình, nhờ nó chương trình gọi mô hình mà không cần gói đăng ký; tiền được tính theo giá API cho mức dùng thực tế. Với khóa như vậy, Codex chạy trong terminal (CLI), trong SDK và trong tiện ích mở rộng cho IDE. Các chức năng đám mây như kiểm tra mã trên GitHub không nằm trong chế độ này<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: an API key lets you use Codex in the CLI, SDK or IDE at API rates; cloud features not included — learn.chatgpt.com/docs/pricing"/>.
  <iso-art name="codex-or-chatgpt-what-to-choose/api-key-mode"></iso-art>
  <b-cap>Khóa API: trả theo giá API, terminal, SDK và IDE hoạt động, các chức năng đám mây thì không.</b-cap>
  <b-sublabel top="18">Những hiểu lầm thường gặp</b-sublabel>

  <b>Codex tính tiền riêng?</b> Không. Nó nằm trong các gói ChatGPT Free, Go, Plus, Pro, Business, Edu và Enterprise, không có khoản thanh toán riêng cho nó. Cách kiểm tra: mở <a href="https://learn.chatgpt.com/docs/pricing">trang trợ giúp của OpenAI về gói cước</a> và tìm dòng «included in your ChatGPT … plan».

  <b>Khóa API cho mọi thứ như gói đăng ký?</b> Không. Qua khóa chạy terminal, SDK và tiện ích mở rộng cho IDE, còn các chức năng đám mây không nằm trong chế độ này, và tiền tính theo giá API. Cách kiểm tra: đọc đoạn về khóa API trong chính trang trợ giúp về gói cước.

  <b>Ở gói miễn phí không dùng được Codex?</b> Dùng được: nó nằm trong Free, nhưng dành cho các việc nhanh với mã. Trong giới hạn nằm vừa bao nhiêu việc như vậy, tôi không tìm thấy trong trang trợ giúp.
</b-chapter>
<b-chapter id="pick" title="Khi nào dùng gì" icon="crosshair">
  <b-why>Lựa chọn được đưa ra cho từng nhiệm vụ: các chế độ dùng chung một gói đăng ký, nên không cần chọn một chế độ cho cả dự án.</b-why>

  Hãy bắt đầu từ câu hỏi bạn muốn nhận gì ở cuối: lời giải thích, tài liệu, hay dự án đã được sửa và kiểm tra. Câu trả lời quyết định chế độ.
  <iso-art name="codex-or-chatgpt-what-to-choose/pick-tree"></iso-art>
  <b-cap>Cây lựa chọn: từ thứ cần nhận đến chế độ.</b-cap>
  <b-sublabel top="18">Bảng lựa chọn</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Tình huống</th><th>Nên dùng</th><th>Vì sao</th></tr>
    </thead>
    <tbody>
      <tr><td>Hiểu đoạn mã của người khác hoặc lỗi trong nhật ký</td><td>ChatGPT Chat</td><td>chỉ cần dán văn bản và nhận lời giải thích</td></tr>
      <tr><td>Sửa lỗi trong kho mã và kiểm tra bằng kiểm thử</td><td>Codex</td><td>tự tìm tệp, sửa và chạy kiểm thử</td></tr>
      <tr><td>Viết thư, đặc tả, bản tóm tắt hoặc bản trình bày</td><td>ChatGPT Work</td><td>kết quả là tài liệu, không phải mã</td></tr>
      <tr><td>Sửa lớn qua nhiều tệp, cần pull request</td><td>Codex trên đám mây hoặc trong terminal</td><td>nhiệm vụ chạy trong môi trường cô lập riêng, đầu ra là các thay đổi để duyệt</td></tr>
      <tr><td>Cần mô hình khác hoặc làm việc trong trình soạn thảo</td><td><a href="/blog/ai-in-code-harness-and-tools/">Claude Code hoặc Cursor</a></td><td>Claude Code chạy trên mô hình Claude, Cursor kết nối mô hình của nhiều công ty</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">Ba tình huống</b-sublabel>

  Oskar sống ở Helsinki và nhận từ nhật ký một lỗi mà anh không nhận ra. Anh dán thông báo vào chat và một phút sau đã biết đó là lỗi gì. Trong dự án không có gì để sửa, nên là Chat. Irma ở Tallinn chuẩn bị bản tóm tắt dự án cho ban lãnh đạo: cô cần tài liệu chứ không phải mã, vì vậy cô bật Work. Pavel ở Praha phải sửa phép tính giao hàng trong bốn tệp và kèm pull request: anh giao nhiệm vụ cho Codex trên đám mây và nhận các thay đổi để duyệt. Mỗi người chọn chế độ theo kết quả mình mong nhận.

  Nếu phải chuyển câu trả lời vào mã bằng tay hơn hai lần, hãy giao nhiệm vụ cho Codex. Cần mô hình khác hoặc làm việc trong trình soạn thảo: Claude Code chạy trên mô hình Claude, Cursor kết nối mô hình của nhiều công ty, còn <a href="/blog/ai-in-code-harness-and-tools/">so sánh các tác nhân này</a> nằm trong một bài riêng.
</b-chapter>
<b-chapter id="start" title="Bắt đầu" icon="zap">
  <b-why>Ba prompt mẫu: mỗi prompt nêu mục tiêu, nơi làm và cách kiểm tra. Tác nhân tự nó không biết thế nào là xong, cho đến khi bạn nói.</b-why>

  Yana sống ở Bratislava và lần đầu chạy Codex trên một dự án làm việc. Cô đi từng bậc: trước hết nhờ đọc và chạy kiểm thử mà không thay đổi gì, rồi sửa một bài kiểm thử, sau đó tạo pull request. Ở mỗi bậc cô kiểm tra kết quả rồi mới đi tiếp.
  <iso-art name="codex-or-chatgpt-what-to-choose/start-ladder"></iso-art>
  <b-cap>Ba bậc: đọc và chạy, một lần sửa, pull request.</b-cap>
  <b-sublabel top="18">Ba prompt cho tác nhân</b-sublabel>
  <b-codebox>
    Đọc README và AGENTS.md. Cho biết kiểm thử được chạy thế nào và chạy chúng, không thay đổi gì. Cho xem bài nào lỗi.
    Sửa bài kiểm thử đang lỗi trong tests/orders.test.ts. Chỉ sửa trong src/orders/. Sau khi sửa, chạy toàn bộ kiểm thử và cho xem diff.
    Chuẩn bị pull request từ các thay đổi này: tên ngắn, đã thay đổi gì và cách kiểm tra.
  </b-codebox>
  <b-sublabel top="18">Vì sao prompt đầu tiên không thay đổi gì</b-sublabel>

  Prompt đầu tiên kiểm tra xem tác nhân có tìm và chạy được kiểm thử không. Nếu kiểm thử chạy được, về sau tác nhân có thể tự kiểm tra mình. Nếu không chạy, sửa mù quáng chẳng đem lại gì: nó sẽ không biết bài kiểm thử đã được sửa hay chưa. Vì vậy hãy bắt đầu bằng prompt đọc và chạy, và chỉ sau đó mới cho phép sửa.

  <b-sublabel top="18">AGENTS.md</b-sublabel>

  AGENTS.md là tệp chỉ dẫn cho tác nhân, Codex đọc nó khi bắt đầu làm việc. Người ta ghi vào đó các lệnh build và chạy kiểm thử, những thư mục không được đụng vào và quy tắc trình bày. Tệp càng chính xác, tác nhân càng ít phải đoán. Cách kiểm tra: ở prompt đầu tiên, nhờ tác nhân kể lại kiểm thử được chạy thế nào và đối chiếu với tệp.
</b-chapter>
<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Codex và ChatGPT là một thứ?">Không. ChatGPT ở chế độ Chat trả lời bằng văn bản, còn Codex làm việc trong dự án: đọc mã, sửa tệp, chạy kiểm thử. Cả hai nằm trong ứng dụng ChatGPT và dùng chung gói đăng ký. Nguồn: learn.chatgpt.com/docs/use-chatgpt, đối chiếu ngày 18.11.2026.</q>
    <q t="Có phải trả tiền riêng cho Codex không?">Không. Codex nằm trong các gói ChatGPT Free, Go, Plus, Pro, Business, Edu và Enterprise, còn giới hạn phụ thuộc vào gói. Khi làm việc qua khóa API, tiền tính theo giá API. Nguồn: learn.chatgpt.com/docs/pricing, đối chiếu ngày 18.11.2026.</q>
    <q t="Có thể viết mã chỉ trong chat thông thường không?">Được: chat sẽ giải thích, viết hàm và phân tích lỗi. Nhưng việc chuyển vào dự án và chạy kiểm thử vẫn là của bạn. Khi cần sửa nhiều, Codex tiết kiệm thời gian vì tự mở tệp và kiểm tra kết quả.</q>
    <q t="Nên dùng gì thay Codex nếu cần mô hình khác?">Claude Code chạy trên mô hình Claude, Cursor kết nối mô hình của nhiều công ty. Việc chọn giữa chúng được mô tả trong một bài riêng. Nguồn: learn.chatgpt.com/docs và code.claude.com/docs/en/overview (đối chiếu ngày 15.11.2026, không lặp lại cho bài này).</q>
    <q t="Chế độ Work là gì và khác Codex thế nào?">Work đưa một nhiệm vụ lớn đến kết quả hoàn chỉnh: tài liệu, bảng, bản nghiên cứu. Codex làm việc với mã của dự án và cho ra các thay đổi, kết quả kiểm thử và pull request. Nguồn: learn.chatgpt.com/docs/use-chatgpt.</q>
    <q t="Có thể chạy Codex qua khóa API thay cho gói đăng ký không?">Được: terminal, SDK và tiện ích mở rộng cho IDE hoạt động theo giá API. Các chức năng đám mây, ví dụ kiểm tra mã trên GitHub, không nằm trong chế độ này. Nguồn: learn.chatgpt.com/docs/pricing.</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="next" title="Đọc tiếp">
  <b-links cols="2">
    <item href="/blog/ai-in-code-harness-and-tools/" k="So sánh" t="Codex vs Claude Code, Cursor vs Hermes Agent: so sánh các tác nhân AI viết code">Tác nhân nào cho nhiệm vụ nào</item>
    <item href="/blog/specs-rules-skills/" k="Ngữ cảnh" t="AGENTS.md và CLAUDE.md là gì: file ví dụ và nơi giữ đặc tả, quy tắc và skill">Tác nhân đọc những chỉ dẫn nào</item>
    <item href="/blog/harness-driven-development/" k="Phương pháp" t="Harness engineering trong thực tế: biến lỗi của tác nhân AI thành quy tắc của môi trường (HDD)">Lỗi của tác nhân trở thành quy tắc</item>
    <item href="/blog/claude-code-install-and-price/" k="Cài đặt" t="Claude Code: cài đặt và giá, gói đăng ký và quyền truy cập theo quốc gia">Lệnh, đăng nhập, gói cước</item>
    <item href="/blog/cursor-rules-vs-agents-md/" k="Quy tắc" t="Cursor rules và AGENTS.md: cái gì đặt ở đâu">Tệp quy tắc mà Codex đọc</item>
    <item href="/blog/codex-access-regions-vpn-bans/" k="Truy cập" t="Codex CLI không khả dụng ở nước bạn: danh sách quốc gia hỗ trợ, VPN và khóa tài khoản">Danh sách quốc gia và đăng nhập</item>
    <item href="/blog/ai-agent-llm-harness/" k="Nền tảng" t="Tác nhân khác chat thế nào">Tác nhân, trợ lý, chatbot và mạng nơ-ron</item>
    <item href="/blog/work-prompts-examples/" k="Prompt" t="Prompt cho công việc">Yêu cầu cho Chat và Work</item>
    <item href="/materials/glossary/codex/" k="Thuật ngữ" t="Codex">Làm được gì, chạy ở đâu</item>
  </b-links>
</b-chapter>
<b-footer>Theo trang trợ giúp của OpenAI, nguồn nằm ở biểu tượng. Ngày kiểm tra: 18.11.2026.</b-footer>
</b-post>
