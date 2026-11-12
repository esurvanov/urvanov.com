---
title: Kiểm chứng mô hình khác kiểm thử thế nào: test kiểm tra một kịch bản, mô hình kiểm tra mọi thứ tự hành động (Quint, QUnit và TLA+)
date: 2026-10-25
updated: 2026-11-13
description: Test kiểm tra kịch bản bạn đã nghĩ tới, còn kiểm chứng mô hình thử mọi thứ tự hành động. QUnit, Jest, Vitest bắt được lỗi nào, và Quint, TLA+, Alloy bắt được lỗi nào.
tags: AI, đặc tả, Quint, TLA+, Alloy, QUnit, Jest, Vitest, kiểm thử, kiểm chứng hình thức
category: specs
layout: wide
mentions: Quint, QUnit, Jest, Vitest, TLA+, Alloy, Apalache, model checking, formal verification, Quint vs QUnit, test framework
toc: names=Hai cái tên | tests=Framework test | tla=TLA+ và Alloy | choose=Chọn gì | together=Kết hợp | faq=FAQ | next=Đọc thêm
---

Test kiểm tra một kịch bản bạn đã nghĩ tới, còn kiểm chứng mô hình (model checking) thử mọi thứ tự hành động và tìm ra vi phạm quy tắc mà không ai hình dung được. Các framework test như QUnit, Jest và Vitest kiểm tra code đã viết xong bằng các ví dụ. Quint và TLA+ kiểm tra quy tắc của hệ thống ngay cả khi chưa có code, kể cả code do tác nhân AI (AI agent) viết.

<b-post series="harness">
<b-art names="quint-vs-tests-and-tla/names" wide/>

<b-chapter id="names" icon="swap" title="Quint khác QUnit thế nào: hai cái tên giống nhau">
  <b-why align="left">[QUnit](/materials/glossary/qunit/) là framework chạy test JavaScript, cùng họ với [Jest](/materials/glossary/jest/) và [Vitest](/materials/glossary/vitest/). Bạn viết một hàm, rồi viết test với đầu vào và đáp án mong đợi, và framework cho biết chúng có khớp không. Quint là ngôn ngữ để mô tả hệ thống phải hành xử ra sao. Chính chương trình tự thử mọi nước đi có thể và tìm những nước làm vỡ một quy tắc. Sự nhầm lẫn đến từ cái tên, còn bản chất đây là các chương trình thuộc hai loại khác nhau. So sánh giữa các framework test nằm trong bài [Jest vs Vitest vs QUnit](/blog/jest-vs-vitest-vs-qunit/).</b-why>
  <b-why align="left">Một test QUnit trông thế nào. Nó lấy một hàm đã viết xong, chẳng hạn phép cộng, đưa vào một và hai rồi so đáp án với ba: `assert.equal(add(1, 2), 3)`, ví dụ từ trang QUnit<b-proof href="https://qunitjs.com/" quote="A Quick Example"/>. Nếu đáp án đúng, test qua. Mọi thứ test biết về thế giới chỉ là đầu vào và đáp án mong đợi mà bạn chọn từ trước.</b-why>
  <b-why align="left">Mô hình Quint được xây khác: trong đó không có hàm và không có đáp án. Bạn mô tả hệ thống có thể ở những trạng thái nào, những hành động nào chuyển nó từ trạng thái này sang trạng thái khác và những quy tắc nào luôn phải đúng. Chính Quint chạy mô hình như vậy, mô phỏng và kiểm tra nó trước khi code được phát hành<b-proof href="https://quint-lang.org/" quote="Write specs you can run, simulate, and verify before shipping code."/>. Vì vậy code đã viết hay chưa không quan trọng: nó kiểm tra ý định, không kiểm tra cách hiện thực.</b-why>
  <b-vs-grid>
    <h></h>
    <h>QUnit (framework test)</h>
    <h>Quint (ngôn ngữ mô hình hóa)</h>
    <c>**Là gì**</c>
    <c>framework chạy test cho code JavaScript, như Jest và Vitest</c>
    <c>ngôn ngữ để mô tả quy tắc, chính chương trình tự thử mọi nước đi có thể</c>
    <c>**Kiểm tra gì**</c>
    <c>hàm đã viết xong trả về đáp án đúng với các đầu vào cho trước</c>
    <c>hệ thống được mô tả không bao giờ rơi vào trạng thái bị cấm, kể cả trong những tổ hợp không ai nghĩ tới</c>
    <c>**Cần gì**</c>
    <c>code đã viết</c>
    <c>chỉ cần mô tả quy tắc, code có thể chưa tồn tại</c>
    <c>**Ví dụ**</c>
    <c>test kiểm tra hàm phân tích ngày trả về đúng ngày</c>
    <c>mô hình phát hiện rằng sự cố giữa lúc ghi âm để lại một bản ghi không có dấu vết</c>
    <c>**Khó ở đâu**</c>
    <c>nghĩ ra các đầu vào</c>
    <c>phát biểu quy tắc sao cho phản ánh đúng thực tế</c>
  </b-vs-grid>
  <b-why align="left">Nên đọc bảng theo từng hàng. Hàng “Kiểm tra gì” cho thấy khác biệt chính: test trả lời “hàm này có chạy đúng với dữ liệu này không”, mô hình trả lời “tình huống mà quy tắc cấm có thể xảy ra hay không”. Test bị giới hạn bởi những gì bạn nghĩ ra. Mô hình bị giới hạn bởi những gì bạn đưa vào.</b-why>
  <b-finding>
    <ex>QUnit kiểm tra code đã viết, còn Quint kiểm tra một ý định có thể chưa nằm trong code.</ex>
    <gen>Vì vậy QUnit, Jest và Vitest không thay thế Quint, và ngược lại: chúng trả lời những câu hỏi khác nhau.</gen>
    <do>Nếu ai đó nói “nó giống Jest”, hãy hỏi chính xác ý là gì: kiểm tra một hàm hay kiểm tra quy tắc.</do>
  </b-finding>
</b-chapter>

<b-chapter id="tests" icon="flask" title="Quint hay Jest và Vitest: test kiểm tra gì và mô hình kiểm tra gì">
  <b-art names="quint-vs-tests-and-tla/when" wide/>
    <b-why align="left">Framework test tìm lỗi trên các đầu vào bạn đã nghĩ ra. Nếu bạn không nghĩ tới trường hợp hai quản trị viên cùng lúc thì không có test nào về nó được viết, và lỗi vẫn còn. Mô hình làm việc khác: nó tự dựng các tổ hợp bước, kể cả những tổ hợp không ai nghĩ tới, và chỉ ra tổ hợp đầu tiên làm vỡ quy tắc.</b-why>
  <b-vs-grid>
    <h></h>
    <h>Framework test</h>
    <h>Quint</h>
    <c>**Tìm được gì**</c>
    <c>lỗi trên các đầu vào bạn đã nghĩ ra</c>
    <c>lỗi trong tổ hợp bước mà không ai nghĩ ra</c>
    <c>**Khi nào cần**</c>
    <c>code đã tồn tại</c>
    <c>code chưa viết hoặc hoàn toàn chưa tồn tại</c>
    <c>**Điểm yếu**</c>
    <c>không thấy những gì bạn không nghĩ tới</c>
    <c>mô hình có thể không khớp thực tế, nên nó được đối chiếu với các dữ kiện đã xác nhận</c>
  </b-vs-grid>
  <b-why align="left">Test bắt tốt những gì: lỗi ngay trong hàm, chẳng hạn tính giảm giá sai hoặc phân tích ngày sai. Đầu vào ở đây biết trước, và test nhanh chóng cho thấy cái gì hỏng. Test bỏ sót những gì: [race condition](/materials/glossary/race-condition/) và các lỗi khác chỉ xuất hiện ở một thứ tự sự kiện nhất định. Trong các ví dụ thực tế, đó là cách phát hiện việc đăng nhập và đăng xuất của quản trị viên chồng nhau về thời gian và sự cố giữa lúc ghi âm cuộc họp. Không hành động nào sai khi đứng riêng, nên test cho từng hành động đều qua.</b-why>
  <b-why align="left">Điểm yếu của Quint là nó kiểm tra mô hình chứ không kiểm tra code. Nếu mô hình được mô tả không chính xác, nó chứng minh điều gì đó về một hệ thống tưởng tượng. Vì vậy mô hình được đối chiếu với các ca thực đã xác nhận, và trong đó giữ một cặp “hiện trạng và yêu cầu”. Xem thêm trong [bài về các mô hình](/blog/quint-models-find-races/).</b-why>
  <b-finding>
    <ex>Test và mô hình trả lời những câu hỏi khác nhau, nên “cái nào tốt hơn” là câu hỏi sai.</ex>
    <gen>Để kiểm tra “hai người cùng lúc có thể phá thứ tự hành động không” thì framework test gần như vô dụng, còn để kiểm tra “ngày có được phân tích đúng không” thì mô hình là thừa.</gen>
    <do>Với mỗi quy tắc muốn kiểm tra, hãy ghi ra nó nói về điều gì: dữ liệu đầu vào hay thứ tự hành động.</do>
  </b-finding>
</b-chapter>

<b-chapter id="tla" icon="scales" title="Quint khác TLA+ và Alloy thế nào">
  <b-art names="quint-vs-tests-and-tla/notation" wide/>
    <b-why align="left">TLA+ và Alloy là các ngôn ngữ hình thức cùng loại: trong đó bạn cũng mô tả quy tắc và tìm các vi phạm của chúng. Chúng lâu đời hơn Quint và có nhiều sách hơn. Nhưng ký pháp của TLA+ mang tính toán học, và người mới cần thời gian để đọc. Quint được thiết kế như một ký pháp dễ tiếp cận hơn cho cùng bài toán: nó trông như code thông thường, và kỹ sư không có nền tảng toán cũng đọc được. So sánh chi tiết cả ba ngôn ngữ nằm trong bài [TLA+ vs Alloy vs Quint](/blog/tla-alloy-quint-compare/).</b-why>
  <b-art names="quint-vs-tests-and-tla/engine" wide/>
  <b-why align="left">“Cùng các chương trình” nghĩa là gì. Quint có thể được kiểm tra bằng hai chương trình: TLC và Apalache<b-proof href="https://quint-lang.org/docs/model-checkers" quote="Quint specifications can be verified by two model checkers: TLC and Apalache"/>. TLC là chương trình kiểm tra đầu tiên của TLA+: nó duyệt từng trạng thái một<b-proof href="https://quint-lang.org/docs/model-checkers" quote="TLC is an explicit-state model checker"/>, còn với Quint thì chạy nó bằng <code>quint verify --backend=tlc</code><b-proof href="https://quint-lang.org/docs/model-checkers" quote="TLC (no acronym defined!) is the first model checker for TLA+, and is provided as an alternative backend for quint verify by passing the --backend=tlc flag"/>. Cách tìm kiếm này dễ đoán, nhưng thế giới phải nhỏ.</b-why>
  <b-why align="left">[Apalache](/materials/glossary/apalache/) được tích hợp sẵn trong Quint<b-proof href="https://quint-lang.org/docs/model-checkers" quote="Apalache is a symbolic model checker that is integrated with Quint tooling"/>: nó dịch mô hình thành các điều kiện và hỏi bộ giải [Z3](/materials/glossary/z3/). Nó chỉ kiểm tra được các chuỗi đến một độ dài cho trước<b-proof href="https://quint-lang.org/docs/model-checkers" quote="Apalache cannot check an arbitrary number of steps"/>, nên “ok” của nó nghĩa là “không có vi phạm trong độ dài đó”. TLA+ được kiểm tra bằng chính hai chương trình này, còn Alloy có bộ phân tích riêng. Ngoài kiểm tra, Quint còn có mô phỏng ngẫu nhiên nhanh: nó tìm vi phạm bằng cách lấy mẫu và không chứng minh rằng không có vi phạm.</b-why>
    <b-vs-grid>
    <h></h>
    <h>Quint</h>
    <h>TLA+ / Alloy</h>
    <c>**Ký pháp**</c>
    <c>trông như code thông thường, kỹ sư đọc được</c>
    <c>ký pháp toán học, ngưỡng vào cao hơn</c>
    <c>**Cái gì kiểm tra**</c>
    <c>TLC hoặc Apalache</c>
    <c>TLA+: cũng TLC và Apalache; Alloy: bộ phân tích riêng</c>
    <c>**Độ trưởng thành**</c>
    <c>trẻ hơn</c>
    <c>lâu đời hơn, nhiều ví dụ hơn</c>
  </b-vs-grid>
  <b-why align="left">Mỗi ngôn ngữ trong ba ngôn ngữ dựa trên một ý tưởng riêng. [TLA+](/materials/glossary/tla-plus/) xây trên ý của Leslie Lamport rằng cách chính xác nhất để mô tả một hệ thống là toán học đơn giản<b-proof href="https://lamport.azurewebsites.net/tla/tla.html" quote="the best way to describe things precisely is with simple mathematics"/>. [Alloy](/materials/glossary/alloy/) mô tả các cấu trúc biến đổi và có chương trình để khám phá chúng<b-proof href="https://alloytools.org/about.html" quote="a language for describing evolving structures and a tool for exploring them"/>. [Quint](/materials/glossary/quint/) đưa cùng bài toán đó vào ký pháp mà kỹ sư hiểu: bản mô tả có thể được chạy, mô phỏng và kiểm tra trước khi code được phát hành<b-proof href="https://quint-lang.org/" quote="Write specs you can run, simulate, and verify before shipping code."/>.</b-why>
  <b-art names="quint-vs-tests-and-tla/maturity" wide/>
  <b-why align="left">Độ trưởng thành quan trọng khi cần các chứng minh nặng: hệ thống lớn, bảo đảm chặt cho các giao thức phân tán. Phiên bản đầu tiên của ngôn ngữ Alloy xuất hiện năm 1997<b-proof href="https://en.wikipedia.org/wiki/Alloy_(specification_language)" quote="The first version of the Alloy language appeared in 1997"/>. TLA+ do Leslie Lamport tạo ra<b-proof href="https://en.wikipedia.org/wiki/TLA%2B" quote="TLA+ is a formal specification language developed by Leslie Lamport"/>, và theo Wikipedia ngôn ngữ này có từ năm 1999. Bộ kiểm tra Apalache bắt đầu năm 2015, và repository của Quint được tạo năm 2021, theo GitHub. Vậy TLA+ có khoảng 27 năm lịch sử còn Quint khoảng năm năm.</b-why>
  <b-why align="left">Trong những năm đó TLA+ tích lũy được sách, khóa học và các bài mô tả hệ thống thực, còn Quint có ít hơn. Nhưng ngôn ngữ này phát triển nhanh: các thay đổi được đẩy lên repository của dự án vào ngày trước ngày của bài viết này<b-proof href="https://github.com/informalsystems/quint" quote="executable specification language with delightful tooling"/>. Với các quy tắc sản phẩm như “bản ghi riêng tư không bao giờ lọt vào kho chung”, độ sâu của chứng minh ít khi cần, còn tính dễ đọc quan trọng hơn.</b-why>
  <b-finding>
    <ex>Quint đem lại cùng bài toán và cùng loại kiểm tra trong ký pháp dễ đọc hơn, với cái giá là độ trưởng thành thấp hơn.</ex>
    <gen>Với các quy tắc sản phẩm đây là sự đánh đổi hợp lý, vì quy tắc được đọc và bàn bởi những người không học toán, và mô hình dễ viết hơn khi làm cùng tác nhân AI.</gen>
    <do>Nếu cần các chứng minh nặng, hãy chuyển mô hình sang TLA+: ý tưởng và quy tắc vẫn như cũ.</do>
  </b-finding>
</b-chapter>

<b-chapter id="choose" icon="target" title="Chọn gì: Quint, test hay TLA+">
  <b-art names="quint-vs-tests-and-tla/choose" wide/>
  <b-rules cols="3">
    <rule icon="flask" t="Hàm đã viết xong">Kiểm tra hàm trả về đáp án đúng với các đầu vào cho trước: framework test, QUnit, Jest hoặc Vitest</rule>
    <rule icon="workflow" t="Thứ tự hành động">Tìm tổ hợp bước làm vỡ một quy tắc sản phẩm, kể cả khi code chưa tồn tại: Quint</rule>
    <rule icon="scales" t="Chứng minh nặng">Bảo đảm chặt cho hệ thống phân tán lớn: TLA+, với nhiều kinh nghiệm và ví dụ hơn</rule>
  </b-rules>
  <b-why align="left">Lựa chọn do câu hỏi quyết định. Nếu câu hỏi là “hàm này có chạy đúng không”, hãy dùng test. Nếu câu hỏi là “quy tắc có thể vỡ trong một chuỗi sự kiện nào đó không”, hãy dùng mô hình. Nếu cần bảo đảm ở mức giao thức phân tán, hãy dùng TLA+ và dành thời gian để học nó.</b-why>
  <b-finding>
    <ex>Ba lựa chọn trả lời ba câu hỏi khác nhau, và cái này không thay thế cái kia.</ex>
    <gen>Với logic sản phẩm có tác nhân và nhiều bên tham gia, thường cần cả test lẫn Quint.</gen>
    <do>Ghi ra ba câu hỏi về sản phẩm của bạn và đặt lựa chọn phù hợp cạnh mỗi câu, dựa vào bảng ở trên.</do>
  </b-finding>
</b-chapter>

<b-chapter id="together" icon="link" title="Chúng phối hợp với nhau thế nào">
  <b-why align="left">Trong thực tế test và mô hình đứng cạnh nhau. Test bảo vệ một hàm cụ thể khỏi bị hỏng khi sửa. Mô hình bảo vệ một quy tắc đi qua nhiều hàm và phụ thuộc vào thứ tự sự kiện. Khi mô hình tìm ra một chuỗi bước, từ đó có thể rút ra một regression test ngắn: nó thất bại trên code cũ và qua trên code đã sửa.</b-why>
  <b-why align="left">Như vậy mô hình trao cho test thứ nó tìm được, và test giữ nó trong code. Phần kể chi tiết về các phát hiện, cặp “hiện trạng và yêu cầu” và việc kiểm tra chính các phép kiểm tra nằm trong [bài chính về Quint](/blog/quint-models-find-races/), còn ranh giới các bounded context mà các mô hình được viết cho được nêu trong bài về [tác nhân cho mỗi context](/blog/agents-per-bounded-context/).</b-why>
  <b-finding>
    <ex>Mô hình tìm ra một chuỗi bước, và test ghim nó vào code để lỗi không quay lại.</ex>
    <gen>Kết quả là một cặp: mô hình tìm cái chưa biết, test canh giữ cái đã tìm ra.</gen>
    <do>Biến chuỗi bước tiếp theo bạn tìm ra thành một test ngắn và đặt cạnh các test khác.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="FAQ">
  <b-faq-cards>
    <q t="Quint khác QUnit thế nào?">QUnit chạy test cho code JavaScript đã viết xong, còn Quint mô tả quy tắc của hệ thống và tự thử các thứ tự hành động. Tên gọi giống nhau, nhưng đây là các chương trình khác loại.</q>
    <q t="Quint khác TLA+ thế nào?">Chúng mô tả cùng một thứ và khác nhau ở ký pháp: Quint trông như code thông thường, TLA+ dùng công thức. So sánh chi tiết ba ngôn ngữ nằm trong bài “TLA+ vs Quint vs Alloy”.</q>
    <q t="Nên chọn gì: Quint, Jest hay TLA+?">Nếu câu hỏi là hàm có chạy đúng không, hãy dùng test. Nếu là quy tắc có thể vỡ trong một chuỗi sự kiện nào đó không, hãy dùng Quint; với các chứng minh nặng về hệ thống phân tán, người ta dùng TLA+.</q>
    <q t="Có dùng Quint cùng với test được không?">Được, chúng bổ sung cho nhau. Mô hình tìm chuỗi bước làm vỡ quy tắc, và một test ngắn ghim nó vào code để lỗi không quay lại.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Đọc thêm">
  <b-links>
    <item href="/blog/jest-vs-vitest-vs-qunit/" k="So sánh" t="Vitest vs Jest, và khi nào QUnit là đủ">Chọn framework test JavaScript nào</item>
    <item href="/blog/tla-alloy-quint-compare/" k="So sánh" t="TLA+ vs Alloy vs Quint">Các ngôn ngữ đặc tả hình thức khác nhau thế nào</item>
    <item href="/blog/quint-models-find-races/" k="Mô hình" t="Cách tìm race condition: mô hình Quint">Mô hình hình thức trong Quint: phát hiện, cặp mô hình, kiểm tra các phép kiểm tra</item>
    <item href="/blog/agents-per-bounded-context/" k="Tác nhân" t="Cần bao nhiêu tác nhân AI">Một tác nhân cho mỗi bounded context</item>
  </b-links>
</b-chapter>
<b-footer>Dữ kiện: tính đến ngày 25 tháng 10 năm 2026, theo tài liệu của Quint, TLA+ và Alloy. Lựa chọn phụ thuộc vào nhóm và tác vụ.</b-footer>
</b-post>
