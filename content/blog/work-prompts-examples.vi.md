---
title: Prompt cho công việc: năm phần và sáu ví dụ cho ChatGPT và Claude
date: 2026-09-28
updated: 2026-11-13
description: Prompt cho công việc với chatbot AI: các phần của một prompt công việc tốt, yêu cầu yếu và mạnh trông ra sao, sáu mẫu dựng sẵn cho các tác vụ phổ biến và cách giữ chúng trong một dự án, dựa trên hướng dẫn của Anthropic, OpenAI và Google.
tags: AI, prompt, ChatGPT, Claude
category: prompts
layout: wide
toc: model=Human-in-the-loop | parts=Năm phần | examples=Sáu ví dụ | learn=Nên học gì | faq=Câu hỏi | next=Đọc tiếp
---

Một prompt công việc cho ChatGPT và Claude được dựng từ năm phần: vai trò, câu trả lời dành cho ai và để làm gì, dữ liệu đầy đủ, ví dụ và định dạng, còn câu hỏi đặt ở cuối. Mô hình chỉ biết những gì yêu cầu nói. Cách kiểm tra đơn giản: đưa prompt cho một đồng nghiệp không biết ngữ cảnh, nếu họ bối rối thì mô hình cũng vậy. Bên dưới là một yêu cầu yếu, một yêu cầu mạnh và sáu mẫu cho các tác vụ phổ biến.

<b-post series="prompts">
<b-flow lead label="Một yêu cầu, hai kết quả">
  <b-lane title="Một câu" color="muted">
    <node icon="chat" t="Yêu cầu">“viết thư trả lời khách hàng”</node>
    <node icon="ai-box" t="Mô hình">đoán ngữ cảnh</node>
    <node icon="file-x" t="Câu trả lời chung chung">viết lại bằng tay</node>
  </b-lane>
  <b-lane title="Năm phần" color="accent">
    <node icon="prompt-stripes" t="Prompt">vai trò, dữ liệu, ví dụ, định dạng</node>
    <node icon="ai-box" t="Mô hình">thấy mọi thứ cần thiết</node>
    <node icon="file-check" t="Bản nháp">sửa nhỏ</node>
  </b-lane>
</b-flow>
<b-cap>Mô hình giống nhau trong cả hai trường hợp. Kết quả phụ thuộc vào những gì prompt nói: năm phần lặp lại trong hướng dẫn của Anthropic, OpenAI và Google.</b-cap>
<b-chapter id="model" title="Human-in-the-loop: hành trình của một yêu cầu" icon="share">
  <b-art names="work-prompts-examples/prompt-map" wide/>
  <b-finding>
    <ex>Con người nắm mọi điểm then chốt: đặt nhiệm vụ, dựng prompt, kiểm tra câu trả lời, gửi lại để tinh chỉnh và đưa ra quyết định. Mô hình chỉ trả lời những gì đã vào yêu cầu.</ex>
    <gen>Mỗi mũi tên có điểm kiểm tra riêng: dữ liệu vào đầy đủ, câu trả lời được kiểm tra theo người cần nó, và một yêu cầu tốt được lưu thành mẫu để nhiệm vụ cùng loại sau đó bắt đầu từ đó.</gen>
    <do>Trước khi viết yêu cầu, gọi tên người đọc và quyết định họ sẽ đưa ra từ câu trả lời: vai trò và định dạng suy ra từ đó.</do>
  </b-finding>
  <b-cta href="/blog/harness-driven-development/" k="Bước tiếp theo · HDD" t="Harness-Driven Development">Cách biến bước kiểm tra trong sơ đồ này thành quy tắc dùng được cho mọi nhiệm vụ tiếp theo</b-cta>
</b-chapter>
<b-chapter id="parts" title="Năm phần của một prompt" icon="grid">
  <b-prompt-anatomy label="Cấu tạo prompt: vai trò, đối tượng và mục tiêu, toàn bộ dữ liệu trong thẻ, ví dụ, định dạng, câu hỏi để cuối" order="order">
    <part kind="role" icon="user-round" t="Vai trò" tip="Vai trò: “Bạn là nhân viên hỗ trợ.” Một câu đặt giọng điệu và trình độ"><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Setting a role in the system prompt focuses Claude&#39;s behavior and tone for your use case. Even a single sentence makes a difference” — platform.claude.com, Prompting best practices"/></part>
    <part kind="who" icon="target" t="Đối tượng và mục tiêu" tip="Ai và vì sao: Ai đọc kết quả và nó phục vụ quyết định nào"><b-proof href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" quote="OpenAI Academy: “Be clear about what you need ChatGPT to do. Outline what you want, who it&#39;s for, and why it matters” — academy.openai.com, Prompting"/><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Providing context or motivation behind your instructions, such as explaining to Claude why such behavior is important, can help Claude better understand your goals and deliver more targeted responses” — platform.claude.com, Prompting best practices"/></part>
    <part kind="data" icon="file-text" t="Toàn bộ dữ liệu" tip="Dữ liệu đầy đủ: Dán nguyên chuỗi tin nhắn, tài liệu hoặc bảng. Dữ liệu dài ở trên, câu hỏi ở cuối" tag="data"><b-proof href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" quote="OpenAI Academy: “Add any background (or documentation) that will help” — academy.openai.com, Prompting"/><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Place your long documents and inputs near the top of your prompt, above your query, instructions, and examples”; “Queries at the end can improve response quality by up to 30 percent in tests” — platform.claude.com, Prompting best practices"/></part>
    <part kind="ex" icon="card-text" t="Ví dụ" tip="Ví dụ: Từ một đến ba mẫu về giọng điệu hoặc định dạng mong muốn" tag="example" note="1–3"><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Include 3–5 examples for best results” — platform.claude.com, Prompting best practices"/><b-proof href="https://www.kaggle.com/whitepaper-prompt-engineering" quote="Google, Prompt Engineering: its best practices include providing examples, being specific about the output and using instructions over constraints. Paraphrased — kaggle.com/whitepaper-prompt-engineering"/></part>
    <part kind="fmt" icon="list-dots" t="Định dạng" tip="Định dạng: “5 gạch đầu dòng, mỗi dòng một câu.” Nói cần làm gì, thay vì liệt kê điều cấm" note="5 ý"><b-proof href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" quote="OpenAI Academy: “Tell ChatGPT how you&#39;d like the response” — academy.openai.com, Prompting"/><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Tell Claude what to do instead of what not to do” — platform.claude.com, Prompting best practices"/></part>
    <part kind="q" icon="help" t="Câu hỏi để cuối" tip="Dán nguyên chuỗi tin nhắn, tài liệu hoặc bảng. Dữ liệu dài ở trên, câu hỏi ở cuối"></part>
    <tags t="thẻ" tip="Thẻ cho các phần: &lt;thread&gt;…&lt;/thread&gt; giữ dữ liệu tách khỏi chỉ dẫn"><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Wrapping each type of content in its own tag (for example, &lt;instructions&gt;, &lt;context&gt;, &lt;input&gt;) reduces misinterpretation” — platform.claude.com, Prompting best practices"/></tags>
  </b-prompt-anatomy>
  <b-finding>
    <ex>Năm phần cộng thẻ, mỗi phần có một hướng dẫn chính thức làm căn cứ.</ex>
    <gen>Mô hình chỉ biết những gì prompt nói. Anthropic gợi ý một phép thử: đưa prompt cho một đồng nghiệp không có ngữ cảnh; nếu họ bối rối thì mô hình cũng vậy<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they&#39;d be confused, Claude will be too” — platform.claude.com, Prompting best practices"/>.</gen>
    <do>Mở prompt gần nhất của bạn và đánh dấu thiếu phần nào trong năm phần. Thêm vai trò và định dạng: hai câu.</do>
  </b-finding>
</b-chapter>
<b-chapter id="examples" title="Sáu ví dụ" icon="browser-tab">
  <b-prompt-tabs name="ex-en">
    <b-prompt-tab id="client" icon="chat" label="Trả lời khách hàng" title="Trả lời một chuỗi trao đổi với khách hàng">
      <b-why>Khách hàng viết lần thứ ba; giọng điệu phải giữ bình tĩnh, và chỉ được hứa những gì chuỗi trao đổi đã nói.</b-why>
      <b-prompt-parts>
        <part icon="user-alt">Vai trò</part>
        <part icon="help-circle" off>Ai và vì sao</part>
        <part icon="file-text">Dữ liệu đầy đủ</part>
        <part icon="checklist">Ví dụ</part>
        <part icon="lines-alt">Định dạng</part>
      </b-prompt-parts>
      <b-prompt>
        Bạn là nhân viên hỗ trợ của [công ty].
        Dưới đây là toàn bộ chuỗi trao đổi với khách hàng.
        &lt;thread&gt;
        [dán nguyên văn]
        &lt;/thread&gt;
        Hãy viết thư trả lời tiếp theo. Giọng điệu: bình tĩnh và thân thiện, như ví dụ này:
        &lt;example&gt;
        [một thư trả lời tốt trước đây]
        &lt;/example&gt;
        Không quá 5 câu. Chỉ nhắc ngày tháng nếu chúng có trong chuỗi trao đổi.
      </b-prompt>
      <b-finding>
        <ex>Một vai trò, chuỗi trao đổi trong thẻ, một mẫu giọng điệu và hai quy tắc định dạng.</ex>
        <gen>Một thư trả lời trước đây đặt giọng điệu tốt hơn bất kỳ tính từ nào. Quy tắc về ngày tháng được diễn đạt như một sự cho phép có điều kiện, và mô hình làm theo đúng từng chữ.</gen>
        <do>Giữ hai ba thư trả lời tốt nhất của nhóm và thả một thư vào khối ví dụ.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="meeting" icon="calendar" label="Chuẩn bị họp" title="Chuẩn bị cho một cuộc họp">
      <b-why>Ngày mai có cuộc họp 30 phút; tài liệu nằm rải rác trong các chuỗi trao đổi và văn bản.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>Vai trò</part>
        <part icon="help-circle">Ai và vì sao</part>
        <part icon="file-text">Dữ liệu đầy đủ</part>
        <part icon="checklist" off>Ví dụ</part>
        <part icon="lines-alt">Định dạng</part>
      </b-prompt-parts>
      <b-prompt>
        Ngày mai tôi họp với [ai] về [chủ đề], 30 phút. Mục tiêu của tôi là [quyết định cần có].
        &lt;materials&gt;
        [các chuỗi trao đổi và tài liệu]
        &lt;/materials&gt;
        Hãy chuẩn bị:
        1. Ba câu hỏi cần chốt trong cuộc họp.
        2. Với mỗi câu, tài liệu đã nói gì, kèm một trích dẫn ngắn.
        3. Điều tôi cần tìm hiểu trước cuộc họp.
        Định dạng: bảng ba cột.
      </b-prompt>
      <b-cap>OpenAI Academy có mẫu chương trình họp kèm ước tính thời gian<b-proof href="https://academy.openai.com/public/resources/chatgpt-for-any-role" quote="OpenAI Academy, ChatGPT for any role: “Create a structured agenda for a meeting about [topic]. Break the agenda into sections with time estimates and goals for each section” — academy.openai.com"/>.</b-cap>
      <b-finding>
        <ex>Mục tiêu cuộc họp, tài liệu trong thẻ và danh sách đánh số những thứ cần trả về.</ex>
        <gen>Mục tiêu cuộc họp lọc tài liệu. Các bước đánh số giúp ích khi thứ tự và độ đầy đủ quan trọng<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Provide instructions as sequential steps using numbered lists or bullet points when the order or completeness of steps matters” — platform.claude.com, Prompting best practices"/>.</gen>
        <do>Trước mỗi cuộc họp từ 30 phút trở lên, cho tài liệu chạy qua prompt này và mở đầu bằng bảng của nó.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="summary" icon="summary-lines" label="Tóm tắt chuỗi trao đổi" title="Tóm tắt một chuỗi trao đổi dài">
      <b-why>Một cuộc chat 200 tin nhắn; cần biết đã quyết định gì và ai làm gì.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>Vai trò</part>
        <part icon="help-circle" off>Ai và vì sao</part>
        <part icon="file-text">Dữ liệu đầy đủ</part>
        <part icon="checklist" off>Ví dụ</part>
        <part icon="lines-alt">Định dạng</part>
      </b-prompt-parts>
      <b-prompt>
        &lt;thread&gt;
        [dán nguyên văn]
        &lt;/thread&gt;
        Trước hết, sao chép nguyên văn các trích dẫn nơi đưa ra quyết định hoặc giao việc.
        Sau đó lập bản tóm tắt từ các trích dẫn đó:
        — các quyết định;
        — các việc kèm người phụ trách và ngày;
        — các câu hỏi còn mở.
        Mỗi mục một dòng. Nếu trích dẫn không nêu người phụ trách, ghi “chưa giao”.
      </b-prompt>
      <b-finding>
        <ex>Chuỗi trao đổi dài ở trên, nhiệm vụ ở cuối, trích dẫn trước, rồi mới tóm tắt.</ex>
        <gen>Với tài liệu dài, Anthropic khuyên yêu cầu trích dẫn trước<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “For long document tasks, ask Claude to quote relevant parts of the documents first before carrying out its task” — platform.claude.com, Prompting best practices"/> và đặt câu hỏi sau dữ liệu: trong thử nghiệm, điều đó cải thiện chất lượng đến 30%<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Place your long documents and inputs near the top of your prompt, above your query, instructions, and examples”; “Queries at the end can improve response quality by up to 30 percent in tests” — platform.claude.com, Prompting best practices"/>. Quy tắc “chưa giao” ngăn mô hình bịa ra người phụ trách.</gen>
        <do>Với bất kỳ chuỗi trao đổi nào dài hơn một màn hình, hãy bắt đầu bằng việc yêu cầu trích dẫn.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="table" icon="table" label="Phân tích bảng" title="Phân tích một bảng">
      <b-why>Một tháng phiếu hỗ trợ xuất ra CSV; tìm xem cái gì đã thay đổi.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>Vai trò</part>
        <part icon="help-circle" off>Ai và vì sao</part>
        <part icon="file-text">Dữ liệu đầy đủ</part>
        <part icon="checklist" off>Ví dụ</part>
        <part icon="lines-alt">Định dạng</part>
      </b-prompt-parts>
      <b-prompt>
        Đính kèm là bản xuất [phiếu] trong [giai đoạn], dạng CSV.
        Đếm [phiếu] theo [chủ đề] và nêu 5 thay đổi lớn nhất so với tháng trước.
        Với mỗi thay đổi, nêu con số và một dòng về điều có thể giải thích nó.
        Hiện đoạn code đã dùng để tôi kiểm tra.
      </b-prompt>
      <b-cap>Cả ChatGPT và Claude đều xử lý file trong một sandbox tách biệt<b-proof href="https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt" quote="ChatGPT: for data analysis it writes and runs Python in an isolated environment; review the code, output and assumptions before relying on the result. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/8437071"/><b-proof href="https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude" quote="Claude: “When Claude executes code or creates files, it operates within an isolated, sandboxed container” — support.claude.com/en/articles/12111783"/>.</b-cap>
      <b-finding>
        <ex>Toàn bộ file, một chỉ số và cách chia chính xác, giới hạn “top 5” và yêu cầu xem code.</ex>
        <gen>Mô hình tính bằng code trong sandbox, và code đọc lại được. OpenAI khuyên kiểm tra code, kết quả và các giả định trước khi dựa vào kết quả.</gen>
        <do>Kiểm tra bằng tay một con số trong câu trả lời. Nếu khớp, hãy tin phần còn lại hơn.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="style" icon="pen" label="Giọng của công ty" title="Văn bản theo giọng của công ty">
      <b-why>Cần một bài đăng hoặc email nghe như tiếng nói của nhóm, không như một mẫu có sẵn.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>Vai trò</part>
        <part icon="help-circle">Ai và vì sao</part>
        <part icon="file-text" off>Dữ liệu đầy đủ</part>
        <part icon="checklist">Ví dụ</part>
        <part icon="lines-alt">Định dạng</part>
      </b-prompt-parts>
      <b-prompt>
        Dưới đây là ba bài đăng của công ty đã được đón nhận tốt:
        &lt;example&gt;[bài 1]&lt;/example&gt;
        &lt;example&gt;[bài 2]&lt;/example&gt;
        &lt;example&gt;[bài 3]&lt;/example&gt;
        Hãy viết một bài về [chủ đề] theo cùng phong cách: độ dài, giọng điệu và cấu trúc như trong các ví dụ.
        Dành cho: [đối tượng]. Để làm gì: [điều cần người đọc làm].
      </b-prompt>
      <b-finding>
        <ex>Ba ví dụ trong thẻ và một dòng về đối tượng và mục đích.</ex>
        <gen>Anthropic khuyên dùng 3–5 ví dụ<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Include 3–5 examples for best results” — platform.claude.com, Prompting best practices"/>; hướng dẫn của Google cũng liệt kê ví dụ là thực hành đầu tiên<b-proof href="https://www.kaggle.com/whitepaper-prompt-engineering" quote="Google, Prompt Engineering: its best practices include providing examples, being specific about the output and using instructions over constraints. Paraphrased — kaggle.com/whitepaper-prompt-engineering"/>. Một phong cách được cho xem qua ví dụ được sao chép chính xác hơn phong cách mô tả bằng lời.</gen>
        <do>Đưa các văn bản tốt vào một dự án và dùng chúng làm ví dụ, để không phải dán lại mỗi lần.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="research" icon="search" label="Nghiên cứu" title="Nghiên cứu một chủ đề">
      <b-why>Cần một bản tổng quan về thị trường hoặc thực hành kèm nguồn, tức nửa ngày tìm kiếm bằng tay.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>Vai trò</part>
        <part icon="help-circle">Ai và vì sao</part>
        <part icon="file-text" off>Dữ liệu đầy đủ</part>
        <part icon="checklist" off>Ví dụ</part>
        <part icon="lines-alt">Định dạng</part>
      </b-prompt-parts>
      <b-prompt>
        Nghiên cứu: [câu hỏi].
        Dành cho: [đối tượng]. Để làm gì: [quyết định cần đưa ra].
        Dữ liệu không cũ hơn năm [năm].
        Đầu ra: một bảng [các cột] và kết luận 5 ý.
        Mỗi dữ kiện kèm một liên kết nguồn. Nếu không có dữ liệu, hãy nói rõ.
      </b-prompt>
      <b-cap>Cả hai chatbot đều có chế độ nghiên cứu sâu: deep research trong ChatGPT và Research trong Claude<b-proof href="https://help.openai.com/en/articles/10500283-deep-research-in-chatgpt" quote="ChatGPT: deep research gathers and synthesises information from the web into a report, takes 5 to 30 minutes and includes source links. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/10500283"/><b-proof href="https://support.claude.com/en/articles/11088861-use-research-on-claude" quote="Claude: Research is “conducting multiple searches that build on each other”, answers come “complete with easy-to-check citations”; “available for users with paid Claude plans (Pro, Max, Ultra, Team, or Enterprise)” — support.claude.com/en/articles/11088861"/>.</b-cap>
      <b-finding>
        <ex>Một mục tiêu, giới hạn độ mới và định dạng đầu ra kèm liên kết.</ex>
        <gen>Ở chế độ nghiên cứu, mô hình chạy một loạt tìm kiếm và trả về báo cáo kèm liên kết. Liên kết cho phép kiểm tra từng dữ kiện, và “nếu không có dữ liệu” ngăn việc lấp chỗ trống bằng phỏng đoán.</gen>
        <do>Mở hai ba liên kết từ báo cáo và kiểm tra dữ kiện với nguồn trước khi chuyển kết luận đi.</do>
      </b-finding>
    </b-prompt-tab>
  </b-prompt-tabs>
</b-chapter>
<b-chapter id="learn" title="Nên học gì tiếp" icon="flag-alt">
  <b-why>Bắt đầu với bài hướng dẫn 7 phút: nó giải thích vì sao các kỹ thuật trong bài này có tác dụng. Sau đó là các hướng dẫn về prompt, và các khóa học khi có thời gian.</b-why>
  <b-sublabel top="22">Nền tảng: AI hoạt động thế nào</b-sublabel>
  <b-links cols="2">
    <item href="https://academy.claude.com/tutorials/the-4-properties-of-ai" k="Claude Academy · hướng dẫn, 7 phút" t="The 4 properties of AI" ext>Dự đoán token tiếp theo, kiến thức, bộ nhớ làm việc, khả năng điều hướng: điểm mạnh và điểm yếu của mô hình đến từ đâu</item>
    <item href="https://academy.claude.com/courses/ai-capabilities-and-limitations" k="Claude Academy · khóa học, 13 bài, 3,5 giờ" t="AI Capabilities and Limitations" ext>Vì sao mô hình tự tin bịa chuyện, ngữ cảnh cạn ở đâu và chỉ dẫn nào đáng tin</item>
    <item href="https://academy.claude.com/courses/ai-fluency-framework-foundations" k="Claude Academy · khóa học, 14 bài, 4 giờ" t="AI Fluency: Framework & Foundations" ext>Bốn kỹ năng: giao gì, mô tả nhiệm vụ thế nào, kiểm tra kết quả ra sao và ai chịu trách nhiệm</item>
  </b-links>
  <b-sublabel top="22">Viết prompt</b-sublabel>
  <b-links cols="2">
    <item href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" k="Anthropic · tài liệu" t="Prompting best practices" ext>Tài liệu tham khảo chính: sự rõ ràng, ví dụ, vai trò, thẻ XML, tài liệu dài</item>
    <item href="https://claude.com/resources/articles/best-practices-for-prompt-engineering" k="Anthropic · blog" t="Best practices for prompt engineering" ext>Nghề viết prompt nói chung, vượt ra ngoài một mô hình cụ thể</item>
    <item href="https://github.com/anthropics/prompt-eng-interactive-tutorial" k="Anthropic · hướng dẫn" t="Interactive tutorial" ext>9 chương kèm bài tập, từ cấu trúc prompt đến thẻ XML và ví dụ</item>
    <item href="https://www.kaggle.com/whitepaper-prompt-engineering" k="Google · sách trắng" t="Prompt Engineering" ext>Kỹ thuật và thực hành tốt: ví dụ, định dạng đầu ra, chỉ dẫn hơn ràng buộc</item>
    <item href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" k="OpenAI Academy" t="Prompting" ext>Cái gì, cho ai và vì sao, ngữ cảnh, định dạng đầu ra, lặp lại</item>
    <item href="https://academy.openai.com/public/resources/chatgpt-for-any-role" k="OpenAI Academy" t="ChatGPT for any role" ext>Các mẫu prompt công việc dựng sẵn theo tác vụ và vai trò</item>
  </b-links>
  <b-sublabel top="22">Cho nhóm và quản trị viên</b-sublabel>
  <b-links cols="2">
    <item href="https://support.claude.com/en/articles/14782391-claude-enterprise-consumption-guide" k="Claude · trung tâm trợ giúp" t="Claude Enterprise consumption guide" ext>Token được tiêu thế nào: Claude Code và Cowork dùng nhiều hơn hẳn chat thường; hạn mức theo nhóm và mô hình mặc định</item>
  </b-links>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Một prompt tốt gồm những gì?">Năm phần: vai trò, câu trả lời dành cho ai và để làm gì, dữ liệu đầy đủ, ví dụ và định dạng. Câu hỏi đặt ở cuối.</q>
    <q t="Làm sao kiểm tra một prompt?">Đưa nó cho một đồng nghiệp không biết ngữ cảnh: nếu họ bối rối thì mô hình cũng vậy.</q>
    <q t="Vì sao nên đưa ví dụ vào prompt?">Ví dụ về một câu trả lời trước đây đặt giọng điệu chính xác hơn mọi tính từ.</q>
    <q t="Làm gì với một prompt tốt?">Lưu thành mẫu: nhiệm vụ cùng loại sau đó bắt đầu từ nó.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Đọc tiếp">
  <b-links cols="2">
    <item href="/blog/harness-work-approaches/" k="Cách tiếp cận" t="Khi câu trả lời trượt mục tiêu">Vòng lặp câu trả lời và bước xem lại sửa yêu cầu</item>
    <item href="/blog/specs-rules-skills/" k="Ngữ cảnh" t="Đặc tả, bible, quy tắc và skill">Prompt sống ở đâu ngoài một cuộc chat</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Kỹ thuật" t="AI trong code">Harness và bốn nhóm công cụ</item>
    <item href="/blog/chatgpt-enterprise-usage-report/" k="Báo cáo" t="Báo cáo sử dụng ChatGPT Enterprise">Ai trong công ty dùng gì</item>
  </b-links>
</b-chapter>
<b-footer>Các prompt là mẫu: điền vào những chỗ trong ngoặc vuông. Các kỹ thuật theo hướng dẫn chính thức của Anthropic, OpenAI và Google; nguồn nằm sau biểu tượng cạnh mỗi khẳng định. Các trích dẫn từ OpenAI Help Center và hướng dẫn của Google là diễn giải lại.</b-footer>
</b-post>
