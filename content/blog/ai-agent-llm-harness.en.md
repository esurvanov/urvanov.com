---
title: AI agent = LLM + harness: LLM vs harness vs agent and what the harness includes
date: 2026-10-12
updated: 2026-10-21
description: AI agent = LLM + harness. LLM vs harness vs agent in one table, the five groups a harness includes, and why the same model behaves differently in chat and in Claude Code.
tags: AI, agents, AI agent, LLM, harness, agent harness, harness engineering
category: harness
layout: wide
mentions: AI agent, LLM, agent harness, harness engineering, agent loop, MCP, Claude Code, Codex, ChatGPT
toc: formula=Agent = LLM + harness | table=LLM vs harness vs agent | parts=What the harness includes | same=Same model | faq=FAQ | next=Read next
---

An AI agent is an LLM plus a harness: the LLM only reasons and writes text, and the harness is everything around it that lets it act — a loop of steps, tools, context, rules and checks. Together they carry a task to a result, while an LLM alone only answers. Below: LLM vs harness vs agent in one table, the five groups a harness includes, and the same model in two harnesses.

<b-post series="harness">
<b-chapter id="formula" icon="target-dot" title="Agent = LLM + harness">
<b-why align="left">An <a href="/materials/glossary/llm/">LLM</a> only continues text. The <a href="/materials/glossary/harness/">harness</a> is everything around it: the step loop, tools, access to files and services, rules and checks. Together they make an <a href="/materials/glossary/ai-agent/">AI agent</a>.</b-why>
<b-lane-art names="ai-agent-llm-harness/formula"/>
<b-finding>
  <ex>The same Claude model answers in chat and edits code in Claude Code. The difference is the harness.</ex>
  <gen>Chat apps, assistants and agents can run on the same models. What sets them apart is what surrounds the model.</gen>
  <do>When you compare AI products, compare harnesses: what the product can do on its own and where.</do>
</b-finding>
</b-chapter>
<b-chapter id="table" icon="table-cols" title="LLM vs harness vs agent">
<b-why align="left">What each of the three has. The agent column is the sum of the first two.</b-why>
<b-table>
<table><thead><tr><th></th><th>LLM</th><th>Harness</th><th>AI agent</th></tr></thead><tbody><tr><td><a href="/materials/glossary/llm/">Model</a> that reasons in text</td><td><b-tag-inline kind="ok">has</b-tag-inline></td><td><b-tag-inline kind="no">none</b-tag-inline></td><td><b-tag-inline kind="ok">has</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/agent-loop/">Loop</a>: step, act, observe</td><td><b-tag-inline kind="no">none</b-tag-inline></td><td><b-tag-inline kind="ok">has</b-tag-inline></td><td><b-tag-inline kind="ok">has</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/tool/">Tools</a> and <a href="/materials/glossary/mcp/">MCP</a></td><td><b-tag-inline kind="no">none</b-tag-inline></td><td><b-tag-inline kind="ok">has</b-tag-inline></td><td><b-tag-inline kind="ok">has</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/context/">Context</a> and <a href="/materials/glossary/memory/">memory</a></td><td><b-tag-inline kind="no">none</b-tag-inline></td><td><b-tag-inline kind="ok">has</b-tag-inline></td><td><b-tag-inline kind="ok">has</b-tag-inline></td></tr><tr><td>Rules: <a href="/materials/glossary/claude-md/">CLAUDE.md</a>, <a href="/materials/glossary/agents-md/">AGENTS.md</a>, <a href="/materials/glossary/agent-skills/">skills</a></td><td><b-tag-inline kind="no">none</b-tag-inline></td><td><b-tag-inline kind="ok">has</b-tag-inline></td><td><b-tag-inline kind="ok">has</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/permissions/">Permissions</a>, <a href="/materials/glossary/sandbox/">sandbox</a>, <a href="/materials/glossary/hooks/">hooks</a></td><td><b-tag-inline kind="no">none</b-tag-inline></td><td><b-tag-inline kind="ok">has</b-tag-inline></td><td><b-tag-inline kind="ok">has</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/checks/">Checks</a> and <a href="/materials/glossary/human-in-the-loop/">human in the loop</a></td><td><b-tag-inline kind="no">none</b-tag-inline></td><td><b-tag-inline kind="ok">has</b-tag-inline></td><td><b-tag-inline kind="ok">has</b-tag-inline></td></tr><tr><td>Acts on its own</td><td><b-tag-inline kind="no">none</b-tag-inline></td><td><b-tag-inline kind="no">none</b-tag-inline></td><td><b-tag-inline kind="ok">has</b-tag-inline></td></tr></tbody></table>
</b-table>
<b-finding>
  <ex>A harness without a model has tools but nobody to choose between them. A model without a harness chooses but cannot act.</ex>
  <gen>Neither half is an agent on its own. Agent = model + harness works as a definition: remove either side and the agent is gone.</gen>
  <do>Name the harness of the agent you use: where its loop, tools, rules and checks live.</do>
</b-finding>
</b-chapter>
<b-chapter id="parts" icon="cube" title="What the harness includes: five groups">
<b-arrow-rows>
  <row t="Loop" color="accent">agent loop, orchestration of subagents</row>
  <row t="Reach" color="accent">tools, MCP servers, sandbox, browser</row>
  <row t="Knowledge" color="accent">context, memory, CLAUDE.md / AGENTS.md, skills</row>
  <row t="Control" color="warn">permissions, hooks, human approval of risky steps</row>
  <row t="Verification" color="warn">tests, linters, logs and tracing</row>
</b-arrow-rows>
<b-finding>
  <ex>Claude Code: the loop in the CLI, tools via MCP, rules in CLAUDE.md, control through permissions and hooks, verification through your tests.</ex>
  <gen>In our experience, most agent failures trace back to one of the five groups: a missing tool, missing context or a missing check.</gen>
  <do>When the agent fails, ask which group was missing, and fix it there instead of rewriting the prompt.</do>
</b-finding>
</b-chapter>
<b-chapter id="same" icon="chart-line" title="Same model, different harness">
<b-table>
<table><thead><tr><th>Model</th><th>Chat harness</th><th>Agent harness</th></tr></thead><tbody><tr><td>Claude</td><td>Claude in the browser: conversation, no project access</td><td>Claude Code: reads the repo, edits files, runs commands</td></tr><tr><td>GPT</td><td>ChatGPT: conversation, no project access</td><td>Codex: works in the repo, runs tests, opens pull requests</td></tr></tbody></table>
</b-table>
<b-why align="left" top="10">A study at ICML 2026 found that picking the best harness gives gains comparable to picking the best model. <a href="https://icml.cc/virtual/2026/68323" target="_blank" rel="noopener">Source</a></b-why>
<b-finding>
  <ex>Switching from chat to Claude Code changes the harness only, and the task goes from advice to a finished change.</ex>
  <gen>Model choice and harness choice weigh about the same. Teams that only compare models miss half of the result.</gen>
  <do>Before switching models, try a stronger harness on the model you already have.</do>
</b-finding>
</b-chapter>
<b-chapter id="faq" icon="check-circle" title="FAQ">
<b-faq-cards>
  <q t="What is an agent harness?">All the code and configuration around the model that is not the model: loop, tools, context, rules, permissions and checks.</q>
  <q t="AI agent vs LLM: what is the difference?">An LLM generates text. An AI agent is an LLM inside a harness that turns that text into actions and checks the result.</q>
  <q t="AI agent vs chatbot?">A chatbot answers within a script or a conversation. An agent acts in your systems and decides the next step itself.</q>
  <q t="Is ChatGPT an agent?">In plain chat it is a chat app. In agent mode and in Codex the same model gets an action harness, which makes it an agent.</q>
  <q t="Harness vs framework?">A framework gives building blocks for writing an agent. A harness is the running layer that executes the loop and controls it.</q>
</b-faq-cards>
</b-chapter>
<b-chapter id="next" icon="arrow-right" title="Read next">
  <b-links>
    <item href="/materials/glossary/harness/" k="Term" t="Harness">every part, linked</item>
    <item href="/blog/harness-driven-development/" k="Practice" t="Harness engineering">turn mistakes into rules</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Choice" t="Claude Code, Codex, Cursor">which agent to pick</item>
  </b-links>
</b-chapter>
</b-post>
