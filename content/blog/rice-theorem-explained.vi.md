---
title: Định lý Rice là gì: vì sao không có phép kiểm tra nào đúng cho mọi chương trình và cách xử lý
date: 2026-11-06
updated: 2026-11-08
description: Định lý Rice nói gì và vì sao việc kiểm tra hành vi của chương trình đụng phải bài toán dừng. Vị từ về văn bản và về hành vi, chứng minh qua ví dụ thanh toán, mối liên hệ với nghịch lý người thợ cạo và ba khung giúp phép kiểm tra trở nên chính xác.
tags: định lý Rice, bài toán dừng, nghịch lý người thợ cạo, vị từ, kiểm chứng hình thức, Quint, DDD, tác nhân AI
category: specs
layout: wide
math: true
mentions: Rice's theorem, CAP theorem, chaos engineering, fail-fast, Kubernetes, halting problem, barber paradox, Russell's paradox, Alan Turing, predicate, undecidability, declarative approach, imperative approach, model checking, ubiquitous language, bounded context
toc: essence=Ý chính | predicate=Lối thoát 1: văn bản mã | small-model=Lối thoát 2: mô hình | human=Lối thoát 3: con người | proof=Chứng minh | root=Mẹo này từ đâu ra | frames=Ba khung | cap=Liên hệ với CAP | faq=Câu hỏi | next=Đọc tiếp
---

Định lý Rice nói rằng không có chương trình nào luôn cho biết đúng, với mọi chương trình khác, nó sẽ hành xử ra sao, chẳng hạn có trừ tiền khi không có đơn hàng hay không. Chương trình nào cũng có thể nhúng một chương trình khác, và khi đó câu trả lời phụ thuộc vào việc chương trình được nhúng có kết thúc hay không, điều mà không chương trình nào quyết định được. Vì vậy trong thực tế câu hỏi được thu hẹp lại: kiểm tra văn bản mã, kiểm tra một mô hình nhỏ của các quy tắc, hoặc giao ca khó cho con người.

<b-post series="agg">
<b-hchain label="Chuỗi: Russell 1901, Turing 1936, Rice 1951, khung">
  <step icon="help-circle" t="Russell, 1901">tập hợp có là phần tử của chính nó không?</step>
  <step icon="cpu" t="Turing, 1936">chương trình có dừng không?</step>
  <step icon="alert-circle" t="Rice, 1951">tương tự cho mọi hành vi</step>
  <step icon="ring-dot" t="Khung">nơi việc kiểm tra có tác dụng</step>
</b-hchain>

<b-chapter id="essence" icon="alert-circle" title="Ý chính: định lý Rice cấm điều gì">
  <b-why align="left">Điều bị cấm là một bộ kiểm tra duy nhất cho mọi chương trình cùng lúc: với một chương trình cụ thể thì thường vẫn tìm được câu trả lời. Ở dạng chặt chẽ, định lý nói rằng không chương trình nào có thể kiểm tra một tính chất về hành vi mà một số chương trình có còn số khác không có<b-proof href="https://en.wikipedia.org/wiki/Rice%27s_theorem" quote="Wikipedia: “Rice's theorem states that all non-trivial semantic properties of programs are undecidable.”"/>. Henry Gordon Rice đã chứng minh nó trong luận án năm 1951<b-proof href="https://en.wikipedia.org/wiki/Rice%27s_theorem" quote="Wikipedia: “The theorem is named after Henry Gordon Rice, who proved it in his doctoral dissertation of 1951 at Syracuse University.”"/>.</b-why>
  <b-why align="left">Hiểu điều này theo cách đời thường. Hình dung một người kiểm tra được đưa cho một chương trình bất kỳ và được hỏi: “Nó có bao giờ trừ tiền khi không có đơn hàng không?”. Người kiểm tra có thể thông minh tùy ý, làm việc bao lâu tùy ý và biết mọi ngôn ngữ lập trình. Định lý nói rằng vẫn có một chương trình mà người đó trả lời sai hoặc không bao giờ trả lời. Đây là đặc tính của chính bài toán, và việc cải tiến bộ kiểm tra không gỡ được nó, cũng như cải tiến thiết kế không tạo ra được động cơ vĩnh cửu. Trong sơ đồ bên dưới, bộ kiểm tra là khối lập phương màu xanh: nó xét từng chương trình và trả lời “giữ được” hoặc “phá vỡ” cho mỗi chương trình. Chương trình màu cam bên phải được xây dựng nhắm vào đúng phép kiểm tra này, từ chính văn bản của nó: với chương trình đó câu trả lời sai hoặc không bao giờ đến. Phép kiểm tra khác sẽ có chương trình “của riêng nó” như vậy.</b-why>
  <iso-art name="term:rice-theorem"></iso-art>
  <b-why align="left">Hình dung bạn thêm một phép kiểm tra tự động vào cửa hàng. Nó đọc mọi thay đổi của mã thanh toán và trả lời: “thay đổi này sẽ không bao giờ trừ tiền khi không có đơn hàng” hoặc “sẽ có”. Để phép kiểm tra này đáng tin, nó cần ba điều, được đánh số trong sơ đồ bên dưới.</b-why>

  1. **Câu trả lời về hành vi.** Phép kiểm tra phải nói mã sẽ làm gì khi chạy: nó có trừ tiền dù chỉ ở một trong tất cả các giao dịch sẽ đi qua nó hay không. Các giao dịch đó không bao giờ hết, và test không thử hết được.
  2. **Một phép kiểm tra cho mọi thay đổi.** Không thể thu hẹp trước loại mã nào sẽ đến: phép kiểm tra hoạt động với bất kỳ mã nào được đưa vào, kể cả mã viết ra để đánh lừa nó.
  3. **Câu trả lời cho mọi thay đổi.** Chỉ có “sẽ trừ” hoặc “không trừ”, không có “không biết”: phép kiểm tra trước khi merge chỉ có thể cho thay đổi đi qua hoặc chặn lại.

  <b-why align="left">Ngoài ba điều này, câu trả lời còn phải đúng: “không trừ” nghĩa là “chắc chắn không trừ”. Có những phép kiểm tra luôn trả lời nhưng đôi khi sai: test và heuristic. Chúng hữu ích nhưng không thể tin tuyệt đối, và từ đây chỉ bàn về các phép kiểm tra đúng.</b-why>

  <b-why align="left">Định lý Rice nói: không tồn tại phép kiểm tra đúng có đủ cả ba tính chất; với một thay đổi nào đó nó sẽ sai hoặc không trả lời. Trong sơ đồ đó là thanh màu cam. Bỏ đi một tính chất bất kỳ thì phép kiểm tra đúng trở nên khả thi, nhưng cho một câu hỏi đã thu hẹp. Bỏ tính chất nào là lựa chọn trong thực tế: phần dưới của sơ đồ cho thấy ba phương án.</b-why>
  <b-lane title="Ba tính chất của phép kiểm tra" color="accent">
  <b-scene names="rice-theorem-explained/conditions"/>
  <b-pick-tabs id="rice-cond" group="rice-k" tone="accent">
    <tab t="Về hành vi">
    </tab>
    <tab t="Mọi thay đổi">
    </tab>
    <tab t="Luôn có câu trả lời">
    </tab>
  </b-pick-tabs>
  </b-lane>
  <b-table id="rice-wishes">

| <label for="rice-cond1"><b-icon name="play"/> 1. Về hành vi</label> | <label for="rice-cond2"><b-icon name="file-text"/> 2. Mọi thay đổi</label> | <label for="rice-cond3"><b-icon name="help-circle"/> 3. Luôn có câu trả lời</label> |
|---|---|---|
| **Ý nghĩa:** mã sẽ làm gì trong mọi giao dịch tương lai | **Ý nghĩa:** một phép kiểm tra cho mọi mã, kể cả mã viết ra để đánh lừa | **Ý nghĩa:** chỉ “có” hoặc “không”, không có “không biết” |
| **Lập trình viên thấy gì:** người review đoán xem thay đổi có thể trừ tiền cho đơn hàng nào đó không | **Lập trình viên thấy gì:** một linter hoặc một mô hình review cho mọi thay đổi | **Lập trình viên thấy gì:** phép kiểm tra trước khi merge chỉ cho qua hoặc chặn thay đổi |
| **Nếu bỏ — văn bản mã:** một lệnh tìm kiếm kiểm tra rằng chỉ module thanh toán ghi vào bảng thanh toán | **Nếu bỏ — mô hình nhỏ:** quy tắc thanh toán cho 3 đơn hàng và 2 khách hàng, thử mọi biến thể; nó kiểm tra mô hình quy tắc, còn mã được kiểm tra riêng | **Nếu bỏ — con người:** với thay đổi khó, phép kiểm tra trả lời “không biết”, và lập trình viên xem xét nó |

  </b-table>
  <b-why align="left">Chọn một cạnh của tam giác: hai tính chất ở hai đầu cạnh được giữ, tính chất thứ ba bị bỏ. Các tab ở đây và dưới sơ đồ tính chất được liên kết với nhau: số tab là số tính chất, và cột tương ứng trong bảng phía trên sáng lên.</b-why>
  <b-lane title="Bỏ tính chất nào" color="accent">
  <b-scene names="rice-theorem-explained/triangle"/>
  <b-pick-tabs id="rice-tri" group="rice-k" tone="accent">
    <tab t="Văn bản mã">
    </tab>
    <tab t="Mô hình nhỏ">
    </tab>
    <tab t="Con người">
    </tab>
  </b-pick-tabs>
  </b-lane>

  <b-why align="left">**Con đường thứ tư, nằm ngoài tam giác,** là luôn trả lời nhưng đôi khi sai. Test và chaos engineering hoạt động theo cách này: các sự cố cố ý gây ra trên môi trường production cho thấy hệ thống có trụ được không. Đó là kiểm tra bằng ví dụ và không chứng minh được cho mọi trường hợp.</b-why>
  <b-callout icon="bulb">**Ghi chú cho người thiết kế theo DDD.** Trong DDD, hệ thống được chia thành các bounded context, tức các phần có từ vựng riêng, ví dụ “Thanh toán”. Để lập luận cho đơn giản, hãy lấy một mô hình nhỏ mô tả một context: trạng thái của các aggregate, lệnh là các hành động và invariant là các phép kiểm tra sau mỗi bước, tất cả với số nhỏ. Mô hình này phù hợp để lập luận về ranh giới và kích thước của context: nếu mô hình của một context không thể thử hết ngay cả với số nhỏ, context đó có lẽ quá lớn. Nó không bảo đảm context hoạt động đúng. Mã có thể lệch khỏi mô hình, nên mã được kiểm tra riêng: bằng ràng buộc cơ sở dữ liệu, test và tìm kiếm trong mã. Một lỗi chỉ xuất hiện với một nghìn đơn hàng sẽ không lộ ra trong mô hình ba đơn hàng. Và mô hình không nói gì về những thứ chưa được đưa vào: read model, hệ thống bên ngoài, thời gian. Tín hiệu về kích thước là giả thuyết của tác giả; xem thêm ở [“Kiểm tra công việc của tác nhân AI ở đâu”](/blog/agent-checkpoint/#size).</b-callout>
  <b-finding>
    <ex>Một thay đổi đến với 2.000 dòng mã thanh toán. Không linter (chương trình kiểm tra văn bản mã theo các quy tắc đặt sẵn), mô hình review hay chương trình nào khác có thể bảo đảm nó không bao giờ trừ tiền khi không có đơn hàng, nếu đòi hỏi cả ba tính chất cùng lúc.</ex>
    <gen>Đây là giới hạn của chính bài toán. Chừng nào phép kiểm tra phải trả lời về hành vi, về mọi thay đổi và luôn luôn, không có “không biết”, thì với một thay đổi nào đó nó sẽ sai hoặc không bao giờ trả lời, dù cải tiến thế nào.</gen>
    <do>Với mỗi quy tắc quan trọng, chọn bỏ một trong ba tính chất: kiểm tra văn bản mã, thử một mô hình quy tắc nhỏ và kiểm tra mã riêng so với nó, hoặc giao các thay đổi khó cho con người.</do>
  </b-finding>
</b-chapter>

<b-chapter id="predicate" icon="list-check" title="Lối thoát 1. Văn bản mã: hỏi về cách viết thay vì hành vi">
  <b-why align="left">Ở đây bỏ tính chất 1, “về hành vi”: câu hỏi mã sẽ làm gì được thay bằng câu hỏi mã được viết ra sao. Cách này hiệu quả vì câu hỏi về mã có hai loại, và định lý chỉ loại trừ câu trả lời chính xác cho một loại.</b-why>

  - **Mã được viết thế nào:** “mã có ghi vào bảng thanh toán không?”. Để trả lời, chỉ cần đọc từng dòng, và số dòng hữu hạn.
  - **Mã sẽ làm gì:** “nó có bao giờ trừ tiền khi không có đơn hàng không?”. Để trả lời, cần kết quả của mọi lần chạy với mọi đơn hàng, và chúng không bao giờ hết.

  <b-why align="left">**Điều này liên quan thế nào đến các cách tiếp cận phát triển:**</b-why>

  - **Mã imperative** mô tả từng bước, và quy tắc về kết quả nảy sinh từ chúng, nên phải kiểm tra theo hành vi. Đó là hàng dưới của sơ đồ.
  - **Ký pháp declarative** nêu điều gì phải đúng: ràng buộc cơ sở dữ liệu “không có thanh toán nếu không có đơn hàng”. Hành vi của nó thấy ngay trong ký pháp, nên kiểm tra văn bản là chính xác. Đó là hàng trên. Kubernetes hoạt động tương tự: một tệp mô tả trạng thái mong muốn, và hệ thống tự giữ trạng thái đó.
  - **Chaos engineering** kiểm tra hành vi trên production: cố ý gây sự cố cho hệ thống đang chạy để xem nó có trụ được không. Nó trả lời câu hỏi của hàng dưới chỉ cho những sự cố đã dàn dựng, không phải cho mọi lần chạy.

  <b-why align="left">Câu hỏi có/không như vậy gọi là vị từ (predicate). Sơ đồ đặt cả hai câu hỏi cho cùng một đoạn mã: hàng trên về văn bản, hàng dưới về hành vi.</b-why>
  <iso-art name="term:rice-predicate"></iso-art>
  <b-vs-grid>
    <h></h>
    <h><b-icon name="file-text"/> Viết thế nào</h>
    <h><b-icon name="play"/> Kết quả ra sao</h>
    <c>**Câu hỏi**</c>
    <c>mã có ghi vào bảng thanh toán không?</c>
    <c>chương trình có bao giờ trừ tiền khi không có đơn hàng không?</c>
    <c>**Cần xét gì**</c>
    <c>các dòng mã; hữu hạn, đọc hết được</c>
    <c>mọi lần chạy với mọi đầu vào; vô hạn, có lần không bao giờ kết thúc</c>
    <c>**Câu trả lời**</c>
    <c>luôn có</c>
    <c>nói chung là không</c>
  </b-vs-grid>
  <b-why align="left">“Câu hỏi về hành vi” nghĩa là gì. Câu hỏi như vậy chỉ phụ thuộc vào việc chương trình làm gì chứ không phụ thuộc vào cách nó được viết. Nếu hai chương trình hành xử như nhau với mọi đầu vào, chúng có cùng câu trả lời cho câu hỏi về hành vi. Ví dụ: một chương trình cộng các giao dịch bằng vòng lặp, chương trình kia bằng hàm thư viện. Văn bản khác nhau, hành vi giống nhau, và “tổng có thể âm không” có một câu trả lời chung. Nhưng “mã có chứa vòng lặp không” có câu trả lời khác nhau, vì đó là câu hỏi về văn bản.</b-why>
  <b-table>

| Câu hỏi | Về | Quyết định được? |
|---|---|---|
| hàm có hơn 50 dòng không | văn bản | có, bằng cách đếm |
| mã có gọi `delete` không | văn bản | có, bằng tìm kiếm |
| có ghi vào bảng đơn hàng ngoài một module không | văn bản | có, bằng tìm kiếm, nếu truy vấn không được dựng tại chỗ |
| chương trình có kết thúc với mọi đầu vào không | hành vi | nói chung là không |
| hàm có bao giờ trả về tổng âm không | hành vi | nói chung là không |
| handler có trừ tiền khi không có đơn hàng không | hành vi | nói chung là không |

  </b-table>
  <b-finding>
    <ex>“Chỉ module thanh toán ghi vào bảng thanh toán” là câu hỏi về văn bản; một lệnh tìm kiếm trong mã kiểm tra được. “Một khoản thanh toán không bao giờ đi qua khi không có đơn hàng” là câu hỏi về hành vi.</ex>
    <gen>Câu hỏi về hành vi thường có thể thay bằng câu hỏi về văn bản nếu mã được viết sao cho chỉ một chỗ có thể phá quy tắc, ví dụ một tệp duy nhất ghi vào bảng thanh toán.</gen>
    <do>Viết lại các quy tắc quan trọng để chúng trở thành câu hỏi về văn bản: một nơi ghi duy nhất cho mỗi bảng, ràng buộc cơ sở dữ liệu, quy tắc nằm ở một chỗ.</do>
  </b-finding>
</b-chapter>

<b-chapter id="small-model" icon="package" title="Lối thoát 2. Mô hình nhỏ: thử tất cả, nhưng với số nhỏ">
  <b-why align="left">Ở đây bỏ tính chất 2, “mọi thay đổi”. Thứ được kiểm tra là một mô tả ngắn của các quy tắc thanh toán chứ không phải mã, và chỉ với số nhỏ: 3 đơn hàng và 2 khách hàng. Các biến thể trở nên hữu hạn, và một chương trình thử hết đến cùng.</b-why>
  <b-art names="rice-theorem-explained/small-model" wide/>

  1. **Trạng thái:** những đơn hàng nào tồn tại, mỗi đơn đã bị trừ tiền bao nhiêu lần, mỗi khách hàng đã kiểm tra đơn nào.
  2. **Hành động:** “tạo đơn hàng”, “kiểm tra đơn chưa thanh toán”, “trừ tiền”.
  3. **Quy tắc:** không thanh toán khi không có đơn hàng và không trừ tiền hai lần, kiểm tra sau mỗi bước.
  4. **Tìm kiếm:** mọi thứ tự hành động cho 3 đơn hàng và 2 khách hàng.

  <b-vs-grid>
    <h></h>
    <h><b-icon name="check"/> Bắt được</h>
    <h><b-icon name="alert-circle"/> Không thấy</h>
    <c>**Ở đâu**</c>
    <c>lỗi trong thiết kế quy tắc, trước khi có mã</c>
    <c>lỗi trong chính mã: mô hình không đọc nó</c>
    <c>**Ví dụ**</c>
    <c>hai khách hàng cùng thanh toán một đơn hàng vào cùng một lúc</c>
    <c>sự cố chỉ xuất hiện với một nghìn đơn hàng</c>
  </b-vs-grid>
  <b-why align="left">**Vì sao tìm kiếm kết thúc được.** Mô hình có hữu hạn trạng thái: mỗi trong 3 đơn hàng được tạo hoặc chưa, bị trừ tiền nhiều nhất hai lần, và mỗi trong 2 khách hàng giữ nhiều nhất một khoản thanh toán đã bắt đầu. Mỗi hành động chuyển mô hình từ trạng thái này sang trạng thái khác. Một chương trình đi qua mọi trạng thái đạt tới được và kiểm tra quy tắc sau mỗi bước. Lệnh cấm của định lý không áp dụng ở đây: ta kiểm tra một mô tả cụ thể trong một thế giới hữu hạn, còn định lý nói về chương trình bất kỳ.</b-why>
  <b-codebox title="Mô hình thanh toán trong Quint">
    module payments {
      val ORDERS = Set(1, 2, 3)
      val CLIENTS = Set(1, 2)
      var orders: Set[int]     // created orders
      var paid: int -> int     // order → times charged
      var pending: int -> int  // customer → checked order (0 — none)
      action init = all {
        orders' = Set(), paid' = ORDERS.mapBy(o => 0), pending' = CLIENTS.mapBy(c => 0),
      }
      action createOrder(o: int): bool = all {
        not(orders.contains(o)),
        orders' = orders.union(Set(o)), paid' = paid, pending' = pending,
      }
      // step 1: the order exists and is unpaid
      action check(c: int, o: int): bool = all {
        pending.get(c) == 0, orders.contains(o), paid.get(o) == 0,
        pending' = pending.set(c, o), orders' = orders, paid' = paid,
      }
      // step 2: charge money
      action charge(c: int): bool = all {
        pending.get(c) != 0,
        paid' = paid.setBy(pending.get(c), n => n + 1),
        pending' = pending.set(c, 0), orders' = orders,
      }
      action step = {
        nondet o = ORDERS.oneOf()
        nondet c = CLIENTS.oneOf()
        any { createOrder(o), check(c, o), charge(c) }
      }
      val noPaymentWithoutOrder = ORDERS.forall(o => paid.get(o) > 0 implies orders.contains(o))
      val noDoubleCharge = ORDERS.forall(o => paid.get(o) <= 1)
    }
  </b-codebox>
  <b-codebox title="Thử mọi thứ tự trong tối đa 10 bước">
    quint verify payments.qnt --invariant=noDoubleCharge --max-steps=10
  </b-codebox>
  <b-why align="left">Trong mô tả này, phép kiểm tra “đơn hàng chưa thanh toán” và việc trừ tiền là hai bước riêng. Tìm kiếm tìm ra một chuỗi năm bước: đơn hàng được tạo, khách 1 kiểm tra nó, khách 2 kiểm tra nó, cả hai cùng trừ tiền, và một đơn hàng bị trừ tiền hai lần. Cách sửa là lặp lại phép kiểm tra ngay trong bước trừ tiền: `paid.get(pending.get(c)) == 0`. Sau đó tìm kiếm không thấy vi phạm nào. 10 bước bao trùm cả mô hình: chuỗi dài nhất của nó là 10 bước, sau đó không hành động nào được phép.</b-why>
  <b-why align="left">**Vì sao số nhỏ là đủ.** Phần lớn lỗi trong quy tắc lộ ra ngay với hai hoặc ba đối tượng: hai khách hàng và một đơn hàng, một đơn hàng và một lần hủy giữa chừng. Đây là quan sát chứ không phải bảo đảm: lỗi cần nhiều đối tượng hơn sẽ lọt qua tìm kiếm như vậy.</b-why>
  <b-table>

| Lỗi | Thấy được với 3 đơn hàng và 2 khách hàng? |
|---|---|
| hai khách hàng thanh toán một đơn hàng cùng một lúc | có: hai khách hàng là đủ |
| tiền bị trừ sau khi đơn hàng đã hủy | có: một đơn hàng là đủ |
| số tiền tràn ở một triệu đơn hàng | không: cần số lớn |
| mã bỏ qua một phép kiểm tra mà mô hình có | không: mô hình không đọc mã |

  </b-table>
  <b-why align="left">Vậy mô hình nhỏ kiểm tra thiết kế, còn mã được giữ bằng các phương tiện khác: ràng buộc cơ sở dữ liệu từ chối thanh toán không có đơn hàng, và test so sánh mã với mô hình trên các ví dụ.</b-why>
  <b-why align="left">**Liên hệ với bounded context.** Mô hình thường được viết cho một bounded context, chẳng hạn “Thanh toán”, nhưng mấu chốt của lối thoát này là số nhỏ: chính chúng làm cho tìm kiếm hữu hạn. Xem thêm ghi chú về DDD trong phần “Ý chính”.</b-why>
  <b-finding>
    <ex>Tìm kiếm ra một chuỗi: hai khách hàng bấm “thanh toán” cùng lúc, cả hai phép kiểm tra “đơn hàng chưa thanh toán” đều qua trước khi bất kỳ lần trừ tiền nào xảy ra, và tiền bị trừ hai lần.</ex>
    <gen>Mô hình nhỏ bắt lỗi thiết kế trước khi có mã, nhưng mã được kiểm tra riêng: bằng test, ràng buộc cơ sở dữ liệu và tìm kiếm trong mã.</gen>
    <do>Với các quy tắc về tiền, viết một mô hình nhỏ bằng <a href="/blog/quint-models-find-races/">Quint</a> và chạy tìm kiếm trước mỗi lần phát hành.</do>
  </b-finding>
</b-chapter>

<b-chapter id="human" icon="help-circle" title="Lối thoát 3. “Không biết” → con người: câu trả lời thứ ba trung thực">
  <b-why align="left">Ở đây bỏ tính chất 3, “luôn có câu trả lời”. Phép kiểm tra xét mọi thay đổi, nhưng có ba câu trả lời thay vì hai. Câu thứ ba, “không biết”, nghĩa là một con người xem xét thay đổi đó.</b-why>
  <b-art names="rice-theorem-explained/human" wide/>
  <b-table>

| Câu trả lời | Khi nào | Tiếp theo |
|---|---|---|
| <b-status-dot color="accent">đúng</b-status-dot> | thanh toán chỉ đi qua module thanh toán | thay đổi được cho qua |
| <b-status-dot color="warn">vi phạm</b-status-dot> | tìm thấy việc ghi vào bảng thanh toán bỏ qua module | thay đổi bị chặn |
| <b-status-dot color="warn">không biết</b-status-dot> | truy vấn cơ sở dữ liệu ghép từ các mẩu văn bản tại chỗ, lời gọi vào thư viện của người khác | nhãn “cần người xem” |

  </b-table>
  <b-why align="left">**Vì sao câu trả lời thứ ba gỡ được lệnh cấm.** Chứng minh của định lý dựng một chương trình mà phép kiểm tra buộc phải nói “có” hoặc “không” và cả hai câu trả lời đều sai. Nếu cho phép “không biết”, phép kiểm tra trả lời như vậy với chương trình này, và không còn mâu thuẫn. Cái giá duy nhất: phép kiểm tra cũng sẽ nói “không biết” với một số thay đổi bình thường.</b-why>
  <b-why align="left">**Vì sao “không biết” tốt hơn đoán.** Phép kiểm tra có thể sai theo hai cách: bỏ sót vi phạm hoặc báo động giả. “Không biết” cố ý chọn cách thứ hai: thà lập trình viên xem thêm một thay đổi còn hơn để khách hàng bị trừ tiền hai lần.</b-why>
  <b-table>

| Ca khó | Vì sao phép kiểm tra không chắc |
|---|---|
| truy vấn cơ sở dữ liệu ghép từ các mẩu văn bản | tên bảng chỉ xuất hiện lúc chạy |
| hàm được gọi theo tên lưu trong biến | văn bản không cho thấy hàm nào sẽ chạy |
| lời gọi vào thư viện của người khác không có mã nguồn | không thấy được bên trong diễn ra gì |
| mã được viết và chạy tại chỗ | không có văn bản để kiểm tra cho đến khi nó chạy |

  </b-table>
  <b-codebox title="Trông như thế nào trong phép kiểm tra trước khi merge">
    payments-rule  holds       src/billing/charge.ts
    payments-rule  broken      src/admin/refund.ts:18  write to payments bypassing the module
    payments-rule  don't know  src/reports/export.ts:42  query glued from strings → needs a person
  </b-codebox>
  <b-why align="left">**Giữ “không biết” ở mức hiếm.** Mỗi “không biết” tốn thời gian của một người. Nếu có nhiều, mã được đơn giản hóa để phép kiểm tra thấy nhiều hơn: truy vấn vào bảng thanh toán được viết nguyên khối, không ghép chuỗi, và các lời gọi tới dịch vụ thanh toán nằm trong một module. Đó chính là lối thoát 1: một số ca khó biến thành câu hỏi về văn bản.</b-why>
  <b-why align="left">**Một ý tưởng tương tự: fail-fast.** Fail-fast dừng chương trình ngay khi có lỗi, trong lúc nó chạy. “Không biết” dừng một thay đổi đáng ngờ sớm hơn nữa, trước khi merge, và giao nó cho con người.</b-why>
  <b-finding>
    <ex>Một thay đổi ghép truy vấn cơ sở dữ liệu từ các mẩu văn bản. Phép kiểm tra không biết nó ghi vào bảng nào, trả lời “không biết”, và một lập trình viên xem thay đổi đó.</ex>
    <gen>“Đúng” và “vi phạm” là chính xác, và cái giá là thời gian của con người cho câu trả lời thứ ba.</gen>
    <do>Đặt “không biết” thành một trạng thái riêng của phép kiểm tra với nhãn “cần người xem”. Lặng lẽ cho một thay đổi khó đi qua sẽ biến nó thành lỗi.</do>
  </b-finding>
</b-chapter>

<b-chapter id="proof" icon="workflow" title="Chứng minh trên một ví dụ">
  <iso-art name="term:rice-proof"></iso-art>

  Ý tưởng của chứng minh là quy dẫn. Nếu giải được một bài toán, thì cũng giải được bài toán khác đã biết là không giải được. Vậy bài toán thứ nhất cũng không giải được. Ở đây bài toán thứ nhất là kiểm tra một quy tắc hành vi, bài toán thứ hai là bài toán dừng.

  Ký hiệu: $P$ là chương trình bất kỳ, $w$ là dữ liệu nó được chạy với, $P(w)$ là việc chạy $P$ trên $w$. Bài toán dừng là bài toán cho biết, với mọi $P$ và $w$, $P(w)$ có bao giờ kết thúc không.

  Lấy chương trình $P$ bất kỳ với đầu vào $w$ và dựng từ nó một chương trình mới $Q$:

  Q(x) là: chạy $P(w)$; khi nó kết thúc, chạy $B(x)$.

  $$Q(x) \;=\; P(w);\, B(x)$$

  Ở đây $x$ là dữ liệu $Q$ được chạy với. Bước $B(x)$ phá quy tắc, còn chương trình chạy mãi thì không. Vậy $Q$ chỉ đến được chỗ vi phạm nếu $P(w)$ có kết thúc.

  Tức là: $Q$ phá quy tắc ⇔ $P(w)$ dừng.

  Nếu tồn tại phép kiểm tra quy tắc cho mọi chương trình, thì với $Q$ nó cũng trả lời được $P(w)$ có dừng hay không. Nhưng Alan Turing, trong một bài báo năm 1936 (đăng năm 1937), đã chứng minh rằng không chương trình nào trả lời được câu hỏi đó, tức bài toán dừng<b-proof href="https://en.wikipedia.org/wiki/Halting_problem" quote="Wikipedia: “Alan Turing proved in 1937 that the halting problem is undecidable.”"/>. Vậy cũng không có phép kiểm tra quy tắc phổ quát. Quy tắc có thể là gì cũng được: mọi tính chất hành vi có câu trả lời khác nhau đều thay được cho “tiền khi không có đơn hàng”.

  Các bước tương tự theo thứ tự:

  1. Lấy một quy tắc hành vi bất kỳ mà một số chương trình phá còn số khác không. Vậy có một chương trình phá nó. Phần của chương trình đó phá quy tắc là bước $B$.
  2. Lấy chương trình $P$ bất kỳ và đầu vào $w$ mà câu hỏi đặt ra là $P(w)$ có dừng không.
  3. Ghép $Q$: trước hết $P(w)$, sau đó $B$. Việc ghép là một thủ tục máy móc đơn giản mà bạn viết được trong một phút.
  4. Đưa $Q$ cho phép kiểm tra phổ quát tưởng tượng. Câu trả lời “phá” nghĩa là “$P(w)$ đã dừng”, còn “không phá” nghĩa là “không dừng”.
  5. Đó là lời giải cho bài toán dừng, mà lời giải không tồn tại. Vậy phép kiểm tra phổ quát cũng không tồn tại.

  Một lưu ý cho chính xác. Cách dựng giả định rằng chương trình chạy mãi và không làm gì thì không phá quy tắc. Nếu với một quy tắc nào đó điều này không đúng, hãy lấy quy tắc đối lập: kiểm tra nó không dễ hơn, và lập luận lặp lại từng chữ.


  <b-finding>
    <ex>Một handler thanh toán hoạt động thế này: trước tiên gọi phép tính giảm giá từ thư viện của người khác, sau đó trừ tiền mà không kiểm tra đơn hàng có tồn tại không. Nó có phá quy tắc hay không chỉ phụ thuộc vào việc phép tính giảm giá có kết thúc: nếu nó treo mãi thì không bao giờ tới được bước trừ tiền.</ex>
    <gen>Để trả lời chính xác từ mã, phép kiểm tra phải quyết định phép tính đó có dừng không. Đó là cùng một sơ đồ: $P(w)$ là phép tính giảm giá, $B$ là việc trừ tiền khi không có đơn hàng.</gen>
    <do>Đóng quy tắc như vậy bằng một khung: ràng buộc cơ sở dữ liệu từ chối ghi khoản trừ tiền khi không có đơn hàng, bất kể mã trước đó đã làm gì.</do>
  </b-finding>
</b-chapter>

<b-chapter id="root" icon="bulb" title="Mẹo này từ đâu ra: bài toán dừng và nghịch lý người thợ cạo">
  <b-why align="left">Chứng minh định lý Rice quy bài toán dừng về phép kiểm tra hành vi: nếu tồn tại phép kiểm tra hành vi thì nó cũng giải được bài toán dừng. Vậy phép kiểm tra thừa hưởng tính không quyết định được. Còn bài toán dừng được chứng minh bằng một mẹo hơn một trăm năm tuổi: câu hỏi về chính mình.</b-why>
  <iso-art name="term:halting-problem/2"></iso-art>
  <b-why align="left">Giả sử có một thẩm phán cho biết, với mọi chương trình, nó có dừng không. Viết một chương trình phản nghịch: nó hỏi thẩm phán về chính mình rồi làm điều ngược lại. Nếu thẩm phán nói “dừng”, chương trình phản nghịch lặp mãi; nếu nói “sẽ không dừng”, chương trình phản nghịch dừng ngay. Thẩm phán sai trong cả hai trường hợp, nên nó không thể tồn tại.</b-why>
  <iso-art name="term:barber-paradox"></iso-art>
  <b-why align="left">Mẹo tương tự nằm trong nghịch lý người thợ cạo, một phiên bản sinh động của nghịch lý Russell năm 1901. Dân làng chia thành tập $A$, những người tự cạo râu, và tập $B$, những người được thợ cạo cạo, và ai cũng thuộc đúng một tập. Người thợ cạo không có chỗ: nếu ở trong $A$ thì ông rơi vào $B$, nếu ở trong $B$ thì ông rơi vào $A$. Russell có điều tương tự về tập hợp: $R$ là tập của mọi tập hợp không chứa chính nó, tức $R = \{x : x \notin x\}$. $R$ có là phần tử của chính nó không? Nếu có, theo định nghĩa nó không được phép; nếu không, nó phải có: $R \in R \iff R \notin R$.</b-why>
  <b-table>

| Năm | Ai | Gì | Mẹo |
|---|---|---|---|
| 1901 | Bertrand Russell | tập của mọi tập hợp không chứa chính nó | nó có là phần tử của chính nó không? |
| 1936 | Alan Turing | không thẩm phán nào cho biết được mọi chương trình có dừng không | chương trình phản nghịch hỏi về chính mình |
| 1951 | Henry Gordon Rice | không có phép kiểm tra nào cho mọi tính chất hành vi có câu trả lời khác nhau | quy bài toán dừng về phép kiểm tra, như trong chứng minh ở trên |

  </b-table>
  <b-why align="left">Vì sao câu hỏi về chính mình mạnh đến vậy. Chương trình cũng là văn bản, nên có thể đưa cho một chương trình khác và thậm chí cho chính nó. Hễ bộ kiểm tra nói được về mọi chương trình, nó cũng phải nói được về chương trình hỏi nó về chính mình rồi làm điều ngược lại. Khi đó câu trả lời nào nó đưa ra cũng sai. Cùng một nước đi xuất hiện trong nghịch lý người thợ cạo, nghịch lý Russell và định lý bất toàn của Gödel (trong mọi hệ quy tắc nhất quán, cho bởi một danh sách tiên đề và đủ mô tả số học, có những mệnh đề không chứng minh cũng không bác bỏ được).</b-why>
</b-chapter>

<b-chapter id="frames" icon="ring-dot" title="Làm gì: ba khung trong đó câu trả lời là chính xác">
  <iso-art name="term:rice-frames"></iso-art>
  <b-why align="left">Định lý cấm một phép kiểm tra đúng kết hợp ba điều kiện từ phần đầu: câu hỏi **về hành vi**, **mọi chương trình**, **luôn có câu trả lời** “có” hoặc “không”. Lệnh cấm đã đúng ngay với một câu hỏi hành vi duy nhất. Chứng minh dựa vào cả ba: nó dựng chương trình $Q$ mà phép kiểm tra phải chấp nhận, đặt một câu hỏi hành vi về nó, và đòi câu trả lời dứt khoát. Mỗi cách bỏ một điều kiện, và chứng minh không còn chạy.</b-why>
  <b-table>

| Cách | Làm gì trong thực tế | Vì sao câu trả lời chính xác | Mất gì |
|---|---|---|---|
| <b-icon name="package"/> Thế giới nhỏ | viết mô hình Quint cho đặt phòng: 3 phòng, tối đa 5 lượt đặt, hành động “đặt” và “hủy”. Một chương trình thử mọi chuỗi các hành động này đến độ dài đặt trước và sau mỗi bước kiểm tra quy tắc “các lượt đặt của một phòng không bao giờ chồng nhau” | có hữu hạn biến thể, nên tìm kiếm đi đến cùng và hoặc nói “quy tắc đúng”, hoặc chỉ ra chuỗi bước làm nó vỡ | lỗi chỉ xuất hiện với 50 lượt đặt đồng thời sẽ không thấy được bởi tìm kiếm với 5 |
| <b-icon name="list-check"/> Ngôn ngữ hẹp | quy tắc được viết thành ràng buộc PostgreSQL, và chỉ tệp `booking/repository.ts` được ghi vào bảng đặt phòng. Với mỗi thay đổi mã, một lệnh tìm kiếm kiểm tra rằng không tệp nào khác ghi vào bảng đặt phòng | ràng buộc là một dòng trong lược đồ cơ sở dữ liệu và cơ sở dữ liệu kiểm tra nó ở mỗi lần ghi; tìm kiếm tệp luôn kết thúc và cho câu trả lời chính xác, miễn là truy vấn vào bảng không được dựng tại chỗ: một quy tắc linter cũng cấm điều đó | tác nhân không thể ghi lượt đặt từ chỗ nào tiện: ngay cả nhập hàng loạt các lượt đặt cũng phải đi qua cùng tệp được phép |
| <b-icon name="help-circle"/> “Không biết” | phép kiểm tra trên một thay đổi trả về một trong ba câu trả lời: “đúng”, “vi phạm”, “không xác định được”. Câu trả lời thứ ba gắn nhãn “cần người xem” lên thay đổi | phép kiểm tra không phải giải các ca khó, như truy vấn cơ sở dữ liệu dựng từ chuỗi tại chỗ: ở đó nó trung thực nói “không xác định được”, còn khi nói “đúng” hoặc “vi phạm” thì câu trả lời chính xác | lập trình viên tốn thời gian cho các thay đổi gắn nhãn “cần người xem” |

  </b-table>
  <b-why align="left">Mỗi câu trả lời trong ba câu chỉ chính xác trong giới hạn của nó. Tìm kiếm chứng minh quy tắc đúng trong mô hình 3 phòng và 5 lượt đặt, không phải trong cơ sở dữ liệu production với hàng nghìn lượt đặt. Tìm kiếm trong mã chứng minh không có chỗ ghi vòng qua quy tắc, không chứng minh rằng bản thân ràng buộc cơ sở dữ liệu được viết đúng. Câu trả lời “đúng” là chính xác, nhưng một số thay đổi vẫn chuyển cho con người. Vì vậy các cách được dùng cùng nhau: mô hình kiểm tra thiết kế trước khi có mã, ràng buộc và tìm kiếm kiểm tra chính mã, và con người xem những gì còn lại có nhãn.</b-why>
  <b-why align="left">Mọi phép kiểm tra hoạt động trong một khung đều mắc lỗi hai loại. Nên quyết định trước loại nào chấp nhận được.</b-why>
  <b-table>

| Lỗi của phép kiểm tra | Chuyện gì xảy ra | Khi nào chấp nhận được | Ví dụ đặt phòng |
|---|---|---|---|
| <b-status-dot color="warn">bỏ sót</b-status-dot> | phép kiểm tra nói “ổn cả”, nhưng quy tắc bị phá | khi vi phạm dễ nhận ra và rẻ để sửa | test kiểm tra việc đặt phòng của một khách, trong khi hai khách cùng lúc nhận phòng 2 lúc 10:00 |
| <b-status-dot color="accent">báo động giả</b-status-dot> | phép kiểm tra nói “vi phạm” hoặc “không xác định được”, nhưng quy tắc đúng | khi bỏ sót tốn kém: tiền, quyền truy cập, dữ liệu cá nhân | tìm kiếm thấy việc ghi vào bảng đặt phòng trong một tệp di chuyển dữ liệu, không phá quy tắc, và thay đổi bị giữ lại cho đến khi có người xem |

  </b-table>
  <b-why align="left">Với các quy tắc về tiền và quyền truy cập, hãy chọn các phép kiểm tra báo động giả nhưng không bao giờ bỏ sót vi phạm: ràng buộc cơ sở dữ liệu, kiểm tra kiểu, một nơi ghi duy nhất cho mỗi bảng. Lập trình viên gỡ một nhãn thừa trong vài phút, còn một khoản trừ tiền hai lần bị bỏ sót quay lại dưới dạng khiếu nại của khách hàng và một lần hoàn tiền.</b-why>
  <b-why align="left">Theo ngôn ngữ DDD (cách thiết kế phần mềm xoay quanh miền nghiệp vụ) thì như sau. Bounded context là một phần của hệ thống có từ vựng riêng. Context “Đặt phòng” chỉ nói về phòng, lượt đặt và thời gian: nó không có những từ như “thanh toán” hay “thông báo”. Quy tắc “các lượt đặt không bao giờ chồng nhau” liên quan đến một bảng, và một aggregate, “Booking”, ghi vào đó; aggregate là nhóm dữ liệu chỉ được thay đổi thông qua chính nó. Vậy “mã có thể phá quy tắc không” quy về câu hỏi về văn bản: có gì khác ngoài aggregate ghi vào bảng đó không. Điều làm quy tắc kiểm tra được là lệnh cấm ghi vào bảng mà vòng qua aggregate. Từ vựng nhỏ của context giúp con người và tác nhân hiểu mã, nhưng không ảnh hưởng đến khả năng kiểm tra. Ranh giới aggregate tiện vì lệnh cấm nằm ở một chỗ.</b-why>
  <b-finding>
    <ex>Quy tắc “các lượt đặt của một phòng không bao giờ chồng nhau”: mô hình Quint thử mọi thứ tự lệnh cho 3 phòng, ràng buộc cơ sở dữ liệu cấm chồng lấn, và một phép kiểm tra văn bản bảo đảm chỉ một module ghi vào bảng đặt phòng.</ex>
    <gen>Ba khung thường được kết hợp: thế giới nhỏ bắt lỗi thiết kế, ngôn ngữ hẹp ghim quy tắc vào mã, và “không biết” chỉ ra chỗ cần con người.</gen>
    <do>Với mỗi quy tắc, đánh dấu khung nào giữ nó. Quy tắc không có khung chỉ được kiểm tra bằng test ví dụ.</do>
  </b-finding>
</b-chapter>

<b-chapter id="cap" icon="boxes-link" title="Liên hệ với định lý CAP: lõi chung, lý do khác nhau">
  <b-why align="left">Định lý CAP là một lệnh cấm nổi tiếng trong hệ phân tán; tên gọi ghép từ chữ cái đầu của ba tính chất: consistency (nhất quán), availability (sẵn sàng), partition tolerance (chịu phân vùng). Khi dữ liệu nằm trên nhiều máy chủ và đường liên lạc giữa chúng đứt, hệ thống không thể vừa trả lời mọi yêu cầu vừa cho mọi người thấy cùng một dữ liệu. Nó phải chọn: chờ đường liên lạc trở lại, hoặc trả lời từ bản sao của mình, có thể đã cũ. Eric Brewer phát biểu điều này năm 2000; Seth Gilbert và Nancy Lynch chứng minh năm 2002.</b-why>
  <iso-art name="term:cap-theorem"></iso-art>
  <b-why align="left">**Lõi chung.** Trong cả hai lệnh cấm: khi một sự kiện chưa xảy ra, không thể biết liệu nó sẽ xảy ra sau này hay không bao giờ, dù chờ bao lâu. Máy chủ không biết thông điệp của máy bên cạnh bị mất hay chỉ đến muộn. Phép kiểm tra chương trình không biết chương trình sẽ kết thúc sau một tỷ bước hay không bao giờ. Chừng nào thời gian chờ không bị chặn, cả hai có đúng hai lối thoát, và chỉ chọn được một: chờ hoặc trả lời ngay.</b-why>
  <b-art names="rice-theorem-explained/cap-fork" wide/>
  <b-cap>Phần trên của sơ đồ là ngã rẽ giữa hai lối thoát loại trừ nhau. Phần dưới là việc chặn thời gian: với phép kiểm tra chương trình nó xóa ngã rẽ, còn trong mạng nó chỉ xóa sự không chắc chắn.</b-cap>
  <b-why align="left">Hai nhánh của ngã rẽ trông thế nào trong mạng và trong phép kiểm tra chương trình:</b-why>
  <b-table>

| Lối thoát | Trong mạng (CAP) | Trong phép kiểm tra chương trình |
|---|---|---|
| <b-icon name="clock"/> chờ | máy chủ chờ đường liên lạc trở lại; dữ liệu đúng, nhưng chưa có câu trả lời, và có thể rất lâu mới có | phép kiểm tra chờ chương trình kết thúc, hoặc trả lời “không xác định được”; không có lỗi, nhưng có thể không có câu trả lời |
| <b-icon name="zap"/> trả lời ngay | máy chủ trả lời từ bản sao của mình; có câu trả lời, nhưng có thể thiếu lượt đặt mới từ máy chủ kia | phép kiểm tra trả lời từ test hoặc một lần chạy 1000 bước; có câu trả lời, nhưng chương trình có thể phá quy tắc ở bước 1001 |

  </b-table>
  <b-why align="left">**Chặn thời gian: giúp chương trình, không giúp mạng.** Nếu một ngôn ngữ hoặc mô hình bảo đảm mọi chương trình kết thúc trong số bước đã biết, phép kiểm tra chạy nó đến cùng và trả lời chính xác. Thế giới nhỏ ở phần trước hoạt động như vậy; cái giá là một ngôn ngữ không viết được vòng lặp vô tận. Trong mạng, độ trễ bị chặn chỉ xóa sự không chắc chắn: nếu một thông điệp đi không quá 2 giây, sau 2 giây máy chủ biết chắc đường liên lạc đã đứt. Điều đó không mang lại dữ liệu mới hơn, và lựa chọn vẫn còn: từ chối trả lời hoặc trả lời từ bản sao của mình. Lệnh cấm CAP vẫn đúng.</b-why>
  <b-why align="left">**Lý do khác nhau.** Máy chủ CAP thiếu thông tin: ngay cả máy chủ thông minh vô hạn cũng không biết được điều xảy ra ở máy bên cạnh sau đường liên lạc bị đứt. Phép kiểm tra chương trình có thông tin, toàn bộ mã nằm trước mặt, nhưng câu trả lời không tính được từ mã đó. Đây là hai loại bất khả khác nhau, nên định lý Rice và CAP không phải là một.</b-why>
  <b-why align="left">**Mức độ chặt chẽ.** Cả hai nửa đều đã được xác lập: định lý Rice và chứng minh CAP đã được công bố. Việc các lối thoát trùng nhau là quan sát của tác giả; không có một định lý chung cho cả hai trường hợp. Chính Brewer sau này cảnh báo rằng công thức “hai trong ba” (ý rằng trong ba tính chất chỉ có được hai) đơn giản hóa quá mức<b-proof href="https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/" quote="Eric Brewer: “The «2 of 3» formulation was always misleading”"/>: thực tế đó là một thang đo, và lựa chọn chỉ nảy sinh trong lúc có phân vùng. Phép kiểm tra cũng vậy: điều quan trọng là phép kiểm tra nói “không biết” hoặc sai thường xuyên đến đâu.</b-why>
  <b-finding>
    <ex>Một phép kiểm tra tự động chờ một lần chạy test bị treo. Chờ lâu hơn giống như máy chủ chờ đường liên lạc; cắt theo timeout và nói “đã qua” giống như máy chủ trả lời từ bản sao cũ.</ex>
    <gen>Chờ và đoán là những lối thoát chung của cả hai lệnh cấm. Chặn thời gian từ trước xóa ngã rẽ với phép kiểm tra chương trình, còn trong mạng nó chỉ biến “chờ mãi” thành “tôi biết đường liên lạc đã đứt”.</gen>
    <do>Đặt giới hạn thời gian cho mọi phép kiểm tra tự động và quyết định trước việc vượt giới hạn nghĩa là gì: “không biết” giao cho con người, hoặc “vi phạm”.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Định lý Rice là gì, nói đơn giản?">Không chương trình nào có thể cho biết, với mọi chương trình, một tính chất về hành vi của nó có đúng hay không, nếu một số chương trình có tính chất đó còn số khác không. Về văn bản mã thì trả lời được; về hành vi của chương trình bất kỳ thì không.</q>
    <q t="Định lý Rice liên quan thế nào đến bài toán dừng?">Mọi câu hỏi về việc dừng đều chuyển được thành câu hỏi về hành vi: dựng một chương trình chỉ phá quy tắc nếu một chương trình khác kết thúc. Vậy phép kiểm tra hành vi không dễ hơn bài toán dừng, và không chương trình nào trả lời được câu hỏi dừng.</q>
    <q t="Vậy kiểm tra chương trình là vô nghĩa?">Chỉ phép kiểm tra cho mọi chương trình là bất khả. Trong một khung — thế giới nhỏ, ngôn ngữ hẹp hoặc câu trả lời “không biết” — phép kiểm tra đúng là khả thi: các thứ như tìm kiếm mô hình Quint, ràng buộc cơ sở dữ liệu và các lệnh cấm hẹp của linter như “chỉ một tệp ghi vào bảng này” hoạt động theo cách đó.</q>
    <q t="Nghịch lý người thợ cạo liên quan gì ở đây?">Bài toán dừng được chứng minh bằng cùng một mẹo như nghịch lý người thợ cạo và nghịch lý Russell: câu hỏi về chính mình. Định lý Rice thừa hưởng mẹo đó: chứng minh của nó quy bài toán dừng về phép kiểm tra hành vi.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Đọc tiếp">
  <b-links>
    <item href="/blog/agent-checkpoint/" k="Tác nhân" t="Kiểm tra công việc của tác nhân AI ở đâu">ranh giới aggregate làm điểm kiểm tra</item>
    <item href="/blog/quint-vs-tests-and-tla/" k="Kiểm tra" t="Kiểm chứng mô hình so với test">Quint, QUnit và TLA+</item>
    <item href="/blog/specs-by-aggregates/" k="Spec" t="Spec theo aggregate">quy tắc trong thẻ aggregate</item>
    <item href="/blog/quint-models-find-races/" k="Mô hình" t="Tìm race condition">mô hình Quint trong thực tế</item>
  </b-links>
</b-chapter>
<b-footer>Dữ kiện: tính đến ngày 6 tháng 11 năm 2026, từ Wikipedia (định lý Rice, bài toán dừng, nghịch lý người thợ cạo). Ví dụ thanh toán chỉ mang tính minh họa.</b-footer>
</b-post>
