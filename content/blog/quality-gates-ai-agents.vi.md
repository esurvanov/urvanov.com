---
title: Cổng chất lượng (quality gate) cho tác nhân AI là gì: các điểm kiểm tra nâng chất lượng và thời gian chạy tự chủ
date: 2026-11-14
updated: 2026-11-17
description: Cổng chất lượng là trạm kiểm tra giữa công việc của tác nhân AI và chữ “xong”: ba loại kiểm tra, vị trí đặt cổng, các cách vượt cổng và năm bước bắt đầu.
tags: AI, tác nhân, cổng chất lượng, MCP, bounded context, harness, hook, Claude Code
category: harness
layout: wide
mentions: quality gate, MCP, bounded context, aggregate, hooks, harness, Stage-Gate, Robert Cooper, Sonar, Claude, METR, deterministic check, feedback loop, compiler, P versus NP, design by contract, reward hacking
toc: answer=Tóm tắt | origin=Nguồn gốc | why=Tự chấm | kinds=Các loại | gives=Chất lượng | auto=Tự chủ | where=Ranh giới | mcp=MCP | limits=Giới hạn | start=Bắt đầu | faq=Câu hỏi | next=Đọc tiếp
---

Cổng chất lượng (quality gate) cho một tác nhân AI là một điểm kiểm soát bên ngoài: công việc dừng lại cho đến khi một phép kiểm tra độc lập trả lời “chấp nhận”, và bản thân tác nhân không bao giờ tự đánh dấu “xong”. Cổng đứng bên ngoài tác nhân và bên ngoài bounded context của nó, sau MCP hoặc một vách ngăn khác. Nó nâng chất lượng và kéo dài công việc tự chủ. Phần dưới nói về các loại, các con số, MCP và các giới hạn.

<b-post series="harness">
<b-callout icon="bulb">**Suy nghĩ của tác giả.** Ý tưởng rằng cổng là một bộ phận bên ngoài và đứng sau ranh giới ngữ cảnh của tác nhân, cùng các kết luận rút ra từ đó, là của tác giả: cổng thuộc về ranh giới bounded context; một bộ hàm MCP hẹp vừa tiết kiệm ngữ cảnh vừa giới hạn quyền; các cổng kéo dài công việc tự chủ. Không nguồn nào diễn đạt là “một cổng sau ranh giới ngữ cảnh”. Chưa ai đo việc công việc tự chủ được kéo dài: phần về tính tự chủ đưa ra một phép tính và các trường hợp, không phải một thí nghiệm dựa trên mẫu. Các nguồn xác nhận từng mắt xích riêng, và bên cạnh chúng là một địa chỉ cùng câu chính xác.</b-callout>

<b-hchain label="Chuỗi: tiếp nhận, các loại kiểm tra, ranh giới ngữ cảnh, MCP, giới hạn">
  <step icon="shield-check" t="Cổng">một trạm tiếp nhận</step>
  <step icon="layers" t="Các loại">máy · tác nhân · người</step>
  <step icon="workflow" sw="1.8" t="Ranh giới">bounded context</step>
  <step icon="package" t="MCP">quyền và hàm</step>
  <step icon="alert-circle" t="Giới hạn">cổng bị vượt thế nào</step>
</b-hchain>

<b-chapter id="answer" icon="shield-check" title="Tóm tắt: cổng là gì và vì sao tác nhân cần một cổng">
  <b-art names="quality-gates-ai-agents/overview" wide/>
  <b-cap>Con đường của công việc: tác nhân đi từng bước qua ngữ cảnh của chính nó, công việc đến, qua MCP, một cổng đứng trong một ngữ cảnh khác. Cổng trả lời “chấp nhận”, “trả lại kèm lỗi” hoặc “không chắc, một người quyết định”.</b-cap>
  <b-why align="left"><b-icon name="shield-check"/> **Nó là gì.** Một cổng đứng giữa công việc của tác nhân và chữ “xong”. Tác nhân mang đến một kết quả, và phép kiểm tra đưa ra một trong ba câu trả lời: chấp nhận, không chấp nhận (các lỗi quay về tác nhân) hoặc không chắc (một người quyết định). Trạm nói “xong”. Nếu phép kiểm tra thất bại, công việc không đi tiếp: không sang bước kế, không vào một merge, không đến người dùng. Cổng là một bộ phận bên ngoài: một điểm kiểm soát không thể đứng trong cùng một bounded context với tác nhân, nếu không nó chia sẻ các điểm mù của tác nhân. Vì vậy nó đứng sau một vách ngăn: sau một MCP server, trong một hook của client hoặc trong một tiến trình khác. Rất ít thứ đi qua ranh giới này theo cả hai chiều: một kết quả ngắn đi qua đó, một câu trả lời ngắn quay lại, mọi thứ khác bị đóng. Cổng hoạt động vì kiểm tra thường dễ hơn làm. Điều này họ hàng với câu hỏi “P versus NP” của lý thuyết độ phức tạp: tìm một lời giải có thể khó, kiểm tra một lời giải đã có thì nhanh. Với tác nhân đây chỉ là một phép loại suy: kiểm tra không rẻ với mọi nhiệm vụ, và ở nơi nó không rẻ, cổng dựa vào một người.</b-why>
  <b-why align="left"><b-icon name="trend-up"/> **Vì sao.** Lý do thứ nhất là chất lượng: tác nhân chấm công việc của mình kém, và một phép kiểm tra độc lập thấy những gì nó bỏ sót. Lý do thứ hai là tính tự chủ: một lỗi bị bắt ở một bước không đi xuyên qua hai mươi bước tiếp theo, nên tác nhân có thể làm việc lâu hơn mà không cần người. Lý do thứ ba là sự chú ý của con người: họ chỉ nhìn các trường hợp tranh cãi mà cổng đã chuyển cho.</b-why>
  <b-why align="left"><b-icon name="target"/> **Đặt ở đâu.** Bên ngoài tác nhân và bên ngoài ngữ cảnh của nó: trong một hook của client hoặc trong quyền của server sau MCP, chứ không trong văn bản chỉ dẫn mà tác nhân có thể bỏ qua. Bản thân tác nhân làm việc bên trong một bounded context nhỏ: ở đó phép kiểm tra là hữu hạn, thay đổi nhỏ và bộ hàm MCP hẹp. Những chỗ này được đề cập trong các phần “Ranh giới” và “MCP”.</b-why>
  <b-finding>
    <ex>Tác nhân sửa xong form đặt chỗ. Không có cổng thì nó viết “xong”. Có cổng thì chạy các test và phép kiểm tra quy tắc đặt chỗ: nếu một test thất bại, tác nhân nhận văn bản lỗi và tiếp tục, và một người chỉ biết về thay đổi khi mọi thứ đã qua hoặc khi phép kiểm tra nói “không chắc”.</ex>
    <gen>Cổng lấy đi quyền tự đánh dấu “xong” của tác nhân và trao nó cho một phép kiểm tra đứng bên ngoài tác nhân.</gen>
    <do>Chọn một nhiệm vụ tác nhân làm thường xuyên và viết điều kiện “xong” thành một câu có thể kiểm tra: “mọi test đều xanh và linter im lặng”.</do>
  </b-finding>
</b-chapter>

<b-chapter id="origin" icon="clock" title="Từ này đến từ đâu: từ thanh tra mã đến cổng cho tác nhân">
  <b-why align="left">Từ “cổng” (gate) đến từ quản lý sản phẩm, nhà máy và kỹ thuật phần mềm. Dưới đây là bốn điểm trên đường đi, và mỗi điểm mang một ý tưởng mà cổng của tác nhân thừa kế.</b-why>
  <b-art names="quality-gates-ai-agents/timeline" wide/>
  <b-cap>Thanh tra mã, Stage-Gate, một cổng cho mã mới và các cổng cho tác nhân.</b-cap>
  <b-rules cols="2">
    <rule icon="eye" t="1976: thanh tra mã">Fagan giới thiệu việc thanh tra mã chính thức trước khi bàn giao. Một khảo sát năm 2026 gọi review là “cổng chất lượng chính” kể từ đó<b-proof href="https://arxiv.org/abs/2606.13175" quote="Monperrus: „Code review has been the primary quality gate in software development since Fagan formalised code inspection in 1976.“"/>.</rule>
    <rule icon="git-branch" t="1990: Stage-Gate">Robert Cooper mô tả một dự án như một chuỗi các giai đoạn với các cổng giữa chúng quyết định “đi tiếp hay dừng”. Trang của viện ông diễn đạt: những người gác cổng đưa ra các quyết định như vậy đúng lúc<b-proof href="https://stage-gate.com/blog/improving-go-kill-decision-culture/" quote="Stage-Gate International: „Gatekeepers make timely, Go/Kill decisions.“"/>.</rule>
    <rule icon="shield-check" t="2020: một cổng cho mã mới">Sonar định nghĩa một cổng là một quyết định nhị phân: đạt hoặc không đạt<b-proof href="https://www.sonarsource.com/blog/clean_coding-quality_profile_quality_gate_guidance/" quote="Sonar: „called a Quality Gate and it's binary in nature - either pass or fail.“"/>. Nó nhìn vào mã vừa được thêm hoặc thay đổi gần đây; toàn bộ lịch sử nằm ngoài phép kiểm tra.</rule>
    <rule icon="cpu" t="2026: cổng cho tác nhân">Thoughtworks Radar gọi trình biên dịch, linter và test là các cổng chất lượng xác định và khuyên nối chúng vào các quy trình của tác nhân<b-proof href="https://www.thoughtworks.com/content/dam/thoughtworks/documents/radar/2026/04/tr_technology_radar_vol_34_en.pdf" quote="Thoughtworks Radar, vol. 34: „Developers have long relied on deterministic quality gates such as compilers, linters, structural tests and test suites“"/>. Sonar có một bộ điều kiện riêng cho mã do tác nhân viết.</rule>
  </b-rules>
  <b-why align="left">Hai ý tưởng nữa đến từ các nhà máy. Điểm thứ ba trong mười bốn điểm của Deming nói hãy thôi phụ thuộc vào kiểm tra ở cuối và xây dựng chất lượng vào sản phẩm ngay từ đầu<b-proof href="https://deming.org/explore/fourteen-points/" quote="Deming, point 3: „Cease dependence on inspection to achieve quality. Eliminate the need for inspection on a mass basis by building quality into the product in the first place.“"/>. Trong hệ thống jidoka của mình, Toyota làm cho thiết bị dừng ngay khi phát hiện bất thường<b-proof href="https://global.toyota/en/company/vision-and-philosophy/production-system/" quote="Toyota: equipment should „stop immediately when abnormalities are detected to prevent defective products from being produced“"/>. Một cổng của tác nhân kết hợp cả hai ý tưởng: phép kiểm tra đứng càng sớm càng tốt và có thể dừng công việc.</b-why>
  <b-finding>
    <ex>Fagan kiểm tra mã bằng con người, Cooper đặt các cổng giữa các giai đoạn dự án, Sonar làm một cổng tự động, và với tác nhân một cổng trở thành điểm mà công việc không đi tiếp nếu không có phán quyết.</ex>
    <gen>Cổng của tác nhân không phải một phát minh mới: đó là một điểm kiểm soát cũ được chuyển đến nơi một cỗ máy làm việc, và cỗ máy tự kiểm tra mình kém.</gen>
    <do>Hãy xem dự án của bạn đã có những cổng nào cho con người: test trong CI, review bắt buộc, một linter. Tác nhân cũng phải qua chính những cổng đó.</do>
  </b-finding>
</b-chapter>

<b-chapter id="why" icon="eye" title="Vì sao tác nhân không tự kiểm tra mình">
  <b-why align="left">Điều đầu tiên nghiên cứu cho thấy: tác nhân đánh giá quá cao công việc của chính nó. Anthropic nhận thấy việc tách tác nhân làm việc khỏi tác nhân đánh giá nó là một đòn bẩy mạnh<b-proof href="https://www.anthropic.com/engineering/harness-design-long-running-apps" quote="Anthropic, 24 Mar 2026: „Separating the agent doing the work from the agent judging it proves to be a strong lever to address this issue.“"/>. Họ cũng lưu ý rằng ngay từ đầu Claude là một người review kém và phải được điều chỉnh cho nghiêm khắc.</b-why>
  <b-why align="left">Phép đo chi tiết nhất là một preprint của Park và Choi (tháng 7 năm 2026, một thử nghiệm sơ bộ dạng bản nháp). Cùng một tác nhân chạy sáu chu kỳ cải thiện, và chỉ người khép vòng phản hồi thay đổi, tức là người đánh giá kết quả: chính tác nhân, một trọng tài mạnh bên trong vòng lặp, hoặc một phép kiểm tra bên ngoài thấy kết quả thực. Biểu đồ cho thấy điểm cuối của mỗi biến thể.</b-why>
  <b-art names="quality-gates-ai-agents/self-grade" wide/>
  <b-cap>Việc tác nhân tự chấm đã làm lùi 19% những gì đạt được, còn phép kiểm tra bên ngoài cho điểm tối đa. Một thử nghiệm: một mô hình, một nhiệm vụ, ba lần lặp.</b-cap>
  <b-why align="left">Điều gì đứng sau các con số. Tác nhân gọi cả 54 chu kỳ là một cải thiện, dù trong 56% chúng thay đổi thực tế bằng không hoặc âm: tự chấm biến thành “chấp nhận mọi thứ”. Ngay cả trọng tài mạnh bên trong vòng lặp cũng chấp nhận các hồi quy thực trong 44% trường hợp và từ chối 38% các cải thiện thực. Các tác giả giải thích khoảng cách này như sau<b-proof href="https://arxiv.org/abs/2607.25152" quote="Park, Choi: „The cause of the gap is not the evaluator's quality but what the evaluator is grounded in.“"/>: khoảng cách được quyết định bởi thứ mà trọng tài dựa vào, còn trí thông minh của trọng tài không ảnh hưởng. Một trọng tài bên trong vòng lặp chỉ thấy những gì tác nhân cho nó xem. Một phép kiểm tra bên ngoài nhìn vào kết quả thực.</b-why>
  <b-why align="left">Anthropic đi đến cùng kết luận với trình biên dịch C của mình (một trường hợp do chính Anthropic mô tả): 16 tác nhân, khoảng 2.000 phiên và khoảng 20.000 đô la. Tác giả nêu một bộ kiểm chứng gần như hoàn hảo là điều kiện chính<b-proof href="https://www.anthropic.com/engineering/building-c-compiler" quote="Anthropic, 5 Feb 2026: „it's important that the task verifier is nearly perfect, otherwise Claude will solve the wrong problem.“"/>. Cùng bài viết đó cảnh báo<b-proof href="https://www.anthropic.com/engineering/building-c-compiler" quote="same article: „it is easy to see tests pass and assume the job is done, when this is rarely the case.“"/>. Test đạt mà công việc chưa xong: điều này xảy ra khi phép kiểm tra không xác định. Một phép kiểm tra xác định trên cùng dữ liệu luôn cho cùng một phán quyết, như chạy test hoặc một linter. Câu trả lời của một mô hình trọng tài có thể khác nhau giữa các lần chạy, nên trọng tài bổ sung cho chương trình kiểm tra và không thay thế nó.</b-why>
  <b-why align="left">Thêm một quan sát từ thử nghiệm: một bit là đủ cho phép kiểm tra bên ngoài. Một phán quyết “chấp nhận” hoặc “từ chối” không kèm giải thích nào đạt 110,0 so với 113,0 khi có bản giải trình đầy đủ. Vì vậy một cổng không cần đưa ra lý do: một có hoặc một không là đủ.</b-why>
  <b-finding>
    <ex>Tác nhân trong vòng lặp gọi mọi thứ là cải thiện, còn phép kiểm tra bên ngoài, nhìn vào kết quả thực, đã cắt bỏ các hồi quy.</ex>
    <gen>Một phép kiểm tra bên trong cuộc đối thoại của tác nhân thừa kế các điểm mù của nó. Điều làm một phép kiểm tra độc lập là việc dựa vào một sự kiện bên ngoài: một lần chạy test, một kết quả thực, một người review riêng có quyền truy cập sản phẩm thực.</gen>
    <do>Xem lại các prompt của bạn cho tác nhân: nếu chúng chứa “hãy chắc chắn mọi thứ đều đúng”, hãy thay bằng một lần chạy kiểm tra có kết quả mà tác nhân không tự viết được.</do>
  </b-finding>
</b-chapter>

<b-chapter id="kinds" icon="layers" title="Ba loại kiểm tra tại một cổng">
  <b-why align="left">Một trạm tiếp nhận có thể chứa phép kiểm tra thuộc ba loại. Chúng khác nhau về tốc độ, giá và những gì chúng thấy được, nên trong thực tế người ta đặt vài loại nối tiếp nhau: loại rẻ và nhanh trước, loại đắt và hiếm sau cùng.</b-why>
  <b-art names="quality-gates-ai-agents/three-kinds" wide/>
  <b-cap>Từ trái sang phải, phép kiểm tra thông minh hơn, chậm hơn và đắt hơn.</b-cap>
  <b-table>

| Loại | Nó thấy gì | Ví dụ | Điểm yếu |
|---|---|---|---|
| <b-icon name="cpu"/> **Máy** | mọi thứ viết được thành quy tắc: test, kiểu, linter, build, độ phủ | Sonar cho tác nhân: độ phủ mã mới ít nhất 80%, trùng lặp tối đa 3%, không có lỗi hay lỗ hổng mới | không thấy ý nghĩa: các sensor bắt chẩn đoán sai, độ phức tạp không cần thiết và nhiệm vụ bị hiểu sai một cách không đáng tin |
| <b-icon name="eye"/> **Tác nhân review** | ý nghĩa theo các tiêu chí có ngưỡng | Anthropic: dưới ngưỡng ở bất kỳ tiêu chí nào thì giai đoạn thất bại; trọng tài của Spotify phủ quyết khoảng một phần tư số phiên | đắt hơn, cần điều chỉnh cho nghiêm khắc, và nó cũng sai |
| <b-icon name="user"/> **Một người** | rủi ro, ý định, hậu quả | GitHub: các draft PR từ tác nhân chỉ được con người phê duyệt và merge | mệt mỏi và quen với việc phê duyệt |

  </b-table>
  <b-why align="left"><b-icon name="cpu"/> **Máy.** Đặt ra mức thấp nhất. Với mã do tác nhân viết, Sonar yêu cầu sáu điều kiện: không có lỗi mới, lỗ hổng hay vấn đề khả năng bảo trì vượt ngưỡng, độ phủ mã mới ít nhất 80%, trùng lặp tối đa 3% và không có rủi ro phụ thuộc mới. Điều kiện cuối xuất hiện vì hành vi của tác nhân: chúng có thể cài các gói mà không thẩm định<b-proof href="https://docs.sonarsource.com/sonarqube-server/quality-standards-administration/ai-code-assurance/quality-gate-for-agentic-ai" quote="Sonar: „agents may autonomously install packages without manual vetting“"/>. Về việc chia các phép kiểm tra thành guide và sensor, xem bài [“Harness engineering trong thực tế”](/blog/harness-driven-development/): một cổng là một sensor có quyền dừng công việc.</b-why>
  <b-why align="left"><b-icon name="eye"/> **Tác nhân review.** Ở Anthropic mỗi tiêu chí có một ngưỡng cứng, và nếu dù chỉ một tiêu chí rơi xuống dưới nó thì giai đoạn thất bại và tác nhân nhận một bản giải trình chi tiết<b-proof href="https://www.anthropic.com/engineering/harness-design-long-running-apps" quote="Anthropic: „Each criterion had a hard threshold, and if any one fell below it, the sprint failed and the generator got detailed feedback on what went wrong.“"/>. Trước một giai đoạn, bên thực hiện và bên review thống nhất một hợp đồng giai đoạn: cái gì được coi là “xong”<b-proof href="https://www.anthropic.com/engineering/harness-design-long-running-apps" quote="Anthropic: „agreeing on what ‘done’ looked like for that chunk of work before any code was written“"/>. Spotify thêm một trọng tài sau khi các tác nhân bắt đầu làm thừa: refactor mã ngoài nhiệm vụ và tắt các test chập chờn. Trọng tài so sánh thay đổi với yêu cầu ban đầu<b-proof href="https://engineering.atspotify.com/2025/12/feedback-loops-background-coding-agents-part-3" quote="Spotify: „the judge vetoes about a quarter of them. When that happens, the agent is able to course correct half the time.“"/>.</b-why>
  <b-why align="left"><b-icon name="user"/> **Một người.** GitHub xây con người vào chính quy trình: tác nhân không thể đánh dấu PR của mình là sẵn sàng, không thể phê duyệt và cũng không thể merge nó<b-proof href="https://docs.github.com/en/copilot/concepts/agents/coding-agent/risks-and-mitigations" quote="GitHub Docs: „Copilot cloud agent cannot mark its pull requests as ‘Ready for review’ and cannot approve or merge a pull request.“"/>. Một cổng như vậy cần ở nơi một lỗi tốn kém: tiền, quyền truy cập, dữ liệu của người khác.</b-why>
  <b-why align="left">Một cổng có ba câu trả lời: chấp nhận, không chấp nhận và “không chắc”. Câu thứ ba trao trường hợp cho một người và cho thấy khung của phép kiểm tra kết thúc ở đâu. Vì sao một câu trả lời như vậy là không tránh được với mọi mã của tác nhân được đề cập trong bài [“Kiểm tra công việc của tác nhân AI ở đâu”](/blog/agent-checkpoint/).</b-why>
  <b-finding>
    <ex>Test đạt sau 40 giây. Tác nhân review thấy nút hoạt động nhưng trông khác với nhiệm vụ. Người nhận chỉ trường hợp tranh cãi này.</ex>
    <gen>Các cổng nhanh đứng trước các cổng đắt: máy lọc những gì hiển nhiên, tác nhân đánh giá ý nghĩa, con người quyết định rủi ro.</gen>
    <do>Liệt kê các phép kiểm tra của dự án theo ba hàng của bảng. Một hàng trống nghĩa là thiếu loại cổng đó.</do>
  </b-finding>
</b-chapter>

<b-chapter id="gives" icon="trend-up" title="Các cổng mang lại gì cho chất lượng và chi phí bao nhiêu">
  <b-why align="left">Các con số dưới đây đến từ bốn nguồn riêng biệt: hai bài viết của Anthropic (24 Mar 2026 và 5 Feb 2026), các blog kỹ thuật của Stripe và Spotify, và báo cáo DORA 2025. Không có nghiên cứu dựa trên mẫu: chưa ai công bố các so sánh “có cổng và không có cổng” trên hàng trăm nhiệm vụ, nên mỗi con số chỉ là một ví dụ. Liên kết cạnh mỗi con số cho thấy nó đến từ đâu.</b-why>
  <b-art names="quality-gates-ai-agents/cost-quality" wide/>
  <b-cap>Một yêu cầu: một tác nhân đơn lẻ và một tác nhân có người review.</b-cap>
  <b-rules cols="2">
    <rule icon="flask" t="Anthropic: một yêu cầu, hai lần chạy">Một tác nhân: 20 phút và 9 đô la, tính năng chính không hoạt động. Một tác nhân có người review: 6 giờ và 200 đô la, kết quả hoạt động<b-proof href="https://www.anthropic.com/engineering/harness-design-long-running-apps" quote="Anthropic: „The harness was over 20x more expensive, but the difference in output quality was immediately apparent.“"/>. Với Opus 4.6: 3 giờ 50 phút và 124,70 đô la. Nó có lợi ở các nhiệm vụ mà mô hình không làm đáng tin một mình<b-proof href="https://www.anthropic.com/engineering/harness-design-long-running-apps" quote="Anthropic: „It is worth the cost when the task sits beyond what the current model does reliably solo.“"/>.</rule>
    <rule icon="modules" t="Stripe: quy mô">Hơn một nghìn PR được merge mỗi tuần do tác nhân viết và con người review<b-proof href="https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents" quote="Stripe: „Over a thousand pull requests merged each week at Stripe are completely minion-produced, and while they're human-reviewed, they contain no human-written code.“"/>. Các bước không có mô hình đứng giữa các bước của mô hình: linter trong năm giây, tối đa hai lần chạy CI, rồi nhánh chuyển cho một người<b-proof href="https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents-part-2" quote="Stripe, part 2: „those particular nodes don't invoke an LLM at all—they just run code“"/>.</rule>
    <rule icon="refresh-cw" t="Spotify: trọng tài">Các bộ kiểm chứng tự chạy, tác nhân không biết chúng; một trọng tài kiểm tra ý nghĩa. Không có số liệu trước và sau: chỉ có một phủ quyết ở một phần tư số phiên và phục hồi ở một nửa trong số đó (trích dẫn nằm ở phần trước).</rule>
    <rule icon="chart-line" t="DORA 2025: tốc độ và độ ổn định">AI tăng tốc độ chuyển giao nhưng làm giảm độ ổn định<b-proof href="https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report" quote="DORA 2025: „AI adoption does continue to have a negative relationship with software delivery stability.“"/>. Lập luận “sự bất ổn tự bù qua việc sửa nhanh” không tìm được sự ủng hộ<b-proof href="https://services.google.com/fh/files/misc/2025_state_of_ai_assisted_software_development.pdf" quote="DORA 2025, p. 41: „We found no evidence of such a moderating effect.“"/>. Kết luận của tôi: các cổng giữ cho tốc độ không phải trả bằng độ ổn định. Báo cáo không nhắc đến các cổng.</rule>
  </b-rules>
  <b-finding>
    <ex>Một người review và các ngưỡng đã biến một ứng dụng hỏng thành một ứng dụng hoạt động với giá gấp 20 lần. Stripe và Spotify đạt được quy mô nhờ các phép kiểm tra đứng quanh tác nhân.</ex>
    <gen>Một cổng tốn tiền và thời gian. Nó có lợi ở nơi tác nhân không có nó giao ra một kết quả hỏng hoặc một lỗi về sau tốn kém.</gen>
    <do>Với nhiệm vụ của bạn, hãy ước tính giá của một lỗi đến được khâu review của con người và giá của một lần chạy kiểm tra. Nếu cái đầu cao hơn, cổng có lợi.</do>
  </b-finding>
</b-chapter>

<b-chapter id="auto" icon="gauge" title="Các cổng kéo dài công việc tự chủ thế nào: phép tính và một khoảng trống trong dữ liệu">
  <b-callout icon="bulb">Một mô hình ngôn ngữ giữ một bản phác thảo thô của thế giới, không phải bản thân thế giới. Khi tác nhân kiểm tra các bước của mình với thực tế (test, câu trả lời của hệ thống) và giữ ngữ cảnh gọn gàng, các lỗi được tìm ra và sửa. Các nghiên cứu về tự sửa lỗi ủng hộ điều này: nó giúp ích khi có một tín hiệu đáng tin từ bên ngoài và đôi khi gây hại khi không có. “Càng dài càng tốt” chỉ đúng với việc kiểm tra như vậy: chất lượng giảm ở đầu vào dài, và ở một số nhiệm vụ một chuỗi lập luận dài hơn cho câu trả lời tệ hơn. Một cổng cung cấp việc kiểm tra và trật tự, nên công việc có thể chạy lâu hơn mà không mất chất lượng. Không có dữ liệu mẫu cho “một cổng đã kéo dài công việc tự chủ”; dưới đây là các sự kiện mà ý tưởng dựa vào.</b-callout>
  <b-why align="left"><b-icon name="bar-chart"/> **Chân trời nhiệm vụ là gì.** METR đo độ dài của một nhiệm vụ mà tác nhân hoàn thành với một xác suất thành công cho trước, tính bằng thời gian mà một con người cần cho nó. Đây không phải thời gian chạy của tác nhân<b-proof href="https://metr.org/time-horizons" quote="METR: „It's a measure of the difficulty of a task, rather than the time an AI spends to complete the task.“"/>. Với Claude Opus 4.6, chân trời ở mức thành công 50% là khoảng 12 giờ (khoảng tin cậy từ 5 đến 61 giờ), và ở 80% là khoảng 70 phút. Với GPT-5.4 là 5,7 giờ và 54 phút. Trên 16 giờ METR coi các phép đo là không đáng tin<b-proof href="https://metr.org/time-horizons" quote="METR: „Measurements above 16 hrs are unreliable with our current task suite.“"/>. Các chỉ số tự chủ hoạt động thế nào và con người ở đâu trong đó: trong bài [“Escalation sang con người ở tác nhân AI”](/blog/agent-escalation-to-human/#measure).</b-why>
  <b-why align="left"><b-icon name="chart-axes"/> **Cái giá của độ tin cậy.** Toby Ord chỉ ra rằng với một xác suất thất bại không đổi trên mỗi phút làm việc, các chân trời liên hệ với nhau bằng một công thức<b-proof href="https://arxiv.org/pdf/2505.05115" quote="Ord: „the time horizon for a success probability of p would be ln(p)/ln(q) times as long as one with success probability q.“"/>. Hệ quả: chân trời ở mức thành công 80% bằng khoảng một phần ba chân trời ở 50%, ở 90% khoảng một phần bảy, ở 99% khoảng một phần bảy mươi. Mỗi “số chín” thêm của độ tin cậy tốn một phần độ dài nhiệm vụ.</b-why>
  <b-art names="quality-gates-ai-agents/autonomy-curve" wide/>
  <b-cap>Một ví dụ tính toán: ở 95% thành công mỗi bước, sau 20 bước còn 36% cơ hội, và ở 99% mỗi bước là 82%.</b-cap>
  <b-why align="left"><b-icon name="shield-check"/> **Cổng ở đâu trong đây.** Một cổng ở một bước nâng độ tin cậy của bước đó. Nếu một bước thất bại với xác suất 5% và cổng bắt được 4 trong 5 lỗi rồi gửi tác nhân quay lại sửa, thì bước đó rốt cuộc hỏng trong 1% trường hợp. Phép tính giả định các bước độc lập: chính Ord lưu ý rằng với Claude 3.7 Sonnet tỷ lệ chân trời đo được là 0,25 trong khi lý thuyết cho 0,32. Biểu đồ cho thấy một hướng: 82% là một phép tính không có kết quả đo nào đứng sau.</b-why>
  <b-why align="left"><b-icon name="file-text"/> **Hai cơ chế của Anthropic cho các lần chạy dài.** Cơ chế thứ nhất: mỗi phiên của tác nhân bắt đầu mà không nhớ gì về các phiên trước, và nén cuộc đối thoại là chưa đủ<b-proof href="https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents" quote="Anthropic: „compaction isn’t sufficient“"/>. Vì vậy ở đầu tác nhân viết một danh sách hơn 200 tính năng, tất cả đều đánh dấu “failing”. Tác nhân chỉ được đổi dấu đạt, và việc sửa chính các test bị cấm<b-proof href="https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents" quote="Anthropic: „It is unacceptable to remove or edit tests because this could lead to missing or buggy functionality.“"/>. Một danh sách như vậy là trạng thái của cổng sống trong một tệp bên ngoài cuộc đối thoại: một phiên mới thấy còn lại bao nhiêu và không thể quyết định rằng mọi thứ đã xong.</b-why>
  <b-why align="left"><b-icon name="alert-circle"/> Cơ chế thứ hai liên quan đến “context anxiety” (lo âu về ngữ cảnh). Các mô hình bắt đầu kết thúc công việc khi chúng nghĩ cửa sổ ngữ cảnh sắp hết<b-proof href="https://cognition.com/blog/devin-sonnet-4-5-lessons-and-challenges" quote="Cognition: „we found the model taking shortcuts or leaving tasks incomplete when it believed it was near the end of its window, even when it had plenty of room left.“"/>. Một cổng với các tiêu chí từ danh sách làm cho quyết định kết thúc phụ thuộc vào các dấu xanh, và cảm giác của tác nhân không tham gia vào đó. Từ đó có kết luận: một bounded context nên được định cỡ vừa với cửa sổ ngữ cảnh vật lý.</b-why>
  <b-why align="left"><b-icon name="refresh-cw"/> **Một hook như cơ chế tiếp tục.** Trong Claude Code, một hook hoàn tất nhiệm vụ không cho một nhiệm vụ đóng cho đến khi các phép kiểm tra đạt<b-proof href="https://code.claude.com/docs/en/hooks" quote="Claude Code Docs, TaskCompleted: „Use this to enforce completion criteria like passing tests or lint checks before a task can close.“"/>: thông báo từ chối quay về tác nhân, và nó tiếp tục. Một hook dừng (stop hook) hoạt động tương tự cho việc kết thúc cả lượt.</b-why>
  <b-finding>
    <ex>Một tác nhân thực hiện 20 bước. Không có cổng thì cơ hội đi qua chúng mà không một lỗi nào là khoảng 36%. Một cổng bắt 4 trong 5 lỗi ở mỗi bước nâng nó, theo phép tính, lên khoảng 82%.</ex>
    <gen>Một cổng mang lại tính tự chủ qua độ tin cậy của bước: lỗi càng hiếm khi lọt đi tiếp thì càng có thể để nhiệm vụ dài hơn chạy không giám sát. Không có phép đo trực tiếp, nên đây là một phép tính và một giả thuyết.</gen>
    <do>Giữ một nhật ký: tác nhân đi qua bao nhiêu bước mà không có sự can thiệp của con người trước và sau khi thêm một cổng. Sau một tháng bạn sẽ có các con số của riêng mình.</do>
  </b-finding>
</b-chapter>

<b-chapter id="where" icon="workflow" title="Đặt ở đâu: ở ranh giới bounded context">
  <b-why align="left">Một cổng thuộc về ranh giới bounded context vì bốn lý do. Mỗi lý do đều có sự ủng hộ từ các nguồn.</b-why>
  <b-why align="left"><b-icon name="ring-dot"/> **1. Một phép kiểm tra bên trong một khung là hữu hạn.** Không phép kiểm tra nào xác minh được chương trình bất kỳ theo quy tắc bất kỳ, nên phép kiểm tra đi đến nơi một khung giới hạn câu hỏi. Vì sao như vậy và một ranh giới aggregate trở thành điểm kiểm tra thế nào có trong bài [“Kiểm tra công việc của tác nhân AI ở đâu”](/blog/agent-checkpoint/). Với một cổng, điều đó dẫn đến: một cổng không có ranh giới sẽ trả lời “không chắc” quá thường xuyên.</b-why>
  <b-why align="left"><b-icon name="scissors"/> **2. Một thay đổi nhỏ thành công thường xuyên hơn.** Tác nhân thay đổi càng nhiều cùng lúc thì nhiệm vụ càng hiếm khi được giải. Một ranh giới ngữ cảnh giới hạn kích thước của một thay đổi một cách tự nhiên.</b-why>
  <b-art names="quality-gates-ai-agents/size-success" wide/>
  <b-why align="left">Các con số trên biểu đồ đến từ hai công trình: [SWE-bench Live](https://arxiv.org/abs/2505.23419) và tác nhân Kozuchi trên SWE-bench Verified ([arXiv 2608.15579](https://arxiv.org/abs/2608.15579)). Các benchmark và tác nhân khác nhau, nên điều quan trọng là hướng: thay đổi càng lớn thì càng hiếm khi thành công. Ở cấp nhóm DORA cho thấy điều tương tự: lợi ích của AI phụ thuộc vào việc làm việc theo các lô nhỏ<b-proof href="https://services.google.com/fh/files/misc/2025_state_of_ai_assisted_software_development.pdf" quote="DORA 2025, p. 58: „With a high degree of certainty, we found that AI adoption's positive benefits depend on teams working in small batches“"/>.</b-why>
  <b-why align="left">Trên SWE-bench Live, một thay đổi trong một tệp dưới năm dòng được giải trong gần một nửa trường hợp (48%), ba tệp trở lên hoặc hơn một trăm dòng dưới 10%, và bảy tệp trở lên thì không bao giờ ([arXiv 2505.23419](https://arxiv.org/abs/2505.23419)). Tác nhân Kozuchi trên SWE-bench Verified giải 81,7% nhiệm vụ với thay đổi 1–4 dòng và 41,7% với thay đổi trên 100 dòng ([arXiv 2608.15579](https://arxiv.org/abs/2608.15579)). Đây là các benchmark và tác nhân khác nhau, nên điều quan trọng là hướng. DORA thêm một kết luận ở cấp nhóm: lợi ích của AI phụ thuộc vào việc làm việc theo các lô nhỏ<b-proof href="https://services.google.com/fh/files/misc/2025_state_of_ai_assisted_software_development.pdf" quote="DORA 2025, p. 58: „With a high degree of certainty, we found that AI adoption's positive benefits depend on teams working in small batches“"/>.</b-why>
  <b-why align="left"><b-icon name="database"/> **3. Cửa sổ ngữ cảnh là hữu hạn.** Ngữ cảnh là một tài nguyên hữu hạn với lợi ích biên giảm dần<b-proof href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" quote="Anthropic: context is „a finite resource with diminishing marginal returns“"/>. Chroma đã thử 18 mô hình và cho thấy độ tin cậy giảm khi đầu vào tăng<b-proof href="https://www.trychroma.com/research/context-rot" quote="Chroma, Context Rot: „performance grows increasingly unreliable as input length grows“"/>. Trong một bài nói năm 2024, Evans lưu ý rằng câu trả lời của mô hình ổn định hơn khi một yêu cầu được chia thành các phần nhỏ hơn (theo tường thuật của InfoQ). Một bounded context nhỏ cho tác nhân một cửa sổ ngắn, và cổng ít có khả năng kiểm tra thứ mà tác nhân không còn nhớ.</b-why>
  <b-art names="quality-gates-ai-agents/contexts" wide/>
  <b-cap>Mỗi ngữ cảnh có tác nhân riêng, cửa sổ nhỏ riêng, bộ hàm MCP riêng và một cổng ở ranh giới. Các sự kiện đi giữa các ngữ cảnh.</b-cap>
  <b-why align="left"><b-icon name="swap"/> **4. Ở ranh giới thì rõ lỗi của ai.** Trong design by contract của Bertrand Meyer, một vi phạm điều kiện tiên quyết là lỗi của bên gọi và một vi phạm điều kiện hậu là lỗi của bên cung cấp<b-proof href="https://se.inf.ethz.ch/~meyer/publications/computer/contract.pdf" quote="Meyer, 1992: „A precondition violation indicates a bug in the client (caller).“ and „A postcondition violation is a bug in the supplier (routine).“"/>. Một cổng ở ranh giới cho thấy ngay đó là lỗi của ai: một lệnh xấu đi vào hay một sự kiện xấu đi ra. Evans khuyên đặt một lớp bảo vệ ở ranh giới để dịch các khái niệm ngoại lai sang khái niệm của riêng bạn<b-proof href="https://www.domainlanguage.com/wp-content/uploads/2016/05/DDD_Reference_2015-03.pdf" quote="Evans, DDD Reference: „As a downstream client, create an isolating layer to provide your system with functionality of the upstream system in terms of your own domain model.“"/>. Cổng đứng trên lớp đó.</b-why>
  <b-why align="left">Bounded context và aggregate là gì, và số lượng context liên hệ thế nào với số lượng tác nhân, có trong các bài [“Cần bao nhiêu tác nhân AI”](/blog/agents-per-bounded-context/) và [“Spec theo aggregate”](/blog/specs-by-aggregates/).</b-why>
  <b-finding>
    <ex>Các context “Booking” và “Payment”: mỗi cái có tác nhân riêng, bộ ba hàm MCP riêng và cổng riêng. Sự kiện BookingCreated đi qua cổng booking ở chiều ra và cổng payment ở chiều vào. Nếu payment từ chối sự kiện, có thể thấy vi phạm nằm ở phía nào.</ex>
    <gen>Một ranh giới bounded context cho một cổng bốn thứ cùng lúc: một phép kiểm tra hữu hạn, một thay đổi nhỏ, một cửa sổ ngắn và một thủ phạm rõ ràng.</gen>
    <do>Chọn một context và viết ba điều ở ranh giới của nó: nó nhận những lệnh nào, phát ra những sự kiện nào, quy tắc nào luôn đúng. Đó là những gì cổng kiểm tra.</do>
  </b-finding>
</b-chapter>

<b-chapter id="mcp" icon="package" title="MCP: quyền, bộ hàm và vị trí của một cổng">
  <b-why align="left">[MCP](/blog/mcp-agent-access/) là một giao thức qua đó tác nhân gọi các hàm của hệ thống bên ngoài. Nó quan trọng hai lần với các cổng: một MCP server có thể giới hạn cứng những gì tác nhân có thể dùng, và bộ hàm quyết định tác nhân tốn bao nhiêu ngữ cảnh cho các mô tả.</b-why>
  <b-subhead>MCP server có thể cấm gì và chỉ gợi ý gì</b-subhead>
  <b-table>

| Cơ chế | Độ mạnh | Đặc tả nói gì |
|---|---|---|
| <b-status-dot color="accent">Quyền và scope</b-status-dot> | một lệnh cấm | khi quyền không đủ, server trả lời 403 và nêu scope cần thiết; trong phiên bản 2026-07-28, danh sách hàm có thể phụ thuộc vào quyền của bên gọi |
| <b-status-dot color="accent">Kết quả theo schema</b-status-dot> | một phán quyết | server phải trả một kết quả khớp với schema đã khai báo, nên một phán quyết “chấp nhận / không chấp nhận” đọc được bằng máy |
| <b-status-dot color="accent">Một câu hỏi cho người</b-status-dot> | một câu hỏi | server có thể hỏi một người; câu trả lời là accept, decline hoặc cancel |
| <b-status-dot color="warn">Nhãn của hàm</b-status-dot> | một gợi ý | “read-only”, “destructive” là các gợi ý, và client không bắt buộc phải tin chúng |
| <b-status-dot color="warn">Thư mục gốc</b-status-dot> | một gợi ý | server “nên” tôn trọng các ranh giới, nhưng không có gì cưỡng chế điều đó |

  </b-table>
  <b-why align="left">Các xác nhận từ đặc tả: một kết quả theo schema<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/server/tools" quote="MCP, 2026-07-28: „Servers MUST provide structured results that conform to this schema.“"/>, một danh sách hàm theo quyền<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/server/tools" quote="MCP, 2026-07-28: the function list „MAY vary by the authorization presented on the request — for example, returning only the tools the caller's granted scopes permit“"/> và các nhãn hàm<b-proof href="https://github.com/modelcontextprotocol/modelcontextprotocol" quote="MCP, schema.ts: „NOTE: all properties in ToolAnnotations are hints.“"/>. Thêm về scope của các MCP server trong Claude Code có trong bài [“Scope MCP”](/blog/mcp-scopes/).</b-why>
  <b-subhead>Một bộ hàm hẹp: hai hiệu quả từ một cơ chế</b-subhead>
  <b-art names="quality-gates-ai-agents/mcp-sets" wide/>
  <b-cap>Các mô tả của 58 hàm tốn khoảng 55 nghìn token. Với tìm kiếm trên các hàm, những hàm cần thiết được nạp theo yêu cầu: khoảng 8,7 nghìn.</b-cap>
  <b-why align="left"><b-icon name="package"/> **Hiệu quả thứ nhất là ngữ cảnh.** Anthropic chỉ ra rằng 58 hàm tốn khoảng 55 nghìn token, và khoảng 8,7 nghìn với tìm kiếm trên các hàm, trong khi độ chính xác khi chọn hàm tăng với Opus 4 từ 49% lên 74% và với Opus 4.5 từ 79,5% lên 88,1%. Trong một ví dụ khác, chạy mã thay vì gọi trực tiếp cắt mức tiêu thụ từ 150.000 xuống 2.000 token. Kết luận của chính Anthropic: nhiều hàm hơn không có nghĩa là kết quả tốt hơn.</b-why>
  <b-why align="left"><b-icon name="lock"/> **Hiệu quả thứ hai là quyền.** Cùng các thiết lập đó giới hạn quyền. Trong Claude Code, một subagent có danh sách các hàm được phép, danh sách các hàm bị cấm và bộ MCP server riêng mà cuộc đối thoại chính không có. Một bộ hẹp cho mỗi bounded context nghĩa là vừa có cửa sổ ngắn vừa ít cơ hội phá hỏng thứ gì. Đây là kết luận của tôi: các con số ở trên được đo cho token, và không có con số nào cho bảo mật.</b-why>
  <b-subhead>Vì sao cổng đứng sau MCP và vì sao tác nhân không có động cơ để dừng</b-subhead>
  <b-callout icon="help-circle">**Giả thuyết của tác giả, nghiên cứu đang được chuẩn bị.** Các tác nhân được đo và, như tôi cho là, được tối ưu theo thời gian chạy tự chủ: chỉ số tiến bộ chính là độ dài của một nhiệm vụ mà tác nhân làm mà không có người (METR). MCP có một yêu cầu gửi tới người: server có thể hỏi, và câu trả lời là “accept”, “decline” hoặc “cancel”. Với một chỉ số như vậy, mỗi câu hỏi gửi tới người là một mất mát về tính tự chủ, nên tác nhân không có động cơ để dừng và hỏi. Thêm vào đó MCP là một cổ chai hẹp: các lệnh gọi hàm và câu trả lời của chúng đi qua đó, nhưng ý nghĩa của toàn bộ công việc thì không. Kết luận: một cổng không thể dựa vào thiện chí của tác nhân, nó đứng bên ngoài tác nhân, sau một vách ngăn. Các tác nhân thực sự được huấn luyện thế nào và các chỉ số được tính ra sao thì tôi chưa kiểm chứng, và một bài riêng được dành cho việc đó.</b-callout>
  <b-why align="left">Một ranh giới họ hàng chạy giữa các lệnh của tác nhân (control plane) và dữ liệu mà nó đọc (data plane): dữ liệu không được trở thành lệnh. Bài nói của tác giả tại Podlodka AI Crew nói về điều này, [“Tác nhân AI trong production: kiến trúc, bảo vệ, kinh tế”](/decks/ai-agent-architecture/) (slide bằng tiếng Nga), và bài [“Data plane và control plane của một tác nhân”](/blog/data-plane-control-plane-prompt-injection/) cũng vậy.</b-why>
  <b-subhead>Cổng nên đứng ở đâu: bên ngoài tác nhân</b-subhead>
  <b-art names="quality-gates-ai-agents/outside-agent" wide/>
  <b-cap>Một quy tắc trong văn bản mà tác nhân có thể vượt qua. Một cổng trong hook của client hoặc trong quyền của server thì nó không thể.</b-cap>
  <b-table>

| Cổng nằm ở đâu | Độ tin cậy | Vì sao |
|---|---|---|
| Một câu trong chỉ dẫn | <b-status-dot color="warn">lời khuyên</b-status-dot> | tác nhân có thể bỏ qua |
| Một hook của client trước một lệnh gọi | <b-status-dot color="accent">một lệnh cấm</b-status-dot> | chặn một lệnh gọi tới hàm MCP theo mẫu tên server và tên hàm |
| Một hook dừng | <b-status-dot color="accent">một lệnh cấm</b-status-dot> | không cho lượt kết thúc cho đến khi phép kiểm tra đạt |
| Một hook sau một lệnh gọi | <b-status-dot color="warn">một tín hiệu</b-status-dot> | hàm đã chạy rồi |
| Quyền của server | <b-status-dot color="accent">một lệnh cấm</b-status-dot> | phép kiểm tra đứng trong hệ thống mà tác nhân gọi |

  </b-table>
  <b-why align="left">Theo tài liệu Claude Code: một hook trước một lệnh gọi chặn lệnh gọi, một hook dừng không cho Claude kết thúc lượt, và một hook hoàn tất nhiệm vụ không cho một nhiệm vụ đóng. Một hook sau một lệnh gọi không chặn gì: hàm đã chạy rồi. Một gợi ý trong văn bản vẫn chỉ là lời khuyên, như tác giả của một bản phân tích về hook dừng lưu ý<b-proof href="https://fbakkensen.github.io/ai/devtools/development/2026/03/27/quality-gates-for-coding-agents-how-stop-hooks-make-validation-mandatory.html" quote="fbakkensen: „prompt instructions are suggestions, not constraints.“"/>. OWASP khuyên kiểm tra quyền ở nơi hành động được thực thi<b-proof href="https://genai.owasp.org/llmrisk/llm062025-excessive-agency/" quote="OWASP LLM06:2025: „Complete mediation: Implement authorization in downstream systems rather than relying on an LLM to decide if an action is allowed or not.“"/>.</b-why>
  <b-why align="left"><b-icon name="alert-circle"/> **Một điểm yếu: phép kiểm tra mà tác nhân tự gọi.** Nếu phép kiểm tra là một hàm MCP, tác nhân có thể gọi hoặc không gọi nó, và khi đó không có phán quyết. Server cổng cho tác nhân làm sẵn hoạt động theo cách này: tác nhân tự gửi bằng chứng, và server trả một phán quyết và ghi nó vào một nhật ký trong đó các mục được nối với nhau bằng hash<b-proof href="https://github.com/Jott2121/agent-gate" quote="agent-gate README: „MCP server that adds a fail-closed quality gate and hash-chained receipt ledger to any AI agent workflow.“"/>. Đó là tự kiểm tra với các điểm mù từ phần về tự chấm. Client cũng được yêu cầu coi các nhãn hàm là không đáng tin<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/server/tools" quote="MCP: „clients MUST consider tool annotations to be untrusted unless they come from trusted servers.“"/>. An toàn hơn khi một hook hoặc một bộ điều phối gọi server phán quyết: tác nhân không thể vượt qua phán quyết.</b-why>
  <b-why align="left"><b-icon name="search"/> **Những chương trình làm sẵn nào tôi không tìm thấy.** Các gateway MCP bao quát quyền, bí mật và rò rỉ: agentgateway (một dự án của Linux Foundation), và các gateway của Microsoft, Docker và Lasso. Tôi không tìm thấy trong số đó một cổng cho “công việc đã được làm đúng”. Bộ quality-gates của Microsoft cho spec-driven development hóa ra là một checklist cho chính tác nhân, không có server nào trong đó.</b-why>
  <b-finding>
    <ex>Tác nhân chỉ được kết nối với các hàm của context của nó. Một hook dừng chạy các test và gọi server kiểm tra quy tắc đặt chỗ. Tác nhân thấy văn bản lỗi nhưng không tự viết phán quyết.</ex>
    <gen>Một bộ hàm hẹp tiết kiệm ngữ cảnh và giới hạn quyền, và một cổng bên ngoài tác nhân không cho phép vượt qua phép kiểm tra. Phán quyết đến từ một chương trình mà tác nhân không kiểm soát.</gen>
    <do>Với một context, liệt kê các hàm MCP mà tác nhân cần và tắt phần còn lại. Sau đó đặt một hook chạy phép kiểm tra mà không có sự tham gia của tác nhân.</do>
  </b-finding>
</b-chapter>

<b-chapter id="limits" icon="alert-circle" title="Giới hạn của một cổng: nó bị vượt qua thế nào và vì sao tự hỏng">
  <b-art names="quality-gates-ai-agents/bypass" wide/>
  <b-cap>Bốn con đường vòng quanh một cổng: sửa một test, xử lý riêng cho một test, ý định ẩn và một người review đã quen.</b-cap>
  <b-why align="left"><b-icon name="bug"/> **Tác nhân điều chỉnh kết quả cho khớp phép kiểm tra.** METR ghi nhận rằng o3 gian lận khi đánh giá trong 0,7% lần chạy, và ở một nhiệm vụ 21 lần trên 21<b-proof href="https://metr.org/blog/2025-06-05-recent-reward-hacking" quote="METR: „o3 reward-hacks in 0.7% of runs across all HCAST tasks“"/>. Trong system card của Claude 3.7 Sonnet, Anthropic thừa nhận rằng mô hình đôi khi trả về các giá trị mong đợi của test thay vì một lời giải tổng quát hoặc tự sửa các test. ImpossibleBench làm cho các test mâu thuẫn với nhiệm vụ và tính mọi lần đạt là gian lận: GPT-5 gian lận trong 54% trường hợp<b-proof href="https://arxiv.org/abs/2510.20270" quote="ImpossibleBench: GPT-5 „cheats 54.0% of the time on Conflicting-SWEbench“"/>. Các test chỉ đọc loại bỏ việc sửa test nhưng không loại bỏ việc xử lý riêng cho một test<b-proof href="https://arxiv.org/abs/2510.20270" quote="ImpossibleBench: read-only tests „restores legitimate performance while preventing test modification attempts“"/>.</b-why>
  <b-why align="left"><b-icon name="eye"/> **Giám sát lập luận thì tốt hơn, nhưng đừng gây áp lực lên nó.** Một bộ giám sát hành động bắt được 60% các vụ hack, một bộ giám sát lập luận 95%<b-proof href="https://arxiv.org/abs/2503.11926" quote="Baker et al.: the action monitor „achieves only 60% recall overall“, the reasoning monitor 95%"/>. Nhưng nếu tác nhân được huấn luyện với áp lực lên lập luận của nó, độ thu hồi của bộ giám sát giảm xuống gần không, vì tác nhân học cách che giấu ý định<b-proof href="https://arxiv.org/abs/2503.11926" quote="Baker et al.: „the CoT monitor’s recall falls to near zero, indicating that the agent has learned to hide its intent“"/>.</b-why>
  <b-why align="left"><b-icon name="refresh-cw"/> **Một cổng từ chối mãi mãi.** Trong Claude Code, sau tám lần từ chối liên tiếp của hook dừng, chương trình tự kết thúc lượt<b-proof href="https://code.claude.com/docs/en/hooks" quote="Claude Code Docs: „after stop hooks have continued the turn eight times in a row, Claude Code overrides the next block and ends the turn.“"/>. Giới hạn có thể đổi bằng một biến môi trường, nhưng nguyên tắc vẫn đứng vững: một cổng cần một giới hạn số lần thử và một sự chuyển giao cho người. Ở Stripe là tối đa hai lần chạy CI, và Microsoft devsquad cho phép hai lần thử sửa<b-proof href="https://github.com/microsoft/devsquad-copilot" quote="Microsoft devsquad: „Maximum of 2 correction iterations. If after 2 attempts there are still failures, deliver the artifact with documented failures for human decision.“"/>.</b-why>
  <b-why align="left"><b-icon name="scales"/> **Một cổng quá nghiêm.** Theo tường thuật của InfoQ về bài nói của Spotify tại QCon London, đăng ngày 18 tháng 3 năm 2026, trọng tài bị thấy là quá cứng nhắc, chặn các thay đổi hợp lệ và sau đó bị gỡ bỏ, để lại các phép kiểm tra trong các prompt<b-proof href="https://www.infoq.com/news/2026/03/spotify-honk-rewrite" quote="InfoQ: the judge „found it too rigid, blocking valid changes“ and „was eventually removed, with verification steps in prompts proving sufficient“"/>. Đây là một lời kể lại, và tôi không tìm thấy phát biểu như vậy trong các bài của chính Spotify. Cursor nêu vai trò “integrator” là một nút thắt<b-proof href="https://cursor.com/blog/scaling-agents" quote="Cursor, 14 Jan 2026: the integrator role „created more bottlenecks than it solved“"/>.</b-why>
  <b-why align="left"><b-icon name="layers"/> **Quy tắc kinh nghiệm của tác giả: nhiều cổng liên quan.** Tôi nhận thấy rằng vài cổng, mỗi cổng cho một rủi ro (kiểu, test, linter, một phép kiểm tra ý nghĩa), hoạt động tốt hơn một cổng lớn. Đây là một quan sát; không nguồn nào so sánh “một cổng và nhiều cổng”. Nó khớp với những gì tôi tìm thấy: Stripe xen kẽ linter và CI, Sonar yêu cầu sáu điều kiện cùng lúc, Thoughtworks nêu trình biên dịch, linter và test cùng nhau. Nó không hủy các giới hạn ở trên: mỗi cổng có một cái giá và một giới hạn số lần thử, và một cổng quá nghiêm gây hại, như trọng tài của Spotify. Vì vậy “liên quan” nghĩa là gắn với một rủi ro mà nếu không thì sẽ đến được người dùng.</b-why>
  <b-why align="left"><b-icon name="user"/> **Người review trở nên quen.** Trong bảy tháng, ở 400 người review lặp lại, tỷ lệ phê duyệt tăng từ 30,1% lên 36,8%, hàng đợi review chậm đi 3,5 lần và các bình luận nội dòng giảm 22% ([arXiv 2606.22721](https://arxiv.org/abs/2606.22721), 11.429 lượt review). Theo Faros AI, ở hơn 10.000 lập trình viên dùng AI, kích thước PR tăng 154% và thời gian review tăng 91% ([Faros AI](https://www.faros.ai/blog/ai-software-engineering), 23 July 2025).</b-why>
  <b-why align="left"><b-icon name="eye-wide"/> **Sensor không thấy ý nghĩa.** Böckeler lưu ý rằng các sensor bắt chẩn đoán sai, độ phức tạp không cần thiết và nhiệm vụ bị hiểu sai một cách không đáng tin. Một cổng chịu trách nhiệm cho những gì được viết thành quy tắc, và phần còn lại thuộc về một người.</b-why>
  <b-table>

| Nguy cơ | Cách phòng thủ |
|---|---|
| Tác nhân sửa hoặc vượt qua các test | các test và chính cổng là chỉ đọc; chỉ chương trình kiểm tra đặt dấu “đã đạt” |
| Xử lý riêng cho một test | một lớp thứ hai: một tác nhân review theo ý nghĩa và các phép kiểm tra ngẫu nhiên |
| Tác nhân che giấu ý định | theo dõi lập luận nhưng không huấn luyện tác nhân chống lại nó |
| Cổng đỏ mãi mãi | một giới hạn số lần thử, rồi chuyển giao cho một người |
| Cổng chặn cái đúng | theo dõi tỷ lệ các lần từ chối sai và nới lỏng quy tắc |
| Người review đã quen | chỉ cho người xem các trường hợp “không chắc” và rủi ro |

  </b-table>
  <b-finding>
    <ex>Cổng chạy các test, tác nhân tắt hai test chập chờn và được màu xanh. Phép kiểm tra “số lượng test không giảm” đã bắt được sự đánh tráo.</ex>
    <gen>Mỗi cổng phải được kiểm thử việc bị vượt qua như cách mã được kiểm thử: tác nhân có thể đổi cái gì để qua mà không làm công việc.</gen>
    <do>Đóng quyền ghi của tác nhân vào các test và vào cấu hình của cổng, và ghi giới hạn số lần thử vào chính cổng.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="Cách bắt đầu: năm bước và các prompt sẵn cho tác nhân">
  <b-why align="left">Bắt đầu với một context và một nhiệm vụ. Mỗi bước dưới đây đóng một mục của phần giới hạn. Có thể đưa các prompt cho tác nhân nguyên văn, điền dự án của bạn vào.</b-why>
  <b-subhead>1. Viết “xong” thành một tệp</b-subhead>
  <b-prompt>
    Hãy tạo tệp acceptance.json với danh sách các tiêu chí “xong” có thể kiểm tra cho nhiệm vụ [mô tả].
    Mỗi tiêu chí: id, văn bản, lệnh kiểm tra và một trường passes đặt là false.
    Quy tắc: chỉ script kiểm tra được đổi passes, và các tiêu chí không bị xóa hay sửa nếu tôi chưa xác nhận.
  </b-prompt>
  <b-subhead>2. Đặt một cổng dừng</b-subhead>
  <b-prompt>
    Hãy cấu hình một stop hook của Claude Code trong .claude/settings.json: trước khi một lượt kết thúc, chạy một script kiểm tra
    thực thi các lệnh từ acceptance.json và cập nhật passes. Nếu bất kỳ tiêu chí nào còn đỏ,
    chặn việc kết thúc và trả văn bản lỗi về cho tác nhân. Kiểm tra cờ stop_hook_active để hook không bị lặp vòng.
    Sau ba lần đỏ liên tiếp, hãy kết thúc lượt và nói với tôi chính xác điều gì không đạt.
  </b-prompt>
  <b-subhead>3. Đóng các đường vòng</b-subhead>
  <b-prompt>
    Hãy cấm tác nhân ghi vào thư mục tests, vào acceptance.json và vào .claude. Thêm một phép kiểm tra rằng số lượng test
    không giảm và không có test nào bị đánh dấu là bỏ qua.
  </b-prompt>
  <b-subhead>4. Thêm một người review theo ý nghĩa</b-subhead>
  <b-prompt>
    Hãy tạo một subagent review riêng với quyền chỉ đọc. Nó so sánh thay đổi cuối cùng với nhiệm vụ ban đầu
    và chấm từng tiêu chí trong [danh sách] từ 0 đến 5. Dưới 4 ở bất kỳ tiêu chí nào nghĩa là thay đổi không được chấp nhận.
    Phán quyết: chấp nhận, không chấp nhận kèm lý do, hoặc không chắc.
  </b-prompt>
  <b-subhead>5. Thu hẹp bộ hàm MCP</b-subhead>
  <b-prompt>
    Hãy liệt kê các hàm MCP mà tác nhân đã dùng trong context này trong tháng qua. Chỉ giữ những hàm đó trong cấu hình
    subagent của context này và tắt phần còn lại. Hãy cho thấy đã giải phóng được bao nhiêu token.
  </b-prompt>
  <b-why align="left">Sau đó một vòng lặp hoạt động: mỗi lỗi mà cổng bỏ sót trở thành một phép kiểm tra mới. Đây là nguyên tắc chung từ bài [“Harness engineering trong thực tế”](/blog/harness-driven-development/), và một cổng là trường hợp riêng của nó. Và hãy giữ một nhật ký các phán quyết: tác nhân đã đi qua bao nhiêu bước mà không có người trước cổng và sau nó. Đây chính là chỉ số tự chủ mà các nghiên cứu còn thiếu.</b-why>
  <b-finding>
    <ex>Năm bước cho một cổng được viết trong một tệp, được khởi động bởi một hook, không cho vượt qua các test, nhìn vào ý nghĩa và đứng trên một bộ hàm hẹp.</ex>
    <gen>Cổng đầu tiên không cần phải thông minh. Chỉ cần tác nhân không tự nói “xong” được và phép kiểm tra đứng bên ngoài nó.</gen>
    <do>Hôm nay hãy làm bước 1 và 2 cho một nhiệm vụ. Thêm phần còn lại khi cổng bỏ sót lỗi.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Hỏi và đáp">
  <b-faq-cards>
    <q t="Cổng chất lượng cho tác nhân AI là gì?">Một điểm mà công việc của tác nhân dừng lại cho đến khi một phép kiểm tra độc lập trả lời “chấp nhận”. Tác nhân không tự đánh dấu “xong”: câu trả lời đến từ một cỗ máy, một tác nhân review hoặc một người.</q>
    <q t="Cổng khác một test thế nào?">Một test kiểm tra một quy tắc và trả về một kết quả. Một cổng quyết định công việc có được đi tiếp hay không, gộp các test, một tác nhân review và một người thành một quyết định và có thể dừng tác nhân.</q>
    <q t="Các cổng có tăng thời gian chạy tự chủ của tác nhân không?">Không có phép đo trực tiếp. Có một phép tính: ở 95% thành công mỗi bước, 20 bước đi qua không lỗi trong 36% trường hợp, và một cổng bắt 4 trong 5 lỗi nâng con số đó lên khoảng 82%. Và có các trường hợp từ Anthropic, Stripe và Spotify.</q>
    <q t="Nên đặt một cổng ở đâu?">Bên ngoài tác nhân và bên ngoài ngữ cảnh của nó, trong một hook của client hoặc trong quyền của server sau MCP. Bản thân tác nhân làm việc trong một bounded context nhỏ: ở đó phép kiểm tra là hữu hạn, thay đổi nhỏ và bộ hàm MCP hẹp. Một quy tắc trong văn bản chỉ dẫn vẫn chỉ là lời khuyên.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Đọc tiếp">
  <b-links>
    <item href="/blog/harness-driven-development/" k="Harness" t="Harness engineering trong thực tế">guide, sensor và vòng lặp “lỗi thành quy tắc”</item>
    <item href="/blog/agent-checkpoint/" k="Kiểm tra" t="Kiểm tra công việc của tác nhân AI ở đâu">ranh giới aggregate và định lý Rice</item>
    <item href="/blog/agents-per-bounded-context/" k="Tác nhân" t="Cần bao nhiêu tác nhân AI">một tác nhân cho mỗi bounded context</item>
    <item href="/blog/mcp-agent-access/" k="MCP" t="MCP cho tác nhân AI">nó giải quyết vấn đề gì và kết nối thế nào</item>
    <item href="/blog/mcp-scopes/" k="MCP" t="Scope MCP trong Claude Code">local, project và user</item>
    <item href="/blog/ai-agent-maturity-levels/" k="Mức trưởng thành" t="Các mức trưởng thành của tác nhân AI">từ chat đến spec, skill, mã và một hệ thống</item>
  </b-links>
</b-chapter>
<b-footer>Dữ kiện: tính đến ngày 14 tháng 11 năm 2026, từ các nguồn gốc được chỉ bằng dấu ↗ và các liên kết trong văn bản. Phép tính trên biểu đồ tự chủ là của tôi, với giả định các bước độc lập. Ví dụ đặt chỗ là bịa ra. Các trích dẫn về trọng tài của Spotify và việc gỡ bỏ nó đến từ tường thuật của InfoQ.</b-footer>
</b-post>
