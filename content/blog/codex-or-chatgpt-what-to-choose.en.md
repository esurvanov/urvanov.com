---
title: Codex vs ChatGPT: which to pick for working with code
seoTitle: Codex vs ChatGPT: which to pick for code (2026)
date: 2026-11-17
updated: 2026-11-17
description: A chat replies with text, while the Codex agent edits the project and runs tests itself. When each fits, a comparison table, plans, ready prompts and FAQ.
tags: AI, Codex, ChatGPT, agent, harness, Claude Code, Cursor
category: harness
layout: wide
mentions: Codex, ChatGPT, Claude Code, Cursor, AGENTS.md
toc: answer=Quick answer | table=Side by side | pick=When to use which | start=Getting started | faq=Questions | next=Further reading
---

Codex vs ChatGPT, which to pick, depends on the task. ChatGPT replies with text: it explains, drafts and reviews a snippet you paste. Codex works inside the project: it reads code, edits files, runs tests and prepares a pull request. Use chat for a question and Codex for changing a repository; Codex comes with ChatGPT plans at no extra fee.

<b-post series="prompts">
<b-chapter id="answer" title="Quick answer" icon="crosshair">
  <b-why>OpenAI's help splits ChatGPT into Chat, Work and Codex modes; Codex is the one to select for developer views and technical detail<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “Select Codex when you want developer views or more technical detail, especially for software development” — learn.chatgpt.com/docs/use-chatgpt"/>.</b-why>
  <b-finding>
    <ex>The question "how does this function work" goes to the chat; the task "fix this function and run the tests" goes to Codex.</ex>
    <gen>The chat sees only what you paste and returns text that you carry into the project yourself. Codex opens the repository files, changes them and checks the result with commands.</gen>
    <do>Ask, explain, sketch: chat. Change code in a repository and verify it: Codex. Both use the GPT model family, so the choice follows access to the project.</do>
  </b-finding>
  <iso-art name="term:codex"></iso-art>
</b-chapter>
<b-chapter id="table" title="Codex and ChatGPT side by side" icon="table-grid">
  <b-why>Rows come from OpenAI's help on modes and plans; the source sits next to each claim. Checked 17 Nov 2026.</b-why>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th></th><th>ChatGPT Chat</th><th>ChatGPT Work</th><th>Codex</th></tr>
    </thead>
    <tbody>
      <tr><td>Purpose</td><td>a question or back-and-forth: ideas, drafts, file summaries<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “Use Chat for a question or back-and-forth” — learn.chatgpt.com/docs/use-chatgpt"/></td><td>a larger task carried to a reviewable result<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “carry a larger task through to a reviewable result” — learn.chatgpt.com/docs/use-chatgpt"/></td><td>development: technical detail and engineering views<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Codex is the mode for technical detail in the mode table — learn.chatgpt.com/docs/use-chatgpt"/></td></tr>
      <tr><td>Output</td><td>text</td><td>a finished deliverable: document, spreadsheet, research</td><td>code changes, test results, a pull request</td></tr>
      <tr><td>Sees the project</td><td>only what you paste</td><td>what you give access to</td><td>reads the repository itself</td></tr>
      <tr><td>Where to open</td><td>website and mobile app<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Chat is available on the web and mobile — learn.chatgpt.com/docs/use-chatgpt"/></td><td>website and desktop app; on the web it runs in a managed cloud<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “ChatGPT Work runs in a managed cloud environment” — learn.chatgpt.com/docs/use-chatgpt"/></td><td>desktop app, web, terminal, IDE extension, cloud<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Codex listed under “Available on”: desktop app, mobile app, web, CLI, IDE extension, Cloud — learn.chatgpt.com/docs/use-chatgpt"/></td></tr>
      <tr><td>Plan</td><td colspan="3">Work and Codex are included in Free, Go, Plus, Pro, Business, Edu and Enterprise; no separate fee<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: “ChatGPT Work and Codex are included in your ChatGPT Free, Go, Plus, Pro, Business, Edu, or Enterprise plan” — learn.chatgpt.com/docs/pricing"/></td></tr>
      <tr><td>Limits</td><td colspan="3">depend on the plan; on Free and Go Codex is meant for light tasks, and Plus costs 20 dollars a month<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: Free — quick coding tasks, Go — lightweight tasks, Plus — $20/month — learn.chatgpt.com/docs/pricing"/></td></tr>
      <tr><td>With an API key</td><td>—</td><td>—</td><td>terminal, SDK and IDE are billed at API rates; cloud features such as GitHub code review are not included<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: an API key lets you use Codex in the CLI, SDK or IDE at API rates; cloud features not included — learn.chatgpt.com/docs/pricing"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>All three modes use the GPT model family; they differ in access to the project and in the kind of result.</b-cap>
</b-chapter>
<b-chapter id="pick" title="When to use which" icon="crosshair">
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Situation</th><th>Pick</th><th>Why</th></tr>
    </thead>
    <tbody>
      <tr><td>Understand someone else's snippet or a log error</td><td>ChatGPT Chat</td><td>pasting the text is enough to get an explanation</td></tr>
      <tr><td>Fix a bug in a repository and verify with tests</td><td>Codex</td><td>finds the file, edits it and runs the tests itself</td></tr>
      <tr><td>Write a letter, a spec, a summary or slides</td><td>ChatGPT Work</td><td>the result is a document, not code</td></tr>
      <tr><td>A large multi-file change that needs a pull request</td><td>Codex in the cloud or the terminal</td><td>the task runs in a separate sandbox and returns changes for review</td></tr>
      <tr><td>A different model or work inside an editor</td><td><a href="/blog/ai-in-code-harness-and-tools/">Claude Code or Cursor</a></td><td>Claude Code runs on Claude models, Cursor connects models from several companies</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-finding>
    <ex>One developer day passes through both: a question about an unfamiliar library in the chat in the morning, a fix in Codex in the afternoon.</ex>
    <gen>The modes share one subscription, so there is no need to choose one for the whole project. The choice is made per task.</gen>
    <do>If you carry an answer into the code by hand more than twice, give the task to Codex.</do>
  </b-finding>
</b-chapter>
<b-chapter id="start" title="Getting started" icon="zap">
  <b-why>Three ready prompts; each names the goal, the place and the way to verify. An agent does not know what counts as done until told.</b-why>
  <b-codebox>
    Read README and AGENTS.md. Tell me how the tests run, and run them without changing anything. Show which ones fail.
    Fix the failing test in tests/orders.test.ts. Edit only src/orders/. After the change run all tests and show the diff.
    Prepare a pull request from these changes: a short title, what changed and how to verify it.
  </b-codebox>
  <b-finding>
    <ex>The first prompt changes nothing: it checks that the agent can find and run the tests.</ex>
    <gen>If the tests run, the agent can verify itself from then on. It takes project instructions from AGENTS.md, so build commands and prohibitions belong there.</gen>
    <do>Start with a read-and-run prompt, and allow edits only after that.</do>
  </b-finding>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Frequently asked questions">
  <b-faq-cards>
    <q t="Are Codex and ChatGPT the same thing?">No. ChatGPT in Chat mode replies with text, while Codex works in the project: it reads code, edits files and runs tests. Both live in the ChatGPT app and share one subscription. Source: learn.chatgpt.com/docs/use-chatgpt, checked 17 Nov 2026.</q>
    <q t="Do I pay separately for Codex?">No. Codex comes with the ChatGPT Free, Go, Plus, Pro, Business, Edu and Enterprise plans, and limits depend on the plan. With an API key, billing follows API rates. Source: learn.chatgpt.com/docs/pricing, checked 17 Nov 2026.</q>
    <q t="Can I write code in the plain chat only?">Yes: the chat explains, writes a function and analyses an error. Moving it into the project and running the tests stays with you. When there are many edits, Codex saves time because it opens the files and checks the result itself.</q>
    <q t="What should I use instead of Codex for a different model?">Claude Code runs on Claude models and Cursor connects models from several companies. The choice between them is covered in a separate article. Sources: learn.chatgpt.com/docs and code.claude.com/docs/en/overview (checked 15 Nov 2026, not repeated for this article).</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="next" title="Further reading">
  <b-links cols="2">
    <item href="/blog/ai-in-code-harness-and-tools/" k="Comparison" t="Claude Code, Codex, Cursor and Hermes Agent">Which agent for which task</item>
    <item href="/blog/specs-rules-skills/" k="Context" t="AGENTS.md, CLAUDE.md and spec.md: what goes where">Which instructions an agent reads</item>
    <item href="/blog/harness-driven-development/" k="Method" t="Harness-Driven Development">An agent's mistake becomes a rule</item>
    <item href="/en/blog/claude-code-install-and-price/" k="Install" t="Claude Code: install and price">Command, sign-in, plans</item>
    <item href="/en/blog/cursor-rules-vs-agents-md/" k="Rules" t="Cursor rules vs AGENTS.md">The rules file Codex reads</item>
    <item href="/materials/glossary/codex/" k="Term" t="Codex">What it does, where it runs</item>
  </b-links>
</b-chapter>
<b-footer>Based on OpenAI's help, source next to each claim; checked 17 Nov 2026.</b-footer>
</b-post>
