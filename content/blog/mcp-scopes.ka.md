---
title: MCP scope-ები Claude Code-ში: local, project და user — სად ცხოვრობს სერვერი და ვინ ხედავს მას
date: 2026-10-05
updated: 2026-11-13
description: MCP სერვერის სამი scope Claude Code-ში: local, project და user. სად ინახება კონფიგურაცია, ვინ ხედავს მას, რომელი იმარჯვებს სახელების დამთხვევისას, როგორ გავუზიაროთ სერვერები გუნდს და როგორ არ მოხვდეს საიდუმლოები commit-ებში.
tags: AI, აგენტები, MCP, Claude Code, გუნდი, harness
category: harness
layout: wide
mentions: MCP, Model Context Protocol, Claude Code, mcp scope, .mcp.json, environment variables
toc: what=სამი scope | pick=რომელი ავირჩიოთ | order=რომელი იმარჯვებს | team=Project გუნდისთვის | secrets=საიდუმლოები | first=საიდან დავიწყოთ | faq=კითხვები | next=შემდეგ
---

MCP სერვერის scope ორ კითხვას პასუხობს: რომელ პროექტებში მუშაობს სერვერი და ვინ ხედავს მას. Claude Code-ს სამი scope აქვს: local, project და user. ქვემოთ: რით განსხვავდებიან, რომელი ავირჩიოთ, რომელი იმარჯვებს სახელების დამთხვევისას და როგორ გავუზიაროთ სერვერები გუნდს. რა არის MCP და როგორ მივაერთოთ, წერია სტატიაში [MCP AI აგენტისთვის](/blog/mcp-agent-access/).

<b-post series="harness">

<b-chapter id="what" icon="layers" title="სამი scope">
  <iso-art name="mcp-scopes/scopes"></iso-art>
  <b-table code="prose">
| Scope | სად მუშაობს | ვინ ხედავს | სად ინახება |
|---|---|---|---|
| Local | მიმდინარე პროექტი | მხოლოდ თქვენ | `~/.claude.json` |
| Project | მიმდინარე პროექტი | მთელი გუნდი, რეპოზიტორიის მეშვეობით | `.mcp.json` ძირეულ საქაღალდეში |
| User | თქვენი ყველა პროექტი | მხოლოდ თქვენ | `~/.claude.json` |
  </b-table>
  <b-finding>
    <ex>ერთი და იგივე სერვერი შეიძლება მიერთდეს მხოლოდ თქვენთვის ერთ პროექტში, მთელი გუნდისთვის ან თქვენი ყველა პროექტისთვის.</ex>
    <gen>Local არის ნაგულისხმევი: სერვერს მხოლოდ თქვენ ხედავთ და მხოლოდ ამ პროექტში.</gen>
    <do k="რა ვქნათ">ნახეთ, რომელ scope-ში ცხოვრობს თქვენი თითოეული სერვერი: claude mcp list.</do>
  </b-finding>
</b-chapter>

<b-chapter id="pick" icon="help" title="რომელი ავირჩიოთ">
  <b-say-agent title="უთხარით აგენტს">აჩვენე, რომელ scope-ებშია გაწერილი ჩემი MCP სერვერები, და შემომთავაზე, რომელი გადავიტანო project-ში გუნდისთვის.</b-say-agent>
  <b-why align="left">აგენტი ბრძანებებს თავად გაუშვებს: claude mcp list და claude mcp get.</b-why>
  <b-spoiler summary="როგორ გავაკეთოთ ხელით">
    <iso-art name="mcp-scopes/what-where"></iso-art>
    <b-codebox copy>
      # local — the default
      claude mcp add --transport http stripe https://mcp.stripe.com
      # project — the whole team, .mcp.json file
      claude mcp add --transport http shared-server --scope project https://example.com/mcp
      # user — all your projects
      claude mcp add --transport http hubspot --scope user https://mcp.hubspot.com/anthropic
    </b-codebox>

სერვერების სია: `claude mcp list`; დეტალები: `claude mcp get <name>`; წაშლა: `claude mcp remove <name>`; Claude Code-ის შიგნით: `/mcp`.

  </b-spoiler>
  <b-finding>
    <ex>ექსპერიმენტი local-ში იწყება, საერთო ინსტრუმენტი project-ში ცხოვრობს, პირადი უტილიტა — user-ში.</ex>
    <gen>scope წყვეტს, ვინ ხედავს სერვერს და სად ინახება მისი კონფიგურაცია.</gen>
    <do k="რა ვქნათ">საერთო ინსტრუმენტი დაამატეთ --scope project-ით, პირადი — --scope user-ით.</do>
  </b-finding>
</b-chapter>

<b-chapter id="order" icon="layers" title="რომელი იმარჯვებს სახელების დამთხვევისას">
  <b-why>თუ ერთი და იგივე სახელის სერვერი რამდენიმე ადგილას არსებობს, მთლიანად გამოიყენება ყველაზე ზედა ფენის ჩანაწერი.</b-why>
  <iso-art name="mcp-scopes/priority-layers"></iso-art>
  <b-finding>
    <ex>ყველაზე მაღლა დგას ორგანიზაციის მიერ მიცემული სერვერები (managed MCP). შემდეგ local გადაფარავს project-სა და user-ს, project კი — user-ს. plugin-ები და claude.ai-ის კონექტორები ქვემოთაა და დუბლიკატად ითვლება, თუ იმავე მისამართზე მიუთითებს.</ex>
    <gen>პირადი ჩანაწერი იმავე სახელის საერთო ჩანაწერს მთლიანად გადაფარავს: ორი ჩანაწერის ველები არ ერწყმის ერთმანეთს.</gen>
    <do k="რა ვქნათ">პირად სერვერებს სხვა სახელები დაარქვით, რომ საერთოებს არ გადააფარონ.</do>
  </b-finding>
</b-chapter>

<b-chapter id="team" icon="git-branch" title="Project: საერთო კონფიგურაცია გუნდისთვის">
  <b-rules sw="1.8">
    <rule icon="folder-tab" t=".mcp.json">ფაილი პროექტის ძირეულ საქაღალდეშია, რეპოზიტორიაში: მთელი გუნდი ერთსა და იმავე სერვერებს იღებს.</rule>
    <rule icon="bell" t="დადასტურება">ინტერაქტიულ სესიაში Claude Code ჰკითხავს, სანამ .mcp.json-ის სერვერებს გამოიყენებს.</rule>
    <rule icon="users" t="კითხვის გარეშე">არაინტერაქტიულ გაშვებებში (claude -p, Agent SDK, ღრუბლოვანი სესიები) სერვერები კითხვის გარეშე იტვირთება.</rule>
    <rule icon="lock" t="საქაღალდის ნდობა">არანდობილ საქაღალდეში სერვერი დადასტურებას ელოდება („Pending approval“) ნდობის დიალოგამდე.</rule>
    <rule icon="ban" t="გამორთვა">არასასურველი სერვერი დაამატეთ disabledMcpjsonServers-ში; claude mcp reset-project-choices დადასტურების არჩევანს ასუფთავებს.</rule>
  </b-rules>
  <b-finding>
    <ex>რეპოზიტორიაში მდებარე ფაილი აგენტის კონფიგურაციას საერთოს ხდის: ახალი თანამშრომელი სერვერებს კოდთან ერთად იღებს.</ex>
    <gen>დადასტურება ინტერაქტიულ მუშაობაში უცხო სერვერისგან იცავს, ავტომატურ გაშვებებში კი სერვერი მაშინვე ირთვება.</gen>
    <do k="რა ვქნათ">.mcp.json code review-ზე გადახედეთ ისევე, როგორც ნებისმიერ კოდს.</do>
  </b-finding>
</b-chapter>

<b-chapter id="secrets" icon="key" title="საიდუმლოები .mcp.json-ში">
  <b-why>ფაილში გარემოს ცვლადების სახელები ინახება. ${VAR} მნიშვნელობას ჩასვამს, ${VAR:-default} კი ნაგულისხმევ მნიშვნელობას ადგენს. გაშლა მუშაობს command, args, env, url და headers ველებში.</b-why>
  <iso-art name="mcp-scopes/env-keys"></iso-art>
  <b-codebox copy>
    {
      "mcpServers": {
        "api-server": {
          "type": "http",
          "url": "${API_BASE_URL:-https://api.example.com}/mcp",
          "headers": { "Authorization": "Bearer ${API_KEY}" }
        }
      }
    }
  </b-codebox>

თუ ცვლადი დაყენებული არ არის და ნაგულისხმევი მნიშვნელობა არ აქვს, კონფიგურაცია უცვლელად იტვირთება, claude mcp list და /mcp კი გაფრთხილებას აჩვენებს. Claude Code-ის კრედენციალები (ANTHROPIC_API_KEY, ANTHROPIC_AUTH_TOKEN) და ზოგიერთი სხვა url-სა და headers-ში ცარიელად იკითხება: მნიშვნელობა გადაიტანეთ სხვა სახელის ცვლადში.

  <b-finding>
    <ex>რეპოზიტორიაში ${API_KEY} ინახება, ნამდვილ გასაღებს კი ყოველი დეველოპერი საკუთარ გარემოს ცვლადში ინახავს.</ex>
    <gen>ამით საერთო ფაილის commit-ი უსაფრთხო რჩება.</gen>
    <do k="რა ვქნათ">.mcp.json-იდან ამოიღეთ გასაღებები და ცვლადებით ჩაანაცვლეთ.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="საიდან დავიწყოთ">
  <iso-art name="mcp-scopes/steps"></iso-art>
  <b-finding>
    <ex>სამი ნაბიჯი: ნახვა, გაზიარება, გასაღებების დამალვა.</ex>
    <gen>ჯერ საკუთარ სერვერებში მოიტანეთ წესრიგი, შემდეგ — საერთო კონფიგურაცია გუნდისთვის.</gen>
    <do k="რა ვქნათ">გაუშვით claude mcp list და იპოვეთ სერვერი, რომელიც მთელ გუნდს სჭირდება.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="ხშირად დასმული კითხვები">
  <b-faq-cards>
    <q t="რა MCP scope-ები აქვს Claude Code-ს?">სამი: local — თქვენთვის მიმდინარე პროექტში, project — მთელი გუნდისთვის რეპოზიტორიაში მყოფი .mcp.json ფაილით, და user — თქვენთვის თქვენს ყველა პროექტში.</q>
    <q t="რომელია ნაგულისხმევი scope?">Local: სერვერს მხოლოდ თქვენ ხედავთ და მხოლოდ ამ პროექტში.</q>
    <q t="რა ხდება სერვერების სახელების დამთხვევისას?">პირადი ჩანაწერი იმავე სახელის საერთო ჩანაწერს მთლიანად გადაფარავს: ორი ჩანაწერის ველები არ ერწყმის ერთმანეთს.</q>
    <q t="როგორ გავუზიაროთ MCP სერვერი გუნდს?">დაამატეთ იგი project scope-ში: კონფიგურაცია რეპოზიტორიაში მოხვდება, საიდუმლოები კი გარემოს ცვლადებში დარჩება.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="შემდეგ">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="საფუძვლები" t="MCP AI აგენტისთვის: რა პრობლემას წყვეტს და როგორ დავავალოთ აგენტს მიერთება">რა არის MCP და როგორ მივაერთოთ</item>
    <item href="/blog/claude-in-chrome/" k="ბრაუზერი" t="Claude Code Chrome-ში: როგორ ამოწმებს აგენტი საიტს ბრაუზერში — გამართვა და ფორმები თქვენი ავტორიზაციით">აგენტი თქვენს ბრაუზერში</item>
    <item href="/blog/bug-report-to-reproduction-agent/" k="მაგალითი" t="QA-ს მუშაობა მხარდაჭერის შემდეგ AI აგენტთან ერთად: კვლევა, აღწერა და დოკუმენტირება MCP-ითა და skill-ებით">აგენტი Jira-ს ბაგს იმეორებს</item>
  </b-links>
</b-chapter>
<b-footer>სკოპებისა და პრიორიტეტის შესახებ ფაქტები Claude Code-ის დოკუმენტაციას მიჰყვება: <a href="https://code.claude.com/docs/en/mcp#mcp-installation-scopes" target="_blank" rel="noopener">MCP installation scopes</a>.</b-footer>
</b-post>
