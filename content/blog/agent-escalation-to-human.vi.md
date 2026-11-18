---
title: Escalation sang con người ở tác nhân AI: tác nhân dừng lại và hỏi qua MCP và hook thế nào
date: 2026-11-14
updated: 2026-11-18
description: Tác nhân trao quyết định cho con người qua elicitation của MCP, chế độ quyền hoặc hook của Claude Code, nhưng đường tới con người hẹp và hiếm khi được dùng.
tags: AI, tác nhân, MCP, elicitation, escalation, hook, Claude Code, tính tự chủ, harness
category: harness
layout: wide
mentions: MCP, hooks, harness, bounded context, quality gate, Google DeepMind, escalation to a human
toc: answer=Tóm tắt | seen=Cái nhìn đầu tiên | penalty=Hình phạt | measure=Chỉ số | time=Tự chủ | behavior=Hành vi | mcp=MCP | cc=Claude Code | narrow=Ô cửa | claims=Kết quả | start=Bắt đầu | faq=Câu hỏi | next=Đọc tiếp
---

Escalation sang con người là khoảnh khắc tác nhân ngừng làm việc và trao một quyết định cho người: bằng một câu hỏi, một yêu cầu cấp quyền hoặc một lần xác nhận. MCP có elicitation cho việc này, với ba câu trả lời (accept, decline, cancel); Claude Code có hook và các chế độ quyền. Phép kiểm tra nằm bên ngoài tác nhân, còn bản thân escalation đi qua một ô cửa hẹp. Phần dưới nói về lúc đầu mọi thứ trông ra sao và các phép kiểm tra cho thấy gì.

<b-post series="harness">
<b-callout icon="bulb">**Một nhận xét.** Tôi nghĩ rằng tác nhân được huấn luyện và đo theo việc nó làm việc bao lâu một mình, không có người. Điểm được cho theo kết quả: giải được nhiệm vụ là 1, không giải được là 0. Bản thân câu hỏi cho người không tạo ra kết quả, nên hình phạt đến vì nhiệm vụ dở dang, và đoán mò có lợi hơn. Tôi đã đối chiếu điều này với các tài liệu và bài báo, rồi rút ra những công thức dưới đây. Hình phạt cho chính câu hỏi hóa ra hiếm: một số chỉ số không tính đến câu hỏi, và một số thưởng cho nó.</b-callout>

<b-chapter id="answer" icon="chat" title="Tóm tắt: escalation là gì và đi qua đâu">
  <b-art names="agent-escalation-to-human/window" wide/>
  <b-cap>Tác nhân làm việc trong ngữ cảnh của mình; một câu hỏi đi tới người sau vách ngăn và một trong ba câu trả lời quay về.</b-cap>
  <b-why align="left"><b-icon name="chat"/> **Nó là gì.** Escalation là việc dừng do tác nhân hoặc do chương trình bao quanh nó khởi xướng: “ở đây tôi không được quyết định, cần một người”. Ba loại thường gặp: câu hỏi làm rõ, yêu cầu cấp quyền cho một hành động nguy hiểm, xác nhận kết quả trước khi merge. Cổng chất lượng (quality gate) từ bài [“Cổng chất lượng cho tác nhân AI là gì”](/blog/quality-gates-ai-agents/) trao cho người mọi thứ mà phép kiểm tra “không chắc”, nên escalation là phần nối tiếp của cổng.</b-why>
  <b-why align="left"><b-icon name="package"/> **Hoạt động trong MCP thế nào.** Một server có thể hỏi người thông qua client: trong đặc tả đây là elicitation. Có ba câu trả lời: accept, decline, cancel. Server không được trông chờ vào một câu trả lời: chính giao thức yêu cầu phải xử lý cả decline lẫn cancel.</b-why>
  <b-why align="left"><b-icon name="shield-check"/> **Hoạt động trong Claude Code thế nào.** Các chế độ quyền quyết định những lệnh gọi nào chuyển tới người, còn hook chặn một lệnh gọi và trả lời “allow”, “deny” hoặc “ask”. Chương trình cưỡng chế điều này, còn văn bản chỉ dẫn chỉ hướng dẫn.</b-why>
  <b-finding>
    <ex>Một tác nhân sửa cấu hình của server đặt chỗ. Hook thấy đường dẫn của cấu hình đang chạy và trả lời “ask”: người nhận được một cửa sổ kèm câu hỏi. Nếu không ai trả lời và lần chạy không có giao diện, lệnh gọi bị từ chối và tác nhân tiếp tục theo kế hoạch khác.</ex>
    <gen>Escalation có hai phần: chương trình bao quanh tác nhân quyết định “ask”, và câu trả lời đến từ người qua một ô cửa hẹp.</gen>
    <do>Ghi ra ba hành động của tác nhân mà sau đó bạn muốn thấy một câu hỏi: xóa, phát hành, đổi quyền. Mọi thứ còn lại có thể cho phép mà không cần hỏi.</do>
  </b-finding>
</b-chapter>

<b-chapter id="seen" icon="eye" title="Lúc đầu mọi thứ trông ra sao">
  <b-why align="left">Quan sát xuất phát rất đơn giản: tác nhân hiếm khi dừng lại để hỏi, mà thường đoán rồi đi tiếp. Từ đó hình thành một chuỗi bốn giả định, và mỗi giả định cần được kiểm tra riêng.</b-why>
  <b-rules cols="2">
    <rule icon="shield-check" t="1. Phép kiểm tra nằm bên ngoài">Cổng và câu hỏi cho người nên nằm ngoài tác nhân, nếu không nó sẽ tự quyết định.</rule>
    <rule icon="clock" t="2. Tác nhân được huấn luyện cho tính tự chủ">Tác nhân được huấn luyện và đo theo việc nó làm việc bao lâu một mình: đi xa đến đâu từ lúc bắt đầu đến lúc dừng mà không có người.</rule>
    <rule icon="x" t="3. Câu hỏi là một khoản thua">Điểm cho 1 với nhiệm vụ đã giải và 0 với nhiệm vụ chưa giải. Câu hỏi mà không có lời giải cho 0, còn một lần đoán có thể cho 1, nên hỏi không có lợi.</rule>
    <rule icon="package" t="4. MCP là nút thắt">Qua MCP chỉ đi qua một câu hỏi và một câu trả lời, còn phần còn lại do host quyết định.</rule>
  </b-rules>
  <b-why align="left">Tiếp theo, lần lượt: benchmark đo gì, “thời gian tự chủ” nghĩa là gì, trên thực tế tác nhân hỏi ra sao, MCP và Claude Code nói gì. Kỳ vọng và những gì tìm thấy được đặt cạnh nhau trong một bảng ở gần cuối. Trước hết: hình phạt nằm chính xác ở đâu trong một chỉ số như vậy.</b-why>
</b-chapter>

<b-chapter id="penalty" icon="x" title="Tác nhân bị phạt vì điều gì: chỉ số và các công thức">
  <b-why align="left">Hai sơ đồ cho thấy đại lượng nào giảm khi tác nhân dừng lại để hỏi. Đây là bản ghi giản lược theo ý nghĩa của các chỉ số trong nguồn; các trích dẫn nằm ở những chương về phép kiểm tra.</b-why>
  <b-art names="agent-escalation-to-human/score-cases" wide/>
  <b-cap>Điểm theo kết quả: câu trả lời đúng cho 1, câu trả lời sai và việc dừng mà không có lời giải cho 0.</b-cap>
  <b-why align="left">Hình phạt rơi vào kết quả dở dang: dừng mà không có lời giải nhận cùng số 0 như một lỗi sai. Nếu có một kênh và nhiệm vụ được giải sau câu trả lời, thì câu hỏi thậm chí có lợi, và HiL-Bench được xây dựng đúng như vậy.</b-why>
  <b-art names="agent-escalation-to-human/turn-cut" wide/>
  <b-cap>Câu hỏi cắt ngắn lượt: một ví dụ tự dựng với 60 phút.</b-cap>
  <b-why align="left">Ở Anthropic, một câu hỏi kết thúc lượt được đo. Chính phòng thí nghiệm này gọi việc dừng của tác nhân là sự giám sát (oversight).</b-why>
  <b-finding>
    <ex>Một tác nhân dành bốn mươi phút sửa một bản xuất dữ liệu, gặp hai cách đều hợp lệ và hỏi một người. Theo cách chấm kết quả, câu hỏi không tốn gì miễn là nhiệm vụ sau đó được giải. Theo độ dài lượt, nó cắt 60 phút thành 40 và 20.</ex>
    <gen>Hình phạt nằm ở hai nơi: số 0 cho nhiệm vụ chưa giải và việc cắt lượt tại câu hỏi. Không chỉ số nào được xem xét trừ điểm vì chính câu hỏi.</gen>
    <do>Viết ra công thức của chỉ số của bạn: cái gì đứng ở tử số và điểm sẽ ra sao nếu tác nhân dừng lại và hỏi.</do>
  </b-finding>
</b-chapter>

<b-chapter id="measure" icon="gauge" title="Kiểm tra: benchmark về tính tự chủ đo gì và con người ở đâu trong đó">
  <b-why align="left">Tính tự chủ được đo theo nhiều cách khác nhau, và cách đo quyết định liệu một chỉ số có thấy được việc dừng lại để hỏi hay không. Theo thứ tự dưới đây: hình ảnh của một chỉ số có vạch đích, chân trời METR, các benchmark cổ điển và những chỉ số có tính đến câu hỏi.</b-why>
  <b-art names="agent-escalation-to-human/finish-line" wide/>
  <b-cap>Chỉ số đánh dấu đích; con đường của câu hỏi tới người không nằm trong phép đếm.</b-cap>
  <b-subhead>Chân trời METR: một nhiệm vụ mất bao lâu với con người</b-subhead>
  <b-why align="left">METR định nghĩa chân trời là thời gian con người thường mất cho những nhiệm vụ mà mô hình giải được với tỷ lệ thành công 50%<b-proof href="https://arxiv.org/abs/2503.14499" quote="METR, arXiv 2503.14499: „the time humans typically take to complete tasks that AI models can complete with 50% success rate“"/>. Thời gian của nhiệm vụ lấy từ các lần chạy thành công của con người. Bộ nhiệm vụ không có nhiệm vụ nào liên quan đến việc hỏi một người, và chính METR cảnh báo rằng chân trời không phải thời gian làm việc độc lập<b-proof href="https://metr.org/notes/2026-01-22-time-horizon-limitations/" quote="METR, 22.01.2026: „Time horizon is not the length of time AIs can work independently“; „We have no tasks involving multi-turn interaction with a human so there is no right answer.“"/>. Trong báo cáo ngày 19 tháng 5 năm 2026, mô hình chung tốt nhất đạt 16–20 giờ ở mức 50% và 3–4 giờ ở mức 80%<b-proof href="https://metr.org/blog/2026-05-19-frontier-risk-report/" quote="METR, Frontier Risk Report: „the 50% time horizon point estimate of the most capable shared model was between 16 and 20 hours“"/>.</b-why>
  <b-codebox title="Chân trời METR được tính thế nào">
    p(success | task of length t) = σ( (ln h − ln t) · β )
    h — chân trời: độ dài nhiệm vụ mà tại đó p = 0,5
    t — trung bình nhân thời gian của các lần chạy thành công của con người
  </b-codebox>
  <b-why align="left">Phương pháp của METR là một đường cong logistic theo độ dài nhiệm vụ, với chân trời lấy ở điểm 50% (hoặc 80%)<b-proof href="https://arxiv.org/abs/2503.14499" quote="METR, arXiv 2503.14499: „we use logistic regression to find the task difficulty at which the agent has a 50% chance of success“"/>. Thời gian của chính tác nhân không xuất hiện ở đâu trong công thức.</b-why>
  <b-art names="agent-escalation-to-human/horizon" wide/>
  <b-cap>Số giờ của nhiệm vụ với mô hình tốt nhất: ở mức 50% và ở mức 80%.</b-cap>
  <b-subhead>Benchmark nhiệm vụ: không có người trong đó</b-subhead>
  <b-why align="left">SWE-bench chấm bằng test: “the percentage of task instances that are resolved”<b-proof href="https://arxiv.org/abs/2310.06770" quote="SWE-bench: „The metric for our benchmark is the percentage of task instances that are resolved.“"/>. Trong OSWorld, Terminal-Bench, GAIA và Cybench, một script, một test hoặc một cờ làm trọng tài, và không có kênh tới người. Cụm “minimal human intervention” trong các bài báo này mô tả một mục tiêu hoặc sự mở rộng của bộ nhiệm vụ, chứ không phải một chỉ số. Trong tau-bench, phần thưởng là 0 hoặc 1 theo cơ sở dữ liệu cuối cùng, còn chuyển giao cho người là một hành động bình thường: ở một số nhiệm vụ nó thuộc về đáp án tham chiếu, ở các nhiệm vụ còn lại cơ sở dữ liệu sẽ không khớp.</b-why>
  <b-subhead>Chỉ số có tính câu hỏi: HiL-Bench, HAS-Bench, Anthropic</b-subhead>
  <b-why align="left">Ba nguồn này tính câu hỏi theo ba cách khác nhau, nên phần đối chiếu rõ nhất đứng trước: điều gì xảy ra với một mô hình khi nhiệm vụ không thể giải được nếu không hỏi.</b-why>
  <b-art names="agent-escalation-to-human/hil-bench" wide/>
  <b-cap>Khi phần còn thiếu phải được tìm ra bằng cách hỏi một người, tỷ lệ nhiệm vụ được giải giảm đi nhiều lần.</b-cap>
  <b-why align="left">HiL-Bench của Scale AI được dựng sao cho nhiệm vụ không thể giải mà không hỏi. Các tác giả viết rằng benchmark thông thường mù trước kiểu thất bại này<b-proof href="https://arxiv.org/abs/2604.09408" quote="HiL-Bench, 04.05.2026: „an agent that makes a lucky guess for a missing requirement will score identically to one that would have asked to be certain“"/>. Với hàm “hỏi một người”, các mô hình tốt nhất giải được từ 1 đến 39% nhiệm vụ, so với 67 đến 91% khi có đầy đủ thông tin. Phần thưởng huấn luyện: +0,3 cho một câu hỏi liên quan và −0,1 cho một câu hỏi thừa. HAS-Bench đưa ra tỷ lệ can thiệp của con người như một con số mô tả<b-proof href="https://arxiv.org/abs/2607.04329" quote="HAS-Bench, 05.07.2026: „HIR is a descriptive cost/intensity metric. Higher HIR means more human involvement, not necessarily better task performance.“"/>. Trong nghiên cứu về tính tự chủ trong môi trường production, Anthropic đếm riêng các lần can thiệp và các lần dừng do tác nhân khởi xướng, và gọi các lần dừng là một dạng giám sát<b-proof href="https://www.anthropic.com/research/measuring-agent-autonomy" quote="Anthropic, 18.02.2026: „agent-initiated stops are an important kind of oversight in deployed systems.“"/>.</b-why>
  <b-codebox title="Ba cách tính một câu hỏi">
    HiL-Bench:  r_question = +0,3 nếu câu hỏi nhắm vào phần còn thiếu
                r_question = −0,1 nếu câu hỏi thừa hoặc lặp lại
                nhiệm vụ chỉ được tính khi mọi phần còn thiếu đã được làm rõ
    HAS-Bench:  HIR = số bước do người làm / tổng số bước   (một mô tả, không phải hình phạt)
    Anthropic:  việc tác nhân dừng được tính là giám sát, can thiệp tính riêng
  </b-codebox>
  <b-art names="agent-escalation-to-human/metrics" wide/>
  <b-cap>Bốn cách đối xử với câu hỏi của tác nhân: không có kênh, trung tính, thưởng, một dạng giám sát.</b-cap>
  <b-why align="left">Bản tóm tắt này gom bốn cách lại: cùng một công việc của tác nhân, trong khi một chỉ số có thể không thấy câu hỏi, thưởng cho nó hoặc tính nó là sự giám sát.</b-why>
  <b-finding>
    <ex>Cùng một tác nhân không thể hỏi trong SWE-bench, hỏi để nhận thưởng trong HiL-Bench, và trong các chỉ số production của Anthropic, việc dừng của nó được ghi nhận là sự giám sát. Chỉ số không chỉ có một, và yêu cầu gửi tới người được ghi nhận khác nhau ở mỗi chỉ số.</ex>
    <gen>Nhận định “chỉ số tự chủ phạt câu hỏi” sai nếu coi là quy tắc chung. Điều đúng hẹp hơn: các benchmark cổ điển không tính đến câu hỏi, và việc dừng mà không có lời giải bằng thất bại.</gen>
    <do>Hãy hỏi về chỉ số tự chủ của chính bạn: nó ghi nhận gì khi tác nhân dừng lại và hỏi: thành công, thất bại hay không gì cả.</do>
  </b-finding>
</b-chapter>

<b-chapter id="time" icon="clock" title="Cái gì được tính là thời gian tự chủ ở METR, Anthropic và DeepMind">
  <b-why align="left">Cụm “thời gian tự chủ” có ba nghĩa khác nhau ở ba phòng thí nghiệm, và điều đó quyết định liệu câu hỏi của tác nhân gửi tới người có làm hại chỉ số hay không. Dưới đây lần lượt: METR đếm gì, Anthropic đếm gì và Google DeepMind đếm gì.</b-why>
  <b-art names="agent-escalation-to-human/three-clocks" wide/>
  <b-cap>Ba thước đo: số giờ của một người cho nhiệm vụ, một lượt từ lúc bắt đầu đến lúc dừng, một nhiệm vụ không có sự can thiệp của con người.</b-cap>
  <b-why align="left">“Làm việc một mình” có thể đo theo ba cách. Thứ nhất: một nhiệm vụ mất bao nhiêu giờ của con người, nhiệm vụ mà tác nhân giải được. Thứ hai: tác nhân đi xa đến đâu từ lúc bắt đầu đến lúc dừng. Thứ ba: tỷ lệ nhiệm vụ được làm xong mà không có sự can thiệp của con người.</b-why>
  <b-subhead>METR: độ khó của nhiệm vụ, thời gian của chính tác nhân không nằm trong chỉ số</b-subhead>
  <b-why align="left">Chính METR trả lời liệu đây có phải là thời gian làm việc độc lập<b-proof href="https://metr.org/notes/2026-01-22-time-horizon-limitations/" quote="METR, 22.01.2026: „Time horizon is not the length of time AIs can work independently. Rather, it's the amount of serial human labor they can replace with a 50% success rate.“"/>. Phần FAQ trên trang về các chân trời cũng nói như vậy: nó đo độ khó của nhiệm vụ, còn thời gian AI bỏ ra không thuộc về nó<b-proof href="https://metr.org/time-horizons" quote="METR, FAQ: „It’s a measure of the difficulty of a task, rather than the time an AI spends to complete the task.“"/>. METR không công bố thời gian của chính tác nhân: nó khác nhau rất nhiều tùy nhà cung cấp mô hình và cách dựng tác nhân.</b-why>
  <b-subhead>Anthropic: một lượt của tác nhân từ lúc bắt đầu đến lúc dừng</b-subhead>
  <b-why align="left">Trong nghiên cứu về tính tự chủ trong production, thời gian được đếm một cách cơ học từ telemetry của Claude Code: từ lúc bắt đầu làm việc đến một lần dừng, và lần dừng đó có thể là một câu hỏi cho người<b-proof href="https://www.anthropic.com/research/measuring-agent-autonomy" quote="Anthropic, 18.02.2026: „tracking how much time has elapsed between when Claude starts working and when it stops (whether because it finished the task, asked a question, or was interrupted by the user)“"/>. Vì vậy câu hỏi của tác nhân cắt ngắn lượt và về hình thức làm giảm thời gian đo được. Chính các tác giả cũng lưu ý rằng độ dài lượt là một phép thay thế chưa hoàn hảo cho tính tự chủ.</b-why>
  <b-why align="left">Anthropic không coi việc dừng để hỏi là một khiếm khuyết. Theo lời họ, ở các nhiệm vụ khó hơn Claude tự giới hạn tính tự chủ của mình bằng cách dừng lại để hỏi ý kiến con người, và một chú thích bổ sung rằng hỏi người dùng một câu hỏi tự nó là một dạng chủ động (agency)<b-proof href="https://www.anthropic.com/research/measuring-agent-autonomy" quote="Anthropic: „stopping to ask the user a question is itself a form of agency“"/>. Chỉ câu hỏi chặn lại kiểu “tôi cần điều này để tiếp tục” mới được tính; câu hỏi kiểu “tôi commit nhé?” sau một nhiệm vụ đã xong thì không phải là một lần dừng.</b-why>
  <b-subhead>Google DeepMind: nhiệm vụ được làm xong mà không có sự can thiệp của con người</b-subhead>
  <b-why align="left">DeepMind không có chỉ số độ dài lượt. Trong “Levels of AGI”, tính tự chủ được mô tả bằng các cấp từ “AI as a Tool” đến “AI as an Agent”, theo kiểu tương tác chứ không theo thời gian, và khả năng tìm đến một người là một phần của cấp cao nhất: một AI hoàn toàn tự chủ hành động mà không cần giám sát liên tục nhưng biết khi nào nên hỏi ý con người<b-proof href="https://arxiv.org/abs/2311.02462" quote="Levels of AGI, arXiv 2311.02462: „such a fully autonomous AI can act in an aligned fashion without continuous human oversight, but knows when to consult humans“"/>. Trong báo cáo Frontier Safety Framework (tháng 10 năm 2026), tính tự chủ được định nghĩa là “nhiệm vụ được làm xong mà không có sự can thiệp của con người”: họ xem tác nhân có thành công một mình hay không và có người can thiệp hay không, và tỷ lệ pull request được giao hoàn toàn tăng từ 7,5% lên 11,9%<b-proof href="https://storage.googleapis.com/deepmind-media/gemini/gemini_4_argon_fsf_report.pdf" quote="Gemini 4 Argon FSF report: „whether the agent succeeded autonomously, and whether the human intervened or the outcome was otherwise negative or ambiguous“"/>. Một chỉ số riêng “tác nhân đã hỏi một người” không tìm thấy ở đó.</b-why>
  <b-table>

| Ai | Cái gì được tính là tự chủ | Câu hỏi của tác nhân gửi tới người |
|---|---|---|
| **METR** | độ khó nhiệm vụ tính bằng giờ của con người | không có sự kiện như vậy: nhiệm vụ không có đối thoại |
| **Anthropic** | độ dài lượt cho đến lúc dừng | cắt ngắn lượt nhưng được gọi là sự giám sát |
| **Google DeepMind** | một nhiệm vụ không có sự can thiệp của con người | không phải sự can thiệp, không được tính riêng |

  </b-table>
  <b-finding>
    <ex>Tác nhân dừng lại và hỏi. Ở Anthropic lượt kết thúc tại đó, ở METR không có sự kiện như vậy, còn DeepMind quan tâm liệu con người có tự can thiệp hay không.</ex>
    <gen>Câu hỏi của tác nhân chỉ làm ngắn lượt ở Anthropic, và ngay cả ở đó nó cũng được gọi là sự giám sát. Các phòng thí nghiệm coi sự can thiệp tự thân của con người là điểm trừ.</gen>
    <do>Khi được cho biết số giờ làm việc tự chủ của một tác nhân, hãy hỏi đó là thước đo nào: độ dài lượt, độ khó nhiệm vụ hay tỷ lệ nhiệm vụ không có can thiệp.</do>
  </b-finding>
</b-chapter>

<b-chapter id="behavior" icon="eye" title="Kiểm tra: tác nhân có thực sự hỏi không">
  <b-art names="agent-escalation-to-human/ask-rate" wide/>
  <b-cap>Tỷ lệ phiên có câu hỏi trong một nghiên cứu: từ không đến một nửa.</b-cap>
  <b-why align="left">Không có một tỷ lệ duy nhất; kết quả phụ thuộc vào mô hình, prompt và harness. Khi không được phép hỏi, các mô hình gần như im lặng: trong Ambig-SWE (500 nhiệm vụ SWE-bench) “without explicit prompting, models almost never interact”<b-proof href="https://arxiv.org/abs/2502.13069" quote="Ambig-SWE, arXiv 2502.13069: „Without explicit prompting, models almost never interact, even for severely underspecified inputs.“"/>. Với prompt, Sonnet 4 hỏi ở 82% nhiệm vụ thiếu đặc tả, ở 3% nhiệm vụ đầy đủ. Một nghiên cứu khác, “Ask Early, Ask Late, Ask Right”, cho thấy: Sonnet 4.5 hỏi trong 23% phiên, GPT-5.2 trong 52%, Gemini 3 Flash trong 0%, và không mô hình nào hỏi ở khung thời điểm tốt nhất, khoảng 10% quãng đường chạy (arXiv 2605.07937).</b-why>
  <b-why align="left">Cực đối lập cũng tồn tại. Trong LHAW (arXiv 2602.10525), GPT-5.2 hỏi ở 81–97% lần chạy với lợi ích nhỏ trên mỗi câu hỏi, và trong “Ask or Assume” (arXiv 2603.26233), Sonnet 4.5 hỏi ở 73,8% nhiệm vụ. Con người cũng bị quá tải: theo số liệu của Anthropic về chế độ auto, người dùng chấp nhận 93% yêu cầu cấp quyền, và bài viết nói thẳng về sự mệt mỏi vì xác nhận<b-proof href="https://www.anthropic.com/engineering/claude-code-auto-mode" quote="Anthropic, 25.03.2026: „users accept 93%“ of permission requests"/>.</b-why>
  <b-art names="agent-escalation-to-human/ask-extremes" wide/>
  <b-cap>Hai cực: im lặng và đoán mò, hoặc dồn dập câu hỏi.</b-cap>
  <b-why align="left">Nguyên nhân “huấn luyện thưởng cho việc hoàn thành” được tác giả của nhiều bài báo nêu ra, nhưng chưa có phép đo cho tác nhân. Một bài liên quan của Kalai và cộng sự (arXiv 2509.04664) cho thấy với cách chấm nhị phân thì việc từ chối trả lời không có lợi, và 9 trong 10 benchmark được xem xét là nhị phân, trong đó có SWE-bench. Bài đó nói về câu trả lời “tôi không biết”; áp nó cho câu hỏi gửi tới người vẫn chỉ là một phép loại suy.</b-why>
  <b-finding>
    <ex>Tác nhân không được phép hỏi thì im lặng và đoán, còn tác nhân được phép thì dồn dập hỏi người. Cả hai trường hợp đều được ghi nhận trong các phép đo, nên cần cố định các điều kiện: khi nào hỏi và hỏi thường xuyên đến mức nào.</ex>
    <gen>“Tác nhân không hỏi” và “tác nhân hỏi quá nhiều” đều đúng, ở các mô hình và thiết lập khác nhau.</gen>
    <do>Cho tác nhân một ngưỡng rõ ràng: “hãy hỏi nếu quyết định không thể hoàn tác hoặc có hai cách hiểu ngang nhau về nhiệm vụ; phần còn lại tự quyết”.</do>
  </b-finding>
</b-chapter>

<b-chapter id="mcp" icon="package" title="Kiểm tra: MCP nói gì về elicitation">
  <b-why align="left">Elicitation là cách một MCP server xin người dùng thêm dữ liệu thông qua client<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation" quote="MCP specification: „The Model Context Protocol (MCP) provides a standardized way for servers to request additional information from users through the client during interactions.“"/>. Dưới đây là các sự kiện của phiên bản 2026-07-28 và những gì đã thay đổi trong đó.</b-why>
  <b-rules cols="2">
    <rule icon="check" t="Ba câu trả lời">Accept: người đã đồng ý và gửi dữ liệu. Decline: người nói rõ “không”. Cancel: người đóng cửa sổ mà không chọn gì<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation#response-actions" quote="MCP specification: „Decline (action: 'decline'): User explicitly declined the request“; „Cancel (action: 'cancel'): User dismissed without making an explicit choice“"/>. Server phải xử lý cả decline lẫn cancel<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation#error-handling" quote="MCP specification: „Servers SHOULD NOT assume that elicitation requests will always succeed, and MUST handle cases where the user declines or cancels the elicitation“"/>.</rule>
    <rule icon="layers" t="Hai chế độ">Form: một schema phẳng với các trường đơn giản, client thấy dữ liệu. URL: người được chuyển tới một địa chỉ bên ngoài và dữ liệu không đi qua client hay mô hình. Việc xin mật khẩu, khóa và dữ liệu thanh toán qua form bị cấm, và chế độ URL tồn tại cho những thứ đó<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation#user-interaction-model" quote="MCP specification: „Servers MUST NOT use form mode elicitation to request sensitive information such as passwords, API keys, access tokens, or payment credentials.“"/>.</rule>
    <rule icon="refresh" t="Mới trong 2026-07-28">Server không còn tự gửi yêu cầu theo sáng kiến của mình: nó trả lời yêu cầu của client bằng kết quả “input required”, client thu thập câu trả lời và lặp lại yêu cầu<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr" quote="MCP specification: „Servers MUST send server-to-client requests (such as roots/list, sampling/createMessage, or elicitation/create) using the MRTR pattern. The previous pattern of server-initiated requests is no longer supported.“"/>. Sampling, Roots và Logging được đánh dấu là lỗi thời (SEP-2577).</rule>
    <rule icon="user" t="Con người trong vòng lặp">Với elicitation, client phải hiển thị server nào đang hỏi, đưa ra decline và cancel, và cho phép người xem lại và sửa câu trả lời của form. Với các lệnh gọi hàm và sampling thì cách diễn đạt mềm hơn: “SHOULD always be a human in the loop”<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/server/tools#user-interaction-model" quote="MCP specification: „For trust & safety and security, there SHOULD always be a human in the loop with the ability to deny tool invocations.“"/>.</rule>
  </b-rules>
  <b-why align="left">Hai chế độ khác nhau ở một điểm: ai nhìn thấy câu trả lời của người. Hình dưới cho thấy điều đó.</b-why>
  <b-art names="agent-escalation-to-human/elicit-modes" wide/>
  <b-cap>Form và URL: ai nhìn thấy câu trả lời của người.</b-cap>
  <b-why align="left">Đặc tả thiếu gì. Nó không cho phép cũng không cấm client hay tác nhân trả lời thay người: từ “user” xuất hiện ở mọi nơi, và không áp đặt giao diện nào (“the protocol itself does not mandate any specific user interaction model”). Cũng không có chế tài nào cho việc tự trả lời như vậy, và chính đặc tả nói điều này<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28" quote="MCP specification: „While MCP itself cannot enforce these security principles at the protocol level, implementors SHOULD: 1. Build robust consent and authorization flows into their applications“"/>. Các từ “bottleneck” hay “limitation” không xuất hiện trong đặc tả.</b-why>
  <b-finding>
    <ex>Một server thanh toán xin xác nhận một khoản chuyển tiền. Nếu client tự bấm “accept”, giao thức sẽ không nhận ra: quyền kiểm soát nằm ở host và các thiết lập của nó.</ex>
    <gen>MCP mô tả cách hỏi và những câu trả lời nào tồn tại, nhưng ai trả lời và có được trả lời thay người hay không là do client quyết định.</gen>
    <do>Kiểm tra client của bạn: tác nhân hay một script có thể trả lời elicitation thay người không. Nếu có, hãy cấm điều đó với các server nguy hiểm.</do>
  </b-finding>
</b-chapter>

<b-chapter id="cc" icon="shield-check" title="Kiểm tra: chế độ, hook và câu hỏi gửi tới người trong Claude Code">
  <b-art names="agent-escalation-to-human/hook-vs-text" wide/>
  <b-cap>Hook và các quy tắc quyền do chương trình cưỡng chế. Văn bản chỉ dẫn vẫn chỉ là lời khuyên.</b-cap>
  <b-why align="left">Tài liệu Claude Code nói thẳng: các quy tắc quyền do chương trình Claude Code cưỡng chế, còn chỉ dẫn trong prompt hay CLAUDE.md không thay đổi những gì nó cho phép<b-proof href="https://code.claude.com/docs/en/permissions" quote="Claude Code docs: „Permission rules are enforced by Claude Code, not by the model. Instructions in your prompt or CLAUDE.md shape what Claude tries to do, but they don't change what Claude Code allows.“"/>.</b-why>
  <b-subhead>Chế độ: bao nhiêu câu hỏi tới được người</b-subhead>
  <b-why align="left">Người chọn chế độ khi khởi chạy: nó quyết định có bao nhiêu câu hỏi tới được họ.</b-why>
  <b-art names="agent-escalation-to-human/modes-ladder" wide/>
  <b-cap>Sáu chế độ từ “hỏi mọi thứ” đến “không hỏi gì” và những gì không được tự động duyệt.</b-cap>
  <b-why align="left">Ngay cả ở chế độ tự do nhất, một số thứ vẫn không được tự động duyệt: hàm AskUserQuestion có sẵn, các hàm MCP được đánh dấu là cần tương tác với người dùng, và các quy tắc “ask”<b-proof href="https://code.claude.com/docs/en/permission-modes" quote="Claude Code docs: „Claude Code doesn't auto-approve the following in any mode, including `bypassPermissions`“ — among them explicit `ask` rules and „Tools that require user interaction: the built-in `AskUserQuestion` tool and MCP tools marked `requiresUserInteraction`“"/>. Không thể xin quyền từ người sau khi sự việc đã xong: không có người thì không có câu trả lời.</b-why>
  <b-subhead>Hook: quyết định có hỏi hay không</b-subhead>
  <b-why align="left">Hook PreToolUse trả lời trước một lệnh gọi hàm bằng một trong bốn quyết định: allow, deny, ask hoặc defer<b-proof href="https://code.claude.com/docs/en/hooks" quote="Claude Code docs: „PreToolUse hooks can control whether a tool call proceeds. [...] four outcomes (allow, deny, ask, or defer)“"/>. Khi có nhiều hook, thứ tự là: deny thắng defer, defer thắng ask, ask thắng allow. Quyết định “defer” dành cho các lần chạy không có giao diện: chương trình gọi tạm dừng Claude, thu thập câu trả lời qua giao diện riêng của mình và tiếp tục từ đúng chỗ đó. Hook Elicitation nối điều này với MCP: nó trả lời yêu cầu của server bằng accept, decline hoặc cancel, và khi không có giao diện thì một yêu cầu không được xử lý sẽ bị hủy.</b-why>
  <b-why align="left">Một giới hạn đối với subagent: AskUserQuestion luôn bị gỡ khỏi chúng. Trong một lần chạy không có giao diện, lệnh gọi cần đến một câu hỏi sẽ bị từ chối trừ khi có quy tắc allow, một hook hoặc một host nhận yêu cầu. Vì vậy một lần chạy tự chủ mà chưa cấu hình quy tắc sẽ nhận một lời từ chối, và câu trả lời từ người sẽ không đến.</b-why>
  <b-art names="agent-escalation-to-human/night-run" wide/>
  <b-cap>Khi không có người, một câu hỏi trở thành báo cáo trước cánh cửa đóng.</b-cap>
  <b-why align="left">Đây là hình dạng của escalation khi không có người: một lần dừng và một lý do được ghi lại thay cho việc đoán mò.</b-why>
  <b-finding>
    <ex>Một lần chạy ban đêm trên build server. Tác nhân muốn phát hành một bản build mà không ai để hỏi. Ở chế độ dontAsk, lệnh gọi bị từ chối, tác nhân viết báo cáo vật cản, và buổi sáng một người thấy nó thay vì một cách vòng lặng lẽ.</ex>
    <gen>Trong một lần chạy tự chủ, escalation biến từ câu hỏi thành báo cáo vật cản: tác nhân dừng, ghi lại lý do và chờ.</gen>
    <do>Với các lần chạy ban đêm, hãy đặt quy tắc “deny” rõ ràng cho các hành động nguy hiểm và đòi tác nhân tạo một tệp vật cản thay cho việc đoán mò lặng lẽ.</do>
  </b-finding>
</b-chapter>

<b-chapter id="narrow" icon="workflow" title="Kết quả: vì sao cổng và escalation không nằm trọn trong MCP">
  <b-why align="left">Host giữ toàn bộ cuộc trò chuyện, còn server chỉ nhận những gì nó cần. Trong đặc tả đây là nguyên tắc kiến trúc thứ ba<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28" quote="MCP specification: „Servers should not be able to read the whole conversation, nor 'see into' other servers.“ / „Full conversation history stays with the host“"/>. Một server cục bộ chạy với quyền của client<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/basic/security_best_practices#local-mcp-server-compromise" quote="MCP specification: „MCP servers run with the same privileges as the client“"/>. Từ đó có một kết luận mà tôi tự rút ra: một yêu cầu và một câu trả lời đi qua MCP, còn mọi thứ khác ở lại phía host.</b-why>
  <b-art names="agent-escalation-to-human/barrier-intercom" wide/>
  <b-cap>Host dựng thanh chắn, MCP cho bộ đàm; đi vòng là trả lời thay người.</b-cap>
  <b-why align="left">Dưới đây liệt kê chính xác cái gì đi qua MCP và cái gì ở lại phía host.</b-why>
  <b-rules cols="2">
    <rule icon="package" t="Qua MCP">một lệnh gọi hàm, một kết quả theo schema, một yêu cầu dữ liệu từ người, quyền của server</rule>
    <rule icon="shield-check" t="Ngoài MCP">hook của client, các chế độ quyền, sandbox, lịch sử cuộc trò chuyện, đối thoại riêng của người với tác nhân</rule>
  </b-rules>
  <b-why align="left">Như vậy một phần của cổng nằm trong MCP: yêu cầu gửi tới người, quyền, schema của kết quả. Phần còn lại đứng ở host: hook và các chế độ. Quyết định “ask” duy nhất được ghép từ cả hai phần, và nếu chỉ còn MCP thì quy tắc mặc định đụng phải việc client có thể trả lời thay người. Đây là ô cửa hẹp: một câu hỏi lọt qua được, còn quyết định “có hỏi hay không” được đưa ra bên ngoài.</b-why>
  <b-finding>
    <ex>Một MCP server có thể hỏi người về một khoản chuyển tiền. Client sẽ hiển thị câu hỏi hay tự trả lời là do client và các hook của nó quyết định.</ex>
    <gen>Cổng và escalation được ghép từ hai nơi: ô cửa trong MCP và các quy tắc ở host. Chỉ một trong hai thì còn lỗ hổng.</gen>
    <do>Với mỗi thao tác nguy hiểm, hãy kiểm tra cả hai phía: server có thể hỏi, và client không thể trả lời thay người.</do>
  </b-finding>
</b-chapter>

<b-chapter id="claims" icon="target" title="Kỳ vọng và những gì tìm thấy">
  <b-why align="left">Bốn giả định ban đầu, đối chiếu với chính văn bản của các tài liệu và bài báo. Những gì không mở được hoặc không kiểm tra được đầy đủ đều được đánh dấu.</b-why>
  <b-art names="agent-escalation-to-human/thesis-check" wide/>
  <b-cap>Kết luận cho từng giả định trong bốn giả định.</b-cap>
  <b-why align="left">Chi tiết nằm trong bảng: đã kỳ vọng gì, kết quả và đã tìm thấy gì.</b-why>
  <b-table>

| Lúc đầu trông ra sao | Kết quả | Đã tìm thấy gì |
|---|---|---|
| **Cổng đứng ngoài ngữ cảnh của tác nhân** | <b-status-dot color="accent">đúng</b-status-dot> | một trọng tài nằm trong vòng lặp được 86,7 điểm so với 113,0 của phép kiểm tra từ bên ngoài (arXiv 2607.25152, thử nghiệm). Trong Claude Code, chính tài liệu tách văn bản chỉ dẫn khỏi các quy tắc mà chương trình cưỡng chế |
| **Tác nhân được huấn luyện và đo theo thời gian chạy tự chủ** | <b-status-dot color="accent">một phần</b-status-dot> | METR đo chân trời nhiệm vụ: 16–20 giờ ở mức thành công 50% với mô hình chung tốt nhất. Anthropic và Google DeepMind huấn luyện cho chân trời dài chính xác thế nào thì không tìm thấy trong tài liệu công khai |
| **Với các chỉ số, câu hỏi gửi tới người là một khoản thua, nên hỏi không có lợi** (hình phạt: 0 cho nhiệm vụ chưa giải và lượt bị cắt) | <b-status-dot color="warn">không</b-status-dot> | benchmark cổ điển không có kênh tới người, và việc dừng mà không có lời giải được tính là thất bại. Trong tau-bench, một lần chuyển giao không cần thiết cho người bị 0 điểm. Các chỉ số có tính câu hỏi hoặc thưởng cho nó (HiL-Bench) hoặc coi nó là trung tính (HAS-Bench). Không tìm thấy cách diễn đạt nào kiểu “câu hỏi là một khoản thua”. Không có phép đo “trước và sau khi huấn luyện cho việc hoàn thành” |
| **MCP là nút thắt** | <b-status-dot color="warn">về ý nghĩa</b-status-dot> | Không có trích dẫn trực tiếp: đặc tả không có từ nào kiểu “bottleneck”. Nó có nói rằng chính giao thức không thể cưỡng chế các nguyên tắc bảo mật, và host cung cấp sự cô lập |

  </b-table>
  <b-why align="left">Bảng cho một kết quả: giả định về việc phạt câu hỏi là giả định duy nhất mà các nguồn không ủng hộ, và nó giữ cả chuỗi lại với nhau.</b-why>
  <b-finding>
    <ex>Giả định về việc phạt câu hỏi trông thuyết phục, nhưng trường hợp thật duy nhất tìm thấy là các benchmark không có kênh tới người. Đó là chuyện khác: ở đó không thể hỏi, và không có gì để phạt.</ex>
    <gen>Nếu một chỉ số không tính đến câu hỏi, huấn luyện theo nó sẽ không dạy việc hỏi. Điều đó suy ra từ cách chỉ số được dựng, và không có bằng chứng trực tiếp về ảnh hưởng tới hành vi.</gen>
    <do>Trước khi kết luận vì sao một tác nhân cư xử theo một cách nào đó, hãy tìm một phép đo: cùng một tác nhân so sánh trước và sau khi huấn luyện. Không có nó thì chỉ còn một giả thuyết.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="Cách bắt đầu: bốn bước và các prompt sẵn cho tác nhân">
  <b-why align="left">Các bước đi từ rẻ đến kỹ lưỡng. Hai bước đầu là đủ để escalation thôi phụ thuộc vào tâm trạng của tác nhân.</b-why>
  <b-rules cols="2">
    <rule icon="checklist" t="1. Danh sách điểm dừng">Ghi vào một tệp những hành động nào đòi tác nhân dừng lại và hỏi.</rule>
    <rule icon="shield-check" t="2. Quy tắc và hook">Đưa các hành động nguy hiểm vào “deny” hoặc “ask” qua quyền và một hook PreToolUse.</rule>
    <rule icon="package" t="3. Quyền trên MCP server">Chỉ trao các hàm nguy hiểm với scope cần thiết.</rule>
    <rule icon="clock" t="4. Nhật ký câu hỏi">Đếm tác nhân đã hỏi bao nhiêu lần, bao nhiêu lần hỏi thừa và bao nhiêu lần im lặng khi lẽ ra phải hỏi.</rule>
  </b-rules>
  <b-why align="left">Prompt đầu tiên thu thập danh sách điểm dừng: đây là bước 1.</b-why>
  <b-prompt>
    Hãy tạo tệp escalation.md liệt kê các trường hợp tác nhân phải dừng lại và hỏi tôi: hành động không thể hoàn tác,
    phát hành, đổi quyền, hai cách hiểu ngang nhau về nhiệm vụ. Với mỗi trường hợp hãy ghi câu hỏi nào cần đặt và câu trả lời nào được coi là đồng ý.
    Mọi thứ còn lại tác nhân tự quyết định.
  </b-prompt>
  <b-why align="left">Prompt thứ hai biến danh sách thành quy tắc hook: đây là bước 2.</b-why>
  <b-prompt>
    Hãy cấu hình hook PreToolUse trong .claude/settings.json: với các lệnh từ escalation.md trả lời “ask”, với các lệnh rõ ràng nguy hiểm trả lời “deny”
    kèm lý do mà tác nhân sẽ thấy. Hãy cho xem tệp cuối cùng và một ví dụ lệnh gọi mà hook đã kích hoạt.
  </b-prompt>
  <b-why align="left">Prompt thứ ba kiểm tra liệu client có thể trả lời thay người hay không: đây là bước 3.</b-why>
  <b-prompt>
    Hãy kiểm tra client MCP của tôi: tác nhân hay một script có thể trả lời yêu cầu dữ liệu gửi tới người thay tôi không. Nếu có, hãy đề xuất một thiết lập
    ngăn điều đó với các server có hàm nguy hiểm.
  </b-prompt>
  <b-why align="left">Sau hai bước đầu trông như thế này.</b-why>
  <b-finding>
    <ex>Một tuần sau, nhật ký cho thấy: trong mười câu hỏi thì tám câu về việc đổi tên tệp. Danh sách điểm dừng được cắt xuống còn các hành động không thể hoàn tác, và số câu hỏi giảm còn hai mỗi ngày.</ex>
    <gen>Escalation được tinh chỉnh bằng nhật ký: quá nhiều câu hỏi ăn mất sự chú ý của người, quá ít thì để lại những lần đoán của tác nhân.</gen>
    <do>Hôm nay làm bước 1 và 2 cho một nhiệm vụ, và sau một tuần bắt đầu nhật ký từ các câu hỏi thực.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Các câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Escalation sang con người ở tác nhân AI là gì?">Một lần dừng mà tác nhân hoặc chương trình bao quanh nó trao một quyết định cho người: bằng một câu hỏi, một yêu cầu cấp quyền hoặc một lần xác nhận. Quy tắc và hook đưa ra quyết định “ask”, còn người đưa ra câu trả lời.</q>
    <q t="Elicitation trong MCP là gì?">Cách một MCP server yêu cầu người cung cấp dữ liệu thông qua client. Có ba câu trả lời: accept, decline và cancel. Việc xin mật khẩu và khóa trong form bị cấm, và có một chế độ địa chỉ bên ngoài cho chúng.</q>
    <q t="Chỉ số tự chủ có phạt tác nhân vì hỏi người không?">Hình phạt đến vì kết quả dở dang: 0 thay vì 1, và ở Anthropic một câu hỏi cắt ngắn lượt. Không tìm thấy việc trừ điểm vì chính câu hỏi. Các benchmark cổ điển đơn giản là không có kênh tới người. HiL-Bench gần đây và công trình của Anthropic thưởng cho câu hỏi hoặc coi nó là sự giám sát, còn HAS-Bench coi nó là trung tính.</q>
    <q t="Có thể dựng cổng và escalation hoàn toàn trong MCP không?">Không. MCP mang một câu hỏi và một câu trả lời, còn quyết định hiển thị câu hỏi cho người hay trả lời tự động do host đưa ra: các hook, chế độ quyền và client của nó. Chính giao thức không thể cưỡng chế quyết định đó.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Đọc tiếp">
  <b-links>
    <item href="/blog/quality-gates-ai-agents/" k="Cổng" t="Cổng chất lượng cho tác nhân AI là gì">một bài tiếp nhận nói “xong”</item>
    <item href="/blog/agent-checkpoint/" k="Kiểm tra" t="Đặt phép kiểm tra công việc của tác nhân ở đâu">ranh giới aggregate và định lý Rice</item>
    <item href="/blog/mcp-agent-access/" k="MCP" t="MCP cho tác nhân AI">giải quyết vấn đề gì và kết nối thế nào</item>
    <item href="/blog/mcp-scopes/" k="MCP" t="Scope MCP trong Claude Code">local, project và user</item>
    <item href="/blog/harness-driven-development/" k="Harness" t="Harness engineering trong thực tế">guide, sensor và vòng lặp “lỗi — quy tắc”</item>
    <item href="/blog/ai-agent-maturity-levels/" k="Mức trưởng thành" t="Các mức trưởng thành của tác nhân AI">từ chat đến spec, skill, mã và một hệ thống</item>
  </b-links>
</b-chapter>
<b-footer>Dữ kiện: tính đến ngày 14 tháng 11 năm 2026, từ các tài liệu và bài báo được liên kết bằng dấu ↗. Các trang openai.com và bài đăng mạng xã hội của METR không mở được, nên con số của OpenAI về tỷ lệ nhiệm vụ không có can thiệp không được dùng ở đây. Một số trích dẫn về câu hỏi của tác nhân và về METR được kiểm tra qua bản tóm tắt trang; hãy đối chiếu với bản gốc trước khi trích. Các ví dụ về cấu hình, server thanh toán và lần chạy ban đêm là giả định.</b-footer>
</b-post>
