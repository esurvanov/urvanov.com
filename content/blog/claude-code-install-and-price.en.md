---
title: Claude Code: install and pricing, plans and availability by country
seoTitle: Claude Code: install and pricing in 2026, plans and access
date: 2026-11-17
updated: 2026-11-18
description: How to install Claude Code on Mac, Linux and Windows, what Pro, Max, Ultra and Team include, when an API key is needed and whether it runs in Russia.
tags: AI, Claude Code, install, pricing, plans, harness
category: harness
layout: wide
mentions: Claude Code, OpenCode, Codex, Cursor, Gemini CLI, Antigravity CLI, CLAUDE.md
toc: answer=Quick answer | what=What it is | install=Install | login=First run | plans=Plans | check=Check | errors=Errors | region=Availability | alt=Alternatives | prompts=Prompts | faq=Questions | next=Further reading
---

Claude Code installs with one terminal command: on macOS, Linux and WSL `curl -fsSL https://claude.ai/install.sh | bash`, on Windows in PowerShell `irm https://claude.ai/install.ps1 | iex`. Signing in requires a paid Claude Pro subscription at $20 a month, Max, Ultra, Team or Enterprise, or a Console account billed by API usage; the free plan does not work.

<b-post series="harness">
<b-chapter id="answer" title="Quick answer" icon="crosshair">
  <b-why>Installing takes one command, and sign-in happens in the browser. Paid access is always required: a subscription or API billing<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Claude Code requires a Pro, Max, Ultra, Team, Enterprise, or Console account. The free claude.ai plan does not include Claude Code access» — code.claude.com/docs/en/setup"/>.</b-why>

  <iso-art name="claude-code-install-and-price/install-flow"></iso-art>
  <b-cap>The path from an empty terminal to the first answer: open a terminal, paste the command, open a new window, check the version, sign in to your account.</b-cap>
  <b-sublabel top="18">What this means in plain words</b-sublabel>

  Claude Code is a coding agent from Anthropic, the company that makes Claude. It works in the terminal, a window where you type text commands, reads your project files and edits them to do the task you give it. You install it with one command: you copy the line for your system, paste it into the terminal and wait. Then you open the terminal again, check the version and sign in to your Claude account through the browser. Access is paid: you need a subscription or an account billed by API usage. The free Claude chat plan stays free, but Claude Code is not part of it.

  Everyday example. Luka lives in Lisbon and works on a laptop with Ubuntu. He opens the terminal and pastes the command for macOS, Linux and WSL. The installer shows nothing for a few minutes, and Luka does not close the window. Then he opens a new terminal window, types <code>claude --version</code> and sees a version number with the note "(Claude Code)". Signing in is left: Luka runs <code>claude</code> in the project folder, the browser opens the sign-in page, and he signs in through his Pro subscription. Portugal is in Anthropic's country list, so the region is no obstacle.

  Common mistake: installing Claude Code with only a free chat account. The installation will succeed, but signing in will not give access to the agent: the free plan does not include Claude Code. Before installing, decide how you will pay: a Pro, Max, Ultra, Team or Enterprise subscription, or API billing through Console.

  You can check the answer right after installing: the command <code>claude --version</code> prints a version number and "(Claude Code)". Prices and terms were checked against the <a href="https://claude.com/pricing">Claude pricing page</a> and the <a href="https://code.claude.com/docs/en/setup">Claude Code setup page</a>.
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Question</th><th>Answer as of 18.11.2026</th></tr>
    </thead>
    <tbody>
      <tr><td>How to install</td><td>one command: one for macOS, Linux and WSL, another for Windows PowerShell or CMD</td></tr>
      <tr><td>Price</td><td>Pro $20 a month, Max $100, Ultra $200; Team from $25 a seat<b-proof href="https://claude.com/pricing" quote="Claude: Pro «$20 if billed monthly», Max «$100», Ultra «$200», Team standard seat «$25 if billed monthly» — claude.com/pricing"/></td></tr>
      <tr><td>What includes it</td><td>Claude Code is in Pro, Max, Ultra, Team and Enterprise; the free plan has no Claude Code</td></tr>
      <tr><td>Availability</td><td>Russia is not in Anthropic's official country list; the terms name Claude Code among the products with this restriction<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported» — anthropic.com/supported-countries"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Date checked: 18.11.2026. Prices and the country list change: open the Anthropic pages again before you pay.</b-cap>
</b-chapter>
<b-chapter id="what" title="What Claude Code is" icon="terminal">
  <b-why>Claude Code is a coding agent from Anthropic. It reads your project, edits files, runs commands and tests, and works with git. Regular Claude in the chat answers with text, while Claude Code changes the project files itself.</b-why>

  <iso-art name="term:claude-code"></iso-art>
  <b-links cols="1">
    <item href="/materials/glossary/claude-code/" k="Term" t="Claude Code">What it can do, where it runs, which models it uses</item>
  </b-links>
  <b-sublabel top="18">What this means in plain words</b-sublabel>

  An agent does the work itself: you describe the task in words, and it opens the right project files, makes edits, runs checks and shows the result. Git is a program that keeps the history of a project's changes; Claude Code can work with it. Tests are checks that confirm the program still works after an edit; the agent runs them itself and reads the result.

  Claude Code runs in the terminal, in VS Code and JetBrains, in the desktop app, in the browser, in Slack and in CI. This article covers the terminal, which is the main way to use it<b-proof href="https://code.claude.com/docs/en/quickstart" quote="Claude Code: «Claude Code is also available on the web, as a desktop app, in VS Code and JetBrains IDEs, in Slack, and in CI/CD» — code.claude.com/docs/en/quickstart"/>.

  Everyday example. Rita lives in Riga and runs a small website with tests and a change history in git. First she asks Claude in the chat why a button does not work and gets an explanation as text: she has to fix the code herself. Then she launches Claude Code in the site folder and writes the same task. The agent finds the right file, edits it, runs the tests and shows the change. Rita looks at the edit in git and accepts it. Latvia is in Anthropic's country list, so the region raises no questions.

  <b>Is Claude Code the same Claude as in the chat, just in the terminal?</b> No. In the chat Claude answers with text, and you carry the edits over yourself. Claude Code changes project files and runs commands: that is why it needs a separate installation and is included only in paid plans. How to check: the free plan does not include Claude Code, and in the plans table on <a href="https://claude.com/pricing">claude.com/pricing</a> the Free column says "Claude Code: No".
</b-chapter>
<b-chapter id="install" title="Install step by step" icon="arrow-down">
  <b-why>Requirements: macOS 13+, Windows 10 1809+ or Windows Server 2019+, Ubuntu 20.04+, Debian 10+, Alpine 3.19+; 4 GB of memory or more, an x64 or ARM64 processor, internet access<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «macOS 13.0+», «Windows 10 1809+ or Windows Server 2019+», «Ubuntu 20.04+», «4 GB+ RAM» — code.claude.com/docs/en/setup"/>. The commands come from the setup page, date checked: 18.11.2026.</b-why>

  <b-sublabel top="18">Which command to take</b-sublabel>

  The command depends on the window where you type. On macOS, Linux and in WSL (a Linux environment inside Windows) one line is used. On Windows there are two windows, PowerShell and CMD, and their commands differ. You can tell them apart by the prompt: in PowerShell it starts with "PS", in CMD there is no "PS". If you take the command for the other window, the installation will not start.
  <iso-art name="claude-code-install-and-price/which-shell"></iso-art>
  <b-cap>Three commands for three windows: macOS, Linux and WSL; PowerShell with the "PS" prompt; CMD without "PS".</b-cap>
  <b-sublabel top="18">macOS, Linux and WSL</b-sublabel>
  <b-codebox title="Terminal" copy>
    curl -fsSL https://claude.ai/install.sh | bash
  </b-codebox>
  <b-sublabel top="18">Windows: PowerShell (the prompt has PS)</b-sublabel>
  <b-codebox title="PowerShell" copy>
    irm https://claude.ai/install.ps1 | iex
  </b-codebox>
  <b-sublabel top="18">Windows: CMD (the prompt has no PS)</b-sublabel>
  <b-codebox title="CMD" copy>
    curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
  </b-codebox>
  <b-cap>The installer shows no progress while it downloads files. Administrator rights are not needed on Windows. Installing Git for Windows is optional: without it Claude Code runs commands through PowerShell<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Installing Git for Windows is optional» — code.claude.com/docs/en/setup"/>.</b-cap>

  Everyday example. Jan lives in Gdansk and works on a Windows laptop. He opens PowerShell and sees "PS" at the start of the line. So he needs the command <code>irm https://claude.ai/install.ps1 | iex</code>. Jan pastes it and does not see a single line for a few minutes, but he does not close the window: the installer shows no progress. He needed no administrator rights and did not install Git for Windows. When the installation finished, Jan opened PowerShell again and ran <code>claude --version</code>. Poland is in Anthropic's country list. You can check that the window is the right one by the first two letters of the prompt.

  <b-sublabel top="18">Installer or package manager</b-sublabel>

  The installer, that is, the command with <code>curl</code> or <code>irm</code>, is the recommended way: it updates Claude Code in the background by itself. A package manager is a program that installs and updates other programs by name; this way works too, but you have to update Claude Code manually. With npm, install without <code>sudo</code>: the documentation warns that such an installation will not be able to update itself<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Do NOT use sudo npm install -g as this can lead to permission issues and security risks» — code.claude.com/docs/en/setup"/>.
  <iso-art name="claude-code-install-and-price/install-methods"></iso-art>
  <b-cap>The installer updates itself, package managers update manually: Homebrew, WinGet, npm, apt, dnf, apk.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Method</th><th>Command</th><th>Updates</th></tr>
    </thead>
    <tbody>
      <tr><td>Installer (recommended)</td><td><code>curl -fsSL https://claude.ai/install.sh | bash</code></td><td>automatic, in the background</td></tr>
      <tr><td>Homebrew (macOS)</td><td><code>brew install --cask claude-code</code></td><td>manual: <code>brew upgrade claude-code</code></td></tr>
      <tr><td>WinGet (Windows)</td><td><code>winget install Anthropic.ClaudeCode</code></td><td>manual: <code>winget upgrade Anthropic.ClaudeCode</code></td></tr>
      <tr><td>npm (needs Node.js 22+)</td><td><code>npm install -g @anthropic-ai/claude-code@latest</code></td><td>repeat the install command</td></tr>
      <tr><td>apt, dnf, apk</td><td>add the Anthropic repository following the instructions in the documentation</td><td>with the regular system update</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  Everyday example. Marco lives in Milan and works on a Mac. He already installs all his programs through Homebrew, so he picks <code>brew install --cask claude-code</code> instead of the installer. Everything works the same, but a month later Marco updates Claude Code with <code>brew upgrade claude-code</code>: it will not update itself. Italy is in Anthropic's country list. How to check the installation method: if Homebrew installed it, update it with the same Homebrew.

  <b-sublabel top="18">Windows: directly or through WSL</b-sublabel>

  WSL is a Linux environment inside Windows: Claude Code works in it as on regular Linux. The choice depends on the project. If the project and its programs are for Windows, install on Windows directly. If you need Linux programs or command isolation (a sandbox, that is, running the agent's commands in a restricted environment), take WSL 2. WSL 1 fits when WSL 2 is unavailable, but it does not support command isolation.
  <iso-art name="claude-code-install-and-price/windows-modes"></iso-art>
  <b-cap>Three modes on Windows: directly, WSL 2 with command isolation, WSL 1 without isolation.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Option</th><th>When to take it</th><th>Command isolation (sandbox)</th></tr>
    </thead>
    <tbody>
      <tr><td>Windows directly</td><td>projects and programs for Windows</td><td>not supported</td></tr>
      <tr><td>WSL 2</td><td>Linux programs or command isolation</td><td>supported</td></tr>
      <tr><td>WSL 1</td><td>if WSL 2 is unavailable</td><td>not supported</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>In WSL you run the Linux command inside the WSL window, not from PowerShell<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «You install and launch claude inside the WSL terminal, not from PowerShell or CMD» — code.claude.com/docs/en/setup"/>. On Alpine, <code>bash</code> and <code>curl</code> are needed before installing: <code>apk add bash curl</code>.</b-cap>
</b-chapter>
<b-chapter id="login" title="First run and sign-in" icon="key">
  <b-why>Sign-in happens in the browser: Claude Code opens the page itself, and after signing in the terminal shows "Login successful"<b-proof href="https://code.claude.com/docs/en/authentication" quote="Claude Code: «When login completes, the terminal shows Login successful and prompts you to press Enter to continue» — code.claude.com/docs/en/authentication"/>.</b-why>

  <b-sublabel top="18">How to launch</b-sublabel>

  Go to the project folder and run <code>claude</code>. The program opens the browser, you sign in to your Claude account, and the terminal shows "Login successful" and a prompt to press Enter. After that you can ask questions about the project.
  <b-codebox title="First run" copy>
    cd path/to/project
    claude
  </b-codebox>
  <b-cap>If the browser did not open, press <code>c</code>: the sign-in address is copied to the clipboard. You can sign out with the command <code>/logout</code> and sign in again with <code>/login</code>. Help inside the session is <code>/help</code>.</b-cap>
  <b-sublabel top="18">What you can sign in with</b-sublabel>

  The way to sign in depends on how you pay. A Pro, Max or Ultra subscription is issued to a person. Team and Enterprise use the account of an employee invited by an administrator. Claude Console is a separate account billed by API usage with prepaid credits. Amazon Bedrock, Google Cloud and Microsoft Foundry fit organizations that already have a cloud provider.
  <iso-art name="claude-code-install-and-price/login-paths"></iso-art>
  <b-cap>Four sign-in paths: a subscription, Team or Enterprise, Console, cloud providers.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>What to sign in with</th><th>Who it is for</th></tr>
    </thead>
    <tbody>
      <tr><td>Pro, Max or Ultra subscription</td><td>one person, signing in through a claude.ai account</td></tr>
      <tr><td>Team or Enterprise</td><td>an employee invited by an administrator</td></tr>
      <tr><td>Claude Console</td><td>API billing with prepaid credits</td></tr>
      <tr><td>Amazon Bedrock, Google Cloud, Microsoft Foundry</td><td>organizations with a cloud provider</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>The list of accounts comes from the authentication page and the quickstart in the documentation<b-proof href="https://code.claude.com/docs/en/quickstart" quote="Claude Code: «Claude Console (API access with pre-paid credits)» — code.claude.com/docs/en/quickstart"/>.</b-cap>

  Everyday example. Emma lives in Vienna and bought a Pro subscription. She goes to the project folder, runs <code>claude</code>, and the browser opens the sign-in page. Emma signs in to the same Claude account she uses for the chat. The terminal shows "Login successful", she presses Enter and asks: "what does this project do?". A few seconds later the agent describes the project. Later Emma wants to check which account the program is using and types <code>/status</code>; to switch accounts she uses <code>/logout</code> and <code>/login</code>. Austria is in Anthropic's country list, so the region is no obstacle.

  <b>Are a chat subscription and Claude Code two separate sign-ins?</b> No. A Pro, Max or Ultra subscription is issued to a claude.ai account, and the same account opens Claude Code. They share one limit. How to check: after signing in, type <code>/status</code> and look at which sign-in method is shown.

  <b>Is a free Claude account enough?</b> No. The setup requirements say: "The free claude.ai plan does not include Claude Code access". You can sign in to Claude Code only through a paid route: a subscription, Team, Enterprise, Console or a cloud provider. How to check: open the <a href="https://code.claude.com/docs/en/setup">Claude Code setup page</a> and find this phrase in the requirements.
</b-chapter>

<b-chapter id="plans" title="Plans: what is included and what it costs" icon="coin">
  <b-why>Claude Code is included in the paid Pro, Max, Ultra, Team and Enterprise plans and is not included in the free plan<b-proof href="https://claude.com/pricing" quote="Claude: Free «Claude Code: No», Pro «$20 if billed monthly», Ultra «10x Pro usage every week», Team premium seat «5x more usage than standard seats» — claude.com/pricing"/>. Prices and contents are taken from claude.com/pricing. Date checked: 18.11.2026. Plans change, so open Anthropic's pricing page again before you pay.</b-why>

  A plan is a subscription with a fixed monthly price and its own amount of usage. Claude Code has no separate price: it comes with the subscription, together with ordinary Claude in chat. The higher the plan, the more usage you can spend in a five-hour window and in a week. Pro, Max and Ultra suit one person, Team seats suit a team, and Enterprise suits a company with a contract.
  <iso-art name="claude-code-install-and-price/plans-ladder"></iso-art>
  <b-cap>The plan ladder: Free without Claude Code, then Pro, Max, Ultra, Team standard and premium seats, Enterprise by contract.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Plan</th><th>Price per month</th><th>Claude Code</th><th>Usage</th></tr>
    </thead>
    <tbody>
      <tr><td>Free</td><td>$0</td><td>no</td><td>limited</td></tr>
      <tr><td>Pro</td><td>$20 if billed monthly, $17 if billed yearly ($200 up front)</td><td>yes</td><td>base</td></tr>
      <tr><td>Max</td><td>$100</td><td>yes</td><td>5x Pro</td></tr>
      <tr><td>Ultra</td><td>$200</td><td>yes</td><td>10x Pro per week</td></tr>
      <tr><td>Team, standard seat</td><td>$25 monthly, $20 if billed yearly</td><td>yes</td><td>as in the seat's subscription</td></tr>
      <tr><td>Team, premium seat</td><td>$125 monthly, $100 if billed yearly</td><td>yes</td><td>5x a standard seat</td></tr>
      <tr><td>Enterprise</td><td>on the page: $20 per seat per month if billed yearly, from 20 seats</td><td>yes</td><td>by contract</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Source: claude.com/pricing. Date checked: 18.11.2026.</b-cap>
  <b-sublabel top="18">A worked example</b-sublabel>

  Jonas lives in Vilnius and wants to try Claude Code on his own project. He opens the pricing page and sees the note “Claude Code: No” next to Free, so the free option is out. Pro costs 20 dollars a month when billed monthly, and that is enough to start. Yearly billing lowers the price to 17 dollars a month, but 200 dollars are charged at once, and Jonas is not yet sure he will use the agent every day. He takes monthly billing. To check your own case, open the pricing page and find the Claude Code note in the row of your plan.

  <b-sublabel top="18">Limits</b-sublabel>

  A limit is the amount of usage after which the subscription asks you to wait. Pro and Max have two: a five-hour session limit and a weekly limit<b-proof href="https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan" quote="Claude Help Center: «Pro and Max plans have a five-hour session limit and a weekly limit» — support.claude.com"/>. Ultra has a weekly limit, and verified Ultra accounts have no five-hour limit. The limit is shared by Claude in chat and Claude Code: if you spent the usage in chat, less is left for the agent.
  <iso-art name="claude-code-install-and-price/limits"></iso-art>
  <b-cap>Two spending windows, five-hour and weekly; one pool of usage for chat and Claude Code.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Plan</th><th>Which limit</th></tr>
    </thead>
    <tbody>
      <tr><td>Pro and Max</td><td>a five-hour session limit and a weekly limit</td></tr>
      <tr><td>Ultra</td><td>a weekly limit; verified Ultra accounts have no five-hour limit</td></tr>
      <tr><td>All subscriptions</td><td>the limit is shared by Claude in chat and Claude Code</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  When the limit runs out, you can turn on extra usage paid with credits or buy API credits at standard API prices. To stay within the subscription, decline paying with credits. A week later Jonas notices that in the evening the agent asks him to wait: in the morning he talked to Claude in chat for a long time, and the shared usage is already gone. He decides not to buy credits and simply waits for the new window.

  <b-sublabel top="18">An API key instead of a subscription</b-sublabel>

  An API key is a programmatic password with which Claude Code pays for each request at API rates. A subscription has a fixed price, while a key is paid by volume. If the variable <code>ANTHROPIC_API_KEY</code> is set in the system, Claude Code takes the key instead of the subscription. For Jonas this was a surprise: the variable was left over from another project, and spending went at API rates even though his subscription was paid.
  <iso-art name="claude-code-install-and-price/api-vs-subscription"></iso-art>
  <b-cap>Two ways to pay: a subscription with a fixed price and an API key paid by volume. The key overrides the subscription.</b-cap>
  <b-finding>
    <ex>If the variable <code>ANTHROPIC_API_KEY</code> is set in the system, Claude Code takes the key instead of the subscription, and spending goes at API rates.</ex>
    <gen>A subscription has a fixed price and limits, a key is paid by volume. A key pays off when the workload is irregular or you need a bill per project.</gen>
    <do>To return to the subscription, remove the variable (<code>unset ANTHROPIC_API_KEY</code>) and check the sign-in method with the command <code>/status</code><b-proof href="https://code.claude.com/docs/en/authentication" quote="Claude Code: «Run unset ANTHROPIC_API_KEY to fall back to your subscription, and check /status to confirm which method is active» — code.claude.com/docs/en/authentication"/>.</do>
  </b-finding>

  Prices per million tokens by model are not given here: I did not check them on the pricing page on 18.11.2026.

  <b-sublabel top="18">Common misconceptions</b-sublabel>

  <b>Does the free plan give Claude Code?</b> No. The installation documentation says Claude Code requires a Pro, Max, Ultra, Team, Enterprise or Console account, and the free claude.ai plan does not include access to it<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Claude Code requires a Pro, Max, Ultra, Team, Enterprise, or Console account. The free claude.ai plan does not include Claude Code access» — code.claude.com/docs/en/setup"/>. How to check: open the pricing page and find the note “Claude Code: No” next to Free.

  <b>Does a paid subscription lift the regional restriction?</b> No. Anthropic's country list applies to use regardless of the plan and the way you pay<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported» — anthropic.com/supported-countries"/>. How to check: find your country in the list on Anthropic's page.

  <b>Is an API key cheaper than a subscription?</b> It depends on the workload. A subscription costs a fixed sum, a key charges money by volume, and I did not check the exact rates on the pricing page on 18.11.2026. How to check: compare a month of spending in Console with the price of the subscription.
</b-chapter>
<b-chapter id="check" title="How to check that everything works" icon="check-circle">
  <b-why>A working installation prints a version number with the note “(Claude Code)”<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «A working installation prints a version number such as 2.1.211 (Claude Code)» — code.claude.com/docs/en/setup"/>. Next come diagnostics, the sign-in method and a first question about the project.</b-why>

  The check is five short steps, and each answers its own question. The version shows that the program is found and starts. Diagnostics collects a report on the installation and settings without starting a session. The status inside a session tells you how you signed in: with a subscription or with a key. A question about the project tests the whole chain at once: sign-in, network and file reading. The update shows that the installation can receive new versions.
  <iso-art name="claude-code-install-and-price/check-ladder"></iso-art>
  <b-cap>The ladder of checks: version, diagnostics, status, a question about the project, update.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Check</th><th>Command</th><th>What you should see</th></tr>
    </thead>
    <tbody>
      <tr><td>Version</td><td><code>claude --version</code></td><td>a version number and “(Claude Code)”</td></tr>
      <tr><td>Diagnostics</td><td><code>claude doctor</code></td><td>a report on the installation and settings without starting a session</td></tr>
      <tr><td>Sign-in</td><td><code>/status</code> inside a session</td><td>the sign-in method: subscription or key</td></tr>
      <tr><td>Work with a project</td><td>the question “what does this project do?”</td><td>a short description of the project</td></tr>
      <tr><td>Update</td><td><code>claude update</code></td><td>“Claude Code is up to date”</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">A worked example</b-sublabel>

  Sarah lives in Dublin and has just installed Claude Code on her laptop. She opens a new terminal window and types <code>claude --version</code>. A version number appears with the note “(Claude Code)”, so the program is found. Then she runs <code>claude doctor</code> and gets a report on the installation. In the project folder she runs <code>claude</code>, types <code>/status</code> and sees that she signed in with a subscription and with no key involved. The last step is the question “what does this project do?”: a short description of the project means the whole chain works. You can check it yourself in five minutes by going through the table from top to bottom.

  <b-sublabel top="18">A common mistake</b-sublabel>

  Stopping at the version. A version number confirms only that the program is found in PATH. It does not check sign-in, network or file permissions. If the version prints but the question about the project gets no answer, look for the cause in the sign-in: check <code>/status</code> and run <code>/login</code> if needed.
</b-chapter>
<b-chapter id="errors" title="Common installation errors" icon="alert-circle">
  <b-why>The documentation has a solution for every error message: the “Find your error” table on the page “Troubleshoot installation and login”<b-proof href="https://code.claude.com/docs/en/troubleshoot-install" quote="Claude Code: the “Find your error” table gives a fix for each message — code.claude.com/docs/en/troubleshoot-install"/>. Date checked: 18.11.2026.</b-why>

  An installation error is read from the text of the message: from it you go to the cause, and from the cause to the action. Most often the cause is simple: the install folder is not in PATH (the list of folders where the terminal looks for programs), the command is for the wrong shell, or rights or memory are missing. Countries outside the supported list are a separate case: it is described in the table by the rows on 403 and “App unavailable in region”.
  <iso-art name="claude-code-install-and-price/install-errors"></iso-art>
  <b-cap>The error tree: what you see, what the cause is, what to do.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>What you see</th><th>Cause</th><th>What to do</th></tr>
    </thead>
    <tbody>
      <tr><td><code>command not found: claude</code> or “'claude' is not recognized”</td><td>the install folder is not in PATH</td><td>open a new terminal window; on macOS and Linux add <code>~/.local/bin</code> to PATH</td></tr>
      <tr><td><code>The token '&amp;&amp;' is not a valid statement separator</code></td><td>the CMD command was run in PowerShell</td><td>take the command <code>irm … | iex</code></td></tr>
      <tr><td><code>'irm' is not recognized</code></td><td>the PowerShell command was run in CMD</td><td>take the command <code>curl … install.cmd</code></td></tr>
      <tr><td><code>syntax error near unexpected token '&lt;'</code></td><td>a web page came instead of the script</td><td>check the network and proxy, open the solutions section of the documentation</td></tr>
      <tr><td><code>curl: (22) … 403</code></td><td>a proxy or filter blocks the address, or the country is outside the supported list</td><td>check the network; for the country list and what to do, read the <a href="/en/blog/claude-code-access-regions-vpn-bans/">article on access by country, VPNs and bans</a></td></tr>
      <tr><td><code>EACCES: permission denied</code></td><td>no rights to the install folder</td><td>fix the folder's permissions, do not use <code>sudo</code></td></tr>
      <tr><td><code>TLS connect error</code></td><td>outdated certificates or a proxy inspecting traffic</td><td>update the system certificates</td></tr>
      <tr><td><code>Killed</code> during installation on Linux</td><td>not enough memory</td><td>free memory or add swap</td></tr>
      <tr><td><code>App unavailable in region</code></td><td>Claude Code is unavailable in the country</td><td>check the list of supported countries: <a href="/en/blog/claude-code-access-regions-vpn-bans/">Claude Code not available in your country: supported countries, VPN and bans</a></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">A worked example</b-sublabel>

  Mateus lives in São Paulo and installed Claude Code on a Mac with one command. The installer finished, but the terminal shows “command not found: claude”. He decides the installation broke and wants to run it again. First he opens a new terminal window: the old window does not know about the new folder. If the message stays, the cause is PATH, and he needs to add <code>~/.local/bin</code> to the zsh settings file and open the window again (the command is in the next block). After that <code>claude --version</code> prints a version. To check that you did the same, look at the output of <code>claude --version</code>.

  <b-sublabel top="18">PATH on macOS with zsh</b-sublabel>
  <b-codebox title="Add the folder to PATH" copy>
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
  </b-codebox>

  For bash, <code>~/.bashrc</code> fits instead of <code>~/.zshrc</code>. After the edit, open a new terminal window<b-proof href="https://code.claude.com/docs/en/troubleshoot-install" quote="Claude Code: «echo 'export PATH=&quot;$HOME/.local/bin:$PATH&quot;' >> ~/.zshrc» — code.claude.com/docs/en/troubleshoot-install"/>.

  <b-sublabel top="18">Common misconceptions</b-sublabel>

  <b>If claude is not found, did the installer fail?</b> Most often it worked, and the terminal does not know about the new folder: in the table this is the PATH row with the solution “open a new terminal window”. How to check: open a new window and repeat <code>claude --version</code>.

  <b>Does a change of network always cure error 403?</b> No. In the table 403 has two causes: a proxy or filter, or a country outside the supported list. In the second case the network will not help, and you need to look at Anthropic's country list.

  <b>Is EACCES cured with sudo?</b> No. The table names fixing the folder's permissions as the solution and says not to use <code>sudo</code>.
</b-chapter>
<b-chapter id="region" title="Access from Russia" icon="flag">
  <b-why>Russia is not in Anthropic's official list of supported countries, and the terms name Claude Code among the products available only in the listed countries. Date checked: 18.11.2026. The terms took effect on 12.11.2026<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported» — anthropic.com/supported-countries"/>.</b-why>

  The country list is an Anthropic document naming the places where Claude can be used. Any country or region that is not in the list counts as unsupported. There is no entry “Russia” in the list, so installation and sign-in from Russia are not supported. Anthropic does not give its reasons. My guess is that they lie in the policy of the US and other countries: sanctions, export restrictions and laws. This is a guess, and the company's documents have no such explanation.
  <iso-art name="claude-code-access-regions-vpn-bans/world-map"></iso-art>
  <b-cap>A map of the countries where Anthropic supports Claude Code, and the countries outside the list.</b-cap>

  During installation this shows as the message “App unavailable in region” and as a 403 error on download: both rows are in the errors table. A paid subscription does not lift the restriction: the list applies to a paid plan and to an API key alike. What the restriction means, how to read entries with brackets and what is legal to do if your country is not in the list is covered in detail in a separate article.
  <b-links cols="1">
    <item href="/en/blog/claude-code-access-regions-vpn-bans/" k="In detail" t="Claude Code not available in your country: supported countries, VPN and bans">What the restriction means and what to do</item>
  </b-links>
</b-chapter>
<b-chapter id="alt" title="Alternatives to Claude Code" icon="grid">
  <b-why>Alternatives do the same as Claude Code: they read a project, edit files and run commands. They differ in model, price and place of work. Each has its own access terms, which you check on the program's website.</b-why>

  An alternative is another coding agent: it works in a terminal or in an editor and changes project files at your request. You choose one by three questions. Whose model sits inside? Where does it work: in a terminal, in an app or in an editor? How do you pay for it? Each agent has a description in the site's glossary; the facts on Gemini CLI and Antigravity CLI come from their articles, which also give the dates.
  <iso-art name="claude-code-install-and-price/alternatives-map"></iso-art>
  <b-cap>A map of alternatives: OpenCode, Codex, Cursor, Gemini CLI and its successor Antigravity CLI.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Agent</th><th>Whose, on which model</th><th>Where it works</th></tr>
    </thead>
    <tbody>
      <tr><td>OpenCode</td><td>an open agent, you choose the model: Claude, GPT, Gemini and others through an API or a local one; you pay the model provider</td><td>terminal, app, web</td></tr>
      <tr><td>Codex</td><td>OpenAI, GPT models</td><td>ChatGPT, app, terminal, IDE</td></tr>
      <tr><td>Cursor</td><td>Anysphere, an editor based on VS Code with a built-in agent; its own models and other companies' models</td><td>editor</td></tr>
      <tr><td>Gemini CLI</td><td>Google, Gemini models; stopped working for ordinary users on 18 June 2026</td><td>terminal</td></tr>
      <tr><td>Antigravity CLI</td><td>Google; Gemini CLI was moved into it</td><td>terminal, Antigravity app</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">How to choose</b-sublabel>

  If you need your own model and direct payment to the provider, look at OpenCode. If you already pay for ChatGPT, look at Codex. If you prefer working in an editor rather than a terminal, look at Cursor. If you used Gemini CLI, Antigravity CLI took its place. Install commands for the alternatives are not given here: each has its own and they change. You can find them on the program's own website.
  <b-links cols="2">
    <item href="/materials/glossary/opencode/" k="Term" t="OpenCode">An open agent for the terminal</item>
    <item href="/materials/glossary/codex/" k="Term" t="Codex">OpenAI's agent</item>
    <item href="/materials/glossary/cursor/" k="Term" t="Cursor">An editor with an agent</item>
    <item href="/materials/glossary/gemini-cli/" k="Term" t="Gemini CLI">Google's agent in the terminal</item>
    <item href="/materials/glossary/antigravity-cli/" k="Term" t="Antigravity CLI">The successor of Gemini CLI</item>
    <item href="/en/blog/ai-in-code-harness-and-tools/" k="Comparison" t="Codex vs Claude Code, Cursor and Hermes Agent">Which agent for which task</item>
    <item href="/en/blog/codex-or-chatgpt-what-to-choose/" k="Choice" t="Codex vs ChatGPT: which to pick">A chat or a coding agent</item>
  </b-links>
</b-chapter>
<b-chapter id="prompts" title="Ready-made prompts for the agent" icon="chat">
  <b-why>Four prompts for the first session. Paste them into Claude Code after you run <code>claude</code> in the project folder.</b-why>

  The prompts go in rising order: first the agent only reads and tells, then it creates a rules file, then it makes a small edit, and at the end it runs the tests. Each prompt asks to show the result before writing or to leave files unchanged, so the first session stays safe.
  <b-codebox title="1. Getting to know the project" copy>
    What does this project do? Which technologies does it use and where is the main entry point? Answer with a list of five items.
  </b-codebox>
  <b-codebox title="2. Project rules" copy>
    Read the project and create a CLAUDE.md file: build and test commands, folder structure, what must not be touched. Show me the text before writing.
  </b-codebox>
  <b-codebox title="3. A small edit" copy>
    Add an “Installation” section to the README with the commands from package.json. Show me the change and wait for my confirmation.
  </b-codebox>
  <b-codebox title="4. Checking that it works" copy>
    Run the project's tests and list the failing ones. Suggest a cause for each, but do not change any files yet.
  </b-codebox>
  <b-links cols="1">
    <item href="/materials/glossary/claude-md/" k="Term" t="CLAUDE.md">The project rules file that Claude Code reads in every session</item>
  </b-links>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Frequently asked questions">
  <b-faq-cards>
    <q t="How do I install Claude Code?">Open a terminal and run one command: on macOS, Linux and WSL, curl -fsSL https://claude.ai/install.sh | bash; on Windows in PowerShell, irm https://claude.ai/install.ps1 | iex. Then open a new terminal window, check claude --version and run claude in the project folder. Source: code.claude.com/docs/en/setup. Date checked: 18.11.2026.</q>
    <q t="How much does Claude Code cost?">There is no separate price: Claude Code is included in the subscriptions. On 18.11.2026 Pro costs 20 dollars a month when billed monthly, Max 100, Ultra 200, a Team seat 25; the free plan does not include Claude Code. The alternative to a subscription is paying by API through Console. Source: claude.com/pricing.</q>
    <q t="Does Claude Code work in Russia?">Russia is not in Anthropic's official list of supported countries, and the terms name Claude Code among the products available only in the listed countries. Any country outside the list counts as unsupported. The terms took effect on 12.11.2026. Source: anthropic.com/supported-countries. Date checked: 18.11.2026. More in the <a href="/en/blog/claude-code-access-regions-vpn-bans/">article on access by country, VPNs and bans</a>.</q>
    <q t="What can replace Claude Code?">Similar agents: OpenCode with a model of your choice, Codex from OpenAI, the Cursor editor with a built-in agent, and from Google Antigravity CLI in place of Gemini CLI, which is closed to ordinary users. Access and prices differ for each, and you check them on the program's website.</q>
    <q t="Is Claude Code in the free plan?">No. Claude Code requires a Pro, Max, Ultra, Team, Enterprise or Console account; the free claude.ai plan does not include access to it. Source: code.claude.com/docs/en/setup.</q>
    <q t="How do I tell whether Claude Code signed in with a subscription or a key?">Run claude in the project folder and type /status: the command shows the active sign-in method. If the variable ANTHROPIC_API_KEY is set in the system, Claude Code takes the key instead of the subscription; to return to the subscription, run unset ANTHROPIC_API_KEY. Source: code.claude.com/docs/en/authentication.</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="next" title="Related reading">
  <b-links cols="2">
    <item href="/en/blog/claude-code-access-regions-vpn-bans/" k="Access" t="Claude Code not available in your country: supported countries, VPN and bans">What the country restriction means</item>
    <item href="/en/blog/ai-in-code-harness-and-tools/" k="Comparison" t="Codex vs Claude Code, Cursor and Hermes Agent">Which agent for which task</item>
    <item href="/en/blog/specs-rules-skills/" k="Context" t="AGENTS.md, CLAUDE.md and spec.md: what goes where">Rules files for the agent</item>
    <item href="/en/blog/cursor-rules-vs-agents-md/" k="Rules" t="Cursor rules vs AGENTS.md">What goes where</item>
    <item href="/en/blog/harness-driven-development/" k="Method" t="Harness-Driven Development">An agent's mistake becomes a rule</item>
  </b-links>
</b-chapter>
<b-footer>Based on the Claude Code documentation, claude.com/pricing, the Claude help center and Anthropic's access terms. Date checked: 18.11.2026. Prices and the country list change.</b-footer>
</b-post>
