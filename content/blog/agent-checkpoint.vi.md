---
title: Kiểm tra công việc của tác nhân AI ở đâu: ở ranh giới aggregate, vì không ai kiểm tra được mọi chương trình (định lý Rice)
date: 2026-11-06
updated: 2026-11-13
description: Vì sao không có phép kiểm tra nào xác minh được mã của tác nhân bất kỳ theo quy tắc bất kỳ, ba cách làm cho phép kiểm tra hữu hạn, ranh giới aggregate từ event storming trở thành điểm kiểm tra thế nào, khả năng kiểm tra quyết định kích thước bounded context ra sao, và vì sao khung đầu tiên phải rẻ để dời đi.
tags: AI, tác nhân, DDD, aggregate, bounded context, event storming, định lý Rice, Quint, kiểm chứng mô hình
category: specs
layout: wide
math: true
mentions: Rice's theorem, halting problem, Gödel's incompleteness theorems, event storming, aggregate, invariant, bounded context, Quint, model checking, DDD
toc: answer=Tóm tắt | rice=Định lý Rice | ways=Ba khung | gate=Aggregate | size=Kích thước context | agile=Khung đầu tiên | godel=Gödel | faq=Câu hỏi | next=Đọc tiếp
---

Hãy đặt phép kiểm tra công việc của tác nhân AI (AI agent) ở ranh giới aggregate: nơi các lệnh đi vào, các sự kiện đi ra, và những quy tắc phải luôn đúng được ghi lại. Tác nhân viết mã bên trong ranh giới đó. Lý do là định lý Rice: không có phép kiểm tra nào xác minh được chương trình bất kỳ theo quy tắc hành vi bất kỳ, nên phép kiểm tra được thu hẹp vào một khung nơi câu trả lời hữu hạn. Phần dưới nói về lý do, ba cách thu hẹp phép kiểm tra và cách xác định kích thước một context.

<b-post series="agg">
<b-callout icon="bulb">**Đây là những suy ngẫm của tôi.** Bài viết là nỗ lực của tác giả để hiểu nên vạch ranh giới ở đâu khi làm việc với tác nhân AI và cách cắt một hệ thống thành các context; định lý Rice ở đây chỉ là phương tiện giúp kiểm tra một ranh giới đã vạch. Những nhận định có nguồn được đánh dấu bằng biểu tượng ↗ cạnh văn bản: phát biểu của định lý, định nghĩa, trích dẫn. Mọi thứ còn lại là kết luận và giả thuyết của tôi: ranh giới aggregate là nơi đặt phép kiểm tra, tiêu chí kích thước context, phép so sánh với CAP và với Gödel. Hãy đọc chúng như một quan điểm còn cần được kiểm chứng.</b-callout>

<b-hchain label="Chuỗi: định lý Rice, khung, aggregate, kích thước context">
  <step icon="alert-circle" t="Rice">không kiểm tra được tất cả</step>
  <step icon="ring-dot" t="Khung">thu hẹp phép kiểm tra</step>
  <step icon="cube" t="Aggregate">điểm kiểm tra</step>
  <step icon="workflow" sw="1.8" t="Context">kích thước theo khả năng kiểm tra</step>
</b-hchain>

<b-chapter id="answer" icon="shield-check" title="Tóm tắt: con người kiểm tra gì và tác nhân làm gì">
  <b-art names="agent-checkpoint/overview" wide/>
  <b-cap>Ba vùng làm việc với tác nhân: nơi nó tự do, nơi đặt phép kiểm tra và nơi con người quyết định.</b-cap>
  <b-why align="left"><b-icon name="cpu"/> **Bên trong aggregate là chỗ tác nhân làm việc.** Nó viết các handler lệnh, truy vấn cơ sở dữ liệu, lưu trữ dữ liệu và kiểm thử. Tác nhân có thể viết lại toàn bộ cấu trúc bên trong: tách một bảng làm hai, đổi truy vấn, làm lại việc xử lý. Chừng nào ranh giới còn giữ, con người không cần đọc từng dòng.</b-why>
  <b-why align="left"><b-icon name="shield-check"/> **Phép kiểm tra nằm trên ranh giới aggregate.** Đây là nơi ghi rõ aggregate nhận những lệnh nào, trao những sự kiện nào cho các aggregate lân cận và những quy tắc nào luôn đúng. Máy kiểm tra ranh giới này. Mô hình Quint là bản ghi các quy tắc của hệ thống bằng một ngôn ngữ đặc biệt, từ đó một chương trình thử mọi thứ tự lệnh có thể có và tìm thứ tự làm vỡ một quy tắc. Ràng buộc của cơ sở dữ liệu là các quy tắc mà cơ sở dữ liệu kiểm tra ở mỗi lần ghi, từ chối lưu bất cứ thứ gì bị cấm. Con người chỉ xem xét các thay đổi đối với chính ranh giới.</b-why>
  <b-why align="left"><b-icon name="workflow"/> **Con người giữ ranh giới context.** Những aggregate nào sống chung và nơi nghĩa của từ thay đổi thì không tính ra được từ mã: nó phụ thuộc vào các thay đổi trong tương lai. Vì vậy con người đặt khung này và dời nó dựa trên lịch sử chỉnh sửa và kế hoạch; xem thêm ở [“Khung đầu tiên”](#agile).</b-why>
  <b-finding>
    <ex>Aggregate “Đặt phòng họp”: lệnh “Đặt phòng”, sự kiện “BookingCreated”, quy tắc “các lượt đặt của một phòng không bao giờ chồng nhau”. Lưu trữ và xử lý chúng thế nào là việc của tác nhân.</ex>
    <gen>Con người giữ một danh sách ngắn các thứ trên ranh giới, và máy kiểm tra được danh sách đó đến cùng. Mọi thứ bên trong thay đổi tự do miễn là ranh giới còn nguyên.</gen>
    <do>Với dự án của bạn, chọn một aggregate và viết ba dòng cho ranh giới của nó: lệnh, sự kiện, quy tắc.</do>
  </b-finding>
</b-chapter>

<b-chapter id="rice" icon="alert-circle" title="Vì sao không kiểm tra được toàn bộ mã của tác nhân: định lý Rice">
  <b-why align="left">**Ý chính.** Dù phép kiểm tra mã của tác nhân khéo đến đâu, vẫn có mã mà nó sai. Henry Gordon Rice đã chứng minh điều này năm 1951<b-proof href="https://en.wikipedia.org/wiki/Rice%27s_theorem" quote="Wikipedia: “The theorem is named after Henry Gordon Rice, who proved it in his doctoral dissertation of 1951 at Syracuse University.”"/>.</b-why>

  - **Cái không kiểm tra được:** hành vi của chương trình, tức nó làm gì khi chạy. Ví dụ, “không bao giờ trừ tiền khi không có đơn hàng”<b-proof href="https://en.wikipedia.org/wiki/Rice%27s_theorem" quote="Wikipedia: “Rice's theorem states that all non-trivial semantic properties of programs are undecidable.”"/>.
  - **Điều kiện của định lý:** một số chương trình có thuộc tính đó và số khác thì không. Nếu tất cả hoặc không cái nào có, câu trả lời đã biết từ trước.
  - **Chi tiết, kèm chứng minh:** [“Định lý Rice bằng lời thường”](/blog/rice-theorem-explained/).

  <b-why align="left">**Hai loại câu hỏi về một chương trình.** Các nhà toán học gọi câu hỏi có/không là vị từ. Định lý chỉ loại trừ câu trả lời chính xác với loại thứ hai.</b-why>
  <b-vs-grid>
    <h></h>
    <h><b-icon name="file-text"/> Mã được viết thế nào</h>
    <h><b-icon name="play"/> Mã làm gì khi chạy</h>
    <c>**Ví dụ**</c>
    <c>mã có ghi vào bảng payments không?</c>
    <c>chương trình có bao giờ trừ tiền khi không có đơn hàng không?</c>
    <c>**Cần xem xét gì**</c>
    <c>văn bản của mã: hữu hạn</c>
    <c>mọi lần chạy với mọi đầu vào: vô hạn, có lần không bao giờ kết thúc</c>
    <c>**Câu trả lời**</c>
    <c>chính xác, bằng cách tìm trong mã</c>
    <c>nói chung là không thể</c>
  </b-vs-grid>
  <b-why align="left">**Một bước đi thực tế:** viết lại mã để một quy tắc quan trọng trở thành câu hỏi loại thứ nhất.</b-why>
  <b-art names="agent-checkpoint/rewrite-rule" wide/>
  <b-why align="left">**Một sự phân biệt tương tự** có giữa cách tiếp cận mệnh lệnh và khai báo. Mã mệnh lệnh mô tả các bước, và nói chung không thể biết kết quả từ chúng. Một ký pháp khai báo đơn giản, như ràng buộc của cơ sở dữ liệu, nêu kết quả phải là gì, và cơ sở dữ liệu thực thi nó.</b-why>
  <iso-art name="term:rice-predicate"></iso-art>
  <b-cap>Mã giống nhau. Câu hỏi về văn bản được giải quyết bằng cách đọc một văn bản hữu hạn; câu hỏi về hành vi đòi hỏi phải đi qua mọi lần chạy.</b-cap>
  <b-why align="left">Vì sao không thể trả lời câu hỏi về hành vi cho mọi chương trình được trình bày từng bước trong bài [“Định lý Rice bằng lời thường”](/blog/rice-theorem-explained/).</b-why>
  <b-finding>
    <ex>Tác nhân mang đến 2.000 dòng. Phép kiểm tra rằng “mã này không bao giờ tạo các lượt đặt chồng nhau” là không thể với mã bất kỳ nói chung, dù cải tiến đến đâu.</ex>
    <gen>Còn lại một lựa chọn: kiểm tra ít hơn tất cả, hoặc kiểm tra trong một khung nơi câu trả lời hữu hạn. Không có cách thứ ba, và điều này đúng với kiểm tra bằng chương trình lẫn review của con người.</gen>
    <do>Với một quy tắc bạn muốn kiểm tra trong công việc của tác nhân, hãy hỏi: trong khung nào câu trả lời là chính xác? Nếu không có khung nào, quy tắc chỉ được kiểm tra trên ví dụ.</do>
  </b-finding>
</b-chapter>

<b-chapter id="ways" icon="ring-dot" title="Ba cách làm cho phép kiểm tra hữu hạn">
  <b-why align="left">Vì không có phép kiểm tra chính xác cho mọi chương trình, phép kiểm tra được giới hạn để nó không còn phủ mọi chương trình. Có ba cách: thu nhỏ thế giới được kiểm tra, thu hẹp ngôn ngữ viết mã, hoặc để phép kiểm tra trung thực trả lời “không biết”. Sơ đồ đặt cả ba cạnh nhau.</b-why>
  <b-art names="agent-checkpoint/three-ways" wide/>
  <b-cap>Trái, thử trọn vẹn một thế giới nhỏ; giữa, một đường ghi vào cơ sở dữ liệu; phải, ba câu trả lời của phép kiểm tra, câu thứ ba chuyển cho con người.</b-cap>
  <b-why align="left">Chi tiết hơn, kèm chứng minh vì sao mỗi cách gỡ bỏ điều cấm, có trong [“Định lý Rice bằng lời thường”](/blog/rice-theorem-explained/#frames).</b-why>
  <b-subhead>Trong thực tế trông thế nào: một quy tắc, ba phép kiểm tra</b-subhead>
  <b-why align="left">Lấy quy tắc “các lượt đặt của một phòng không bao giờ chồng nhau về thời gian” và một tác nhân viết mã đặt phòng. Dưới đây, với mỗi cách: viết gì, chạy gì và kết quả ra sao.</b-why>
  <b-why align="left"><b-icon name="package"/> **Thu nhỏ thế giới: mô hình Quint.** Quy tắc và các hành động của hệ thống được viết thành một mô tả ngắn, không có mã thật. Trạng thái là ảnh chụp dữ liệu tại một thời điểm: có những lượt đặt nào, cho phòng nào, từ lúc nào đến lúc nào. Các hành động là “đặt” và “hủy”. Quy tắc là một dòng: với hai lượt đặt bất kỳ của cùng một phòng, một lượt kết thúc trước khi lượt kia bắt đầu.</b-why>
  <b-codebox title="Quy tắc trong mô hình Quint">
    val noOverlap = bookings.forall(a => bookings.forall(b =>
      a == b or a.room != b.room or a.end <= b.start or b.end <= a.start))
  </b-codebox>
  <b-why align="left">Sau đó chương trình thử mọi chuỗi hành động cho một thế giới nhỏ: 3 phòng, tối đa 5 lượt đặt. Nếu quy tắc vỡ ở đâu đó, nó in ra chuỗi bước. Ví dụ: hai khách đặt phòng 2 cho khung 10:00–11:00 cùng lúc, cả hai phép kiểm tra “còn trống không” đều qua trước khi bên nào ghi, và cơ sở dữ liệu có hai lượt đặt cho cùng một khung. Chuỗi đó chính là phát hiện: lỗi thiết kế lộ ra trước khi tác nhân viết bất kỳ dòng mã nào. Thế giới nhỏ là đủ vì những lỗi như vậy xuất hiện chỉ với hai hoặc ba lượt đặt.</b-why>
  <b-why align="left"><b-icon name="list-check"/> **Thu hẹp ngôn ngữ: quy tắc trong cơ sở dữ liệu và một bên ghi duy nhất.** Quy tắc chuyển đến nơi chính cơ sở dữ liệu giữ nó. Trong PostgreSQL đây là một ràng buộc trên bảng bookings: cơ sở dữ liệu từ chối lưu một lượt đặt có thời gian chồng lên lượt đặt khác của cùng phòng.</b-why>
  <b-codebox title="Ràng buộc PostgreSQL">
    CREATE EXTENSION IF NOT EXISTS btree_gist;
    ALTER TABLE bookings ADD CONSTRAINT no_overlap
      EXCLUDE USING gist (room_id WITH =, tstzrange(starts_at, ends_at) WITH &&);
  </b-codebox>
  <b-why align="left">Nửa thứ hai là bên ghi duy nhất: chỉ một module được ghi vào bảng bookings. Điều này được kiểm tra bằng cách tìm trong văn bản mã ở mỗi lần tác nhân sửa. Lệnh dưới đây tìm mọi tệp ghi vào bảng bookings trừ tệp được phép; kết quả rỗng nghĩa là “không có đường vòng”.</b-why>
  <b-codebox title="Phép kiểm tra “bên ghi duy nhất” bằng tìm trong mã">
    grep -rl "INSERT INTO bookings" src | grep -v src/booking/repository.ts
  </b-codebox>
  <b-why align="left">Câu hỏi “mã của tác nhân có thể tạo các lượt đặt chồng nhau không” đã trở thành hai câu hỏi về văn bản: ràng buộc có trong lược đồ cơ sở dữ liệu không, và có không có lệnh ghi nào đi vòng qua nó. Cả hai đều có câu trả lời chính xác.</b-why>
  <b-why align="left"><b-icon name="help-circle"/> **Cho phép “không biết”: ba kết luận về một lần sửa của tác nhân.** Phép kiểm tra với một lần sửa của tác nhân được xây từ hai cách trước và trả về một trong ba câu trả lời. “Đúng”: mô hình Quint qua, ràng buộc cơ sở dữ liệu có mặt, tìm kiếm không thấy lệnh ghi đi vòng. “Vỡ”: tìm kiếm thấy tác nhân thêm lệnh ghi vào bảng bookings từ module báo cáo. “Không xác định được”: tác nhân ghép truy vấn cơ sở dữ liệu từ chuỗi ngay lúc chạy, và tìm kiếm văn bản không biết nó ghi vào bảng nào. Khi đó lần sửa được gắn nhãn “cần con người” và một lập trình viên xem xét. Con người chỉ mất thời gian ở trường hợp thứ ba.</b-why>
  <b-why align="left">Mỗi câu trong ba câu trả lời chỉ chính xác trong phạm vi của nó. Tìm kiếm chứng minh quy tắc đúng trong mô hình với 3 phòng và 5 lượt đặt, không phải trong cơ sở dữ liệu thật với hàng nghìn lượt đặt. Tìm trong mã chứng minh không có lệnh ghi đi vòng qua quy tắc, không chứng minh bản thân ràng buộc cơ sở dữ liệu được viết đúng. Câu trả lời “đúng” là chính xác, nhưng một số lần sửa vẫn chuyển cho con người. Vì vậy các cách được dùng cùng nhau: mô hình kiểm tra thiết kế trước khi có mã, ràng buộc và tìm kiếm kiểm tra chính mã, và con người xem những gì còn lại có nhãn.</b-why>
  <b-why align="left">Còn một lựa chọn thứ tư, phổ biến nhất trong thực tế: luôn trả lời, nhưng đôi khi sai. Kiểm thử bằng ví dụ và review mã bằng một mô hình khác hoạt động theo cách này. Đó cũng là lựa chọn chấp nhận được, nhưng phải có chủ ý: ổn ở nơi lỗi rẻ, không ổn với tiền và quyền truy cập. Một ngã rẽ tương tự được biết đến từ định lý CAP về hệ thống phân tán: khi mạng bị chia cắt, máy chủ hoặc chờ hoặc trả lời từ một bản sao cũ. Chúng có một điểm chung — khi một sự kiện chưa xảy ra, không thể biết nó sẽ xảy ra sau này hay không bao giờ, dù chờ bao lâu — nhưng lý do khác nhau; chi tiết trong [“Định lý Rice bằng lời thường”](/blog/rice-theorem-explained/#cap).</b-why>
  <b-finding>
    <ex>Quy tắc “các lượt đặt không bao giờ chồng nhau”: mô hình Quint đã thử mọi thứ tự lệnh cho 3 phòng, ràng buộc cơ sở dữ liệu cấm chồng lấn, và linter, chương trình kiểm tra văn bản mã theo các quy tắc đặt sẵn, đảm bảo chỉ một module ghi vào bảng bookings.</ex>
    <gen>“Không xác định được” là một kết quả kiểm tra trung thực. Nó cho thấy khung kết thúc ở đâu và trách nhiệm quay về với con người, nên nó xác định rủi ro nào được chấp nhận.</gen>
    <do>Với mỗi quy tắc, đánh dấu cách nào trong ba cách giữ nó. Quy tắc không có dấu chỉ được kiểm tra bằng các kiểm thử ví dụ.</do>
  </b-finding>
</b-chapter>

<b-chapter id="gate" icon="cube" title="Aggregate như điểm kiểm tra: event storming mang lại gì">
  <b-why align="left">Event storming là định dạng workshop trong đó một nhóm trải lĩnh vực kinh doanh ra thành các sự kiện<b-proof href="https://www.eventstorming.com/" quote="eventstorming.com: “EventStorming is a flexible workshop format for collaborative exploration of complex business domains.”"/>. Sau đó mỗi aggregate có bốn thứ: các lệnh làm thay đổi nó, các sự kiện nó phát ra, các read model dùng để xem nó, và các invariant, tức những quy tắc đúng ở mọi trạng thái.</b-why>
  <iso-art name="term:aggregate"></iso-art>
  <b-why align="left">Bốn thứ này tạo nên ranh giới nơi phép kiểm tra phù hợp. Mọi thay đổi đi qua các lệnh, mọi thứ các aggregate lân cận thấy rời đi dưới dạng sự kiện, và các quy tắc nằm ở một chỗ. Đây đúng là cách thứ hai ở mục trước: chỉ aggregate ghi vào bảng của nó, nên không mã nào khác phá được quy tắc, và chỉ còn một thứ để kiểm tra: không có gì khác ghi vào bảng đó.</b-why>
  <b-art names="agent-checkpoint/gate" wide/>
  <b-cap>Điểm kiểm tra nằm nơi các lệnh đi vào và các sự kiện đi ra. Bên trong ranh giới tác nhân tự do.</b-cap>
  <b-why align="left">Bảng đi từng hàng: phần nào trong bốn phần của aggregate nằm trên ranh giới và được máy cùng con người kiểm tra, phần nào ở bên trong và do tác nhân làm mà không cần review từng dòng.</b-why>
  <b-vs-grid>
    <h></h>
    <h>Trên ranh giới (được kiểm tra)</h>
    <h>Bên trong (tác nhân làm)</h>
    <c>**Lệnh**</c>
    <c>có những lệnh nào và chúng nhận gì</c>
    <c>cách xử lý chúng</c>
    <c>**Sự kiện**</c>
    <c>những sự kiện nào đi ra và với trường nào</c>
    <c>khi nào và cách dựng chúng</c>
    <c>**Invariant**</c>
    <c>mô hình Quint, ràng buộc cơ sở dữ liệu</c>
    <c>mã không phá chúng</c>
    <c>**Read model**</c>
    <c>chúng hiển thị gì</c>
    <c>cách dựng chúng cho nhanh</c>
  </b-vs-grid>
  <b-finding>
    <ex>Tác nhân chuyển kho lưu các lượt đặt từ một bảng sang hai bảng. Ranh giới vẫn như cũ: cùng các lệnh và sự kiện, mô hình Quint qua, ràng buộc cơ sở dữ liệu giữ. Review của con người quy về một câu hỏi: ranh giới có bị đụng đến không?</ex>
    <gen>Khi ranh giới đã được ghi ra, việc kiểm tra thay đổi của tác nhân trở nên hữu hạn: so sánh ranh giới trước và sau. Mã bên trong có thể kiểm tra chọn mẫu.</gen>
    <do>Tạo một tệp ranh giới cho aggregate: lệnh, sự kiện, invariant, read model. Bất kỳ thay đổi nào trong tệp đó cần con người review; thay đổi bên trong thì không.</do>
  </b-finding>
</b-chapter>

<b-chapter id="size" icon="workflow" title="Xác định kích thước bounded context: theo khả năng kiểm tra">
  <b-why align="left">Đi từ lĩnh vực kinh doanh đến các bounded context là phần khó nhất của DDD. Những dấu hiệu quen thuộc của một ranh giới: một từ bắt đầu mang nghĩa khác, nhóm thay đổi, các quy tắc không còn phải cùng đúng một lúc.</b-why>
  <b-callout icon="list-check">**Tiêu chí kích thước context.** Một context đủ nhỏ nếu mô hình Quint về các quy tắc của nó có thể được tìm kiếm đến cùng với số nhỏ và hoặc nói “quy tắc đúng” hoặc chỉ ra một vi phạm. Nếu tìm kiếm không kết thúc, nên tách context. Tiêu chí suy ra từ định lý Rice: câu trả lời chính xác chỉ có thể có ở nơi số biến thể hữu hạn và thử được tất cả.</b-callout>
  <b-why align="left">**Cách áp dụng tiêu chí cho dự án của bạn.** Lấy một phần của hệ thống mà bạn coi là context ứng viên, như “đặt phòng”, và kiểm tra bằng năm bước.</b-why>

  1. **Liệt kê quy tắc và hành động.** Quy tắc là những gì phải luôn đúng: “các lượt đặt của một phòng không bao giờ chồng nhau”. Hành động là các lệnh thay đổi dữ liệu: “đặt”, “hủy”.
  2. **Viết chúng thành mô hình Quint.** Trạng thái là có những lượt đặt nào; hành động là cách chúng thay đổi trạng thái; quy tắc là các phép kiểm tra sau mỗi bước. Đó là vài chục dòng, không có mã thật.
  3. **Chọn số nhỏ.** 2–3 đối tượng mỗi loại: 3 phòng, 5 lượt đặt, 2 khách. Thường thế là đủ để các tổ hợp xấu điển hình xuất hiện: hai lượt đặt của một phòng, hai khách trong cùng một phút. Không có đảm bảo: lỗi cần nhiều đối tượng hơn sẽ lọt qua.
  4. **Chạy tìm kiếm với giới hạn thời gian,** chẳng hạn 10 phút.
  5. **Đọc kết quả theo bảng dưới.** Tìm kiếm kết thúc, không có vi phạm: kích thước phù hợp. Kết thúc và chỉ ra một vi phạm: kích thước phù hợp, nhưng quy tắc hoặc hành động có lỗi cần sửa. Không kết thúc trong giới hạn: có quá nhiều trạng thái, và ứng viên được tách ra.

  <b-callout icon="alert-circle">**Không có ước lượng.** Các con số ở đây chỉ là hướng dẫn, không phải ngưỡng đã đo. Chưa ai đo, cho tiêu chí này, bao nhiêu đối tượng là đủ để bắt lỗi của một context hay giới hạn thời gian nào nên coi là “quá lớn”. Hãy chọn cho dự án của bạn và ghi lại các số mà mô hình đã được kiểm tra với.</b-callout>

  <b-codebox title="Chạy tìm kiếm cho mô hình đặt phòng">
    quint verify booking.qnt --invariant=noOverlap --max-steps=10
  </b-codebox>
  <b-why align="left">**Cách tách nếu tìm kiếm không kết thúc.** Với mỗi quy tắc, ghi ra nó đụng đến dữ liệu nào. Các quy tắc không có dữ liệu chung được đưa vào các phần khác nhau: “các lượt đặt không bao giờ chồng nhau” chỉ đụng đến lượt đặt, “một hóa đơn không bao giờ được thanh toán hai lần” chỉ đụng đến hóa đơn. Giữa các phần, để lại các sự kiện như “BookingCreated”. Rồi kiểm tra từng phần bằng cùng năm bước.</b-why>
  <b-art names="agent-checkpoint/size" wide/>
  <b-cap>Nếu mô hình của một context trả lời “không xác định được”, context bị tách, và giữa các phần chỉ còn các sự kiện.</b-cap>
  <b-why align="left">Cách dùng dấu hiệu này: viết các quy tắc của context thành mô hình Quint, đặt số nhỏ và chạy tìm kiếm. Kết quả rơi vào một trong các hàng của bảng, và cột cuối cho biết làm gì tiếp.</b-why>
  <b-table>

| Dấu hiệu | Ý nghĩa | Làm gì |
|---|---|---|
| <b-status-dot color="accent">Mô hình qua ở số nhỏ</b-status-dot> | mô hình được kiểm tra đến cùng, không có vi phạm | giữ nguyên |
| <b-status-dot color="warn">Mô hình không kết thúc</b-status-dot> | quá nhiều trạng thái | tách theo các quy tắc không cần cùng đúng |
| <b-status-dot color="warn">Không viết được quy tắc nếu không có thế giới bên ngoài</b-status-dot> | ranh giới đặt sai chỗ | chuyển thế giới bên ngoài ra ngoài ranh giới và giao tiếp với nó bằng sự kiện |
| <b-status-dot color="accent">Giữa các phần chỉ có sự kiện</b-status-dot> | các phần không đụng đến dữ liệu của nhau | mỗi phần có mô hình riêng và tác nhân riêng |

  </b-table>
  <b-finding>
    <ex>Đặt phòng, thanh toán và thông báo trong một mô hình: tìm kiếm không kết thúc trong một giờ. Chỉ đặt phòng và chỉ thanh toán, nối với nhau bằng sự kiện “BookingCreated”: mỗi mô hình qua trong vài giây.</ex>
    <gen>Kích thước context thôi là chuyện khẩu vị: nếu các quy tắc bên trong không kiểm tra được đến cùng, context quá lớn hoặc các quy tắc của nó được viết bằng ngôn ngữ quá mạnh. Thêm về một tác nhân cho mỗi context trong [cần bao nhiêu tác nhân AI](/blog/agents-per-bounded-context/).</gen>
    <do>Viết mô hình Quint của context lớn nhất của bạn với số nhỏ. Nếu tìm kiếm không kết thúc, hãy tìm các quy tắc không cần cùng đúng và vạch ranh giới giữa chúng.</do>
  </b-finding>
</b-chapter>

<b-chapter id="agile" icon="refresh" title="Khung đầu tiên: vì sao nó sẽ sai và cách làm cho nó rẻ">
  <b-callout icon="help-circle">**Một câu hỏi mở.** Việc chọn khung hoạt động thế nào vẫn chưa hoàn toàn rõ; mục này ghi lại một giả thuyết sơ bộ cho các bài sau. Giả thuyết: việc chọn khung chạm vào cùng cái lõi chung với định lý CAP và định lý Rice — khi một sự kiện chưa xảy ra, không thể biết nó sẽ xảy ra sau này hay không bao giờ, dù chờ bao lâu; ở đây sự kiện là một thay đổi buộc phải đổi khung: tháng sau nó có đến hay không bao giờ đến thì không thể biết trước. Lõi đó được nói trong [“Mối liên hệ với định lý CAP”](/blog/rice-theorem-explained/#cap). Hiện chưa đủ dữ kiện hay ví dụ đã kiểm chứng để ủng hộ nó, nên phần còn lại của mục này nên đọc như một bản phác cần được kiểm tra. Đó là một hướng cho nghiên cứu tiếp theo.</b-callout>
  <b-art names="agent-checkpoint/frame-question" wide/>
  <b-cap>Khung được vạch quanh các lượt đặt và phòng. Nếu thay đổi tiếp theo là về lượt đặt và phòng, khung phù hợp. Nếu là về lượt đặt và hóa đơn, nó vượt qua ranh giới và khung phải dời. Cái nào sẽ đến thì bây giờ không thể biết: đó là câu hỏi mở.</b-cap>
  <b-why align="left">**Những gì còn cần tìm hiểu:**</b-why>

  - liệu việc chọn khung có thể được phát biểu chặt chẽ như một bài toán thiếu thông tin, như đã làm với CAP, hay sự giống nhau chỉ nằm ở lời nói;
  - lịch sử các thay đổi trong quá khứ dự đoán các thay đổi tương lai tốt đến đâu: chưa có phép đo, chỉ có quan sát từ từng dự án;
  - chu kỳ xem xét lại khung dài bao lâu thì hiệu quả: hai tuần dưới đây là một ví dụ, không phải con số đã kiểm chứng;
  - hai câu hỏi liên hệ với nhau thế nào: một phần nên lớn bao nhiêu (định lý Rice giúp ở đây) và vạch ranh giới của nó ở đâu (cần thông tin về tương lai).

  <b-why align="left">Việc chọn khung chạm vào một điều cấm khác với định lý Rice. Phép kiểm tra mã có đủ thông tin, toàn bộ mã nằm trước mặt nó, nhưng không tính ra được câu trả lời từ đó. Khung thì thiếu chính thông tin. Một khung tốt là khung nơi các thay đổi tương lai sẽ sống, và không có dữ liệu về tương lai trong mã hay ở đâu khác. Đây đúng là vị trí của máy chủ trong định lý CAP: nó không biết điều gì xảy ra ở láng giềng bên kia đường truyền đã đứt, và ở đây không ai biết những thay đổi nào sẽ đến vào tháng sau.</b-why>
  <b-why align="left">Vì vậy các lối ra cũng giống như trong CAP. Không thể chờ cho đến khi tương lai được biết: công việc diễn ra bây giờ. Còn lại là trả lời ngay bây giờ bằng những gì có sẵn và sẵn sàng sai. “Những gì có sẵn” là hai phép xấp xỉ tương lai: lịch sử các thay đổi trong quá khứ, cho thấy cái gì thường đổi cùng nhau, và kế hoạch của bạn, mà chỉ bạn biết. Và lối ra thứ ba của CAP, giới hạn thời gian, ở đây biến thành các chu kỳ ngắn của agile: đặt khung cho hai tuần, xem các thay đổi sống trong đó thế nào, rồi dời nó. Vì khung dù sao cũng sẽ sai, điều quan trọng là dời nó rẻ.</b-why>
  <b-why align="left">Định lý Rice vẫn có mặt trong mục này, ở một vai trò khác. Nó không giúp đoán tương lai, nhưng cho một phép kiểm tra đối với khung đã chọn: nếu mô hình Quint về các quy tắc của một phần có thể được tìm kiếm đến cùng, phần đó đủ nhỏ; nếu không, nên tách. Dấu hiệu đó đã được nói ở mục về kích thước context.</b-why>

  <b-subhead>Các phần đầu tiên đến từ đâu</b-subhead>
  <b-why align="left">Không cần biết trước các phần: lần cắt đầu đến từ những gì đã có, và con người chỉ đặt tên cho các phần và sửa các chỗ còn tranh cãi.</b-why>
  <b-table>

| Đã có gì | Lần cắt đầu | Sau đó |
|---|---|---|
| <b-icon name="git-branch"/> Lịch sử thay đổi | các bảng hầu như luôn đổi trong cùng các commit được gộp thành một phần | đối chiếu lần cắt với các epic trong backlog |
| <b-icon name="list-check"/> Quy tắc dữ liệu, không có lịch sử | các bảng được nhắc đến trong cùng một quy tắc đi vào cùng một phần | so với lịch sử sau vài chục commit đầu tiên |
| <b-icon name="sparkle"/> Không có gì, bắt đầu từ đầu | một phần cho mỗi khái niệm chính: dự án, báo cáo, epic, quyền truy cập | so với lịch sử sau vài chục commit đầu tiên và dời |

  </b-table>
  <b-why align="left">Gộp theo quy tắc hoạt động thế nào. Liệt kê các quy tắc dữ liệu, ví dụ “một epic đã đóng không có báo cáo mở”, “một token chỉ thấy các dự án của nó”. Nếu một quy tắc nhắc đến hai bảng, chúng vào cùng một phần. Các nhóm thu được là lần cắt đầu tiên.</b-why>
  <b-art names="agent-checkpoint/first-cut" wide/>
  <b-cap>Các nhóm bảng được gộp là lần cắt đầu tiên. Một bảng mà ai cũng cần trở thành lõi dùng chung.</b-cap>
  <b-why align="left">Ở nơi một quy tắc gắn gần như mọi thứ với nhau, như trạng thái báo cáo mà cả epic lẫn bảng điều khiển đều cần, bảng đó trở thành lõi dùng chung với một chủ sở hữu. Các phần khác chỉ với tới nó qua chủ sở hữu đó. Chỉ lõi ghi vào bảng trạng thái, nên cả epic lẫn bảng điều khiển đều không phá được quy tắc về trạng thái.</b-why>
  <b-finding>
    <ex>Epic và báo cáo vào một phần, token và dự án vào phần khác, còn trạng thái báo cáo trở thành lõi. Một tháng sau lịch sử cho thấy tệp của dự án và epic được sửa trong cùng các commit: dự án chuyển sang epic.</ex>
    <gen>Khung sai thì rẻ để sửa: chuyển một bảng sang phần khác là sửa một dòng, sau đó chính các phép kiểm tra cho thấy mọi thứ tốt lên hay xấu đi. Vì không đoán trước được khung, nó được giữ ở trạng thái dễ dời.</gen>
    <do>Nhờ tác nhân đối chiếu lần cắt với lịch sử thay đổi và backlog.</do>
  </b-finding>
</b-chapter>

<b-chapter id="godel" icon="bulb" title="Gödel nằm ở đâu: chỉ như một phép tương tự">
  <b-why align="left">Mối liên hệ giữa định lý bất toàn của Gödel và chủ đề này là giả định của riêng tôi; tôi chưa tìm thấy nguồn nào vạch ra nó. Lý do: chứng minh của cả Gödel lẫn Rice đều dựa trên cùng một mẹo, một chương trình hoặc công thức nói về chính nó. Nhưng định lý thứ nhất của Gödel nói về các hệ hình thức trong đó có thể thực hiện số học sơ cấp<b-proof href="https://en.wikipedia.org/wiki/G%C3%B6del%27s_incompleteness_theorems" quote="Wikipedia: “Any consistent formal system F within which a certain amount of elementary arithmetic can be carried out…”"/>, và không nói gì về ranh giới của một lĩnh vực kinh doanh. Với lập luận về kiểm tra tác nhân, kết quả chính xác là định lý Rice.</b-why>
  <b-why align="left">Định lý thứ hai hữu ích như một phép tương tự: hệ như vậy không thể tự chứng minh tính nhất quán của chính nó<b-proof href="https://en.wikipedia.org/wiki/G%C3%B6del%27s_incompleteness_theorems" quote="Wikipedia: “The second incompleteness theorem, an extension of the first, shows that no such system can demonstrate its own consistency.”"/>. Dịch sang công việc của tác nhân: tác nhân không thể tự xác nhận mình đã làm đúng; nó cần một người kiểm tra nằm ngoài khung của nó. Đây là một hình ảnh, không có kết luận toán học nào đằng sau.</b-why>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Nên kiểm tra công việc của tác nhân AI ở đâu?">Ở ranh giới aggregate: trên các lệnh, sự kiện và những quy tắc phải luôn đúng. Máy kiểm tra được ranh giới đó đến cùng, và tác nhân viết mã bên trong nó.</q>
    <q t="Vì sao không thể kiểm tra toàn bộ mã của tác nhân?">Định lý Rice: không có chương trình nào nói chính xác, với mọi đoạn mã, rằng nó có vi phạm quy tắc hành vi hay không. Vì vậy phép kiểm tra được đặt trong một khuôn khổ: thế giới nhỏ, ngôn ngữ hẹp hoặc câu trả lời trung thực “không biết”. Chi tiết nằm trong bài về định lý Rice.</q>
    <q t="Xác định kích thước bounded context như thế nào?">Ngoài sự dịch chuyển nghĩa của từ và nhóm, có một dấu hiệu kiểm tra được: mô hình các quy tắc của context nên kết thúc ở số nhỏ. Nếu không, context được tách theo các quy tắc không cần cùng đúng.</q>
    <q t="Chọn khung đầu tiên thế nào khi chưa có lịch sử thay đổi?">Các bảng được nhắc đến trong cùng một quy tắc dữ liệu đi vào cùng một phần, và nếu chưa có quy tắc nào, hãy bắt đầu với một phần cho mỗi khái niệm chính. Sau vài chục commit đầu tiên, đối chiếu lần cắt với lịch sử và dời nó.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Đọc tiếp">
  <b-links>
    <item href="/blog/specs-by-aggregates/" k="Đặc tả" t="Đặc tả theo aggregate">thẻ aggregate và các mức yêu cầu</item>
    <item href="/blog/agents-per-bounded-context/" k="Tác nhân" t="Cần bao nhiêu tác nhân AI">một tác nhân cho mỗi bounded context</item>
    <item href="/blog/quint-vs-tests-and-tla/" k="Kiểm tra" t="Kiểm chứng mô hình và kiểm thử">Quint, QUnit và TLA+</item>
    <item href="/blog/quint-models-find-races/" k="Mô hình" t="Tìm race condition">mô hình Quint trong thực tế</item>
    <item href="/blog/rice-theorem-explained/" k="Lý thuyết" t="Định lý Rice bằng lời thường">vị từ, chứng minh, ba khung</item>
  </b-links>
</b-chapter>
<b-footer>Dữ kiện: tính đến ngày 6 tháng 11 năm 2026, từ Wikipedia (các định lý Rice và Gödel) và eventstorming.com. Ví dụ đặt phòng chỉ mang tính minh họa.</b-footer>
</b-post>
