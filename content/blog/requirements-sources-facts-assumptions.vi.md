---
title: Yêu cầu và biên bản họp với AI: nguồn, giả định, dữ kiện — và bước tiếp theo
date: 2026-10-05
updated: 2026-11-08
description: Yêu cầu viết cùng AI: nguồn, giả định, trạng thái. Dữ kiện đến qua MCP từ Git; tác nhân tự sửa những chỗ nhỏ, còn chỗ lớn do con người quyết định.
tags: AI, tác nhân, yêu cầu, ảo giác, biên bản họp, harness
category: harness
layout: wide
mentions: requirements, meeting notes, hallucinations, sources, assumptions, use cases, change management
toc: what=Cần đòi gì | sources=Nguồn qua MCP | format=Cách yêu cầu | levels=Lớn và nhỏ | cases=Use case | first=Bắt đầu từ đâu | faq=Câu hỏi | next=Tiếp theo
---

Tác nhân AI (AI agent) viết yêu cầu rất tự tin, và những phỏng đoán của nó trông như dữ kiện. Hãy đòi bằng chứng cho từng mục, gồm liên kết nguồn, các giả định của mô hình và trạng thái “là dữ kiện hay không”, rồi kết nối các nguồn qua MCP, tốt nhất là từ Git. Tác nhân tự sửa những chỗ nhỏ, còn chỗ lớn do con người quyết định. Cơ sở: [MCP cho tác nhân AI](/blog/mcp-agent-access/#facts).

<b-post series="harness">

<b-chapter id="what" icon="shield-check" title="Cần đòi gì ở tác nhân">
  <b-why align="left">Tác nhân kể lại biên bản họp và tài liệu rất trơn tru, và văn bản không cho thấy dữ kiện kết thúc ở đâu và phỏng đoán bắt đầu từ đâu. Điều này đến từ cách mô hình hoạt động: nó viết tiếp văn bản cho hợp lý, và chỗ trống trong dữ liệu được lấp bằng một câu trôi chảy. Vì vậy mỗi mục trong yêu cầu và biên bản cần ba thứ: bằng chứng (liên kết nguồn kèm trích dẫn), giả định (phần tác nhân tự điền) và trạng thái (dữ kiện, không phải dữ kiện hoặc câu hỏi cho con người).</b-why>
  <iso-art name="requirements-sources-facts-assumptions/marks"></iso-art>
  <b-why align="left">Hình cho thấy ba loại dấu ghi trên cùng một mục. Nguồn trả lời “cái này lấy từ đâu”: liên kết tới file hoặc trích dẫn từ bản ghi cuộc họp kèm thời điểm. Giả định trả lời “mô hình đã tự điền gì ở đây”: ví dụ bản ghi nói “thanh toán bằng thẻ”, không nói gì về tiền tệ, và tác nhân viết “bằng rúp”. Phỏng đoán như vậy phải nằm trên một dòng riêng, tách khỏi dữ kiện. Trạng thái trả lời “có thể dựa vào không”: “dữ kiện” nếu có bằng chứng, “không phải dữ kiện” nếu không có, và “câu hỏi” nếu con người phải quyết định.</b-why>
  <b-table id="marks-example">

| | Không có dấu ghi | Có dấu ghi |
|---|---|---|
| Mục | “Thanh toán bằng thẻ bằng rúp” | “Thanh toán bằng thẻ” |
| Nguồn | không nêu | cuộc họp ngày 12/10, 14:32, “khách hàng trả bằng thẻ ở bước thanh toán” |
| Giả định | ẩn trong văn bản: “bằng rúp” | trên dòng riêng: “chỉ thanh toán bằng rúp” |
| Trạng thái | đọc lên như dữ kiện | không phải dữ kiện: cuộc họp chưa bàn về tiền tệ |
| Người đọc làm gì | tin mà không kiểm | kiểm tra giả định hoặc đặt câu hỏi |

  </b-table>
  <b-rules sw="1.8">
    <rule icon="key" t="Liên kết (bằng chứng)">Liên kết tới tài liệu hoặc trích dẫn từ bản ghi cuộc họp kèm mốc thời gian.</rule>
    <rule icon="help" t="Giả định">Phần tác nhân tự điền được ghi trên một dòng riêng.</rule>
    <rule icon="shield-check" t="Trạng thái">Dữ kiện, không phải dữ kiện hoặc câu hỏi cho con người.</rule>
  </b-rules>
  <b-why align="left">Quy tắc đơn giản: không có nguồn thì trạng thái là “không phải dữ kiện”. Nhờ vậy một mục không có bằng chứng không lặng lẽ biến thành yêu cầu. Con người thấy các mục đó thành một danh sách và quyết định xử lý: tìm nguồn, xác nhận ở cuộc họp hoặc bỏ đi. Các dấu ghi làm việc kiểm tra nhanh hơn: trích dẫn có thời điểm kiểm trong vài giây, và dòng giả định chỉ ra nơi cần tìm lỗi. Lấy nguồn ở đâu có trong chương sau, còn việc cần làm khi một mục thay đổi nằm sau đó.</b-why>
  <b-finding>
    <ex>Mỗi mục có nguồn, một dòng riêng cho phỏng đoán và một trạng thái.</ex>
    <gen>Mục không có nguồn nhận trạng thái “không phải dữ kiện”, và con người kiểm tra trước khi dựa vào. Đây là sự tiếp nối ý của phần về [ảo giác trong bài về MCP](/blog/mcp-agent-access/#facts).</gen>
    <do k="Việc cần làm">Thêm ba dấu ghi vào mẫu yêu cầu và biên bản họp của bạn.</do>
  </b-finding>
</b-chapter>

<b-chapter id="sources" icon="plug" title="Nguồn qua MCP: Git tốt nhất">
  <b-why align="left">Dấu ghi “nguồn” chỉ có tác dụng khi tác nhân lấy dữ kiện từ hệ thống thật thay vì nhớ lại. Vì vậy tác nhân được nối với các hệ thống qua MCP: nó tự mở file, bản ghi cuộc họp hoặc trang và trích đúng chỗ<b-proof href="https://modelcontextprotocol.io/docs/getting-started/intro" quote="MCP (Model Context Protocol) is an open-source standard for connecting AI applications to external systems."/>. Nhưng các nguồn đáng tin ở mức khác nhau. Git phù hợp nhất: yêu cầu nằm thành file cạnh code, mỗi chỉnh sửa có tác giả, ngày và lý do, và các phiên bản trước thấy được trong lịch sử. Confluence chỉ ổn khi các trang được chăm chút: mỗi trang có người sở hữu và ngày kiểm tra, còn trang cũ được lưu trữ. Nếu không, tác nhân đọc trang cũ như dữ kiện và tạo ra ảo giác, dù mô hình không tự bịa gì. Một nguồn riêng là biên bản họp: điều đã thống nhất, kèm liên kết tới bản ghi. Nhưng điều đã thống nhất và điều có trong code có thể lệch nhau, nên phải đối chiếu với thứ thực sự nằm trong Git: cuộc họp và code vẫn hay lệch nhịp.</b-why>
  <iso-art name="requirements-sources-facts-assumptions/sources-mcp"></iso-art>
  <b-why align="left">Bên phải hình là ba loại nguồn, bên trái là kết quả. Tác nhân kết nối với chúng qua MCP (các sợi dây có đầu cắm), lấy dữ kiện và viết yêu cầu mà mỗi mục có liên kết và trạng thái. Git đứng đầu: đó là nguồn chính. Confluence vẽ nét đứt: chỉ kết nối khi các trang còn mới. Bản ghi cuộc họp là một nguồn riêng: tác nhân lấy từ đó điều đã thống nhất, kèm liên kết và thời điểm. Điều đã thống nhất phải được đối chiếu với code trong Git: cuộc họp và code vẫn hay lệch nhịp.</b-why>
  <b-why align="left">Tiện nhất là giữ các nguồn trong một sổ đăng ký: một hàng cho mỗi nguồn. Bảng có ba cột: liên kết (đi đâu), mô tả (ở đó có gì và mới đến mức nào) và loại (Git, bản ghi cuộc họp, Confluence). Ở dòng “Nguồn” của mỗi yêu cầu, tác nhân đặt một liên kết từ sổ này.</b-why>
  <b-table id="sources-registry">

| Liên kết | Mô tả | Loại |
|---|---|---|
| git.example.com/shop/requirements/payments.md | Yêu cầu “Thanh toán bằng thẻ”; lịch sử chỉnh sửa, tác giả và lý do thấy được trong các commit | Git: file |
| git.example.com/shop/requirements/tags | Các phiên bản yêu cầu: v1.1, v2.0 | Git: tag |
| tldv.io/meeting/12-10 | Bản ghi cuộc họp ngày 12/10: điều đã thống nhất, trích dẫn kèm thời điểm; đối chiếu với code vì chúng có thể lệch nhau | Thống nhất: biên bản họp |
| confluence.example.com/pay-rules | Quy tắc thanh toán; trang có người sở hữu, kiểm tra ngày 1/10 | Confluence, chỉ các trang còn mới |

  </b-table>
  <b-finding>
    <ex>Tác nhân lấy dữ kiện qua MCP từ sổ đăng ký nguồn, và mỗi yêu cầu có một liên kết từ đó.</ex>
    <gen>Biên bản họp cho thấy điều đã thống nhất, và phải được đối chiếu với code trong Git: cuộc họp và code vẫn hay lệch nhịp. Trong Git, một chỉnh sửa có tác giả, ngày và lý do, và phiên bản yêu cầu khớp với một tag, nên việc kiểm tra và quay lui đơn giản. Một trang Confluence không có người sở hữu và ngày kiểm tra sẽ cũ đi mà không ai biết, và tác nhân kể lại văn bản lỗi thời như dữ kiện.</gen>
    <do k="Việc cần làm">Lập sổ đăng ký ba cột: liên kết, mô tả, loại. Bắt đầu với Git, và chỉ thêm một trang Confluence sau khi đã kiểm tra: có người sở hữu, có ngày, và phần thừa đã được lưu trữ.</do>
  </b-finding>
</b-chapter>

<b-chapter id="format" icon="lines" title="Cách yêu cầu trong biên bản và đặc tả yêu cầu">
  <iso-art name="requirements-sources-facts-assumptions/pipeline"></iso-art>
  <b-say-agent title="Nói với tác nhân" plain>Phân tích bản ghi cuộc họp và viết danh sách yêu cầu. Với mỗi mục, nêu nguồn (liên kết từ sổ đăng ký và trích dẫn kèm thời điểm), các giả định của bạn trên một dòng riêng và trạng thái: dữ kiện, không phải dữ kiện hoặc câu hỏi. Nếu không có nguồn, đánh dấu “không phải dữ kiện”.</b-say-agent>
  <b-why align="left">Prompt này yêu cầu tác nhân tách bản ghi thành các mục, mỗi mục có ba dấu ghi. Câu cuối của nó quan trọng: nó cấm coi một mục là dữ kiện khi không có nguồn. Prompt như vậy hợp với bản ghi cuộc họp, email, một chuỗi chat và mọi tài liệu.</b-why>
  <b-codebox title="Mẫu cho một mục">
    Yêu cầu: Thanh toán bằng thẻ
    Nguồn: git.example.com/shop/requirements/payments.md, dòng 12; cuộc họp ngày 12/10, 14:32, “khách hàng trả bằng thẻ ở bước thanh toán”
    Giả định: chỉ thanh toán bằng một loại tiền tệ
    Trạng thái: dữ kiện | không phải dữ kiện | câu hỏi
    Người xác nhận: —
  </b-codebox>
  <b-why align="left">Cách đọc mẫu. “Yêu cầu” là tên ngắn của mục. “Nguồn” là liên kết từ sổ đăng ký và trích dẫn kèm thời điểm: người duyệt tìm ra chỗ đó trong vài giây. “Giả định” là điều nguồn không nói nhưng tác nhân tự quyết (tiền tệ, thời hạn, vai trò). “Trạng thái” là “dữ kiện” nếu nguồn nói thẳng, “không phải dữ kiện” cho phỏng đoán và “câu hỏi” nếu con người phải quyết định. “Người xác nhận” do con người điền: tên và ngày kiểm tra. Khi ở đó còn là dấu gạch ngang thì mục chưa được coi là đã chấp nhận.</b-why>
  <b-codebox title="Ví dụ câu trả lời của tác nhân">
    Yêu cầu: Thanh toán bằng thẻ
    Nguồn: cuộc họp ngày 12/10, 14:32, “khách hàng trả bằng thẻ ở bước thanh toán”
    Giả định: chỉ thanh toán bằng rúp
    Trạng thái: không phải dữ kiện
    Người xác nhận: —

    Yêu cầu: Biên lai qua email
    Nguồn: cuộc họp ngày 12/10, 15:05, “gửi biên lai đến email của khách hàng”
    Giả định: không có
    Trạng thái: dữ kiện
    Người xác nhận: —
  </b-codebox>
  <b-why align="left">Mục thứ nhất nhận trạng thái “not a fact”: tiền tệ không được nêu ở cuộc họp, nên đó là giả định của tác nhân. Mục thứ hai được nói thẳng ở cuộc họp, nên là “fact”. Cả hai mục chờ con người xác nhận, và danh sách các mục “not a fact” trở thành chương trình nghị sự của cuộc họp sau.</b-why>
  <b-finding>
    <ex>Bản ghi cuộc họp trở thành yêu cầu mà mỗi dòng đều có dấu ghi.</ex>
    <gen>Trích dẫn có mốc thời gian khiến việc kiểm tra chỉ mất vài giây, và dòng giả định cho thấy mô hình đã lấp chỗ trống ở đâu.</gen>
    <do k="Việc cần làm">Cho một cuộc họp của bạn đi qua prompt này và so với điều bạn nhớ.</do>
  </b-finding>
</b-chapter>

<b-chapter id="levels" icon="layers" title="Thay đổi lớn và nhỏ">
  <b-why align="left">Khi tác nhân hoặc con người sửa một yêu cầu, mức độ nghiêm trọng của chỉnh sửa là điều quan trọng. Sự khác biệt đơn giản: với chỉnh sửa nhỏ thì tìm được bằng chứng, với chỉnh sửa lớn thì không. Chỉnh sửa nhỏ không thay đổi hành vi của hệ thống: mục vẫn hoạt động như cũ, chỉ có độ tin cậy hoặc cách diễn đạt đổi. Nó có thể kiểm tra với nguồn: tìm trích dẫn trong bản ghi cuộc họp hoặc thấy trong lịch sử Git rằng ý nghĩa không đổi. Vì vậy tác nhân tự sửa những chỗ nhỏ. Chỉnh sửa lớn thay đổi hành vi hệ thống và không có gì để xác nhận nó: các nguồn chưa chứa quyết định như vậy, không có nơi nào để lấy bằng chứng. Vì vậy chỉnh sửa lớn dành cho con người: tác nhân chuẩn bị danh sách các use case bị ảnh hưởng và một bản nháp, còn chủ sở hữu yêu cầu quyết định. Sau khi duyệt, chính quyết định (ai, khi nào và vì sao) được ghi vào Git và trở thành một nguồn mới. Số phiên bản trong phần mềm hoạt động theo cách tương tự: v1.0 → v1.1 là một làm rõ nhỏ, v1.0 → v2.0 là thay đổi mà mọi người phải được báo trước<b-proof href="https://semver.org/" quote="MAJOR version when you make incompatible API changes"/><b-proof href="https://semver.org/" quote="MINOR version when you add functionality in a backward compatible manner"/>.</b-why>
  <iso-art name="requirements-sources-facts-assumptions/versions"></iso-art>
  <b-why align="left">Bên trái hình là phiên bản gốc, v1.0. Ở giữa là chỉnh sửa nhỏ: thêm một khối nhỏ, ý nghĩa như cũ, số thứ hai đổi (v1.1). Bên phải là chỉnh sửa lớn: thêm một khối lớn, hành vi đã đổi, số thứ nhất đổi (v2.0). Dưới chỉnh sửa nhỏ chú thích ghi “đã tìm thấy bằng chứng, tác nhân tự làm”, dưới chỉnh sửa lớn là “không có bằng chứng, con người quyết định”.</b-why>
  <b-rules sw="1.8">
    <rule icon="eye" t="Phỏng đoán được xác nhận">Trạng thái thành “dữ kiện”, văn bản giữ nguyên: chỉnh sửa nhỏ.</rule>
    <rule icon="bug" t="Phỏng đoán bị bác bỏ">Văn bản của mục thay đổi: chỉnh sửa lớn.</rule>
    <rule icon="ban" t="Dữ kiện đã đổi">Nếu phiên bản mới của nguồn đổi hành vi thì chỉnh sửa là lớn: bằng chứng cho thấy nguồn đã đổi gì, còn có muốn điều đó hay không là việc của con người.</rule>
    <rule icon="pause" t="Cách diễn đạt">Lỗi chính tả hoặc cách diễn đạt rõ hơn với cùng ý nghĩa được ghi vào lịch sử thay đổi.</rule>
  </b-rules>
  <b-table id="major-minor">

| Loại chỉnh sửa | Điều đã xảy ra | Bằng chứng | Tác nhân làm gì | Con người làm gì |
|---|---|---|---|---|
| Nhỏ | Phỏng đoán “chỉ thanh toán bằng rúp” được bản ghi cuộc họp xác nhận: trạng thái đổi từ “không phải dữ kiện” sang “dữ kiện” | có: tldv.io/meeting/12-10, 14:32, “chỉ thanh toán bằng rúp” | tự làm: đổi trạng thái, thêm liên kết và trích dẫn, ghi vào lịch sử, phiên bản v1.1 | không làm gì: có thể lướt qua lịch sử |
| Nhỏ | Cách diễn đạt được làm rõ: “Thanh toán bằng thẻ” thành “Thanh toán bằng thẻ ngân hàng” | có: so sánh phiên bản trong Git, git.example.com/shop/requirements/commit/a1b2c3, đổi từ ngữ, ý nghĩa như cũ | tự làm và ghi vào lịch sử | không làm gì |
| Lớn | Có người đề xuất chấp nhận cả euro: bản ghi cuộc họp lẫn tài liệu đều không nói gì về điều này | không có: các nguồn không chứa quyết định như vậy, không có nơi lấy bằng chứng | chuẩn bị: viết ra sẽ thay đổi gì, liệt kê các use case và test bị ảnh hưởng, soạn nháp v2.0 | quyết định: chủ sở hữu yêu cầu duyệt hoặc từ chối, quyết định được ghi vào Git |
| Lớn | Có người đề xuất xác nhận thanh toán bằng mã từ ngân hàng: trong yêu cầu chưa có điều này | không có: không nguồn nào chứa quyết định | chuẩn bị như trên | quyết định: chủ sở hữu yêu cầu duyệt hoặc từ chối |

  </b-table>
  <b-why align="left">Bằng chứng là ranh giới giữa hai loại chỉnh sửa. Nếu tác nhân tìm thấy một trích dẫn, một file hoặc một commit xác nhận chỉnh sửa thì nó là nhỏ và tác nhân tự làm. Nếu không có gì để xác nhận thì chỉnh sửa là lớn: tác nhân thành thật ghi “không có bằng chứng”, chuẩn bị danh sách các use case bị ảnh hưởng và trao quyết định cho con người. Với Git việc này đơn giản: tác nhân tự commit chỉnh sửa nhỏ và gửi chỉnh sửa lớn dưới dạng merge request mà chỉ con người mới merge được. Sự đồng ý của chủ sở hữu trong yêu cầu đó về sau trở thành bằng chứng cho các chỉnh sửa tiếp theo.</b-why>
  <b-finding>
    <ex>Với chỉnh sửa nhỏ thì tìm được bằng chứng, với chỉnh sửa lớn thì không.</ex>
    <gen>Tác nhân làm những gì nguồn xác nhận và dừng ở chỗ không có gì để xác nhận. Con người chỉ còn lại đúng những quyết định mà chỉ con người mới đưa ra được.</gen>
    <do k="Việc cần làm">Thống nhất ai xác nhận các chỉnh sửa lớn và ghi vào mẫu.</do>
  </b-finding>
</b-chapter>

<b-chapter id="cases" icon="git-branch" title="Use case">
  <b-why align="left">Use case (theo định nghĩa, là mô tả có cấu trúc về hành vi của hệ thống khi đáp lại yêu cầu từ các tác nhân bên ngoài<b-proof href="https://en.wikipedia.org/wiki/Use_case" quote="structured description of a system’s behavior as it responds to requests from external actors"/>) là một kịch bản về cách mọi người dùng một yêu cầu. Yêu cầu “Thanh toán bằng thẻ” có ba kịch bản: thanh toán bình thường, ngân hàng từ chối và thanh toán lại. Chúng được viết ra vì một chỉnh sửa thường chỉ chạm một hai kịch bản, và đó là những kịch bản cần kiểm tra lại. Đây là mối liên hệ với chương trên: chỉnh sửa lớn thay đổi hành vi, nên tác nhân liệt kê các use case bị ảnh hưởng và test của chúng. Chỉnh sửa nhỏ không đổi hành vi, và tác nhân chỉ xác nhận các use case vẫn như cũ. Nhờ vậy một chỉnh sửa nhỏ không có nghĩa là kiểm tra lại cả yêu cầu.</b-why>
  <iso-art name="requirements-sources-facts-assumptions/use-cases"></iso-art>
  <b-why align="left">Hình minh họa điều này bằng một ví dụ. Bên trái là yêu cầu “Thanh toán bằng thẻ”. Bên phải là ba use case của nó: thanh toán bình thường (khách trả ngay), ngân hàng từ chối (lỗi và thử lại) và thanh toán lại (chống tính tiền hai lần). Dấu chấm than ở use case thứ ba: giả sử cuộc họp quyết định đổi cách chống tính tiền hai lần. Đó là chỉnh sửa lớn, và nó chỉ chạm thanh toán lại. Tác nhân liệt kê đúng use case đó và các test của nó, còn thanh toán bình thường và ngân hàng từ chối vẫn như cũ.</b-why>
  <b-pills>
    <pill>Case: đường thường</pill>
    <pill>Case: lỗi</pill>
    <pill>Case: lặp lại</pill>
  </b-pills>
  <b-why align="left">Một ví dụ. Tại cuộc họp, người ta quyết định rằng một lần thanh toán lại trong vòng một phút được tính là cùng một đơn hàng. Đó là chỉnh sửa lớn, và nó chỉ chạm use case “lặp lại”. Với nó, tác nhân liệt kê các test cần cập nhật, ví dụ “lần thanh toán thứ hai trong vòng 30 giây không tính tiền hai lần”. Các use case “đường thường” và “lỗi” vẫn như cũ, và test của chúng chạy không đổi. Nếu không có danh sách như vậy, use case bị ảnh hưởng sẽ do người dùng phát hiện ra.</b-why>
  <b-finding>
    <ex>Yêu cầu “Thanh toán bằng thẻ” tách thành ba case, và một chỉnh sửa về thanh toán lại chỉ chạm case thứ ba.</ex>
    <gen>Với chỉnh sửa lớn, tác nhân liệt kê các case bị ảnh hưởng, còn với chỉnh sửa nhỏ, nó xác nhận các case không đổi.</gen>
    <do k="Việc cần làm">Sau mỗi chỉnh sửa, nhờ tác nhân liệt kê các case bị ảnh hưởng và test của chúng.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="Bắt đầu từ đâu">
  <b-why align="left">Bước 1. Sổ đăng ký nguồn: lập bảng ba cột và kết nối Git qua MCP. Bước 2. Thêm ba dấu ghi vào mẫu mục và gửi cho tác nhân một prompt cùng một bản ghi cuộc họp. Bước 3. Thống nhất quy tắc: nếu một chỉnh sửa có bằng chứng thì tác nhân tự làm, nếu không có thì con người quyết định. Trong một giờ bạn có một bộ biên bản mà mỗi mục đều có dấu ghi và một danh sách các mục “không phải dữ kiện” cho cuộc họp sau. Nếu có nhiều thì cũng không sao: tác nhân vừa lần đầu cho thấy các phỏng đoán từng nằm ở đâu.</b-why>
  <b-numchain>
    <step>Sổ đăng ký nguồn: Git qua MCP</step>
    <step>Ba dấu ghi vào mẫu và một prompt cho tác nhân</step>
    <step>Quy tắc: có bằng chứng thì tác nhân sửa; không có thì con người quyết định</step>
  </b-numchain>
  <b-finding>
    <ex>Ba bước: sổ đăng ký nguồn, mẫu cùng prompt, quy tắc về chỉnh sửa.</ex>
    <gen>Bắt đầu với một cuộc họp và một tài liệu: kết quả thấy trong vòng một giờ.</gen>
    <do k="Việc cần làm">Hôm nay, phân tích một bản ghi cuộc họp bằng mẫu này.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Làm sao để AI không đưa phỏng đoán thành dữ kiện trong yêu cầu?">Đòi liên kết nguồn cho từng mục, danh sách các giả định của mô hình và trạng thái “dữ kiện hay không phải dữ kiện”.</q>
    <q t="Tác nhân nên lấy nguồn từ đâu?">Qua MCP, tốt nhất từ Git: một thay đổi ở đó có tác giả, ngày và lịch sử.</q>
    <q t="Tác nhân tự đổi gì, và con người quyết định gì?">Những thay đổi nhỏ được nguồn xác nhận thì tác nhân tự làm. Những thay đổi lớn và chưa được xác nhận thì con người quyết định.</q>
    <q t="Vì sao phải đối chiếu biên bản họp với code?">Cuộc họp và code lệch nhau: biên bản cho thấy điều đã thống nhất, Git cho thấy điều thực sự đã làm.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Tiếp theo">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="Nguồn" t="MCP cho tác nhân AI: giải quyết vấn đề gì và cách giao việc kết nối cho tác nhân">Tác nhân lấy dữ kiện từ các hệ thống ra sao</item>
    <item href="/blog/bug-report-to-reproduction-agent/" k="Ví dụ" t="Công việc của QA sau bộ phận hỗ trợ cùng tác nhân AI: nghiên cứu, mô tả và lập tài liệu qua MCP và skill">Tác nhân tái hiện một lỗi trong Jira</item>
    <item href="/blog/analytics-reports-agent/" k="Báo cáo" t="Báo cáo phân tích cùng tác nhân AI: dữ liệu từ cơ sở dữ liệu, bảng tính và tài liệu qua MCP">Cùng cách làm cho phân tích</item>
  </b-links>
</b-chapter>
<b-footer>Phiếu, cuộc họp và các liên kết được bịa ra làm ví dụ. Mẫu, sổ đăng ký và quy tắc lớn/nhỏ là thực hành của nhóm và có thể thay đổi.</b-footer>
</b-post>
