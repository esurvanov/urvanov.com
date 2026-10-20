---
title: Will AI agents take your job: what they actually do
date: 2026-10-05
description: Will an AI agent take your job? In practice it often asks the person to run a command, find a task or copy a file. What the agent does itself, what stays with you and how to stop being a courier between windows.
tags: AI, agents, jobs, career, future of work, delegation, MCP, harness
category: harness
layout: wide
mentions: AI replacing jobs, will AI take my job, AI agent, future of work, delegation, MCP, Claude Code, CLAUDE.md, harness, human-in-the-loop
toc: what=Will it take your job | phrases=Signal phrases | lazy=Why it drags | hard=Real complexity | fix=How to break the habit | human=What stays with you | faq=FAQ | next=Read next
---

Will AI agents take your job? They take the routine and hand part of the work back to you: they ask you to run a command, find a task, copy a file. Below: what the agent does itself, how to spot such requests, what to reply, how to write a rule and what really stays with the person. Related: [MCP for an AI agent](/blog/mcp-agent-access/).

<b-post series="harness">
<b-chapter id="what" icon="swap" title="Will an agent take your job">
<b-why align="left">The agent takes the routine over and hands part of the work back to you: it asks you to run, find and copy what it can do itself.</b-why>
<b-lane title="Who does the work" color="accent">
<b-scene names="agent-hands-work-back-to-you/before-after"/>
</b-lane>
<b-finding>
  <ex>The agent writes: “Run the command and send me the output”. It can run it and read the output itself.</ex>
  <gen>The routine goes to the agent, while decisions and responsibility stay with people. In our experience an agent also picks the path where the person does the work, and every such request puts you back into the courier role between windows.</gen>
  <do k="What to do">Give the agent the routine and keep the decisions. Notice a “do it yourself” request? Reply: “Do it yourself”.</do>
</b-finding>
</b-chapter>
<b-chapter id="phrases" icon="check-circle" title="Signal phrases">
<b-why align="left">Two agent requests and the reply "do it yourself". It can handle both.</b-why>
<b-agent-term app="Claude&#8203; Code" ver="v2.1" model="Sonnet 5.5 · Claude Max" path="~/projects/shop">
  <line kind="ask">Fix the failing test</line>
  <line kind="req" note="the agent asks you">Run `npm test` and send me the output.</line>
  <line kind="you" note="you: do it yourself">Run it yourself and read the output.</line>
  <line kind="act">Bash(npm test)</line>
  <line kind="out">2 failed: auth.test.ts</line>
  <line kind="act">Found the cause in auth.ts, fixing it.</line>
  <line kind="ask">What is in task PAY-142?</line>
  <line kind="req" note="the agent asks you">Open Ji&#8203;ra and find the task.</line>
  <line kind="you" note="you: do it yourself">Find it yourself through M&#8203;CP.</line>
  <line kind="act">jira.get_issue(PAY-142)</line>
  <line kind="out">steps, comments, history</line>
  <line kind="act">Read it. The steps are: …</line>
</b-agent-term>
<b-finding>
  <ex>The agent asks to open Jira. You reply “Find it yourself via MCP” and get the whole task.</ex>
  <gen>Behind every phrase is an action the agent can perform itself if it has access.</gen>
  <do k="What to do">Write down the three phrases you hear most often and a reply to each.</do>
</b-finding>
</b-chapter>
<b-chapter id="lazy" icon="clock" title="Why the agent drags its feet">
<b-why align="left">The agent estimates the effort in advance. In our experience it often decides "this is long and hard", especially about integrations. Sometimes it is right, sometimes not.</b-why>
<b-embed-frame src="/embed/estimate-check.html?v=27&lang=en" title="Three plays: how the agent thinks, how you think and how it really is. The 3D scene and the graph run in sync" ratio="4/4"/>
<b-finding>
  <ex>Agent: "The Jira integration will take long". You: "Read one task". A minute later the task is read.</ex>
  <gen>The agent’s estimate stays a guess until a try checks it. Some estimates are right: no access, a login is needed, a closed network.</gen>
  <do k="What to do">Always let it try first. No result in 2–3 tries: ask it to split the task into steps and name where the problem may be. Ask the agent why it does not work.</do>
</b-finding>
</b-chapter>
<b-chapter id="hard" icon="cube" title="Where the complexity is real">
<b-why align="left">We rely on the <a href="/materials/glossary/osi/">OSI model</a>: a request passes seven layers, and the layers may live on different physical systems. Complexity is real where there are more layers and systems, and where several <a href="/materials/glossary/bounded-context/">bounded contexts</a> are involved, especially if one of them is not under our control. In our experience.</b-why>
<b-why align="left" top="14">Complexity comes from the volume of research. Our service is open: code and tests are at hand, reading is enough. A foreign system is a black box: how it works can only be learned by probing from outside.</b-why>
<b-lane title="The key: how much research the black boxes need" color="warn" top="12">
<b-scene names="agent-hands-work-back-to-you/research-volume"/>
</b-lane>
<b-why align="left" top="14">Let us look at an example: two tasks in one project.</b-why>
<b-view-toggle id="vt-hard">
  <view label="Simple"><b-lane title="Do we need changes" color="accent">
<b-scene names="agent-hands-work-back-to-you/whose-changes"/>
</b-lane>
<b-why align="left" top="10">One question: are foreign changes needed. For example, changing discounts between two of our services: all in our zone, no changes needed, the agent does it. But once we pull stock from another team’s warehouse system, that team has to make changes, and that is no longer the agent’s job.</b-why></view>
  <view label="Detailed"><b-lane title="A · discount: two of our services" color="accent">
<b-scene names="agent-hands-work-back-to-you/layers-discount"/>
</b-lane>
<b-why align="left" top="16">The discount passes one layer and stays with us. Stock from the warehouse passes the foreign side’s layers, and each needs a blind probe.</b-why>
<b-lane title="B · stock from the warehouse: path through three layers" color="warn" top="16">
<b-scene names="agent-hands-work-back-to-you/layers-warehouse"/>
</b-lane></view>
</b-view-toggle>
<b-finding>
  <ex>A discount between our services: all ours, the agent does it. Stock from the warehouse: the warehouse team must change things (access, port), so the agent is right that it takes long.</ex>
  <gen>The key is how much unknown has to be researched. A black box cannot be opened, it is checked by probes from outside, and every layer and every foreign system adds such probes.</gen>
  <do k="What to do">Estimate how many blind probes lie ahead. Many: split the task along system borders and ask the agent to check one at a time.</do>
</b-finding>
</b-chapter>
<b-chapter id="fix" icon="arrow-right" title="How to break the habit">
<b-why align="left">The anchor is the project bible: a permanent description of the product and its rules that the agent reads in every session. Three levels: access, a note in the bible, a reminder. <a href="https://code.claude.com/docs/en/memory" target="_blank" rel="noopener">More</a></b-why>
<b-lane-art names="agent-hands-work-back-to-you/project-bible" top="10"/>
<b-step-chain>
  <node t="1">Give access</node>
  <node t="2">Write it in the bible</node>
  <node t="3">Remind in a phrase</node>
</b-step-chain>
<b-section-h3 top="14">What to write in the bible</b-section-h3>
<b-arrow-rows wide>
  <row t="The agent estimates instead of doing" color="accent">Try first, estimate after the try</row>
  <row t="The try failed 2–3 times" color="warn">Split the task into steps, name where the problem may be and explain why it does not work</row>
  <row t="A foreign system: a black box" color="muted">Study it with probes from outside and write the findings into the bible so they are not searched again</row>
  <row t="A login, a secret, a confirmation, a payment is needed" color="accent">A person does that, you do the rest</row>
</b-arrow-rows>
<b-section-h3 top="14">Rules in the project bible</b-section-h3>
<b-code-text wrap>
  Try first, estimate after the try.
  If the try failed 2–3 times: split the task into steps, name where the problem may be and explain why it does not work.
  Study a foreign system with probes from outside and write the findings here.
  If you can do it yourself, do it. Ask the person only for what needs them: logging in, passwords, confirming a write, payments.
</b-code-text>
<b-why align="left">The bible lives in <a href="/materials/glossary/claude-md/">CLAUDE.md</a> and <a href="/materials/glossary/agents-md/">AGENTS.md</a> files: the agent reads them in every session, but treats them as context rather than a hard block. The more specific and short the rule, the more reliably it works. Repeating processes are packaged as <a href="/materials/glossary/agent-skills/">skills</a>. More on the bible, rules, specs and skills: <a href="/blog/specs-rules-skills/">Specs, bible, rules and skills</a>.</b-why>
<b-finding>
  <ex>The agent is connected to Jira and knows the rule. Instead of “open Jira” it reads the task itself.</ex>
  <gen>Without access the rule will not help: the agent cannot do it itself. So connection first, then the rule.</gen>
  <do k="What to do">Connect the source the agent most often sends you to and write the rule into the project bible.</do>
</b-finding>
</b-chapter>
<b-chapter id="human" icon="shield-check" title="What stays with you">
<b-lane title="The border" color="accent">
<b-scene names="agent-hands-work-back-to-you/split"/>
</b-lane>
<b-finding>
  <ex>The agent reads the task and prepares a comment itself, and publishing it in Jira happens after your confirmation.</ex>
  <gen>What stays with the person is where identity and responsibility matter: login, secrets, confirming a write, money.</gen>
  <do k="What to do">Write the border into the project rule so the agent neither asks too much nor does too much.</do>
</b-finding>
</b-chapter>
<b-chapter id="faq" icon="check-circle" title="FAQ">
<b-faq-cards>
  <q t="Will an AI agent replace a specialist?">The agent takes routine steps over. Decisions, responsibility and checking the result stay with the person.</q>
  <q t="Which work does the agent do itself?">It reads, searches, copies, runs commands and writes drafts, provided it has access to the systems.</q>
  <q t="What will the agent not do without you?">Log in, enter a password, confirm a write, pay. That stays with the person.</q>
  <q t="Why does the agent ask me to do what it can do itself?">In our experience it picks the path where the person does the work. Access to systems and a rule in the project instructions help.</q>
  <q t="How to work with an agent without losing professionally?">Hand over the routine, keep task setting and review. Those steps stay with the person.</q>
</b-faq-cards>
</b-chapter>
<b-chapter id="next" icon="arrow-right" title="Read next">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="MCP" t="MCP for an AI agent">how to give the agent access</item>
    <item href="/blog/specs-rules-skills/" k="Rules" t="Specs, rules and skills">what to put in the instructions</item>
    <item href="/blog/harness-driven-development/" k="Error loop" t="Harness-Driven Development">how agent mistakes become rules</item>
  </b-links>
</b-chapter>
</b-post>
