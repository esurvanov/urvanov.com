---
title: Short bug feedback loop: from a “Report a bug” button to a fix with an AI agent
date: 2026-10-20
updated: 2026-10-25
description: How to fix bugs faster with no game of telephone: staff report from the app, context is collected for them, an AI agent finds the cause, a human approves.
tags: AI, agents, bugs, feedback, MTTR, MCP, Claude Code, harness
category: harness
layout: wide
mentions: feedback loop, MTTR, DORA, bug report, AI agent, Claude Code, Model Context Protocol, human-in-the-loop
toc: chain=Where time is lost | button=A button instead of retelling | agent=Agent and human | modes=Two modes | cases=Cases and numbers | risks=Risks | first=How to start | next=Read next
---

A short feedback loop works like this: an employee sends a bug with a button inside the app, the app attaches technical context itself, an AI agent finds the cause and proposes a plan, and a human approves the plan and the fix. No manager or ticket retells the bug. Below: where time goes, two modes, risks.

<b-post series="harness">

<b-chapter id="chain" icon="clock" title="Where time is lost">
  <b-why align="left">A bug usually travels a long way from the person who saw it to the person who fixes it. The top chain shows the usual path: employee, manager, ticket, clarifications, reproduction. The bottom chain shows the short loop: a button in the app, a report with context, an agent, human approval, release. The bars below show how often reports are incomplete: 92% of Android bugs have no reproduction steps, about 70% of GitHub reports are incomplete, and only 37–44% of bugs get passed on.</b-why>
  <b-sublabel>The usual path</b-sublabel>
  <b-hchain label="Employee, manager, ticket, developer, clarifications, reproduction">
    <step icon="user" t="Employee">saw it</step>
    <step icon="users" t="Manager">retold it</step>
    <step icon="file-text" t="Ticket">waits</step>
    <step icon="help" t="Clarifications">rounds</step>
    <step icon="bug" t="Reproduction">hours</step>
  </b-hchain>
  <b-sublabel top="22">The short loop</b-sublabel>
  <b-hchain label="Button in the app, report with context, agent, human approval, release">
    <step icon="target" t="Button">in the app</step>
    <step icon="database" t="Report">with context</step>
    <step icon="bot" t="Agent">cause</step>
    <step icon="check-circle" t="Human">approves</step>
    <step icon="zap" t="Release">fixed</step>
  </b-hchain>
  <b-sublabel top="22">Share of bugs and reports</b-sublabel>
  <b-count-bars>
    <bar k="No steps (Android)" w="92%" color="c-none">92%</bar>
    <bar k="Incomplete (GitHub)" w="70%" color="c-none">~70%</bar>
    <bar k="Passed on" w="44%" color="c-light">37–44%</bar>
  </b-count-bars>
  <b-finding>
    <ex>Every retelling drops what the developer needs most: the steps, the expected result, the state of the screen.</ex>
    <gen>Developers need reproduction steps and the error stack most, and users find those hardest to give<b-proof href="https://thomas-zimmermann.com/publications/files/zimmermann-tse-2010.pdf" quote="Zimmermann et al., What Makes a Good Bug Report — a survey of Apache, Eclipse and Mozilla developers"/>. An incomplete report takes 201 minutes to reproduce versus 120<b-proof href="https://arxiv.org/pdf/2203.12093" quote="A study of bug report completeness — arxiv.org/pdf/2203.12093"/>.</gen>
    <do>Count how many hands a bug passes through, from the person who saw it to the person who fixes it.</do>
  </b-finding>
</b-chapter>

<b-chapter id="button" icon="target" title="A button instead of retelling">
  <b-why>The person gives only what a machine cannot know: what they wanted and what they saw. The app records the rest by itself.</b-why>
  <b-rules>
    <rule icon="image" t="Screenshot with a frame">The person circles the spot, and the frames are burned into the image</rule>
    <rule icon="list-check" t="Three questions">What you did, what you expected, what happened; the first is prefilled from the latest clicks</rule>
    <rule icon="mic" t="Voice">Say it aloud, and the transcript is added to the right step</rule>
    <rule icon="history" t="Actions">Clicks, navigation, input without values</rule>
    <rule icon="log-lines" t="Requests and errors">The latest server requests with responses, console errors, server state</rule>
    <rule icon="lock" t="Personal data hidden">Names, contacts and messages in text are masked, keys are cut out</rule>
  </b-rules>
  <b-finding>
    <ex>Describing the bug takes seconds: answers are picked with one tap.</ex>
    <gen>The report is written for an agent that can read any amount of technical detail, so all of it is collected at once.</gen>
    <do>Put the button where people see the problem, in place of a separate tracker.</do>
  </b-finding>
</b-chapter>

<b-chapter id="agent" icon="bot" title="Agent and human">
  <b-why align="left">The agent does the analysis, the human makes the decisions. The agent takes each report separately, investigates it and brings back a write-up: what is visible, the likely cause with the place in the code, a plan and risks. It changes no code and no statuses. The human approves the plan. Then the agent makes the fix in a separate branch, and the human merges the change and releases it. The boxed phrase is a ready-made request to the agent.</b-why>
  <b-steps>
    <step t="Agent takes a report">each report goes to its own agent, with no shared guesses</step>
    <step t="Investigates and reports" hl>what is visible, the likely cause with the place in the code, a plan, risks, questions; touches no code and no statuses</step>
    <step t="Human approves the plan">or asks questions</step>
    <step t="Fix">branch, checks, merge request</step>
    <step t="Human merges and releases">the agent replays the report’s scenario to the end before saying “fixed”</step>
  </b-steps>
  <b-say-agent title="Tell the agent">Take the open bug reports, analyse each with a separate agent and come back with a summary report. Change nothing until I approve.</b-say-agent>
  <b-finding>
    <ex>The tracker hands the working rules to the agent itself on connection, so every session behaves the same way.</ex>
    <gen>Agents give the speed, and decisions stay with the human at two points: the plan and the merge.</gen>
    <do>Write the order “investigate → report → wait for approval” where the agent will read it without you.</do>
  </b-finding>
</b-chapter>

<b-chapter id="modes" icon="scales" title="Two modes: on a button or automatic">
  <b-why align="left">There are two modes. On a button, the developer starts the agent with one command, the agent finds the cause and a plan, and the human approves. In automatic mode, the system starts an agent on every report, and it writes the fix right away. The table compares the modes by speed and cost.</b-why>
  <b-table>
| | On a button | Automatic |
|---|---|---|
| Who starts it | the developer, with one command | the system, as soon as a report arrives |
| What the agent does | finds the cause and a plan | writes the fix right away |
| Developer’s role | approves the plan, checks the change | checks the finished change |
| Speed | minutes to a report | the change is ready when the human arrives |
| Cost | the agent works only on the reports that matter | the agent is spent on every report, including duplicates and non-bugs |
  </b-table>
  <b-finding>
    <ex>Abnormal AI makes both modes labels on a task: the first asks the agent to find the cause, the second to write the fix<b-proof href="https://abnormal.ai/blog/ai-agents-are-absorbing-the-first-pass-on-every-bug" quote="Abnormal AI: AI agents are absorbing the first pass on every bug"/>.</ex>
    <gen>It is cheaper to start with the on-a-button mode: the developer filters out noise before the agent starts writing code.</gen>
    <do>Turn on automatic mode when the flow of reports is clean and duplicates are rare.</do>
  </b-finding>
</b-chapter>

<b-chapter id="cases" icon="trend-up" title="Cases and numbers">
  <b-why align="left">Numbers from company practice show the scale of the effect: at Wix the time went from weeks to hours, and at Ramp with Jam a report takes seconds instead of 15–20 minutes. The line under the table refers to the author’s own example: of 25 reports in the built-in tracker, 23 are closed.</b-why>
  <b-table>
| Who | What they did | Before → after |
|---|---|---|
| Wix | agents collect context, write and check the fix, a human approves | weeks → hours |
| Salesforce | a model analyses customer bugs | ~300 person-days → under a week |
| Metaview | an agent analyses incidents, a human checks | 30–45 min → ~5 min |
| LaunchDarkly | agents find bugs and open fixes | ~40% of unique bugs reached a fix |
| Ramp + Jam | a report with a screenshot and automatic context collection | 15–20 min → seconds per report |
  </b-table>
  <b-metric-line value="23 of 25">reports closed in the built-in tracker of a working app</b-metric-line>
  <b-finding>
    <ex>All the cases share one move: context is collected before a human sits down with the bug.</ex>
    <gen>Shorter time to fix (MTTR in DORA metrics) comes from collecting context and a short chain of people<b-proof href="https://www.wix.engineering/post/from-weeks-to-hours-inside-wix-s-autonomous-bug-fixing-system" quote="Wix Engineering: From weeks to hours — inside Wix’s autonomous bug-fixing system"/>.</gen>
    <do>Measure the time from report to release now, so you have something to compare with.</do>
  </b-finding>
</b-chapter>

<b-chapter id="risks" icon="alert" title="Risks">
  <b-why align="left">The agent reads text written by people, so the method has its own risks: fake reports, personal data in screenshots, green tests with a broken feature, and blurred responsibility. The four cards below name each risk and how to remove it.</b-why>
  <b-rules cols="2">
    <rule icon="shield-alert" t="Fake report">People write the report text; the agent reads it as data, never as commands</rule>
    <rule icon="lock" t="Personal data">Text is masked, the screenshot goes as is, and a dialog warns about it</rule>
    <rule icon="check-square" t="Green tests, broken feature">The check is a replay of the report’s exact scenario on the same kind of data</rule>
    <rule icon="users" t="Blurred responsibility">A human approves the plan and merges; silence does not count as consent</rule>
  </b-rules>
  <b-finding>
    <ex>An agent with write access and text from users is a channel for deception through text.</ex>
    <gen>For more on keeping data from turning into commands, see the article on [data plane and control plane](/blog/data-plane-control-plane-prompt-injection/).</gen>
    <do>Give the agent a separate key: read-only for analysis, write only after approval.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="How to start">
  <b-why align="left">Start with measuring: first measure the bug’s path, then add the button, then give the agent read access and the rule “report first, approval second”. Add write access and automatic mode later.</b-why>
  <b-steps>
    <step t="Measure the bug’s path">how many people and days from “saw it” to “fixed”</step>
    <step t="Add the button">screenshot, three questions, automatic collection of actions and errors</step>
    <step t="Give the agent read access" hl>and the rule: report first, approval second</step>
  </b-steps>
  <b-finding>
    <ex>Three steps with no automatic mode and no write access.</ex>
    <gen>First a short chain of people, then the agent’s speed.</gen>
    <do>Start with one app and ten reports.</do>
  </b-finding>
</b-chapter>

<b-chapter id="next" title="Read next">
  <b-links>
    <item href="/blog/jira-ai-agent-boundaries/" k="Boundary" t="Jira and an AI agent: pros, cons and where to draw the line">Why bug collection is a separate service</item>
    <item href="/blog/bug-report-to-reproduction-agent/" k="QA" t="QA work after support with an AI agent">The agent reproduces a bug from Jira</item>
    <item href="/blog/incident-investigation-agent/" k="Incidents" t="Incident investigation with an AI agent">Sentry and Grafana via MCP</item>
  </b-links>
</b-chapter>
<b-footer>Numbers come from bug report studies (Zimmermann et al.; arxiv 2203.12093, 2301.01235; Jeong et al.) and engineering blogs of Wix, Salesforce, Metaview, LaunchDarkly, Abnormal AI and Jam. The example is the built-in bug tracker of a working app, October 2026.</b-footer>
</b-post>
