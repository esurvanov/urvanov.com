---
title: Claude Code: cài đặt và giá, gói đăng ký và quyền truy cập theo quốc gia
seoTitle: Claude Code: cài đặt và giá 2026, gói đăng ký, truy cập
date: 2026-11-17
updated: 2026-11-18
description: Cài Claude Code trên Mac, Linux hoặc Windows, gói Pro, Max, Ultra, Team gồm gì, có cần khóa API không, có chạy ở Nga không. Có lệnh cài và lỗi thường gặp.
tags: AI, Claude Code, cài đặt, giá, gói đăng ký, harness
category: harness
layout: wide
mentions: Claude Code, OpenCode, Codex, Cursor, Gemini CLI, Antigravity CLI, CLAUDE.md
toc: answer=Trả lời nhanh | what=Claude Code là gì | install=Cài đặt | login=Chạy lần đầu | plans=Gói và giá | check=Kiểm tra | errors=Lỗi | region=Quyền truy cập | alt=Lựa chọn thay thế | prompts=Prompt | faq=Câu hỏi | next=Đọc tiếp
---

Claude Code cài bằng một lệnh trong terminal: trên macOS, Linux và WSL là `curl -fsSL https://claude.ai/install.sh | bash`, trên Windows trong PowerShell là `irm https://claude.ai/install.ps1 | iex`. Để đăng nhập cần gói trả phí: Claude Pro 20 đô la một tháng, Max, Ultra, Team hoặc Enterprise, hoặc tài khoản Console tính tiền theo lượng dùng API; gói miễn phí không dùng được.

<b-post series="harness">
<b-chapter id="answer" title="Trả lời nhanh" icon="crosshair">
  <b-why>Cài đặt chỉ cần một lệnh, còn đăng nhập diễn ra trong trình duyệt. Luôn cần trả phí: gói đăng ký hoặc thanh toán theo API<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Claude Code requires a Pro, Max, Ultra, Team, Enterprise, or Console account. The free claude.ai plan does not include Claude Code access» — code.claude.com/docs/en/setup"/>.</b-why>

  <iso-art name="claude-code-install-and-price/install-flow"></iso-art>
  <b-cap>Đường đi từ terminal trống đến câu trả lời đầu tiên: mở terminal, dán lệnh, mở cửa sổ mới, kiểm tra phiên bản, đăng nhập vào tài khoản.</b-cap>
  <b-sublabel top="18">Nói đơn giản thì nghĩa là gì</b-sublabel>

  Claude Code là tác nhân lập trình của Anthropic, công ty làm ra Claude. Nó chạy trong terminal, cửa sổ nơi bạn gõ lệnh bằng chữ, đọc các tệp của dự án và sửa chúng để làm việc bạn giao. Bạn cài nó bằng một lệnh: sao chép dòng dành cho hệ điều hành của mình, dán vào terminal và chờ. Sau đó bạn mở lại terminal, kiểm tra phiên bản và đăng nhập vào tài khoản Claude qua trình duyệt. Quyền truy cập là trả phí: cần một gói đăng ký hoặc tài khoản tính tiền theo lượng dùng API. Gói trò chuyện Claude miễn phí vẫn miễn phí, nhưng Claude Code không nằm trong đó.

  Ví dụ đời thường. Luka sống ở Lisbon và làm việc trên laptop chạy Ubuntu. Anh mở terminal và dán lệnh cho macOS, Linux và WSL. Vài phút đầu trình cài đặt không hiện gì, và Luka không đóng cửa sổ. Sau đó anh mở cửa sổ terminal mới, gõ <code>claude --version</code> và thấy số phiên bản kèm chú thích "(Claude Code)". Còn lại là đăng nhập: Luka chạy <code>claude</code> trong thư mục dự án, trình duyệt mở trang đăng nhập, và anh đăng nhập bằng gói Pro của mình. Bồ Đào Nha có trong danh sách quốc gia của Anthropic, nên vùng không cản đường.

  Một sai lầm thường gặp là cài Claude Code khi chỉ có tài khoản trò chuyện miễn phí. Cài đặt sẽ thành công, nhưng đăng nhập sẽ không cho quyền dùng tác nhân: gói miễn phí không có Claude Code. Trước khi cài, hãy quyết định bạn sẽ trả tiền thế nào: gói Pro, Max, Ultra, Team hoặc Enterprise, hoặc thanh toán theo API qua Console.

  Bạn có thể kiểm tra câu trả lời ngay sau khi cài: lệnh <code>claude --version</code> in ra số phiên bản và "(Claude Code)". Giá và điều khoản được đối chiếu với <a href="https://claude.com/pricing">trang giá của Claude</a> và <a href="https://code.claude.com/docs/en/setup">trang cài đặt Claude Code</a>.
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Câu hỏi</th><th>Trả lời tại 18.11.2026</th></tr>
    </thead>
    <tbody>
      <tr><td>Cài thế nào</td><td>một lệnh: một lệnh cho macOS, Linux và WSL, lệnh khác cho Windows PowerShell hoặc CMD</td></tr>
      <tr><td>Giá</td><td>Pro 20 đô la một tháng, Max 100, Ultra 200; Team từ 25 đô la mỗi chỗ<b-proof href="https://claude.com/pricing" quote="Claude: Pro «$20 if billed monthly», Max «$100», Ultra «$200», Team standard seat «$25 if billed monthly» — claude.com/pricing"/></td></tr>
      <tr><td>Gói nào có Claude Code</td><td>Claude Code có trong Pro, Max, Ultra, Team và Enterprise; gói miễn phí không có Claude Code</td></tr>
      <tr><td>Quyền truy cập</td><td>Nga không có trong danh sách quốc gia chính thức của Anthropic; điều khoản nêu Claude Code trong số các sản phẩm có hạn chế này<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported» — anthropic.com/supported-countries"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Ngày kiểm tra: 18.11.2026. Giá và danh sách quốc gia thay đổi: hãy mở lại các trang của Anthropic trước khi thanh toán.</b-cap>
</b-chapter>
<b-chapter id="what" title="Claude Code là gì" icon="terminal">
  <b-why>Claude Code là tác nhân lập trình của Anthropic. Nó đọc dự án, sửa tệp, chạy lệnh và kiểm thử, và làm việc với git. Claude thông thường trong cuộc trò chuyện trả lời bằng chữ, còn Claude Code tự thay đổi các tệp của dự án.</b-why>

  <iso-art name="term:claude-code"></iso-art>
  <b-links cols="1">
    <item href="/materials/glossary/claude-code/" k="Thuật ngữ" t="Claude Code">Nó làm được gì, chạy ở đâu, dùng những mô hình nào</item>
  </b-links>
  <b-sublabel top="18">Nói đơn giản thì nghĩa là gì</b-sublabel>

  Tác nhân tự làm việc: bạn mô tả nhiệm vụ bằng lời, và nó mở đúng các tệp của dự án, sửa, chạy kiểm tra rồi đưa ra kết quả. Git là chương trình lưu lịch sử thay đổi của dự án; Claude Code làm việc được với nó. Kiểm thử là các phép kiểm tra xác nhận chương trình vẫn chạy đúng sau khi sửa; tác nhân tự chạy chúng và đọc kết quả.

  Claude Code chạy trong terminal, trong VS Code và JetBrains, trong ứng dụng máy tính, trong trình duyệt, trong Slack và trong CI. Bài này nói về terminal, cách dùng chính<b-proof href="https://code.claude.com/docs/en/quickstart" quote="Claude Code: «Claude Code is also available on the web, as a desktop app, in VS Code and JetBrains IDEs, in Slack, and in CI/CD» — code.claude.com/docs/en/quickstart"/>.

  Ví dụ đời thường. Rita sống ở Riga và điều hành một website nhỏ có kiểm thử và lịch sử thay đổi trong git. Đầu tiên cô hỏi Claude trong cuộc trò chuyện vì sao một nút không hoạt động và nhận lời giải thích bằng chữ: cô phải tự sửa mã. Sau đó cô chạy Claude Code trong thư mục của website và viết đúng nhiệm vụ đó. Tác nhân tìm đúng tệp, sửa, chạy kiểm thử và hiện thay đổi. Rita xem bản sửa trong git và chấp nhận. Latvia có trong danh sách quốc gia của Anthropic, nên vùng không gây thắc mắc nào.

  <b>Claude Code có phải cùng một Claude như trong cuộc trò chuyện, chỉ chạy trong terminal?</b> Không. Trong cuộc trò chuyện Claude trả lời bằng chữ, và bạn tự chuyển các chỉnh sửa vào dự án. Claude Code thay đổi tệp của dự án và chạy lệnh: vì thế nó cần cài đặt riêng và chỉ có trong các gói trả phí. Cách kiểm tra: gói miễn phí không có Claude Code, và trong bảng gói trên <a href="https://claude.com/pricing">claude.com/pricing</a> cột Free ghi "Claude Code: No".
</b-chapter>
<b-chapter id="install" title="Cài đặt từng bước" icon="arrow-down">
  <b-why>Yêu cầu: macOS 13+, Windows 10 1809+ hoặc Windows Server 2019+, Ubuntu 20.04+, Debian 10+, Alpine 3.19+; từ 4 GB bộ nhớ, bộ xử lý x64 hoặc ARM64, có internet<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «macOS 13.0+», «Windows 10 1809+ or Windows Server 2019+», «Ubuntu 20.04+», «4 GB+ RAM» — code.claude.com/docs/en/setup"/>. Các lệnh lấy từ trang cài đặt, ngày kiểm tra: 18.11.2026.</b-why>

  <b-sublabel top="18">Chọn lệnh nào</b-sublabel>

  Lệnh phụ thuộc vào cửa sổ bạn gõ. Trên macOS, Linux và trong WSL (môi trường Linux bên trong Windows) dùng một dòng. Trên Windows có hai cửa sổ, PowerShell và CMD, và lệnh của chúng khác nhau. Bạn phân biệt chúng bằng dấu nhắc: trong PowerShell nó bắt đầu bằng "PS", trong CMD không có "PS". Nếu lấy lệnh của cửa sổ kia, cài đặt sẽ không bắt đầu.
  <iso-art name="claude-code-install-and-price/which-shell"></iso-art>
  <b-cap>Ba lệnh cho ba cửa sổ: macOS, Linux và WSL; PowerShell với dấu nhắc "PS"; CMD không có "PS".</b-cap>
  <b-sublabel top="18">macOS, Linux và WSL</b-sublabel>
  <b-codebox title="Terminal" copy>
    curl -fsSL https://claude.ai/install.sh | bash
  </b-codebox>
  <b-sublabel top="18">Windows: PowerShell (dấu nhắc có PS)</b-sublabel>
  <b-codebox title="PowerShell" copy>
    irm https://claude.ai/install.ps1 | iex
  </b-codebox>
  <b-sublabel top="18">Windows: CMD (dấu nhắc không có PS)</b-sublabel>
  <b-codebox title="CMD" copy>
    curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
  </b-codebox>
  <b-cap>Trình cài đặt không hiện tiến trình khi tải tệp. Trên Windows không cần quyền quản trị viên. Cài Git for Windows là tùy chọn: nếu không có, Claude Code chạy lệnh qua PowerShell<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Installing Git for Windows is optional» — code.claude.com/docs/en/setup"/>.</b-cap>

  Ví dụ đời thường. Jan sống ở Gdansk và làm việc trên laptop Windows. Anh mở PowerShell và thấy "PS" ở đầu dòng. Vậy anh cần lệnh <code>irm https://claude.ai/install.ps1 | iex</code>. Jan dán lệnh và vài phút liền không thấy một dòng nào, nhưng anh không đóng cửa sổ: trình cài đặt không hiện tiến trình. Anh không cần quyền quản trị viên và không cài Git for Windows. Khi cài xong, Jan mở lại PowerShell và chạy <code>claude --version</code>. Ba Lan có trong danh sách quốc gia của Anthropic. Bạn có thể kiểm tra cửa sổ có đúng không qua hai chữ cái đầu của dấu nhắc.

  <b-sublabel top="18">Trình cài đặt hay trình quản lý gói</b-sublabel>

  Trình cài đặt, tức là lệnh có <code>curl</code> hoặc <code>irm</code>, là cách được khuyến nghị: nó tự cập nhật Claude Code ở chế độ nền. Trình quản lý gói là chương trình cài và cập nhật các chương trình khác theo tên; cách này cũng dùng được, nhưng bạn phải tự cập nhật Claude Code. Với npm, hãy cài không dùng <code>sudo</code>: tài liệu cảnh báo rằng bản cài như vậy sẽ không tự cập nhật được<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Do NOT use sudo npm install -g as this can lead to permission issues and security risks» — code.claude.com/docs/en/setup"/>.
  <iso-art name="claude-code-install-and-price/install-methods"></iso-art>
  <b-cap>Trình cài đặt tự cập nhật, trình quản lý gói cập nhật thủ công: Homebrew, WinGet, npm, apt, dnf, apk.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Cách cài</th><th>Lệnh</th><th>Cập nhật</th></tr>
    </thead>
    <tbody>
      <tr><td>Trình cài đặt (khuyến nghị)</td><td><code>curl -fsSL https://claude.ai/install.sh | bash</code></td><td>tự động, ở chế độ nền</td></tr>
      <tr><td>Homebrew (macOS)</td><td><code>brew install --cask claude-code</code></td><td>thủ công: <code>brew upgrade claude-code</code></td></tr>
      <tr><td>WinGet (Windows)</td><td><code>winget install Anthropic.ClaudeCode</code></td><td>thủ công: <code>winget upgrade Anthropic.ClaudeCode</code></td></tr>
      <tr><td>npm (cần Node.js 22+)</td><td><code>npm install -g @anthropic-ai/claude-code@latest</code></td><td>chạy lại lệnh cài</td></tr>
      <tr><td>apt, dnf, apk</td><td>thêm kho của Anthropic theo hướng dẫn trong tài liệu</td><td>cùng với bản cập nhật hệ thống thông thường</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  Ví dụ đời thường. Marco sống ở Milan và làm việc trên Mac. Anh vốn cài mọi chương trình qua Homebrew, nên chọn <code>brew install --cask claude-code</code> thay cho trình cài đặt. Mọi thứ chạy như nhau, nhưng một tháng sau Marco cập nhật Claude Code bằng <code>brew upgrade claude-code</code>: nó sẽ không tự cập nhật. Ý có trong danh sách quốc gia của Anthropic. Cách kiểm tra cách cài: nếu Homebrew đã cài, hãy cập nhật bằng chính Homebrew.

  <b-sublabel top="18">Windows: cài trực tiếp hay qua WSL</b-sublabel>

  WSL là môi trường Linux bên trong Windows: Claude Code chạy trong đó như trên Linux thông thường. Lựa chọn tùy vào dự án. Nếu dự án và các chương trình của nó dành cho Windows, hãy cài thẳng trên Windows. Nếu cần các chương trình Linux hoặc cách ly lệnh (sandbox, tức là chạy lệnh của tác nhân trong môi trường bị giới hạn), hãy chọn WSL 2. WSL 1 phù hợp khi không có WSL 2, nhưng nó không hỗ trợ cách ly lệnh.
  <iso-art name="claude-code-install-and-price/windows-modes"></iso-art>
  <b-cap>Ba chế độ trên Windows: trực tiếp, WSL 2 có cách ly lệnh, WSL 1 không có cách ly.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Phương án</th><th>Khi nào chọn</th><th>Cách ly lệnh (sandbox)</th></tr>
    </thead>
    <tbody>
      <tr><td>Trực tiếp trên Windows</td><td>dự án và chương trình dành cho Windows</td><td>không hỗ trợ</td></tr>
      <tr><td>WSL 2</td><td>chương trình Linux hoặc cách ly lệnh</td><td>có hỗ trợ</td></tr>
      <tr><td>WSL 1</td><td>nếu không có WSL 2</td><td>không hỗ trợ</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Trong WSL bạn chạy lệnh Linux bên trong cửa sổ WSL, không chạy từ PowerShell<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «You install and launch claude inside the WSL terminal, not from PowerShell or CMD» — code.claude.com/docs/en/setup"/>. Trên Alpine cần có <code>bash</code> và <code>curl</code> trước khi cài: <code>apk add bash curl</code>.</b-cap>
</b-chapter>
<b-chapter id="login" title="Chạy lần đầu và đăng nhập" icon="key">
  <b-why>Đăng nhập diễn ra trong trình duyệt: Claude Code tự mở trang, và sau khi đăng nhập terminal hiện "Login successful"<b-proof href="https://code.claude.com/docs/en/authentication" quote="Claude Code: «When login completes, the terminal shows Login successful and prompts you to press Enter to continue» — code.claude.com/docs/en/authentication"/>.</b-why>

  <b-sublabel top="18">Chạy thế nào</b-sublabel>

  Vào thư mục dự án và chạy <code>claude</code>. Chương trình mở trình duyệt, bạn đăng nhập vào tài khoản Claude, và terminal hiện "Login successful" cùng lời nhắc nhấn Enter. Sau đó bạn có thể hỏi về dự án.
  <b-codebox title="Chạy lần đầu" copy>
    cd path/to/project
    claude
  </b-codebox>
  <b-cap>Nếu trình duyệt không mở, nhấn <code>c</code>: địa chỉ đăng nhập được sao chép vào bộ nhớ tạm. Bạn đăng xuất bằng lệnh <code>/logout</code> và đăng nhập lại bằng <code>/login</code>. Trợ giúp trong phiên là <code>/help</code>.</b-cap>
  <b-sublabel top="18">Đăng nhập bằng gì</b-sublabel>

  Cách đăng nhập phụ thuộc vào cách bạn trả tiền. Gói Pro, Max hoặc Ultra được cấp cho một người. Team và Enterprise dùng tài khoản của nhân viên do quản trị viên mời. Claude Console là tài khoản riêng tính tiền theo lượng dùng API bằng tín dụng trả trước. Amazon Bedrock, Google Cloud và Microsoft Foundry phù hợp với các tổ chức đã có nhà cung cấp đám mây.
  <iso-art name="claude-code-install-and-price/login-paths"></iso-art>
  <b-cap>Bốn đường đăng nhập: gói đăng ký, Team hoặc Enterprise, Console, nhà cung cấp đám mây.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Đăng nhập bằng gì</th><th>Dành cho ai</th></tr>
    </thead>
    <tbody>
      <tr><td>Gói Pro, Max hoặc Ultra</td><td>một người, đăng nhập qua tài khoản claude.ai</td></tr>
      <tr><td>Team hoặc Enterprise</td><td>nhân viên do quản trị viên mời</td></tr>
      <tr><td>Claude Console</td><td>thanh toán theo API bằng tín dụng trả trước</td></tr>
      <tr><td>Amazon Bedrock, Google Cloud, Microsoft Foundry</td><td>tổ chức có nhà cung cấp đám mây</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Danh sách tài khoản lấy từ trang xác thực và phần bắt đầu nhanh trong tài liệu<b-proof href="https://code.claude.com/docs/en/quickstart" quote="Claude Code: «Claude Console (API access with pre-paid credits)» — code.claude.com/docs/en/quickstart"/>.</b-cap>

  Ví dụ đời thường. Emma sống ở Vienna và đã mua gói Pro. Cô vào thư mục dự án, chạy <code>claude</code>, và trình duyệt mở trang đăng nhập. Emma đăng nhập vào chính tài khoản Claude cô dùng để trò chuyện. Terminal hiện "Login successful", cô nhấn Enter và hỏi: "dự án này làm gì?". Vài giây sau tác nhân mô tả dự án. Về sau Emma muốn kiểm tra chương trình đang dùng tài khoản nào và gõ <code>/status</code>; để đổi tài khoản cô dùng <code>/logout</code> và <code>/login</code>. Áo có trong danh sách quốc gia của Anthropic, nên vùng không cản đường.

  <b>Gói đăng ký trò chuyện và Claude Code có phải hai lần đăng nhập riêng?</b> Không. Gói Pro, Max hoặc Ultra được cấp cho một tài khoản claude.ai, và cùng tài khoản đó mở được Claude Code. Chúng dùng chung một giới hạn. Cách kiểm tra: sau khi đăng nhập, gõ <code>/status</code> và xem cách đăng nhập nào được hiện.

  <b>Tài khoản Claude miễn phí có đủ không?</b> Không. Yêu cầu cài đặt ghi: "The free claude.ai plan does not include Claude Code access". Bạn chỉ đăng nhập được vào Claude Code qua đường trả phí: gói đăng ký, Team, Enterprise, Console hoặc nhà cung cấp đám mây. Cách kiểm tra: mở <a href="https://code.claude.com/docs/en/setup">trang cài đặt Claude Code</a> và tìm câu này trong phần yêu cầu.
</b-chapter>

<b-chapter id="plans" title="Gói: gồm những gì và giá bao nhiêu" icon="coin">
  <b-why>Claude Code có trong các gói trả phí Pro, Max, Ultra, Team và Enterprise, và không có trong gói miễn phí<b-proof href="https://claude.com/pricing" quote="Claude: Free «Claude Code: No», Pro «$20 if billed monthly», Ultra «10x Pro usage every week», Team premium seat «5x more usage than standard seats» — claude.com/pricing"/>. Giá và nội dung lấy từ claude.com/pricing. Ngày kiểm tra: 18.11.2026. Các gói thay đổi, nên hãy mở lại trang giá của Anthropic trước khi thanh toán.</b-why>

  Gói là gói đăng ký với giá cố định theo tháng và lượng dùng riêng. Claude Code không có giá riêng: nó đi kèm gói đăng ký, cùng với Claude thông thường trong cuộc trò chuyện. Gói càng cao thì bạn dùng được càng nhiều trong cửa sổ năm giờ và trong một tuần. Pro, Max và Ultra phù hợp với một người, các chỗ Team phù hợp với nhóm, còn Enterprise phù hợp với công ty có hợp đồng.
  <iso-art name="claude-code-install-and-price/plans-ladder"></iso-art>
  <b-cap>Các bậc gói: Free không có Claude Code, rồi Pro, Max, Ultra, chỗ Team tiêu chuẩn và cao cấp, Enterprise theo hợp đồng.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Gói</th><th>Giá mỗi tháng</th><th>Claude Code</th><th>Lượng dùng</th></tr>
    </thead>
    <tbody>
      <tr><td>Free</td><td>$0</td><td>không</td><td>có giới hạn</td></tr>
      <tr><td>Pro</td><td>$20 nếu trả theo tháng, $17 nếu trả theo năm (trả trước $200)</td><td>có</td><td>cơ bản</td></tr>
      <tr><td>Max</td><td>$100</td><td>có</td><td>gấp 5 lần Pro</td></tr>
      <tr><td>Ultra</td><td>$200</td><td>có</td><td>gấp 10 lần Pro mỗi tuần</td></tr>
      <tr><td>Team, chỗ tiêu chuẩn</td><td>$25 theo tháng, $20 nếu trả theo năm</td><td>có</td><td>như trong gói đăng ký của chỗ đó</td></tr>
      <tr><td>Team, chỗ cao cấp</td><td>$125 theo tháng, $100 nếu trả theo năm</td><td>có</td><td>gấp 5 lần chỗ tiêu chuẩn</td></tr>
      <tr><td>Enterprise</td><td>trên trang: $20 mỗi chỗ mỗi tháng nếu trả theo năm, từ 20 chỗ</td><td>có</td><td>theo hợp đồng</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Nguồn: claude.com/pricing. Ngày kiểm tra: 18.11.2026.</b-cap>
  <b-sublabel top="18">Một ví dụ cụ thể</b-sublabel>

  Jonas sống ở Vilnius và muốn thử Claude Code trên dự án của mình. Anh mở trang giá và thấy ghi chú “Claude Code: No” cạnh Free, nên phương án miễn phí bị loại. Pro giá 20 đô la một tháng khi trả theo tháng, và đủ để bắt đầu. Trả theo năm hạ giá xuống 17 đô la một tháng, nhưng bị trừ 200 đô la một lần, và Jonas chưa chắc mình sẽ dùng tác nhân mỗi ngày. Anh chọn trả theo tháng. Để kiểm tra trường hợp của bạn, hãy mở trang giá và tìm ghi chú về Claude Code ở dòng gói của bạn.

  <b-sublabel top="18">Giới hạn</b-sublabel>

  Giới hạn là lượng dùng mà sau đó gói đăng ký yêu cầu bạn chờ. Pro và Max có hai giới hạn: giới hạn phiên năm giờ và giới hạn theo tuần<b-proof href="https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan" quote="Claude Help Center: «Pro and Max plans have a five-hour session limit and a weekly limit» — support.claude.com"/>. Ultra có giới hạn theo tuần, và các tài khoản Ultra đã xác minh không có giới hạn năm giờ. Giới hạn dùng chung cho Claude trong cuộc trò chuyện và Claude Code: nếu bạn đã tiêu hết lượng dùng trong cuộc trò chuyện, tác nhân sẽ còn ít hơn.
  <iso-art name="claude-code-install-and-price/limits"></iso-art>
  <b-cap>Hai cửa sổ tiêu hao, năm giờ và một tuần; một kho lượng dùng chung cho cuộc trò chuyện và Claude Code.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Gói</th><th>Giới hạn nào</th></tr>
    </thead>
    <tbody>
      <tr><td>Pro và Max</td><td>giới hạn phiên năm giờ và giới hạn theo tuần</td></tr>
      <tr><td>Ultra</td><td>giới hạn theo tuần; tài khoản Ultra đã xác minh không có giới hạn năm giờ</td></tr>
      <tr><td>Mọi gói đăng ký</td><td>giới hạn dùng chung cho Claude trong cuộc trò chuyện và Claude Code</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  Khi giới hạn hết, bạn có thể bật lượng dùng bổ sung trả bằng tín dụng hoặc mua tín dụng API theo giá API tiêu chuẩn. Để ở trong phạm vi gói đăng ký, hãy từ chối trả bằng tín dụng. Một tuần sau Jonas nhận thấy buổi tối tác nhân yêu cầu anh chờ: buổi sáng anh đã trò chuyện với Claude rất lâu, và lượng dùng chung đã hết. Anh quyết định không mua tín dụng mà đơn giản chờ cửa sổ mới.

  <b-sublabel top="18">Khóa API thay cho gói đăng ký</b-sublabel>

  Khóa API là mật khẩu cho chương trình, với khóa đó Claude Code trả tiền cho từng yêu cầu theo giá API. Gói đăng ký có giá cố định, còn khóa tính tiền theo khối lượng. Nếu biến <code>ANTHROPIC_API_KEY</code> được đặt trong hệ thống, Claude Code lấy khóa thay cho gói đăng ký. Với Jonas đây là một bất ngờ: biến đó còn sót lại từ một dự án khác, và chi phí chạy theo giá API dù gói đăng ký của anh đã được trả.
  <iso-art name="claude-code-install-and-price/api-vs-subscription"></iso-art>
  <b-cap>Hai cách trả tiền: gói đăng ký với giá cố định và khóa API tính theo khối lượng. Khóa lấn át gói đăng ký.</b-cap>
  <b-finding>
    <ex>Nếu biến <code>ANTHROPIC_API_KEY</code> được đặt trong hệ thống, Claude Code lấy khóa thay cho gói đăng ký, và chi phí chạy theo giá API.</ex>
    <gen>Gói đăng ký có giá và giới hạn cố định, khóa tính tiền theo khối lượng. Khóa có lợi khi khối lượng công việc không đều hoặc cần hóa đơn riêng cho từng dự án.</gen>
    <do>Để quay lại gói đăng ký, hãy xóa biến (<code>unset ANTHROPIC_API_KEY</code>) và kiểm tra cách đăng nhập bằng lệnh <code>/status</code><b-proof href="https://code.claude.com/docs/en/authentication" quote="Claude Code: «Run unset ANTHROPIC_API_KEY to fall back to your subscription, and check /status to confirm which method is active» — code.claude.com/docs/en/authentication"/>.</do>
  </b-finding>

  Giá cho mỗi triệu token theo từng mô hình không được nêu ở đây: tôi chưa kiểm tra chúng trên trang giá ngày 18.11.2026.

  <b-sublabel top="18">Những hiểu lầm thường gặp</b-sublabel>

  <b>Gói miễn phí có cho dùng Claude Code không?</b> Không. Tài liệu cài đặt nói Claude Code cần tài khoản Pro, Max, Ultra, Team, Enterprise hoặc Console, và gói claude.ai miễn phí không gồm quyền truy cập đó<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Claude Code requires a Pro, Max, Ultra, Team, Enterprise, or Console account. The free claude.ai plan does not include Claude Code access» — code.claude.com/docs/en/setup"/>. Cách kiểm tra: mở trang giá và tìm ghi chú “Claude Code: No” cạnh Free.

  <b>Gói đăng ký trả phí có gỡ hạn chế vùng không?</b> Không. Danh sách quốc gia của Anthropic áp dụng cho việc sử dụng bất kể gói và cách thanh toán<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported» — anthropic.com/supported-countries"/>. Cách kiểm tra: tìm nước bạn trong danh sách trên trang của Anthropic.

  <b>Khóa API có rẻ hơn gói đăng ký không?</b> Tùy khối lượng công việc. Gói đăng ký tốn một khoản cố định, khóa tính tiền theo khối lượng, và tôi chưa kiểm tra mức giá chính xác trên trang giá ngày 18.11.2026. Cách kiểm tra: so chi phí một tháng trong Console với giá của gói đăng ký.
</b-chapter>
<b-chapter id="check" title="Cách kiểm tra mọi thứ chạy tốt" icon="check-circle">
  <b-why>Bản cài hoạt động in ra số phiên bản kèm chú thích “(Claude Code)”<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «A working installation prints a version number such as 2.1.211 (Claude Code)» — code.claude.com/docs/en/setup"/>. Tiếp theo là chẩn đoán, cách đăng nhập và câu hỏi đầu tiên về dự án.</b-why>

  Việc kiểm tra gồm năm bước ngắn, mỗi bước trả lời một câu hỏi riêng. Phiên bản cho thấy chương trình được tìm thấy và khởi động được. Chẩn đoán thu thập báo cáo về bản cài và các cài đặt mà không mở phiên. Trạng thái trong phiên cho biết bạn đã đăng nhập thế nào: bằng gói đăng ký hay bằng khóa. Câu hỏi về dự án kiểm tra cả chuỗi cùng lúc: đăng nhập, mạng và đọc tệp. Cập nhật cho thấy bản cài có thể nhận phiên bản mới.
  <iso-art name="claude-code-install-and-price/check-ladder"></iso-art>
  <b-cap>Các bậc kiểm tra: phiên bản, chẩn đoán, trạng thái, câu hỏi về dự án, cập nhật.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Kiểm tra</th><th>Lệnh</th><th>Điều bạn sẽ thấy</th></tr>
    </thead>
    <tbody>
      <tr><td>Phiên bản</td><td><code>claude --version</code></td><td>số phiên bản và “(Claude Code)”</td></tr>
      <tr><td>Chẩn đoán</td><td><code>claude doctor</code></td><td>báo cáo về bản cài và các cài đặt mà không mở phiên</td></tr>
      <tr><td>Đăng nhập</td><td><code>/status</code> trong phiên</td><td>cách đăng nhập: gói đăng ký hay khóa</td></tr>
      <tr><td>Làm việc với dự án</td><td>câu hỏi “dự án này làm gì?”</td><td>mô tả ngắn về dự án</td></tr>
      <tr><td>Cập nhật</td><td><code>claude update</code></td><td>“Claude Code is up to date”</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">Một ví dụ cụ thể</b-sublabel>

  Sarah sống ở Dublin và vừa cài Claude Code trên laptop. Cô mở cửa sổ terminal mới và gõ <code>claude --version</code>. Số phiên bản hiện ra kèm chú thích “(Claude Code)”, vậy chương trình đã được tìm thấy. Sau đó cô chạy <code>claude doctor</code> và nhận báo cáo về bản cài. Trong thư mục dự án cô chạy <code>claude</code>, gõ <code>/status</code> và thấy mình đã đăng nhập bằng gói đăng ký, không có khóa nào tham gia. Bước cuối là câu hỏi “dự án này làm gì?”: một mô tả ngắn về dự án nghĩa là cả chuỗi chạy tốt. Bạn có thể tự kiểm tra trong năm phút bằng cách đi qua bảng từ trên xuống dưới.

  <b-sublabel top="18">Một sai lầm thường gặp</b-sublabel>

  Dừng ở phiên bản. Số phiên bản chỉ xác nhận chương trình được tìm thấy trong PATH. Nó không kiểm tra đăng nhập, mạng hay quyền truy cập tệp. Nếu phiên bản được in ra mà câu hỏi về dự án không có câu trả lời, hãy tìm nguyên nhân ở đăng nhập: kiểm tra <code>/status</code> và chạy <code>/login</code> nếu cần.
</b-chapter>
<b-chapter id="errors" title="Các lỗi cài đặt thường gặp" icon="alert-circle">
  <b-why>Tài liệu có cách giải quyết cho mỗi thông báo lỗi: bảng “Find your error” trên trang “Troubleshoot installation and login”<b-proof href="https://code.claude.com/docs/en/troubleshoot-install" quote="Claude Code: the “Find your error” table gives a fix for each message — code.claude.com/docs/en/troubleshoot-install"/>. Ngày kiểm tra: 18.11.2026.</b-why>

  Lỗi cài đặt được đọc từ nội dung thông báo: từ đó bạn đi đến nguyên nhân, và từ nguyên nhân đến hành động. Thường nguyên nhân rất đơn giản: thư mục cài đặt không có trong PATH (danh sách thư mục nơi terminal tìm chương trình), lệnh dành cho shell khác, hoặc thiếu quyền hay bộ nhớ. Các nước ngoài danh sách được hỗ trợ là trường hợp riêng: bảng mô tả nó ở các dòng về 403 và “App unavailable in region”.
  <iso-art name="claude-code-install-and-price/install-errors"></iso-art>
  <b-cap>Cây lỗi: bạn thấy gì, nguyên nhân là gì, làm gì.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Bạn thấy gì</th><th>Nguyên nhân</th><th>Làm gì</th></tr>
    </thead>
    <tbody>
      <tr><td><code>command not found: claude</code> hoặc “'claude' is not recognized”</td><td>thư mục cài đặt không có trong PATH</td><td>mở cửa sổ terminal mới; trên macOS và Linux thêm <code>~/.local/bin</code> vào PATH</td></tr>
      <tr><td><code>The token '&amp;&amp;' is not a valid statement separator</code></td><td>lệnh CMD được chạy trong PowerShell</td><td>dùng lệnh <code>irm … | iex</code></td></tr>
      <tr><td><code>'irm' is not recognized</code></td><td>lệnh PowerShell được chạy trong CMD</td><td>dùng lệnh <code>curl … install.cmd</code></td></tr>
      <tr><td><code>syntax error near unexpected token '&lt;'</code></td><td>nhận về một trang web thay vì tập lệnh</td><td>kiểm tra mạng và proxy, mở phần giải pháp của tài liệu</td></tr>
      <tr><td><code>curl: (22) … 403</code></td><td>proxy hoặc bộ lọc chặn địa chỉ, hoặc nước nằm ngoài danh sách được hỗ trợ</td><td>kiểm tra mạng; về danh sách quốc gia và cách xử lý, hãy đọc <a href="/blog/claude-code-access-regions-vpn-bans/">bài về quyền truy cập theo quốc gia, VPN và khóa tài khoản</a></td></tr>
      <tr><td><code>EACCES: permission denied</code></td><td>không có quyền với thư mục cài đặt</td><td>sửa quyền của thư mục, đừng dùng <code>sudo</code></td></tr>
      <tr><td><code>TLS connect error</code></td><td>chứng chỉ lỗi thời hoặc proxy kiểm tra lưu lượng</td><td>cập nhật chứng chỉ hệ thống</td></tr>
      <tr><td><code>Killed</code> khi cài trên Linux</td><td>thiếu bộ nhớ</td><td>giải phóng bộ nhớ hoặc thêm swap</td></tr>
      <tr><td><code>App unavailable in region</code></td><td>Claude Code không khả dụng ở nước đó</td><td>kiểm tra danh sách quốc gia được hỗ trợ: <a href="/blog/claude-code-access-regions-vpn-bans/">Claude Code không khả dụng ở nước bạn: quốc gia được hỗ trợ, VPN và khóa tài khoản</a></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">Một ví dụ cụ thể</b-sublabel>

  Mateus sống ở São Paulo và cài Claude Code trên Mac bằng một lệnh. Trình cài đặt xong, nhưng terminal hiện “command not found: claude”. Anh nghĩ bản cài đã hỏng và muốn chạy lại. Trước hết anh mở cửa sổ terminal mới: cửa sổ cũ chưa biết về thư mục mới. Nếu thông báo vẫn còn, nguyên nhân là PATH, và anh cần thêm <code>~/.local/bin</code> vào tệp cài đặt zsh rồi mở lại cửa sổ. Sau đó <code>claude --version</code> in ra phiên bản. Để kiểm tra bạn đã làm giống vậy, hãy xem kết quả của <code>claude --version</code>.

  <b-sublabel top="18">PATH trên macOS với zsh</b-sublabel>
  <b-codebox title="Thêm thư mục vào PATH" copy>
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
  </b-codebox>

  Với bash, dùng <code>~/.bashrc</code> thay cho <code>~/.zshrc</code>. Sau khi sửa, hãy mở cửa sổ terminal mới<b-proof href="https://code.claude.com/docs/en/troubleshoot-install" quote="Claude Code: «echo 'export PATH=&quot;$HOME/.local/bin:$PATH&quot;' >> ~/.zshrc» — code.claude.com/docs/en/troubleshoot-install"/>.

  <b-sublabel top="18">Những hiểu lầm thường gặp</b-sublabel>

  <b>Nếu không tìm thấy claude thì trình cài đặt đã hỏng?</b> Thường nó đã chạy tốt, chỉ là terminal chưa biết về thư mục mới: trong bảng đó là dòng PATH với cách giải quyết “mở cửa sổ terminal mới”. Cách kiểm tra: mở cửa sổ mới và lặp lại <code>claude --version</code>.

  <b>Đổi mạng có luôn chữa được lỗi 403?</b> Không. Trong bảng, 403 có hai nguyên nhân: proxy hoặc bộ lọc, hoặc nước nằm ngoài danh sách được hỗ trợ. Ở trường hợp thứ hai, đổi mạng không giúp được, và bạn cần xem danh sách quốc gia của Anthropic.

  <b>EACCES chữa được bằng sudo?</b> Không. Bảng nêu việc sửa quyền của thư mục là cách giải quyết và nói đừng dùng <code>sudo</code>.
</b-chapter>
<b-chapter id="region" title="Truy cập từ Nga" icon="flag">
  <b-why>Nga không có trong danh sách quốc gia được hỗ trợ chính thức của Anthropic, và điều khoản nêu Claude Code trong số các sản phẩm chỉ khả dụng ở các nước có trong danh sách. Ngày kiểm tra: 18.11.2026. Điều khoản có hiệu lực từ 12.11.2026<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported» — anthropic.com/supported-countries"/>.</b-why>

  Danh sách quốc gia là một tài liệu của Anthropic nêu tên những nơi có thể dùng Claude. Mọi nước hay vùng không có trong danh sách đều được coi là không được hỗ trợ. Trong danh sách không có mục “Russia”, nên cài đặt và đăng nhập từ Nga không được hỗ trợ. Anthropic không nêu lý do. Theo suy đoán của tôi, chúng nằm trong chính sách của Hoa Kỳ và các nước khác: trừng phạt, hạn chế xuất khẩu và luật pháp. Đây là suy đoán, và trong tài liệu của công ty không có lời giải thích như vậy.
  <iso-art name="claude-code-access-regions-vpn-bans/world-map"></iso-art>
  <b-cap>Bản đồ các nước nơi Anthropic hỗ trợ Claude Code, và các nước ngoài danh sách.</b-cap>

  Khi cài đặt, điều này hiện ra dưới dạng thông báo “App unavailable in region” và lỗi 403 khi tải: cả hai dòng đều có trong bảng lỗi. Gói đăng ký trả phí không gỡ hạn chế: danh sách áp dụng cho gói trả phí và khóa API như nhau. Hạn chế này nghĩa là gì, cách đọc các mục có ngoặc và việc gì hợp pháp khi nước bạn không có trong danh sách được trình bày chi tiết trong một bài riêng.
  <b-links cols="1">
    <item href="/blog/claude-code-access-regions-vpn-bans/" k="Chi tiết" t="Claude Code không khả dụng ở nước bạn: quốc gia được hỗ trợ, VPN và khóa tài khoản">Hạn chế nghĩa là gì và nên làm gì</item>
  </b-links>
</b-chapter>
<b-chapter id="alt" title="Lựa chọn thay thế Claude Code" icon="grid">
  <b-why>Các lựa chọn thay thế làm cùng việc với Claude Code: đọc dự án, sửa tệp và chạy lệnh. Chúng khác nhau ở mô hình, giá và nơi làm việc. Mỗi cái có điều khoản truy cập riêng, và bạn kiểm tra chúng trên website của chương trình.</b-why>

  Lựa chọn thay thế là một tác nhân lập trình khác: nó làm việc trong terminal hoặc trong trình soạn thảo và thay đổi các tệp của dự án theo yêu cầu của bạn. Bạn chọn bằng ba câu hỏi. Bên trong là mô hình của ai? Nó làm việc ở đâu: trong terminal, trong ứng dụng hay trong trình soạn thảo? Bạn trả tiền cho nó thế nào? Mỗi tác nhân có phần mô tả trong bảng thuật ngữ của trang; các dữ kiện về Gemini CLI và Antigravity CLI lấy từ các bài của chúng, trong đó cũng ghi ngày tháng.
  <iso-art name="claude-code-install-and-price/alternatives-map"></iso-art>
  <b-cap>Bản đồ các lựa chọn thay thế: OpenCode, Codex, Cursor, Gemini CLI và người kế nhiệm Antigravity CLI.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Tác nhân</th><th>Của ai, trên mô hình nào</th><th>Làm việc ở đâu</th></tr>
    </thead>
    <tbody>
      <tr><td>OpenCode</td><td>tác nhân mở, bạn chọn mô hình: Claude, GPT, Gemini và các mô hình khác qua API hoặc chạy cục bộ; bạn trả tiền cho nhà cung cấp mô hình</td><td>terminal, ứng dụng, web</td></tr>
      <tr><td>Codex</td><td>OpenAI, các mô hình GPT</td><td>ChatGPT, ứng dụng, terminal, IDE</td></tr>
      <tr><td>Cursor</td><td>Anysphere, trình soạn thảo dựa trên VS Code với tác nhân tích hợp; mô hình riêng và mô hình của các công ty khác</td><td>trình soạn thảo</td></tr>
      <tr><td>Gemini CLI</td><td>Google, các mô hình Gemini; ngừng hoạt động với người dùng thông thường từ 18 tháng 6 năm 2026</td><td>terminal</td></tr>
      <tr><td>Antigravity CLI</td><td>Google; Gemini CLI đã được chuyển vào đó</td><td>terminal, ứng dụng Antigravity</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">Chọn thế nào</b-sublabel>

  Nếu bạn cần mô hình riêng và thanh toán trực tiếp cho nhà cung cấp, hãy xem OpenCode. Nếu bạn đã trả tiền cho ChatGPT, hãy xem Codex. Nếu bạn thích làm việc trong trình soạn thảo hơn là terminal, hãy xem Cursor. Nếu bạn từng dùng Gemini CLI, Antigravity CLI đã thế chỗ nó. Lệnh cài cho các lựa chọn thay thế không được nêu ở đây: mỗi cái có lệnh riêng và chúng thay đổi. Bạn có thể tìm chúng trên website của chính chương trình.
  <b-links cols="2">
    <item href="/materials/glossary/opencode/" k="Thuật ngữ" t="OpenCode">Tác nhân mở cho terminal</item>
    <item href="/materials/glossary/codex/" k="Thuật ngữ" t="Codex">Tác nhân của OpenAI</item>
    <item href="/materials/glossary/cursor/" k="Thuật ngữ" t="Cursor">Trình soạn thảo có tác nhân</item>
    <item href="/materials/glossary/gemini-cli/" k="Thuật ngữ" t="Gemini CLI">Tác nhân của Google trong terminal</item>
    <item href="/materials/glossary/antigravity-cli/" k="Thuật ngữ" t="Antigravity CLI">Người kế nhiệm Gemini CLI</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="So sánh" t="Codex so với Claude Code, Cursor và Hermes Agent">Tác nhân nào cho việc nào</item>
    <item href="/blog/codex-or-chatgpt-what-to-choose/" k="Lựa chọn" t="Codex so với ChatGPT: chọn cái nào">Một cuộc trò chuyện hay một tác nhân lập trình</item>
  </b-links>
</b-chapter>
<b-chapter id="prompts" title="Prompt có sẵn cho tác nhân" icon="chat">
  <b-why>Bốn prompt cho phiên đầu tiên. Hãy dán chúng vào Claude Code sau khi bạn chạy <code>claude</code> trong thư mục dự án.</b-why>

  Các prompt đi theo thứ tự tăng dần: đầu tiên tác nhân chỉ đọc và kể lại, sau đó nó tạo tệp quy tắc, rồi sửa một chỗ nhỏ, và cuối cùng chạy kiểm thử. Mỗi prompt yêu cầu cho xem kết quả trước khi ghi hoặc để nguyên các tệp, nên phiên đầu tiên vẫn an toàn.
  <b-codebox title="1. Làm quen với dự án" copy>
    Dự án này làm gì? Nó dùng những công nghệ nào và điểm vào chính nằm ở đâu? Trả lời bằng danh sách năm mục.
  </b-codebox>
  <b-codebox title="2. Quy tắc của dự án" copy>
    Đọc dự án và tạo tệp CLAUDE.md: lệnh build và kiểm thử, cấu trúc thư mục, những gì không được đụng vào. Cho tôi xem nội dung trước khi ghi.
  </b-codebox>
  <b-codebox title="3. Một chỉnh sửa nhỏ" copy>
    Thêm mục “Cài đặt” vào README với các lệnh từ package.json. Cho tôi xem thay đổi và chờ tôi xác nhận.
  </b-codebox>
  <b-codebox title="4. Kiểm tra mọi thứ chạy tốt" copy>
    Chạy kiểm thử của dự án và liệt kê những kiểm thử bị lỗi. Với mỗi cái hãy đề xuất một nguyên nhân, nhưng đừng thay đổi tệp nào.
  </b-codebox>
  <b-links cols="1">
    <item href="/materials/glossary/claude-md/" k="Thuật ngữ" t="CLAUDE.md">Tệp quy tắc dự án mà Claude Code đọc trong mỗi phiên</item>
  </b-links>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Cài Claude Code thế nào?">Mở terminal và chạy một lệnh: trên macOS, Linux và WSL là curl -fsSL https://claude.ai/install.sh | bash; trên Windows trong PowerShell là irm https://claude.ai/install.ps1 | iex. Sau đó mở cửa sổ terminal mới, kiểm tra claude --version và chạy claude trong thư mục dự án. Nguồn: code.claude.com/docs/en/setup. Ngày kiểm tra: 18.11.2026.</q>
    <q t="Claude Code giá bao nhiêu?">Không có giá riêng: Claude Code nằm trong các gói đăng ký. Tại 18.11.2026 Pro giá 20 đô la một tháng khi trả theo tháng, Max 100, Ultra 200, một chỗ Team 25; gói miễn phí không có Claude Code. Thay cho gói đăng ký là trả theo API qua Console. Nguồn: claude.com/pricing.</q>
    <q t="Claude Code có chạy ở Nga không?">Nga không có trong danh sách quốc gia được hỗ trợ chính thức của Anthropic, và điều khoản nêu Claude Code trong số các sản phẩm chỉ khả dụng ở các nước có trong danh sách. Mọi nước ngoài danh sách đều được coi là không được hỗ trợ. Điều khoản có hiệu lực từ 12.11.2026. Nguồn: anthropic.com/supported-countries. Ngày kiểm tra: 18.11.2026. Chi tiết trong <a href="/blog/claude-code-access-regions-vpn-bans/">bài về quyền truy cập theo quốc gia, VPN và khóa tài khoản</a>.</q>
    <q t="Có gì thay thế được Claude Code?">Các tác nhân tương tự: OpenCode với mô hình bạn chọn, Codex của OpenAI, trình soạn thảo Cursor với tác nhân tích hợp, và của Google là Antigravity CLI thay cho Gemini CLI, vốn đã đóng với người dùng thông thường. Quyền truy cập và giá của mỗi cái khác nhau, và bạn kiểm tra chúng trên website của chương trình.</q>
    <q t="Claude Code có trong gói miễn phí không?">Không. Claude Code cần tài khoản Pro, Max, Ultra, Team, Enterprise hoặc Console; gói claude.ai miễn phí không gồm quyền truy cập đó. Nguồn: code.claude.com/docs/en/setup.</q>
    <q t="Làm sao biết Claude Code đăng nhập bằng gói đăng ký hay bằng khóa?">Chạy claude trong thư mục dự án và gõ /status: lệnh hiện cách đăng nhập đang dùng. Nếu biến ANTHROPIC_API_KEY được đặt trong hệ thống, Claude Code lấy khóa thay cho gói đăng ký; để quay lại gói đăng ký, hãy chạy unset ANTHROPIC_API_KEY. Nguồn: code.claude.com/docs/en/authentication.</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="next" title="Đọc tiếp">
  <b-links cols="2">
    <item href="/blog/claude-code-access-regions-vpn-bans/" k="Quyền truy cập" t="Claude Code không khả dụng ở nước bạn: quốc gia được hỗ trợ, VPN và khóa tài khoản">Hạn chế theo quốc gia nghĩa là gì</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="So sánh" t="Codex so với Claude Code, Cursor và Hermes Agent">Tác nhân nào cho việc nào</item>
    <item href="/blog/specs-rules-skills/" k="Ngữ cảnh" t="AGENTS.md, CLAUDE.md và spec.md: cái gì để ở đâu">Các tệp quy tắc cho tác nhân</item>
    <item href="/blog/cursor-rules-vs-agents-md/" k="Quy tắc" t="Cursor rules so với AGENTS.md">Cái gì để ở đâu</item>
    <item href="/blog/harness-driven-development/" k="Phương pháp" t="Harness-Driven Development">Lỗi của tác nhân trở thành quy tắc</item>
  </b-links>
</b-chapter>
<b-footer>Dựa trên tài liệu Claude Code, claude.com/pricing, trung tâm trợ giúp Claude và điều khoản truy cập của Anthropic. Ngày kiểm tra: 18.11.2026. Giá và danh sách quốc gia thay đổi.</b-footer>
</b-post>
