---
title: როგორ ამოწმებს Claude Code საიტს თქვენს ბრაუზერში: Claude in Chrome — გამართვა და ფორმები თქვენი ავტორიზაციით
date: 2026-10-05
updated: 2026-11-08
description: Claude in Chrome აკავშირებს Claude Code-ს ბრაუზერთან: აგენტი ხსნის ჩანართებს, კითხულობს კონსოლს, უშვებს სცენარებს და ავსებს ფორმებს თქვენი ავტორიზაციით. როგორ დავაკავშიროთ, რას აკეთებს და რა ნებართვები მივცეთ.
tags: AI, აგენტები, Claude Code, Claude in Chrome, ბრაუზერი, QA, harness
category: harness
layout: wide
mentions: Claude in Chrome, Claude Code, Chrome extension, browser automation, MCP, permissions, QA, Puppeteer, token cost
toc: what=რა არის | connect=დაკავშირება | gives=რას აკეთებს | qa=მაგალითი | risks=ნებართვები და რისკები | tradeoff=მოქნილობის ფასი | custom=საკუთარი სკრიპტი | first=საიდან დავიწყოთ | faq=კითხვები | next=შემდეგი
---

Claude in Chrome აგენტს თქვენს ბრაუზერთან აკავშირებს: ის ხსნის ჩანართებს, კითხულობს გვერდებსა და კონსოლს, აწკაპუნებს და წერს თქვენი ავტორიზაციით. ქვემოთ: როგორ მუშაობს, როგორ დავაკავშიროთ რამდენიმე წუთში, რას აკეთებს აგენტი და რა ნებართვები მივცეთ. სტატიის [QA აგენტთან ერთად](/blog/bug-report-to-reproduction-agent/) აგენტი ამ არხს იყენებს, დაკავშირება კი [MCP](/blog/mcp-agent-access/)-ის მსგავსად მუშაობს.

<b-post series="harness">

<b-chapter id="what" icon="monitor" title="რა არის Claude in Chrome">
  <b-why>Chrome-ის გაფართოება Claude Code-ს ბრაუზერთან აკავშირებს. აგენტი ხსნის ახალ ჩანართებს და ხილულ ფანჯარაში მუშაობს<b-proof href="https://code.claude.com/docs/en/chrome" quote="Browser actions run in a visible Chrome window in real time."/>.</b-why>
  <iso-art name="claude-in-chrome/terminal-to-browser"></iso-art>
  <b-why align="left">სურათზე მარცხნიდან მარჯვნივ სამი მონაწილეა: Claude Code ტერმინალში, გაფართოება და თქვენი ბრაუზერი. აგენტი გაფართოებას ბრძანებებს აძლევს (გახსენი ჩანართი, დააწკაპუნე, წაიკითხე გვერდი), გაფართოება კი მათ ბრაუზერში ასრულებს, სადაც თქვენს სერვისებში უკვე შესული ხართ. ამიტომ აგენტს პაროლების აკრეფა არ სჭირდება: თქვენი სესია უკვე გახსნილია<b-proof href="https://code.claude.com/docs/en/chrome" quote="shares your browser's login state"/>. მუშაობა ხილულ ფანჯარაში მიმდინარეობს და ნაბიჯებს თვალს ადევნებთ.</b-why>
  <b-why align="left">ქვემოთ მოცემული ტეგები გვიჩვენებს, რომელ ბრაუზერებთან მუშაობს გაფართოება. Chrome და Edge ოფიციალურად არის მხარდაჭერილი<b-proof href="https://code.claude.com/docs/en/chrome" quote="Chrome integration works with Google Chrome and Microsoft Edge."/>. Brave, Arc, Vivaldi და Opera იმავე Chromium ძრავზეა აგებული: Claude Code მათში გაფართოებას პოულობს და უკავშირდება<b-proof href="https://code.claude.com/docs/en/chrome" quote="Claude Code also detects the extension and sets up the connection in other Chromium-based browsers"/>. ბოლო ტეგი, „WSL: no“, ნიშნავს, რომ ეს კავშირი Windows Subsystem for Linux-ში (WSL) არ მუშაობს<b-proof href="https://code.claude.com/docs/en/chrome" quote="Chrome integration isn't supported in Windows Subsystem for Linux (WSL)."/>.</b-why>
  <b-pills>
    <pill>Chrome</pill>
    <pill>Edge</pill>
    <pill>Brave</pill>
    <pill>Arc</pill>
    <pill>Vivaldi</pill>
    <pill>Opera</pill>
    <pill>WSL: no</pill>
  </b-pills>
  <b-finding>
    <ex>ტერმინალში მყოფი აგენტი გაფართოების მეშვეობით მართავს Chrome-ის ჩანართებს და თქვენს ავტორიზაციებს იყენებს.</ex>
    <gen>მოქმედებები ფანჯარაში რეალურ დროში ჩანს. ავტორიზაციის გვერდზე ან CAPTCHA-ზე აგენტი ჩერდება და თქვენ გელოდებათ. Claude Code-ში გაფართოება ჩანს, როგორც claude-in-chrome MCP სერვერი: /mcp ჩამოთვლის მის ინსტრუმენტებს.</gen>
    <do k="რა ვქნათ">შეამოწმეთ მოთხოვნები: გაფართოების ვერსია 1.0.36 ან უფრო ახალი<b-proof href="https://code.claude.com/docs/en/chrome" quote="version 1.0.36 or later"/>, Claude Code, Pro, Max, Team ან Enterprise ტარიფი<b-proof href="https://code.claude.com/docs/en/chrome" quote="A direct Anthropic plan (Pro, Max, Team, or Enterprise)"/> და შესვლა /login-ით<b-proof href="https://code.claude.com/docs/en/chrome" quote="Chrome integration also requires signing in with"/>.</do>
  </b-finding>
</b-chapter>

<b-chapter id="connect" icon="plug" title="როგორ დავაკავშიროთ">
  <b-say-agent title="უთხარით აგენტს">დააყენე Claude in Chrome და დააკავშირე Claude Code-თან.</b-say-agent>
  <b-why align="left">თუ გაფართოება არ არის, Claude Code დაყენებას გთავაზობთ<b-proof href="https://code.claude.com/docs/en/chrome" quote="Claude Code shows an install prompt titled"/>: თანხმდებით და ბრაუზერში შედიხართ. [თუ აგენტი ამას თქვენ გთხოვთ](/blog/agent-hands-work-back-to-you/).</b-why>
  <b-spoiler summary="როგორ გავაკეთოთ ხელით">
    <b-why align="left">დაკავშირება სამ ნაბიჯს მოიცავს. ნაბიჯი 1: Chrome-ში გაფართოებების მაღაზიიდან დააყენეთ Claude-ის გაფართოება, ერთხელ. ნაბიჯი 2: ტერმინალში, სადაც Claude Code მუშაობს, გაუშვით claude --chrome და აგენტი ბრაუზერს დაუკავშირდება. ნაბიჯი 3: აკრიფეთ /chrome და შეხედეთ სტატუსს: თუ წერია „Enabled“, კავშირი მუშაობს.</b-why>
    <iso-art name="claude-in-chrome/setup-steps"></iso-art>
    <b-codebox copy>
      claude --chrome
      /chrome   # status, permissions, reconnect
    </b-codebox>

<a href="https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn" target="_blank" rel="noopener">გაფართოება Chrome Web Store-ში</a>. რომ ფლაგი აღარ აკრიფოთ, გახსენით /chrome და ჩართეთ „Enabled by default“. მაშინ ბრაუზერის ინსტრუმენტები ყოველთვის კონტექსტში იქნება და ტოკენების ხარჯი გაიზრდება<b-proof href="https://code.claude.com/docs/en/chrome" quote="Enabling Chrome by default increases context usage since the browser tools and their instructions are always loaded."/>.

    <b-spoiler summary="თუ არ უკავშირდება">
      <b-node-grid min="170">
        <node icon="check" t="გაფართოება ჩართულია">chrome://extensions გვერდზე</node>
        <node icon="play" t="Chrome გაშვებულია">და Claude Code განახლებულია</node>
        <node icon="refresh-cw" t="ხელახლა დაკავშირება">ბრძანება /chrome, პუნქტი Reconnect extension</node>
        <node icon="monitor-screen" t="პირველად">დაყენების შემდეგ გადატვირთეთ Chrome</node>
      </b-node-grid>
    </b-spoiler>
  </b-spoiler>
  <b-finding>
    <ex>აგენტი გაფართოებას თავად აყენებს და Claude Code-თან აკავშირებს. თქვენ მხოლოდ თანხმდებით და ბრაუზერში შედიხართ.</ex>
    <gen>დაკავშირებას წუთები სჭირდება: გაფართოება Chrome Web Store-დან მოდის, დანარჩენს Claude Code აკეთებს.</gen>
    <do k="რა ვქნათ">უთხარით აგენტს, დააყენოს გაფართოება, და დარწმუნდით, რომ /chrome აჩვენებს „Status: Enabled“ და „Extension: Installed“<b-proof href="https://code.claude.com/docs/en/chrome" quote="The integration is working when the status panel shows"/>.</do>
  </b-finding>
</b-chapter>

<b-chapter id="gives" icon="grid-alt" title="რას აკეთებს აგენტი ბრაუზერში">
  <b-why align="left">სურათის ცენტრში ბრაუზერია, მის გარშემო კი ოთხი სახის სამუშაო, რომელსაც აგენტი მის შიგნით ასრულებს.</b-why>
  <iso-art name="claude-in-chrome/browser-uses"></iso-art>
  <b-why align="left">პირველი: კონსოლისა და გვერდის წაკითხვა, რითაც შეცდომის მიზეზი იპოვება. მეორე: სცენარების გაშვება და ფორმების შევსება, რითაც მოწმდება, მუშაობს თუ არა გზა. მესამე: დოკუმენტებთან მუშაობა თქვენი ავტორიზაციით, ანუ იმასთან, რაც შესვლის გარეშე არ იხსნება. მეოთხე: მონაცემების ამოღება და GIF-ის ჩაწერა, რათა შესამოწმებელი კვალი დარჩეს. ყოველ წვრილმანზე კოდის წერა არ გჭირდებათ: ამოცანას სიტყვებით აყალიბებთ და აგენტი ღილაკებსა და ველებს თავად პოულობს.</b-why>
  <b-finding>
    <ex>ერთი კავშირი ფარავს გამართვას, ტესტებს, ფორმებს, დოკუმენტებსა და მონაცემების ამოღებას.</ex>
    <gen>აგენტი კითხულობს კონსოლსა და DOM-ს, უშვებს სცენარებს, ავსებს ფორმებს, ტვირთავს ფაილებს (ჯამში 10 MB-მდე<b-proof href="https://code.claude.com/docs/en/chrome" quote="a single upload can include up to 10 MB of files in total"/>) და წერს GIF-ებს<b-proof href="https://code.claude.com/docs/en/chrome" quote="record browser interactions as GIFs"/>.</gen>
    <do k="რა ვქნათ">აირჩიეთ ერთი განმეორებადი ამოცანა ბრაუზერში და გადაეცით აგენტს.</do>
  </b-finding>
</b-chapter>

<b-chapter id="qa" icon="bug" title="მაგალითი: ბაგი სატესტო სტენდზე">
  <b-why>ტიკეტი PAY-142 სტატიიდან [QA-ს შესახებ აგენტთან ერთად](/blog/bug-report-to-reproduction-agent/): აგენტი გზას თავად გადის და მტკიცებულებებს მოაქვს.</b-why>
  <b-say-agent title="უთხარით აგენტს">გახსენი სატესტო სტენდი, დაამატე ნივთი კალათაში, გამოიყენე პრომოკოდი და გადაიხადე სატესტო ბარათით. თუ გადახდა ჩავარდა, ნახე კონსოლი და ჩაწერე გზის GIF.</b-say-agent>
  <b-why align="left">შემდეგი არის მაგალითი QA-ს სტატიიდან: ტიკეტი PAY-142 და აგენტის გზა მზა შედეგამდე.</b-why>
  <iso-art name="claude-in-chrome/ticket-to-report"></iso-art>
  <b-why align="left">სურათზე ნაჩვენებია გზა ტიკეტიდან შედეგამდე. ტიკეტი აგენტამდე აღწევს, აგენტი ბრაუზერში გადის კალათას, პრომოკოდსა და გადახდას, კონსოლში პოულობს შეცდომას და წერს GIF-ს. QA იღებს არა მოყოლას, არამედ შესამოწმებელ კვალს: კონსოლის ტექსტს და გვერდზე მოძრაობის ჩანაწერს. თუ ჩანაწერი და კონსოლი ანგარიშს არ ემთხვევა, ეს მაშინვე ჩანს.</b-why>
  <b-finding>
    <ex>აგენტი გზას გადის, კონსოლის შეცდომას პოულობს და ტიკეტისთვის GIF-ს წერს.</ex>
    <gen>ფანჯარა ხილულია, ამიტომ QA ნაბიჯებს თვალს ადევნებს და აგენტის გაჩერება შეუძლია. კონსოლის ტექსტი და GIF შესამოწმებელ კვალს ტოვებს.</gen>
    <do k="რა ვქნათ">ყოველ შედეგთან ითხოვეთ GIF და კონსოლის ამონარიდი.</do>
  </b-finding>
</b-chapter>

<b-chapter id="risks" icon="shield-check" title="ნებართვები და რისკები">
  <b-why align="left">აგენტი თქვენს ბრაუზერში მუშაობს, ამიტომ ყველაფერი, რაშიც შესული ხართ, მისთვის ხელმისაწვდომია. სურათზე დაცვის პირველი ხაზია დაშვებული საიტების სია და ახალ საიტებზე ნებართვის მოთხოვნა.</b-why>
  <iso-art name="claude-in-chrome/site-permissions"></iso-art>
  <b-why align="left">სურათის მარცხენა მხარეს თქვენ წყვეტთ: აგენტი კითხულობს „დავუშვა?“. ცენტრში A და B საიტებია, რომლებიც დაუშვით და სადაც აგენტი მუშაობს. მარჯვნივ C საიტია, აგენტისთვის დახურული. ახალ საიტზე მოქმედება თქვენი თანხმობით იწყება. ქვემოთ წესები სათითაოდ: რას ხედავს აგენტი, სად ჩერდება და რას უნდა დააკვირდეთ ჩანაწერის გაგზავნამდე.</b-why>
  <b-rules sw="1.8">
    <rule icon="lines" t="საიტები">გაფართოების პარამეტრები განსაზღვრავს, რომელ საიტებზე შეუძლია აგენტს დათვალიერება, წკაპუნი და წერა.</rule>
    <rule icon="bell" t="მოთხოვნა">დიალოგი „Claude in Chrome wants to“ დაუშვებს მოქმედებას ან მთელ საიტს სესიისთვის.</rule>
    <rule icon="key" t="თქვენი ავტორიზაციები">აგენტს შეუძლია მიწვდეს ყველაფერს, რაშიც ამ ბრაუზერში შესული ხართ.</rule>
    <rule icon="pause" t="ავტორიზაცია და CAPTCHA">აგენტი ჩერდება და თქვენ გელოდებათ.</rule>
    <rule icon="video" t="GIF">ჩანაწერში შედის ყველაფერი, რაც ჩანს, ანგარიშის მონაცემებიც: გაზიარებამდე გადახედეთ.</rule>
    <rule icon="ban" t="დიალოგები">alert, confirm და prompt დიალოგები ბრძანებებს ბლოკავს: დახურეთ ხელით და სთხოვეთ აგენტს გაგრძელება.</rule>
  </b-rules>
  <b-why align="left">თითოეული ეს წესი Claude Code-ის დოკუმენტაციაშია. აგენტი ჩერდება ავტორიზაციასა და CAPTCHA-ზე<b-proof href="https://code.claude.com/docs/en/chrome" quote="When Claude encounters a login page or CAPTCHA, it pauses and asks you to handle it manually."/>. ნებართვის მოთხოვნა იწყება სიტყვებით „Claude in Chrome wants to“<b-proof href="https://code.claude.com/docs/en/chrome" quote="The dialog starts with"/>. GIF-ის ჩაწერა იჭერს ყველაფერს, რაც ჩანს, ანგარიშის მონაცემებიც<b-proof href="https://code.claude.com/docs/en/chrome" quote="The recording captures everything visible in the browser, including account details on logged-in pages"/>. alert, confirm და prompt დიალოგები ბრძანებებს ბლოკავს<b-proof href="https://code.claude.com/docs/en/chrome" quote="JavaScript dialogs block browser events and prevent Claude from receiving commands."/>. საიტების სია გაფართოების პარამეტრებში მოიცემა<b-proof href="https://code.claude.com/docs/en/chrome" quote="Manage permissions in the Chrome extension settings to control which sites Claude can browse, click, and type on."/>.</b-why>
  <b-cap>გვერდის ტექსტი შეიძლება აგენტზე იყოს მიმართული. ეს რისკი განხილულია [ცალკე სტატიაში](/blog/data-plane-control-plane-prompt-injection/).</b-cap>
  <b-finding>
    <ex>დაშვებული საიტები აგენტისთვის ღიაა, დანარჩენი დახურული რჩება, ახალ საიტზე მოქმედებას კი თქვენი თანხმობა სჭირდება.</ex>
    <gen>აგენტი თქვენს ავტორიზაციებთან მუშაობს, ამიტომ საიტების ნებართვები დაცვის პირველი ხაზია.</gen>
    <do k="რა ვქნათ">გახსენით გაფართოების პარამეტრები და დატოვეთ მხოლოდ ის საიტები, რომლებიც ამოცანას სჭირდება.</do>
  </b-finding>
</b-chapter>

<b-chapter id="tradeoff" icon="scales" title="მოქნილობის ფასი: სკრიპტზე ნელია და შეცდომის რისკი აქვს">
  <b-why align="left">ბრაუზერში აგენტი სკრიპტისგან ან დაწერილი პროგრამისგან განსხვავებულად მუშაობს. სკრიპტი ერთსა და იმავე ნაბიჯებს სწრაფად და იდენტურად ასრულებს. აგენტი ყოველ ნაბიჯზე კითხულობს გვერდს, ფიქრობს და წყვეტს, რა გააკეთოს შემდეგ, ამიტომ უფრო ნელია და ტოკენებს ხარჯავს. შეიძლება შეცდეს: არასწორ ღილაკს დააჭიროს ან გვერდზე არარსებული რამ მოყვეს, ანუ [ჰალუცინაცია](/materials/glossary/hallucination/) მოახდინოს. სამაგიეროდ, ის ართმევს თავს ამოცანას, რომლის წინასწარ კოდში აღწერა შეუძლებელია: გვერდი შეიცვალა, ღილაკი გადაინაცვლა, ამოცანა სიტყვებითაა ჩამოყალიბებული. ეს მოქნილობის ფასია და ჯობია ის შეგნებულად გადაიხადოთ.</b-why>
  <b-table id="agent-vs-script">

| | სკრიპტი | აგენტი ბრაუზერში |
|---|---|---|
| სიჩქარე | სწრაფი, ერთი და იგივე ნაბიჯები | უფრო ნელი: ყოველ ნაბიჯზე კითხულობს და ფიქრობს |
| განმეორებადობა | ყოველთვის ერთი და იგივე შედეგი | პასუხი გაშვებიდან გაშვებამდე შეიძლება განსხვავდებოდეს |
| თუ გვერდი შეიცვალა | გასწორებამდე ტყდება | ეგუება, მაგრამ შეიძლება შეცდეს ან გამოიგონოს |
| მომზადება | კოდი უნდა დაიწეროს და შენახვა მოხდეს | ამოცანის სიტყვებით აღწერა საკმარისია |
| სად ერგება | მასობრივი რეგულარული სამუშაო | ერთჯერადი სამუშაო, დაზვერვა, უჩვეულო გვერდები |

  </b-table>
  <b-why align="left">არის ავტორის დაკვირვებაც. სერვისები, რომლებსაც ავტომატიზაციის მიმართ სიმკაცრის რეპუტაცია აქვთ, მაგალითად LinkedIn, რეალურ ბრაუზერში აგენტს ჩვეულებრივ უფრო მშვიდად უყურებენ, ვიდრე სკრიპტებსა და სკრეიპერებს: მოქმედებები თქვენი ფანჯრიდან მოდის, თქვენი ავტორიზაციით, ცოცხალი ადამიანის tempo-თი. ეს გარანტიას არ იძლევა. ასეთი სერვისების წესები ჩვეულებრივ ავტომატურ მოქმედებებს კრძალავს და ანგარიშის დაბლოკვის რისკი თქვენთან რჩება. ამიტომ აგენტს ის მიეცით, რასაც ხელით გააკეთებდით, მცირე ულუფებით და შედეგის შემოწმებით.</b-why>
  <b-cap>სიჩქარე, აგენტის შეცდომები და სერვისების რეაქცია აღწერილია ავტორის დაკვირვებებით: Claude Code-ის დოკუმენტაცია მათ არ მოიცავს.</b-cap>
  <b-finding>
    <ex>აგენტი სკრიპტზე ნელია და შეიძლება შეცდეს, მაგრამ იქ ართმევს თავს, სადაც სკრიპტი თავიდან უნდა დაიწეროს.</ex>
    <gen>სიჩქარე და განმეორებადობა მოქნილობაზე იცვლება. შესამოწმებელი კვალი (კონსოლი, GIF, შედეგის ტექსტი) შეცდომებზე კონტროლს აბრუნებს.</gen>
    <do k="რა ვქნათ">ერთჯერადი და უჩვეულო სამუშაოსთვის გამოიყენეთ აგენტი, მასობრივისა და რეგულარულისთვის დაწერეთ სკრიპტი. შეადარეთ აგენტის შედეგი იმას, რასაც თავად ხედავთ.</do>
  </b-finding>
</b-chapter>

<b-chapter id="custom" icon="boxes-route" title="როცა საკუთარი სკრიპტი გჭირდებათ">
  <b-why align="left">Claude in Chrome ერთჯერად სამუშაოს ერგება, მაგრამ საწარმოო ამოცანებისთვის ხშირად საკუთარი სკრიპტი გჭირდებათ.</b-why>
  <b-rules sw="1.8">
    <rule icon="code" t="Puppeteer">ბიბლიოთეკა, რომელიც ბრაუზერს კოდიდან მართავს: გახსენი გვერდი, დააწკაპუნე, ამოიღე რაც გჭირდება. მუშაობს აგენტის გარეშე ყოველ ნაბიჯზე.</rule>
    <rule icon="page-lines" t="მთელი გვერდი">Claude Code მთელ გვერდს იღებს: ტექსტს, ელემენტებს, სკრინშოტებს. ერთჯერადი ამოცანისთვის ეს მოსახერხებელია.</rule>
    <rule icon="coin" t="ტოკენები და სიჩქარე">რაც უფრო დიდია გვერდი, მით მეტი ტოკენი ჯდება ყოველი ნაბიჯი: უფრო ნელი და უფრო ძვირი.</rule>
    <rule icon="boxes-route" t="საკუთარი სკრიპტი">მორგებული გადაწყვეტა საიტის ან გვერდის მხოლოდ იმ ნაწილს იღებს, რაც გჭირდებათ: ცხრილს, ფორმას, ერთ ბლოკს. აგენტი მოკლე შედეგს იღებს.</rule>
    <rule icon="scales" t="რა აირჩიოთ">ერთჯერადი ამოცანები და კვლევა: Claude in Chrome. რეგულარული, დიდი მოცულობის სამუშაო ტოკენების ბიუჯეტით: საკუთარი სკრიპტი, რომელსაც აგენტი ინსტრუმენტად იძახებს.</rule>
  </b-rules>
  <b-cap>სკრიპტი აგენტს [MCP](/blog/mcp-agent-access/)-ით ან skill-ით შეიძლება დაუკავშირდეს: აგენტი ითხოვს გვერდის საჭირო ნაწილს და არა მთელის გახსნას.</b-cap>
  <b-finding>
    <ex>აგენტი მთელ გვერდს კითხულობს და მასზე ტოკენებსა და დროს ხარჯავს.</ex>
    <gen>საწარმოოში ტოკენები და სიჩქარე მნიშვნელოვანია, ამიტომ საიტებისა და გვერდების მხოლოდ საჭირო ნაწილები იღება.</gen>
    <do k="რა ვქნათ">ერთჯერადი სამუშაო დაუტოვეთ Claude in Chrome-ს. განმეორებადი სამუშაო Puppeteer-ის სკრიპტში გადაიტანეთ და აგენტს მიეცით.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="საიდან დავიწყოთ">
  <b-why align="left">სამი ნაბიჯი სტატიის დასაწყისს იმეორებს: გაფართოება, გაშვება, შემოწმება.</b-why>
  <iso-art name="claude-in-chrome/start-steps"></iso-art>
  <b-why align="left">პირველი გაშვებისთვის აიღეთ ლოკალური ან სატესტო სტენდი: თუ აგენტი შეცდა, არაფერი დაზიანდება. ჯერ სთხოვეთ მხოლოდ წაკითხვა (გახსენი გვერდი და მოყევი), შემდეგ დაუშვით მოქმედებები. ასე აგენტის შეცდომებს უსაფრთხო ამოცანაზე შეამჩნევთ.</b-why>
  <b-finding>
    <ex>სამი ნაბიჯი: გაფართოება, გაშვება, შემოწმება.</ex>
    <gen>დაიწყეთ ლოკალური სტენდით: იქ შეცდომა არაფერს ტეხავს.</gen>
    <do k="რა ვქნათ">დღესვე უთხარით აგენტს, დააყენოს გაფართოება და შეამოწმოს სტატუსი /chrome-ით.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="ხშირად დასმული კითხვები">
  <b-faq-cards>
    <q t="როგორ დავაკავშიროთ Claude in Chrome?">დააყენეთ გაფართოება Chrome Web Store-დან და დანარჩენს Claude Code გააკეთებს. ამას წუთები სჭირდება.</q>
    <q t="რას აკეთებს აგენტი ბრაუზერში?">კითხულობს კონსოლსა და გვერდის მარკაპს, გადის სცენარებს, ავსებს ფორმებს, ტვირთავს ფაილებს ჯამში 10 MB-მდე და წერს GIF-ებს.</q>
    <q t="უსაფრთხოა თუ არა აგენტისთვის ბრაუზერის მიცემა?">მოქმედებები ფანჯარაში რეალურ დროში ჩანს, ხოლო შესვლის გვერდზე ან captcha-ზე აგენტი ჩერდება და თქვენ გელოდებათ. ნებართვები და რისკები ცალკე არის განხილული სტატიაში.</q>
    <q t="როდის არის სკრიპტი უკეთესი?">ბრაუზერში აგენტი სკრიპტზე ნელია და შეიძლება შეცდეს. განმეორებადი შემოწმებისთვის, სადაც სიჩქარე და სიზუსტე მნიშვნელოვანია, დაწერეთ სკრიპტი.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="შემდეგი">
  <b-links>
    <item href="/blog/bug-report-to-reproduction-agent/" k="მაგალითი" t="QA-ს მუშაობა AI აგენტით მხარდაჭერის შემდეგ: კვლევა, აღწერა და დოკუმენტირება MCP-სა და skill-ებით">აგენტი Jira-ს ბაგს იმეორებს</item>
    <item href="/blog/mcp-agent-access/" k="დაკავშირება" t="MCP AI აგენტისთვის: რა პრობლემას წყვეტს და როგორ მივანდოთ დაკავშირება აგენტს">როგორ იღებს აგენტი წვდომას სისტემებზე</item>
    <item href="/blog/agent-hands-work-back-to-you/" k="გადაცემა" t="აგენტს უყვარს თქვენი შებმა: როგორ ვაიძულოთ, თავად გააკეთოს">როცა აგენტი ადამიანს დახმარებას სთხოვს</item>
  </b-links>
</b-chapter>
<b-footer>ტიკეტი PAY-142 მაგალითისთვისაა გამოგონილი. დაკავშირებისა და ნებართვების ფაქტები Claude Code-ის დოკუმენტაციას ეფუძნება: <a href="https://code.claude.com/docs/en/chrome" target="_blank" rel="noopener">Use Claude Code with Chrome</a>.</b-footer>
</b-post>
