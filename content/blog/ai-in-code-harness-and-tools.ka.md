---
title: Codex და Claude Code, Cursor და Hermes Agent: AI კოდინგ-აგენტების შედარება
date: 2026-09-28
updated: 2026-11-08
description: Claude Code თუ Codex, Cursor თუ Hermes Agent: სად მუშაობს აგენტი, რას ხედავს, რომელი მოდელით ფიქრობს და რა ღირს — ხუთი harness გვერდიგვერდ და რომელი აირჩიოთ ამოცანისთვის. დოკუმენტაციის ბმულებით.
tags: AI, harness, Claude Code, Codex, Cursor, Hermes Agent
category: harness
layout: wide
toc: tasks=რომელი harness რომელი ამოცანისთვის | stable=რა რჩება უცვლელი | harness=რა არის harness | compare=რას ხედავენ და აკეთებენ | faq=კითხვები | next=დამატებით
---

Codex და Claude Code პროექტზე წვდომითა და მოქმედებებით თითქმის ერთნაირია და განსხვავდება მოდელების ოჯახით (Codex-ისთვის GPT, Claude Code-ისთვის Claude) და ტარიფით. ამიტომ აირჩიეთ ის, რომლის მოდელიც და გამოწერაც გუნდს უკვე აქვს. Cursor მაშინ ჯობს, როცა რედაქტორში მუშაობთ და სხვადასხვა მწარმოებლის მოდელები გინდათ, Hermes Agent კი — როცა ნებისმიერი მოდელი გჭირდებათ, ლოკალურიც. ქვემოთ: რუკა, ცხრილი და არჩევანი ამოცანის მიხედვით.

<b-post series="harness">
<b-tool-groups label="ინსტრუმენტების სამი ჯგუფი">
  <group k="მწარმოებლის აგენტები" kind="pair" chips="Claude Code|Codex" swap="თითქმის ექვივალენტურია"></group>
  <group k="ღია კოდის harness-ები" kind="open" chips="Hermes Agent" alts="და ალტერნატივები: OpenCode, Aider, Cline, Goose">იგივე ტიპის harness ნებისმიერი მოდელით, ტოკენების მიხედვით ანაზღაურებადი API-ით ან ლოკალურად, თქვენს კომპიუტერზე</group>
  <group k="AI კოდის რედაქტორი" chip="Cursor">AI-ზე დაფუძნებული IDE, რამდენიმე მწარმოებლის მოდელები</group>
  <group k="AI ასისტენტი ბრაუზერში" kind="chat" chip="ChatGPT, Claude">კოდი სენდბოქსში (sandbox) სრულდება, პროექტზე წვდომის გარეშე</group>
</b-tool-groups>
<b-cap>ტეგი <b-drift sm>snapshot</b-drift> ნიშნავს, რომ ინფორმაცია 2026 წლის სექტემბრის მდგომარეობითაა აქტუალური და ერთ კვირაში შეიძლება მოძველდეს.</b-cap>

<b-chapter id="tasks" icon="venn" title="რომელი harness რომელი ამოცანისთვის">
  <b-why>არჩევანი ამოცანით იწყება. ორი წრე მოდელების ოჯახებია, Claude და GPT: პროდუქტის ადგილი რუკაზე გვიჩვენებს, რომელ მოდელებთან მუშაობს. Claude Code და Codex თითოეული თავის ოჯახზეა მიბმული, Cursor და ჩატი გადაკვეთაში არიან, Hermes Agent კი მთლიანად ფარავს Cursor-სა და ჩატს, ნაწილობრივ ფარავს Claude Code-სა და Codex-ს და ორივე წრის გარეთაც გადის, რადგან ნებისმიერ მოდელს აკავშირებს, ლოკალურსაც<b-proof href="https://hermes-agent.nousresearch.com/docs/integrations/providers" quote="Hermes Agent: local models via Ollama, llama.cpp, vLLM or LM Studio — “Ollama runs open-weight models locally with one command. Best for: quick local experimentation, privacy-sensitive work, offline use” — hermes-agent.nousresearch.com/docs/integrations/providers"/>.</b-why>
  <b-drift>შენიშვნები · snapshot 2026 წლის სექტემბერი</b-drift>
  <b-venn name="ai-in-code-harness-and-tools/venn"/>
  <b-table>
  | ამოცანა | ჯგუფი |
  |---|---|
  | ერთჯერადი კითხვა რეპოზიტორიის გარეშე | ჩატი: ChatGPT ან Claude |
  | ცვლილება გახსნილ პროექტში, რამდენიმე ფაილი | აგენტი რედაქტორში |
  | ამოცანა თავიდან ბოლომდე ნაბიჯ-ნაბიჯ ჩართულობის გარეშე | Claude Code ან Codex |
  | მუშაობა ერთ პროექტში ნაცნობ რედაქტორში, რამდენიმე მწარმოებლის მოდელებით | Cursor |
  | საკუთარი harness ნებისმიერ მოდელზე, ტოკენების მიხედვით ანაზღაურებით | Hermes Agent |
  | პრომპტი საწარმოო გამოყენებისთვის API-ით დიდი შემავალი მონაცემებით | მონაცემები XML ტეგებში |
  </b-table>
  <b-sublabel top="22">ხშირი კითხვები</b-sublabel>
  <b-qa>
    <q t="Claude Code თუ Codex">პროექტზე წვდომითა და მოქმედებებით ისინი ემთხვევა და განსხვავდება მოდელით (Claude და GPT) და ცალკეული შესაძლებლობებით, რომლებიც ვერსიიდან ვერსიამდე იცვლება. არჩევანს განსაზღვრავს მოდელი და ტარიფი, რომელიც გუნდს უკვე აქვს.</q>
    <q t="Cursor თუ Claude Code">Cursor რედაქტორში მუშაობს გახსნილ პროექტთან და სხვადასხვა მწარმოებლის მოდელებს შორის არჩევის საშუალებას გაძლევთ. Claude Code ამოცანას ტერმინალში თავიდან ბოლომდე ასრულებს, მაგრამ მხოლოდ Claude-ის მოდელებზე.</q>
    <q t="Hermes Agent თუ Claude Code">Hermes Agent არის ღია კოდის harness: ის ნებისმიერ მოდელს აკავშირებს, ლოკალურსაც, და ტოკენების მიხედვით იხდით. Claude Code Claude-ის ოჯახსა და გამოწერაზეა მიბმული. Hermes აირჩიეთ რამდენიმე მწარმოებლის მოდელებისთვის ან საკუთარი მოდელისთვის.</q>
    <q t="Claude Code-ის ალტერნატივები">აქ განხილულთაგან: Codex (იგივე კონსტრუქცია, GPT მოდელები), Cursor (რედაქტორი, რამდენიმე მწარმოებლის მოდელები) და Hermes Agent. <a href="https://opencode.ai" target="_blank" rel="noopener">OpenCode</a>, <a href="https://aider.chat" target="_blank" rel="noopener">Aider</a>, <a href="https://cline.bot" target="_blank" rel="noopener">Cline</a> და <a href="https://goose-docs.ai" target="_blank" rel="noopener">Goose</a> მსგავსადაა აგებული.</q>
  </b-qa>
  <b-finding>
    <ex>ამოცანა harness-ს ორ მოთხოვნას უყენებს: სჭირდება თუ არა პროექტი და რომელი მოდელების ოჯახი ერგება. მწარმოებლის აგენტები ერთ ოჯახთან მუშაობს, Cursor და ჩატი Claude-სა და GPT-ს შორის არჩევანს გვთავაზობს, ღია კოდის harness-ები კი ნებისმიერ მოდელს იღებს, ლოკალურსაც.</ex>
    <gen>ჯერ ამოცანის მიხედვით აირჩიეთ ჯგუფი, შემდეგ ჯგუფში პროდუქტი. Claude Code და Codex განსხვავდება მოდელით და ცალკეული შესაძლებლობებით, რომლებიც ვერსიიდან ვერსიამდე იცვლება, მაგრამ კონცეპტუალურად ერთნაირადაა აგებული. ამიტომ გადამწყვეტია მოდელი და ტარიფი, რომელიც გუნდს უკვე აქვს.</gen>
    <do>აღწერეთ ამოცანა ერთ ხაზში და გადაწყვიტეთ სამი პირობა: სჭირდება თუ არა პროექტი, სჭირდება თუ არა ადამიანი ყოველ ნაბიჯზე და სჭირდება თუ არა სხვა მწარმოებლის ან ლოკალური მოდელი. ჯგუფი ამ პირობებით აირჩიეთ.</do>
  </b-finding>
</b-chapter>

<b-chapter id="stable" icon="lock" title="რა რჩება უცვლელი">
  <b-why>Claude Code და Codex მეტოქე პროდუქტებია, რომელთა შესაძლებლობები ყოველ ვერსიაში უახლოვდება ერთმანეთს. მათ შორის სხვაობა მცირეა, ამიტომ სტატია იმას ეყრდნობა, რაც უცვლელი რჩება.</b-why>
  <b-two-lists>
    <list icon="lock" t="სტაბილური" items="მოდელების ოჯახი|როგორაა აგებული harness|აგენტთან მუშაობის გზები"></list>
    <list icon="refresh" t="იცვლება ყოველ კვირას" warn items="შესაძლებლობები და რეჟიმები|ავტონომიის ნაგულისხმევი პარამეტრები|პოზიციონირება|მოდელები, ტარიფები და ლიმიტები"><b-proof href="https://code.claude.com/docs/en/changelog" quote="Claude Code: 8 releases from 17 to 25 September 2026, from 2.1.275 to 2.1.283 — code.claude.com/docs/en/changelog"/><b-proof href="https://learn.chatgpt.com/docs/changelog" quote="Codex: four CLI releases from 22 to 26 September 2026 and the new GPT-6 Sol and Luna models — learn.chatgpt.com/docs/changelog"/></list>
  </b-two-lists>
  <b-finding>
    <ex>17-დან 25 სექტემბრამდე Claude Code-ის რვა ვერსია გამოვიდა; 22-დან 26 სექტემბრამდე Codex-ის ოთხი ვერსია და ახალი GPT-6 მოდელები.</ex>
    <gen>Claude Code-ისა და Codex-ის შესაძლებლობების შედარება უფრო სწრაფად ძველდება, ვიდრე ვინმეს გააზრება მოასწრებს. სამი რამ სტაბილური რჩება: მოდელების ოჯახი, harness-ის აგებულება და აგენტთან მუშაობის გზები.</gen>
    <do>Claude Code-სა და Codex-ს შორის არჩევისას გადაწყვეტილება დაეყრდენით მოდელს და ტარიფს, რომელიც გუნდს უკვე აქვს.</do>
  </b-finding>
</b-chapter>

<b-chapter id="harness" icon="layers" title="რა არის harness">
  <b-why>მოდელი ტექსტით პასუხობს. Harness არის ყველაფერი მის გარშემო: skills, ინსტრუმენტები, გარემო, ადამიანი ციკლში. ყველა AI პროდუქტს აქვს, ტერმინალის აგენტიდან ბრაუზერის ჩატამდე<b-proof href="https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code" quote="Anthropic calls Claude Code a harness: the post “A harness for every task” — claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code"/>. განსხვავება შემადგენლობაშია. სვეტში „API-ით“ მაგალითად Hermes Agent არის აღებული; ღია კოდის harness-ები ბევრია, მაგალითად OpenCode, Aider, Cline და Goose, და ისინი იმავენაირადაა აგებული.</b-why>
  <b-drift>snapshot · 2026 წლის სექტემბერი</b-drift>
  <b-harness-matrix label="Harness-ის ფენები სვეტების მიხედვით" diff="განსხვავდება Enterprise-ისგან" legend="განსხვავდება Enterprise-ისგან|დიახ|ნაწილობრივ">
    <col icon="code-wide" t="API-ით">Hermes Agent · საჯარო API</col>
    <col icon="laptop" t="Enterprise">Claude Code · Codex · კერძო API</col>
    <col icon="cloud" t="ღრუბელი">Claude Code · Codex</col>
    <col icon="chat-box" t="ჩატი">ChatGPT · Claude</col>
    <row t="ადამიანი"/>
    <row t="გარემო"/>
    <row t="ინსტრუმენტები"/>
    <row t="Skills"/>
    <row t="მოდელი"/>
    <cell icon="user-alt" t="გვერდით / ბოლოს"><b-proof href="https://hermes-agent.nousresearch.com/docs/user-guide/security" quote="Hermes Agent: for dangerous commands “the user must explicitly approve it”; sessions without a human use unattended_mode — hermes-agent.nousresearch.com/docs/user-guide/security"/></cell>
    <cell icon="user-alt" t="გვერდით / ბოლოს"><b-proof href="https://code.claude.com/docs/en/permission-modes" quote="Claude Code: “In Manual mode, Claude Code stops and asks you before most actions… In auto mode, a second model, the classifier, reviews actions instead of you” — code.claude.com/docs/en/permission-modes"/><b-proof href="https://learn.chatgpt.com/docs/sandboxing" quote="Codex: “The agent works inside the sandbox by default and asks when it needs to go beyond that boundary” — learn.chatgpt.com/docs/sandboxing"/></cell>
    <cell icon="user-alt" t="გვერდით / ბოლოს"><b-proof href="https://code.claude.com/docs/en/claude-code-on-the-web" quote="Claude Code: “You pick a cloud session's permission mode from the mode dropdown, both when you create the task and while the session runs” — code.claude.com/docs/en/claude-code-on-the-web"/><b-proof href="https://learn.chatgpt.com/docs/cloud" quote="Codex: “Give longer tasks dedicated environments and let them continue while you work on something else” — learn.chatgpt.com/docs/cloud"/></cell>
    <cell icon="user-alt" t="ყოველ ნაბიჯზე" diff></cell>
    <cell icon="rows" t="თქვენი კომპიუტერი"><b-proof href="https://hermes-agent.nousresearch.com/docs/user-guide/security" quote="Hermes Agent: the default backend is “local — runs on host”, commands run on your computer — hermes-agent.nousresearch.com/docs/user-guide/security"/></cell>
    <cell icon="rows" t="თქვენი კომპიუტერი"><b-proof href="https://code.claude.com/docs/en/overview" quote="Claude Code: “Desktop scheduled tasks run on your computer, with direct access to your local files and tools” — code.claude.com/docs/en/overview"/><b-proof href="https://learn.chatgpt.com/docs/codex/cli" quote="Codex: “Codex can inspect files, make edits, and run the tools already installed on your computer” — learn.chatgpt.com/docs/codex/cli"/></cell>
    <cell icon="cloud" t="მწარმოებლის VM" diff part><b-proof href="https://code.claude.com/docs/en/claude-code-on-the-web" quote="Claude Code: “Isolated virtual machines: each session runs in an isolated, Anthropic-managed VM” — code.claude.com/docs/en/claude-code-on-the-web"/><b-proof href="https://learn.chatgpt.com/docs/cloud" quote="Codex: “Run tasks in isolated cloud environments, work in parallel, and start work from the web, GitHub, GitLab, Linear, or Slack” — learn.chatgpt.com/docs/cloud"/></cell>
    <cell icon="rows" t="სენდბოქსი (sandbox)" diff part><b-proof href="https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude" quote="Claude: “When Claude executes code or creates files, it operates within an isolated, sandboxed container” — support.claude.com/en/articles/12111783"/><b-proof href="https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt" quote="ChatGPT: for data analysis it writes and runs Python in an isolated environment with no external requests. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/8437071"/></cell>
    <cell icon="terminal-alt"><b-proof href="https://hermes-agent.nousresearch.com/docs/user-guide/features/overview" quote="Hermes Agent: built-in tools — “web search, terminal execution, file editing, memory, delegation” — hermes-agent.nousresearch.com/docs/user-guide/features/overview"/></cell>
    <cell icon="terminal-alt"><b-proof href="https://code.claude.com/docs/en/overview" quote="Claude Code: “reads your codebase, edits files, runs commands, and integrates with your development tools” — code.claude.com/docs/en/overview"/><b-proof href="https://learn.chatgpt.com/docs/codex/cli" quote="Codex: “Inspect code, make changes, run commands, and automate repeatable work without leaving your terminal” — learn.chatgpt.com/docs/codex/cli"/></cell>
    <cell icon="terminal-alt"><b-proof href="https://code.claude.com/docs/en/overview" quote="Claude Code: “reads your codebase, edits files, runs commands, and integrates with your development tools” — code.claude.com/docs/en/overview"/><b-proof href="https://learn.chatgpt.com/docs/codex/cli" quote="Codex: “Inspect code, make changes, run commands, and automate repeatable work without leaving your terminal” — learn.chatgpt.com/docs/codex/cli"/></cell>
    <cell icon="terminal-alt" t="კონექტორები" diff part><b-proof href="https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities" quote="Claude: “Connectors let Claude access your apps and services, retrieve your data, and take actions within connected services” — support.claude.com/en/articles/11176164"/><b-proof href="https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt" quote="ChatGPT: “An app connects ChatGPT to an external service, such as Google Drive or Slack, so it can access information or perform supported actions” — help.openai.com/en/articles/11487775"/></cell>
    <cell icon="sparkle"><b-proof href="https://hermes-agent.nousresearch.com/docs/user-guide/features/skills" quote="Hermes Agent: skills are “on-demand knowledge documents the agent can load when needed”, following agentskills.io — hermes-agent.nousresearch.com/docs/user-guide/features/skills"/></cell>
    <cell icon="sparkle"><b-proof href="https://code.claude.com/docs/en/overview" quote="Claude Code: “Each surface connects to the same underlying Claude Code engine, so your repo's CLAUDE.md files, settings, and MCP servers work across all of them” — code.claude.com/docs/en/overview"/><b-proof href="https://learn.chatgpt.com/docs/customization/overview" quote="Codex: “AGENTS.md gives Codex durable project guidance that travels with your repository”; “Skills give Codex reusable capabilities for repeatable workflows” — learn.chatgpt.com/docs/customization/overview"/></cell>
    <cell icon="sparkle"><b-proof href="https://code.claude.com/docs/en/overview" quote="Claude Code: “Each surface connects to the same underlying Claude Code engine, so your repo's CLAUDE.md files, settings, and MCP servers work across all of them” — code.claude.com/docs/en/overview"/><b-proof href="https://learn.chatgpt.com/docs/customization/overview" quote="Codex: “AGENTS.md gives Codex durable project guidance that travels with your repository”; “Skills give Codex reusable capabilities for repeatable workflows” — learn.chatgpt.com/docs/customization/overview"/></cell>
    <cell icon="sparkle"><b-proof href="https://support.claude.com/en/articles/12512180-use-skills-in-claude" quote="Claude: “Skills extend Claude's capabilities by giving it access to specialized knowledge and workflows” — support.claude.com/en/articles/12512180"/><b-proof href="https://help.openai.com/en/articles/20001066-skills-in-chatgpt" quote="ChatGPT: skills are reusable workflows with instructions, examples and code, on Business, Enterprise and Edu plans. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/20001066"/></cell>
    <cell icon="circle-dot" t="ნებისმიერი · API $/ტოკენი ან ლოკალური" diff><b-proof href="https://hermes-agent.nousresearch.com/docs/integrations/providers" quote="Hermes Agent: “works with any OpenAI-compatible API endpoint”; with a provider key “requests are billed pay-per-token against that key's organization (standard API pricing)” — hermes-agent.nousresearch.com/docs/integrations/providers"/><b-proof href="https://hermes-agent.nousresearch.com/docs/integrations/providers" quote="Hermes Agent: local models via Ollama, llama.cpp, vLLM or LM Studio — “Ollama runs open-weight models locally with one command. Best for: quick local experimentation, privacy-sensitive work, offline use” — hermes-agent.nousresearch.com/docs/integrations/providers"/></cell>
    <cell icon="circle-dot" t="Claude / GPT · კერძო API, ტარიფი"><b-proof href="https://code.claude.com/docs/en/overview" quote="Claude Code: “Most surfaces require a Claude subscription or Anthropic Console account” — code.claude.com/docs/en/overview"/><b-proof href="https://learn.chatgpt.com/docs/pricing" quote="Codex: “ChatGPT Work and Codex are included in your ChatGPT Free, Go, Plus, Pro, Business, Edu, or Enterprise plan” — learn.chatgpt.com/docs/pricing"/></cell>
    <cell icon="circle-dot" t="Claude / GPT · კერძო API, ტარიფი"><b-proof href="https://code.claude.com/docs/en/claude-code-on-the-web" quote="Claude Code: “Cloud sessions are available on Pro, Max, and Team plans, and for Enterprise users with premium seats” — code.claude.com/docs/en/claude-code-on-the-web"/><b-proof href="https://learn.chatgpt.com/docs/pricing" quote="Codex: “ChatGPT Work and Codex are included in your ChatGPT Free, Go, Plus, Pro, Business, Edu, or Enterprise plan” — learn.chatgpt.com/docs/pricing"/></cell>
    <cell icon="circle-dot" t="Claude / GPT, უფასო / ტარიფი" diff></cell>
  </b-harness-matrix>
  <b-sublabel top="22">ჩატი და აგენტი</b-sublabel>
  <b-qa>
    <q t="რით განსხვავდება Claude Code ჩატის Claude-სგან">მოდელების ოჯახი ერთია; harness განსხვავდება. ჩატი საუბარში პასუხობს და თქვენს პროექტს ვერ ხედავს. Claude Code კითხულობს კოდს, ცვლის ფაილებს და ასრულებს ბრძანებებს პროექტში: ტერმინალში, რედაქტორში, დესკტოპ აპლიკაციაში ან ბრაუზერში. <a href="https://code.claude.com/docs/en/overview" target="_blank" rel="noopener">დოკუმენტაცია</a></q>
    <q t="რით განსხვავდება Codex ChatGPT-სგან">იგივე წესი მოქმედებს: GPT მოდელები საერთოა, გარემო განსხვავდება. ChatGPT საუბარს აწარმოებს პროექტზე წვდომის გარეშე; Codex კოდთან მუშაობს და ბრძანებებს ასრულებს.</q>
  </b-qa>
  <b-finding>
    <ex>ოთხი ტიპი ორი თვისებით განსხვავდება: სად სრულდება კოდი და როგორ მუშაობს წვდომა მოდელზე. ღია კოდის და enterprise ტიპები თქვენს კომპიუტერზე სრულდება და მხოლოდ მოდელზე წვდომით განსხვავდება, საიდანაც ღირებულების განსხვავებაც მოდის.</ex>
    <gen>ლოკალური ტიპები ერგება თქვენს კომპიუტერზე ფაილებთან და საიდუმლოებებთან მუშაობას, ღრუბელი — გრძელ და პარალელურ ამოცანებს, ჩატი — ამოცანებს პროექტზე წვდომის გარეშე. შეზღუდვები არჩევანს ავიწროებს: enterprise ტარიფი ყველა იურისდიქციაში ხელმისაწვდომი არ არის<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: “To the extent permitted by law, Anthropic reserves the right to not provide its products or services to entities whose majority direct or indirect ownership is attributable to nations other than those listed in our Supported Regions Policy” — anthropic.com/supported-countries"/>.</gen>
    <do>გადაწყვიტეთ, სჭირდება თუ არა ამოცანას ფაილები თქვენს კომპიუტერზე, უნდა მუშაობდეს თუ არა აგენტი თქვენ გარეშე და რომელი მოდელის გამოყენება შეგიძლიათ. პირველი ლოკალურ ტიპზე მიუთითებს, მეორე ღრუბელზე, არც ერთი — ჩატზე.</do>
  </b-finding>
</b-chapter>

<b-chapter id="compare" icon="table" title="რას ხედავენ და აკეთებენ">
  <b-drift>snapshot · 2026 წლის სექტემბერი</b-drift>
  <b-harness-compare label="რას ხედავს · რას აკეთებს თავისით · მოდელები" heads="რას ხედავს|რას აკეთებს თავისით|მოდელები|ღირებულება|წყაროები" acts="ცვლის პროექტის ფაილებს|ასრულებს ბრძანებებს თქვენს კომპიუტერზე|თავისით ასრულებს ციკლს „ცვლილება → ტესტი → ცვლილება“|მუშაობს იზოლირებულ გარემოში" yes="დიახ" no="არა" cheap="უფრო იაფი" dear="უფრო ძვირი · ზუსტი ფასები მინიშნებაში">
    <row t="Hermes Agent" scope="3" scopelabel="მთელი კოდბაზა" acts="1110" models="5" modelslabel="ნებისმიერი მოდელი: API-ით ან ლოკალურად" cost="3" costlabel="$/ტოკენი ან $0. API პროვაიდერის ტარიფით ან საკუთარი მოდელი ლოკალურად" costproofs="2"><b-proof href="https://hermes-agent.nousresearch.com/docs/integrations/providers" quote="Hermes Agent: with a provider key “requests are billed pay-per-token against that key's organization (standard API pricing)” — hermes-agent.nousresearch.com/docs/integrations/providers"/><b-proof href="https://hermes-agent.nousresearch.com/docs/integrations/providers" quote="Hermes Agent: local models via Ollama, llama.cpp, vLLM or LM Studio — “Ollama runs open-weight models locally with one command. Best for: quick local experimentation, privacy-sensitive work, offline use” — hermes-agent.nousresearch.com/docs/integrations/providers"/><b-proof href="https://hermes-agent.nousresearch.com/docs/user-guide/security" quote="Hermes Agent: works in your project, the default backend is “local — runs on host” — hermes-agent.nousresearch.com/docs/user-guide/security"/><b-proof href="https://hermes-agent.nousresearch.com/docs/user-guide/features/overview" quote="Hermes Agent: edits files, runs terminal commands, uses skills — hermes-agent.nousresearch.com/docs/user-guide/features/overview"/><b-proof href="https://hermes-agent.nousresearch.com/docs/integrations/providers" quote="Hermes Agent: connects to models from different providers via API — hermes-agent.nousresearch.com/docs/integrations/providers"/></row>
    <row t="Claude Code და Codex" scope="3" scopelabel="მთელი კოდბაზა" acts="1110" models="1" modelslabel="ერთი მოდელების ოჯახი: თითოეულ პროდუქტს საკუთარი აქვს" cost="2" costlabel="თვეში $20-დან ან $/ტოკენი API-ით" costproofs="3"><b-proof href="https://claude.com/pricing" quote="Claude: Pro is $20 a month billed monthly, Claude Code is included in Pro and Max; Enterprise is “Seat price + usage at API rates” — claude.com/pricing"/><b-proof href="https://learn.chatgpt.com/docs/pricing" quote="Codex: “ChatGPT Work and Codex are included in your ChatGPT Free, Go, Plus, Pro, Business, Edu, or Enterprise plan”; the alternative is to “Pay for Codex usage based on API pricing” — learn.chatgpt.com/docs/pricing"/><b-proof href="https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus" quote="ChatGPT Plus is $20 a month. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/6950777"/><b-proof href="https://code.claude.com/docs/en/overview" quote="Claude Code: “Claude Code is an agentic coding tool that reads your codebase” — code.claude.com/docs/en/overview"/><b-proof href="https://learn.chatgpt.com/docs/codex/cli" quote="Codex: “Codex can inspect files, make edits, and run the tools already installed on your computer” — learn.chatgpt.com/docs/codex/cli"/><b-proof href="https://code.claude.com/docs/en/overview" quote="Claude Code: “reads your codebase, edits files, runs commands, and integrates with your development tools” — code.claude.com/docs/en/overview"/><b-proof href="https://learn.chatgpt.com/docs/codex/cli" quote="Codex: “Inspect code, make changes, run commands, and automate repeatable work without leaving your terminal” — learn.chatgpt.com/docs/codex/cli"/></row>
    <row t="Cursor" scope="2" scopelabel="გახსნილი პროექტი" acts="1100" models="4" modelslabel="4 მწარმოებლის მოდელები" cost="2" costlabel="თვეში $20-დან, ლიმიტის გადაჭარბება ცალკე ირიცხება" costproofs="1"><b-proof href="https://cursor.com/pricing" quote="Cursor: Pro is “$20 / mo.”; “Every plan includes a set amount of model usage. On-demand usage allows you to continue using models after your included amount is consumed, billed in arrears” — cursor.com/pricing"/><b-proof href="https://cursor.com/docs/agent/chat/checkpoints" quote="Cursor: “Checkpoints save snapshots of your codebase during an Agent session” — cursor.com/docs/agent/chat/checkpoints"/><b-proof href="https://cursor.com/docs/agent/overview" quote="Cursor: “Suggest edits to files and apply them automatically”, “Execute terminal commands and monitor output” — cursor.com/docs/agent/overview"/><b-proof href="https://cursor.com/docs/models" quote="Cursor: “Cursor supports frontier models from OpenAI, Anthropic, Google, SpaceXAI, and more”; it also has its own models such as Composer 2.5 — cursor.com/docs/models"/><b-proof href="https://cursor.com/pricing" quote="Cursor: “Every plan includes a set amount of model usage. On-demand usage allows you to continue using models after your included amount is consumed, billed in arrears” — cursor.com/pricing"/></row>
    <row t="ჩატი: ChatGPT, Claude" scope="1" scopelabel="მხოლოდ დიალოგი და დაკავშირებული სერვისები" acts="0001" models="1" modelslabel="ერთი მოდელების ოჯახი: თითოეულ პროდუქტს საკუთარი აქვს" cost="1" costlabel="უფასო · გამოწერა $20-დან" costproofs="2"><b-proof href="https://claude.com/pricing" quote="Claude: Pro is $20 a month billed monthly, Claude Code is included in Pro and Max; Enterprise is “Seat price + usage at API rates” — claude.com/pricing"/><b-proof href="https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus" quote="ChatGPT Plus is $20 a month. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/6950777"/><b-proof href="https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities" quote="Claude: “Connectors let Claude access your apps and services, retrieve your data, and take actions within connected services” — support.claude.com/en/articles/11176164"/><b-proof href="https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt" quote="ChatGPT: “An app connects ChatGPT to an external service, such as Google Drive or Slack, so it can access information or perform supported actions” — help.openai.com/en/articles/11487775"/><b-proof href="https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude" quote="Claude: “When Claude executes code or creates files, it operates within an isolated, sandboxed container” — support.claude.com/en/articles/12111783"/><b-proof href="https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt" quote="ChatGPT: for data analysis it writes and runs Python in an isolated environment with no external requests. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/8437071"/></row>
  </b-harness-compare>
  <b-sublabel top="22">რა არის რა</b-sublabel>
  <b-qa cols="3">
    <q t="რა არის Codex">OpenAI-ის აგენტი კოდთან სამუშაოდ: იღებს ამოცანას, ცვლის ფაილებს და ასრულებს ბრძანებებს. მუშაობს ტერმინალში, რედაქტორის გაფართოებაში და ღრუბელში, GPT მოდელებზე. პროექტზე წვდომა არის ის, რაც ChatGPT ჩატისგან განასხვავებს. <a href="https://learn.chatgpt.com/docs/codex/cli" target="_blank" rel="noopener">დოკუმენტაცია</a></q>
    <q t="რა არის Cursor">კოდის რედაქტორი ჩაშენებული აგენტით: აგენტი ამოცანებს თავისით ასრულებს, ტერმინალის ბრძანებებს უშვებს და კოდს ცვლის. მუშაობს გახსნილ პროექტში და რამდენიმე მწარმოებლის მოდელებს უჭერს მხარს. <a href="https://cursor.com/docs/agent/overview" target="_blank" rel="noopener">დოკუმენტაცია</a></q>
    <q t="რა არის Hermes Agent">Nous Research-ის ღია კოდის აგენტი. მუშაობს თქვენს კომპიუტერზე, უკავშირდება მოდელების სხვადასხვა პროვაიდერს, მათ შორის Claude-სა და ღია მოდელებს, და ლოკალურ მოდელთანაც შეუძლია მუშაობა. <a href="https://hermes-agent.nousresearch.com/docs/user-guide/features/overview" target="_blank" rel="noopener">დოკუმენტაცია</a></q>
  </b-qa>
  <b-finding>
    <ex>Claude Code და Codex პროექტზე წვდომითა და მოქმედებებით ემთხვევა; ისინი განსხვავდება მოდელით და harness-ის ცალკეული შესაძლებლობებით, კონცეპტუალურად კი ერთნაირი რჩება.</ex>
    <gen>Cursor გამოირჩევა ჩაშენებული რედაქტორითა და რამდენიმე მწარმოებლის მოდელებით, ჩატი — პროექტზე წვდომის არარსებობით. Claude Code-სა და Codex-ს შორის არჩევანს მოდელი და ტარიფი განსაზღვრავს.</gen>
    <do>თუ ამოცანას პროექტის ფაილები სჭირდება, ჩატი არ გამოდგება. შემდეგ აირჩიეთ იმ მოდელის მიხედვით, რომელიც გუნდს უკვე აქვს.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="ხშირად დასმული კითხვები">
  <b-faq-cards>
    <q t="Codex თუ Claude Code: რომელი აირჩიოთ?">პროექტზე წვდომითა და მოქმედებებით ისინი თითქმის ერთნაირია; განსხვავდება მოდელით, Codex-ისთვის GPT, Claude Code-ისთვის Claude. აირჩიეთ ის, რომლის მოდელიც და გამოწერაც გუნდს უკვე აქვს.</q>
    <q t="Cursor თუ Claude Code?">Cursor რედაქტორში მუშაობს და სხვადასხვა მწარმოებლის მოდელებს გთავაზობთ. Claude Code ამოცანას ტერმინალში თავიდან შედეგამდე მიჰყავს Claude-ის მოდელებზე.</q>
    <q t="რა ალტერნატივები აქვს Claude Code-ს?">Codex, იმავენაირად აგებული GPT მოდელებზე, Cursor თავისი რედაქტორით და Hermes Agent ნებისმიერი მოდელით. OpenCode, Aider, Cline და Goose მსგავსად მუშაობს.</q>
    <q t="რატომ ძველდება შესაძლებლობების შედარებები ასე სწრაფად?">Claude Code-ისა და Codex-ის ახალი ვერსიები ყოველ კვირას გამოდის. სამი რამ სტაბილური რჩება: მოდელების ოჯახი, harness-ის კონსტრუქცია და აგენტთან მუშაობის გზები.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="დამატებით">
  <b-links cols="2">
    <item href="/blog/chatgpt-enterprise-usage-report/" k="ანგარიში" t="ChatGPT Enterprise-ის გამოყენების ანგარიში">ვინ რას იყენებს კომპანიაში</item>
    <item href="/blog/ai-interviews-without-leading-questions/" k="ინტერვიუები" t="ინტერვიუები წამყვანი კითხვების გარეშე">როგორ გავიგოთ, რა სჭირდებათ თანამშრომლებს რეალურად AI-სგან</item>
  </b-links>
</b-chapter>
<b-footer>Snapshot 2026 წლის სექტემბრის მდგომარეობით. პროდუქტების შესახებ მტკიცებები Anthropic-ის, OpenAI-ის, Cursor-ისა და Nous Research-ის ოფიციალურ დოკუმენტაციას ეფუძნება; წყარო თითოეული მტკიცების გვერდით მდებარე ხატულის უკანაა. OpenAI Help Center-ის ორი ციტატა პერიფრაზირებულია.</b-footer>
</b-post>
