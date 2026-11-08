---
title: OpenSpec-ის დაყენება და ბრძანებები: ცვლილების მაგალითი გეგმიდან merge-მდე
date: 2026-11-07
updated: 2026-11-08
description: როგორ მუშაობს Fission AI-ის OpenSpec: ცვლილების საქაღალდე გეგმით, მოთხოვნებითა და ამოცანებით, აგენტის სამი ბრძანება და merge საერთო სპეციფიკაციებში. დაყენება ორი ბრძანებით, რეალური ცვლილება urvanov.com-ის საიტის რეპოზიტორიიდან, შედარება Spec Kit-თან და მზა პრომპტები დასაწყებად.
tags: AI, OpenSpec, სპეციფიკაციები, Spec-Driven Development, Claude Code, Codex, Cursor
category: specs
layout: wide
mentions: OpenSpec, Spec-Driven Development, Spec Kit, Claude Code, Codex, Cursor, GitHub Copilot
toc: what=რა არის | install=დაყენება | flow=სამი ბრძანება | example=მაგალითი | kit=OpenSpec თუ Spec Kit | start=როგორ დავიწყოთ | faq=კითხვები | next=დამატებით წასაკითხი
---

OpenSpec უფასო ღია კოდის ფრეიმვორკია სპეციფიკაციებზე დაფუძნებული დეველოპმენტისთვის (Spec-Driven Development). კოდამდე AI აგენტი პროექტის საქაღალდეში წერს ცვლილების გეგმას: რატომ არის ცვლილება საჭირო, მოთხოვნები, მიდგომა და ამოცანები. თქვენ გეგმას განიხილავთ, აგენტი კოდს ამოცანებით წერს, მზა მოთხოვნები კი პროექტის საერთო სპეციფიკაციებში ერწყმის. ქვემოთ: დაყენება, სამი ბრძანება და რეალური ცვლილების განხილვა.

<b-post series="specs">
<b-chapter id="what" icon="file-lines" title="რა არის OpenSpec">
  <b-why align="left">გეგმის გარეშე აგენტი კოდს პირდაპირ ჩატის შეტყობინებიდან წერს. განზრახვა მხოლოდ ამ ჩატში ცხოვრობს: ერთ კვირაში არავის ახსოვს, რატომ გაკეთდა ასე, და შემდეგი აგენტი თავიდან იწყებს და შეიძლება საკუთარი გზით გადააკეთოს.</b-why>
  <iso-art name="openspec/chat-vs-files"></iso-art>
  <b-why align="left">მარცხნივ ჩვეულებრივი გზაა: აგენტს ეუბნებით „გააკეთე ასე“, შემდეგ „და კიდევ ეს“, ის კი კოდს წერს. კოდი რჩება, მაგრამ ახსნა, რატომ გამოიყურება ასე, ჩატის ისტორიაში რჩება. მარჯვნივ OpenSpec-ით მუშაობაა: აგენტი ჯერ გეგმას პროექტის ფაილებში წერს, თქვენ ამ გეგმას კითხულობთ და ასწორებთ, და მხოლოდ შემდეგ წერს აგენტი კოდს მკაცრად მის მიხედვით. გეგმა რეპოზიტორიაში კოდთან ერთად ინახება, სადაც მას ყოველი თანაგუნდელი და ყოველი მომდევნო აგენტი ხედავს.</b-why>
  <b-why align="left">OpenSpec განზრახვას ჩატიდან კოდის გვერდით ფაილებში გადააქვს. ყოველ ცვლილებას საკუთარი საქაღალდე აქვს <code>openspec/changes</code>-ში: იქ ჩაწერილია რატომ, რომელი მოთხოვნები იცვლება, როგორ გაკეთდეს და რა ნაბიჯებით. მთელი სისტემის ცოცხალი მოთხოვნები ცალკე ინახება, <code>openspec/specs</code>-ში. ეს უბრალო Markdown-ია სპეციალური სინტაქსის გარეშე<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «Plain Markdown — requirements with concrete scenarios, no special syntax to learn» — github.com/Fission-AI/OpenSpec"/>, ამიტომ მას ადამიანიც კითხულობს და აგენტიც.</b-why>
  <iso-art name="term:openspec"></iso-art>
  <b-why align="left">სქემაზე ორი ნაწილია. ცვლილების საქაღალდე ჩანაწერია: მასში წერია, რას აპირებთ შეცვლას. საერთო სპეციფიკაციები სისტემას აღწერს ისეთს, როგორიც უკვე არის. სანამ ცვლილება მიმდინარეობს, საერთო სპეციფიკაციები ხელშეუხებელია. როცა კოდი მზადაა, ცვლილების საქაღალდის მოთხოვნები საერთო სპეციფიკაციებში გადადის და სისტემის აღწერა ისევ კოდს ემთხვევა. ყოველი ცვლილება ოთხი ფაილისგან შედგება:</b-why>
  <b-table>
  | ფაილი | რა კითხვას პასუხობს | რა არის შიგნით |
  |---|---|---|
  | <code>proposal.md</code> | რატომ? | ცვლილების მიზეზი და რა იცვლება ზუსტად |
  | <code>specs/</code> | რა უნდა იყოს ჭეშმარიტი? | მოთხოვნები SHALL-ით და MUST-ით და სცენარები „როცა — მაშინ“ |
  | <code>design.md</code> | როგორ? | ტექნიკური გადაწყვეტილებები, მიზნები, არამიზნები, რისკები |
  | <code>tasks.md</code> | რა თანმიმდევრობით? | ამოცანების ჩამონათვალი, რომელსაც აგენტი მიჰყვება |
  </b-table>
  <b-finding>
    <ex>ერთი ცვლილების ოთხი ფაილი ოთხ კითხვას პასუხობს: რატომ, რა, როგორ და რა თანმიმდევრობით.</ex>
    <gen>გეგმა კოდის გვერდითაა და მოწმდება მანამდე, სანამ აგენტი წერას დაიწყებს. იდეის ნაკლი ტექსტის ერთ აბზაცში ჩანს, კოდამდე მისვლამდე.</gen>
    <do>დიდ ცვლილებამდე სთხოვეთ აგენტს, ჯერ გეგმა ცვლილების საქაღალდეში ჩაწეროს და მხოლოდ შემდეგ დაწეროს კოდი.</do>
  </b-finding>
</b-chapter>

<b-chapter id="install" icon="terminal" title="დაყენება">
  <b-why align="left">OpenSpec-ს ორი ნაწილი აქვს. პირველი არის <code>openspec</code> ბრძანების ხაზის პროგრამა: მას ერთხელ აყენებთ კომპიუტერზე. მეორე კონკრეტული პროექტის მოწყობაა: <code>openspec init</code> მასში ქმნის <code>openspec/</code> საქაღალდეს და თქვენს აგენტებს ბრძანებებს ამატებს, როგორიცაა <code>/opsx:propose</code>.</b-why>
  <iso-art name="openspec/install"></iso-art>
  <b-why align="left">თანმიმდევრობა სქემაზე: ჯერ პროგრამა ჩნდება კომპიუტერზე, შემდეგ პროექტში ჩნდება <code>openspec/</code> საქაღალდე ორი ქვესაქაღალდით — <code>specs</code> ცოცხალი მოთხოვნებისთვის და <code>changes</code> მიმდინარე ცვლილებებისთვის — და ბოლოს თქვენი აგენტები ახალ ბრძანებებს იღებს. თვით პროექტის კოდი არ იცვლება: ემატება მხოლოდ გეგმების საქაღალდე და ბრძანებების ფაილები აგენტებისთვის. ბრძანება macOS-სა და Linux-ისთვის:</b-why>
  <b-codebox title="დაყენება macOS-სა და Linux-ზე">
    curl -fsSL https://openspec.dev/cli/install.sh | sh
  </b-codebox>
  <b-why align="left">თუ npm გირჩევნიათ, გჭირდებათ Node.js 22.12 ან უფრო ახალი<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «npm install -g @fission-ai/openspec@latest (needs Node.js 22.12.0 or higher)» — github.com/Fission-AI/OpenSpec"/>. Windows-ს საკუთარი PowerShell-ის დაყენების სკრიპტი აქვს, macOS-ს კი Homebrew-ს ფორმულა. შემდეგ გახსენით პროექტის საქაღალდე და ჩართეთ OpenSpec:</b-why>
  <b-codebox title="npm-ით და პროექტში">
    npm install -g @fission-ai/openspec@latest
    cd your-project
    openspec init
  </b-codebox>
  <b-why align="left"><code>openspec init</code> გეკითხებათ, რომელ აგენტებს იყენებთ, და ზუსტად მათთვის აყენებს ბრძანებებს. ბრძანების სახელი აგენტის მიხედვით განსხვავდება: <code>/opsx:propose</code> Claude Code-ში, <code>/opsx-propose</code> Cursor-სა და GitHub Copilot-ში, <code>$openspec-propose</code> Codex-ში<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «/opsx:propose is the canonical name; your tool may spell it /opsx-propose (Cursor, GitHub Copilot), @opsx-propose (Amazon Q) or $openspec-propose (Codex)» — github.com/Fission-AI/OpenSpec"/>. სტატიის დანარჩენ ნაწილში გამოყენებულია Claude Code-ის მართლწერა.</b-why>
  <b-why align="left">თუ პროექტში რამდენიმე აგენტი გამოიყენება, მაგალითად გუნდის ნაწილი Cursor-ში მუშაობს, ნაწილი Claude Code-ში, აირჩიეთ ყველა: ცვლილების გეგმა საერთოა, თითოეული აგენტი კი საკუთარ ბრძანებებს იღებს. პროგრამა უფასოა, ლოკალურად მუშაობს და ანგარიშს არ მოითხოვს.</b-why>
  <b-finding>
    <ex>ორი ბრძანება: ერთი პროგრამას აყენებს, მეორე პროექტს ამზადებს და აგენტებს აერთებს.</ex>
    <gen>ხელით დაყენება აუცილებელი არ არის: OpenSpec-ს აქვს მზა პრომპტი, რომლითაც აგენტი პროგრამას აყენებს, უშვებს <code>openspec init</code>-ს და შედეგს ამოწმებს.</gen>
    <do>სთხოვეთ აგენტს: „დააყენე OpenSpec და გაუშვი openspec init ამ პროექტში, აჩვენე რომელი ბრძანებები გაჩნდა“.</do>
  </b-finding>
</b-chapter>

<b-chapter id="flow" icon="list-arrow" title="სამი ბრძანება: გეგმა, კოდი, merge">
  <b-why align="left">მუშაობა სამი ბრძანების წრეზე მიდის. მათ წინ შეგიძლიათ ხმამაღლა იფიქროთ ბრძანებით <code>/opsx:explore</code>: აგენტი კოდს კითხულობს, ვარიანტებს გვთავაზობს და არაფერს ცვლის. როცა ცხადი ხდება, რა უნდა გაკეთდეს, მთავარი გზა იწყება.</b-why>
  <iso-art name="openspec/loop"></iso-art>
  <b-why align="left">წრე საათის ისრის მიმართულებით წაიკითხეთ. პირველი ბრძანება, <code>/opsx:propose</code>, აგენტს ეუბნება გეგმა დაწეროს: ის ქმნის ცვლილების საქაღალდეს და ოთხ ფაილს. შემდეგ თქვენი ჯერია: გეგმას კითხულობთ და ასწორებთ ჩატში ან უშუალოდ ფაილებში. ეს მთავარი საკონტროლო წერტილია, რადგან ტექსტის აბზაცის გასწორება უფრო იაფია, ვიდრე მზა კოდის გადაწერა. მეორე ბრძანება, <code>/opsx:apply</code>, ამოცანებით მუშაობას იწყებს: აგენტი <code>tasks.md</code>-დან ამოცანებს სათითაოდ იღებს და თითოეულს ნიშნავს. მესამე ბრძანება, <code>/opsx:archive</code>, ცვლილებას ხურავს: მოთხოვნები საერთო სპეციფიკაციებში გადადის, საქაღალდე კი არქივში მიდის გადაწყვეტილებების მთელი ისტორიით. შემდეგი ცვლილება განახლებული სპეციფიკაციებიდან იწყება.</b-why>
  <b-why align="left">აი, როგორ გამოიყურება მოკლე სესია ტერმინალში. სესიის ნიმუში აგებულია OpenSpec-ის აღწერაში არსებულ დემოზე<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «You: /opsx:propose add-dark-mode / AI: Created openspec/changes/add-dark-mode/ ✓ proposal.md ✓ specs/ ✓ design.md ✓ tasks.md … You: /opsx:archive / AI: Archived to openspec/changes/archive/… Specs updated.» — github.com/Fission-AI/OpenSpec"/>:</b-why>
  <b-agent-term app="Claude&#8203; Code" ver="v2" model="OpenSpec · /opsx" path="~/projects/shop">
    <line kind="ask">/opsx:propose add-dark-mode</line>
    <line kind="act">Created openspec/changes/add-dark-mode/</line>
    <line kind="out">proposal.md · specs/ · design.md · tasks.md</line>
    <line kind="you" note="თქვენ გეგმას განიხილავთ">დაამატე სცენარი: თემა გვერდის გადატვირთვის შემდეგ ინახება</line>
    <line kind="ask">/opsx:apply</line>
    <line kind="act">1.1 theme context ✓ · 1.2 toggle ✓ · 2.1 colours ✓</line>
    <line kind="out">all tasks complete</line>
    <line kind="ask">/opsx:archive</line>
    <line kind="act">მოთხოვნები გადავიდა openspec/specs-ში, ცვლილების საქაღალდე კი არქივში</line>
  </b-agent-term>
  <b-table>
  | ბრძანება | რას აკეთებს აგენტი | რა ჩნდება პროექტში | რას აკეთებთ თქვენ |
  |---|---|---|---|
  | <code>/opsx:explore</code> | კოდს კითხულობს, ვარიანტებს გვთავაზობს | არაფერი | ირჩევთ ვარიანტს |
  | <code>/opsx:propose</code> | წერს ცვლილების გეგმას | საქაღალდე <code>openspec/changes/name/</code> ოთხი ფაილით | გეგმას კითხულობთ და ასწორებთ |
  | <code>/opsx:apply</code> | კოდს წერს ამოცანებით, ნიშნავს მათ | კოდი და ტესტები | შედეგს ამოწმებთ |
  | <code>/opsx:archive</code> | მოთხოვნებს საერთო სპეციფიკაციებში აერთიანებს | განახლებული <code>openspec/specs</code>, დაარქივებული საქაღალდე | არაფერს, ეს დასასრულია |
  </b-table>
  <b-why align="left">დიდი ამოცანებისთვის არსებობს გაფართოებული ნაკრები: ცვლილების ნაბიჯ-ნაბიჯ შექმნა, მიმდინარის გაგრძელება, კოდის შემოწმება სპეციფიკაციასთან. ჩართეთ ის ბრძანებით <code>openspec config profile</code>.</b-why>
  <b-finding>
    <ex>დაარქივების შემდეგ <code>openspec/specs</code> სისტემის მიმდინარე აღწერას შეიცავს, გადაწყვეტილებების ისტორია კი ცვლილებების არქივშია.</ex>
    <gen>სპეციფიკაციები იმავე ნაბიჯში ახლდება, რომელშიც კოდი, ამიტომ ისინი ცალკე ვიკის მსგავსად არ ძველდება.</gen>
    <do>დაარქივებას ნუ გამოტოვებთ: მის გარეშე შემდეგი ცვლილება ძველ მოთხოვნებს ეყრდნობა.</do>
  </b-finding>
</b-chapter>

<b-chapter id="example" icon="notebook" title="მაგალითი: ცვლილება urvanov.com-ის საიტის რეპოზიტორიაში">
  <b-why align="left">ეს მაგალითი urvanov.com-ის რეპოზიტორიიდანაა, საიტიდან, სადაც ეს სტატია ქვეყნდება. საიტის კოდს აქვს <code>openspec/</code> საქაღალდე, სადაც ეს ცვლილება ინახება. საიტზე არის <a href="/patterns">AI პატერნების კატალოგი</a>: 73 ხერხი AI აგენტებთან სამუშაოდ, დაჯგუფებული 10 თემად, როგორიცაა კონტექსტი და მეხსიერება, ორკესტრაცია, უსაფრთხოება და ხარისხის კონტროლი. თითოეული ხერხი ბარათად არის ნაჩვენები. კატალოგი შეიქმნა როგორც თანმხლები მოხსენებისა „Spec-Driven Development პრაქტიკაში“ კონფერენციაზე Podlodka Crew.</b-why>
  <b-why align="left">პრობლემა: დაწკაპუნებისას 73 ბარათიდან 72 მხოლოდ სახელს და აღწერის ერთ სტრიქონს აჩვენებდა. ყოველი ბარათი სრულად უნდა გახსნილიყო: რომელ პრობლემას წყვეტს ხერხი, როგორ მუშაობს, პრაქტიკოსის ციტატა, როდის მუშაობს და როდის ტყდება. მასალა უკვე არსებობდა კვლევის ჩანაწერებში; ის ფრთხილად უნდა გადატანილიყო, არაფრის გამოგონების გარეშე. ცვლილებას ერქვა <code>fill-all-pattern-details</code>. აი, რა ჩაწერა აგენტმა თავის ოთხ ფაილში:</b-why>
  <b-table>
  | ფაილი | რა ეწერა |
  |---|---|
  | <code>proposal.md</code> | რატომ: კატალოგი მოხსენების მთავარი ნაწილია და ცარიელი ბარათები მას აფუჭებს; რა იცვლება: ყველა 73 ხერხი დეტალურ აღწერას იღებს |
  | <code>design.md</code> | ერთი ამოცანა პატერნების თითო კატეგორიაზე; ციტატები მხოლოდ საწყისი ფაილიდან, არაფერი გამოგონილი; დიაგრამა მხოლოდ იქ, სადაც მონაცემთა ნაკადია |
  | <code>specs/pattern-detail/spec.md</code> | მოთხოვნა „ყოველ პატერნს შევსებული detail აქვს“ და ბარათის ჩვენების სამი სცენარი |
  | <code>tasks.md</code> | 10 ამოცანა 10 კატეგორიაზე, ყველა მონიშნული |
  </b-table>
  <b-why align="left">ქვემოთ მოთხოვნების ფაილის ნაწყვეტია. SHALL სავალდებულო მოთხოვნას აღნიშნავს. Scenario შემოწმებაა: WHEN სიტუაციას აღწერს, THEN — რა უნდა მოხდეს. აქ detail ხერხის სრული აღწერაა, problem და solution კი მისი „პრობლემა“ და „გადაწყვეტა“ ნაწილებია.</b-why>
  <b-codebox title="მოთხოვნის ნაწყვეტი specs/pattern-detail/spec.md-დან">
    ## MODIFIED Requirements
    ### Requirement: Pattern detail content structure
    All patterns in all categories SHALL have a filled detail.
    #### Scenario: Partial content
    - WHEN the user opens a pattern that has only problem and solution
    - THEN the card shows only those sections, with no empty blocks
  </b-codebox>
  <b-why align="left">გადაწყვეტილება „ციტატები მხოლოდ წყაროდან“ design.md-ში კოდამდე ჩაიწერა. ამიტომ აგენტმა ციტატები არ გამოიგონა იქ, სადაც ისინი არ იყო, ხოლო სცენარმა „ნაწილობრივი შიგთავსი“ წინასწარ განსაზღვრა, როგორ გამოიყურება ბარათი ციტატისა ან დიაგრამის გარეშე.</b-why>
  <b-why align="left">სამუშაო 10 ამოცანას მოიცავდა, თითო კატალოგის თემაზე. ყველა 10 ამოცანა მონიშნულია, მაგრამ დაარქივების ბრძანება არასოდეს გაშვებულა: ცვლილების საქაღალდე ისევ <code>openspec/changes</code>-შია, საიტს კი საერთო სპეციფიკაციები არ აქვს. ეს გავრცელებული შეცდომაა. მოთხოვნა „ყოველ ხერხს დეტალური აღწერა აქვს“ მხოლოდ ცვლილების ჩანაწერში ცხოვრობს, და მომდევნო აგენტი, რომელიც საერთო სპეციფიკაციებს კითხულობს, მის შესახებ ვერ გაიგებს. ერთი ბრძანება <code>/opsx:archive</code> მას საერთო სპეციფიკაციებში გადაიტანდა.</b-why>
  <b-finding>
    <ex>სცენარი „ნაწილობრივი შიგთავსი“ გეგმაში კოდამდე გაჩნდა და განსაზღვრა, როგორ იქცევა ბარათი ციტატის ან დიაგრამის გარეშე.</ex>
    <gen>მოთხოვნები სცენარებით „როცა — მაშინ“ ტესტებივით იკითხება: აგენტმა იცის, რა ითვლება მზადად.</gen>
    <do>ყოველ მოთხოვნაში ჩაწერეთ მინიმუმ ერთი სცენარი ზღვრული შემთხვევისთვის: ცარიელი მონაცემები, ნაწილობრივი მონაცემები, შეცდომა.</do>
  </b-finding>
</b-chapter>

<b-chapter id="kit" icon="crosshair" title="OpenSpec თუ Spec Kit">
  <b-why align="left">ორივე დეველოპმენტს სპეციფიკაციიდან მართავს, მაგრამ რიგითობას სხვადასხვანაირად ხედავს. GitHub-ის Spec Kit ფაზებს მკაცრად ერთმანეთის მიყოლებით გადის. OpenSpec საშუალებას გაძლევთ გეგმას ნებისმიერ დროს დაუბრუნდეთ და შექმნილია პროექტისთვის, სადაც კოდი უკვე არსებობს<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «fluid not rigid → iterative not waterfall → easy not complex → built for brownfield not just greenfield» — github.com/Fission-AI/OpenSpec"/>.</b-why>
  <b-table>
  | | OpenSpec | Spec Kit |
  |---|---|---|
  | ნაბიჯების რიგითობა | მოქნილი: გეგმას ნებისმიერ დროს შეგიძლიათ დაუბრუნდეთ | ფიქსირებული ფაზები: პრინციპები, spec, გეგმა, ამოცანები, კოდი |
  | სად ცხოვრობს სპეციფიკაციები | <code>openspec/specs</code> და ცვლილებების საქაღალდეები | ფუნქციის საქაღალდე spec-ით, გეგმითა და ამოცანებით |
  | რომელი პროექტი | ერგება კოდს, რომელიც უკვე მუშაობს | ერგება ახალ ფუნქციას ნულიდან |
  | რამდენიმე რეპოზიტორია | გეგმების საერთო საცავი (Stores, ბეტა) | თითოეული რეპოზიტორია ცალკე |
  | ავტორი | Fission AI | GitHub |
  </b-table>
  <b-finding>
    <ex>OpenSpec საკუთარ თავს მოქნილად და არსებული კოდისთვის შექმნილად აღწერს.</ex>
    <gen>Spec Kit ნაბიჯებს გატარებს და გუნდს ერგება, რომელსაც დისციპლინა სჭირდება. OpenSpec უფრო მსუბუქია და უფრო სწრაფად მკვიდრდება პროექტში, სადაც კოდი უკვე არსებობს.</gen>
    <do>მოქმედ პროექტში ცვლილებებისთვის დაიწყეთ OpenSpec-ით; დიდი ახალი ფუნქციისთვის ნულიდან ორივე სცადეთ ერთ ამოცანაზე.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="როგორ დავიწყოთ">
  <b-why align="left">დაიწყეთ ერთი პატარა ცვლილებით, რომელსაც ისედაც აპირებდით. ხუთი პრომპტი აგენტისთვის, თითო ნაბიჯზე: ჩასვით ისინი Claude Code-ში, Codex-ში ან Cursor-ში და შეავსეთ თქვენი ამოცანა.</b-why>
  <b-hdd-steps>
    <step t="დაყენება">„დააყენე OpenSpec და გაუშვი openspec init ამ პროექტში. აჩვენე, რომელი ბრძანებები გაჩნდა“</step>
    <step t="კვლევა">„/opsx:explore მინდა დავამატო … შეხედე კოდს და შემომთავაზე ორი ვარიანტი არაფრის შეცვლის გარეშე“</step>
    <step t="გეგმა">„/opsx:propose … ჯერ მხოლოდ გეგმა. მოთხოვნებში მომეცი სცენარები ცარიელი და ნაწილობრივი მონაცემებისთვის“</step>
    <step t="კოდი">„/opsx:apply შეასრულე ამოცანები სათითაოდ და თითოეულის შემდეგ გაუშვი ტესტები“</step>
    <step t="Merge">„/opsx:archive გადაიტანე მოთხოვნები სპეციფიკაციებში და აჩვენე, რა შეიცვალა openspec/specs-ში“</step>
  </b-hdd-steps>
</b-chapter>

<b-chapter id="faq" icon="chat" title="ხშირად დასმული კითხვები">
  <b-faq-cards>
    <q t="რა არის OpenSpec?">Fission AI-ის უფასო ღია კოდის ფრეიმვორკი სპეციფიკაციებზე დაფუძნებული დეველოპმენტისთვის. აგენტი ცვლილების გეგმას Markdown ფაილებში წერს, თქვენ მას განიხილავთ, აგენტი კოდს წერს, მოთხოვნები კი პროექტის საერთო სპეციფიკაციებში ერწყმის.</q>
    <q t="როგორ დავაყენო OpenSpec?">macOS-სა და Linux-ზე curl -fsSL https://openspec.dev/cli/install.sh | sh ბრძანებით, ან npm install -g @fission-ai/openspec@latest-ით. შემდეგ პროექტის საქაღალდეში გაუშვით openspec init.</q>
    <q t="რით განსხვავდება OpenSpec Spec Kit-ისგან?">OpenSpec უფრო მოქნილია და შექმნილია კოდისთვის, რომელიც უკვე მუშაობს; ნაბიჯები ნებისმიერი თანმიმდევრობით შეიძლება განმეორდეს. GitHub-ის Spec Kit ფიქსირებულ ფაზებს გადის: პრინციპები, spec, გეგმა, ამოცანები, კოდი.</q>
    <q t="რომელ აგენტებთან მუშაობს OpenSpec?">Claude Code, Codex, Cursor, GitHub Copilot, Amazon Q და სხვები. openspec init ბრძანებებს თქვენ მიერ არჩეული აგენტებისთვის აყენებს.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="დამატებით წასაკითხი">
  <b-links>
    <item href="/blog/specs-rules-skills/" k="კონტექსტი" t="AGENTS.md და CLAUDE.md">რა უნდა იცოდეს აგენტმა პროექტის შესახებ და სად შეინახოს</item>
    <item href="/blog/specs-by-aggregates/" k="სპეციფიკაციები" t="სპეციფიკაციები აგრეგატების მიხედვით">როგორ დავყოთ მოთხოვნები ნაწილებად</item>
    <item href="/blog/spec-reconcile-loop/" k="სპეციფიკაციები" t="სპეციფიკაციების reconcile loop">როგორ შევათანხმოთ სპეციფიკაცია და კოდი</item>
    <item href="/materials/glossary/spec-driven-development/" k="ტერმინი" t="Spec-Driven Development">რა არის სპეციფიკაციებზე დაფუძნებული დეველოპმენტი</item>
  </b-links>
</b-chapter>
</b-post>
