---
title: AI აგენტის სიმწიფის დონეები: ჩატიდან სპეციფიკაციებამდე, skills-მდე, კოდამდე, harness-ამდე და აგენტურ სისტემამდე
date: 2026-11-14
updated: 2026-11-17
description: როგორ იზრდება დეველოპერის მუშაობა AI-თან ჩატიდან აგენტურ სისტემამდე: რა იწერება ყოველ საფეხურზე, როდის გადავიდეთ შემდეგზე და რა ჯდება ეს.
tags: AI, აგენტები, სპეციფიკაციები, skills, harness, სიმწიფე, compound engineering
category: specs
layout: wide
mentions: Compound Engineering, Agent Skills, AGENTS.md, CLAUDE.md, Spec-Driven Development, Progressive Crystallization, Harness engineering, Harness-Driven Development
toc: map=შვიდი საფეხური | sources=რას ამბობს ბაზარი | chat=ჩატი | agent=აგენტი და წესები | spec=სპეციფიკაცია | skill=Skill | script=სკრიპტი | crystal=საფეხურის ფასი | harness=Harness | system=აგენტური სისტემა | traps=ხაფანგები | stop=როდის გავჩერდეთ | start=საიდან დავიწყოთ | faq=კითხვები | next=დამატებით
---

AI აგენტის სიმწიფის დონეები ჩატიდან აგენტზე, სპეციფიკაციაზე, skill-ზე, სკრიპტზე, harness-სა და აგენტურ სისტემამდე ადის: ყოველ საფეხურზე ის, რასაც ადამიანი სიტყვებით ხსნიდა, ფაილში ან კოდში იწერება და აღარავის მეხსიერებაზე არ არის დამოკიდებული. <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>-ის, <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a>-ს, <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>-ის, <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a>-ის, <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a>-ისა და <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a>-ს კიბეები ერთსა და იმავე თანმიმდევრობას სხვადასხვა ვარიანტით აღწერს. ქვემოთ: საფეხურები, გადასვლები მათ შორის და ბოლო საფეხურების ფასი.

<b-post series="prompts">
<b-chapter id="map" title="შვიდი საფეხური" icon="stairs">
  <b-art names="ai-agent-maturity-levels/ladder ai-agent-maturity-levels/ladder-mobile"></b-art>
  <b-cap>შვიდი საფეხური. რუხი არის ადამიანი, ლურჯი არის აგენტი და ყველაფერი, რაც მისთვის არის ჩაწერილი, ნარინჯისფერი არის რისკი: ხელახლა ახსნის აუცილებლობა. ნარინჯისფერი ბაგი Harness-ის საფეხურზე მზა ანგარიშში ნაპოვნი შეცდომაა: harness მას შემოწმებად აქცევს, ისრით ნაჩვენები, რათა იგივე შეცდომა არ დაბრუნდეს.</b-cap>
  <b-why>სურათი აჩვენებს, სად მიდის ცოდნა. ჩატში ის ადამიანის თავში და საუბარშია. შემდეგ სათითაოდ გადადის აგენტის სესიაში, მოთხოვნების ფაილში, პროცედურის ფაილში, სკრიპტში და ბოლოს რეპოზიტორიაში შემოწმებებთან ერთად. ქვემოთ ცხრილი იმავე ანგარიშს ორშაბათებით გადის: რას აკეთებს ადამიანი ხელით და რა ხდება მომდევნო ორშაბათს.</b-why>
  <b-table code="prose">
    <table>
    <thead>
      <tr><th>საფეხური</th><th>რას აკეთებს ადამიანი ხელით</th><th>სად ცხოვრობს ცოდნა</th><th>რა ხდება მომდევნო ორშაბათს</th></tr>
    </thead>
    <tbody>
      <tr><td><b>1. ჩატი</b></td><td>ჩატში ათავსებს გაყიდვების ცხრილს და ხსნის, რომელი სვეტებია საჭირო</td><td>თავში და საუბარში</td><td>ყველაფერი ხელახლა აიხსნება</td></tr>
      <tr><td><b>2. <a class="s-term" href="/materials/glossary/ai-agent/">აგენტი</a></b></td><td>ფაილებზე წვდომის მქონე აგენტს ანგარიშის აგებას სთხოვს, ასწორებს და წესების ფაილში „თანხები რუბლებში“ ამატებს</td><td>სესიაში და წესების ფაილში</td><td>აგენტს წესები ახსოვს, მაგრამ არა ის, როგორ დათვალა წინა ჯერზე</td></tr>
      <tr><td><b>3. <a class="s-term" href="/materials/glossary/spec-driven-development/">სპეციფიკაცია</a></b></td><td>წერს spec.md: რომელი სვეტები, საიდან მოდის მონაცემები, როგორ გავიგოთ, რომ ანგარიში მზადაა</td><td><code>spec.md</code>-ში</td><td>ნებისმიერი აგენტი იმავე აღწერიდან იმავე ანგარიშს აგებს</td></tr>
      <tr><td><b>4. <a class="s-term" href="/materials/glossary/agent-skills/">Skill</a></b></td><td>ანგარიშის აგების თანმიმდევრობას skill-ად აქცევს</td><td><code>SKILL.md</code>-ში ნაბიჯებითა და მაგალითებით</td><td>აგენტი ანგარიშის მოთხოვნისას skill-ს თავად პოულობს</td></tr>
      <tr><td><b>5. სკრიპტი</b></td><td>skill-დან სტაბილურ ნაბიჯებს ამოიყვანს სკრიპტში ექსპორტისა და შემაჯამებელი ცხრილისთვის: skill მონაცემებზე წამგებიანია, სკრიპტი კი ყოველ ჯერზე ერთნაირად ითვლის</td><td><code>report.py</code>-ში</td><td>ექსპორტი წამებში სრულდება მოდელის ხარჯის გარეშე და იმავე მონაცემებზე იმავე შედეგს იძლევა; მოდელი მხოლოდ დასკვნებს წერს</td></tr>
      <tr><td><b>6. <a class="s-term" href="/materials/glossary/harness/">Harness</a></b></td><td>კითხულობს მზა ანგარიშს; ანგარიშიდან შეცდომა აგენტის გარემოში ახალ წესად ან შემოწმებად იქცევა</td><td>რეპოზიტორიაში: წესები, შემოწმებები, hooks</td><td>იგივე შეცდომა აღარ ბრუნდება: წესი და შემოწმება თავისით მუშაობს</td></tr>
      <tr><td><b>7. <a class="s-term" href="/materials/glossary/agentic-system/">აგენტური სისტემა</a></b></td><td>აგენტს მხოლოდ რთულ ნაწილებს აძლევს, მაგალითად მომხმარებლის მოთხოვნების დახარისხებას, დანარჩენს კოდსა და შემოწმებებს უტოვებს</td><td>ერთ სერვისში: კოდი, განრიგი, შემოწმებები და აგენტი რთულ ადგილებში</td><td>ანგარიში განრიგით მოდის: დეტერმინისტული ნაბიჯები კოდად სრულდება, რთულ ნაწილს აგენტი წყვეტს ჩაწერილი მიზეზებით, ადამიანი მხოლოდ შეუსაბამობის შეტყობინებას ამუშავებს</td></tr>
    </tbody>
    </table>
  </b-table>
  ეს სტატია ერთი საფეხურიდან მეორეზე გადასვლას უწოდებს <b><a class="s-term" href="/materials/glossary/pulling-out/">ამოყვანას</a></b> (რუსულ ვერსიაში „vytyagivanie“): განმეორებადი ნაწილი იმისა, რასაც ადამიანი და აგენტი უკვე ერთად აკეთებდნენ, ამოიყვანება და ერთი საფეხურით ზემოთ ჩაიწერება. ეს ორგანიზაციაში პროცესების განვითარების ევოლუციური პროცესია: ისინი წინასწარ მთლიანად არ დაიგეგმება, არამედ განმეორებადი მუშაობიდან ნაბიჯ-ნაბიჯ იზრდება. წესები ჩატიდან ამოიყვანება, სპეციფიკაცია წესებიდან და კარგი სესიებიდან, skill-ის პროცედურა სპეციფიკაციიდან, სკრიპტი skill-იდან, harness კი შეცდომებიდან და აგენტის გარშემო შემოწმებებიდან. კიბის დასასრული აგენტური სისტემაა. ყველაფერი მიდგომით „აგენტი აკეთებს“ იწყება, მაგრამ გზის ბოლოს აგენტების წილი მცირე რჩება: სისტემის საფუძველი კლასიკური კოდი, შემოწმებები და განრიგია, აგენტები კი მხოლოდ რთულ ბლოკებს იღებენ, რომლებიც სხვაგვარად არ წყდება. სამუშაო ქცევა თავიდან არ იგონება. ის უკვე მომუშავედან მოდის და იქ ფიქსირდება, სადაც მისი ახსნა აღარ არის საჭირო.
  <b-finding>
    <ex>ერთმა ყოველკვირეულმა ანგარიშმა ჩატში განმეორებითი ახსნიდან განრიგით ანგარიშამდე გაიარა გზა.</ex>
    <gen>საფეხურს განსაზღვრავს, სად ცხოვრობს ცოდნა: ადამიანის თავში, სესიაში, ფაილში თუ კოდში. რაც მეტია ჩაწერილი, მით ნაკლებია დამოკიდებული ადამიანის მეხსიერებასა და მოდელის გუნებაზე.</gen>
    <do>აირჩიეთ ერთი განმეორებადი ამოცანა და ცხრილით ნახეთ, რომელ საფეხურზეა.</do>
  </b-finding>
</b-chapter>

<b-chapter id="sources" title="ავტორის პოზიცია და რას ამბობს ბაზარი" icon="book">
  <b-why>ზემოთ მოცემული შვიდი საფეხური ავტორის პოზიციაა, აგებული ერთი კრიტერიუმით: რა ზუსტად იწერება საფეხურზე. ბაზარზე სხვადასხვა ავტორი ერთსა და იმავე მოძრაობას აღწერს, თითოეული თავისი მონაკვეთით: ზოგი წესებზე, ზოგი სპეციფიკაციებზე, სხვები skills-ზე ან harness-ზე. ყველა ერთი მიმართულებით მიდის: საუბრიდან ფაილში და ფაილიდან კოდში. ცხრილი აჩვენებს, როგორ ემთხვევა საფეხურები წყაროებს.</b-why>
  <b-art names="ai-agent-maturity-levels/matrix"></b-art>
  <b-cap>შევსებული ნიშნავს, რომ ავტორი საფეხურს ცალსახად აღწერს, რგოლი ნიშნავს, რომ აღწერილია ახლო ეკვივალენტი (მაგალითად, „deterministic tooling“ <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a>-სა და <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a>-თან სკრიპტთან ახლოდ ითვლება). ქვედა სტრიქონი ამ სტატიის შვიდი საფეხურია; ბოლო საფეხურს მხოლოდ <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a> აღწერს ცალსახად.</b-cap>

  მატრიცა აჩვენებს, როგორ არის ბაზარი მოწყობილი: თითოეული ავტორი გზის თავის მონაკვეთს აღწერს და ერთად მონაკვეთები ყველა შვიდ საფეხურს ფარავს. <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a>-ს არ აქვს სპეციფიკაციები და skills, Rezvov-სა და Clark-ს არ აქვთ skills, <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a>-ს არ აქვს სკრიპტი. დეტალები თითოეული ავტორისთვის ქვემოთ ცხრილშია.
  <b-table>
    <table>
    <thead>
      <tr><th>წყარო</th><th>საფეხურები თანმიმდევრობით</th><th>სად არის სპეციფიკაციები და skills</th></tr>
    </thead>
    <tbody>
      <tr><td><a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every, Compound Engineering</a> (Kieran Klaassen)</td><td>ხელით დეველოპმენტი → ჩატი → აგენტი სტრიქონ-სტრიქონ review-ით → ჯერ გეგმა და მზა PR-ის review → იდეიდან PR-მდე → პარალელური ღრუბლოვანი აგენტები</td><td>გეგმა მე-3 ეტაპზე; skills და წესები Compound საფეხურზე ემატება</td></tr>
      <tr><td><a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a>, 05.02.2026</td><td>ჩატბოტის მიტოვება → საკუთარი მუშაობის აგენტით გამეორება → დღის ბოლოს აგენტები → მარტივი ამოცანების გადაცემა → harness-ის ინჟინერია → აგენტი ყოველთვის მუშაობს</td><td>AGENTS.md და დაპროგრამებული შემოწმებები მე-5 საფეხურზე; სპეციფიკაციებისა და skills-ის გარეშე</td></tr>
      <tr><td><a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>, 10.03.2026</td><td>8 დონე: tab complete და IDE ჩატი → კონტექსტი → compounding → MCP და skills → harness → ფონური აგენტები → აგენტთა გუნდები</td><td>skills მე-5 დონეზე; სპეციფიკაციების გარეშე</td></tr>
      <tr><td><a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a>, 06.04.2026</td><td>L0 საცნობარო → L1 აგენტის ძიძობა → L2 წესები → L3 deterministic tooling → L4 SDD → L5 ავტონომიური აგენტები</td><td>სპეციფიკაციები L4-ზე; skills-ის გარეშე</td></tr>
      <tr><td><a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a>, Hyperact, 05.01.2026</td><td>7 დონე: ხელით პრომპტინგი → IDE დახმარება → წვდომა რეპოზიტორიაზე → deterministic tooling → გუნდის კონტექსტი → სპეციალიზებული პარალელური სამუშაო პროცესები → spec-driven development</td><td>სპეციფიკაციები მე-7 დონეზე; skills-ის გარეშე</td></tr>
      <tr><td><a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a>, 23.01.2026</td><td>დონეები 0–5 ავტომობილის ავტომატიზაციის ანალოგიით: ავტოდაწყებიდან „dark factory“-მდე</td><td>სპეციფიკაციები და skills მე-4 დონეზე; მე-5 დონეზე სპეციფიკაციები პროგრამულ უზრუნველყოფად იქცევა</td></tr>
      <tr><td><a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat, Naszcyniec</a>, 30.03.2026</td><td>ოთხი სვეტი სტეკად: vibes → სპეციფიკაციები → skills → აგენტები</td><td>ოთხივე ერთ სქემაში</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-callout icon="bulb">**წესების ფაილი** (CLAUDE.md, AGENTS.md) სხვადასხვა ადგილას დგას. <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>-თან, <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a>-თან და <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>-თან ის პირველი აგენტის შემდეგ მაშინვე ჩნდება; <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a>-თან და <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a>-თან მხოლოდ მეხუთე დონეზე. ამ სტატიაში ის „აგენტის“ საფეხურს ეკუთვნის: სწორედ პირველი ჩანაწერი „აგენტმა შეცდომა დაუშვა, წესი დაემატა“ აქცევს ჩატს მეხსიერების მქონე აგენტად.</b-callout>
  <b-callout icon="trend-up">Eledath-ის, <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a>-სა და Clark-ის კიბეები საფეხურებს ავტონომიით ითვლის: რამდენი აგენტი მუშაობს და რამდენად იშვიათად უყურებს ადამიანი კოდს. ამ სტატიის საფეხურები იმით ითვლება, სად ცხოვრობს ცოდნა. ორივე სკალა ეთანხმება ერთმანეთს: როცა ცოდნა ჩაწერილია, აგენტს მეტის ნდობა შეიძლება.</b-callout>
  <b-finding>
    <ex>Rezvov, Clark და Shapiro სპეციფიკაციებს აყენებენ, Eledath და Shapiro skills-ს; ეს სტატია მათ ერთ კიბეზე ათავსებს.</ex>
    <gen>სხვადასხვა კიბე ერთსა და იმავე მოძრაობას სხვადასხვა მხრიდან აღწერს: ჯერ ყველაფერი საუბარშია, შემდეგ ფაილში, შემდეგ კოდში.</gen>
    <do>შეადარეთ საკუთარი გამოცდილება ზემოთ მოცემულ შვიდ საფეხურს და არა რომელიმე ერთი ავტორის სიას.</do>
  </b-finding>
</b-chapter>

<b-chapter id="chat" title="საფეხური 1. ჩატი: ცოდნა საუბარში ცხოვრობს" icon="chat">
  <b-why>ჩატში ადამიანი მონაცემებს აქეთ-იქით გადააქვს და ხელით ამბობს, რომ პასუხი არასწორია. ერთჯერადი კითხვისთვის ეს საკმარისია.</b-why>
  <b-art names="ai-agent-maturity-levels/chat"></b-art>
  <b-cap>სამი ორშაბათი ზედიზედ ადამიანი ერთსა და იმავე კითხვებზე პასუხობს. ცოდნა იმის შესახებ, რა სჭირდება ანგარიშს, მხოლოდ მის თავში რჩება.</b-cap>
  <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> ამ რეჟიმს საცნობაროს უწოდებს: აგენტი როგორც „Stack Overflow, ოღონდ უფრო მეგობრული“, და ამატებს, რომ ეს ნამდვილად არ არის დონე. <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> მნიშვნელოვანი სამუშაოსთვის ჩატბოტის მიტოვებას გვირჩევს<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: “To find value, you must use an agent” — mitchellh.com/writing/my-ai-adoption-journey"></b-proof>, რადგან აგენტი ფაილებს კითხულობს, პროგრამებს უშვებს და შედეგს თავად ამოწმებს. <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> და <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> ჩატს პირველ დონეზე აყენებენ: ფრაგმენტების აქეთ-იქით კოპირება.

  ამ საფეხურზეც კი <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> გვირჩევს, ჩავინიშნოთ პრომპტები, რომლებმაც იმუშავა: პირველი ჩანაწერი, წესების ფაილამდეც<b-proof href="https://every.to/guides/compound-engineering" quote="Every: “Keep a running note of prompts that worked well” — every.to/guides/compound-engineering"></b-proof>. ჩანაწერი პასუხობს კითხვას „როგორ ავუხსენი ეს წინა ჯერზე“, თუმცა აგენტი მას ჯერ არ კითხულობს.
  <b-finding>
    <ex>ყოველ ორშაბათს ანგარიშის სვეტები ხელახლა უნდა აიხსნას.</ex>
    <gen>ჩატი შეთანხმებებს საუბრებს შორის არ ინახავს. გამოსავალს Rezvov ასე აღწერს: როცა ერთსა და იმავეს გამეორება დაგღალავს, განმეორებადი ინსტრუქციები წესებად იქცევა.</gen>
    <do>როცა ერთსა და იმავეს მეორედ ხსნით, გადადით შემდეგ საფეხურზე.</do>
  </b-finding>
</b-chapter>

<b-chapter id="agent" title="საფეხური 2. აგენტი და წესების ფაილი" icon="bot">
  <b-why>აგენტი წვდომას იღებს ფაილებსა და ბრძანებებზე და თავად მოქმედებს. პირველი ჩანაწერი, რომელიც მისთვის კეთდება, წესების ფაილია: სია იმისა, რაც აგენტმა ყოველ სესიაში უნდა იცოდეს პროექტის შესახებ.</b-why>
  <b-art names="ai-agent-maturity-levels/agent-rules"></b-art>
  <b-cap>აგენტის შეცდომა წესების ფაილის სტრიქონად იქცევა და აგენტის შემდეგი სესია უკვე მასთან იწყება.</b-cap>
  <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> ამ საფეხურს სიტყვასიტყვით გაივლის: მან ყველა თავისი ხელით კომიტი აგენტით ხელახლა გააკეთა<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: “I literally did the work twice” — mitchellh.com/writing/my-ai-adoption-journey"></b-proof> და სამი გაკვეთილი გამოიტანა: სამუშაო მკაფიო ამოცანებად დაყავი, დაგეგმვა შესრულებისგან გამიჯნე და აგენტს შედეგის შემოწმების საშუალება მიეცი. <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>-ის გზამკვლევი ჩაწერისკენ პირველ ნაბიჯს გვთავაზობს: შექმენით CLAUDE.md ფაილი და აგენტის ყოველი შეცდომის შემდეგ ჩანაწერი დაამატეთ.
  <b-steps>
    <step t="აგენტმა შეცდომა დაუშვა">მაგალითად, თანხები რუბლების ნაცვლად დოლარებში დათვალა.</step>
    <step t="სტრიქონი წესების ფაილში">„ანგარიშში თანხები რუბლებშია“: ერთი სტრიქონი ერთ ცუდ ქცევაზე. Hashimoto წერს, რომ Ghostty პროექტის ფაილში ყოველი სტრიქონი აგენტის ცუდ ქცევას ეფუძნება<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: “Each line in that file is based on a bad agent behavior” — mitchellh.com/writing/my-ai-adoption-journey"></b-proof>.</step>
    <step t="შემდეგი სესია">აგენტი დასაწყისში ფაილს კითხულობს და შეცდომას არ იმეორებს.</step>
  </b-steps>
  <b-callout icon="alert-circle">წესების ფაილი შეიძლება გადაიტვირთოს. <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> აფრთხილებს, რომ ცუდად დაწერილი წესები უარეს შედეგს იძლევა, ვიდრე წესების არქონა<b-proof href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" quote="Rezvov: “poorly written rules can actually make output worse than having no rules at all” — dev.to/arezvov"></b-proof>. <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> გვირჩევს, ყველაფერი წესების ფაილში არ ჩავდოთ: უკეთესია, აქტუალური docs საქაღალდე გვქონდეს, სადაც აგენტი საჭიროს იპოვის.</b-callout>

  Hashimoto საფეხურს ჩვევად აქცევს: სამუშაო დღის ბოლო ნახევარ საათში ის აგენტებს კვლევისთვის, ბუნდოვანი იდეებისთვის და ამოცანების დახარისხებისთვის უშვებს, რათა დილით „თბილი დასაწყისი“ მიიღოს<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: “warm start” — mitchellh.com/writing/my-ai-adoption-journey"></b-proof>. აგენტებს ღამით არ ტოვებს: მისი ამოცანების უმეტესობა ნახევარ საათზე ნაკლებში სრულდება. Every აფრთხილებს, რომ დეველოპერების უმეტესობა ამ საფეხურზე ჩერდება<b-proof href="https://every.to/guides/compound-engineering" quote="Every: “Most developers plateau here” — every.to/guides/compound-engineering"></b-proof>, აგენტის ყოველ ქმედებას ხელით ამტკიცებს.
  <b-finding>
    <ex>სტრიქონი რუბლების შესახებ წესების ფაილში ერთ განმეორებად შეცდომას სამუდამოდ ხურავს.</ex>
    <gen>წესი შეთანხმებას ინახავს, მაგრამ არა ამოცანის მთელ განზრახვას: რა უნდა გაკეთდეს და როგორ გავიგოთ, რომ მზადაა, მასში არ წერია.</gen>
    <do>წესების ფაილი მოკლე დაიტოვეთ; ამოცანის აღწერა სპეციფიკაციაში გადაიტანეთ. მეტი სტატიაში <a href="/blog/specs-rules-skills/">AGENTS.md, CLAUDE.md და spec.md: რა სად ჩავწეროთ</a>.</do>
  </b-finding>
</b-chapter>

<b-chapter id="spec" title="საფეხური 3. სპეციფიკაცია: განზრახვა კოდამდე იწერება" icon="file-lines">
  <b-why>სპეციფიკაცია ერთ ამოცანას აღწერს: რა უნდა გამოვიდეს და როგორ გავიგოთ, რომ მზადაა. აგენტი და ადამიანი ერთსა და იმავე ტექსტს კითხულობენ, review კი შედეგს მას ადარებს.</b-why>
  <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> სპეციფიკაციებს ორ სახეობად ყოფს: „რა“ (მიზანი, მოთხოვნები, წარმატების კრიტერიუმები) და „როგორ“ (უსაფრთხოება, სტრუქტურა, ტესტები, სტანდარტები). ავტორი გვირჩევს ერთი გრძელი დოკუმენტის ნაცვლად რამდენიმე პატარა ფაილს, როგორიცაა <code>what-vision.md</code>, <code>how-security.md</code> და <code>how-testing.md</code>, რომ მხოლოდ რელევანტური კონტექსტი ჩაიტვირთოს<b-proof href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" quote="Naszcyniec, Red Hat: “the days of the 100-page PDF specification are over” — developers.redhat.com"></b-proof>. <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> ბოლომდე თვალყურადევნებას ამატებს: მოთხოვნას აქვს იდენტიფიკატორი, მაგალითად FR-AUTH-PASSWORDRESET, და ის ჩანს API-ის აღწერაში, კოდსა და ტესტებში<b-proof href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" quote="Rezvov: “The core of SDD is traceability” — dev.to/arezvov"></b-proof>.
  სპეციფიკაციას საკუთარი სიმწიფის კიბეც აქვს. პირველი სამი დონე Birgitta <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a>-მა (Thoughtworks) აღწერა<b-proof href="https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html" quote="Böckeler: three maturity levels of a spec, spec-first, spec-anchored and spec-as-source (paraphrase) — martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html"></b-proof>; მეოთხე, Spec-in-the-loop, საიტის ავტორის გამოსვლაში <a href="/talk/spec-driven-development/">„Spec-Driven Development“</a> (რუსულ ენაზე) ემატება: <a href="/slide/20/">ოთხი დონის სლაიდზე</a> სპეციფიკაცია მომუშავე სისტემისგან სწავლობს და მისი მეტრიკები და ინციდენტები სპეციფიკაციას ასწორებს.
  <b-art names="ai-agent-maturity-levels/spec-levels"></b-art>
  <b-cap>როგორც გამოსვლის სლაიდზე: სპეციფიკაცია მარცხნივ, კოდი მარჯვნივ, ისრები აჩვენებს, რა რისგან მოდის და ვინ აბრუნებს ცვლილებებს. რუხი წყვეტილი ისარი ნიშნავს, რომ ცვლილებას ადამიანი აბრუნებს, ლურჯი კი, რომ მომუშავე სისტემა თავად. მარჯვნივ: რას წყვეტს დონე და რა ბლოკავს მას.</b-cap>
  <b-table>
    <table>
    <thead>
      <tr><th>სპეციფიკაციის დონე</th><th>რა ემართება სპეციფიკაციას</th><th>მაგალითი პროგრამა</th></tr>
    </thead>
    <tbody>
      <tr><td><b>Spec-first</b></td><td>სპეციფიკაცია კოდამდე იწერება და ერთ ამოცანაზე გამოიყენება</td><td>GitHub Spec Kit</td></tr>
      <tr><td><b>Spec-anchored</b></td><td>სპეციფიკაცია ამოცანის შემდეგაც ცოცხლობს: ცვლილებები მასში ერწყმის</td><td><a href="/blog/openspec/">OpenSpec</a></td></tr>
      <tr><td><b>Spec-as-source</b></td><td>ადამიანი მხოლოდ სპეციფიკაციას არედაქტირებს, კოდი მისგან გენერირდება</td><td>Tessl; მხოლოდ ამას ამტკიცებს <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a></td></tr>
      <tr><td><b>Spec-in-the-loop</b></td><td>მომუშავე სისტემის მეტრიკები და ინციდენტები სპეციფიკაციას ასწორებს</td><td>მზა პროგრამები არ არის; მსგავსი ქცევა <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a>-თან და <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>-თან, იხილეთ ქვემოთ</td></tr>
    </tbody>
    </table>
  </b-table>

  Red Hat სპეციფიკაციასთან მუშაობის ორ რეჟიმს ასხვავებს. რეჟიმში „interacting“ ადამიანი სპეციფიკაციას აგენტთან ერთად ხვეწს: მაგალითად, სთხოვს აგენტს შეაფასოს ის 0-დან 10-მდე და თქვას, რა აკლია ავტონომიური რეალიზაციისთვის. როცა შეფასება 9–10-ია, იწყება რეჟიმი „instructing“: აგენტი კითხულობს სპეციფიკაციებს, პოულობს საჭირო skills-ს, წერს კოდს, უშვებს ტესტებს და შეცდომებს თავად ასწორებს. <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a>-თან ეს მეოთხე დონეს ეთანხმება, სადაც ადამიანი სპეციფიკაციას წერს, აგენტთან მასზე კამათობს და მიდის<b-proof href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" quote="Shapiro: “You write a spec. You argue with it about the spec.” — danshapiro.com"></b-proof>.
  <b-callout icon="refresh">Red Hat მეოთხე დონეს სპეციფიკაციის „თანაევოლუციას“ უწოდებს. აგენტი ინახავს ფაილს LessonsLearned.md: ყოველი შეცდომისას ჩაწერს მიზეზსა და გასწორებას და შესაბამის „როგორ“ სპეციფიკაციაში ცვლილებას გვთავაზობს<b-proof href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" quote="Naszcyniec, Red Hat: “turns every off-key moment into a permanent improvement” — developers.redhat.com"></b-proof>. Every იგივეს აკეთებს Compound საფეხურზე, რომელიც ქვემოთ არის აღწერილი.</b-callout>
  <b-finding>
    <ex>ანგარიშის spec.md-ში წერია: რომელი სვეტები, საიდან მოდის მონაცემები და რომ ანგარიში მზადაა, როცა თანხები ექსპორტს ემთხვევა.</ex>
    <gen><a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> სპეციფიკაციებს თავისი კიბის თავში აყენებს: იქ რეალიზაცია გახდება ურთიერთშესაცვლელი გამოსავალი და არა გამძლე აქტივი<b-proof href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" quote="Clark: “interchangeable output rather than a durable asset” — hyperact.co.uk"></b-proof>. ის ასევე მეშვიდე დონეს კიბის გაგრძელებაზე უფრო გადატვირთვასთან ახლოს უწოდებს.</gen>
    <do>დაწერეთ სპეციფიკაცია ნებისმიერ ერთ დღეზე გრძელ ამოცანაზე. როგორ დავყოთ დიდი სპეციფიკაცია ნაწილებად, აღწერილია სტატიაში <a href="/blog/specs-by-aggregates/">სპეციფიკაციები აგრეგატებით</a>.</do>
  </b-finding>
</b-chapter>

<b-chapter id="skill" title="საფეხური 4. Skill: პროცედურა აგენტისთვის იწერება" icon="notebook">
  <b-why>თუ სპეციფიკაცია ამბობს, რა უნდა გამოვიდეს, skill ამბობს, როგორ კეთდება. ეს არის საქაღალდე SKILL.md ფაილით: სახელი, აღწერა და ნაბიჯ-ნაბიჯ ინსტრუქციები, ზოგჯერ შაბლონებითა და სკრიპტებით.</b-why>
  <b-art names="ai-agent-maturity-levels/spec-skill"></b-art>
  <b-cap>სპეციფიკაცია ამოცანის კონტექსტში დგას. skill კონტექსტიდან ორ სტრიქონს იკავებს, სანამ საჭირო არ გახდება, და სრულად მხოლოდ გამოძახებისას იტვირთება.</b-cap>
  <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> skills-ს აღწერს როგორც მოდულურ განმეორებად პროცედურებს: აგენტი skill-ს სახელითა და აღწერით პოულობს და სრულად ტვირთავს, როცა ამოცანა ესადაგება<b-proof href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" quote="Naszcyniec, Red Hat: “A skill is not just a prompt; it is a directory containing a SKILL.md file” — developers.redhat.com"></b-proof>. Anthropic skill-ს ახალი თანამშრომლის ონბორდინგის გზამკვლევს ადარებს<b-proof href="https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills" quote="Anthropic: “like putting together an onboarding guide for a new hire” — anthropic.com/engineering"></b-proof>. <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a>-სთვის skills-ის შექმნა მეოთხე დონის ნიშანია, სადაც ადამიანი აგენტის გვერდით აღარ ზის, არამედ სპეციფიკაციებსა და skills-ს წერს და მიდის.
  Andrew <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a>-მ აღწერა, როგორ მივიღოთ skill ჩატიდან: თუ აგენტი ერთსა და იმავე ამოცანას იმეორებს, სთხოვეთ საუბარი თავიდან გადაიკითხოს და skill-ად აქციოს<b-proof href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" quote="Shu: “ask it to reflect on the conversation and turn it into an Agent Skill” — dev.to/0xandrewshu"></b-proof>.

  Red Hat-ის სტატიიდან მაგალითი skill არის აპლიკაციის OpenShift-ზე განთავსება. ეს ჩვეულებრივი საქაღალდეა სამი ფაილით: ინსტრუქცია სახელითა და აღწერით დასაწყისში, შაბლონი და შემოწმების სკრიპტი.
  <b-file-grid>
    <file name="SKILL.md">სახელი, აღწერა, ნაბიჯები: შეამოწმე login, აირჩიე პროექტი, გამოიყენე შაბლონი, შეამოწმე შედეგი; შეზღუდვები</file>
    <file name="deploy-template.yaml">განთავსების შაბლონი, რომელსაც ინსტრუქცია იყენებს</file>
    <file name="validate-route.sh">სკრიპტი, რომელიც ამოწმებს, რომ აპლიკაცია იხსნება</file>
  </b-file-grid>
  <b-cap>skill უკვე შეიცავს სკრიპტს: მკვეთრი საზღვარი საფეხურებს „skill“ და „სკრიპტი“ შორის არ არის, ისინი ერთი საქაღალდის ორი ნაწილია.</b-cap>
  <b-finding>
    <ex>ანგარიშის წარმატებული აგების შემდეგ აგენტმა, მოთხოვნით, აგების თანმიმდევრობა skill-ად აქცია ნაბიჯებითა და საბოლოო ცხრილის ნიმუშით.</ex>
    <gen>სესიის დასაწყისში skill კონტექსტში მხოლოდ თავის სახელსა და აღწერას იკავებს და გამოძახებისას სრულად იტვირთება. ამიტომ პროცედურები, რომლებიც დროდადრო სჭირდება, უკეთესია skills-ში ვინახოთ, წესების ფაილში კი მხოლოდ მუდმივი დავტოვოთ.</gen>
    <do>თუ ერთი და იგივე პროცედურა ორჯერ კარგად ჩაიარა, სთხოვეთ აგენტს skill-ად აქციოს.</do>
  </b-finding>
</b-chapter>

<b-chapter id="script" title="საფეხური 5. სკრიპტი: კოდი ასრულებს ნაბიჯებს" icon="code">
  <b-why>skill ტექსტად რჩება და მოდელი მას ყოველ ჯერზე თავიდან ასრულებს. სკრიპტი ჩვეულებრივი კოდია: უფრო სწრაფი, უფრო იაფი და ყოველ გაშვებაზე ერთნაირი.</b-why>
  <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a> მათ ადარებს: skill არადეტერმინისტულია, რადგან ერთი skill-ის ათმა გაშვებამ შეიძლება შესამჩნევად განსხვავებული ქცევა აჩვენოს<b-proof href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" quote="Shu: “running the same Skill 10 times can lead to different behavior” — dev.to/0xandrewshu"></b-proof>. სკრიპტები უფრო სწრაფი, უფრო სტაბილური და ტოკენებს არ ხარჯავს, მაგრამ დაწერას დრო სჭირდება, მოულოდნელ პირობებზე უფრო ხისტია და შეიძლება გატყდეს. <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> წესს უფრო მარტივად აყალიბებს: რაც შეიძლება მეტი გადაეცით დეტერმინისტულ ლოგიკას და მოდელს მხოლოდ შემოქმედებითი ნაწილი დაუტოვეთ<b-proof href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" quote="Rezvov: “Delegate as much as possible to deterministic logic” — dev.to/arezvov"></b-proof>. <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> იგივე იდეას აგენტის შეცდომებზე იყენებს: ფაილში წესის გვერდით ის დაპროგრამებულ საშუალებებს წერს, მაგალითად სკრიპტებს სქრინშოტებისთვის და გაფილტრული ტესტების გასაშვებად.
  <b-art names="ai-agent-maturity-levels/skill-script"></b-art>
  <b-cap>ერთი და იგივე გაშვება ათჯერ: skill გაფანტულობას აჩვენებს და ტოკენებს ხარჯავს, სკრიპტი შედეგს იმეორებს და არაფერს ხარჯავს.</b-cap>
  <b-table>
    <table>
    <thead>
      <tr><th></th><th>Skill</th><th>სკრიპტი</th></tr>
    </thead>
    <tbody>
      <tr><td><b>რა არის</b></td><td>ინსტრუქციები ბუნებრივ ენაზე SKILL.md-ში</td><td>კოდი Bash-ში, Python-სა და მსგავს ენებზე</td></tr>
      <tr><td><b>ვინ უშვებს</b></td><td>მოდელი, ყოველ ჯერზე თავიდან</td><td>კომპიუტერი, მოდელის გარეშე</td></tr>
      <tr><td><b>ერთნაირია თუ არა შედეგი</b></td><td>არა: გაშვებებს შორის შესამჩნევი განსხვავებებია შესაძლებელი</td><td>დიახ, ერთსა და იმავე შეყვანაზე</td></tr>
      <tr><td><b>ფასი ერთ გაშვებაზე</b></td><td>ტოკენები ყოველ შესრულებაზე</td><td>წამები და ნული ტოკენი</td></tr>
      <tr><td><b>როდის ერგება</b></td><td>პროცედურა იცვლება, მოქნილობა გვჭირდება, იშვიათად გადის</td><td>პროცედურა მეორდება, ძვირია ან პროგნოზირებადი უნდა იყოს</td></tr>
      <tr><td><b>ფასი</b></td><td>შექმნას ნაკლები დრო სჭირდება</td><td>დაწერის დრო, ხისტობა მოულოდნელისადმი, მხარდაჭერა</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-cap>Andrew <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a>-ს ტექსტის „Turn chats into Skills, Skills into scripts“ (19.09.2026) მიხედვით. ავტორი ხაზს უსვამს, რომ ყველაფერი არ უნდა ავტომატიზირდეს: skill-საც და სკრიპტსაც შექმნისა და მხარდაჭერის ფასი აქვს.</b-cap>
  სკრიპტი skill-დან <b>ამოიყვანება</b>, როცა skill მეორდება. ასეთი სამუშაოსთვის skill-ის გაკეთება წამგებიანი ხდება: იმავე მონაცემებზე სკრიპტი ყოველ გაშვებაზე ერთნაირად იქცევა, skill კი გაფანტულობას თავად მოდელის შიგნით ატარებს. სწორედ ეს გაფანტულობა წარმოშობს <a class="s-term" href="/materials/glossary/flaky-test/">არასტაბილურ ტესტებს</a>: იგივე ნაბიჯი იმავე მონაცემებზე ზოგჯერ გადის და ზოგჯერ ვარდება, რადგან აგენტი ყოველ ჯერზე ოდნავ სხვანაირად იქცევა. სკრიპტს ასეთი მიზეზი არ აქვს, ამიტომ განმეორებადი სამუშაოსთვის დეტერმინიზმი უფრო ამართლებს.
  <b-callout icon="alert-circle">დიდი განუსაზღვრელობა რჩება: შეყვანის მონაცემების ფორმატი, ხვრელები, მოულოდნელი მნიშვნელობები. სკრიპტები ჩვეულებრივ მონაცემებთან მუშაობას იწყებენ, ამიტომ მათთვის დეტერმინისტული ნაწილია მნიშვნელოვანი: იგივე შეყვანა იგივე გამოსავალს იძლევა და შეცდომა შეიძლება გამეორდეს. განუსაზღვრელობა ნაბიჯიდან შეყვანის მონაცემების შემოწმებაზე გადადის.</b-callout>
  <b-finding>
    <ex>მონაცემთა ბაზის ექსპორტი და შემაჯამებელი ცხრილი ანგარიშში ყოველ ორშაბათს ერთნაირია, ამიტომ სკრიპტმა report.py მათ ხელი მოჰკიდა, მოდელი კი მხოლოდ დასკვნებს წერს.</ex>
    <gen>Shu ხშირად ათავსებს სკრიპტებს skills-ში: skill შეფუთვად რჩება, რომელიც სკრიპტებს უშვებს, აწებებს და შეყვანასა და გამოსავალს ამოწმებს.</gen>
    <do>skill სკრიპტად აქციეთ, როცა ის მეორდება, რთულია ან ძვირია. იშვიათი და ცვალებადი პროცედურები skills-ად დატოვეთ.</do>
  </b-finding>
</b-chapter>

<b-chapter id="crystal" title="საფეხურის ფასი: რა გაზომა Malik-მა" icon="gauge">
  <b-why>skill-დან სკრიპტზე გადასვლა ჩვეულებრივ სიტყვებით აღიწერება. Arun <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>-მა Azure Networking გუნდიდან (Microsoft) ის მომუშავე სისტემაზე გაზომა და „პროგრესული კრისტალიზაცია“ უწოდა: ქცევა, რომელიც აგენტმა იპოვა და გადაამოწმა, თანდათან დეტერმინისტულ კოდად იქცევა<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: “agent exploration should be a discovery mechanism, not a permanent execution model” — arxiv.org/abs/2607.07052"></b-proof>.</b-why>
  Malik-ის სისტემა ღრუბლოვან ქსელში ინციდენტებს ამუშავებს. ახალ ინციდენტს ჯერ აგენტი წყვეტს და მისი გზა ჩაიწერება. თუ გზა განმეორებითი წარმატებებით დადასტურდა, ის შაბლონად იქცევა, შემდეგ ჰიბრიდულ სცენარად და ბოლოს მოდელის გარეშე კოდად. სამი რეჟიმი ერთი და იმავე აღმოჩენილი ქცევის სიცოცხლის ეტაპებია. ეს ამოყვანაა ბოლო საფეხურებზე: გზა, რომელიც აგენტმა მარტომ გაიარა, ამოიყვანება შაბლონში, შემდეგ ჰიბრიდში, შემდეგ კოდში.
  <b-art names="ai-agent-maturity-levels/crystal-modes"></b-art>
  <b-cap>კიბეზე ზემოთ ქცევა წარმატებული გაშვებების რაოდენობით ინიშნება და მარცხისას ქვემოთ ბრუნდება: კრისტალიზაცია შექცევადია.</b-cap>
  <b-table>
    <table>
    <thead>
      <tr><th>რეჟიმი</th><th>როგორ გადის</th><th>ერთნაირია თუ არა შედეგი</th><th>ტოკენები ერთ გაშვებაზე</th></tr>
    </thead>
    <tbody>
      <tr><td><b>აგენტი</b> (Type 3)</td><td>ქვეაგენტები შეზღუდულ არეალში მსჯელობენ, ჩაწერის ნაბიჯები ადამიანის დამტკიცებას ელოდება</td><td>დაახლოებით 50%</td><td>10–50 ათასი</td></tr>
      <tr><td><b>ჰიბრიდი</b> (Type 2)</td><td>ნაბიჯები ფიქსირებულია, მოდელი ცალკეულ ეტაპებზე ერთვება: პარსინგი, კლასიფიკაცია, შეჯამება; ყოველი ქმედება სქემასთან მოწმდება</td><td>დაახლოებით 90%</td><td>1–5 ათასი</td></tr>
      <tr><td><b>კოდი</b> (Type 1)</td><td>წინასწარ დაწერილი ლოგიკა, მოდელის გარეშე შესრულების დროს</td><td>100%</td><td>0</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-sublabel top="22">როდის ავიყვანოთ რეჟიმი</b-sublabel>
  <b-steps>
    <step t="აგენტი → ჰიბრიდი" hl>მინიმუმ 10 წარმატებული გაშვება, უსაფრთხოების ნულოვანი დარღვევა, გაშვებების მინიმუმ 90% ქმედებათა ერთსა და იმავე თანმიმდევრობას იძლევა, ავტომატურად შექმნილი მისაღები ტესტები გადის.</step>
    <step t="ჰიბრიდი → კოდი">მინიმუმ 50 წარმატებული ჰიბრიდული გაშვება, მოდელის პასუხების თანმიმდევრულობა მინიმუმ 99%, წესი ფარავს შეყვანის ყველა დაკვირვებულ ვარიაციას, სრული რეგრესიული ნაკრები მოდელის გარეშე გადის, ადამიანმა საბოლოო ლოგიკა გადახედა.</step>
    <step t="კოდი → უკან">მარცხის, უსაფრთხოების დარღვევის ან ჩავარდნილი ტესტების შემთხვევაში playbook ქვეითდება. მაგალითი სტატიიდან: firmware-ის განახლების შემდეგ ბრძანების გამოსავლის ფორმატი შეიცვალა, პარსერი ჩავარდა, playbook ჰიბრიდს დაუბრუნდა და სუფთა გაშვებების სერიის შემდეგ ისევ აიყვანეს<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: “Crystallization is not one-way” — arxiv.org/abs/2607.07052"></b-proof>.</step>
  </b-steps>
  <b-sublabel top="22">რა გამოვიდა 8 თვეში</b-sublabel>
  <b-count-bars>
    <bar k="კოდი" w="45%" color="accent">45%</bar>
    <bar k="ჰიბრიდი" w="30%" color="c-light">30%</bar>
    <bar k="აგენტი" w="25%" color="c-none">25%</bar>
  </b-count-bars>
  <b-cap>შესრულებების წილი რეჟიმების მიხედვით მერვე თვის ბოლოს (<a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>-ის სტატიის VIII განყოფილება). დასაწყისში თითქმის ყველა შესრულება „აგენტის“ რეჟიმში გადიოდა.</b-cap>
  აგენტის ღირებულება ერთ ინციდენტზე 70%-ზე მეტით შემცირდა, ინციდენტების რაოდენობა კი დაახლოებით გაორმაგდა. ინციდენტების ტიპური კატეგორიების 90%-ზე მეტი ავტონომიურად წყდება და მცდარი დადებითი გასწორებების წილი 5%-ზე დაბალი რჩება. ავტორი დასკვნას ასე აყალიბებს: პლატფორმა უფრო იაფი გახდა, რაც მეტს აკეთებდა, რადგან უკვე ნასწავლ სამუშაოზე ინფერენსისთვის გადახდა შეწყვიტა<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: “the platform got cheaper as it did more” — arxiv.org/abs/2607.07052"></b-proof>.
  <b-callout icon="alert-circle">ავტორის დათქმები. შედეგები ერთი ორგანიზაციიდან და ერთი სფეროდან მოდის, ამიტომ ზღვრები თავიდან უნდა გამოითვალოს. ეს პლატფორმაზე დაკვირვებებია რვა თვის განმავლობაში; კონტროლირებადი შედარება არ არის. ციფრი 45% ნიშნავს კოდით მომსახურებული შესრულებების წილს; მისი წაკითხვა ინციდენტების წილად, რომლებიც „AI-ის გარეშე“ გადაწყდა, არ შეიძლება. სარგებელი უფრო მცირეა იქ, სადაც ახალი ერთჯერადი ამოცანები ჭარბობს.</b-callout>
  <b-callout icon="bulb">სიტყვა „კრისტალიზაცია“ სხვა სტატიაშიც გვხვდება: Linghao Zhang (<a href="https://arxiv.org/abs/2603.10808" target="_blank" rel="noopener">arXiv 2603.10808</a>, 11.03.2026) აღწერს, როგორ ერთიანდება სამუშაო დიალოგებიდან ფრაგმენტული ცოდნა პერიოდულად სტრუქტურირებულ გამოყენებად აქტივებად. Zhang-თან დიალოგი ცოდნად იქცევა, Malik-თან შესრულების კვალი კოდად. ორივე ერთსა და იმავე მოძრაობას აღწერს კიბეზე ქვემოთ: საუბრიდან იმისკენ, რაც ჩაწერილია.</b-callout>
  <b-finding>
    <ex>Malik-ის სისტემაში მოდელის გარეშე შესრულებების წილი რვა თვეში ნულიდან 45%-მდე გაიზარდა, ერთ ინციდენტზე ღირებულება კი 70%-ზე მეტით შემცირდა.</ex>
    <gen>გადასვლა კიბეზე ქვემოთ, მოდელიდან კოდისკენ, ამართლებს იქ, სადაც ერთი და იგივე ამოცანები მეორდება. ავტონომია კონკრეტული სცენარის გაშვებების დაგროვილ ისტორიასთან არის დაკავშირებული და მასთან ერთად იზრდება; უფრო ძლიერი მოდელი ამას თავისთავად არ იძლევა<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: “A more capable model does not automatically earn more autonomy; a track record does” — arxiv.org/abs/2607.07052"></b-proof>.</gen>
    <do>დათვალეთ skill-ის წარმატებული გაშვებები. ათს მიაღწია მარცხის გარეშე: განმეორებადი ნაბიჯები სკრიპტად აქციეთ და დაგეგმეთ დაბრუნება ზედა საფეხურზე იმ შემთხვევისთვის, როცა სკრიპტი გატყდება.</do>
  </b-finding>
</b-chapter>

<b-chapter id="harness" title="საფეხური 6. Harness: შეცდომები გარემოს წესებად იქცევა" icon="loop-double">
  <b-why>როცა სპეციფიკაციები, skills და სკრიპტები არსებობს, შემდეგი ნაბიჯია აგენტის გარშემო გარემოს აგება: harness. ეს არის ყველაფერი, თავად მოდელის გარდა, და ის შეცდომებისგან იზრდება: თითოეული ამოცანა ჩანაწერს ტოვებს და შემდეგი უკეთ მიდის.</b-why>
  <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> მთელ თავის გზამკვლევს ოთხი ნაბიჯის ციკლზე აგებს: Plan → Work → Review → Compound<b-proof href="https://every.to/guides/compound-engineering" quote="Every: “Plan → Work → Review → Compound → Repeat” — every.to/guides/compound-engineering"></b-proof>. პირველი სამი ნაბიჯი ფუნქციას აწარმოებს, მეოთხე სისტემას, რომელიც ფუნქციებს ყოველ ჯერზე უკეთ აგებს<b-proof href="https://every.to/guides/compound-engineering" quote="Every: “a system that builds features better each time” — every.to/guides/compound-engineering"></b-proof>. Every-ის მიხედვით, ინჟინრის დროის დაახლოებით 80% დაგეგმვასა და review-ზე უნდა მოდიოდეს, დარჩენილი 20% კი სამუშაოსა და Compound საფეხურზე.
  <b-art names="ai-agent-maturity-levels/compound-loop"></b-art>
  <b-cap>პირველი სამი ნაბიჯი ფუნქციას აწარმოებს. მეოთხე გაკვეთილს ფაილებსა და skills-ში წერს, ამიტომ ყოველი მომდევნო წრე წინაზე უკეთ იწყება.</b-cap>
  <b-steps round>
    <step t="Plan">იდეა გეგმად იქცევა: მოთხოვნისა და კოდის შესწავლა, გადაწყვეტის დაპროექტება და გეგმის ვალიდაცია.</step>
    <step t="Work">აგენტი გეგმას ცალკე ბრენჩში ასრულებს; ტესტები და linter ყოველი ცვლილების შემდეგ გადის.</step>
    <step t="Review">რამდენიმე აგენტი შედეგს ამოწმებს, დასკვნებს პრიორიტეტი P1, P2 ან P3 ენიჭება და იწერება.</step>
    <step t="Compound" hl>რა იმუშავა და რა არა, ჩაიწერება სწორ ფაილებში: ჩანაწერები CLAUDE.md-ში, გადაწყვეტის დოკუმენტი docs/solutions/-ში, ახალი აგენტები და skills. საკონტროლო კითხვა: დაიჭერს თუ არა სისტემა ამ შეცდომას თავად შემდეგ ჯერზე?</step>
  </b-steps>
  <b-cap>Every-ის გზამკვლევის მიხედვით. გადაწყვეტები docs/solutions/-ში ინახება ძიების მეტამონაცემებით, გეგმები docs/plans/-ში, review-ის დასკვნები todos/-ში.</b-cap>
  Birgitta <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a> harness-ს კონტროლის ორ სახეობად ყოფს: „guides“ აგენტის კურსს წინასწარ ადგენს, „sensors“ კი შედეგს აკვირდება და თვითგასწორებაში ეხმარება<b-proof href="https://martinfowler.com/articles/harness-engineering.html" quote="Böckeler: guides “anticipate the agent's behaviour and aim to steer it before it acts”; sensors “observe after the agent acts and help it self-correct”"></b-proof>. მისი წესი: როცა პრობლემა მეორდება, guides და sensors უნდა გაუმჯობესდეს<b-proof href="https://martinfowler.com/articles/harness-engineering.html" quote="Böckeler: “Whenever an issue happens multiple times, the feedforward and feedback controls should be improved”"></b-proof>. harness-ის მორგების დისციპლინას harness engineering ეწოდება, HDD (Harness-Driven Development) კი მის შიგნით ერთი მეთოდია: აგენტის ყოველი შეცდომა გარემოს წესად იქცევა, ანუ ინსტრუქციად, შემოწმებად ან ლიმიტად.
  <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> harness-ს მე-6 დონეზე აყენებს: ტესტები, linter-ები და შემოწმებები, რათა აგენტმა საკუთარი მუშაობის შედეგი დაინახოს. მას ერთი პირობა აქვს: უკუკავშირი საჭიროა, თორემ შედეგი slop-ის მანქანაა<b-proof href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" quote="Eledath: “If you want autonomy, you need backpressure” — bassimeledath.com"></b-proof>.
  <b-finding>
    <ex>აგენტმა ვალუტის კურსი შეუსაბამოდ აიღო: review-მ მიზეზი ჩაწერა, CLAUDE.md-ში წესი გაჩნდა და სკრიპტს კურსის შემოწმება დაემატა.</ex>
    <gen>harness ფაილების ნაკრებისგან იმით განსხვავდება, რომ შეცდომა ჩანაწერად ავტომატურად იქცევა: წესად, შემოწმებად, skill-ად ან სპეციფიკაციის შესწორებად. <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> ამ იდეას harness engineering-ს უწოდებს. მეტი სტატიაში <a href="/blog/harness-driven-development/">Harness engineering პრაქტიკაში</a>.</gen>
    <do>ყოველი გასწორებული შეცდომის შემდეგ ერთი კითხვა დასვით: რა ჩავწეროთ, რომ აღარ განმეორდეს. ეს ჩანაწერი არის Compound საფეხური და harness-ის ერთი ცვლილება.</do>
  </b-finding>
</b-chapter>

<b-chapter id="system" title="საფეხური 7. აგენტური სისტემა: კოდი საფუძველში, აგენტები რთულ ადგილებში" icon="boxes-link">
  <b-why>კიბე აგენტური სისტემით მთავრდება: სისტემა, აგებული კლასიკურ პრინციპებზე, რომელშიც რთული ბლოკები აგენტებით არის ჩანაცვლებული და ყველაფერი ერთ სერვისში ერთად მუშაობს. სტატია აჩვენებს, როგორ მივიდეთ აქამდე: ნაბიჯ-ნაბიჯ, იმის ამოყვანით, რაც მეორდება, კოდსა და შემოწმებებში.</b-why>
  გზა აგენტებით იწყება: ჩატში და სესიაში აგენტი ყველაფერს აკეთებს. გზის ბოლოსთვის აგენტების წილი მცირე რჩება, სისტემის საფუძველი კი კლასიკური კოდია: სკრიპტები, შემოწმებები, განრიგი, მონაცემები. აგენტი მხოლოდ რთულ ადგილებს იღებს, რომლებსაც დიდ ენობრივ მოდელებამდე ML სპეციალისტთა გუნდები წყვეტდნენ: მოთხოვნების ტექსტის პარსინგი, კლასიფიკაცია, მსგავსების გაზომვა, შეჯამება. ახლა ეს მზა გადაწყვეტილებაა: მოდელი სერვისის ნაწილად გამოიძახება, უფრო მაღალ ხარისხს იძლევა და თავის გადაწყვეტილებებს სიტყვებით განმარტავს, ამიტომ მსჯელობის წაკითხვა და შემოწმება შეიძლება. სისტემა მთლიანობაში პროგნოზირებადი რჩება, რადგან რთული ნაწილი დეტერმინისტული შემოწმებებით არის გარშემორტყმული.
  <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>-ის ციფრები იმავე მიმართულებაზე მიუთითებს: რვა თვეში მოდელის გარეშე კოდით შესრულებების წილი 45%-მდე გაიზარდა, აგენტი კი შესრულებების 25%-ზე დარჩა. <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>-ის (დონეები 7–8: ფონური აგენტები და აგენტთა გუნდები), <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a>-ს („dark factory“, შავი ყუთი, რომელიც სპეციფიკაციებს პროგრამულ უზრუნველყოფად აქცევს) და <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a>-ის (ადამიანი მხოლოდ ტიკეტებს ქმნის ტრეკერში, აგენტები კი მათ თავად იღებენ, უსაფრთხოება კი მთავარი ბარიერია) კიბეები მზარდი ავტონომიისკენ გრძელდება. იმისთვის, რომ ასეთი ავტონომია არ გატყდეს, harness სჭირდება, ანუ ქვედა საფეხური.
  <b-finding>
    <ex>ყოველკვირეული ანგარიში: სკრიპტი ექსპორტსა და შემაჯამებელ ცხრილს ითვლის, წესები და შემოწმებები harness-ში ცხოვრობს, აგენტი კი მენეჯერების კომენტარების მხოლოდ თავისუფალ ტექსტს ამუშავებს.</ex>
    <gen>აგენტური სისტემა კოდსა და შემოწმებებს ეყრდნობა, აგენტი კი მხოლოდ იმას წყვეტს, რაც სხვაგვარად არ წყდება. მასში აგენტების წილი მცირეა, პროგნოზირებადობა კი დეტერმინისტული საფუძველიდან მოდის.</gen>
    <do>სანამ ბლოკს აგენტს გადასცემთ, ჰკითხეთ საკუთარ თავს, შეიძლება თუ არა მისი კოდად ან შემოწმებად დაწერა. აგენტს მხოლოდ ის დაუტოვეთ, რასაც კოდი არ წყვეტს, და შეყვანასა და გამოსავალზე შემოწმებები დააყენეთ.</do>
  </b-finding>
</b-chapter>

<b-chapter id="traps" title="ხაფანგები ყოველ საფეხურზე" icon="alert-circle">
  <b-why>ყოველ საფეხურს აქვს ტიპური შეცდომა, რომელიც ასვლას აჩერებს ან ზედმეტად ძვირს ხდის. ცხრილი თავად ავტორების დათქმებიდან არის აგებული.</b-why>
  <b-table>
    <table>
    <thead>
      <tr><th>საფეხური</th><th>ტიპური ხაფანგი</th><th>ვინ წერს მასზე</th><th>როგორ გამოვიდეთ</th></tr>
    </thead>
    <tbody>
      <tr><td><b>1. ჩატი</b></td><td>ტექსტის აქეთ-იქით გადატანა იმის ნაცვლად, რომ აგენტი ფაილებთან იმუშაოს</td><td><a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a>: მნიშვნელოვან სამუშაოს აგენტი სჭირდება</td><td>მიეცით აგენტს წვდომა პროექტზე და შედეგის შემოწმების საშუალება</td></tr>
      <tr><td><b>2. <a class="s-term" href="/materials/glossary/ai-agent/">აგენტი</a></b></td><td>ადამიანი ყოველ ქმედებას ამტკიცებს, წესების ფაილი კი დახარისხების გარეშე იზრდება</td><td><a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>: უმეტესობა აქ ჩერდება; <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a>: ცუდი წესები წესების არქონაზე უარესია</td><td>დაგეგმეთ წინასწარ, წესები მოკლე დაიტოვეთ და ყოველი სტრიქონი გადახედეთ</td></tr>
      <tr><td><b>3. <a class="s-term" href="/materials/glossary/spec-driven-development/">სპეციფიკაცია</a></b></td><td>სპეციფიკაცია ყოველ წვრილმანზე: Kiro-მ პატარა ბაგი 4 user story-დ და 16 მისაღებ კრიტერიუმად აქცია</td><td><a href="https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html" target="_blank" rel="noopener">Böckeler</a> (Thoughtworks)</td><td>სპეციფიკაცია ერთ დღეზე გრძელ ამოცანებზე დაწერეთ, პატარა გასწორებები კი მის გარეშე დატოვეთ</td></tr>
      <tr><td><b>4. <a class="s-term" href="/materials/glossary/agent-skills/">Skill</a></b></td><td>skill ყველაფერზე: მას შექმნისა და მხარდაჭერის ფასი აქვს</td><td><a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a></td><td>skill ორი წარმატებული გამეორების შემდეგ გააკეთეთ და არა წინასწარ</td></tr>
      <tr><td><b>5. სკრიპტი</b></td><td>ნაადრევი აყვანა: შაბლონი, რომელიც მხოლოდ რამდენჯერმე ნახეს, არასანდო აღმოჩნდება</td><td><a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>: ხარისხი გაშვებებიდან აგებულ ტესტებზეა დამოკიდებული</td><td>ზღვარი გაშვებების რაოდენობაზე და დაბრუნება ერთი საფეხურით ზემოთ მარცხისას</td></tr>
      <tr><td><b>6. Harness</b></td><td>ადამიანის review ვიწრო ადგილი ხდება; იმავე აგენტის დაწერილი შემოწმებები ყველაფერს ადასტურებს</td><td><a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>: ადამიანის review ვიწრო ადგილი ხდება; <a href="https://law.stanford.edu/2026/02/08/built-by-agents-tested-by-agents-trusted-by-whom/" target="_blank" rel="noopener">Stanford CodeX</a>: აგენტებმა დაწერეს სტაბი, რომელიც ყოველთვის „წარმატებას“ აბრუნებს</td><td>შემოწმებები აგენტისგან დამოუკიდებელი უნდა იყოს და review ნაწილობრივ ავტომატიზირებული</td></tr>
      <tr><td><b>7. აგენტური სისტემა</b></td><td>აგენტები იღებენ იმას, რაც კოდს შეეძლო გადაეწყვიტა: ფასი და შედეგების გაფანტულობა იზრდება</td><td><a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>: აგენტის მიერ ნაპოვნი ქცევა წარმატებული გაშვებების რაოდენობით კოდში გადადის</td><td>აგენტი მხოლოდ რთულ ადგილზე დააყენეთ, რაც მეორდება, კოდში ამოიყვანეთ</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-cap>StrongDM-ის სტაბის შემთხვევა განხილულია <a href="https://law.stanford.edu/2026/02/08/built-by-agents-tested-by-agents-trusted-by-whom/" target="_blank" rel="noopener">Stanford CodeX-ის სტატიაში</a>.</b-cap>
  <b-finding>
    <ex>აგენტმა დაწერა როგორც კოდი, ისე შემოწმება, შემოწმება კი უბრალოდ „წარმატებას“ აბრუნებდა: სისტემა მწვანედ გამოიყურებოდა და არაფერს ამოწმებდა.</ex>
    <gen>რაც უფრო მაღალია საფეხური, მით უფრო ძვირი ჯდება ჩაწერის შეცდომა: არასწორი წესი, ცუდი შემოწმება ან ნაადრევი სკრიპტი ყველა მომდევნო გაშვებაზე აისახება.</gen>
    <do>სანამ რაღაცას ჩაწერთ, ჰკითხეთ: ვინ შეამოწმებს ამ ჩანაწერს და როგორ? თუ არავინ არის, ცოდნა ერთი საფეხურით ქვემოთ დატოვეთ.</do>
  </b-finding>
</b-chapter>

<b-chapter id="stop" title="როდის გავჩერდეთ" icon="target">
  <b-why>ზედა საფეხურები ქვედაზე ძვირია და ყველა გუნდს არ სჭირდება.</b-why>
  <b-table>
    <table>
    <thead>
      <tr><th>რას ამბობს წყარო</th><th>რას ნიშნავს ეს პრაქტიკაში</th></tr>
    </thead>
    <tbody>
      <tr><td><a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a>: გუნდების უმეტესობამ მე-5 დონეს უნდა მიზნად დაისახოს; მის ზემოთ გამტარუნარიანობა იზრდება, მაგრამ შედეგის გაგებისა და გადამოწმების უნარი არა</td><td>ჩაწერილი წესები, deterministic tooling და საერთო კონტექსტი ხშირად უფრო მნიშვნელოვანია, ვიდრე მაქსიმალური ავტომატიზაცია</td></tr>
      <tr><td><a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>: ყოველდღიური მუშაობისთვის ბერკეტი მე-7 დონეზეა; ავტორი მე-8 დონეს საზღვრად მიიჩნევს, რომელსაც ჯერ არავინ დაუფლებია</td><td>ფონური აგენტები შემოწმებებით დღეს გონივრული ზედა ზღვარია</td></tr>
      <tr><td><a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a>: მე-3 დონეზე ბევრს ეჩვენება, რომ ყველაფერი უარესი გახდა, რადგან სამუშაო diff-ების კითხვამდე დადის</td><td>პირველი დაჩქარების შემდეგ ვარდნა შესაძლებელია; მას სპეციფიკაციებსა და skills-ზე გადასვლით გადიან, ჩატში დაბრუნება საჭირო არ არის</td></tr>
      <tr><td><a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a>: skill-საც და სკრიპტსაც შექმნისა და მხარდაჭერის ფასი აქვს</td><td>ავტომატიზირეთ ის, რაც ნამდვილად მეორდება</td></tr>
      <tr><td><a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>: სარგებელი უფრო მცირეა იქ, სადაც ახალი ერთჯერადი ამოცანები ჭარბობს</td><td>საძიებო სამუშაოსთვის დარჩით აგენტზე სპეციფიკაციით</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-finding>
    <ex><a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a>-ის კიბეზე მეშვიდე დონე განცალკევებით დგას: ის მას გაგრძელებაზე უფრო გადატვირთვასთან ახლოს უწოდებს.</ex>
    <gen>კიბეზე ასვლას აზრი აქვს, სანამ ის ადამიანის სამუშაოს ამცირებს; ფაილების რაოდენობა რეპოზიტორიაში არაფერს ამტკიცებს.</gen>
    <do>ყოველი გადასვლის წინ შეამოწმეთ: მეორდება თუ არა ამოცანა? შეიძლება თუ არა შედეგის ავტომატურად გადამოწმება? თუ არა, მიმდინარე საფეხურზე დარჩით.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" title="საიდან დავიწყოთ: მზა პრომპტები აგენტისთვის" icon="play">
  <b-why>ოთხი პრომპტი, რომლებიც ცოდნას ერთი საფეხურით ზემოთ გადააქვს, ანუ ქვედა საფეხურიდან ამოიყვანს. კვადრატული ფრჩხილების ადგილას თქვენი ამოცანა ჩასვით.</b-why>
  <b-sublabel top="12">ჩატიდან წესების ფაილამდე</b-sublabel>
  <b-prompt>
    გადაიკითხე ეს დიალოგი. იპოვე ადგილები, სადაც შენ გაგასწორე ან ერთსა და იმავეს ვიმეორებდი.
    თითოეულისთვის დაწერე ერთი მოკლე წესის სტრიქონი CLAUDE.md ფაილისთვის.
    ზოგადი რჩევები არ დაამატო, მხოლოდ ის, რაც დიალოგში იყო.
  </b-prompt>
  <b-sublabel top="22">წესებიდან სპეციფიკაციამდე</b-sublabel>
  <b-prompt>
    ამოცანა: [აღწერა]. კოდის წერამდე შეადგინე spec.md:
    რა უნდა გამოვიდეს, საიდან მოდის მონაცემები, რა შეზღუდვებია და როგორ გავიგოთ, რომ ამოცანა მზადაა.
    თუ რამე აკლია, დამისვი კითხვები.
  </b-prompt>
  <b-sublabel top="22">კარგი გაშვებიდან skill-მდე</b-sublabel>
  <b-prompt>
    გადაიკითხე ეს დიალოგი და პროცედურა, რომელიც მასში შეასრულე, skill-ად აქციე: საქაღალდე SKILL.md-ით,
    დასაწყისში სახელითა და აღწერით, შემდეგ ნაბიჯ-ნაბიჯ ინსტრუქციები, შეზღუდვები და შედეგის ნიმუში.
  </b-prompt>
  <b-sublabel top="22">skill-იდან სკრიპტამდე</b-sublabel>
  <b-prompt>
    შეხედე skill-ს [სახელი]. გამოყავი ნაბიჯები, რომლებიც ყოველ ჯერზე ერთნაირად გადის, და მათთვის დაწერე Python სკრიპტი.
    skill-ში დატოვე მხოლოდ სკრიპტის გაშვება და შედეგის შემოწმება.
  </b-prompt>
  <b-finding>
    <ex>ოთხი პრომპტი „როგორ დავნერგოთ AI“-ს განხილვას ცვლის: თითოეული ცოდნის ზუსტად ერთ ულუფას ერთი საფეხურით ზემოთ გადააქვს.</ex>
    <gen>გადასვლის ერთადერთი წესი არსებობს: მეორედ გაიმეორა: ჩაწერეთ; ჩანაწერი მეორდება და სტაბილურია: კოდად აქციეთ.</gen>
    <do>დაიწყეთ პრომპტით, რომელიც თქვენს მიმდინარე საფეხურს შეესაბამება სტატიის დასაწყისის ცხრილიდან.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="ხშირად დასმული კითხვები">
  <b-faq-cards>
    <q t="რა სიმწიფის დონეები არსებობს დეველოპმენტში AI-თან მუშაობისთვის?">ერთიანი სკალა არ არსებობს. ამ სტატიაში შვიდი საფეხურია, <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>-თან ექვსი საფეხური ხელით დეველოპმენტიდან პარალელურ ღრუბლოვან აგენტებამდე, <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>-თან რვა დონე, <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a>-თან შვიდი, <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a>-სა და <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a>-თან ექვსი-ექვსი (დონეები 0–5). ყველა ეთანხმება, რომ გზა ჩატიდან აგენტზე, შემდეგ ჩაწერილ წესებსა და სპეციფიკაციებზე და იქიდან ავტონომიურ სისტემაზე გადის.</q>
    <q t="რა არის compound engineering?">Every-ის მიდგომა, რომელშიც ყოველი დასრულებული ამოცანა ჩანაწერს ტოვებს, რომელიც შემდგომ ამოცანებს ეხმარება: ციკლი Plan → Work → Review → Compound. ბოლო ნაბიჯი გაკვეთილს CLAUDE.md-ში, გადაწყვეტის დოკუმენტებში, skills-სა და აგენტებში წერს.</q>
    <q t="რით განსხვავდება skill სკრიპტისგან?">skill არის ტექსტური ინსტრუქცია, რომელსაც მოდელი ყოველ გაშვებაზე თავიდან ასრულებს, ამიტომ შედეგები შეიძლება განსხვავდებოდეს. სკრიპტი ჩვეულებრივი კოდია: უფრო სწრაფი, უფრო იაფი და ერთნაირ შედეგს იძლევა, მაგრამ დასაწერად უფრო ნელია და მოულოდნელ პირობებზე უფრო ხისტი.</q>
    <q t="აუცილებელია თუ არა „dark factory“-მდე მისვლა?">არა. Clark გუნდების უმეტესობას მე-5 დონეზე გაჩერებას ურჩევს, Eledath კი მე-7 დონეს მთავარი ბერკეტის წერტილად ასახელებს. უფრო მაღლა ადით მხოლოდ მაშინ, თუ ამოცანები მეორდება და შედეგის ავტომატურად გადამოწმება შეიძლება.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="დამატებით">
  <b-links cols="2">
    <item href="/blog/harness-driven-development/" k="მეთოდი" t="Harness-Driven Development">აგენტის შეცდომა → გარემოს წესი</item>
    <item href="/blog/specs-rules-skills/" k="კონტექსტი" t="AGENTS.md, CLAUDE.md და spec.md">რა სად ჩავწეროთ: სპეციფიკაციები, წესები, skills</item>
    <item href="/blog/spec-reconcile-loop/" k="სპეციფიკაციები" t="სპეციფიკაციის შეჯერების ციკლი">როგორ სწავლობს სპეციფიკაცია მომუშავე სისტემისგან</item>
    <item href="/blog/specs-by-aggregates/" k="სპეციფიკაციები" t="სპეციფიკაციები აგრეგატებით">როგორ დავყოთ დიდი სპეციფიკაცია ნაწილებად</item>
    <item href="/blog/quality-gates-ai-agents/" k="Gates" t="რა არის ხარისხის gate-ები AI აგენტებისთვის">რომელი შემოწმებები დავდგათ კიბის საფეხურებზე</item>
    <item href="/blog/agent-escalation-to-human/" k="ესკალაცია" t="ესკალაცია ადამიანთან AI აგენტებში">როგორ ჩერდება აგენტი და ეკითხება</item>
  </b-links>
</b-chapter>
<b-footer>ეფუძნება პირველწყაროებს: <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> (compound engineering), <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> (05.02.2026), <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> (10.03.2026), <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> (06.04.2026), <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> (05.01.2026), <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> (23.01.2026), <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> (30.03.2026), <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a> (19.09.2026), <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a> (arXiv 2607.07052, 08.07.2026), Zhang (arXiv 2603.10808), <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a> (martinfowler.com). ექვსი საფეხური ამ წყაროებიდან კრიტერიუმით „რა იწერება“ არის აგებული; ავტორებს ამ თანმიმდევრობით ერთიანი კიბე არ აქვთ.</b-footer>
</b-post>
