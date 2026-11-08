---
title: როგორ ჩავატაროთ და გავაანალიზოთ ინტერვიუები AI-ის გამოყენებაზე: 30-წუთიანი სცენარი, ანალიზის პრომპტი და Airtable-ის ცხრილი
date: 2026-09-28
updated: 2026-11-08
description: 30-წუთიანი ზარის სცენარი, თემიდან გადახვევის თავიდან აცილების წესები, მოკლე კითხვარი მთელი კომპანიისთვის, ინტერვიუების ანალიზი ChatGPT-ით ან აგენტით მზა პრომპტით და „ნათქვამი და გაზომილი“ შედარება ანგარიშის მონაცემებთან.
tags: AI, custdev, ინტერვიუები
category: research
layout: wide
image: /og/ai-interviews-without-leading-questions.en.png
mentions: Airtable, tl;dv, ChatGPT, Claude Code, Model Context Protocol
toc: format=ფორმატის არჩევა | prep=შეხვედრისთვის მომზადება | script=30-წუთიანი სცენარი | focus=თემაზე დარჩენა | base=აღრიცხვა Airtable-ში | agent=Claude Code-ით | wording=ტექსტი: ფორმულირება | form=კითხვარი | after=ინტერვიუების ანალიზი | faq=კითხვები | next=დამატებით წასაკითხი
---

ინტერვიუ AI-თან მუშაობაზე 30 წუთი გრძელდება და ბოლო რეალურ ამოცანაზეა აგებული: რა გაკეთდა, რა შედეგი მივიღეთ და რა დაჯდა, შემდეგ წარმატებული შემთხვევა და შემთხვევა, როცა ადამიანმა AI მიატოვა ან სხვაზე გადავიდა. ფორმატს ადამიანი ირჩევს: ზარი ან ტექსტი. პასუხები ანალიზდება პრომპტით ChatGPT-ში ან აგენტში, იტვირთება Airtable-ის ცხრილში და ედარება გამოყენების მონაცემებს. ქვემოთ: სცენარი, გამოკითხვა და ანალიზის პრომპტი.

<b-post series="intervyu">
<b-credit para>ინტერვიუების დიზაინი <a href="https://t.me/Kseniya_Vasil" target="_blank" rel="noopener">@Kseniya_Vasil</a>-ის რეკომენდაციებს ეფუძნება. ინტერვიუებისთვის ადამიანები, ჯგუფები და რიცხვები <a href="/blog/chatgpt-enterprise-usage-report/">ChatGPT Enterprise-ის გამოყენების ანგარიშიდან</a> მოდის. იქვეა <a href="/blog/chatgpt-enterprise-usage-report/#why">ბიზნეს-ამოცანაც</a>: რას წყვეტს კომპანია, ვინ წყვეტს და რა ნიშნებით.</b-credit>
<b-lead tight>ანალიზი აქ ოთხ ნაბიჯს მოიცავს: საუბრის ტექსტი ChatGPT-ში იგზავნება ყოველ ჯერზე ერთი და იმავე პრომპტით, პასუხი ადამიანის სტრიქონში კოპირდება, ცხრილი ჯგუფდება სირთულის მიხედვით, განმეორებები კი მთელი კომპანიის კითხვარით მოწმდება. ადამიანების სიტყვები ანგარიშის მონაცემებს ედარება. ქვემოთ: ზარის სცენარი, ცხრილი და <a href="#after">ანალიზის პრომპტი</a>.</b-lead>
<b-flow label="ინტერვიუს ორი ფორმატი ერთ ცხრილში იყრის თავს">
  <b-lane title="ხმა" color="c-chat">
    <node icon="phone" t="ზარი">30 წთ</node>
    <node icon="record" t='<a href="https://tldv.io/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">tl;dv</a> · <a href="https://www.granola.ai/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">Granola</a>'>ჩანაწერები</node>
    <node icon="file-text" t="ტრანსკრიპტი">Notes-ში</node>
  </b-lane>
  <b-lane title="ტექსტი" color="c-work">
    <node icon="doc-lines" t="კითხვები">ჩატში</node>
    <node icon="chat" t="დაზუსტება">1 შეტყობინება</node>
    <node icon="file-text" t="ჩატის ჟურნალი">კოპირდება Notes-ში</node>
  </b-lane>
  <b-drop-arrows n="2"/>
  <b-airtable-preview icon="table" title='<a href="https://airtable.com" target="_blank" rel="noopener">Airtable</a>' sub="ყველაფერი ერთ ცხრილში" count="16 ჩანაწერი">
    <col w="1.1fr" mw="1.2fr">სახელი</col>
    <col w="1.7fr" kind="note">Notes</col>
    <col w=".9fr" kind="wide">ფორმატი</col>
    <col w="1fr" mw="1fr" kind="ours">სიხშირე, საკუთარი თქმით</col>
    <col w="1fr" mw="1fr">ანგარიშით</col>
    <col w=".9fr" kind="wide">სტატუსი</col>
    <row>Hana Sato | Host [00:00]: Think back to the last… | <b-select-pill tone="cyan">ხმა</b-select-pill> | <b-select-pill tone="green">ყოველკვირა</b-select-pill> | <b-select-pill tone="green">ყოველკვირა</b-select-pill> | <b-select-pill tone="green">მზადაა</b-select-pill></row>
    <row>Pavel Novak | [27.09 10:15] Host: Describe the last… | <b-select-pill tone="purple">ტექსტი</b-select-pill> | <b-select-pill tone="cyan">რეგულარულად</b-select-pill> | <b-select-pill tone="red">არ იყენებს</b-select-pill><b-match-mark kind="diff">≠</b-match-mark> | <b-select-pill tone="green">მზადაა</b-select-pill></row>
    <row>Nadia Rahimi | Host [00:00] | <b-select-pill tone="cyan">ხმა</b-select-pill> | <b-select-pill tone="yellow">ხანდახან</b-select-pill> | <b-select-pill tone="yellow">ხანდახან</b-select-pill> | <b-select-pill tone="green">მზადაა</b-select-pill></row>
  </b-airtable-preview>
</b-flow>
<b-chapter id="format" icon="split" title="ფორმატის არჩევა">
  <b-table>
    <table><thead><tr><th>კრიტერიუმი</th><th><b-icon name="mic" sw="2.2"/> ხმა</th><th><b-icon name="lines" sw="2.2"/> ტექსტი</th></tr></thead><tbody>
    <tr><td>პასუხების სიღრმე</td><td><b-rating value="5" of="5" label="5 / 5"/></td><td><b-rating value="2" of="5" label="2 / 5"/></td></tr>
    <tr><td>დაზუსტება იმავე წუთს</td><td><b-rating value="5" of="5" label="5 / 5"/></td><td><b-rating value="1" of="5" label="1 / 5"/></td></tr>
    <tr><td>რამდენ ადამიანს მიაღწევთ</td><td><b-rating value="2" of="5" label="2 / 5"/></td><td><b-rating value="5" of="5" label="5 / 5"/></td></tr>
    <tr><td>რესპონდენტის დრო</td><td>30 წთ</td><td>10 წთ</td></tr>
    <tr><td>თემიდან გადახვევის რისკი</td><td><b-rating value="4" of="5" warn label="4 / 5"/></td><td><b-rating value="1" of="5" warn label="1 / 5"/></td></tr>
    </tbody></table>
  </b-table>
  <b-cap>წერტილები არის შეფასება 1-დან 5-მდე. რისკისთვის მეტი წერტილი უარესია.</b-cap>
  <b-sublabel top="22">შერეული: ფორმატს რესპონდენტი ირჩევს</b-sublabel>
  <b-choice-flow label="ხმა თუ ტექსტი — არჩევს რესპონდენტი">
    <step t="მოწვევა">პირადი შეტყობინებით</step>
    <step t="ზარი გამოგადგებათ?">30 წუთი</step>
    <opt k="yes" tone="cyan" pill="ხმა">ზარი ჩანაწერების ასისტენტით</opt>
    <opt k="no" tone="purple" pill="ტექსტი">იგივე კითხვები, სათითაოდ, ჩატში</opt>
  </b-choice-flow>
  <b-finding>
    <ex>ხმა სიღრმით 5-ს იღებს 5-დან, ტექსტი ხელმისაწვდომობით 5-ს 5-დან. ფორმატს თითოეული ადამიანი თავად ირჩევს.</ex>
    <gen>როცა ადამიანები ფორმატს თავად ირჩევენ, უარს ნაკლები ამბობს. ფორმატები სიღრმით განსხვავდება: ზარი დეტალურ ამბავს გვაძლევს დაზუსტებებით, ჩატი მოკლე პასუხებს. ამიტომ ჩატის პასუხები შემთხვევებისა და თემების მოსაძებნად გამოდგება, მაგრამ ზარებთან გათანაბრებული არ არის. ხმა ძირითადი ფორმატია; ჩატი მათთვისაა, ვისაც ზარზე საუბარი არ შეუძლია. მთელი კომპანიის კითხვარი ცალკე ინსტრუმენტია და ინტერვიუების შემდეგ იწერება.</gen>
    <do>მოწვევაში ორივე ფორმატი ერთი წინადადებით შესთავაზეთ: „ვისაუბროთ 30-წუთიან ზარზე, თუ გირჩევნიათ კითხვებს ჩატში უპასუხოთ?“</do>
  </b-finding>
</b-chapter>
<b-chapter id="prep" icon="mic" title="შეხვედრისთვის მომზადება">
  <b-todo>
    <item t="ჩანაწერების ასისტენტის ხსენება">მოწვევაში და ზარის დასაწყისში: ასისტენტი აკეთებს ჩანაწერებს და ტრანსკრიპტს, რომელსაც მხოლოდ გუნდი ხედავს, ხოლო პასუხები ანგარიშში სახელების გარეშე მოხვდება. <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link>-ში აუდიო არ ინახება</item>
    <item t='<a href="https://tldv.io/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">tl;dv</a> ან <a href="https://www.granola.ai/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">Granola</a>'><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> კალენდართანაა დაკავშირებული და Google Meet-ის ან Zoom-ის შეხვედრას თავად უერთდება. <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> ბოტის გარეშე მუშაობს, თქვენი კომპიუტერის აუდიოს იყენებს და მხოლოდ ტრანსკრიპტსა და ჩანაწერებს ინახავს</item>
    <item t="Airtable-ის სტრიქონი წინასწარ შექმნილია">სახელი, ჯგუფი და რიცხვები <a href="/blog/chatgpt-enterprise-usage-report/#people">ყველა ადამიანის ცხრილიდან</a>, სტატუსი „მიმდინარეობს“, პირველ შეტყობინებამდე</item>
    <item t="გზამკვლევი გახსნილია მეორე ეკრანზე">სცენარის შვიდი ბლოკი და 30-წუთიანი ტაიმერი</item>
    <item t="ერთი წამყვანი, ჩანაწერების გარეშე"><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> ან <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> ტრანსკრიპტს აკეთებს, ChatGPT ანალიზს</item>
  </b-todo>
  <b-finding>
    <do>შეხვედრამდე შეამოწმეთ, რომ <b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> შეხვედრას კალენდარში ხედავს ან <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> თქვენს კომპიუტერზეა გაშვებული, და შექმენით Airtable-ის სტრიქონი, რომ ზარზე მხოლოდ კითხვები დარჩეს.</do>
  </b-finding>
</b-chapter>
<b-chapter id="script" icon="clock" title="30-წუთიანი სცენარი">
  <b-share-bar kind="time" label="30">
    <seg w="2" color="c-none" ink="ink">2</seg>
    <seg w="3" color="c-light">3</seg>
    <seg w="8" color="c-chat">8</seg>
    <seg w="5" color="c-proj">5</seg>
    <seg w="4" color="c-team">4</seg>
    <seg w="5" color="c-work">5</seg>
    <seg w="3" color="c-none" ink="ink">3</seg>
  </b-share-bar>
  <b-cap>წუთები ბლოკების მიხედვით</b-cap>
  <b-call-script>
    <step color="c-none" ink="ink" t="შესავალი" q="&quot;ვაკვირდები, როგორ ასრულებენ ადამიანები კომპანიაში სამუშაო ამოცანებს. ეს თქვენი შეფასება არ არის. წარმატებული და წარუმატებელი შემთხვევები ჩემთვის თანაბრად სასარგებლოა. ჩემთან ერთად ჩანაწერების ასისტენტია: ტრანსკრიპტს მხოლოდ ჩვენ ვხედავთ, პასუხები კი ანგარიშში სახელების გარეშე მოხვდება. ჩავრთო?&quot;"></step>
    <step color="c-light" t="როლი და კონტექსტი" q='"კვირის უმეტეს ნაწილს რას უთმობთ?"'>რომელი ამოცანები მეორდება · სად ეძებთ ინფორმაციას და სად ამზადებთ პირველ ვარიანტებს</step>
    <step color="c-chat" t="ბოლო სამუშაო ამოცანა" q='"გაიხსენეთ ბოლო სამუშაო ამოცანა, რომელმაც შესამჩნევი დრო წაგართვათ. რა გჭირდებოდათ მისაღებად?"'>რა საშუალებები გქონდათ · რა აირჩიეთ და რატომ · როგორ მიხვედით შედეგამდე</step>
    <step color="c-proj" t="შედეგი და ძალისხმევა" q='"რა მიიღეთ საბოლოოდ და რამდენი ძალისხმევა დაგჭირდათ?"'>რა გამოიყენეთ როგორც არის · რა დაასრულეთ თავად · რა შეზღუდვები იყო: მონაცემები, წვდომა, უსაფრთხოება</step>
    <step color="c-team" t="წარმატებული შემთხვევა" q='"გაიხსენეთ შემთხვევა, როცა მსგავსი ამოცანა კარგად გამოვიდა. რით იყო მაშინ განსხვავებული?"'>ინსტრუმენტი · მონაცემები · მომზადება</step>
    <step color="c-work" t="მიტოვება და გადართვა" q='"ოდესმე შეგიწყვეტიათ რომელიმე ინსტრუმენტის გამოყენება ან სხვაზე გადასულხართ? როგორ მოხდა?"'>რომელი ინსტრუმენტი · რაზე გადახვედით · რატომ. თუ ასე არასოდეს მომხდარა, გამოტოვეთ</step>
    <step color="c-none" ink="ink" t="დასკვნა" q="&quot;რა არ გკითხეთ ისეთი, რაც თქვენი მუშაობის გასაგებად მნიშვნელოვანია?&quot;">მადლობა · თქვით, რომ პასუხები საერთო ანალიზში სახელების გარეშე მოხვდება</step>
  </b-call-script>
  <b-branch icon="git-branch" t="თუ ადამიანი AI-ს არ ახსენებს">ნუ ჰკითხავთ, რატომ არ იყენებს. ჰკითხეთ, როგორ შეასრულა ამოცანა და რომელი ვარიანტები განიხილა. AI-ზე იკითხეთ მხოლოდ იმ შემთხვევაში, თუ ადამიანმა თავად დაასახელა ის შესაძლო ვარიანტად</b-branch>
  <b-finding>
    <ex>ბოლო ამოცანა, შედეგი და ძალისხმევა 30 წუთიდან 13-ს იკავებს; წარმატებული შემთხვევა და მიტოვება ან გადართვა კიდევ 9-ს.</ex>
    <gen>საუბარი სამუშაოზეა აგებული და არა ინსტრუმენტზე. ეს აჩვენებს, სად ეხმარება AI, სად აირჩია ადამიანმა სხვა გზა და სად არ სჭირდება ახალი ინსტრუმენტი. წარმატებული შემთხვევა აჩვენებს, რა მუშაობს უკვე; მიტოვება და გადართვა აჩვენებს, რატომ იცვლება ინსტრუმენტები.</gen>
    <do>ჩართეთ ტაიმერი: მე-5 წუთისთვის გადადით ბოლო სამუშაო ამოცანაზე. თუ არა, კონტექსტი ერთ კითხვამდე შეკვეცეთ. ამოცანის თემა ადამიანისთვის თავად აირჩიეთ: მათი ამოცანები ჩანს განყოფილებაში <a href="/blog/chatgpt-enterprise-usage-report/#projects">პროექტების თემები</a>.</do>
  </b-finding>
</b-chapter>
<b-chapter id="focus" icon="target" title="თემაზე დარჩენა">
  <b-rules>
    <rule icon="parking" t="პარკინგი">თემიდან გადახვეული საკითხები ცალკე ველში იწერება; მათ ბოლო 2 წუთში დაუბრუნდით</rule>
    <rule icon="one" t="ერთი კითხვა ერთდროულად">„და კიდევ…“ ერთსა და იმავე წინადადებაში არა</rule>
    <rule icon="undo" t="უკან შემთხვევასთან">ზოგადი აზრი → „გაიხსენებთ კონკრეტულ შემთხვევას?“</rule>
    <rule icon="shield-off" t="ინსტრუმენტს ნუ დაიცავთ">კრიტიკას უპასუხეთ მხოლოდ ასე: „რა მოხდა შემდეგ?“</rule>
    <rule icon="pause" t="5-წამიანი პაუზა">პასუხის შემდეგ დუმდით: ადამიანები ხშირად თავადვე ამატებენ მთავარს</rule>
    <rule icon="bulb-off" t="გადაწყვეტილებებს ნუ შესთავაზებთ">საკუთარი იდეები და სხვა პროდუქტების სახელები არა</rule>
  </b-rules>
  <b-sublabel top="22">სიტუაცია → რა ვთქვათ</b-sublabel>
  <b-table>
    <table><thead>
    <tr><th>სიტუაცია</th><th>წამყვანის ფრაზა</th></tr>
    </thead><tbody>
    <tr><td>ახალ ფუნქციას ითხოვს</td><td>„ბოლოს როდის დაგჭირდათ? მაშინ რა გააკეთეთ?“</td></tr>
    <tr><td>პროცესებზე ჩივილებზე გადადის</td><td>„ამას პარკინგში ჩავწერ. დავუბრუნდეთ ანგარიშის ამოცანას: რა მოხდა შემდეგ?“</td></tr>
    <tr><td>პასუხობს „ჩვეულებრივ“ და „ყოველთვის“</td><td>„და ბოლოს როგორ იყო?“</td></tr>
    <tr><td>წამყვანის აზრს ეკითხება</td><td>„ბოლოს გიამბობთ. ახლა მნიშვნელოვანია, თქვენთვის როგორ მუშაობს“</td></tr>
    <tr><td>ბლოკის დრო ამოიწურა</td><td>„ეს მნიშვნელოვანია, ჩავინიშნოთ. შემდეგ კითხვაზე გადავდივარ“</td></tr>
    </tbody></table>
  </b-table>
  <b-finding>
    <ex>ხუთი გავრცელებული სიტუაცია, თითოეულთან ფრაზა, რომელიც საუბარს ეპიზოდს უბრუნებს.</ex>
    <gen>ფუნქციის თხოვნის უკან კონკრეტული შემთხვევა დგას, და სწორედ ეს შემთხვევაა საჭირო. თხოვნა თავისთავად მოგვიანებით გამოდგება, როგორც მინიშნება, სად ვეძებოთ პრობლემა.</gen>
    <do>ფრაზების ცხრილი გზამკვლევთან ახლოს გქონდეთ და ფუნქციის ყოველი თხოვნა სიტყვასიტყვით ჩაწერეთ ცხრილის ცალკე ველში თემიდან გადახვეული საკითხებისთვის.</do>
  </b-finding>
</b-chapter>
<b-chapter id="base" icon="table" title="აღრიცხვა Airtable-ში">
  <b-why>ცხრილი ერთ ადგილას ინახავს ნიმუშში შემავალ ყველა ადამიანს, მათ საუბრებს და ანგარიშის მონაცემებს. <b>გადაწყვეტილება:</b> ვის მოვიწვიოთ დამატებით, რომ თითოეულ ჯგუფში საკმარისი ინტერვიუ იყოს, ვის გავუგზავნოთ დამაზუსტებელი შეტყობინება და საკუთარი თქმით გამოყენებასა და გაზომილ გამოყენებას შორის რომელი სხვაობა განვიხილოთ ადამიანთან.</b-why>
  <b-pipe label="ჩანაწერის გზა ზარიდან ცხრილამდე">
    <node icon="record" color="c-chat" sub="ტრანსკრიპტი"><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> · <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link></node>
    <node icon="table" color="c-proj" sub="Notes ველი ადამიანის სტრიქონში"><b-ink-link href="https://airtable.com" plain>Airtable</b-ink-link></node>
  </b-pipe>
  <b-tool-links>
    <item href="https://airtable.com" icon="external" sub="ბაზა და ფორმები">Airtable</item>
    <item href="https://tldv.io" icon="external" sub="ზარის ჩანაწერები და ტრანსკრიპტები">tl;dv</item>
    <item href="https://www.granola.ai/" icon="external" sub="ჩანაწერები ბოტის გარეშე, აუდიო არ ინახება">Granola</item>
  </b-tool-links>
  <b-cap>ხმა: <b-ink-link href="https://tldv.io/">tl;dv</b-ink-link>-ის ან <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link>-ის ტრანსკრიპტი კოპირდება Notes ველში. ტექსტი: ჩატის ჟურნალი კოპირდება იმავე ველში, თითოეული შეტყობინების თარიღითა და დროით.</b-cap>
  <b-sublabel top="22">ერთი ცხრილი: ერთი სტრიქონი თითო ადამიანზე</b-sublabel>
  <b-airtable-grid foot="16 ჩანაწერი · ნაჩვენებია 9">
    <field type="A" kind="name">სახელი</field>
    <field type="≡" kind="note">Notes</field>
    <field type="◉">ფორმატი</field>
    <field type="◉">ჯგუფი</field>
    <field type="◉">სტატუსი</field>
    <field type="◉" kind="ours">სიხშირე · საკუთარი თქმით</field>
    <field type="◉">სიხშირე · ანგარიშით</field>
    <field type="ƒ" kind="mark">≠</field>
    <field type="#" kind="num">ტოკენები · 3 თვე</field>
    <field type="#" kind="num">$ / 3 თვე</field>
    <field type="▦" kind="num">აქტივობა</field>
    <row>Hana Sato | Host [00:00]: Think back to the last time you… | <b-select-pill tone="cyan">ხმა</b-select-pill> | code | <b-select-pill tone="green">მზადაა</b-select-pill> | <b-select-pill tone="green">ყოველკვირა</b-select-pill> | <b-select-pill tone="green">ყოველკვირა</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 21.9M | 438 | 25.09</row>
    <row>Luis Moreno | Host [00:00]: Thanks for making the time… | <b-select-pill tone="cyan">ხმა</b-select-pill> | code | <b-select-pill tone="green">მზადაა</b-select-pill> | <b-select-pill tone="cyan">რეგულარულად</b-select-pill> | <b-select-pill tone="green">ყოველკვირა</b-select-pill> | <b-match-mark kind="diff">≠</b-match-mark> | 12.7M | 396 | 24.09</row>
    <row>Mira Castellano | [26.09 18:40] Host: What result were you expecting… | <b-select-pill tone="purple">ტექსტი</b-select-pill> | agent | <b-select-pill tone="yellow">ნაწილობრივ</b-select-pill> | <b-select-pill tone="cyan">რეგულარულად</b-select-pill> | <b-select-pill tone="cyan">რეგულარულად</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 3.9M | 97 | 26.09</row>
    <row>Jonas Keller | Host [00:00]: What do you spend most of your… | <b-select-pill tone="cyan">ხმა</b-select-pill> | research | <b-select-pill tone="green">მზადაა</b-select-pill> | <b-select-pill tone="green">ყოველკვირა</b-select-pill> | <b-select-pill tone="green">ყოველკვირა</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 1.1M | 19 | 26.09</row>
    <row>Ben Ortiz |  |  | Codex only | <b-select-pill tone="cyan">პასუხს ველოდებით</b-select-pill> |  | <b-select-pill tone="purple">Codex only</b-select-pill> |  | 3.2M | 64 | 22.09</row>
    <row>Pavel Novak | [27.09 10:15] Host: Describe the last task… | <b-select-pill tone="purple">ტექსტი</b-select-pill> | inactive | <b-select-pill tone="green">მზადაა</b-select-pill> | <b-select-pill tone="cyan">რეგულარულად</b-select-pill> | <b-select-pill tone="red">არ იყენებს</b-select-pill> | <b-match-mark kind="diff">≠</b-match-mark> | 0 | 0 | —</row>
    <row>Sara Quinn |  |  | inactive | <b-select-pill tone="red">უარი თქვა</b-select-pill> |  | <b-select-pill tone="red">არ იყენებს</b-select-pill> |  | 0 | 0 | —</row>
    <row>Nadia Rahimi | Host [00:00]: What did you do in ChatGPT yesterday… | <b-select-pill tone="cyan">ხმა</b-select-pill> | other tools | <b-select-pill tone="green">მზადაა</b-select-pill> | <b-select-pill tone="yellow">ხანდახან</b-select-pill> | <b-select-pill tone="yellow">ხანდახან</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 0.3M | 6 | 20.09</row>
    <row>Elif Demir |  |  | projects | <b-select-pill tone="gray">მიმდინარეობს</b-select-pill> |  | <b-select-pill tone="green">ყოველკვირა</b-select-pill> |  | 1.8M | 41 | 27.09</row>
  </b-airtable-grid>
  <b-cap>ChatGPT ავსებს ნარინჯისფერ ველს Notes-ის საუბრიდან. „ანგარიშით“, „ტოკენები“, „$“ და „აქტივობა“ <a href="/blog/chatgpt-enterprise-usage-report/">ChatGPT Enterprise-ის გამოყენების ანგარიშიდან</a> მოდის. ველი „≠“ ფორმულაა, რომელიც ორ სიხშირეს ადარებს.</b-cap>
  <b-sublabel top="22">ცხრილის წაკითხვა: რას გვაძლევს თითოეული სვეტი</b-sublabel>
  <b-table>
    <table><thead>
    <tr><th>სვეტი</th><th>წყარო</th><th>რაზე მოქმედებს</th></tr>
    </thead><tbody>
    <tr><td>სახელი · ჯგუფი</td><td><a href="/blog/who-to-interview-before-buying-ai-tools/#groups">ნიმუში „რვა ჯგუფი“</a></td><td>ამოცანების შესრულების რომელ გზას წარმოადგენს ადამიანი</td></tr>
    <tr><td>Notes</td><td><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link>, <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> ან ჩატის ჟურნალი</td><td>ყველა ველის წყარო; ნებისმიერი დასკვნა ციტატასთან მოწმდება</td></tr>
    <tr><td>ფორმატი</td><td>წამყვანი</td><td>პასუხის სიღრმე: ჩატში დეტალები ზარზე ნაკლებია</td></tr>
    <tr><td>სტატუსი</td><td>წამყვანი</td><td>შემდეგი ქმედება: შეახსენოთ, დააზუსტოთ ან ადამიანი ჩავანაცვლოთ</td></tr>
    <tr><td>სიხშირე · საკუთარი თქმით</td><td>ChatGPT საუბრიდან იღებს</td><td>რა სიხშირით ამბობს ადამიანი, რომ AI-ს იყენებს</td></tr>
    <tr><td>სიხშირე · ანგარიშით</td><td><a href="/blog/chatgpt-enterprise-usage-report/#depth">ანგარიში · ათვისების სიღრმე</a></td><td>რა სიხშირით იყენებს კონსოლის მონაცემებით</td></tr>
    <tr><td>≠</td><td>Airtable-ის ფორმულა: ადარებს ორ სიხშირეს</td><td>თუ არ ემთხვევა: კითხვა ინტერვიუზე დასაზუსტებლად, რადგან ანგარიში მხოლოდ კორპორატიულ ინსტრუმენტს ხედავს და მხოლოდ 3 თვის განმავლობაში</td></tr>
    <tr><td>ტოკენები · 3 თვე</td><td>ანგარიში · <a href="/blog/chatgpt-enterprise-usage-report/#top-spend">ხარჯის ტოპი</a></td><td>სამუშაოს მოცულობა კორპორატიულ ინსტრუმენტში 3 თვეში, ნიმუშის შესარჩევად და არა პასუხის წონის დასადგენად</td></tr>
    <tr><td>$ · 3 თვე</td><td>ანგარიში · ლიდერბორდი</td><td>ხარჯი 3 თვეში, ნიმუშის შესარჩევად და არა პასუხის წონის დასადგენად</td></tr>
    <tr><td>აქტივობა</td><td>ანგარიში · მომხმარებლების ექსპორტი</td><td>ბოლო ქმედების თარიღი: დიდი ხნის წინანდელი ნიშნავს კანდიდატს ჯგუფისთვის „სცადა და მიატოვა“</td></tr>
    </tbody></table>
  </b-table>
  <b-sublabel top="22">ნიმუშის სტრიქონების წაკითხვა</b-sublabel>
  <b-table>
    <table><thead>
    <tr><th>სტრიქონი</th><th>სიგნალი</th><th>რა ვქნათ</th></tr>
    </thead><tbody>
    <tr><td>Hana Sato</td><td>სიხშირეები ემთხვევა · $438 კოდზე · <b-select-pill tone="green">მზადაა</b-select-pill></td><td>კოდზე ყველაზე დიდი ხარჯი: საუბარი მისი ბოლო ამოცანის შესახებ აჩვენებს, ჰყოფნის თუ არა მიმდინარე ინსტრუმენტი</td></tr>
    <tr><td>Luis Moreno</td><td><b-match-mark kind="diff">≠</b-match-mark> ამბობს „რეგულარულად“, სინამდვილეში ყოველკვირა</td><td>დააზუსტეთ: რომელ ამოცანებს თვლის AI-ით მუშაობად</td></tr>
    <tr><td>Pavel Novak</td><td><b-match-mark kind="diff">≠</b-match-mark> „რეგულარულად“ ნულოვანი ტოკენებით</td><td>დააზუსტეთ: რომელ ინსტრუმენტებს იყენებს და რომელი ამოცანებისთვის</td></tr>
    <tr><td>Mira Castellano</td><td><b-select-pill tone="yellow">ნაწილობრივ</b-select-pill></td><td>გაუგზავნეთ ერთი დამაზუსტებელი შეტყობინება: ამოცანის რომელ ადგილას მოუწია ხელით დასრულება</td></tr>
    <tr><td>Ben Ortiz</td><td><b-select-pill tone="cyan">პასუხს ველოდებით</b-select-pill> · Codex only · $64</td><td>გაუგზავნეთ შეხსენება: მის გარეშე ჯგუფი „Codex only“ ცარიელი დარჩება</td></tr>
    <tr><td>Sara Quinn</td><td><b-select-pill tone="red">უარი თქვა</b-select-pill></td><td>ჩაანაცვლეთ <a href="/blog/who-to-interview-before-buying-ai-tools/#teams">ჩანაცვლების წესით</a>: ჯგუფ „Inactive“-ის შემდეგი კანდიდატით</td></tr>
    <tr><td>Elif Demir</td><td><b-select-pill tone="gray">მიმდინარეობს</b-select-pill> · 7 აქტიური პროექტი</td><td>დანიშნეთ ზარი; საკუთარი თქმით სიხშირე საუბრის შემდეგ შეავსეთ</td></tr>
    </tbody></table>
  </b-table>
  <b-sublabel top="22">საკუთარი თქმით და მონაცემებით: რა დავაზუსტოთ ინტერვიუზე</b-sublabel>
  <b-vs-grid>
    <h>რა იზომება ინტერვიუზე</h>
    <h>წყვილი ანგარიშში</h>
    <h>თუ განსხვავდება, დააზუსტეთ</h>
    <c><b>რა სიხშირით იყენებს</b></c>
    <c><a href="/blog/chatgpt-enterprise-usage-report/#depth">ყოველკვირეული აქტივობა</a></c>
    <c>რომელ ინსტრუმენტებს იყენებს ადამიანი და რომელი ამოცანებისთვის</c>
    <c><b>ძირითადი ამოცანა</b></c>
    <c><a href="/blog/chatgpt-enterprise-usage-report/#main-tool">ძირითადი ინსტრუმენტი</a></c>
    <c>რომელ ამოცანებს თვლის ადამიანი AI-ით მუშაობად</c>
    <c><b>რამდენ ამოცანას მოიცავს</b></c>
    <c><a href="/blog/chatgpt-enterprise-usage-report/#projects">პროექტების რაოდენობა</a></c>
    <c>რომელი პროექტებია ცოცხალი და რომელი ამოცანებისთვის</c>
    <c><b>კიდევ რას იყენებს</b></c>
    <c><a href="/blog/chatgpt-enterprise-usage-report/#connectors">კონექტორები</a></c>
    <c>რა ინსტრუმენტებია ეს და რომელი ამოცანებისთვის; ჩაიწერეთ ისინი როგორც მუშაობის გზა</c>
    <c><b>რამდენ დროს ზოგავს</b></c>
    <c>წყვილი არ არის</c>
    <c>მხოლოდ საკუთარი თქმით</c>
  </b-vs-grid>
  <b-cap>მონაცემების საზღვრები: ანგარიში მხოლოდ კორპორატიულ ინსტრუმენტს ხედავს და მხოლოდ 3 თვის განმავლობაში. პირადი ანგარიშები და სხვა ინსტრუმენტები მასში არ ჩანს, ამიტომ შეუსაბამობა დასაზუსტებელი კითხვაა და არა დასკვნა.</b-cap>
  <b-sublabel top="22">16 მოწვეულის სტატუსები</b-sublabel>
  <b-share-bar kind="status" label="სტატუსების განაწილება">
    <seg w="9" color="pg" ink="pg-i">მზადაა · 9</seg>
    <seg w="2" color="py" ink="py-i">2</seg>
    <seg w="2" color="pc" ink="pc-i">2</seg>
    <seg w="2" color="pn" ink="pn-i">2</seg>
    <seg w="1" color="pr" ink="pr-i">1</seg>
  </b-share-bar>
  <b-legend>
    <item color="pg">მზადაა</item>
    <item color="py">ნაწილობრივ</item>
    <item color="pc">პასუხს ველოდებით</item>
    <item color="pn">მიმდინარეობს</item>
    <item color="pr">უარი თქვა</item>
  </b-legend>
  <b-finding>
    <ex>16 მოწვეულიდან 9-მა მისცა ინტერვიუ: „მზადაა“-ს წილი 56%-ია. Pavel Novak-ის საკუთარი თქმით სიხშირე ანგარიშს არ ემთხვევა.</ex>
    <gen>ერთი სტრიქონი თითო ადამიანზე ერთად ინახავს ანგარიშის მონაცემებს, ფორმატს, ნედლ საუბარს და სტატუსს. სტატუსები აჩვენებს, საკმარისი ადამიანი გვყავს თუ არა: „მზადაა“-ს წილი მოწვეულებს შორის გვეუბნება, რამდენი უნდა მოვიწვიოთ, რომ თითოეულ ჯგუფს საჭირო რაოდენობის ინტერვიუ ჰქონდეს. სხვაობა საკუთარ თქმით და გაზომილ გამოყენებას შორის დასაზუსტებელი კითხვაა: ანგარიში მხოლოდ კორპორატიულ ინსტრუმენტს ხედავს 3 თვის განმავლობაში.</gen>
    <do>სტატუსი განაახლეთ ყოველი საუბრის შემდეგ. თითოეულ ჯგუფში ინტერვიუების საჭირო რაოდენობა შეინარჩუნეთ: „მზადაა“-ს 56%-იანი წილით თითო ჯგუფზე ორი ინტერვიუსთვის ოთხი ადამიანი მოიწვიეთ. ყველას, ვისაც „ნაწილობრივ“ აქვს, გაუგზავნეთ ერთი დამაზუსტებელი შეტყობინება.</do>
  </b-finding>
</b-chapter>
<b-chapter id="wording" icon="lines" title="ტექსტი: ფორმულირება">
  <b-why>ჩატში ან კითხვარში ხელახლა კითხვა რთულია, ამიტომ ცუდად ჩამოყალიბებული კითხვა პასუხს აფუჭებს და გამოსწორების შანსი აღარ რჩება. ხუთი გავრცელებული შეცდომა:</b-why>
  <b-question-pairs>
    <pair tag="წამყვანი" bad="რამდენად მოსახერხებელია თქვენთვის ინსტრუმენტი?">აღწერეთ ბოლო სამუშაო ამოცანა, რომელმაც შესამჩნევი დრო წაგართვათ.</pair>
    <pair tag="პროვოკაციული" bad="რატომ არ იყენებთ ინსტრუმენტს, თუ კომპანია მას იხდის?">როგორ შეასრულეთ ამ სახის ბოლო ამოცანა? რომელი ვარიანტები განიხილეთ?</pair>
    <pair tag="ფუნქციის თხოვნა" bad="რა ფუნქციები გაკლიათ?">ბოლო ამოცანის რომელ მომენტში მოგიწიათ სამუშაოს ხელით დასრულება?</pair>
    <pair tag="ჰიპოთეტური" bad="უფრო მეტს გამოიყენებდით, აგენტი რომ ჰქონოდა?">რა გააკეთეთ ბოლოს, როცა შედეგი თქვენთვის არ გამოდგა?</pair>
    <pair tag="ორმაგი" bad="რას აკეთებთ ინსტრუმენტში და რა სიხშირით?">რა იყო ბოლო ამოცანა, რომელიც AI-ით შეასრულეთ?</pair>
  </b-question-pairs>
  <b-finding>
    <ex>ხუთივე გასწორებული კითხვა წარსულ ეპიზოდზე კითხულობს.</ex>
    <gen>კითხვები მოხერხებულობაზე, ფუნქციებზე და მომავალზე აზრებს აგროვებს. შესყიდვის გადაწყვეტილება ეყრდნობა იმას, რაც ადამიანებმა უკვე გააკეთეს, ამიტომ კარგი კითხვა კონკრეტულ წარსულ შემთხვევას ეხება.</gen>
    <do>თავიდან წაიკითხეთ ჩატისა და კითხვარის კითხვები და ყოველი კითხვა, რომელშიც არის „მოსახერხებელი“, „გინდოდათ თუ არა“ ან „რა ფუნქციები“, გადააკეთეთ კითხვად ბოლო სამუშაო ამოცანაზე.</do>
  </b-finding>
</b-chapter>
<b-chapter id="agent" icon="terminal" title="ცხრილის შევსება Claude Code-ით">
  <b-why>მთელი ცხრილის აგენტისთვის გადაცემა შეიძლება: Claude Code ან MCP-ის მხარდამჭერი ნებისმიერი სხვა აგენტი უერთდება Airtable-ს და თავად ქმნის სტრიქონებს, იღებს ანგარიშის მონაცემებს და აანალიზებს საუბრებს.</b-why>
  <b-pipe label="აგენტი ავსებს ცხრილს">
    <node icon="terminal" color="c-code" sub="ან MCP-ის მხარდამჭერი ნებისმიერი აგენტი"><b-ink-link href="https://code.claude.com/docs" plain>Claude Code</b-ink-link></node>
    <node icon="plug" color="c-light" sub="კითხულობს და წერს ცხრილში">Airtable MCP</node>
    <node icon="table" color="c-proj" sub="ყველა ველი და სტატუსი">Airtable</node>
  </b-pipe>
  <b-todo top="12">
    <item t="სტრიქონების შექმნა">ინტერვიუებისთვის შერჩეული ადამიანების სიიდან: სახელი, ჯგუფი, სტატუსი</item>
    <item t="ანგარიშის მონაცემების ჩამოტვირთვა">ტოკენები, $, აქტივობა, სიხშირე ანგარიშით</item>
    <item t="Notes-ის ანალიზი">იგივე პრომპტით, რაც ChatGPT-ში: ველები, სირთულეები, საკუთარი თქმით სიხშირე, ციტატები</item>
    <item t="სტატუსების განახლება">„ნაწილობრივ“ (არასრული პასუხი), თუ ანალიზში არის „მონაცემები არ არის“</item>
  </b-todo>
  <b-tool-links>
    <item href="https://support.airtable.com/docs/using-the-airtable-mcp-server" icon="external" sub="როგორ დავაკავშიროთ">Airtable MCP</item>
  </b-tool-links>
  <b-finding>
    <ex>აგენტი ქმნის სტრიქონებს, იღებს ანგარიშს, აანალიზებს Notes-ს და ანახლებს სტატუსებს: ოთხი ნაბიჯი ხელით შეყვანის გარეშე.</ex>
    <gen>MCP-ით აგენტი ცხრილთან უშუალოდ მუშაობს, მკვლევარს კი საუბრები და დასკვნების ციტატებთან შემოწმება რჩება. აგენტისა და ChatGPT-ის ერთი ანალიზის პრომპტი სტრიქონებს შესადარებელს ინახავს.</gen>
    <do>დააკავშირეთ Airtable MCP Claude Code-თან და დაიწყეთ ერთი ბრძანებით: „შექმენი სტრიქონები სიაში მყოფი ადამიანებისთვის სტატუსით „მიმდინარეობს““.</do>
  </b-finding>
</b-chapter>
<b-chapter id="form" icon="doc-lines" title="კითხვარი">
  <b-why>კითხვარი ინტერვიუების შემდეგ იწერება, როცა უკვე ცნობილია, რომელი ამოცანები და სირთულეები გვხვდება. ის მთელ კომპანიას ეგზავნება, რომ გაირკვეს, რამდენად გავრცელებულია ისინი. კითხვები მოკლეა, პასუხის ვარიანტები კი ინტერვიუების ანალიზიდან მოდის.</b-why>
  <b-survey>
    <q t="ამ ამოცანებიდან რომელს ასრულებთ სამსახურში?" color="c-proj" tag="ამოცანები">არჩევანი: ამოცანები ინტერვიუებიდან · სხვა, ღია ველი</q>
    <q t="რა სიხშირით ასრულებთ ამ ამოცანებს?" color="c-proj" tag="ამოცანების სიხშირე">არჩევანი: ყოველდღე · ყოველკვირა · უფრო იშვიათად · არ ვასრულებ</q>
    <q t="რომელ ინსტრუმენტებს იყენებთ მათთვის?" color="c-proj" tag="ინსტრუმენტები">არჩევანი: ChatGPT · Claude · Cursor · სხვა AI ინსტრუმენტი · AI-ს არ ვიყენებ</q>
    <q t="რომელ სირთულეებს აწყდებით ამ ამოცანებში?" color="c-proj" tag="სირთულეები">არჩევანი: სირთულეები ინტერვიუებიდან · არცერთს არ ვაწყდები · სხვა, ღია ველი</q>
    <q t="რა სიხშირით გიშლით ხელს ეს სირთულე?" color="c-proj" tag="სირთულის სიხშირე">არჩევანი: თითქმის ყოველ ამოცანაში · ხანდახან · იშვიათად</q>
    <q t="რამდენად მნიშვნელოვანია ის შედეგისთვის?" color="c-proj" tag="გავლენა">არჩევანი: ძლიერ ხელს მიშლის · მიშლის ხელს · თითქმის არ აქვს მნიშვნელობა</q>
    <q t="როგორ ახერხებთ ახლა ამ სირთულის გვერდის ავლას?" tag="გვერდის ავლის გზები">ღია ველი · არ ვუვლი გვერდს</q>
    <q t="კიდევ რა არის მნიშვნელოვანი, რაც კითხვებმა გამოტოვა?" tag="გამოტოვებული">ღია ველი</q>
  </b-survey>
  <b-finding>
    <ex>რვა მოკლე კითხვა: ექვსი არჩევანით, ინტერვიუებიდან აღებული ვარიანტებით, და ორი ღია ველი.</ex>
    <gen>ინტერვიუები აჩვენებს, რომელი ამოცანები და სირთულეები არსებობს; კითხვარი აჩვენებს, რამდენს ეხება ისინი და რამდენად უშლის ხელს. ვარიანტები „არცერთს არ ვაწყდები“, „AI-ს არ ვიყენებ“ და ღია ველი იჭერს იმას, რაც ინტერვიუებმა გამოტოვა.</gen>
    <do>შეაგროვეთ პასუხის ვარიანტები ინტერვიუების ანალიზიდან და კითხვარი მთელ კომპანიას გაუგზავნეთ. დათვალეთ, ადამიანების რა წილი აწყდება თითოეულ სირთულეს, რა სიხშირით და რამდენად უშლის ხელს. ეს წილები ანგარიშის <a href="/blog/chatgpt-enterprise-usage-report/#decision">გადაწყვეტილების პროცედურას</a> კვებავს.</do>
  </b-finding>
</b-chapter>
<b-chapter id="after" icon="bulb" title="ინტერვიუების ანალიზი: ანალიზის პრომპტი და შედარება ანგარიშის მონაცემებთან">
  <b-steps round>
    <step t="Notes-ის ტექსტი ChatGPT-ს გადაეცით">ყველა ინტერვიუზე ერთი და იმავე პრომპტით</step>
    <step t="ChatGPT-ის პასუხი გადაიტანეთ ადამიანის სტრიქონში">ამოცანა, კონტექსტი, არჩეული გზა, შედეგი, ძალისხმევა, შეზღუდვები, სირთულეები, საკუთარი თქმით სიხშირე</step>
    <step t="ცხრილი დააჯგუფეთ სირთულის მიხედვით">ერთი და იმავე სირთულის მქონე ადამიანები გვერდიგვერდ ხვდებიან: ჩანს, რამდენია ისინი და რომელი ჯგუფებიდან</step>
    <step t="შეამოწმეთ კითხვარით">განმეორებები მთელი კომპანიის კითხვარში პასუხის ვარიანტებად იქცევა; გუნდების მიხედვით განაწილება ედარება <a href="/blog/chatgpt-enterprise-usage-report/#uniformity">ერთგვაროვნებას</a></step>
  </b-steps>
  <b-subhead>პრომპტი ინტერვიუს ანალიზისთვის</b-subhead>
  <b-prompt>
    Below is a conversation with an employee about their work tasks.
    Return strictly by field, only what the person said themselves:
    1. Task: the last specific work task
    2. Context: for whom and why, what means they had
    3. Chosen tool or way, and why
    4. Result
    5. Effort: time and manual rework
    6. Constraints: data, access, security
    7. Difficulties: categories from the list {categories from the report's sign table} or "no difficulties"; if none fits, a new category in your own words
    8. Self-reported frequency: weekly / regularly / occasionally / doesn't use / unknown
    9. 1–2 verbatim quotes
    If something is not in the conversation, write "no data" and don't make it up.

    {text from Notes}
  </b-prompt>
  <b-gauge label="რა ვუყოთ განმეორებას">
    <row k="1 ადამიანი" w="15%" color="c-none">შემთხვევა</row>
    <row k="მეორდება რამდენიმეში" w="45%" color="c-light">შევამოწმოთ კითხვარით</row>
    <row k="კითხვარმა დაადასტურა" w="100%" color="c-work">გადაწყვეტილების პროცედურაში</row>
  </b-gauge>
  <b-finding>
    <ex>სირთულე ერთი ადამიანისთვის შემთხვევაა; რამდენიმეს შორის განმეორება კი კითხვარით შემოწმების მიზეზი.</ex>
    <gen>ანალიზი მთელ ამოცანას ინახავს და არა მხოლოდ სირთულეს: კონტექსტის, არჩეული გზისა და ძალისხმევის გარეშე ვერ გაიგებთ, სჭირდება თუ არა ახალი ინსტრუმენტი. განმეორება ინტერვიუებში გვიჩვენებს, რა უნდა შევამოწმოთ და არა იმას, რამდენი ადამიანი აწყდება მას: ამას მხოლოდ კითხვარი აჩვენებს. ერთი პრომპტი ყველა საუბრისთვის ველებს შესადარებელს ინახავს, ხოლო „მონაცემები არ არის“ ChatGPT-ს ამოცანის გამოგონებაში უშლის ხელს.</gen>
    <do>როცა რამდენიმე ანალიზი დაგროვდება, ცხრილი დააჯგუფეთ სირთულის მიხედვით და განმეორებები <a href="#form">კითხვარის</a> პასუხის ვარიანტებში გადაიტანეთ. „სირთულეები არ არის“ შედეგად ჩაიწერეთ. კატეგორიები ანგარიშის <a href="/blog/chatgpt-enterprise-usage-report/#signs">ნიშნების ცხრილიდან</a> აიღეთ და ახლები დაამატეთ, თუ არცერთი არ ესადაგება. პილოტის შესახებ გადაწყვეტილება ანგარიშის <a href="/blog/chatgpt-enterprise-usage-report/#decision">პროცედურას</a> მიჰყვება.</do>
  </b-finding>
  <b-sublabel top="22">ხშირი კითხვები</b-sublabel>
  <b-qa>
    <q t="როგორ გავაანალიზოთ ინტერვიუ ChatGPT-ით">Notes ველის საუბრის ტექსტი ChatGPT-ს ყოველ ინტერვიუზე ერთი და იმავე პრომპტით გადაეცემა. პასუხი ადამიანის სტრიქონში კოპირდება: ამოცანა, კონტექსტი, მეთოდი, შედეგი, დანახარჯები, შეზღუდვები, სირთულეები, სიხშირე საკუთარი თქმით. შემდეგ ცხრილი სირთულის მიხედვით ჯგუფდება.</q>
    <q t="შეუძლია თუ არა აგენტს ინტერვიუს ანალიზი">კი. Claude Code ან MCP-ის მხარდამჭერი სხვა აგენტი უერთდება Airtable-ს, ქმნის სტრიქონებს, იღებს ანგარიშის მონაცემებს და Notes-ს იმავე პრომპტით აანალიზებს. მკვლევარს საუბრები რჩება და დასკვნების ციტატებთან შემოწმება.</q>
    <q t="როგორ შევადაროთ ადამიანების სიტყვები მონაცემებს">ცხრილში ორი ველია: სიხშირე საკუთარი თქმით და სიხშირე ანგარიშით, მათ გვერდით კი შეუსაბამობის ნიშანი. შეუსაბამობას ადამიანთან განიხილავენ და ჩუმად არ ასწორებენ.</q>
    <q t="როგორ გავაანალიზოთ ზარები და ტექსტური პასუხები ერთად">ტექსტური საუბარი იმავე Notes ველში კოპირდება თითოეული შეტყობინების დროით. ტექსტური პასუხები შემთხვევებისა და თემების მოსაძებნად გამოდგება, მაგრამ ზარებთან გათანაბრებული არ არის.</q>
  </b-qa>
</b-chapter>
<b-chapter id="faq" icon="chat" title="ხშირად დასმული კითხვები">
  <b-faq-cards>
    <q t="როგორ ჩავატაროთ 30-წუთიანი ინტერვიუ AI-თან მუშაობაზე?">საუბარი ააგეთ ბოლო რეალურ ამოცანაზე: რა გაკეთდა, რა შედეგი მივიღეთ და რა დაჯდა, შემდეგ წარმატება და შემთხვევა, როცა ადამიანმა AI მიატოვა.</q>
    <q t="ზარი თუ ტექსტი?">ფორმატს ადამიანი ირჩევს. ზარი დეტალურ ამბავს გვაძლევს დაზუსტებებით, ტექსტი მოკლე პასუხებს, ამიტომ ტექსტური პასუხები ზარებთან გათანაბრებული არ არის.</q>
    <q t="როგორ გავაანალიზოთ ინტერვიუები ChatGPT-ით?">საუბრის ტექსტი ChatGPT-ს ყოველ ინტერვიუზე ერთი და იმავე პრომპტით გადაეცით და პასუხი ადამიანის სტრიქონში Airtable-ში დააკოპირეთ.</q>
    <q t="როგორ შევამოწმოთ ადამიანების სიტყვები მონაცემებთან?">ცხრილში გვერდიგვერდ ორი ველია: სიხშირე საკუთარი თქმით და სიხშირე ანგარიშიდან. სხვაობები ადამიანთან განიხილება.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="დამატებით წასაკითხი">
  <b-links cols="2">
    <item href="/blog/chatgpt-enterprise-usage-report/" k="ანგარიში" t="ChatGPT Enterprise-ის გამოყენების ანგარიში">ვინ იყენებს, რომელი ამოცანებისთვის და რომელი ინსტრუმენტები ვიყიდოთ შემდეგ</item>
    <item href="/blog/who-to-interview-before-buying-ai-tools/" k="ნიმუში" t="ვის გამოვკითხოთ">ვის მოვიწვიოთ ინტერვიუზე</item>
  </b-links>
</b-chapter>
<b-footer>ინტერვიუების დიზაინი <a href="https://t.me/Kseniya_Vasil" target="_blank" rel="noopener">@Kseniya_Vasil</a>-ის რეკომენდაციებს ეფუძნება. მაგალითებში ყველა სახელი, გუნდი და რიცხვი გამოგონილია.</b-footer>
</b-post>
