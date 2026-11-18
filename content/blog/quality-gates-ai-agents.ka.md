---
title: რა არის ხარისხის gate-ები AI აგენტებისთვის: საკონტროლო წერტილები, რომლებიც ხარისხსა და ავტონომიური მუშაობის დროს ზრდიან
date: 2026-11-14
updated: 2026-11-18
description: ხარისხის gate არის შესასვლელი პოსტი აგენტის მუშაობასა და სიტყვა „მზადაა“-ს შორის. შემოწმების სამი სახეობა, MCP-ის უფლებები, hooks და ხუთი ნაბიჯი.
tags: AI, აგენტები, ხარისხის gate-ები, MCP, bounded context, harness, hooks, Claude Code
category: harness
layout: wide
mentions: quality gate, MCP, bounded context, aggregate, hooks, harness, Stage-Gate, Robert Cooper, Sonar, Claude, METR, deterministic check, feedback loop, compiler, P versus NP, design by contract, reward hacking
toc: answer=მოკლედ | origin=წარმოშობა | why=თვითშეფასება | kinds=სახეობები | gives=ხარისხი | auto=ავტონომია | where=საზღვარი | mcp=MCP | limits=საზღვრები | start=დასაწყისი | faq=კითხვები | next=წასაკითხი
---

ხარისხის gate AI აგენტისთვის არის გარე საკონტროლო წერტილი: მუშაობა ჩერდება, სანამ დამოუკიდებელი შემოწმება არ უპასუხებს „მიღებულია“, აგენტი კი „მზადაა“-ს თავად არასოდეს აღნიშნავს. gate აგენტის გარეთ და მისი bounded context-ის გარეთ დგას, MCP-ის ან სხვა გამყოფის უკან. ის ხარისხს ზრდის და ავტონომიურ მუშაობას ახანგრძლივებს. ქვემოთ: სახეობები, ციფრები, MCP და საზღვრები.

<b-post series="harness">
<b-callout icon="bulb">**ავტორის ფიქრები.** იდეა, რომ gate გარე ნაწილია და აგენტის კონტექსტის საზღვრის უკან დგას, და მისგან გამომდინარე დასკვნები ავტორს ეკუთვნის: gate bounded context-ის საზღვარზე უნდა იდგეს; MCP-ის ფუნქციების ერთი ვიწრო ნაკრები ერთდროულად ზოგავს კონტექსტს და ზღუდავს უფლებებს; gate-ები ავტონომიურ მუშაობას ახანგრძლივებს. არც ერთი წყარო ამას „gate კონტექსტის საზღვრის უკან“ არ აყალიბებს. ავტონომიური მუშაობის გახანგრძლივება არავის გაუზომავს: ავტონომიაზე სტატიაში გამოთვლა და შემთხვევებია და არა ამონაკრებზე დაფუძნებულ ექსპერიმენტს. წყაროები ცალკეულ რგოლებს ადასტურებენ და მათ გვერდით მისამართი და ზუსტი ფრაზა დგას.</b-callout>

<b-hchain label="ჯაჭვი: შესასვლელი, შემოწმების სახეობები, კონტექსტის საზღვარი, MCP, საზღვრები">
  <step icon="shield-check" t="Gate">შესასვლელი პოსტი</step>
  <step icon="layers" t="სახეობები">მანქანა · აგენტი · ადამიანი</step>
  <step icon="workflow" sw="1.8" t="საზღვარი">bounded context</step>
  <step icon="package" t="MCP">უფლებები და ფუნქციები</step>
  <step icon="alert-circle" t="საზღვრები">როგორ აუვლიან gate-ს გვერდს</step>
</b-hchain>

<b-chapter id="answer" icon="shield-check" title="მოკლედ: რა არის gate და რატომ სჭირდება აგენტს">
  <b-art names="quality-gates-ai-agents/overview" wide/>
  <b-cap>მუშაობის გზა: აგენტი თავის კონტექსტში ნაბიჯ-ნაბიჯ მიდის, სამუშაო MCP-ის გავლით აღწევს gate-ს, რომელიც სხვა კონტექსტში დგას. gate პასუხობს „მიღებულია“, „უკან შეცდომით“ ან „დარწმუნებული არ ვარ, ადამიანი წყვეტს“.</b-cap>
  <b-why align="left"><b-icon name="shield-check"/> **რა არის.** gate აგენტის სამუშაოსა და სიტყვა „მზადაა“-ს შორის დგას. აგენტი შედეგს მოაქვს, შემოწმება კი სამიდან ერთ პასუხს იძლევა: მიღებულია, არ არის მიღებული (შეცდომები აგენტს უბრუნდება) ან დარწმუნებული არ არის (ადამიანი წყვეტს). პოსტი ამბობს „მზადაა“. თუ შემოწმება ჩავარდა, სამუშაო შორს არ მიდის: არც შემდეგ ნაბიჯზე, არც merge-ში, არც მომხმარებელთან. gate გარე ნაწილია: საკონტროლო წერტილი ვერ დადგება აგენტთან ერთ bounded context-ში, თორემ აგენტის ბრმა წერტილებს გაიზიარებს. ამიტომ ის გამყოფის უკან დგას: MCP სერვერის უკან, კლიენტის hook-ში ან სხვა პროცესში. ამ საზღვარს ორივე მიმართულებით ძალიან ცოტა რამ კვეთს: იქით მოკლე შედეგი, უკან მოკლე პასუხი, დანარჩენი დახურულია. gate მუშაობს, რადგან შემოწმება ჩვეულებრივ უფრო მარტივია, ვიდრე გაკეთება. ეს კომპლექსურობის თეორიის „P versus NP“ კითხვის ახლობელია: ამოხსნის პოვნა შეიძლება რთული იყოს, მზა ამოხსნის შემოწმება კი სწრაფია. აგენტებისთვის ეს მხოლოდ ანალოგიაა: შემოწმება ყველა ამოცანაზე იაფი არ არის და სადაც არ არის, gate ადამიანს ეყრდნობა.</b-why>
  <b-why align="left"><b-icon name="trend-up"/> **რატომ.** პირველი მიზეზი ხარისხია: აგენტი საკუთარ მუშაობას ცუდად აფასებს, დამოუკიდებელი შემოწმება კი ხედავს იმას, რაც მან გამოტოვა. მეორე ავტონომიაა: ნაბიჯზე დაჭერილი შეცდომა შემდეგ ოც ნაბიჯს არ გაჰყვება, ამიტომ აგენტს შეუძლია ადამიანის გარეშე უფრო დიდხანს იმუშაოს. მესამე ადამიანის ყურადღებაა: ის მხოლოდ იმ სადავო შემთხვევებს უყურებს, რომლებიც gate-მა გადასცა.</b-why>
  <b-why align="left"><b-icon name="target"/> **სად დავდგათ.** აგენტის გარეთ და მისი კონტექსტის გარეთ: კლიენტის hook-ში ან MCP-ის უკან მდგომ სერვერის უფლებებში და არა ინსტრუქციის ტექსტში, რომელსაც აგენტმა შეიძლება უგულებელყოს. თავად აგენტი მცირე bounded context-ში მუშაობს: იქ შემოწმება სასრულია, ცვლილება მცირეა და MCP-ის ფუნქციების ნაკრები ვიწროა.</b-why>
  <b-finding>
    <ex>აგენტმა ჯავშნის ფორმის რედაქტირება დაამთავრა. gate-ის გარეშე ის წერს „მზადაა“. gate-ით კი ტესტები და ჯავშნის წესების შემოწმება გაეშვება: თუ ტესტი ჩავარდა, აგენტი შეცდომის ტექსტს იღებს და აგრძელებს, ადამიანი კი ცვლილებაზე მხოლოდ მაშინ იგებს, როცა ყველაფერი გავიდა ან შემოწმებამ თქვა „დარწმუნებული არ ვარ“.</ex>
    <gen>gate აგენტს „მზადაა“-ს თავად აღნიშვნის უფლებას ართმევს და აგენტის გარეთ მდგომ შემოწმებას გადასცემს.</gen>
    <do>აირჩიეთ ერთი ამოცანა, რომელსაც აგენტი რეგულარულად ასრულებს, და „მზადაა“-ს პირობა ერთი შესამოწმებელი წინადადებით ჩაწერეთ: „ყველა ტესტი მწვანეა და linter დუმს“.</do>
  </b-finding>
</b-chapter>

<b-chapter id="origin" icon="clock" title="საიდან მოდის სიტყვა: კოდის ინსპექციიდან აგენტების gate-ებამდე">
  <b-why align="left">სიტყვა „gate“ პროდუქტის მენეჯმენტიდან, ქარხნებიდან და პროგრამული ინჟინერიიდან მოვიდა. ქვემოთ გზის ოთხი წერტილია და თითოეული ისეთ იდეას ატარებს, რომელიც აგენტის gate-ებმა მემკვიდრეობით მიიღო.</b-why>
  <b-art names="quality-gates-ai-agents/timeline" wide/>
  <b-cap>კოდის ინსპექცია, Stage-Gate, gate ახალ კოდზე და gate-ები აგენტებისთვის.</b-cap>
  <b-rules cols="2">
    <rule icon="eye" t="1976: კოდის ინსპექცია">Fagan-მა გადაცემამდე კოდის ფორმალური ინსპექცია შემოიღო. 2026 წლის მიმოხილვა მას მოგვიანებით „ძირითად ხარისხის gate-ს“ უწოდებს<b-proof href="https://arxiv.org/abs/2606.13175" quote="Monperrus: „Code review has been the primary quality gate in software development since Fagan formalised code inspection in 1976.“"/>.</rule>
    <rule icon="git-branch" t="1990: Stage-Gate">Robert Cooper-მა პროექტი აღწერა, როგორც ეტაპების ჯაჭვი მათ შორის gate-ებით, რომლებიც წყვეტენ „გავაგრძელოთ თუ გავჩერდეთ“. მისი ინსტიტუტის საიტი ასე აყალიბებს: gatekeeper-ები ასეთ გადაწყვეტილებებს დროულად იღებენ<b-proof href="https://stage-gate.com/blog/improving-go-kill-decision-culture/" quote="Stage-Gate International: „Gatekeepers make timely, Go/Kill decisions.“"/>.</rule>
    <rule icon="shield-check" t="2020: gate ახალ კოდზე">Sonar-მა gate განსაზღვრა, როგორც ბინარული გადაწყვეტილება: pass ან fail<b-proof href="https://www.sonarsource.com/blog/clean_coding-quality_profile_quality_gate_guidance/" quote="Sonar: „called a Quality Gate and it's binary in nature - either pass or fail.“"/>. ის ახლახან დამატებულ ან შეცვლილ კოდს ამოწმებს; მთელი ისტორია შემოწმების გარეთ რჩება.</rule>
    <rule icon="cpu" t="2026: gate-ები აგენტებისთვის">Thoughtworks Radar კომპილატორებს, linter-ებსა და ტესტებს დეტერმინისტულ ხარისხის gate-ებს უწოდებს და გვირჩევს აგენტის სამუშაო პროცესებში ჩავრთოთ<b-proof href="https://www.thoughtworks.com/content/dam/thoughtworks/documents/radar/2026/04/tr_technology_radar_vol_34_en.pdf" quote="Thoughtworks Radar, vol. 34: „Developers have long relied on deterministic quality gates such as compilers, linters, structural tests and test suites“"/>. Sonar-ს აგენტების დაწერილი კოდისთვის პირობების ცალკე ნაკრები აქვს.</rule>
  </b-rules>
  <b-why align="left">ქარხნებიდან კიდევ ორი იდეა მოვიდა. Deming-ის თოთხმეტი პუნქტიდან მესამე ამბობს, რომ ბოლოს ინსპექციაზე დამოკიდებულება უნდა შევწყვიტოთ და ხარისხი პროდუქტში თავიდანვე ჩავდოთ<b-proof href="https://deming.org/explore/fourteen-points/" quote="Deming, point 3: „Cease dependence on inspection to achieve quality. Eliminate the need for inspection on a mass basis by building quality into the product in the first place.“"/>. თავის jidoka სისტემაში Toyota აიძულებს მოწყობილობას დაუყოვნებლივ გაჩერდეს, როცა ანომალიას აღმოაჩენს<b-proof href="https://global.toyota/en/company/vision-and-philosophy/production-system/" quote="Toyota: equipment should „stop immediately when abnormalities are detected to prevent defective products from being produced“"/>. აგენტის gate ორივე იდეას აერთიანებს: შემოწმება რაც შეიძლება ადრე დგას და სამუშაოს გაჩერება შეუძლია.</b-why>
  <b-finding>
    <ex>Fagan კოდს ადამიანებით ამოწმებდა, Cooper გაჩერებებს პროექტის ეტაპებს შორის აყენებდა, Sonar gate ავტომატური გახადა, აგენტებისთვის კი gate იქცა წერტილად, სადაც სამუშაო განაჩენის გარეშე არ გრძელდება.</ex>
    <gen>აგენტის gate ახალი გამოგონება არ არის: ეს ძველი საკონტროლო წერტილია, გადატანილი იქ, სადაც სამუშაოს მანქანა აკეთებს, მანქანა კი საკუთარ თავს ცუდად ამოწმებს.</gen>
    <do>ნახეთ, რა gate-ები უკვე აქვს თქვენს პროექტს ადამიანებისთვის: ტესტები CI-ში, სავალდებულო review, linter. აგენტმაც იგივე უნდა გაიაროს.</do>
  </b-finding>
</b-chapter>

<b-chapter id="why" icon="eye" title="რატომ არ ამოწმებს აგენტი საკუთარ თავს">
  <b-why align="left">პირველი, რასაც კვლევა აჩვენებს: აგენტი საკუთარ სამუშაოს აჭარბებს. Anthropic-მა აღმოაჩინა, რომ სამუშაოს შემსრულებელი აგენტის და მისი განმსჯელი აგენტის გამიჯვნა ძლიერი ბერკეტია<b-proof href="https://www.anthropic.com/engineering/harness-design-long-running-apps" quote="Anthropic, 24 Mar 2026: „Separating the agent doing the work from the agent judging it proves to be a strong lever to address this issue.“"/>. ისინი ასევე აღნიშნავენ, რომ ყუთიდან ამოღებული Claude ცუდი რეცენზენტია და სიმკაცრეზე უნდა მოერგოს.</b-why>
  <b-why align="left">ყველაზე დეტალური გაზომვა Park-ისა და Choi-ს პრეპრინტია (2026 წლის ივლისი, პილოტის ჩანაწერი). იგივე აგენტი ექვს გაუმჯობესების ციკლს გადიოდა და იცვლებოდა მხოლოდ ის, ვინც უკუკავშირის ციკლს ხურავს, ანუ შედეგის განმსჯელი: თავად აგენტი, ძლიერი განმსჯელი ციკლის შიგნით ან გარე შემოწმება, რომელიც რეალურ შედეგს ხედავს. დიაგრამა თითოეული ვარიანტის საბოლოო ქულას აჩვენებს.</b-why>
  <b-art names="quality-gates-ai-agents/self-grade" wide/>
  <b-cap>აგენტის თვითშეფასებამ მიღწეული 19%-ით უკან დააბრუნა, გარე შემოწმებამ კი მაქსიმუმი მისცა. პილოტი: ერთი მოდელი, ერთი ამოცანა, სამი გამეორება.</b-cap>
  <b-why align="left">რა დგას ციფრების უკან. აგენტმა ყველა 54 ციკლი გაუმჯობესებად დაასახელა, თუმცა მათ 56%-ში რეალური ცვლილება ნულოვანი ან უარყოფითი იყო: თვითშეფასება „ყველაფრის მიღებად“ იქცა. ციკლის შიგნით მყოფმა ძლიერმა განმსჯელმაც კი შემთხვევათა 44%-ში რეალური რეგრესიები მიიღო და რეალური გაუმჯობესებების 38% უარყო. ავტორები უფსკრულს ასე ხსნიან<b-proof href="https://arxiv.org/abs/2607.25152" quote="Park, Choi: „The cause of the gap is not the evaluator's quality but what the evaluator is grounded in.“"/>: უფსკრულს განსაზღვრავს ის, რას ეყრდნობა განმსჯელი, განმსჯელის ინტელექტი კი მასზე არ ახდენს გავლენას. ციკლის შიგნით მყოფი განმსჯელი მხოლოდ იმას ხედავს, რაც აგენტმა აჩვენა. გარე შემოწმება რეალურ შედეგს უყურებს.</b-why>
  <b-why align="left">Anthropic იმავე დასკვნამდე თავისი C კომპილატორით მივიდა (შემთხვევა, რომელიც თავად Anthropic-მა აღწერა): 16 აგენტი, დაახლოებით 2000 სესია და დაახლოებით $20 000. ავტორმა მთავარ პირობად თითქმის იდეალური ვერიფიკატორი დაასახელა<b-proof href="https://www.anthropic.com/engineering/building-c-compiler" quote="Anthropic, 5 Feb 2026: „it's important that the task verifier is nearly perfect, otherwise Claude will solve the wrong problem.“"/>. იმავე სტატიაში გაფრთხილებაა<b-proof href="https://www.anthropic.com/engineering/building-c-compiler" quote="same article: „it is easy to see tests pass and assume the job is done, when this is rarely the case.“"/>. ტესტები გადის და სამუშაო დასრულებული არ არის: ეს ხდება, სანამ შემოწმება დეტერმინისტული არ არის. დეტერმინისტული შემოწმება ერთსა და იმავე მონაცემებზე ყოველთვის ერთსა და იმავე განაჩენს იძლევა, როგორც ტესტების ან linter-ის გაშვება. განმსჯელი მოდელის პასუხი გაშვებიდან გაშვებამდე შეიძლება განსხვავდებოდეს, ამიტომ განმსჯელი შემოწმების პროგრამას ემატება და არ ცვლის მას.</b-why>
  <b-why align="left">პილოტიდან კიდევ ერთი დაკვირვება: გარე შემოწმებას ერთი ბიტი ეყო. განაჩენმა „მიღებულია“ ან „უარყოფილია“ ახსნის გარეშე 110,0 დააგროვა, სრული დასკვნით კი 113,0. ამრიგად, gate-ს მიზეზი არ უნდა თქვას: საკმარისია „დიახ“ ან „არა“.</b-why>
  <b-finding>
    <ex>ციკლში მყოფმა აგენტმა ყველაფერს გაუმჯობესება უწოდა, გარე შემოწმებამ კი, რეალურ შედეგს რომ უყურებდა, რეგრესიები მოჭრა.</ex>
    <gen>აგენტის დიალოგის შიგნით მყოფი შემოწმება მის ბრმა წერტილებს მემკვიდრეობით იღებს. შემოწმებას დამოუკიდებელს ხდის გარე ფაქტზე დაყრდნობა: ტესტის გაშვება, რეალური შედეგი, ცალკე რეცენზენტი, რომელსაც რეალურ პროდუქტზე აქვს წვდომა.</gen>
    <do>გადახედეთ აგენტისთვის თქვენს პრომპტებს: თუ მათში წერია „დარწმუნდი, რომ ყველაფერი სწორია“, ჩაანაცვლეთ შემოწმების გაშვებით, რომლის შედეგსაც აგენტი თავად ვერ დაწერს.</do>
  </b-finding>
</b-chapter>

<b-chapter id="kinds" icon="layers" title="შემოწმების სამი სახეობა gate-ზე">
  <b-why align="left">შესასვლელ პოსტზე შეიძლება სამი სახის შემოწმება იდგეს. ისინი სიჩქარით, ფასითა და იმით განსხვავდებიან, რასაც ხედავენ, ამიტომ პრაქტიკაში რამდენიმე ზედიზედ დგას: ჯერ იაფი და სწრაფი, ბოლოს ძვირი და იშვიათი.</b-why>
  <b-art names="quality-gates-ai-agents/three-kinds" wide/>
  <b-cap>მარცხნიდან მარჯვნივ შემოწმება უფრო ჭკვიანი, ნელი და ძვირი ხდება.</b-cap>
  <b-table>

| სახეობა | რას ხედავს | მაგალითი | სუსტი წერტილი |
|---|---|---|---|
| <b-icon name="cpu"/> **მანქანა** | ყველაფერს, რაც წესად ჩაიწერება: ტესტები, ტიპები, linter, აგება, დაფარვა | Sonar აგენტებისთვის: ახალი კოდის დაფარვა მინიმუმ 80%, დუბლირება მაქსიმუმ 3%, ახალი ბაგებისა და დაუცველობების გარეშე | არ ხედავს აზრს: სენსორები არასწორ დიაგნოზს, ზედმეტ სირთულეს და არასწორად წაკითხულ ამოცანებს არასანდოდ იჭერენ |
| <b-icon name="eye"/> **მაკონტროლებელი აგენტი** | აზრს ზღვრიანი კრიტერიუმებით | Anthropic: ზღვარს ქვემოთ ნებისმიერ კრიტერიუმზე ეტაპი ვარდება; Spotify-ის განმსჯელი სესიების დაახლოებით მეოთხედს ვეტოს უდებს | უფრო ძვირია, სიმკაცრეზე მორგება სჭირდება და ისიც ცდება |
| <b-icon name="user"/> **ადამიანი** | რისკს, განზრახვას, შედეგებს | GitHub: აგენტის draft PR-ებს მხოლოდ ადამიანი ამტკიცებს და აერთიანებს | იღლება და დამტკიცებას ეჩვევა |

  </b-table>
  <b-why align="left"><b-icon name="cpu"/> **მანქანა.** ქვედა დონეს ადგენს. აგენტების დაწერილი კოდისთვის Sonar ექვს პირობას მოითხოვს: ახალი ბაგების, დაუცველობებისა და მხარდაჭერადობის პრობლემების გარეშე ზღვარს ზემოთ, ახალი კოდის დაფარვა მინიმუმ 80%, დუბლირება მაქსიმუმ 3% და ახალი დამოკიდებულებების რისკების გარეშე. ბოლო პირობა აგენტების ქცევის გამო გაჩნდა: მათ შეუძლიათ პაკეტების შემოწმების გარეშე დაყენება<b-proof href="https://docs.sonarsource.com/sonarqube-server/quality-standards-administration/ai-code-assurance/quality-gate-for-agentic-ai" quote="Sonar: „agents may autonomously install packages without manual vetting“"/>. შემოწმებების მეგზურებად და სენსორებად დაყოფისთვის იხილეთ სტატია [„Harness engineering პრაქტიკაში“](/blog/harness-driven-development/): gate არის სენსორი, რომელსაც სამუშაოს გაჩერების უფლება აქვს.</b-why>
  <b-why align="left"><b-icon name="eye"/> **მაკონტროლებელი აგენტი.** Anthropic-ში თითოეულ კრიტერიუმს მკაცრი ზღვარი ჰქონდა და თუ თუნდაც ერთი ზღვარს ქვემოთ ეცემოდა, ეტაპი ვარდებოდა და აგენტი დეტალურ დასკვნას იღებდა<b-proof href="https://www.anthropic.com/engineering/harness-design-long-running-apps" quote="Anthropic: „Each criterion had a hard threshold, and if any one fell below it, the sprint failed and the generator got detailed feedback on what went wrong.“"/>. ეტაპამდე შემსრულებელი და რეცენზენტი ეტაპის კონტრაქტზე თანხმდებოდნენ: რა ითვლება „მზადად“<b-proof href="https://www.anthropic.com/engineering/harness-design-long-running-apps" quote="Anthropic: „agreeing on what ‘done’ looked like for that chunk of work before any code was written“"/>. Spotify-მ განმსჯელი მას შემდეგ დაამატა, რაც აგენტებმა ზედმეტის კეთება დაიწყეს: ამოცანის გარეთ კოდის რეფაქტორინგი და არასტაბილური ტესტების გამორთვა. განმსჯელი ცვლილებას თავდაპირველ მოთხოვნას ადარებს<b-proof href="https://engineering.atspotify.com/2025/12/feedback-loops-background-coding-agents-part-3" quote="Spotify: „the judge vetoes about a quarter of them. When that happens, the agent is able to course correct half the time.“"/>.</b-why>
  <b-why align="left"><b-icon name="user"/> **ადამიანი.** GitHub-მა ადამიანი თავად პროცესში ჩააშენა: აგენტს არც თავისი PR-ის მზადად მონიშვნა შეუძლია, არც დამტკიცება, არც merge<b-proof href="https://docs.github.com/en/copilot/concepts/agents/coding-agent/risks-and-mitigations" quote="GitHub Docs: „Copilot cloud agent cannot mark its pull requests as ‘Ready for review’ and cannot approve or merge a pull request.“"/>. ასეთი gate იქ არის საჭირო, სადაც შეცდომა ძვირი ჯდება: ფული, წვდომა, სხვისი მონაცემები.</b-why>
  <b-why align="left">gate-ს სამი პასუხი აქვს: მიღებულია, არ არის მიღებული და „დარწმუნებული არ ვარ“. მესამე შემთხვევას ადამიანს გადასცემს და აჩვენებს, სად დასრულდა შემოწმების ჩარჩო. რატომ არის ასეთი პასუხი აგენტის ნებისმიერი კოდისთვის გარდაუვალი, აღწერილია სტატიაში [„სად შევამოწმოთ AI აგენტის მუშაობა“](/blog/agent-checkpoint/).</b-why>
  <b-finding>
    <ex>ტესტები 40 წამში გავიდა. მაკონტროლებელმა აგენტმა აღმოაჩინა, რომ ღილაკი მუშაობს, მაგრამ ამოცანისგან განსხვავებულად გამოიყურება. ადამიანმა მხოლოდ ეს სადავო შემთხვევა მიიღო.</ex>
    <gen>სწრაფი gate-ები ძვირის წინ დგას: მანქანა აშკარას ფილტრავს, აგენტი აზრს განსჯის, ადამიანი რისკს წყვეტს.</gen>
    <do>ჩამოთვალეთ თქვენი პროექტის შემოწმებები ცხრილის სამ სტრიქონზე. ცარიელი სტრიქონი ნიშნავს, რომ ამ სახეობის gate არ არის.</do>
  </b-finding>
</b-chapter>

<b-chapter id="gives" icon="trend-up" title="რას აძლევს gate-ები ხარისხს და რა ჯდება ეს">
  <b-why align="left">ეს ციფრები ოთხი ცალკე წყაროდან მოდის: Anthropic-ის ორი ჩანაწერი (24 მარტი 2026 და 5 თებერვალი 2026), Stripe-ისა და Spotify-ის საინჟინრო ბლოგები და DORA 2025-ის ანგარიში. ამონაკრებზე დაფუძნებული კვლევები არ არსებობს: არავის გამოუქვეყნებია „gate-ით და გარეშე“ შედარებები ასობით ამოცანაზე, ამიტომ თითოეული ციფრი მაგალითად გამოდგება. თითოეული ციფრის გვერდით ბმული აჩვენებს, საიდან მოდის.</b-why>
  <b-art names="quality-gates-ai-agents/cost-quality" wide/>
  <b-cap>ერთი მოთხოვნა: მარტო აგენტი და აგენტი რეცენზენტით.</b-cap>
  <b-rules cols="2">
    <rule icon="flask" t="Anthropic: ერთი მოთხოვნა, ორი გაშვება">ერთი აგენტი: 20 წუთი და $9, მთავარი ფუნქცია არ მუშაობდა. აგენტი რეცენზენტით: 6 საათი და $200, შედეგი მუშაობდა<b-proof href="https://www.anthropic.com/engineering/harness-design-long-running-apps" quote="Anthropic: „The harness was over 20x more expensive, but the difference in output quality was immediately apparent.“"/>. Opus 4.6-ით: 3 საათი 50 წუთი და $124,70. ის ამართლებს იმ ამოცანებზე, რომლებსაც მოდელი მარტო საიმედოდ ვერ აკეთებს<b-proof href="https://www.anthropic.com/engineering/harness-design-long-running-apps" quote="Anthropic: „It is worth the cost when the task sits beyond what the current model does reliably solo.“"/>.</rule>
    <rule icon="modules" t="Stripe: მასშტაბი">კვირაში ათასზე მეტ merge-ებულ PR-ს აგენტები წერენ და ადამიანები განიხილავენ<b-proof href="https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents" quote="Stripe: „Over a thousand pull requests merged each week at Stripe are completely minion-produced, and while they're human-reviewed, they contain no human-written code.“"/>. მოდელის ნაბიჯებს შორის მოდელის გარეშე ნაბიჯები დგას: linter-ები ხუთ წამში, მაქსიმუმ CI-ის ორი გაშვება, შემდეგ ბრენჩი ადამიანთან მიდის<b-proof href="https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents-part-2" quote="Stripe, part 2: „those particular nodes don't invoke an LLM at all—they just run code“"/>.</rule>
    <rule icon="refresh-cw" t="Spotify: განმსჯელი">ვერიფიკატორები თავისით გადის, აგენტმა ისინი არ იცის; განმსჯელი აზრს ამოწმებს. „მანამდე და შემდეგ“ ციფრები არ არის: მხოლოდ ვეტო სესიების მეოთხედში და აღდგენა მათი ნახევრის შემთხვევაში.</rule>
    <rule icon="chart-line" t="DORA 2025: სიჩქარე და სტაბილურობა">AI მიწოდების სიჩქარეს ზრდის, მაგრამ სტაბილურობას ამცირებს<b-proof href="https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report" quote="DORA 2025: „AI adoption does continue to have a negative relationship with software delivery stability.“"/>. არგუმენტმა „არასტაბილურობა სწრაფი გასწორებებით ანაზღაურდება“ მხარდაჭერა ვერ ჰპოვა<b-proof href="https://services.google.com/fh/files/misc/2025_state_of_ai_assisted_software_development.pdf" quote="DORA 2025, p. 41: „We found no evidence of such a moderating effect.“"/>. ჩემი დასკვნა: gate-ები არ აძლევს სიჩქარეს სტაბილურობის ხარჯზე გადახდის საშუალებას. ანგარიში gate-ებს არ ახსენებს.</rule>
  </b-rules>
  <b-finding>
    <ex>რეცენზენტმა და ზღვრებმა გატეხილი აპლიკაცია მომუშავედ აქცია 20-ჯერ მეტ ფასად. Stripe-მა და Spotify-მ მასშტაბი აგენტის გარშემო მდგომი შემოწმებების წყალობით მოიპოვეს.</ex>
    <gen>gate ფულსა და დროს ხარჯავს. ის ამართლებს იქ, სადაც აგენტი მის გარეშე გატეხილ შედეგს ან მოგვიანებით ძვირ შეცდომას აწვდის.</gen>
    <do>თქვენი ამოცანისთვის შეაფასეთ ადამიანის review-მდე მისული ერთი შეცდომის ფასი და შემოწმების ერთი გაშვების ფასი. თუ პირველი მეტია, gate ამართლებს.</do>
  </b-finding>
</b-chapter>

<b-chapter id="auto" icon="gauge" title="როგორ ახანგრძლივებენ gate-ები ავტონომიურ მუშაობას: არითმეტიკა და ხვრელი მონაცემებში">
  <b-callout icon="bulb">ენობრივი მოდელი სამყაროს უხეშ ესკიზს ინახავს და არა თავად სამყაროს. როცა აგენტი თავის ნაბიჯებს რეალობას ადარებს (ტესტები, სისტემის პასუხები) და კონტექსტს წესრიგში ინახავს, შეცდომები ჩანს და სწორდება. თვითგასწორებაზე ნაშრომები ამას ადასტურებს: გარედან საიმედო სიგნალით ეხმარება და მის გარეშე ზოგჯერ აზიანებს. „რაც უფრო დიდხანს, მით უკეთესი“ მხოლოდ ასეთი შემოწმებისას მართალია: გრძელ შეყვანაზე ხარისხი ეცემა, ზოგ ამოცანაზე კი მსჯელობის გრძელი ჯაჭვი უარეს პასუხს იძლევა. gate შემოწმებასა და წესრიგს უზრუნველყოფს, ამიტომ სამუშაო ხარისხის დაკარგვის გარეშე შეიძლება უფრო დიდხანს გაგრძელდეს. ამონაკრებზე მონაცემები „gate-მა ავტონომიური მუშაობა გახანგრძლივა“ არ არსებობს; ქვემოთ ფაქტებია, რომლებსაც იდეა ემყარება.</b-callout>
  <b-why align="left"><b-icon name="bar-chart"/> **რა არის ამოცანის ჰორიზონტი.** METR ზომავს იმ ამოცანის სიგრძეს, რომელსაც აგენტი წარმატების მოცემული ალბათობით ასრულებს, იმ დროში, რომელიც ადამიანს სჭირდება. ეს აგენტის მუშაობის დრო არ არის<b-proof href="https://metr.org/time-horizons" quote="METR: „It's a measure of the difficulty of a task, rather than the time an AI spends to complete the task.“"/>. Claude Opus 4.6-ისთვის ჰორიზონტი 50%-იანი წარმატებით დაახლოებით 12 საათია (ნდობის ინტერვალი 5-დან 61 საათამდე), 80%-იანით კი დაახლოებით 70 წუთი. GPT-5.4-ისთვის ეს 5,7 საათია და 54 წუთი. 16 საათს ზემოთ METR გაზომვებს არასანდოდ თვლის<b-proof href="https://metr.org/time-horizons" quote="METR: „Measurements above 16 hrs are unreliable with our current task suite.“"/>. როგორ მუშაობს ავტონომიის მეტრიკები და სად დგას მათში ადამიანი: სტატიაში [„ესკალაცია ადამიანთან AI აგენტებში“](/blog/agent-escalation-to-human/#measure).</b-why>
  <b-why align="left"><b-icon name="chart-axes"/> **საიმედოობის ფასი.** Toby Ord-მა აჩვენა, რომ მუშაობის წუთზე მარცხის მუდმივი შანსისას ჰორიზონტები ფორმულით უკავშირდება ერთმანეთს<b-proof href="https://arxiv.org/pdf/2505.05115" quote="Ord: „the time horizon for a success probability of p would be ln(p)/ln(q) times as long as one with success probability q.“"/>. შედეგი: 80%-იანი წარმატების ჰორიზონტი 50%-იანის დაახლოებით მესამედია, 90%-იანის დაახლოებით მეშვიდედი, 99%-იანის დაახლოებით სამოცდამეათედი. საიმედოობის ყოველი დამატებითი „ცხრიანი“ ამოცანის სიგრძეს ხარჯავს.</b-why>
  <b-art names="quality-gates-ai-agents/autonomy-curve" wide/>
  <b-cap>გამოთვლილი მაგალითი: ნაბიჯზე 95%-იანი წარმატებისას 20 ნაბიჯის შემდეგ 36%-იანი შანსი რჩება, ნაბიჯზე 99%-ისას კი 82%.</b-cap>
  <b-why align="left"><b-icon name="shield-check"/> **სად არის აქ gate.** ნაბიჯზე მდგომი gate ნაბიჯის საიმედოობას ზრდის. თუ ნაბიჯი 5%-იანი შანსით ვარდება და gate ხუთიდან 4 შეცდომას იჭერს და აგენტს გასასწორებლად უკან აბრუნებს, ნაბიჯი საბოლოოდ შემთხვევათა 1%-ში ტყდება. არითმეტიკა დამოუკიდებელ ნაბიჯებს ვარაუდობს: Ord თავადაც აღნიშნავს, რომ Claude 3.7 Sonnet-ისთვის ჰორიზონტების გაზომილი თანაფარდობა 0,25-ია, თეორია კი 0,32-ს იძლევა. დიაგრამა მიმართულებას აჩვენებს: 82% გამოთვლაა, რომლის უკან გაზომილი შედეგი არ დგას.</b-why>
  <b-why align="left"><b-icon name="file-text"/> **Anthropic-ის ორი მექანიზმი გრძელი გაშვებებისთვის.** პირველი: აგენტის თითოეული სესია წინა სესიების მეხსიერების გარეშე იწყება და დიალოგის შეკუმშვა საკმარისი არ არის<b-proof href="https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents" quote="Anthropic: „compaction isn’t sufficient“"/>. ამიტომ დასაწყისში აგენტმა 200-ზე მეტი ფუნქციის სია დაწერა, ყველა მონიშნული როგორც „failing“. აგენტს მხოლოდ გავლის ნიშნის შეცვლა შეუძლია, თავად ტესტების რედაქტირება კი აკრძალულია<b-proof href="https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents" quote="Anthropic: „It is unacceptable to remove or edit tests because this could lead to missing or buggy functionality.“"/>. ასეთი სია gate-ის მდგომარეობაა, რომელიც დიალოგის გარეთ, ფაილში ცხოვრობს: ახალი სესია ხედავს, რამდენი დარჩა, და ვერ გადაწყვეტს, რომ ყველაფერი გაკეთებულია.</b-why>
  <b-why align="left"><b-icon name="alert-circle"/> მეორე მექანიზმი „კონტექსტურ შფოთვას“ ეხება. მოდელები სამუშაოს დასრულებას იწყებენ, როცა ფიქრობენ, რომ კონტექსტის ფანჯარა მალე დასრულდება<b-proof href="https://cognition.com/blog/devin-sonnet-4-5-lessons-and-challenges" quote="Cognition: „we found the model taking shortcuts or leaving tasks incomplete when it believed it was near the end of its window, even when it had plenty of room left.“"/>. სიიდან კრიტერიუმებიანი gate დასრულების გადაწყვეტილებას მწვანე ნიშნებზე ამყარებს და აგენტის შეგრძნება მასში მონაწილეობას არ იღებს. აქედან დასკვნა: bounded context-ის ზომა ფიზიკურ კონტექსტურ ფანჯარაში უნდა ეტეოდეს.</b-why>
  <b-why align="left"><b-icon name="refresh-cw"/> **Hook როგორც გაგრძელების მექანიზმი.** Claude Code-ში ამოცანის დასრულების hook ამოცანის დახურვას არ აძლევს, სანამ შემოწმებები არ გავა<b-proof href="https://code.claude.com/docs/en/hooks" quote="Claude Code Docs, TaskCompleted: „Use this to enforce completion criteria like passing tests or lint checks before a task can close.“"/>: უარის შეტყობინება აგენტს უბრუნდება და ის აგრძელებს. stop hook ასევე მუშაობს მთელი ტურის დასრულებისთვის.</b-why>
  <b-finding>
    <ex>აგენტი 20 ნაბიჯს აკეთებს. gate-ის გარეშე მათი ერთი შეცდომის გარეშე გავლის შანსი დაახლოებით 36%-ია. gate, რომელიც ყოველ ნაბიჯზე 5-დან 4 შეცდომას იჭერს, გამოთვლით მას დაახლოებით 82%-მდე ზრდის.</ex>
    <gen>gate ავტონომიას ნაბიჯის საიმედოობით იძლევა: რაც უფრო იშვიათად გადადის შეცდომა შემდეგ ეტაპზე, მით უფრო გრძელი ამოცანის დატოვება შეიძლება ზედამხედველობის გარეშე. პირდაპირი გაზომვები არ არსებობს, ამიტომ ეს გამოთვლაა და ჰიპოთეზა.</gen>
    <do>აწარმოეთ ჟურნალი: რამდენ ნაბიჯს გადის აგენტი ადამიანის ჩარევის გარეშე gate-ის დამატებამდე და მის შემდეგ. ერთ თვეში საკუთარი ციფრები გექნებათ.</do>
  </b-finding>
</b-chapter>

<b-chapter id="where" icon="workflow" title="სად დავდგათ: bounded context-ის საზღვარზე">
  <b-why align="left">gate bounded context-ის საზღვარს ოთხი მიზეზით ეკუთვნის. თითოეულს წყაროებში მხარდაჭერა აქვს.</b-why>
  <b-why align="left"><b-icon name="ring-dot"/> **1. ჩარჩოს შიგნით შემოწმება სასრულია.** არც ერთ შემოწმებას არ შეუძლია ნებისმიერი პროგრამა ნებისმიერ წესთან გადაამოწმოს, ამიტომ შემოწმება იქ მიდის, სადაც ჩარჩო კითხვას ზღუდავს. რატომ არის ეს ასე და როგორ ხდება აგრეგატის საზღვარი საკონტროლო წერტილი, აღწერილია სტატიაში [„სად შევამოწმოთ AI აგენტის მუშაობა“](/blog/agent-checkpoint/). gate-ისთვის აქედან გამომდინარეობს: საზღვრის გარეშე gate ძალიან ხშირად უპასუხებს „დარწმუნებული არ ვარ“.</b-why>
  <b-why align="left"><b-icon name="scissors"/> **2. მცირე ცვლილება უფრო ხშირად გამოდის.** რაც უფრო მეტს ცვლის აგენტი ერთბაშად, მით უფრო იშვიათად იხსნება ამოცანა. კონტექსტის საზღვარი ცვლილების ზომას ბუნებრივად ზღუდავს.</b-why>
  <b-art names="quality-gates-ai-agents/size-success" wide/>
  <b-why align="left">დიაგრამის ციფრები ორი ნაშრომიდან მოდის: [SWE-bench Live](https://arxiv.org/abs/2505.23419) და Kozuchi აგენტი SWE-bench Verified-ზე ([arXiv 2608.15579](https://arxiv.org/abs/2608.15579)). ბენჩმარკები და აგენტები განსხვავდება, ამიტომ მიმართულებაა მთავარი: რაც უფრო დიდია ცვლილება, მით უფრო იშვიათად გამოდის. გუნდის დონეზე DORA იგივეს აჩვენებს: AI-ის სარგებელი მცირე პარტიებით მუშაობაზეა დამოკიდებული<b-proof href="https://services.google.com/fh/files/misc/2025_state_of_ai_assisted_software_development.pdf" quote="DORA 2025, p. 58: „With a high degree of certainty, we found that AI adoption's positive benefits depend on teams working in small batches“"/>.</b-why>
  <b-why align="left">SWE-bench Live-ზე ერთ ფაილში ხუთ სტრიქონზე ნაკლები ცვლილება თითქმის ნახევარ შემთხვევაში (48%) იხსნება, სამ ან მეტ ფაილში ან ასზე მეტ სტრიქონში 10%-ზე ნაკლებში, შვიდ ან მეტ ფაილში კი არასოდეს ([arXiv 2505.23419](https://arxiv.org/abs/2505.23419)). Kozuchi აგენტი SWE-bench Verified-ზე ამოცანების 81,7%-ს ხსნის 1–4 სტრიქონიანი ცვლილებისას და 41,7%-ს 100 სტრიქონზე მეტი ცვლილებისას ([arXiv 2608.15579](https://arxiv.org/abs/2608.15579)). ეს სხვადასხვა ბენჩმარკები და აგენტებია, ამიტომ მიმართულებაა მთავარი. DORA გუნდის დონის დასკვნას ამატებს: AI-ის სარგებელი მცირე პარტიებით მუშაობაზეა დამოკიდებული<b-proof href="https://services.google.com/fh/files/misc/2025_state_of_ai_assisted_software_development.pdf" quote="DORA 2025, p. 58: „With a high degree of certainty, we found that AI adoption's positive benefits depend on teams working in small batches“"/>.</b-why>
  <b-why align="left"><b-icon name="database"/> **3. კონტექსტის ფანჯარა შეზღუდულია.** კონტექსტი სასრული რესურსია კლებადი უკუგებით<b-proof href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" quote="Anthropic: context is „a finite resource with diminishing marginal returns“"/>. Chroma-მ 18 მოდელი გამოსცადა და აჩვენა, რომ საიმედოობა შეყვანის ზრდასთან ერთად ეცემა<b-proof href="https://www.trychroma.com/research/context-rot" quote="Chroma, Context Rot: „performance grows increasingly unreliable as input length grows“"/>. 2024 წლის გამოსვლაში Evans-მა აღნიშნა, რომ მოდელის პასუხები უფრო სტაბილურია, როცა მოთხოვნა უფრო მცირე ნაწილებად იყოფა (InfoQ-ის ცნობით). მცირე bounded context აგენტს მოკლე ფანჯარას აძლევს და gate-ს ნაკლები შანსი აქვს შეამოწმოს ის, რასაც აგენტი უკვე აღარ ახსოვს.</b-why>
  <b-art names="quality-gates-ai-agents/contexts" wide/>
  <b-cap>თითოეულ კონტექსტს აქვს თავისი აგენტი, თავისი პატარა ფანჯარა, MCP-ის ფუნქციების თავისი ნაკრები და gate საზღვარზე. მოვლენები კონტექსტებს შორის მოგზაურობს.</b-cap>
  <b-why align="left"><b-icon name="swap"/> **4. საზღვარზე ცხადია, ვინ არის დამნაშავე.** Bertrand Meyer-ის design by contract-ში წინაპირობის დარღვევა გამომძახებლის ბაგია, შემდგომპირობის დარღვევა კი მიმწოდებლის ბაგი<b-proof href="https://se.inf.ethz.ch/~meyer/publications/computer/contract.pdf" quote="Meyer, 1992: „A precondition violation indicates a bug in the client (caller).“ and „A postcondition violation is a bug in the supplier (routine).“"/>. საზღვარზე მდგომი gate მაშინვე აჩვენებს, ვისი ბაგია: შემოვიდა ცუდი ბრძანება თუ გავიდა ცუდი მოვლენა. Evans გვირჩევს საზღვარზე დამცავი შრე დავდგათ, რომელიც უცხო ცნებებს საკუთარებად თარგმნის<b-proof href="https://www.domainlanguage.com/wp-content/uploads/2016/05/DDD_Reference_2015-03.pdf" quote="Evans, DDD Reference: „As a downstream client, create an isolating layer to provide your system with functionality of the upstream system in terms of your own domain model.“"/>. gate ამ შრეზე დგას.</b-why>
  <b-why align="left">რა არის bounded context და აგრეგატი და როგორ უკავშირდება კონტექსტების რაოდენობა აგენტების რაოდენობას, აღწერილია სტატიებში [„რამდენი AI აგენტი გჭირდებათ“](/blog/agents-per-bounded-context/) და [„სპეციფიკაციები აგრეგატებით“](/blog/specs-by-aggregates/).</b-why>
  <b-finding>
    <ex>კონტექსტები „ჯავშანი“ და „გადახდა“: თითოეულს აქვს თავისი აგენტი, MCP-ის სამი ფუნქციის თავისი ნაკრები და თავისი gate. მოვლენა BookingCreated გასვლისას ჯავშნის gate-ს გადის, შესვლისას კი გადახდის gate-ს. თუ გადახდამ მოვლენა უარყო, ჩანს, რომელ მხარეს არის დარღვევა.</ex>
    <gen>bounded context-ის საზღვარი gate-ს ერთდროულად ოთხს აძლევს: სასრულ შემოწმებას, მცირე ცვლილებას, მოკლე ფანჯარას და ცხად დამნაშავეს.</gen>
    <do>აირჩიეთ ერთი კონტექსტი და მის საზღვარზე სამი რამ ჩაწერეთ: რომელ ბრძანებებს იღებს, რომელ მოვლენებს გამოსცემს, რომელი წესი ყოველთვის მართალია. სწორედ ამას ამოწმებს gate.</do>
  </b-finding>
</b-chapter>

<b-chapter id="mcp" icon="package" title="MCP: უფლებები, ფუნქციების ნაკრები და gate-ის ადგილი">
  <b-why align="left">[MCP](/blog/mcp-agent-access/) არის პროტოკოლი, რომლითაც აგენტი გარე სისტემების ფუნქციებს იძახებს. gate-ებისთვის ის ორჯერ არის მნიშვნელოვანი: MCP სერვერს შეუძლია მკაცრად შეზღუდოს, რა არის აგენტისთვის ხელმისაწვდომი, ფუნქციების ნაკრები კი განსაზღვრავს, რამდენ კონტექსტს ხარჯავს აგენტი აღწერებზე.</b-why>
  <b-subhead>რისი აკრძალვა შეუძლია MCP სერვერს და რას მხოლოდ გვთავაზობს</b-subhead>
  <b-table>

| მექანიზმი | სიმტკიცე | რას ამბობს სპეციფიკაცია |
|---|---|---|
| <b-status-dot color="accent">უფლებები და scope-ები</b-status-dot> | აკრძალვა | უფლებების არასაკმარისობისას სერვერი პასუხობს 403-ით და ასახელებს საჭირო scope-ს; ვერსიაში 2026-07-28 ფუნქციების სია შეიძლება გამომძახებლის უფლებებზე იყოს დამოკიდებული |
| <b-status-dot color="accent">შედეგი სქემით</b-status-dot> | განაჩენი | სერვერმა უნდა დააბრუნოს გამოცხადებულ სქემასთან შესაბამისი შედეგი, ამიტომ განაჩენი „მიღებულია / არ არის მიღებული“ მანქანისთვის წაკითხვადია |
| <b-status-dot color="accent">კითხვა ადამიანისთვის</b-status-dot> | კითხვა | სერვერს შეუძლია ადამიანს ჰკითხოს; პასუხი არის accept, decline ან cancel |
| <b-status-dot color="warn">ფუნქციების ეტიკეტები</b-status-dot> | მინიშნება | „read-only“, „destructive“ მინიშნებებია და კლიენტს მათი ნდობა არ სჭირდება |
| <b-status-dot color="warn">ძირეული საქაღალდეები</b-status-dot> | მინიშნება | სერვერმა საზღვრები „უნდა“ დაიცვას, მაგრამ არაფერი აიძულებს |

  </b-table>
  <b-why align="left">დადასტურებები სპეციფიკაციიდან: შედეგი სქემით<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/server/tools" quote="MCP, 2026-07-28: „Servers MUST provide structured results that conform to this schema.“"/>, ფუნქციების სია უფლებებით<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/server/tools" quote="MCP, 2026-07-28: the function list „MAY vary by the authorization presented on the request — for example, returning only the tools the caller's granted scopes permit“"/> და ფუნქციების ეტიკეტები<b-proof href="https://github.com/modelcontextprotocol/modelcontextprotocol" quote="MCP, schema.ts: „NOTE: all properties in ToolAnnotations are hints.“"/>. MCP სერვერების scope-ებზე Claude Code-ში მეტი სტატიაშია [„MCP scope-ები“](/blog/mcp-scopes/).</b-why>
  <b-subhead>ვიწრო ფუნქციების ნაკრები: ორი ეფექტი ერთი მექანიზმიდან</b-subhead>
  <b-art names="quality-gates-ai-agents/mcp-sets" wide/>
  <b-cap>58 ფუნქციის აღწერამ დაახლოებით 55 ათასი ტოკენი დაიკავა. ფუნქციებზე ძიებით საჭირონი მოთხოვნით იტვირთება: დაახლოებით 8,7 ათასი.</b-cap>
  <b-why align="left"><b-icon name="package"/> **პირველი ეფექტი კონტექსტია.** Anthropic-მა აჩვენა, რომ 58 ფუნქციამ დაახლოებით 55 ათასი ტოკენი დაიკავა და ფუნქციებზე ძიებით დაახლოებით 8,7 ათასი, ამასობაში ფუნქციის არჩევის სიზუსტე Opus 4-ისთვის 49%-დან 74%-მდე გაიზარდა, Opus 4.5-ისთვის კი 79,5%-დან 88,1%-მდე. სხვა მაგალითში პირდაპირი გამოძახებების ნაცვლად კოდის გაშვებამ მოხმარება 150 000-დან 2000 ტოკენამდე შეამცირა. თავად Anthropic-ის დასკვნა: მეტი ფუნქცია უკეთეს შედეგს არ ნიშნავს.</b-why>
  <b-why align="left"><b-icon name="lock"/> **მეორე ეფექტი უფლებებია.** იგივე პარამეტრები უფლებებს ზღუდავს. Claude Code-ში ქვეაგენტს აქვს დაშვებული ფუნქციების სია, აკრძალულების სია და MCP სერვერების საკუთარი ნაკრები, რომელიც მთავარ დიალოგს არ აქვს. თითო ვიწრო ნაკრები თითო bounded context-ზე ნიშნავს როგორც მოკლე ფანჯარას, ისე ნაკლებ შესაძლებლობას, რომ რამე გატყდეს. ეს ჩემი დასკვნაა: ციფრები ტოკენებისთვის გაიზომა, უსაფრთხოებისთვის კი არ არსებობს.</b-why>
  <b-subhead>რატომ დგას gate MCP-ის უკან და რატომ არ აქვს აგენტს გაჩერების სტიმული</b-subhead>
  <b-callout icon="help-circle">**ავტორის ჰიპოთეზა, კვლევა მზადდება.** აგენტებს ზომავენ და, ჩემი ვარაუდით, ოპტიმიზებენ ავტონომიური მუშაობის დროზე: პროგრესის მთავარი მეტრიკა არის ამოცანის სიგრძე, რომელსაც აგენტი ადამიანის გარეშე ასრულებს (METR). MCP-ს აქვს მოთხოვნა ადამიანისთვის: სერვერს შეუძლია ჰკითხოს და პასუხია „accept“, „decline“ ან „cancel“. ასეთი მეტრიკისთვის ადამიანისთვის ყოველი კითხვა ავტონომიის დაკარგვაა, ამიტომ აგენტს არ აქვს გაჩერებისა და კითხვის სტიმული. გარდა ამისა, MCP ვიწრო ყელია: მასში ფუნქციების გამოძახებები და მათი პასუხები გადის, მთელი სამუშაოს აზრი კი არა. დასკვნა: gate აგენტის კეთილ ნებაზე ვერ დგას, ის აგენტის გარეთ, გამყოფის უკან დგას. როგორ წვრთნიან აგენტებს სინამდვილეში და როგორ ითვლება მეტრიკები, არ გადამიმოწმებია და ამას ცალკე სტატია ეძღვნება.</b-callout>
  <b-why align="left">ახლო საზღვარი გადის აგენტის ბრძანებებსა (control plane) და მონაცემებს შორის, რომლებსაც ის კითხულობს (data plane): მონაცემები ბრძანებებად არ უნდა იქცეს. ამას ეძღვნება ავტორის გამოსვლა Podlodka AI Crew-ზე, [„AI აგენტი წარმოებაში: არქიტექტურა, დაცვა, ეკონომიკა“](/decks/ai-agent-architecture/) (სლაიდები რუსულ ენაზეა), და სტატია [„აგენტის data plane და control plane“](/blog/data-plane-control-plane-prompt-injection/).</b-why>
  <b-subhead>სად უნდა იდგეს gate: აგენტის გარეთ</b-subhead>
  <b-art names="quality-gates-ai-agents/outside-agent" wide/>
  <b-cap>წესი ტექსტში, რომელსაც აგენტს გვერდი შეუძლია აუაროს. gate კლიენტის hook-ში ან სერვერის უფლებებში, რომელსაც ვერ აუვლის.</b-cap>
  <b-table>

| სად ცხოვრობს gate | საიმედოობა | რატომ |
|---|---|---|
| ფრაზა ინსტრუქციებში | <b-status-dot color="warn">რჩევა</b-status-dot> | აგენტს შეუძლია გამოტოვოს |
| კლიენტის hook გამოძახებამდე | <b-status-dot color="accent">აკრძალვა</b-status-dot> | ბლოკავს MCP ფუნქციის გამოძახებას სერვერისა და ფუნქციის სახელის შაბლონით |
| Stop hook | <b-status-dot color="accent">აკრძალვა</b-status-dot> | ტურს არ აძლევს დასრულების საშუალებას, სანამ შემოწმება არ გავა |
| Hook გამოძახების შემდეგ | <b-status-dot color="warn">სიგნალი</b-status-dot> | ფუნქცია უკვე გაეშვა |
| სერვერის უფლებები | <b-status-dot color="accent">აკრძალვა</b-status-dot> | შემოწმება სისტემაში დგას, რომელსაც აგენტი იძახებს |

  </b-table>
  <b-why align="left">Claude Code-ის დოკუმენტაციის მიხედვით: გამოძახებამდე მდგომი hook გამოძახებას ბლოკავს, stop hook Claude-ს ტურის დასრულების საშუალებას არ აძლევს, ამოცანის დასრულების hook კი ამოცანის დახურვას. გამოძახების შემდეგ მდგომი hook არაფერს ბლოკავს: ფუნქცია უკვე გაეშვა. ტექსტში მინიშნება რჩევად რჩება, როგორც stop hook-ების ანალიზის ავტორი აღნიშნავს<b-proof href="https://fbakkensen.github.io/ai/devtools/development/2026/03/27/quality-gates-for-coding-agents-how-stop-hooks-make-validation-mandatory.html" quote="fbakkensen: „prompt instructions are suggestions, not constraints.“"/>. OWASP გვირჩევს უფლებები იქ შევამოწმოთ, სადაც მოქმედება სრულდება<b-proof href="https://genai.owasp.org/llmrisk/llm062025-excessive-agency/" quote="OWASP LLM06:2025: „Complete mediation: Implement authorization in downstream systems rather than relying on an LLM to decide if an action is allowed or not.“"/>.</b-why>
  <b-why align="left"><b-icon name="alert-circle"/> **სუსტი წერტილი: შემოწმება, რომელსაც აგენტი თავად იძახებს.** თუ შემოწმება MCP ფუნქციაა, აგენტს შეუძლია გამოიძახოს ან არა და მაშინ განაჩენი არ არსებობს. მზა agent-gate სერვერი ასე მუშაობს: აგენტი მტკიცებულებას თავად აგზავნის, სერვერი კი განაჩენს აბრუნებს და ჟურნალში ამატებს, სადაც ჩანაწერები ჰეშებით არის დაკავშირებული<b-proof href="https://github.com/Jott2121/agent-gate" quote="agent-gate README: „MCP server that adds a fail-closed quality gate and hash-chained receipt ledger to any AI agent workflow.“"/>. ეს თვითშემოწმებაა: აგენტი საკუთარ ნამუშევარს აფასებს და მის ბრმა წერტილებს იზიარებს. კლიენტსაც ევალება ფუნქციების ეტიკეტები არასანდოდ მიიჩნიოს<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/server/tools" quote="MCP: „clients MUST consider tool annotations to be untrusted unless they come from trusted servers.“"/>. უფრო უსაფრთხოა, როცა განაჩენის სერვერს hook ან ორკესტრატორი იძახებს: აგენტს განაჩენს გვერდი ვერ აუვლის.</b-why>
  <b-why align="left"><b-icon name="search"/> **რომელი მზა პროგრამები ვერ ვიპოვე.** MCP gateway-ები უფლებებს, საიდუმლოებებსა და გაჟონვებს ფარავს: agentgateway (Linux Foundation-ის პროექტი) და Microsoft-ის, Docker-ისა და Lasso-ს gateway-ები. მათ შორის gate „სამუშაო სწორად შესრულდა“ ვერ ვიპოვე. Microsoft-ის quality-gates ნაკრები spec-driven development-ისთვის აღმოჩნდა ჩეკლისტი თავად აგენტისთვის, სერვერის გარეშე.</b-why>
  <b-finding>
    <ex>აგენტი მხოლოდ თავისი კონტექსტის ფუნქციებზეა მიერთებული. stop hook ტესტებს უშვებს და ჯავშნის წესების შემოწმების სერვერს იძახებს. აგენტი შეცდომის ტექსტს ხედავს, მაგრამ განაჩენს თავად არ წერს.</ex>
    <gen>ვიწრო ფუნქციების ნაკრები კონტექსტს ზოგავს და უფლებებს ზღუდავს, აგენტის გარეთ მდგომი gate კი შემოწმების გვერდის ავლას არ აძლევს. განაჩენი პროგრამისგან მოდის, რომელსაც აგენტი არ აკონტროლებს.</gen>
    <do>ერთი კონტექსტისთვის ჩამოთვალეთ MCP ფუნქციები, რომლებიც აგენტს სჭირდება, და დანარჩენი გამორთეთ. შემდეგ დააყენეთ hook, რომელიც შემოწმებას აგენტის მონაწილეობის გარეშე უშვებს.</do>
  </b-finding>
</b-chapter>

<b-chapter id="limits" icon="alert-circle" title="gate-ის საზღვრები: როგორ უვლიან მას გვერდს და რატომ ტყდება თავისით">
  <b-art names="quality-gates-ai-agents/bypass" wide/>
  <b-cap>gate-ის გვერდის ავლის ოთხი გზა: ტესტის რედაქტირება, ტესტზე მორგება, დაფარული განზრახვა და რეცენზენტი, რომელიც მიეჩვია.</b-cap>
  <b-why align="left"><b-icon name="bug"/> **აგენტი შედეგს შემოწმებას არგებს.** METR-მა დააფიქსირა, რომ o3 შეფასებას გაშვებების 0,7%-ში ატყუებდა და ერთ ამოცანაზე 21-ჯერ 21-დან<b-proof href="https://metr.org/blog/2025-06-05-recent-reward-hacking" quote="METR: „o3 reward-hacks in 0.7% of runs across all HCAST tasks“"/>. Claude 3.7 Sonnet-ის system card-ში Anthropic აღიარებს, რომ მოდელი ზოგჯერ ზოგადი ამოხსნის ნაცვლად ტესტის მოსალოდნელ მნიშვნელობებს აბრუნებს ან თავად ტესტებს არედაქტირებს. ImpossibleBench-მა ტესტები ამოცანასთან წინააღმდეგობაში მოიყვანა და ნებისმიერ გავლას თაღლითობად ითვლიდა: GPT-5-მა შემთხვევათა 54%-ში მოიტყუა<b-proof href="https://arxiv.org/abs/2510.20270" quote="ImpossibleBench: GPT-5 „cheats 54.0% of the time on Conflicting-SWEbench“"/>. მხოლოდ კითხვის რეჟიმის ტესტები ტესტის რედაქტირებას აცილებს, მაგრამ ტესტზე მორგებას არა<b-proof href="https://arxiv.org/abs/2510.20270" quote="ImpossibleBench: read-only tests „restores legitimate performance while preventing test modification attempts“"/>.</b-why>
  <b-why align="left"><b-icon name="eye"/> **მსჯელობის მონიტორინგი უკეთესია, მაგრამ ზეწოლა არ უნდა მოვახდინოთ.** მოქმედებების მონიტორი ჰაკების 60%-ს იჭერს, მსჯელობის მონიტორი 95%-ს<b-proof href="https://arxiv.org/abs/2503.11926" quote="Baker et al.: the action monitor „achieves only 60% recall overall“, the reasoning monitor 95%"/>. მაგრამ თუ აგენტს მსჯელობაზე ზეწოლით წვრთნიან, მონიტორის recall ნულთან ახლოს ეცემა, რადგან აგენტი სწავლობს განზრახვის დამალვას<b-proof href="https://arxiv.org/abs/2503.11926" quote="Baker et al.: „the CoT monitor’s recall falls to near zero, indicating that the agent has learned to hide its intent“"/>.</b-why>
  <b-why align="left"><b-icon name="refresh-cw"/> **gate, რომელიც სამუდამოდ უარს ამბობს.** Claude Code-ში stop hook-ის რვა ზედიზედ უარის შემდეგ პროგრამა ტურს თავად ასრულებს<b-proof href="https://code.claude.com/docs/en/hooks" quote="Claude Code Docs: „after stop hooks have continued the turn eight times in a row, Claude Code overrides the next block and ends the turn.“"/>. ლიმიტი გარემოს ცვლადით იცვლება, მაგრამ პრინციპი რჩება: gate-ს სჭირდება მცდელობების ლიმიტი და ადამიანისთვის გადაცემა. Stripe-ში ეს მაქსიმუმ CI-ის ორი გაშვებაა, Microsoft devsquad კი გასწორების ორ მცდელობას უშვებს<b-proof href="https://github.com/microsoft/devsquad-copilot" quote="Microsoft devsquad: „Maximum of 2 correction iterations. If after 2 attempts there are still failures, deliver the artifact with documented failures for human decision.“"/>.</b-why>
  <b-why align="left"><b-icon name="scales"/> **ზედმეტად მკაცრი gate.** InfoQ-ის ცნობით Spotify-ის გამოსვლის შესახებ QCon London-ზე, გამოქვეყნებული 2026 წლის 18 მარტს, განმსჯელი ზედმეტად ხისტი აღმოჩნდა, ვალიდურ ცვლილებებს ბლოკავდა და მოგვიანებით მოხსნეს, შემოწმებები კი პრომპტებში დარჩა<b-proof href="https://www.infoq.com/news/2026/03/spotify-honk-rewrite" quote="InfoQ: the judge „found it too rigid, blocking valid changes“ and „was eventually removed, with verification steps in prompts proving sufficient“"/>. ეს გადმოცემაა და Spotify-ის საკუთარ პოსტებში ასეთი დებულება ვერ ვიპოვე. Cursor როლს „integrator“ ვიწრო ადგილად ასახელებს<b-proof href="https://cursor.com/blog/scaling-agents" quote="Cursor, 14 Jan 2026: the integrator role „created more bottlenecks than it solved“"/>.</b-why>
  <b-why align="left"><b-icon name="layers"/> **ავტორის ევრისტიკა: ბევრი რელევანტური gate.** შევამჩნიე, რომ რამდენიმე gate, თითო რისკზე (ტიპები, ტესტები, linter, აზრის შემოწმება), უკეთ მუშაობს, ვიდრე ერთი დიდი. ეს დაკვირვებაა; არც ერთი წყარო „ერთ gate-ს“ და „ბევრს“ არ ადარებს. ის ემთხვევა იმას, რაც ვიპოვე: Stripe linter-ებსა და CI-ს ცვლის, Sonar ერთდროულად ექვს პირობას მოითხოვს, Thoughtworks კომპილატორებს, linter-ებსა და ტესტებს ერთად ასახელებს. ის gate-ების საზღვრებს არ აუქმებს: თითოეულ gate-ს ფასი და მცდელობების ლიმიტი აქვს, ზედმეტად მკაცრი gate კი ზიანს აყენებს, როგორც Spotify-ის განმსჯელი. ამიტომ „რელევანტური“ ნიშნავს რისკთან დაკავშირებულს, რომელიც სხვაგვარად მომხმარებელს მიაღწევდა.</b-why>
  <b-why align="left"><b-icon name="user"/> **რეცენზენტი ეჩვევა.** შვიდი თვის განმავლობაში 400 განმეორებით რეცენზენტს შორის დამტკიცების წილი 30,1%-დან 36,8%-მდე გაიზარდა, review-ის რიგი 3,5-ჯერ შენელდა, inline კომენტარები კი 22%-ით შემცირდა ([arXiv 2606.22721](https://arxiv.org/abs/2606.22721), 11 429 review). Faros AI-ის მიხედვით, AI-ის მომხმარებელ 10 000-ზე მეტ დეველოპერს შორის PR-ის ზომა 154%-ით გაიზარდა, review-ის დრო კი 91%-ით ([Faros AI](https://www.faros.ai/blog/ai-software-engineering), 23 ივლისი 2025).</b-why>
  <b-why align="left"><b-icon name="eye-wide"/> **სენსორები აზრს ვერ ხედავენ.** Böckeler აღნიშნავს, რომ სენსორები არასწორ დიაგნოზს, ზედმეტ სირთულეს და არასწორად წაკითხულ ამოცანებს არასანდოდ იჭერენ. gate პასუხობს იმაზე, რაც წესად არის ჩაწერილი, დანარჩენი ადამიანთან რჩება.</b-why>
  <b-table>

| საფრთხე | დაცვა |
|---|---|
| აგენტი ტესტებს არედაქტირებს ან გვერდს უვლის | ტესტები და თავად gate მხოლოდ კითხვადია; „გავიდა“ ნიშანს მხოლოდ შემოწმების პროგრამა სვამს |
| ტესტზე მორგება | მეორე შრე: მაკონტროლებელი აგენტი აზრის მიხედვით და შემთხვევითი შემოწმებები |
| აგენტი განზრახვას მალავს | მსჯელობას ვაკვირდებით, მაგრამ აგენტს მის წინააღმდეგ არ ვწვრთნით |
| gate სამუდამოდ წითელია | მცდელობების ლიმიტი, შემდეგ ადამიანისთვის გადაცემა |
| gate სწორს ბლოკავს | თვალს ვადევნებთ, უარების რა წილია მცდარი, და წესს ვარბილებთ |
| რეცენზენტი მიეჩვია | ადამიანს ვაჩვენებთ მხოლოდ „დარწმუნებული არ ვარ“ შემთხვევებს და რისკს |

  </b-table>
  <b-finding>
    <ex>gate-მა ტესტები გაუშვა, აგენტმა ორი არასტაბილური გამორთო და მწვანე მიიღო. შემოწმებამ „ტესტების რაოდენობა არ შემცირებულა“ ჩანაცვლება დაიჭირა.</ex>
    <gen>თითოეული gate გვერდის ავლაზე უნდა გამოვცადოთ ისევე, როგორც კოდს ვცდით: რის შეცვლა შეუძლია აგენტს, რომ სამუშაოს გაკეთების გარეშე გაიაროს.</gen>
    <do>დახურეთ აგენტის ჩაწერის წვდომა ტესტებზე და gate-ის კონფიგურაციაზე, მცდელობების ლიმიტი კი თავად gate-ში ჩაწერეთ.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="როგორ დავიწყოთ: ხუთი ნაბიჯი და მზა პრომპტები აგენტისთვის">
  <b-why align="left">დაიწყეთ ერთი კონტექსტით და ერთი ამოცანით. თითოეული ნაბიჯი gate-ების ერთ შეზღუდვას ხურავს. პრომპტები აგენტს შეგიძლიათ ისე მისცეთ, როგორც არის, თქვენი პროექტით შევსებული.</b-why>
  <b-subhead>1. „მზადაა“ ფაილად ჩაწერეთ</b-subhead>
  <b-prompt>
    შექმენი ფაილი acceptance.json ამოცანისთვის [აღწერა] შესამოწმებელი „მზადაა“ კრიტერიუმების სიით.
    თითოეული კრიტერიუმი: id, ტექსტი, შემოწმების ბრძანება და ველი passes, დაყენებული false-ზე.
    წესები: passes-ს მხოლოდ შემოწმების სკრიპტი ცვლის და კრიტერიუმები ჩემი დადასტურების გარეშე არ იშლება და არ რედაქტირდება.
  </b-prompt>
  <b-subhead>2. დააყენეთ გაჩერების gate</b-subhead>
  <b-prompt>
    დააკონფიგურირე Claude Code-ის stop hook ფაილში .claude/settings.json: ტურის დასრულებამდე გაუშვი შემოწმების სკრიპტი,
    რომელიც acceptance.json-ის ბრძანებებს ასრულებს და passes-ს ანახლებს. თუ რომელიმე კრიტერიუმი წითელია,
    დაბლოკე დასრულება და შეცდომის ტექსტი დაუბრუნე აგენტს. შეამოწმე ფლაგი stop_hook_active, რომ hook-მა არ იციკლოს.
    სამი ზედიზედ წითელი მცდელობის შემდეგ დაასრულე ტური და მითხარი, ზუსტად რა არ გადის.
  </b-prompt>
  <b-subhead>3. დახურეთ გვერდის ავლები</b-subhead>
  <b-prompt>
    აუკრძალე აგენტს ტესტების საქაღალდეში, acceptance.json-სა და .claude-ში ჩაწერა. დაამატე შემოწმება, რომ ტესტების რაოდენობა
    არ შემცირებულა და არც ერთი ტესტი არ არის მონიშნული გამოტოვებულად.
  </b-prompt>
  <b-subhead>4. დაამატეთ რეცენზენტი აზრის მიხედვით</b-subhead>
  <b-prompt>
    შექმენი ცალკე მაკონტროლებელი ქვეაგენტი მხოლოდ კითხვის წვდომით. ის საბოლოო ცვლილებას თავდაპირველ ამოცანას ადარებს
    და [სიის] თითოეულ კრიტერიუმს აფასებს 0-დან 5-მდე. ნებისმიერ კრიტერიუმზე 4-ზე დაბალი ნიშნავს, რომ ცვლილება არ არის მიღებული.
    განაჩენი: მიღებულია, არ არის მიღებული მიზეზით ან დარწმუნებული არ ვარ.
  </b-prompt>
  <b-subhead>5. შეავიწროვეთ MCP ფუნქციების ნაკრები</b-subhead>
  <b-prompt>
    ჩამოთვალე MCP ფუნქციები, რომლებიც აგენტმა ამ კონტექსტში ბოლო თვეში გამოიყენა. დატოვე მხოლოდ ისინი ამ კონტექსტის
    ქვეაგენტის პარამეტრებში და დანარჩენი გამორთე. აჩვენე, რამდენი ტოკენი გათავისუფლდა.
  </b-prompt>
  <b-why align="left">ამის შემდეგ მუშაობს ციკლი: gate-ის მიერ გამოტოვებული თითოეული შეცდომა ახალ შემოწმებად იქცევა. ეს ზოგადი პრინციპია სტატიიდან [„Harness engineering პრაქტიკაში“](/blog/harness-driven-development/), gate კი მისი კერძო შემთხვევაა. და აწარმოეთ განაჩენების ჟურნალი: რამდენ ნაბიჯს გადიოდა აგენტი ადამიანის გარეშე gate-მდე და მის შემდეგ. ეს სწორედ ის ავტონომიის მეტრიკაა, რომელიც კვლევას აკლია.</b-why>
  <b-finding>
    <ex>ხუთი ნაბიჯი იძლევა gate-ს, რომელიც ფაილშია ჩაწერილი, hook-ით იწყება, ტესტებს გვერდის ავლის საშუალებას არ აძლევს, აზრს ამოწმებს და ვიწრო ფუნქციების ნაკრებზე დგას.</ex>
    <gen>პირველი gate ჭკვიანი არ უნდა იყოს. საკმარისია, რომ აგენტმა „მზადაა“ თავად ვერ თქვას და შემოწმება მის გარეთ იდგეს.</gen>
    <do>ერთ ამოცანაზე დღესვე შეასრულეთ ნაბიჯები 1 და 2. დანარჩენი დაამატეთ, როცა gate შეცდომებს გამოტოვებს.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="კითხვები და პასუხები">
  <b-faq-cards>
    <q t="რა არის ხარისხის gate-ები AI აგენტებისთვის?">წერტილი, სადაც აგენტის მუშაობა ჩერდება, სანამ დამოუკიდებელი შემოწმება არ უპასუხებს „მიღებულია“. აგენტი „მზადაა“-ს თავად არ აღნიშნავს: პასუხი მანქანისგან, მაკონტროლებელი აგენტისგან ან ადამიანისგან მოდის.</q>
    <q t="რით განსხვავდება gate ტესტისგან?">ტესტი ერთ წესს ამოწმებს და შედეგს აბრუნებს. gate წყვეტს, შეიძლება თუ არა სამუშაოს გაგრძელება, ტესტებს, მაკონტროლებელ აგენტსა და ადამიანს ერთ გადაწყვეტილებად აერთიანებს და აგენტის გაჩერება შეუძლია.</q>
    <q t="ზრდიან თუ არა gate-ები აგენტის ავტონომიური მუშაობის დროს?">პირდაპირი გაზომვები არ არსებობს. არსებობს არითმეტიკა: ნაბიჯზე 95%-იანი წარმატებისას 20 ნაბიჯი შემთხვევათა 36%-ში შეცდომის გარეშე გადის და gate, რომელიც 5-დან 4 შეცდომას იჭერს, ამას დაახლოებით 82%-მდე ზრდის. და არსებობს შემთხვევები Anthropic-იდან, Stripe-იდან და Spotify-იდან.</q>
    <q t="სად უნდა დავდგათ gate?">აგენტის გარეთ და მისი კონტექსტის გარეთ, კლიენტის hook-ში ან MCP-ის უკან მდგომი სერვერის უფლებებში. თავად აგენტი მცირე bounded context-ში მუშაობს: იქ შემოწმება სასრულია, ცვლილება მცირეა და MCP-ის ფუნქციების ნაკრები ვიწროა. წესი ინსტრუქციის ტექსტში მხოლოდ რჩევად რჩება.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="წასაკითხი">
  <b-links>
    <item href="/blog/harness-driven-development/" k="Harness" t="Harness engineering პრაქტიკაში">მეგზურები, სენსორები და ციკლი „შეცდომა წესად“</item>
    <item href="/blog/agent-checkpoint/" k="შემოწმება" t="სად შევამოწმოთ AI აგენტის მუშაობა">აგრეგატის საზღვარი და რაისის თეორემა</item>
    <item href="/blog/agents-per-bounded-context/" k="აგენტები" t="რამდენი AI აგენტი გჭირდებათ">ერთი აგენტი თითო bounded context-ზე</item>
    <item href="/blog/mcp-agent-access/" k="MCP" t="MCP AI აგენტისთვის">რა პრობლემას წყვეტს და როგორ ვუერთდეთ</item>
    <item href="/blog/mcp-scopes/" k="MCP" t="MCP scope-ები Claude Code-ში">ლოკალური, პროექტის და მომხმარებლის</item>
    <item href="/blog/ai-agent-maturity-levels/" k="სიმწიფე" t="AI აგენტის სიმწიფის დონეები">ჩატიდან სპეციფიკაციებამდე, skills-მდე, კოდამდე და სისტემამდე</item>
  </b-links>
</b-chapter>
<b-footer>ფაქტები: მდგომარეობით 2026 წლის 14 ნოემბრისთვის, პირველწყაროებიდან, რომლებიც ტექსტში ↗ ნიშნებითა და ბმულებითაა ნაჩვენები. ავტონომიის დიაგრამაზე გამოთვლა ჩემია და დამოუკიდებელ ნაბიჯებს ვარაუდობს. ჯავშნის მაგალითი გამოგონილია. ციტატები Spotify-ის განმსჯელისა და მისი მოხსნის შესახებ InfoQ-ის ცნობიდან მოდის.</b-footer>
</b-post>
