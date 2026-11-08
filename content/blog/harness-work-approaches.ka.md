---
title: harness-თან მუშაობის მიდგომები: პასუხის ციკლი და რევიუ, რომელიც საწყის მოთხოვნას ასწორებს
date: 2026-09-28
updated: 2026-11-08
description: რა უნდა გააკეთოთ, როცა პასუხი ვერ მოხვდა მიზანში: სამი გზა და განმეორებადი ციკლი. როგორ პოულობს რევიუ ხარვეზებს, რატომ ხვდება ისინი საწყის მოთხოვნაში და რატომ სრულდება პაიფლაინი თავიდან. Anthropic-ის, OpenAI-ისა და Google-ის გზამკვლევების მიხედვით.
tags: AI, harness, პრომპტები, რევიუ
category: prompts
layout: wide
toc: iterate=თუ პასუხი ვერ მოხვდა | review=პასუხის რევიუ | faq=კითხვები | next=დამატებით წასაკითხი
---

როცა AI-ის პასუხი ვერ მოხვდა მიზანში, სამი გზა არსებობს: დააზუსტოთ იმავე ჩატში, თავიდან დაწეროთ საწყისი მოთხოვნა ან ჯერ მოდელს სთხოვოთ კითხვების დასმა. როცა რევიუ ხარვეზს პოულობს, ის საწყის მოთხოვნაში შედის და მთელი ციკლი თავიდან სრულდება: შესწორება, ტესტები, რევიუ. მოთხოვნა სრულყოფილი ხდება და შემდეგი მსგავსი ამოცანა მისგან იწყება. ქვემოთ ორივე მიდგომაა აღწერილი Anthropic-ის, OpenAI-ისა და Google-ის გზამკვლევების მიხედვით.

<b-post series="prompts">
<b-flow lead label="ორი მიდგომა: პასუხის ციკლი და რევიუ, რომელიც მოთხოვნას ასწორებს">
  <b-lane title="პასუხი ვერ მოხვდა" color="muted">
    <node icon="x" t="პასუხი">ამოცანას სცდება</node>
    <node icon="refresh" t="სამიდან ერთი გზა">დაზუსტება, თავიდან, კითხვები</node>
    <node icon="ai-box" t="ახალი პასუხი">ისევ მოწმდება</node>
  </b-lane>
  <b-lane title="რევიუმ ხარვეზი იპოვა" color="accent">
    <node icon="file" t="მოთხოვნა v1">საწყისი ამოცანა</node>
    <node icon="search" t="რევიუ">ორი ხარვეზი</node>
    <node icon="check" t="მოთხოვნა v2">და მთელი პაიფლაინი თავიდან</node>
  </b-lane>
</b-flow>
<b-cap>ორივე მიდგომა ნებისმიერ harness-ში მუშაობს: ჩატში, Claude Code-ში, Codex-ში ან Cursor-ში.</b-cap>

<b-chapter id="iterate" icon="refresh" title="თუ პასუხი ვერ მოხვდა">
  <b-art names="harness-work-approaches/answer-paths harness-work-approaches/answer-paths-mobile"/>
  <b-sublabel top="22">გზა 3: სამი კითხვა და ახალი მოთხოვნა</b-sublabel>
  <b-sublabel top="16">ნაბიჯი 1</b-sublabel>
  <b-prompt>
    [task description]
    Before doing the task, ask me 3 questions whose answers would improve the result the most. Do not start the work until I answer.
  </b-prompt>
  <b-sublabel top="12">ნაბიჯი 2</b-sublabel>
  <b-why>უპასუხეთ მოდელის კითხვებს საკუთარი სიტყვებით, იმავე ჩატში.</b-why>
  <b-sublabel top="12">ნაბიჯი 3</b-sublabel>
  <b-prompt>
    Build a final prompt from the task and my answers: role, who and why, data, example, format, question at the end. Output only the prompt text.
  </b-prompt>
  <b-finding>
    <ex>სამი სიტუაცია და თითოეულისთვის ერთი მოქმედება: დაზუსტება იმავე ჩატში, პრომპტის თავიდან დაწერა ან ჯერ მოდელისგან კითხვების მიღება.</ex>
    <gen>
      დაზუსტება ინარჩუნებს უკვე მიცემულ კონტექსტს და მაშინ ვარგა, როცა ამოცანა გასაგები იყო. თუ ამოცანა არასწორად გაიგეს, პრომპტის თავიდან დაწერა უფრო სწრაფია.
      თუ მოდელმა ფაქტები გამოიგონა, ახალ მოთხოვნაში მიეცით საჭირო მონაცემები და ნება დართეთ თქვას „არ ვიცი“<b-proof href="https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations" quote="Anthropic: “Explicitly give Claude permission to admit uncertainty. This simple technique can drastically reduce false information” — platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations"/>.
      ახალი პასუხი იმავე წესით მოწმდება და ციკლი მეორდება, სანამ შედეგი არ მოგერგებათ.
      მოდელის კითხვები გვეხმარება, როცა გაურკვეველია, რა კონტექსტია საჭირო: ორაზროვნება მოდელს არასწორად გაგების სივრცეს უტოვებს<b-proof href="https://claude.com/blog/best-practices-for-prompt-engineering" quote="Anthropic: “Don&#39;t assume the AI reads minds: Be specific about what you want. Leaving things ambiguous gives the AI room to misinterpret” — claude.com/blog/best-practices-for-prompt-engineering"/>,
      ხოლო როცა განზრახვა გაურკვეველია, მოდელები უფრო ხშირად ითხოვენ დაზუსტებას<b-proof href="https://developers.openai.com/api/docs/guides/prompt-guidance" quote="OpenAI: “When the user&#39;s intent is unclear, the model is more likely to ask the user for clarification to proceed”; and “Before asking the user clarifying questions, you should complete the work that is already authorized from context” — developers.openai.com/api/docs/guides/prompt-guidance"/>.
    </gen>
    <do>ახალი ამოცანისთვის, როცა კონტექსტში დარწმუნებული არ ხართ, დაიწყეთ სამი კითხვის მოთხოვნით. პასუხებით აგებული საბოლოო პრომპტი ახალ ჩატში გაგზავნეთ, როგორც ახალი მოთხოვნა.</do>
  </b-finding>
</b-chapter>

<b-chapter id="review" icon="search" title="პასუხის რევიუ: საწყისი მოთხოვნის შესწორება">
  <b-why>გზა „მოთხოვნის თავიდან დაწერა“ მაგალითზე: რევიუმ ხარვეზები იპოვა, საწყისმა მოთხოვნამ დაკარგა ის, რაც არასწორი იყო, და მიიღო ის, რაც აკლდა, შემდეგ კი ყველაფერი თავიდან გაეშვა.</b-why>
  <b-art names="harness-work-approaches/two-runs harness-work-approaches/two-runs-mobile"/>
  <b-finding>
    <ex>რევიუმ ორი შემთხვევა აღმოაჩინა, რომლებიც ამოცანაში არ იყო: საერთაშორისო პრეფიქსი პლუსის გარეშე და ცარიელი სტრიქონი. საწყისი მოთხოვნიდან ზედმეტი შეზღუდვა „მხოლოდ რუსული ნომრები“ ამოიღეს, ორი შემთხვევა დაამატეს და მთელი პაიფლაინი თავიდან გაეშვა.</ex>
    <gen>
      რევიუს მიერ ნაპოვნი ხარვეზი შედის საწყის მოთხოვნაში და ციკლი თავიდან იწყება: აგენტი კოდს თავიდან წერს, ტესტები და რევიუ ახალ შემთხვევებს ამოწმებს, დაზუსტება კი ამოცანაში რჩება მომავალი გაშვებებისთვის.
      ცალკე რევიუს გავლა საკუთარი ინსტრუქციით აღწერილია Google-ის პრომპტინგის გზამკვლევში<b-proof href="https://www.kaggle.com/whitepaper-prompt-engineering" quote="Google, Prompt Engineering whitepaper: the code section, including review and debugging as a separate prompt — kaggle.com/whitepaper-prompt-engineering"/>.
    </gen>
    <do>როცა რევიუ რამეს პოულობს, დაამატეთ ის საწყის მოთხოვნას და მთელი ციკლი თავიდან გაუშვით: ცვლილება, ტესტები, რევიუ.</do>
  </b-finding>
  <b-cta href="/blog/harness-driven-development/" k="შემდეგი ნაბიჯი · HDD" t="Harness-Driven Development">როგორ გადავიტანოთ განმეორებადი ხარვეზი მოთხოვნიდან harness-ის წესებში</b-cta>
</b-chapter>

<b-chapter id="faq" icon="chat" title="ხშირად დასმული კითხვები">
  <b-faq-cards>
    <q t="რა უნდა გააკეთოთ, როცა AI-ის პასუხი ვერ მოხვდა მიზანში?">დააზუსტეთ იმავე ჩატში, თუ ამოცანა გასაგები იყო; თავიდან დაწერეთ მოთხოვნა, თუ ამოცანა არასწორად გაიგეს; ან ჯერ სთხოვეთ მოდელს კითხვების დასმა.</q>
    <q t="რატომ უნდა სთხოვოთ მოდელს კითხვების დასმა?">როცა ამოცანის კონტექსტში დარწმუნებული არ ხართ, მოდელის კითხვები გვიჩვენებს, რა აკლია მას. საბოლოო მოთხოვნა ახალ ჩატში იგზავნება.</q>
    <q t="რა უნდა გააკეთოთ რევიუს მიგნებებთან?">დაამატეთ ისინი საწყის მოთხოვნას და მთელი ციკლი თავიდან გაუშვით: შესწორება, ტესტები, რევიუ.</q>
    <q t="რატომ უნდა შეასწოროთ საწყისი მოთხოვნა?">მაშინ მოთხოვნა სრულყოფილი ხდება და შემდეგი მსგავსი ამოცანა მისგან იწყება.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="დამატებით წასაკითხი">
  <b-links cols="2">
    <item href="/blog/specs-rules-skills/" k="კონტექსტი" t="სპეციფიკაციები, ბიბლია, წესები და skill-ები">რა უნდა იცოდეს აგენტმა პროექტის შესახებ</item>
    <item href="/blog/harness-driven-development/" k="მეთოდი" t="Harness-Driven Development">აგენტის შეცდომა → გარემოს წესი</item>
    <item href="/blog/work-prompts-examples/" k="პრაქტიკა" t="პრომპტები სამუშაო ამოცანებისთვის">ხუთი ნაწილი და ექვსი მაგალითი</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="შედარება" t="harness-ების შედარება">Claude Code, Codex, Cursor, Hermes და ჩატი</item>
  </b-links>
</b-chapter>
<b-footer>ტექნიკები Anthropic-ის, OpenAI-ისა და Google-ის ოფიციალურ გზამკვლევებს ეყრდნობა; წყარო თითოეული მტკიცების გვერდით მდებარე ხატულის უკანაა. Google-ის გზამკვლევიდან ციტატები გადმოცემულია თავისუფლად.</b-footer>
</b-post>
