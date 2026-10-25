---
title: Requirements and meeting notes with AI: source, assumption, fact — and what follows
date: 2026-10-05
updated: 2026-10-20
description: What to demand from an agent in requirements and meeting notes: a source link, the model’s assumptions and a “fact or not a fact” status. Where major and minor edits come from and how they relate to use cases.
tags: AI, agents, requirements, hallucinations, meeting notes, harness
category: harness
layout: wide
mentions: requirements, meeting notes, hallucinations, sources, assumptions, use cases, change management
toc: what=What to demand | format=How to ask | levels=Major and minor | cases=Use cases | first=Where to start | next=Next
---

An agent writes requirements and notes with confidence, and guesses in them look like facts. The way out is to demand a link, the model’s assumptions and a “fact or not a fact” status for every item. Major and minor edits and the work with use cases follow from these marks. The basis of the approach is in the [MCP for an AI agent](/blog/mcp-agent-access/#facts) article.

<b-post series="harness">

<b-chapter id="what" icon="shield-check" title="What to demand from the agent">
  <b-why>An agent retells meeting notes and documents smoothly, and you cannot see where the fact ends and the guess begins. So for every item in requirements and notes we ask for three things.</b-why>
  <iso-art name="requirements-sources-facts-assumptions/marks"></iso-art>
  <b-rules sw="1.8">
    <rule icon="key" t="Link">A link to a document or a quote from the meeting record with a timestamp.</rule>
    <rule icon="help" t="Assumption">What the agent filled in on its own is written on a separate line.</rule>
    <rule icon="shield-check" t="Status">Fact, not a fact, or a question for a person.</rule>
  </b-rules>
  <b-finding>
    <ex>Every item has a source, a separate line for the guess and a status.</ex>
    <gen>An item without a source gets the status “not a fact”, and a person checks it before relying on it. This continues the idea of the section on [hallucinations in the MCP article](/blog/mcp-agent-access/#facts).</gen>
    <do k="What to do">Add the three marks to your template for requirements and meeting notes.</do>
  </b-finding>
</b-chapter>

<b-chapter id="format" icon="lines" title="How to ask in notes and requirements">
  <iso-art name="requirements-sources-facts-assumptions/pipeline"></iso-art>
  <b-say-agent title="Tell the agent" plain>Parse the meeting record and write a list of requirements. For every item give the source (quote and time), your assumptions on a separate line and a status: fact, not a fact or question. If there is no source, mark it “not a fact”.</b-say-agent>
  <b-codebox title="Template of one item">
    Requirement: Card payment
    Source: meeting of 12 Oct, 14:32, “the customer pays by card at checkout”
    Assumption: payment in one currency only
    Status: fact | not a fact | question
    Confirmed by: —
  </b-codebox>
  <b-finding>
    <ex>The meeting record becomes requirements where every line is marked.</ex>
    <gen>A quote with a timestamp makes checking take seconds, and the assumptions line shows where the model filled gaps.</gen>
    <do k="What to do">Run one of your meetings through this prompt and compare it with what you remember.</do>
  </b-finding>
</b-chapter>

<b-chapter id="levels" icon="layers" title="Major and minor changes">
  <b-why>The marks show how serious an edit is. A minor one leaves system behavior as is, a major one changes it.</b-why>
  <iso-art name="requirements-sources-facts-assumptions/versions"></iso-art>
  <b-rules sw="1.8">
    <rule icon="eye" t="Guess confirmed">The status becomes “fact”, the text stays: a minor edit.</rule>
    <rule icon="bug" t="Guess refuted">The item’s text changes: a major edit.</rule>
    <rule icon="ban" t="A fact changed">If the new version of the source changes behavior, the edit is major.</rule>
    <rule icon="pause" t="Wording">A typo or a clearer wording with the same meaning goes to the change history.</rule>
  </b-rules>
  <b-finding>
    <ex>A minor edit goes to the history, a major one needs approval and a new version.</ex>
    <gen>By the marks the agent separates edits that can go in at once from those to show the requirement owner.</gen>
    <do k="What to do">Agree who confirms major edits and write it into the template.</do>
  </b-finding>
</b-chapter>

<b-chapter id="cases" icon="git-branch" title="Use cases">
  <b-why>One requirement has several use cases: the normal path, an error, a repeat. An edit affects different cases differently.</b-why>
  <iso-art name="requirements-sources-facts-assumptions/use-cases"></iso-art>
  <b-pills>
    <pill>Case: normal path</pill>
    <pill>Case: error</pill>
    <pill>Case: repeat</pill>
  </b-pills>
  <b-finding>
    <ex>The “Card payment” requirement splits into three cases, and an edit about repeat payment touches only the third.</ex>
    <gen>On a major edit the agent lists the affected cases, and on a minor one it confirms the cases did not change.</gen>
    <do k="What to do">After each edit ask the agent to list the affected cases and their tests.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="Where to start">
  <b-numchain>
    <step>Three marks into the template</step>
    <step>Prompt to the agent</step>
    <step>Rule for major edits</step>
  </b-numchain>
  <b-finding>
    <ex>Three steps: template, prompt, rule.</ex>
    <gen>Start with one meeting and one document: the result is visible within an hour.</gen>
    <do k="What to do">Today, parse one meeting record with the template.</do>
  </b-finding>
</b-chapter>

<b-chapter id="next" title="Next">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="Source" t="MCP для ИИ-агента: какую проблему решает и как поручить подключение агенту">How the agent takes facts from systems</item>
    <item href="/blog/bug-report-to-reproduction-agent/" k="Example" t="Работа QA после поддержки с ИИ-агентом: исследование, описание и документирование через MCP и скиллы">The agent reproduces a Jira bug</item>
    <item href="/blog/analytics-reports-agent/" k="Reports" t="Аналитические отчёты с ИИ-агентом: данные из базы, таблицы и документы через MCP">The same approach for analytics</item>
  </b-links>
</b-chapter>
<b-footer>The ticket and meeting are made up for the example. The template and the major/minor rules are team practice and can be changed.</b-footer>
</b-post>
