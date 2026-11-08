---
title: Các cách làm việc với harness: vòng lặp câu trả lời và review sửa lại yêu cầu gốc
date: 2026-09-28
updated: 2026-11-08
description: Làm gì khi câu trả lời không trúng: ba hướng đi và một vòng lặp lặp lại. Review tìm ra chỗ thiếu thế nào, vì sao chúng được đưa vào yêu cầu gốc và quy trình chạy lại. Dựa trên hướng dẫn của Anthropic, OpenAI và Google.
tags: AI, harness, prompt, review
category: prompts
layout: wide
toc: iterate=Nếu không trúng | review=Review câu trả lời | faq=Câu hỏi | next=Đọc thêm
---

Khi câu trả lời của AI không trúng, có ba cách: làm rõ trong cùng cuộc chat, viết lại yêu cầu gốc, hoặc trước tiên yêu cầu mô hình đặt câu hỏi. Khi review tìm ra chỗ thiếu, chỗ đó được đưa vào yêu cầu gốc và cả chu trình chạy lại: sửa, test, review. Yêu cầu trở nên đầy đủ, và tác vụ tương tự tiếp theo bắt đầu từ nó. Bên dưới là cả hai cách tiếp cận theo hướng dẫn của Anthropic, OpenAI và Google.

<b-post series="prompts">
<b-flow lead label="Hai cách tiếp cận: vòng lặp câu trả lời và review sửa yêu cầu">
  <b-lane title="Câu trả lời không trúng" color="muted">
    <node icon="x" t="Câu trả lời">lạc khỏi tác vụ</node>
    <node icon="refresh" t="Một trong ba hướng">làm rõ, làm lại, hỏi</node>
    <node icon="ai-box" t="Câu trả lời mới">kiểm tra lại</node>
  </b-lane>
  <b-lane title="Review tìm ra chỗ thiếu" color="accent">
    <node icon="file" t="Yêu cầu v1">tác vụ gốc</node>
    <node icon="search" t="Review">hai chỗ thiếu</node>
    <node icon="check" t="Yêu cầu v2">và cả quy trình chạy lại</node>
  </b-lane>
</b-flow>
<b-cap>Cả hai cách tiếp cận dùng được trong mọi harness: chat, Claude Code, Codex hay Cursor.</b-cap>

<b-chapter id="iterate" icon="refresh" title="Nếu câu trả lời không trúng">
  <b-art names="harness-work-approaches/answer-paths harness-work-approaches/answer-paths-mobile"/>
  <b-sublabel top="22">Hướng 3: ba câu hỏi và một yêu cầu mới</b-sublabel>
  <b-sublabel top="16">Bước 1</b-sublabel>
  <b-prompt>
    [mô tả tác vụ]
    Trước khi làm tác vụ, hãy hỏi tôi 3 câu mà câu trả lời sẽ cải thiện kết quả nhiều nhất. Đừng bắt đầu làm cho đến khi tôi trả lời.
  </b-prompt>
  <b-sublabel top="12">Bước 2</b-sublabel>
  <b-why>Trả lời các câu hỏi của mô hình bằng lời của bạn, trong cùng cuộc chat.</b-why>
  <b-sublabel top="12">Bước 3</b-sublabel>
  <b-prompt>
    Hãy dựng prompt cuối cùng từ tác vụ và các câu trả lời của tôi: vai trò, ai và vì sao, dữ liệu, ví dụ, định dạng, câu hỏi ở cuối. Chỉ xuất ra văn bản prompt.
  </b-prompt>
  <b-finding>
    <ex>Ba tình huống và một hành động cho mỗi tình huống: làm rõ trong cùng cuộc chat, viết lại prompt, hoặc trước tiên nhận câu hỏi từ mô hình.</ex>
    <gen>
      Làm rõ giữ lại ngữ cảnh đã đưa và phù hợp khi tác vụ đã được hiểu đúng. Nếu tác vụ bị hiểu sai thì viết lại prompt nhanh hơn.
      Nếu mô hình bịa ra sự việc, hãy đưa dữ liệu cần thiết vào yêu cầu mới và cho phép nó nói “tôi không biết”<b-proof href="https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations" quote="Anthropic: “Explicitly give Claude permission to admit uncertainty. This simple technique can drastically reduce false information” — platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations"/>.
      Câu trả lời mới được kiểm tra theo cách tương tự, và vòng lặp tiếp tục cho đến khi phù hợp.
      Câu hỏi từ mô hình giúp ích khi chưa rõ cần ngữ cảnh gì: sự mơ hồ cho mô hình chỗ để hiểu sai<b-proof href="https://claude.com/blog/best-practices-for-prompt-engineering" quote="Anthropic: “Don&#39;t assume the AI reads minds: Be specific about what you want. Leaving things ambiguous gives the AI room to misinterpret” — claude.com/blog/best-practices-for-prompt-engineering"/>,
      và khi ý định không rõ, mô hình thường hỏi lại để làm rõ hơn<b-proof href="https://developers.openai.com/api/docs/guides/prompt-guidance" quote="OpenAI: “When the user&#39;s intent is unclear, the model is more likely to ask the user for clarification to proceed”; and “Before asking the user clarifying questions, you should complete the work that is already authorized from context” — developers.openai.com/api/docs/guides/prompt-guidance"/>.
    </gen>
    <do>Với một tác vụ mới mà bạn chưa chắc về ngữ cảnh, hãy bắt đầu bằng cách yêu cầu ba câu hỏi. Gửi prompt cuối cùng dựng từ các câu trả lời như một yêu cầu mới trong cuộc chat mới.</do>
  </b-finding>
</b-chapter>

<b-chapter id="review" icon="search" title="Review câu trả lời: sửa yêu cầu gốc">
  <b-why>Lấy hướng “viết lại yêu cầu” làm ví dụ: review tìm ra chỗ thiếu, yêu cầu gốc bỏ đi phần sai và bổ sung phần còn thiếu, rồi mọi thứ chạy lại.</b-why>
  <b-art names="harness-work-approaches/two-runs harness-work-approaches/two-runs-mobile"/>
  <b-finding>
    <ex>Review tìm ra hai trường hợp không có trong tác vụ: đầu số quốc tế không có dấu cộng và chuỗi rỗng. Giới hạn thừa “chỉ số điện thoại Nga” bị bỏ khỏi yêu cầu gốc, hai trường hợp được thêm vào, và cả quy trình chạy lại.</ex>
    <gen>
      Chỗ thiếu mà review tìm ra được đưa vào yêu cầu gốc, và chu trình bắt đầu lại: tác nhân viết lại code, test và review kiểm tra các trường hợp mới, và phần làm rõ ở lại trong tác vụ cho các lần chạy sau.
      Một lượt review riêng với chỉ dẫn riêng được mô tả trong hướng dẫn viết prompt của Google<b-proof href="https://www.kaggle.com/whitepaper-prompt-engineering" quote="Google, Prompt Engineering whitepaper: the code section, including review and debugging as a separate prompt — kaggle.com/whitepaper-prompt-engineering"/>.
    </gen>
    <do>Khi review tìm ra điều gì, hãy thêm nó vào yêu cầu gốc và chạy lại cả chu trình: thay đổi, test, review.</do>
  </b-finding>
  <b-cta href="/blog/harness-driven-development/" k="Bước tiếp theo · HDD" t="Harness-Driven Development">Cách chuyển một chỗ thiếu cứ quay lại từ yêu cầu sang quy tắc của harness</b-cta>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Làm gì khi câu trả lời của AI không trúng?">Làm rõ trong cùng cuộc chat nếu tác vụ đã được hiểu; viết lại yêu cầu nếu nó bị hiểu sai; hoặc trước tiên yêu cầu mô hình đặt câu hỏi.</q>
    <q t="Vì sao yêu cầu mô hình đặt câu hỏi?">Khi bạn chưa chắc về ngữ cảnh của tác vụ, câu hỏi của mô hình cho thấy nó đang thiếu gì. Yêu cầu cuối cùng được gửi sang cuộc chat mới.</q>
    <q t="Làm gì với phát hiện của review?">Thêm chúng vào yêu cầu gốc và chạy lại cả chu trình: sửa, test, review.</q>
    <q t="Vì sao sửa yêu cầu gốc?">Khi đó yêu cầu trở nên đầy đủ, và tác vụ tương tự tiếp theo bắt đầu từ nó.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Đọc thêm">
  <b-links cols="2">
    <item href="/blog/specs-rules-skills/" k="Ngữ cảnh" t="Spec, bible, quy tắc và skill">Tác nhân cần biết gì về một dự án</item>
    <item href="/blog/harness-driven-development/" k="Phương pháp" t="Harness-Driven Development">Lỗi của tác nhân → quy tắc của môi trường</item>
    <item href="/blog/work-prompts-examples/" k="Thực hành" t="Prompt cho tác vụ công việc">Năm phần và sáu ví dụ</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="So sánh" t="So sánh các harness">Claude Code, Codex, Cursor, Hermes và chat</item>
  </b-links>
</b-chapter>
<b-footer>Các kỹ thuật theo hướng dẫn chính thức của Anthropic, OpenAI và Google; nguồn nằm sau biểu tượng cạnh mỗi khẳng định. Các trích dẫn từ hướng dẫn của Google được diễn giải lại.</b-footer>
</b-post>
