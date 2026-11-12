---
title: Harness engineering trong thực tế: biến lỗi của tác nhân AI thành quy tắc của môi trường (HDD)
date: 2026-09-28
updated: 2026-11-13
description: Vòng lặp từ lỗi thành quy tắc, guide và sensor, ba lớp kiểm tra, cách kết hợp với đặc tả và năm bước đầu tiên trong dự án của bạn.
tags: AI, Claude Code, harness engineering, harness, HDD, tác nhân
category: harness
layout: wide
image: /og/harness-driven-development.en.png
mentions: Harness engineering, Claude Code, AGENTS.md, CLAUDE.md, Spec-Driven Development
toc: loop=Vòng lặp HDD | canons=Bố cục 3 × 3 | double=Vòng lặp kép | controls=Guide và sensor | layers=Ba lớp kiểm tra | shift=Càng sớm càng rẻ | human=Con người quan trọng ở đâu | spec=HDD và đặc tả | start=Bắt đầu từ đâu | faq=Câu hỏi | next=Đọc thêm
---

**Harness engineering** là công việc định hình môi trường xung quanh tác nhân AI (AI agent): hướng dẫn, hệ thống được kết nối, quyền và các phép kiểm tra. **Harness-Driven Development (HDD)** là phương pháp làm việc xây trên nền đó: mỗi lỗi của tác nhân trở thành một quy tắc của môi trường ấy. Bắt đầu bằng một tệp hướng dẫn AGENTS.md hoặc CLAUDE.md và một nhật ký lỗi của tác nhân: mỗi tuần một lần, chuyển các mục trong nhật ký thành quy tắc, bài kiểm thử hoặc hook.

<b-post series="hdd">
<b-chapter id="loop" icon="refresh-cw" title="Vòng lặp HDD">
  <b-why align="left">Vòng lặp hoạt động như sau. Tác nhân nhận một tác vụ và tạo ra kết quả. Các sensor (kiểm thử, linter, review) kiểm tra kết quả. Nếu mọi thứ đều qua, tác vụ được đóng. Nếu một sensor phát hiện lỗi, con người thay đổi môi trường của tác nhân, tức harness: thêm một dòng vào hướng dẫn, một kiểm thử hoặc một hook. Tác vụ tiếp theo chạy với quy tắc đó, và lỗi không lặp lại.</b-why>
  <b-hdd-scene name="harness-driven-development/loop" frame="loop"/>
  <b-cap>Nguyên tắc của Mitchell Hashimoto: khi tác nhân mắc lỗi, hãy thay đổi harness để lỗi đó không thể xảy ra nữa <a href="https://www.faros.ai/blog/harness-engineering" target="_blank" rel="noopener">Faros</a></b-cap>
  <b-why>Prompt sửa một yêu cầu, ngữ cảnh sửa những gì mô hình biết, harness sửa mọi lần chạy sau đó. Ví dụ: tác nhân sửa mã mà không chạy kiểm thử.</b-why>
  <b-hdd-scene name="harness-driven-development/fix-levels" frame="fig"/>
  <b-cap>Các giai đoạn theo mô tả của <a href="https://www.faros.ai/blog/harness-engineering" target="_blank" rel="noopener">Faros</a> và <a href="https://marmelab.com/blog/2026/09/24/the-state-of-ai-harness-engineering-2026.html" target="_blank" rel="noopener">marmelab</a></b-cap>
  <b-why align="left">Bảng cho thấy một lỗi (tác nhân sửa mã mà không chạy kiểm thử) và ba cách sửa. Prompt: thêm câu “chạy kiểm thử sau khi sửa”. Cách này chỉ có tác dụng cho một yêu cầu, và yêu cầu kế tiếp bắt đầu lại từ đầu. Ngữ cảnh: ghi điều tương tự vào tệp hướng dẫn của dự án. Mô hình đọc nó nhưng có thể bỏ qua. Harness: thêm một hook tự chạy kiểm thử sau mỗi lần sửa. Nó chạy mà không cần mô hình, nên bản sửa giữ được trong mọi lần chạy sau.</b-why>
  <b-finding>
    <ex>Một lỗi mà các sensor bắt được sẽ đi vào harness như một quy tắc mới, và tác nhân nhận quy tắc đó ở mọi lần chạy sau.</ex>
    <gen>Kết quả sửa tay chỉ giúp được một lần. Quy tắc trong harness (hướng dẫn, kiểm thử hoặc hook) áp dụng cho mọi tác vụ sau này, nên harness ngày càng chính xác mà không cần đổi mô hình.</gen>
    <do>Đặt ra một quy tắc: mọi lỗi của tác nhân mà bạn phải sửa tay sẽ thành một dòng trong hướng dẫn hoặc một kiểm thử ngay trong ngày.</do>
  </b-finding>
</b-chapter>

<b-chapter id="canons" icon="grid" title="Harness được bố trí thế nào: 3 × 3">
  <b-why>Ba miền của vòng lặp và ba ngữ cảnh trong mỗi miền — chín canon. Mỗi canon thuộc đúng một miền và một ngữ cảnh.</b-why>
  <b-hdd-matrix kind="canons" label="Harness được bố trí thế nào: 3 × 3">
    <column icon="book" t="Spec">điều gì phải đúng</column>
    <column icon="sun" t="Skill">cách hành động</column>
    <column icon="database" t="Memory">dựa vào đâu</column>
    <row icon="target" t="Kỳ vọng">cái gì nên có</row>
    <cell>thể loại, lược đồ | mức yêu cầu | hộ chiếu số liệu</cell>
    <cell>dự đoán trước khi hành động</cell>
    <cell>vai trò bộ chấp hành | live · MCP</cell>
    <row icon="eye" t="Quan sát">cái gì đã đo được</row>
    <cell>thứ hạng bằng chứng | định dạng phát hiện | thang đo</cell>
    <cell>sensor ghi lại sự thật</cell>
    <cell>chỉ live</cell>
    <row icon="refresh-cw" t="Vòng lặp">so sánh và quyết định</row>
    <cell>tiêu chí đầy đủ của quy tắc | sổ đăng ký phát hiện</cell>
    <cell>so sánh | đếm lần lặp lại | vá hoặc sửa quy tắc</cell>
    <cell empty>tạm thời trống</cell>
  </b-hdd-matrix>
  <b-hdd-fanin label="Kỳ vọng + Quan sát → Vòng lặp → vá / sửa quy tắc">
    <in icon="target">Kỳ vọng</in>
    <in icon="eye">Quan sát</in>
    <mid icon="refresh-cw" note="✕ không có liên kết ngược">Vòng lặp</mid>
    <out>vá</out>
    <out alt>sửa quy tắc</out>
    <note from="sun" to="book">skill → spec của miền của nó · script hook khi commit kiểm tra chiều này</note>
  </b-hdd-fanin>
  <b-hdd-modes>
    <mode icon="table" t="snapshot">một bảng, cập nhật sau mỗi lần đo mới</mode>
    <mode icon="broadcast-pole" t="live">một giao thức, luôn mới mỗi lần, không lưu gì</mode>
  </b-hdd-modes>
  <b-why align="left">Ma trận đọc như ba câu hỏi. Kỳ vọng: kết quả nên là gì (ví dụ, “sau khi sửa, kiểm thử qua”). Quan sát: thực tế ra sao, do một sensor ghi lại. Vòng lặp: so sánh hai thứ và quyết định làm gì. Mỗi hàng trong ba hàng có ba loại chỗ dựa: spec (điều gì phải đúng), skill (cách hành động) và memory (dựa vào đâu). Các từ “miền” và “canon” ở đây chỉ là tên gọi: miền là một hàng của ma trận, canon là một ô, ví dụ spec của Kỳ vọng. Sơ đồ bên dưới cho thấy chiều của các liên kết: Kỳ vọng và Quan sát nuôi Vòng lặp, và nó cho ra hoặc một bản vá (sửa hành động) hoặc việc sửa các quy tắc. Không có liên kết ngược về Vòng lặp, nên các miền không rối vào nhau. Các chế độ của memory: snapshot là bảng được cập nhật khi có số đo mới; live nghĩa là dữ liệu được lấy từ hệ thống đang chạy (ví dụ qua MCP) mỗi lần và không được lưu.</b-why>
  <b-finding>
    <ex>Vòng lặp chia thành Kỳ vọng, Quan sát và Vòng lặp, mỗi phần có spec, skill và memory riêng. Vòng lặp đọc hai miền kia; chúng không bao giờ đọc Vòng lặp.</ex>
    <gen>Đây là vòng phản hồi âm: giá trị mục tiêu được so với giá trị đo được, và chỉ khi lệch mới có gì đó thay đổi. Chiều tham chiếu chặt chẽ giữ cho các miền không rối, và cùng một khái niệm lặp lại ở hai miền không phải là khuyết điểm.</gen>
    <do>Xếp các tệp của harness vào chín ô và kiểm tra rằng không tệp Kỳ vọng hay Quan sát nào tham chiếu đến Vòng lặp.</do>
  </b-finding>
</b-chapter>

<b-chapter id="double" icon="loop-double" title="Vòng lặp kép">
  <b-why align="left">Vòng lặp kép trả lời câu hỏi chính xác nên thay đổi gì sau một lỗi. Lấy cùng lỗi đó: tác nhân không chạy kiểm thử. Ở vòng đơn, bạn nhắc tác nhân, nó chạy kiểm thử, và các quy tắc vẫn như cũ. Ở vòng kép, bạn hỏi quy tắc nào đã cho phép lỗi và đổi nó: giờ một hook chạy kiểm thử sau mỗi lần sửa. Ý tưởng đến từ lý thuyết học tập của tổ chức (Chris Argyris và Donald Schön): vòng đơn chỉnh hành động, vòng kép xem lại các quy tắc mà hành động xuất phát từ đó. <a href="https://en.wikipedia.org/wiki/Double-loop_learning" target="_blank" rel="noopener">Wikipedia: Double-loop learning</a>.</b-why>
  <b-hdd-loops>
    <loop kind="single" t="vòng đơn">sửa hành động trong cùng các quy tắc</loop>
    <loop kind="double" t="vòng kép" on>thay đổi chính các quy tắc</loop>
  </b-hdd-loops>
  <b-hdd-principles>
    <principle icon="wave-line" t="Vá mà không có dự đoán mới">sửa bằng một quy tắc</principle>
    <principle icon="flask" t="Nhiều phàn nàn">trước hết kiểm tra xem có nguyên nhân chung không</principle>
    <principle icon="history" t="Quy tắc mới">chỉ chấp nhận nếu các trường hợp cũ suy ra được từ nó</principle>
    <principle icon="shield-check" t="Không có kiểm tra bên ngoài">bỏ đi, kèm ghi chép</principle>
  </b-hdd-principles>
  <b-cap>Vòng lặp áp dụng cho chính nó: mỗi lần chạy kết thúc bằng rủi ro còn lại, không bao giờ bằng trạng thái “xong”.</b-cap>
  <b-why align="left">Đổi quy tắc sau mỗi lời phàn nàn là rủi ro: harness bắt đầu phình ra từ những lần sửa ngẫu nhiên. Vì vậy Vòng lặp áp dụng bốn phép kiểm tra. Nếu các bản sửa chỉ vá lỗ hổng và không dự đoán điều gì mới, chúng được thay bằng một quy tắc. Nếu có nhiều phàn nàn, trước hết kiểm tra xem chúng có chung nguyên nhân không. Quy tắc mới chỉ được chấp nhận nếu các trường hợp cũ vẫn được giải thích với nó. Quy tắc không có kiểm tra từ bên ngoài sẽ bị bỏ, nhưng ghi chép nói rõ cái gì bị bỏ và vì sao. Chú thích dưới các thẻ có nghĩa là Vòng lặp cũng áp dụng cho chính nó: một lần chạy kết thúc bằng rủi ro còn lại.</b-why>
  <b-finding>
    <ex>Chuỗi bản vá, phàn nàn, quy tắc mới và kiểm tra bên ngoài là bốn nguyên tắc kiểm chứng được mà Vòng lặp dùng để quyết định nên sửa hành động hay đổi quy tắc.</ex>
    <gen>Vòng đơn sửa kết quả trong các quy tắc cũ. Vòng kép đổi chính các quy tắc, và làm theo các nguyên tắc kiểm chứng được, nên harness học được mà không trôi dạt vì những lần sửa ngẫu nhiên.</gen>
    <do>Khi cùng một bản sửa xuất hiện lần thứ ba, hãy dừng lại và hỏi quy tắc nào gây ra nó. Chỉ đổi quy tắc nếu nó cũng giải thích được các trường hợp cũ.</do>
  </b-finding>
</b-chapter>

<b-chapter id="controls" icon="grid" title="Guide và sensor">
  <b-why align="left">Các phép kiểm tra trong harness chia theo hai đặc điểm. Đặc điểm thứ nhất là khi nào chúng chạy. Guide làm việc trước khi tác nhân hành động và định hướng: kiểu dữ liệu, mẫu mã, hướng dẫn, đặc tả. Sensor làm việc sau hành động và bắt các sai lệch: kiểm thử, linter, review bằng AI. Đặc điểm thứ hai là cách một phép kiểm tra được xây dựng. Kiểm tra tính toán được (kiểu dữ liệu, kiểm thử, linter) chạy trong vài giây và không sai trong phạm vi quy tắc của nó. Kiểm tra bằng AI (review bằng AI, mô hình làm giám khảo) linh hoạt hơn và đắt hơn, nên dành cho phần ý nghĩa: phong cách, độ rõ ràng, độ khớp với ý định.</b-why>
  <b-hdd-matrix kind="guides" label="Ma trận: guide tác động trước tác nhân, sensor tác động sau; mỗi loại là tính toán hoặc dựa trên AI">
    <column icon="arrow-right" t="Guide">trước hành động</column>
    <column icon="eye" t="Sensor">sau hành động</column>
    <row icon="cpu" t="Tính toán" speed="3">nhanh · đáng tin</row>
    <cell>kiểu dữ liệu | mẫu mã | bộ sinh mã</cell>
    <cell>kiểm thử | linter | kiểm tra kiểu</cell>
    <row icon="sparkle-4" t="Dựa trên AI" speed="1">linh hoạt · đắt hơn</row>
    <cell>AGENTS.md · CLAUDE.md | skill | đặc tả</cell>
    <cell>review bằng AI | LLM làm giám khảo</cell>
  </b-hdd-matrix>
  <b-cap>Cách chia theo mô tả trong <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Birgitta Böckeler (martinfowler.com)</a></b-cap>
  <b-finding>
    <ex>Bốn ô: guide định hướng trước khi tác nhân làm việc, sensor bắt sai lệch sau đó, và mỗi loại có thể là tính toán hoặc dựa trên AI.</ex>
    <gen>Kiểm tra tính toán chạy trong vài giây và không mắc lỗi trong phạm vi quy tắc của mình, nên hãy dùng chúng ở mọi nơi có thể viết quy tắc một cách hình thức. Để kiểm tra dựa trên AI cho phần ý nghĩa: phong cách, độ rõ ràng, độ khớp với ý định.</gen>
    <do>Với mỗi quy tắc trong hướng dẫn của tác nhân, hãy hỏi liệu một kiểm thử hay linter có kiểm tra được không. Nếu được, chuyển nó sang đó.</do>
  </b-finding>
</b-chapter>

<b-chapter id="layers" icon="layers" title="Ba lớp kiểm tra">
  <b-why align="left">Các phép kiểm tra được bố trí thành ba lớp. Chất lượng mã: phong cách, định dạng, kiểu dữ liệu, lỗi đơn giản. Kiến trúc: ranh giới module và phụ thuộc giữa chúng, yêu cầu về tốc độ. Hành vi: sản phẩm có làm đúng điều người dùng cần không. Các thanh trong hình cho thấy lớp đó đã học được cách kiểm tra tự động đến mức nào: thanh đầu gần đầy, hành vi có thanh ngắn nhất.</b-why>
  <b-hdd-layers label="Ba lớp: chất lượng mã trưởng thành nhất, kiến trúc ở giữa, hành vi kém trưởng thành nhất">
    <layer icon="brush" t="Chất lượng mã" value="88">trưởng thành</layer>
    <layer icon="modules" t="Kiến trúc" value="55">đang phát triển</layer>
    <layer icon="user-round" t="Hành vi" value="25" sw="1.8">khó nhất</layer>
  </b-hdd-layers>
  <b-cap>Mức trưởng thành của các lớp theo đánh giá của <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Birgitta Böckeler (martinfowler.com)</a></b-cap>
  <b-finding>
    <ex>Chất lượng mã là dễ kiểm tra nhất hiện nay, còn hành vi sản phẩm là khó nhất.</ex>
    <gen>Linter và công cụ định dạng phủ lớp đầu gần như ngay lập tức. Kiến trúc được kiểm tra bằng quy tắc phụ thuộc và yêu cầu hiệu năng. Hành vi vẫn cần kiểm thử kịch bản tốt và con mắt của con người.</gen>
    <do>Bắt đầu với lớp đầu: chạy linter và công cụ định dạng ở mỗi lần tác nhân chạy, rồi thêm một quy tắc về ranh giới module.</do>
  </b-finding>
</b-chapter>

<b-chapter id="shift" icon="clock" title="Càng sớm càng rẻ">
  <b-why align="left">Mọi phép kiểm tra chạy vào một thời điểm nào đó, và càng sớm thì sửa lỗi càng rẻ. Hình cho thấy bốn thời điểm: trước khi tác nhân làm việc (hướng dẫn và đặc tả), lúc viết (hook và linter), trong CI (build và kiểm thử tự động khi đẩy mã lên repository) và trong review của con người. Các dấu $ cho thấy giá của lỗi tăng dần.</b-why>
  <b-hdd-cost label="Kiểm tra chạy càng sớm thì lỗi càng rẻ: trước khi tác nhân bắt đầu, khi viết, trong CI, khi review">
    <stage icon="arrow-right" t="Trước khi làm" cost="$">hướng dẫn · đặc tả</stage>
    <stage icon="cpu" t="Khi viết" cost="$$">hook · linter</stage>
    <stage icon="refresh-cw" t="Trong CI" cost="$$$" sw="1.8">kiểm thử · build</stage>
    <stage icon="user-round" t="Khi review" cost="$$$$" sw="1.8">một con người</stage>
  </b-hdd-cost>
  <b-why align="left">Kiểm thử được chạy bởi các engine như [QUnit](/materials/glossary/qunit/), [Jest](/materials/glossary/jest/) và [Vitest](/materials/glossary/vitest/). Chúng khác nhau thế nào và nên chọn cái nào được nói trong bài [Vitest vs Jest: chọn cái nào cho dự án JavaScript, và khi nào QUnit là đủ](/blog/jest-vs-vitest-vs-qunit/). Các quy tắc về hành vi mà kiểm thử thông thường không kiểm tra được sẽ được tìm ra bằng một [mô hình trong Quint](/blog/quint-vs-tests-and-tla/).</b-why>
  <b-finding>
    <ex>Cùng một lỗi tốn ít nhất trước khi tác nhân bắt đầu và tốn nhất ở review của con người.</ex>
    <gen>Hãy đặt các phép kiểm tra nhanh càng sớm càng tốt: tác nhân tự sửa vấn đề khi ngữ cảnh tác vụ còn ngay trước mặt, và chỉ các điểm còn tranh cãi mới đến tay con người.</gen>
    <do>Nối kiểm thử và linter vào một hook mà tác nhân chạy sau mỗi lần sửa, ngoài CI.</do>
  </b-finding>
</b-chapter>

<b-chapter id="human" icon="user-round" title="Con người quan trọng ở đâu">
  <b-why align="left">Harness đảm nhận các phép kiểm tra thường lệ: phong cách, kiểu dữ liệu, kiểm thử, ranh giới module. Con người quyết định những gì phép kiểm tra hình thức không phủ được: kiến trúc, câu hỏi về sản phẩm và các quy tắc mới. Các con số trong hình là một tỷ lệ ví dụ: 36 phép kiểm tra cho harness và 6 cho con người.</b-why>
  <b-hdd-split label="Harness xử lý các phép kiểm tra thường lệ; con người quyết định kiến trúc, câu hỏi về sản phẩm và cải thiện chính harness">
    <side icon="sun" t="Harness" n="36">phong cách · kiểu dữ liệu · kiểm thử · ranh giới</side>
    <side icon="user-round" t="Con người" n="6" sw="1.8">kiến trúc · sản phẩm · quy tắc mới</side>
  </b-hdd-split>
  <b-cap>“Một harness tốt giữ con người trong vòng lặp và hướng sự chú ý của họ vào nơi quan trọng nhất” — diễn giải từ <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Birgitta Böckeler (martinfowler.com)</a></b-cap>
  <b-finding>
    <ex>Harness đảm nhận phần lớn các phép kiểm tra; con người giữ các quyết định và công việc cải thiện harness.</ex>
    <gen>Một lập trình viên giàu kinh nghiệm mang trong đầu một harness ngầm: hiểu biết về kiến trúc, thói quen của nhóm, cảm giác về rủi ro. HDD chuyển hiểu biết đó thành các quy tắc tường minh, để mỗi lần tác nhân chạy đều nhận được nó.</gen>
    <do>Sau mỗi lần review mã của tác nhân, ghi lại một nhận xét cứ lặp đi lặp lại và biến nó thành quy tắc.</do>
  </b-finding>
</b-chapter>

<b-chapter id="spec" icon="file-text" sw="2" title="HDD và đặc tả">
  <b-why align="left">Đặc tả và harness bổ sung cho nhau. Đặc tả trả lời “kết quả phải là gì”, harness kiểm tra rằng đúng điều đó đã ra. Trong hình, đặc tả đặt ra kết quả cần có, harness kiểm tra nó, và mã được chấp nhận theo kết quả các phép kiểm tra thay vì đọc từng dòng.</b-why>
  <b-hdd-specflow label="Đặc tả đặt mục tiêu; harness kiểm tra rằng tác nhân đã đạt được nó">
    <node icon="target" t="Đặc tả">kết quả bạn cần</node>
    <node icon="sun" t="Harness">cách kiểm tra là đã đạt</node>
    <node icon="check-circle-alt" t="Mã được chấp nhận">không cần review thủ công từng dòng</node>
  </b-hdd-specflow>
  <b-cap>“Specs define the target state, the harness is the control system” — <a href="https://loiane.com/2026/04/harness-engineering-missing-layer-specs-driven-ai-development/" target="_blank" rel="noopener">Loiane Groner</a>. Thêm về đặc tả trong bài nói <a href="/talk/spec-driven-development/">Spec-Driven Development trong thực tế</a></b-cap>
  <b-finding>
    <ex>Đặc tả trả lời “đang xây cái gì”, harness trả lời “làm sao biết đã xây xong”.</ex>
    <gen>Không có đặc tả thì harness không có gì để kiểm tra, và không có harness thì đặc tả chỉ là một tài liệu. Kết hợp lại, chúng cho phép chấp nhận mã của tác nhân dựa trên các phép kiểm tra thay vì đọc từng dòng.</gen>
    <do>Với mỗi yêu cầu trong đặc tả, ghi lại kiểm thử hoặc phép kiểm tra nào sẽ xác nhận yêu cầu đó được đáp ứng.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="Bắt đầu từ đâu">
  <b-why align="left">Không cần thiết kế harness trọn vẹn ngay từ đầu. Bắt đầu với năm bước: hai bước đầu dựng môi trường ngay, ba bước còn lại khởi động vòng “lỗi → quy tắc”. Tệp tiến độ cần khi tác vụ dài hơn một phiên: nó giữ danh sách tính năng kèm trạng thái, và phiên mới của tác nhân tiếp tục từ đúng chỗ đó.</b-why>
  <b-hdd-steps>
    <step t="Tệp hướng dẫn cho tác nhân">AGENTS.md hoặc CLAUDE.md ở thư mục gốc dự án: cách build, cách kiểm thử, điều không được làm</step>
    <step t="Linter và kiểm thử sau mỗi lần sửa">một hook mà tác nhân tự chạy trước khi giao kết quả</step>
    <step t="Nhật ký lỗi của tác nhân">mỗi lỗi sửa tay được ghi một dòng kèm nguyên nhân</step>
    <step t="Lỗi → quy tắc">mỗi tuần một lần, chuyển các mục trong nhật ký thành hướng dẫn, kiểm thử hoặc hook</step>
    <step t="Tệp tiến độ cho tác vụ dài">danh sách tính năng kèm trạng thái và lịch sử commit, để phiên mới tiếp tục từ chỗ phiên trước dừng <a href="https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents" target="_blank" rel="noopener">Anthropic</a></step>
  </b-hdd-steps>
  <b-finding>
    <ex>Năm bước: hai bước dựng harness ngay, ba bước khởi động vòng “lỗi → quy tắc”.</ex>
    <gen>Không ai thiết kế harness đầy đủ từ trước. Nó lớn lên từ các lỗi thật của tác nhân trong dự án của bạn, và sau vài tuần tác nhân thôi lặp lại những lỗi phổ biến nhất.</gen>
    <do>Hôm nay hãy tạo tệp hướng dẫn và nhật ký lỗi. Một tuần sau, chuyển các mục đầu tiên trong nhật ký thành quy tắc.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Harness engineering là gì?">Là việc thiết lập môi trường xung quanh tác nhân AI: hướng dẫn, công cụ, quyền và các phép kiểm tra.</q>
    <q t="HDD là gì?">Harness-Driven Development: phương pháp trong đó mỗi lỗi của tác nhân trở thành một quy tắc của môi trường, một hướng dẫn, một kiểm thử hoặc một hook.</q>
    <q t="Vì sao quy tắc tốt hơn sửa tay?">Kết quả sửa tay chỉ giúp một lần, còn quy tắc trong harness có tác dụng cho mọi tác vụ sau này.</q>
    <q t="Bắt đầu với HDD như thế nào?">Tạo một tệp hướng dẫn cho tác nhân và một nhật ký lỗi của nó, rồi mỗi tuần một lần chuyển các mục trong nhật ký thành quy tắc, kiểm thử hoặc hook.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Đọc thêm">
  <b-links cols="2">
    <item href="/blog/work-prompts-examples/" k="Giai đoạn 1–2" t="Prompt cho công việc">cách viết một yêu cầu đơn lẻ và cung cấp dữ liệu</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Giai đoạn 3" t="So sánh các harness">Claude Code, Codex, Cursor, Hermes và chat</item>
  </b-links>
  <b-cap>Đọc thêm: <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Birgitta Böckeler (martinfowler.com)</a> · <a href="https://www.anthropic.com/engineering/harness-design-long-running-apps" target="_blank" rel="noopener">Anthropic: Harness design</a> · <a href="https://leanpub.com/becoming-a-harness-driven-developer" target="_blank" rel="noopener">Becoming a Harness-Driven Developer</a> · <a href="https://github.com/ai-boost/awesome-harness-engineering" target="_blank" rel="noopener">awesome-harness-engineering</a></b-cap>
</b-chapter>
<b-footer>Thuật ngữ và cách chia lớp dựa theo các nguồn được dẫn ở chú thích dưới các sơ đồ.</b-footer>
</b-post>
