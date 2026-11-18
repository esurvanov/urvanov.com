---
title: Codex vs ChatGPT: which to pick for working with code
seoTitle: Codex vs ChatGPT: which to pick for code (2026)
date: 2026-11-17
updated: 2026-11-18
description: A chat replies with text, while the Codex agent edits the project and runs tests itself. When each fits, a comparison table, plans, ready prompts and FAQ.
tags: AI, Codex, ChatGPT, agent, harness, Claude Code, Cursor
category: harness
layout: wide
mentions: Codex, ChatGPT, Claude Code, Cursor, AGENTS.md
toc: answer=Quick answer | modes=Three modes | table=Side by side | plans=Plan and limits | pick=When to use which | start=Getting started | faq=Questions | next=Further reading
---

Codex vs ChatGPT, which to pick, depends on the task. ChatGPT replies with text: it explains, drafts and reviews a snippet you paste. Codex works inside the project: it reads code, edits files, runs tests and prepares a pull request. Use chat for a question and Codex for changing a repository; Codex comes with ChatGPT plans at no extra fee.

<b-post series="prompts">
<b-chapter id="answer" title="Quick answer" icon="crosshair">
  <b-why>OpenAI's help splits ChatGPT into Chat, Work and Codex modes; Codex is the one to select for developer views and technical detail<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “Select Codex when you want developer views or more technical detail, especially for software development” — learn.chatgpt.com/docs/use-chatgpt"/>.</b-why>

  <iso-art name="codex-or-chatgpt-what-to-choose/chat-vs-agent"></iso-art>
  <b-cap>On the left, a chat: you paste code, get text back and carry it over by hand. On the right, an agent: it opens the project, edits it and checks the result itself.</b-cap>
  <b-sublabel top="18">What this means in plain words</b-sublabel>

  ChatGPT is OpenAI's app where you talk to a model in three modes: Chat, Work and Codex. A chat sees only what you pasted into it and replies with text. An agent for programs, and Codex is exactly that, opens the files of your project itself, changes them and checks the result with commands. A pull request is a proposal to merge changes into the project's main branch: colleagues review it and either accept it or send it back for rework. The model in every mode comes from the GPT family, so the choice depends on access to the project and on what you need at the end.

  An everyday example. Timur lives in Almaty and maintains an online shop. In the morning he pastes an unfamiliar function into the chat and asks how it calculates a discount: the answer arrives as text, and that is enough. In the afternoon he has to fix a failing test. He opens Codex, names the test and asks it to run all the checks after the fix. The agent finds the file, changes it, runs the tests and shows the list of changes. One question, one fix: two modes in one day.

  A common mistake is asking the chat to fix a repository. The chat returns a piece of code, and you still have to paste it into the right files and run the tests. If you catch yourself carrying answers into the project by hand again and again, the task belongs to Codex. The opposite mistake is launching an agent for a question like "how does this work". A chat is enough to explain, and no edits in the project are needed.

  One question to yourself checks the choice: after the answer, do I need to change files and run something? If yes, take Codex; if all you need is an answer, take the chat.
</b-chapter>
<b-chapter id="modes" title="Three modes of ChatGPT" icon="layers">
  <b-why>OpenAI's help describes the modes in one line each: Chat for a question or back-and-forth, Work for a larger task carried to a reviewable result, Codex for development<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “Use Chat for a question or back-and-forth” — learn.chatgpt.com/docs/use-chatgpt"/>.</b-why>

  A mode is a way of working with the same model: it decides what you get at the end and what access ChatGPT receives. All three modes live in one app and share one subscription.
  <iso-art name="codex-or-chatgpt-what-to-choose/three-modes"></iso-art>
  <b-cap>What each mode produces: Chat gives text, Work gives a finished document or spreadsheet, Codex gives code changes, test results and a pull request.</b-cap>
  <b-sublabel top="18">One day, three modes</b-sublabel>

  Nadia lives in Berlin and runs a small appointment-booking service. In a single day she needs all three modes. In the morning she asks how two ways of storing time in a database differ: that is Chat. In the afternoon she needs a summary for a client of what was done this month: she turns on Work and gets a finished document. In the evening she has to fix the appointment-length calculation and check it with tests: that is Codex. Nadia reached each mode from the result she wanted to get.

  <b-sublabel top="18">Chat: a question and a dialogue</b-sublabel>

  Chat is the mode for a question or a conversation with back-and-forth. OpenAI's help gives examples: ideas, drafts, file summaries. Work with code fits too, if you need to understand a snippet or an error: you paste the text and get an explanation. The output is always text. Example: Nadia pasted an error message from a log and asked what it meant.

  <b-sublabel top="18">Work: a big task to a result</b-sublabel>

  In Work mode ChatGPT takes on a larger task and carries it to a result you can review. You turn this mode on in the switcher. The output is a finished document, spreadsheet or research. On the web it runs in a managed cloud<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “ChatGPT Work runs in a managed cloud environment” — learn.chatgpt.com/docs/use-chatgpt"/>. Example: Nadia asked for a summary for the client and received a document that only needed to be read and sent.

  <b-sublabel top="18">Codex: changes in the project</b-sublabel>

  Codex is the mode for development: technical detail and engineering views. It reads the repository itself, edits files, runs tests and prepares a pull request. If you want a diagram of the concept, there is one in the glossary.
  <iso-art name="term:codex"></iso-art>

  Example: Nadia named the test that fails and limited the edit to one folder. A few minutes later she had a list of changes and the result of the run. Regional restrictions on Codex are not covered in this article: they have <a href="/blog/codex-access-regions-vpn-bans/">a separate article on Codex access</a>.

  <b-sublabel top="18">Where each mode opens</b-sublabel>

  Chat opens on the website and in the mobile app<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Chat is available on the web and mobile — learn.chatgpt.com/docs/use-chatgpt"/>. Work runs on the website in a managed cloud and in the desktop app. Codex is selected in the desktop app; OpenAI lists the terminal, the IDE extension and the cloud among the places for Codex<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Codex is selected in the desktop app; places include CLI, IDE extension, Cloud — learn.chatgpt.com/docs/use-chatgpt"/>. A dash in the diagram means the help names no such place for that mode.
  <iso-art name="codex-or-chatgpt-what-to-choose/where-to-open"></iso-art>
  <b-cap>Places where each mode opens. The terminal and the IDE extension are named only for Codex.</b-cap>
</b-chapter>
<b-chapter id="table" title="Codex and ChatGPT side by side" icon="table-grid">
  <b-why>Rows come from OpenAI's help on modes and plans; the source sits next to each claim. Date checked: 18.11.2026.</b-why>

  David lives in Tbilisi and is choosing where to start in a team of three. He takes the summary table as a memo: he goes down the rows "purpose", "output" and "sees the project" and quickly sees that a chat will not replace an agent in a repository. To check the table yourself, use two OpenAI pages: the help on modes and the help on plans.
  <b-sublabel top="18">How Codex works</b-sublabel>

  Codex works in a loop of several steps. The agent reads the project, edits files, runs tests and shows a diff, that is, the list of changes line by line. If the tests fail, it goes back to the edit. The output is a pull request that a person reviews. The agent takes project instructions from the AGENTS.md file: build commands and prohibitions are worth writing there.
  <iso-art name="codex-or-chatgpt-what-to-choose/codex-loop"></iso-art>
  <b-cap>The Codex loop: reads, edits, runs tests and edits again when they fail; a person reviews the diff and the pull request.</b-cap>
  <b-sublabel top="18">Summary table</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th></th><th>ChatGPT Chat</th><th>ChatGPT Work</th><th>Codex</th></tr>
    </thead>
    <tbody>
      <tr><td>Purpose</td><td>a question or back-and-forth: ideas, drafts, file summaries<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “Use Chat for a question or back-and-forth” — learn.chatgpt.com/docs/use-chatgpt"/></td><td>a larger task carried to a reviewable result<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “carry a larger task through to a reviewable result” — learn.chatgpt.com/docs/use-chatgpt"/></td><td>development: technical detail and engineering views<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Codex is the mode for technical detail in the mode table — learn.chatgpt.com/docs/use-chatgpt"/></td></tr>
      <tr><td>Output</td><td>text</td><td>a finished deliverable: document, spreadsheet, research</td><td>code changes, test results, a pull request</td></tr>
      <tr><td>Sees the project</td><td>only what you paste</td><td>what you give access to</td><td>reads the repository itself</td></tr>
      <tr><td>Where to open</td><td>website and mobile app<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Chat is available on the web and mobile — learn.chatgpt.com/docs/use-chatgpt"/></td><td>website and desktop app; on the web it runs in a managed cloud<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “ChatGPT Work runs in a managed cloud environment” — learn.chatgpt.com/docs/use-chatgpt"/></td><td>desktop app, terminal, IDE extension, cloud<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Codex is selected in the desktop app; places include CLI, IDE extension, Cloud — learn.chatgpt.com/docs/use-chatgpt"/></td></tr>
      <tr><td>Plan</td><td colspan="3">Work and Codex are included in Free, Go, Plus, Pro, Business, Edu and Enterprise; no separate fee<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: “ChatGPT Work and Codex are included in your ChatGPT Free, Go, Plus, Pro, Business, Edu, or Enterprise plan” — learn.chatgpt.com/docs/pricing"/></td></tr>
      <tr><td>Limits</td><td colspan="3">depend on the plan; on Free and Go Codex is meant for light tasks, and Plus costs 20 dollars a month<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: Free — quick coding tasks, Go — lightweight tasks, Plus — $20/month — learn.chatgpt.com/docs/pricing"/></td></tr>
      <tr><td>With an API key</td><td>—</td><td>—</td><td>terminal, SDK and IDE are billed at API rates; cloud features such as GitHub code review are not included<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: an API key lets you use Codex in the CLI, SDK or IDE at API rates; cloud features not included — learn.chatgpt.com/docs/pricing"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>The model in all three modes comes from the GPT family; what differs is access to the project and the kind of result.</b-cap>
</b-chapter>
<b-chapter id="plans" title="Plan and limits" icon="card">
  <b-why>Work and Codex are not sold separately: they come with ChatGPT plans<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: “ChatGPT Work and Codex are included in your ChatGPT Free, Go, Plus, Pro, Business, Edu, or Enterprise plan” — learn.chatgpt.com/docs/pricing"/>.</b-why>

  A plan is what you pay ChatGPT, and one plan opens all three modes. Plans differ in limits: how much Codex work fits into your plan. On Free and Go it is meant for light and quick tasks, and Plus costs 20 dollars a month<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: Free — quick coding tasks, Go — lightweight tasks, Plus — $20/month — learn.chatgpt.com/docs/pricing"/>. This article gives no exact limit numbers: I did not find them, and they depend on the plan.
  <iso-art name="codex-or-chatgpt-what-to-choose/one-subscription"></iso-art>
  <b-cap>One plan opens three modes. Limits depend on the plan.</b-cap>
  <b-sublabel top="18">One plan, one story</b-sublabel>

  Lina lives in Warsaw and writes scripts for an accounting office. She opens OpenAI's plans page and sees that Codex is included even in the free plan, but meant there for quick tasks. For her first week that is enough: she fixes one script and confirms the approach works. When the tasks multiply, she moves to Plus for 20 dollars a month. You can check your own plan on OpenAI's plans page: it names the Codex line for each plan.

  <b-sublabel top="18">Working with an API key</b-sublabel>

  An API key is a programmatic password that lets a program call a model without a subscription; payment goes at API rates for actual usage. With such a key Codex works in the terminal (CLI), in the SDK and in the IDE extension. Cloud features such as code review on GitHub are not included in this mode<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: an API key lets you use Codex in the CLI, SDK or IDE at API rates; cloud features not included — learn.chatgpt.com/docs/pricing"/>.
  <iso-art name="codex-or-chatgpt-what-to-choose/api-key-mode"></iso-art>
  <b-cap>API key: payment at API rates; the terminal, SDK and IDE work, cloud features do not.</b-cap>
  <b-sublabel top="18">Common misconceptions</b-sublabel>

  <b>Does Codex cost extra?</b> No. It is included in the ChatGPT plans Free, Go, Plus, Pro, Business, Edu and Enterprise, with no separate payment. How to check: open <a href="https://learn.chatgpt.com/docs/pricing">OpenAI's help on plans</a> and find the line "included in your ChatGPT … plan".

  <b>Does an API key give everything a subscription does?</b> No. The terminal, SDK and IDE extension work with a key, cloud features are not included, and payment goes at API rates. How to check: read the paragraph about the API key in the same help on plans.

  <b>Is Codex unavailable on the free plan?</b> It is available: it is included in Free, but meant for quick coding tasks. How many such tasks fit into the limit, I did not find in the help.
</b-chapter>
<b-chapter id="pick" title="When to use which" icon="crosshair">
  <b-why>You choose per task: the modes share one subscription, so there is no need to pick one for the whole project.</b-why>

  Start by asking what you want at the end: an explanation, a document, or a changed and verified project. The answer decides the mode.
  <iso-art name="codex-or-chatgpt-what-to-choose/pick-tree"></iso-art>
  <b-cap>Decision tree: from what you need to get, to the mode.</b-cap>
  <b-sublabel top="18">Choice table</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Situation</th><th>What to take</th><th>Why</th></tr>
    </thead>
    <tbody>
      <tr><td>Understand someone else's snippet or an error from a log</td><td>ChatGPT Chat</td><td>pasting the text is enough to get an explanation</td></tr>
      <tr><td>Fix a bug in a repository and verify with tests</td><td>Codex</td><td>finds the file itself, edits and runs tests</td></tr>
      <tr><td>Write a letter, a spec, a summary or a presentation</td><td>ChatGPT Work</td><td>the result is a document, not code</td></tr>
      <tr><td>A big change across several files, a pull request is needed</td><td>Codex in the cloud or in the terminal</td><td>the task runs in a separate sandbox, and the output is changes for review</td></tr>
      <tr><td>You need another model or work inside an editor</td><td><a href="/blog/ai-in-code-harness-and-tools/">Claude Code or Cursor</a></td><td>Claude Code runs on Claude models, Cursor connects models from different companies</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">Three situations</b-sublabel>

  Oscar lives in Helsinki and got an error from the logs that he does not recognize. He pastes the message into the chat and a minute later knows what the error is. There is nothing to change in the project, so Chat. Irma in Tallinn is preparing a project summary for management: she needs a document rather than code, so she turns on Work. Pavel in Prague has to fix the delivery calculation across four files and attach a pull request: he hands the task to Codex in the cloud and receives changes for review. Each of them chose the mode by the result they expected at the end.

  If you have to carry an answer into code by hand more than twice, hand the task to Codex. If you need another model or work inside an editor, Claude Code runs on Claude models and Cursor connects models from different companies; <a href="/blog/ai-in-code-harness-and-tools/">a comparison of these agents</a> is in a separate article.
</b-chapter>
<b-chapter id="start" title="Getting started" icon="zap">
  <b-why>Three ready prompts: each names the goal, the place and the way to verify. An agent does not know what counts as done until you tell it.</b-why>

  Yana lives in Bratislava and runs Codex on a work project for the first time. She climbs a ladder: first she asks it to read and run the tests without changing anything, then to fix one test, then to prepare a pull request. At each step she checks the result before moving on.
  <iso-art name="codex-or-chatgpt-what-to-choose/start-ladder"></iso-art>
  <b-cap>Three steps: read and run, one edit, a pull request.</b-cap>
  <b-sublabel top="18">Three prompts for the agent</b-sublabel>
  <b-codebox>
    Read README and AGENTS.md. Tell me how the tests are run and run them without changing anything. Show which ones fail.
    Fix the failing test in tests/orders.test.ts. Edit only src/orders/. After the fix run all the tests and show the diff.
    Prepare a pull request from these changes: a short title, what changed and how to verify.
  </b-codebox>
  <b-sublabel top="18">Why the first prompt changes nothing</b-sublabel>

  The first prompt checks that the agent finds and runs the tests. If the tests run, the agent can then verify itself. If they do not run, an edit made blind gets you nowhere: the agent will not know whether it fixed the test. So begin with a prompt to read and run, and allow edits only afterwards.

  <b-sublabel top="18">AGENTS.md</b-sublabel>

  AGENTS.md is a file with instructions for the agent that Codex reads at the start of work. You write into it the build and test commands, the folders that must not be touched, and the style rules. The more precise the file, the less the agent guesses. How to check: in the first prompt ask the agent to retell how the tests are run, and compare with the file.
</b-chapter>
<b-chapter id="faq" icon="chat" title="Frequently asked questions">
  <b-faq-cards>
    <q t="Are Codex and ChatGPT the same thing?">No. ChatGPT in Chat mode replies with text, while Codex works in the project: it reads code, edits files and runs tests. Both live in the ChatGPT app and share one subscription. Source: learn.chatgpt.com/docs/use-chatgpt, checked 18.11.2026.</q>
    <q t="Do I have to pay for Codex separately?">No. Codex is included in the ChatGPT plans Free, Go, Plus, Pro, Business, Edu and Enterprise, and limits depend on the plan. When working with an API key, payment goes at API rates. Source: learn.chatgpt.com/docs/pricing, checked 18.11.2026.</q>
    <q t="Can I write code in an ordinary chat only?">You can: a chat will explain, write a function and analyze an error. But carrying the result into the project and running tests stays with you. When there are many edits, Codex saves time because it opens the files and verifies the result itself.</q>
    <q t="What to take instead of Codex if I need another model?">Claude Code runs on Claude models, Cursor connects models from different companies. The choice between them is described in a separate article. Sources: learn.chatgpt.com/docs and code.claude.com/docs/en/overview (checked 15.11.2026, not repeated for this article).</q>
    <q t="What is Work mode and how does it differ from Codex?">Work carries a larger task to a finished result: a document, a spreadsheet, research. Codex works with the project's code and produces changes, test results and a pull request. Source: learn.chatgpt.com/docs/use-chatgpt.</q>
    <q t="Can I run Codex with an API key instead of a subscription?">You can: the terminal, SDK and IDE extension work at API rates. Cloud features, for example code review on GitHub, are not included in this mode. Source: learn.chatgpt.com/docs/pricing.</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="next" title="Further reading">
  <b-links cols="2">
    <item href="/blog/ai-in-code-harness-and-tools/" k="Comparison" t="Claude Code, Codex, Cursor and Hermes Agent">Which agent for which task</item>
    <item href="/blog/specs-rules-skills/" k="Context" t="AGENTS.md, CLAUDE.md and spec.md: what goes where">Which instructions an agent reads</item>
    <item href="/blog/harness-driven-development/" k="Method" t="Harness-Driven Development">An agent's mistake becomes a rule</item>
    <item href="/blog/claude-code-install-and-price/" k="Install" t="Claude Code: installation and price">Command, sign-in, plans</item>
    <item href="/blog/cursor-rules-vs-agents-md/" k="Rules" t="Cursor rules and AGENTS.md">A rules file that Codex reads</item>
    <item href="/blog/codex-access-regions-vpn-bans/" k="Access" t="Codex CLI not available in your country: supported countries, VPN and bans">Country list and sign-in</item>
    <item href="/blog/ai-agent-llm-harness/" k="Basics" t="How an agent differs from a chat">Agent, assistant, chatbot and neural network</item>
    <item href="/blog/work-prompts-examples/" k="Prompts" t="Prompts for work tasks">Requests for Chat and Work</item>
    <item href="/materials/glossary/codex/" k="Term" t="Codex">What it can do, where it works</item>
  </b-links>
</b-chapter>
<b-footer>Based on OpenAI's help, the source sits next to each claim. Date checked: 18.11.2026.</b-footer>
</b-post>
