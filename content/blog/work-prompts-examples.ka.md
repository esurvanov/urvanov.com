---
title: პრომპტები სამუშაო ამოცანებისთვის: ხუთი ნაწილი და ექვსი მაგალითი ChatGPT-სა და Claude-ისთვის
date: 2026-09-28
updated: 2026-11-08
description: პრომპტები AI ჩატთან სამუშაოდ: კარგი სამუშაო პრომპტის ნაწილები, როგორ გამოიყურება სუსტი და ძლიერი თხოვნა, ექვსი მზა შაბლონი გავრცელებული ამოცანებისთვის და როგორ შევინახოთ ისინი პროექტში, Anthropic-ის, OpenAI-სა და Google-ის სახელმძღვანელოების მიხედვით.
tags: AI, პრომპტები, ChatGPT, Claude
category: prompts
layout: wide
toc: model=ადამიანი ციკლში | parts=ხუთი ნაწილი | examples=ექვსი მაგალითი | learn=რა ვისწავლოთ | faq=კითხვები | next=დამატებითი საკითხავი
---

სამუშაო პრომპტი ChatGPT-სა და Claude-ისთვის ხუთი ნაწილისგან შედგება: როლი, ვისთვისაა პასუხი და რისთვის, სრული მონაცემები, მაგალითი და ფორმატი, კითხვა კი ბოლოშია. მოდელმა მხოლოდ ის იცის, რაც თხოვნაში წერია. შემოწმება მარტივია: აჩვენეთ პრომპტი კონტექსტის არმცოდნე კოლეგას და თუ ის დაიბნა, მოდელიც დაიბნევა. ქვემოთ სუსტი და ძლიერი თხოვნაა და ექვსი შაბლონი გავრცელებული ამოცანებისთვის.

<b-post series="prompts">
<b-flow lead label="ერთი თხოვნა, ორი შედეგი">
  <b-lane title="ერთი წინადადება" color="muted">
    <node icon="chat" t="თხოვნა">„დაწერე პასუხი მომხმარებელს“</node>
    <node icon="ai-box" t="მოდელი">კონტექსტს ხვდება</node>
    <node icon="file-x" t="ზოგადი პასუხი">ხელით გადასაწერია</node>
  </b-lane>
  <b-lane title="ექვსი ნაწილი" color="accent">
    <node icon="prompt-stripes" t="პრომპტი">როლი, მონაცემები, მაგალითი, ფორმატი</node>
    <node icon="ai-box" t="მოდელი">ხედავს ყველაფერს, რაც სჭირდება</node>
    <node icon="file-check" t="მონახაზი">მცირე შესწორებები</node>
  </b-lane>
</b-flow>
<b-cap>ორივე შემთხვევაში მოდელი ერთია. შედეგი იმაზეა დამოკიდებული, რას ამბობს პრომპტი: ექვსი ნაწილი, რომლებიც მეორდება Anthropic-ის, OpenAI-სა და Google-ის სახელმძღვანელოებში.</b-cap>
<b-chapter id="model" title="ადამიანი ციკლში (human-in-the-loop): ერთი თხოვნის გზა" icon="share">
  <b-art names="work-prompts-examples/prompt-map" wide/>
  <b-finding>
    <ex>ადამიანს უჭირავს ყველა საკვანძო წერტილი: სვამს ამოცანას, აგებს პრომპტს, ამოწმებს პასუხს, აბრუნებს დასაზუსტებლად და იღებს გადაწყვეტილებას. მოდელი მხოლოდ იმას პასუხობს, რაც თხოვნაში მოხვდა.</ex>
    <gen>ყოველ ისარს თავისი საკონტროლო წერტილი აქვს: მონაცემები სრულად შედის, პასუხი მისი მომხმარებლის მიხედვით მოწმდება, კარგი თხოვნა კი შაბლონად ინახება, რომ იმავე სახის შემდეგი ამოცანა მისგან დაიწყოს.</gen>
    <do>თხოვნის დაწერამდე დაასახელეთ მკითხველი და გადაწყვეტილება, რომელსაც პასუხიდან მიიღებს: როლი და ფორმატი აქედან გამომდინარეობს.</do>
  </b-finding>
  <b-cta href="/blog/harness-driven-development/" k="შემდეგი ნაბიჯი · HDD" t="Harness-Driven Development">როგორ გადავაქციოთ ამ სქემაში არსებული შემოწმება წესად, რომელიც ყოველ მომდევნო ამოცანაზე მუშაობს</b-cta>
</b-chapter>
<b-chapter id="parts" title="პრომპტის ხუთი ნაწილი" icon="grid">
  <b-prompt-anatomy label="პრომპტის ანატომია: როლი, აუდიტორია და მიზანი, მთელი მონაცემები ტეგებში, მაგალითი, ფორმატი, კითხვა ბოლოს" order="order">
    <part kind="role" icon="user-round" t="როლი" tip="როლი: „შენ ხარ მხარდაჭერის აგენტი“. ერთი წინადადება ადგენს ტონსა და დონეს"><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Setting a role in the system prompt focuses Claude&#39;s behavior and tone for your use case. Even a single sentence makes a difference” — platform.claude.com, Prompting best practices"/></part>
    <part kind="who" icon="target" t="აუდიტორია და მიზანი" tip="ვისთვის და რისთვის: ვინ კითხულობს შედეგს და რა გადაწყვეტილებას ემსახურება"><b-proof href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" quote="OpenAI Academy: “Be clear about what you need ChatGPT to do. Outline what you want, who it&#39;s for, and why it matters” — academy.openai.com, Prompting"/><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Providing context or motivation behind your instructions, such as explaining to Claude why such behavior is important, can help Claude better understand your goals and deliver more targeted responses” — platform.claude.com, Prompting best practices"/></part>
    <part kind="data" icon="file-text" t="მთელი მონაცემები" tip="სრული მონაცემები: ჩაწებეთ ნაკადი, დოკუმენტი ან ცხრილი სრულად. გრძელი შესატანი ზევით, კითხვა ბოლოს" tag="data"><b-proof href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" quote="OpenAI Academy: “Add any background (or documentation) that will help” — academy.openai.com, Prompting"/><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Place your long documents and inputs near the top of your prompt, above your query, instructions, and examples”; “Queries at the end can improve response quality by up to 30 percent in tests” — platform.claude.com, Prompting best practices"/></part>
    <part kind="ex" icon="card-text" t="მაგალითი" tip="მაგალითი: ერთიდან სამ ნიმუშამდე სასურველი ტონისა ან ფორმატის" tag="example" note="1–3"><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Include 3–5 examples for best results” — platform.claude.com, Prompting best practices"/><b-proof href="https://www.kaggle.com/whitepaper-prompt-engineering" quote="Google, Prompt Engineering: its best practices include providing examples, being specific about the output and using instructions over constraints. Paraphrased — kaggle.com/whitepaper-prompt-engineering"/></part>
    <part kind="fmt" icon="list-dots" t="ფორმატი" tip="ფორმატი: „5 პუნქტი, თითო ხაზზე“. თქვით, რა გააკეთოს, აკრძალვების ჩამოთვლის ნაცვლად" note="5 პუნქტი"><b-proof href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" quote="OpenAI Academy: “Tell ChatGPT how you&#39;d like the response” — academy.openai.com, Prompting"/><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Tell Claude what to do instead of what not to do” — platform.claude.com, Prompting best practices"/></part>
    <part kind="q" icon="help" t="კითხვა ბოლოს" tip="ჩაწებეთ ნაკადი, დოკუმენტი ან ცხრილი სრულად. გრძელი შესატანი ზევით, კითხვა ბოლოს"></part>
    <tags t="ტეგები" tip="ნაწილების ტეგები: &lt;thread&gt;…&lt;/thread&gt; მონაცემებს ინსტრუქციისგან განცალკევებულად ინახავს"><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Wrapping each type of content in its own tag (for example, &lt;instructions&gt;, &lt;context&gt;, &lt;input&gt;) reduces misinterpretation” — platform.claude.com, Prompting best practices"/></tags>
  </b-prompt-anatomy>
  <b-finding>
    <ex>ხუთი ნაწილი და ტეგები, თითოეული ოფიციალური სახელმძღვანელოთი დადასტურებული.</ex>
    <gen>მოდელმა მხოლოდ ის იცის, რასაც პრომპტი ამბობს. Anthropic ტესტს სთავაზობს: აჩვენეთ პრომპტი კონტექსტის არმცოდნე კოლეგას; თუ ის დაიბნა, მოდელიც დაიბნევა<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they&#39;d be confused, Claude will be too” — platform.claude.com, Prompting best practices"/>.</gen>
    <do>გახსენით თქვენი ბოლო პრომპტი და მონიშნეთ, ხუთიდან რომელი ნაწილი აკლია. დაამატეთ როლი და ფორმატი: ორი წინადადება.</do>
  </b-finding>
</b-chapter>
<b-chapter id="examples" title="ექვსი მაგალითი" icon="browser-tab">
  <b-prompt-tabs name="ex-en">
    <b-prompt-tab id="client" icon="chat" label="პასუხი მომხმარებელს" title="პასუხი მომხმარებელთან მიმოწერაში">
      <b-why>მომხმარებელი მესამედ წერს; ტონი მშვიდი უნდა დარჩეს და დაპირება მხოლოდ იმის შეიძლება, რაც მიმოწერაში უკვე წერია.</b-why>
      <b-prompt-parts>
        <part icon="user-alt">როლი</part>
        <part icon="help-circle" off>ვისთვის და რისთვის</part>
        <part icon="file-text">სრული მონაცემები</part>
        <part icon="checklist">მაგალითი</part>
        <part icon="lines-alt">ფორმატი</part>
      </b-prompt-parts>
      <b-prompt>
        შენ ხარ [კომპანიის] მხარდაჭერის აგენტი.
        ქვემოთ მომხმარებელთან მთელი მიმოწერაა.
        &lt;thread&gt;
        [ჩაწებეთ სრულად]
        &lt;/thread&gt;
        დაწერე შემდეგი პასუხი. ტონი: მშვიდი და მეგობრული, როგორც ამ მაგალითში:
        &lt;example&gt;
        [ერთი კარგი ძველი პასუხი]
        &lt;/example&gt;
        არაუმეტეს 5 წინადადებისა. თარიღები დაასახელე მხოლოდ იმ შემთხვევაში, თუ ისინი მიმოწერაში გვხვდება.
      </b-prompt>
      <b-finding>
        <ex>როლი, მიმოწერა ტეგებში, ტონის ნიმუში და ფორმატის ორი წესი.</ex>
        <gen>ძველი პასუხი ტონს ნებისმიერ ზედსართავზე უკეთ ადგენს. თარიღების წესი ნებართვის სახითაა ჩამოყალიბებული პირობით და მოდელი მას სიტყვასიტყვით იცავს.</gen>
        <do>შეინახეთ გუნდის ორი-სამი საუკეთესო პასუხი და ერთი ჩაუდეთ მაგალითის ბლოკში.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="meeting" icon="calendar" label="შეხვედრისთვის მომზადება" title="შეხვედრისთვის მზადება">
      <b-why>ხვალ 30-წუთიანი შეხვედრაა; მასალები მიმოწერებსა და დოკუმენტებშია მიმოფანტული.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>როლი</part>
        <part icon="help-circle">ვისთვის და რისთვის</part>
        <part icon="file-text">სრული მონაცემები</part>
        <part icon="checklist" off>მაგალითი</part>
        <part icon="lines-alt">ფორმატი</part>
      </b-prompt-parts>
      <b-prompt>
        ხვალ ვხვდები [ვის] თემაზე [თემა], 30 წუთი. ჩემი მიზანია [გადაწყვეტილება, რომელიც მჭირდება].
        &lt;materials&gt;
        [მიმოწერები და დოკუმენტები]
        &lt;/materials&gt;
        მოამზადე:
        1. სამი კითხვა, რომელიც შეხვედრაზე უნდა გადაწყდეს.
        2. თითოეულისთვის, რას ამბობს მასალები უკვე, მოკლე ციტატით.
        3. რა უნდა გავარკვიო შეხვედრამდე.
        ფორმატი: სამსვეტიანი ცხრილი.
      </b-prompt>
      <b-cap>OpenAI Academy-ს აქვს დღის წესრიგის შაბლონი დროის შეფასებებით<b-proof href="https://academy.openai.com/public/resources/chatgpt-for-any-role" quote="OpenAI Academy, ChatGPT for any role: “Create a structured agenda for a meeting about [topic]. Break the agenda into sections with time estimates and goals for each section” — academy.openai.com"/>.</b-cap>
      <b-finding>
        <ex>შეხვედრის მიზანი, მასალები ტეგებში და დასაბრუნებლის დანომრილი სია.</ex>
        <gen>შეხვედრის მიზანი მასალებს ფილტრავს. დანომრილი ნაბიჯები ეხმარება, როცა თანმიმდევრობა და სისრულე მნიშვნელოვანია<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they&#39;d be confused, Claude will be too” — platform.claude.com, Prompting best practices"/>.</gen>
        <do>30 წუთიან ან უფრო გრძელ ყოველ შეხვედრამდე გაატარეთ მასალები ამ პრომპტში და დაიწყეთ მისი ცხრილით.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="summary" icon="summary-lines" label="ნაკადის შეჯამება" title="გრძელი ნაკადის შეჯამება">
      <b-why>ჩატი 200 შეტყობინებით; უნდა გაიგოთ, რა გადაწყდა და ვინ რას აკეთებს.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>როლი</part>
        <part icon="help-circle" off>ვისთვის და რისთვის</part>
        <part icon="file-text">სრული მონაცემები</part>
        <part icon="checklist" off>მაგალითი</part>
        <part icon="lines-alt">ფორმატი</part>
      </b-prompt-parts>
      <b-prompt>
        &lt;thread&gt;
        [ჩაწებეთ სრულად]
        &lt;/thread&gt;
        ჯერ დააკოპირე ზუსტი ციტატები, სადაც გადაწყვეტილებები მიიღება ან ამოცანები ნაწილდება.
        შემდეგ ამ ციტატებზე დაყრდნობით შეადგინე შეჯამება:
        — გადაწყვეტილებები;
        — ამოცანები პასუხისმგებლებითა და თარიღებით;
        — ღია კითხვები.
        ერთი ხაზი ერთ პუნქტზე. თუ ციტატაში პასუხისმგებელი არ არის დასახელებული, დაწერე „არავისზეა მიმაგრებული“.
      </b-prompt>
      <b-finding>
        <ex>გრძელი ნაკადი ზევითაა, ამოცანა ბოლოში, ჯერ ციტატები, მერე შეჯამება.</ex>
        <gen>გრძელი დოკუმენტებისთვის Anthropic ჯერ ციტატების მოთხოვნას ურჩევს<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “For long document tasks, ask Claude to quote relevant parts of the documents first before carrying out its task” — platform.claude.com, Prompting best practices"/> და კითხვის მონაცემების შემდეგ განთავსებას: ტესტებში ამან ხარისხი 30%-მდე გააუმჯობესა<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Place your long documents and inputs near the top of your prompt, above your query, instructions, and examples”; “Queries at the end can improve response quality by up to 30 percent in tests” — platform.claude.com, Prompting best practices"/>. წესი „არავისზეა მიმაგრებული“ მოდელს პასუხისმგებლის გამოგონებას უშლის.</gen>
        <do>ერთ ეკრანზე გრძელი ნებისმიერი ნაკადისთვის დაიწყეთ ციტატების მოთხოვნით.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="table" icon="table" label="ცხრილის ანალიზი" title="ცხრილის ანალიზი">
      <b-why>ტიკეტების თვიური ექსპორტი CSV-ში; უნდა გაიგოთ, რა შეიცვალა.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>როლი</part>
        <part icon="help-circle" off>ვისთვის და რისთვის</part>
        <part icon="file-text">სრული მონაცემები</part>
        <part icon="checklist" off>მაგალითი</part>
        <part icon="lines-alt">ფორმატი</part>
      </b-prompt-parts>
      <b-prompt>
        თან ერთვის [ტიკეტების] ექსპორტი [პერიოდისთვის], CSV.
        დათვალე [ტიკეტები] [თემის] მიხედვით და აჩვენე 5 უდიდესი ცვლილება წინა თვესთან შედარებით.
        თითოეულისთვის რიცხვი და ერთი ხაზი იმაზე, რა შეიძლება ხსნიდეს მას.
        აჩვენე კოდი, რომელიც გამოიყენე, რომ შევამოწმო.
      </b-prompt>
      <b-cap>ChatGPT-ც და Claude-ც ფაილს იზოლირებულ სენდბოქსში (sandbox) ამუშავებენ<b-proof href="https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt" quote="ChatGPT: for data analysis it writes and runs Python in an isolated environment; review the code, output and assumptions before relying on the result. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/8437071"/><b-proof href="https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude" quote="Claude: “When Claude executes code or creates files, it operates within an isolated, sandboxed container” — support.claude.com/en/articles/12111783"/>.</b-cap>
      <b-finding>
        <ex>მთელი ფაილი, ზუსტი მეტრიკა და დაყოფა, ლიმიტი „ტოპ 5“ და კოდის მოთხოვნა.</ex>
        <gen>მოდელი სენდბოქსში კოდით ითვლის და კოდის ხელახლა წაკითხვა შეიძლება. OpenAI ურჩევს, შედეგზე დაყრდნობამდე შემოწმდეს კოდი, გამოტანა და დაშვებები.</gen>
        <do>პასუხიდან ერთი რიცხვი ხელით შეამოწმეთ. თუ ემთხვევა, დანარჩენს მეტად ენდეთ.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="style" icon="pen" label="კომპანიის ხმა" title="ტექსტი კომპანიის ხმით">
      <b-why>გჭირდებათ პოსტი ან წერილი, რომელიც გუნდივით ჟღერს და არა შაბლონივით.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>როლი</part>
        <part icon="help-circle">ვისთვის და რისთვის</part>
        <part icon="file-text" off>სრული მონაცემები</part>
        <part icon="checklist">მაგალითი</part>
        <part icon="lines-alt">ფორმატი</part>
      </b-prompt-parts>
      <b-prompt>
        აი სამი კარგად მიღებული პოსტი:
        &lt;example&gt;[პოსტი 1]&lt;/example&gt;
        &lt;example&gt;[პოსტი 2]&lt;/example&gt;
        &lt;example&gt;[პოსტი 3]&lt;/example&gt;
        დაწერე პოსტი თემაზე [თემა] იმავე სტილით: სიგრძე, ტონი და სტრუქტურა როგორც მაგალითებში.
        ვისთვის: [აუდიტორია]. რისთვის: [რა უნდა გააკეთოს მკითხველმა].
      </b-prompt>
      <b-finding>
        <ex>სამი მაგალითი ტეგებში და ერთი ხაზი იმაზე, ვისთვისაა და რისთვის.</ex>
        <gen>Anthropic 3–5 მაგალითს ურჩევს<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Include 3–5 examples for best results” — platform.claude.com, Prompting best practices"/>; Google-ის სახელმძღვანელოშიც მაგალითები პირველ პრაქტიკად არის დასახელებული<b-proof href="https://www.kaggle.com/whitepaper-prompt-engineering" quote="Google, Prompt Engineering: its best practices include providing examples, being specific about the output and using instructions over constraints. Paraphrased — kaggle.com/whitepaper-prompt-engineering"/>. მაგალითებით ნაჩვენები სტილი უფრო ზუსტად კოპირდება, ვიდრე სიტყვებით აღწერილი.</gen>
        <do>კარგი ტექსტები პროექტში ჩადეთ და მაგალითებად გამოიყენეთ, რომ ყოველ ჯერზე არ ჩაწებოთ.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="research" icon="search" label="კვლევა" title="თემის კვლევა">
      <b-why>გჭირდებათ ბაზრის ან პრაქტიკის მიმოხილვა წყაროებით, ხელით ძიების ნახევარი დღე.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>როლი</part>
        <part icon="help-circle">ვისთვის და რისთვის</part>
        <part icon="file-text" off>სრული მონაცემები</part>
        <part icon="checklist" off>მაგალითი</part>
        <part icon="lines-alt">ფორმატი</part>
      </b-prompt-parts>
      <b-prompt>
        კვლევა: [კითხვა].
        ვისთვის: [აუდიტორია]. რისთვის: [მისაღები გადაწყვეტილება].
        მონაცემები არაუძველეს [წლისა].
        შედეგი: ცხრილი [სვეტები] და დასკვნა 5 პუნქტად.
        ყოველ ფაქტზე წყაროს ბმული. თუ მონაცემები არ არის, თქვი ეს.
      </b-prompt>
      <b-cap>ორივე ჩატს აქვს ღრმა კვლევის რეჟიმი: deep research ChatGPT-ში და Research Claude-ში<b-proof href="https://help.openai.com/en/articles/10500283-deep-research-in-chatgpt" quote="ChatGPT: deep research gathers and synthesises information from the web into a report, takes 5 to 30 minutes and includes source links. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/10500283"/><b-proof href="https://support.claude.com/en/articles/11088861-use-research-on-claude" quote="Claude: Research is “conducting multiple searches that build on each other”, answers come “complete with easy-to-check citations”; “available for users with paid Claude plans (Pro, Max, Team, or Enterprise)” — support.claude.com/en/articles/11088861"/>.</b-cap>
      <b-finding>
        <ex>მიზანი, სიახლის ლიმიტი და გამოტანის ფორმატი ბმულებით.</ex>
        <gen>კვლევის რეჟიმში მოდელი ძიებების სერიას ატარებს და ბმულებიან ანგარიშს აბრუნებს. ბმულები ყოველი ფაქტის შემოწმების საშუალებას გაძლევთ, „თუ მონაცემები არ არის“ კი ხვრელების ვარაუდებით შევსებას უშლის.</gen>
        <do>გახსენით ანგარიშიდან ორი-სამი ბმული და დასკვნის გადაცემამდე შეამოწმეთ ფაქტი წყაროსთან.</do>
      </b-finding>
    </b-prompt-tab>
  </b-prompt-tabs>
</b-chapter>
<b-chapter id="learn" title="რა ვისწავლოთ შემდეგ" icon="flag-alt">
  <b-why>დაიწყეთ 7-წუთიანი ტუტორიალით: ის ხსნის, რატომ მუშაობს ამ სტატიის ხერხები. შემდეგ პრომპტინგის სახელმძღვანელოები, დროის არსებობისას კი კურსები.</b-why>
  <b-sublabel top="22">საფუძვლები: როგორ მუშაობს AI</b-sublabel>
  <b-links cols="2">
    <item href="https://academy.claude.com/tutorials/the-4-properties-of-ai" k="Claude Academy · ტუტორიალი, 7 წუთი" t="AI-ის 4 თვისება" ext>შემდეგი ტოკენის პროგნოზი, ცოდნა, სამუშაო მეხსიერება, მართვადობა: საიდან მოდის მოდელის ძლიერი და სუსტი მხარეები</item>
    <item href="https://academy.claude.com/courses/ai-capabilities-and-limitations" k="Claude Academy · კურსი, 13 გაკვეთილი, 3,5 საათი" t="AI-ის შესაძლებლობები და შეზღუდვები" ext>რატომ იგონებს მოდელი თავდაჯერებულად, სად ილევა კონტექსტი და რომელი ინსტრუქციებია საიმედო</item>
    <item href="https://academy.claude.com/courses/ai-fluency-framework-foundations" k="Claude Academy · კურსი, 14 გაკვეთილი, 4 საათი" t="AI Fluency: Framework & Foundations" ext>ოთხი უნარი: რა გადავცეთ, როგორ აღვწეროთ ამოცანა, როგორ შევამოწმოთ შედეგი და ვის ეკუთვნის ის</item>
  </b-links>
  <b-sublabel top="22">პრომპტინგი</b-sublabel>
  <b-links cols="2">
    <item href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" k="Anthropic · დოკუმენტაცია" t="Prompting best practices" ext>მთავარი წყარო: სიცხადე, მაგალითები, როლი, XML ტეგები, გრძელი დოკუმენტები</item>
    <item href="https://claude.com/blog/best-practices-for-prompt-engineering" k="Anthropic · ბლოგი" t="Best practices for prompt engineering" ext>პრომპტინგის ზოგადი ხელობა კონკრეტული მოდელის მიღმა</item>
    <item href="https://github.com/anthropics/prompt-eng-interactive-tutorial" k="Anthropic · ტუტორიალი" t="ინტერაქტიული ტუტორიალი" ext>9 თავი სავარჯიშოებით, პრომპტის სტრუქტურიდან XML ტეგებამდე და მაგალითებამდე</item>
    <item href="https://www.kaggle.com/whitepaper-prompt-engineering" k="Google · whitepaper" t="Prompt Engineering" ext>ხერხები და საუკეთესო პრაქტიკა: მაგალითები, გამოტანის ფორმატი, ინსტრუქციები შეზღუდვების ნაცვლად</item>
    <item href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" k="OpenAI Academy" t="Prompting" ext>რა, ვისთვის და რისთვის, კონტექსტი, გამოტანის ფორმატი, იტერაცია</item>
    <item href="https://academy.openai.com/public/resources/chatgpt-for-any-role" k="OpenAI Academy" t="ChatGPT for any role" ext>სამუშაო პრომპტების მზა შაბლონები ამოცანისა და როლის მიხედვით</item>
  </b-links>
  <b-sublabel top="22">გუნდებისა და ადმინისტრატორებისთვის</b-sublabel>
  <b-links cols="2">
    <item href="https://support.claude.com/en/articles/14782391-claude-enterprise-consumption-guide" k="Claude · დახმარების ცენტრი" t="Claude Enterprise consumption guide" ext>როგორ იხარჯება ტოკენები: Claude Code და Cowork ჩვეულებრივ ჩატზე გაცილებით მეტს ხარჯავს; ჯგუფური ლიმიტები და ნაგულისხმევი მოდელი</item>
  </b-links>
</b-chapter>
<b-chapter id="faq" icon="chat" title="ხშირად დასმული კითხვები">
  <b-faq-cards>
    <q t="რისგან შედგება კარგი პრომპტი?">ხუთი ნაწილისგან: როლი, ვისთვისაა პასუხი და რისთვის, სრული მონაცემები, მაგალითი და ფორმატი. კითხვა ბოლოში მიდის.</q>
    <q t="როგორ შევამოწმოთ პრომპტი?">აჩვენეთ კონტექსტის არმცოდნე კოლეგას: თუ ის დაიბნა, მოდელიც დაიბნევა.</q>
    <q t="რისთვის სჭირდება პრომპტს მაგალითი?">ძველი პასუხის მაგალითი ტონს ნებისმიერ ზედსართავზე უფრო ზუსტად ადგენს.</q>
    <q t="რა ვუყოთ კარგ პრომპტს?">შეინახეთ შაბლონად: იმავე სახის შემდეგი ამოცანა მისგან დაიწყება.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="დამატებითი საკითხავი">
  <b-links cols="2">
    <item href="/blog/harness-work-approaches/" k="მიდგომები" t="თუ პასუხი გაცდა სამიზნეს">პასუხის ციკლი და რევიუ, რომელიც თხოვნას ასწორებს</item>
    <item href="/blog/specs-rules-skills/" k="კონტექსტი" t="სპეციფიკაციები, bible, წესები და skill-ები">სად ცხოვრობს პრომპტი ერთი ჩატის მიღმა</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="ინჟინერია" t="AI კოდში">harness და ინსტრუმენტების სამი ჯგუფი</item>
    <item href="/blog/chatgpt-enterprise-usage-report/" k="ანგარიში" t="ChatGPT Enterprise-ის გამოყენების ანგარიში">კომპანიაში ვინ რას იყენებს</item>
  </b-links>
</b-chapter>
<b-footer>პრომპტები შაბლონებია: შეავსეთ ის, რაც კვადრატულ ფრჩხილებშია. ხერხები Anthropic-ის, OpenAI-სა და Google-ის ოფიციალურ სახელმძღვანელოებს ემყარება; წყარო თითოეული მტკიცების გვერდით მდებარე ხატულის უკანაა. OpenAI Help Center-ისა და Google-ის სახელმძღვანელოს ციტატები გადმოცემულია თავისუფლად.</b-footer>
</b-post>
