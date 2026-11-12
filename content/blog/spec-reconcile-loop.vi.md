---
title: Vòng đối chiếu (reconcile loop) cho đặc tả: như Kubernetes, đặc tả là trạng thái mong muốn còn code là trạng thái thực tế
date: 2026-09-28
updated: 2026-11-13
description: Phát triển dựa trên đặc tả với vòng đối chiếu: ai thay đổi trạng thái mong muốn và ai đưa code về đó, vì sao test xanh chưa có nghĩa là “đúng”, và tác nhân cần sáu khả năng nào của môi trường để khép vòng.
tags: AI, phát triển dựa trên đặc tả, đặc tả, Kubernetes, harness
category: specs
layout: wide
image: /og/spec-reconcile-loop.en.png
mentions: Kubernetes, reconcile loop, human-in-the-loop, Model Context Protocol, Spec-Driven Development
toc: k8s=Như Kubernetes | sensors=Giới hạn của kiểm tra | env=Môi trường | faq=Câu hỏi | next=Đọc tiếp
---

Vòng đối chiếu (reconcile loop) cho đặc tả hoạt động như một controller trong Kubernetes: con người thay đổi trạng thái mong muốn (đặc tả), tác nhân so nó với trạng thái thực tế (code) và đưa code về khớp, còn test đo kết quả. Test xanh chỉ kiểm tra điều đã viết vào chúng, nên mỗi MUST cần một phép kiểm tra riêng, và môi trường của tác nhân cần có khả năng chạy code, test, log, dữ liệu, dịch vụ và sandbox.

<b-post series="rec">
<b-hchain label="Chuỗi đối chiếu: mong muốn là đặc tả, người thực hiện là tác nhân, thực tế là code, phép đo là test">
  <step icon="book" t="Mong muốn">đặc tả</step>
  <step icon="bot" t="Người thực hiện">tác nhân</step>
  <step icon="code-slash" t="Thực tế">code</step>
  <step icon="gauge" sw="1.8" t="Phép đo">test</step>
</b-hchain>
<b-chapter id="k8s" title="Cùng một vòng lặp như trong Kubernetes" icon="hub" sw="1.6">
  <b-why align="left">Kubernetes là hệ thống chạy các dịch vụ và giữ cho chúng hoạt động trên nhiều máy chủ. Ý chính của nó đơn giản: con người mô tả mọi thứ phải như thế nào (“giữ ba bản sao của dịch vụ”), và một chương trình giám sát, controller, liên tục so bản mô tả với thứ đang thực sự tồn tại và sửa những chỗ khác biệt. Đó là vòng đối chiếu. Với đặc tả, cơ chế này cũng hoạt động như vậy: con người đặt trạng thái mong muốn, và tác nhân có thể đưa code về đó.</b-why>
  <b-why>Trạng thái mong muốn ở đây là <a href="/blog/specs-by-aggregates/">từ điển aggregate</a>: mỗi khái niệm một mục, các yêu cầu được đánh dấu MUST và SHOULD.</b-why>
  <b-k8s-loop label="Kubernetes: chart, controller, node, probe. Đặc tả: từ điển, tác nhân, code, test. Con người chỉ thay đổi trạng thái mong muốn, còn người thực hiện liên tục đối chiếu phép đo với nó." cols="mong muốn | người thực hiện | thực tế | phép đo" human="con người thay đổi trạng thái mong muốn" back="phép đo → người thực hiện, lặp đi lặp lại">
    <b-k8s-row icon="hub" sw="1.6" t="Kubernetes">
      <cell on>chart · manifest</cell>
      <cell>controller</cell>
      <cell>node · pod</cell>
      <cell>probe · metric</cell>
    </b-k8s-row>
    <b-k8s-row icon="book" t="Đặc tả">
      <cell on>từ điển · MUST</cell>
      <cell hz>tác nhân</cell>
      <cell>code</cell>
      <cell hz>test · chất lượng</cell>
    </b-k8s-row>
    <b-k8s-row icon="help" t="Nói giản dị">
      <cell>nó phải như thế nào</cell>
      <cell>ai đưa nó tới đó</cell>
      <cell>giờ nó đang thế nào</cell>
      <cell>cái gì so chúng với nhau</cell>
    </b-k8s-row>
  </b-k8s-loop>
  <b-why align="left">Cách đọc hình. Bốn cột là bốn vai trò của vòng lặp, hai hàng là hai hệ thống, và hàng thứ ba diễn đạt các thuật ngữ bằng lời giản dị. Trạng thái mong muốn (ô được tô đậm) là thứ con người thay đổi. Trong Kubernetes đó là chart và manifest: các file nói những phần nào của dịch vụ phải chạy và chạy bao nhiêu. Trong đặc tả đó là từ điển aggregate với các từ MUST (“bắt buộc”) và SHOULD (“khuyến nghị”). Người thực hiện đưa trạng thái thực tế về trạng thái mong muốn: trong Kubernetes là controller, trong đặc tả là tác nhân. Trạng thái thực tế là thứ đang tồn tại: node (máy chủ) và pod (các phần của dịch vụ chạy trên đó), hoặc code. Phép đo cho biết chúng có khớp không: probe (phép kiểm tra tự động ngắn kiểu “bạn còn chạy không?”) và metric, hoặc test và các kiểm tra chất lượng. Mũi tên đi xuống ở trên cùng nghĩa là con người chỉ thay đổi trạng thái mong muốn. Mũi tên vòng ở dưới cùng nghĩa là phép đo quay lại người thực hiện, và cứ thế cho đến khi chúng khớp. Ví dụ: con người viết vào từ điển “một lượt đặt chỗ đóng sau 15 phút”, tác nhân đổi code, test kiểm tra, và một test đỏ đưa tác nhân quay lại code.</b-why>
  <b-cap>Vòng đối chiếu theo <a href="https://kubernetes.io/docs/concepts/architecture/controller/" target="_blank" rel="noopener">tài liệu Kubernetes về controller</a>.</b-cap>
  <b-finding>
    <ex>Trong Kubernetes, con người sửa chart và controller đưa các node về khớp. Ở đây con người sửa từ điển và tác nhân đưa code về khớp rồi kiểm tra bằng test.</ex>
    <gen>Cả hai hệ thống giữ trạng thái mong muốn tách khỏi trạng thái thực tế và đối chiếu chúng trong một vòng lặp. Con người trong vòng lặp chỉ thay đổi trạng thái mong muốn, nên mỗi chỉnh sửa lập tức thành việc cho người thực hiện.</gen>
    <do>Sửa yêu cầu trong từ điển thay vì sửa code bằng tay, và chạy tác nhân với nhiệm vụ đưa code về khớp với từ điển.</do>
  </b-finding>
</b-chapter>
<b-chapter id="sensors" title="Một phép kiểm tra chỉ thấy điều đã được đặt vào nó" icon="gauge">
  <b-why align="left">Một phép kiểm tra chỉ cho thấy điều đã được đặt vào nó. Trong Kubernetes, probe là một yêu cầu tự động ngắn gửi tới dịch vụ: “bạn có đang phản hồi không?”. Nếu dịch vụ trả lời “200” (mã thành công), probe xanh dù dịch vụ có thể không làm việc chính: chẳng hạn hàng đợi đơn hàng bị kẹt. Với đặc tả cũng như vậy với test. Nếu một yêu cầu không có test, mọi test vẫn xanh và không ai nhận ra yêu cầu chưa được đáp ứng.</b-why>
  <b-why>Ví dụ là việc đặt phòng họp trong <a href="/blog/specs-by-aggregates/">Đặc tả theo aggregate</a>: ba yêu cầu MUST và một SHOULD.</b-why>
  <b-probe-check>
    <b-probe-panel icon="hub" sw="1.6" t="Kubernetes" verdict="probe xanh, dịch vụ không chạy">
      <probe kind="ok" note="probe">dịch vụ trả lời “200: đang chạy”</probe>
      <probe kind="no" note="không được kiểm tra">đơn hàng không được xử lý</probe>
    </b-probe-panel>
    <b-probe-panel icon="book" t="Đặc tả" verdict="test xanh, một MUST chưa được kiểm tra">
      <probe kind="ok" note="có test">MUST · các lượt đặt của một phòng không chồng nhau</probe>
      <probe kind="ok" note="có test">MUST · trạng thái đặt chỗ chỉ đi tiến</probe>
      <probe kind="no" note="không có kiểm tra">MUST · nếu không được xác nhận, lượt đặt đóng sau 15 phút</probe>
      <probe kind="eye" note="con người xem">SHOULD · xác nhận đến qua cùng kênh</probe>
      <cov t="MUST được phủ" value="67">2 / 3</cov>
    </b-probe-panel>
    <rule>mỗi MUST cần phép kiểm tra riêng</rule>
    <rule>MUST không có kiểm tra là một lỗ hổng</rule>
    <rule>xanh không có nghĩa là đúng</rule>
  </b-probe-check>
  <b-why align="left">Cách đọc hình. Bên trái là Kubernetes: probe nhận câu trả lời “200: đang chạy” và xanh, nhưng đơn hàng không được xử lý, nên probe không kiểm tra điều chính. Bên phải là đặc tả, lấy ví dụ đặt phòng họp: ba yêu cầu MUST và một SHOULD. Hai MUST được test phủ (các lượt đặt không chồng nhau, trạng thái chỉ đi tiến). MUST thứ ba, “nếu không được xác nhận, lượt đặt đóng sau 15 phút”, không ai kiểm tra. Con người xem lại SHOULD về kênh. 2 trong 3 MUST được phủ, tức 67%. Ba quy tắc dưới sơ đồ: mỗi MUST có phép kiểm tra riêng; MUST không có kiểm tra được tính là lỗ hổng cần lấp; kết quả xanh chưa có nghĩa là mọi thứ đều đúng.</b-why>
  <b-cap>Có những probe nào và chúng kiểm tra gì: <a href="https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/" target="_blank" rel="noopener">Kubernetes: probe</a>.</b-cap>
  <b-finding>
    <ex>Probe trả lời “200” trong khi đơn hàng bị kẹt, và test đặt chỗ xanh trong khi không ai kiểm tra quy tắc 15 phút.</ex>
    <gen>Một phép kiểm tra chỉ xác nhận điều đã được viết vào nó và không nói gì về phần còn lại. Vì vậy thẻ aggregate được so với các phép kiểm tra: MUST không có kiểm tra là lỗ hổng, không phải yêu cầu đã đáp ứng.</gen>
    <do>Đi qua các MUST trong từ điển của bạn và đánh dấu những cái không có test. Biến mỗi cái thành một nhiệm vụ, hoặc chủ động hạ nó xuống SHOULD.</do>
  </b-finding>
</b-chapter>
<b-chapter id="env" title="Môi trường quyết định vòng lặp có khép lại được không" icon="terminal-screen">
  <b-why align="left">Vòng lặp chỉ khép lại nếu người thực hiện có mọi thứ cần để đối chiếu. Controller của Kubernetes hoạt động được vì cluster cho nó quyền truy cập vào mọi thứ nó cần. Với tác nhân, môi trường này gọi là harness: môi trường xung quanh nó làm việc, với các chương trình, quyền và phép kiểm tra.</b-why>
  <b-env-caps>
    <side icon="hub" sw="1.6" t="Cluster Kubernetes">nơi controller hoạt động</side>
    <side icon="terminal-screen" sw="1.8" t="Harness">nơi tác nhân hoạt động</side>
    <cap icon="play" t="Chạy code">tác nhân đoán chương trình hoạt động thế nào</cap>
    <cap icon="flask" t="Test">không có gì để kiểm tra MUST</cap>
    <cap icon="log-lines" t="Log">không thấy chính xác cái gì hỏng</cap>
    <cap icon="database" t="Dữ liệu thử">kiểm tra chạy trên cơ sở dữ liệu rỗng</cap>
    <cap icon="plug" t="Dịch vụ qua MCP">kiểm tra tích hợp trong mù mờ</cap>
    <cap icon="shield-check" t="Sandbox và quyền">quá rủi ro để cho tác nhân hành động</cap>
  </b-env-caps>
  <b-cta href="/blog/ai-in-code-harness-and-tools/" k="Bài riêng" t="Chọn môi trường: so sánh các harness" icon="terminal-screen" sw="1.8">Claude Code, Codex, Cursor, Hermes và chat trên cùng một bản đồ</b-cta>
  <b-why align="left">Sáu khả năng trong hình là những gì tác nhân cần để khép vòng, và điều xảy ra khi thiếu từng cái. Không chạy được code thì tác nhân đoán chương trình hoạt động thế nào. Không có test thì không kiểm tra được MUST. Không có log thì không thấy chính xác cái gì hỏng. Không có dữ liệu thử thì kiểm tra chạy trên cơ sở dữ liệu rỗng và không cho thấy gì. Không có dịch vụ qua MCP thì các tích hợp được kiểm tra trong mù mờ. Không có sandbox (nơi tách biệt để thử và làm hỏng một cách an toàn) thì đáng ngại khi cho tác nhân hành động. Nếu thiếu một khả năng nào đó, vòng lặp hở ở điểm đó.</b-why>
  <b-finding>
    <ex>Controller của Kubernetes hoạt động được vì cluster cho nó một API, các node và probe. Để có cùng vòng lặp, tác nhân cần chạy code, test, log, dữ liệu, dịch vụ và sandbox.</ex>
    <gen>Từ điển đặt trạng thái mong muốn, nhưng chỉ ai chạy và đo được code mới đối chiếu nó với trạng thái đó. Môi trường thiếu gì thì tác nhân không kiểm tra được cái đó, và vòng lặp vẫn hở ở điểm ấy.</gen>
    <do>Đánh dấu tác nhân của bạn có những khả năng nào trong sáu khả năng. Với mỗi khả năng còn thiếu, quyết định thêm nó vào harness hay đổi harness.</do>
  </b-finding>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Vòng đối chiếu cho đặc tả là gì?">Một vòng lặp trong đó con người thay đổi trạng thái mong muốn, tức đặc tả, tác nhân so code với nó và đưa code về khớp, còn test đo kết quả. Controller của Kubernetes hoạt động theo cách này.</q>
    <q t="Vì sao test xanh là chưa đủ?">Một test chỉ xác nhận điều đã được viết vào nó. Vì vậy mỗi yêu cầu MUST cần một phép kiểm tra riêng.</q>
    <q t="Môi trường của tác nhân cần gì để khép vòng?">Chạy code, test, log, dữ liệu, dịch vụ và sandbox. Môi trường thiếu gì thì tác nhân không kiểm tra được cái đó.</q>
    <q t="Con người thay đổi gì trong vòng lặp này?">Chỉ trạng thái mong muốn, tức đặc tả. Mọi chỉnh sửa lập tức thành việc cho tác nhân.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Đọc tiếp">
  <b-links cols="3">
    <item href="/blog/specs-by-aggregates/" k="Trạng thái mong muốn" t="Đặc tả theo aggregate">từ điển, yêu cầu RFC và các ngữ cảnh</item>
    <item href="/blog/harness-driven-development/" k="Vòng lặp lỗi" t="Harness-Driven Development">sai sót của tác nhân trở thành quy tắc thế nào</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Môi trường" t="So sánh các harness">tác nhân làm việc ở đâu và thấy gì</item>
    <item href="/blog/openspec/" k="Đặc tả" t="Cài đặt và lệnh OpenSpec">đặc tả và thay đổi trong tệp cạnh mã</item>
  </b-links>
</b-chapter>
<b-footer compact>Ví dụ đặt chỗ được bịa ra. Thuật ngữ và cách tiếp cận theo các nguồn dẫn dưới các sơ đồ.</b-footer>
</b-post>
