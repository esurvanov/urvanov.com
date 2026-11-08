---
title: Vitest vs Jest: chọn cái nào cho dự án JavaScript, và khi nào QUnit là đủ
date: 2026-10-25
updated: 2026-11-08
description: Vitest vs Jest: cách thiết lập, nơi test chạy, cách viết phép kiểm tra. Khi nào chọn Vitest trên Vite, giữ Jest hay dùng QUnit trong trình duyệt. Có bảng và FAQ.
tags: AI, kiểm thử, JavaScript, Jest, Vitest, QUnit, Vite, Jest vs Vitest, kiểm thử tự động
category: specs
layout: wide
mentions: Jest, Vitest, QUnit, Vite, Node.js, JavaScript, Jest vs Vitest, automated tests, test framework, snapshots, mocks, code coverage
toc: common=Điểm chung | vite=Jest và Vitest | qunit=QUnit | table=Ai có gì | choose=Chọn gì | faq=FAQ | next=Đọc thêm
---

Vitest vs Jest: với dự án xây bằng Vite hãy chọn Vitest vì nó dùng lại cùng cấu hình, còn nếu Jest đã chạy tốt thì cứ giữ. QUnit là đủ khi test cần chạy ngay trong trình duyệt mà gần như không phải thiết lập. Cả ba đều chạy test JavaScript tự động và khác nhau ở nơi chúng chạy và mức độ thiết lập cần có.

Bài này sinh ra từ một bài khác: về [mô hình hình thức trong Quint](/blog/quint-models-find-races/) và kiểm chứng hình thức. Tên QUnit và Quint giống nhau và dễ nhầm, nên các framework test cũng được viết thành một bài riêng. Quint khác chúng thế nào được trình bày trong [so sánh Quint với test và TLA+](/blog/quint-vs-tests-and-tla/).

<b-post series="harness">
<b-art names="jest-vs-vitest-vs-qunit/common" wide/>

<b-chapter id="common" icon="flask" title="Điểm chung của Jest, Vitest và QUnit">
  <b-why align="left">Giả sử có một hàm cộng hai số. Test ghi lại một kỳ vọng: với một và hai thì đáp án là ba. Framework chạy hàm, so đáp án với kỳ vọng và báo phép kiểm tra qua hay không. Một dự án có hàng trăm test, nên chúng chạy tự động sau mỗi lần sửa: nếu một thay đổi làm hỏng thứ đang chạy tốt, test thất bại và bạn thấy ngay. Cả ba framework đều làm đúng việc này cho code [JavaScript](/materials/glossary/javascript/), tức là chạy [kiểm thử tự động](/materials/glossary/automated-test/).</b-why>
  <b-why align="left">Ba thuật ngữ sẽ xuất hiện trong phần mô tả các framework. **Snapshot** là bản chuẩn đã lưu của một kết quả lớn, chẳng hạn mã đánh dấu hoàn chỉnh của một trang, để so với kết quả mới. **Mock** là việc tạm thay code thật bằng một bản giả, chẳng hạn việc gửi email thật, để test không chạm ra bên ngoài. **Coverage** là báo cáo cho biết test đã chạy qua những dòng code nào ít nhất một lần. Vì vậy việc chọn framework hiếm khi quyết định dự án có test hay không. Nó quyết định cần thiết lập bao nhiêu và test chạy ở đâu.</b-why>
  <b-finding>
    <ex>Jest, Vitest và QUnit trả lời cùng một câu hỏi: hàm đã viết xong có cho đáp án đúng với các đầu vào cho trước không.</ex>
    <gen>Chúng không kiểm tra quy tắc của hệ thống hay thứ tự sự kiện: cho việc đó cần các mô hình như [Quint](/materials/glossary/quint/).</gen>
    <do>Ghi ra điều bạn muốn kiểm tra: một hàm với các đầu vào cho trước hay một quy tắc đi qua nhiều hàm.</do>
  </b-finding>
</b-chapter>

<b-chapter id="vite" icon="swap" title="Jest hay Vitest: phải sửa bao nhiêu chỗ khi thiết lập">
  <b-art names="jest-vs-vitest-vs-qunit/vite" wide/>
    <b-why align="left">[Jest](/materials/glossary/jest/) hướng tới việc chạy được không cần cấu hình trên hầu hết dự án JavaScript<b-proof href="https://jestjs.io/" quote="Jest aims to work out of the box, config free, on most JavaScript projects."/>. Nó hiểu các dự án dùng Babel, TypeScript, React, Angular và Vue. Snapshot và mock có sẵn, còn coverage được bật bằng một cờ, `--coverage`, không cần thiết lập thêm. Nó chạy test song song, mỗi test trong tiến trình riêng để không ảnh hưởng lẫn nhau, và đưa những test thất bại lần trước lên chạy đầu tiên<b-proof href="https://jestjs.io/" quote="Jest runs previously failed tests first"/>. Phong cách viết phép kiểm tra quen thuộc: `test` mô tả một ca, `expect` so sánh đáp án.</b-why>
  <b-why align="left">[Vitest](/materials/glossary/vitest/) làm gần như điều tương tự nhưng được xây trên bộ đóng gói [Vite](/materials/glossary/vite/)<b-proof href="https://vitest.dev/guide/" quote="a next generation testing framework powered by Vite"/>. Nếu trang web đã được xây bằng Vite thì Vitest dùng cùng cấu hình và plugin, còn Jest sẽ cần một cấu hình thứ hai, riêng biệt. Các tác giả Vitest gọi đó là sự nhân đôi độ phức tạp<b-proof href="https://vitest.dev/guide/comparisons" quote="two different pipelines to configure and maintain"/>. Khả năng tương thích với Jest cao: Vitest hỗ trợ phần lớn giao diện của Jest và các thư viện của nó<b-proof href="https://vitest.dev/guide/comparisons" quote="compatibility with most of the Jest API and ecosystem libraries"/>, nên trong hầu hết dự án nó thay thế được.</b-why>
  <b-why align="left">Vitest còn có chế độ theo dõi nhanh: khi một tệp được sửa, test chạy lại ngay, dựa trên cùng cơ chế thay module nóng như chính Vite<b-proof href="https://vitest.dev/guide/comparisons" quote="default watch mode using Vite instant Hot Module Reload"/>. Tài liệu cũng nêu chế độ chạy test trong trình duyệt thật và giao diện web hiển thị kết quả. Cái giá phải trả: nó cần Vite và [Node.js](/materials/glossary/node-js/) khá mới, và tài liệu hiện nay nêu Vite 6.4 và Node 22.12<b-proof href="https://vitest.dev/guide/" quote="Vitest requires Vite >=v6.4.0 and Node >=v22.12.0"/>.</b-why>
  <b-finding>
    <ex>Trên dự án Vite, Vitest tiết kiệm một cấu hình thứ hai, còn trên dự án không có Vite thì khác biệt so với Jest là nhỏ.</ex>
    <gen>Nếu Jest đã chạy tốt và không làm phiền ai, việc chuyển chỉ vì muốn chuyển hiếm khi đáng.</gen>
    <do>Xem trang của bạn được xây bằng gì. Nếu là Vite, hãy thử Vitest trên một module.</do>
  </b-finding>
</b-chapter>

<b-chapter id="qunit" icon="workflow" title="QUnit: khi cần test ngay trong trình duyệt">
  <b-art names="jest-vs-vitest-vs-qunit/qunit-env" wide/>
    <b-why align="left">[QUnit](/materials/glossary/qunit/) tự mô tả là framework test mạnh và dễ dùng. Nó không cần cấu hình cho Node.js, và thiết lập tối thiểu là đủ cho trình duyệt<b-proof href="https://qunitjs.com/" quote="Zero configuration and setup for any Node.js project"/>. Nó chạy ở bất cứ nơi nào có JavaScript: trong trình duyệt, trong Node.js, trong engine SpiderMonkey và trong luồng nền của một trang<b-proof href="https://qunitjs.com/" quote="QUnit can run anywhere; web browsers, Node, SpiderMonkey, even in a Web Worker!"/>. Còn Jest và Vitest thì thường chạy trong Node.js.</b-why>
  <b-why align="left">Phong cách của nó là riêng. Các test liên quan được gom bằng `QUnit.module`, một test được mô tả bằng `QUnit.test`, và đáp án được so sánh qua `assert`. Với test chạm vào trang có fixture đưa trang về trạng thái ban đầu sau mỗi test, và một phép kiểm tra riêng cho thứ tự các lời gọi đối với sự kiện và phản hồi trễ. Có thể mở rộng QUnit theo nhu cầu: assertion, trình chạy và báo cáo riêng. Nó cũng hỗ trợ trình duyệt cũ: phiên bản 2 chạy với Internet Explorer 9 trở lên<b-proof href="https://qunitjs.com/intro/" quote="QUnit supports the following runtime environments"/>.</b-why>
  <b-finding>
    <ex>QUnit phù hợp ở nơi test cần chạy ngay trong trình duyệt và không cần bước build.</ex>
    <gen>Với các dự án hiện đại có build, cần mock, snapshot và coverage có sẵn, thường chọn Jest hoặc Vitest hơn.</gen>
    <do>Nếu test cần mở trong trình duyệt như một trang bình thường, hãy xem QUnit trước.</do>
  </b-finding>
</b-chapter>

<b-chapter id="table" icon="scales" title="Ai có gì: Jest, Vitest và QUnit từng điểm một">
<b-table id="jvq">

| | Jest | Vitest | QUnit |
|---|---|---|---|
| **Ý tưởng** | framework quen thuộc với bộ đầy đủ: snapshot, mock, coverage | framework thế hệ mới xây trên Vite | framework đơn giản chạy ở mọi nơi |
| **Thiết lập** | cấu hình riêng | giống cấu hình của Vite | gần như không có |
| **Chạy ở đâu** | thường trong Node.js | thường trong Node.js | trình duyệt, Node.js, các môi trường khác |
| **Cách viết phép kiểm tra** | `test` và `expect` | `test` và `expect`, như Jest | `QUnit.test` và `assert` |
| **Khi nào phù hợp** | Jest đã có sẵn và chạy tốt | dự án xây bằng Vite | cần test trong trình duyệt mà không build |

</b-table>
  <b-why align="left">Đọc bảng từng hàng. “Ý tưởng” cho biết vì sao framework ra đời. “Thiết lập” cho thấy phải làm bao nhiêu việc trước test đầu tiên. “Chạy ở đâu” và “Cách viết phép kiểm tra” quan trọng nếu đã có nhiều test: phong cách của Jest và Vitest giống nhau nên chuyển qua lại đơn giản, còn sang QUnit thì phải viết lại các phép kiểm tra.</b-why>
</b-chapter>

<b-chapter id="choose" icon="target" title="Chọn gì: Jest, Vitest hay QUnit">
  <b-art names="jest-vs-vitest-vs-qunit/choose" wide/>
  <b-why align="left">Lựa chọn do dự án quyết định. Dự án xây bằng Vite: chọn Vitest, cấu hình đã có sẵn. Jest đã có trong dự án và mọi thứ chạy tốt: giữ nó. Cần kiểm tra ngay trong trình duyệt mà không build: chọn QUnit. Chuyển giữa Jest và Vitest thường rẻ, nên chọn sai cũng không phải không thể đảo ngược. Nếu cần kiểm tra quy tắc và thứ tự sự kiện thay vì các hàm, hãy xem các bài [Quint vs QUnit và TLA+](/blog/quint-vs-tests-and-tla/) và [về mô hình Quint](/blog/quint-models-find-races/).</b-why>
  <b-finding>
    <ex>Ba framework giải cùng một việc, và môi trường quyết định: bộ đóng gói, trình duyệt hay bộ test đã có.</ex>
    <gen>Dù chọn gì, test kiểm tra các kịch bản đã cho, còn các quy tắc vỡ ở một thứ tự sự kiện đặc biệt thì do mô hình bắt.</gen>
    <do>Chọn framework theo môi trường dự án và thêm một phép kiểm tra chính các test: [kiểm thử đột biến (mutation testing)](/materials/glossary/mutation-testing/) cho thấy test có phát hiện được lỗi hay không.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="FAQ">
  <b-faq-cards>
    <q t="Nên chọn Jest hay Vitest?">Với dự án xây bằng Vite, hãy chọn Vitest: nó dùng lại cùng cấu hình, nên không cần cấu hình thứ hai. Nếu Jest đã chạy tốt và không làm phiền ai, việc chuyển hiếm khi đáng.</q>
    <q t="Vitest khác Jest thế nào?">Vitest xây trên Vite, hỗ trợ phần lớn giao diện của Jest và chạy lại test nhanh khi tệp thay đổi. Nó cần Vite và Node.js khá mới.</q>
    <q t="Khi nào cần QUnit?">Khi test cần chạy ngay trong trình duyệt mà không có bước build. QUnit chạy trong trình duyệt, trong Node.js và trong các môi trường JavaScript khác, và không cần thiết lập cho Node.js.</q>
    <q t="Chuyển từ Jest sang Vitest có khó không?">Thường là không: cả hai đều viết phép kiểm tra bằng `test` và `expect`, nên chuyển qua lại đơn giản. Chuyển sang QUnit nghĩa là phải viết lại các phép kiểm tra.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Đọc thêm">
  <b-links>
    <item href="/blog/quint-vs-tests-and-tla/" k="So sánh" t="Kiểm chứng mô hình vs kiểm thử: Quint, QUnit, TLA+">Quint khác QUnit, Jest và TLA+ thế nào</item>
  <item href="/blog/quint-models-find-races/" k="Mô hình" t="Cách tìm race condition và dữ liệu bị mất">Mô hình hình thức Quint cho quy tắc và thứ tự sự kiện</item>
  <item href="/blog/tla-alloy-quint-compare/" k="So sánh" t="TLA+, Alloy hay Quint">Các ngôn ngữ đặc tả đặt cạnh framework test</item>
  </b-links>
</b-chapter>
<b-footer>Dữ kiện: các trang chính thức của Jest, Vitest và QUnit tính đến ngày 25 tháng 10 năm 2026. Lựa chọn phụ thuộc vào dự án của bạn, ở đây chỉ mô tả các dấu hiệu chung.</b-footer>
</b-post>
