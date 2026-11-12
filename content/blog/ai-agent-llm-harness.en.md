---
title: AI agent = LLM + harness: LLM vs harness vs agent and what the harness includes
date: 2026-10-12
updated: 2026-11-13
description: AI agent = LLM + harness. LLM vs harness vs agent in one table, the five groups a harness includes, and why the same model behaves differently in chat and in Claude Code.
tags: AI, agents, AI agent, LLM, harness, agent harness, harness engineering
category: harness
layout: wide
mentions: AI agent, LLM, agent harness, harness engineering, agent loop, MCP, Claude Code, Codex, ChatGPT
toc: formula=Agent = LLM + harness | concepts=Five concepts | table=LLM vs harness vs agent | parts=What the harness includes | same=Same model | example=Example | loop=How it works | when=What to choose | faq=FAQ | next=Read next
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
<b-chapter id="concepts" icon="table-cols" title="Five concepts in one table">
<b-why align="left">The columns compare best on the row "Who drives the task". The definitions of assistant and agent follow <a href="https://www.ibm.com/think/topics/ai-agents-vs-ai-assistants" target="_blank" rel="noopener">IBM</a>: assistants are reactive and perform tasks at your request, while agents are primarily proactive and plan and act on their own toward a goal.</b-why>
<b-table>
<table><thead><tr><th></th><th>LLM</th><th>Chat</th><th>Chatbot</th><th>Assistant</th><th>AI agent</th></tr></thead><tbody><tr><td>Used for</td><td>the engine inside products</td><td>any questions and texts</td><td>typical questions of one company</td><td>your chores in apps</td><td>a task through to the result</td></tr><tr><td>Who drives the task</td><td>—</td><td>you</td><td>a script</td><td>you, command by command</td><td><b>the agent itself</b></td></tr><tr><td>Understands free-form speech</td><td><b-tag-inline kind="ok">yes</b-tag-inline></td><td><b-tag-inline kind="ok">yes</b-tag-inline></td><td><b-tag-inline kind="muted">partly</b-tag-inline></td><td><b-tag-inline kind="ok">yes</b-tag-inline></td><td><b-tag-inline kind="ok">yes</b-tag-inline></td></tr><tr><td>Acts in applications</td><td><b-tag-inline kind="no">no</b-tag-inline></td><td><b-tag-inline kind="muted">partly</b-tag-inline></td><td><b-tag-inline kind="muted">partly</b-tag-inline></td><td><b-tag-inline kind="ok">yes</b-tag-inline></td><td><b-tag-inline kind="ok">yes</b-tag-inline></td></tr><tr><td>Chooses steps and checks on its own</td><td><b-tag-inline kind="no">no</b-tag-inline></td><td><b-tag-inline kind="no">no</b-tag-inline></td><td><b-tag-inline kind="no">no</b-tag-inline></td><td><b-tag-inline kind="no">no</b-tag-inline></td><td><b-tag-inline kind="ok">yes</b-tag-inline></td></tr><tr><td>Made by</td><td>model providers</td><td>providers, often together with the model, and aggregators</td><td>no-code builders for business</td><td>platforms: OS, office, search</td><td>industrial agents for work</td></tr><tr><td>Example</td><td><a href="/materials/glossary/openai/">GPT</a>, <a href="/materials/glossary/anthropic/">Claude</a>, <a href="/materials/glossary/deepseek/">DeepSeek</a></td><td><a href="/materials/glossary/openai/">ChatGPT</a>, <a href="/materials/glossary/anthropic/">Claude</a>; aggregators: <a href="https://poe.com/" target="_blank" rel="noopener">Poe</a>, <a href="https://openrouter.ai/" target="_blank" rel="noopener">OpenRouter</a></td><td><a href="https://vivochat.ai/" target="_blank" rel="noopener">vivochat.ai</a>, a bank support bot</td><td><a href="/materials/glossary/yandex/">Alice</a>, <a href="/materials/glossary/microsoft/">Copilot</a></td><td><a href="/materials/glossary/claude-code/">Claude Code</a>, <a href="/materials/glossary/codex/">Codex</a>, <a href="/materials/glossary/cursor/">Cursor</a></td></tr></tbody></table>
</b-table>
<b-why align="left" top="10"><b>Chatbot and assistant.</b> A chatbot answers for one company by a script: buttons, keywords, handoff to an operator. Some bots run on an LLM, but the limits stay the same. An assistant understands any request and carries it out in your apps: an email, a reminder, a search. Each next step is a new command from you.</b-why>
<b-why align="left" top="6"><b>Agents today are industrial:</b> for code, data, support. Mass-market cloud agents "for everyone" do not exist yet. Observation from the author's projects.</b-why>
<b-finding>
  <ex>A bank bot answers about fees. Alice sets a reminder on command. An agent gets the goal "prepare the release" and decides what to read, what to run and when to stop.</ex>
  <gen>A chatbot follows the company's script, an assistant follows your commands, an agent drives itself. The model inside can be the same.</gen>
  <do>Ask about a product: who picks the next step? A script means a bot, you mean an assistant or chat, the product itself means an agent.</do>
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
  <gen>Most agent failures seen in practice trace back to one of the five groups: a missing tool, missing context or a missing check.</gen>
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
<b-chapter id="example" icon="arrow-right" title="Example: what each one sees of the project">
<b-why align="left">One task, "fix the failing test", and five programs. The strip under the project parts shows what each one sees. What it does not see, it guesses or hands back to you.</b-why>
<b-lane-art names="ai-agent-llm-harness/example"/>
<b-sublabel top="18">Why an LLM errs blindly</b-sublabel>
<b-arrow-rows>
  <row t="What it sees" color="muted">only your text: no code, no test, no error</row>
  <row t="What it does" color="warn">fills in the missing parts plausibly: invents files, functions, libraries</row>
  <row t="1 in 5" color="warn">library names in LLM-written code do not exist: 19.7% across 576,000 code samples from 16 models (<a href="https://arxiv.org/abs/2406.10279" target="_blank" rel="noopener">Spracklen et al.</a>)</row>
  <row t="0–7% vs 31%" color="accent">of real tasks solved: a model in a single pass, even with the right files, versus an agent with a "run, check" loop (<a href="https://arxiv.org/abs/2602.16069" target="_blank" rel="noopener">Raju et al., 2026</a>)</row>
</b-arrow-rows>
<b-finding>
  <ex>An agent runs the whole loop "run, read, fix, check" by itself. The others hand those steps to you.</ex>
  <gen>The more steps a task needs in your systems, the more an agent gains. For one answer to one question a chat is faster and cheaper.</gen>
  <do>Count how often you copy between windows in a typical task. More than twice, try an agent.</do>
</b-finding>
</b-chapter>
<b-chapter id="loop" icon="swap-hm" title="How an AI agent works: a loop to the result">
<b-why align="left">How does an AI agent work? It follows an <a href="/materials/glossary/agent-loop/">agent loop</a>: the model picks the next step, the harness carries it out with a tool and returns the result to the model. The loop repeats until the task is solved or a human is needed. This "reason, act, observe" scheme was described in the ReAct paper; coding agents such as Claude Code, Codex and Cursor work the same way.</b-why>
<b-arrow-rows>
  <row t="1 · Think" color="muted">the model reads the task, the context and earlier results, and picks a step</row>
  <row t="2 · Call a tool" color="accent">the harness runs a command, reads a file, calls a service</row>
  <row t="3 · Look at the result" color="accent">command output, an error text or a service reply goes back to the model</row>
  <row t="4 · Decide" color="warn">done means exit; an error means back to step 1; a risky step means asking a human</row>
</b-arrow-rows>
<b-lane-art names="term:agent-loop"/>
<b-finding>
  <ex>A test fails: the agent reads the error and makes a new edit without a command from you.</ex>
  <gen>A loop without checks turns into a series of guesses. That is why tests, linters and human approval of risky steps belong to the harness.</gen>
  <do>Give the agent a way to check itself: a test command, a done criterion, access to logs.</do>
</b-finding>
</b-chapter>
<b-chapter id="when" icon="shield-check" title="When a chat is enough and when you need an agent">
<b-lane-art names="ai-agent-llm-harness/choose"/>
<b-table>
<table><thead><tr><th>Task</th><th>What to take</th><th>Example in the blog</th></tr></thead><tbody><tr><td>A question, an explanation, a draft email</td><td>chat</td><td><a href="/blog/work-prompts-examples/">Prompts for work tasks</a></td></tr><tr><td>Typical customer questions by a script</td><td>chatbot</td><td>—</td></tr><tr><td>One action in an app by voice or command</td><td>assistant</td><td>—</td></tr><tr><td>A multi-step task in code, files, services</td><td>AI agent</td><td><a href="/blog/incident-investigation-agent/">Incident investigation with an AI agent</a><br><a href="/blog/bug-report-to-reproduction-agent/">QA work after support with an AI agent</a><br><a href="/blog/analytics-reports-agent/">Analytics reports with an AI agent</a></td></tr><tr><td>Steps with money, access, publishing</td><td>agent + human approval</td><td><a href="/blog/agent-hands-work-back-to-you/#human">Will AI agents take your job</a><br><a href="/blog/data-plane-control-plane-prompt-injection/">Agent data plane and control plane</a></td></tr></tbody></table>
</b-table>
<b-finding>
  <ex>An email to a client is a chat. Finding a task in Jira, fixing the code and opening a merge request is an agent.</ex>
  <gen>On a simple question an agent is slower and costs more: it reads context and takes steps. On a multi-step task it saves your hands.</gen>
  <do>Pick one multi-step task of the week and give it to an agent whole.</do>
</b-finding>
</b-chapter>
<b-chapter id="faq" icon="check-circle" title="FAQ">
<b-faq-cards>
  <q t="AI agent vs assistant: what is the difference?">An assistant carries out your request through set functions: one action at a time. An agent gets a goal, plans the steps itself, picks tools and checks the result.</q>
  <q t="AI agent vs chatbot?">A chatbot answers by a script or from a base of answers. An agent acts in your systems and checks the result.</q>
  <q t="AI agent vs LLM: what is the difference?">An LLM generates text. An AI agent is an LLM inside a harness that turns that text into actions and checks the result.</q>
  <q t="What is an agent harness?">All the code and configuration around the model that is not the model: loop, tools, context, rules, permissions and checks.</q>
  <q t="Harness vs framework?">A framework gives building blocks for writing an agent. A harness is the running layer that executes the loop and controls it.</q>
  <q t="How does an AI agent work?">In a loop: the model picks a step, the harness carries it out, the result returns to the model. The loop runs until the task is solved or a human is needed.</q>
  <q t="Is ChatGPT an agent?">In plain chat it is a chat app. In agent mode and in Codex the same model gets an action harness, which makes it an agent.</q>
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
