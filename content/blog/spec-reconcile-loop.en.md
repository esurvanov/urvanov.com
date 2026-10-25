---
title: A reconcile loop for specs: like Kubernetes, with the spec as desired state and code as actual
date: 2026-09-28
updated: 2026-10-20
description: Spec-driven development with a reconcile loop: who changes the desired state and who brings the code to it, why green tests do not yet mean “correct”, and which six environment capabilities the agent needs to close the loop.
tags: AI, spec-driven development, specs, Kubernetes, harness
category: specs
layout: wide
image: /og/spec-reconcile-loop.en.png
mentions: Kubernetes, reconcile loop, human-in-the-loop, Model Context Protocol, Spec-Driven Development
toc: k8s=Like Kubernetes | sensors=Limits of checks | env=Environment | next=Read next
---

<b-post series="rec">
<b-hchain label="The reconcile chain: desired is the spec, the actor is the agent, actual is the code, the measure is tests">
  <step icon="book" t="Desired">spec</step>
  <step icon="bot" t="Actor">agent</step>
  <step icon="code-slash" t="Actual">code</step>
  <step icon="gauge" sw="1.8" t="Measure">tests</step>
</b-hchain>
<b-chapter id="k8s" title="The same loop as in Kubernetes" icon="hub" sw="1.6">
  <b-why>The desired state here is the <a href="/en/blog/specs-by-aggregates/">aggregate dictionary</a>: one entry per concept, requirements marked MUST and SHOULD.</b-why>
  <b-k8s-loop label="Kubernetes: chart, controller, nodes, probes. Specs: dictionary, agent, code, tests. A human changes only the desired state, and the actor keeps reconciling the measurement with it." cols="desired | actor | actual | measure" human="a human changes the desired state" back="measure → actor, round and round">
    <b-k8s-row icon="hub" sw="1.6" t="Kubernetes">
      <cell on>chart · manifest</cell>
      <cell>controller</cell>
      <cell>nodes · pods</cell>
      <cell>probes · metrics</cell>
    </b-k8s-row>
    <b-k8s-row icon="book" t="Specs">
      <cell on>dictionary · MUST</cell>
      <cell hz>agent</cell>
      <cell>code</cell>
      <cell hz>tests · quality</cell>
    </b-k8s-row>
  </b-k8s-loop>
  <b-cap>The reconcile loop follows the <a href="https://kubernetes.io/docs/concepts/architecture/controller/" target="_blank" rel="noopener">Kubernetes docs on controllers</a>.</b-cap>
  <b-finding>
    <ex>In Kubernetes a human edits the chart and the controller brings the nodes to it. Here a human edits the dictionary and the agent brings the code to it and checks with tests.</ex>
    <gen>Both systems keep the desired state apart from the actual one and reconcile them in a loop. The human in the loop changes only the desired state, so every edit immediately becomes work for the actor.</gen>
    <do>Edit the requirement in the dictionary instead of fixing code by hand, and run the agent with the task of bringing the code in line with the dictionary.</do>
  </b-finding>
</b-chapter>
<b-chapter id="sensors" title="A check sees only what was put into it" icon="gauge">
  <b-why>The example is the meeting room booking from <a href="/en/blog/specs-by-aggregates/">Specs by aggregate</a>: three MUST requirements and one SHOULD.</b-why>
  <b-probe-check>
    <b-probe-panel icon="hub" sw="1.6" t="Kubernetes" verdict="probe is green, service is down">
      <probe kind="ok">/healthz → 200</probe>
      <probe kind="no">order queue is stuck</probe>
    </b-probe-panel>
    <b-probe-panel icon="book" t="Specs" verdict="tests are green, one MUST is unchecked">
      <probe kind="ok" note="test">MUST · no overlap</probe>
      <probe kind="ok" note="test">MUST · forward only</probe>
      <probe kind="no" note="no check">MUST · 15 min → closed</probe>
      <probe kind="eye" note="review">SHOULD · channel</probe>
      <cov t="MUST covered" value="67">2 / 3</cov>
    </b-probe-panel>
    <rule>every MUST → its own check</rule>
    <rule>MUST without a check = finding</rule>
    <rule>green ≠ correct</rule>
  </b-probe-check>
  <b-cap>Which probes exist and what they check: <a href="https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/" target="_blank" rel="noopener">Kubernetes: probes</a>.</b-cap>
  <b-finding>
    <ex>The probe answers “200” while orders are stuck, and the booking tests are green while nobody checks the 15-minute rule.</ex>
    <gen>A check confirms only what is written into it and says nothing about the rest. So the aggregate card is compared against the checks: a MUST without a check is a gap, not a met requirement.</gen>
    <do>Go through the MUSTs in your dictionary and mark the ones without a test. Turn each into a task, or deliberately downgrade it to SHOULD.</do>
  </b-finding>
</b-chapter>
<b-chapter id="env" title="The environment decides whether the loop closes" icon="terminal-screen">
  <b-env-caps>
    <side icon="hub" sw="1.6" t="cluster">the controller’s environment</side>
    <side icon="terminal-screen" sw="1.8" t="harness">the agent’s environment</side>
    <cap icon="play" t="Run code">guesses instead of facts</cap>
    <cap icon="flask" t="Tests">MUST cannot be checked</cap>
    <cap icon="log-lines" t="Logs">no way to see what broke</cap>
    <cap icon="database" t="Test data">checks on empty tables</cap>
    <cap icon="plug" t="Services via MCP">integrations in the dark</cap>
    <cap icon="shield-check" t="Sandbox and permissions">too risky to let it act</cap>
  </b-env-caps>
  <b-cta href="/en/blog/ai-in-code-harness-and-tools/" k="Separate article" t="Choosing the environment: a harness comparison" icon="terminal-screen" sw="1.8">Claude Code, Codex, Cursor, Hermes and chat on one map</b-cta>
  <b-finding>
    <ex>The Kubernetes controller works because the cluster gives it an API, nodes and probes. For the same loop the agent needs to run code, tests, logs, data, services and a sandbox.</ex>
    <gen>The dictionary sets the desired state, but only someone who can run and measure the code can reconcile it with that state. Whatever the environment lacks, the agent cannot check, and the loop stays open at that point.</gen>
    <do>Mark which of the six capabilities your agent has. For each missing one, decide whether to add it to the harness or switch harnesses.</do>
  </b-finding>
</b-chapter>
<b-chapter id="next" title="Read next">
  <b-links cols="3">
    <item href="/en/blog/specs-by-aggregates/" k="Desired state" t="Specs by aggregate">dictionary, RFC requirements and contexts</item>
    <item href="/en/blog/harness-driven-development/" k="Mistake loop" t="Harness-Driven Development">how agent mistakes become rules</item>
    <item href="/en/blog/ai-in-code-harness-and-tools/" k="Environment" t="Harness comparison">where the agent works and what it sees</item>
  </b-links>
</b-chapter>
<b-footer compact>The booking example is made up. Terms and approaches follow the sources linked under the diagrams.</b-footer>
</b-post>
