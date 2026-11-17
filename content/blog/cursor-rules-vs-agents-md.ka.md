---
title: Cursor rules vs AGENTS.md: რა სად უნდა ჩავწეროთ
seoTitle: Cursor rules vs AGENTS.md: რა სად უნდა ჩავწეროთ (2026)
date: 2026-11-15
updated: 2026-11-17
description: Cursor-ის წესები .cursor/rules-ში ინახება და რეჟიმები აქვს; AGENTS.md მარტივი markdown-ია, რომელსაც ბევრი აგენტი კითხულობს. შედარება და გადასვლა.
tags: AI, Cursor, AGENTS.md, წესები, .cursorrules, harness
category: specs
layout: wide
mentions: AGENTS.md, Cursor, CLAUDE.md, Codex
toc: answer=მოკლე პასუხი | table=გვერდიგვერდ | modes=ოთხი რეჟიმი | migrate=გადასვლა | readers=ვინ კითხულობს AGENTS.md-ს | pick=რა სად | faq=კითხვები | next=დამატებით
---

Cursor-ის წესებიც და AGENTS.md-იც აგენტს მუდმივ ინსტრუქციებს აძლევს, განსხვავდებიან გავრცელების არეალით. AGENTS.md არის მარტივი markdown ფაილი პროექტის ძირში, რომელსაც Cursor-ი და ბევრი სხვა აგენტი კითხულობს. .cursor/rules-ის წესები კი .mdc ფაილებია ოთხი გამოყენების რეჟიმით და Cursor-ის საკუთარი ფორმატია. საერთო ინსტრუქციები ჩაწერეთ AGENTS.md-ში, პირობითი კი .mdc-ში.

<b-post series="prompts">
<b-chapter id="answer" title="მოკლე პასუხი" icon="crosshair">
  <b-why>Cursor ერთდროულად ორ ფორმატს იღებს: AGENTS.md მარტივი შემთხვევებისთვის და პროექტის წესები იმის გასაკონტროლებლად, როდის გამოიყენება წესი<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «For more control over when rules apply, use project rules in .cursor/rules/ instead» — cursor.com/help/customization/rules"/>.</b-why>
  <b-finding>
    <ex>AGENTS.md-ში წერია ის, რაც ყველა აგენტმა უნდა იცოდეს; .cursor/rules-ში ის, რაც მხოლოდ Cursor-მა უნდა იცოდეს და მხოლოდ ზოგჯერ.</ex>
    <gen>AGENTS.md-ს არც რეჟიმები აქვს, არც მეტამონაცემები, ამიტომ ნებისმიერ აგენტს შეუძლია მისი წაკითხვა. .mdc წესი რეჟიმებს ამატებს, ამიტომ შეუძლია დაელოდოს, სანამ ფაილის ტიპი ან მოთხოვნა მას არ მოითხოვს.</gen>
    <do>ბრძანებები და აკრძალვები გადაიტანეთ AGENTS.md-ში, ფაილის ტიპის წესები დატოვეთ .cursor/rules-ში, .cursorrules წაშალეთ.</do>
  </b-finding>
</b-chapter>
<b-chapter id="table" title="Cursor rules და AGENTS.md გვერდიგვერდ" icon="table-grid">
  <b-why>ყველა უჯრა Cursor-ის, agents.md-ისა თუ OpenAI-ის დოკუმენტაციიდან მოდის; წყარო ხატულის უკანაა. შემოწმებულია 15.11.2026.</b-why>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th></th><th>AGENTS.md</th><th>.cursor/rules/*.mdc</th></tr>
    </thead>
    <tbody>
      <tr><td>არეალი</td><td>პროექტი; ჩადგმული ფაილი ქვეფოლდერისთვის<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Cursor supports AGENTS.md in the project root and subdirectories» — cursor.com/docs/context/rules"/></td><td>პროექტი, წესებად დაყოფილი; User Rules (თქვენი ყველა პროექტი) და Team Rules (მთელი ორგანიზაცია) ცალკე დონეებია<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: Team Rules → Project Rules → User Rules is the order of precedence; Team Rules are managed from the dashboard — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>ვინ კითხულობს</td><td>Cursor, Codex, Copilot, Windsurf, OpenCode და სხვები<b-proof href="https://agents.md/" quote="agents.md: «A simple, open format for guiding coding agents» — Cursor and Codex are in the list of supporting agents — agents.md"/></td><td>Cursor</td></tr>
      <tr><td>ფაილი და ადგილი</td><td><code>AGENTS.md</code> ძირში და ქვეფოლდერებში; მოქმედებს რედაქტირებულ ფაილთან ყველაზე ახლო ფაილი<b-proof href="https://agents.md/" quote="agents.md: «The closest AGENTS.md to the edited file wins; explicit user chat prompts override everything» — agents.md"/></td><td><code>.cursor/rules/</code>, თითო ფაილი თითო წესზე; წესები შეიძლება ფოლდერებში იდოს<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Stored in .cursor/rules, version-controlled and scoped to your codebase» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>ფორმატი</td><td>მარტივი markdown, სავალდებულო ველების გარეშე<b-proof href="https://agents.md/" quote="agents.md: «No. AGENTS.md is just standard Markdown» — agents.md"/></td><td>markdown სათაურით <code>description</code>, <code>globs</code>, <code>alwaysApply</code>; გაფართოება უნდა იყოს <code>.mdc</code>, ჩვეულებრივი <code>.md</code> იგნორირდება<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Project rules must use the .mdc extension» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>როდის გამოიყენება</td><td>ავტომატურად აიღება, რეჟიმების გარეშე<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «Write instructions in plain markdown. Cursor picks it up automatically» — cursor.com/help/customization/rules"/></td><td>ოთხი რეჟიმიდან ერთ-ერთი: ყოველთვის, აღწერით, ფაილის შაბლონით, ხელით</td></tr>
      <tr><td>ვერსიონირება</td><td>ფაილი რეპოზიტორიაში, ცვლილებები git-ით გადის</td><td>ინახება რეპოზიტორიაში; დოკუმენტაცია გვირჩევს წესების კომიტს<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Check your rules into git so your whole team benefits» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>ზომა</td><td>Cursor-ის დოკუმენტაცია ციფრს არ ასახელებს; Codex ყველა თავის ინსტრუქციის ფაილს ერთად სტანდარტულად 32 KiB-ით ზღუდავს<b-proof href="https://learn.chatgpt.com/docs/agent-configuration/agents-md" quote="Codex: combined instructions are capped by project_doc_max_bytes, which is 32 KiB by default — learn.chatgpt.com/docs/agent-configuration/agents-md"/></td><td>თითო წესი 500 სტრიქონზე ნაკლები, დიდი წესები იყოფა<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «Keep rules under 500 lines. Split large rules into smaller, focused files» — cursor.com/help/customization/rules"/></td></tr>
      <tr><td>ძველი .cursorrules</td><td colspan="2">ერთი ფაილი ძირში, ორივე ფორმატით ჩანაცვლებული<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «The .cursorrules file in your project root is legacy and will be deprecated» — cursor.com/help/customization/rules"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Cursor CLAUDE.md-საც ყოველთვის ჩართულად თვლის: ის ყველა საუბარში გამოიყენება, <code>alwaysApply</code>-ში რაც უნდა ეწეროს<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «CLAUDE.md files are always applied to every conversation, regardless of any alwaysApply frontmatter setting» — cursor.com/help/customization/rules"/>.</b-cap>
</b-chapter>
<b-chapter id="modes" title="Cursor-ის წესის ოთხი რეჟიმი" icon="list-arrow">
  <b-why>რეჟიმი განსაზღვრავს, როდის ხვდება წესი კონტექსტში. ის წესის სათაურში და წესის ტიპის მენიუში მიეთითება.</b-why>
  <b-rule-modes>
    <mode t="ყოველთვის">ყველა ჩატი</mode>
    <mode t="აღწერით">აგენტი წყვეტს</mode>
    <mode t="ფაილებით">ემთხვევა გზის შაბლონი</mode>
    <mode t="ხელით">@rule</mode>
  </b-rule-modes>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>რეჟიმი Cursor-ში</th><th>რა ააქტიურებს</th><th>სათაურის ველი</th></tr>
    </thead>
    <tbody>
      <tr><td>Always Apply</td><td>ყოველი ჩატ-სესია<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Always Apply — «included in every conversation» — cursor.com/help/customization/rules"/></td><td><code>alwaysApply: true</code>; globs და description მაშინ იგნორირდება<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: when alwaysApply is true the rule is always included, and globs and description are ignored — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Apply Intelligently</td><td>აგენტი წყვეტს აღწერის მიხედვით<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Apply Intelligently — «Agent decides when it's relevant» — cursor.com/help/customization/rules"/></td><td><code>description</code> <code>alwaysApply: false</code>-ით და globs-ის გარეშე</td></tr>
      <tr><td>Apply to Specific Files</td><td>ფაილი შაბლონს ემთხვევა<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Apply to Specific Files — «only applies for files matching a pattern» — cursor.com/help/customization/rules"/></td><td><code>globs</code><b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Use globs to scope a rule to specific files or directories» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Apply Manually</td><td>ჩატში წესს @-ით ახსენებთ<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Apply Manually — «only used when you @mention it in chat» — cursor.com/help/customization/rules"/></td><td>წესი სახელით გამოიძახება, მაგალითად <code>@my-rule</code></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>მესამე მხარის უფრო ძველი გზამკვლევები იმავე ოთხ რეჟიმს Always, Auto Attached, Agent Requested და Manual-ს უწოდებს. Cursor-ის მიმდინარე დოკუმენტაცია ცხრილის სახელებს იყენებს.</b-cap>
</b-chapter>
<b-chapter id="migrate" title="გადასვლა: .cursorrules-დან AGENTS.md-სა და .mdc-ზე" icon="notebook">
  <b-why>მაგალითი პროექტი, დაწერილი ამ სტატიისთვის. ფაილების ფორმატები Cursor-ის დოკუმენტაციას მიჰყვება; პროექტი გამოგონილია.</b-why>
  <b-sublabel top="18">მანამდე: ერთი ფაილი ძირში</b-sublabel>
  <b-codebox title="პროექტის ხე მანამდე">
    my-app/
    ├── .cursorrules
    ├── src/
    └── package.json
  </b-codebox>
  <b-codebox title=".cursorrules">
    You are working on a React + TypeScript app.
    Run `npm test` before finishing a task.
    Format with `npm run lint -- --fix`.
    Never edit files in dist/.
    Never log tokens or user emails.
    Components: function components with hooks, one component per file,
    props typed with an interface named <Name>Props.
    The test file sits next to the component: Button.test.tsx.
    API calls go through src/api/client.ts; validate every response with zod.
  </b-codebox>
  <b-sublabel top="18">ოფიციალური გზა: ოთხი ნაბიჯი</b-sublabel>
  <b-seq-row>
    <step t="შექმენით">წესი ბრძანებების პანელიდან: „New Cursor Rule"</step>
    <step t="დააკოპირეთ">ტექსტი .cursorrules-დან</step>
    <step t="რეჟიმი">Always Apply</step>
    <step t="წაშალეთ">.cursorrules ძირიდან</step>
  </b-seq-row>
  <b-cap>ეს Cursor-ის გზამკვლევის ოთხი ნაბიჯია; Always Apply ძველ ქცევას ინარჩუნებს<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «Set the rule type to Always Apply (this matches the old behavior)» — cursor.com/help/customization/rules"/>. შედეგი ერთი წესია, რომელიც ყოველთვის ჩართულია. პირობით დაყოფა შემდეგი ნაბიჯია.</b-cap>
  <b-sublabel top="18">შემდეგ: საერთო ტექსტი AGENTS.md-ში, პირობითი .mdc-ში</b-sublabel>
  <b-codebox title="პროექტის ხე შემდეგ">
    my-app/
    ├── AGENTS.md
    ├── .cursor/
    │   └── rules/
    │       ├── react-components.mdc
    │       └── api-validation.mdc
    ├── src/
    └── package.json
  </b-codebox>
  <b-codebox title="AGENTS.md" copy>
    # my-app
    React + TypeScript app.

    ## Commands
    - Run `npm test` before finishing a task.
    - Format with `npm run lint -- --fix`.

    ## Bans
    - Never edit files in `dist/`.
    - Never log tokens or user emails.
  </b-codebox>
  <b-codebox title=".cursor/rules/react-components.mdc" copy>
    ---
    description: Standards for React components
    globs: "*.tsx"
    alwaysApply: false
    ---
    - Function components with hooks, one component per file.
    - Props typed with an interface named `<Name>Props`.
    - The test file sits next to the component: `Button.test.tsx`.
  </b-codebox>
  <b-codebox title=".cursor/rules/api-validation.mdc" copy>
    ---
    description: Rules for API calls and response validation
    alwaysApply: false
    ---
    - API calls go through `src/api/client.ts`.
    - Validate every response with zod.
  </b-codebox>
  <b-finding>
    <ex>ერთი ფაილის ცხრა სტრიქონი სამ ფაილად იქცა: ხუთი სტრიქონი, რომელსაც ყველა აგენტი კითხულობს, და ორი წესი, რომელსაც Cursor მხოლოდ მაშინ ტვირთავს, როცა ისინი გამოიყენება.</ex>
    <gen>ბრძანებები და აკრძალვები მთელ პროექტზე ვრცელდება, ამიტომ ისინი ყველა აგენტს სჭირდება. კომპონენტებისა და API-ის წესები კოდის მხოლოდ ნაწილისთვის არის მნიშვნელოვანი: პირველი <code>.tsx</code> ფაილებისთვის, მეორე მაშინ, როცა აგენტი აღწერას შესაფერისად მიიჩნევს.</gen>
    <do>დაყავით ძველი ფაილი ერთი კითხვით: სჭირდება თუ არა ეს სტრიქონი ყველა აგენტს ყველა სესიაში? თუ კი, გადადის AGENTS.md-ში, თუ არა, რეჟიმიან წესში.</do>
  </b-finding>
</b-chapter>
<b-chapter id="readers" title="რომელი აგენტები კითხულობენ AGENTS.md-ს" icon="table-grid">
  <b-why>agents.md-ის საიტი ბევრ მხარდამჭერ აგენტს ჩამოთვლის, მათ შორის Codex, Cursor, Copilot, Windsurf, Gemini CLI, Zed და Warp<b-proof href="https://agents.md/" quote="agents.md: the page lists Codex, Jules, Cursor, Gemini CLI, GitHub Copilot's coding agent, Windsurf and others — agents.md"/>. პირობები აგენტების მიხედვით განსხვავდება: Claude Code AGENTS.md-ს მხოლოდ მაშინ კითხულობს, როცა პროექტში CLAUDE.md არ არის, Gemini CLI კი პარამეტრის შეცვლის შემდეგ.</b-why>
  <b-links cols="1">
    <item href="/blog/specs-rules-skills/#matrix" k="ცხრილი" t="რომელი აგენტი რომელ ფაილს კითხულობს">Claude Code, Codex, Cursor, Copilot, Gemini CLI, Windsurf, OpenCode: AGENTS.md, CLAUDE.md და მათი საკუთარი ფაილები</item>
  </b-links>
</b-chapter>
<b-chapter id="pick" title="რა სად" icon="crosshair">
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>რა</th><th>სად</th><th>რატომ</th></tr>
    </thead>
    <tbody>
      <tr><td>აგების და ტესტირების ბრძანებები</td><td>AGENTS.md</td><td>ყველა აგენტს სჭირდება ყველა სესიაში</td></tr>
      <tr><td>აკრძალვები: <code>dist/</code>-ის რედაქტირების აკრძალვა, საიდუმლოების ლოგებში ჩაწერის აკრძალვა</td><td>AGENTS.md</td><td>მთელ პროექტზე ვრცელდება</td></tr>
      <tr><td>ერთი ტიპის ფაილის სტილი, მაგალითად <code>*.tsx</code></td><td>.mdc, Apply to Specific Files</td><td>იტვირთება მხოლოდ მაშინ, როცა ასეთი ფაილი მუშაობაშია</td></tr>
      <tr><td>თემა, რომელიც დროდადრო სჭირდება: API-ის გამოძახებები, მიგრაციები</td><td>.mdc, Apply Intelligently</td><td>აგენტი აღწერას კითხულობს და წესს თავად იზიდავს</td></tr>
      <tr><td>იშვიათი ჩეკლისტი</td><td>.mdc, Apply Manually</td><td>ჩატში მხოლოდ @-ით ხსენებისას ხვდება</td></tr>
      <tr><td>წესი მთელი ორგანიზაციისთვის</td><td>Team Rules</td><td>იმართება Cursor-ის დაფიდან Team და Enterprise გეგმებზე<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: Team and Enterprise plans can create and enforce rules across their organization from the dashboard — cursor.com/docs/context/rules"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>თითოეული ინსტრუქცია ერთ ადგილას შეინახეთ. AGENTS.md-სა და წესში დაკოპირებული სტრიქონი ორჯერ უნდა გაასწოროთ.</b-cap>
</b-chapter>
<b-chapter id="faq" icon="chat" title="ხშირად დასმული კითხვები">
  <b-faq-cards>
    <q t="კითხულობს თუ არა Cursor AGENTS.md-ს?">დიახ. Cursor AGENTS.md-ს კითხულობს პროექტის ძირშიც და ქვეფოლდერებშიც, როგორც მარტივ markdown-ს მეტამონაცემების გარეშე, და ავტომატურად იღებს. ჩადგმული AGENTS.md-ის ინსტრუქციები მშობელი ფოლდერების ინსტრუქციებს უერთდება და უფრო კონკრეტულები უპირატესია. წყარო: cursor.com/docs/context/rules და cursor.com/help/customization/rules, შემოწმებულია 15.11.2026.</q>
    <q t="კვლავ მჭირდება თუ არა .cursorrules?">არა. Cursor-ის დოკუმენტაცია ძირში მდებარე .cursorrules-ს მოძველებულად (legacy) ასახელებს და გადასვლას აღწერს: შექმენით წესი Always Apply რეჟიმში, დააკოპირეთ ტექსტი, წაშალეთ ფაილი. წყარო: cursor.com/help/customization/rules, შემოწმებულია 15.11.2026.</q>
    <q t="შეიძლება თუ არა AGENTS.md-ისა და .cursor/rules-ის ერთად შენახვა?">დიახ. Cursor მათ ორ ვარიანტად აღწერს: AGENTS.md მარტივი შემთხვევებისთვის, პროექტის წესები იმის გასაკონტროლებლად, როდის გამოიყენება წესი. გონივრული დაყოფაა: საერთო ბრძანებები და აკრძალვები AGENTS.md-ში, პირობიანი წესები .cursor/rules-ში; თითოეული ინსტრუქცია ერთ ადგილას ცხოვრობს. წყარო: cursor.com/help/customization/rules, შემოწმებულია 15.11.2026.</q>
    <q t="რამდენი წესი და რა სიგრძის უნდა იყოს?">Cursor თითო წესისთვის 500 სტრიქონზე ნაკლებს გვირჩევს და დიდი წესების უფრო პატარა, კონკრეტულ ფაილებად დაყოფას. შემოწმებული გვერდები წესების რაოდენობის ზღვარს და AGENTS.md-ის სიგრძეს არ ასახელებს; Codex თავის AGENTS.md ფაილებს ერთად სტანდარტულად 32 KiB-ით ზღუდავს. წყაროები: Cursor-ისა და OpenAI-ის დოკუმენტაცია, შემოწმებულია 15.11.2026.</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="next" title="დამატებით">
  <b-links cols="2">
    <item href="/blog/specs-rules-skills/" k="კონტექსტი" t="AGENTS.md, CLAUDE.md და spec.md: რა სად ჩავწეროთ">ოთხი შრე, აგენტების ცხრილი, რეალური ფაილი</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="შედარება" t="Claude Code, Codex, Cursor და Hermes Agent">რომელი აგენტი რომელი ამოცანისთვის</item>
    <item href="/blog/harness-driven-development/" k="მეთოდი" t="Harness-Driven Development">აგენტის შეცდომა წესად იქცევა</item>
  </b-links>
</b-chapter>
<b-footer>ეფუძნება Cursor-ის, agents.md-ისა და OpenAI-ის დოკუმენტაციას, თითოეული დებულების გვერდით ხატულას უკან წყაროა; შემოწმებულია 15.11.2026. მაგალითი პროექტი გამოგონილია.</b-footer>
</b-post>
