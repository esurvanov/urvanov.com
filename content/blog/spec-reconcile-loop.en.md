---
title: A reconcile loop for specs: like Kubernetes, with the spec as desired state and code as actual
date: 2026-09-28
updated: 2026-10-26
description: Spec-driven development with a reconcile loop: who changes the desired state and who brings the code to it, why green tests do not yet mean “correct”, and which six environment capabilities the agent needs to close the loop.
tags: AI, spec-driven development, specs, Kubernetes, harness
category: specs
layout: wide
image: /og/spec-reconcile-loop.en.png
mentions: Kubernetes, reconcile loop, human-in-the-loop, Model Context Protocol, Spec-Driven Development
toc: k8s=Like Kubernetes | sensors=Limits of checks | env=Environment | next=Read next
---

A reconcile loop for specs works like a controller in Kubernetes: a person changes the desired state (the spec), the agent compares it with the actual state (the code) and brings the code in line, and tests measure the result. Green tests check only what is written into them, so every MUST needs its own check, and the agent’s environment needs code execution, tests, logs, data, services and a sandbox.

<b-post series="rec">
<b-hchain label="The reconcile chain: desired is the spec, the actor is the agent, actual is the code, the measure is tests">
  <step icon="book" t="Desired">spec</step>
  <step icon="bot" t="Actor">agent</step>
  <step icon="code-slash" t="Actual">code</step>
  <step icon="gauge" sw="1.8" t="Measure">tests</step>
</b-hchain>
<b-chapter id="k8s" title="The same loop as in Kubernetes" icon="hub" sw="1.6">
  <b-why align="left">Kubernetes is a system that runs services and keeps them working on many servers. Its main idea is simple: a person describes how things should be (“keep three copies of the service”), and a supervisor program, the controller, keeps comparing the description with what really exists and fixes the differences. That is the reconcile loop. For specs the same scheme works: a person sets the desired state, and an agent can bring the code to it.</b-why>
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
    <b-k8s-row icon="help" t="In plain words">
      <cell>how it should be</cell>
      <cell>who brings it there</cell>
      <cell>how it is now</cell>
      <cell>what compares them</cell>
    </b-k8s-row>
  </b-k8s-loop>
  <b-why align="left">How to read the picture. The four columns are the four roles of the loop, the two rows are two systems, and the third row puts the terms into plain words. The desired state (filled in) is what a person changes. In Kubernetes that is the chart and the manifest: files that say which parts of a service must run and how many. In specs it is the aggregate dictionary with the words MUST (“required”) and SHOULD (“recommended”). The actor brings the actual state to the desired one: in Kubernetes the controller, in specs the agent. The actual state is what exists now: nodes (servers) and pods (the parts of a service running on them), or the code. The measure shows whether they match: probes (short automatic “are you working?” checks) and metrics, or tests and quality checks. The arrow down at the top means a person changes only the desired state. The loop arrow at the bottom means the measurement goes back to the actor, and so on until they match. Example: a person writes in the dictionary “a booking closes after 15 minutes”, the agent changes the code, tests check it, and a red test sends the agent back to the code.</b-why>
  <b-cap>The reconcile loop follows the <a href="https://kubernetes.io/docs/concepts/architecture/controller/" target="_blank" rel="noopener">Kubernetes docs on controllers</a>.</b-cap>
  <b-finding>
    <ex>In Kubernetes a human edits the chart and the controller brings the nodes to it. Here a human edits the dictionary and the agent brings the code to it and checks with tests.</ex>
    <gen>Both systems keep the desired state apart from the actual one and reconcile them in a loop. The human in the loop changes only the desired state, so every edit immediately becomes work for the actor.</gen>
    <do>Edit the requirement in the dictionary instead of fixing code by hand, and run the agent with the task of bringing the code in line with the dictionary.</do>
  </b-finding>
</b-chapter>
<b-chapter id="sensors" title="A check sees only what was put into it" icon="gauge">
  <b-why align="left">A check shows only what was put into it. In Kubernetes a probe is a short automatic request to a service: “are you responding?”. If the service answers “200” (the success code), the probe is green even though the service may not be doing the main thing: say, the order queue is stuck. In specs it is the same with tests. If a requirement has no test, all the tests stay green and nobody notices the requirement is not met.</b-why>
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
  <b-why align="left">How to read the picture. On the left is Kubernetes: the /healthz probe returned 200 and is green, but the order queue is stuck, so the probe did not check the main thing. On the right are specs, using a meeting-room booking: three MUST requirements and one SHOULD. Two MUSTs are covered by tests (“do not overlap” and “forward only”), the third (“15 minutes → closed”) has no check, and a person reviews the SHOULD about the channel. 2 of 3 MUSTs are covered, that is 67%. The three rules on the right: every MUST has its own check; a MUST without a check counts as a finding, a gap to close; a green result does not yet mean everything is correct.</b-why>
  <b-cap>Which probes exist and what they check: <a href="https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/" target="_blank" rel="noopener">Kubernetes: probes</a>.</b-cap>
  <b-finding>
    <ex>The probe answers “200” while orders are stuck, and the booking tests are green while nobody checks the 15-minute rule.</ex>
    <gen>A check confirms only what is written into it and says nothing about the rest. So the aggregate card is compared against the checks: a MUST without a check is a gap, not a met requirement.</gen>
    <do>Go through the MUSTs in your dictionary and mark the ones without a test. Turn each into a task, or deliberately downgrade it to SHOULD.</do>
  </b-finding>
</b-chapter>
<b-chapter id="env" title="The environment decides whether the loop closes" icon="terminal-screen">
  <b-why align="left">The loop closes only if the actor has everything needed for comparing. A Kubernetes controller works because the cluster gives it access to all it needs. For an agent this environment is called the harness: the surroundings it works in, with programs, permissions and checks.</b-why>
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
  <b-why align="left">The six capabilities in the picture are what an agent needs to close the loop, and what happens without each. Without code execution the agent guesses how the program works. Without tests a MUST cannot be checked. Without logs it is not visible what exactly broke. Without test data the check runs on an empty database and shows nothing. Without services through MCP, integrations are checked blind. Without a sandbox (an isolated place where it is safe to try and break things) it is scary to let the agent act. If some capability is missing, the loop is open at that point.</b-why>
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
