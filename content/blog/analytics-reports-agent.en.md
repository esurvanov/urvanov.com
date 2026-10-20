---
title: Analytical reports with an AI agent: data from a database, sheets and documents through MCP
date: 2026-10-05
description: How to build an analytical report with an AI agent: connect a read-only database through MCP, delegate queries and the summary, check one number by hand and set permissions per source.
tags: AI, agents, MCP, analytics, reports, database, harness
category: harness
layout: wide
mentions: MCP, Model Context Protocol, analytics, reports, SQL, database, Claude Code, permissions
toc: flow=How a report gets built | access=Sources and permissions | connect=Connecting | verify=Checking | first=Where to start | next=Next
---

A report by hand is an export from a database, a table, a chart and text, and every step waits for a person. An agent with access to the sources goes through the chain itself, while a person checks the numbers and decides what to do next. Below: how it looks, which permissions to give per source, how to connect the database and verify the result. The basics are in the [MCP for an AI agent](/blog/mcp-agent-access/) article.

<b-post series="harness">

<b-chapter id="flow" icon="grid-alt" title="How a report gets built">
  <iso-art name="analytics-reports-agent/before-after"></iso-art>
  <b-finding>
    <ex>By hand, a person moves data between the database, table, chart and text. With an agent they get a ready draft and check the numbers.</ex>
    <gen>The sources connect to the agent through MCP. Every step of the chain repeats and gives a clear result, so it can go to an agent. What the numbers mean is a human decision.</gen>
    <do k="What to do">List the steps of your latest report and mark which of them are copying.</do>
  </b-finding>
</b-chapter>

<b-chapter id="access" icon="lock" title="Sources and permissions">
  <b-why>Systems, data and documents outside the conversation. Permissions are set separately for each source.</b-why>
  <iso-art name="analytics-reports-agent/source-rights"></iso-art>
  <b-finding>
    <ex>Jira, documents and the database are open for reading, the sheet for writing with confirmation, and only the stand can be broken.</ex>
    <gen>The agent sees exactly what is connected and does exactly what is allowed.</gen>
    <do k="What to do">For each source write one word: read, write or stand only.</do>
  </b-finding>
</b-chapter>

<b-chapter id="connect" icon="plug" title="How to connect the database">
  <b-say-agent title="Tell the agent">Connect the analytics database as read-only. Show the schema of the orders table and calculate this month’s revenue. Show the query you used.</b-say-agent>
  <b-why align="left">The agent runs the connection command itself. [If the agent asks you to do it](/blog/agent-hands-work-back-to-you/).</b-why>
  <b-spoiler summary="How to do it by hand">
    <iso-art name="analytics-reports-agent/setup-steps"></iso-art>
    <b-codebox copy>
      claude mcp add --transport stdio db -- npx -y @bytebase/dbhub \
        --dsn "postgresql://readonly:pass@prod.db.com:5432/analytics"
    </b-codebox>

Create the user as read-only so the agent’s queries cannot change anything. Example prompts from the docs: “What’s our total revenue this month?”, “Show me the schema for the orders table”.

  </b-spoiler>
  <b-finding>
    <ex>The agent connects the database, looks at the schema, calculates revenue and shows the query.</ex>
    <gen>Read-only rights keep queries safe: the agent cannot change data.</gen>
    <do k="What to do">Create a read-only database user and connect it first.</do>
  </b-finding>
</b-chapter>

<b-chapter id="verify" icon="shield-check" title="How to check the report">
  <iso-art name="analytics-reports-agent/check-number"></iso-art>
  <b-finding>
    <ex>The agent shows the query and result, a person recomputes one number another way.</ex>
    <gen>The model calculates with a query, and a query can be reread. A matching number raises trust in the rest.</gen>
    <do k="What to do">Check one number from the report by hand before sending the report on.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="Where to start">
  <iso-art name="analytics-reports-agent/start-steps"></iso-art>
  <b-finding>
    <ex>Three steps: a read-only database, one report, checking one number.</ex>
    <gen>Start with a report whose numbers you already know: that shows where the agent went wrong.</gen>
    <do k="What to do">Today create a read-only user and ask the agent to calculate a familiar figure.</do>
  </b-finding>
</b-chapter>

<b-chapter id="next" title="Next">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="Basics" t="MCP для ИИ-агента: какую проблему решает и как поручить подключение агенту">What MCP is and how to connect it</item>
    <item href="/blog/incident-investigation-agent/" k="Another case" t="Incident investigation with an AI agent">Sentry and Grafana through MCP</item>
    <item href="/blog/work-prompts-examples/" k="Practice" t="Промпты для рабочих задач: пять частей и шесть примеров для ChatGPT и Claude">The “table analysis” example</item>
  </b-links>
</b-chapter>
<b-footer>The example is made up. The database connection command and the read-only user advice follow the Claude Code docs: <a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">Connect Claude Code to tools via MCP</a>.</b-footer>
</b-post>
