---
title: Cách tìm race condition trong mã: mô hình Quint thử mọi thứ tự hành động
date: 2026-10-25
updated: 2026-11-08
description: Cách tìm race condition trong mã: mô hình Quint thử mọi thứ tự hành động và chỉ ra chuỗi bước làm vỡ một quy tắc. Ví dụ và giới hạn.
tags: AI, đặc tả, Quint, kiểm chứng hình thức, kiểm thử, harness, race condition, kiểm chứng mô hình, data race
category: specs
layout: wide
mentions: Quint, Apalache, TLA+, model checking, formal verification, race condition, lost data, Claude Code, hooks, spec-driven development
toc: idea=Ý tưởng | found=Mô hình tìm ra gì | pair=Cặp mô hình | domains=Mô hình cho mỗi miền | teeth=Kiểm tra các phép kiểm tra | human=Con người can thiệp ở đâu | weak=Điểm yếu | start=Bắt đầu từ đâu | agent=Cùng tác nhân | faq=FAQ | next=Đọc thêm
---

Race condition được tìm ra bằng cách kiểm tra mọi thứ tự mà hai thao tác có thể chạy. Kiểm thử chỉ phủ những thứ tự bạn hình dung ra, còn mô hình Quint tự thử tất cả và in chuỗi bước làm vỡ một quy tắc, ví dụ tiến trình sập giữa chừng khi đang ghi hoặc hai quản trị viên thao tác cùng lúc, kể cả trong mã do tác nhân AI (AI agent) viết.

<b-post series="harness">
<b-art names="quint-models-find-races/intro" wide/>
<b-cap>Kiểm thử đi theo kịch bản bạn hình dung; mô hình đi qua mọi kịch bản của một thế giới nhỏ.</b-cap>

<b-chapter id="idea" icon="workflow" title="Mô hình Quint hoạt động thế nào: mọi kịch bản thay vì đoán">
  <b-why align="left">Tên [Quint](/materials/glossary/quint/) dễ nhầm với công cụ kiểm thử QUnit, nhưng đây là một chương trình khác: [so sánh với kiểm thử và TLA+](/blog/quint-vs-tests-and-tla/). Quint khác [TLA+](/materials/glossary/tla-plus/) và Alloy ở chỗ nào được nói trong [so sánh ba ngôn ngữ](/blog/tla-alloy-quint-compare/). Một kiểm thử thông thường là một kịch bản bạn nghĩ ra trước: bấm, chờ, kiểm tra kết quả. Lỗi bạn chưa từng nghĩ tới thì không có trong kịch bản đó. Mô hình làm việc khác. Bạn mô tả các trạng thái của hệ thống và các hành động được phép, còn chương trình thử mọi thứ tự hành động trong một thế giới nhỏ và chỉ ra thứ tự đầu tiên làm vỡ một quy tắc.</b-why>
  <b-art names="quint-models-find-races/explore" wide/>
  <b-why align="left">Một mô hình mô tả một mảng logic, như vòng đời của bản ghi cuộc họp hoặc quyền truy cập của một thành viên, và dài từ vài chục đến vài trăm dòng. Tiếp theo là vài câu chuyện: mô hình đã tìm ra chính xác điều gì và vì sao kiểm thử không tìm ra.</b-why>
  <b-why align="left">Từng bước như sau. Trước hết chọn một thế giới nhỏ: chẳng hạn một quản trị viên, một bot và một phiên. Sau đó mô tả những gì có thể xảy ra trong thế giới đó: đăng nhập, đăng xuất, tiến trình sập, một tin nhắn mới. Chương trình thử mọi thứ tự của các sự kiện đó và kiểm tra các quy tắc sau mỗi bước. Kiểu tìm kiếm này gọi là [kiểm chứng mô hình (model checking)](/materials/glossary/model-checking/). Nếu một quy tắc bị vỡ, bạn nhận được chính xác chuỗi bước, có thể lặp lại bằng tay.</b-why>
  <b-why align="left">Thế giới nhỏ là có chủ ý. Số thứ tự tăng rất nhanh theo kích thước thế giới, nên hai hoặc ba thực thể và năm hoặc sáu hành động thường cho kết quả trong vài giây. Thế là đủ cho race: hai hành động chỉ cần hai bên tham gia để chồng lên nhau.</b-why>
  <b-finding>
    <ex>Kiểm thử kiểm tra kịch bản bạn hình dung; mô hình kiểm tra mọi kịch bản có thể xảy ra trong thế giới nhỏ bạn đã chọn.</ex>
    <gen>Các lỗi kiểu “hai hành động chồng lên nhau theo thời gian” hiếm khi ai nghĩ tới trước<b-proof href="https://quint-lang.org/" quote="Quint: an executable specification language, a modern TLA+ alternative for software engineers"/>.</gen>
    <do>Chọn một quy tắc bạn sợ bị mất và viết nó ra trong mười dòng.</do>
  </b-finding>
</b-chapter>

<b-chapter id="found" icon="bug" title="Mô hình Quint tìm ra những lỗi nào: ví dụ">
  <b-why align="left">Giá trị chính của mô hình là những phát hiện không ai tìm kiếm. Dưới đây là hai phát hiện điển hình nhất và danh sách phần còn lại. Chúng có chung một dạng, [race condition](/materials/glossary/race-condition/): hai hành động, mỗi hành động đúng khi đứng riêng, cùng nhau gây ra mất mát hoặc lẫn lộn.</b-why>
  <b-sublabel>Câu chuyện 1: race giữa đăng nhập và đăng xuất</b-sublabel>
  <b-why align="left">Hãy đi qua câu chuyện đầu tiên một cách chi tiết. Giả sử một người có phiên Telegram trong hệ thống, và quản trị viên có thể kết thúc phiên đó. Cùng lúc, một bot có thể dùng phiên ấy để gửi tin nhắn. Mã kiểm tra trước rằng phiên còn sống, rồi mới đi gửi. Giữa lúc kiểm tra và lúc gửi, quản trị viên kịp đăng xuất. Kết quả là tin nhắn được gửi đi nhân danh một người đã bị đóng quyền truy cập.</b-why>
  <b-why align="left">Không kiểm thử nào bắt được điều này, vì từng bước riêng lẻ đều chạy đúng. Lỗi chỉ nằm ở thứ tự “kiểm tra, đăng xuất, gửi”, và mô hình tự tìm ra thứ tự đó.</b-why>
  <b-art names="quint-models-find-races/race" wide/>
  <b-cap>Quản trị viên đăng xuất trong khi bot đăng nhập bằng phiên cũ. Mã kiểm tra quyền một lần ở đầu và tin vào kết quả sau đó.</b-cap>
  <b-sublabel top="22">Câu chuyện 2: bản ghi và sự cố sập</b-sublabel>
  <b-why align="left">Câu chuyện thứ hai là về mất dữ liệu. Một hệ thống phiên âm ghi lại cuộc họp và ở một thời điểm phải đánh dấu rằng đang ghi. Nếu tiến trình sập giữa lúc bắt đầu ghi và lúc đánh dấu, sau khi khởi động lại hệ thống không biết bản ghi từng tồn tại. Tệp thì có, mục trong cơ sở dữ liệu thì không. Người dùng thấy một chỗ trống ở nơi cuộc họp lẽ ra phải có.</b-why>
  <b-why align="left">Cách chữa đơn giản: đặt dấu trước khi bắt đầu ghi, không phải sau. Nhưng để nhận ra vấn đề, phải hình dung được một lần sập đúng vào khoảng hở đó, và mô hình làm điều này dễ dàng, vì sập là một trong những hành động bình thường của nó.</b-why>
  <b-art names="quint-models-find-races/crash" wide/>
  <b-cap>Một bản ghi đang chạy, tiến trình sập, và không còn dấu “đang ghi” nào ở đâu cả. Sau khi khởi động lại, hệ thống tin rằng không có bản ghi nào, và dữ liệu mất không để lại dấu vết.</b-cap>
  <b-sublabel top="22">Các phát hiện khác</b-sublabel>
  <b-rules cols="2">
    <rule icon="copy" t="Một mục trên hai thẻ">Một bản ghi được tiếp tục, phân tích nêu người sở hữu khác</rule>
    <rule icon="check-square" t="Mất dấu ☑">Một mục mất người sở hữu và biến mất cùng với “đã xong”</rule>
    <rule icon="close-alt" t="Xóa mục không rỗng">Hộp thoại “xóa thẻ rỗng” vẫn mở, một bot thêm thành viên</rule>
    <rule icon="key" t="Khóa rộng hơn quyền">Quyền của một người bị thu hẹp, khóa của họ vẫn chạy như cũ</rule>
    <rule icon="user-alt" t="Tin nhắn gửi nhầm người">Một tên người dùng bị chuyển cho người khác</rule>
    <rule icon="chat-square" t="Trích dẫn của người khác">Một tin nhắn được chuyển sang vị trí tuyển dụng khác, gợi ý vẫn giữ trích dẫn cũ</rule>
  </b-rules>
  <b-why align="left">Cách đọc danh sách trên. Mỗi dòng có loại lỗi ở bên trái và ví dụ ở bên phải. “Một mục trên hai thẻ” và “mất dấu ☑” thuộc về các tác vụ cuộc họp, “xóa mục không rỗng” và “khóa rộng hơn quyền” thuộc về phía quản trị, “tin nhắn gửi nhầm người” và “trích dẫn của người khác” thuộc về nhắn tin.</b-why>
  <b-why align="left">Cả sáu có chung một đặc điểm: dữ liệu thuộc về một chủ rồi chuyển sang chủ khác hoặc biến mất. Vì vậy kiểm tra chủ sở hữu tại thời điểm hành động, không phải từ trước, gần như đóng được cả danh sách.</b-why>
  <b-finding>
    <ex>Gần như mọi phát hiện thuộc cùng một loại: hai hành động chồng lên nhau, và mã chỉ kiểm tra điều kiện một lần.</ex>
    <gen>Cách chữa cũng chỉ có một: kiểm tra lại điều kiện tại thời điểm hành động ở phía máy chủ, hoặc đặt các hành động dưới cùng một khóa.</gen>
    <do>Tìm trong mã của bạn một chỗ mà phép kiểm tra và hành động bị ngăn cách bởi việc chờ phản hồi.</do>
  </b-finding>
</b-chapter>

<b-chapter id="pair" icon="swap" title="Một cặp mô hình: như hiện tại và như yêu cầu">
  <b-why align="left">Với mỗi mảng, hai phiên bản của mô hình được giữ trong một tệp. Bản thứ nhất sao chép mã như hiện nay và phải tái hiện được lỗi đã biết. Bản thứ hai mô tả yêu cầu: quy tắc không bao giờ bị vỡ. Một công tắc ở đầu tệp bật các bản sửa, nên sự khác biệt giữa các phiên bản thấy ngay.</b-why>
  <b-art names="quint-models-find-races/pair" wide/>
  <b-cap>Bên trái, đường đến căn phòng đỏ, tức vi phạm, đang mở. Bên phải, một rào chắn đứng trên đường đó và quy tắc được giữ.</b-cap>
  <b-vs-grid>
    <h></h>
    <h>current: mã như hiện tại</h>
    <h>fixed: yêu cầu</h>
    <c>**Mục đích**</c>
    <c>tái hiện lỗi bằng một kịch bản</c>
    <c>cho thấy bản sửa đóng được lỗi</c>
    <c>**Quy tắc**</c>
    <c>bị vi phạm</c>
    <c>được giữ</c>
    <c>**Các bản sửa**</c>
    <c>không có</c>
    <c>mỗi bản sửa có thẻ và ghi “was: …”</c>
  </b-vs-grid>
  <b-why align="left">Bảng có ba hàng. Hàng đầu nói mỗi mô hình dùng để làm gì: mô hình bên trái tái hiện lỗi đã tìm ra, mô hình bên phải cho thấy yêu cầu có thể được đáp ứng. Hàng thứ hai cho thấy kết quả kiểm tra mong đợi: bên trái quy tắc bị vi phạm, bên phải được giữ. Nếu bên trái bỗng không còn bị vi phạm, mô hình đã thôi phản ánh mã, và đó là tín hiệu để cập nhật nó.</b-why>
  <b-why align="left">Hàng thứ ba nói về các bản sửa. Mỗi điểm khác của mô hình bên phải so với bên trái mang một thẻ như П1, П2 (chữ П là chữ cái đầu của từ tiếng Nga có nghĩa “bản sửa”) và ghi chú “was: …”. Các thẻ này cho phép đi từ yêu cầu đến một chỗ cụ thể trong mã và thấy chính xác cần đổi gì.</b-why>
  <b-finding>
    <ex>Một tệp chứa cả hai biến thể: một công tắc bật các bản sửa, nên phép so sánh trước và sau luôn trong tầm tay.</ex>
    <gen>Mỗi lỗi trở thành một kịch bản hồi quy ngắn, thất bại trên phiên bản cũ và qua trên phiên bản mới.</gen>
    <do>Bắt đầu một bảng yêu cầu có cột “hợp với mô hình” và đánh dấu ba hàng đầu tiên.</do>
  </b-finding>
</b-chapter>

<b-chapter id="domains" icon="boxes-link" title="Một mô hình cho mỗi miền">
  <b-why align="left">Mỗi [bounded context](/materials/glossary/bounded-context/) có quy tắc riêng, được viết là MUST trong một [thẻ aggregate](/blog/specs-by-aggregates/). Mô hình hình thức làm cho các quy tắc đó kiểm tra được, và một [tác nhân cho mỗi context](/blog/agents-per-bounded-context/) làm việc trong ranh giới của chúng.</b-why>
  <b-art names="quint-models-find-races/contexts" wide/>
  <b-rules cols="2">
    <rule icon="users" t="Cuộc họp">Người tham gia của một bản ghi không bao giờ chuyển sang bản ghi kế tiếp trên cùng một liên kết</rule>
    <rule icon="lock" t="Dữ liệu riêng tư">Một bản ghi riêng tư không bao giờ lọt vào kho dùng chung</rule>
    <rule icon="user-alt" t="Thành viên">Một Telegram ID, một bản ghi, lịch sử không bao giờ mất</rule>
    <rule icon="target" t="Vị trí tuyển dụng">Trạng thái của vị trí tuyển dụng chỉ thuộc về ứng viên của cặp ghép tương ứng</rule>
  </b-rules>
  <b-why align="left">Đằng sau mỗi ví dụ là gì. “Cuộc họp” là quy tắc rằng những người của bản ghi trước không chuyển sang bản ghi sau, dù liên kết cuộc họp giống nhau. “Dữ liệu riêng tư” nghĩa là một bản ghi riêng tư không thể lọt vào kho dùng chung dưới bất kỳ thứ tự hành động nào. “Thành viên” nghĩa là một tài khoản Telegram khớp với một bản ghi thành viên, và lịch sử còn nguyên sau khi gộp. “Vị trí tuyển dụng” nghĩa là trạng thái trên một vị trí thuộc về một cặp ứng viên và vị trí cụ thể, không thuộc về ứng viên nói chung.</b-why>
  <b-finding>
    <ex>Một quy tắc MUST từ thẻ aggregate trở thành thuộc tính của mô hình, và một vi phạm được trả về cho tác nhân của context đó dưới dạng chuỗi bước.</ex>
    <gen>Một ranh giới context phục vụ ba thứ cùng lúc: đặc tả, tác nhân và mô hình.</gen>
    <do>Chọn một context và một quy tắc MUST rồi viết mô hình đầu tiên cho nó.</do>
  </b-finding>
</b-chapter>

<b-chapter id="teeth" icon="shield-check" title="Kiểm tra các phép kiểm tra">
  <b-why align="left">Kết quả xanh có thể có nghĩa “mọi thứ đều đúng” hoặc “phép kiểm tra chẳng kiểm tra gì”. Vì vậy chính các phép kiểm tra cũng được kiểm tra: tác giả hoặc tác nhân cố ý làm hỏng mô hình (ví dụ, bỏ một điều kiện) để xem quy tắc có nhận ra không. Nếu không, quy tắc vô dụng.</b-why>
  <b-sublabel>Ví dụ: tỷ lệ quy tắc mà mã hiện tại của hệ thống ghi cuộc họp vi phạm</b-sublabel>
  <b-count-bars>
    <bar k="Người tham gia" w="100%" color="c-none">2 / 2</bar>
    <bar k="Thẻ người" w="75%" color="c-none">3 / 4</bar>
    <bar k="Gửi báo lỗi" w="67%" color="c-none">2 / 3</bar>
    <bar k="Mục tiêu cuộc họp" w="57%" color="c-light">4 / 7</bar>
    <bar k="Ghi âm" w="50%" color="c-light">2 / 4</bar>
    <bar k="Quyền riêng tư" w="25%" color="c-work">1 / 4</bar>
  </b-count-bars>
  <b-why align="left">Các thanh cho thấy tỷ lệ quy tắc mà mã hiện tại vi phạm. Thanh càng dài thì mô hình càng bắt được nhiều quy tắc trên mã thật. “Người tham gia 2 / 2” nghĩa là cả hai phép kiểm tra đều tìm ra vấn đề. “Quyền riêng tư 1 / 4” nghĩa là mã phần lớn giữ được, nhưng có một lỗ hổng.</b-why>
  <b-why align="left">Đây không phải điểm đánh giá chất lượng của mã. Độ dài thanh phụ thuộc vào việc chọn quy tắc nào, và cho thấy nhiều hơn ở nơi mô hình mang lại nhiều lợi ích nhất.</b-why>
  <b-art names="quint-models-find-races/mutant" wide/>
  <b-cap>Một bản sao đã bị làm hỏng của mô hình phải làm quy tắc kêu lên. Nếu nó lọt qua mà không có gì kích hoạt, quy tắc chẳng kiểm tra gì.</b-cap>
  <b-sublabel top="22">Kiểm tra tự động sau mỗi lần sửa mô hình</b-sublabel>
  <b-art names="quint-models-find-races/hook" wide/>
  <b-cap>Sau mỗi lần sửa mô hình, một phép kiểm tra chạy tự động. Nếu một quy tắc bị vi phạm, tác nhân nhận được chuỗi bước và sửa ngay mô hình hoặc mã.</b-cap>
  <b-rules cols="2">
    <rule icon="file-check" t="Phần đầu như một hợp đồng">Những quy tắc nào, cái gì phải thất bại, những tình huống nào phải xảy ra</rule>
    <rule icon="flask" t="Bản sao bị làm hỏng">Một quy tắc mà mã đã thỏa mãn phải thất bại trên bản sao có một khiếm khuyết</rule>
    <rule icon="eye" t="Tình huống phải xảy ra">“Nếu A thì B” vô nghĩa cho đến khi A đã xảy ra</rule>
    <rule icon="ban" t="Ngõ cụt">Chương trình lặng lẽ bỏ các lần chạy rơi vào ngõ cụt và in “ok”</rule>
    <rule icon="eye-wide" t="Ý định tách riêng">Điều người dùng muốn được ghi độc lập với trường đang được kiểm tra</rule>
    <rule icon="refresh-cw" t="Kiểm tra tự động">Một vi phạm quay về với tác nhân ngay sau khi sửa</rule>
  </b-rules>
  <b-why align="left">Mỗi dòng có nghĩa gì. “Phần đầu như một hợp đồng” nghĩa là đầu tệp liệt kê các quy tắc, các vi phạm mong đợi và các tình huống phải xảy ra. “Bản sao bị làm hỏng” kiểm tra rằng một quy tắc có khả năng kích hoạt hay không. “Tình huống phải xảy ra” bảo vệ khỏi các quy tắc “nếu A thì B” mà A chưa bao giờ xảy ra. “Ngõ cụt” là những trường hợp chương trình lặng lẽ bỏ một lần chạy và “ok” tự hiện ra.</b-why>
  <b-why align="left">Hai dòng cuối liên quan đến con người và tác nhân. “Ý định tách riêng” nghĩa là mong muốn của người dùng được ghi trong mô hình độc lập với trường đang được kiểm tra, nếu không quy tắc chỉ so một trường với chính nó. “Kiểm tra tự động” (thực chất là một [hook](/materials/glossary/hooks/)) nghĩa là tác nhân không thể quên chạy mô hình: nó tự chạy sau mỗi lần sửa.</b-why>
  <b-finding>
    <ex>Một mô hình xanh mà không có các phép kiểm tra này chẳng chứng minh gì: một quy tắc có thể đúng chỉ vì tình huống cần thiết không bao giờ xuất hiện.</ex>
    <gen>Mặc định chương trình trả lời “ok” cho một mẫu, không phải cho một chứng minh<b-proof href="https://apalache-mc.org/" quote="Apalache: the symbolic model checker for TLA+"/>.</gen>
    <do>Với mỗi quy tắc xanh ngay từ đầu, hãy viết một khiếm khuyết làm nó vỡ.</do>
  </b-finding>
</b-chapter>

<b-chapter id="human" icon="users" title="Con người can thiệp ở đâu">
  <b-why align="left">Mô hình kiểm tra bất cứ thứ gì viết được thành một danh sách điều kiện hữu hạn: bản ghi có biến mất không, người tham gia có bị lẫn không, ngõ cụt có lối ra không. Nhãn có rõ không, độ tiện dụng và cảm giác chung của một màn hình thì không mô tả được theo cách đó, nên con người đánh giá chúng trên bản mockup.</b-why>
  <b-art names="quint-models-find-races/boundary" wide/>
  <b-two-lists>
    <list icon="cpu" t="Mô hình kiểm tra" items="bản ghi có biến mất không|người tham gia có bị lẫn không|hành động nguy hiểm có yêu cầu xác nhận không|ngõ cụt có lối ra không"></list>
    <list icon="user" t="Con người kiểm tra" items="nhãn có rõ không|bảng điều khiển có quá tải không|việc chọn có tiện không|tiện ích mở rộng có cài được trên hồ sơ trống không"></list>
  </b-two-lists>
  <b-why align="left">Danh sách bên trái chứa mọi thứ có thể diễn đạt là “luôn luôn” hoặc “không bao giờ”: bản ghi không biến mất, người tham gia không bị lẫn, hành động nguy hiểm yêu cầu xác nhận. Mô hình kiểm tra các quy tắc như vậy một cách đầy đủ.</b-why>
  <b-why align="left">Danh sách bên phải chứa những thứ không có danh sách đặc điểm hữu hạn. Nhãn có rõ không là do người đọc quyết định. Vì vậy trong bảng yêu cầu, các dòng “cần con người kiểm tra” được đánh dấu từ trước và không cố hình thức hóa chúng.</b-why>
  <b-finding>
    <ex>Các quy tắc của màn hình cũng trở nên kiểm tra được: xác nhận, lý do trên nút bị vô hiệu, trạng thái trung thực.</ex>
    <gen>Gu thẩm mỹ và độ rõ ràng không có danh sách đặc điểm hữu hạn, nên chúng được kiểm tra trên bản mockup.</gen>
    <do>Đánh dấu trước các dòng “cần con người kiểm tra” trong bảng yêu cầu, để không phải đuổi theo một công thức.</do>
  </b-finding>
</b-chapter>

<b-chapter id="weak" icon="alert" title="Điểm yếu của kiểm chứng mô hình">
  <b-why align="left">Phương pháp có giới hạn, và nên biết chúng trước khi bắt đầu. Mô hình không tự đi theo mã, không kiểm tra “rồi sẽ xảy ra”, và chỉ thấy thế giới bạn đưa vào.</b-why>
  <b-rules cols="2">
    <rule icon="link" t="Không liên kết với mã">Mô hình viết bằng tay, nên trôi xa khỏi mã</rule>
    <rule icon="clock" t="Không kiểm tra “rồi sẽ”">Việc một lỗi cuối cùng cũng đến tay nhóm chỉ được kiểm tra gián tiếp</rule>
    <rule icon="scales" t="Thế giới tí hon">Một lỗi cần năm thực thể có thể lọt qua</rule>
    <rule icon="circle-dot" t="Màu xanh rỗng">Quy tắc đúng vì tính năng chưa có trong mã</rule>
  </b-rules>
  <b-why align="left">Không liên kết với mã: mô hình viết bằng tay, và không gì buộc nó đổi theo mã. Một tháng sau nó có thể mô tả thứ không còn tồn tại. Cách chữa: ghi trong phần đầu commit mà mô hình được lấy ra và cập nhật cùng với mã. Cách mạnh hơn là chạy các vết của mô hình qua handler thật, nhưng bước đó hiện chưa có. Một bài toán liên quan, giữ trạng thái mong muốn, mã và phép đo luôn khớp nhau, được nói trong bài về [vòng đối soát cho đặc tả](/blog/spec-reconcile-loop/).</b-why>
  <b-why align="left">Không kiểm tra “rồi sẽ”: việc một lỗi cuối cùng cũng đến tay nhóm chỉ được kiểm tra gián tiếp. Thế giới tí hon: một lỗi cần cùng lúc năm thực thể có thể lọt qua. Màu xanh rỗng: quy tắc chỉ đúng vì tính năng cần thiết chưa có trong mã, và màu xanh gây hiểu lầm.</b-why>
  <b-finding>
    <ex>Mô hình chỉ mô tả những gì bạn đưa vào, và nếu không đối chiếu với mã thì nó tụt lại phía sau.</ex>
    <gen>Bước tiếp theo trong lĩnh vực này là chạy các vết của mô hình qua handler thật và so sánh kết quả.</gen>
    <do>Ghi lại commit mà mô hình được lấy ra trong phần đầu của nó và cập nhật cùng với mã.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="Bắt đầu với Quint từ đâu: mô hình đầu tiên trong một buổi tối">
  <b-why align="left">Thứ tự cho buổi tối đầu tiên. Mở danh sách các lỗi đã sửa và chọn một lỗi có nguyên nhân là thứ tự hoặc thời điểm của các sự kiện. Ghi ra những bên tham gia và các hành động dẫn đến nó. Mô tả chúng trong một mô hình, chạy và chờ cho đến khi chương trình tự tìm ra chuỗi. Sau đó thêm bản sửa dưới một công tắc và đảm bảo quy tắc được giữ. Cuối cùng, cố ý làm hỏng mô hình và kiểm tra rằng quy tắc nhận ra.</b-why>
  <b-why align="left">Không cần mô hình hóa cả sản phẩm cùng lúc. Lấy một lỗi gần đây phải sửa hai lần hoặc do người dùng phát hiện. Mô tả các bên tham gia và hai hoặc ba hành động của nó trong một mô hình, chạy tìm kiếm, và đảm bảo chương trình tìm ra lỗi đó mà không cần gợi ý. Sau đó sửa và đảm bảo quy tắc được giữ.</b-why>
  <b-finding>
    <ex>Có thể viết mô hình đầu tiên trong một buổi tối nếu lấy một lỗi đã từng xảy ra.</ex>
    <gen>Lịch sử các lỗi đã sửa cho sẵn một danh sách quy tắc cho các mô hình tiếp theo.</gen>
    <do>Lấy lỗi đã sửa gần nhất của bạn và phát biểu quy tắc sẽ ngăn nó quay lại.</do>
  </b-finding>
</b-chapter>

<b-chapter id="agent" icon="cpu" title="Cách bắt đầu cùng tác nhân">
  <b-art names="quint-models-find-races/agent" wide/>
  <b-why align="left">**1. Cài Quint.** Tác nhân tự cài qua npm<b-proof href="https://github.com/informalsystems/quint" quote="The quickest way to install Quint is using npm."/>.</b-why>
  <b-prompt>
    Hãy tự cài Quint và đảm bảo nó chạy được.
  </b-prompt>
  <b-why align="left">**2. Yêu cầu trước, mã sau.** Như vậy [tác nhân](/materials/glossary/ai-agent/) mô tả thế giới trước và sửa mã sau.</b-why>
  <b-prompt>
    Đừng thay đổi mã. Hãy viết các yêu cầu bằng Quint cho [lĩnh vực].
    Với mỗi quy tắc, hiển thị hai phiên bản: như hiện tại và như phải có.
  </b-prompt>
  <b-why align="left">**3. Kiểm tra kết quả.**</b-why>
  <b-rules cols="2">
    <rule icon="swap" t="Hai phiên bản">Quy tắc bị vỡ ở “như hiện tại” và được giữ ở “như yêu cầu”</rule>
    <rule icon="eye" t="Tình huống cần thiết">Chúng xảy ra và không bị né tránh</rule>
    <rule icon="flask" t="Bản sao bị làm hỏng">Nó làm quy tắc kêu lên</rule>
    <rule icon="bug" t="Trường hợp thật">Mô hình tái hiện được nó</rule>
  </b-rules>
  <b-why align="left">**4. Logic và màn hình tách riêng.** Mặc định tác nhân lẫn lộn chúng: nó viết quy tắc màn hình như logic và bỏ sót các trường hợp trong logic.</b-why>
  <b-prompt>
    Hãy lập hai danh sách yêu cầu.
    1. Logic: chỉ “luôn luôn” và “không bao giờ”, do mô hình Quint kiểm tra.
    2. Màn hình: độ rõ ràng và tiện dụng, tôi sẽ tự kiểm tra trên mockup.
  </b-prompt>
</b-chapter>

<b-chapter id="faq" icon="chat" title="FAQ">
  <b-faq-cards>
    <q t="Quint là gì và dùng để làm gì?">Quint là ngôn ngữ để mô tả các trạng thái của một hệ thống, các hành động của nó và những quy tắc phải luôn đúng. Một chương trình thử mọi thứ tự hành động và chỉ ra chuỗi bước làm vỡ một quy tắc.</q>
    <q t="Làm sao tìm race condition và dữ liệu bị mất mà kiểm thử bỏ sót?">Mô tả các bên tham gia và hai hoặc ba hành động trong một mô hình rồi chạy tìm kiếm. Mô hình tìm ra các thứ tự như “kiểm tra, đăng xuất, gửi” mà không ai nghĩ đến việc viết thành kiểm thử.</q>
    <q t="Mô hình Quint có thay thế kiểm thử thông thường không?">Không, chúng trả lời những câu hỏi khác nhau. Kiểm thử bảo vệ một hàm, còn mô hình kiểm tra các quy tắc phụ thuộc vào thứ tự sự kiện; chuỗi bước mô hình tìm ra có thể thành một kiểm thử hồi quy ngắn.</q>
    <q t="Bắt đầu với Quint như thế nào?">Lấy một lỗi vừa sửa có nguyên nhân nằm ở thứ tự hoặc thời điểm của các sự kiện. Mô tả các bên tham gia và hai hoặc ba hành động, chạy tìm kiếm và kiểm tra rằng chương trình tự tìm ra lỗi.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Đọc thêm">
  <b-links>
    <item href="/blog/quint-vs-tests-and-tla/" k="So sánh" t="Kiểm chứng mô hình và kiểm thử: Quint, QUnit, TLA+">Quint khác QUnit, Jest và TLA+ ở đâu và nên chọn gì</item>
    <item href="/blog/agents-per-bounded-context/" k="Tác nhân" t="Cần bao nhiêu tác nhân AI">Một tác nhân cho mỗi bounded context</item>
    <item href="/blog/spec-reconcile-loop/" k="Đặc tả" t="Vòng đối soát cho đặc tả">Khép vòng giữa trạng thái mong muốn, mã và phép đo</item>
    <item href="/blog/specs-by-aggregates/" k="Đặc tả" t="Đặc tả theo aggregate">Một mục cho mỗi khái niệm, yêu cầu với MUST và SHOULD</item>
  <item href="/blog/tla-alloy-quint-compare/" k="So sánh" t="TLA+, Alloy hay Quint">Chọn ngôn ngữ đặc tả nào</item>
  </b-links>
</b-chapter>
<b-footer>Dữ kiện: các trường hợp được mô tả tính đến ngày 25 tháng 10 năm 2026, tài liệu của Quint và Apalache. Các con số trong ví dụ chỉ mang tính minh họa; mã của bạn sẽ khác.</b-footer>
</b-post>
