---
title: სპეციფიკაციები აგრეგატების მიხედვით: RFC მოთხოვნები და bounded context-ები თითო ფიჩაზე თითო სპეციფიკაციის ნაცვლად
date: 2026-09-28
updated: 2026-11-08
description: სპეციფიკაციებზე დაფუძნებული დეველოპმენტი სპეციფიკაციების გამრავლების გარეშე: როგორ შევინახოთ სპეციფიკაციები აგრეგატების ერთ ლექსიკონში, რომ ყოველ ფიჩასთან ერთად არ მრავლდებოდნენ: მოთხოვნების დონეები, აგრეგატის ბარათი და კონტექსტების საზღვრები.
tags: AI, სპეციფიკაციებზე დაფუძნებული დეველოპმენტი, სპეციფიკაციები, DDD, აგენტები
category: specs
layout: wide
image: /og/specs-by-aggregates.en.png
mentions: RFC 2119, Domain-Driven Design, OpenSpec, Spec-Driven Development
toc: growth=რატომ გროვდება სპეციფიკაციები | rfc=RFC დონეები | card=აგრეგატის ბარათი | contexts=კონტექსტები | faq=კითხვები | next=წაიკითხეთ შემდეგ
---

სპეციფიკაციები აგრეგატების მიხედვით ნიშნავს ერთ ჩანაწერს თითო საგნობრივ ცნებაზე, მაგალითად ჯავშანზე ან შეკვეთაზე, და არა ცალკე სპეციფიკაციას თითო ფიჩაზე. ფიჩა მოთხოვნებს მხოლოდ სწორ ჩანაწერს უმატებს, ამიტომ ფაილები ყოველ ამოცანასთან ერთად არ მრავლდება და ცნება სხვადასხვა სპეციფიკაციაში არ იცვლება. მოთხოვნები RFC დონეებს იყენებს: MUST ტესტით მოწმდება, SHOULD — რევიუზე. ქვემოთ აგრეგატის ბარათი და კონტექსტების საზღვრებია.

<b-post series="agg">
<b-hchain label="ჯაჭვი: bounded context, აგრეგატი, MUST დონის ინვარიანტი, შემოწმება">
  <step icon="workflow" sw="1.8" t="კონტექსტი">booking</step>
  <step icon="cube" t="აგრეგატი">Reservation</step>
  <step icon="list-check" sw="1.8" t="ინვარიანტი">MUST</step>
  <step icon="flask" t="შემოწმება">ტესტი</step>
</b-hchain>
<b-chapter id="growth" title="რატომ გროვდება სპეციფიკაციები" icon="bar-chart-rise">
  <b-spec-growth>
    <b-growth-panel icon="file" t="სპეციფიკაცია თითო ფიჩაზე" sub="ცნება აღწერილია ყოველ ფიჩაში" files="101101010110" n="12 ფაილი" note="„ჯავშანი“ 7-ში" chip="იზრდება ფიჩებთან ერთად"></b-growth-panel>
    <b-growth-panel good icon="cube" t="აგრეგატების ლექსიკონი" sub="ცნება აღწერილია ერთხელ" n="4 ჩანაწერი" note="„ჯავშანი“ 1-ში" chip="იზრდება დომენთან ერთად">
      <agg dots="5">Reservation</agg>
      <agg dots="3">Room</agg>
      <agg dots="2">TimeSlot</agg>
      <agg dots="2">Member</agg>
    </b-growth-panel>
    <step>ფიჩა 13</step>
    <step em="+1 MUST">[booking::Reservation]</step>
    <step em="+1">ტესტი</step>
  </b-spec-growth>
  <b-cap>რიცხვები საილუსტრაციოა. როგორ აწყობს <a href="https://github.com/Fission-AI/OpenSpec" target="_blank" rel="noopener">OpenSpec</a> სპეციფიკაციებსა და ცვლილებებს: საქაღალდეები specs/ და changes/, დასრულებული ცვლილებები არქივში გადადის.</b-cap>
  <b-finding>
    <ex>თორმეტმა ფიჩამ თორმეტი სპეციფიკაცია შექმნა და ჯავშანი მათგან შვიდში არის აღწერილი, ყოველ ჯერზე ოდნავ სხვანაირად. ლექსიკონში იგივე ფიჩებმა ხაზები ოთხ აგრეგატის ჩანაწერს დაუმატა.</ex>
    <gen>როცა სპეციფიკაცია ცვლილებას ან ფიჩას უკავშირდება, ყოველი ამოცანა ფაილებს ამატებს და ერთი ცნება რამდენიმე ადგილას იცვლება. როცა ერთეული აგრეგატია, ჩანაწერების რაოდენობას თავად დომენი ზღუდავს, ფიჩა კი ჩანაწერს მხოლოდ მოთხოვნებს უმატებს.</gen>
    <do>ჩამოწერეთ ცნებები, რომლებიც სამ ან მეტ სპეციფიკაციაში გვხვდება, და თითოეულს მიეცით ერთი ლექსიკონის ჩანაწერი. ფიჩის სპეციფიკაციები ჩანაწერზე მიუთითებდეს და მას თავიდან არ ჰყვებოდეს.</do>
  </b-finding>
</b-chapter>
<b-chapter id="rfc" title="RFC 2119 მოთხოვნების დონეები" icon="list-check">
  <b-rfc-levels cols="სიტყვა | მნიშვნელობა | სიმძლავრე | შემოწმება">
    <level k="MUST" s="5" w="100" check="test" t="ავტომატური ტესტი" note="ბლოკავს">სავალდებულოა</level>
    <level k="MUST NOT" s="5" w="100" check="test" t="ავტომატური ტესტი" note="ბლოკავს">აკრძალულია</level>
    <level k="SHOULD" s="3" w="60" check="review" t="რევიუ" note="აფრთხილებს">ნაგულისხმევი, გადახვევა მიზეზით</level>
    <level k="MAY" s="1" w="20" check="none" t="არ არის" note="არ მოწმდება">დაშვებულია</level>
    <syn>MUST = SHALL</syn>
  </b-rfc-levels>
  <b-cap>სიტყვები და მნიშვნელობები მიჰყვება <a href="https://www.rfc-editor.org/rfc/rfc2119" target="_blank" rel="noopener">RFC 2119</a>-ს. თითოეული სიტყვა თავისი სახის შემოწმებას შეესაბამება.</b-cap>
  <b-finding>
    <ex>ჯავშნის ჩანაწერში „ინტერვალები არ იკვეთება“ არის MUST, რომელსაც ტესტი ამოწმებს, „დადასტურება იმავე არხით მოდის“ კი — SHOULD, რომელსაც რევიუზე ათვალიერებენ.</ex>
    <gen>მოთხოვნის სიტყვა მაშინვე გეუბნებათ, როგორ შემოწმდეს და რა გააკეთოთ დარღვევისას. აგენტი MUST-ს საზღვრად კითხულობს, SHOULD-ს — ნაგულისხმევად და ერთმანეთში არ ურევს.</gen>
    <do>გადაწერეთ თქვენი სპეციფიკაციის მოთხოვნები ამ ოთხი სიტყვით და ყოველ MUST-ს გვერდით მიუწერეთ ტესტი, რომელიც მას ამოწმებს.</do>
  </b-finding>
</b-chapter>
<b-chapter id="card" title="აგრეგატის ბარათი" icon="card-lines">
  <b-aggregate-card label="ჩანაწერის მაგალითი Reservation აგრეგატისთვის booking კონტექსტში: მისამართი, ინვარიანტები, ბრძანებები, წვდომა, ბმები და ფიჩის სპეციფიკაცია">
    <field icon="id-card" t="მისამართი: კონტექსტი::სახელი">## [booking::Reservation]&#10;Class: aggregate&#10;Description: ინტერვალზე დაჯავშნილი სათათბირო ოთახი.</field>
    <field icon="list-check" sw="1.8" t="მოთხოვნები → შემოწმებები">Invariants:&#10;  - MUST: ოთახის აქტიური ჯავშნები არასდროს იკვეთება&#10;  - MUST: held → confirmed → closed, მხოლოდ წინ&#10;  - MUST: held დაუდასტურებელი 15 წთ → closed&#10;  - SHOULD: დადასტურება იმავე არხით, საიდანაც შეიქმნა</field>
    <field icon="play" t="შეცვლის ერთადერთი გზა">Commands: HoldRoom, ConfirmReservation,&#10;          CancelReservation</field>
    <field icon="user" t="ვის შეუძლია">Access:&#10;  CanHoldRoom: [booking::Role::Member]&#10;  CanCancelReservation: Member (own), Admin</field>
    <field icon="link" t="კავშირები id-ით">Depends on: [[booking::Room]], [[booking::TimeSlot]]</field>
    <field icon="file" t="რომელი ფიჩიდან მოვიდა">Spec: [[room-booking]]</field>
  </b-aggregate-card>
  <b-cap>მაგალითი გამოგონილია. ტერმინები მიჰყვება <a href="https://martinfowler.com/bliki/DDD_Aggregate.html" target="_blank" rel="noopener">Martin Fowler: DDD Aggregate</a>-ს.</b-cap>
  <b-finding>
    <ex>მთელი ჯავშანი ერთი ბარათია: მისამართი, ოთხი მოთხოვნა, სამი ბრძანება, უფლებები, კავშირები და ფიჩა, საიდანაც მოვიდა.</ex>
    <gen>აგრეგატი არის საზღვარი, რომლის შიგნითაც მოთხოვნები ყოველთვის სრულდება და რომელიც მხოლოდ საკუთარი ბრძანებებით იცვლება. ამიტომ ბარათი წესებს ინახავს მათი დარღვევის ერთადერთ გზებთან ერთად.</gen>
    <do>ყოველ აგრეგატს მიეცით ექვსველიანი ბარათი. თუ მოთხოვნა ვერც ერთ აგრეგატს ვერ მიეკუთვნება, სავარაუდოდ აგრეგატს ჯერ სახელი არ დარქმევია.</do>
  </b-finding>
</b-chapter>
<b-chapter id="contexts" title="Bounded context-ები" icon="workflow">
  <b-ctx-map>
    <ctx name="booking">Reservation, Room, TimeSlot</ctx>
    <ctx name="billing">Invoice, Tariff</ctx>
    <ctx name="access">Pass, Level</ctx>
  </b-ctx-map>
  <b-ctx-links t="კონტექსტებს შორის კავშირები მხოლოდ id-ით არის">
    <ref from="billing::Invoice" to="booking::Reservation"/>
    <ref from="access::Pass" to="booking::Reservation"/>
  </b-ctx-links>
  <b-ctx-clash word="„Level“" note="ერთი სიტყვა, ორი ტერმინი, სხვადასხვა სახელი">
    <sense code="booking::Room.floor">სართული</sense>
    <sense code="access::Level">დაშვების დონე</sense>
  </b-ctx-clash>
  <b-ctx-rules>
    <rule icon="id-card">ერთი ტერმინი = ერთი ჩანაწერი</rule>
    <rule icon="link">ბმული [[ctx::Name]] სახით</rule>
    <rule icon="fork">იგივე სიტყვა → ცალკე ჩანაწერები</rule>
    <rule icon="cycle">ლექსიკონი სპეციფიკაციასთან ერთად იცვლება</rule>
  </b-ctx-rules>
  <b-cap>მიდგომა არის <a href="https://martinfowler.com/bliki/BoundedContext.html" target="_blank" rel="noopener">Bounded Context</a> და <a href="https://martinfowler.com/bliki/UbiquitousLanguage.html" target="_blank" rel="noopener">Ubiquitous Language</a>.</b-cap>
  <b-finding>
    <ex>ინვოისი და საშვი ჯავშანზე id-ით მიუთითებენ და მისი შიგთავსის შესახებ არაფერი იციან. „Level“ booking-ში სართულს ნიშნავს, access-ში კი — დაშვების დონეს, და ესენი ორი ცალკე ჩანაწერია.</ex>
    <gen>კონტექსტი არის არეალი, სადაც ყოველ სიტყვას ერთი მნიშვნელობა აქვს. როცა სიტყვა ორ კონტექსტში გვხვდება, იქმნება ორი ტერმინი სხვადასხვა სახელით; წინააღმდეგ შემთხვევაში აგენტი წესს ერთიდან მეორეში გადაიტანს.</gen>
    <do>დაახარისხეთ თქვენი აგრეგატები კონტექსტებად და იპოვეთ სიტყვები, რომლებიც ორში გვხვდება. თითოეულ ასეთ სიტყვას მიეცით ცალკე ჩანაწერები და სხვადასხვა სახელი ინტერფეისში.</do>
  </b-finding>
</b-chapter>
<b-chapter id="faq" icon="chat" title="ხშირად დასმული კითხვები">
  <b-faq-cards>
    <q t="რატომ მრავლდება სპეციფიკაციები?">თუ სპეციფიკაცია ფიჩას უკავშირდება, ფაილები ყოველ ამოცანასთან ერთად იზრდება და ერთი ცნება რამდენიმე ადგილას იცვლება.</q>
    <q t="რა არის სპეციფიკაცია აგრეგატის მიხედვით?">ერთი ჩანაწერი თითო საგნობრივ ცნებაზე, მაგალითად ჯავშანზე. ფიჩა მას მხოლოდ მოთხოვნებს უმატებს.</q>
    <q t="რატომ არის საჭირო MUST და SHOULD დონეები?">სიტყვა გეუბნებათ, როგორ შემოწმდეს მოთხოვნა: MUST ტესტით მოწმდება, SHOULD — რევიუზე. აგენტი MUST-ს მკაცრ საზღვრად კითხულობს.</q>
    <q t="რა ვქნათ, თუ სიტყვა ორ კონტექსტში სხვადასხვას ნიშნავს?">შექმენით ორი ტერმინი სხვადასხვა სახელით, თორემ აგენტი წესს ერთი კონტექსტიდან მეორეში გადაიტანს.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="წაიკითხეთ შემდეგ">
  <b-cta href="/blog/spec-reconcile-loop/" k="გაგრძელება" t="სპეციფიკაციების reconcile loop" icon="hub" sw="1.6">როგორც Kubernetes-ში: სასურველი მდგომარეობა, შემოწმებები და აგენტის გარემო</b-cta>
  <b-links cols="3">
    <item href="/blog/harness-driven-development/" k="შეცდომების ციკლი" t="Harness-Driven Development">როგორ იქცევა აგენტის შეცდომები წესებად</item>
    <item href="/blog/specs-rules-skills/" k="კონტექსტი" t="სპეციფიკაციები, bible, წესები და skill-ები">რა იცის აგენტმა პროექტის შესახებ და სად ინახება ეს</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="გარემო" t="Harness-ების შედარება">სად მუშაობს აგენტი და რას ხედავს</item>
    <item href="/blog/agent-checkpoint/" k="შემოწმებები" t="სად შევამოწმოთ AI აგენტის სამუშაო">აგრეგატი როგორც საკონტროლო წერტილი</item>
  </b-links>
</b-chapter>
<b-footer compact>ჯავშნის მაგალითი გამოგონილია. ტერმინები და მიდგომები დიაგრამების ქვეშ მითითებულ წყაროებს მიჰყვება.</b-footer>
</b-post>
