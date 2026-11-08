---
title: რა არის AGENTS.md და CLAUDE.md: ფაილის მაგალითი და სად შევინახოთ სპეციფიკაციები, წესები და skill-ები
date: 2026-09-28
updated: 2026-11-08
description: მუდმივი კონტექსტის ოთხი სახეობა AI-სთვის (AGENTS.md, CLAUDE.md, skill-ები): ამოცანის სპეციფიკაცია, პროექტის ბიბლია, წესები და skill-ები. რა შედის თითოეულში, როდის ხვდება კონტექსტში და რას სთავაზობენ ChatGPT და Claude. ეფუძნება Anthropic-ის, OpenAI-ის, GitHub-ის, Cursor-ისა და Cline-ის დოკუმენტაციას.
tags: AI, Claude Code, CLAUDE.md, harness, სპეციფიკაციები, skill-ები
category: specs
layout: wide
mentions: AGENTS.md, CLAUDE.md, Agent Skills, Spec Kit, Memory Bank
toc: map=ოთხი შრე | spec=სპეციფიკაცია | bible=ბიბლია | rules=წესები | skills=Skill-ები | chat=ჩატში | pick=რა სად ვწეროთ | faq=კითხვები | next=დამატებით წასაკითხი
---

AGENTS.md და CLAUDE.md პროექტის ძირში მდებარე ფაილებია, რომლებშიც AI აგენტისთვის მუდმივი ინსტრუქციებია ჩაწერილი: აწყობისა და ტესტირების ბრძანებები, კოდის სტილი, აკრძალვები. AGENTS.md ღია ფორმატია, რომელსაც Codex, Cursor, Gemini CLI, Copilot და სხვა აგენტები კითხულობენ; CLAUDE.md-ს Claude Code კითხულობს. harness ასეთ ფაილს ყოველი სესიის დასაწყისში ათავსებს. ქვემოთ: ფაილის მაგალითი და სად შევინახოთ სპეციფიკაციები, პროექტის ბიბლია და skill-ები.

<b-post series="prompts">
<b-ctx-layers>
  <layer kind="spec" t="სპეციფიკაცია" when="ერთი ამოცანისთვის">რა უნდა აშენდეს ერთ ამოცანაში</layer>
  <layer kind="bible" t="ბიბლია" when="ამოცანის დასაწყისში">რა არის პროდუქტი</layer>
  <layer kind="rules" t="წესები" when="ყოველ სესიაში">როგორ ვიმუშაოთ პროექტში</layer>
  <layer kind="skill" t="Skill" when="გამოძახებისას">როგორ შევასრულოთ პროცედურა</layer>
</b-ctx-layers>
<b-cap>მოდელს სესიებს შორის პროექტი არ ახსოვს<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Large language models don&#x27;t retain memory between completions. Rules provide persistent, reusable context at the prompt level» — cursor.com/docs/context/rules"/>. ფაილების ოთხი სახეობა ამ კონტექსტს უბრუნებს.</b-cap>
<b-chapter id="map" title="კონტექსტის ოთხი შრე" icon="table-grid">
  <b-ctx-table phone="hide4">
    <table>
    <thead>
      <tr><th>შრე</th><th>რა შედის</th><th>როდის ხვდება კონტექსტში</th><th>ფაილები</th></tr>
    </thead>
    <tbody>
      <tr><td><b-ctx-layer kind="spec">სპეციფიკაცია</b-ctx-layer></td><td>ერთი ამოცანის მოთხოვნები, გეგმა, ნაბიჯები</td><td>ერთი ამოცანისთვის</td><td><code>spec.md · plan.md · tasks.md</code></td></tr>
      <tr><td><b-ctx-layer kind="bible">ბიბლია</b-ctx-layer></td><td>პროდუქტის მიზანი, მომხმარებლები, მიღებული გადაწყვეტილებები</td><td>ამოცანის დასაწყისში</td><td><code>projectbrief.md · productContext.md</code></td></tr>
      <tr><td><b-ctx-layer kind="rules">წესები</b-ctx-layer></td><td>ბრძანებები, სტილი, აკრძალვები</td><td>ყოველ სესიაში</td><td><code>CLAUDE.md · AGENTS.md · .cursor/rules</code></td></tr>
      <tr><td><b-ctx-layer kind="skill">Skill</b-ctx-layer></td><td>პროცედურა მაგალითებითა და სკრიპტებით</td><td>აღწერა ყოველთვის, ტექსტი გამოძახებისას</td><td><code>SKILL.md</code></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-finding>
    <ex>შრეები განსხვავდება სიცოცხლის ხანგრძლივობით და იმით, როდის ხვდება კონტექსტში.</ex>
    <gen>წესები ყოველ სესიაში იტვირთება, ამიტომ მოკლე უნდა იყოს: Anthropic ერთ ფაილზე 200 ხაზზე ნაკლებს ურჩევს<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Size: target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence» — code.claude.com/docs/en/memory"/>. გრძელი და იშვიათად საჭირო შინაარსი skill-ებში გადადის, რომელთა ტექსტი მხოლოდ გამოძახებისას იტვირთება<b-proof href="https://code.claude.com/docs/en/skills" quote="Anthropic: «skill descriptions are loaded into context so Claude knows what&#x27;s available, but full skill content only loads when invoked» — code.claude.com/docs/en/skills"/>.</gen>
    <do>გადახედეთ თქვენს ინსტრუქციების ფაილს: ფაქტები დატოვეთ წესებში, პროცედურები გადაიტანეთ skill-ებში, პროდუქტის აღწერა კი ბიბლიაში.</do>
  </b-finding>
</b-chapter>
<b-chapter id="spec" title="სპეციფიკაცია: ერთი ამოცანა კოდამდე" icon="file-lines">
  <b-why>სპეციფიკაცია ამოცანას სამუშაოს დაწყებამდე აღწერს: ჯერ რა და რატომ, შემდეგ როგორ<b-proof href="https://github.com/github/spec-kit" quote="GitHub Spec Kit: «Define what and why before deciding how to build it. SDD turns your requirements into a specification, a technical plan, and actionable tasks, then guides implementation against those artifacts» — github.com/github/spec-kit"/>.</b-why>
  <b-seq-row>
    <step t="პრინციპები">ერთხელ პროექტზე</step>
    <step t="სპეციფიკაცია">რა და რატომ</step>
    <step t="გეგმა">როგორ</step>
    <step t="ამოცანები">ნაბიჯები</step>
    <step t="რეალიზაცია">კოდი ნაბიჯ-ნაბიჯ</step>
  </b-seq-row>
  <b-cap>GitHub Spec Kit-ის ძირითადი ნაბიჯები<b-proof href="https://github.com/github/spec-kit" quote="GitHub Spec Kit: constitution იქმნება ერთხელ პროექტზე — «Create principles focused on code quality, testing, and maintainability». პერიფრაზი — github.com/github/spec-kit"/>. როგორ დავყოთ დიდი სპეციფიკაცია ნაწილებად: <a href="/blog/specs-by-aggregates/">სპეციფიკაციები აგრეგატების მიხედვით</a></b-cap>
  <b-finding>
    <ex>Spec Kit ამოცანას პროექტის პრინციპებიდან სპეციფიკაციისა და გეგმის გავლით ნაბიჯებამდე და კოდამდე მიჰყავს.</ex>
    <gen>მოთხოვნები კოდამდე იწერება, review კი შედეგს ამ ტექსტს ადარებს. როგორ ჯდება სპეციფიკაცია harness-ში, აღწერილია სტატიაში <a href="/blog/harness-driven-development/#spec">HDD და სპეციფიკაციები</a>.</gen>
    <do>ერთ დღეზე გრძელი ამოცანისთვის დაწერეთ სპეციფიკაცია: რა, რატომ და როგორ გაიგებთ, რომ დასრულებულია.</do>
  </b-finding>
</b-chapter>
<b-chapter id="bible" title="პროექტის ბიბლია: რა არის პროდუქტი" icon="notebook">
  <b-why>ბიბლია პროდუქტის მუდმივი აღწერაა: რატომ არსებობს, ვის ემსახურება, როგორ მუშაობს და რა გადაწყდა. ტერმინი პრაქტიკიდან მოდის; უახლოესი დოკუმენტირებული ანალოგი Cline-ის Memory Bank-ია<b-proof href="https://docs.cline.bot/prompting/cline-memory-bank" quote="Cline: Memory Bank — «a documentation methodology that transforms Cline from a stateless assistant into a persistent development partner. Through structured markdown files, Cline can &#x27;remember&#x27; your project details across sessions» — docs.cline.bot/prompting/cline-memory-bank"/>.</b-why>
  <b-file-grid>
    <file name="projectbrief.md">მიზნები და მოთხოვნები</file>
    <file name="productContext.md">რატომ არსებობს, რას წყვეტს</file>
    <file name="systemPatterns.md">არქიტექტურა და პატერნები</file>
    <file name="techContext.md">სტეკი და შეზღუდვები</file>
    <file name="activeContext.md">მიმდინარე ფოკუსი და შემდეგი ნაბიჯები</file>
    <file name="progress.md">რა მუშაობს, რა დარჩა</file>
  </b-file-grid>
  <b-finding>
    <ex>Memory Bank-ის ექვსი ფაილი: პროდუქტის მიზნიდან მიმდინარე პროგრესამდე.</ex>
    <gen>ბიბლია პასუხობს კითხვებს, რომლებსაც სხვაგვარად ყოველ ახალ ჩატში სვამენ: რა არის პროდუქტი, რა გადაწყვეტილებები მიიღეს, რა მიმდინარეობს. მიმდინარე კონტექსტის ფაილი ყველაზე ხშირად იცვლება<b-proof href="https://docs.cline.bot/prompting/cline-memory-bank" quote="Cline: activeContext.md — მიმდინარე ფოკუსი, ბოლო ცვლილებები და შემდეგი ნაბიჯები, სხვებზე ხშირად ახლდება. პერიფრაზი — docs.cline.bot/prompting/cline-memory-bank"/>.</gen>
    <do>დაიწყეთ ერთი ფაილით: პროდუქტის მიზანი, მომხმარებლები, საკვანძო ტერმინები და ბოლო გადაწყვეტილებები თარიღებით.</do>
  </b-finding>
</b-chapter>
<b-chapter id="rules" title="წესები: ყოველ სესიაში" icon="list-arrow">
  <b-why>წესები ინსტრუქციებია, რომლებსაც harness ყოველი სესიის დასაწყისში ათავსებს<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «CLAUDE.md files are loaded into the context window at the start of every session» — code.claude.com/docs/en/memory"/>.</b-why>
  <b-io justify>
    <item k="CLAUDE.md" mono>Claude Code, გზაზე მიბმული წესები საქაღალდეში <code>.claude/rules/</code><b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Rules can also be scoped to specific file paths, so they only load into context when Claude works with matching files» — code.claude.com/docs/en/memory"/></item>
    <item k="AGENTS.md" mono>„README აგენტებისთვის“: Codex, Cursor, Gemini CLI, Copilot და სხვები<b-proof href="https://agents.md/" quote="agents.md: «Think of AGENTS.md as a README for agents: a dedicated, predictable place to provide the context and instructions to help AI coding agents work on your project» — agents.md"/></item>
    <item k=".cursor/rules" mono>Cursor, გამოყენების ოთხი რეჟიმი<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: ოთხი რეჟიმი — Always Apply, Apply Intelligently, Apply to Specific Files, Apply Manually — cursor.com/docs/context/rules"/></item>
  </b-io>
  <b-why align="left">AGENTS.md-ის მაგალითი ვებ-პროექტისთვის. ფაილში მხოლოდ ის წერია, რისი გაგებაც აგენტს კოდიდან არ შეუძლია: ბრძანებები, სტილი და აკრძალვები. Claude Code-ის CLAUDE.md ანალოგიურად მუშაობს.</b-why>
  <b-codebox title="AGENTS.md-ის მაგალითი">
    # AGENTS.md
    ## Commands
    - Install: npm ci
    - Tests: npm test
    - Type check: npx tsc --noEmit
    ## Style
    - Strict TypeScript, no any
    - kebab-case file names
    ## Don't
    - Don't change migrations/ without a task for it
    - Don't commit .env or keys
    ## Before finishing
    - Run the tests and the type check
  </b-codebox>
  <b-sublabel top="18">როდის ხვდება წესი კონტექსტში · Cursor</b-sublabel>
  <b-rule-modes>
    <mode t="ყოველთვის">ყოველ ჩატში</mode>
    <mode t="აღწერით">აგენტი წყვეტს</mode>
    <mode t="ფაილებით">გზის შაბლონი ემთხვევა</mode>
    <mode t="ხელით">@rule</mode>
  </b-rule-modes>
  <b-metric-line value="≤ 200">ხაზი CLAUDE.md-ის ერთ ფაილში<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Size: target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence» — code.claude.com/docs/en/memory"/></b-metric-line>
  <b-finding>
    <ex>ერთი იდეის სამი ფორმატი: ინსტრუქციების ფაილი, რომელსაც harness დასაწყისში კითხულობს.</ex>
    <gen>წესები კონტექსტად რჩება და მოდელს მათი დარღვევა შეუძლია; მოქმედება, რომელიც არასოდეს უნდა მოხდეს, hook-ით იბლოკება. რაც უფრო კონკრეტული და ლაკონურია წესი, მით უფრო თანმიმდევრულად სრულდება<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Claude treats them as context, not enforced configuration. To block an action regardless of what Claude decides, use a PreToolUse hook instead. The more specific and concise your instructions, the more consistently Claude follows them» — code.claude.com/docs/en/memory"/>.</gen>
    <do>შექმენით AGENTS.md ან CLAUDE.md: აწყობისა და ტესტირების ბრძანებები, კოდის სტილი, აკრძალვები. საქაღალდისთვის სპეციფიკური წესები გადაიტანეთ გზაზე მიბმულ წესებში.</do>
  </b-finding>
</b-chapter>
<b-chapter id="skills" title="Skill-ები: პროცედურა გამოძახებით" icon="zap">
  <b-why>skill არის საქაღალდე SKILL.md ინსტრუქციით, მაგალითებითა და სკრიპტებით განმეორებადი პროცედურისთვის<b-proof href="https://learn.chatgpt.com/docs/build-skills" quote="OpenAI: «ChatGPT and Codex start with each skill&#x27;s name and description, then load the full SKILL.md instructions when they decide to use that skill» — learn.chatgpt.com/docs/build-skills"/>.</b-why>
  <b-skill-pick start="სესიის დასაწყისი" start-note="სახელი + აღწერა" picked="↓ აგენტმა აირჩია „PR review“" call="გამოძახებისას" call-note="სრული ტექსტი" file="SKILL.md" file-note="ინსტრუქციები, მაგალითები, სკრიპტები">
    <skill>report</skill>
    <skill on>PR review</skill>
    <skill>release</skill>
    <skill>client email</skill>
  </b-skill-pick>
  <b-finding>
    <ex>ყველა skill-ის აღწერა ყოველთვის კონტექსტშია; ტექსტი იტვირთება მას შემდეგ, რაც ერთ-ერთი შეირჩევა.</ex>
    <gen>ამიტომ skill-ში გრძელი ცნობარი გამოყენებამდე თითქმის არაფერს ხარჯავს. skill-ის შექმნას აზრი აქვს, როცა ერთსა და იმავე ინსტრუქციას ან ჩეკლისტს ჩატში განმეორებით ათავსებთ, ან როცა წესების რომელიმე განყოფილება პროცედურად გაიზარდა<b-proof href="https://code.claude.com/docs/en/skills" quote="Anthropic: «Create a skill when you keep pasting the same instructions, checklist, or multi-step procedure into chat, or when a section of CLAUDE.md has grown into a procedure rather than a fact. Unlike CLAUDE.md content, a skill&#x27;s body loads only when it&#x27;s used» — code.claude.com/docs/en/skills"/>.</gen>
    <do>იპოვეთ წესების განყოფილება, რომელიც პროცედურას აღწერს, და გადაიტანეთ skill-ში, სადაც ზუსტად იქნება მითითებული, როდის გამოვიყენოთ.</do>
  </b-finding>
</b-chapter>
<b-chapter id="chat" title="იგივე ჩატში: პროექტები და skill-ები" icon="chat">
  <b-io justify>
    <item k="პროექტის ინსტრუქციები" eq="≈ წესები">როლი და ფორმატი ერთხელ, პროექტის ყველა ჩატისთვის<b-proof href="https://help.openai.com/en/articles/10169521-projects-in-chatgpt" quote="ChatGPT: პროექტი ჩატებს, ფაილებსა და ინსტრუქციებს ერთად ინახავს; პროექტის ინსტრუქციები მხოლოდ მის შიგნით მოქმედებს და პროექტი კოლეგებს შეიძლება გაუზიარდეს. პერიფრაზი OpenAI Help Center-იდან — help.openai.com/en/articles/10169521"/><b-proof href="https://support.claude.com/en/articles/9517075-what-are-projects" quote="Claude: “You can define project instructions for each project to further tailor Claude&#39;s responses. For example, instructing Claude to use a more formal tone or answer questions from the perspective of a specific role” — support.claude.com/en/articles/9517075"/></item>
    <item k="პროექტის ფაილები" eq="≈ ბიბლია">პასუხების ნიმუშები, პოლიტიკები და შაბლონები პროექტში ინახება<b-proof href="https://support.claude.com/en/articles/9517075-what-are-projects" quote="Claude: “You can upload relevant documents, text, code, or other files to a project&#39;s knowledge base, which Claude will use to better understand the context” — support.claude.com/en/articles/9517075"/></item>
    <item k="Skill-ები" eq="= skill-ები">განმეორებადი სამუშაო პროცესი ინსტრუქციებითა და მაგალითებით<b-proof href="https://support.claude.com/en/articles/12512180-use-skills-in-claude" quote="Claude: “Skills extend Claude&#39;s capabilities by giving it access to specialized knowledge and workflows” — support.claude.com/en/articles/12512180"/><b-proof href="https://help.openai.com/en/articles/20001066-skills-in-chatgpt" quote="ChatGPT: skill-ები არის მრავალჯერადი სამუშაო პროცესები ინსტრუქციებით, მაგალითებითა და კოდით, Business, Enterprise და Edu გეგმებზე. პერიფრაზი OpenAI Help Center-იდან — help.openai.com/en/articles/20001066"/></item>
  </b-io>
  <b-finding>
    <ex>სამი ადგილი, სადაც პრომპტი ერთ ჩატზე დიდხანს ცოცხლობს: ინსტრუქციები, ფაილები და skill-ები.</ex>
    <gen>პროექტში გადატანილი როლი, მაგალითები და ფორმატი ყოველ ახალ ჩატში კოპირების გარეშე მუშაობს. გაზიარებული პროექტი მთელ გუნდს მაგალითების ერთ ნაკრებს აძლევს.</gen>
    <do>შექმენით პროექტი თქვენი ყველაზე ხშირი ყოველკვირეული ამოცანისთვის და საუკეთესო პრომპტიდან როლი და ფორმატი მის ინსტრუქციებში გადაიტანეთ.</do>
  </b-finding>
</b-chapter>
<b-chapter id="pick" title="რა სად ვწეროთ" icon="crosshair">
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>თუ ეს არის…</th><th>სად</th></tr>
    </thead>
    <tbody>
      <tr><td>ბრძანება, სტილი ან აკრძალვა, რომელიც ყოველ ამოცანაში სჭირდება</td><td><b-ctx-layer kind="rules">წესები</b-ctx-layer></td></tr>
      <tr><td>მრავალნაბიჯიანი პროცედურა, რომელიც დროდადრო სჭირდება</td><td><b-ctx-layer kind="skill">Skill</b-ctx-layer></td></tr>
      <tr><td>ერთი ამოცანის მოთხოვნები</td><td><b-ctx-layer kind="spec">სპეციფიკაცია</b-ctx-layer></td></tr>
      <tr><td>ცოდნა პროდუქტზე და მიღებული გადაწყვეტილებები</td><td><b-ctx-layer kind="bible">ბიბლია</b-ctx-layer></td></tr>
      <tr><td>აგენტის შეცდომა, რომელიც განმეორებით ბრუნდება</td><td><a href="/blog/harness-driven-development/#loop">წესი ან შემოწმება · HDD</a></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-finding>
    <ex>ხუთი სიტუაცია და ხუთი ადგილი.</ex>
    <gen>ადგილს სიხშირე და სიცოცხლის ხანგრძლივობა წყვეტს. რაც ყოველთვის სჭირდება, მოკლედ ინახება; რაც იშვიათად, იმის დეტალურად დაწერა შეიძლება.</gen>
    <do>კვირაში ერთხელ გადახედეთ წესებს: პროცედურები გადაიტანეთ skill-ებში, გადაწყვეტილებები კი თარიღით ბიბლიაში.</do>
  </b-finding>
</b-chapter>
<b-chapter id="faq" icon="chat" title="ხშირად დასმული კითხვები">
  <b-faq-cards>
    <q t="რა არის AGENTS.md და CLAUDE.md?">პროექტის ძირში მდებარე ფაილები AI აგენტისთვის მუდმივი ინსტრუქციებით: აწყობისა და ტესტირების ბრძანებები, კოდის სტილი, აკრძალვები.</q>
    <q t="რომელი აგენტები კითხულობენ AGENTS.md-ს?">Codex, Cursor, Gemini CLI, Copilot და სხვები. Claude Code CLAUDE.md-ს კითხულობს.</q>
    <q t="რა სიგრძის უნდა იყოს CLAUDE.md?">Anthropic ერთ ფაილზე 200 ხაზზე ნაკლებს ურჩევს: წესები ყოველ სესიაში იტვირთება. გრძელი და იშვიათად საჭირო შინაარსი skill-ებში გადადის.</q>
    <q t="რით განსხვავდება წესები skill-ებისგან?">წესებს აგენტი ყოველ სესიაში ხედავს. skill პროცედურაა, რომელსაც აგენტი სრულად მხოლოდ მაშინ ტვირთავს, როცა ამოცანა ემთხვევა.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="დამატებით წასაკითხი">
  <b-links cols="2">
    <item href="/blog/harness-driven-development/" k="მეთოდი" t="Harness-Driven Development">აგენტის შეცდომა → გარემოს წესი</item>
    <item href="/blog/harness-work-approaches/" k="მიდგომები" t="harness-თან მუშაობის მიდგომები">პასუხის ციკლი და review</item>
    <item href="/blog/work-prompts-examples/" k="პრაქტიკა" t="პრომპტები სამუშაო ამოცანებისთვის">ხუთი ნაწილი და ექვსი მაგალითი</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="შედარება" t="harness-ების შედარება">Claude Code, Codex, Cursor, Hermes</item>
  </b-links>
</b-chapter>
<b-footer>ეფუძნება Anthropic-ის, OpenAI-ის, GitHub-ის, Cursor-ისა და Cline-ის დოკუმენტაციას; წყარო თითოეული მტკიცების გვერდით მდებარე ხატულასთანაა. „პროექტის ბიბლია“ პრაქტიკოსების ტერმინია; პერიფრაზები წყაროს მინიშნებაში აღნიშნულია.</b-footer>
</b-post>
