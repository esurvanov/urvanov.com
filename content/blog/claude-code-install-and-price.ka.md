---
title: Claude Code: დაყენება და ფასები, ტარიფები და ხელმისაწვდომობა ქვეყნების მიხედვით
seoTitle: Claude Code: დაყენება და ფასები 2026, ტარიფები და წვდომა
date: 2026-11-17
updated: 2026-11-18
description: Claude Code-ის დაყენება Mac-ზე, Linux-ზე და Windows-ზე; რას მოიცავს Pro, Max, Ultra და Team, სჭირდება თუ არა API-გასაღები და მუშაობს თუ არა რუსეთში.
tags: AI, Claude Code, დაყენება, ფასები, ტარიფები, harness
category: harness
layout: wide
mentions: Claude Code, OpenCode, Codex, Cursor, Gemini CLI, Antigravity CLI, CLAUDE.md
toc: answer=მოკლე პასუხი | what=რა არის | install=დაყენება | login=პირველი გაშვება | plans=ტარიფები | check=შემოწმება | errors=შეცდომები | region=ხელმისაწვდომობა | alt=ალტერნატივები | prompts=მოთხოვნები | faq=კითხვები | next=დამატებით წასაკითხი
---

Claude Code ერთი ტერმინალის ბრძანებით დგება: macOS-ზე, Linux-ზე და WSL-ში `curl -fsSL https://claude.ai/install.sh | bash`, Windows-ზე PowerShell-ში `irm https://claude.ai/install.ps1 | iex`. შესასვლელად საჭიროა ფასიანი გამოწერა: Claude Pro თვეში 20 დოლარად, Max, Ultra, Team ან Enterprise, ან Console-ის ანგარიში, რომელიც API-ის გამოყენებით იხდის; უფასო ტარიფზე ის არ მუშაობს.

<b-post series="harness">
<b-chapter id="answer" title="მოკლე პასუხი" icon="crosshair">
  <b-why>დაყენებას ერთი ბრძანება სჭირდება, შესვლა კი ბრაუზერში ხდება. ფასიანი წვდომა ყოველთვის საჭიროა: გამოწერა ან API-ის გადახდა<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Claude Code requires a Pro, Max, Ultra, Team, Enterprise, or Console account. The free claude.ai plan does not include Claude Code access» — code.claude.com/docs/en/setup"/>.</b-why>

  <iso-art name="claude-code-install-and-price/install-flow"></iso-art>
  <b-cap>გზა ცარიელი ტერმინალიდან პირველ პასუხამდე: გახსენით ტერმინალი, ჩასვით ბრძანება, გახსენით ახალი ფანჯარა, შეამოწმეთ ვერსია, შედით ანგარიშში.</b-cap>
  <b-sublabel top="18">რას ნიშნავს ეს მარტივად</b-sublabel>

  Claude Code არის პროგრამირების აგენტი კომპანია Anthropic-ისგან, რომელიც Claude-ს ქმნის. ის ტერმინალში მუშაობს, ანუ ფანჯარაში, სადაც ტექსტურ ბრძანებებს წერთ, კითხულობს თქვენი პროექტის ფაილებს და ცვლის მათ, რომ თქვენი დავალება შეასრულოს. დგება ერთი ბრძანებით: აკოპირებთ თქვენი სისტემის ხაზს, ათავსებთ ტერმინალში და ელოდებით. შემდეგ ტერმინალს თავიდან ხსნით, ამოწმებთ ვერსიას და ბრაუზერის საშუალებით შედიხართ Claude-ის ანგარიშში. წვდომა ფასიანია: გჭირდებათ გამოწერა ან ანგარიში, რომელიც API-ის გამოყენებით იხდის. უფასო Claude-ის ჩატის ტარიფი უფასოდ რჩება, მაგრამ Claude Code მასში არ შედის.

  ყოველდღიური მაგალითი. ლუკა ლისაბონში ცხოვრობს და Ubuntu-იან ლეპტოპზე მუშაობს. ის ტერმინალს ხსნის და macOS-ის, Linux-ისა და WSL-ის ბრძანებას ათავსებს. დამყენებელი რამდენიმე წუთი არაფერს აჩვენებს, ლუკა კი ფანჯარას არ ხურავს. შემდეგ ახალ ტერმინალს ხსნის, წერს <code>claude --version</code> და ხედავს ვერსიის ნომერს წარწერით „(Claude Code)“. რჩება შესვლა: ლუკა პროექტის საქაღალდეში უშვებს <code>claude</code>-ს, ბრაუზერი შესვლის გვერდს ხსნის და ის Pro გამოწერით შედის. პორტუგალია Anthropic-ის ქვეყნების სიაშია, ამიტომ რეგიონი ხელს არ უშლის.

  გავრცელებული შეცდომა: Claude Code-ის დაყენება მხოლოდ უფასო ჩატის ანგარიშით. დაყენება შედგება, მაგრამ შესვლა აგენტზე წვდომას არ მოგცემთ: უფასო ტარიფში Claude Code არ შედის. დაყენებამდე გადაწყვიტეთ, როგორ გადაიხდით: Pro, Max, Ultra, Team ან Enterprise გამოწერით, თუ API-ის გადახდით Console-ის გავლით.

  პასუხს დაყენებისთანავე შეამოწმებთ: ბრძანება <code>claude --version</code> ბეჭდავს ვერსიის ნომერსა და „(Claude Code)“-ს. ფასები და პირობები შევამოწმე <a href="https://claude.com/pricing">Claude-ის ფასების გვერდზე</a> და <a href="https://code.claude.com/docs/en/setup">Claude Code-ის დაყენების გვერდზე</a>.
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>კითხვა</th><th>პასუხი 18.11.2026-ის მდგომარეობით</th></tr>
    </thead>
    <tbody>
      <tr><td>როგორ დავაყენოთ</td><td>ერთი ბრძანება: ერთი macOS-ისთვის, Linux-ისა და WSL-ისთვის, მეორე Windows-ის PowerShell-ისთვის ან CMD-სთვის</td></tr>
      <tr><td>ფასი</td><td>Pro თვეში 20 დოლარი, Max 100, Ultra 200; Team ერთ ადგილზე 25 დოლარიდან<b-proof href="https://claude.com/pricing" quote="Claude: Pro «$20 if billed monthly», Max «$100», Ultra «$200», Team standard seat «$25 if billed monthly» — claude.com/pricing"/></td></tr>
      <tr><td>რომელ ტარიფში შედის</td><td>Claude Code შედის Pro-ში, Max-ში, Ultra-ში, Team-სა და Enterprise-ში; უფასო ტარიფში Claude Code არ არის</td></tr>
      <tr><td>ხელმისაწვდომობა</td><td>რუსეთი Anthropic-ის ოფიციალურ ქვეყნების სიაში არ არის; პირობებში Claude Code ამ შეზღუდვის მქონე პროდუქტებშია დასახელებული<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported» — anthropic.com/supported-countries"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>შემოწმების თარიღი: 18.11.2026. ფასები და ქვეყნების სია იცვლება: გადახდამდე Anthropic-ის გვერდები ხელახლა გახსენით.</b-cap>
</b-chapter>
<b-chapter id="what" title="რა არის Claude Code" icon="terminal">
  <b-why>Claude Code არის პროგრამირების აგენტი Anthropic-ისგან. ის კითხულობს თქვენს პროექტს, ცვლის ფაილებს, უშვებს ბრძანებებსა და ტესტებს და git-თან მუშაობს. ჩატის ჩვეულებრივი Claude ტექსტით გპასუხობთ, Claude Code კი პროექტის ფაილებს თავად ცვლის.</b-why>

  <iso-art name="term:claude-code"></iso-art>
  <b-links cols="1">
    <item href="/materials/glossary/claude-code/" k="ტერმინი" t="Claude Code">რას აკეთებს, სად მუშაობს, რომელ მოდელებს იყენებს</item>
  </b-links>
  <b-sublabel top="18">რას ნიშნავს ეს მარტივად</b-sublabel>

  აგენტი სამუშაოს თავად აკეთებს: დავალებას სიტყვებით აღწერთ, ის კი ხსნის საჭირო ფაილებს, შეაქვს ცვლილებები, უშვებს შემოწმებებს და შედეგს გიჩვენებთ. Git არის პროგრამა, რომელიც პროექტის ცვლილებების ისტორიას ინახავს; Claude Code მასთან მუშაობს. ტესტები არის შემოწმებები, რომლებიც ადასტურებს, რომ ცვლილების შემდეგ პროგრამა კვლავ მუშაობს; აგენტი მათ თავად უშვებს და შედეგს კითხულობს.

  Claude Code მუშაობს ტერმინალში, VS Code-სა და JetBrains-ში, დესკტოპის აპში, ბრაუზერში, Slack-სა და CI-ში. ეს სტატია ტერმინალს ეხება, რომელიც მისი გამოყენების მთავარი გზაა<b-proof href="https://code.claude.com/docs/en/quickstart" quote="Claude Code: «Claude Code is also available on the web, as a desktop app, in VS Code and JetBrains IDEs, in Slack, and in CI/CD» — code.claude.com/docs/en/quickstart"/>.

  ყოველდღიური მაგალითი. რიტა რიგაში ცხოვრობს და პატარა საიტს უძღვება, რომელსაც ტესტები და git-ში ცვლილებების ისტორია აქვს. ჯერ ჩატში Claude-ს ეკითხება, რატომ არ მუშაობს ღილაკი, და პასუხს ტექსტად იღებს: კოდს თავად უნდა შეასწოროს. შემდეგ საიტის საქაღალდეში უშვებს Claude Code-ს და იმავე დავალებას წერს. აგენტი პოულობს საჭირო ფაილს, ასწორებს, უშვებს ტესტებს და ცვლილებას აჩვენებს. რიტა git-ში ცვლილებას ათვალიერებს და იღებს. ლატვია Anthropic-ის ქვეყნების სიაშია, ამიტომ რეგიონთან დაკავშირებული კითხვები არ ჩნდება.

  <b>ჩატის Claude და ტერმინალში გაშვებული Claude Code ერთი და იგივეა?</b> არა. ჩატში Claude ტექსტით პასუხობს და ცვლილებებს თქვენ თვითონ გადაიტანთ. Claude Code პროექტის ფაილებს ცვლის და ბრძანებებს უშვებს: ამიტომ ცალკე დაყენება სჭირდება და მხოლოდ ფასიან ტარიფებში შედის. შესამოწმებლად: უფასო ტარიფში Claude Code არ შედის, ხოლო <a href="https://claude.com/pricing">claude.com/pricing</a>-ზე ტარიფების ცხრილში Free სვეტში წერია „Claude Code: No“.
</b-chapter>
<b-chapter id="install" title="დაყენება ნაბიჯ-ნაბიჯ" icon="arrow-down">
  <b-why>მოთხოვნები: macOS 13+, Windows 10 1809+ ან Windows Server 2019+, Ubuntu 20.04+, Debian 10+, Alpine 3.19+; 4 GB ან მეტი მეხსიერება, x64 ან ARM64 პროცესორი, ინტერნეტი<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «macOS 13.0+», «Windows 10 1809+ or Windows Server 2019+», «Ubuntu 20.04+», «4 GB+ RAM» — code.claude.com/docs/en/setup"/>. ბრძანებები დაყენების გვერდიდანაა, შემოწმების თარიღი: 18.11.2026.</b-why>

  <b-sublabel top="18">რომელი ბრძანება ავიღოთ</b-sublabel>

  ბრძანება იმ ფანჯარაზეა დამოკიდებული, სადაც წერთ. macOS-ზე, Linux-ზე და WSL-ში (Linux-ის გარემო Windows-ის შიგნით) ერთი ხაზი გამოიყენება. Windows-ზე ორი ფანჯარაა, PowerShell და CMD, და მათი ბრძანებები განსხვავდება. ერთმანეთისგან მოწვევით გაარჩევთ: PowerShell-ში ხაზი „PS“-ით იწყება, CMD-ში „PS“ არ არის. თუ სხვა ფანჯრის ბრძანებას აიღებთ, დაყენება არ დაიწყება.
  <iso-art name="claude-code-install-and-price/which-shell"></iso-art>
  <b-cap>სამი ბრძანება სამი ფანჯრისთვის: macOS, Linux და WSL; PowerShell „PS“ მოწვევით; CMD „PS“-ის გარეშე.</b-cap>
  <b-sublabel top="18">macOS, Linux და WSL</b-sublabel>
  <b-codebox title="ტერმინალი" copy>
    curl -fsSL https://claude.ai/install.sh | bash
  </b-codebox>
  <b-sublabel top="18">Windows: PowerShell (მოწვევაში არის PS)</b-sublabel>
  <b-codebox title="PowerShell" copy>
    irm https://claude.ai/install.ps1 | iex
  </b-codebox>
  <b-sublabel top="18">Windows: CMD (მოწვევაში PS არ არის)</b-sublabel>
  <b-codebox title="CMD" copy>
    curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
  </b-codebox>
  <b-cap>ფაილების ჩამოტვირთვისას დამყენებელი პროგრესს არ აჩვენებს. Windows-ზე ადმინისტრატორის უფლებები საჭირო არ არის. Git for Windows-ის დაყენება არასავალდებულოა: მის გარეშე Claude Code ბრძანებებს PowerShell-ით უშვებს<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Installing Git for Windows is optional» — code.claude.com/docs/en/setup"/>.</b-cap>

  ყოველდღიური მაგალითი. იანი გდანსკში ცხოვრობს და Windows-ის ლეპტოპზე მუშაობს. ის PowerShell-ს ხსნის და ხაზის დასაწყისში „PS“-ს ხედავს. ესე იგი, მას სჭირდება ბრძანება <code>irm https://claude.ai/install.ps1 | iex</code>. იანი მას ათავსებს და რამდენიმე წუთი ერთ ხაზსაც ვერ ხედავს, მაგრამ ფანჯარას არ ხურავს: დამყენებელი პროგრესს არ აჩვენებს. მას ადმინისტრატორის უფლებები არ დასჭირვებია და Git for Windows არ დაუყენებია. როცა დაყენება დასრულდა, იანმა PowerShell თავიდან გახსნა და <code>claude --version</code> გაუშვა. პოლონეთი Anthropic-ის ქვეყნების სიაშია. ფანჯრის სისწორეს მოწვევის პირველი ორი ასოთი შეამოწმებთ.

  <b-sublabel top="18">დამყენებელი თუ პაკეტების მენეჯერი</b-sublabel>

  დამყენებელი, ანუ ბრძანება <code>curl</code>-ით ან <code>irm</code>-ით, რეკომენდებული გზაა: ის Claude Code-ს თავად ანახლებს ფონურ რეჟიმში. პაკეტების მენეჯერი არის პროგრამა, რომელიც სხვა პროგრამებს სახელით აყენებს და ანახლებს; ეს გზაც მუშაობს, მაგრამ Claude Code-ს ხელით უნდა განაახლოთ. npm-ით <code>sudo</code>-ს გარეშე დააყენეთ: დოკუმენტაცია აფრთხილებს, რომ ასეთ დაყენებას თავის განახლება არ შეეძლება<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Do NOT use sudo npm install -g as this can lead to permission issues and security risks» — code.claude.com/docs/en/setup"/>.
  <iso-art name="claude-code-install-and-price/install-methods"></iso-art>
  <b-cap>დამყენებელი თავად ახლდება, პაკეტების მენეჯერები ხელით: Homebrew, WinGet, npm, apt, dnf, apk.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>გზა</th><th>ბრძანება</th><th>განახლება</th></tr>
    </thead>
    <tbody>
      <tr><td>დამყენებელი (რეკომენდებული)</td><td><code>curl -fsSL https://claude.ai/install.sh | bash</code></td><td>ავტომატურად, ფონურ რეჟიმში</td></tr>
      <tr><td>Homebrew (macOS)</td><td><code>brew install --cask claude-code</code></td><td>ხელით: <code>brew upgrade claude-code</code></td></tr>
      <tr><td>WinGet (Windows)</td><td><code>winget install Anthropic.ClaudeCode</code></td><td>ხელით: <code>winget upgrade Anthropic.ClaudeCode</code></td></tr>
      <tr><td>npm (საჭიროა Node.js 22+)</td><td><code>npm install -g @anthropic-ai/claude-code@latest</code></td><td>დაყენების ბრძანება გაიმეორეთ</td></tr>
      <tr><td>apt, dnf, apk</td><td>დაამატეთ Anthropic-ის რეპოზიტორია დოკუმენტაციის ინსტრუქციით</td><td>სისტემის ჩვეულებრივ განახლებასთან ერთად</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  ყოველდღიური მაგალითი. მარკო მილანში ცხოვრობს და Mac-ზე მუშაობს. ყველა პროგრამას უკვე Homebrew-ით აყენებს, ამიტომ დამყენებლის ნაცვლად <code>brew install --cask claude-code</code>-ს ირჩევს. ყველაფერი ერთნაირად მუშაობს, მაგრამ ერთ თვეში მარკო Claude Code-ს <code>brew upgrade claude-code</code>-ით ანახლებს: თავისით არ განახლდება. იტალია Anthropic-ის ქვეყნების სიაშია. დაყენების გზას ასე შეამოწმებთ: თუ Homebrew-მა დააყენა, იმავე Homebrew-ით განაახლეთ.

  <b-sublabel top="18">Windows: პირდაპირ თუ WSL-ით</b-sublabel>

  WSL არის Linux-ის გარემო Windows-ის შიგნით: Claude Code მასში ჩვეულებრივ Linux-ზე ისე მუშაობს. არჩევანი პროექტზეა დამოკიდებული. თუ პროექტი და მისი პროგრამები Windows-ისთვისაა, დააყენეთ პირდაპირ Windows-ზე. თუ გჭირდებათ Linux-ის პროგრამები ან ბრძანებების იზოლაცია (სენდბოქსი, ანუ აგენტის ბრძანებების გაშვება შეზღუდულ გარემოში), აიღეთ WSL 2. WSL 1 ვარგა, როცა WSL 2 მიუწვდომელია, მაგრამ ბრძანებების იზოლაციას არ უჭერს მხარს.
  <iso-art name="claude-code-install-and-price/windows-modes"></iso-art>
  <b-cap>Windows-ზე სამი რეჟიმი: პირდაპირ, WSL 2 ბრძანებების იზოლაციით, WSL 1 იზოლაციის გარეშე.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>ვარიანტი</th><th>როდის ავიღოთ</th><th>ბრძანებების იზოლაცია (სენდბოქსი)</th></tr>
    </thead>
    <tbody>
      <tr><td>პირდაპირ Windows-ზე</td><td>Windows-ის პროექტები და პროგრამები</td><td>არ არის მხარდაჭერილი</td></tr>
      <tr><td>WSL 2</td><td>Linux-ის პროგრამები ან ბრძანებების იზოლაცია</td><td>მხარდაჭერილია</td></tr>
      <tr><td>WSL 1</td><td>თუ WSL 2 მიუწვდომელია</td><td>არ არის მხარდაჭერილი</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>WSL-ში Linux-ის ბრძანებას WSL-ის ფანჯარაში უშვებთ და არა PowerShell-იდან<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «You install and launch claude inside the WSL terminal, not from PowerShell or CMD» — code.claude.com/docs/en/setup"/>. Alpine-ზე დაყენებამდე საჭიროა <code>bash</code> და <code>curl</code>: <code>apk add bash curl</code>.</b-cap>
</b-chapter>
<b-chapter id="login" title="პირველი გაშვება და შესვლა" icon="key">
  <b-why>შესვლა ბრაუზერში ხდება: Claude Code გვერდს თავად ხსნის, შესვლის შემდეგ კი ტერმინალი აჩვენებს „Login successful“<b-proof href="https://code.claude.com/docs/en/authentication" quote="Claude Code: «When login completes, the terminal shows Login successful and prompts you to press Enter to continue» — code.claude.com/docs/en/authentication"/>.</b-why>

  <b-sublabel top="18">როგორ გავუშვათ</b-sublabel>

  გადადით პროექტის საქაღალდეში და გაუშვით <code>claude</code>. პროგრამა ბრაუზერს ხსნის, თქვენ Claude-ის ანგარიშში შედიხართ, ტერმინალი კი აჩვენებს „Login successful“-ს და Enter-ის დაჭერის შეთავაზებას. ამის შემდეგ პროექტის შესახებ კითხვების დასმა შეგიძლიათ.
  <b-codebox title="პირველი გაშვება" copy>
    cd path/to/project
    claude
  </b-codebox>
  <b-cap>თუ ბრაუზერი არ გაიხსნა, დააჭირეთ <code>c</code>-ს: შესვლის მისამართი ბუფერში დაკოპირდება. ანგარიშიდან გასვლა შეგიძლიათ ბრძანებით <code>/logout</code>, ხელახლა შესვლა კი <code>/login</code>-ით. დახმარება სესიის შიგნით არის <code>/help</code>.</b-cap>
  <b-sublabel top="18">რით შეიძლება შესვლა</b-sublabel>

  შესვლის გზა იმაზეა დამოკიდებული, როგორ იხდით. Pro, Max ან Ultra გამოწერა ადამიანზე გაიცემა. Team და Enterprise იყენებს თანამშრომლის ანგარიშს, რომელსაც ადმინისტრატორი იწვევს. Claude Console ცალკე ანგარიშია, რომელიც API-ის გამოყენებით იხდის წინასწარ შეძენილი კრედიტებით. Amazon Bedrock, Google Cloud და Microsoft Foundry იმ ორგანიზაციებს ერგება, რომლებსაც უკვე ჰყავთ ღრუბლოვანი პროვაიდერი.
  <iso-art name="claude-code-install-and-price/login-paths"></iso-art>
  <b-cap>შესვლის ოთხი გზა: გამოწერა, Team ან Enterprise, Console, ღრუბლოვანი პროვაიდერები.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>რით შევიდეთ</th><th>ვისთვისაა</th></tr>
    </thead>
    <tbody>
      <tr><td>Pro, Max ან Ultra გამოწერა</td><td>ერთი ადამიანი, შესვლა claude.ai-ის ანგარიშით</td></tr>
      <tr><td>Team ან Enterprise</td><td>თანამშრომელი, რომელსაც ადმინისტრატორმა მოსვლა სთხოვა</td></tr>
      <tr><td>Claude Console</td><td>API-ის გადახდა წინასწარ შეძენილი კრედიტებით</td></tr>
      <tr><td>Amazon Bedrock, Google Cloud, Microsoft Foundry</td><td>ორგანიზაციები, რომლებსაც ღრუბლოვანი პროვაიდერი ჰყავთ</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>ანგარიშების სია დოკუმენტაციის ავტორიზაციის გვერდიდან და სწრაფი დაწყების გვერდიდანაა<b-proof href="https://code.claude.com/docs/en/quickstart" quote="Claude Code: «Claude Console (API access with pre-paid credits)» — code.claude.com/docs/en/quickstart"/>.</b-cap>

  ყოველდღიური მაგალითი. ემა ვენაში ცხოვრობს და Pro გამოწერა იყიდა. ის პროექტის საქაღალდეში გადადის, უშვებს <code>claude</code>-ს და ბრაუზერი შესვლის გვერდს ხსნის. ემა იმავე Claude-ის ანგარიშით შედის, რომელსაც ჩატისთვის იყენებს. ტერმინალი აჩვენებს „Login successful“-ს, ემა Enter-ს აჭერს და კითხულობს: „what does this project do?“. რამდენიმე წამში აგენტი პროექტს აღწერს. მოგვიანებით ემას სურს შეამოწმოს, რომელ ანგარიშს იყენებს პროგრამა, და წერს <code>/status</code>-ს; ანგარიშის შესაცვლელად <code>/logout</code> და <code>/login</code> სჭირდება. ავსტრია Anthropic-ის ქვეყნების სიაშია, ამიტომ რეგიონი ხელს არ უშლის.

  <b>ჩატის გამოწერა და Claude Code ორი ცალკე შესვლაა?</b> არა. Pro, Max ან Ultra გამოწერა claude.ai-ის ანგარიშზე გაიცემა და იმავე ანგარიშით Claude Code-იც იხსნება. ლიმიტი ორივეს საერთო აქვს. შესამოწმებლად: შესვლის შემდეგ აკრიფეთ <code>/status</code> და ნახეთ, რომელი შესვლის გზა ჩანს.

  <b>საკმარისია უფასო Claude-ის ანგარიში?</b> არა. დაყენების მოთხოვნებში წერია: „The free claude.ai plan does not include Claude Code access“. Claude Code-ში მხოლოდ ფასიანი გზით შეგიძლიათ შესვლა: გამოწერით, Team-ით, Enterprise-ით, Console-ით ან ღრუბლოვანი პროვაიდერით. შესამოწმებლად გახსენით <a href="https://code.claude.com/docs/en/setup">Claude Code-ის დაყენების გვერდი</a> და მოთხოვნებში ეს ფრაზა მოძებნეთ.
</b-chapter>

<b-chapter id="plans" title="ტარიფები: რას მოიცავს და რა ღირს" icon="coin">
  <b-why>Claude Code შედის ფასიან Pro, Max, Ultra, Team და Enterprise ტარიფებში და უფასო ტარიფში არ შედის<b-proof href="https://claude.com/pricing" quote="Claude: Free «Claude Code: No», Pro «$20 if billed monthly», Ultra «10x Pro usage every week», Team premium seat «5x more usage than standard seats» — claude.com/pricing"/>. ფასები და შემადგენლობა claude.com/pricing-იდანაა აღებული. შემოწმების თარიღი: 18.11.2026. ტარიფები იცვლება, ამიტომ გადახდამდე Anthropic-ის ფასების გვერდი ხელახლა გახსენით.</b-why>

  ტარიფი არის გამოწერა თვიური ფიქსირებული ფასით და გამოყენების საკუთარი მოცულობით. Claude Code-ს ცალკე ფასი არ აქვს: ის გამოწერასთან ერთად მოდის, ჩატის ჩვეულებრივ Claude-თან ერთად. რაც უფრო მაღალია ტარიფი, მით მეტი გამოყენების დახარჯვა შეგიძლიათ ხუთსაათიან ფანჯარასა და კვირაში. Pro, Max და Ultra ერთ ადამიანს ერგება, Team-ის ადგილები გუნდს, Enterprise კი კომპანიას, რომელსაც ხელშეკრულება აქვს.
  <iso-art name="claude-code-install-and-price/plans-ladder"></iso-art>
  <b-cap>ტარიფების კიბე: Free Claude Code-ის გარეშე, შემდეგ Pro, Max, Ultra, Team-ის სტანდარტული და პრემიუმ ადგილები, Enterprise ხელშეკრულებით.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>ტარიფი</th><th>ფასი თვეში</th><th>Claude Code</th><th>გამოყენება</th></tr>
    </thead>
    <tbody>
      <tr><td>Free</td><td>$0</td><td>არა</td><td>შეზღუდული</td></tr>
      <tr><td>Pro</td><td>$20 თვიური გადახდით, $17 წლიური გადახდით ($200 წინასწარ)</td><td>დიახ</td><td>საბაზო</td></tr>
      <tr><td>Max</td><td>$100</td><td>დიახ</td><td>5x Pro</td></tr>
      <tr><td>Ultra</td><td>$200</td><td>დიახ</td><td>10x Pro კვირაში</td></tr>
      <tr><td>Team, სტანდარტული ადგილი</td><td>$25 თვიურად, $20 წლიური გადახდით</td><td>დიახ</td><td>როგორც ადგილის გამოწერაში</td></tr>
      <tr><td>Team, პრემიუმ ადგილი</td><td>$125 თვიურად, $100 წლიური გადახდით</td><td>დიახ</td><td>5x სტანდარტული ადგილი</td></tr>
      <tr><td>Enterprise</td><td>გვერდზე: $20 ადგილზე თვეში წლიური გადახდით, 20 ადგილიდან</td><td>დიახ</td><td>ხელშეკრულებით</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>წყარო: claude.com/pricing. შემოწმების თარიღი: 18.11.2026.</b-cap>
  <b-sublabel top="18">გათვლილი მაგალითი</b-sublabel>

  იონასი ვილნიუსში ცხოვრობს და Claude Code-ის საკუთარ პროექტზე ცდა სურს. ის ფასების გვერდს ხსნის და Free-ის გვერდით ნიშანს „Claude Code: No“ ხედავს, ამიტომ უფასო ვარიანტი გამოირიცხება. Pro თვიური გადახდით 20 დოლარი ღირს და დასაწყებად საკმარისია. წლიური გადახდა ფასს თვეში 17 დოლარამდე ამცირებს, მაგრამ 200 დოლარი ერთბაშად იწერება, იონასი კი ჯერ ვერ არის დარწმუნებული, რომ აგენტს ყოველდღე გამოიყენებს. ის თვიურ გადახდას ირჩევს. საკუთარი შემთხვევის შესამოწმებლად გახსენით ფასების გვერდი და თქვენი ტარიფის სტრიქონში Claude Code-ის ნიშანი იპოვეთ.

  <b-sublabel top="18">ლიმიტები</b-sublabel>

  ლიმიტი არის გამოყენების ის მოცულობა, რომლის შემდეგაც გამოწერა ლოდინს გთხოვთ. Pro-სა და Max-ს ორი აქვს: ხუთსაათიანი სესიის ლიმიტი და კვირეული ლიმიტი<b-proof href="https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan" quote="Claude Help Center: «Pro and Max plans have a five-hour session limit and a weekly limit» — support.claude.com"/>. Ultra-ს კვირეული ლიმიტი აქვს, დადასტურებულ Ultra ანგარიშებს კი ხუთსაათიანი ლიმიტი არ აქვთ. ლიმიტი საერთოა ჩატის Claude-სა და Claude Code-ისთვის: თუ გამოყენება ჩატში დახარჯეთ, აგენტისთვის ნაკლები რჩება.
  <iso-art name="claude-code-install-and-price/limits"></iso-art>
  <b-cap>ხარჯვის ორი ფანჯარა, ხუთსაათიანი და კვირეული; გამოყენების ერთი საერთო მარაგი ჩატისა და Claude Code-ისთვის.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>ტარიფი</th><th>რომელი ლიმიტი</th></tr>
    </thead>
    <tbody>
      <tr><td>Pro და Max</td><td>ხუთსაათიანი სესიის ლიმიტი და კვირეული ლიმიტი</td></tr>
      <tr><td>Ultra</td><td>კვირეული ლიმიტი; დადასტურებულ Ultra ანგარიშებს ხუთსაათიანი ლიმიტი არ აქვთ</td></tr>
      <tr><td>ყველა გამოწერა</td><td>ლიმიტი საერთოა ჩატის Claude-სა და Claude Code-ისთვის</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  როცა ლიმიტი ამოიწურება, შეგიძლიათ კრედიტებით გადასახდელი დამატებითი გამოყენება ჩართოთ ან API-ს კრედიტები იყიდოთ API-ს სტანდარტული ფასებით. გამოწერის ფარგლებში დასარჩენად კრედიტებით გადახდაზე უარი თქვით. ერთი კვირის შემდეგ იონასი ამჩნევს, რომ საღამოს აგენტი ლოდინს სთხოვს: დილით ჩატში Claude-თან დიდხანს საუბრობდა და საერთო გამოყენება უკვე ამოიწურა. ის გადაწყვეტს, კრედიტები არ იყიდოს და უბრალოდ ახალ ფანჯარას დაელოდოს.

  <b-sublabel top="18">API-გასაღები გამოწერის ნაცვლად</b-sublabel>

  API-გასაღები არის პროგრამული პაროლი, რომლითაც Claude Code თითოეულ მოთხოვნაზე API-ს ტარიფით იხდის. გამოწერას ფიქსირებული ფასი აქვს, გასაღები კი მოცულობით ფასდება. თუ სისტემაში ცვლადი <code>ANTHROPIC_API_KEY</code> არის დაყენებული, Claude Code გამოწერის ნაცვლად გასაღებს იყენებს. იონასისთვის ეს მოულოდნელი იყო: ცვლადი სხვა პროექტიდან იყო დარჩენილი და ხარჯი API-ს ტარიფით მიდიოდა, თუმცა გამოწერა გადახდილი ჰქონდა.
  <iso-art name="claude-code-install-and-price/api-vs-subscription"></iso-art>
  <b-cap>გადახდის ორი გზა: გამოწერა ფიქსირებული ფასით და API-გასაღები, რომელიც მოცულობით იხდის. გასაღები გამოწერას გადაფარავს.</b-cap>
  <b-finding>
    <ex>თუ სისტემაში ცვლადი <code>ANTHROPIC_API_KEY</code> არის დაყენებული, Claude Code გამოწერის ნაცვლად გასაღებს იყენებს და ხარჯი API-ს ტარიფით მიდის.</ex>
    <gen>გამოწერას ფიქსირებული ფასი და ლიმიტები აქვს, გასაღები მოცულობით ფასდება. გასაღები ამართლებს, როცა დატვირთვა არათანაბარია ან პროექტის მიხედვით ცალკე ანგარიშფაქტურა გჭირდებათ.</gen>
    <do>გამოწერაზე დასაბრუნებლად ცვლადი წაშალეთ (<code>unset ANTHROPIC_API_KEY</code>) და შესვლის გზა ბრძანებით <code>/status</code> შეამოწმეთ<b-proof href="https://code.claude.com/docs/en/authentication" quote="Claude Code: «Run unset ANTHROPIC_API_KEY to fall back to your subscription, and check /status to confirm which method is active» — code.claude.com/docs/en/authentication"/>.</do>
  </b-finding>

  მოდელების მიხედვით ფასებს ერთ მილიონ ტოკენზე აქ არ ვაქვეყნებ: ფასების გვერდზე 18.11.2026-ს ისინი არ შემიმოწმებია.

  <b-sublabel top="18">გავრცელებული მცდარი წარმოდგენები</b-sublabel>

  <b>უფასო ტარიფი Claude Code-ს იძლევა?</b> არა. დაყენების დოკუმენტაცია ამბობს, რომ Claude Code-ს Pro, Max, Ultra, Team, Enterprise ან Console ანგარიში სჭირდება, ხოლო უფასო claude.ai ტარიფი მასზე წვდომას არ მოიცავს<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Claude Code requires a Pro, Max, Ultra, Team, Enterprise, or Console account. The free claude.ai plan does not include Claude Code access» — code.claude.com/docs/en/setup"/>. შესამოწმებლად: გახსენით ფასების გვერდი და Free-ის გვერდით იპოვეთ ნიშანი „Claude Code: No“.

  <b>ფასიანი გამოწერა რეგიონულ შეზღუდვას ხსნის?</b> არა. Anthropic-ის ქვეყნების სია გამოყენებაზე ვრცელდება ტარიფისა და გადახდის გზის მიუხედავად<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported» — anthropic.com/supported-countries"/>. შესამოწმებლად: იპოვეთ თქვენი ქვეყანა Anthropic-ის გვერდზე არსებულ სიაში.

  <b>API-გასაღები გამოწერაზე იაფია?</b> დატვირთვაზეა დამოკიდებული. გამოწერა ფიქსირებული თანხა ღირს, გასაღები მოცულობით იღებს ფულს, ზუსტი ტარიფები კი ფასების გვერდზე 18.11.2026-ს არ შემიმოწმებია. შესამოწმებლად: Console-ში ერთი თვის ხარჯი გამოწერის ფასს შეადარეთ.
</b-chapter>
<b-chapter id="check" title="როგორ შევამოწმოთ, რომ ყველაფერი მუშაობს" icon="check-circle">
  <b-why>მუშა დაყენება ბეჭდავს ვერსიის ნომერს წარწერით „(Claude Code)“<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «A working installation prints a version number such as 2.1.211 (Claude Code)» — code.claude.com/docs/en/setup"/>. შემდეგ მოდის დიაგნოსტიკა, შესვლის გზა და პირველი კითხვა პროექტის შესახებ.</b-why>

  შემოწმება ხუთი მოკლე ნაბიჯია და თითოეული საკუთარ კითხვას პასუხობს. ვერსია აჩვენებს, რომ პროგრამა ნაპოვნია და იწყება. დიაგნოსტიკა დაყენებისა და პარამეტრების ანგარიშს აგროვებს სესიის გაშვების გარეშე. სესიის შიგნით სტატუსი გეუბნებათ, როგორ შეხვედით: გამოწერით თუ გასაღებით. კითხვა პროექტის შესახებ მთელ ჯაჭვს ერთბაშად ამოწმებს: შესვლას, ქსელსა და ფაილების კითხვას. განახლება აჩვენებს, რომ დაყენებას ახალი ვერსიების მიღება შეუძლია.
  <iso-art name="claude-code-install-and-price/check-ladder"></iso-art>
  <b-cap>შემოწმებების კიბე: ვერსია, დიაგნოსტიკა, სტატუსი, კითხვა პროექტის შესახებ, განახლება.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>შემოწმება</th><th>ბრძანება</th><th>რა უნდა დაინახოთ</th></tr>
    </thead>
    <tbody>
      <tr><td>ვერსია</td><td><code>claude --version</code></td><td>ვერსიის ნომერი და „(Claude Code)“</td></tr>
      <tr><td>დიაგნოსტიკა</td><td><code>claude doctor</code></td><td>დაყენებისა და პარამეტრების ანგარიში სესიის გაშვების გარეშე</td></tr>
      <tr><td>შესვლა</td><td><code>/status</code> სესიის შიგნით</td><td>შესვლის გზა: გამოწერა ან გასაღები</td></tr>
      <tr><td>მუშაობა პროექტთან</td><td>კითხვა „what does this project do?“</td><td>პროექტის მოკლე აღწერა</td></tr>
      <tr><td>განახლება</td><td><code>claude update</code></td><td>„Claude Code is up to date“</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">გათვლილი მაგალითი</b-sublabel>

  სარა დუბლინში ცხოვრობს და ლეპტოპზე Claude Code ახლახან დააყენა. ის ახალ ტერმინალს ხსნის და წერს <code>claude --version</code>. ჩნდება ვერსიის ნომერი წარწერით „(Claude Code)“, ესე იგი, პროგრამა ნაპოვნია. შემდეგ უშვებს <code>claude doctor</code>-ს და დაყენების ანგარიშს იღებს. პროექტის საქაღალდეში უშვებს <code>claude</code>-ს, წერს <code>/status</code>-ს და ხედავს, რომ გამოწერით შევიდა და გასაღები არ მონაწილეობს. ბოლო ნაბიჯი არის კითხვა „what does this project do?“: პროექტის მოკლე აღწერა ნიშნავს, რომ მთელი ჯაჭვი მუშაობს. ამას თავადაც ხუთ წუთში შეამოწმებთ, თუ ცხრილს ზემოდან ქვემოთ გაივლით.

  <b-sublabel top="18">გავრცელებული შეცდომა</b-sublabel>

  გაჩერება ვერსიაზე. ვერსიის ნომერი მხოლოდ იმას ადასტურებს, რომ პროგრამა PATH-ში ნაპოვნია. ის არ ამოწმებს შესვლას, ქსელსა და ფაილებზე უფლებებს. თუ ვერსია იბეჭდება, მაგრამ კითხვას პროექტის შესახებ პასუხი არ მოჰყვება, მიზეზი შესვლაში ეძებეთ: შეამოწმეთ <code>/status</code> და საჭიროების შემთხვევაში გაუშვით <code>/login</code>.
</b-chapter>
<b-chapter id="errors" title="დაყენების გავრცელებული შეცდომები" icon="alert-circle">
  <b-why>დოკუმენტაციას ყოველი შეცდომის შეტყობინებისთვის გამოსავალი აქვს: ცხრილი „Find your error“ გვერდზე „Troubleshoot installation and login“<b-proof href="https://code.claude.com/docs/en/troubleshoot-install" quote="Claude Code: the “Find your error” table gives a fix for each message — code.claude.com/docs/en/troubleshoot-install"/>. შემოწმების თარიღი: 18.11.2026.</b-why>

  დაყენების შეცდომა შეტყობინების ტექსტიდან იკითხება: მისგან მიზეზამდე მიდიხართ, მიზეზიდან კი მოქმედებამდე. ყველაზე ხშირად მიზეზი მარტივია: დაყენების საქაღალდე PATH-ში არ არის (საქაღალდეების სია, სადაც ტერმინალი პროგრამებს ეძებს), ბრძანება სხვა გარსისთვისაა, ან უფლებები ან მეხსიერება აკლია. მხარდაჭერილი სიის გარეთ მყოფი ქვეყნები ცალკე შემთხვევაა: ცხრილში მას 403-ისა და „App unavailable in region“-ის სტრიქონები აღწერს.
  <iso-art name="claude-code-install-and-price/install-errors"></iso-art>
  <b-cap>შეცდომების ხე: რას ხედავთ, რა არის მიზეზი, რა ვქნათ.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>რას ხედავთ</th><th>მიზეზი</th><th>რა ვქნათ</th></tr>
    </thead>
    <tbody>
      <tr><td><code>command not found: claude</code> ან „'claude' is not recognized“</td><td>დაყენების საქაღალდე PATH-ში არ არის</td><td>გახსენით ახალი ტერმინალი; macOS-ზე და Linux-ზე PATH-ში დაამატეთ <code>~/.local/bin</code></td></tr>
      <tr><td><code>The token '&amp;&amp;' is not a valid statement separator</code></td><td>CMD-ის ბრძანება PowerShell-ში გაუშვეს</td><td>აიღეთ ბრძანება <code>irm … | iex</code></td></tr>
      <tr><td><code>'irm' is not recognized</code></td><td>PowerShell-ის ბრძანება CMD-ში გაუშვეს</td><td>აიღეთ ბრძანება <code>curl … install.cmd</code></td></tr>
      <tr><td><code>syntax error near unexpected token '&lt;'</code></td><td>სკრიპტის ნაცვლად ვებგვერდი მოვიდა</td><td>შეამოწმეთ ქსელი და პროქსი, გახსენით დოკუმენტაციის გადაწყვეტილებების განყოფილება</td></tr>
      <tr><td><code>curl: (22) … 403</code></td><td>პროქსი ან ფილტრი მისამართს ბლოკავს, ან ქვეყანა მხარდაჭერილ სიაში არ არის</td><td>შეამოწმეთ ქსელი; ქვეყნების სიისა და შემდეგი ნაბიჯებისთვის წაიკითხეთ <a href="/blog/claude-code-access-regions-vpn-bans/">სტატია ქვეყნების მიხედვით წვდომის, VPN-ისა და ბლოკირების შესახებ</a></td></tr>
      <tr><td><code>EACCES: permission denied</code></td><td>დაყენების საქაღალდეზე უფლებები არ გაქვთ</td><td>შეასწორეთ საქაღალდის უფლებები, <code>sudo</code> არ გამოიყენოთ</td></tr>
      <tr><td><code>TLS connect error</code></td><td>მოძველებული სერტიფიკატები ან პროქსი, რომელიც ტრაფიკს ამოწმებს</td><td>განაახლეთ სისტემის სერტიფიკატები</td></tr>
      <tr><td><code>Killed</code> Linux-ზე დაყენებისას</td><td>მეხსიერება არ ჰყოფნის</td><td>გაათავისუფლეთ მეხსიერება ან დაამატეთ swap</td></tr>
      <tr><td><code>App unavailable in region</code></td><td>Claude Code ქვეყანაში მიუწვდომელია</td><td>შეამოწმეთ მხარდაჭერილი ქვეყნების სია: <a href="/blog/claude-code-access-regions-vpn-bans/">Claude Code არ არის ხელმისაწვდომი თქვენს ქვეყანაში: მხარდაჭერილი ქვეყნები, VPN და ბლოკირება</a></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">გათვლილი მაგალითი</b-sublabel>

  მატეუსი სან-პაულუში ცხოვრობს და Mac-ზე Claude Code ერთი ბრძანებით დააყენა. დამყენებელი დასრულდა, მაგრამ ტერმინალი აჩვენებს „command not found: claude“-ს. ის ფიქრობს, რომ დაყენება გაფუჭდა და თავიდან გაშვება უნდა. ჯერ ახალ ტერმინალს ხსნის: ძველ ფანჯარას ახალი საქაღალდის შესახებ არაფერი იცის. თუ შეტყობინება დარჩა, მიზეზი PATH-ია და zsh-ის პარამეტრების ფაილში <code>~/.local/bin</code> უნდა დაამატოს და ფანჯარა ხელახლა გახსნას (ბრძანება შემდეგ ბლოკშია). ამის შემდეგ <code>claude --version</code> ვერსიას ბეჭდავს. იმის შესამოწმებლად, რომ იგივე გააკეთეთ, <code>claude --version</code>-ის გამოტანას შეხედეთ.

  <b-sublabel top="18">PATH macOS-ზე zsh-ით</b-sublabel>
  <b-codebox title="საქაღალდის დამატება PATH-ში" copy>
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
  </b-codebox>

  bash-ისთვის <code>~/.zshrc</code>-ის ნაცვლად <code>~/.bashrc</code> ვარგა. შესწორების შემდეგ ახალი ტერმინალი გახსენით<b-proof href="https://code.claude.com/docs/en/troubleshoot-install" quote="Claude Code: «echo 'export PATH=&quot;$HOME/.local/bin:$PATH&quot;' >> ~/.zshrc» — code.claude.com/docs/en/troubleshoot-install"/>.

  <b-sublabel top="18">გავრცელებული მცდარი წარმოდგენები</b-sublabel>

  <b>თუ claude ვერ მოიძებნა, დამყენებელმა ვერ იმუშავა?</b> ყველაზე ხშირად იმუშავა, ტერმინალმა კი ახალი საქაღალდის შესახებ არ იცის: ცხრილში ეს არის PATH-ის სტრიქონი გადაწყვეტით „გახსენით ახალი ტერმინალი“. შესამოწმებლად: გახსენით ახალი ფანჯარა და გაიმეორეთ <code>claude --version</code>.

  <b>ქსელის შეცვლა შეცდომა 403-ს ყოველთვის კურნავს?</b> არა. ცხრილში 403-ს ორი მიზეზი აქვს: პროქსი ან ფილტრი, ან ქვეყანა მხარდაჭერილი სიის გარეთ. მეორე შემთხვევაში ქსელი არ დაგეხმარებათ და Anthropic-ის ქვეყნების სია უნდა ნახოთ.

  <b>EACCES sudo-თი იკურნება?</b> არა. ცხრილი გამოსავლად საქაღალდის უფლებების შესწორებას ასახელებს და ამბობს, რომ <code>sudo</code> არ უნდა გამოიყენოთ.
</b-chapter>
<b-chapter id="region" title="წვდომა რუსეთიდან" icon="flag">
  <b-why>რუსეთი Anthropic-ის მხარდაჭერილი ქვეყნების ოფიციალურ სიაში არ არის, პირობებში კი Claude Code იმ პროდუქტებშია დასახელებული, რომლებიც მხოლოდ ჩამოთვლილ ქვეყნებში მუშაობს. შემოწმების თარიღი: 18.11.2026. პირობები ძალაში 12.11.2026-ს შევიდა<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported» — anthropic.com/supported-countries"/>.</b-why>

  ქვეყნების სია არის Anthropic-ის დოკუმენტი, რომელიც ადგილებს ასახელებს, სადაც Claude-ის გამოყენება შეიძლება. ნებისმიერი ქვეყანა ან რეგიონი, რომელიც სიაში არ არის, მხარდაუჭერლად ითვლება. სიაში ჩანაწერი „Russia“ არ არის, ამიტომ დაყენება და შესვლა რუსეთიდან მხარდაჭერილი არ არის. Anthropic მიზეზებს არ ასახელებს. ჩემი ვარაუდით, ისინი აშშ-ისა და სხვა ქვეყნების პოლიტიკაშია: სანქციებში, ექსპორტის შეზღუდვებსა და კანონებში. ეს ვარაუდია და კომპანიის დოკუმენტებში ასეთი განმარტება არ არის.
  <iso-art name="claude-code-access-regions-vpn-bans/world-map"></iso-art>
  <b-cap>რუკა ქვეყნებისა, სადაც Anthropic Claude Code-ს უჭერს მხარს, და სიის გარეთ მყოფი ქვეყნებისა.</b-cap>

  დაყენებისას ეს ჩანს შეტყობინებით „App unavailable in region“ და ჩამოტვირთვისას შეცდომით 403: ორივე სტრიქონი შეცდომების ცხრილშია. ფასიანი გამოწერა შეზღუდვას არ ხსნის: სია ფასიან ტარიფზეც ვრცელდება და API-გასაღებზეც. რას ნიშნავს შეზღუდვა, როგორ იკითხება ფრჩხილებიანი ჩანაწერები და რა არის კანონიერი, თუ თქვენი ქვეყანა სიაში არ არის, ცალკე სტატიაშია დეტალურად.
  <b-links cols="1">
    <item href="/blog/claude-code-access-regions-vpn-bans/" k="დეტალურად" t="Claude Code არ არის ხელმისაწვდომი თქვენს ქვეყანაში: მხარდაჭერილი ქვეყნები, VPN და ბლოკირება">რას ნიშნავს შეზღუდვა და რა ვქნათ</item>
  </b-links>
</b-chapter>
<b-chapter id="alt" title="Claude Code-ის ალტერნატივები" icon="grid">
  <b-why>ალტერნატივები იგივეს აკეთებენ, რასაც Claude Code: კითხულობენ პროექტს, ცვლიან ფაილებს და უშვებენ ბრძანებებს. განსხვავდებიან მოდელით, ფასითა და სამუშაო ადგილით. თითოეულს წვდომის საკუთარი პირობები აქვს, რომლებსაც პროგრამის საიტზე შეამოწმებთ.</b-why>

  ალტერნატივა არის სხვა პროგრამირების აგენტი: ის ტერმინალში ან რედაქტორში მუშაობს და თქვენი თხოვნით პროექტის ფაილებს ცვლის. არჩევთ სამი კითხვით. ვისი მოდელია შიგნით? სად მუშაობს: ტერმინალში, აპში თუ რედაქტორში? როგორ იხდით მასში? ყველა აგენტის აღწერა საიტის გლოსარიუმშია; Gemini CLI-ისა და Antigravity CLI-ის ფაქტები მათი სტატიებიდანაა, სადაც თარიღებიც წერია.
  <iso-art name="claude-code-install-and-price/alternatives-map"></iso-art>
  <b-cap>ალტერნატივების რუკა: OpenCode, Codex, Cursor, Gemini CLI და მისი მემკვიდრე Antigravity CLI.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>აგენტი</th><th>ვისია, რომელ მოდელზე</th><th>სად მუშაობს</th></tr>
    </thead>
    <tbody>
      <tr><td>OpenCode</td><td>ღია აგენტი, მოდელს თქვენ ირჩევთ: Claude, GPT, Gemini და სხვები API-ით ან ლოკალური; მოდელის პროვაიდერს უხდით</td><td>ტერმინალი, აპი, ვები</td></tr>
      <tr><td>Codex</td><td>OpenAI, GPT მოდელები</td><td>ChatGPT, აპი, ტერმინალი, IDE</td></tr>
      <tr><td>Cursor</td><td>Anysphere, VS Code-ზე დაფუძნებული რედაქტორი ჩაშენებული აგენტით; საკუთარი და სხვა კომპანიების მოდელები</td><td>რედაქტორი</td></tr>
      <tr><td>Gemini CLI</td><td>Google, Gemini მოდელები; ჩვეულებრივ მომხმარებლებზე მუშაობა 2026 წლის 18 ივნისს შეწყვიტა</td><td>ტერმინალი</td></tr>
      <tr><td>Antigravity CLI</td><td>Google; Gemini CLI მასში გადაიტანეს</td><td>ტერმინალი, Antigravity აპი</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">როგორ ავირჩიოთ</b-sublabel>

  თუ გჭირდებათ საკუთარი მოდელი და პროვაიდერისთვის პირდაპირი გადახდა, OpenCode-ს შეხედეთ. თუ ChatGPT-ში უკვე იხდით, Codex-ს შეხედეთ. თუ ტერმინალის ნაცვლად რედაქტორში მუშაობა გირჩევნიათ, Cursor-ს შეხედეთ. თუ Gemini CLI გქონდათ, მისი ადგილი Antigravity CLI-მ დაიკავა. ალტერნატივების დაყენების ბრძანებებს აქ არ ვაქვეყნებ: თითოეულს საკუთარი აქვს და ისინი იცვლება. პროგრამის საკუთარ საიტზე იპოვით.
  <b-links cols="2">
    <item href="/materials/glossary/opencode/" k="ტერმინი" t="OpenCode">ღია აგენტი ტერმინალისთვის</item>
    <item href="/materials/glossary/codex/" k="ტერმინი" t="Codex">OpenAI-ის აგენტი</item>
    <item href="/materials/glossary/cursor/" k="ტერმინი" t="Cursor">რედაქტორი აგენტით</item>
    <item href="/materials/glossary/gemini-cli/" k="ტერმინი" t="Gemini CLI">Google-ის აგენტი ტერმინალში</item>
    <item href="/materials/glossary/antigravity-cli/" k="ტერმინი" t="Antigravity CLI">Gemini CLI-ის მემკვიდრე</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="შედარება" t="Codex თუ Claude Code, Cursor და Hermes Agent">რომელი აგენტი რომელი ამოცანისთვის</item>
    <item href="/blog/codex-or-chatgpt-what-to-choose/" k="არჩევანი" t="Codex თუ ChatGPT: რომელი ავირჩიოთ">ჩატი თუ პროგრამირების აგენტი</item>
  </b-links>
</b-chapter>
<b-chapter id="prompts" title="მზა მოთხოვნები აგენტისთვის" icon="chat">
  <b-why>ოთხი მოთხოვნა პირველი სესიისთვის. ჩასვით ისინი Claude Code-ში მას შემდეგ, რაც პროექტის საქაღალდეში <code>claude</code>-ს გაუშვებთ.</b-why>

  მოთხოვნები ზრდადი თანმიმდევრობითაა: ჯერ აგენტი მხოლოდ კითხულობს და გიყვებათ, შემდეგ წესების ფაილს ქმნის, მერე პატარა ცვლილებას შეაქვს და ბოლოს ტესტებს უშვებს. თითოეული მოთხოვნა შედეგის ჩვენებას წერამდე ან ფაილების უცვლელად დატოვებას ითხოვს, ამიტომ პირველი სესია უსაფრთხო რჩება.
  <b-codebox title="1. პროექტის გაცნობა" copy>
    რას აკეთებს ეს პროექტი? რომელ ტექნოლოგიებს იყენებს და სად არის მთავარი შესასვლელი წერტილი? უპასუხე ხუთპუნქტიანი სიით.
  </b-codebox>
  <b-codebox title="2. პროექტის წესები" copy>
    წაიკითხე პროექტი და შექმენი ფაილი CLAUDE.md: აგების და ტესტების ბრძანებები, საქაღალდეების სტრუქტურა, რას არ უნდა შეხებოდნენ. ტექსტი დაწერამდე მაჩვენე.
  </b-codebox>
  <b-codebox title="3. პატარა ცვლილება" copy>
    დაამატე README-ში განყოფილება „Installation“ package.json-ის ბრძანებებით. მაჩვენე ცვლილება და დაველოდე ჩემს დადასტურებას.
  </b-codebox>
  <b-codebox title="4. შემოწმება, რომ ყველაფერი მუშაობს" copy>
    გაუშვი პროექტის ტესტები და ჩამოთვალე ჩავარდნილები. თითოეულისთვის შესაძლო მიზეზი შემოგვთავაზე, მაგრამ ფაილებს ჯერ ნუ შეცვლი.
  </b-codebox>
  <b-links cols="1">
    <item href="/materials/glossary/claude-md/" k="ტერმინი" t="CLAUDE.md">პროექტის წესების ფაილი, რომელსაც Claude Code ყოველ სესიაში კითხულობს</item>
  </b-links>
</b-chapter>
<b-chapter id="faq" icon="chat" title="ხშირად დასმული კითხვები">
  <b-faq-cards>
    <q t="როგორ დავაყენო Claude Code?">გახსენით ტერმინალი და გაუშვით ერთი ბრძანება: macOS-ზე, Linux-ზე და WSL-ში curl -fsSL https://claude.ai/install.sh | bash; Windows-ზე PowerShell-ში irm https://claude.ai/install.ps1 | iex. შემდეგ გახსენით ახალი ტერმინალი, შეამოწმეთ claude --version და პროექტის საქაღალდეში გაუშვით claude. წყარო: code.claude.com/docs/en/setup. შემოწმების თარიღი: 18.11.2026.</q>
    <q t="რა ღირს Claude Code?">ცალკე ფასი არ არსებობს: Claude Code გამოწერებშია ჩართული. 18.11.2026-ს Pro თვიური გადახდით თვეში 20 დოლარი ღირს, Max 100, Ultra 200, Team-ის ადგილი 25; უფასო ტარიფში Claude Code არ შედის. გამოწერის ალტერნატივაა გადახდა API-ით Console-ის გავლით. წყარო: claude.com/pricing.</q>
    <q t="მუშაობს თუ არა Claude Code რუსეთში?">რუსეთი Anthropic-ის მხარდაჭერილი ქვეყნების ოფიციალურ სიაში არ არის, პირობებში კი Claude Code იმ პროდუქტებშია დასახელებული, რომლებიც მხოლოდ ჩამოთვლილ ქვეყნებში მუშაობს. სიის გარეთ მყოფი ნებისმიერი ქვეყანა მხარდაუჭერლად ითვლება. პირობები ძალაში 12.11.2026-ს შევიდა. წყარო: anthropic.com/supported-countries. შემოწმების თარიღი: 18.11.2026. დეტალურად <a href="/blog/claude-code-access-regions-vpn-bans/">სტატიაში ქვეყნების მიხედვით წვდომის, VPN-ისა და ბლოკირების შესახებ</a>.</q>
    <q t="რით შეიძლება Claude Code-ის ჩანაცვლება?">მსგავსი აგენტებით: OpenCode თქვენი არჩეული მოდელით, OpenAI-ის Codex, Cursor რედაქტორი ჩაშენებული აგენტით და Google-ისგან Antigravity CLI Gemini CLI-ის ნაცვლად, რომელიც ჩვეულებრივ მომხმარებლებისთვის დაიხურა. თითოეულს წვდომა და ფასები განსხვავებული აქვს და პროგრამის საიტზე შეამოწმებთ.</q>
    <q t="შედის თუ არა Claude Code უფასო ტარიფში?">არა. Claude Code-ს Pro, Max, Ultra, Team, Enterprise ან Console ანგარიში სჭირდება; უფასო claude.ai ტარიფი მასზე წვდომას არ მოიცავს. წყარო: code.claude.com/docs/en/setup.</q>
    <q t="როგორ გავიგო, Claude Code გამოწერით შევიდა თუ გასაღებით?">პროექტის საქაღალდეში გაუშვით claude და აკრიფეთ /status: ბრძანება აქტიურ შესვლის გზას აჩვენებს. თუ სისტემაში ცვლადი ANTHROPIC_API_KEY არის დაყენებული, Claude Code გამოწერის ნაცვლად გასაღებს იყენებს; გამოწერაზე დასაბრუნებლად გაუშვით unset ANTHROPIC_API_KEY. წყარო: code.claude.com/docs/en/authentication.</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="next" title="დამატებით წასაკითხი">
  <b-links cols="2">
    <item href="/blog/claude-code-access-regions-vpn-bans/" k="წვდომა" t="Claude Code არ არის ხელმისაწვდომი თქვენს ქვეყანაში: მხარდაჭერილი ქვეყნები, VPN და ბლოკირება">რას ნიშნავს ქვეყნის შეზღუდვა</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="შედარება" t="Codex თუ Claude Code, Cursor და Hermes Agent">რომელი აგენტი რომელი ამოცანისთვის</item>
    <item href="/blog/specs-rules-skills/" k="კონტექსტი" t="AGENTS.md, CLAUDE.md და spec.md: რა სად იწერება">წესების ფაილები აგენტისთვის</item>
    <item href="/blog/cursor-rules-vs-agents-md/" k="წესები" t="Cursor rules თუ AGENTS.md">რა სად იწერება</item>
    <item href="/blog/harness-driven-development/" k="მეთოდი" t="Harness-Driven Development">აგენტის შეცდომა წესად იქცევა</item>
  </b-links>
</b-chapter>
<b-footer>დაფუძნებულია Claude Code-ის დოკუმენტაციაზე, claude.com/pricing-ზე, Claude-ის დახმარების ცენტრსა და Anthropic-ის წვდომის პირობებზე. შემოწმების თარიღი: 18.11.2026. ფასები და ქვეყნების სია იცვლება.</b-footer>
</b-post>
