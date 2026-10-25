---
title: Incident investigation with an AI agent: Sentry and Grafana through MCP
date: 2026-10-05
updated: 2026-10-20
description: How to investigate an incident with an AI agent: connect Sentry and Grafana through MCP, have it match errors, metrics and release time, limit permissions and verify the hypothesis.
tags: AI, agents, MCP, Sentry, Grafana, incidents, harness
category: harness
layout: wide
mentions: MCP, Model Context Protocol, Sentry, Grafana, incident investigation, observability, Claude Code
toc: flow=How it goes | connect=Connecting | timeline=What the agent matches | rights=Permissions and risks | first=Where to start | next=Next
---

During an incident a person hops between Sentry, Grafana and chat and stitches the picture together themselves. An agent with access to both systems gathers errors, metrics and event times into one draft, while a person checks the hypothesis and decides what to do. Below: how it goes, how to connect Sentry and Grafana, which permissions to give. The basics are in the [MCP for an AI agent](/blog/mcp-agent-access/) article.

<b-post series="harness">

<b-chapter id="flow" icon="bug" title="How the investigation goes">
  <iso-art name="incident-investigation-agent/before-after"></iso-art>
  <b-finding>
    <ex>The agent reads errors in Sentry and charts in Grafana, and a person gets one draft of the investigation.</ex>
    <gen>Sentry and Grafana connect through MCP as read-only, so the agent changes nothing without your permission. A person checks the hypothesis.</gen>
    <do k="What to do">List the systems you searched for the cause in your last incident.</do>
  </b-finding>
</b-chapter>

<b-chapter id="connect" icon="plug" title="How to connect Sentry and Grafana">
  <b-say-agent title="Tell the agent">Connect Sentry and Grafana as read-only. Find new errors for the payment service in Sentry over the last hour, find in Grafana when the share of 5xx responses grew, and match it with the release time. Propose a hypothesis and name the source of every fact.</b-say-agent>
  <b-why align="left">The agent runs the commands itself; you only sign in to Sentry through the browser and provide a Grafana token. [If the agent asks you to do it](/blog/agent-hands-work-back-to-you/).</b-why>
  <b-spoiler summary="How to do it by hand">
    <iso-art name="incident-investigation-agent/setup-steps"></iso-art>

#### Sentry

    <b-codebox copy>
      claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
      /mcp   # sign in through the browser (OAuth)
    </b-codebox>

Sign-in uses OAuth, and tokens are stored and refreshed automatically.

#### Grafana

    <b-codebox copy>
      claude mcp add --transport stdio \
        --env GRAFANA_URL=https://myinstance.grafana.net \
        --env GRAFANA_SERVICE_ACCOUNT_TOKEN=$GRAFANA_TOKEN \
        grafana -- uvx mcp-grafana --disable-write
    </b-codebox>

This is the official server <a href="https://github.com/grafana/mcp-grafana" target="_blank" rel="noopener">grafana/mcp-grafana</a>. The token comes from a service account with minimal rights, and the --disable-write flag forbids changes.

  </b-spoiler>
  <b-finding>
    <ex>The agent connects both systems, finds the errors and the chart, matches them with the release and names the sources.</ex>
    <gen>Both systems connect with a command, and read access keeps the investigation safe.</gen>
    <do k="What to do">Delegate the connection to the agent and compare its output with what you see in Sentry and Grafana yourself.</do>
  </b-finding>
</b-chapter>

<b-chapter id="timeline" icon="lines" title="What the agent matches">
  <iso-art name="incident-investigation-agent/event-timeline"></iso-art>
  <b-finding>
    <ex>The release, error spike and alert go on one timeline, and you can see what happened first.</ex>
    <gen>A time match gives a hypothesis and does not prove the cause: checking stays with a person.</gen>
    <do k="What to do">Ask for a link to a chart or event with every conclusion.</do>
  </b-finding>
</b-chapter>

<b-chapter id="rights" icon="shield-check" title="Permissions and risks">
  <iso-art name="incident-investigation-agent/rights-ladder"></iso-art>
  <b-rules sw="1.8">
    <rule icon="key" t="Token">A Grafana service account with minimal rights; the value lives in an environment variable.</rule>
    <rule icon="lock" t="Read-only">The --disable-write flag forbids changes, including creating incidents.</rule>
    <rule icon="ban" t="Third-party server">Connect only servers you trust: servers that read external text open the door to prompt injection.</rule>
  </b-rules>
  <b-finding>
    <ex>The agent reads errors and charts, and may not change anything in the systems.</ex>
    <gen>Permissions are given per source, and the widest ones stay closed.</gen>
    <do k="What to do">Create a read-only service account and connect Grafana with the --disable-write flag.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="Where to start">
  <iso-art name="incident-investigation-agent/start-steps"></iso-art>
  <b-finding>
    <ex>Three steps: Sentry, Grafana, a test on a past incident.</ex>
    <gen>You know the past incident, so you can see where the agent found the cause and where it erred.</gen>
    <do k="What to do">Take a closed incident and ask the agent to find the cause through Sentry and Grafana.</do>
  </b-finding>
</b-chapter>

<b-chapter id="next" title="Next">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="Basics" t="MCP для ИИ-агента: какую проблему решает и как поручить подключение агенту">What MCP is and how to connect it</item>
    <item href="/blog/analytics-reports-agent/" k="Another case" t="Analytical reports with an AI agent">Database, sheets and documents through MCP</item>
    <item href="/blog/mcp-scopes/" k="Setup" t="Области MCP в Claude Code: local, project и user — где хранится сервер и кто его видит">Where a server lives and who sees it</item>
  </b-links>
</b-chapter>
<b-footer>The incident is made up. Connecting Sentry follows the Claude Code docs: <a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">MCP</a>, Grafana follows the repository <a href="https://github.com/grafana/mcp-grafana" target="_blank" rel="noopener">grafana/mcp-grafana</a>.</b-footer>
</b-post>
