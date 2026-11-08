---
title: Đặc tả theo aggregate: yêu cầu RFC và bounded context thay cho một đặc tả mỗi tính năng
date: 2026-09-28
updated: 2026-11-08
description: Phát triển dựa trên đặc tả mà không để đặc tả sinh sôi: cách giữ đặc tả trong một từ điển aggregate để chúng không nhân lên theo từng tính năng: các mức yêu cầu, thẻ aggregate và ranh giới ngữ cảnh.
tags: AI, phát triển dựa trên đặc tả, đặc tả, DDD, tác nhân
category: specs
layout: wide
image: /og/specs-by-aggregates.en.png
mentions: RFC 2119, Domain-Driven Design, OpenSpec, Spec-Driven Development
toc: growth=Vì sao đặc tả chất đống | rfc=Các mức RFC | card=Thẻ aggregate | contexts=Ngữ cảnh | faq=Câu hỏi | next=Đọc tiếp
---

Đặc tả theo aggregate nghĩa là mỗi khái niệm của miền nghiệp vụ, như một lượt đặt chỗ hay một đơn hàng, có một mục riêng, thay vì một đặc tả riêng cho mỗi tính năng. Tính năng chỉ bổ sung yêu cầu vào đúng mục, nên các file không nhân lên theo từng nhiệm vụ và một khái niệm không trôi dạt giữa các đặc tả. Yêu cầu dùng các mức RFC: MUST được kiểm bằng test, SHOULD kiểm ở bước xem lại. Bên dưới là thẻ aggregate và ranh giới các ngữ cảnh.

<b-post series="agg">
<b-hchain label="Chuỗi: bounded context, aggregate, bất biến mức MUST, kiểm tra">
  <step icon="workflow" sw="1.8" t="Ngữ cảnh">đặt chỗ</step>
  <step icon="cube" t="Aggregate">Reservation</step>
  <step icon="list-check" sw="1.8" t="Bất biến">MUST</step>
  <step icon="flask" t="Kiểm tra">test</step>
</b-hchain>
<b-chapter id="growth" title="Vì sao đặc tả chất đống" icon="bar-chart-rise">
  <b-spec-growth>
    <b-growth-panel icon="file" t="Đặc tả cho mỗi tính năng" sub="khái niệm được mô tả ở mọi tính năng" files="101101010110" n="12 file" note="“Đặt chỗ” ở 7" chip="tăng theo số tính năng"></b-growth-panel>
    <b-growth-panel good icon="cube" t="Từ điển aggregate" sub="khái niệm được mô tả một lần" n="4 mục" note="“Đặt chỗ” ở 1" chip="tăng theo miền nghiệp vụ">
      <agg dots="5">Reservation</agg>
      <agg dots="3">Room</agg>
      <agg dots="2">TimeSlot</agg>
      <agg dots="2">Member</agg>
    </b-growth-panel>
    <step>Tính năng 13</step>
    <step em="+1 MUST">[booking::Reservation]</step>
    <step em="+1">test</step>
  </b-spec-growth>
  <b-cap>Các con số chỉ mang tính minh họa. Cách <a href="https://github.com/Fission-AI/OpenSpec" target="_blank" rel="noopener">OpenSpec</a> tổ chức đặc tả và thay đổi: các thư mục specs/ và changes/, thay đổi đã xong được chuyển vào kho lưu trữ.</b-cap>
  <b-finding>
    <ex>Mười hai tính năng sinh ra mười hai đặc tả, và việc đặt chỗ được mô tả ở bảy trong số đó, mỗi nơi một chút khác nhau. Trong từ điển, cũng mười hai tính năng đó chỉ thêm dòng vào bốn mục aggregate.</ex>
    <gen>Khi đặc tả gắn với một thay đổi hay một tính năng, mỗi nhiệm vụ lại thêm file, và một khái niệm trôi dạt qua nhiều nơi. Khi đơn vị là aggregate, số mục bị chặn bởi chính miền nghiệp vụ, và một tính năng chỉ bổ sung yêu cầu vào một mục.</gen>
    <do>Liệt kê các khái niệm xuất hiện ở ba đặc tả trở lên và cho mỗi khái niệm một mục duy nhất trong từ điển. Để các đặc tả tính năng liên kết tới mục đó thay vì kể lại nó.</do>
  </b-finding>
</b-chapter>
<b-chapter id="rfc" title="Các mức yêu cầu theo RFC 2119" icon="list-check">
  <b-rfc-levels cols="Từ | Ý nghĩa | Độ mạnh | Kiểm tra">
    <level k="MUST" s="5" w="100" check="test" t="test tự động" note="chặn">bắt buộc</level>
    <level k="MUST NOT" s="5" w="100" check="test" t="test tự động" note="chặn">bị cấm</level>
    <level k="SHOULD" s="3" w="60" check="review" t="xem lại" note="cảnh báo">mặc định, chỉ lệch khi có lý do</level>
    <level k="MAY" s="1" w="20" check="none" t="không" note="không kiểm tra">được phép</level>
    <syn>MUST = SHALL</syn>
  </b-rfc-levels>
  <b-cap>Các từ và ý nghĩa theo <a href="https://www.rfc-editor.org/rfc/rfc2119" target="_blank" rel="noopener">RFC 2119</a>. Mỗi từ ứng với một kiểu kiểm tra riêng.</b-cap>
  <b-finding>
    <ex>Trong mục đặt chỗ, “các khoảng thời gian không chồng nhau” là MUST được kiểm bằng test, còn “xác nhận đi qua cùng kênh” là SHOULD được xem ở bước xem lại.</ex>
    <gen>Từ chỉ mức yêu cầu cho biết ngay cách kiểm tra và việc cần làm khi vi phạm. Tác nhân đọc MUST như một ranh giới và SHOULD như một mặc định, và không nhầm lẫn chúng.</gen>
    <do>Viết lại các yêu cầu trong đặc tả của bạn bằng bốn từ này và đặt test kiểm tra nó cạnh mỗi MUST.</do>
  </b-finding>
</b-chapter>
<b-chapter id="card" title="Thẻ aggregate" icon="card-lines">
  <b-aggregate-card label="Mục ví dụ cho aggregate Reservation trong ngữ cảnh đặt chỗ: địa chỉ, bất biến, lệnh, quyền truy cập, liên kết và đặc tả tính năng">
    <field icon="id-card" t="địa chỉ: ngữ cảnh::tên">## [booking::Reservation]&#10;Class: aggregate&#10;Description: Một phòng họp được đặt cho một khoảng thời gian.</field>
    <field icon="list-check" sw="1.8" t="yêu cầu → kiểm tra">Invariants:&#10;  - MUST: các lượt đặt đang hoạt động của một phòng không bao giờ chồng nhau&#10;  - MUST: held → confirmed → closed, chỉ đi tiến&#10;  - MUST: held mà chưa xác nhận sau 15 phút → closed&#10;  - SHOULD: xác nhận qua kênh đã dùng để đặt</field>
    <field icon="play" t="cách duy nhất để thay đổi nó">Commands: HoldRoom, ConfirmReservation,&#10;          CancelReservation</field>
    <field icon="user" t="ai được phép">Access:&#10;  CanHoldRoom: [booking::Role::Member]&#10;  CanCancelReservation: Member (của mình), Admin</field>
    <field icon="link" t="liên kết theo id">Depends on: [[booking::Room]], [[booking::TimeSlot]]</field>
    <field icon="file" t="nó đến từ tính năng nào">Spec: [[room-booking]]</field>
  </b-aggregate-card>
  <b-cap>Ví dụ được bịa ra. Thuật ngữ theo <a href="https://martinfowler.com/bliki/DDD_Aggregate.html" target="_blank" rel="noopener">Martin Fowler: DDD Aggregate</a>.</b-cap>
  <b-finding>
    <ex>Toàn bộ việc đặt chỗ là một thẻ: một địa chỉ, bốn yêu cầu, ba lệnh, quyền, liên kết và tính năng mà nó đến từ đó.</ex>
    <gen>Aggregate là một ranh giới mà bên trong nó các yêu cầu luôn đúng, và nó chỉ thay đổi được qua các lệnh của chính nó. Vì vậy thẻ giữ các quy tắc cạnh những cách duy nhất để phá chúng.</gen>
    <do>Cho mỗi aggregate một thẻ sáu trường. Nếu một yêu cầu không gán được cho aggregate nào, nhiều khả năng aggregate đó chưa được đặt tên.</do>
  </b-finding>
</b-chapter>
<b-chapter id="contexts" title="Bounded context" icon="workflow">
  <b-ctx-map>
    <ctx name="booking">Reservation, Room, TimeSlot</ctx>
    <ctx name="billing">Invoice, Tariff</ctx>
    <ctx name="access">Pass, Level</ctx>
  </b-ctx-map>
  <b-ctx-links t="liên kết giữa các ngữ cảnh chỉ đi theo id">
    <ref from="billing::Invoice" to="booking::Reservation"/>
    <ref from="access::Pass" to="booking::Reservation"/>
  </b-ctx-links>
  <b-ctx-clash word="“Level”" note="một từ, hai thuật ngữ, nhãn khác nhau">
    <sense code="booking::Room.floor">Tầng</sense>
    <sense code="access::Level">Cấp quyền</sense>
  </b-ctx-clash>
  <b-ctx-rules>
    <rule icon="id-card">một thuật ngữ = một mục</rule>
    <rule icon="link">liên kết dạng [[ctx::Name]]</rule>
    <rule icon="fork">cùng một từ → các mục riêng</rule>
    <rule icon="cycle">từ điển đổi cùng đặc tả</rule>
  </b-ctx-rules>
  <b-cap>Cách tiếp cận là <a href="https://martinfowler.com/bliki/BoundedContext.html" target="_blank" rel="noopener">Bounded Context</a> và <a href="https://martinfowler.com/bliki/UbiquitousLanguage.html" target="_blank" rel="noopener">Ubiquitous Language</a>.</b-cap>
  <b-finding>
    <ex>Hóa đơn và thẻ ra vào tham chiếu tới một lượt đặt chỗ theo id và không biết gì về bên trong nó. “Level” nghĩa là tầng ở đặt chỗ và là cấp quyền ở truy cập, và đây là hai mục riêng.</ex>
    <gen>Ngữ cảnh là vùng mà mỗi từ có một nghĩa. Khi một từ xuất hiện ở hai ngữ cảnh, hãy tạo hai thuật ngữ với nhãn khác nhau; nếu không, tác nhân sẽ mang quy tắc của bên này sang bên kia.</gen>
    <do>Phân các aggregate của bạn vào các ngữ cảnh và tìm những từ xuất hiện ở hai ngữ cảnh. Cho mỗi từ như vậy các mục riêng và nhãn khác nhau trên giao diện.</do>
  </b-finding>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Vì sao đặc tả nhân lên?">Nếu đặc tả gắn với một tính năng, file tăng theo mỗi nhiệm vụ và một khái niệm trôi dạt qua nhiều nơi.</q>
    <q t="Đặc tả theo aggregate là gì?">Mỗi khái niệm của miền nghiệp vụ, như một lượt đặt chỗ, có một mục. Tính năng chỉ bổ sung yêu cầu vào đó.</q>
    <q t="Vì sao có các mức MUST và SHOULD?">Từ đó cho biết cách kiểm tra yêu cầu: MUST được kiểm bằng test, SHOULD ở bước xem lại. Tác nhân đọc MUST như một giới hạn cứng.</q>
    <q t="Nếu một từ có nghĩa khác nhau ở hai ngữ cảnh thì sao?">Tạo hai thuật ngữ với nhãn khác nhau, nếu không tác nhân sẽ mang quy tắc từ ngữ cảnh này sang ngữ cảnh kia.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Đọc tiếp">
  <b-cta href="/blog/spec-reconcile-loop/" k="Phần tiếp" t="Vòng đối chiếu cho đặc tả" icon="hub" sw="1.6">như Kubernetes: trạng thái mong muốn, kiểm tra và môi trường của tác nhân</b-cta>
  <b-links cols="3">
    <item href="/blog/harness-driven-development/" k="Vòng lặp lỗi" t="Harness-Driven Development">sai sót của tác nhân trở thành quy tắc thế nào</item>
    <item href="/blog/specs-rules-skills/" k="Ngữ cảnh" t="Đặc tả, bible, quy tắc và skill">tác nhân biết gì về dự án và nó nằm ở đâu</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Môi trường" t="So sánh các harness">tác nhân làm việc ở đâu và thấy gì</item>
    <item href="/blog/agent-checkpoint/" k="Kiểm tra" t="Kiểm tra công việc của tác nhân AI ở đâu">aggregate như một điểm kiểm tra</item>
  </b-links>
</b-chapter>
<b-footer compact>Ví dụ đặt chỗ được bịa ra. Thuật ngữ và cách tiếp cận theo các nguồn dẫn dưới các sơ đồ.</b-footer>
</b-post>
