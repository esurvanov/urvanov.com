---
title: How many AI agents you need: the number of agents grows with the number of bounded contexts
date: 2026-10-10
updated: 2026-10-25
description: One agent per bounded context: why there are as many agents as meaning boundaries, how it scales, what sits between agents and where to start.
tags: AI, agents, bounded context, DDD, architecture, scaling, harness
category: harness
layout: wide
mentions: bounded context, multi-agent, AI agent, DDD, context map, contracts, scaling, harness
toc: idea=Agent per context | scale=Scaling | borders=Between agents | first=Where to start | next=Read next
---

How many AI agents do you need? As many as there are bounded contexts: each meaning boundary gets its own agent. Below: why, how it scales, what sits between agents and where to start.

<b-post series="harness">

<b-chapter id="idea" icon="ring-dot" title="One agent per context">
  <b-why align="left">There are as many agents as [bounded contexts](/materials/glossary/bounded-context/). That way an [agent](/materials/glossary/ai-agent/) has enough context.</b-why>
  <b-lane title="One for all or one per context" color="accent">
    <iso-art name="agents-per-bounded-context/one-vs-per-context"></iso-art>
  </b-lane>
  <b-finding>
    <ex>"Order" means different things in sales, delivery and payment. One agent mixes the meanings, three agents each keep their own.</ex>
    <gen>A context boundary already shows where the meaning changes. It is a handy place to cut both specs and the agents' work.</gen>
    <do k="What to do">List the project contexts and write next to each one who works inside its boundaries.</do>
  </b-finding>
</b-chapter>

<b-chapter id="scale" icon="chart-axes" title="How it scales">
  <b-lane title="Load and number of agents" color="accent">
    <iso-art name="agents-per-bounded-context/load-chart"></iso-art>
  </b-lane>
  <b-finding>
    <ex>Eight contexts: one agent drowns in meanings, while eight agents each work within their own borders.</ex>
    <gen>The number of agents grows linearly with the number of contexts while each one's load stays flat.</gen>
    <do k="What to do">Add an agent together with a new context instead of growing one agent's context.</do>
  </b-finding>
</b-chapter>

<b-chapter id="borders" icon="boxes-link" title="What sits between agents">
  <b-why align="left">Agents talk through contracts: events and APIs. A foreign context is not under your control, so the agent reaches it only through the contract and with your confirmation. More on judging complexity: [where the complexity is real](/blog/agent-hands-work-back-to-you/#hard).</b-why>
  <b-lane title="Context map" color="accent">
    <iso-art name="agents-per-bounded-context/context-map"></iso-art>
  </b-lane>
  <b-finding>
    <ex>The sales agent reads the "order paid" event from payment and writes to the partner system only through an approved contract.</ex>
    <gen>A contract replaces shared context: agents do not need to know the inside of someone else's boundary, and a mistake does not spread.</gen>
    <do k="What to do">For each link between contexts write the contract in one line: what it gives, what it takes, who owns it.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="shield-check" title="Where to start">
  <b-lane title="The first step" color="accent">
    <iso-art name="agents-per-bounded-context/start"></iso-art>
  </b-lane>
  <b-finding>
    <ex>Start with two neighbouring contexts and one contract between them.</ex>
    <gen>One context, one agent, one contract: that tests the scheme before you stretch it across the whole project.</gen>
    <do k="What to do">Pick two contexts where words get mixed up most often and start one agent for each.</do>
  </b-finding>
</b-chapter>

<b-chapter id="next" icon="arrow-right" title="Read next">
  <b-links>
    <item href="/blog/specs-by-aggregates/" k="Specs" t="Specs by aggregates">context boundaries in specs</item>
    <item href="/blog/agent-hands-work-back-to-you/" k="Agent" t="Will agents take your job">where the complexity is real</item>
    <item href="/materials/glossary/bounded-context/" k="Term" t="Bounded context">what it is and why</item>
  </b-links>
</b-chapter>
</b-post>
