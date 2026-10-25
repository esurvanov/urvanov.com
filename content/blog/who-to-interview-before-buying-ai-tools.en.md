---
title: Who to interview before buying AI tools: eight polar groups
date: 2026-09-28
updated: 2026-10-20
description: How to pick 16 people from the report, a questionnaire and license lists, check team coverage and replacements, and decide what to ask them.
tags: AI, custdev, research
category: research
layout: wide
image: /og/who-to-interview-before-buying-ai-tools.en.png
mentions: ChatGPT Enterprise, Codex
toc: why=Why sample | top=Top by activity | groups=Eight groups | teams=Team coverage | ask=What to learn | order=Workflow | next=Further reading
---

<b-post series="gruppy">
<b-credit para>Interview sampling design based on recommendations from <a href="https://t.me/Kseniya_Vasil" target="_blank" rel="noopener">@Kseniya_Vasil</a></b-credit>
<b-gruppy-chain label="From report to interview list">
  <stage n="340" t="People in report" dots="340" on="5:c-code 31:c-code 58:c-work 77:c-work 96:c-chat 120:c-chat 141:c-silent 163:c-silent 187:c-none 205:c-none 226:c-light 248:c-light 269:c-proj 290:c-proj 311:c-team 333:c-team"/>
  <stage n="8" t="Polar groups" icons="code-alt:c-code zap-alt:c-work search-alt:c-chat card:c-silent slash:c-none log-out:c-light folder:c-proj grid-sm:c-team"/>
  <stage n="16" t="Interviews" circles="c-code c-code c-work c-work c-chat c-chat c-silent c-silent c-none c-none c-light c-light c-proj c-proj c-team c-team"/>
</b-gruppy-chain>
<b-cap>All numbers and names are examples</b-cap>

<b-chapter id="why" icon="target" title="What decision it supports">

The **business task** comes from the [report](/en/blog/chatgpt-enterprise-usage-report/#why): for which work tasks the current set of AI tools falls short and what to test before buying. The report also says who makes the decision and by which signs. The sample decides whose tasks we will see in the interviews.

First, define which ways of getting tasks done you need to see: through the corporate AI tool, through other AI tools, by hand or through colleagues, and among people who tried the tool and quit. The [ChatGPT Enterprise usage report](/en/blog/chatgpt-enterprise-usage-report/) is one of the sources: it finds the first group and those who quit. Users of other tools are found through a company-wide [questionnaire](/en/blog/ai-interviews-without-leading-questions/#form) and license and purchase lists.

  <b-io justify>
    <item k="Input">Table of people from the report, a company-wide questionnaire, license and purchase lists</item>
    <item k="What the method does">Picks 2 people for each way of getting tasks done</item>
    <item k="Output decision">Who to talk to before buying and what to test, up to the conclusion that no new tool is needed</item>
  </b-io>
</b-chapter>

<b-chapter id="top" icon="bar-chart" title="Why a top-by-activity list is not enough">
  <b-why>Three ways to recruit 16 people. Dot color is the usage scenario. The most active people and volunteers are good respondents and belong in any sample, but they are not enough on their own.</b-why>
  <b-gruppy-compare>
    <way kind="bad" s="partial" t="Top by messages" dots="c-chat c-chat c-chat c-chat c-chat c-chat c-work c-chat c-chat c-chat c-chat c-chat c-work c-chat c-chat c-chat">scenarios: **2 of 8**</way>
    <way kind="bad" s="partial" t="Volunteers" dots="c-chat c-chat c-code c-chat c-code c-chat c-proj c-chat c-chat c-code c-chat c-chat c-proj c-chat c-chat c-chat">scenarios: **3 of 8**</way>
    <way kind="good" s="full" t="Polar groups" dots="c-code c-code c-work c-work c-chat c-chat c-silent c-silent c-none c-none c-light c-light c-proj c-proj c-team c-team">scenarios: **8 of 8**</way>
  </b-gruppy-compare>
  <b-finding>
    <ex>Top by messages covers 2 of 8 scenarios, volunteers cover 3, and polar groups cover all 8.</ex>
    <gen>The most active and responsive people know the tool best and are worth inviting. They are similar to each other and together describe one or two scenarios. To hear the rest, the sample is filled with people at the extremes of other attributes.</gen>
    <do>Take 2–3 people from the top by messages. Give the remaining slots to people with other scenarios: those who work only through Codex, quit the tool, use other tools, or run many projects.</do>
  </b-finding>
</b-chapter>

<b-chapter id="groups" icon="grid" title="Eight groups">
  <b-why>Six groups come from report thresholds, "quit" from the last activity date, and "other tools" from the questionnaire. Each group has a question it helps test. The answer can be anything, including "no new tool is needed". The thresholds here are a guide: tune them so each group gets 2–5 people.</b-why>
  <b-gruppy-groups>
    <group icon="code-alt" color="c-code" t="Most active in code" c="code &gt; $200 / 3 mo" p="Hana Sato, Luis Moreno">what is missing in development: a tool, repository access, or nothing</group>
    <group icon="zap-alt" color="c-work" t="Agent tasks" c="agent &gt; $60 / 3 mo" p="Mira Castellano, Tomás Reid">where the agent falls short and why: data, the task, or the agent itself</group>
    <group icon="search-alt" color="c-chat" t="Intensive research" c="&gt; 3,000 msgs, chat is primary" p="Jonas Keller, Aiko Lind">how they check answers and whether the current search is enough</group>
    <group icon="card" color="c-silent" t="Codex only" c="0 msgs and &gt; $20 / 3 mo" p="Ben Ortiz, Lena Moss">which tasks they handle without chat and whether they need anything else</group>
    <group icon="slash" color="c-none" t="Inactive" c="0 msgs and $0 for the period" p="Pavel Novak, Sara Quinn">how they get their tasks done and which options they considered</group>
    <group icon="log-out" color="c-light" t="Tried and quit" c="had messages, 0 in the last 60 days" p="Farah Nasser, Yara Selim">why they stopped: result, time, security, or the task went away</group>
    <group icon="folder" color="c-proj" t="Project organizers" c="≥ 6 active projects" p="Elif Demir, Rafael Costa">what projects give them and what they lack</group>
    <group icon="grid-sm" color="c-team" t="Other tools" c="per questionnaire: main AI tool is not the corporate one" p="Nadia Rahimi, Oskar Berg">what is better in the other tool and whether the current one can offer it</group>
  </b-gruppy-groups>
  <b-stack label="16 interviews by group">
    <seg w="2" color="c-code">2</seg>
    <seg w="2" color="c-work">2</seg>
    <seg w="2" color="c-chat">2</seg>
    <seg w="2" color="c-silent">2</seg>
    <seg w="2" color="c-none" ink="ink">2</seg>
    <seg w="2" color="c-light" ink="ink">2</seg>
    <seg w="2" color="c-proj">2</seg>
    <seg w="2" color="c-team">2</seg>
  </b-stack>
  <b-legend>
    <item color="c-code">code</item>
    <item color="c-work">agent</item>
    <item color="c-chat">research</item>
    <item color="c-silent">Codex only</item>
    <item color="c-none">inactive</item>
    <item color="c-light">quit</item>
    <item color="c-proj">projects</item>
    <item color="c-team">other tools</item>
  </b-legend>
  <b-finding>
    <ex>16 conversations: two in each of the eight groups.</ex>
    <gen>Two or three people per group show whether a problem repeats: if two out of three say the same thing, that is a signal. People with average values are left out: their answers resemble neighboring groups and add no new scenarios across 16 conversations.</gen>
    <do>In each group, sort candidates by its threshold and take the two with the most extreme values, from different teams where possible. If a person falls into two groups, keep them in the one where their value is more extreme and take the next candidate in the other.</do>
  </b-finding>
</b-chapter>

<b-chapter id="teams" icon="alert-circle" title="Team coverage and replacements">
  <b-why>A separate step after recruiting that does not change the groups: how many selected people fall in each team and who replaces those who decline.</b-why>
<b-table>
| Team | Regular users | Selected | Status |
|---|---|---|---|
| Team A | <b-bar value="74"/> | <b-gruppy-cov colors="c-code c-chat c-silent c-proj c-light"/> | <b-tag kind="ok" inline>covered</b-tag> |
| Team B | <b-bar value="66"/> | <b-gruppy-cov colors="c-work c-work c-chat c-none"/> | <b-tag kind="ok" inline>covered</b-tag> |
| Team C | <b-bar value="51"/> | <b-gruppy-cov colors="c-code c-silent c-none c-proj"/> | <b-tag kind="ok" inline>covered</b-tag> |
| Team D | <b-bar value="34"/> | <b-gruppy-cov colors="c-team"/> | <b-tag kind="ok" inline>after replacement</b-tag> |
| Team E | <b-bar value="18"/> | <b-gruppy-cov colors="c-light c-team"/> | <b-tag kind="ok" inline>after replacement</b-tag> |
</b-table>
  <b-finding>
    <ex>After recruiting by group, Teams D and E had nobody. Three candidates were replaced with people from D and E with the same behavior, and all five teams are now covered.</ex>
    <gen>Spend and message thresholds catch extreme users. A team where everyone uses the tool a little never crosses a threshold, and its tasks drop out of the research. That is why teams are checked as a separate step.</gen>
    <do>Lay the selected people out by team. If a team has nobody, replace one candidate in a fitting group with a person from that team with the same behavior. Replace anyone who declines with the next candidate of the same group by its threshold.</do>
  </b-finding>
</b-chapter>

<b-chapter id="ask" icon="chat" title="What to learn in the interview">
  <b-why>The conversation starts from the last work task, not from the tool: what they needed to get, what means they had, what they chose, and how they got to the result. The full script is in the [interview article](/en/blog/ai-interviews-without-leading-questions/#script).</b-why>
  <b-gruppy-phases>
    <b-gruppy-phase icon="clock-sm" color="c-chat" t="Task">
      <item t="The last work task">What they needed to get and for whom</item>
      <item t="Means and choice">What they had, what they chose and why</item>
    </b-gruppy-phase>
    <b-gruppy-phase icon="eye-wide" color="c-proj" t="Path">
      <item t="How they got to the result">What they used as is, what they finished themselves</item>
      <item t="Effort and constraints">Time, data, access, security</item>
    </b-gruppy-phase>
    <b-gruppy-phase icon="check-thin" color="c-work" t="A successful case">
      <item t="When it went well">What was different then</item>
    </b-gruppy-phase>
    <b-gruppy-phase icon="trend-up" color="c-code" t="Quitting and switching">
      <item t="Quit or changed tools">What they switched to and why</item>
    </b-gruppy-phase>
  </b-gruppy-phases>
  <b-finding>
    <ex>Six points: four about one task, a successful case, and quitting or switching.</ex>
    <gen>A story about a past task gives facts: you see where the person chose AI, where another way, and why. The successful case shows what already works; quitting and switching show why tools get replaced. A forecast about the future cannot be checked.</gen>
    <do>Ask them to name their last work task in the first minutes and run the whole conversation on it. If the person does not mention AI, ask which options they considered, not why they do not use it.</do>
  </b-finding>
</b-chapter>

<b-chapter id="order" icon="list-dotted" title="Workflow">
  <b-gruppy-steps>
    <step t="Collect candidates into eight groups">Six groups from report thresholds, "quit" from the last activity date, "other tools" from the questionnaire</step>
    <step t="Keep 2 people per group">From different teams if you have a choice; one person in one group only</step>
    <step t="Check team coverage">If a team has nobody, replace one candidate with a person from it with the same behavior</step>
    <step t="Schedule 30-minute interviews">The conversation starts from the last work task: what they needed to get, what means they had, what they chose, and how they got to the result. With those who quit, also discuss why they stopped</step>
  </b-gruppy-steps>
  <b-gruppy-limit t="Limitation.">16 interviews show which problems occur and what they look like in real work. They cannot tell you how many people in the company face each one. To learn the scale, send the whole company a short [questionnaire](/en/blog/ai-interviews-without-leading-questions/#form), written after the interviews. If the problems are not confirmed, that is also a result: no new tool is needed.</b-gruppy-limit>
</b-chapter>

<b-chapter id="next" title="Further reading">
  <b-links>
    <item href="/en/blog/chatgpt-enterprise-usage-report/" k="Report" t="ChatGPT Enterprise usage report">How to build the usage report that the people table comes from</item>
    <item href="/en/blog/ai-interviews-without-leading-questions/" k="Interviews" t="Interviews without leading questions">How to run the conversation by voice or questionnaire and collect answers in Airtable</item>
  </b-links>
</b-chapter>
<b-footer>Interview sampling design based on recommendations from <a href="https://t.me/Kseniya_Vasil" target="_blank" rel="noopener">@Kseniya_Vasil</a>. All names, teams, and numbers in the examples are fictional.</b-footer>
</b-post>
