---
title: Cài đặt và lệnh OpenSpec: ví dụ một thay đổi từ kế hoạch đến merge
date: 2026-11-07
updated: 2026-11-08
description: OpenSpec của Fission AI hoạt động ra sao: thư mục thay đổi gồm kế hoạch, yêu cầu và tác vụ, ba lệnh cho tác nhân và việc merge vào đặc tả chung. Cài đặt bằng hai lệnh, một thay đổi thật từ repository của trang urvanov.com, so sánh với Spec Kit và các prompt có sẵn để bắt đầu.
tags: AI, OpenSpec, đặc tả, Spec-Driven Development, Claude Code, Codex, Cursor
category: specs
layout: wide
mentions: OpenSpec, Spec-Driven Development, Spec Kit, Claude Code, Codex, Cursor, GitHub Copilot
toc: what=OpenSpec là gì | install=Cài đặt | flow=Ba lệnh | example=Ví dụ | kit=OpenSpec hay Spec Kit | start=Cách bắt đầu | faq=Câu hỏi | next=Đọc thêm
---

OpenSpec là framework mã nguồn mở miễn phí cho phát triển dựa trên đặc tả (Spec-Driven Development). Trước khi viết mã, tác nhân AI (AI agent) ghi kế hoạch thay đổi vào thư mục dự án: vì sao cần thay đổi, các yêu cầu, cách tiếp cận và các tác vụ. Bạn xem xét kế hoạch, tác nhân viết mã theo các tác vụ, và các yêu cầu đã hoàn thiện được merge vào đặc tả chung của dự án. Phần dưới nói về cài đặt, ba lệnh và một thay đổi thật từng bước.

<b-post series="specs">
<b-chapter id="what" icon="file-lines" title="OpenSpec là gì">
  <b-why align="left">Không có kế hoạch, tác nhân viết mã thẳng từ một tin nhắn trong chat. Ý định chỉ nằm trong cuộc trò chuyện đó: một tuần sau không ai nhớ vì sao lại làm như vậy, và tác nhân kế tiếp bắt đầu lại từ đầu, có thể làm lại theo kiểu của nó.</b-why>
  <iso-art name="openspec/chat-vs-files"></iso-art>
  <b-why align="left">Bên trái là cách quen thuộc: bạn bảo tác nhân “làm thế này”, rồi “và thêm cái này”, và nó viết mã. Mã còn lại, nhưng lời giải thích vì sao mã trông như vậy ở lại trong lịch sử chat. Bên phải là làm việc với OpenSpec: tác nhân trước hết đưa kế hoạch vào các tệp của dự án, bạn đọc và sửa kế hoạch đó, rồi tác nhân mới viết mã đúng theo nó. Kế hoạch được lưu trong repository cùng với mã, nơi mọi đồng đội và mọi tác nhân sau này đều thấy.</b-why>
  <b-why align="left">OpenSpec đưa ý định ra khỏi chat vào các tệp cạnh mã. Mỗi thay đổi có thư mục riêng trong <code>openspec/changes</code>: ghi vì sao, yêu cầu nào thay đổi, làm thế nào và theo những bước nào. Các yêu cầu đang có hiệu lực của cả hệ thống nằm riêng, trong <code>openspec/specs</code>. Đó là Markdown thường, không có cú pháp đặc biệt<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «Plain Markdown — requirements with concrete scenarios, no special syntax to learn» — github.com/Fission-AI/OpenSpec"/>, nên cả con người lẫn tác nhân đều đọc được.</b-why>
  <iso-art name="term:openspec"></iso-art>
  <b-why align="left">Sơ đồ có hai phần. Thư mục thay đổi là bản nháp: nó chứa những gì bạn sắp đổi. Đặc tả chung mô tả hệ thống như hiện có. Trong lúc thay đổi đang diễn ra, đặc tả chung không bị đụng đến. Khi mã xong, các yêu cầu từ thư mục thay đổi chuyển vào đặc tả chung, và mô tả hệ thống lại khớp với mã. Mỗi thay đổi gồm bốn tệp:</b-why>
  <b-table>
  | Tệp | Trả lời câu hỏi nào | Bên trong có gì |
  |---|---|---|
  | <code>proposal.md</code> | Vì sao? | lý do thay đổi và chính xác cái gì thay đổi |
  | <code>specs/</code> | Điều gì phải đúng? | yêu cầu với SHALL và MUST cùng các kịch bản “khi — thì” |
  | <code>design.md</code> | Làm thế nào? | quyết định kỹ thuật, mục tiêu, phi mục tiêu, rủi ro |
  | <code>tasks.md</code> | Theo thứ tự nào? | danh sách tác vụ để tác nhân làm theo |
  </b-table>
  <b-finding>
    <ex>Bốn tệp của một thay đổi trả lời bốn câu hỏi: vì sao, điều gì, làm thế nào và theo thứ tự nào.</ex>
    <gen>Kế hoạch nằm cạnh mã và được xem xét trước khi tác nhân bắt đầu viết. Một sai sót trong ý tưởng lộ ra trong một đoạn văn, trước khi nó lọt vào mã.</gen>
    <do>Trước một thay đổi lớn, hãy bảo tác nhân đưa kế hoạch vào thư mục thay đổi trước, rồi mới viết mã.</do>
  </b-finding>
</b-chapter>

<b-chapter id="install" icon="terminal" title="Cài đặt">
  <b-why align="left">OpenSpec có hai phần. Phần thứ nhất là chương trình dòng lệnh <code>openspec</code>: cài một lần cho mỗi máy tính. Phần thứ hai là thiết lập cho một dự án cụ thể: <code>openspec init</code> tạo thư mục <code>openspec/</code> trong dự án và thêm các lệnh như <code>/opsx:propose</code> cho các tác nhân của bạn.</b-why>
  <iso-art name="openspec/install"></iso-art>
  <b-why align="left">Thứ tự trên sơ đồ: trước hết chương trình xuất hiện trên máy, sau đó thư mục <code>openspec/</code> xuất hiện trong dự án với hai thư mục con — <code>specs</code> cho các yêu cầu đang có hiệu lực và <code>changes</code> cho các thay đổi đang tiến hành — và cuối cùng các tác nhân của bạn có thêm lệnh mới. Bản thân mã dự án không đổi: chỉ thêm thư mục kế hoạch và các tệp lệnh cho tác nhân. Lệnh cho macOS và Linux:</b-why>
  <b-codebox title="Cài đặt trên macOS và Linux">
    curl -fsSL https://openspec.dev/cli/install.sh | sh
  </b-codebox>
  <b-why align="left">Nếu bạn thích npm, cần Node.js 22.12 trở lên<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «npm install -g @fission-ai/openspec@latest (needs Node.js 22.12.0 or higher)» — github.com/Fission-AI/OpenSpec"/>. Windows có script cài đặt PowerShell riêng, và macOS có formula Homebrew. Sau đó mở thư mục dự án và bật OpenSpec:</b-why>
  <b-codebox title="Qua npm và trong dự án">
    npm install -g @fission-ai/openspec@latest
    cd your-project
    openspec init
  </b-codebox>
  <b-why align="left"><code>openspec init</code> hỏi bạn dùng những tác nhân nào và cài lệnh đúng cho chúng. Tên lệnh khác nhau theo tác nhân: <code>/opsx:propose</code> trong Claude Code, <code>/opsx-propose</code> trong Cursor và GitHub Copilot, <code>$openspec-propose</code> trong Codex<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «/opsx:propose is the canonical name; your tool may spell it /opsx-propose (Cursor, GitHub Copilot), @opsx-propose (Amazon Q) or $openspec-propose (Codex)» — github.com/Fission-AI/OpenSpec"/>. Phần còn lại của bài dùng cách viết của Claude Code.</b-why>
  <b-why align="left">Nếu dự án dùng nhiều tác nhân, ví dụ một phần nhóm làm trong Cursor và một phần trong Claude Code, hãy chọn tất cả: kế hoạch thay đổi là chung, và mỗi tác nhân có lệnh riêng. Chương trình miễn phí, chạy cục bộ và không cần tài khoản.</b-why>
  <b-finding>
    <ex>Hai lệnh: một lệnh cài chương trình, lệnh kia chuẩn bị dự án và kết nối các tác nhân.</ex>
    <gen>Không cần thiết lập thủ công: OpenSpec có prompt sẵn để tác nhân cài chương trình, chạy <code>openspec init</code> và kiểm tra kết quả.</gen>
    <do>Hãy bảo tác nhân: “Cài OpenSpec và chạy openspec init trong dự án này, cho xem những lệnh nào đã xuất hiện”.</do>
  </b-finding>
</b-chapter>

<b-chapter id="flow" icon="list-arrow" title="Ba lệnh: kế hoạch, mã, merge">
  <b-why align="left">Công việc đi theo một vòng ba lệnh. Trước chúng, bạn có thể suy nghĩ thành tiếng với <code>/opsx:explore</code>: tác nhân đọc mã, gợi ý các phương án và không thay đổi gì. Khi đã rõ cần làm gì, đường chính bắt đầu.</b-why>
  <iso-art name="openspec/loop"></iso-art>
  <b-why align="left">Hãy đọc vòng theo chiều kim đồng hồ. Lệnh thứ nhất, <code>/opsx:propose</code>, nhờ tác nhân viết kế hoạch: nó tạo thư mục thay đổi và bốn tệp. Sau đó đến lượt bạn: đọc kế hoạch và sửa trong chat hoặc ngay trong các tệp. Đây là điểm kiểm soát chính, vì sửa một đoạn văn rẻ hơn viết lại mã đã hoàn thành. Lệnh thứ hai, <code>/opsx:apply</code>, bắt đầu làm theo các tác vụ: tác nhân lấy từng tác vụ trong <code>tasks.md</code> và đánh dấu xong từng cái. Lệnh thứ ba, <code>/opsx:archive</code>, đóng thay đổi: các yêu cầu chuyển vào đặc tả chung, còn thư mục được đưa vào kho lưu trữ cùng toàn bộ lịch sử quyết định. Thay đổi tiếp theo bắt đầu từ đặc tả đã cập nhật.</b-why>
  <b-why align="left">Một phiên làm việc ngắn trong terminal trông như thế này. Phiên mẫu dựa trên bản demo trong phần mô tả OpenSpec<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «You: /opsx:propose add-dark-mode / AI: Created openspec/changes/add-dark-mode/ ✓ proposal.md ✓ specs/ ✓ design.md ✓ tasks.md … You: /opsx:archive / AI: Archived to openspec/changes/archive/… Specs updated.» — github.com/Fission-AI/OpenSpec"/>:</b-why>
  <b-agent-term app="Claude&#8203; Code" ver="v2" model="OpenSpec · /opsx" path="~/projects/shop">
    <line kind="ask">/opsx:propose add-dark-mode</line>
    <line kind="act">Created openspec/changes/add-dark-mode/</line>
    <line kind="out">proposal.md · specs/ · design.md · tasks.md</line>
    <line kind="you" note="bạn xem xét kế hoạch">Thêm một kịch bản: giao diện tối được giữ nguyên sau khi tải lại trang</line>
    <line kind="ask">/opsx:apply</line>
    <line kind="act">1.1 theme context ✓ · 1.2 toggle ✓ · 2.1 colours ✓</line>
    <line kind="out">all tasks complete</line>
    <line kind="ask">/opsx:archive</line>
    <line kind="act">Đã chuyển các yêu cầu vào openspec/specs và thư mục thay đổi vào kho lưu trữ</line>
  </b-agent-term>
  <b-table>
  | Lệnh | Tác nhân làm gì | Dự án có thêm gì | Bạn làm gì |
  |---|---|---|---|
  | <code>/opsx:explore</code> | đọc mã, gợi ý các phương án | không có gì | chọn một phương án |
  | <code>/opsx:propose</code> | viết kế hoạch thay đổi | thư mục <code>openspec/changes/name/</code> với bốn tệp | đọc và sửa kế hoạch |
  | <code>/opsx:apply</code> | viết mã theo các tác vụ, đánh dấu xong | mã và kiểm thử | kiểm tra kết quả |
  | <code>/opsx:archive</code> | merge các yêu cầu vào đặc tả chung | <code>openspec/specs</code> được cập nhật, thư mục được lưu trữ | không làm gì, đây là kết thúc |
  </b-table>
  <b-why align="left">Với các tác vụ lớn có bộ lệnh mở rộng: tạo thay đổi từng bước, tiếp tục một thay đổi đang làm, kiểm tra mã đối chiếu với đặc tả. Bật nó bằng <code>openspec config profile</code>.</b-why>
  <b-finding>
    <ex>Sau khi lưu trữ, <code>openspec/specs</code> chứa mô tả hiện tại của hệ thống, còn lịch sử quyết định nằm trong kho lưu trữ thay đổi.</ex>
    <gen>Đặc tả được cập nhật cùng bước với mã, nên không bị lỗi thời như một wiki riêng.</gen>
    <do>Đừng bỏ qua bước lưu trữ: thiếu nó, thay đổi tiếp theo sẽ dựa trên yêu cầu cũ.</do>
  </b-finding>
</b-chapter>

<b-chapter id="example" icon="notebook" title="Ví dụ: một thay đổi trong repository của trang urvanov.com">
  <b-why align="left">Ví dụ này lấy từ repository của urvanov.com, trang đăng bài viết này. Mã nguồn của trang có thư mục <code>openspec/</code> lưu thay đổi đó. Trang có <a href="/patterns">danh mục mẫu AI</a>: 73 kỹ thuật làm việc với tác nhân AI, chia thành 10 chủ đề như ngữ cảnh và bộ nhớ, điều phối, bảo mật và kiểm soát chất lượng. Mỗi kỹ thuật hiện thành một thẻ. Danh mục được làm để đi kèm bài nói “Spec-Driven Development in Practice” tại hội nghị Podlodka Crew.</b-why>
  <b-why align="left">Vấn đề: khi bấm vào, 72 trong 73 thẻ chỉ hiện tên và một dòng mô tả. Mỗi thẻ cần mở đầy đủ: kỹ thuật giải quyết vấn đề gì, hoạt động ra sao, một lời trích của người làm nghề, khi nào hiệu quả và khi nào hỏng. Tài liệu đã có sẵn trong các ghi chú nghiên cứu; cần chuyển sang cẩn thận, không bịa thêm. Thay đổi được đặt tên <code>fill-all-pattern-details</code>. Đây là những gì tác nhân đã ghi vào bốn tệp:</b-why>
  <b-table>
  | Tệp | Nội dung |
  |---|---|
  | <code>proposal.md</code> | vì sao: danh mục là phần quan trọng của bài nói và các thẻ trống làm hỏng nó; cái gì thay đổi: cả 73 kỹ thuật có mô tả chi tiết |
  | <code>design.md</code> | một tác vụ cho mỗi nhóm mẫu; chỉ trích dẫn từ tệp nguồn, không bịa; chỉ vẽ sơ đồ ở nơi có luồng dữ liệu |
  | <code>specs/pattern-detail/spec.md</code> | yêu cầu “mọi mẫu đều có phần chi tiết được điền” và ba kịch bản hiển thị thẻ |
  | <code>tasks.md</code> | 10 tác vụ cho 10 nhóm, tất cả đã đánh dấu xong |
  </b-table>
  <b-why align="left">Dưới đây là một đoạn của tệp yêu cầu. SHALL đánh dấu yêu cầu bắt buộc. Scenario là một phép kiểm tra: WHEN mô tả tình huống, THEN điều gì phải xảy ra. Ở đây detail là mô tả đầy đủ của một kỹ thuật, còn problem và solution là phần “vấn đề” và “giải pháp” của nó.</b-why>
  <b-codebox title="Đoạn trích yêu cầu từ specs/pattern-detail/spec.md">
    ## MODIFIED Requirements
    ### Requirement: Pattern detail content structure
    All patterns in all categories SHALL have a filled detail.
    #### Scenario: Partial content
    - WHEN the user opens a pattern that has only problem and solution
    - THEN the card shows only those sections, with no empty blocks
  </b-codebox>
  <b-why align="left">Quyết định “chỉ trích dẫn từ nguồn” đã được ghi trong design.md trước khi viết mã. Nhờ vậy tác nhân không bịa lời trích ở nơi không có, và kịch bản “nội dung một phần” đặt trước thẻ trông thế nào khi thiếu lời trích hoặc sơ đồ.</b-why>
  <b-why align="left">Công việc gồm 10 tác vụ, mỗi tác vụ một chủ đề của danh mục. Cả 10 tác vụ đã được đánh dấu xong, nhưng lệnh lưu trữ chưa bao giờ được chạy: thư mục thay đổi vẫn nằm trong <code>openspec/changes</code>, và trang chưa có đặc tả chung. Đây là lỗi hay gặp. Yêu cầu “mỗi kỹ thuật có mô tả chi tiết” chỉ nằm trong bản nháp thay đổi, và tác nhân kế tiếp đọc đặc tả chung sẽ không biết đến nó. Một lệnh <code>/opsx:archive</code> sẽ chuyển nó vào đặc tả chung.</b-why>
  <b-finding>
    <ex>Kịch bản “nội dung một phần” xuất hiện trong kế hoạch trước khi viết mã và đặt ra cách thẻ hoạt động khi thiếu lời trích hoặc sơ đồ.</ex>
    <gen>Yêu cầu có kịch bản “khi — thì” đọc giống như kiểm thử: tác nhân biết thế nào là xong.</gen>
    <do>Trong mỗi yêu cầu, hãy viết ít nhất một kịch bản cho trường hợp biên: dữ liệu rỗng, dữ liệu một phần, lỗi.</do>
  </b-finding>
</b-chapter>

<b-chapter id="kit" icon="crosshair" title="OpenSpec hay Spec Kit">
  <b-why align="left">Cả hai đều điều khiển phát triển từ đặc tả, nhưng nhìn thứ tự khác nhau. Spec Kit của GitHub đi qua các giai đoạn nghiêm ngặt, cái này sau cái kia. OpenSpec cho phép quay lại kế hoạch bất cứ lúc nào và được xây cho dự án đã có mã<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «fluid not rigid → iterative not waterfall → easy not complex → built for brownfield not just greenfield» — github.com/Fission-AI/OpenSpec"/>.</b-why>
  <b-table>
  | | OpenSpec | Spec Kit |
  |---|---|---|
  | Thứ tự các bước | linh hoạt: có thể quay lại kế hoạch bất cứ lúc nào | giai đoạn cố định: nguyên tắc, đặc tả, kế hoạch, tác vụ, mã |
  | Đặc tả nằm ở đâu | <code>openspec/specs</code> và các thư mục thay đổi | thư mục tính năng với đặc tả, kế hoạch và tác vụ |
  | Dự án nào | hợp với mã đang chạy | hợp với tính năng mới làm từ đầu |
  | Nhiều repository | kho kế hoạch dùng chung (Stores, beta) | mỗi repository riêng |
  | Do ai làm | Fission AI | GitHub |
  </b-table>
  <b-finding>
    <ex>OpenSpec tự mô tả là linh hoạt và được xây cho mã đã có.</ex>
    <gen>Spec Kit dẫn bạn đi qua từng bước và hợp với nhóm cần kỷ luật. OpenSpec nhẹ hơn và vào nề nếp nhanh hơn trong dự án đã có mã.</gen>
    <do>Với thay đổi trong dự án đang chạy, hãy bắt đầu với OpenSpec; với một tính năng mới lớn làm từ đầu, thử cả hai trên cùng một tác vụ.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="Cách bắt đầu">
  <b-why align="left">Bắt đầu với một thay đổi nhỏ mà bạn vốn định làm. Năm prompt cho tác nhân, mỗi bước một cái: dán chúng vào Claude Code, Codex hoặc Cursor và điền tác vụ của bạn.</b-why>
  <b-hdd-steps>
    <step t="Cài đặt">“Cài OpenSpec và chạy openspec init trong dự án này. Cho xem những lệnh nào đã xuất hiện”</step>
    <step t="Khám phá">“/opsx:explore Tôi muốn thêm … Hãy xem mã và đề xuất hai phương án, không thay đổi gì”</step>
    <step t="Kế hoạch">“/opsx:propose … Trước hết chỉ làm kế hoạch. Trong phần yêu cầu, đưa vào các kịch bản cho dữ liệu rỗng và dữ liệu một phần”</step>
    <step t="Mã">“/opsx:apply Làm lần lượt từng tác vụ và chạy kiểm thử sau mỗi tác vụ”</step>
    <step t="Merge">“/opsx:archive Chuyển các yêu cầu vào đặc tả và cho xem cái gì đã đổi trong openspec/specs”</step>
  </b-hdd-steps>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="OpenSpec là gì?">Framework mã nguồn mở miễn phí của Fission AI cho phát triển dựa trên đặc tả. Tác nhân ghi kế hoạch thay đổi vào các tệp Markdown, bạn xem xét, tác nhân viết mã, và các yêu cầu được merge vào đặc tả chung của dự án.</q>
    <q t="Cài đặt OpenSpec như thế nào?">Bằng curl -fsSL https://openspec.dev/cli/install.sh | sh trên macOS và Linux, hoặc bằng npm install -g @fission-ai/openspec@latest. Sau đó chạy openspec init trong thư mục dự án.</q>
    <q t="OpenSpec khác Spec Kit ở điểm nào?">OpenSpec linh hoạt hơn và được xây cho mã đang chạy; các bước có thể lặp lại theo thứ tự bất kỳ. Spec Kit của GitHub đi qua các giai đoạn cố định: nguyên tắc, đặc tả, kế hoạch, tác vụ, mã.</q>
    <q t="OpenSpec chạy với những tác nhân nào?">Claude Code, Codex, Cursor, GitHub Copilot, Amazon Q và những tác nhân khác. openspec init cài lệnh cho các tác nhân bạn chọn.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Đọc thêm">
  <b-links>
    <item href="/blog/specs-rules-skills/" k="Ngữ cảnh" t="AGENTS.md và CLAUDE.md">tác nhân cần biết gì về dự án và lưu ở đâu</item>
    <item href="/blog/specs-by-aggregates/" k="Đặc tả" t="Đặc tả theo aggregate">cách chia yêu cầu thành các phần</item>
    <item href="/blog/spec-reconcile-loop/" k="Đặc tả" t="Vòng đối soát cho đặc tả">cách giữ đặc tả và mã luôn khớp nhau</item>
    <item href="/materials/glossary/spec-driven-development/" k="Thuật ngữ" t="Phát triển dựa trên đặc tả (Spec-Driven Development)">phát triển dựa trên đặc tả là gì</item>
  </b-links>
</b-chapter>
</b-post>
