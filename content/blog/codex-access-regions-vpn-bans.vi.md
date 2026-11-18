---
title: Codex CLI không khả dụng ở nước bạn: danh sách quốc gia hỗ trợ, VPN và khóa tài khoản
seoTitle: Codex CLI không khả dụng ở nước bạn (2026)
date: 2026-11-18
updated: 2026-11-18
description: Danh sách quốc gia của OpenAI nghĩa là gì với Codex, đăng nhập ra sao, điều khoản nói gì về VPN, vì sao tài khoản bị khóa và chương trình gửi dữ liệu gì.
tags: AI, Codex, OpenAI, quốc gia được hỗ trợ, VPN, khóa tài khoản, Claude Code
category: harness
layout: wide
mentions: Codex, OpenAI, ChatGPT, Claude Code, Anthropic
toc: answer=Trả lời nhanh | list=Danh sách quốc gia | login=Đăng nhập | vpn=VPN | bans=Khóa tài khoản | data=Dữ liệu và cài đặt | compare=So với Claude Code | legal=Lựa chọn hợp pháp | faq=Câu hỏi | start=Prompt | next=Đọc tiếp
---

Codex không khả dụng chính thức ở Nga: Nga không có trong danh sách quốc gia được OpenAI hỗ trợ, và truy cập từ ngoài danh sách “may result in your account being blocked or suspended”. Codex CLI đăng nhập bằng ChatGPT hoặc khóa API. Không thấy quy tắc vùng riêng cho Codex, VPN không được nhắc đến, nhưng việc vượt qua hạn chế và biện pháp bảo vệ bị cấm.

<b-post series="harness">
<b-chapter id="answer" title="Trả lời nhanh" icon="crosshair">
  <b-why>Quyền truy cập Codex do danh sách quốc gia chung của OpenAI cho ChatGPT và API quy định. Nga không có trong danh sách đó<b-proof href="https://developers.openai.com/api/docs/supported-countries" quote="OpenAI: «Accessing or offering access to our services outside of the countries and territories listed below may result in your account being blocked or suspended.» — developers.openai.com/api/docs/supported-countries"/>.</b-why>

  <iso-art name="codex-access-regions-vpn-bans/world-map"></iso-art>
  <b-cap>Xanh lam: quốc gia có trong danh sách của OpenAI. Cam: quốc gia không có trong danh sách, riêng Nga được tô đậm hơn.</b-cap>
  <b-sublabel top="18">Nói đơn giản thì nghĩa là gì</b-sublabel>

  OpenAI là công ty làm ra ChatGPT và Codex. Codex là tác nhân dành cho lập trình viên: chạy trong terminal và trong ứng dụng, đọc các tệp của dự án và sửa mã theo việc bạn giao. OpenAI công bố danh sách các quốc gia nơi dịch vụ khả dụng. Nếu nước bạn có trong danh sách, quy tắc về vùng không cản đường bạn. Nếu không có, truy cập có thể kết thúc bằng việc tài khoản bị chặn. OpenAI không giải thích vì sao lại xây dựng như vậy. Theo suy đoán của tôi, đó là chính sách của công ty cộng với rủi ro về lệnh trừng phạt, kiểm soát xuất khẩu và luật của Hoa Kỳ cùng các nước khác.

  Ví dụ đời thường. Dana sống ở Almaty và muốn thử Codex. Cô mở danh sách của OpenAI và tìm dòng “Kazakhstan”. Mục này không có ngoặc và không có điều kiện đi kèm, nên ở phần vùng không có gì cản trở. Còn lại là phần thông thường: đăng nhập vào tài khoản ChatGPT hoặc tạo khóa API và chọn cách thanh toán. Người đang thực sự ở Nga sẽ không tìm thấy mục như vậy.

  Một nhầm lẫn thường gặp là nghĩ rằng Codex theo quy tắc riêng vì nó chạy trong terminal và cài bằng một lệnh. Không có danh sách quốc gia riêng cho Codex, cả trên các trang công khai của OpenAI lẫn trong kho mã của chương trình. Phần đăng nhập Codex dẫn đến danh sách chung của ChatGPT và API. Nhầm lẫn thứ hai liên quan đến VPN, chương trình thay địa chỉ mà từ đó bạn vào mạng. VPN không được nhắc đến trong trang trợ giúp về quốc gia hay trong điều khoản sử dụng. Điều khoản cấm vượt qua hạn chế và biện pháp bảo vệ, và việc thay địa chỉ có thể thuộc diện đó; kết luận này là của tôi, OpenAI không đưa ra tuyên bố trực tiếp nào về chuyện này.

  Bạn có thể kiểm tra câu trả lời trong một phút: mở <a href="https://developers.openai.com/api/docs/supported-countries">trang của OpenAI với danh sách quốc gia được hỗ trợ</a> và tìm nước bạn bằng chức năng tìm trong trang của trình duyệt. Trung tâm trợ giúp help.openai.com không mở được với các yêu cầu tự động (lỗi 403), nên các dòng của danh sách được kiểm tra trên trang developers.openai.com.
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Câu hỏi</th><th>Trả lời</th><th>Trạng thái</th></tr>
    </thead>
    <tbody>
      <tr><td>🇷🇺 Nga có trong danh sách quốc gia của OpenAI</td><td>không<b-proof href="https://developers.openai.com/api/docs/supported-countries" quote="OpenAI: «Accessing or offering access to our services outside of the countries and territories listed below may result in your account being blocked or suspended.» — developers.openai.com/api/docs/supported-countries"/></td><td>đã xác nhận</td></tr>
      <tr><td>Danh sách quốc gia riêng cho Codex</td><td>không tìm thấy trên các trang công khai và trong kho mã</td><td>không tìm thấy</td></tr>
      <tr><td>Đăng nhập</td><td>tài khoản ChatGPT hoặc khóa API<b-proof href="https://learn.chatgpt.com/docs/auth" quote="OpenAI: «Sign in with ChatGPT for subscription access» / «Sign in with an API key for usage-based access» — learn.chatgpt.com/docs/auth"/></td><td>đã xác nhận</td></tr>
      <tr><td>VPN trong điều khoản và trong trang trợ giúp về quốc gia</td><td>không được nhắc đến</td><td>không tìm thấy</td></tr>
      <tr><td>Cấm vượt qua hạn chế và biện pháp bảo vệ</td><td>có trong điều khoản<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «circumvent any rate limits or restrictions or bypass any protective measures or safety mitigations we put on our Services» — openai.com/policies/row-terms-of-use"/></td><td>đã xác nhận</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Ngày kiểm tra: 18.11.2026. Bài viết kể lại các tài liệu chính thức và không chứa cách vượt qua hạn chế.</b-cap>
</b-chapter>
<b-chapter id="list" title="Danh sách quốc gia của OpenAI" icon="flag">
  <b-why>OpenAI giữ một danh sách chung cho ChatGPT và API và không công bố danh sách riêng các nước không được hỗ trợ<b-proof href="https://help.openai.com/en/articles/7947663-chatgpt-and-openai-api-supported-countries-and-territories" quote="OpenAI: «OpenAI does not publish a separate list of countries and territories that are not supported. If a location is not included in the list below, our API is not available there.» — help.openai.com/en/articles/7947663"/>. Nơi nào danh sách không nêu tên thì nơi đó không khả dụng.</b-why>

  Danh sách quốc gia là một trang của OpenAI nêu tên những nơi có thể dùng ChatGPT và API. Codex thuộc cùng một bộ: nó kết nối qua tài khoản ChatGPT hoặc bằng khóa API, nên cả hai cách đăng nhập đều gặp danh sách này. Không có trang riêng kiểu “các nước đóng cửa với Codex”. Vì vậy việc một nước vắng mặt trong danh sách là tín hiệu duy nhất cho thấy truy cập bị đóng.
  <iso-art name="codex-access-regions-vpn-bans/list-gate"></iso-art>
  <b-cap>Danh sách hoạt động như một cửa chung cho ChatGPT, API và Codex: quốc gia có trong danh sách thì qua được, quốc gia ngoài danh sách bị chặn lại.</b-cap>
  <b-sublabel top="18">Cách đọc một mục</b-sublabel>

  Phần lớn các mục trong danh sách chỉ là một từ: “Armenia”, “Georgia”, “Kazakhstan”. Mục như vậy nghĩa là cả nước được hỗ trợ. Một số mục có điều kiện đi kèm. Dễ thấy nhất là “Ukraine (with certain exceptions)”. Tôi sẽ tách nó ra. “Ukraine” là tên nước. Phần trong ngoặc “with certain exceptions” nghĩa là một phần lãnh thổ bị loại trừ. Những nơi nào bị loại trừ thì mục trên trang của OpenAI không nêu, và các trang công khai của OpenAI cũng không có danh sách ngoại lệ. Để so sánh, Anthropic nêu tên từng vùng bị loại trừ của Ukraine, còn OpenAI không có danh sách như vậy trong mục này. Từ đó có một quy tắc thực tế: nếu nước bạn được ghi kèm ngoặc, một từ trong danh sách là chưa đủ, và bạn sẽ phải hỏi lại bộ phận hỗ trợ của OpenAI.

  Ví dụ đời thường. Arsen sống ở Yerevan và đang lập nhóm với các đồng nghiệp từ Armenia, Georgia và Ukraine. Anh mở danh sách và thấy “Armenia” và “Georgia” không kèm ngoặc: với những người đang ở các nước đó thì không có câu hỏi nào. Anh đọc kỹ hơn mục “Ukraine (with certain exceptions)” và nhờ một đồng nghiệp ở Kyiv viết cho bộ phận hỗ trợ của OpenAI để hỏi thành phố của anh ấy có nằm trong số ngoại lệ không. Bạn có thể tự kiểm tra như sau: tìm nước bạn bằng chức năng tìm trong trang và xem sau tên có ngoặc không.
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Quốc gia</th><th>OpenAI (ChatGPT và API)</th></tr>
    </thead>
    <tbody>
      <tr><td>Nga, Belarus</td><td>không có trong danh sách</td></tr>
      <tr><td>Trung Quốc, Hồng Kông, Ma Cao</td><td>không có trong danh sách</td></tr>
      <tr><td>Iran, Cuba, Triều Tiên, Syria</td><td>không có trong danh sách</td></tr>
      <tr><td>Kazakhstan, Georgia, Armenia, Uzbekistan</td><td>có trong danh sách</td></tr>
      <tr><td>Ukraine</td><td>có trong danh sách “with certain exceptions”<b-proof href="https://developers.openai.com/api/docs/supported-countries" quote="OpenAI: «Ukraine (with certain exceptions)» — developers.openai.com/api/docs/supported-countries"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Các dòng được kiểm tra ngày 18.11.2026 so với danh sách trên developers.openai.com. Trước khi quyết định, hãy mở trang của OpenAI và tìm nước bạn: danh sách thay đổi.</b-cap>
  <b-finding>
    <ex>Nước không được nêu tên trong danh sách: nghĩa là ở đó không có quyền truy cập Codex qua ChatGPT và API.</ex>
    <gen>OpenAI viết “not available there” về API, và điều khoản cảnh báo tài khoản bị chặn khi truy cập từ ngoài danh sách. Các trang công khai không có ngoại lệ nào cho Codex.</gen>
    <do>Trước khi cài, hãy tìm nước bạn trên trang của OpenAI. Nếu không có, coi như truy cập bị đóng.</do>
  </b-finding>
  <b-sublabel top="18">Danh sách của OpenAI khác danh sách của Anthropic thế nào</b-sublabel>

  Anthropic, công ty làm ra Claude Code, có danh sách riêng, và nó không hoàn toàn trùng với danh sách của OpenAI. Nga, Belarus, Trung Quốc, Iran, Cuba, Triều Tiên và Syria không có trong cả hai. Afghanistan, Myanmar và Yemen có trong danh sách của OpenAI và vắng trong danh sách của Anthropic. Vì vậy việc kiểm tra nước cho một tác nhân không thay thế được việc kiểm tra cho tác nhân khác: hãy mở danh sách của tác nhân bạn định cài. Cả hai công ty đều không giải thích sự khác biệt.
</b-chapter>
<b-chapter id="login" title="Codex đăng nhập thế nào" icon="key">
  <b-why>Tài liệu đăng nhập của Codex dẫn đến danh sách quốc gia chung và không có hạn chế vùng riêng<b-proof href="https://learn.chatgpt.com/docs/auth" quote="OpenAI: «Sign in with ChatGPT for subscription access» — learn.chatgpt.com/docs/auth"/>.</b-why>

  Đăng nhập là cách Codex chứng minh với máy chủ của OpenAI rằng các yêu cầu đến từ tài khoản của bạn. Có hai cách, và mỗi cách gắn với cách tính tiền riêng. Đăng nhập bằng ChatGPT dùng gói đăng ký ChatGPT: bạn trả một khoản cố định và dùng tác nhân trong giới hạn của gói. Đăng nhập bằng khóa API dùng khóa cho chương trình: bạn trả theo giá API cho lượng dùng thực tế. Cả hai đường đều nằm sau cùng một cửa với danh sách quốc gia, và chọn đường nào tùy vào cách bạn thanh toán và điều bạn cần. Codex trên đám mây (Codex cloud), nơi tác nhân chạy trên máy chủ của OpenAI, đòi hỏi đăng nhập bằng ChatGPT, còn khóa API không dùng được cho nó.
  <iso-art name="codex-access-regions-vpn-bans/login-paths"></iso-art>
  <b-cap>Hai đường đăng nhập: ChatGPT (gói đăng ký) và khóa API (trả theo lượng dùng). Dữ liệu đăng nhập nằm trên máy tính của bạn, trong tệp hoặc trong kho lưu trữ của hệ thống.</b-cap>

  Chương trình lưu đệm dữ liệu đăng nhập trên thiết bị. Nó nằm trong tệp <code>~/.codex/auth.json</code> hoặc trong kho mật khẩu của hệ điều hành. Chế độ được đặt bằng tham số <code>cli_auth_credentials_store</code> với bốn giá trị: <code>file</code>, <code>keyring</code>, <code>auto</code> và <code>ephemeral</code>. Tệp chứa dữ liệu đăng nhập tương đương chìa khóa của tài khoản. Ai sao chép nó có thể dùng tài khoản của bạn, và điều khoản của OpenAI cấm chia sẻ dữ liệu đăng nhập và để người khác dùng tài khoản<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «You may not share your account credentials or make your account available to anyone else and are responsible for all activities that occur under your account.» — openai.com/policies/row-terms-of-use"/>.
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th></th><th>Đăng nhập bằng ChatGPT</th><th>Đăng nhập bằng khóa API</th></tr>
    </thead>
    <tbody>
      <tr><td>Thanh toán</td><td>gói đăng ký ChatGPT</td><td>giá API</td></tr>
      <tr><td>Codex cloud</td><td>bắt buộc cách này</td><td>không dùng được</td></tr>
      <tr><td>Dữ liệu đăng nhập lưu ở đâu</td><td colspan="2">trong tệp ~/.codex/auth.json hoặc trong kho lưu trữ của hệ thống; chế độ đặt bằng tham số cli_auth_credentials_store (file, keyring, auto, ephemeral)</td></tr>
      <tr><td>Kiểm tra vùng</td><td colspan="2">trang đăng nhập không mô tả; áp dụng danh sách quốc gia chung</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">Một tình huống từ đầu đến cuối</b-sublabel>

  Nika sống ở Tbilisi và cài Codex trên laptop làm việc. Cô chạy chương trình và chọn đăng nhập bằng ChatGPT, vì cô đã có gói đăng ký. Dữ liệu đăng nhập được lưu trên laptop. Nước của cô có trong danh sách với tên “Georgia”, không kèm ngoặc, nên không có câu hỏi nào về vùng. Một tuần sau cô quyết định dùng Codex trên đám mây và phát hiện nó cần đúng cách đăng nhập bằng ChatGPT: khóa API mà đồng nghiệp của cô dùng không chạy được với đám mây. Để kiểm tra chương trình đã đăng nhập bằng cách nào, bạn có thể hỏi chính tác nhân: prompt có sẵn nằm ở cuối bài.

  <b-sublabel top="18">Máy chủ kiểm tra gì khi đăng nhập</b-sublabel>

  Máy chủ của OpenAI thực sự kiểm tra gì khi đăng nhập thì các trang công khai không mô tả: địa chỉ kết nối, thông tin thanh toán, số điện thoại hay tất cả cùng nhau. Điều này chưa xác nhận. Vì vậy bài viết không khẳng định gì về tín hiệu mà OpenAI dùng để xác định bạn đang ở ngoài danh sách. Chỉ biết rằng khi đăng nhập không có kiểm tra vùng nào được mô tả, và nó dẫn đến danh sách chung.
</b-chapter>
<b-chapter id="vpn" title="VPN: điều được nói và điều không được nói" icon="shield-check">
  <b-why>Điều khoản cho cá nhân (có hiệu lực từ 1 tháng 1 năm 2026) nói chung về “restrictions” và “protective measures”. VPN và vùng không được nhắc đến trong đó.</b-why>

  VPN là chương trình thay địa chỉ mà trang web nhìn thấy khi bạn kết nối. Người ta cài nó để riêng tư trên mạng công cộng hoặc để vào mạng của công ty. OpenAI im lặng về VPN trong các tài liệu của mình, nên tôi tách ba thứ: điều được viết nguyên văn, điều suy ra từ điều khoản và điều vẫn chỉ là ý kiến. Nhờ đó thấy được đâu là quy tắc và đâu là tin đồn.
  <iso-art name="codex-access-regions-vpn-bans/vpn-rules"></iso-art>
  <b-cap>Tài liệu của OpenAI nói ít về VPN: VPN không được nhắc đến, còn việc vượt qua hạn chế và biện pháp bảo vệ bị cấm.</b-cap>

  Nguyên văn, các tài liệu có những điều sau. VPN không được nhắc đến trong trang trợ giúp về quốc gia hay trong điều khoản sử dụng. Điều khoản cấm vượt qua giới hạn, hạn chế và biện pháp bảo vệ. Điều khoản cũng cấm chuyển tài khoản cho người khác và dùng dịch vụ ở các nước bị Hoa Kỳ cấm vận. Cả “VPN được phép” lẫn “VPN bị cấm” đều không xuất hiện trong các tài liệu này. Mọi kết luận theo hướng nào cũng vẫn là cách diễn giải văn bản.
  <iso-art name="codex-access-regions-vpn-bans/four-bans"></iso-art>
  <b-cap>Bốn điều cấm trong điều khoản của OpenAI: vượt qua hạn chế và biện pháp bảo vệ, chuyển tài khoản cho người khác, dùng ở nước bị Hoa Kỳ cấm vận và vi phạm điều khoản.</b-cap>

  Bốn điều cấm trong điều khoản liên quan đến chủ đề truy cập, và mỗi điều có thể đọc như một quy tắc riêng.

  <b-steps round>
    <step t="Vượt qua hạn chế và biện pháp bảo vệ">Cấm can thiệp vào dịch vụ, kể cả vượt qua giới hạn, hạn chế và biện pháp bảo vệ. Việc kiểm tra vùng có thể được coi là một biện pháp như vậy, nhưng điều khoản không nêu tên nó.</step>
    <step t="Chuyển tài khoản cho người khác">Không được chia sẻ dữ liệu đăng nhập và để người khác dùng tài khoản. Trách nhiệm về mọi việc xảy ra dưới tài khoản vẫn thuộc về chủ tài khoản.</step>
    <step t="Dùng dịch vụ ở nước bị Hoa Kỳ cấm vận">Không được dùng dịch vụ ở quốc gia hay vùng lãnh thổ bị Hoa Kỳ cấm vận, hay vì lợi ích của những người mà luật thương mại cấm giao dịch.</step>
    <step t="Vi phạm điều khoản và chính sách sử dụng">Nếu vi phạm điều khoản hoặc Usage Policies, OpenAI có thể đình chỉ hoặc đóng quyền truy cập. OpenAI cũng kết luận như vậy khi có nguy cơ gây hại và khi pháp luật yêu cầu.</step>
  </b-steps>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Nội dung</th><th>Có trong tài liệu</th></tr>
    </thead>
    <tbody>
      <tr><td>VPN trong trang trợ giúp về quốc gia</td><td>không được nhắc đến</td></tr>
      <tr><td>VPN trong điều khoản sử dụng</td><td>không được nhắc đến</td></tr>
      <tr><td>Cấm vượt qua “restrictions” và “protective measures”</td><td>có<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «Interfere with or disrupt our Services, including circumvent any rate limits or restrictions or bypass any protective measures or safety mitigations we put on our Services.» — openai.com/policies/row-terms-of-use"/></td></tr>
      <tr><td>Cấm chuyển tài khoản cho người khác</td><td>có<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «You may not share your account credentials or make your account available to anyone else and are responsible for all activities that occur under your account.» — openai.com/policies/row-terms-of-use"/></td></tr>
      <tr><td>Cấm dùng dịch vụ ở nước bị Hoa Kỳ cấm vận</td><td>có<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «Our Services may not be used in or for the benefit of, or exported or re-exported to (a) any U.S. embargoed country or territory or (b) any individual or entity with whom dealings are prohibited or restricted under applicable trade laws.» — openai.com/policies/row-terms-of-use"/></td></tr>
      <tr><td>“VPN được phép” hoặc “VPN bị cấm” nguyên văn</td><td>không có cái nào: mọi kết luận như vậy là cách diễn giải, không có trích dẫn nào đứng sau</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-finding>
    <ex>Không thể rút ra từ tài liệu, theo nguyên văn, cả sự cho phép lẫn lệnh cấm VPN.</ex>
    <gen>Tiêu chí của OpenAI là danh sách các nước nơi dịch vụ được cung cấp, cùng với điều cấm vượt qua hạn chế. OpenAI áp dụng điều này trong thực tế ra sao thì không tìm thấy trong các nguồn mở.</gen>
    <do>Đừng quyết định theo những bài kể lại trên diễn đàn. Hãy đọc điều khoản và danh sách quốc gia trên các trang của OpenAI và khi còn nghi ngờ thì viết cho bộ phận hỗ trợ của OpenAI.</do>
  </b-finding>
  <b-sublabel top="18">Những hiểu lầm thường gặp</b-sublabel>

  <b>Vì điều khoản không nhắc đến VPN, nên VPN được phép?</b> Việc không nhắc đến không cho phép điều gì. Điều cấm vượt qua hạn chế và biện pháp bảo vệ được viết theo cách chung, và việc thay địa chỉ có thể thuộc về nó. Cách kiểm tra: tìm cụm về “circumvent any rate limits or restrictions” trong <a href="https://openai.com/policies/row-terms-of-use/">điều khoản sử dụng của OpenAI</a> và đọc đầy đủ.

  <b>Điều khoản có cấm thẳng VPN không?</b> VPN không được nhắc đến trong đó. Người ta suy ra lệnh cấm lách vùng từ điều cấm chung vượt qua biện pháp bảo vệ, nhưng suy luận như vậy là cách diễn giải, không có trích dẫn nào đứng sau.

  <b>Gói đăng ký trả phí có cho quyền truy cập từ mọi nước không?</b> Điều khoản và trang trợ giúp nêu danh sách quốc gia là tiêu chí, còn gói cước không được nhắc đến trong các tiêu chí. Gói đăng ký ChatGPT và khóa API cùng đứng sau một cửa. Cách kiểm tra: đọc câu đầu tiên của trang có danh sách.

  <b>Nếu nước bạn có trong danh sách thì có thể thôi lo về VPN?</b> Điều cấm vượt qua biện pháp bảo vệ được viết trong điều khoản cho mọi người dùng, và danh sách quốc gia không hủy nó. Trang trợ giúp về quốc gia cũng có lưu ý về thiết bị: lỗi “OpenAI's services are not available in your country.” có thể xuất hiện ngay cả ở nước được hỗ trợ. Điều kiện xuất hiện của nó không được mô tả trong trang trợ giúp, nên đáng hỏi bộ phận hỗ trợ.

  <b>Với Claude Code có đơn giản hơn không?</b> Anthropic cũng không nhắc đến VPN trong quy tắc về vùng, nhưng tài liệu Claude Code có cách diễn đạt riêng về khả năng tương thích của chương trình với VPN. Cách diễn đạt khác nhau giữa hai công ty, còn logic thì giống: danh sách quốc gia cộng với điều cấm chung vượt qua biện pháp bảo vệ. Phân tích chi tiết cho Claude Code nằm trong một <a href="/blog/claude-code-access-regions-vpn-bans/" target="_blank" rel="noopener">bài riêng</a>.

  Quyết định về rủi ro thuộc về bạn. Tôi không mô tả và không khuyến nghị cách kết nối: về chủ đề này tôi chỉ có câu chữ của điều khoản.
</b-chapter>


<b-chapter id="bans" title="Khóa tài khoản và nguyên nhân" icon="alert-circle">
  <b-why>Khóa tài khoản là việc đình chỉ hoặc đóng tài khoản OpenAI, sau đó đăng nhập vào ChatGPT, API và Codex ngừng hoạt động. Điều khoản của OpenAI nêu ba căn cứ, và một trong số đó là vi phạm điều khoản hoặc chính sách sử dụng<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «We reserve the right to suspend or terminate your access to our Services or delete your account if we determine: You breached these Terms or our Usage Policies. We must do so to comply with the law. Your use of our Services could cause risk or harm to OpenAI, our users, or anyone else.» — openai.com/policies/row-terms-of-use"/>.</b-why>

  Các căn cứ được viết trong điều khoản sử dụng cho cá nhân (<a href="https://openai.com/policies/row-terms-of-use/" target="_blank" rel="noopener">Terms of Use</a>, có hiệu lực từ 1 tháng 1 năm 2026) và trong bài trợ giúp về danh sách quốc gia. Điều khoản đưa ra ba căn cứ: vi phạm chính điều khoản hoặc Usage Policies, yêu cầu của pháp luật, và nguy cơ gây hại cho OpenAI, những người dùng khác hay bất kỳ ai. Căn cứ thứ tư nằm trong bài trợ giúp về danh sách quốc gia: truy cập dịch vụ từ ngoài các nước trong danh sách “may result in your account being blocked or suspended”.
  <iso-art name="codex-access-regions-vpn-bans/ban-ladder"></iso-art>
  <b-cap>Con đường trong sơ đồ: căn cứ, rồi đình chỉ hoặc đóng, rồi kháng nghị qua bộ phận hỗ trợ. OpenAI đưa ra quyết định, còn người dùng chỉ có yêu cầu gửi bộ phận hỗ trợ; điều khoản không hứa kết quả nào.</b-cap>

  Việc khóa đến nhanh đến đâu và trông thế nào trên màn hình thì các trang công khai của OpenAI không mô tả: tôi không tìm thấy gì. Các trang chỉ nói rằng quyền đình chỉ hoặc chấm dứt truy cập thuộc về công ty, và có thể gửi kháng nghị nếu quyết định là nhầm.
  <b-sublabel top="18">Nguyên nhân theo tài liệu</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Nguyên nhân</th><th>Điều được nói</th></tr>
    </thead>
    <tbody>
      <tr><td>Truy cập từ ngoài danh sách quốc gia</td><td>tài khoản có thể bị chặn hoặc đình chỉ: «Accessing or offering access to our services outside of the countries and territories listed below may result in your account being blocked or suspended.»</td></tr>
      <tr><td>Vi phạm điều khoản hoặc chính sách sử dụng</td><td>OpenAI có thể đình chỉ hoặc chấm dứt truy cập (trích dẫn nằm ở đầu chương)</td></tr>
      <tr><td>Lỗi ở một vùng nào đó</td><td>văn bản lỗi trong bài trợ giúp về quốc gia: «OpenAI's services are not available in your country.» Bài viết nói thêm rằng lỗi có thể xảy ra ngay cả ở nước được hỗ trợ sau khi thiết bị từng được dùng ở vùng không được hỗ trợ</td></tr>
      <tr><td>Kháng nghị</td><td>qua bộ phận hỗ trợ<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «If you believe we have suspended or terminated your account in error, you can file an appeal with us by contacting our Support team» — openai.com/policies/row-terms-of-use"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  Một quy định khác của điều khoản nói về trách nhiệm: không được chuyển tài khoản cho người khác, và chủ tài khoản chịu trách nhiệm về mọi việc xảy ra dưới tài khoản đó<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «You may not share your account credentials or make your account available to anyone else and are responsible for all activities that occur under your account.» — openai.com/policies/row-terms-of-use"/>. Vì vậy tài khoản của người khác, hay truy cập dùng chung trong một nhóm, vẫn là căn cứ để hạn chế ngay cả khi nước có trong danh sách.
  <b-sublabel top="18">Kháng nghị từng bước</b-sublabel>
  <b-steps round>
    <step t="Hỗ trợ">viết cho bộ phận hỗ trợ của OpenAI và nêu rằng theo bạn việc khóa là nhầm</step>
    <step t="Chi tiết">đính kèm ngày, nước bạn đăng nhập từ đó, văn bản lỗi và bản sao các email</step>
    <step t="Chờ">chờ phản hồi: điều khoản không đưa ra thời hạn và không hứa khả năng thành công</step>
  </b-steps>

  Các trang công khai không có biểu mẫu kháng nghị có tên, không có địa chỉ và không có thời hạn xem xét, nên các bước chỉ chứa điều điều khoản nói: một yêu cầu gửi bộ phận hỗ trợ. Kháng nghị sửa một sai sót, nhưng căn cứ nêu trong bài trợ giúp vẫn nguyên chừng nào người dùng còn dùng dịch vụ từ nước ngoài danh sách. Đây là cách đọc của tôi về điều khoản và bài trợ giúp; OpenAI không đưa ra phép so sánh nào như vậy.
  <b-sublabel top="18">Ví dụ xuyên suốt</b-sublabel>
  <b-steps round>
    <step t="Oleg sống ở Nga và muốn thử Codex">Anh cài chương trình, thử đăng nhập và thấy dòng chữ “OpenAI's services are not available in your country.” Nga không có trong danh sách quốc gia của OpenAI, và điều khoản cảnh báo tài khoản bị chặn hoặc đình chỉ khi truy cập từ ngoài danh sách. Kiểm tra nào thực sự đã kích hoạt, địa chỉ, số điện thoại hay thông tin thanh toán, thì các trang công khai không mô tả. Có thể kháng nghị qua bộ phận hỗ trợ, nhưng nó không đưa nước vào danh sách. Để tự kiểm tra: mở danh sách quốc gia của OpenAI, tìm Nga trong đó và so kết quả với văn bản lỗi trong bài trợ giúp.</step>
  </b-steps>

  <b-sublabel top="18">Những hiểu lầm thường gặp</b-sublabel>

  <b>Khóa tài khoản chỉ được áp dụng khi vi phạm điều khoản?</b> Không: điều khoản còn hai căn cứ nữa, yêu cầu của pháp luật và nguy cơ gây hại, và bài trợ giúp về quốc gia nêu riêng việc truy cập từ ngoài danh sách.

  <b>Kháng nghị có trả lại quyền truy cập không?</b> Điều khoản chỉ nói có thể gửi kháng nghị qua bộ phận hỗ trợ. Không hứa kết quả nào.

  <b>Trung tâm trợ giúp đã liệt kê đầy đủ nguyên nhân khóa tài khoản OpenAI chưa?</b> Bài trợ giúp riêng của OpenAI về nguyên nhân khóa tài khoản đóng với việc kiểm tra tự động (lỗi 403), nên tôi không kể lại các quy định của nó. Điều khoản doanh nghiệp, Service Terms và Usage Policies cũng đóng theo cách tương tự. Với tổ chức, các tài liệu này cần được đọc riêng trên openai.com và help.openai.com.
  <b-cap>Ranh giới của hiểu biết: điều điều khoản cho cá nhân và bài trợ giúp về quốc gia nói là đã xác nhận. Điều nằm trong các tài liệu đóng thì chưa xác nhận.</b-cap>
</b-chapter>
<b-chapter id="data" title="Codex gửi gì lên máy chủ" icon="eye">
  <b-why>Các yêu cầu gửi đến mô hình luôn đi lên máy chủ, nếu không tác nhân không hoạt động. Các luồng khác (phân tích, số liệu đo, gửi phản hồi) được tắt trong config.toml, và văn bản prompt chỉ đến nhật ký OpenTelemetry khi có sự đồng ý rõ ràng<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Opt in to exporting raw user prompts with OpenTelemetry logs.» — learn.chatgpt.com/docs/config-file/config-reference"/>.</b-why>

  Tôi dựa vào mã nguồn Codex CLI (commit 8011b92 ngày 18.11.2026) và trang cài đặt của OpenAI. Codex là tác nhân lập trình: chạy trong terminal và trong ứng dụng và liên tục trao đổi với máy chủ. Một số dữ liệu cần cho công việc, một số được thu thập thêm. Dữ liệu cần thiết là các yêu cầu của bạn gửi đến mô hình và câu trả lời của nó. Các luồng thêm là phân tích của các sản phẩm Codex, số liệu đo và phản hồi gửi bằng lệnh /feedback. Telemetry là việc tự động gửi thông tin về cách chương trình chạy: một thao tác mất bao lâu, có xảy ra lỗi không. OpenTelemetry là chuẩn mở cho loại thông tin này.
  <iso-art name="codex-access-regions-vpn-bans/data-flows"></iso-art>
  <b-cap>Các yêu cầu gửi đến mô hình luôn đi ra. Phân tích, số liệu đo và /feedback được tắt bằng cài đặt. Văn bản prompt vào OpenTelemetry chỉ khi có sự đồng ý.</b-cap>

  <b-sublabel top="18">Gửi gì khi được bật</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Gì</th><th>Mặc định</th><th>Cách tắt</th></tr>
    </thead>
    <tbody>
      <tr><td>Phân tích của OpenAI trong các sản phẩm Codex<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Enable or disable analytics for this machine or profile.» — learn.chatgpt.com/docs/config-file/config-reference"/></td><td>bật trong bản phát hành</td><td>[analytics] enabled = false</td></tr>
      <tr><td>Số liệu đo OpenTelemetry (bộ xuất tích hợp)<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Select the OpenTelemetry metrics exporter. The default, `statsig`, follows `analytics.enabled`.» — learn.chatgpt.com/docs/config-file/config-reference"/></td><td>bật, theo cài đặt phân tích</td><td>[otel] metrics_exporter = "none"</td></tr>
      <tr><td>Gửi phản hồi qua /feedback<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Enable feedback submission via `/feedback` across local clients (default: true).» — learn.chatgpt.com/docs/config-file/config-reference"/></td><td>bật</td><td>[feedback] enabled = false</td></tr>
      <tr><td>Văn bản prompt trong nhật ký OpenTelemetry<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Opt in to exporting raw user prompts with OpenTelemetry logs.» — learn.chatgpt.com/docs/config-file/config-reference"/></td><td>tắt, cần đồng ý rõ ràng</td><td>không cần bật</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  Hai dòng đầu liên kết với nhau: theo mặc định bộ xuất số liệu tích hợp đi theo cài đặt phân tích. Việc gửi phản hồi đứng riêng: không có gì được gửi cho đến khi người dùng chạy /feedback. Dòng cuối cho thấy luồng duy nhất bị tắt theo mặc định.
  <b-sublabel top="18">Cài đặt trong config.toml</b-sublabel>
  <b-codebox title="Codex config.toml" copy>
    [analytics]
    enabled = false

    [otel]
    metrics_exporter = "none"

    [feedback]
    enabled = false
  </b-codebox>
  <b-cap>Lược đồ cài đặt trong kho mã làm rõ: với analytics enabled = false, các bộ xuất OTLP riêng của chương trình vẫn bật, và để tắt số liệu đo cần metrics_exporter = "none". OpenAI lưu chính xác gì từ mã và các yêu cầu, và trong bao lâu, thì không tìm thấy trên các trang công khai cho Codex CLI: chưa xác nhận.</b-cap>

  Các cài đặt này liên quan đến việc thu thập dữ liệu. Chúng không ảnh hưởng đến danh sách quốc gia: tắt phân tích không làm cho việc dùng từ nước ngoài danh sách trở thành được phép.
  <b-sublabel top="18">Ví dụ xuyên suốt</b-sublabel>
  <b-steps round>
    <step t="Timur sống ở Tashkent và viết mã cho khách hàng">Uzbekistan có trong danh sách quốc gia của OpenAI, nên anh đăng nhập Codex qua tài khoản ChatGPT. Khách hàng đề nghị anh không gửi thêm gì ra ngoài. Timur mở config.toml và viết ba khối: tắt phân tích, tắt số liệu đo, tắt gửi phản hồi. Các yêu cầu đến mô hình vẫn đi ra, vì công việc của tác nhân phụ thuộc vào chúng. Để tự kiểm tra: nhờ tác nhân hiển thị giá trị của ba cài đặt và xác nhận từng cài đặt đang ở trạng thái tắt.</step>
  </b-steps>

  <b-sublabel top="18">Những hiểu lầm thường gặp</b-sublabel>

  <b>Tắt phân tích có ngăn việc gửi yêu cầu đến mô hình không?</b> Không: yêu cầu và câu trả lời luôn đi đến máy chủ, đây là nền tảng cho hoạt động của tác nhân.

  <b>Một dòng [analytics] enabled = false có đủ không?</b> Lược đồ cài đặt làm rõ rằng khi đó các bộ xuất OTLP riêng của chương trình vẫn bật, và số liệu đo được tắt hoàn toàn bằng metrics_exporter = "none".

  <b>Mọi thứ tác nhân ghi lại cục bộ có đi lên máy chủ không?</b> Không: trong mã Codex CLI, các cơ sở dữ liệu cục bộ trong thư mục ~/.codex (lịch sử phiên, nhật ký) luôn được ghi, nhưng không tìm thấy mã mạng nào đồng bộ chúng. Ngoại lệ: nhật ký từ đó có thể đi ra khi gửi /feedback, và chỉ theo quyết định của người dùng.
</b-chapter>
<b-chapter id="compare" title="Truy cập: Codex và Claude Code" icon="table-grid">
  <b-why>Với cả hai tác nhân, việc đăng nhập gắn với danh sách quốc gia của công ty đứng sau, và Nga không có trong cả hai<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported.» — anthropic.com/supported-countries"/>. Tiêu chí của các danh sách khác nhau: với OpenAI là các nước nơi dịch vụ được cung cấp, với Anthropic còn là vị trí thực tế của người dùng, nơi đăng ký công ty và ai sở hữu công ty.</b-why>

  Claude Code là tác nhân lập trình của Anthropic, và cũng chạy trong terminal. Phép so sánh giúp khi một người chọn giữa hai tác nhân và muốn biết quyền truy cập có hoạt động giống nhau cho cả hai không. Ở điểm chính thì giống nhau: cả hai công ty công bố danh sách quốc gia, và ngoài danh sách thì truy cập không được cung cấp. Khác nhau ở chỗ chính xác điều gì được kiểm tra và danh sách bao phủ những gì.
  <iso-art name="codex-access-regions-vpn-bans/compare-lists"></iso-art>
  <b-cap>Hai lối vào: danh sách của OpenAI và danh sách của Anthropic. Nga vắng mặt ở cả hai, và tiêu chí của các danh sách khác nhau.</b-cap>

  <b-sublabel top="18">Bảng tổng hợp</b-sublabel>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th></th><th>Codex (OpenAI)</th><th>Claude Code (Anthropic)</th></tr>
    </thead>
    <tbody>
      <tr><td>Nga có trong danh sách</td><td>không</td><td>không</td></tr>
      <tr><td>Danh sách bao phủ gì</td><td>ChatGPT và API; không có quy tắc riêng cho Codex</td><td>các ứng dụng, gồm Claude Code, và API</td></tr>
      <tr><td>Tiêu chí</td><td>danh sách các nước nơi dịch vụ được cung cấp</td><td>vị trí thực tế, nơi đăng ký và ai sở hữu công ty</td></tr>
      <tr><td>VPN trong chính sách về vùng</td><td>không được nhắc đến</td><td>không được nhắc đến</td></tr>
      <tr><td>Đăng nhập</td><td>ChatGPT hoặc khóa API</td><td>gói đăng ký Claude hoặc tài khoản Console</td></tr>
      <tr><td>Khác biệt giữa các danh sách</td><td colspan="2">Afghanistan, Myanmar và Yemen có trong danh sách của OpenAI và không có trong danh sách của Anthropic</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  Ba dòng của bảng cần giải thích. Ở dòng phạm vi, OpenAI có một danh sách cho ChatGPT và API, và Codex không có quy tắc riêng, còn danh sách của Anthropic nêu thẳng các ứng dụng, trong đó có Claude Code. Ở dòng tiêu chí, Anthropic kiểm tra ba dấu hiệu, nên một công ty từ vùng không được hỗ trợ bị đóng cửa ngay cả khi nhân viên của họ ở nước có trong danh sách. Danh sách quốc gia của OpenAI không có những dấu hiệu như vậy cho công ty. Dòng cuối là khác biệt theo nước: Afghanistan, Myanmar và Yemen được nêu trong danh sách của OpenAI và vắng trong danh sách của Anthropic.

  Phân tích cho Claude Code, với lỗi cài đặt, xác minh điện thoại và thanh toán, nằm trong một bài riêng về vùng, VPN và khóa tài khoản.
  <b-links cols="2">
    <item href="/blog/claude-code-access-regions-vpn-bans/" k="Vùng" t="Claude Code: vùng, VPN và khóa tài khoản">Cùng chủ đề cho Claude Code</item>
    <item href="/blog/claude-code-install-and-price/" k="Cài đặt" t="Claude Code: cài đặt và giá">Lệnh, đăng nhập, gói cước</item>
  </b-links>
</b-chapter>
<b-chapter id="legal" title="Bạn có thể làm gì một cách hợp pháp" icon="check">
  <b-why>Điều khoản của OpenAI để lại bốn con đường không cần cách lách: tìm nước bạn trong danh sách, đọc điều khoản, viết cho bộ phận hỗ trợ và chọn tác nhân khác.</b-why>

  Có những lựa chọn hợp pháp, và việc lách quy tắc không thuộc lựa chọn nào trong số đó. Con đường thẳng nhất là tìm nước bạn trong danh sách của OpenAI. Tiếp theo là đọc điều khoản cho cá nhân hoặc cho tổ chức trước khi bắt đầu làm việc. Con đường thứ ba dành cho trường hợp nước có trong danh sách nhưng đăng nhập không được: viết cho bộ phận hỗ trợ. Con đường thứ tư là chọn tác nhân khác có điều khoản cho phép nước của bạn.
  <iso-art name="codex-access-regions-vpn-bans/legal-paths"></iso-art>
  <b-cap>Bốn con đường có dấu tích đang mở: nước có trong danh sách, điều khoản, bộ phận hỗ trợ và tác nhân khác. Cánh cửa cam đóng kín tượng trưng cho việc lách quy tắc, không thuộc về đây.</b-cap>

  <b-seq-row>
    <step t="Nước">tìm nó trong danh sách của OpenAI</step>
    <step t="Điều khoản">đọc điều khoản cho cá nhân hoặc tổ chức</step>
    <step t="Hỗ trợ">nếu danh sách không đúng với bạn, viết cho bộ phận hỗ trợ</step>
    <step t="Tác nhân khác">chọn chương trình có quyền truy cập mở</step>
  </b-seq-row>

  <b-sublabel top="18">Làm gì trong từng tình huống</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Tình huống</th><th>Bước</th></tr>
    </thead>
    <tbody>
      <tr><td>Nước có trong danh sách, nhưng đăng nhập không được</td><td>viết cho bộ phận hỗ trợ của OpenAI và đính kèm văn bản lỗi; kháng nghị đi qua cùng kênh</td></tr>
      <tr><td>Nước không có trong danh sách</td><td>coi như truy cập bị đóng; tìm tác nhân có điều khoản cho phép nước của bạn</td></tr>
      <tr><td>Bạn cần làm việc với mô hình cục bộ</td><td><a href="/materials/glossary/opencode/">OpenCode</a>: bạn tự chọn mô hình, kể cả mô hình cục bộ; điều khoản của mô hình và nhà cung cấp của nó cần kiểm tra riêng</td></tr>
      <tr><td>Công ty ở vùng không được hỗ trợ</td><td>rà soát pháp lý các điều khoản trước khi bắt đầu làm việc; Anthropic đóng cửa với các tổ chức đăng ký hoặc bị kiểm soát từ vùng không được hỗ trợ</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  OpenCode là tác nhân mở: nó không cung cấp mô hình riêng và kết nối với mô hình của nhà cung cấp bạn chọn, và chính nhà cung cấp đó đặt ra quy tắc về vùng. Vì vậy việc chọn nên dựa vào danh sách quốc gia của nhà cung cấp mô hình.
  <b-sublabel top="18">Ví dụ xuyên suốt</b-sublabel>
  <b-steps round>
    <step t="Aigul sống ở Bishkek và muốn bắt đầu với Codex">Cô tìm thấy dòng “Kyrgyzstan” trong danh sách của OpenAI, đọc điều khoản cho cá nhân và đăng nhập qua gói đăng ký ChatGPT đứng tên mình. Một tuần sau đăng nhập ngừng hoạt động và màn hình hiện lỗi. Cô viết cho bộ phận hỗ trợ của OpenAI, đính kèm văn bản lỗi và ngày, rồi chờ phản hồi. Để tự kiểm tra: mở danh sách, tìm nước bạn và lưu ảnh chụp màn hình của dòng đó cùng với ngày.</step>
  </b-steps>

  <b-cap>Tài khoản của người khác, khóa API của người khác, bên trung gian và bán lại quyền truy cập đều vi phạm điều khoản: tài khoản không thể chuyển cho người khác. Những cách này không được đề cập ở đây.</b-cap>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Codex có chạy ở Nga không?">Chính thức thì không: Nga không có trong danh sách quốc gia được OpenAI hỗ trợ cho ChatGPT và API, và các trang công khai không có quy tắc riêng cho Codex. Nguồn: help.openai.com/en/articles/7947663 và developers.openai.com/api/docs/supported-countries. Ngày kiểm tra: 18.11.2026.</q>
    <q t="Tôi có thể dùng Codex qua VPN không?">VPN không được nhắc đến trong điều khoản hay trong bài trợ giúp về quốc gia. VPN là chương trình thay địa chỉ mà từ đó bạn vào mạng. Điều khoản cấm lách hạn chế và biện pháp bảo vệ, và OpenAI cảnh báo tài khoản bị chặn khi truy cập từ ngoài danh sách. Các tài liệu không cho câu trả lời rõ ràng, nên quyết định thuộc về bạn và rủi ro do bạn chịu. Nguồn: openai.com/policies/row-terms-of-use. Ngày kiểm tra: 18.11.2026.</q>
    <q t="Vì sao OpenAI khóa tài khoản?">Điều đã xác nhận: truy cập từ ngoài danh sách quốc gia, vi phạm điều khoản hoặc chính sách sử dụng, yêu cầu của pháp luật và nguy cơ gây hại. Bài trợ giúp riêng về nguyên nhân khóa hãy kiểm tra bằng tay trên help.openai.com. Kháng nghị đi qua bộ phận hỗ trợ. Ngày kiểm tra: 18.11.2026.</q>
    <q t="Làm sao tắt phân tích trong Codex?">Trong config.toml thêm [analytics] enabled = false, [otel] metrics_exporter = "none" và [feedback] enabled = false. Hai khối đầu tắt phân tích và số liệu đo tích hợp, khối thứ ba tắt việc gửi phản hồi. Các yêu cầu đến mô hình vẫn đi ra. Nguồn: learn.chatgpt.com/docs/config-file/config-reference. Ngày kiểm tra: 18.11.2026.</q>
    <q t="Danh sách quốc gia của OpenAI khác của Anthropic thế nào?">Tiêu chí khác nhau. Với OpenAI là các nước nơi dịch vụ ChatGPT và API được cung cấp. Với Anthropic còn là vị trí thực tế của người dùng, nơi đăng ký công ty và ai sở hữu công ty. Afghanistan, Myanmar và Yemen có trong danh sách của OpenAI và không có trong danh sách của Anthropic. Ngày kiểm tra: 18.11.2026.</q>
    <q t="Phải làm gì nếu nước có trong danh sách nhưng đăng nhập không được?">Viết cho bộ phận hỗ trợ của OpenAI và đính kèm văn bản lỗi: bài trợ giúp về quốc gia nói lỗi có thể xảy ra ngay cả ở nước được hỗ trợ sau khi thiết bị từng được dùng ở vùng không được hỗ trợ. Kháng nghị việc khóa cũng đi qua cùng bộ phận hỗ trợ này. Ngày kiểm tra: 18.11.2026.</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="start" title="Prompt cho tác nhân" icon="zap">
  <b-why>Ba prompt có sẵn không thay đổi gì khi bạn chưa xác nhận.</b-why>

  Prompt đầu tiên chỉ đọc: nó hiển thị ba cài đặt thu thập dữ liệu. Prompt thứ hai cho biết Codex đã đăng nhập bằng cách nào, qua ChatGPT hay khóa API, và dữ liệu đăng nhập nằm ở đâu. Prompt thứ ba ghi vào tệp cài đặt, nên tác nhân trước hết hiển thị diff, tức là sự khác biệt giữa tệp cũ và tệp mới, và chờ xác nhận.
  <b-codebox title="1. Những cài đặt thu thập dữ liệu nào đang được đặt" copy>
    Hãy hiển thị các cài đặt analytics, otel và feedback hiện đang được đặt trong config.toml của Codex. Không thay đổi gì.
  </b-codebox>
  <b-codebox title="2. Codex đã đăng nhập thế nào" copy>
    Hãy hiển thị Codex hiện đang đăng nhập cho tôi bằng cách nào: qua ChatGPT hay khóa API, và dữ liệu đăng nhập nằm ở đâu.
  </b-codebox>
  <b-codebox title="3. Tắt việc gửi dữ liệu thừa" copy>
    Hãy thêm các khối [analytics] enabled = false, [otel] metrics_exporter = "none" và [feedback] enabled = false vào config.toml. Trước hết hiển thị diff và chờ tôi xác nhận.
  </b-codebox>
  <b-cap>Prompt thứ nhất và thứ hai chỉ đọc. Prompt thứ ba ghi vào tệp cài đặt, nên hãy xem diff trước khi nó được ghi.</b-cap>
</b-chapter>
<b-chapter id="next" title="Đọc tiếp">
  <b-links cols="2">
    <item href="/blog/codex-or-chatgpt-what-to-choose/" k="Lựa chọn" t="Codex hay ChatGPT">Nên dùng gì để làm việc với mã</item>
    <item href="/blog/claude-code-access-regions-vpn-bans/" k="Vùng" t="Claude Code: vùng, VPN và khóa tài khoản">Cùng chủ đề cho Claude Code</item>
    <item href="/blog/claude-code-install-and-price/" k="Cài đặt" t="Claude Code: cài đặt và giá">Lệnh, đăng nhập, gói cước</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="So sánh" t="Claude Code, Codex, Cursor và Hermes Agent">Tác nhân nào cho việc nào</item>
    <item href="/blog/specs-rules-skills/" k="Ngữ cảnh" t="AGENTS.md, CLAUDE.md và spec.md">Tác nhân đọc những chỉ dẫn nào</item>
    <item href="/materials/glossary/codex/" k="Thuật ngữ" t="Codex">Nó làm gì, chạy ở đâu</item>
  </b-links>
</b-chapter>
<b-footer>Dựa trên danh sách quốc gia và điều khoản của OpenAI, tài liệu Codex và mã nguồn Codex CLI. Ngày kiểm tra: 18.11.2026. Danh sách quốc gia thay đổi; hãy mở nguồn gốc trước khi quyết định.</b-footer>
</b-post>
