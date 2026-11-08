---
title: ინციდენტის გამოძიება AI აგენტით: Sentry-ს შეცდომები და Grafana-ს მეტრიკები ერთ სურათში MCP-ის საშუალებით
date: 2026-10-05
updated: 2026-11-08
description: როგორ გამოვიძიოთ ინციდენტი AI აგენტით: Sentry-სა და Grafana-ს MCP-ით დაკავშირება, შეცდომების, მეტრიკებისა და რელიზის დროის შედარება, უფლებების შეზღუდვა და ჰიპოთეზის შემოწმება.
tags: AI, აგენტები, MCP, Sentry, Grafana, ინციდენტები, harness
category: harness
layout: wide
mentions: MCP, Model Context Protocol, Sentry, Grafana, incident investigation, observability, Claude Code
toc: flow=როგორ მიდის პროცესი | connect=დაკავშირება | timeline=რას ადარებს აგენტი | rights=უფლებები და რისკები | first=საიდან დავიწყოთ | faq=კითხვები | next=შემდეგი
---

ინციდენტის დროს ადამიანი Sentry-ს, Grafana-სა და ჩატს შორის გადადის და სურათს თავად აგროვებს. ორივე სისტემაზე წვდომის მქონე აგენტი შეცდომებს, მეტრიკებსა და მოვლენების დროს ერთ მონახაზში აერთიანებს, ადამიანი კი ჰიპოთეზას ამოწმებს და წყვეტს, რა გააკეთოს. ქვემოთ: როგორ მიდის პროცესი, როგორ დავაკავშიროთ Sentry და Grafana, რა უფლებები მივცეთ. საფუძვლები სტატიაშია [MCP AI აგენტისთვის](/blog/mcp-agent-access/).

<b-post series="harness">

<b-chapter id="flow" icon="bug" title="როგორ მიდის გამოძიება">
  <iso-art name="incident-investigation-agent/before-after"></iso-art>
  <b-finding>
    <ex>აგენტი Sentry-ში შეცდომებს და Grafana-ში გრაფიკებს კითხულობს, ადამიანი კი გამოძიების ერთ ნაკრებს იღებს.</ex>
    <gen>Sentry და Grafana MCP-ით მხოლოდ წასაკითხად უკავშირდება, ამიტომ აგენტი თქვენი ნებართვის გარეშე არაფერს ცვლის. ჰიპოთეზას ადამიანი ამოწმებს.</gen>
    <do k="რა ვქნათ">ჩამოწერეთ სისტემები, რომლებშიც ბოლო ინციდენტის დროს მიზეზს ეძებდით.</do>
  </b-finding>
</b-chapter>

<b-chapter id="connect" icon="plug" title="როგორ დავაკავშიროთ Sentry და Grafana">
  <b-say-agent title="უთხარით აგენტს">დააკავშირე Sentry და Grafana მხოლოდ წასაკითხად. იპოვე Sentry-ში payment სერვისის ახალი შეცდომები ბოლო საათის განმავლობაში, იპოვე Grafana-ში, როდის გაიზარდა 5xx პასუხების წილი, და შეადარე რელიზის დროს. შემომთავაზე ჰიპოთეზა და ყოველი ფაქტისთვის დაასახელე წყარო.</b-say-agent>
  <b-why align="left">ბრძანებებს აგენტი თავად ასრულებს; თქვენ მხოლოდ ბრაუზერში შედიხართ Sentry-ში და გადასცემთ Grafana-ს ტოკენს. [თუ აგენტი ამას თქვენგან ითხოვს](/blog/agent-hands-work-back-to-you/).</b-why>
  <b-spoiler summary="როგორ გავაკეთოთ ხელით">
    <iso-art name="incident-investigation-agent/setup-steps"></iso-art>

#### Sentry

    <b-codebox copy>
      claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
      /mcp   # sign in through the browser (OAuth)
    </b-codebox>

შესვლა OAuth-ით ხდება, ტოკენები კი ავტომატურად ინახება და ახლდება.

#### Grafana

    <b-codebox copy>
      claude mcp add --transport stdio \
        --env GRAFANA_URL=https://myinstance.grafana.net \
        --env GRAFANA_SERVICE_ACCOUNT_TOKEN=$GRAFANA_TOKEN \
        grafana -- uvx mcp-grafana --disable-write
    </b-codebox>

ეს ოფიციალური სერვერია <a href="https://github.com/grafana/mcp-grafana" target="_blank" rel="noopener">grafana/mcp-grafana</a>. ტოკენი მინიმალური უფლებების მქონე service account-იდან მოდის, ხოლო ალამი --disable-write ცვლილებებს კრძალავს.

  </b-spoiler>
  <b-finding>
    <ex>აგენტი ორივე სისტემას აკავშირებს, პოულობს შეცდომებსა და გრაფიკს, ადარებს რელიზს და წყაროებს ასახელებს.</ex>
    <gen>ორივე სისტემა ერთი ბრძანებით უკავშირდება, წაკითხვის წვდომა კი გამოძიებას უსაფრთხოს ხდის.</gen>
    <do k="რა ვქნათ">დაკავშირება აგენტს მიანდეთ და მისი შედეგი შეადარეთ იმას, რასაც Sentry-სა და Grafana-ში თავად ხედავთ.</do>
  </b-finding>
</b-chapter>

<b-chapter id="timeline" icon="lines" title="რას ადარებს აგენტი">
  <iso-art name="incident-investigation-agent/event-timeline"></iso-art>
  <b-finding>
    <ex>რელიზი, შეცდომების ზრდა და ალერტი ერთ დროის ღერძზე თავსდება და ჩანს, რა მოხდა პირველად.</ex>
    <gen>დროის დამთხვევა ჰიპოთეზას იძლევა და მიზეზს არ ამტკიცებს: შემოწმება ადამიანს რჩება.</gen>
    <do k="რა ვქნათ">ყოველ დასკვნასთან ერთად მოითხოვეთ ბმული გრაფიკზე ან მოვლენაზე.</do>
  </b-finding>
</b-chapter>

<b-chapter id="rights" icon="shield-check" title="უფლებები და რისკები">
  <iso-art name="incident-investigation-agent/rights-ladder"></iso-art>
  <b-rules sw="1.8">
    <rule icon="key" t="ტოკენი">მინიმალური უფლებების მქონე Grafana service account; მნიშვნელობა გარემოს ცვლადში ინახება.</rule>
    <rule icon="lock" t="მხოლოდ წაკითხვა">ალამი --disable-write ცვლილებებს კრძალავს, ინციდენტების შექმნის ჩათვლით.</rule>
    <rule icon="ban" t="მესამე მხარის სერვერი">დააკავშირეთ მხოლოდ სანდო სერვერები: გარე ტექსტს მკითხველი სერვერები prompt injection-ს (პრომპტის ინექციას) გზას უხსნის.</rule>
  </b-rules>
  <b-finding>
    <ex>აგენტი შეცდომებსა და გრაფიკებს კითხულობს და სისტემებში არაფრის შეცვლა არ შეუძლია.</ex>
    <gen>უფლებები თითო წყაროზე ცალ-ცალკე გაიცემა, ყველაზე ფართო უფლებები კი დახურული რჩება.</gen>
    <do k="რა ვქნათ">შექმენით მხოლოდ წასაკითხი service account და დააკავშირეთ Grafana ალამით --disable-write.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="საიდან დავიწყოთ">
  <iso-art name="incident-investigation-agent/start-steps"></iso-art>
  <b-finding>
    <ex>სამი ნაბიჯი: Sentry, Grafana, ტესტი გასულ ინციდენტზე.</ex>
    <gen>გასული ინციდენტი თქვენთვის ცნობილია, ამიტომ ხედავთ, სად იპოვა აგენტმა მიზეზი და სად შეცდა.</gen>
    <do k="რა ვქნათ">აიღეთ დახურული ინციდენტი და სთხოვეთ აგენტს, მიზეზი Sentry-სა და Grafana-ით იპოვოს.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="ხშირად დასმული კითხვები">
  <b-faq-cards>
    <q t="როგორ ეხმარება AI აგენტი ინციდენტის გამოძიებაში?">ის Sentry-ს შეცდომებს, Grafana-ს მეტრიკებსა და მოვლენების დროს ერთ მონახაზში აგროვებს, ადამიანი კი ჰიპოთეზას ამოწმებს და წყვეტს, რა გააკეთოს.</q>
    <q t="როგორ დავაკავშიროთ Sentry და Grafana აგენტს?">MCP-ით, ერთი ბრძანებით, მხოლოდ წაკითხვის წვდომით.</q>
    <q t="შეიძლება თუ არა აგენტის დასკვნის ნდობა?">დროის დამთხვევა ჰიპოთეზას იძლევა და მიზეზს არ ამტკიცებს. შემოწმება ადამიანს რჩება.</q>
    <q t="რა უფლებები უნდა მივცეთ აგენტს?">თითო წყაროზე ცალ-ცალკე, მხოლოდ წაკითხვისა; ყველაზე ფართო უფლებები დახურული რჩება.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="შემდეგი">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="საფუძვლები" t="MCP AI აგენტისთვის: რა პრობლემას წყვეტს და როგორ მივანდოთ აგენტს დაკავშირება">რა არის MCP და როგორ დავაკავშიროთ</item>
    <item href="/blog/analytics-reports-agent/" k="სხვა შემთხვევა" t="ანალიტიკური ანგარიშები AI აგენტით">მონაცემთა ბაზა, ცხრილები და დოკუმენტები MCP-ით</item>
    <item href="/blog/mcp-scopes/" k="დაყენება" t="MCP-ის სკოუპები Claude Code-ში: local, project და user — სად ინახება სერვერი და ვის ეჩვენება">სად ცხოვრობს სერვერი და ვინ ხედავს მას</item>
  </b-links>
</b-chapter>
<b-footer>ინციდენტი გამოგონილია. Sentry-ის დაკავშირება Claude Code-ის დოკუმენტაციას ეყრდნობა: <a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">MCP</a>, Grafana — რეპოზიტორიას <a href="https://github.com/grafana/mcp-grafana" target="_blank" rel="noopener">grafana/mcp-grafana</a>.</b-footer>
</b-post>
