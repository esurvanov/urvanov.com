---
title: ესკალაცია ადამიანთან AI აგენტებში: როგორ ჩერდება აგენტი და ეკითხება MCP-ისა და hooks-ის საშუალებით
date: 2026-11-14
updated: 2026-11-18
description: რა ხდება, როცა აგენტი გადაწყვეტილებას ადამიანს გადასცემს: elicitation-ის სამი პასუხი MCP-ში, Claude Code-ის უფლებების რეჟიმები, hooks და ბენჩმარკები.
tags: AI, აგენტები, MCP, elicitation, ესკალაცია, hooks, Claude Code, ავტონომია, harness
category: harness
layout: wide
mentions: MCP, hooks, harness, bounded context, quality gate, Google DeepMind, escalation to a human
toc: answer=მოკლედ | seen=პირველი შთაბეჭდილება | penalty=ჯარიმა | measure=მეტრიკები | time=ავტონომია | behavior=ქცევა | mcp=MCP | cc=Claude Code | narrow=ფანჯარა | claims=შედეგები | start=დასაწყისი | faq=კითხვები | next=წასაკითხი
---

ესკალაცია ადამიანთან არის მომენტი, როცა აგენტი მუშაობას წყვეტს და გადაწყვეტილებას ადამიანს გადასცემს: კითხვით, უფლების მოთხოვნით ან დადასტურებით. MCP-ს ამისთვის elicitation აქვს სამი პასუხით (accept, decline, cancel); Claude Code-ს აქვს hooks და უფლებების რეჟიმები. შემოწმება აგენტის გარეთ დგას, თავად ესკალაცია კი ვიწრო ფანჯარაში გადის. ქვემოთ: როგორ გამოიყურებოდა თავიდან და რა აჩვენა შემოწმებებმა.

<b-post series="harness">
<b-callout icon="bulb">**დაკვირვება.** მეგონა, რომ აგენტებს ავარჯიშებენ და ზომავენ იმით, რამდენ ხანს მუშაობენ დამოუკიდებლად, ადამიანის გარეშე. ქულა შედეგზე იწერება: ამოცანა ამოხსნილია — 1, ამოუხსნელია — 0. ადამიანისთვის დასმული კითხვა თავისთავად შედეგს არ იძლევა, ამიტომ ჯარიმა შეუსრულებელ ამოცანაზე მოდის და ვარაუდი უფრო მომგებიანია. ეს დოკუმენტებსა და სტატიებს შევადარე და ფორმულები გამოვიყვანე. თავად კითხვის ჯარიმა იშვიათი აღმოჩნდა: ზოგი მეტრიკა კითხვას საერთოდ არ ითვალისწინებს, ზოგი კი აჯილდოებს.</b-callout>

<b-chapter id="answer" icon="chat" title="მოკლედ: რა არის ესკალაცია და სად გადის">
  <b-art names="agent-escalation-to-human/window" wide/>
  <b-cap>აგენტი თავის კონტექსტში მუშაობს; ერთი კითხვა გამყოფის უკან მდგომ ადამიანს მიდის და სამი პასუხიდან ერთი ბრუნდება.</b-cap>
  <b-why align="left"><b-icon name="chat"/> **რა არის.** ესკალაცია არის გაჩერება, რომელსაც აგენტი ან მის გარშემო მყოფი პროგრამა იწყებს: „აქ გადაწყვეტა არ შემიძლია, ადამიანი სჭირდება". სამი გავრცელებული სახეობა: დამაზუსტებელი კითხვა, საშიში ქმედების უფლების მოთხოვნა, შედეგის დადასტურება merge-მდე. ხარისხის gate სტატიიდან [„რა არის ხარისხის gate-ები AI აგენტებისთვის"](/blog/quality-gates-ai-agents/) ადამიანს გადასცემს ყველაფერს, რაშიც შემოწმება „დარწმუნებული არ არის", ამიტომ ესკალაცია gate-ის გაგრძელებაა.</b-why>
  <b-why align="left"><b-icon name="package"/> **როგორ მუშაობს MCP-ში.** სერვერს შეუძლია ადამიანს კლიენტის მეშვეობით ჰკითხოს: სპეციფიკაციაში ეს elicitation-ია. სამი პასუხია: accept, decline, cancel. სერვერმა პასუხზე ვერ უნდა დაიმედოს: თავად პროტოკოლი მოითხოვს decline-სა და cancel-ის დამუშავებას.</b-why>
  <b-why align="left"><b-icon name="shield-check"/> **როგორ მუშაობს Claude Code-ში.** უფლებების რეჟიმები განსაზღვრავს, რომელი გამოძახებები მიდის ადამიანთან, hooks კი გამოძახებას ჭერს და პასუხობს „allow", „deny" ან „ask". პროგრამა ამას აღასრულებინებს, ინსტრუქციის ტექსტი კი მხოლოდ მიუთითებს.</b-why>
  <b-finding>
    <ex>აგენტი ჯავშნის სერვერის კონფიგურაციას არედაქტირებს. hook ხედავს ცოცხალი კონფიგურაციის გზას და პასუხობს „ask": ადამიანს კითხვის მქონე ფანჯარა ეხსნება. თუ არავინ პასუხობს და გაშვებას ინტერფეისი არ აქვს, გამოძახება უარყოფილია და აგენტი სხვა გეგმით აგრძელებს.</ex>
    <gen>ესკალაცია ორი ნაწილისგან შედგება: აგენტის გარშემო მყოფი პროგრამა წყვეტს „ask", პასუხი კი ადამიანისგან ვიწრო ფანჯრით მოდის.</gen>
    <do>ჩაწერეთ აგენტის სამი ქმედება, რომლის შემდეგაც კითხვის დანახვა გინდათ: წაშლა, რელიზი, უფლებების შეცვლა. დანარჩენი შეიძლება კითხვების გარეშე დაშვებული იყოს.</do>
  </b-finding>
</b-chapter>

<b-chapter id="seen" icon="eye" title="როგორ გამოიყურებოდა თავიდან">
  <b-why align="left">საწყისი დაკვირვება მარტივი იყო: აგენტები იშვიათად ჩერდებიან და კითხულობენ, უფრო ხშირად ხვდებიან და აგრძელებენ. აქედან ოთხი დაშვების ჯაჭვი გაიზარდა და თითოეული ცალ-ცალკე უნდა შემოწმებულიყო.</b-why>
  <b-rules cols="2">
    <rule icon="shield-check" t="1. შემოწმება გარეთ დგას">gate და ადამიანისთვის კითხვა აგენტის გარეთ უნდა ცხოვრობდეს, თორემ თავად გადაწყვეტს.</rule>
    <rule icon="clock" t="2. აგენტებს ავტონომიისთვის წვრთნიან">აგენტებს წვრთნიან და ზომავენ იმით, რამდენ ხანს მუშაობენ დამოუკიდებლად: რამდენად შორს მიდიან დაწყებიდან გაჩერებამდე ადამიანის გარეშე.</rule>
    <rule icon="x" t="3. კითხვა დანაკარგია">ქულა 1-ს იძლევა ამოხსნილ ამოცანაზე და 0-ს ამოუხსნელზე. ამოხსნის გარეშე კითხვა 0-ს იძლევა, ვარაუდი კი შეიძლება 1-ს, ამიტომ კითხვა არ ამართლებს.</rule>
    <rule icon="package" t="4. MCP ვიწრო ადგილია">MCP-ში მხოლოდ კითხვა და პასუხი გადის, დანარჩენს host წყვეტს.</rule>
  </b-rules>
  <b-why align="left">შემდეგ, თანმიმდევრობით: რას ზომავენ ბენჩმარკები, რას ნიშნავს „ავტონომიური დრო", როგორ კითხულობენ აგენტები პრაქტიკაში, რას ამბობენ MCP და Claude Code. მოლოდინები და აღმოჩენები გვერდიგვერდ ცხრილშია ბოლოსკენ. ჯერ კი: სად ზუსტად მდებარეობს ჯარიმა ასეთ მეტრიკაში.</b-why>
</b-chapter>

<b-chapter id="penalty" icon="x" title="რისთვის ჯარიმდება აგენტი: მეტრიკა და მისი ფორმულები">
  <b-why align="left">ორი სქემა აჩვენებს, რომელი სიდიდე მცირდება, როცა აგენტი ჩერდება და კითხულობს. ეს გამარტივებული ჩანაწერია წყაროებში მეტრიკების არსის მიხედვით; ციტატები შემოწმებების თავებშია.</b-why>
  <b-art names="agent-escalation-to-human/score-cases" wide/>
  <b-cap>ქულა შედეგის მიხედვით: სწორი პასუხი 1-ს იძლევა, არასწორი და ამოხსნის გარეშე გაჩერება 0-ს.</b-cap>
  <b-why align="left">ჯარიმა შეუსრულებელ შედეგზე მოდის: ამოხსნის გარეშე გაჩერებას იგივე 0 ერგება, რაც შეცდომას. თუ არხი არსებობს და ამოცანა პასუხის შემდეგ ამოიხსნება, კითხვა ანაზღაურდება კიდეც, და სწორედ ასეა აგებული HiL-Bench.</b-why>
  <b-art names="agent-escalation-to-human/turn-cut" wide/>
  <b-cap>კითხვა ტურს ჭრის: 60 წუთის გამოგონილი მაგალითი.</b-cap>
  <b-why align="left">Anthropic-ში კითხვა გაზომილ ტურს ასრულებს. ლაბორატორია თავად უწოდებს აგენტის გაჩერებას ზედამხედველობას (oversight).</b-why>
  <b-finding>
    <ex>აგენტი ორმოც წუთს ხარჯავს ექსპორტის გასწორებაზე, ორ თანაბრად ვარგის გზას აწყდება და ადამიანს ეკითხება. შედეგით შეფასებისას კითხვას არაფერი უჯდება, სანამ ამოცანა შემდეგ ამოიხსნება. ტურის სიგრძით კი 60 წუთი 40-ად და 20-ად იჭრება.</ex>
    <gen>ჯარიმა ორ ადგილას მდებარეობს: ნული ამოუხსნელ ამოცანაზე და ტურის გაჭრა კითხვაზე. განხილული მეტრიკებიდან არც ერთი თავად კითხვისთვის არაფერს აკლებს.</gen>
    <do>ჩაწერეთ თქვენი მეტრიკის ფორმულა: რა დგას მრიცხველში და რა ემართება ქულას, თუ აგენტი გაჩერდა და ჰკითხა.</do>
  </b-finding>
</b-chapter>

<b-chapter id="measure" icon="gauge" title="შემოწმება: რას ზომავენ ავტონომიის ბენჩმარკები და სად დგას მათში ადამიანი">
  <b-why align="left">ავტონომიას სხვადასხვანაირად ზომავენ და სწორედ ეს განსაზღვრავს, ხედავს თუ არა მეტრიკა კითხვისთვის გაჩერებას. ქვემოთ თანმიმდევრობით: მეტრიკის სურათი ფინიშის ხაზით, METR-ის ჰორიზონტი, კლასიკური ბენჩმარკები და მეტრიკები, სადაც კითხვა ითვლება.</b-why>
  <b-art names="agent-escalation-to-human/finish-line" wide/>
  <b-cap>მეტრიკა ფინიშს აღნიშნავს; ადამიანისკენ კითხვის გზა დათვლაში არ შედის.</b-cap>
  <b-subhead>METR-ის ჰორიზონტი: რამდენ ხანს სჭირდება ამოცანა ადამიანს</b-subhead>
  <b-why align="left">METR ჰორიზონტს განმარტავს, როგორც დროს, რომელსაც ადამიანები ჩვეულებრივ ხარჯავენ იმ ამოცანებზე, რომლებსაც მოდელი 50%-იანი წარმატებით ხსნის<b-proof href="https://arxiv.org/abs/2503.14499" quote="METR, arXiv 2503.14499: „the time humans typically take to complete tasks that AI models can complete with 50% success rate“"/>. ამოცანის დრო ადამიანის წარმატებული გაშვებებიდან მოდის. კომპლექტში ადამიანისთვის მიმართვის შემცველი ამოცანები არ არის, METR თავადაც აფრთხილებს, რომ ჰორიზონტი დამოუკიდებელი მუშაობის დრო არ არის<b-proof href="https://metr.org/notes/2026-01-22-time-horizon-limitations/" quote="METR, 22.01.2026: „Time horizon is not the length of time AIs can work independently“; „We have no tasks involving multi-turn interaction with a human so there is no right answer.“"/>. 2026 წლის 19 მაისის ანგარიშში საუკეთესო გაზიარებულმა მოდელმა 50%-იან დონეზე 16–20 საათი მიიღო, 80%-იან დონეზე კი 3–4 საათი<b-proof href="https://metr.org/blog/2026-05-19-frontier-risk-report/" quote="METR, Frontier Risk Report: „the 50% time horizon point estimate of the most capable shared model was between 16 and 20 hours“"/>.</b-why>
  <b-codebox title="როგორ გამოითვლება METR-ის ჰორიზონტი">
    p(success | task of length t) = σ( (ln h − ln t) · β )
    h — the horizon: the task length at which p = 0.5
    t — the geometric mean of successful human run times
  </b-codebox>
  <b-why align="left">METR-ის მეთოდი ამოცანის სიგრძეზე ლოგისტიკური მრუდია, ჰორიზონტი კი 50%-იან (ან 80%-იან) წერტილში აიღება<b-proof href="https://arxiv.org/abs/2503.14499" quote="METR, arXiv 2503.14499: „we use logistic regression to find the task difficulty at which the agent has a 50% chance of success“"/>. აგენტის საკუთარი დრო ფორმულაში არსად დგას.</b-why>
  <b-art names="agent-escalation-to-human/horizon" wide/>
  <b-cap>საუკეთესო მოდელის ამოცანის საათები: 50%-იან დონეზე და 80%-იან დონეზე.</b-cap>
  <b-subhead>ამოცანების ბენჩმარკები: ადამიანი მათში არ არის</b-subhead>
  <b-why align="left">SWE-bench ტესტებით აფასებს: „ამოხსნილი ამოცანების ინსტანციების პროცენტი"<b-proof href="https://arxiv.org/abs/2310.06770" quote="SWE-bench: „The metric for our benchmark is the percentage of task instances that are resolved.“"/>. OSWorld-ში, Terminal-Bench-ში, GAIA-სა და Cybench-ში სკრიპტი, ტესტი ან ფლაგი განსჯის და ადამიანისკენ არხი არ არსებობს. ფრაზა „minimal human intervention" ამ სტატიებში მიზანს ან კომპლექტის ზრდას აღწერს და მეტრიკა არ არის. tau-bench-ში ჯილდო 0 ან 1-ია საბოლოო ბაზის მიხედვით, ადამიანისთვის გადაცემა კი ჩვეულებრივი ქმედებაა: ზოგ ამოცანაში ის ეტალონის ნაწილია, დანარჩენში ბაზა ვერ დაემთხვევა.</b-why>
  <b-subhead>მეტრიკები, სადაც კითხვა ითვლება: HiL-Bench, HAS-Bench, Anthropic</b-subhead>
  <b-why align="left">ეს სამი წყარო კითხვას სხვადასხვანაირად ითვლის, ამიტომ ჯერ ყველაზე მკვეთრი კონტრასტი: რა ემართება მოდელს, როცა ამოცანა შეკითხვის გარეშე ვერ ამოიხსნება.</b-why>
  <b-art names="agent-escalation-to-human/hil-bench" wide/>
  <b-cap>როცა გამოტოვებული ნაწილი ადამიანისთვის კითხვით უნდა მოიძებნოს, ამოხსნილი ამოცანების წილი რამდენჯერმე ეცემა.</b-cap>
  <b-why align="left">Scale AI-ის HiL-Bench ისეა აგებული, რომ ამოცანა შეკითხვის გარეშე არ ამოიხსნება. ავტორები წერენ, რომ ჩვეულებრივი ბენჩმარკები ამ წარუმატებლობას ვერ ხედავენ<b-proof href="https://arxiv.org/abs/2604.09408" quote="HiL-Bench, 04.05.2026: „an agent that makes a lucky guess for a missing requirement will score identically to one that would have asked to be certain“"/>. ფუნქციით „ჰკითხე ადამიანს" საუკეთესო მოდელები ამოცანების 1-დან 39%-ს ხსნიან, სრული ინფორმაციით კი 67-დან 91%-ს. წვრთნის ჯილდო: +0,3 საჭირო კითხვაზე და −0,1 ზედმეტზე. HAS-Bench ადამიანის ჩარევის წილს აღწერით მაჩვენებლად შემოაქვს<b-proof href="https://arxiv.org/abs/2607.04329" quote="HAS-Bench, 05.07.2026: „HIR is a descriptive cost/intensity metric. Higher HIR means more human involvement, not necessarily better task performance.“"/>. წარმოებაში ავტონომიის შესახებ თავის ნაშრომში Anthropic ჩარევებსა და აგენტის მიერ დაწყებულ გაჩერებებს ცალ-ცალკე ითვლის და გაჩერებებს ზედამხედველობის ფორმას უწოდებს<b-proof href="https://www.anthropic.com/research/measuring-agent-autonomy" quote="Anthropic, 18.02.2026: „agent-initiated stops are an important kind of oversight in deployed systems.“"/>.</b-why>
  <b-codebox title="კითხვის დათვლის სამი გზა">
    HiL-Bench:  r_question = +0.3 if the question targets something missing
                r_question = −0.1 if it is extra or a repeat
                a task counts only when everything missing is resolved
    HAS-Bench:  HIR = steps done by people / all steps   (a description, not a penalty)
    Anthropic:  an agent stop counts as oversight, an intervention separately
  </b-codebox>
  <b-art names="agent-escalation-to-human/metrics" wide/>
  <b-cap>აგენტის კითხვასთან დამოკიდებულების ოთხი გზა: არხი არ არის, ნეიტრალური, ჯილდო, ზედამხედველობის ფორმა.</b-cap>
  <b-why align="left">ეს შეჯამება ოთხივე გზას ერთად აჩვენებს: აგენტის სამუშაო იგივეა, მეტრიკა კი კითხვას შეიძლება ვერ ხედავდეს, აჯილდოებდეს ან ზედამხედველობად თვლიდეს.</b-why>
  <b-finding>
    <ex>იგივე აგენტი SWE-bench-ში ვერ კითხულობს, HiL-Bench-ში ჯილდოსთვის კითხულობს, Anthropic-ის საწარმოო მეტრიკებში კი მისი გაჩერება ზედამხედველობად ფიქსირდება. მეტრიკა ერთზე მეტია და ადამიანისთვის მიმართვა თითოეულში სხვანაირად აღირიცხება.</ex>
    <gen>მტკიცება „ავტონომიის მეტრიკები კითხვას სჯიან" ზოგადი წესის სახით მცდარია. ვიწრო დებულება მართალია: კლასიკური ბენჩმარკები კითხვას არ ითვალისწინებს და ამოხსნის გარეშე გაჩერება წარუმატებლობის ტოლია.</gen>
    <do>ჰკითხეთ თქვენს ავტონომიის მეტრიკას: რას ფიქსირებს, როცა აგენტი გაჩერდა და ჰკითხა: წარმატებას, წარუმატებლობას თუ არაფერს.</do>
  </b-finding>
</b-chapter>

<b-chapter id="time" icon="clock" title="რა ითვლება ავტონომიურ დროდ METR-ში, Anthropic-სა და DeepMind-ში">
  <b-why align="left">ფრაზა „ავტონომიური დრო" სამ ლაბორატორიაში სამ სხვადასხვა რამეს ნიშნავს და სწორედ ეს განსაზღვრავს, აზარალებს თუ არა აგენტის კითხვა ადამიანისთვის მეტრიკას. ქვემოთ რიგით: რას ითვლის METR, რას Anthropic და რას Google DeepMind.</b-why>
  <b-art names="agent-escalation-to-human/three-clocks" wide/>
  <b-cap>სამი საზომი: ადამიანის საათები ამოცანაზე, ტური დაწყებიდან გაჩერებამდე, ამოცანა ადამიანის ჩარევის გარეშე.</b-cap>
  <b-why align="left">„დამოუკიდებლად მუშაობა" სამნაირად შეიძლება გაიზომოს. პირველი: რამდენ საათს სჭირდება ადამიანს ამოცანა, რომელსაც აგენტი ხსნის. მეორე: რამდენად შორს მიდის აგენტი დაწყებიდან გაჩერებამდე. მესამე: ამოცანების რა წილი სრულდება ადამიანის ჩარევის გარეშე. სამივეს ფორმულები ქვემოთაა.</b-why>
  <b-subhead>METR: ამოცანის სირთულე, აგენტის საკუთარი დრო მეტრიკაში არ არის</b-subhead>
  <b-why align="left">METR თავად პასუხობს, არის თუ არა ეს დამოუკიდებელი მუშაობის დრო<b-proof href="https://metr.org/notes/2026-01-22-time-horizon-limitations/" quote="METR, 22.01.2026: „Time horizon is not the length of time AIs can work independently. Rather, it's the amount of serial human labor they can replace with a 50% success rate.“"/>. ჰორიზონტების გვერდის FAQ იგივეს ამბობს: ის ამოცანის სირთულეს ზომავს და ხელოვნური ინტელექტის დახარჯული დრო მის ნაწილს არ წარმოადგენს<b-proof href="https://metr.org/time-horizons" quote="METR, FAQ: „It’s a measure of the difficulty of a task, rather than the time an AI spends to complete the task.“"/>. METR აგენტის საკუთარ დროს არ აქვეყნებს: ის მოდელის პროვაიდერისა და აგენტის კონფიგურაციის მიხედვით ძლიერ განსხვავდება.</b-why>
  <b-subhead>Anthropic: აგენტის ტური დაწყებიდან გაჩერებამდე</b-subhead>
  <b-why align="left">წარმოებაში ავტონომიის შესახებ ნაშრომში დრო მექანიკურად ითვლება Claude Code-ის ტელემეტრიიდან: მუშაობის დაწყებიდან გაჩერებამდე, გაჩერება კი შეიძლება ადამიანისთვის დასმული კითხვა იყოს<b-proof href="https://www.anthropic.com/research/measuring-agent-autonomy" quote="Anthropic, 18.02.2026: „tracking how much time has elapsed between when Claude starts working and when it stops (whether because it finished the task, asked a question, or was interrupted by the user)“"/>. ამრიგად, აგენტის კითხვა ტურს ჭრის და გაზომილ დროს ფორმალურად ამცირებს. ავტორები თავადვე აღნიშნავენ, რომ ტურის სიგრძე ავტონომიის არასრულყოფილი ჩანაცვლებაა.</b-why>
  <b-why align="left">Anthropic კითხვისთვის გაჩერებას ნაკლად არ თვლის. მათივე სიტყვით, უფრო რთულ ამოცანებზე Claude საკუთარ ავტონომიას ზღუდავს და ადამიანთან კონსულტაციისთვის ჩერდება, სქოლიო კი ამატებს, რომ მომხმარებლისთვის კითხვის დასმა თავად არის აგენტობის (agency) ფორმა<b-proof href="https://www.anthropic.com/research/measuring-agent-autonomy" quote="Anthropic: „stopping to ask the user a question is itself a form of agency“"/>. მხოლოდ დამბლოკავი კითხვა ითვლება, „ეს მჭირდება გასაგრძელებლად" ტიპისა; კითხვა „დავაკომიტო?" დასრულებული ამოცანის შემდეგ გაჩერება არ არის.</b-why>
  <b-subhead>Google DeepMind: ამოცანა შესრულებულია ადამიანის ჩარევის გარეშე</b-subhead>
  <b-why align="left">DeepMind-ს ტურის სიგრძის მეტრიკა არ აქვს. „Levels of AGI“-ში ავტონომია აღწერილია დონეებით „AI როგორც ინსტრუმენტიდან" „AI როგორც აგენტამდე", დროით კი არა, ურთიერთქმედების სტილით, და ადამიანისთვის მიმართვის უნარი უმაღლესი დონის ნაწილია: სრულად ავტონომიური AI მოქმედებს უწყვეტი ზედამხედველობის გარეშე, მაგრამ იცის, როდის უნდა მიმართოს ადამიანებს<b-proof href="https://arxiv.org/abs/2311.02462" quote="Levels of AGI, arXiv 2311.02462: „such a fully autonomous AI can act in an aligned fashion without continuous human oversight, but knows when to consult humans“"/>. Frontier Safety Framework-ის ანგარიშში (2026 წლის ოქტომბერი) ავტონომია განმარტებულია, როგორც „ამოცანა შესრულდა ადამიანის ჩარევის გარეშე": ისინი უყურებენ, წარმატებას თავად მიაღწია თუ არა აგენტმა და ჩაერია თუ არა ადამიანი, სრულად დელეგირებული pull request-ების წილი კი 7,5%-დან 11,9%-მდე გაიზარდა<b-proof href="https://storage.googleapis.com/deepmind-media/gemini/gemini_4_argon_fsf_report.pdf" quote="Gemini 4 Argon FSF report: „whether the agent succeeded autonomously, and whether the human intervened or the outcome was otherwise negative or ambiguous“"/>. ცალკე მეტრიკა „აგენტმა ადამიანს ჰკითხა" იქ ვერ მოიძებნა.</b-why>
  <b-table>

| ვინ | რა ითვლება ავტონომიურად | აგენტის კითხვა ადამიანისთვის |
|---|---|---|
| **METR** | ამოცანის სირთულე ადამიანის საათებში | ასეთი მოვლენა არ არსებობს: ამოცანებში დიალოგი არ არის |
| **Anthropic** | ტურის სიგრძე გაჩერებამდე | ტურს ჭრის, მაგრამ ზედამხედველობად იწოდება |
| **Google DeepMind** | ამოცანა ადამიანის ჩარევის გარეშე | ჩარევა არ არის, ცალკე არ ითვლება |

  </b-table>
  <b-finding>
    <ex>აგენტი გაჩერდა და ჰკითხა. Anthropic-ში ტური აქ დასრულდა, METR-ში ასეთი მოვლენა არ არსებობს, DeepMind-ს კი აინტერესებს, ადამიანი თავისით ჩაერია თუ არა.</ex>
    <gen>აგენტის კითხვა ტურს მხოლოდ Anthropic-ში ამოკლებს და იქაც ზედამხედველობად იწოდება. ლაბორატორიები მინუსად ადამიანის საკუთარ ჩარევას თვლიან.</gen>
    <do>როცა აგენტისთვის ავტონომიური მუშაობის საათებს გიდასტურებენ, ჰკითხეთ, რომელი საზომია: ტურის სიგრძე, ამოცანის სირთულე თუ ჩარევის გარეშე ამოცანების წილი.</do>
  </b-finding>
</b-chapter>

<b-chapter id="behavior" icon="eye" title="შემოწმება: კითხულობენ თუ არა აგენტები სინამდვილეში">
  <b-art names="agent-escalation-to-human/ask-rate" wide/>
  <b-cap>კითხვიანი სესიების წილი ერთ კვლევაში: ნულიდან ნახევრამდე.</b-cap>
  <b-why align="left">ერთიანი წილი არ არსებობს; შედეგი მოდელზე, პრომპტსა და harness-ზეა დამოკიდებული. კითხვის უფლების გარეშე მოდელები თითქმის დუმან: Ambig-SWE-ში (500 SWE-bench ამოცანა) „ცალსახა მითითების გარეშე მოდელები თითქმის არასოდეს ურთიერთობენ"<b-proof href="https://arxiv.org/abs/2502.13069" quote="Ambig-SWE, arXiv 2502.13069: „Without explicit prompting, models almost never interact, even for severely underspecified inputs.“"/>. პრომპტით Sonnet 4 არასაკმარისად განსაზღვრულ ამოცანებზე შემთხვევათა 82%-ში კითხულობს, სრულ ამოცანებზე 3%-ში. დიაგრამა აჩვენებს „Ask Early, Ask Late, Ask Right“-ს, სხვა კომპლექტს: Sonnet 4.5-მა სესიების 23%-ში იკითხა, GPT-5.2-მ 52%-ში, Gemini 3 Flash-მა 0%-ში, და არც ერთმა მოდელმა არ იკითხა საუკეთესო ფანჯარაში, გაშვების დაახლოებით 10%-ზე (arXiv 2605.07937).</b-why>
  <b-why align="left">საპირისპირო უკიდურესობაც არსებობს. LHAW-ში (arXiv 2602.10525) GPT-5.2 გაშვებების 81–97%-ში კითხულობს თითო კითხვიდან მცირე სარგებლით, „Ask or Assume“-ში (arXiv 2603.26233) კი Sonnet 4.5 ამოცანების 73,8%-ში კითხულობს. ადამიანებიც გადატვირთულები არიან: Anthropic-ის მონაცემებით, auto რეჟიმის მომხმარებლები უფლების მოთხოვნების 93%-ს იღებენ, პოსტი კი დადასტურების დაღლილობაზე პირდაპირ საუბრობს<b-proof href="https://www.anthropic.com/engineering/claude-code-auto-mode" quote="Anthropic, 25.03.2026: „users accept 93%“ of permission requests"/>.</b-why>
  <b-art names="agent-escalation-to-human/ask-extremes" wide/>
  <b-cap>ორი უკიდურესობა: დუმილი და ვარაუდი, ან კითხვებით დატბორვა.</b-cap>
  <b-why align="left">მიზეზს „წვრთნა დასრულებას აჯილდოებს" რამდენიმე სტატიის ავტორები ასახელებენ, მაგრამ აგენტებისთვის გაზომვა არ არსებობს. Kalai-ს და თანაავტორების მონათესავე სტატია (arXiv 2509.04664) აჩვენებს, რომ ბინარული შეფასებისას თავის შეკავება არ ამართლებს, შემოწმებული 10 ბენჩმარკიდან 9 ბინარულია, SWE-bench-ის ჩათვლით. ეს სტატია პასუხზე „არ ვიცი“ ეხება; ადამიანისთვის კითხვაზე გადატანა ანალოგიად რჩება.</b-why>
  <b-finding>
    <ex>აგენტი კითხვის უფლების გარეშე დუმს და ხვდება, უფლების მქონე აგენტი კი ადამიანს კითხვებით ავსებს. ორივე შემთხვევა გაზომვებშია ასახული, ამიტომ პირობები უნდა დაფიქსირდეს: როდის ვკითხოთ და რამდენად ხშირად.</ex>
    <gen>„აგენტები არ კითხულობენ“ და „აგენტები ზედმეტს კითხულობენ“ ორივე მართალია, სხვადასხვა მოდელსა და პარამეტრებში.</gen>
    <do>მიეცით აგენტს ცალსახა ზღვარი: „იკითხე, თუ გადაწყვეტილება შეუქცევადია ან ამოცანის ორი თანაბარი წაკითხვა გაქვს; დანარჩენი თავად გადაწყვიტე“.</do>
  </b-finding>
</b-chapter>

<b-chapter id="mcp" icon="package" title="შემოწმება: რას ამბობს MCP elicitation-ზე">
  <b-why align="left">Elicitation არის გზა, რომლითაც MCP სერვერი ადამიანს კლიენტის მეშვეობით დამატებით მონაცემებს სთხოვს<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation" quote="MCP specification: „The Model Context Protocol (MCP) provides a standardized way for servers to request additional information from users through the client during interactions.“"/>. ქვემოთ ფაქტებია ვერსია 2026-07-28-ისთვის და რა შეიცვალა მასში.</b-why>
  <b-rules cols="2">
    <rule icon="check" t="სამი პასუხი">Accept: ადამიანმა დაამტკიცა და მონაცემები გაგზავნა. Decline: ადამიანმა პირდაპირ თქვა „არა“. Cancel: ადამიანმა ფანჯარა არჩევნის გარეშე დახურა<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation#response-actions" quote="MCP specification: „Decline (action: 'decline'): User explicitly declined the request“; „Cancel (action: 'cancel'): User dismissed without making an explicit choice“"/>. სერვერმა decline და cancel უნდა დაამუშაოს<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation#error-handling" quote="MCP specification: „Servers SHOULD NOT assume that elicitation requests will always succeed, and MUST handle cases where the user declines or cancels the elicitation“"/>.</rule>
    <rule icon="layers" t="ორი რეჟიმი">Form: ბრტყელი სქემა მარტივი ველებით, კლიენტი მონაცემებს ხედავს. URL: ადამიანი გარე მისამართზე იგზავნება და მონაცემები არც კლიენტში გადის, არც მოდელში. პაროლების, გასაღებებისა და საგადახდო მონაცემების ფორმით მოთხოვნა აკრძალულია, მათთვის URL რეჟიმი არსებობს<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation#user-interaction-model" quote="MCP specification: „Servers MUST NOT use form mode elicitation to request sensitive information such as passwords, API keys, access tokens, or payment credentials.“"/>.</rule>
    <rule icon="refresh" t="ახალი 2026-07-28-ში">სერვერი აღარ აგზავნის მოთხოვნას საკუთარი ინიციატივით: ის პასუხობს კლიენტის მოთხოვნას შედეგით „input required“, კლიენტი პასუხს აგროვებს და მოთხოვნას იმეორებს<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr" quote="MCP specification: „Servers MUST send server-to-client requests (such as roots/list, sampling/createMessage, or elicitation/create) using the MRTR pattern. The previous pattern of server-initiated requests is no longer supported.“"/>. Sampling, Roots და Logging მოძველებულად (deprecated) არის მონიშნული (SEP-2577).</rule>
    <rule icon="user" t="Human in the loop">elicitation-ისთვის კლიენტმა უნდა აჩვენოს, რომელი სერვერი კითხულობს, შესთავაზოს decline და cancel და ადამიანს მისცეს ფორმის პასუხის გადახედვისა და რედაქტირების საშუალება. ფუნქციების გამოძახებისა და sampling-ისთვის ფორმულირება უფრო რბილია: „SHOULD always be a human in the loop“<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/server/tools#user-interaction-model" quote="MCP specification: „For trust & safety and security, there SHOULD always be a human in the loop with the ability to deny tool invocations.“"/>.</rule>
  </b-rules>
  <b-why align="left">ორი რეჟიმი ერთით განსხვავდება: ვინ ხედავს ადამიანის პასუხს. სურათი ამას აჩვენებს.</b-why>
  <b-art names="agent-escalation-to-human/elicit-modes" wide/>
  <b-cap>Form და URL: ვინ ხედავს ადამიანის პასუხს.</b-cap>
  <b-why align="left">რა აკლია სპეციფიკაციას. ის არც უშვებს და არც კრძალავს, რომ კლიენტმა ან აგენტმა ადამიანის მაგივრად უპასუხოს: ყველგან სიტყვა „user“ დგას და ინტერფეისი არ არის თავსმოხვეული („the protocol itself does not mandate any specific user interaction model“). ასეთი ავტოპასუხისთვის სანქციებიც არ არის, და ამას თავად სპეციფიკაცია ამბობს<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28" quote="MCP specification: „While MCP itself cannot enforce these security principles at the protocol level, implementors SHOULD: 1. Build robust consent and authorization flows into their applications“"/>. სიტყვები „bottleneck“ ან „limitation“ სპეციფიკაციაში არ გვხვდება.</b-why>
  <b-finding>
    <ex>საგადახდო სერვერი გადარიცხვის დადასტურებას ითხოვს. თუ კლიენტი „accept“-ს თავად დააჭერს, პროტოკოლი ამას ვერ შეამჩნევს: კონტროლი host-სა და მის პარამეტრებთან რჩება.</ex>
    <gen>MCP აღწერს, როგორ ვკითხოთ და რა პასუხები არსებობს, მაგრამ ვინ პასუხობს და შეიძლება თუ არა ადამიანის მაგივრად პასუხი, კლიენტი წყვეტს.</gen>
    <do>შეამოწმეთ თქვენი კლიენტი: შეუძლია თუ არა აგენტს ან სკრიპტს elicitation-ს ადამიანის მაგივრად უპასუხოს. თუ შეუძლია, საშიში სერვერებისთვის აკრძალეთ.</do>
  </b-finding>
</b-chapter>

<b-chapter id="cc" icon="shield-check" title="შემოწმება: რეჟიმები, hooks და ადამიანისთვის კითხვა Claude Code-ში">
  <b-art names="agent-escalation-to-human/hook-vs-text" wide/>
  <b-cap>hook და უფლებების წესებს პროგრამა აღასრულებინებს. ინსტრუქციის ტექსტი რჩევად რჩება.</b-cap>
  <b-why align="left">Claude Code-ის დოკუმენტაცია პირდაპირ ამბობს: უფლებების წესებს Claude Code პროგრამა აღასრულებინებს, პრომპტსა თუ CLAUDE.md-ში ინსტრუქციები კი არ ცვლის იმას, რასაც ის უშვებს<b-proof href="https://code.claude.com/docs/en/permissions" quote="Claude Code docs: „Permission rules are enforced by Claude Code, not by the model. Instructions in your prompt or CLAUDE.md shape what Claude tries to do, but they don't change what Claude Code allows.“"/>.</b-why>
  <b-subhead>რეჟიმები: რამდენი კითხვა აღწევს ადამიანს</b-subhead>
  <b-why align="left">რეჟიმს ადამიანი გაშვებისას ირჩევს: ის განსაზღვრავს, რამდენი კითხვა მიაღწევს მას საერთოდ.</b-why>
  <b-art names="agent-escalation-to-human/modes-ladder" wide/>
  <b-cap>ექვსი რეჟიმი „ყველაფერს ეკითხება“-დან „არაფერს ეკითხება“-მდე და რა არ დამტკიცდება ავტომატურად.</b-cap>
  <b-why align="left">ყველაზე თავისუფალ რეჟიმშიც კი ზოგი რამ ავტომატურად არ მტკიცდება: ჩაშენებული AskUserQuestion ფუნქცია, MCP ფუნქციები, რომლებიც მომხმარებლის ჩართულობას მოითხოვს, და „ask“ წესები<b-proof href="https://code.claude.com/docs/en/permission-modes" quote="Claude Code docs: „Claude Code doesn't auto-approve the following in any mode, including `bypassPermissions`“ — among them explicit `ask` rules and „Tools that require user interaction: the built-in `AskUserQuestion` tool and MCP tools marked `requiresUserInteraction`“"/>. უფლება ადამიანისგან შემდგომში ვერ მიიღება: ადამიანი არ არის, პასუხიც არ არის.</b-why>
  <b-subhead>Hooks: გადაწყვეტა, ვკითხოთ თუ არა</b-subhead>
  <b-why align="left">PreToolUse hook ფუნქციის გამოძახებამდე პასუხობს ოთხი გადაწყვეტილებიდან ერთით: allow, deny, ask ან defer<b-proof href="https://code.claude.com/docs/en/hooks" quote="Claude Code docs: „PreToolUse hooks can control whether a tool call proceeds. [...] four outcomes (allow, deny, ask, or defer)“"/>. რამდენიმე hook-ის შემთხვევაში რიგია: deny სჯობს defer-ს, defer სჯობს ask-ს, ask სჯობს allow-ს. „defer“ გადაწყვეტილება ინტერფეისის გარეშე გაშვებებისთვისაა: გამომძახებელი პროგრამა Claude-ს აპაუზებს, პასუხს საკუთარი ინტერფეისით აგროვებს და იმავე ადგილიდან აგრძელებს. Elicitation hook ამას MCP-თან აკავშირებს: ის სერვერის მოთხოვნას accept-ით, decline-ით ან cancel-ით პასუხობს, ინტერფეისის გარეშე კი დაუმუშავებელი მოთხოვნა უქმდება.</b-why>
  <b-why align="left">შეზღუდვა ქვეაგენტებისთვის: AskUserQuestion მათგან ყოველთვის ამოღებულია. ინტერფეისის გარეშე გაშვებაში გამოძახება, რომელიც კითხვას მოითხოვდა, უარყოფილია, თუ allow წესი, hook ან მოთხოვნების host არ არსებობს. ამიტომ გაწერილი წესების გარეშე ავტონომიური გაშვება უარს იღებს და ადამიანის პასუხი არ მოდის.</b-why>
  <b-art names="agent-escalation-to-human/night-run" wide/>
  <b-cap>ადამიანის გარეშე კითხვა ანგარიშად იქცევა დახურულ კართან.</b-cap>
  <b-why align="left">ესაა ესკალაცია ადამიანის გარეშე: გაჩერება და ჩაწერილი მიზეზი ვარაუდის ნაცვლად.</b-why>
  <b-finding>
    <ex>ღამის გაშვება build სერვერზე. აგენტს აგების გამოშვება უნდა და ჰკითხო არავის შეუძლია. dontAsk რეჟიმში გამოძახება უარყოფილია, აგენტი ბლოკერის ანგარიშს წერს და დილით ადამიანი მას ხედავს უხმო გვერდის ავლის ნაცვლად.</ex>
    <gen>ავტონომიურ გაშვებაში ესკალაცია კითხვიდან ბლოკერის ანგარიშად იქცევა: აგენტი ჩერდება, მიზეზს ჩაიწერს და ელოდება.</gen>
    <do>ღამის გაშვებებისთვის საშიში ქმედებებზე ცალსახა „deny“ წესები დააწესეთ და აგენტისგან უხმო ვარაუდის ნაცვლად ბლოკერების ფაილი მოითხოვეთ.</do>
  </b-finding>
</b-chapter>

<b-chapter id="narrow" icon="workflow" title="რა გამოვიდა: რატომ არ ეტევა gate და ესკალაცია სრულად MCP-ში">
  <b-why align="left">host მთელ საუბარს ინახავს, სერვერი კი მხოლოდ იმას იღებს, რაც სჭირდება. სპეციფიკაციაში ეს არქიტექტურის მესამე პრინციპია<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28" quote="MCP specification: „Servers should not be able to read the whole conversation, nor 'see into' other servers.“ / „Full conversation history stays with the host“"/>. ლოკალური სერვერი კლიენტის პრივილეგიებით მუშაობს<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/basic/security_best_practices#local-mcp-server-compromise" quote="MCP specification: „MCP servers run with the same privileges as the client“"/>. აქედან გამომდინარეობს დასკვნა, რომელსაც თავად ვაკეთებ: მოთხოვნა და პასუხი MCP-ში გადის, დანარჩენი host-ის მხარეს რჩება.</b-why>
  <b-art names="agent-escalation-to-human/barrier-intercom" wide/>
  <b-cap>host ადგენს ბარიერს, MCP იძლევა დომოფონს; გვერდის ავლა ადამიანის მაგივრად პასუხია.</b-cap>
  <b-why align="left">ქვემოთ ჩამოთვლილია, რა გადის ზუსტად MCP-ში და რა რჩება host-ის მხარეს.</b-why>
  <b-rules cols="2">
    <rule icon="package" t="MCP-ით">ფუნქციის გამოძახება, შედეგი სქემით, მონაცემების მოთხოვნა ადამიანისგან, სერვერის უფლებები</rule>
    <rule icon="shield-check" t="MCP-ს გარეთ">კლიენტის hooks, უფლებების რეჟიმები, sandbox, საუბრის ისტორია, ადამიანის საკუთარი დიალოგი აგენტთან</rule>
  </b-rules>
  <b-why align="left">ამრიგად, gate-ის ნაწილი MCP-ში ცხოვრობს: მოთხოვნა ადამიანისთვის, უფლებები, შედეგის სქემა. მეორე ნაწილი host-ში დგას: hooks და რეჟიმები. ერთიანი გადაწყვეტილება „ask“ ორივე ნაწილისგან იკრიბება და თუ მხოლოდ MCP დარჩა, ნაგულისხმევი წესი იმას ეჯახება, რომ კლიენტს შეუძლია ადამიანის მაგივრად უპასუხოს. ეს არის ვიწრო ფანჯარა: კითხვა მასში ეტევა, გადაწყვეტილება „საერთოდ ვკითხოთ თუ არა“ კი გარეთ მიიღება.</b-why>
  <b-finding>
    <ex>MCP სერვერს შეუძლია ადამიანს ფულის გადარიცხვაზე ჰკითხოს. აჩვენებს თუ არა კლიენტი კითხვას ან თავად უპასუხებს, კლიენტი და მისი hooks განსაზღვრავს.</ex>
    <gen>gate და ესკალაცია ორი ადგილიდან იკრიბება: ფანჯარა MCP-ში და წესები host-ში. თითოეული მარტო ხვრელს ტოვებს.</gen>
    <do>თითოეული საშიში ოპერაციისთვის ორივე მხარე შეამოწმეთ: სერვერს შეუძლია ჰკითხოს, კლიენტს კი არ შეუძლია ადამიანის მაგივრად უპასუხოს.</do>
  </b-finding>
</b-chapter>

<b-chapter id="claims" icon="target" title="მოსალოდნელი და ნაპოვნი">
  <b-why align="left">დასაწყისის ოთხი დაშვება, შემოწმებული თავად დოკუმენტებისა და სტატიების ტექსტის მიხედვით. რისი გახსნა ან სრულად შემოწმება ვერ მოხერხდა, მონიშნულია.</b-why>
  <b-art names="agent-escalation-to-human/thesis-check" wide/>
  <b-cap>განაჩენი ოთხივე დაშვებაზე.</b-cap>
  <b-why align="left">დეტალები ცხრილშია: რა იყო მოსალოდნელი, შედეგი და რა აღმოჩნდა.</b-why>
  <b-table>

| როგორ გამოიყურებოდა | შედეგი | რა აღმოჩნდა |
|---|---|---|
| **gate აგენტის კონტექსტის გარეთ დგას** | <b-status-dot color="accent">დიახ</b-status-dot> | ციკლის შიგნით მყოფმა მსაჯულმა 86,7 დააგროვა, გარედან შემოწმებამ კი 113,0 (arXiv 2607.25152, პილოტი). Claude Code-ში დოკუმენტაცია თავად ყოფს ინსტრუქციის ტექსტს და წესებს, რომლებსაც პროგრამა აღასრულებინებს |
| **აგენტებს წვრთნიან და ზომავენ ავტონომიური მუშაობის დროით** | <b-status-dot color="accent">ნაწილობრივ</b-status-dot> | METR ზომავს ამოცანის ჰორიზონტს: 16–20 საათი 50%-იანი წარმატებით საუკეთესო გაზიარებული მოდელისთვის. როგორ წვრთნიან ზუსტად Anthropic და Google DeepMind გრძელი ჰორიზონტისთვის, საჯარო დოკუმენტებში ვერ მოიძებნა |
| **მეტრიკებისთვის ადამიანისთვის კითხვა დანაკარგია, ამიტომ კითხვა არ ამართლებს** (ჯარიმა: 0 ამოუხსნელ ამოცანაზე და გაჭრილი ტური) | <b-status-dot color="warn">არა</b-status-dot> | კლასიკურ ბენჩმარკებს ადამიანისკენ არხი არ აქვთ და ამოხსნის გარეშე გაჩერება წარუმატებლობად ითვლება. tau-bench-ში ადამიანისთვის არასაჭირო გადაცემა 0-ს იძლევა. მეტრიკები, რომლებიც კითხვას ითვლიან, ან აჯილდოებენ მას (HiL-Bench), ან ნეიტრალურად აღიქვამენ (HAS-Bench). ფორმულირება „კითხვა დანაკარგია“ ვერ მოიძებნა. გაზომვა „წვრთნამდე და მის შემდეგ დასრულებაზე“ არ არსებობს |
| **MCP ვიწრო ადგილია** | <b-status-dot color="warn">არსით</b-status-dot> | პირდაპირი ციტატა არ არის: სპეციფიკაციაში სიტყვა „bottleneck“-ის მსგავსი არაფერია. ის კი ამბობს, რომ პროტოკოლი უსაფრთხოების პრინციპებს თავად ვერ აღასრულებინებს და იზოლაციას host უზრუნველყოფს |

  </b-table>
  <b-why align="left">ცხრილი ერთ შედეგს იძლევა: დაშვება კითხვის დასჯის შესახებ ერთადერთია, რომელიც წყაროებმა არ დაადასტურეს, და ის მთელ ჯაჭვს ერთად ამყარებდა.</b-why>
  <b-finding>
    <ex>დაშვება კითხვის დასჯის შესახებ დამაჯერებლად გამოიყურებოდა, მაგრამ ერთადერთი ნაპოვნი რეალური შემთხვევა ბენჩმარკებია, სადაც ადამიანისკენ არხი არ არის. ეს სხვა რამეა: იქ კითხვა შეუძლებელია და დასასჯელი არაფერია.</ex>
    <gen>თუ მეტრიკა კითხვას არ ითვალისწინებს, მასზე წვრთნა კითხვას არ ასწავლის. ეს მეტრიკის აგებულებიდან გამომდინარეობს, ქცევაზე გავლენის პირდაპირი მტკიცებულება კი არ არსებობს.</gen>
    <do>სანამ დაასკვნით, რატომ იქცევა აგენტი გარკვეულად, იპოვეთ გაზომვა: იგივე აგენტის შედარება წვრთნამდე და მის შემდეგ. მის გარეშე მხოლოდ ჰიპოთეზა რჩება.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="როგორ დავიწყოთ: ოთხი ნაბიჯი და მზა პრომპტები აგენტისთვის">
  <b-why align="left">ნაბიჯები იაფიდან საფუძვლიანისკენ მიდის. პირველი ორი საკმარისია იმისთვის, რომ ესკალაცია აგენტის გუნებაზე აღარ იყოს დამოკიდებული.</b-why>
  <b-rules cols="2">
    <rule icon="checklist" t="1. გაჩერებების სია">ფაილში ჩაწერეთ, რომელი ქმედებები მოითხოვს აგენტისგან გაჩერებასა და კითხვას.</rule>
    <rule icon="shield-check" t="2. წესები და hook">საშიში ქმედებები „deny“-ში ან „ask“-ში მოათავსეთ უფლებებისა და PreToolUse hook-ის საშუალებით.</rule>
    <rule icon="package" t="3. უფლებები MCP სერვერზე">საშიში ფუნქციები მხოლოდ საჭირო scope-ით გასცეთ.</rule>
    <rule icon="clock" t="4. კითხვების ჟურნალი">დათვალეთ, რამდენჯერ იკითხა აგენტმა, რამდენჯერ ზედმეტად და რამდენჯერ დუმდა, როცა უნდა ეკითხა.</rule>
  </b-rules>
  <b-why align="left">პირველი პრომპტი გაჩერებების სიას აგროვებს: ეს ნაბიჯი 1-ია.</b-why>
  <b-prompt>
    შექმენი ფაილი escalation.md იმ შემთხვევების სიით, როცა აგენტმა უნდა გაჩერდეს და მკითხოს: შეუქცევადი ქმედებები,
    რელიზი, უფლებების შეცვლა, ამოცანის ორი თანაბარი წაკითხვა. თითოეული შემთხვევისთვის ჩაწერე, რა კითხვა უნდა დაისვას და რომელი პასუხი ითვლება თანხმობად.
    დანარჩენს აგენტი თავად წყვეტს.
  </b-prompt>
  <b-why align="left">მეორე პრომპტი სიას hook-ის წესებად აქცევს: ეს ნაბიჯი 2-ია.</b-why>
  <b-prompt>
    დააყენე PreToolUse hook ფაილში .claude/settings.json: escalation.md-ის ბრძანებებზე უპასუხე „ask“, აშკარად საშიშებზე უპასუხე „deny“
    მიზეზით, რომელსაც აგენტი დაინახავს. აჩვენე საბოლოო ფაილი და გამოძახების მაგალითი, რომელზეც hook-მა იმუშავა.
  </b-prompt>
  <b-why align="left">მესამე პრომპტი ამოწმებს, შეუძლია თუ არა კლიენტს ადამიანის მაგივრად პასუხი: ეს ნაბიჯი 3-ია.</b-why>
  <b-prompt>
    შეამოწმე ჩემი MCP კლიენტი: შეუძლია თუ არა აგენტს ან სკრიპტს ადამიანისგან მონაცემების მოთხოვნას ჩემ მაგივრად უპასუხოს. თუ შეუძლია, შემომთავაზე პარამეტრი,
    რომელიც ამას საშიში ფუნქციების მქონე სერვერებზე ხელს შეუშლის.
  </b-prompt>
  <b-why align="left">აი, როგორ გამოიყურება პირველი ორი ნაბიჯის შემდეგ.</b-why>
  <b-finding>
    <ex>ერთი კვირის შემდეგ ჟურნალმა აჩვენა: ათი კითხვიდან რვა ფაილების გადარქმევას ეხებოდა. გაჩერებების სია შეუქცევად ქმედებებამდე შემცირდა და კითხვები დღეში ორამდე დაეცა.</ex>
    <gen>ესკალაცია ჟურნალით რეგულირდება: ზედმეტი კითხვა ადამიანის ყურადღებას ჭამს, ცოტა კითხვა კი აგენტის ვარაუდებს ტოვებს.</gen>
    <do>ერთ ამოცანაზე დღესვე შეასრულეთ ნაბიჯები 1 და 2, ჟურნალი კი კვირის შემდეგ რეალური კითხვებიდან დაიწყეთ.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="ხშირად დასმული კითხვები">
  <b-faq-cards>
    <q t="რა არის ესკალაცია ადამიანთან AI აგენტებში?">გაჩერება, სადაც აგენტი ან მის გარშემო მყოფი პროგრამა გადაწყვეტილებას ადამიანს გადასცემს: კითხვით, უფლების მოთხოვნით ან დადასტურებით. გადაწყვეტილებას „ask“ წესები და hooks იღებენ, პასუხს კი ადამიანი იძლევა.</q>
    <q t="რა არის elicitation MCP-ში?">გზა, რომლითაც MCP სერვერი ადამიანს კლიენტის მეშვეობით მონაცემების მიწოდებას სთხოვს. სამი პასუხია: accept, decline და cancel. პაროლებისა და გასაღებების ფორმაში მოთხოვნა აკრძალულია და მათთვის გარე მისამართის რეჟიმი არსებობს.</q>
    <q t="სჯიან თუ არა ავტონომიის მეტრიკები აგენტს ადამიანისთვის კითხვისთვის?">ჯარიმა შეუსრულებელ შედეგზე მოდის: 0 ერთის ნაცვლად, Anthropic-ში კი კითხვა ტურს ჭრის. თავად კითხვისთვის გამოქვითვა ვერ მოიძებნა. კლასიკურ ბენჩმარკებს ადამიანისკენ არხი უბრალოდ არ აქვთ. ახალი HiL-Bench და Anthropic-ის ნაშრომი კითხვას აჯილდოებენ ან ზედამხედველობად თვლიან, HAS-Bench კი ნეიტრალურად აღიქვამს.</q>
    <q t="შეიძლება თუ არა gate და ესკალაცია სრულად MCP-ში ჩაშენდეს?">არა. MCP კითხვასა და პასუხს გადასცემს, გადაწყვეტილებას კი, ადამიანს კითხვა ვაჩვენოთ თუ ავტომატურად ვუპასუხოთ, host იღებს: მისი hooks, უფლებების რეჟიმები და კლიენტი. თავად პროტოკოლს ამ გადაწყვეტილების აღსრულება არ შეუძლია.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="წასაკითხი">
  <b-links>
    <item href="/blog/quality-gates-ai-agents/" k="Gates" t="რა არის ხარისხის gate-ები AI აგენტებისთვის">შესასვლელი პოსტი, რომელიც ამბობს „მზადაა“</item>
    <item href="/blog/agent-checkpoint/" k="შემოწმება" t="სად დავდგათ აგენტის მუშაობის შემოწმება">აგრეგატის საზღვარი და რაისის თეორემა</item>
    <item href="/blog/mcp-agent-access/" k="MCP" t="MCP AI აგენტისთვის">რა პრობლემას წყვეტს და როგორ ვუერთდეთ</item>
    <item href="/blog/mcp-scopes/" k="MCP" t="MCP scope-ები Claude Code-ში">ლოკალური, პროექტის და მომხმარებლის</item>
    <item href="/blog/harness-driven-development/" k="Harness" t="Harness engineering პრაქტიკაში">მეგზურები, სენსორები და ციკლი „შეცდომა — წესი“</item>
    <item href="/blog/ai-agent-maturity-levels/" k="სიმწიფე" t="AI აგენტის სიმწიფის დონეები">ჩატიდან სპეციფიკაციებამდე, skills-მდე, კოდამდე და სისტემამდე</item>
  </b-links>
</b-chapter>
<b-footer>ფაქტები: მდგომარეობით 2026 წლის 14 ნოემბრისთვის, დოკუმენტებიდან და სტატიებიდან, რომლებიც ↗ ნიშნებითაა დაკავშირებული. openai.com-ის გვერდები და METR-ის სოციალური პოსტი არ გაიხსნა, ამიტომ OpenAI-ის მაჩვენებელი ჩარევის გარეშე ამოცანების წილზე აქ არ გამოიყენება. აგენტების კითხვებზე და METR-ზე ზოგი ციტატა გვერდის შეჯამებით შემოწმდა; ციტირებამდე გადაამოწმეთ ორიგინალში. მაგალითები კონფიგურაციით, საგადახდო სერვერით და ღამის გაშვებით ჰიპოთეტურია.</b-footer>
</b-post>
