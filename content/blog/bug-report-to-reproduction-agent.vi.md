---
title: Công việc của QA sau bộ phận hỗ trợ cùng tác nhân AI: điều tra, mô tả và lập tài liệu qua MCP và skill
date: 2026-10-04
updated: 2026-11-08
description: Tối ưu một mắt xích: QA sau bộ phận hỗ trợ. Tác nhân tái hiện lỗi từ Jira trên môi trường kiểm thử qua MCP, thu hẹp đường đi, mô tả và lập tài liệu, skill biến các bước thành quy trình lặp lại được, QA kiểm tra bằng tay. Hỗ trợ và phát triển không đổi.
tags: AI, tác nhân, QA, Jira, MCP, skill, lỗi, harness
category: harness
layout: wide
mentions: Jira, AI agent, QA, Model Context Protocol, skills, bug reproduction, sequence diagram, C4 model, human-in-the-loop
toc: route=Bước của QA | stages=Ba phần | mcp=MCP | skill=Skill | parallel=Song song | example=Ví dụ | human=QA giữ lại gì | first=Bắt đầu thế nào | faq=Câu hỏi | next=Đọc tiếp
---

Lỗi của khách hàng đi qua bộ phận hỗ trợ rồi đến QA. Ở đây việc điều tra, mô tả và lập tài liệu được làm bằng tay, nên đây là bước được tối ưu. Một tác nhân AI (AI agent) kết nối với Jira và môi trường kiểm thử qua MCP, cùng một skill ghi sẵn các bước, đảm nhận phần việc lặp đi lặp lại. QA kiểm tra kết quả bằng tay. Hỗ trợ và phát triển làm việc như trước.

<b-post series="harness">
<b-view-toggle/>

<b-chapter id="route" icon="stairs" title="Tối ưu một bước: QA sau bộ phận hỗ trợ">
  <b-why align="left">Một lỗi đi từ khách hàng đến bản sửa qua bốn bước: khách hàng viết, hỗ trợ tiếp nhận, QA điều tra, lập trình viên sửa. Trước đây QA làm bước của mình hoàn toàn bằng tay, và cả ngày làm việc dành cho lỗi. Giờ đây các tác nhân làm bước này còn QA nghiệm thu kết quả và quản lý chúng. Ba bước còn lại giữ nguyên.</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/qa-step"/>
  </b-view>
  <b-view kind="struct">
    <b-lane title="Trước" color="muted">
      <b-qa-route>
        <node icon="user" t="khách hàng">viết</node>
        <node icon="user" t="hỗ trợ">tiếp nhận</node>
        <node kind="solo" t="QA" chips="điều tra|mô tả|lập tài liệu" time="Thời gian QA cho mỗi nhiệm vụ" bar="làm các nhiệm vụ">làm việc</node>
        <node icon="user" t="lập trình viên">sửa</node>
      </b-qa-route>
    </b-lane>
    <b-lane title="Sau" color="accent" top="12">
      <b-qa-route>
        <node icon="user" t="khách hàng">viết</node>
        <node icon="user" t="hỗ trợ">tiếp nhận</node>
        <node kind="pair" t="QA" frame="theo cặp" tools="monitor-screen:Claude in Chrome|flask:Code, test, PoC|code:API" n="× N" time="Thời gian QA cho mỗi nhiệm vụ" bar="nghiệm thu|quản lý tác nhân">nghiệm thu</node>
        <node icon="user" t="lập trình viên">sửa</node>
      </b-qa-route>
    </b-lane>
    <b-cap>Tỷ lệ chỉ mang tính minh họa, không phải số đo.</b-cap>
  </b-view>
  <b-finding>
    <ex>Chỉ bước của QA thay đổi: trước đây toàn bộ thời gian của QA dành để làm nhiệm vụ; giờ các tác nhân làm, còn QA nghiệm thu kết quả và quản lý các tác nhân.</ex>
    <gen>Nhiều tác nhân có thể chạy cùng lúc, và thời gian QA cho mỗi nhiệm vụ giảm.</gen>
    <do k="Việc cần làm">Bấm giờ số phút QA dành cho mỗi lỗi.</do>
  </b-finding>
</b-chapter>

<b-chapter id="stages" icon="lines" title="Ba phần của công việc QA và chúng thay đổi ra sao">
  <b-why align="left">Công việc của QA với một lỗi chia thành ba phần: điều tra, mô tả và lập tài liệu. Với mỗi phần, các hình dưới đây cho thấy trước đây QA làm thế nào, tác nhân làm gì và con người giữ lại gì.</b-why>
  <b-view kind="pic">
    <b-lane-stack>
    <b-icon-lane icon="search-alt" title="Điều tra">
      <b-art-plain name="bug-report-to-reproduction-agent/investigation"/>
    </b-icon-lane>
    </b-lane-stack>
  </b-view>
  <b-view kind="struct">
    <b-lane-stack>
    <b-icon-lane icon="search-alt" title="Điều tra">
      <b-qa-row label="Trước">
        <node icon="user">QA</node>
        <node icon="refresh-cw">lặp lại</node>
        <node icon="scissors">cắt bớt</node>
        <node icon="target">nguyên nhân</node>
      </b-qa-row>
      <b-qa-row label="Sau" now>
        <node icon="bot">Tác nhân</node>
        <node icon="play">đường đi trên môi trường kiểm thử</node>
        <node icon="scissors">thu hẹp</node>
        <node icon="eye">QA xem lại</node>
      </b-qa-row>
    </b-icon-lane>
    </b-lane-stack>
  </b-view>
  <b-why align="left">Điều tra là tìm đường ngắn nhất tới lỗi. Lời phàn nàn của khách hàng thường liệt kê mọi thứ họ đã làm: đăng nhập, danh mục, địa chỉ, giỏ hàng, mã khuyến mãi, thanh toán. QA lặp lại các hành động này và bỏ dần từng thứ thừa cho đến khi lỗi không còn tái hiện. Tác nhân làm điều tương tự trên môi trường kiểm thử: nó bỏ một hành động, kiểm tra lỗi còn không, và cứ thế đi xuống mức tối thiểu. Trong ví dụ, ba trong sáu hành động hóa ra là cần thiết. QA xem đường đi đã thu hẹp và kiểm tra rằng những gì bị bỏ thật sự là thừa: tác nhân có thể đã gạch một bước mà thiếu nó lỗi thực sự không tái hiện.</b-why>
  <b-view kind="pic">
    <b-lane-stack>
    <b-icon-lane icon="lines" title="Mô tả">
      <b-art-plain name="bug-report-to-reproduction-agent/description"/>
    </b-icon-lane>
    </b-lane-stack>
  </b-view>
  <b-view kind="struct">
    <b-lane-stack>
    <b-icon-lane icon="lines" title="Mô tả">
      <b-qa-row label="Trước">
        <node icon="user">QA</node>
        <node icon="lines">các bước</node>
        <node icon="file-text">mong đợi / thực tế</node>
        <node icon="doc-lines">văn phong riêng</node>
      </b-qa-row>
      <b-qa-row label="Sau" now>
        <node icon="bot">Tác nhân</node>
        <node icon="table">mẫu</node>
        <node icon="workflow">sequence · C4</node>
      </b-qa-row>
    </b-icon-lane>
    </b-lane-stack>
  </b-view>
  <b-why align="left">Mô tả là phần viết báo cáo lỗi: các bước, kết quả mong đợi và thực tế, môi trường. Trước đây mỗi QA có văn phong riêng, và lập trình viên phải làm quen lại. Tác nhân điền một mẫu báo cáo duy nhất, nên mọi báo cáo trông giống nhau. Nếu mô tả không cho thấy chỗ hỏng ở đâu, QA yêu cầu một sơ đồ: sơ đồ tuần tự (ai gọi ai và theo thứ tự nào) hoặc sơ đồ cấu trúc hệ thống (C4). QA so sánh mô tả với những gì chính mình đã thấy và sửa chỗ chưa chính xác.</b-why>
  <b-view kind="pic">
    <b-lane-stack>
    <b-icon-lane icon="file-text" title="Lập tài liệu">
      <b-art-plain name="bug-report-to-reproduction-agent/documentation"/>
    </b-icon-lane>
    </b-lane-stack>
  </b-view>
  <b-view kind="struct">
    <b-lane-stack>
    <b-icon-lane icon="file-text" title="Lập tài liệu">
      <b-qa-row label="Trước">
        <node icon="user">QA</node>
        <node icon="image">ảnh chụp màn hình</node>
        <node icon="link">liên kết</node>
        <node icon="doc-lines">các trường Jira</node>
      </b-qa-row>
      <b-qa-row label="Sau" now>
        <node icon="bot">Tác nhân</node>
        <node icon="plug">MCP</node>
        <node icon="lines">Jira</node>
        <node icon="pencil">QA sửa chỗ còn tranh cãi</node>
      </b-qa-row>
    </b-icon-lane>
    </b-lane-stack>
  </b-view>
  <b-why align="left">Lập tài liệu là chuyển kết quả vào Jira: ảnh chụp màn hình, liên kết, các trường của phiếu. Làm tay thì đó là một việc vặt riêng, ngốn một phần đáng kể thời gian. Tác nhân được nối với Jira qua MCP và ghi bình luận cùng các trường thẳng vào phiếu. QA mở phiếu, đọc bản ghi và sửa những chỗ còn tranh cãi: mức ưu tiên, cách diễn đạt, tệp đính kèm thừa.</b-why>
  <b-view kind="struct">
    <b-agents-lane title="Một QA — nhiều tác nhân cùng lúc" agents="tác nhân · PAY-142|tác nhân · PAY-143|tác nhân · PAY-144" note="Thời gian của QA chuyển sang quản lý và nghiệm thu" top="10">Mỗi phần trong ba phần chạy theo từng lỗi ở một tác nhân riêng, và QA khởi chạy nhiều tác nhân cùng lúc.</b-agents-lane>
  </b-view>
  <b-finding>
    <ex>Điều tra, mô tả và lập tài liệu đi lần lượt và đều qua tác nhân. QA giữ lại bước kiểm tra cuối và những phần còn tranh cãi.</ex>
    <gen>Cả ba phần đều là các hành động lặp lại được với kết quả rõ ràng, nên có thể ghi ra và giao đi. Quyết định “đây có phải lỗi không và quan trọng đến đâu” vẫn thuộc về con người.</gen>
    <do k="Việc cần làm">Chia công việc của bạn với một lỗi thành ba phần này và đánh dấu phần nào tốn nhiều thời gian nhất.</do>
  </b-finding>
</b-chapter>

<b-chapter id="mcp" icon="plug" title="MCP: tác nhân làm việc ở nơi QA làm việc">
  <b-why>MCP (Model Context Protocol) là cách nối tác nhân với các hệ thống làm việc để nó tự đọc và ghi trong đó thay vì nhận một lời kể lại.</b-why>
  <b-why align="left">Tác nhân cần năm thứ. Jira: nó đọc phiếu và ghi kết quả vào đó. Môi trường thử: bản sao thử nghiệm của sản phẩm, nơi nó đi theo đường đi như một người dùng. Tài liệu: sơ đồ và mô tả nằm cạnh phiếu. Dữ liệu: dữ liệu thử có thể đặt lại. Quyền: chỉ môi trường kiểm thử được phép hỏng, các hệ thống production nằm ngoài tầm với.</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/access-sandbox"/>
  </b-view>
  <b-view kind="struct">
    <b-node-grid>
      <node icon="lines" sw="1.8" t="Jira">đọc phiếu, ghi báo cáo</node>
      <node icon="play" t="Môi trường thử">đi theo đường đi như người dùng</node>
      <node icon="file-text" sw="1.8" t="Tài liệu">sơ đồ và ghi chú cạnh phiếu</node>
      <node icon="cylinder" t="Dữ liệu">dữ liệu thử, đặt lại được</node>
      <node icon="shield-check" t="Quyền">chỉ môi trường kiểm thử được phép hỏng</node>
    </b-node-grid>
  </b-view>
  <b-finding>
    <ex>Qua MCP, tác nhân đọc PAY-142 trong Jira, đi tới môi trường kiểm thử và ghi kết quả ngược lại. QA không phải chép gì giữa các cửa sổ.</ex>
    <gen>Không có kết nối với các hệ thống thì phải đưa cho tác nhân một lời kể lại, và lời kể lại làm mất chi tiết. Môi trường thử là nơi tác nhân có thể thử và làm hỏng mà không chạm vào production.</gen>
    <do k="Việc cần làm">Bắt đầu với hai kết nối: Jira và môi trường kiểm thử. Thêm phần còn lại khi cần.</do>
  </b-finding>
</b-chapter>

<b-chapter id="skill" icon="doc-square" title="Skill: quy trình được ghi ra thay cho việc lặp lại bằng tay">
  <b-why>Skill là cách làm việc được ghi ra cho tác nhân: các bước, mẫu báo cáo, quy tắc. Một người khác và một tác nhân khác có thể lặp lại nó.</b-why>
  <b-why align="left">Skill dẫn tác nhân qua sáu bước. Nó đọc phiếu, đi theo đường then chốt trên môi trường kiểm thử, thu hẹp xuống mức tối thiểu, mô tả lỗi theo mẫu, vẽ sơ đồ khi được yêu cầu và ghi kết quả vào Jira. Ba bước đầu là điều tra, các bước còn lại là mô tả và lập tài liệu từ chương trước. Một sai sót của tác nhân quay lại skill như một quy tắc mới, nên lần sau nó không lặp lại.</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/skill-pipeline"/>
  </b-view>
  <b-view kind="struct">
    <b-lane title="Skill “tái hiện lỗi”" color="accent">
      <b-num-chain top="6">
        <step>đọc phiếu</step>
        <step>đi theo đường then chốt trên môi trường kiểm thử</step>
        <step>thu hẹp xuống mức tối thiểu</step>
      </b-num-chain>
      <b-num-chain start="4" top="10">
        <step>mô tả theo mẫu</step>
        <step>sơ đồ khi được yêu cầu</step>
        <step>ghi vào Jira</step>
      </b-num-chain>
    </b-lane>
    <b-agents-lane title="Một QA — nhiều tác nhân cùng lúc" agents="tác nhân · PAY-142|tác nhân · PAY-143|tác nhân · PAY-144" note="Thời gian của QA chuyển sang quản lý và nghiệm thu" top="10">Một skill, nhiều lần chạy: mỗi lỗi một tác nhân. Quy trình được ghi ra không đòi hỏi QA phải tự lặp lại.</b-agents-lane>
    <b-chiprow top="12">
      <chip>mỗi lần đúng các bước đó</chip>
      <chip>một mẫu báo cáo</chip>
      <chip>truyền cho đồng nghiệp</chip>
      <chip>cải tiến từ sai sót</chip>
    </b-chiprow>
  </b-view>
  <b-finding>
    <ex>Sáu bước được ghi một lần. QA nào cũng chạy skill trên phiếu mới và nhận báo cáo cùng định dạng.</ex>
    <gen>Skill biến “cách tôi thường làm” thành một quy trình không phụ thuộc vào việc hôm nay ai trực. Sai sót của tác nhân đi vào skill như một quy tắc mới, và lần sau nó biến mất.</gen>
    <do k="Việc cần làm">Ghi các bước của bạn cho một loại lỗi thành skill và chạy nó trên ba phiếu đã đóng.</do>
  </b-finding>
</b-chapter>

<b-chapter id="parallel" icon="grid-alt" title="Một QA — nhiều tác nhân: thời gian chuyển sang quản lý và nghiệm thu">
  <b-why>Lỗi có thể được tái hiện qua các kênh khác nhau, và mỗi tác nhân nhận một kênh của mình.</b-why>
  <b-why align="left">Trước (bên trái), QA đi qua ba lỗi lần lượt. Giờ (bên phải) ba tác nhân làm cùng lúc: một ở trình duyệt, một qua code, một qua API. QA kiểm tra nhanh từng báo cáo đã xong, và thời gian được giải phóng dành cho việc quản lý tác nhân và nghiệm thu. Ở chế độ “Cấu trúc”, điều này được thể hiện bằng các thanh thời gian: các lỗi lần lượt ở trên, các tác nhân song song ở dưới, và ba ô nghiệm thu (142, 143, 144) dành cho QA.</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/parallel"/>
  </b-view>
  <b-view kind="struct">
    <b-node-grid min="170">
      <node icon="monitor-screen" t="Claude in Chrome">đi theo đường đi trong trình duyệt</node>
      <node icon="flask" t="Code và test">chạy cục bộ, PoC không cần trình duyệt</node>
      <node icon="code" t="API">gọi trực tiếp các yêu cầu</node>
    </b-node-grid>
    <b-art-plain name="bug-report-to-reproduction-agent/qa-time"/>
    <b-cap>Phác họa nguyên lý; tỷ lệ là tùy ý, không phải số đo.</b-cap>
  </b-view>
  <b-finding>
    <ex>QA khởi chạy các tác nhân cho PAY-142, PAY-143 và PAY-144 cùng lúc. Trong khi chúng làm việc, QA không ngồi trên một lỗi mà kiểm tra lần lượt các kết quả đã xong.</ex>
    <gen>Trước đây, thời gian của QA cộng dồn qua mọi lỗi nối tiếp nhau. Giờ mỗi lỗi có tác nhân riêng: qua trình duyệt, qua code hoặc qua API, và QA chỉ giữ lại một bước kiểm tra ngắn. Càng nhiều tác nhân chạy, càng nhiều thời gian của QA dành cho việc quản lý chúng và xem lại, thay vì việc lặp đi lặp lại.</gen>
    <do k="Việc cần làm">Tăng số tác nhân dần dần: nó bị giới hạn bởi số môi trường kiểm thử, số bộ dữ liệu thử và các hạn mức. Dùng thời gian QA không còn phải tiêu cho việc lặp lại để quản lý tác nhân, kiểm tra và cải tiến skill.</do>
  </b-finding>
</b-chapter>

<b-chapter id="example" icon="chat-square" title="Ví dụ: PAY-142 từ phiếu đến báo cáo">
  <b-why align="left">Một khách hàng viết cho bộ phận hỗ trợ một dòng: thanh toán với mã khuyến mãi bị lỗi. Hình dưới đọc từ trái sang phải qua ba bước: lời phàn nàn của khách, công việc của tác nhân, kết quả trong Jira. Sau đó từng bước được trình bày chi tiết trên phiếu PAY-142.</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/complaint-to-report"/>
  </b-view>
  <b-why align="left">Bước 1: QA chỉ có lời phàn nàn của khách hàng, không có các bước, kèm một ảnh chụp màn hình lỗi. Bước 2: tác nhân đi qua cả sáu hành động của khách trên môi trường kiểm thử và bỏ dần từng thứ thừa. Đăng nhập, danh mục và địa chỉ bị gạch, giỏ hàng, mã khuyến mãi và thanh toán còn lại, và lỗi tái hiện trên chúng: dịch vụ khuyến mãi trả lời bằng lỗi 500. Bước 3: tác nhân ghi báo cáo và sơ đồ vào Jira, còn QA mở phiếu và kiểm tra kết quả.</b-why>
  <b-why align="left">Đây là bước 1 trong Jira: tiêu đề của khách hàng, không có các bước tái hiện, kèm ảnh chụp màn hình lỗi. Tác nhân bắt đầu từ đây.</b-why>
  <b-lane title="Phiếu Jira · yêu cầu của khách hàng được hỗ trợ chuyển cho QA" color="accent">
    <b-ticket key="PAY-142">Thanh toán thẻ bị lỗi khi nhập mã khuyến mãi</b-ticket>
    <b-chiprow start top="10">
      <chip>từ khách hàng</chip>
      <chip>do hỗ trợ chuyển</chip>
      <chip>không có các bước</chip>
      <chip>ảnh chụp màn hình lỗi</chip>
    </b-chiprow>
  </b-lane>
  <b-why align="left">Bước 2, phần thứ nhất: thu hẹp đường đi. Tác nhân gạch đăng nhập, danh mục và địa chỉ vì lỗi vẫn còn khi không có chúng. Giỏ hàng, mã khuyến mãi và thanh toán thẻ còn lại.</b-why>
  <b-lane title="Điều tra: 6 hành động → còn 3" color="accent" top="10">
    <b-chiprow start>
      <chip kind="del">đăng nhập</chip>
      <chip kind="del">danh mục</chip>
      <chip kind="del">địa chỉ</chip>
      <chip kind="on">giỏ hàng</chip>
      <chip kind="on">mã khuyến mãi</chip>
      <chip kind="on">thanh toán thẻ</chip>
      Thu hẹp: tác nhân bỏ từng hành động và sau mỗi lần kiểm tra lỗi còn tái hiện không. Thứ gì mà lỗi vẫn tồn tại khi thiếu thì bị gạch.
    </b-chiprow>
  </b-lane>
  <b-why align="left">Bước 2, phần thứ hai: sơ đồ. Để lập trình viên thấy chỗ hỏng, tác nhân vẽ sơ đồ tuần tự. Bốn đối tượng tham gia nằm ở trên, các mũi tên chạy xuống theo thứ tự thời gian, mũi tên màu cam chỉ lỗi: dịch vụ khuyến mãi trả lời bằng lỗi 500, và thanh toán thất bại.</b-why>
  <b-lane title="Khi được yêu cầu · sơ đồ tuần tự" color="accent" top="10">
    <b-art-plain name="bug-report-to-reproduction-agent/promo-sequence"/>
  </b-lane>
  <b-why align="left">Bước 3: bản ghi trong Jira. Tác nhân ghi kết quả thành bình luận trên PAY-142: các bước, điều mong đợi, điều đã xảy ra, môi trường và nơi cần tìm nguyên nhân.</b-why>
  <b-lane title="Mô tả và bản ghi Jira · bình luận trên PAY-142" color="accent" top="10">
    <b-kv-rows>
      <row k="Các bước">giỏ hàng → mã khuyến mãi → thanh toán thẻ</row>
      <row k="Mong đợi">thanh toán thành công kèm giảm giá</row>
      <row k="Thực tế">“thanh toán thất bại”, dịch vụ khuyến mãi trả về lỗi 500</row>
      <row k="Môi trường">môi trường kiểm thử, thẻ thử</row>
      <row k="Nơi cần tìm">lời gọi tới dịch vụ khuyến mãi từ thanh toán (xem sơ đồ)</row>
    </b-kv-rows>
  </b-lane>
  <b-view kind="struct">
    <b-agents-lane title="Một QA — nhiều tác nhân cùng lúc" agents="tác nhân · PAY-142|tác nhân · PAY-143|tác nhân · PAY-144" note="Thời gian của QA chuyển sang quản lý và nghiệm thu" top="10">Trong khi tác nhân xử lý PAY-142, các tác nhân khác nhận PAY-143 và PAY-144, còn QA kiểm tra những gì đã xong.</b-agents-lane>
  </b-view>
  <b-why align="left">Từ một dòng của khách hàng ra một đường đi ngắn, một sơ đồ và một báo cáo hoàn chỉnh. QA không phải tự lắp ghép chúng: QA mở báo cáo, lặp lại các bước bằng tay và xác nhận đó là cùng một lỗi.</b-why>
  <b-cap>Phiếu và mọi tên gọi được bịa ra làm ví dụ.</b-cap>
  <b-finding>
    <ex>Từ một dòng của khách hàng ra một đường đi ngắn gồm ba hành động, một sơ đồ và một báo cáo sẵn sàng trong Jira. QA không làm việc này; QA xem lại kết quả.</ex>
    <gen>Mỗi phần trong ba phần của công việc QA để lại một dấu vết nhìn thấy được: đường đi đã thu hẹp, sơ đồ, bản ghi. Nhờ vậy kết quả kiểm tra được trong vài phút thay vì phải dựng lại từ trí nhớ.</gen>
    <do k="Việc cần làm">Yêu cầu tác nhân cho xem đường đi đã thu hẹp và bản ghi: chúng cho thấy ngay nó có đi sai hướng không.</do>
  </b-finding>
</b-chapter>

<b-chapter id="human" icon="eye" title="QA giữ lại gì">
  <b-why align="left">QA đứng ở cổng nghiệm thu. Tác nhân mang đến một báo cáo, và QA trả lời bốn câu hỏi: đúng đường đi chưa, đúng lỗi chưa, thu hẹp đúng chưa và mức quan trọng ra sao. Nếu lỗi tái hiện được bằng tay, phiếu đi tới lập trình viên. Nếu không, báo cáo quay lại tác nhân.</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/acceptance-gate"/>
  </b-view>
  <b-view kind="struct">
    <b-node-grid>
      <node icon="check" t="Đúng đường đi">đi theo các bước bằng tay trên môi trường kiểm thử</node>
      <node icon="check" t="Đúng lỗi">khớp với ảnh chụp màn hình của khách</node>
      <node icon="check" t="Thu hẹp đúng">các bước bị gạch thật sự là thừa</node>
      <node icon="check" t="Mức quan trọng">con người quyết định mức nghiêm trọng và ưu tiên</node>
      <node icon="check" t="Cải tiến skill">sai sót của tác nhân → quy tắc mới</node>
    </b-node-grid>
    <b-agents-lane title="Một QA — nhiều tác nhân cùng lúc" agents="tác nhân · PAY-142|tác nhân · PAY-143|tác nhân · PAY-144" note="Thời gian của QA chuyển sang quản lý và nghiệm thu" top="10">Thời gian QA không còn phải tiêu vào việc lặp lại cho mỗi lỗi được dành cho việc quản lý tác nhân, kiểm tra, ưu tiên và cải tiến skill.</b-agents-lane>
  </b-view>
  <b-finding>
    <ex>QA mở môi trường kiểm thử, lặp lại các bước trong báo cáo bằng tay và xác nhận đó là lỗi khách hàng đã mô tả. Rồi phiếu đi tới lập trình viên như trước; nếu không được, báo cáo quay lại tác nhân.</ex>
    <gen>Mô hình dễ dàng xác nhận chính nó, và các chi tiết bịa ra trông như phát hiện. Vì vậy lời cuối cùng thuộc về con người nhìn bằng chính mắt mình. Công việc của QA chuyển từ thực hiện việc lặp đi lặp lại sang kiểm tra và cải tiến quy trình.</gen>
    <do k="Việc cần làm">Thống nhất rằng báo cáo mà QA không lặp lại được bằng tay thì không đến tay lập trình viên.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="shield-check" title="Bắt đầu thế nào">
  <b-why align="left">Tốt nhất là bắt đầu trên các lỗi đã đóng mà đáp án đã biết. Bước 1: kết nối Jira và môi trường kiểm thử với tác nhân qua MCP. Bước 2: ghi các bước của bạn cho một loại lỗi thành skill. Bước 3: chạy skill trên năm lỗi đã đóng của tháng trước và so báo cáo của tác nhân với những gì bạn biết về các lỗi đó. Chỗ nào tác nhân sai thì thêm một quy tắc vào skill. Một QA kiểm tra kết quả bằng tay.</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/start-steps"/>
  </b-view>
  <b-view kind="struct">
    <b-num-chain>
      <step>kết nối Jira và môi trường kiểm thử qua MCP</step>
      <step>ghi các bước của QA thành skill</step>
      <step>chạy trên 5 lỗi đã đóng và thêm quy tắc</step>
    </b-num-chain>
  </b-view>
  <b-finding>
    <ex>Với các lỗi đã đóng, đáp án đã biết, nên thấy rõ tác nhân hay skill sai ở đâu.</ex>
    <gen>Khởi chạy một kịch bản mới an toàn hơn trên các nhiệm vụ có kết quả đã biết, biến mỗi sai sót thành một quy tắc của skill.</gen>
    <do k="Việc cần làm">Bắt đầu với năm lỗi của tháng trước và một QA kiểm tra kết quả bằng tay.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Phần công việc nào của QA có thể giao cho tác nhân AI?">Điều tra, mô tả và lập tài liệu cho một lỗi: đây là các hành động lặp lại được với kết quả rõ ràng. Quyết định đó có phải lỗi không và quan trọng đến đâu vẫn thuộc về con người.</q>
    <q t="Vì sao tác nhân cần MCP cho công việc QA?">Qua MCP, tác nhân làm việc trong cùng các hệ thống với QA, Jira và môi trường kiểm thử, và đọc dữ kiện từ nguồn thay vì từ lời kể lại.</q>
    <q t="Skill mang lại gì?">Một quy trình được ghi ra, không phụ thuộc vào việc ai đang trực. Sai sót của tác nhân đi vào skill như một quy tắc mới và không lặp lại.</q>
    <q t="QA còn lại gì?">Kiểm tra kết quả của tác nhân bằng tay và nghiệm thu nó: QA quản lý nhiều tác nhân và quyết định nhận gì.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" icon="arrow-right" title="Đọc tiếp">
  <b-links>
    <item href="/blog/specs-rules-skills/" k="Skill" t="Đặc tả, quy tắc và skill">tác nhân cần biết gì về dự án</item>
    <item href="/blog/harness-driven-development/" k="Vòng lặp lỗi" t="Harness-Driven Development">sai sót của tác nhân trở thành quy tắc thế nào</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Môi trường" t="So sánh các harness">tác nhân làm việc ở đâu và thấy gì</item>
  </b-links>
</b-chapter>
<b-footer>Phiếu PAY-142 và sơ đồ được bịa ra làm ví dụ.</b-footer>
</b-post>
