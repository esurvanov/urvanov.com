---
title: Claude Code kiểm thử trang web trong trình duyệt của bạn như thế nào: Claude in Chrome — gỡ lỗi và điền form dưới phiên đăng nhập của bạn
date: 2026-10-05
updated: 2026-11-13
description: Claude in Chrome nối Claude Code với trình duyệt: tác nhân mở tab, đọc console, chạy kịch bản và điền form dưới phiên đăng nhập của bạn. Cách kết nối, nó làm được gì và nên cấp quyền nào.
tags: AI, tác nhân, Claude Code, Claude in Chrome, trình duyệt, QA, harness
category: harness
layout: wide
mentions: Claude in Chrome, Claude Code, Chrome extension, browser automation, MCP, permissions, QA, Puppeteer, token cost
toc: what=Là gì | connect=Kết nối | gives=Làm được gì | qa=Ví dụ | risks=Quyền và rủi ro | tradeoff=Cái giá của sự linh hoạt | custom=Script riêng | first=Bắt đầu từ đâu | faq=Câu hỏi | next=Tiếp theo
---

Claude in Chrome nối tác nhân AI (AI agent) với trình duyệt của bạn: nó mở tab, đọc trang và console, bấm và gõ dưới phiên đăng nhập của bạn. Bên dưới: cách hoạt động, cách kết nối trong vài phút, tác nhân làm được gì và nên cấp quyền nào. Tác nhân trong bài [QA cùng tác nhân](/blog/bug-report-to-reproduction-agent/) dùng chính kênh này, và việc kết nối hoạt động giống [MCP](/blog/mcp-agent-access/).

<b-post series="harness">

<b-chapter id="what" icon="monitor" title="Claude in Chrome là gì">
  <b-why>Một tiện ích mở rộng của Chrome nối Claude Code với trình duyệt. Tác nhân mở tab mới và làm việc trong một cửa sổ nhìn thấy được<b-proof href="https://code.claude.com/docs/en/chrome" quote="Browser actions run in a visible Chrome window in real time."/>.</b-why>
  <iso-art name="claude-in-chrome/terminal-to-browser"></iso-art>
  <b-why align="left">Hình cho thấy ba thành phần từ trái sang phải: Claude Code trong terminal, tiện ích mở rộng và trình duyệt của bạn. Tác nhân ra lệnh cho tiện ích (mở tab, bấm, đọc trang), và tiện ích thực hiện chúng trong trình duyệt nơi bạn đã đăng nhập vào các dịch vụ. Vì vậy tác nhân không cần gõ mật khẩu: phiên của bạn đã mở sẵn<b-proof href="https://code.claude.com/docs/en/chrome" quote="shares your browser's login state"/>. Công việc diễn ra trong cửa sổ nhìn thấy được, và bạn có thể theo dõi từng bước.</b-why>
  <b-why align="left">Các nhãn bên dưới cho biết tiện ích hoạt động với trình duyệt nào. Chrome và Edge được hỗ trợ chính thức<b-proof href="https://code.claude.com/docs/en/chrome" quote="Chrome integration works with Google Chrome and Microsoft Edge."/>. Brave, Arc, Vivaldi và Opera được xây trên cùng engine Chromium: Claude Code tìm thấy tiện ích trong đó và kết nối<b-proof href="https://code.claude.com/docs/en/chrome" quote="Claude Code also detects the extension and sets up the connection in other Chromium-based browsers"/>. Nhãn cuối, “WSL: không”, nghĩa là kết nối này không hoạt động trong Windows Subsystem for Linux (WSL)<b-proof href="https://code.claude.com/docs/en/chrome" quote="Chrome integration isn't supported in Windows Subsystem for Linux (WSL)."/>.</b-why>
  <b-pills>
    <pill>Chrome</pill>
    <pill>Edge</pill>
    <pill>Brave</pill>
    <pill>Arc</pill>
    <pill>Vivaldi</pill>
    <pill>Opera</pill>
    <pill>WSL: không</pill>
  </b-pills>
  <b-finding>
    <ex>Tác nhân trong terminal điều khiển các tab Chrome qua tiện ích và dùng các phiên đăng nhập của bạn.</ex>
    <gen>Các hành động hiện ra trong cửa sổ theo thời gian thực. Gặp trang đăng nhập hoặc CAPTCHA, tác nhân dừng và chờ bạn. Trong Claude Code, tiện ích hiện ra là MCP server claude-in-chrome: /mcp liệt kê các công cụ của nó.</gen>
    <do k="Làm gì">Kiểm tra yêu cầu: tiện ích phiên bản 1.0.36 trở lên<b-proof href="https://code.claude.com/docs/en/chrome" quote="version 1.0.36 or later"/>, Claude Code, gói Pro, Max, Ultra, Team hoặc Enterprise<b-proof href="https://code.claude.com/docs/en/chrome" quote="A direct Anthropic plan (Pro, Max, Ultra, Team, or Enterprise)"/>, và đăng nhập bằng /login<b-proof href="https://code.claude.com/docs/en/chrome" quote="Chrome integration also requires signing in with"/>.</do>
  </b-finding>
</b-chapter>

<b-chapter id="connect" icon="plug" title="Cách kết nối">
  <b-say-agent title="Nói với tác nhân">Cài Claude in Chrome và kết nối nó với Claude Code.</b-say-agent>
  <b-why align="left">Nếu chưa có tiện ích, Claude Code đề nghị cài nó<b-proof href="https://code.claude.com/docs/en/chrome" quote="Claude Code shows an install prompt titled"/>: bạn đồng ý và đăng nhập qua trình duyệt. [Nếu tác nhân nhờ bạn làm việc đó](/blog/agent-hands-work-back-to-you/).</b-why>
  <b-spoiler summary="Cách làm bằng tay">
    <b-why align="left">Kết nối gồm ba bước. Bước 1: cài tiện ích Claude vào Chrome từ kho tiện ích, chỉ một lần. Bước 2: trong terminal nơi Claude Code chạy, khởi động claude --chrome, và tác nhân liên kết với trình duyệt. Bước 3: gõ /chrome và xem trạng thái: nếu hiện “Enabled” thì liên kết đã hoạt động.</b-why>
    <iso-art name="claude-in-chrome/setup-steps"></iso-art>
    <b-codebox copy>
      claude --chrome
      /chrome   # trạng thái, quyền, kết nối lại
    </b-codebox>

<a href="https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn" target="_blank" rel="noopener">Tiện ích trong Chrome Web Store</a>. Để khỏi dùng cờ, hãy mở /chrome và bật “Enabled by default”. Khi đó các công cụ của trình duyệt luôn nằm trong ngữ cảnh, và lượng token tiêu thụ tăng<b-proof href="https://code.claude.com/docs/en/chrome" quote="Enabling Chrome by default increases context usage since the browser tools and their instructions are always loaded."/>. Trong VS Code, gõ @browser vào ô nhập để kết nối trình duyệt; «Enabled by default» dùng chung cho terminal và VS Code<b-proof href="https://code.claude.com/docs/en/chrome" quote="The two share one setting, so turning it on in either place turns it on for both the CLI and VS Code."/>.

    <b-spoiler summary="Nếu không kết nối được">
      <b-node-grid min="170">
        <node icon="check" t="Tiện ích đã bật">trên trang chrome://extensions</node>
        <node icon="play" t="Chrome đang chạy">và Claude Code đã cập nhật</node>
        <node icon="refresh-cw" t="Kết nối lại">lệnh /chrome, mục Reconnect extension</node>
        <node icon="monitor-screen" t="Lần đầu">khởi động lại Chrome sau khi cài</node>
      </b-node-grid>
    </b-spoiler>
  </b-spoiler>
  <b-finding>
    <ex>Tác nhân tự cài tiện ích và kết nối nó với Claude Code. Bạn chỉ cần đồng ý và đăng nhập qua trình duyệt.</ex>
    <gen>Kết nối chỉ mất vài phút: tiện ích lấy từ Chrome Web Store, phần còn lại do Claude Code làm.</gen>
    <do k="Làm gì">Nói tác nhân cài tiện ích và đảm bảo /chrome hiện “Status: Enabled” và “Extension: Installed”<b-proof href="https://code.claude.com/docs/en/chrome" quote="The integration is working when the status panel shows"/>.</do>
  </b-finding>
</b-chapter>

<b-chapter id="gives" icon="grid-alt" title="Tác nhân làm được gì trong trình duyệt">
  <b-why align="left">Ở giữa hình là trình duyệt, xung quanh là bốn loại việc tác nhân làm bên trong nó.</b-why>
  <iso-art name="claude-in-chrome/browser-uses"></iso-art>
  <b-why align="left">Thứ nhất: đọc console và trang, nhờ đó tìm ra nguyên nhân lỗi. Thứ hai: chạy kịch bản và điền form, qua đó kiểm tra đường đi có thông suốt không. Thứ ba: làm việc với tài liệu dưới phiên đăng nhập của bạn, tức là với những gì không mở được nếu chưa đăng nhập. Thứ tư: trích xuất dữ liệu và quay GIF để lại dấu vết cho việc kiểm tra. Không cần viết code cho từng việc nhỏ: bạn nêu tác vụ bằng lời và tác nhân tự tìm nút và trường.</b-why>
  <b-finding>
    <ex>Một kết nối bao trùm gỡ lỗi, test, form, tài liệu và trích xuất dữ liệu.</ex>
    <gen>Tác nhân đọc console và DOM, chạy kịch bản, điền form, tải tệp lên (tổng cộng tối đa 10 MB<b-proof href="https://code.claude.com/docs/en/chrome" quote="a single upload can include up to 10 MB of files in total"/>) and records GIFs<b-proof href="https://code.claude.com/docs/en/chrome" quote="record browser interactions as GIFs"/>.</gen>
    <do k="Làm gì">Chọn một tác vụ lặp đi lặp lại trong trình duyệt và giao cho tác nhân.</do>
  </b-finding>
</b-chapter>

<b-chapter id="qa" icon="bug" title="Ví dụ: một lỗi trên môi trường kiểm thử">
  <b-why>Ticket PAY-142 từ bài [về QA cùng tác nhân](/blog/bug-report-to-reproduction-agent/): tác nhân tự đi theo đường đó và mang về bằng chứng.</b-why>
  <b-say-agent title="Nói với tác nhân">Mở môi trường kiểm thử, thêm một mặt hàng vào giỏ, áp mã khuyến mãi và thanh toán bằng thẻ thử. Nếu thanh toán lỗi, xem console và quay GIF đường đi.</b-say-agent>
  <b-why align="left">Tiếp theo là ví dụ từ bài về QA: ticket PAY-142 và đường đi của tác nhân đến kết quả hoàn chỉnh.</b-why>
  <iso-art name="claude-in-chrome/ticket-to-report"></iso-art>
  <b-why align="left">Hình cho thấy đường đi từ ticket đến kết quả. Ticket đến tay tác nhân, tác nhân đi qua giỏ hàng, mã khuyến mãi và thanh toán trong trình duyệt, tìm lỗi trong console và quay GIF. QA nhận được dấu vết kiểm chứng được thay vì lời kể lại: nội dung console và đoạn ghi lại quá trình di chuyển trên trang. Nếu đoạn ghi và console không khớp với báo cáo, điều đó lộ ra ngay.</b-why>
  <b-finding>
    <ex>Tác nhân đi theo đường đó, tìm lỗi trong console và quay GIF cho ticket.</ex>
    <gen>Cửa sổ nhìn thấy được, nên QA theo dõi từng bước và có thể dừng tác nhân. Nội dung console và GIF để lại dấu vết kiểm tra được.</gen>
    <do k="Làm gì">Yêu cầu kèm GIF và đoạn trích console với mỗi kết quả.</do>
  </b-finding>
</b-chapter>

<b-chapter id="risks" icon="shield-check" title="Quyền và rủi ro">
  <b-why align="left">Tác nhân làm việc bên trong trình duyệt của bạn, nên mọi thứ bạn đã đăng nhập đều nằm trong tầm với của nó. Tuyến phòng thủ đầu tiên trong hình là danh sách các trang được phép và yêu cầu cấp quyền với trang mới.</b-why>
  <iso-art name="claude-in-chrome/site-permissions"></iso-art>
  <b-why align="left">Bên trái hình là nơi bạn quyết định: tác nhân hỏi “cho phép không?”. Ở giữa là trang A và B, bạn đã cho phép và tác nhân làm việc ở đó. Bên phải là trang C, đóng với tác nhân. Mọi hành động trên trang mới đều bắt đầu bằng sự đồng ý của bạn. Dưới đây là từng quy tắc: tác nhân thấy gì, dừng ở đâu và cần xem gì trước khi gửi một đoạn ghi.</b-why>
  <b-rules sw="1.8">
    <rule icon="lines" t="Trang web">Cài đặt của tiện ích quyết định tác nhân được duyệt, bấm và gõ trên những trang nào.</rule>
    <rule icon="bell" t="Yêu cầu cấp quyền">Hộp thoại “Claude in Chrome wants to” cho phép một hành động hoặc cả trang trong phiên làm việc.</rule>
    <rule icon="key" t="Phiên đăng nhập của bạn">Tác nhân có thể tiếp cận mọi thứ bạn đã đăng nhập trong trình duyệt này.</rule>
    <rule icon="pause" t="Đăng nhập và CAPTCHA">Tác nhân tạm dừng và chờ bạn.</rule>
    <rule icon="video" t="GIF">Đoạn ghi bao gồm mọi thứ nhìn thấy, cả thông tin tài khoản: hãy xem lại trước khi chia sẻ.</rule>
    <rule icon="ban" t="Hộp thoại">Các hộp thoại alert, confirm và prompt chặn lệnh: hãy đóng chúng bằng tay và yêu cầu tác nhân tiếp tục.</rule>
  </b-rules>
  <b-why align="left">Mỗi quy tắc này đều có trong tài liệu của Claude Code. Tác nhân dừng ở trang đăng nhập và CAPTCHA<b-proof href="https://code.claude.com/docs/en/chrome" quote="When Claude encounters a login page or CAPTCHA, it pauses and asks you to handle it manually."/>. Yêu cầu cấp quyền bắt đầu bằng “Claude in Chrome wants to”<b-proof href="https://code.claude.com/docs/en/chrome" quote="The dialog starts with"/>. Đoạn ghi GIF thu lại mọi thứ nhìn thấy, kể cả thông tin tài khoản<b-proof href="https://code.claude.com/docs/en/chrome" quote="The recording captures everything visible in the browser, including account details on logged-in pages"/>. Các hộp thoại alert, confirm và prompt chặn lệnh<b-proof href="https://code.claude.com/docs/en/chrome" quote="JavaScript dialogs block browser events and prevent Claude from receiving commands."/>. Danh sách trang được đặt trong cài đặt của tiện ích<b-proof href="https://code.claude.com/docs/en/chrome" quote="Manage permissions in the Chrome extension settings to control which sites Claude can browse, click, and type on."/>.</b-why>
  <b-cap>Văn bản trên trang có thể được nhắm vào tác nhân (tấn công chèn prompt, prompt injection). Rủi ro này được trình bày trong [một bài riêng](/blog/data-plane-control-plane-prompt-injection/).</b-cap>
  <b-finding>
    <ex>Các trang được phép thì mở với tác nhân, phần còn lại vẫn đóng, và hành động trên trang mới cần sự đồng ý của bạn.</ex>
    <gen>Tác nhân làm việc với các phiên đăng nhập của bạn, nên quyền theo từng trang là tuyến phòng thủ đầu tiên.</gen>
    <do k="Làm gì">Mở cài đặt của tiện ích và chỉ giữ những trang mà tác vụ cần.</do>
  </b-finding>
</b-chapter>

<b-chapter id="tradeoff" icon="scales" title="Cái giá của sự linh hoạt: chậm hơn script và có nguy cơ sai">
  <b-why align="left">Tác nhân trong trình duyệt làm việc khác với script hay chương trình viết sẵn. Script chạy các bước giống nhau, nhanh và đồng nhất. Ở mỗi bước, tác nhân đọc trang, suy nghĩ và quyết định làm gì tiếp, nên chậm hơn và tốn token. Nó có thể sai: bấm nhầm nút hoặc kể lại điều không có trên trang, tức là [hallucinate](/materials/glossary/hallucination/). Đổi lại, nó xử lý được tác vụ không thể mô tả trước bằng code: trang đã đổi, nút đã dời chỗ, tác vụ được nêu bằng lời. Đó là cái giá của sự linh hoạt, và nên trả nó một cách có ý thức.</b-why>
  <b-table id="agent-vs-script">

| | Script | Tác nhân trong trình duyệt |
|---|---|---|
| Tốc độ | nhanh, các bước giống nhau | chậm hơn: đọc và suy nghĩ ở mỗi bước |
| Tính lặp lại | cùng kết quả mỗi lần | câu trả lời có thể khác nhau giữa các lần chạy |
| Khi trang thay đổi | hỏng cho đến khi được sửa | thích nghi, nhưng có thể sai hoặc bịa |
| Chuẩn bị | phải viết và bảo trì code | chỉ cần mô tả tác vụ bằng lời |
| Phù hợp với | công việc đều đặn, khối lượng lớn | việc một lần, thăm dò, trang không quen thuộc |

  </b-table>
  <b-why align="left">Còn có một quan sát của tác giả. Các dịch vụ nổi tiếng khắt khe với tự động hóa, chẳng hạn LinkedIn, thường đối xử với tác nhân trong trình duyệt thật bình tĩnh hơn so với script và công cụ cào dữ liệu: các hành động đến từ cửa sổ của bạn, dưới phiên đăng nhập của bạn, với nhịp độ của người thật. Điều này không bảo đảm gì. Quy tắc của các dịch vụ đó thường cấm hành động tự động, và nguy cơ bị khóa tài khoản vẫn thuộc về bạn. Vì vậy chỉ giao cho tác nhân những việc bạn sẽ làm bằng tay, từng phần nhỏ và có kiểm tra kết quả.</b-why>
  <b-cap>Tốc độ, lỗi của tác nhân và phản ứng của các dịch vụ được mô tả theo quan sát của tác giả: tài liệu của Claude Code không đề cập đến chúng.</b-cap>
  <b-finding>
    <ex>Tác nhân chậm hơn script và có thể sai, nhưng xử lý được những chỗ mà script phải viết lại.</ex>
    <gen>Tốc độ và tính lặp lại được đổi lấy sự linh hoạt. Một dấu vết kiểm chứng được (console, GIF, văn bản kết quả) đem lại khả năng kiểm soát lỗi.</gen>
    <do k="What to do">Với việc một lần và không quen thuộc, dùng tác nhân; với việc đều đặn, khối lượng lớn, viết script. Hãy so sánh kết quả của tác nhân với những gì bạn tự thấy.</do>
  </b-finding>
</b-chapter>

<b-chapter id="custom" icon="boxes-route" title="Khi cần script riêng">
  <b-why align="left">Claude in Chrome phù hợp với việc một lần, nhưng tác vụ production thường cần script riêng.</b-why>
  <b-rules sw="1.8">
    <rule icon="code" t="Puppeteer">Thư viện điều khiển trình duyệt từ code: mở trang, bấm, lấy ra thứ bạn cần. Nó chạy mà không cần tác nhân ở mỗi bước.</rule>
    <rule icon="page-lines" t="Cả trang">Claude Code lấy cả trang: văn bản, phần tử, ảnh chụp màn hình. Điều đó tiện cho tác vụ một lần.</rule>
    <rule icon="coin" t="Token và tốc độ">Trang càng lớn thì mỗi bước tốn càng nhiều token: chậm hơn và đắt hơn.</rule>
    <rule icon="boxes-route" t="Script riêng">Giải pháp tự viết chỉ lấy phần của trang hoặc site bạn cần: một bảng, một form, một khối. Tác nhân nhận kết quả ngắn gọn.</rule>
    <rule icon="scales" t="Chọn gì">Tác vụ một lần và thăm dò: Claude in Chrome. Công việc đều đặn, khối lượng lớn, có ngân sách token: script riêng mà tác nhân gọi như một công cụ.</rule>
  </b-rules>
  <b-cap>Script có thể được nối với tác nhân qua [MCP](/blog/mcp-agent-access/) hoặc một skill: tác nhân yêu cầu đúng phần trang nó cần thay vì mở toàn bộ.</b-cap>
  <b-finding>
    <ex>Tác nhân đọc cả trang và tốn token cùng thời gian cho việc đó.</ex>
    <gen>Với production, token và tốc độ quan trọng, nên chỉ lấy những phần cần thiết của site và trang.</gen>
    <do k="Làm gì">Để việc một lần cho Claude in Chrome. Chuyển việc lặp lại vào script Puppeteer và giao nó cho tác nhân.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="Bắt đầu từ đâu">
  <b-why align="left">Ba bước lặp lại phần đầu bài: tiện ích, khởi chạy, kiểm tra.</b-why>
  <iso-art name="claude-in-chrome/start-steps"></iso-art>
  <b-why align="left">Lần chạy đầu hãy dùng môi trường cục bộ hoặc kiểm thử: nếu tác nhân sai thì không có gì bị hại. Trước tiên chỉ yêu cầu nó đọc (mở một trang và kể lại), sau đó mới cho phép hành động. Như vậy bạn nhận ra lỗi của tác nhân trên một tác vụ an toàn.</b-why>
  <b-finding>
    <ex>Ba bước: tiện ích, khởi chạy, kiểm tra.</ex>
    <gen>Bắt đầu với môi trường cục bộ: sai ở đó không làm hỏng gì.</gen>
    <do k="Làm gì">Hôm nay, nói tác nhân cài tiện ích và kiểm tra trạng thái bằng /chrome.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Kết nối Claude in Chrome như thế nào?">Cài tiện ích từ Chrome Web Store, phần còn lại do Claude Code làm. Chỉ mất vài phút.</q>
    <q t="Tác nhân làm được gì trong trình duyệt?">Nó đọc console và mã đánh dấu của trang, chạy các kịch bản, điền form, tải tệp lên tổng cộng tối đa 10 MB và quay GIF.</q>
    <q t="Giao trình duyệt cho tác nhân có an toàn không?">Các hành động hiện ra trong cửa sổ theo thời gian thực, và gặp trang đăng nhập hoặc captcha thì tác nhân dừng và chờ bạn. Quyền và rủi ro được trình bày riêng trong bài.</q>
    <q t="Khi nào script tốt hơn?">Tác nhân trong trình duyệt chậm hơn script và có thể mắc lỗi. Với các phép kiểm tra lặp lại cần tốc độ và độ chính xác, hãy viết script.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Tiếp theo">
  <b-links>
    <item href="/blog/bug-report-to-reproduction-agent/" k="Ví dụ" t="Công việc của QA sau khi hỗ trợ cùng tác nhân AI: nghiên cứu, mô tả và tài liệu hóa qua MCP và skill">Tác nhân tái hiện một lỗi Jira</item>
    <item href="/blog/mcp-agent-access/" k="Kết nối" t="MCP cho tác nhân AI: giải quyết vấn đề gì và cách giao việc kết nối cho tác nhân">Tác nhân có quyền truy cập vào các hệ thống thế nào</item>
    <item href="/blog/agent-hands-work-back-to-you/" k="Giao lại việc" t="Tác nhân thích sai bạn làm: cách buộc nó tự làm">Khi tác nhân nhờ con người giúp</item>
  </b-links>
</b-chapter>
<b-footer>Ticket PAY-142 được bịa ra cho ví dụ. Các dữ kiện về kết nối và quyền theo tài liệu của Claude Code: <a href="https://code.claude.com/docs/en/chrome" target="_blank" rel="noopener">Use Claude Code with Chrome</a>.</b-footer>
</b-post>
