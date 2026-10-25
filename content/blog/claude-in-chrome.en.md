---
title: Claude in Chrome: how an agent works in your browser — tests, debugging and forms under your login
date: 2026-10-05
updated: 2026-10-25
description: Claude in Chrome connects Claude Code to the browser: the agent opens tabs, reads the console, runs scenarios and fills forms under your login. How to connect it, what it does and which permissions to give.
tags: AI, agents, Claude Code, Claude in Chrome, browser, QA, harness
category: harness
layout: wide
mentions: Claude in Chrome, Claude Code, Chrome extension, browser automation, MCP, permissions, QA, Puppeteer, token cost
toc: what=What it is | connect=Connecting | gives=What it does | qa=Example | risks=Permissions and risks | tradeoff=Price of flexibility | custom=Own script | first=Where to start | next=Next
---

Claude in Chrome connects the agent to your browser: it opens tabs, reads pages and the console, clicks and types under your login. Below: how it works, how to connect it in a few minutes, what the agent can do and which permissions to give. The agent from the [QA with an agent](/blog/bug-report-to-reproduction-agent/) article uses this channel, and connecting works like [MCP](/blog/mcp-agent-access/).

<b-post series="harness">

<b-chapter id="what" icon="monitor" title="What Claude in Chrome is">
  <b-why>A Chrome extension connects Claude Code to the browser. The agent opens new tabs and works in a visible window<b-proof href="https://code.claude.com/docs/en/chrome" quote="Browser actions run in a visible Chrome window in real time."/>.</b-why>
  <iso-art name="claude-in-chrome/terminal-to-browser"></iso-art>
  <b-why align="left">The picture shows three participants from left to right: Claude Code in the terminal, the extension and your browser. The agent gives the extension commands (open a tab, click, read the page), and the extension carries them out in the browser where you are already signed in to your services. So the agent does not need to type passwords: your session is already open<b-proof href="https://code.claude.com/docs/en/chrome" quote="shares your browser's login state"/>. The work happens in a visible window, and you can follow the steps.</b-why>
  <b-why align="left">The tags below show which browsers the extension works with. Chrome and Edge are officially supported<b-proof href="https://code.claude.com/docs/en/chrome" quote="Chrome integration works with Google Chrome and Microsoft Edge."/>. Brave, Arc, Vivaldi and Opera are built on the same Chromium engine: Claude Code finds the extension in them and connects<b-proof href="https://code.claude.com/docs/en/chrome" quote="Claude Code also detects the extension and sets up the connection in other Chromium-based browsers"/>. The last tag, “WSL: no”, means this connection does not work in the Windows Subsystem for Linux (WSL)<b-proof href="https://code.claude.com/docs/en/chrome" quote="Chrome integration isn't supported in Windows Subsystem for Linux (WSL)."/>.</b-why>
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
    <ex>The agent in the terminal drives Chrome tabs through the extension and uses your logins.</ex>
    <gen>Actions are visible in the window in real time. On a login page or CAPTCHA the agent stops and waits for you. In Claude Code the extension appears as the claude-in-chrome MCP server: /mcp lists its tools.</gen>
    <do k="What to do">Check the requirements: extension version 1.0.36 or later<b-proof href="https://code.claude.com/docs/en/chrome" quote="version 1.0.36 or later"/>, Claude Code, a Pro, Max, Team or Enterprise plan<b-proof href="https://code.claude.com/docs/en/chrome" quote="A direct Anthropic plan (Pro, Max, Team, or Enterprise)"/>, and sign-in with /login<b-proof href="https://code.claude.com/docs/en/chrome" quote="Chrome integration also requires signing in with"/>.</do>
  </b-finding>
</b-chapter>

<b-chapter id="connect" icon="plug" title="How to connect">
  <b-say-agent title="Tell the agent">Install Claude in Chrome and connect it to Claude Code.</b-say-agent>
  <b-why align="left">If the extension is missing, Claude Code offers to install it<b-proof href="https://code.claude.com/docs/en/chrome" quote="Claude Code shows an install prompt titled"/>: you agree and sign in through the browser. [If the agent asks you to do it](/blog/agent-hands-work-back-to-you/).</b-why>
  <b-spoiler summary="How to do it by hand">
    <b-why align="left">Connecting takes three steps. Step 1: install the Claude extension in your Chrome from the extension store, once. Step 2: in the terminal where Claude Code runs, start claude --chrome, and the agent links to the browser. Step 3: type /chrome and look at the status: if it says “Enabled”, the link works.</b-why>
    <iso-art name="claude-in-chrome/setup-steps"></iso-art>
    <b-codebox copy>
      claude --chrome
      /chrome   # status, permissions, reconnect
    </b-codebox>

<a href="https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn" target="_blank" rel="noopener">Extension in the Chrome Web Store</a>. To skip the flag, open /chrome and turn on “Enabled by default”. The browser tools are then always in context, and token use grows<b-proof href="https://code.claude.com/docs/en/chrome" quote="Enabling Chrome by default increases context usage since the browser tools and their instructions are always loaded."/>.

    <b-spoiler summary="If it does not connect">
      <b-node-grid min="170">
        <node icon="check" t="Extension is on">on the chrome://extensions page</node>
        <node icon="play" t="Chrome is running">and Claude Code is up to date</node>
        <node icon="refresh-cw" t="Reconnect">the /chrome command, item Reconnect extension</node>
        <node icon="monitor-screen" t="First time">restart Chrome after installing</node>
      </b-node-grid>
    </b-spoiler>
  </b-spoiler>
  <b-finding>
    <ex>The agent installs the extension itself and connects it to Claude Code. You only agree and sign in through the browser.</ex>
    <gen>Connecting takes minutes: the extension comes from the Chrome Web Store, and Claude Code does the rest.</gen>
    <do k="What to do">Tell the agent to install the extension and make sure /chrome shows “Status: Enabled” and “Extension: Installed”<b-proof href="https://code.claude.com/docs/en/chrome" quote="The integration is working when the status panel shows"/>.</do>
  </b-finding>
</b-chapter>

<b-chapter id="gives" icon="grid-alt" title="What the agent can do in the browser">
  <b-why align="left">In the center of the picture is the browser, and around it four kinds of work the agent does inside it.</b-why>
  <iso-art name="claude-in-chrome/browser-uses"></iso-art>
  <b-why align="left">First: reading the console and the page, which is how the cause of an error is found. Second: running scenarios and filling forms, which checks that the path works. Third: working with documents under your login, that is with what cannot be opened without signing in. Fourth: extracting data and recording a GIF so that a trace is left for checking. You do not need to write code for every small thing: you state the task in words and the agent finds buttons and fields itself.</b-why>
  <b-finding>
    <ex>One connection covers debugging, tests, forms, documents and data extraction.</ex>
    <gen>The agent reads the console and DOM, runs scenarios, fills forms, uploads files (up to 10 MB in total<b-proof href="https://code.claude.com/docs/en/chrome" quote="a single upload can include up to 10 MB of files in total"/>) and records GIFs<b-proof href="https://code.claude.com/docs/en/chrome" quote="record browser interactions as GIFs"/>.</gen>
    <do k="What to do">Pick one repetitive browser task and hand it to the agent.</do>
  </b-finding>
</b-chapter>

<b-chapter id="qa" icon="bug" title="Example: a bug on the test stand">
  <b-why>Ticket PAY-142 from the article [on QA with an agent](/blog/bug-report-to-reproduction-agent/): the agent walks the path itself and brings evidence.</b-why>
  <b-say-agent title="Tell the agent">Open the test stand, add an item to the cart, apply the promo code and pay with a test card. If the payment fails, look at the console and record a GIF of the path.</b-say-agent>
  <b-why align="left">Next is the example from the QA article: ticket PAY-142 and the agent’s path to a finished result.</b-why>
  <iso-art name="claude-in-chrome/ticket-to-report"></iso-art>
  <b-why align="left">The picture shows the path from ticket to result. The ticket reaches the agent, the agent walks through cart, promo code and payment in the browser, finds the error in the console and records a GIF. QA receives not a retelling but a verifiable trace: console text and a recording of movement across the page. If the recording and console do not match the report, it shows at once.</b-why>
  <b-finding>
    <ex>The agent walks the path, finds the console error and records a GIF for the ticket.</ex>
    <gen>The window is visible, so QA follows the steps and can stop the agent. Console text and the GIF leave a checkable trail.</gen>
    <do k="What to do">Ask for a GIF and a console excerpt with every result.</do>
  </b-finding>
</b-chapter>

<b-chapter id="risks" icon="shield-check" title="Permissions and risks">
  <b-why align="left">The agent works inside your browser, so everything you are signed in to is available to it. The first line of defence in the picture is the list of allowed sites and the permission request on new ones.</b-why>
  <iso-art name="claude-in-chrome/site-permissions"></iso-art>
  <b-why align="left">On the left of the picture you decide: the agent asks “allow?”. In the center are sites A and B, which you allowed and where the agent works. On the right is site C, closed to the agent. An action on a new site starts with your consent. Below are the rules one by one: what the agent sees, where it stops and what to look at before sending a recording.</b-why>
  <b-rules sw="1.8">
    <rule icon="lines" t="Sites">The extension settings control which sites the agent can browse, click and type on.</rule>
    <rule icon="bell" t="Prompt">The “Claude in Chrome wants to” dialog allows an action or the whole site for the session.</rule>
    <rule icon="key" t="Your logins">The agent can reach everything you are signed into in this browser.</rule>
    <rule icon="pause" t="Login and CAPTCHA">The agent pauses and waits for you.</rule>
    <rule icon="video" t="GIF">The recording includes everything visible, account details too: review it before sharing.</rule>
    <rule icon="ban" t="Dialogs">alert, confirm and prompt dialogs block commands: close them by hand and ask the agent to continue.</rule>
  </b-rules>
  <b-why align="left">Each of these rules is in the Claude Code documentation. The agent stops at a login and a CAPTCHA<b-proof href="https://code.claude.com/docs/en/chrome" quote="When Claude encounters a login page or CAPTCHA, it pauses and asks you to handle it manually."/>. The permission request starts with “Claude in Chrome wants to”<b-proof href="https://code.claude.com/docs/en/chrome" quote="The dialog starts with"/>. A GIF recording captures everything visible, including account details<b-proof href="https://code.claude.com/docs/en/chrome" quote="The recording captures everything visible in the browser, including account details on logged-in pages"/>. alert, confirm and prompt dialogs block commands<b-proof href="https://code.claude.com/docs/en/chrome" quote="JavaScript dialogs block browser events and prevent Claude from receiving commands."/>. The list of sites is set in the extension settings<b-proof href="https://code.claude.com/docs/en/chrome" quote="Manage permissions in the Chrome extension settings to control which sites Claude can browse, click, and type on."/>.</b-why>
  <b-cap>Page text can be aimed at the agent. This risk is covered in [a separate article](/blog/data-plane-control-plane-prompt-injection/).</b-cap>
  <b-finding>
    <ex>Allowed sites are open to the agent, the rest stay closed, and actions on a new site need your consent.</ex>
    <gen>The agent works with your logins, so site permissions are the first line of defence.</gen>
    <do k="What to do">Open the extension settings and keep only the sites the task needs.</do>
  </b-finding>
</b-chapter>

<b-chapter id="tradeoff" icon="scales" title="The price of flexibility: slower than a script and with a risk of error">
  <b-why align="left">An agent in the browser works differently from a script or a written program. A script runs the same steps fast and identically. At every step the agent reads the page, thinks and decides what to do next, so it is slower and spends tokens. It can err: click the wrong button or retell what is not on the page, that is [hallucinate](/materials/glossary/hallucination/). In return it copes with a task that cannot be described in code in advance: the page changed, a button moved, the task is stated in words. This is the price of flexibility, and it is better to pay it knowingly.</b-why>
  <b-table id="agent-vs-script">

| | Script | Agent in the browser |
|---|---|---|
| Speed | fast, the same steps | slower: reads and thinks at every step |
| Repeatability | the same result every time | the answer can differ from run to run |
| If the page changed | breaks until it is fixed | adapts, but may err or invent |
| Preparation | code must be written and maintained | describing the task in words is enough |
| Where it fits | mass regular work | one-off work, reconnaissance, unusual pages |

  </b-table>
  <b-why align="left">There is also the author’s observation. Services with a reputation for being strict about automation, LinkedIn for example, usually treat an agent in a real browser more calmly than scripts and scrapers: the actions come from your window, under your login, at the pace of a living person. This gives no guarantee. The rules of such services usually forbid automated actions, and the risk of an account ban stays with you. So give the agent what you would do by hand, in small portions and with a check of the result.</b-why>
  <b-cap>Speed, agent errors and how services react are described from the author’s observations: the Claude Code documentation does not cover them.</b-cap>
  <b-finding>
    <ex>The agent is slower than a script and may err, but it copes where a script would have to be rewritten.</ex>
    <gen>Speed and repeatability are traded for flexibility. A verifiable trace (console, GIF, result text) brings control over errors back.</gen>
    <do k="What to do">For one-off and unusual work use the agent, for mass and regular work write a script. Compare the agent’s result with what you see yourself.</do>
  </b-finding>
</b-chapter>

<b-chapter id="custom" icon="boxes-route" title="When you need your own script">
  <b-why align="left">Claude in Chrome suits one-off work, but production tasks often need a script of your own.</b-why>
  <b-rules sw="1.8">
    <rule icon="code" t="Puppeteer">A library that drives the browser from code: open a page, click, pull out what you need. It runs without an agent at every step.</rule>
    <rule icon="page-lines" t="Whole page">Claude Code takes the whole page: text, elements, screenshots. That is convenient for a one-off task.</rule>
    <rule icon="coin" t="Tokens and speed">The bigger the page, the more tokens each step costs: slower and more expensive.</rule>
    <rule icon="boxes-route" t="Your own script">A custom solution takes only the part of a site or page you need: a table, a form, one block. The agent gets a short result.</rule>
    <rule icon="scales" t="What to choose">One-off tasks and exploration: Claude in Chrome. Regular, high-volume work with a token budget: your own script the agent calls as a tool.</rule>
  </b-rules>
  <b-cap>The script can be connected to the agent through [MCP](/blog/mcp-agent-access/) or a skill: the agent asks for the piece of the page it needs instead of opening all of it.</b-cap>
  <b-finding>
    <ex>The agent reads the whole page and spends tokens and time on it.</ex>
    <gen>For production, tokens and speed matter, so only the needed parts of sites and pages are taken.</gen>
    <do k="What to do">Leave one-off work to Claude in Chrome. Move repeating work into a Puppeteer script and give it to the agent.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="Where to start">
  <b-why align="left">The three steps repeat the start of the article: extension, launch, check.</b-why>
  <iso-art name="claude-in-chrome/start-steps"></iso-art>
  <b-why align="left">For the first launch take a local or test stand: if the agent errs, nothing is harmed. First ask it only to read (open a page and retell it), then allow actions. That way you notice the agent’s mistakes on a safe task.</b-why>
  <b-finding>
    <ex>Three steps: extension, launch, check.</ex>
    <gen>Start with a local stand: a mistake there breaks nothing.</gen>
    <do k="What to do">Today, tell the agent to install the extension and check the status with /chrome.</do>
  </b-finding>
</b-chapter>

<b-chapter id="next" title="Next">
  <b-links>
    <item href="/blog/bug-report-to-reproduction-agent/" k="Example" t="Работа QA после поддержки с ИИ-агентом: исследование, описание и документирование через MCP и скиллы">The agent reproduces a Jira bug</item>
    <item href="/blog/mcp-agent-access/" k="Connecting" t="MCP для ИИ-агента: какую проблему решает и как поручить подключение агенту">How the agent gets access to systems</item>
    <item href="/blog/agent-hands-work-back-to-you/" k="Hand-off" t="Агент любит запрягать вас: как заставить его делать самому">When the agent asks a human for help</item>
  </b-links>
</b-chapter>
<b-footer>Ticket PAY-142 is made up for the example. Facts about connecting and permissions follow the Claude Code docs: <a href="https://code.claude.com/docs/en/chrome" target="_blank" rel="noopener">Use Claude Code with Chrome</a>.</b-footer>
</b-post>
