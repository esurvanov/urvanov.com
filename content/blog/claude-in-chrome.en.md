---
title: Claude in Chrome: how an agent works in your browser — tests, debugging and forms under your login
date: 2026-10-05
description: Claude in Chrome connects Claude Code to the browser: the agent opens tabs, reads the console, runs scenarios and fills forms under your login. How to connect it, what it does and which permissions to give.
tags: AI, agents, Claude Code, Claude in Chrome, browser, QA, harness
category: harness
layout: wide
mentions: Claude in Chrome, Claude Code, Chrome extension, browser automation, MCP, permissions, QA, Puppeteer, token cost
toc: what=What it is | connect=Connecting | gives=What it does | qa=Example | risks=Permissions and risks | custom=Own tool | first=Where to start | next=Next
---

Claude in Chrome connects the agent to your browser: it opens tabs, reads pages and the console, clicks and types under your login. Below: how it works, how to connect it in a few minutes, what the agent can do and which permissions to give. The agent from the [QA with an agent](/blog/bug-report-to-reproduction-agent/) article uses this channel, and connecting works like [MCP](/blog/mcp-agent-access/).

<b-post series="harness">

<b-chapter id="what" icon="monitor" title="What Claude in Chrome is">
  <b-why>A Chrome extension connects Claude Code to the browser. The agent opens new tabs and works in a visible window.</b-why>
  <iso-art name="claude-in-chrome/terminal-to-browser"></iso-art>
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
    <do k="What to do">Check the requirements: extension version 1.0.36 or later, Claude Code, a Pro, Max, Team or Enterprise plan, and sign-in with /login.</do>
  </b-finding>
</b-chapter>

<b-chapter id="connect" icon="plug" title="How to connect">
  <b-say-agent title="Tell the agent">Open code.claude.com/docs, find the search box, type “hooks” and tell me which results appear.</b-say-agent>
  <b-why align="left">If the extension is missing, Claude Code offers to install it: you agree and sign in through the browser. [If the agent asks you to do it](/blog/agent-hands-work-back-to-you/).</b-why>
  <b-spoiler summary="How to do it by hand">
    <iso-art name="claude-in-chrome/setup-steps"></iso-art>
    <b-codebox copy>
      claude --chrome
      /chrome   # status, permissions, reconnect
    </b-codebox>

<a href="https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn" target="_blank" rel="noopener">Extension in the Chrome Web Store</a>. To skip the flag, open /chrome and turn on “Enabled by default”. The browser tools are then always in context, and token use grows.

    <b-spoiler summary="If it does not connect">
      <b-numchain>
        <step>Extension enabled in chrome://extensions</step>
        <step>Chrome is running, Claude Code is up to date</step>
        <step>/chrome → Reconnect extension</step>
        <step>First time: restart Chrome</step>
      </b-numchain>
    </b-spoiler>
  </b-spoiler>
  <b-finding>
    <ex>The agent opens the docs, types a query into the search box and retells the results. That checks the connection works.</ex>
    <gen>Connecting takes minutes: the extension comes from the Chrome Web Store, and Claude Code does the rest.</gen>
    <do k="What to do">Run the example and make sure /chrome shows “Status: Enabled” and “Extension: Installed”.</do>
  </b-finding>
</b-chapter>

<b-chapter id="gives" icon="grid-alt" title="What the agent can do in the browser">
  <iso-art name="claude-in-chrome/browser-uses"></iso-art>
  <b-finding>
    <ex>One connection covers debugging, tests, forms, documents and data extraction.</ex>
    <gen>The agent reads the console and DOM, runs scenarios, fills forms, uploads files (up to 10 MB in total) and records GIFs.</gen>
    <do k="What to do">Pick one repetitive browser task and hand it to the agent.</do>
  </b-finding>
</b-chapter>

<b-chapter id="qa" icon="bug" title="Example: a bug on the test stand">
  <b-why>Ticket PAY-142 from the article [on QA with an agent](/blog/bug-report-to-reproduction-agent/): the agent walks the path itself and brings evidence.</b-why>
  <b-say-agent title="Tell the agent">Open the test stand, add an item to the cart, apply the promo code and pay with a test card. If the payment fails, look at the console and record a GIF of the path.</b-say-agent>
  <iso-art name="claude-in-chrome/ticket-to-report"></iso-art>
  <b-finding>
    <ex>The agent walks the path, finds the console error and records a GIF for the ticket.</ex>
    <gen>The window is visible, so QA follows the steps and can stop the agent. Console text and the GIF leave a checkable trail.</gen>
    <do k="What to do">Ask for a GIF and a console excerpt with every result.</do>
  </b-finding>
</b-chapter>

<b-chapter id="risks" icon="shield-check" title="Permissions and risks">
  <iso-art name="claude-in-chrome/site-permissions"></iso-art>
  <b-rules sw="1.8">
    <rule icon="lines" t="Sites">The extension settings control which sites the agent can browse, click and type on.</rule>
    <rule icon="bell" t="Prompt">The “Claude in Chrome wants to” dialog allows an action or the whole site for the session.</rule>
    <rule icon="key" t="Your logins">The agent can reach everything you are signed into in this browser.</rule>
    <rule icon="pause" t="Login and CAPTCHA">The agent pauses and waits for you.</rule>
    <rule icon="video" t="GIF">The recording includes everything visible, account details too: review it before sharing.</rule>
    <rule icon="ban" t="Dialogs">alert, confirm and prompt dialogs block commands: close them by hand and ask the agent to continue.</rule>
  </b-rules>
  <b-cap>Page text can be aimed at the agent. This risk is covered in [a separate article](/blog/data-plane-control-plane-prompt-injection/).</b-cap>
  <b-finding>
    <ex>Allowed sites are open to the agent, the rest stay closed, and actions on a new site need your consent.</ex>
    <gen>The agent works with your logins, so site permissions are the first line of defence.</gen>
    <do k="What to do">Open the extension settings and keep only the sites the task needs.</do>
  </b-finding>
</b-chapter>

<b-chapter id="custom" icon="boxes-route" title="When you need your own tool">
  <b-why align="left">Claude in Chrome suits one-off work, but production tasks often need a tool of your own.</b-why>
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
  <iso-art name="claude-in-chrome/start-steps"></iso-art>
  <b-finding>
    <ex>Three steps: extension, launch, check.</ex>
    <gen>Start with a local stand: a mistake there breaks nothing.</gen>
    <do k="What to do">Today, install the extension and run the docs example.</do>
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
